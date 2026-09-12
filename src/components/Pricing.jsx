import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Video, Palette, Globe, Check, X, Calculator, PhoneCall, ArrowLeft } from 'lucide-react';
import { SITE, waLink } from '../config/site';

const PRICING = { designUnit: 90, reelUnit: 250, automation: 3000, website: 4000 };
export const openExpertChat = () => window.dispatchEvent(new CustomEvent('qabas:open-chat'));

export default function Pricing() {
  const [modal, setModal] = useState(false);
  const [cd, setCd] = useState(10);
  const [cr, setCr] = useState(5);
  const [ia, setIa] = useState(false);
  const [iw, setIw] = useState(false);
  const total = cd * PRICING.designUnit + cr * PRICING.reelUnit + (ia ? PRICING.automation : 0) + (iw ? PRICING.website : 0);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => { if (e.key === 'Escape') setModal(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [modal]);

  const CI = ({ children, light }) => (
    <li className="flex items-center gap-3 text-base">
      <Check className={`w-5 h-5 shrink-0 ${light ? 'text-white' : 'text-brand-red'}`} />
      <span className={light ? 'text-white/95 font-medium' : 'text-brand-ink font-medium'}>{children}</span>
    </li>
  );

  const MinimalRow = ({ icon: Icon, title, desc, price, link }) => (
    <div className="group relative w-full border-b border-brand-deep/20 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all hover:bg-brand-red/5 px-4 sm:px-8 rounded-xl overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-white border border-brand-deep/15 flex items-center justify-center text-brand-red shadow-sm group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-arabic text-xl sm:text-2xl font-extrabold text-brand-maroon mb-1 group-hover:text-brand-red transition-colors">{title}</h4>
          <p className="text-sm text-brand-ink-soft font-body max-w-sm">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-right">
          <span className="block text-xs text-brand-ink-soft mb-1 uppercase tracking-wider font-bold">Starting from</span>
          <span className="font-extrabold text-2xl text-brand-red">{price} <span className="text-sm font-normal text-brand-ink-soft">ج.م</span></span>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={openExpertChat} aria-label={`تحدث مع خبير عن ${title}`}
            className="h-12 px-5 rounded-full bg-brand-teal-soft text-brand-teal-dark text-sm font-extrabold hover:bg-brand-teal hover:text-white transition-all whitespace-nowrap">
            تحدث مع خبير
          </button>
          <a href={waLink(link)} target="_blank" rel="noreferrer" aria-label={`اطلب ${title} عبر واتساب`} className="w-12 h-12 rounded-full bg-white border border-brand-deep/20 flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="pricing" className="relative w-full pt-28 md:pt-36 pb-24 sm:pb-28 px-6 sm:px-8 bg-soft-red-glow scroll-mt-24 overflow-hidden">
      
      {/* Editorial Oversized Typography Background */}
      <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none overflow-hidden select-none z-0 opacity-[0.03]">
        <span className="font-serif text-[8rem] sm:text-[12rem] lg:text-[18rem] font-black text-brand-deep leading-none tracking-widest uppercase">
          INVESTMENT
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-serif text-sm italic text-brand-red font-bold tracking-widest uppercase block mb-3">Transparent Value</span>
          <h2 className="font-arabic text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-maroon leading-[1.2] mb-5">
            باقات الاستثمار الرقمي
          </h2>
          <p className="max-w-xl mx-auto text-brand-ink-soft text-lg font-body">
            حلول مصممة بدقة للارتقاء بعلامتك التجارية. اختر الباقة التي تلبي طموحاتك.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Featured Double-Width Hero Card (NOVA) */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="xl:col-span-12 rounded-[2rem] bg-gradient-red-base shadow-[0_20px_60px_rgba(102,0,0,0.25)] border-none overflow-hidden flex flex-col lg:flex-row relative"
          >
            {/* Ribbon */}
            <div className="absolute top-8 left-0 bg-white text-brand-red px-6 py-2 rounded-r-full font-bold text-sm flex items-center gap-2 shadow-lg z-20">
              <Sparkles className="w-4 h-4 text-brand-gold" /> الباقة الأكثر طلباً
            </div>

            {/* Content Side */}
            <div className="p-8 sm:p-12 lg:w-3/5 flex flex-col justify-center relative z-10">
              <h3 className="font-arabic text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-md">باقة NOVA الشاملة</h3>
              <p className="text-white/85 text-lg mb-8 font-body max-w-xl">
                لكل شيء يحتاجه متجرك أو مشروعك في باقة واحدة. حوّل زوارك إلى عملاء دائمين من خلال منظومة رقمية متكاملة.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <ul className="space-y-4">
                  <CI light>أوتوميشن خدمة عملاء ذكي 24/7</CI>
                  <CI light>10 تصاميم سوشيال ميديا</CI>
                  <CI light>إدارة الصفحة باستراتيجية</CI>
                </ul>
                <ul className="space-y-4">
                  <CI light>5 ريلز مونتاج احترافي</CI>
                  <CI light>موقع احترافي سريع ومتجاوب</CI>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                <div className="text-center sm:text-right w-full sm:w-auto">
                  <span className="block text-white/70 text-sm mb-1 uppercase font-bold tracking-widest">Investment</span>
                  <span className="text-5xl font-extrabold text-white drop-shadow-md">4,500 <span className="text-xl font-normal text-white/80">ج.م</span></span>
                </div>
                <div className="w-full sm:w-auto flex flex-col gap-3">
                  <a href={waLink('أريد الاشتراك في باقة NOVA')} target="_blank" rel="noreferrer"
                    className="px-10 py-4 rounded-full bg-white text-brand-red font-extrabold text-center hover:bg-brand-snow hover:scale-105 active:scale-95 transition-all shadow-xl text-lg flex items-center justify-center gap-2">
                    احجز باقة NOVA <ArrowLeft className="w-5 h-5" />
                  </a>
                  <button onClick={openExpertChat}
                    className="px-10 py-2.5 rounded-full border border-white/40 text-white/90 font-bold text-sm text-center hover:bg-white/10 hover:border-white hover:text-white active:scale-95 transition-all">
                    تحدث مع خبير أولاً
                  </button>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:w-2/5 relative min-h-[300px] bg-black/10">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-transparent to-transparent z-10 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red via-transparent to-transparent z-10 lg:hidden" />
              <img src="/packages/nova.jpeg" alt="NOVA" loading="lazy" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
            </div>
          </motion.div>

          {/* Secondary Editorial List (Design, Video, Web) */}
          <div className="xl:col-span-12 flex flex-col gap-2 mt-4">
            <h3 className="font-arabic text-2xl font-extrabold text-brand-maroon mb-4 px-4">حلول متخصصة</h3>
            
            <MinimalRow 
              icon={Zap} 
              title="باقة SPARK" 
              desc="إنتاج محتوى شهري متكامل: 10 ريلز مونتاج و 20 تصميم سوشيال ميديا." 
              price="4,000" 
              link="أريد الاشتراك في باقة SPARK"
            />
            <MinimalRow 
              icon={Palette} 
              title="باقة التصميم" 
              desc="تصاميم سوشيال ميديا بجودة عالية جاهزة للنشر والتفاعل. باقات 20 أو 30 تصميم." 
              price="1,800" 
              link="استفسار عن باقات التصميم"
            />
            <MinimalRow 
              icon={Video} 
              title="باقة المونتاج" 
              desc="ريلز وموشن قصير يبني الانتباه من الثواني الأولى. باقات 10 إلى 30 ريل." 
              price="2,500" 
              link="استفسار عن باقات المونتاج"
            />
            <MinimalRow 
              icon={Globe} 
              title="المواقع والأوتوميشن" 
              desc="مواقع بالإيجار أو الشراء، وأوتوميشن ذكي للرد التلقائي على عملائك." 
              price="800" 
              link="استفسار عن خدمات المواقع"
            />
          </div>
        </div>

        {/* Custom Builder CTA */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-deep/15 shadow-[0_10px_40px_rgba(102,0,0,0.08)]">
          <div>
            <h3 className="font-arabic text-2xl sm:text-3xl font-extrabold text-brand-maroon mb-3">
              لم تجد الباقة المناسبة؟ <span className="font-serif text-brand-red italic font-normal">Custom Plan</span>
            </h3>
            <p className="text-brand-ink-soft text-lg font-body">اختر عدد التصاميم والريلز وأي حلول برمجية تحتاجها، واحسب التكلفة فورياً.</p>
          </div>
          <button onClick={() => setModal(true)} className="btn-accent text-white shrink-0 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3">
            <Calculator className="w-6 h-6" /> احسب باقتك الآن
          </button>
        </div>
      </div>

      {/* ═══ Calculator Modal ═══ */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-brand-maroon/80 backdrop-blur-md" onClick={() => setModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              role="dialog" aria-modal="true" aria-label="حاسبة الباقة المخصصة"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-white p-8 sm:p-10 max-h-[90vh] overflow-y-auto text-right shadow-2xl"
            >
              <button onClick={() => setModal(false)} aria-label="إغلاق الحاسبة" className="absolute top-6 left-6 p-2 rounded-full bg-brand-red/5 hover:bg-brand-red/10 text-brand-ink-soft hover:text-brand-red transition"><X className="w-6 h-6" /></button>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-xl bg-brand-red/10 text-brand-red"><Calculator className="w-8 h-8" /></div>
                <div><h3 className="font-arabic text-2xl font-extrabold text-brand-maroon">حاسبة الباقة المخصصة</h3><p className="text-sm text-brand-ink-soft mt-1">راقب السعر التقديري مباشرة</p></div>
              </div>
              <div className="space-y-6 mb-8">
                <div className="bg-brand-snow p-5 rounded-2xl border border-brand-red/10">
                  <div className="flex justify-between items-center mb-4"><label htmlFor="calc-designs" className="font-bold text-base text-brand-ink">عدد تصاميم السوشيال ميديا</label><span className="font-extrabold text-brand-red text-xl">{cd} تصميم</span></div>
                  <input id="calc-designs" type="range" min="0" max="50" step="5" value={cd} onChange={e => setCd(+e.target.value)} className="w-full accent-brand-red-vivid cursor-pointer" />
                </div>
                <div className="bg-brand-snow p-5 rounded-2xl border border-brand-red/10">
                  <div className="flex justify-between items-center mb-4"><label htmlFor="calc-reels" className="font-bold text-base text-brand-ink">عدد فيديوهات الريلز</label><span className="font-extrabold text-brand-red text-xl">{cr} ريل</span></div>
                  <input id="calc-reels" type="range" min="0" max="30" step="1" value={cr} onChange={e => setCr(+e.target.value)} className="w-full accent-brand-red-vivid cursor-pointer" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${ia ? 'bg-brand-red/5 border-brand-red text-brand-red' : 'bg-brand-snow border-brand-red/10 text-brand-ink-soft'}`}>
                    <span className="text-base font-bold">أوتوميشن الرد التلقائي</span>
                    <input type="checkbox" checked={ia} onChange={e => setIa(e.target.checked)} className="w-6 h-6 accent-brand-red-vivid" />
                  </label>
                  <label className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${iw ? 'bg-brand-red/5 border-brand-red text-brand-red' : 'bg-brand-snow border-brand-red/10 text-brand-ink-soft'}`}>
                    <span className="text-base font-bold">تطوير موقع إلكتروني</span>
                    <input type="checkbox" checked={iw} onChange={e => setIw(e.target.checked)} className="w-6 h-6 accent-brand-red-vivid" />
                  </label>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-brand-red/5 border border-brand-red/15 flex items-center justify-between mb-8">
                <div>
                  <span className="text-sm text-brand-ink-soft block font-bold mb-1">التكلفة التقديرية:</span>
                  <span className="text-4xl font-extrabold text-brand-red">{total.toLocaleString()} <span className="text-lg font-normal text-brand-ink-soft">ج.م</span></span>
                </div>
                <Calculator className="w-12 h-12 text-brand-red/20" />
              </div>
              <a href={waLink(`طلب باقة مخصصة: ${cd} تصميم, ${cr} ريل, أوتوميشن: ${ia?'نعم':'لا'}, موقع: ${iw?'نعم':'لا'}, السعر: ${total} ج.م`)}
                target="_blank" rel="noreferrer" className="btn-glow w-full py-5 rounded-full text-white font-extrabold text-center block flex items-center justify-center gap-3 text-lg">
                <PhoneCall className="w-6 h-6" /> تأكيد الباقة عبر الواتساب
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
