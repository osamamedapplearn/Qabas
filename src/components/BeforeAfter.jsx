import React, { useState, useRef, useCallback } from 'react';

/**
 * Accessible before/after image comparison slider.
 * - Keyboard operable via native range input (arrow keys).
 * - Labels in Arabic; `before` is rendered desaturated to suggest "pre-transformation".
 */
export default function BeforeAfter({ before, after, beforeLabel = 'قبل', afterLabel = 'بعد', caption }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);

  const setFromPointer = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    // RTL: slider starts from the right — invert so 0% = right edge
    const ratio = (rect.right - clientX) / rect.width;
    setPos(Math.min(96, Math.max(4, Math.round(ratio * 100))));
  }, []);

  return (
    <figure className="mb-12">
      <div
        ref={trackRef}
        className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl select-none cursor-ew-resize"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture?.(e.pointerId);
          setFromPointer(e.clientX);
          const move = (ev) => setFromPointer(ev.clientX);
          const up = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
          };
          window.addEventListener('pointermove', move);
          window.addEventListener('pointerup', up);
        }}
      >
        {/* After (base layer) */}
        <img src={after} alt={afterLabel} loading="lazy" decoding="async" draggable={false}
          className="absolute inset-0 w-full h-full object-cover" />
        {/* Before (revealed from the right in RTL via clip-path) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={beforeLabel} loading="lazy" decoding="async" draggable={false}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.72] contrast-[0.92]" />
          <div className="absolute inset-0 bg-brand-deep/20" />
        </div>
        {/* Divider handle */}
        <div className="absolute inset-y-0" style={{ right: `calc(${pos}% - 2px)` }}>
          <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-0 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-teal-dark font-black" aria-hidden="true">
            ◂▸
          </div>
        </div>
        <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-extrabold">{beforeLabel}</span>
        <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-brand-teal/90 text-white text-xs font-extrabold">{afterLabel}</span>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <label htmlFor="ba-range" className="text-xs font-bold text-brand-ink-soft shrink-0">اسحب للمقارنة</label>
        <input id="ba-range" type="range" min={4} max={96} value={pos} onChange={(e) => setPos(+e.target.value)}
          className="w-full accent-brand-teal-dark cursor-pointer" aria-label="مقارنة قبل وبعد" />
      </div>
      {caption && <figcaption className="text-xs text-brand-ink-soft mt-2 font-body">{caption}</figcaption>}
    </figure>
  );
}
