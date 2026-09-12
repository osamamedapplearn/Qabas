import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft } from 'lucide-react';
import { sectorById } from '../data/sectors';

export default function ProjectCard({ project }) {
  const sector = sectorById(project.sector);
  return (
    <Link
      to={`/works/${project.slug}`}
      className="group card-lift rounded-3xl overflow-hidden bg-white border border-brand-teal/10 shadow-md hover:shadow-2xl flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={project.cover} alt={project.title} loading="lazy" decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-brand-deep/80 backdrop-blur text-white text-xs font-bold">
          {sector.title}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-bold text-brand-teal-dark mb-2">{project.service}</span>
        <h3 className="font-arabic text-xl font-extrabold text-brand-maroon leading-snug mb-2 group-hover:text-brand-teal-dark transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-brand-ink-soft leading-relaxed font-body flex-1">{project.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-teal-dark">
          عرض دراسة الحالة <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
