import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, User } from 'lucide-react';
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
        <img src={post.cover} alt={post.title} className="w-full h-[280px] sm:h-[400px] object-cover rounded-3xl shadow-xl my-8" loading="eager" />
        <div id="article-body" className="prose-ar">
          <p className="text-xl font-bold text-brand-ink leading-loose">{post.excerpt}</p>
          {post.body.map((b, i) => b.h
            ? <h2 key={i}>{b.h}</h2>
            : <p key={i}>{b.p}</p>)}
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
