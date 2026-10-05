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

// Local-only dashboard: the route is registered ONLY in dev mode with the
// VITE_ENABLE_ADMIN flag (i.e. `npm run admin` on your own PC).
// Production builds (import.meta.env.DEV === false) never include it,
// so /admin 404s on the live site.
const ADMIN_ENABLED = import.meta.env.DEV && import.meta.env.VITE_ENABLE_ADMIN === 'true';
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/brief" element={<Brief />} />
            {ADMIN_ENABLED && <Route path="/admin" element={<Admin />} />}
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
