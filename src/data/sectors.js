import { Plane, Building2, ShoppingCart, GraduationCap, Stethoscope, Store, LayoutGrid } from 'lucide-react';

export const SECTORS = [
  { id: 'tourism', title: 'القطاع السياحي', fullTitle: 'القطاع السياحي وشركات السفر', tagEn: 'Tourism & Hospitality', icon: Plane },
  { id: 'realestate', title: 'قطاع العقارات', fullTitle: 'قطاع العقارات والمطورين', tagEn: 'Real Estate', icon: Building2 },
  { id: 'ecommerce', title: 'المتاجر الإلكترونية', fullTitle: 'المتاجر الإلكترونية', tagEn: 'E-Commerce', icon: ShoppingCart },
  { id: 'education', title: 'المنظومة التعليمية', fullTitle: 'المنظومة التعليمية والمدرسين', tagEn: 'Education', icon: GraduationCap },
  { id: 'healthcare', title: 'العيادات والمراكز الطبية', fullTitle: 'العيادات والمراكز الطبية', tagEn: 'Healthcare', icon: Stethoscope },
  { id: 'retail', title: 'المتاجر والمطاعم', fullTitle: 'المتاجر الميدانية والمطاعم', tagEn: 'Retail & Dining', icon: Store },
  { id: 'general', title: 'عام/متنوع', fullTitle: 'مشاريع عامة ومتنوعة', tagEn: 'General', icon: LayoutGrid },
];

export const sectorById = (id) => SECTORS.find((s) => s.id === id) ?? SECTORS[SECTORS.length - 1];
