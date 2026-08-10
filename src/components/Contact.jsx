import React from 'react';
import { PhoneCall, MessageCircle, Mail, Clock } from 'lucide-react';

const WHATSAPP_NUMBER = '201144712845';

export default function Contact() {
  return (
    <section id="contact" className="relative w-full pt-28 md:pt-36 pb-24 sm:pb-28 px-6 sm:px-8 bg-soft-red-glow scroll-mt-24">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Headline Banner with CTA */}
        <div className="bg-brand-deep rounded-[2rem] p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(102,0,0,0.2)]">
          <div>
            <span className="font-serif text-sm italic text-brand-gold tracking-widest uppercase block mb-2 font-bold">The Future</span>
            <h2 className="font-arabic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              لنبدأ قصة نجاحك القادمة
            </h2>
          </div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="btn-glow shrink-0 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3">
            <MessageCircle className="w-5 h-5" /> تواصل عبر واتساب
          </a>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-6 flex items-center gap-5 group shadow-sm">
            <div className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(196,12,32,0.3)] transition-all">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-sm text-brand-ink-soft font-bold mb-1">واتساب</span>
              <span className="font-extrabold text-lg text-brand-maroon group-hover:text-brand-red transition" dir="ltr">+20 11 4471 2845</span>
            </div>
          </a>
          <a href="tel:+201144712845" className="glass-card rounded-2xl p-6 flex items-center gap-5 group shadow-sm">
            <div className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(196,12,32,0.3)] transition-all">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-sm text-brand-ink-soft font-bold mb-1">اتصال مباشر</span>
              <span className="font-extrabold text-lg text-brand-maroon group-hover:text-brand-red transition" dir="ltr">+20 11 4471 2845</span>
            </div>
          </a>
          <a href="mailto:hello@qabas.agency" className="glass-card rounded-2xl p-6 flex items-center gap-5 group shadow-sm">
            <div className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(196,12,32,0.3)] transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-sm text-brand-ink-soft font-bold mb-1">البريد الإلكتروني</span>
              <span className="font-extrabold text-lg text-brand-maroon group-hover:text-brand-red transition">hello@qabas.agency</span>
            </div>
          </a>
          <div className="glass-card rounded-2xl p-6 flex items-center gap-5 shadow-sm">
            <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-sm text-brand-ink-soft font-bold mb-1">مواعيد العمل</span>
              <span className="font-extrabold text-lg text-brand-maroon">يومياً 10 صباحاً - 10 مساءً</span>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('أريد استشارة مجانية لمشروعي')}`}
            target="_blank"
            rel="noreferrer"
            className="btn-glow inline-block px-12 py-5 rounded-full text-white font-extrabold text-lg shadow-[0_6px_20px_rgba(196,12,32,0.3)] hover:shadow-[0_8px_30px_rgba(196,12,32,0.5)] transition-all"
          >
            اطلب استشارة مجانية عبر الواتساب
          </a>
        </div>
      </div>
    </section>
  );
}
