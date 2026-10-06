import {
  json, readBody, clientIp, loginBlocked, recordLoginFailure,
  clearLoginAttempts, passwordOk, issueSession, sessionCookie,
} from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'POST فقط.' });
  const ip = clientIp(req);
  const waitMs = loginBlocked(ip);
  if (waitMs > 0) {
    return json(res, 429, { error: `محاولات كثيرة — حاول بعد ${Math.ceil(waitMs / 60000)} دقيقة.` });
  }
  let body;
  try {
    body = await readBody(req);
  } catch {
    return json(res, 400, { error: 'طلب غير صالح.' });
  }
  if (!passwordOk(body.password)) {
    recordLoginFailure(ip);
    // Same message either way: never reveal whether the password exists.
    return json(res, 401, { error: 'رمز الدخول غير صحيح.' });
  }
  clearLoginAttempts(ip);
  res.setHeader('Set-Cookie', sessionCookie(issueSession()));
  return json(res, 200, { ok: true });
}
