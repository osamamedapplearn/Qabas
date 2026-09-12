import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PhoneCall, MessageCircle, Mail, Clock, Send } from 'lucide-react';
import { SITE, waLink } from '../config/site';
import { SECTORS } from '../data/sectors';
import SectionHeading from './ui/SectionHeading';

export default function Contact({ compact = false }) {
  const [params] = useSearchParams();
  const initialSector = params.get('sector') ?? '';
  const [sector, setSector] = useState(initialSector);
  const [name, setName] = useState('');
  const [need, setNeed] = useState('');

  const submitHref = waLink(
    `طلب استشارة — الاسم: ${name || '—'} | القطاع: ${sector ? SECTORS.find((s) => s.id === sector)?.fullTitle : 'عام'} | التفاصيل: ${need || '—'}`
  );

  return (
    <section id="contact" className="relative w-full pt-24 md:pt-32 pb-20 sm:pb-24 px-6 sm:px-8 bg-brand-teal-soft/40 scroll-mt-24">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="لنبدأ قصة نجاحك القادمة"
          desc="نموذج واحد ذكي يغنيك عن أزرار متعددة — اختر قطاعك وسنتواصل معك بالحل المناسب."
          align="center"
        />

        {/* Smart form */}
        <form
          className="bg-white rounded-3xl p-6 sm:p-10 mb-12 border border-brand-teal/15 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={(e) => { e.preventDefault(); window.open(submitHref, '_blank'); }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="font-bold text-sm text-brand-ink">الاسم</label>
            <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك الكريم"
              className="rounded-xl border border-brand-teal/25 px-4 py-3 font-body focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-sector" className="font-bold text-sm text-brand-ink">القطاع</label>
            <select id="contact-sector" value={sector} onChange={(e) => setSector(e.target.value)}
              className="rounded-xl border border-brand-teal/25 px-4 py-3 font-body bg-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal">
              <option value="">عام / غير محدد</option>
              {SECTORS.map((s) => <option key={s.id} value={s.id}>{s.fullTitle}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="contact-need" className="font-bold text-sm text-brand-ink">ما الذي تحتاجه؟</label>
            <textarea id="contact-need" value={need} onChange={(e) => setNeed(e.target.value)} rows={3} placeholder="احكِ لنا باختصار عن مشروعك..."
              className="rounded-xl border border-brand-teal/25 px-4 py-3 font-body focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal" />
          </div>
          <button type="submit" className="btn-accent text-white md:col-span-2 py-4 rounded-full font-extrabold text-lg flex items-center justify-center gap-2">
            <Send className="w-5 h-5" /> إرسال عبر واتساب
          </button>
        </form>

        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            <a href={waLink()} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-6 flex items-center gap-5 group shadow-sm">
              <div className="p-4 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal-dark shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-sm text-brand-ink-soft font-bold mb-1">واتساب</span>
                <span className="font-extrabold text-lg text-brand-maroon" dir="ltr">{SITE.whatsappDisplay}</span>
              </div>
            </a>
            <a href={SITE.phoneHref} className="glass-card rounded-2xl p-6 flex items-center gap-5 group shadow-sm">
              <div className="p-4 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal-dark shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-sm text-brand-ink-soft font-bold mb-1">اتصال مباشر</span>
                <span className="font-extrabold text-lg text-brand-maroon" dir="ltr">{SITE.whatsappDisplay}</span>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`} className="glass-card rounded-2xl p-6 flex items-center gap-5 group shadow-sm">
              <div className="p-4 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal-dark shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-sm text-brand-ink-soft font-bold mb-1">البريد الإلكتروني</span>
                <span className="font-extrabold text-lg text-brand-maroon" dir="ltr">{SITE.email}</span>
              </div>
            </a>
            <div className="glass-card rounded-2xl p-6 flex items-center gap-5 shadow-sm">
              <div className="p-4 rounded-xl bg-brand-amber/10 border border-brand-amber/30 text-brand-amber shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-sm text-brand-ink-soft font-bold mb-1">مواعيد العمل</span>
                <span className="font-extrabold text-lg text-brand-maroon">{SITE.hours}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
