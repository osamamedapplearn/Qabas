import { json, readBody, requireAuth, safeContentPath, gh, ghGetFile, BRANCH } from './_lib.js';

// POST /api/admin/remove {path, message}
export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  if (req.method !== 'POST') return json(res, 405, { error: 'POST فقط.' });
  let body;
  try {
    body = await readBody(req);
  } catch {
    return json(res, 400, { error: 'طلب غير صالح.' });
  }
  const p = safeContentPath(body.path);
  if (!p) return json(res, 400, { error: 'مسار غير مسموح.' });
  try {
    const { sha } = await ghGetFile(p);
    const msg = String(body.message || `حذف ${p} من لوحة التحكم`).slice(0, 140);
    await gh(`/contents/${p}`, { method: 'DELETE', body: { message: msg, sha, branch: BRANCH } });
    return json(res, 200, { ok: true });
  } catch (e) {
    return json(res, 500, { error: e.message || 'فشل الحذف.' });
  }
}
