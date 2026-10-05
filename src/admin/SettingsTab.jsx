import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { SITE } from '../content';
import { apiSave } from './api';
import { Field, inputCls } from './ui';

export default function SettingsTab() {
  const [form, setForm] = useState(() => JSON.parse(JSON.stringify(SITE)));
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    const e = {};
    if (!String(form.whatsapp).replace(/\D/g, '').length) e.whatsapp = 'رقم الواتساب مطلوب (أرقام فقط).';
    if (!form.email.includes('@')) e.email = 'بريد إلكتروني غير صالح.';
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setBusy(true);
    setMsg('');
    try {
      await apiSave('settings.json', form);
      setMsg('تم الحفظ. أعد تحميل الموقع لرؤية بيانات التواصل الجديدة، ثم ادفع للنشر.');
    } catch (ex) {
      setMsg(`فشل الحفظ: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-deep/10 p-6 max-w-3xl">
      <h3 className="font-arabic font-extrabold text-brand-maroon text-lg mb-4">بيانات الموقع العامة</h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="اسم الموقع">
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
          </Field>
          <Field label="الاسم الإنجليزي">
            <input value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} className={inputCls} dir="ltr" />
          </Field>
        </div>
        <Field label="الشعار النصي">
          <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className={inputCls} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="رقم واتساب (بالصيغة الدولية بدون +)" required error={errors.whatsapp} hint="مثال: 201144712845">
            <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value.replace(/\D/g, ''))} className={inputCls} dir="ltr" />
          </Field>
          <Field label="الرقم المعروض">
            <input value={form.whatsappDisplay} onChange={(e) => set('whatsappDisplay', e.target.value)} className={inputCls} dir="ltr" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="رابط الاتصال">
            <input value={form.phoneHref} onChange={(e) => set('phoneHref', e.target.value)} className={inputCls} dir="ltr" />
          </Field>
          <Field label="البريد الإلكتروني" error={errors.email}>
            <input value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} dir="ltr" />
          </Field>
        </div>
        <Field label="ساعات العمل">
          <input value={form.hours} onChange={(e) => set('hours', e.target.value)} className={inputCls} />
        </Field>
        <Field label="حساب السوشيال">
          <input value={form.social?.handle || ''} onChange={(e) => set('social', { ...(form.social || {}), handle: e.target.value })} className={inputCls} dir="ltr" />
        </Field>
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-maroon text-white font-extrabold hover:bg-brand-red transition-colors disabled:opacity-50">
            <Save className="w-5 h-5" /> {busy ? 'جارٍ الحفظ…' : 'حفظ'}
          </button>
          {msg && <span className="text-sm font-bold text-brand-teal-dark">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
