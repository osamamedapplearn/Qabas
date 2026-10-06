import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import CaseStudy from './pages/CaseStudy';
import Blog from './pages/Blog';
import Article from './pages/Article';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import Brief from './pages/Brief';

// Admin dashboard routing:
// - LOCAL (`npm run admin` on your PC): route /admin when VITE_ENABLE_ADMIN=true.
// - CLOUD (production with VITE_ADMIN_PATH set, e.g. /admin45678): route at
//   that obscure path with VITE_CLOUD_ADMIN=true; server-side password enforced
//   by /api/admin/*. Without either, no /admin route exists at all.
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || (import.meta.env.DEV && import.meta.env.VITE_ENABLE_ADMIN === 'true' ? 'admin' : '');
const ADMIN_ENABLED = Boolean(ADMIN_PATH);
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/brief" element={<Brief />} />
            {ADMIN_ENABLED && <Route path={`/${ADMIN_PATH}`} element={<Admin />} />}
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="works" element={<Works />} />
              <Route path="works/:slug" element={<CaseStudy />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<Article />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
