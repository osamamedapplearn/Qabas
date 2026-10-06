import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Tag, FileText, Settings as SettingsIcon, Rocket, Lock, ArrowRight, Briefcase } from 'lucide-react';
import PortfolioTab from '../admin/PortfolioTab';
import PricingTab from '../admin/PricingTab';
import ContentTab from '../admin/ContentTab';
import SettingsTab from '../admin/SettingsTab';
import PublishTab from '../admin/PublishTab';
import ServicesTab from '../admin/ServicesTab';
import { inputCls } from '../admin/ui';

const TABS = [
  { id: 'portfolio', title: 'الأعمال', icon: LayoutGrid },
  { id: 'services', title: 'الخدمات', icon: Briefcase },
  { id: 'pricing', title: 'الأسعار', icon: Tag },
  { id: 'content', title: 'المحتوى', icon: FileText },
  { id: 'settings', title: 'الإعدادات', icon: SettingsIcon },
  { id: 'publish', title: 'النشر', icon: Rocket },
];

const PIN = import.meta.env.VITE_ADMIN_PIN || 'qabas-admin';

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('qabas-admin-auth') === '1');
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState(false);
  const [tab, setTab] = useState('portfolio');

  const login = (e) => {
    e?.preventDefault();
    if (pin === PIN) {
      sessionStorage.setItem('qabas-admin-auth', '1');
      setAuthed(true);
    } else {
      setPinErr(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-snow flex items-center justify-center px-6" dir="rtl">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-3xl border border-brand-deep/10 shadow-xl p-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-maroon/10 text-brand-maroon mb-4">
            <Lock className="w-7 h-7" />
          </span>
          <h1 className="font-arabic text-2xl font-extrabold text-brand-maroon mb-2">لوحة تحكم قبس</h1>
          <p className="text-sm text-brand-ink-soft mb-6">تعمل محلياً فقط على هذا الجهاز. أدخل رمز الدخول.</p>
          <input type="password" value={pin} onChange={(e) => { setPin(e.target.value); setPinErr(false); }}
            placeholder="رمز الدخول" aria-label="رمز الدخول" className={inputCls} autoFocus />
          {pinErr && <p role="alert" className="text-sm font-bold text-red-600 mt-2">رمز غير صحيح.</p>}
          <button type="submit" className="mt-4 w-full py-3.5 rounded-full bg-brand-maroon text-white font-extrabold hover:bg-brand-red transition-colors">
            دخول
          </button>
          <Link to="/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal-dark hover:underline">
            <ArrowRight className="w-4 h-4" /> العودة للموقع
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-snow" dir="rtl">
      <header className="sticky top-0 z-40 bg-brand-deep text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <span className="font-arabic text-lg font-extrabold">لوحة تحكم قبس <span className="text-xs font-bold text-white/60">محلي</span></span>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full text-sm font-bold text-white/85 hover:text-white hover:bg-white/10 transition-colors">
              معاينة الموقع ↗
            </Link>
            <button onClick={() => { sessionStorage.removeItem('qabas-admin-auth'); setAuthed(false); setPin(''); }}
              className="px-4 py-2 rounded-full text-sm font-bold text-white/85 hover:text-white hover:bg-white/10 transition-colors">
              خروج
            </button>
          </div>
        </div>
        <nav aria-label="أقسام اللوحة" className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex gap-1 overflow-x-auto">
            {TABS.map(({ id, title, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-extrabold whitespace-nowrap border-b-2 transition-colors ${
                  tab === id ? 'border-brand-amber text-white' : 'border-transparent text-white/60 hover:text-white'
                }`}>
                <Icon className="w-4 h-4" /> {title}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {tab === 'portfolio' && <PortfolioTab />}
        {tab === 'services' && <ServicesTab />}
        {tab === 'pricing' && <PricingTab />}
        {tab === 'content' && <ContentTab />}
        {tab === 'settings' && <SettingsTab />}
        {tab === 'publish' && <PublishTab />}
      </main>
    </div>
  );
}
