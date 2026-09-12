import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="pt-40 pb-24 text-center px-6">
      <div className="font-arabic text-7xl font-black text-brand-maroon/10 mb-4" aria-hidden="true">404</div>
      <h1 className="font-arabic text-3xl font-extrabold text-brand-maroon mb-3">الصفحة غير موجودة</h1>
      <p className="text-brand-ink-soft font-body mb-8">يبدو أن الرابط الذي تبحث عنه غير متوفر.</p>
      <Link to="/" className="btn-accent text-white px-8 py-3.5 rounded-full font-extrabold inline-block">العودة للرئيسية</Link>
    </div>
  );
}
