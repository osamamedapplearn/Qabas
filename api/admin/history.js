import { json, requireAuth, gh, BRANCH, REPO } from './_lib.js';

// GET /api/admin/history → last 10 commits touching content/
export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return json(res, 405, { error: 'GET فقط.' });
  try {
    const commits = await gh(`/commits?sha=${BRANCH}&path=content&per_page=10`);
    return json(res, 200, {
      repo: REPO,
      commits: (Array.isArray(commits) ? commits : []).map((c) => ({
        sha: c.sha?.slice(0, 7),
        message: c.commit?.message?.split('\n')[0],
        date: c.commit?.author?.date,
        author: c.commit?.author?.name,
      })),
    });
  } catch (e) {
    return json(res, 500, { error: e.message || 'تعذر قراءة السجل.' });
  }
}
