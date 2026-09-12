import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Quote, TrendingUp, AlertCircle, Lightbulb, PlayCircle, ArrowUpLeft } from 'lucide-react';
import { projectBySlug, PROJECTS } from '../data/projects';
import { sectorById } from '../data/sectors';
import Button from '../components/ui/Button';
import ProjectCard from '../components/ProjectCard';
import BeforeAfter from '../components/BeforeAfter';
import Reveal from '../components/ui/Reveal';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center px-6">
        <h1 className="font-arabic text-3xl font-extrabold text-brand-maroon mb-4">المشروع غير موجود</h1>
        <Link to="/works" className="text-brand-teal-dark font-bold">العودة إلى الأعمال ←</Link>
      </div>
    );
  }
  const sector = sectorById(project.sector);
  const related = PROJECTS.filter((p) => p.slug !== project.slug && p.sector === project.sector).slice(0, 3);

  return (
    <article className="pt-28 pb-20">
      <Helmet>
        <title>{project.title} | أعمالنا — قبس</title>
        <meta name="description" content={project.summary} />
      </Helmet>
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <Link to="/works" className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal-dark hover:underline mb-6">
          <ArrowRight className="w-4 h-4" /> كل الأعمال
        </Link>
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-teal-soft text-brand-teal-dark text-xs font-extrabold mb-4">{sector.fullTitle} • {project.service}</span>
        <h1 className="font-arabic text-4xl sm:text-5xl font-extrabold text-brand-maroon leading-[1.4] mb-4">{project.title}</h1>
        <p className="text-xl font-bold text-brand-ink leading-loose font-body mb-8">{project.summary}</p>

        {/* Hero visual: video when available, else cover */}
        {project.videoUrl ? (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-12 bg-black">
            <video src={project.videoUrl} controls preload="metadata" poster={project.cover} className="w-full max-h-[480px]">
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        ) : (
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12 group">
            <img src={project.cover} alt={project.title} className="w-full h-[320px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-[1.02]" loading="eager" />
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur text-white text-xs font-bold">
              <PlayCircle className="w-4 h-4" /> اللقطة النهائية للمشروع
            </span>
          </div>
        )}

        {/* Narrative: challenge → solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Reveal>
            <div className="rounded-3xl bg-white border border-brand-red/10 p-8 h-full card-lift">
              <span className="inline-flex items-center gap-2 text-brand-red font-extrabold text-sm mb-3">
                <AlertCircle className="w-5 h-5" /> تحدّي العميل
              </span>
              <h2 className="font-arabic text-2xl font-extrabold text-brand-maroon mb-3">من أين بدأنا؟</h2>
              <p className="text-brand-ink-soft leading-loose font-body">{project.challenge}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl bg-brand-deep text-white p-8 h-full card-lift">
              <span className="inline-flex items-center gap-2 text-brand-amber font-extrabold text-sm mb-3">
                <Lightbulb className="w-5 h-5" /> حل قبس
              </span>
              <h2 className="font-arabic text-2xl font-extrabold mb-3">ماذا فعلنا؟</h2>
              <p className="text-white/85 leading-loose font-body">{project.solution}</p>
            </div>
          </Reveal>
        </div>

        {/* Before / After */}
        {project.beforeAfter && (
          <Reveal>
            <h2 className="font-arabic text-2xl font-extrabold text-brand-maroon mt-10 mb-4">قبل وبعد — اسحب للمقارنة</h2>
            <BeforeAfter
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              beforeLabel="قبل التعاون"
              afterLabel="بعد الإطلاق"
              caption={project.beforeAfter.caption}
            />
          </Reveal>
        )}

        {/* Results */}
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-l from-brand-teal to-brand-teal-dark p-8 sm:p-10 mb-12">
            <h2 className="font-arabic text-2xl font-extrabold text-white mb-6 inline-flex items-center gap-2">
              <TrendingUp className="w-6 h-6" /> النتائج المحققة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
              {project.results.map((r) => (
                <div key={r.label} className="rounded-2xl bg-white/10 border border-white/20 py-6 px-4 backdrop-blur-sm">
                  <div className="text-4xl font-black mb-1 text-brand-amber" dir="ltr">{r.value}</div>
                  <div className="text-white/90 font-bold text-sm">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {project.gallery.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {project.gallery.map((g) => (
              <img key={g} src={g} alt={project.title} loading="lazy" decoding="async" className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300" />
            ))}
          </div>
        )}

        <div className="mb-12">
          <h2 className="font-arabic text-2xl font-extrabold text-brand-maroon mb-4">التقنيات والأدوات</h2>
          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-snow border border-brand-teal/20 text-sm font-bold text-brand-teal-dark" dir="ltr">
                <Check className="w-4 h-4" />{t}
              </span>
            ))}
          </div>
        </div>

        {project.testimonial && (
          <figure className="rounded-3xl bg-brand-amber-soft/50 border border-brand-amber/30 p-8 mb-12">
            <Quote className="w-8 h-8 text-brand-amber mb-3" />
            <blockquote className="text-lg font-body leading-loose text-brand-ink">“{project.testimonial.text}”</blockquote>
            <figcaption className="mt-3 font-bold text-brand-maroon">— {project.testimonial.author}</figcaption>
          </figure>
        )}

        <div className="text-center rounded-3xl bg-brand-deep p-10">
          <h2 className="font-arabic text-2xl sm:text-3xl font-extrabold text-white mb-6">لتبدأ مشروعك الخاص تواصل معنا</h2>
          <Button wa={`أريد مشروعاً مشابهاً لـ: ${project.title}`} variant="accent" size="lg">
            ابدأ مشروعك الآن <ArrowUpLeft className="w-5 h-5" />
          </Button>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-arabic text-2xl font-extrabold text-brand-maroon mb-6">مشاريع مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
