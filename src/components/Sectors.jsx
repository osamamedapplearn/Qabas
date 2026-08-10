import React from 'react';
import { ArrowUpLeft, Plane, Building2, ShoppingCart, GraduationCap, Stethoscope, Store } from 'lucide-react';

const WHATSAPP_NUMBER = '201144712845';

const sectors = [
  {
    id: 'tourism',
    icon: Plane,
    title: 'القطاع السياحي وشركات السفر',
    tagEn: 'Tourism & Hospitality',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    details: 'مونتاج ريلز للوجهات السياحية، أوتوميشن الرد الآلي على أسعار الرحلات والبرامج 24/7، وصفحة هبوط بحجز مباشر.',
  },
  {
    id: 'realestate',
    icon: Building2,
    title: 'قطاع العقارات والمطورين',
    tagEn: 'Real Estate & Property',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    details: 'صفحات هبوط متخصصة لكل مشروع عقاري، أوتوميشن فلترة العملاء المهتمين (Lead Qualification)، وتصاميم إعلانات فاخرة.',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'المتاجر الإلكترونية',
    tagEn: 'E-Commerce & Retail',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
    details: 'زيادة المبيعات بلاندينج بيدجز عالية التحويل، أوتوميشن استرجاع السلات المتروكة، وتصاميم منتجات جذابة.',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'المنظومة التعليمية والمدرسين',
    tagEn: 'Education & Academies',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    details: 'بناء الهوية الرقمية للمحاضر، أوتوميشن إرسال الملازم وتأكيد الحضور، وإدارة منصات التواصل.',
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'العيادات والمراكز الطبية',
    tagEn: 'Healthcare & Clinics',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    details: 'مونتاج فيديوهات توعية طبية، أوتوميشن حجز وتأكيد الكشوفات، وموقع تعريفي للعيادة والطاقم الطبي.',
  },
  {
    id: 'retail',
    icon: Store,
    title: 'المتاجر الميدانية والمطاعم',
    tagEn: 'Local Shops & Dining',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    details: 'ريلز تغطية احترافية للمكان، هوية بصرية كاملة، وأوتوميشن الرد على المنيو والعنوان آلياً.',
  }
];

export default function Sectors() {
  const waLink = (sector) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`أريد طلب استشارة لقطاع: ${sector}`)}`;

  return (
    <section id="sectors" className="relative w-full pt-28 md:pt-36 pb-24 sm:pb-28 px-4 sm:px-8 bg-soft-red-glow scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Asymmetric Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 border-b border-brand-red/10 pb-8">
          <div>
            <span className="font-serif text-sm italic text-brand-red font-bold tracking-widest uppercase block mb-3">Target Sectors</span>
            <h2 className="font-arabic text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-maroon leading-[1.2]">
              حلول مخصصة لقطاعك
            </h2>
          </div>
          <p className="max-w-md text-brand-ink-soft text-lg font-body leading-relaxed md:text-left">
            معرض مرئي لحلولنا المصممة بدقة لتلبية احتياجات مختلف الصناعات والقطاعات.
          </p>
        </div>

        {/* Sectors Visual Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="group relative h-[450px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-brand-red"
              >
                {/* Background Image */}
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-right z-10">
                  <div className="mb-auto mt-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-4">
                      <Icon className="w-6 h-6 drop-shadow-md" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-arabic text-2xl sm:text-3xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
                      {s.title}
                    </h3>
                    
                    <p className="text-white/90 text-sm font-body leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {s.details}
                    </p>

                    <a
                      href={waLink(s.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl btn-glow text-white font-extrabold text-sm hover:shadow-[0_4px_15px_rgba(196,12,32,0.4)] transition-all"
                    >
                      طلب استشارة لقطاعك
                      <ArrowUpLeft className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
