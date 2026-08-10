import React, { useState, useEffect } from 'react';
import { Home, Zap, Package, Target, Phone, Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Services from './components/Services';
import Divider from './components/Divider';
import Pricing from './components/Pricing';
import Sectors from './components/Sectors';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

const TABS = [
  { id: 'hero',     label: 'الرئيسية',           icon: Home },
  { id: 'services', label: 'الخدمات',             icon: Zap },
  { id: 'sectors',  label: 'القطاعات المستهدفة',  icon: Target },
  { id: 'pricing',  label: 'الباقات والأسعار',    icon: Package },
  { id: 'contact',  label: 'تواصل معنا',          icon: Phone },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section via Intersection Observer logic manually or based on offsets
      const sections = TABS.map(t => document.getElementById(t.id));
      const scrollPos = window.scrollY + 200; // offset for nav

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          if (activeTab !== TABS[i].id) {
            setActiveTab(TABS[i].id);
          }
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen bg-brand-snow text-brand-ink relative">
      {/* ═══ Top Navigation Bar ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-brand-deep backdrop-blur-lg border-b border-brand-red/30 shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="Qabas" className="w-10 h-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
            <span className="font-serif text-xl font-bold text-white group-hover:text-brand-red-glow transition drop-shadow-md">
              Qabas <span className="font-arabic text-lg text-white/90 mr-1">قَبَس</span>
            </span>
          </a>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-brand-red-vivid text-white shadow-lg shadow-brand-red/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-brand-red-glow transition"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-deep border-t border-brand-red-light/30 px-4 py-3 space-y-1 shadow-2xl">
            {TABS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-3 transition ${
                  activeTab === id
                    ? 'bg-brand-red-vivid text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ Floating Index Indicator (Desktop) ═══ */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {TABS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            title={label}
            className={`w-3 h-3 rounded-full transition-all duration-300 relative group ${
              activeTab === id 
                ? 'bg-brand-red-vivid scale-125 shadow-[0_0_10px_rgba(196,12,32,0.8)]' 
                : 'bg-brand-red/20 hover:bg-brand-red/60'
            }`}
          >
            {/* Tooltip on hover */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-brand-deep text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-brand-red/20">
              {label}
            </span>
          </a>
        ))}
      </div>

      {/* ═══ Page Content (SPA) ═══ */}
      <main className="flex flex-col">
        <Hero />
        
        {/* Gradient bridge from Red Hero to Content */}
        <div className="bg-gradient-red-to-white h-24 w-full -mt-1 relative z-10" />
        
        <Services />
        <Divider />
        <Sectors />
        <Pricing />
        <Contact />
      </main>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-brand-deep text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(139,0,0,0.6)_0%,rgba(74,0,8,1)_100%)]" />
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 border-t border-brand-red/30 pt-8 mt-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Qabas" className="w-8 h-8 object-contain opacity-90" />
            <span className="font-serif text-base text-white/90">
              قَبَس Qabas © {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-sm text-white/60 font-body">حلول رقمية.. تفوق التوقعات — @Qabas.Official</p>
        </div>
      </footer>
    </div>
  );
}
