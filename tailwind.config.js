/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: 'var(--qabas-red-deep)',
          red: 'var(--qabas-red-main)',
          'red-glow': 'var(--qabas-red-accent)',
          'red-vivid': 'var(--qabas-red-accent)',
          snow: 'var(--snow)',
          ink: 'var(--ink)',
          'ink-soft': 'var(--ink-soft)',
          gold: 'var(--gold)',
          maroon: 'var(--qabas-red-deep)',
          teal: 'var(--teal)',
          'teal-dark': 'var(--teal-dark)',
          'teal-soft': 'var(--teal-soft)',
          amber: 'var(--amber)',
          'amber-soft': 'var(--amber-soft)',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        serif:  ['Playfair Display', 'Amiri', 'serif'],
        body:   ['"IBM Plex Sans Arabic"', 'Tajawal', 'Cairo', 'sans-serif'],
      },
      animation: {
        'pulse-slow':  'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':       'float 8s ease-in-out infinite',
        'glow-breathe':'glowBreathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.12)' },
        },
      },
    },
  },
  plugins: [],
}
