import { json, readBody, requireAuth, safeContentPath, gh, ghGetFile, BRANCH } from './_lib.js';

// POST /api/admin/save {path, data, message} → commits straight to main
// (each save auto-deploys via Vercel — the dashboard History tab shows it).
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
  if (!p) return json(res, 400, { error: 'مسار غير مسموح. يمكن الحفظ داخل content/ فقط.' });
  if (typeof body.data !== 'object' || body.data === null) {
    return json(res, 400, { error: 'بيانات غير صالحة.' });
  }
  try {
    let sha = null;
    try {
      ({ sha } = await ghGetFile(p));
    } catch {
      sha = null; // new file
    }
    const content = Buffer.from(JSON.stringify(body.data, null, 2) + '\n', 'utf8').toString('base64');
    const msg = String(body.message || `تحديث ${p} من لوحة التحكم`).slice(0, 140);
    await gh(`/contents/${p}`, {
      method: 'PUT',
      body: { message: msg, content, branch: BRANCH, ...(sha ? { sha } : {}) },
    });
    return json(res, 200, { ok: true, path: p });
  } catch (e) {
    const msg = /sha|409|does not match/i.test(e.message)
      ? 'تعارض مع تعديل أحدث — أعد تحميل الصفحة وحاول مجدداً.'
      : e.message;
    return json(res, 500, { error: msg });
  }
}
