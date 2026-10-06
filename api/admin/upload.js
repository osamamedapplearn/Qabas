import path from 'node:path';
import { json, readBody, requireAuth, gh, BRANCH } from './_lib.js';

const MAX_BYTES = 4 * 1024 * 1024;

// POST /api/admin/upload {name, base64} → public/uploads/<unique-name>
export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  if (req.method !== 'POST') return json(res, 405, { error: 'POST فقط.' });
  let body;
  try {
    body = await readBody(req);
  } catch {
    return json(res, 400, { error: 'طلب غير صالح.' });
  }
  const buf = Buffer.from(String(body.base64 || '').split(',').pop() || '', 'base64');
  if (!buf.length || buf.length > MAX_BYTES) {
    return json(res, 400, { error: 'حجم الملف يتجاوز الحد (4MB) أو الملف فارغ.' });
  }
  const safeName = path.basename(String(body.name || 'file')).replace(/[^\w.\-()[\] ]/g, '_');
  if (!safeName || safeName === '.' || safeName === '..') return json(res, 400, { error: 'اسم ملف غير صالح.' });
  try {
    const ext = path.extname(safeName);
    const stem = path.basename(safeName, ext);
    let name = safeName;
    let i = 1;
    for (;;) {
      try {
        await gh(`/contents/public/uploads/${encodeURIComponent(name)}?ref=${BRANCH}`);
        name = `${stem}-${i}${ext}`;
        i += 1;
        if (i > 50) throw new Error('تعذر إيجاد اسم متاح.');
      } catch (e) {
        if (String(e.message).includes('تعذر إيجاد اسم')) throw e;
        break; // 404 → name is free
      }
    }
    await gh(`/contents/public/uploads/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: {
        message: `رفع ${name} من لوحة التحكم`,
        content: buf.toString('base64'),
        branch: BRANCH,
      },
    });
    return json(res, 200, { ok: true, url: `/uploads/${name}` });
  } catch (e) {
    return json(res, 500, { error: e.message || 'فشل الرفع.' });
  }
}
