import React from 'react';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, desc, align = 'start', dark = false }) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'items-start';
  return (
    <Reveal className={`flex flex-col ${alignCls} gap-4 mb-14`}>
      {eyebrow && <span className="font-serif text-sm italic text-brand-teal-dark font-bold tracking-widest uppercase">{eyebrow}</span>}
      <h2 className={`font-arabic text-4xl sm:text-5xl font-extrabold leading-[1.25] ${dark ? 'text-white' : 'text-brand-maroon'}`}>{title}</h2>
      {desc && <p className={`max-w-2xl text-lg leading-loose font-body ${dark ? 'text-white/80' : 'text-brand-ink-soft'}`}>{desc}</p>}
    </Reveal>
  );
}
