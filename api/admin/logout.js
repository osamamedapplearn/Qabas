import { json, sessionCookie } from './_lib.js';

export default async function handler(req, res) {
  res.setHeader('Set-Cookie', sessionCookie('', { clear: true }));
  return json(res, 200, { ok: true });
}
