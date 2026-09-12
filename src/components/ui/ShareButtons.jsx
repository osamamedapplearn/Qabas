import React, { useState } from 'react';
import { Share2, Check, MessageCircle, Send, Link2 } from 'lucide-react';

export default function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `${title} — عبر قبس`;
  const links = [
    { icon: MessageCircle, label: 'واتساب', href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
    { icon: Send, label: 'تيليجرام', href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
    { icon: Share2, label: 'إكس', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
  ];
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-bold text-brand-ink-soft ml-1">مشاركة:</span>
      {links.map(({ icon: Icon, label, href }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`مشاركة عبر ${label}`}
          className="p-2.5 rounded-full border border-brand-teal/25 text-brand-teal-dark hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all">
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button onClick={copy} aria-label="نسخ الرابط"
        className="p-2.5 rounded-full border border-brand-teal/25 text-brand-teal-dark hover:bg-brand-teal hover:text-white transition-all">
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
      {copied && <span className="text-xs font-bold text-brand-teal-dark">تم النسخ!</span>}
    </div>
  );
}
