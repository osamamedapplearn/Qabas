// ── Qabas content layer ─────────────────────────────────────────────
// All site content lives in /content/*.json and is loaded here with the
// exact same export names the pages/components already use, so the site
// renders identically while becoming fully editable from /admin.
//
// Conventions:
// - portfolio items: content/portfolio/<slug>.json (visible:false hides it)
// - posts: content/posts/<slug>.json (ctype: article | tutorial | video | photo)
// - pricing / settings / testimonials / sectors / post-categories: single JSON files
import {
  Plane, Building2, ShoppingCart, GraduationCap, Stethoscope, Store, LayoutGrid,
  Zap, Palette, Video, Globe,
} from 'lucide-react';
import settingsData from '../content/settings.json';
import pricingData from '../content/pricing.json';
import testimonialsData from '../content/testimonials.json';
import sectorsData from '../content/sectors.json';
import postCategoriesData from '../content/post-categories.json';

// ── Portfolio ──
const portfolioModules = import.meta.glob('../content/portfolio/*.json', { eager: true });

// Original editorial order (kept stable regardless of filenames)
const PORTFOLIO_ORDER = [
  'tourism-booking-funnel',
  'realestate-launch-page',
  'ecommerce-cart-recovery',
  'academy-brand-automation',
  'clinic-booking-site',
  'restaurant-reels-identity',
  'nova-brand-system',
];

const orderIndex = (slug) => {
  const i = PORTFOLIO_ORDER.indexOf(slug);
  return i === -1 ? PORTFOLIO_ORDER.length : i;
};

export const PROJECTS = Object.values(portfolioModules)
  .map((m) => m.default)
  .filter((p) => p && p.visible !== false)
  .sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug) || a.slug.localeCompare(b.slug));

export const projectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

// ── Posts ──
const postModules = import.meta.glob('../content/posts/*.json', { eager: true });

export const POSTS = Object.values(postModules)
  .map((m) => m.default)
  .filter(Boolean)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

export const POST_CATEGORIES = postCategoriesData;

export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug);

// ── Sectors (icon names → lucide components) ──
const SECTOR_ICONS = { Plane, Building2, ShoppingCart, GraduationCap, Stethoscope, Store, LayoutGrid };

export const SECTORS = sectorsData.map((s) => ({ ...s, icon: SECTOR_ICONS[s.icon] ?? LayoutGrid }));

export const sectorById = (id) => SECTORS.find((s) => s.id === id) ?? SECTORS[SECTORS.length - 1];

// ── Portfolio category labels (admin + filters) ──
export const PORTFOLIO_CATEGORIES = [
  { id: 'design', title: 'تصميم وهوية' },
  { id: 'montage', title: 'مونتاج وفيديو' },
  { id: 'automation', title: 'أتمتة وأنظمة' },
  { id: 'web', title: 'مواقع وبرمجة' },
  { id: 'social', title: 'سوشيال ميديا' },
  { id: 'ads', title: 'إعلانات ممولة' },
  { id: 'strategy', title: 'استراتيجية وباقات' },
  { id: 'other', title: 'أخرى' },
];

export const portfolioCategoryTitle = (id) =>
  PORTFOLIO_CATEGORIES.find((c) => c.id === id)?.title ?? id;

// ── Testimonials ──
export const TESTIMONIALS = testimonialsData.testimonials;
export const CLIENT_LOGOS = testimonialsData.clientLogos;

// ── Site settings + WhatsApp helpers (same API as old config/site.js) ──
export const SITE = settingsData;

export const waLink = (text = 'أريد استشارة مجانية لمشروعي') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const sectorWaLink = (sectorTitle) =>
  waLink(`أريد طلب استشارة لقطاع: ${sectorTitle}`);

// ── Pricing (units + packages + coupons, all editable) ──
export const PRICING = pricingData.units;
export const PRICING_CONTENT = {
  featured: pricingData.featured,
  packages: pricingData.packages,
  coupons: pricingData.coupons,
};

const PACKAGE_ICONS = { Zap, Palette, Video, Globe };

export const packageIcon = (name) => PACKAGE_ICONS[name] ?? Zap;

// Coupon engine: percent → % off total · design_fixed → designs at fixed unit price
export function applyCoupon(code, { cd, cr, ia, iw, units }) {
  const coupon = pricingData.coupons.find((c) => c.code === String(code || '').trim().toUpperCase());
  const baseTotal = cd * units.designUnit + cr * units.reelUnit + (ia ? units.automation : 0) + (iw ? units.website : 0);
  if (!coupon) return { total: baseTotal, baseTotal, discount: 0, discountMsg: '', applied: null };
  if (coupon.type === 'percent') {
    const discount = baseTotal * (coupon.value / 100);
    return { total: baseTotal - discount, baseTotal, discount, discountMsg: coupon.label, applied: coupon.code };
  }
  if (coupon.type === 'design_fixed') {
    const discount = Math.max(0, cd * (units.designUnit - coupon.value));
    return { total: baseTotal - discount, baseTotal, discount, discountMsg: coupon.label, applied: coupon.code };
  }
  return { total: baseTotal, baseTotal, discount: 0, discountMsg: '', applied: null };
}

// ── YouTube helper (watch / youtu.be / shorts / embed URLs → video id) ──
export function youtubeIdFromUrl(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? m[1] : null;
}
