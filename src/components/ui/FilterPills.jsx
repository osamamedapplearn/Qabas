import React from 'react';

export default function FilterPills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="تصفية المحتوى">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
              active
                ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/30'
                : 'bg-white border border-brand-teal/25 text-brand-ink-soft hover:border-brand-teal hover:text-brand-teal-dark'
            }`}
          >
            {o.title}
          </button>
        );
      })}
    </div>
  );
}
