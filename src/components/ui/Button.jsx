import React from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../../config/site';

export default function Button({ to, href, wa, onClick, variant = 'accent', size = 'md', children, className = '', ...rest }) {
  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-12 py-5 text-lg',
  };
  const variants = {
    accent: 'btn-accent text-white',
    primary: 'btn-glow text-white',
    white: 'bg-white text-brand-deep hover:bg-brand-snow',
    outline: 'border border-white/30 text-white hover:bg-white/10',
    ghost: 'border border-brand-teal/30 text-brand-teal-dark hover:bg-brand-teal/10',
  };
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition-all duration-300 hover:-translate-y-0.5 ${sizes[size]} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} onClick={onClick} className={cls} {...rest}>{children}</Link>;
  const finalHref = wa ? waLink(typeof wa === 'string' ? wa : undefined) : href;
  if (finalHref) return <a href={finalHref} onClick={onClick} target={finalHref.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls} {...rest}>{children}</a>;
  return <button onClick={onClick} className={cls} {...rest}>{children}</button>;
}
