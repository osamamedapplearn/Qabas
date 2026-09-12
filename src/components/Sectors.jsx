import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft } from 'lucide-react';
import { SECTORS } from '../data/sectors';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SectorArt from './SectorArt';

const DETAILS = {
  tourism: 'مونتاج ريلز للوجهات السياحية، أوتوميشن الرد الآلي على أسعار الرحلات والبرامج 24/7، وصفحة هبوط بحجز مباشر.',
  realestate: 'صفحات هبوط متخصصة لكل مشروع عقاري، أوتوميشن فلترة العملاء المهتمين، وتصاميم إعلانات فاخرة.',
  ecommerce: 'زيادة المبيعات بلاندينج بيدجز عالية التحويل، أوتوميشن استرجاع السلات المتروكة، وتصاميم منتجات جذابة.',
  education: 'بناء الهوية الرقمية للمحاضر، أوتوميشن إرسال الملازم وتأكيد الحضور، وإدارة منصات التواصل.',
  healthcare: 'مونتاج فيديوهات توعية طبية، أوتوميشن حجز وتأكيد الكشوفات، وموقع تعريفي للعيادة والطاقم الطبي.',
  retail: 'ريلز تغطية احترافية للمكان، هوية بصرية كاملة، وأوتوميشن الرد على المنيو والعنوان آلياً.',
};

export default function Sectors() {
  return (
    <section id="sectors" className="relative w-full pt-24 md:pt-32 pb-20 sm:pb-24 px-4 sm:px-8 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14 border-b border-brand-teal/15 pb-8">
          <SectionHeading
            eyebrow="Target Sectors"
            title="حلول مخصصة لقطاعك"
            desc="معرض مرئي لحلولنا المصممة بدقة لتلبية احتياجات مختلف الصناعات والقطاعات."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SECTORS.filter((s) => s.id !== 'general').map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={Math.min(i * 0.06, 0.3)}>
                <div className="group card-lift relative h-[450px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-brand-deep">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <SectorArt variant={s.id} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-right z-10">
                    <div className="mb-auto mt-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-4 group-hover:bg-brand-teal group-hover:border-brand-teal transition-all duration-300">
                        <Icon className="w-6 h-6 drop-shadow-md" />
                      </div>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">{s.tagEn}</span>
                    </div>
                    <div>
                      <h3 className="font-arabic text-2xl sm:text-[1.7rem] font-extrabold text-white mb-3 drop-shadow-lg leading-snug">
                        {s.fullTitle}
                      </h3>
                      <p className="text-white/90 text-sm font-body leading-relaxed mb-6 min-h-[4.2rem]">
                        {DETAILS[s.id]}
                      </p>
                      <Link
                        to={`/contact?sector=${s.id}`}
                        className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl btn-accent text-white font-extrabold text-sm transition-all"
                      >
                        طلب استشارة لقطاعك
                        <ArrowUpLeft className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
