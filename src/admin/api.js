// Tiny fetch client for the LOCAL admin API (/__admin/*).
// These endpoints exist only while `vite dev` runs on your own PC.
async function req(url, opts) {
  const r = await fetch(url, opts);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'خطأ غير متوقع من الخادم المحلي');
  return j;
}

export const apiStatus = () => req('/__admin/status');

export const apiSave = (path, data) =>
  req('/__admin/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, data }),
  });

export const apiDelete = (path) =>
  req('/__admin/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  });

export const apiUpload = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذر قراءة الملف'));
    reader.onload = async () => {
      try {
        const j = await req('/__admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: file.name, base64: String(reader.result) }),
        });
        resolve(j);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsDataURL(file);
  });

export const apiPush = (message) =>
  req('/__admin/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
