import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, Sparkles } from 'lucide-react';
import { waLink } from '../config/site';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ['#heroWatermark', '#heroSpark', '#heroHeadline', '#heroSub', '#heroCtas'].forEach((sel) => {
        document.querySelector(sel)?.classList.remove('opacity-0');
      });
      const wm = document.querySelector('#heroWatermark');
      if (wm) wm.style.opacity = '0.04';
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      
      // Floating spark animation
      gsap.to("#heroSpark", {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      tl.fromTo("#heroWatermark", { opacity: 0, scale: 0.95 }, { opacity: 0.04, scale: 1, duration: 1.5, ease: "power2.out" }, 0);
      tl.fromTo("#heroSpark", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" }, 0.3);
      tl.fromTo("#heroHeadline", { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.6);
      tl.fromTo("#heroSub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.9);
      tl.fromTo("#heroCtas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.1);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref} className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-brand-deep scroll-mt-24 z-0">
      
      {/* ── Oversized Watermark Typography ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <span id="heroWatermark" className="font-serif text-[15rem] md:text-[25rem] lg:text-[35rem] font-black text-white leading-none tracking-widest opacity-0 uppercase drop-shadow-2xl">
          QABAS
        </span>
      </div>

      {/* ── Ambient Lighting: slow aurora drift (motion-safe, pure CSS) ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-red-vivid rounded-full mix-blend-screen blur-[120px] opacity-20 motion-safe:animate-aurora-a" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-gold rounded-full mix-blend-screen blur-[150px] opacity-10 motion-safe:animate-aurora-b" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-brand-teal rounded-full mix-blend-screen blur-[130px] opacity-15 motion-safe:animate-aurora-a" />
      </div>

      {/* ── 3D Glassmorphic Flame/Spark ── */}
      <div id="heroSpark" className="relative mb-12 mt-16 z-20 opacity-0">
        <div className="absolute -inset-10 rounded-full bg-white/5 blur-3xl animate-pulse-slow" />
        <div className="w-24 h-32 md:w-32 md:h-40 rounded-[40px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
          <img src="/logo.png" alt="Qabas" className="relative w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>

      {/* ── Headline (Sharp Arabic Naskh styling) ── */}
      <h1 id="heroHeadline" className="opacity-0 max-w-5xl mb-6 z-20 relative">
        <span className="block font-arabic text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.2] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          نُشعل نجاحك ونبني{' '}
          <span className="relative inline-block text-brand-amber">
            أثرك الرقمي
            <span aria-hidden="true" className="absolute -bottom-1 right-0 left-0 h-1 rounded-full bg-brand-amber/70 motion-safe:animate-underline-grow origin-right" />
          </span>
        </span>
      </h1>

      {/* ── Subtitle ── */}
      <p id="heroSub" className="opacity-0 max-w-2xl text-white/90 text-lg sm:text-xl leading-relaxed mb-12 font-body z-20 relative drop-shadow-md">
        استوديو رقمي متكامل يجمع بين الفن والهندسة لبناء هويات وعلامات تجارية لا تُنسى.
      </p>

      {/* ── CTAs ── */}
      <div id="heroCtas" className="opacity-0 flex flex-col sm:flex-row gap-5 w-full max-w-md sm:max-w-none sm:w-auto z-20 mb-16 relative">
        <a
          href={waLink('أريد استشارة مجانية لمشروعي')}
          target="_blank"
          rel="noreferrer"
          className="btn-accent text-white px-10 py-4 rounded-full font-extrabold text-base flex items-center justify-center gap-2 group shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <Sparkles className="w-5 h-5" />
          <span>احجز استشارة مجانية</span>
          <ArrowUpLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
        <Link
          to="/works"
          className="px-10 py-4 rounded-full border border-white/30 text-white font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-300 text-center flex items-center justify-center backdrop-blur-sm"
        >
          تصفح أعمالنا
        </Link>
      </div>
    </section>
  );
}
