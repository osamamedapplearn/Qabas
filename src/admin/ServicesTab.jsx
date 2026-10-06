import React, { useState } from 'react';
import { Pencil, Plus, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { SERVICES_CATALOG, PORTFOLIO_CATEGORIES, PRICING_CONTENT } from '../content';
import { apiSave } from './api';
import { Field, inputCls } from './ui';

// Brief option keys pre-selected for new visitors in Brief.jsx —
// removing or renaming one of these breaks the form defaults.
const PROTECTED_BRIEF_KEYS = ['تصميم وهوية بصرية', 'مواقع إلكترونية وبرمجة'];

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const LUCIDE_ICONS = ['Palette', 'PenTool', 'Video', 'Globe', 'Bot', 'Megaphone', 'Camera', 'Target', 'Compass', 'Sparkles', 'Zap'];

const FA_ICONS = [
  'fa-bezier-curve', 'fa-film', 'fa-camera-retro', 'fa-code', 'fa-hashtag',
  'fa-bullhorn', 'fa-robot', 'fa-chess-knight', 'fa-wand-magic-sparkles',
  'fa-pen-nib', 'fa-palette', 'fa-video', 'fa-globe', 'fa-bullseye', 'fa-star', 'fa-circle',
];

const blank = () => ({
  id: '',
  title: '',
  desc: '',
  homeTitle: '',
  homeDesc: '',
  icon: 'Sparkles',
  briefKey: '',
  briefIcon: 'fa-star',
  portfolioCategory: 'other',
  pricingPackage: '',
  price: null,
  priceNote: 'custom',
  show: { home: false, brief: true },
  visible: true,
});

export default function ServicesTab() {
  const [items, setItems] = useState(() => JSON.parse(JSON.stringify(SERVICES_CATALOG)));
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [origBriefKey, setOrigBriefKey] = useState('');
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const packageNames = [
    ...PRICING_CONTENT.packages.map((p) => p.name),
    PRICING_CONTENT.featured.name,
  ];

  const startNew = () => {
    setEditing(blank());
    setIsNew(true);
    setOrigBriefKey('');
    setErrors({});
    setMsg('');
  };
  const startEdit = (s) => {
    setEditing(JSON.parse(JSON.stringify({ show: { home: false, brief: false }, ...s })));
    setIsNew(false);
    setOrigBriefKey(s.briefKey || '');
    setErrors({});
    setMsg('');
  };
  const set = (k, v) => setEditing((e) => ({ ...e, [k]: v }));

  const validate = (list) => {
    const e = {};
    if (!editing.title.trim()) e.title = 'اسم الخدمة مطلوب.';
    if (!editing.id.trim()) e.id = 'المعرف مطلوب — حروف إنجليزية صغيرة وشرطات فقط.';
    else if (!ID_RE.test(editing.id.trim())) e.id = 'صيغة غير صالحة — مثال: motion-graphics';
    else if (isNew && list.some((x) => x.id === editing.id.trim())) e.id = 'هذا المعرف مستخدم لخدمة أخرى.';
    const bk = editing.briefKey.trim();
    if (bk && list.some((x) => x.id !== editing.id && (x.briefKey || '') === bk)) e.briefKey = 'مفتاح البريف مستخدم في خدمة أخرى — يجب أن يكون فريداً.';
    // Protect Brief form defaults
    if (PROTECTED_BRIEF_KEYS.includes(origBriefKey)) {
      const stillThere = bk === origBriefKey && editing.show.brief && editing.visible;
      if (!stillThere) e.protected = 'هذه الخدمة محددة كاختيار افتراضي في نموذج البريف — لا يمكن إخفاؤها أو تغيير مفتاحها. عدّل نصوصها فقط.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    const list = items;
    if (!validate(list)) return;
    setBusy(true);
    setMsg('');
    try {
      const payload = {
        ...editing,
        id: editing.id.trim(),
        title: editing.title.trim(),
        briefKey: editing.briefKey.trim() || null,
        pricingPackage: editing.pricingPackage || null,
      };
      const next = isNew ? [...list, payload] : list.map((x) => (x.id === payload.id ? payload : x));
      await apiSave('services.json', next);
      setItems(next);
      setMsg('تم الحفظ. التغيير يظهر على الرئيسية ونموذج البريف معاً بعد النشر.');
      setIsNew(false);
      setOrigBriefKey(payload.briefKey || '');
    } catch (ex) {
      setMsg(`فشل الحفظ: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    const target = items.find((x) => x.id === id);
    if (target && PROTECTED_BRIEF_KEYS.includes(target.briefKey)) {
      setMsg('لا يمكن حذف هذه الخدمة — مستخدمة كاختيار افتراضي في نموذج البريف.');
      return;
    }
    if (!window.confirm(`حذف الخدمة "${target?.title}" من الموقع؟`)) return;
    setBusy(true);
    try {
      const next = items.filter((x) => x.id !== id);
      await apiSave('services.json', next);
      setItems(next);
      if (editing?.id === id) setEditing(null);
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
          <h3 className="font-arabic font-extrabold text-brand-maroon">الخدمات ({items.length})</h3>
          <button onClick={startNew} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-maroon text-white text-sm font-bold hover:bg-brand-red transition-colors">
            <Plus className="w-4 h-4" /> جديدة
          </button>
        </div>
        <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
          {items.map((s) => (
            <div key={s.id} className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${editing?.id === s.id ? 'border-brand-teal bg-brand-teal-soft/40' : 'border-brand-deep/10 hover:border-brand-teal/40'}`}>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-brand-ink text-sm truncate">{s.title}</div>
                <div className="text-xs text-brand-ink-soft">
                  {s.show?.home ? 'رئيسية' : ''}{s.show?.home && s.show?.brief ? ' • ' : ''}{s.show?.brief ? 'بريف' : ''}{!s.show?.home && !s.show?.brief ? 'مخفية' : ''}
                </div>
              </div>
              {PROTECTED_BRIEF_KEYS.includes(s.briefKey) && (
                <span className="text-[10px] font-extrabold text-brand-amber bg-brand-amber-soft px-2 py-0.5 rounded-full shrink-0">افتراضية</span>
              )}
              {s.visible ? <Eye className="w-4 h-4 text-brand-teal-dark shrink-0" /> : <EyeOff className="w-4 h-4 text-brand-ink-soft shrink-0" />}
              <button onClick={() => startEdit(s)} aria-label="تعديل" className="p-2 rounded-lg text-brand-teal-dark hover:bg-brand-teal-soft transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(s.id)} aria-label="حذف" className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-deep/10 p-6">
        {!editing ? (
          <p className="text-brand-ink-soft font-body">اختر خدمة للتعديل أو أنشئ خدمة جديدة — التعديل هنا ينعكس على الرئيسية والبريف معاً.</p>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="font-arabic font-extrabold text-brand-maroon text-xl">{isNew ? 'خدمة جديدة' : `تعديل: ${editing.title}`}</h3>
            {errors.protected && <p role="alert" className="text-sm font-bold text-red-600 bg-red-50 rounded-xl px-4 py-3">{errors.protected}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="اسم الخدمة" required error={errors.title}>
                <input value={editing.title} onChange={(e) => set('title', e.target.value)} className={inputCls} placeholder="مثال: موشن جرافيك" />
              </Field>
              <Field label="المعرف (id)" required error={errors.id} hint="ثابت بعد الإنشاء — يربط الخدمة بالأسعار والأعمال.">
                <input value={editing.id} disabled={!isNew} onChange={(e) => set('id', e.target.value)} className={inputCls} dir="ltr" placeholder="motion-graphics" />
              </Field>
            </div>
            <Field label="الوصف المختصر (يظهر في البريف)">
              <textarea value={editing.desc} onChange={(e) => set('desc', e.target.value)} className={inputCls} rows={2} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="عنوان الرئيسية (إن اختلف)">
                <input value={editing.homeTitle} onChange={(e) => set('homeTitle', e.target.value)} className={inputCls} placeholder="يستخدم اسم الخدمة عند تركه فارغاً" />
              </Field>
              <Field label="أيقونة الرئيسية">
                <select value={editing.icon} onChange={(e) => set('icon', e.target.value)} className={inputCls}>
                  {LUCIDE_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </Field>
            </div>
            <Field label="وصف الرئيسية (إن اختلف)">
              <textarea value={editing.homeDesc} onChange={(e) => set('homeDesc', e.target.value)} className={inputCls} rows={2} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="مفتاح البريف" error={errors.briefKey} hint="اتركه فارغاً لإخفاء الخدمة من نموذج البريف. يجب أن يكون فريداً وثابتاً.">
                <input value={editing.briefKey} onChange={(e) => set('briefKey', e.target.value)} className={inputCls} placeholder="مثال: موشن جرافيك" />
              </Field>
              <Field label="أيقونة البريف">
                <select value={editing.briefIcon} onChange={(e) => set('briefIcon', e.target.value)} className={inputCls} dir="ltr">
                  {FA_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </Field>
              <Field label="تصنيف الأعمال المرتبط">
                <select value={editing.portfolioCategory} onChange={(e) => set('portfolioCategory', e.target.value)} className={inputCls}>
                  {PORTFOLIO_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </Field>
              <Field label="باقة الأسعار المرتبطة">
                <select value={editing.pricingPackage || ''} onChange={(e) => set('pricingPackage', e.target.value)} className={inputCls}>
                  <option value="">— بدون ربط —</option>
                  {packageNames.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="سعر الخدمة (ج.م)" hint="اتركه فارغاً لعرض «يُحدد حسب المشروع».">
                <input
                  type="number"
                  min="0"
                  value={editing.price ?? ''}
                  onChange={(e) => set('price', e.target.value === '' ? null : Math.max(0, Number(e.target.value) || 0))}
                  className={inputCls}
                  dir="ltr"
                  placeholder="مثال: 7000"
                />
              </Field>
              <Field label="صيغة عرض السعر">
                <select value={editing.priceNote || 'custom'} onChange={(e) => set('priceNote', e.target.value)} className={inputCls}>
                  <option value="from">تبدأ من …</option>
                  <option value="fixed">سعر ثابت</option>
                  <option value="custom">يُحدد حسب المشروع</option>
                </select>
              </Field>
            </div>
            <div className="flex flex-wrap gap-5">
              <label className="inline-flex items-center gap-2.5 font-bold text-brand-ink cursor-pointer">
                <input type="checkbox" checked={!!editing.show?.home} onChange={(e) => set('show', { ...editing.show, home: e.target.checked })} className="w-5 h-5 accent-teal-700" />
                تظهر على الرئيسية
              </label>
              <label className="inline-flex items-center gap-2.5 font-bold text-brand-ink cursor-pointer">
                <input type="checkbox" checked={!!editing.show?.brief} onChange={(e) => set('show', { ...editing.show, brief: e.target.checked })} className="w-5 h-5 accent-teal-700" />
                تظهر في نموذج البريف
              </label>
              <label className="inline-flex items-center gap-2.5 font-bold text-brand-ink cursor-pointer">
                <input type="checkbox" checked={editing.visible} onChange={(e) => set('visible', e.target.checked)} className="w-5 h-5 accent-teal-700" />
                مفعّلة
              </label>
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
