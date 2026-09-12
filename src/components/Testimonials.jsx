import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS, CLIENT_LOGOS } from '../data/testimonials';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Testimonials() {
  return (
    <section aria-label="آراء العملاء" className="relative w-full py-24 px-6 sm:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Social Proof"
          title="ماذا يقول عملاؤنا؟"
          desc="ثقة عملائنا هي رأس مالنا الحقيقي — قصص نجاح من قطاعات مختلفة."
          align="center"
        />
        <Reveal className="flex flex-wrap items-center justify-center gap-3 mb-12" delay={0.1}>
          {CLIENT_LOGOS.map((l) => (
            <span key={l} className="px-5 py-2.5 rounded-full border border-brand-ink/10 text-sm font-bold text-brand-ink-soft bg-brand-snow hover:border-brand-teal hover:text-brand-teal-dark transition">
              {l}
            </span>
          ))}
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08}>
              <figure className="glass-card rounded-3xl p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4" aria-label={`تقييم ${t.rating} من 5`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-brand-amber fill-brand-amber" />
                  ))}
                </div>
                <blockquote className="text-brand-ink text-base leading-loose font-body flex-1">“{t.text}”</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-brand-teal/10">
                  <div className="font-extrabold text-brand-maroon">{t.author}</div>
                  <div className="text-sm text-brand-teal-dark font-bold">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
