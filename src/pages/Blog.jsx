import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { POSTS, POST_CATEGORIES } from '../data/posts';
import FilterPills from '../components/ui/FilterPills';

export default function Blog() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? POSTS : POSTS.filter((p) => p.category === filter);
  const [featured, ...rest] = useMemo(() => list, [list]);

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>المدونة | قبس</title>
        <meta name="description" content="مقالات قبس: التسويق السياحي، مستقبل التجارة الإلكترونية، الأتمتة، وأخبار الصناعة." />
      </Helmet>
      <span className="font-serif text-sm italic text-brand-teal-dark font-bold tracking-widest uppercase">Blog</span>
      <h1 className="font-arabic text-4xl sm:text-5xl font-extrabold text-brand-maroon mt-2 mb-4">المدونة والمقالات</h1>
      <p className="text-lg text-brand-ink-soft font-body leading-loose max-w-2xl mb-8">رؤى عملية من الميدان — بدون تنظير، بخلاصات قابلة للتنفيذ.</p>
      <FilterPills options={POST_CATEGORIES} value={filter} onChange={setFilter} />

      {featured && (
        <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 mt-10 rounded-3xl overflow-hidden border border-brand-teal/10 shadow-lg hover:shadow-2xl transition-all mb-8 bg-white">
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img src={featured.cover} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="eager" />
          </div>
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <span className="text-xs font-extrabold text-brand-teal-dark mb-3">{POST_CATEGORIES.find((c) => c.id === featured.category)?.title} • {featured.date}</span>
            <h2 className="font-arabic text-2xl sm:text-3xl font-extrabold text-brand-maroon leading-snug mb-3 group-hover:text-brand-teal-dark transition-colors">{featured.title}</h2>
            <p className="text-brand-ink-soft font-body leading-loose mb-4">{featured.excerpt}</p>
            <span className="text-sm font-bold text-brand-ink-soft inline-flex items-center gap-2"><Clock className="w-4 h-4" />{featured.readTime} • {featured.author}</span>
          </div>
        </Link>
      )}

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {(featured ? rest : []).concat(featured ? [] : list).map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Link to={`/blog/${p.slug}`} className="group rounded-3xl overflow-hidden bg-white border border-brand-teal/10 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.cover} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-extrabold text-brand-teal-dark mb-2">{POST_CATEGORIES.find((c) => c.id === p.category)?.title}</span>
                  <h3 className="font-arabic text-lg font-extrabold text-brand-maroon leading-snug mb-2 group-hover:text-brand-teal-dark transition-colors">{p.title}</h3>
                  <p className="text-sm text-brand-ink-soft font-body leading-relaxed flex-1">{p.excerpt}</p>
                  <span className="mt-4 text-xs font-bold text-brand-ink-soft">{p.date} • {p.readTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
