export const SITE = {
  name: 'قَبَس',
  nameEn: 'Qabas',
  tagline: 'حلول رقمية.. تفوق التوقعات',
  whatsapp: '201144712845',
  whatsappDisplay: '+20 11 4471 2845',
  phoneHref: 'tel:+201144712845',
  email: 'hello@qabas.agency',
  hours: 'يومياً 10 صباحاً - 10 مساءً',
  social: { handle: '@Qabas.Official' },
};

export const waLink = (text = 'أريد استشارة مجانية لمشروعي') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const sectorWaLink = (sectorTitle) =>
  waLink(`أريد طلب استشارة لقطاع: ${sectorTitle}`);
