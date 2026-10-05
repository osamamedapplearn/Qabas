import React, { useState } from 'react';
import { Pencil, Plus, Trash2, Save } from 'lucide-react';
import { POSTS, POST_CATEGORIES } from '../content';
import { apiSave, apiDelete } from './api';
import { Field, StringList, UploadButton, YTPreview, inputCls } from './ui';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CTYPES = [
  { id: 'article', title: 'مقال' },
  { id: 'tutorial', title: 'شرح / درس' },
  { id: 'video', title: 'فيديو' },
  { id: 'photo', title: 'صور' },
];

const SIMPLE_KINDS = ['h', 'p', 'quote'];

function splitBody(body = []) {
  const simple = [];
  const advanced = [];
  for (const b of body) {
    const keys = Object.keys(b);
    if (keys.length === 1 && SIMPLE_KINDS.includes(keys[0])) simple.push({ kind: keys[0], text: b[keys[0]] });
    else advanced.push(b);
  }
  return { simple, advanced };
}

const blank = () => ({
  slug: '',
  title: '',
  excerpt: '',
  cover: '',
  category: 'general',
  ctype: 'article',
  date: new Date().toISOString().slice(0, 10),
  readTime: '5 دقائق',
  author: 'فريق قبس',
  role: '',
  tags: [],
  videoUrl: '',
  gallery: [],
  cta: { title: '', message: '' },
  simple: [{ kind: 'p', text: '' }],
  advancedRaw: '[]',
});

function normalize(p) {
  const { simple, advanced } = splitBody(p.body);
  return {
    slug: p.slug || '',
    title: p.title || '',
    excerpt: p.excerpt || '',
    cover: p.cover || '',
    category: p.category || 'general',
    ctype: p.ctype || 'article',
    date: p.date || '',
    readTime: p.readTime || '',
    author: p.author || 'فريق قبس',
    role: p.role || '',
    tags: p.tags || [],
    videoUrl: p.videoUrl || '',
    gallery: p.gallery || [],
    cta: p.cta || { title: '', message: '' },
    simple: simple.length ? simple : [{ kind: 'p', text: '' }],
    advancedRaw: JSON.stringify(advanced, null, 2),
  };
}

