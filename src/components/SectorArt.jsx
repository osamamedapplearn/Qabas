import React from 'react';

/**
 * Custom abstract brand illustrations per sector (Teal/Amber/Maroon).
 * Full-bleed SVG backgrounds replacing generic stock photography.
 */
const BG_A = '#4A0008';
const BG_B = '#0A3E3D';
const TEAL = '#0E7C7B';
const TEAL_LT = '#3AA8A6';
const AMBER = '#F59E0B';
const CREAM = '#FFF7E8';

function Frame({ children, id }) {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
      className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BG_A} />
          <stop offset="1" stopColor={BG_B} />
        </linearGradient>
        <pattern id={`${id}-dots`} width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2" fill="#ffffff" opacity="0.07" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={`url(#${id}-bg)`} />
      <rect width="800" height="450" fill={`url(#${id}-dots)`} />
      <circle cx="680" cy="70" r="180" fill={TEAL} opacity="0.25" />
      <circle cx="90" cy="390" r="150" fill={AMBER} opacity="0.14" />
      {children}
    </svg>
  );
}

const SCENES = {
  tourism: (
    <g>
      <circle cx="400" cy="170" r="86" fill={AMBER} opacity="0.9" />
      <circle cx="400" cy="170" r="112" fill="none" stroke={AMBER} strokeWidth="3" opacity="0.35" />
      <path d="M60 330 Q 220 250 400 320 T 760 300" fill="none" stroke={TEAL_LT} strokeWidth="10" strokeLinecap="round" opacity="0.8" />
      <path d="M60 365 Q 220 295 400 355 T 760 335" fill="none" stroke={TEAL} strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      <path d="M120 120 Q 300 40 470 110" fill="none" stroke={CREAM} strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" opacity="0.9" />
      <g transform="translate(470,110) rotate(18)" fill={CREAM}>
        <path d="M0 0 L44 12 L0 24 L9 12 Z" />
        <path d="M9 12 L9 26 L17 20 Z" opacity="0.8" />
      </g>
      <circle cx="160" cy="200" r="6" fill={CREAM} opacity="0.8" />
      <circle cx="620" cy="230" r="5" fill={CREAM} opacity="0.6" />
    </g>
  ),
  realestate: (
    <g>
      {[0, 1, 2].map((i) => {
        const x = 190 + i * 150, h = 220 - i * 40, y = 380 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width="110" height={h} rx="10" fill={i === 1 ? TEAL : '#ffffff'} opacity={i === 1 ? 0.95 : 0.16} />
            {[0, 1, 2, 3].map((r) => [0, 1].map((c) => (
              <rect key={`${r}${c}`} x={x + 18 + c * 42} y={y + 22 + r * 38} width="26" height="22" rx="4"
                fill={i === 1 ? '#ffffff' : AMBER} opacity={i === 1 ? 0.85 : 0.5} />
            )))}
          </g>
        );
      })}
      <rect x="120" y="380" width="560" height="12" rx="6" fill={AMBER} opacity="0.85" />
      <circle cx="640" cy="120" r="34" fill={AMBER} opacity="0.9" />
    </g>
  ),
  ecommerce: (
    <g>
      <g transform="translate(400,225)">
        <rect x="-95" y="-60" width="190" height="150" rx="22" fill={TEAL} opacity="0.95" />
        <rect x="-95" y="-60" width="190" height="44" rx="22" fill={TEAL_LT} opacity="0.9" />
        <rect x="-95" y="-38" width="190" height="22" fill={TEAL_LT} opacity="0.9" />
        <circle cx="0" cy="-38" r="26" fill={AMBER} />
        <path d="M-10 -38 h20 M0 -48 v20" stroke="#4A0008" strokeWidth="7" strokeLinecap="round" />
        <circle cx="-135" cy="105" r="20" fill="none" stroke={CREAM} strokeWidth="9" />
        <circle cx="135" cy="105" r="20" fill="none" stroke={CREAM} strokeWidth="9" />
        <rect x="-135" y="60" width="270" height="16" rx="8" fill={CREAM} opacity="0.85" />
      </g>
      <circle cx="150" cy="110" r="10" fill={AMBER} opacity="0.8" />
      <circle cx="650" cy="330" r="12" fill={TEAL_LT} opacity="0.8" />
      <circle cx="610" cy="100" r="7" fill={CREAM} opacity="0.7" />
    </g>
  ),
  education: (
    <g>
      <g transform="translate(400,190)">
        <polygon points="0,-70 150,-20 0,30 -150,-20" fill={TEAL} opacity="0.95" />
        <polygon points="0,-46 110,-12 0,22 -110,-12" fill={TEAL_LT} opacity="0.9" />
        <rect x="118" y="-18" width="10" height="90" rx="5" fill={AMBER} />
        <circle cx="123" cy="82" r="14" fill={AMBER} />
        <rect x="-90" y="60" width="180" height="16" rx="8" fill={CREAM} opacity="0.35" />
        <rect x="-70" y="86" width="140" height="12" rx="6" fill={CREAM} opacity="0.25" />
      </g>
      <rect x="150" y="330" width="500" height="14" rx="7" fill={AMBER} opacity="0.7" />
      <circle cx="180" cy="120" r="8" fill={CREAM} opacity="0.7" />
      <circle cx="630" cy="150" r="6" fill={CREAM} opacity="0.6" />
    </g>
  ),
  healthcare: (
    <g>
      <circle cx="400" cy="215" r="120" fill="#ffffff" opacity="0.12" />
      <circle cx="400" cy="215" r="120" fill="none" stroke={TEAL_LT} strokeWidth="4" opacity="0.6" />
      <path d="M230 215 h90 l28 -58 36 116 30 -78 22 20 h134" fill="none" stroke={AMBER} strokeWidth="14"
        strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(592,110)">
        <rect x="-16" y="-44" width="32" height="88" rx="10" fill={TEAL} />
        <rect x="-44" y="-16" width="88" height="32" rx="10" fill={TEAL} />
      </g>
      <g transform="translate(190,320)">
        <rect x="-12" y="-34" width="24" height="68" rx="8" fill={CREAM} opacity="0.85" />
        <rect x="-34" y="-12" width="68" height="24" rx="8" fill={CREAM} opacity="0.85" />
      </g>
    </g>
  ),
  retail: (
    <g>
      <g transform="translate(400,240)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${-180 + i * 60} -80 a30 30 0 0 0 60 0 Z`} fill={i % 2 ? CREAM : AMBER} opacity="0.92" />
        ))}
        <rect x="-180" y="-84" width="360" height="18" rx="9" fill="#4A0008" opacity="0.6" />
        <rect x="-150" y="-66" width="300" height="150" rx="12" fill={TEAL} opacity="0.95" />
        <rect x="-110" y="-30" width="90" height="114" rx="8" fill="#ffffff" opacity="0.9" />
        <rect x="20" y="-30" width="90" height="60" rx="8" fill={AMBER} opacity="0.95" />
        <rect x="20" y="-14" width="90" height="8" fill="#4A0008" opacity="0.35" />
        <rect x="-90" y="100" width="180" height="12" rx="6" fill={CREAM} opacity="0.5" />
      </g>
      <circle cx="150" cy="120" r="9" fill={AMBER} opacity="0.85" />
      <circle cx="650" cy="120" r="7" fill={CREAM} opacity="0.7" />
    </g>
  ),
};

export default function SectorArt({ variant }) {
  return <Frame id={`sector-${variant}`}>{SCENES[variant] ?? SCENES.retail}</Frame>;
}
