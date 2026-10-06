import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { CLOUD, apiStatus, apiPush, apiHistory } from './api';
import { inputCls } from './ui';

function HistoryList() {
  const [commits, setCommits] = useState(null);
  const [err, setErr] = useState('');
  const load = async () => {
    setErr('');
    try {
      const j = await apiHistory();
      setCommits(j.commits || []);
    } catch (ex) {
      setErr(ex.message);
    }
  };
  return (
    <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-arabic font-extrabold text-brand-maroon text-lg">أحدث عمليات النشر</h3>
        <button onClick={load} className="px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
          تحديث
        </button>
      </div>
      {err && <p role="alert" className="text-sm font-bold text-red-600">{err}</p>}
      {!commits ? (
        <p className="text-brand-ink-soft font-body">اضغط «تحديث» لعرض آخر التغييرات المنشورة.</p>
      ) : commits.length === 0 ? (
        <p className="text-brand-ink-soft font-body">لا يوجد سجل بعد.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {commits.map((c) => (
            <li key={c.sha} className="rounded-xl bg-brand-snow px-4 py-3 text-sm">
              <span className="font-mono text-xs text-brand-teal-dark" dir="ltr">{c.sha}</span>
              <span className="font-bold text-brand-ink mx-2">{c.message}</span>
              <span className="text-xs text-brand-ink-soft">{c.author} • {c.date?.slice(0, 10)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function PublishTab() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('تحديث المحتوى من لوحة التحكم');
  const [result, setResult] = useState('');
  const [busy, setBusy] = useState(false);

  if (CLOUD) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        <section className="rounded-2xl border border-brand-amber/40 bg-brand-amber-soft/40 p-6">
          <h3 className="font-arabic font-extrabold text-brand-maroon text-lg mb-2">النشر تلقائي</h3>
          <p className="text-sm text-brand-ink font-body leading-relaxed">
            في الوضع السحابي كل عملية <strong>حفظ</strong> من أي تبويب تُسجَّل على GitHub فوراً ويعيد Vercel بناء الموقع تلقائياً خلال دقيقتين تقريباً. لا حاجة لزر نشر منفصل — فقط احفظ، ثم راقب السجل بالأسفل.
          </p>
        </section>
        <HistoryList />
      </div>
    );
  }

  const refresh = async () => {
    setResult('');
    try {
      setStatus(await apiStatus());
    } catch (ex) {
      setResult(`تعذر قراءة الحالة: ${ex.message}`);
    }
  };

  const push = async () => {
    setBusy(true);
    setResult('');
    try {
      const j = await apiPush(message.trim() || 'تحديث المحتوى من لوحة التحكم');
      setResult(j.pushed ? 'تم الدفع بنجاح — راقب بناء Vercel، وسيظهر التحديث حياً خلال دقيقتين تقريباً.' : (j.note || 'لا توجد تغييرات.'));
      setStatus(await apiStatus());
    } catch (ex) {
      setResult(`فشل الدفع: ${ex.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-arabic font-extrabold text-brand-maroon text-lg">التغييرات الجاهزة للنشر</h3>
          <button onClick={refresh} className="px-4 py-2 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-bold hover:bg-brand-teal hover:text-white transition-colors">
            تحديث القائمة
          </button>
        </div>
        {!status ? (
          <p className="text-brand-ink-soft font-body">اضغط «تحديث القائمة» لعرض الملفات المعدلة منذ آخر نشر.</p>
        ) : status.changed.length === 0 ? (
          <p className="text-brand-ink-soft font-body">لا توجد تغييرات — الموقع الحي مطابق لنسختك المحلية.</p>
        ) : (
          <ul className="flex flex-col gap-1.5" dir="ltr">
            {status.changed.map((l) => (
              <li key={l} className="font-mono text-sm bg-brand-snow rounded-lg px-3 py-2 text-brand-ink text-left">{l}</li>
            ))}
          </ul>
        )}
        {status?.branch && <p className="text-xs text-brand-ink-soft mt-3">الفرع: <span className="font-mono" dir="ltr">{status.branch}</span></p>}
      </section>

      <section className="bg-white rounded-2xl border border-brand-deep/10 p-6">
        <h3 className="font-arabic font-extrabold text-brand-maroon text-lg mb-4">النشر للموقع الحي</h3>
        <label className="block mb-4">
          <span className="block font-bold text-brand-ink mb-1.5">رسالة النشر</span>
          <input value={message} onChange={(e) => setMessage(e.target.value)} className={inputCls} placeholder="مثال: أسعار جديدة لباقات التصميم" />
        </label>
        <button onClick={push} disabled={busy} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-teal-dark text-white font-extrabold hover:bg-brand-teal transition-colors disabled:opacity-50">
          <Rocket className="w-5 h-5" /> {busy ? 'جارٍ الدفع…' : 'دفع للموقع الحي'}
        </button>
        {result && <p className="text-sm font-bold text-brand-teal-dark mt-3">{result}</p>}
        <div className="text-xs text-brand-ink-soft mt-4 leading-relaxed">
          بعد الدفع: تابع سجل البناء في لوحة Vercel. أي نشر يمكن التراجع عنه من صفحة Deployments بزر Rollback — لا يمكن كسر الموقع نهائياً.
        </div>
      </section>
    </div>
  );
}
