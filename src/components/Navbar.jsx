import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, Zap, Target, Package, Briefcase, Newspaper, Phone, Menu, X, MessageCircle } from 'lucide-react';
import { waLink } from '../config/site';

const ROUTE_LINKS = [
  { to: '/', label: 'الرئيسية', icon: Home, end: true },
  { to: '/works', label: 'أعمالنا', icon: Briefcase },
  { to: '/blog', label: 'المدونة', icon: Newspaper },
  { to: '/contact', label: 'تواصل معنا', icon: Phone },
];

const HASH_LINKS = [
  { hash: 'services', label: 'الخدمات', icon: Zap },
  { hash: 'sectors', label: 'القطاعات', icon: Target },
  { hash: 'pricing', label: 'الباقات', icon: Package },
];

const linkBase =
  'relative px-3 xl:px-4 py-2 text-[15px] font-bold transition-colors duration-200 rounded-md focus-visible:outline-none';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const closeBtnRef = useRef(null);

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open ]);

  return (
    <>
      {/* ── Sticky top bar: clean white, teal identity ── */}
      <nav aria-label="التنقل الرئيسي" className="fixed top-0 inset-x-0 z-[100] bg-white/92 backdrop-blur-lg border-b border-brand-teal/10 shadow-[0_2px_20px_rgba(10,94,93,0.07)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Brand — right in RTL (first in DOM) */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group rounded-md">
            <img src="/logo.png" alt="قبس" width="40" height="40" className="w-9 h-9 lg:w-10 lg:h-10 object-contain" />
            <span className="font-arabic text-xl font-extrabold text-brand-maroon group-hover:text-brand-teal-dark transition-colors">
              قَبَس <span className="text-xs font-bold text-brand-ink-soft">Qabas</span>
            </span>
          </Link>

          {/* Desktop links — direct, no pills, no hamburger */}
          <div className="hidden lg:flex items-center gap-1">
            {ROUTE_LINKS.map(({ to, label, end }) => (
              <NavLink key={label} to={to} end={end}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? 'text-brand-teal-dark' : 'text-brand-ink-soft hover:text-brand-teal-dark'}`
                }>
                {({ isActive }) => (
                  <>
                    {label}
                    <span aria-hidden="true"
                      className={`absolute bottom-0 right-3 left-3 h-0.5 rounded-full bg-brand-teal transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'}`} />
                  </>
                )}
              </NavLink>
            ))}
            {HASH_LINKS.map(({ hash, label }) => (
              <a key={label} href={`/#${hash}`} className={`${linkBase} text-brand-ink-soft hover:text-brand-teal-dark`}>
                {label}
              </a>
            ))}
          </div>

          {/* Left side (end in RTL): CTA + mobile hamburger only */}
          <div className="flex items-center gap-2.5">
            <a href={waLink('أريد استشارة مجانية لمشروعي')} target="_blank" rel="noreferrer"
              className="btn-accent text-white hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-extrabold">
              <MessageCircle className="w-4 h-4" />
              احجز استشارة مجانية
            </a>
            <button onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-drawer" aria-label="فتح قائمة التنقل"
              className="lg:hidden p-2.5 -ml-1 rounded-xl text-brand-maroon hover:text-brand-teal-dark hover:bg-brand-teal-soft/60 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer: slides in from the left (end side in RTL) ── */}
      {open && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <div className="absolute inset-0 bg-brand-deep/50 backdrop-blur-[2px]" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside id="mobile-drawer" role="dialog" aria-modal="true" aria-label="قائمة التنقل"
            className="drawer-in absolute inset-y-0 left-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 h-16 border-b border-brand-teal/10">
              <span className="font-arabic text-lg font-extrabold text-brand-maroon">قَبَس <span className="text-xs text-brand-ink-soft">Qabas</span></span>
              <button ref={closeBtnRef} onClick={() => setOpen(false)} aria-label="إغلاق قائمة التنقل"
                className="p-2.5 rounded-xl text-brand-ink-soft hover:text-brand-teal-dark hover:bg-brand-teal-soft/60 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-4 gap-1">
              {ROUTE_LINKS.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={label} to={to} end={end} onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-bold transition-colors ${
                      isActive ? 'bg-brand-teal-soft text-brand-teal-dark' : 'text-brand-ink hover:bg-brand-snow hover:text-brand-teal-dark'
                    }`}>
                  <Icon className="w-5 h-5 shrink-0" />
                  {label}
                </NavLink>
              ))}
              {HASH_LINKS.map(({ hash, label, icon: Icon }) => (
                <a key={label} href={`/#${hash}`} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-bold text-brand-ink hover:bg-brand-snow hover:text-brand-teal-dark transition-colors">
                  <Icon className="w-5 h-5 shrink-0" />
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-auto p-5 border-t border-brand-teal/10">
              <a href={waLink('أريد استشارة مجانية لمشروعي')} target="_blank" rel="noreferrer"
                className="btn-accent text-white w-full py-3.5 rounded-full font-extrabold text-center flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> احجز استشارة مجانية
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
