import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import { SECTORS } from '../data/sectors';
import ProjectCard from '../components/ProjectCard';
import FilterPills from '../components/ui/FilterPills';
import Button from '../components/ui/Button';
import { ArrowUpLeft } from 'lucide-react';

export default function Works() {
  const [filter, setFilter] = useState('all');
  const options = useMemo(() => [{ id: 'all', title: 'الكل' }, ...SECTORS], []);
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.sector === filter);

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>أعمالنا | قبس</title>
        <meta name="description" content="سابقة أعمال قبس: دراسات حالة في السياحة، العقارات، التجارة الإلكترونية، التعليم، الصحة، والمطاعم." />
      </Helmet>
      <span className="font-serif text-sm italic text-brand-teal-dark font-bold tracking-widest uppercase">Portfolio</span>
      <h1 className="font-arabic text-4xl sm:text-5xl font-extrabold text-brand-maroon mt-2 mb-4">سابقة أعمالنا</h1>
      <p className="text-lg text-brand-ink-soft font-body leading-loose max-w-2xl mb-8">
        كل مشروع قصة نجاح موثقة: التحدي، الحل، والنتائج بالأرقام. تصفح حسب قطاعك.
      </p>
      <FilterPills options={options} value={filter} onChange={setFilter} />
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="text-center text-brand-ink-soft mt-16">لا توجد مشاريع في هذا القطاع بعد — كن أول قصة نجاح.</p>}
      <div className="text-center mt-14">
        <Button wa="أريد أن أبدأ مشروعي الخاص مع قبس" variant="accent" size="lg">
          لتبدأ مشروعك الخاص تواصل معنا <ArrowUpLeft className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
