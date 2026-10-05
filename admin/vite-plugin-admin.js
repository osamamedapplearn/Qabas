// Local-only admin API for the Qabas dashboard.
//
// This Vite plugin exposes /__admin/* endpoints that read/write the
// content/*.json files and public/uploads/ on YOUR machine.
// It is wired through `configureServer`, which means:
//   - it runs ONLY during `vite dev` (local editing)
//   - it is NEVER included in `vite build` output
//   - the production site has no write capability at all
//
// Endpoints:
//   GET  /__admin/status            → { changed: [...], branch }
//   POST /__admin/save   {path, data} → writes content/<path> (JSON)
//   POST /__admin/delete {path}      → deletes content/<path>
//   POST /__admin/upload {name, base64, dir} → saves file, returns {url}
//   POST /__admin/push   {message}   → git add + commit + push
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(obj));
}

function readJsonBody(req) {
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

// Only allow writes inside content/ (*.json) or public/uploads/*
function safeContentPath(rel) {
  const p = path.normalize(String(rel || ''));
  if (p.includes('..') || path.isAbsolute(p)) return null;
  if (!p.endsWith('.json')) return null;
  const abs = path.join(CONTENT_DIR, p);
  return abs.startsWith(CONTENT_DIR) ? abs : null;
}

function git(args) {
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd: ROOT, timeout: 60000 }, (err, stdout, stderr) => {
      if (err) reject(new Error(stderr.trim() || err.message));
      else resolve(stdout.trim());
    });
  });
}

export function qabasAdminApi() {
  return {
    name: 'qabas-admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__admin', async (req, res) => {
        try {
          if (req.method === 'GET' && req.url === '/status') {
            const out = await git(['status', '--porcelain', '--', 'content', 'public/uploads']).catch(() => '');
            const branch = await git(['branch', '--show-current']).catch(() => '');
            return send(res, 200, { branch, changed: out.split('\n').map((l) => l.trim()).filter(Boolean) });
          }

          if (req.method === 'POST' && (req.url === '/save' || req.url === '/delete' || req.url === '/upload' || req.url === '/push')) {
            const body = await readJsonBody(req);

            if (req.url === '/save') {
              const abs = safeContentPath(body.path);
              if (!abs) return send(res, 400, { error: 'مسار غير مسموح. يمكن الحفظ داخل content/ فقط.' });
              fs.mkdirSync(path.dirname(abs), { recursive: true });
              fs.writeFileSync(abs, JSON.stringify(body.data, null, 2) + '\n', 'utf-8');
              return send(res, 200, { ok: true, path: body.path });
            }

            if (req.url === '/delete') {
              const abs = safeContentPath(body.path);
              if (!abs) return send(res, 400, { error: 'مسار غير مسموح.' });
              if (!fs.existsSync(abs)) return send(res, 404, { error: 'الملف غير موجود.' });
              fs.unlinkSync(abs);
              return send(res, 200, { ok: true });
            }

            if (req.url === '/upload') {
              const buf = Buffer.from(String(body.base64 || '').split(',').pop() || '', 'base64');
              if (!buf.length || buf.length > MAX_UPLOAD_BYTES) {
                return send(res, 400, { error: 'حجم الملف يتجاوز الحد (4MB) أو الملف فارغ.' });
              }
              const safeName = path.basename(String(body.name || 'file')).replace(/[^\w.\-()[\] ]/g, '_');
              if (!safeName || safeName === '.' || safeName === '..') return send(res, 400, { error: 'اسم ملف غير صالح.' });
              fs.mkdirSync(UPLOADS_DIR, { recursive: true });
              let name = safeName;
              let i = 1;
              while (fs.existsSync(path.join(UPLOADS_DIR, name))) {
                const ext = path.extname(safeName);
                name = `${path.basename(safeName, ext)}-${i}${ext}`;
                i += 1;
              }
              fs.writeFileSync(path.join(UPLOADS_DIR, name), buf);
              return send(res, 200, { ok: true, url: `/uploads/${name}` });
            }

            if (req.url === '/push') {
              const msg = String(body.message || 'تحديث المحتوى من لوحة التحكم').slice(0, 120) || 'تحديث المحتوى من لوحة التحكم';
              await git(['add', '--', 'content', 'public/uploads']);
              const status = await git(['status', '--porcelain', '--', 'content', 'public/uploads']);
              if (!status) return send(res, 200, { ok: true, pushed: false, note: 'لا توجد تغييرات للنشر.' });
              await git(['commit', '-m', msg]);
              await git(['push']);
              return send(res, 200, { ok: true, pushed: true });
            }
          }

          return send(res, 404, { error: 'غير موجود' });
        } catch (e) {
          return send(res, 500, { error: e.message || 'خطأ في الخادم المحلي' });
        }
      });
    },
  };
}
