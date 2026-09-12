import React from 'react';
import { Palette, Video, Globe, Bot, PenTool, Megaphone } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

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
    <section id="services" className="relative w-full px-6 sm:px-8 bg-white pt-24 md:pt-32 pb-20 sm:pb-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Service Integration"
            title="منظومة خدمات متكاملة"
            desc="كل ما يحتاجه مشروعك من تصميم وبرمجة ومحتوى، في مكان واحد وبجودة ثابتة."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={Math.min(i * 0.05, 0.25)}>
              <div className="glass-card rounded-2xl p-8 group h-full">
                <div className="p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal-dark w-fit mb-6 group-hover:bg-brand-teal group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-teal/30 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-arabic text-xl font-bold text-brand-maroon mb-3 group-hover:text-brand-teal-dark transition-colors">{title}</h3>
                <p className="text-brand-ink-soft text-base leading-loose font-body">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
