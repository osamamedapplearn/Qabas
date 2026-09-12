import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, User, Quote, ListChecks, BarChart3 } from 'lucide-react';
import { postBySlug, POSTS, POST_CATEGORIES } from '../data/posts';
import ShareButtons from '../components/ui/ShareButtons';
import Button from '../components/ui/Button';
import { ArrowUpLeft } from 'lucide-react';

export default function Article() {
  const { slug } = useParams();
  const post = postBySlug(slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('article-body');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight + 200;
      const read = Math.min(Math.max(-rect.top + 200, 0), Math.max(total, 1));
      setProgress(Math.round((read / Math.max(total, 1)) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center px-6">
        <h1 className="font-arabic text-3xl font-extrabold text-brand-maroon mb-4">المقال غير موجود</h1>
        <Link to="/blog" className="text-brand-teal-dark font-bold">العودة إلى المدونة ←</Link>
      </div>
    );
  }
  const cat = POST_CATEGORIES.find((c) => c.id === post.category)?.title;
  const related = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <article className="pt-28 pb-20">
      <Helmet>
        <title>{post.title} | مدونة قبس</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.cover} />
      </Helmet>
      <div className="fixed top-20 left-0 right-0 h-1 z-[90] bg-transparent" aria-hidden="true">
        <div className="h-full bg-brand-teal transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal-dark hover:underline mb-6">
          <ArrowRight className="w-4 h-4" /> كل المقالات
        </Link>
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-teal-soft text-brand-teal-dark text-xs font-extrabold mb-4">{cat}</span>
        <h1 className="font-arabic text-3xl sm:text-[2.75rem] font-extrabold text-brand-maroon leading-[1.5] mb-5">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-ink-soft font-body mb-6">
          <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" />{post.author} — {post.role}</span>
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} قراءة</span>
        </div>
        <ShareButtons title={post.title} />
        <div className="relative rounded-3xl overflow-hidden shadow-xl my-8">
          <img src={post.cover} alt={post.title} className="w-full aspect-[16/9] object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur text-brand-teal-dark text-xs font-extrabold">{cat}</span>
        </div>
        <div id="article-body" className="prose-ar">
          <p className="text-xl font-bold text-brand-ink leading-loose">{post.excerpt}</p>
          {post.body.map((b, i) => {
            if (b.h) return <h2 key={i}>{b.h}</h2>;
            if (b.quote) return (
              <blockquote key={i} className="relative rounded-2xl bg-brand-teal-soft/60 border-r-4 border-brand-teal p-6 my-8">
                <Quote className="w-6 h-6 text-brand-teal mb-2" />
                <p className="!mb-0 text-lg font-bold text-brand-ink">{b.quote}</p>
              </blockquote>
            );
            if (b.takeaways) return (
              <div key={i} className="rounded-2xl bg-white border border-brand-amber/40 shadow-sm p-6 my-8">
                <h3 className="font-arabic text-lg font-extrabold text-brand-maroon mb-4 inline-flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-brand-amber" /> الخلاصة في نقاط
                </h3>
                <ul className="space-y-2.5">
                  {b.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-brand-ink font-body leading-relaxed">
                      <span className="mt-2.5 w-2 h-2 rounded-full bg-brand-teal shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            );
            if (b.stat) return (
              <div key={i} className="rounded-2xl bg-gradient-to-l from-brand-teal to-brand-teal-dark p-6 my-8 flex items-center gap-5">
                <BarChart3 className="w-10 h-10 text-brand-amber shrink-0" />
                <div>
                  <div className="text-3xl font-black text-white" dir="ltr">{b.stat.value}</div>
                  <div className="text-white/85 font-body">{b.stat.label}</div>
                </div>
              </div>
            );
            if (b.figure) return (
              <figure key={i} className="my-8">
                <img src={b.figure.src} alt={b.figure.caption || post.title} loading="lazy" decoding="async"
                  className="w-full aspect-[16/9] object-cover rounded-2xl shadow-md" />
                {b.figure.caption && <figcaption className="text-xs text-brand-ink-soft mt-2 font-body">{b.figure.caption}</figcaption>}
              </figure>
            );
            return <p key={i}>{b.p}</p>;
          })}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((t) => <span key={t} className="px-3.5 py-1.5 rounded-full bg-brand-snow border border-brand-teal/20 text-xs font-bold text-brand-teal-dark">#{t}</span>)}
          </div>
        </div>
        <div className="rounded-3xl bg-brand-deep p-8 sm:p-10 text-center mt-12">
          <h2 className="font-arabic text-2xl font-extrabold text-white mb-3">{post.cta.title}</h2>
          <p className="text-white/70 font-body mb-6">استشارة مجانية — رد خلال ساعات العمل.</p>
          <Button wa={post.cta.message} variant="accent" size="lg">
            {post.cta.title} <ArrowUpLeft className="w-5 h-5" />
          </Button>
        </div>
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-arabic text-2xl font-extrabold text-brand-maroon mb-6">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="rounded-2xl overflow-hidden border border-brand-teal/10 bg-white hover:shadow-xl transition-all group">
                  <img src={p.cover} alt={p.title} loading="lazy" className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4 font-arabic font-bold text-brand-maroon leading-snug text-sm">{p.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
