// Transport client for the admin dashboard.
//
// Two modes, same UI:
// - LOCAL  (npm run admin on your PC): talks to /__admin/* served by the
//          Vite dev plugin. No server login needed (localhost only).
// - CLOUD  (production build with VITE_CLOUD_ADMIN=true): talks to
//          /api/admin/* serverless functions. Every call carries the
//          HttpOnly session cookie issued by the password login.
export const CLOUD = import.meta.env.VITE_CLOUD_ADMIN === 'true';

const LOCAL_BASE = '/__admin';
const CLOUD_BASE = '/api/admin';

async function req(url, opts, op) {
  const r = await fetch(url, opts);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401 && CLOUD) {
      sessionStorage.removeItem('qabas-cloud-auth');
      throw new Error('AUTH_REQUIRED');
    }
    throw new Error(j.error || 'خطأ غير متوقع');
  }
  return j;
}

const post = (base, route, payload) =>
  req(`${base}${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload || {}),
  });

// --- session ---
export const cloudLogin = (password) => post(CLOUD_BASE, '/login', { password });
export const cloudLogout = () => post(CLOUD_BASE, '/logout', {});
export const cloudMe = () => req(`${CLOUD_BASE}/me`);

// --- status / history ---
export const apiStatus = () => (CLOUD ? cloudHistory() : req(`${LOCAL_BASE}/status`));

async function cloudHistory() {
  const j = await req(`${CLOUD_BASE}/history`);
  return {
    cloud: true,
    commits: j.commits || [],
    changed: [], // cloud saves deploy immediately — nothing staged
  };
}

export const apiHistory = () => (CLOUD ? req(`${CLOUD_BASE}/history`) : Promise.resolve({ commits: [] }));

// --- save / delete ---
export const apiSave = (path, data) =>
  CLOUD
    ? post(CLOUD_BASE, '/save', { path, data })
    : post(LOCAL_BASE, '/save', { path, data });

export const apiDelete = (path) =>
  CLOUD
    ? post(CLOUD_BASE, '/remove', { path })
    : post(LOCAL_BASE, '/delete', { path });

// --- upload (base64, 4MB cap enforced server-side in both modes) ---
export const apiUpload = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذر قراءة الملف'));
    reader.onload = async () => {
      try {
        const j = await (CLOUD
          ? post(CLOUD_BASE, '/upload', { name: file.name, base64: String(reader.result) })
          : post(LOCAL_BASE, '/upload', { name: file.name, base64: String(reader.result) }));
        resolve(j);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsDataURL(file);
  });

// --- publish (local only: git push. Cloud saves deploy on every save.) ---
export const apiPush = (message) => {
  if (CLOUD) return Promise.reject(new Error('النشر تلقائي في الوضع السحابي — كل حفظ يُنشر مباشرة.'));
  return post(LOCAL_BASE, '/push', { message });
};
