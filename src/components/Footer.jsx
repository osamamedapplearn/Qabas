import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function Footer() {
  return (
    <footer className="w-full pt-14 pb-10 px-6 bg-brand-deep text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(139,0,0,0.6)_0%,rgba(74,0,8,1)_100%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-right mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="قبس" width="32" height="32" className="w-8 h-8 object-contain" />
              <span className="font-arabic text-lg font-extrabold text-white">قَبَس Qabas</span>
            </div>
            <p className="text-sm text-white/60 font-body leading-relaxed">حلول رقمية.. تفوق التوقعات — {SITE.social.handle}</p>
          </div>
          <nav aria-label="روابط سريعة" className="flex flex-col gap-2.5 text-sm">
            <span className="font-bold text-white/90 mb-1">أقسام الموقع</span>
            {[{ to: '/', l: 'الرئيسية' }, { to: '/works', l: 'أعمالنا' }, { to: '/blog', l: 'المدونة' }, { to: '/contact', l: 'تواصل معنا' }].map((x) => (
              <Link key={x.to} to={x.to} className="text-white/60 hover:text-brand-amber transition w-fit">{x.l}</Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-bold text-white/90 mb-1">تواصل</span>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-brand-amber transition w-fit" dir="ltr">{SITE.whatsappDisplay}</a>
            <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-brand-amber transition w-fit" dir="ltr">{SITE.email}</a>
            <span className="text-white/60">{SITE.hours}</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-white/50">قَبَس Qabas © {new Date().getFullYear()} — جميع الحقوق محفوظة</span>
          <span className="text-xs text-white/40">صُنع بشغف في مصر</span>
        </div>
      </div>
    </footer>
  );
}
