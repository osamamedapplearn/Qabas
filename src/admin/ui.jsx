import React, { useRef, useState } from 'react';
import { Plus, Trash2, UploadCloud } from 'lucide-react';
import { youtubeIdFromUrl } from '../content';
import { apiUpload } from './api';

export const inputCls =
  'w-full p-3 rounded-xl border border-brand-deep/20 bg-white text-brand-ink font-body focus:outline-none focus:border-brand-teal font-medium';

export function Field({ label, children, hint, error, required }) {
  return (
    <label className="block">
      <span className="block font-bold text-brand-ink mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-brand-ink-soft mt-1">{hint}</span>}
      {error && (
        <span role="alert" className="block text-xs font-bold text-red-600 mt-1">
          {error}
        </span>
      )}
    </label>
  );
}

export function StringList({ items = [], onChange, placeholder = '', addLabel = 'إضافة' }) {
  const add = () => onChange([...(items || []), '']);
  const set = (i, v) => onChange((items || []).map((x, j) => (j === i ? v : x)));
  const del = (i) => onChange((items || []).filter((_, j) => j !== i));
  return (
    <div className="flex flex-col gap-2">
      {(items || []).map((v, i) => (
        <div key={i} className="flex gap-2">
          <input value={v} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} className={inputCls} />
          <button type="button" onClick={() => del(i)} aria-label="حذف" className="shrink-0 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
        <Plus className="w-4 h-4" /> {addLabel}
      </button>
    </div>
  );
}

export function UploadButton({ onUploaded, accept = 'image/*', label = 'رفع ملف' }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const pick = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) {
      setErr('الملف أكبر من 4MB — صغّره أو استخدم رابطاً خارجياً.');
      return;
    }
    setBusy(true);
    setErr('');
    try {
      const j = await apiUpload(f);
      onUploaded(j.url);
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <span className="inline-flex flex-col gap-1">
      <button type="button" disabled={busy} onClick={() => ref.current?.click()}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-brand-deep/20 text-sm font-bold text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all disabled:opacity-50">
        <UploadCloud className="w-4 h-4" /> {busy ? 'جارٍ الرفع…' : label}
      </button>
      <input ref={ref} type="file" accept={accept} onChange={pick} className="hidden" />
      {err && (
        <span role="alert" className="text-xs font-bold text-red-600">
          {err}
        </span>
      )}
    </span>
  );
}

export function YTPreview({ url }) {
  const id = youtubeIdFromUrl(url);
  if (!url) return null;
  if (!id) return <span className="text-xs font-bold text-red-600">رابط يوتيوب غير صالح — انسخ رابط المشاهدة أو المشاركة.</span>;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-3 mt-2 group w-fit">
      <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt="معاينة الفيديو" loading="lazy"
        className="w-32 aspect-video object-cover rounded-xl shadow group-hover:shadow-lg transition-shadow" />
      <span className="text-xs font-bold text-brand-teal-dark group-hover:underline">معاينة الفيديو ↗</span>
    </a>
  );
}
