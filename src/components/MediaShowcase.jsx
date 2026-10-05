import React from 'react';
import { FileDown, Youtube } from 'lucide-react';
import { youtubeIdFromUrl } from '../content';

// Flexible media renderer for portfolio items and posts.
// Renders any combination of: photo gallery + YouTube videos + file downloads.
export default function MediaShowcase({ gallery = [], videos = [], files = [], title = '' }) {
  const ytIds = (videos || []).map(youtubeIdFromUrl).filter(Boolean);
  if (gallery.length <= 1 && ytIds.length === 0 && (files || []).length === 0) return null;
  return (
    <div className="mb-12 flex flex-col gap-8">
      {gallery.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {gallery.map((g) => (
            <img key={g} src={g} alt={title} loading="lazy" decoding="async" className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300" />
          ))}
        </div>
      )}
      {ytIds.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          {ytIds.map((id) => (
            <div key={id} className="rounded-2xl overflow-hidden shadow-xl bg-black">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title={title || 'فيديو'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {(files || []).length > 0 && (
        <div className="flex flex-wrap gap-3">
          {files.map((f) => (
            <a key={f.url} href={f.url} download target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-brand-deep/20 text-brand-maroon text-sm font-extrabold hover:bg-brand-maroon hover:text-white transition-all shadow-sm">
              {f.label?.includes('فيديو') ? <Youtube className="w-4 h-4" /> : <FileDown className="w-4 h-4" />}
              {f.label || 'تحميل ملف'}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
