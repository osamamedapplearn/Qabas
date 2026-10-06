// Shared helpers for the cloud admin API (Vercel serverless, /api/admin/*).
// Security model:
// - Every mutating/read endpoint (except login) requires a signed session
//   cookie issued by login.js after verifying ADMIN_PASSWORD.
// - Passwords never leave the server; the browser only holds an
//   HttpOnly SameSite session cookie (expiry + HMAC signature).
// - Basic per-IP rate limiting on login (best-effort on serverless).
import crypto from 'node:crypto';

const REPO = process.env.GIT_REPO || 'osamamedapplearn/Qabas';
const BRANCH = 'main';
const SESSION_TTL_MS = 12 * 3600 * 1000;
const COOKIE_NAME = 'qabas_admin_session';

// --- rate limiting (per instance; best-effort on serverless) ---
const attempts = new Map(); // ip -> { count, firstAt, lockedUntil }
const MAX_TRIES = 8;
const WINDOW_MS = 10 * 60 * 1000;
const LOCK_MS = 30 * 60 * 1000;

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  const raw = Array.isArray(fwd) ? fwd[0] : String(fwd || '').split(',')[0];
  return (raw || req.socket?.remoteAddress || 'unknown').trim();
}

export function loginBlocked(ip) {
  const a = attempts.get(ip);
  if (!a) return 0;
  const now = Date.now();
  if (a.lockedUntil && now < a.lockedUntil) return a.lockedUntil - now;
  if (now - a.firstAt > WINDOW_MS) {
    attempts.delete(ip);
    return 0;
  }
  return 0;
}

export function recordLoginFailure(ip) {
  const now = Date.now();
  const a = attempts.get(ip) || { count: 0, firstAt: now, lockedUntil: 0 };
  if (now - a.firstAt > WINDOW_MS) {
    a.count = 1;
    a.firstAt = now;
    a.lockedUntil = 0;
  } else {
    a.count += 1;
    if (a.count > MAX_TRIES) a.lockedUntil = now + LOCK_MS;
  }
  attempts.set(ip, a);
}

export function clearLoginAttempts(ip) {
  attempts.delete(ip);
}

// --- constant-time string compare ---
function sha256(s) {
  return crypto.createHash('sha256').update(String(s), 'utf8').digest();
}

export function passwordOk(candidate) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected || !candidate) return false;
  const a = sha256(candidate);
  const b = sha256(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// --- sessions ---
function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'qabas-dev-secret';
}

export function issueSession() {
  const expiry = Date.now() + SESSION_TTL_MS;
  const sig = crypto.createHmac('sha256', secret()).update(String(expiry), 'utf8').digest('hex');
  return `${expiry}.${sig}`;
}

export function verifySession(cookieHeader) {
  const m = String(cookieHeader || '').match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!m) return false;
  const [expiry, sig] = m[1].split('.');
  if (!expiry || !sig || Number(expiry) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret()).update(String(expiry), 'utf8').digest('hex');
  const a = Buffer.from(sig, 'utf8');
  const b = Buffer.from(want, 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function sessionCookie(value, { clear = false } = {}) {
  const parts = [`${COOKIE_NAME}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Lax'];
  if (process.env.VERCEL) parts.push('Secure');
  parts.push(clear ? 'Max-Age=0' : `Max-Age=${SESSION_TTL_MS / 1000}`);
  return parts.join('; ');
}

// --- HTTP helpers ---
export function json(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(obj));
}

export function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 8 * 1024 * 1024) reject(new Error('payload-too-large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('invalid-json'));
      }
    });
  });
}

export function requireAuth(req, res) {
  if (!verifySession(req.headers.cookie)) {
    json(res, 401, { error: 'غير مصرح — سجل الدخول أولاً.' });
    return false;
  }
  return true;
}

// Only allow content/*.json reads/writes (plus public/uploads for media)
export function safeContentPath(rel) {
  const p = String(rel || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!p || p.includes('..') || !p.endsWith('.json')) return null;
  if (!p.startsWith('content/')) return null;
  return p;
}

// --- GitHub ---
export async function gh(apiPath, { method = 'GET', body } = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN غير مضبوط على الخادم.');
  const r = await fetch(`https://api.github.com/repos/${REPO}${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.message || `GitHub API error ${r.status}`);
  return j;
}

export async function ghGetFile(repoPath) {
  const j = await gh(`/contents/${repoPath}?ref=${BRANCH}`);
  if (Array.isArray(j) || j.type !== 'file' || !j.content) throw new Error('الملف غير موجود.');
  return { sha: j.sha, text: Buffer.from(j.content, 'base64').toString('utf8') };
}

export { REPO, BRANCH };
