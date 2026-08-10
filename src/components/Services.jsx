import React from 'react';
import { Palette, Video, Globe, Bot, PenTool, Megaphone } from 'lucide-react';

const services = [
  { icon: Palette,   title: 'الهوية البصرية',          desc: 'شعار وهوية كاملة تعبّر عن مشروعك، من الألوان إلى الاستخدام على كل المنصات.' },
  { icon: PenTool,   title: 'تصاميم سوشيال ميديا',    desc: 'تصاميم يومية وحملات متكاملة بخطة محتوى واضحة، تسليم أسبوعي في الموعد.' },
  { icon: Video,     title: 'المونتاج والريلز',        desc: 'ريلز وموشن قصير يلفت النظر من الثواني الأولى، بتعديلات واضحة ومحددة.' },
  { icon: Globe,     title: 'تطوير المواقع',           desc: 'مواقع سريعة ومتجاوبة مع الهاتف، تعمل وتجيب عن عملائك على مدار الساعة.' },
  { icon: Bot,       title: 'الأوتوميشن الذكي',        desc: 'رد تلقائي على عملائك 24/7، يجيب عن الأسئلة المتكررة ويوفر وقت فريقك.' },
  { icon: Megaphone, title: 'إدارة الصفحات',           desc: 'إدارة المحتوى والتفاعل باستراتيجية، حتى تبقى صفحتك نشطة وجاذبة باستمرار.' },
];

export default function Services() {
  return (
    <section id="services" className={`relative w-full px-6 sm:px-8 bg-soft-red-glow pt-28 md:pt-36 pb-24 sm:pb-28 scroll-mt-24`}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-serif text-sm italic text-brand-red tracking-widest uppercase block mb-2 font-bold">Service Integration</span>
            <h2 className="font-arabic text-4xl sm:text-5xl font-extrabold text-brand-maroon leading-[1.2]">
              منظومة خدمات متكاملة
            </h2>
          </div>
          <p className="max-w-md text-brand-ink-soft text-lg leading-relaxed font-body">
            كل ما يحتاجه مشروعك من تصميم وبرمجة ومحتوى، في مكان واحد وبجودة ثابتة.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-8 group">
              <div className="p-3 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red w-fit mb-6 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(196,12,32,0.3)] transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-arabic text-xl font-bold text-brand-maroon mb-3 group-hover:text-brand-red transition-colors">{title}</h3>
              <p className="text-brand-ink-soft text-base leading-relaxed font-body">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
