import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PRICING, PRICING_CONTENT } from '../content';
import { apiSave } from './api';
import { Field, StringList, UploadButton, inputCls } from './ui';

const ICONS = ['Zap', 'Palette', 'Video', 'Globe'];

export default function PricingTab() {
  const [units, setUnits] = useState({ ...PRICING });
  const [featured, setFeatured] = useState(() => JSON.parse(JSON.stringify(PRICING_CONTENT.featured)));
  const [packages, setPackages] = useState(() => JSON.parse(JSON.stringify(PRICING_CONTENT.packages)));
  const [coupons, setCoupons] = useState(() => JSON.parse(JSON.stringify(PRICING_CONTENT.coupons)));
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const num = (v) => (v === '' ? 0 : Math.max(0, Number(v) || 0));

  const validate = () => {
    const e = {};
    if (featured.price < 0) e.price = 'السعر لا يمكن أن يكون سالباً.';
    if (!featured.name.trim()) e.fname = 'اسم الباقة المميزة مطلوب.';
    const codes = coupons.map((c) => c.code.trim().toUpperCase()).filter(Boolean);
    if (codes.length !== new Set(codes).size) e.coupons = 'أكواد الخصم مكررة — كل كود يجب أن يكون فريداً.';
    if (coupons.some((c) => !/^[A-Z0-9_]+$/.test(c.code.trim().toUpperCase()))) e.coupons = 'الكود حروف إنجليزية كبيرة وأرقام وشرطة سفلية فقط.';
    if (packages.some((p) => !p.name.trim())) e.packages = 'كل باقة تحتاج اسماً.';
    if (packages.some((p) => p.price < 0)) e.packages = 'أسعار الباقات لا يمكن أن تكون سالبة.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setBusy(true);
    setMsg('');
    try {
      await apiSave('pricing.json', {
        units,
        coupons: coupons.map((c) => ({ ...c, code: c.code.trim().toUpperCase() })),
        featured,
        packages,
      });
      setMsg('تم حفظ الأسعار. عاين قسم الباقات ثم ادفع للنشر من تبويب النشر.');
    } catch (ex) {
      setMsg(`فشل الحفظ: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Units */}
      <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
        <h3 className="font-arabic font-extrabold text-brand-maroon text-lg mb-4">أسعار الوحدات (للحاسبة)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ['designUnit', 'سعر التصميم'],
            ['reelUnit', 'سعر الريل'],
            ['automation', 'الأوتوميشن'],
            ['website', 'الموقع'],
          ].map(([k, label]) => (
            <Field key={k} label={`${label} (ج.م)`}>
              <input type="number" min="0" value={units[k]} onChange={(e) => setUnits({ ...units, [k]: num(e.target.value) })} className={inputCls} dir="ltr" />
            </Field>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
        <h3 className="font-arabic font-extrabold text-brand-maroon text-lg mb-4">الباقة المميزة (NOVA)</h3>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="اسم الباقة" required error={errors.fname}>
              <input value={featured.name} onChange={(e) => setFeatured({ ...featured, name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="الشارة">
              <input value={featured.ribbon} onChange={(e) => setFeatured({ ...featured, ribbon: e.target.value })} className={inputCls} placeholder="الباقة الأكثر طلباً" />
            </Field>
          </div>
          <Field label="الوصف">
            <textarea value={featured.desc} onChange={(e) => setFeatured({ ...featured, desc: e.target.value })} className={inputCls} rows={2} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="السعر (ج.م)" required error={errors.price}>
              <input type="number" min="0" value={featured.price} onChange={(e) => setFeatured({ ...featured, price: num(e.target.value) })} className={inputCls} dir="ltr" />
            </Field>
            <Field label="رسالة واتساب">
              <input value={featured.waMessage} onChange={(e) => setFeatured({ ...featured, waMessage: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <Field label="صورة الباقة">
            <div className="flex gap-2">
              <input value={featured.image} onChange={(e) => setFeatured({ ...featured, image: e.target.value })} className={inputCls} dir="ltr" />
              <UploadButton label="رفع" onUploaded={(url) => setFeatured({ ...featured, image: url })} />
            </div>
          </Field>
          <Field label="المميزات">
            <StringList items={featured.features} onChange={(v) => setFeatured({ ...featured, features: v })} placeholder="مثال: 10 تصاميم سوشيال ميديا" addLabel="إضافة ميزة" />
          </Field>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-arabic font-extrabold text-brand-maroon text-lg">الباقات المتخصصة</h3>
          <button onClick={() => setPackages([...packages, { name: '', icon: 'Zap', desc: '', price: 0, waMessage: '' }])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-maroon text-white text-sm font-bold hover:bg-brand-red transition-colors">
            <Plus className="w-4 h-4" /> باقة جديدة
          </button>
        </div>
        {errors.packages && <p role="alert" className="text-sm font-bold text-red-600 mb-3">{errors.packages}</p>}
        <div className="flex flex-col gap-4">
          {packages.map((p, i) => (
            <div key={i} className="rounded-xl border border-brand-deep/10 p-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="الاسم">
                  <input value={p.name} onChange={(e) => setPackages(packages.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className={inputCls} />
                </Field>
                <Field label="الأيقونة">
                  <select value={p.icon} onChange={(e) => setPackages(packages.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)))} className={inputCls}>
                    {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </Field>
                <Field label="السعر (ج.م)">
                  <input type="number" min="0" value={p.price} onChange={(e) => setPackages(packages.map((x, j) => (j === i ? { ...x, price: num(e.target.value) } : x)))} className={inputCls} dir="ltr" />
                </Field>
              </div>
              <Field label="الوصف">
                <input value={p.desc} onChange={(e) => setPackages(packages.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))} className={inputCls} />
              </Field>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Field label="رسالة واتساب">
                    <input value={p.waMessage} onChange={(e) => setPackages(packages.map((x, j) => (j === i ? { ...x, waMessage: e.target.value } : x)))} className={inputCls} />
                  </Field>
                </div>
                <button onClick={() => setPackages(packages.filter((_, j) => j !== i))} aria-label="حذف الباقة"
                  className="mt-7 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coupons */}
      <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-arabic font-extrabold text-brand-maroon text-lg">أكواد الخصم</h3>
          <button onClick={() => setCoupons([...coupons, { code: '', type: 'percent', value: 10, label: '' }])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-maroon text-white text-sm font-bold hover:bg-brand-red transition-colors">
            <Plus className="w-4 h-4" /> كود جديد
          </button>
        </div>
        {errors.coupons && <p role="alert" className="text-sm font-bold text-red-600 mb-3">{errors.coupons}</p>}
        <div className="flex flex-col gap-3">
          {coupons.map((c, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end rounded-xl border border-brand-deep/10 p-3">
              <Field label="الكود">
                <input value={c.code} onChange={(e) => setCoupons(coupons.map((x, j) => (j === i ? { ...x, code: e.target.value.toUpperCase() } : x)))} className={inputCls} dir="ltr" placeholder="QABAS10" />
              </Field>
              <Field label="النوع">
                <select value={c.type} onChange={(e) => setCoupons(coupons.map((x, j) => (j === i ? { ...x, type: e.target.value } : x)))} className={inputCls}>
                  <option value="percent">نسبة %</option>
                  <option value="design_fixed">تصميم بسعر ثابت</option>
                </select>
              </Field>
              <Field label="القيمة">
                <input type="number" min="0" value={c.value} onChange={(e) => setCoupons(coupons.map((x, j) => (j === i ? { ...x, value: num(e.target.value) } : x)))} className={inputCls} dir="ltr" />
              </Field>
              <Field label="الوصف">
                <input value={c.label} onChange={(e) => setCoupons(coupons.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} className={inputCls} placeholder="خصم 10%" />
              </Field>
              <button onClick={() => setCoupons(coupons.filter((_, j) => j !== i))} aria-label="حذف الكود"
                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 justify-self-start"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <p className="text-xs text-brand-ink-soft mt-3">النسبة = خصم من الإجمالي · التصميم بسعر ثابت = سعر تصميم الواحد بعد الخصم في الحاسبة.</p>
      </section>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-maroon text-white font-extrabold hover:bg-brand-red transition-colors disabled:opacity-50">
          {busy ? 'جارٍ الحفظ…' : 'حفظ الأسعار'}
        </button>
        {msg && <span className="text-sm font-bold text-brand-teal-dark">{msg}</span>}
      </div>
    </div>
  );
}