export default function ContentTab() {
  const cats = POST_CATEGORIES.filter((c) => c.id !== 'all');
  const [items, setItems] = useState(() => POSTS.map(normalize));
  const [editing, setEditing] = useState(null);
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
    if (!editing.slug.trim()) e.slug = 'المعرف (slug) مطلوب.';
    else if (!SLUG_RE.test(editing.slug.trim())) e.slug = 'صيغة غير صالحة — مثال: my-new-post';
    else if (isNew && items.some((x) => x.slug === editing.slug.trim())) e.slug = 'هذا المعرف مستخدم لمنشور آخر.';
    if (!editing.cover.trim()) e.cover = 'صورة الغلاف مطلوبة.';
    if (!editing.excerpt.trim()) e.excerpt = 'المقتطف مطلوب.';
    if (editing.ctype === 'video' && !editing.videoUrl.trim()) e.videoUrl = 'منشور الفيديو يحتاج رابط يوتيوب.';
    try {
      const adv = JSON.parse(editing.advancedRaw || '[]');
      if (!Array.isArray(adv)) throw new Error('array');
    } catch {
      e.advancedRaw = 'كتل JSON غير صالحة — يجب أن تكون مصفوفة [...].';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setBusy(true);
    setMsg('');
    try {
      const slug = editing.slug.trim();
      const payload = {
        slug,
        title: editing.title.trim(),
        excerpt: editing.excerpt.trim(),
        cover: editing.cover.trim(),
        category: editing.category,
        ctype: editing.ctype,
        date: editing.date,
        readTime: editing.readTime,
        author: editing.author,
        role: editing.role,
        tags: editing.tags.filter((t) => t.trim()),
        videoUrl: editing.videoUrl.trim() || null,
        gallery: editing.gallery.filter((g) => g.trim()),
        cta: editing.cta,
        body: [
          ...editing.simple.filter((b) => b.text.trim()).map((b) => ({ [b.kind]: b.text })),
          ...JSON.parse(editing.advancedRaw || '[]'),
        ],
      };
      await apiSave(`posts/${slug}.json`, payload);
      setItems((prev) => [...prev.filter((x) => x.slug !== slug), normalize(payload)].sort((a, b) => String(b.date).localeCompare(String(a.date))));
      setMsg('تم الحفظ. عاين المدونة ثم ادفع للنشر من تبويب النشر.');
      setIsNew(false);
    } catch (ex) {
      setMsg(`فشل الحفظ: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (slug) => {
    if (!window.confirm(`حذف المنشور "${slug}" نهائياً من المدونة؟`)) return;
    setBusy(true);
    try {
      await apiDelete(`posts/${slug}.json`);
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      if (editing?.slug === slug) setEditing(null);
      setMsg('تم الحذف. ادفع للنشر لتطبيقه على الموقع الحي.');
    } catch (ex) {
      setMsg(`فشل الحذف: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl border border-brand-deep/10 p-4 h-fit">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-arabic font-extrabold text-brand-maroon">المنشورات ({items.length})</h3>
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
                <div className="text-xs text-brand-ink-soft">{CTYPES.find((c) => c.id === p.ctype)?.title} • {p.date}</div>
              </div>
              <button onClick={() => startEdit(p)} aria-label="تعديل" className="p-2 rounded-lg text-brand-teal-dark hover:bg-brand-teal-soft transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(p.slug)} aria-label="حذف" className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-deep/10 p-6">
        {!editing ? (
          <p className="text-brand-ink-soft font-body">اختر منشوراً للتعديل أو أنشئ منشوراً جديداً (مقال / شرح / فيديو / صور).</p>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="font-arabic font-extrabold text-brand-maroon text-xl">{isNew ? 'منشور جديد' : `تعديل: ${editing.title}`}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="العنوان" required error={errors.title}>
                <input value={editing.title} onChange={(e) => set('title', e.target.value)} className={inputCls} />
              </Field>
              <Field label="المعرف (slug)" required error={errors.slug}>
                <input value={editing.slug} disabled={!isNew} onChange={(e) => set('slug', e.target.value)} className={inputCls} dir="ltr" placeholder="my-new-post" />
              </Field>
              <Field label="النوع">
                <select value={editing.ctype} onChange={(e) => set('ctype', e.target.value)} className={inputCls}>
                  {CTYPES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </Field>
              <Field label="التصنيف">
                <select value={editing.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
                  {cats.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </Field>
              <Field label="التاريخ">
                <input type="date" value={editing.date} onChange={(e) => set('date', e.target.value)} className={inputCls} dir="ltr" />
              </Field>
              <Field label="مدة القراءة">
                <input value={editing.readTime} onChange={(e) => set('readTime', e.target.value)} className={inputCls} placeholder="5 دقائق" />
              </Field>
              <Field label="الكاتب">
                <input value={editing.author} onChange={(e) => set('author', e.target.value)} className={inputCls} />
              </Field>
              <Field label="دور الكاتب">
                <input value={editing.role} onChange={(e) => set('role', e.target.value)} className={inputCls} placeholder="استوديو المحتوى" />
              </Field>
            </div>
            <Field label="المقتطف" required error={errors.excerpt}>
              <textarea value={editing.excerpt} onChange={(e) => set('excerpt', e.target.value)} className={inputCls} rows={2} />
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
            {(editing.ctype === 'video' || editing.videoUrl) && (
              <Field label="رابط يوتيوب" required={editing.ctype === 'video'} error={errors.videoUrl}>
                <input value={editing.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} className={inputCls} dir="ltr" placeholder="https://youtube.com/watch?v=…" />
                <YTPreview url={editing.videoUrl} />
              </Field>
            )}
            {editing.ctype === 'video' && !editing.videoUrl && (
              <Field label="رابط يوتيوب" required error={errors.videoUrl}>
                <input value={editing.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} className={inputCls} dir="ltr" placeholder="https://youtube.com/watch?v=…" />
              </Field>
            )}
            {(editing.ctype === 'photo' || editing.gallery.length > 0) && (
              <Field label="معرض الصور">
                <div className="flex flex-col gap-2">
                  <StringList items={editing.gallery} onChange={(v) => set('gallery', v)} placeholder="https://… أو /uploads/…" addLabel="إضافة صورة" />
                  <UploadButton label="رفع صورة وإضافتها" onUploaded={(url) => set('gallery', [...editing.gallery, url])} />
                </div>
              </Field>
            )}
            <Field label="الوسوم">
              <StringList items={editing.tags} onChange={(v) => set('tags', v)} placeholder="مثال: تصميم" addLabel="إضافة وسم" />
            </Field>
            <Field label="فقرات المحتوى" hint="عنوان فرعي / فقرة / اقتباس. تُحفظ بالترتيب.">
              <div className="flex flex-col gap-2">
                {editing.simple.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <select value={b.kind} onChange={(e) => set('simple', editing.simple.map((x, j) => (j === i ? { ...x, kind: e.target.value } : x)))} className={`${inputCls} !w-32 shrink-0`}>
                      <option value="h">عنوان</option>
                      <option value="p">فقرة</option>
                      <option value="quote">اقتباس</option>
                    </select>
                    <textarea value={b.text} onChange={(e) => set('simple', editing.simple.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))} className={inputCls} rows={2} />
                    <button type="button" onClick={() => set('simple', editing.simple.filter((_, j) => j !== i))} aria-label="حذف فقرة" className="shrink-0 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 self-start"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => set('simple', [...editing.simple, { kind: 'p', text: '' }])} className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
                  <Plus className="w-4 h-4" /> إضافة فقرة
                </button>
              </div>
            </Field>
            <Field label="كتل متقدمة (إحصائيات / صور / خلاصات) — JSON" error={errors.advancedRaw} hint="للمستخدم المتقدم فقط. اترك [] كما هي إن لم تحتجها.">
              <textarea value={editing.advancedRaw} onChange={(e) => set('advancedRaw', e.target.value)} className={`${inputCls} font-mono !text-xs`} rows={4} dir="ltr" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="عنوان زر الاستشارة">
                <input value={editing.cta.title} onChange={(e) => set('cta', { ...editing.cta, title: e.target.value })} className={inputCls} />
              </Field>
              <Field label="رسالة واتساب للزر">
                <input value={editing.cta.message} onChange={(e) => set('cta', { ...editing.cta, message: e.target.value })} className={inputCls} />
              </Field>
            </div>
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
