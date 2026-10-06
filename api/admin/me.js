import { json, requireAuth } from './_lib.js';

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  return json(res, 200, { ok: true });
}
