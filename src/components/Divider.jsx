import React from 'react';
import { Star } from 'lucide-react';

export default function Divider() {
  return (
    <div className="w-full bg-brand-deep py-6 sm:py-8 overflow-hidden relative border-y border-brand-maroon shadow-[0_10px_30px_rgba(102,0,0,0.2)] z-20">
      {/* Decorative gradient edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-deep to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-deep to-transparent z-10" />

      <div className="flex w-max animate-marquee">
        {/* We repeat the content a few times to create an infinite scroll effect */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center whitespace-nowrap px-8 sm:px-12">
            <span className="font-arabic text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              نُحول أفكارك إلى حلول... وحلولك إلى نمو بلا حدود
            </span>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold mx-8 fill-brand-gold" />
            <span className="font-serif text-lg sm:text-xl font-bold italic text-brand-gold uppercase tracking-[0.2em]">
              QABAS AGENCY
            </span>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold mx-8 fill-brand-gold" />
          </div>
        ))}
      </div>
    </div>
  );
}
