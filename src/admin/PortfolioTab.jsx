import React, { useState } from 'react';
import { Pencil, Plus, Trash2, Eye, EyeOff, Save } from 'lucide-react';
import { PROJECTS, SECTORS, PORTFOLIO_CATEGORIES, portfolioCategoryTitle } from '../content';
import { apiSave, apiDelete } from './api';
import { Field, StringList, UploadButton, YTPreview, inputCls } from './ui';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blank = () => ({
  slug: '',
  title: '',
  sector: 'general',
  category: 'design',
  service: '',
  cover: '',
  summary: '',
  challenge: '',
  solution: '',
  results: [],
  gallery: [],
  videos: [],
  files: [],
  tech: [],
  testimonial: null,
  visible: true,
});

function normalize(p) {
  return {
    ...blank(),
    ...p,
    results: (p.results || []).map((r) => ({ value: r.value || '', label: r.label || '' })),
    gallery: p.gallery || [],
    videos: p.videos || [],
    files: (p.files || []).map((f) => (typeof f === 'string' ? { label: 'ملف مرفق', url: f } : f)),
    tech: p.tech || [],
    testimonial: p.testimonial || null,
    visible: p.visible !== false,
  };
}

export default function PortfolioTab() {
  const [items, setItems] = useState(() => PROJECTS.map(normalize));
  const [editing, setEditing] = useState(null); // normalized project or blank
  const [isNew, setIsNew] = useState(false);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const startNew = () => {
    setEditing(blank());
    setIsNew(true);
    setErrors({});
    setMsg('');
  };
  const startEdit = (p) => {
    setEditing(normalize(p));
    setIsNew(false);
    setErrors({});
    setMsg('');
  };
  const set = (k, v) => setEditing((e) => ({ ...e, [k]: v }));

  const validate = () => {
    const e = {};
    if (!editing.title.trim()) e.title = 'العنوان مطلوب.';
    if (!editing.slug.trim()) e.slug = 'المعرف (slug) مطلوب — حروف إنجليزية صغيرة وأرقام وشرطات فقط.';
    else if (!SLUG_RE.test(editing.slug.trim())) e.slug = 'صيغة غير صالحة — مثال: my-new-design';
    else if (isNew && items.some((x) => x.slug === editing.slug.trim())) e.slug = 'هذا المعرف مستخدم لمشروع آخر.';
    if (!editing.cover.trim()) e.cover = 'صورة الغلاف مطلوبة.';
    if (!editing.summary.trim()) e.summary = 'الملخص مطلوب.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setBusy(true);
    setMsg('');
    try {
      const slug = editing.slug.trim();
      const payload = { ...editing, slug };
      await apiSave(`portfolio/${slug}.json`, payload);
      setItems((prev) => {
        const without = prev.filter((x) => x.slug !== payload.slug);
        return [...without, payload].sort((a, b) => a.slug.localeCompare(b.slug));
      });
      setMsg('تم الحفظ في ملف المحتوى. عاين صفحة الأعمال ثم ادفع للنشر من تبويب النشر.');
      setIsNew(false);
    } catch (ex) {
      setMsg(`فشل الحفظ: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (slug) => {
    if (!window.confirm(`حذف المشروع "${slug}" نهائياً من الموقع؟`)) return;
    setBusy(true);
    try {
      await apiDelete(`portfolio/${slug}.json`);
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      if (editing?.slug === slug) setEditing(null);
      setMsg('تم الحذف. ادفع للنشر من تبويب النشر لتطبيقه على الموقع الحي.');
    } catch (ex) {
      setMsg(`فشل الحذف: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* List */}
      <div className="bg-white rounded-2xl border border-brand-deep/10 p-4 h-fit">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-arabic font-extrabold text-brand-maroon">المشاريع ({items.length})</h3>
          <button onClick={startNew} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-maroon text-white text-sm font-bold hover:bg-brand-red transition-colors">
            <Plus className="w-4 h-4" /> جديد
          </button>
        </div>
        <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
          {items.map((p) => (
            <div key={p.slug} className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${editing?.slug === p.slug ? 'border-brand-teal bg-brand-teal-soft/40' : 'border-brand-deep/10 hover:border-brand-teal/40'}`}>
              <img src={p.cover} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" loading="lazy" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-brand-ink text-sm truncate">{p.title}</div>
                <div className="text-xs text-brand-ink-soft">{portfolioCategoryTitle(p.category)} • {p.slug}</div>
              </div>
              {p.visible ? <Eye className="w-4 h-4 text-brand-teal-dark shrink-0" /> : <EyeOff className="w-4 h-4 text-brand-ink-soft shrink-0" />}
              <button onClick={() => startEdit(p)} aria-label="تعديل" className="p-2 rounded-lg text-brand-teal-dark hover:bg-brand-teal-soft transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(p.slug)} aria-label="حذف" className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-deep/10 p-6">
        {!editing ? (
          <p className="text-brand-ink-soft font-body">اختر مشروعاً للتعديل أو أنشئ مشروعاً جديداً.</p>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="font-arabic font-extrabold text-brand-maroon text-xl">{isNew ? 'مشروع جديد' : `تعديل: ${editing.title}`}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="العنوان" required error={errors.title}>
                <input value={editing.title} onChange={(e) => set('title', e.target.value)} className={inputCls} placeholder="مثال: هوية بصرية لمطعم" />
              </Field>
              <Field label="المعرف (slug)" required error={errors.slug} hint={isNew ? 'يحدد رابط المشروع ولا يتغير بعد النشر.' : 'ثابت للمشاريع المنشورة.'}>
                <input value={editing.slug} disabled={!isNew} onChange={(e) => set('slug', e.target.value)} className={inputCls} dir="ltr" placeholder="my-new-design" />
              </Field>
              <Field label="القطاع">
                <select value={editing.sector} onChange={(e) => set('sector', e.target.value)} className={inputCls}>
                  {SECTORS.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </Field>
              <Field label="التصنيف (يظهر للزوار)">
                <select value={editing.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
                  {PORTFOLIO_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </Field>
            </div>
            <Field label="الخدمة (سطر واحد)">
              <input value={editing.service} onChange={(e) => set('service', e.target.value)} className={inputCls} placeholder="مثال: الهوية البصرية + المونتاج" />
            </Field>
            <Field label="صورة الغلاف" required error={errors.cover}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input value={editing.cover} onChange={(e) => set('cover', e.target.value)} className={inputCls} dir="ltr" placeholder="https://… أو /uploads/…" />
                  <UploadButton label="رفع" onUploaded={(url) => set('cover', url)} />
                </div>
                {editing.cover && <img src={editing.cover} alt="معاينة الغلاف" className="w-40 h-28 object-cover rounded-xl shadow" loading="lazy" />}
              </div>
            </Field>
            <Field label="الملخص" required error={errors.summary}>
              <textarea value={editing.summary} onChange={(e) => set('summary', e.target.value)} className={inputCls} rows={2} />
            </Field>
            <Field label="التحدي">
              <textarea value={editing.challenge} onChange={(e) => set('challenge', e.target.value)} className={inputCls} rows={3} />
            </Field>
            <Field label="الحل">
              <textarea value={editing.solution} onChange={(e) => set('solution', e.target.value)} className={inputCls} rows={3} />
            </Field>
            <Field label="النتائج (قيمة + وصف)">
              <div className="flex flex-col gap-2">
                {editing.results.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={r.value} onChange={(e) => set('results', editing.results.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} className={inputCls} placeholder="+64%" dir="ltr" />
                    <input value={r.label} onChange={(e) => set('results', editing.results.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} className={inputCls} placeholder="نمو الطلبات" />
                    <button type="button" onClick={() => set('results', editing.results.filter((_, j) => j !== i))} aria-label="حذف نتيجة" className="shrink-0 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => set('results', [...editing.results, { value: '', label: '' }])} className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
                  <Plus className="w-4 h-4" /> إضافة نتيجة
                </button>
              </div>
            </Field>
            <Field label="معرض الصور" hint="الصورة الأولى بعد الغلاف تظهر في المعرض.">
              <div className="flex flex-col gap-2">
                <StringList items={editing.gallery} onChange={(v) => set('gallery', v)} placeholder="https://… أو /uploads/…" addLabel="إضافة صورة" />
                <UploadButton label="رفع صورة وإضافتها" onUploaded={(url) => set('gallery', [...editing.gallery, url])} />
              </div>
            </Field>
            <Field label="فيديوهات يوتيوب" hint="الصق رابط المشاهدة أو المشاركة — يُعرض مضمّناً في صفحة المشروع.">
              <div className="flex flex-col gap-3">
                {editing.videos.map((vurl, i) => (
                  <div key={i}>
                    <div className="flex gap-2">
                      <input value={vurl} onChange={(e) => set('videos', editing.videos.map((x, j) => (j === i ? e.target.value : x)))} className={inputCls} dir="ltr" placeholder="https://youtube.com/watch?v=…" />
                      <button type="button" onClick={() => set('videos', editing.videos.filter((_, j) => j !== i))} aria-label="حذف فيديو" className="shrink-0 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <YTPreview url={vurl} />
                  </div>
                ))}
                <button type="button" onClick={() => set('videos', [...editing.videos, ''])} className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
                  <Plus className="w-4 h-4" /> إضافة فيديو
                </button>
              </div>
            </Field>
            <Field label="ملفات مرفقة (PDF / عروض)">
              <div className="flex flex-col gap-2">
                {editing.files.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={f.label} onChange={(e) => set('files', editing.files.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} className={inputCls} placeholder="اسم الملف" />
                    <input value={f.url} onChange={(e) => set('files', editing.files.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} className={inputCls} dir="ltr" placeholder="/uploads/…" />
                    <button type="button" onClick={() => set('files', editing.files.filter((_, j) => j !== i))} aria-label="حذف ملف" className="shrink-0 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button type="button" onClick={() => set('files', [...editing.files, { label: '', url: '' }])} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
                    <Plus className="w-4 h-4" /> إضافة ملف
                  </button>
                  <UploadButton label="رفع ملف وإضافته" accept=".pdf,.zip,.ai,.psd,image/*" onUploaded={(url) => set('files', [...editing.files, { label: 'ملف مرفق', url }])} />
                </div>
              </div>
            </Field>
            <Field label="التقنيات والأدوات">
              <StringList items={editing.tech} onChange={(v) => set('tech', v)} placeholder="مثال: Brand Identity" addLabel="إضافة تقنية" />
            </Field>
            <Field label="رأي العميل (اختياري)">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input value={editing.testimonial?.text || ''} onChange={(e) => set('testimonial', { text: e.target.value, author: editing.testimonial?.author || '' })} className={inputCls} placeholder="نص الرأي — اتركه فارغاً لإخفاء القسم" />
                <input value={editing.testimonial?.author || ''} onChange={(e) => set('testimonial', { text: editing.testimonial?.text || '', author: e.target.value })} className={inputCls} placeholder="اسم القائل" />
              </div>
            </Field>
            <label className="inline-flex items-center gap-2.5 font-bold text-brand-ink cursor-pointer">
              <input type="checkbox" checked={editing.visible} onChange={(e) => set('visible', e.target.checked)} className="w-5 h-5 accent-teal-700" />
              ظاهر على الموقع
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-maroon text-white font-extrabold hover:bg-brand-red transition-colors disabled:opacity-50">
                <Save className="w-5 h-5" /> {busy ? 'جارٍ الحفظ…' : 'حفظ'}
              </button>
              {msg && <span className="text-sm font-bold text-brand-teal-dark">{msg}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
