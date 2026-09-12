import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Value-proposition divider between Services and Sectors.
 * Static, single-statement strip in the Teal/Amber identity —
 * replaces the old dark-red repeating marquee.
 */
export default function Divider() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-l from-brand-teal-dark via-brand-teal to-brand-teal-dark z-20">
      {/* Subtle texture: soft radial glow, no heavy blurs */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_65%)]" />
      <div className="relative max-w-5xl mx-auto px-6 py-10 sm:py-12 text-center">
        <span aria-hidden="true" className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 border border-white/25">
          <Sparkles className="w-5 h-5 text-brand-amber" />
        </span>
        <p className="font-arabic text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.7]">
          نُحول أفكارك إلى حلول... وحلولك إلى نمو بلا حدود
        </p>
        <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-20 rounded-full bg-brand-amber" />
      </div>
    </div>
  );
}
