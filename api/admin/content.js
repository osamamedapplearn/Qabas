import { json, requireAuth, safeContentPath, gh, ghGetFile, BRANCH } from './_lib.js';

// GET /api/admin/content?list=portfolio|posts  → [{name}]
// GET /api/admin/content?path=content/portfolio/x.json → {path, data}
export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return json(res, 405, { error: 'GET فقط.' });
  const url = new URL(req.url, 'http://localhost');
  try {
    const list = url.searchParams.get('list');
    if (list === 'portfolio' || list === 'posts') {
      const items = await gh(`/contents/content/${list}?ref=${BRANCH}`);
      const names = (Array.isArray(items) ? items : [])
        .filter((f) => f.type === 'file' && f.name.endsWith('.json'))
        .map((f) => f.name)
        .sort();
      return json(res, 200, { files: names });
    }
    const p = safeContentPath(url.searchParams.get('path'));
    if (!p) return json(res, 400, { error: 'مسار غير مسموح.' });
    const { text } = await ghGetFile(p);
    return json(res, 200, { path: p, data: JSON.parse(text) });
  } catch (e) {
    return json(res, 500, { error: e.message || 'تعذر قراءة المحتوى.' });
  }
}
