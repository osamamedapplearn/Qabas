import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

function HashScroller() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50); return; }
    }
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <div className="w-full min-h-screen bg-white text-brand-ink relative flex flex-col">
      <HashScroller />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
