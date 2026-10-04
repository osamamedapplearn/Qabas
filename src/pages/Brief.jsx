import React, { useState, useEffect } from "react";
import "./Brief.css";
import { Link } from "react-router-dom";

export default function Brief() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [view, setView] = useState("welcome"); // welcome, form, review, success, admin
  const [selectedServices, setSelectedServices] = useState(new Set(["تصميم وهوية بصرية","مواقع إلكترونية وبرمجة"]));
  const [selectedGoals, setSelectedGoals] = useState(new Set(["زيادة المبيعات المباشرة","بناء وترسيخ الهوية"]));

  const [formData, setFormData] = useState({
    client_company: "", client_name: "", client_phone: "", client_email: "", client_industry: "",
    client_website: "", client_socials: "", brand_story: "", brand_products: "", brand_usp: "",
    has_identity: "مشروع جديد لا توجد هوية", services_detail: "", audience_age: "",
    audience_gender: "الجميع (ذكور وإناث)", audience_location: "", audience_economic: "",
    audience_interests: "", audience_channels: "", project_kpi: "", competitors_names: "",
    competitors_links: "", competitors_pros: "", competitors_cons: "", colors_fav: "",
    colors_avoid: "", visual_style: "", project_budget: "5,000 – 10,000 جنيه",
    project_start: "فورًا وبشكل عاجل", additional_notes: ""
  });

  const handleInputChange = (e) => {
    const { id, value, name, type } = e.target;
    if (type === "radio") setFormData({ ...formData, [name]: value });
    else setFormData({ ...formData, [id]: value });
  };

  const toggleService = (s) => {
    const newSet = new Set(selectedServices);
    if (newSet.has(s)) newSet.delete(s);
    else newSet.add(s);
    setSelectedServices(newSet);
  };

  const toggleGoal = (g) => {
    const newSet = new Set(selectedGoals);
    if (newSet.has(g)) newSet.delete(g);
    else newSet.add(g);
    setSelectedGoals(newSet);
  };

  const jumpToStep = (step) => {
    setCurrentStep(step);
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateStep = (dir) => {
    if (dir === 1) {
      if (currentStep === 1 && (!formData.client_company || !formData.client_name || !formData.client_phone)) {
          alert("فضلاً قم بإدخال البيانات الأساسية المطلوبة.");
          return;
      }
      if (currentStep < totalSteps) jumpToStep(currentStep + 1);
      else setView("review");
    } else {
      if (currentStep > 1) jumpToStep(currentStep - 1);
    }
  };

  const submitFinalBrief = () => { setView("success"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>

<div className="cosmic-arc"></div>
<div className="app-container">
<header>
<a href="#" className="brand-group">
<div className="brand-mark" title="QABAS"><div className="brand-mark-cell"><i className="fa-solid fa-paper-plane" style={{transform: 'scaleX(-1)'}}></i></div><div className="brand-mark-cell"><i className="fa-solid fa-bolt"></i></div><div className="brand-mark-cell"><i className="fa-solid fa-wave-square"></i></div><div className="brand-mark-cell"><i className="fa-solid fa-link"></i></div></div>
<div className="brand-text-block"><span className="brand-arabic">قَبَسْ</span><span className="brand-latin">QABAS</span></div>
</a>
<div className="brand-pill-motto"><span><span className="motto-letter">Q</span>uality.</span><span><span className="motto-letter">A</span>mbition.</span><span><span className="motto-letter">B</span>oldness.</span><span><span className="motto-letter">A</span>rtistry.</span><span><span className="motto-letter">S</span>ubstance.</span></div>
<div className="header-actions"><button type="button" className="btn-toggle-view" id="viewModeToggle"><i className="fa-solid fa-layer-group"></i><span id="viewModeText">لوحة متابعة قبس</span></button></div>
</header>
<main>
{/*  WELCOME  */}
<section id="screen-welcome" className="view-welcome">
<div className="hero-banner-visual"><img src="https://www.designarena.ai/u/a610a667-0dd7-45ce-aa61-55952e6d4d49" alt="Qabas Digital Agency Aesthetic Banner" /></div>
<div className="hero-badge"><i className="fa-solid fa-sparkles"></i> رحلة انطلاق شريكتك الرقمية</div>
<h1 className="hero-title">خلّي <span>قبس</span> يعرف مشروعك أكثر</h1>
<p className="hero-subtitle">كل ما عرفنا مشروعك وتفاصيل رؤيتك بشكل أفضل، قدرنا نبني لك الحل الإبداعي المناسب بدقة فائقة وأثر استثنائي في السوق.</p>
<button className="btn-start-hero"><span>ابدأ البريف الآن</span><i className="fa-solid fa-arrow-left"></i></button>
<div className="welcome-links-row">
<a className="link-visit-qabas" href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener"><i className="fa-solid fa-globe"></i> زيارة موقع قبس <i className="fa-solid fa-arrow-up-left" style={{fontSize: '.7rem', opacity: '.7'}}></i></a>
<a className="link-visit-qabas" href="#" style={{borderStyle: 'dashed'}}><i className="fa-solid fa-layer-group"></i> معاينة لوحة المتابعة</a>
</div>
<div className="trust-row"><span className="trust-chip"><i className="fa-solid fa-check"></i> إرسال مباشر عبر واتساب</span><span className="trust-chip"><i className="fa-solid fa-lock"></i> بياناتك بأمان مع فريق قبس</span><span className="trust-chip"><i className="fa-solid fa-bolt"></i> رد خلال 24 ساعة</span></div>
<p className="welcome-micro">Qabas — قَبَس | حلول رقمية.. تفوق التوقعات — <a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener">qabas-three.vercel.app</a></p>
</section>
{/*  FORM  */}
<section id="screen-form" style={{display: 'none'}}>
<div className="stepper-header"><div className="stepper-track-wrap"><div className="stepper-track" id="stepsTrack">
<button type="button" className="step-pill active"><span className="step-num">01</span><span>بياناتك</span></button>
<button type="button" className="step-pill"><span className="step-num">02</span><span>عن البراند</span></button>
<button type="button" className="step-pill"><span className="step-num">03</span><span>احتياجاتك</span></button>
<button type="button" className="step-pill"><span className="step-num">04</span><span>جمهورك</span></button>
<button type="button" className="step-pill"><span className="step-num">05</span><span>أهدافك</span></button>
<button type="button" className="step-pill"><span className="step-num">06</span><span>الذوق والمنافسون</span></button>
<button type="button" className="step-pill"><span className="step-num">07</span><span>الميزانية</span></button>
</div></div><div className="progress-line-container"><div className="progress-line-fill" id="progressFillBar"></div></div></div>
<div className="form-stage-card">
<div className="step-content" id="step-1">
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-regular fa-id-badge"></i> بيانات العميل الأساسية</h2><p className="stage-desc">معلومات التواصل السريع للبدء في تنسيق استراتيجيتك مع فريق قبس</p></div><span className="stage-badge">STEP 01 / 07</span></div>
<div className="fields-grid">
<div className="form-group"><label className="form-label">اسم العميل / الشركة <span className="required-star">*</span></label><div className="input-wrapper"><input type="text" className="form-control" id="client_company" placeholder="مثال: شركة مدار للحلول التقنية" /><i className="fa-solid fa-building field-icon"></i></div></div>
<div className="form-group"><label className="form-label">اسم المسؤول <span className="required-star">*</span></label><div className="input-wrapper"><input type="text" className="form-control" id="client_name" placeholder="مثال: أحمد عبد الله" /><i className="fa-solid fa-user field-icon"></i></div></div>
<div className="form-group"><label className="form-label">رقم الهاتف / واتساب <span className="required-star">*</span></label><div className="input-wrapper"><input type="tel" className="form-control" id="client_phone" placeholder="مثال: +20 10 1234 5678" /><i className="fa-brands fa-whatsapp field-icon"></i></div></div>
<div className="form-group"><label className="form-label">البريد الإلكتروني <span className="required-star">*</span></label><div className="input-wrapper"><input type="email" className="form-control" id="client_email" placeholder="name@company.com" /><i className="fa-solid fa-envelope field-icon"></i></div></div>
<div className="form-group"><label className="form-label">مجال النشاط التجاري</label><div className="input-wrapper"><input type="text" className="form-control" id="client_industry" placeholder="مثال: تجارة إلكترونية، مطاعم..." /><i className="fa-solid fa-briefcase field-icon"></i></div></div>
<div className="form-group"><label className="form-label">رابط الموقع الحالي (إن وجد)</label><div className="input-wrapper"><input type="url" className="form-control" id="client_website" placeholder="https://example.com" /><i className="fa-solid fa-globe field-icon"></i></div></div>
<div className="form-group field-span-2"><label className="form-label">روابط السوشيال ميديا الحالية</label><div className="input-wrapper"><input type="text" className="form-control" id="client_socials" placeholder="Instagram, LinkedIn, Facebook, TikTok..." /><i className="fa-solid fa-share-nodes field-icon"></i></div></div>
</div>
</div>
<div className="step-content" id="step-2" style={{display: 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-fingerprint"></i> عن البراند والهوية</h2><p className="stage-desc">ساعدنا نتعرف على جوهر مشروعك، وقيمك التنافسية</p></div><span className="stage-badge">STEP 02 / 07</span></div>
<div className="fields-grid full">
<div className="form-group"><label className="form-label">عرفنا بنفسك وبنشاطك التجاري <span className="required-star">*</span></label><textarea className="form-control" id="brand_story" placeholder="اكتب نبذة مختصرة عن فكرة البراند وقصته، وكيف بدأ؟"></textarea></div>
<div className="form-group"><label className="form-label">ما هي المنتجات أو الخدمات التي تقدمها تحديدًا؟</label><textarea className="form-control" id="brand_products" placeholder="تفاصيل قائمة خدماتك أو المنتجات الرئيسية وأسعارها التقديرية"></textarea></div>
<div className="form-group"><label className="form-label">ما الذي يميّزك عن المنافسين؟ (القيمة الفريدة USP)</label><input type="text" className="form-control" id="brand_usp" placeholder="مثال: الجودة العالية، خدمة العملاء السريعة..." style={{paddingRight: '1.25rem'}} /></div>
<div className="form-group"><label className="form-label">هل لديك هوية بصرية حالية؟</label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" name="has_identity" id="has_id_yes" value="نعم لدي هوية كاملة" /><label className="radio-pill-label" htmlFor="has_id_yes"><span className="custom-radio-circle"></span><span>نعم، لدي هوية وشعار</span></label></div>
<div className="radio-pill-item"><input type="radio" name="has_identity" id="has_id_partial" value="لدي شعار فقط وأحتاج تطوير" /><label className="radio-pill-label" htmlFor="has_id_partial"><span className="custom-radio-circle"></span><span>لدي شعار فقط وأحتاج تجديد</span></label></div>
<div className="radio-pill-item"><input type="radio" name="has_identity" id="has_id_none" value="مشروع جديد لا توجد هوية" checked /><label className="radio-pill-label" htmlFor="has_id_none"><span className="custom-radio-circle"></span><span>مشروع جديد بالكامل</span></label></div>
</div></div>
</div>
<div className="fields-grid" style={{marginTop: '1rem'}}>
<div className="dropzone-container"><i className="fa-solid fa-cloud-arrow-up dropzone-icon"></i><div className="dropzone-title">ارفع شعار البراند (إن وجد)</div><div className="dropzone-hint">PNG, SVG, AI, PDF (بحد أقصى 25MB)</div><div id="logoFile-badge" className="file-chip" style={{display: 'none'}}><i className="fa-solid fa-check" style="color:#38ef7d"></i><span id="logoFile-name">brand-logo.svg</span></div></div>
<div className="dropzone-container"><i className="fa-solid fa-folder-open dropzone-icon"></i><div className="dropzone-title">ارفع ملفات البراند / Brand Guideline</div><div className="dropzone-hint">ملف تعريف البراند، الكتالوج، أو الصور المتاحة</div><div id="brandFile-badge" className="file-chip" style={{display: 'none'}}><i className="fa-solid fa-check" style="color:#38ef7d"></i><span id="brandFile-name">brand-guidelines.pdf</span></div></div>
</div>
</div>
<div className="step-content" id="step-3" style={{display: 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-cubes"></i> ماذا تحتاج من قبس؟</h2><p className="stage-desc">اختر خدمة أو أكثر لتكوين باقة العمل المتكاملة لمشروعك</p></div><span className="stage-badge">STEP 03 / 07</span></div>
<div className="selectable-cards-grid" id="servicesGrid">
<div className="select-card" data-service="تصميم وهوية بصرية"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-bezier-curve"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">تصميم وهوية</div><div className="select-card-desc">شعارات، هويات بصرية، وبوسترات وسوشيال ميديا</div></div>
<div className="select-card" data-service="مونتاج وفيديو"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-film"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">مونتاج وفيديو</div><div className="select-card-desc">فيديوهات ريلز، إعلانات سينمائية، وموشن جرافيك</div></div>
<div className="select-card" data-service="تصوير وإنتاج"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-camera-retro"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">جلسات تصوير</div><div className="select-card-desc">تصوير منتجات احترافي، جلسات تجارية وتغطية ميدانية</div></div>
<div className="select-card" data-service="مواقع إلكترونية وبرمجة"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-code"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">مواقع إلكترونية</div><div className="select-card-desc">متاجر إلكترونية، صفحات هبوط عصرية، وتطبيقات ويب</div></div>
<div className="select-card" data-service="إدارة سوشيال ميديا"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-hashtag"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">إدارة سوشيال ميديا</div><div className="select-card-desc">خطة محتوى شهرية، كتابة إعلانية، وإدارة الحسابات</div></div>
<div className="select-card" data-service="إعلانات ممولة Media Buying"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-bullhorn"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">إعلانات ممولة</div><div className="select-card-desc">حملات تحويل ومبيعات على Meta, TikTok, Google</div></div>
<div className="select-card" data-service="أتمتة وأنظمة ذكية"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-robot"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">أتمتة الأعمال AI</div><div className="select-card-desc">روبوتات واتساب، CRM، وأتمتة مسارات التحويل</div></div>
<div className="select-card" data-service="تسويق واستراتيجية"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-chess-knight"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">تسويق واستراتيجية</div><div className="select-card-desc">خطة تسويق شاملة، دراسة سوق، وتحديد موقع البراند</div></div>
<div className="select-card" data-service="حلول أخرى مخصصة"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">أخرى / مخصص</div><div className="select-card-desc">استشارات، حزم هجينة، أو متطلبات خاصة بالكامل</div></div>
</div>
<div className="form-group" style={{marginTop: '1.75rem'}}><label className="form-label">احكيلنا بالتفصيل، إيه اللي محتاجه من قبس بالتحديد؟</label><textarea className="form-control" id="services_detail" placeholder="اكتب أي ملاحظات أو أفكار مسبقة ترغب في تنفيذها..."></textarea></div>
</div>
<div className="step-content" id="step-4" style={{display: 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-users-viewfinder"></i> الجمهور المستهدف</h2><p className="stage-desc">من هم الأشخاص الذين نصنع هذا العمل من أجلهم؟</p></div><span className="stage-badge">STEP 04 / 07</span></div>
<div className="fields-grid">
<div className="form-group"><label className="form-label">الفئة العمرية المستهدفة</label><div className="input-wrapper"><input type="text" className="form-control" id="audience_age" placeholder="مثال: من 22 إلى 45 سنة" /><i className="fa-solid fa-calendar-days field-icon"></i></div></div>
<div className="form-group"><label className="form-label">الجنس</label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" name="audience_gender" id="gender_all" value="الجميع (ذكور وإناث)" checked /><label className="radio-pill-label" htmlFor="gender_all"><span className="custom-radio-circle"></span><span>الجميع</span></label></div>
<div className="radio-pill-item"><input type="radio" name="audience_gender" id="gender_female" value="سيدات فقط" /><label className="radio-pill-label" htmlFor="gender_female"><span className="custom-radio-circle"></span><span>سيدات</span></label></div>
<div className="radio-pill-item"><input type="radio" name="audience_gender" id="gender_male" value="رجال فقط" /><label className="radio-pill-label" htmlFor="gender_male"><span className="custom-radio-circle"></span><span>رجال</span></label></div>
</div></div>
<div className="form-group"><label className="form-label">الموقع الجغرافي</label><div className="input-wrapper"><input type="text" className="form-control" id="audience_location" placeholder="مثال: القاهرة والإسكندرية، أو دول الخليج..." /><i className="fa-solid fa-map-pin field-icon"></i></div></div>
<div className="form-group"><label className="form-label">المستوى الاقتصادي</label><div className="input-wrapper"><input type="text" className="form-control" id="audience_economic" placeholder="مثال: Class A / B+ أو متوسط الدخل" /><i className="fa-solid fa-gem field-icon"></i></div></div>
<div className="form-group field-span-2"><label className="form-label">اهتمامات وسلوكيات الجمهور</label><textarea className="form-control" id="audience_interests" placeholder="ما هي اهتماماتهم؟ ما التطبيقات التي يفضلونها؟ ما المشكلات التي يبحثون عن حل لها؟"></textarea></div>
<div className="form-group field-span-2"><label className="form-label">كيف يصل إليك العملاء حاليًا؟</label><input type="text" className="form-control" id="audience_channels" style={{paddingRight: '1.25rem'}} placeholder="مثال: ترشيحات الأصدقاء، إنستغرام، إعلانات جوجل..." /></div>
</div>
</div>
<div className="step-content" id="step-5" style={{display: 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-bullseye"></i> أهداف المشروع</h2><p className="stage-desc">ما الهدف الأساسي الذي تسعى لتحقيقه من خلال العمل مع قبس؟</p></div><span className="stage-badge">STEP 05 / 07</span></div>
<div className="selectable-cards-grid" id="goalsGrid">
<div className="select-card" data-goal="زيادة المبيعات المباشرة"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-chart-line"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">زيادة المبيعات</div><div className="select-card-desc">تحقيق عائد استثماري فوري وتكثيف عمليات الشراء</div></div>
<div className="select-card" data-goal="بناء وترسيخ الهوية"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-crown"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">بناء الهوية والبراند</div><div className="select-card-desc">صناعة حضور ذهني راسخ ومظهر فاخر واثق</div></div>
<div className="select-card" data-goal="زيادة الانتشار والوعي"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-satellite-dish"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">الانتشار والوعي (Awareness)</div><div className="select-card-desc">الوصول إلى أكبر شريحة ممكنة والتصدر بالسوق</div></div>
<div className="select-card" data-goal="إطلاق منتج أو خدمة جديدة"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-rocket"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">إطلاق منتج جديد</div><div className="select-card-desc">حملة تدشين متكاملة للمنتج الجديد بضجة قوية</div></div>
<div className="select-card" data-goal="تحسين الصورة الاحترافية"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-shield-halved"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">تحسين الاحترافية والسمعة</div><div className="select-card-desc">رفع مستوى المصداقية وجذب عملاء نخبة ومستثمرين</div></div>
<div className="select-card" data-goal="أهداف تسويقية أخرى"><div className="select-card-header"><div className="select-card-icon"><i className="fa-solid fa-arrows-to-circle"></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">أخرى / متعدد</div><div className="select-card-desc">حزمة أهداف متداخلة قصيرة وطويلة المدى</div></div>
</div>
<div className="form-group" style={{marginTop: '1.75rem'}}><label className="form-label">كيف ستعرف أن هذا المشروع قد نجح تمامًا؟ (مقياس النجاح KPI)</label><textarea className="form-control" id="project_kpi" placeholder="مثال: وصولنا لـ 1,000 عميل خلال 3 أشهر، أو مضاعفة عائد الإنفاق الإعلاني..."></textarea></div>
</div>
<div className="step-content" id="step-6" style={{display: 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-palette"></i> المنافسون والذوق البصري</h2><p className="stage-desc">لنعرف الاتجاه الفني الذي يروق لك والاتجاه الذي نبتعد عنه</p></div><span className="stage-badge">STEP 06 / 07</span></div>
<div className="fields-grid">
<div className="form-group"><label className="form-label">أهم المنافسين محليًا أو عالميًا</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} id="competitors_names" placeholder="اذكر 2 - 3 منافسين بارزين" /></div>
<div className="form-group"><label className="form-label">روابط حسابات أو مواقع المنافسين</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} id="competitors_links" placeholder="https://instagram.com/competitor" /></div>
<div className="form-group"><label className="form-label">ما الذي يعجبك في عملهم؟</label><textarea className="form-control" id="competitors_pros" placeholder="مثال: بساطة التصميم، طريقة تصوير المنتجات..."></textarea></div>
<div className="form-group"><label className="form-label">ما الذي لا يعجبك وتود تجنبه؟</label><textarea className="form-control" id="competitors_cons" placeholder="مثال: الألوان باهتة، إعلاناتهم مكررة..."></textarea></div>
<div className="form-group"><label className="form-label">الألوان المفضلة للبراند</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} id="colors_fav" placeholder="مثال: أسود، أحمر داكن، ذهبي..." /></div>
<div className="form-group"><label className="form-label">الألوان التي لا ترغب باستخدامها إطلاقًا</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} id="colors_avoid" placeholder="مثال: لا نريد الأصفر، أو الألوان الفاقعة" /></div>
<div className="form-group field-span-2"><label className="form-label">وصف الستايل العام الذي تفضله</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} id="visual_style" placeholder="مثال: فخم، جريء وعصري، مينيمال هادئ..." /></div>
<div className="dropzone-container"><i className="fa-solid fa-heart dropzone-icon" style={{color: '#ff4d6d'}}></i><div className="dropzone-title">ارفع أمثلة لتصميمات تعجبك</div><div className="dropzone-hint">سكرين شوتس أو مراجع بصرية تنال إعجابك</div><div id="inspireLike-badge" className="file-chip" style={{display: 'none'}}><i className="fa-solid fa-check"></i><span id="inspireLike-name">reference-moodboard.jpg</span></div></div>
<div className="dropzone-container"><i className="fa-solid fa-ban dropzone-icon"></i><div className="dropzone-title">ارفع أمثلة لتصميمات لا تعجبك</div><div className="dropzone-hint">أساليب أو أفكار تريد من فريقنا تجنبها تمامًا</div><div id="inspireDislike-badge" className="file-chip" style={{display: 'none'}}><i className="fa-solid fa-check"></i><span id="inspireDislike-name">avoid-example.png</span></div></div>
</div>
</div>
<div className="step-content" id="step-7" style={{display: 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-wallet"></i> الميزانية والجدول الزمني</h2><p className="stage-desc">تحديد الإطار الاستثماري المناسب لتصميم الباقة المثالية</p></div><span className="stage-badge">STEP 07 / 07</span></div>
<div className="fields-grid full">
<div className="form-group"><label className="form-label">الميزانية المتوقعة للمشروع <span className="required-star">*</span></label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" name="project_budget" id="b_1" value="أقل من 2,000 جنيه" /><label className="radio-pill-label" htmlFor="b_1"><span className="custom-radio-circle"></span><span>أقل من 2,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_budget" id="b_2" value="2,000 – 5,000 جنيه" /><label className="radio-pill-label" htmlFor="b_2"><span className="custom-radio-circle"></span><span>2,000 – 5,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_budget" id="b_3" value="5,000 – 10,000 جنيه" checked /><label className="radio-pill-label" htmlFor="b_3"><span className="custom-radio-circle"></span><span>5,000 – 10,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_budget" id="b_4" value="10,000 – 20,000 جنيه" /><label className="radio-pill-label" htmlFor="b_4"><span className="custom-radio-circle"></span><span>10,000 – 20,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_budget" id="b_5" value="أكثر من 20,000 جنيه" /><label className="radio-pill-label" htmlFor="b_5"><span className="custom-radio-circle"></span><span>أكثر من 20,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_budget" id="b_6" value="أحتاج إلى اقتراح مناسب" /><label className="radio-pill-label" htmlFor="b_6"><span className="custom-radio-circle"></span><span>أحتاج إلى اقتراح مناسب</span></label></div>
</div></div>
<div className="form-group" style={{marginTop: '1rem'}}><label className="form-label">الموعد المستهدف لبدء المشروع</label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" name="project_start" id="start_asap" value="فورًا وبشكل عاجل" checked /><label className="radio-pill-label" htmlFor="start_asap"><span className="custom-radio-circle"></span><span>فورًا (بشكل عاجل)</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_start" id="start_week" value="خلال أسبوع" /><label className="radio-pill-label" htmlFor="start_week"><span className="custom-radio-circle"></span><span>خلال أسبوع</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_start" id="start_month" value="خلال شهر" /><label className="radio-pill-label" htmlFor="start_month"><span className="custom-radio-circle"></span><span>خلال شهر</span></label></div>
<div className="radio-pill-item"><input type="radio" name="project_start" id="start_tbd" value="لم أحدد بعد" /><label className="radio-pill-label" htmlFor="start_tbd"><span className="custom-radio-circle"></span><span>لم أحدد بعد</span></label></div>
</div></div>
<div className="form-group" style={{marginTop: '1rem'}}><label className="form-label">هل هناك أي تفاصيل أخرى تريد أن يعرفها فريق قبس؟</label><textarea className="form-control" id="additional_notes" placeholder="ملاحظات ختامية، تواريخ معينة لمناسبات، شروط خاصة..."></textarea></div>
</div>
</div>
<div className="stage-actions-bar"><button type="button" className="btn-action btn-prev" id="btnPrev" style={{visibility: 'hidden'}}><i className="fa-solid fa-arrow-right"></i><span>السابق</span></button><button type="button" className="btn-action btn-next" id="btnNext"><span>التالي</span><i className="fa-solid fa-arrow-left"></i></button></div>
</div>
</section>
{/*  REVIEW  */}
<section id="screen-review" style={{display: 'none'}}>
<div className="stage-header" style={{border: 'none', marginBottom: '1.5rem'}}><div><h1 className="stage-title" style={{fontSize: '2.2rem'}}><i className="fa-solid fa-clipboard-check"></i> راجع بريف مشروعك</h1><p className="stage-desc">تأكد من دقة كافة البيانات والمدخلات قبل إرسالها رسميًا إلى فريق قبس عبر واتساب.</p></div><span className="stage-badge">REVIEW STAGE</span></div>
<div className="review-grid">
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-user-check"></i> 01. بيانات العميل</div><button className="btn-edit-step"><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point"><span className="review-label">اسم العميل / الشركة</span><span className="review-value" id="rev-company">-</span></div><div className="review-data-point"><span className="review-label">اسم المسؤول</span><span className="review-value" id="rev-name">-</span></div><div className="review-data-point"><span className="review-label">الهاتف / واتساب</span><span className="review-value" id="rev-phone">-</span></div><div className="review-data-point"><span className="review-label">البريد الإلكتروني</span><span className="review-value" id="rev-email">-</span></div><div className="review-data-point"><span className="review-label">مجال النشاط</span><span className="review-value" id="rev-industry">-</span></div><div className="review-data-point"><span className="review-label">الموقع والسوشيال</span><span className="review-value" id="rev-links">-</span></div></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-fingerprint"></i> 02. عن البراند</div><button className="btn-edit-step"><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point" style={{gridColumn: '1/-1'}}><span className="review-label">نبذة عن النشاط</span><span className="review-value" id="rev-story">-</span></div><div className="review-data-point"><span className="review-label">ما يميزك (USP)</span><span className="review-value" id="rev-usp">-</span></div><div className="review-data-point"><span className="review-label">حالة الهوية الحالية</span><span className="review-value" id="rev-hasid">-</span></div></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-cubes"></i> 03. الخدمات المطلوبة من قبس</div><button className="btn-edit-step"><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-tags" id="rev-services-tags"></div><div className="review-data-point" style={{marginTop: '.5rem'}}><span className="review-label">تفاصيل إضافية عن المطلوب</span><span className="review-value" id="rev-services-notes">-</span></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-crosshairs"></i> 04 & 05. الجمهور والأهداف</div><button className="btn-edit-step"><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point"><span className="review-label">الجمهور والموقع</span><span className="review-value" id="rev-audience-summary">-</span></div><div className="review-data-point"><span className="review-label">الأهداف المحددة</span><div className="review-tags" id="rev-goals-tags"></div></div><div className="review-data-point" style={{gridColumn: '1/-1'}}><span className="review-label">مقياس النجاح المنشود</span><span className="review-value" id="rev-kpi">-</span></div></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-coins"></i> 06 & 07. الميزانية والجدول الزمني</div><button className="btn-edit-step"><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point"><span className="review-label">الميزانية المختارة</span><span className="review-value" id="rev-budget" style={{color: '#4ade80', fontWeight: '700'}}>-</span></div><div className="review-data-point"><span className="review-label">الموعد المستهدف للبدء</span><span className="review-value" id="rev-timeline">-</span></div><div className="review-data-point" style={{gridColumn: '1/-1'}}><span className="review-label">ملاحظات ختامية</span><span className="review-value" id="rev-extra-notes">-</span></div></div></div>
</div>
<div className="stage-actions-bar" style={{marginTop: '2.5rem'}}><button type="button" className="btn-action btn-prev"><i className="fa-solid fa-arrow-right"></i><span>العودة للتعديل</span></button><button type="button" className="btn-action btn-next" style={{background: 'linear-gradient(135deg,#1da851 0%,#0e7a3a 100%)', boxShadow: '0 8px 24px rgba(37,211,102,.35)', fontSize: '1.15rem', padding: '1.1rem 2.2rem'}}><span>إرسال البريف إلى قبس</span><i className="fa-brands fa-whatsapp" style={{fontSize: '1.4rem'}}></i></button></div>
<p style={{textAlign: 'center', marginTop: '1rem', fontSize: '.82rem', color: 'var(--text-dim)'}}><i className="fa-solid fa-lock"></i> بالضغط على إرسال سيتم تجهيز بريفك وفتح واتساب لإرساله مباشرة إلى فريق قبس — لن تحتاج إلا للضغط على زر الإرسال في واتساب.</p>
</section>
{/*  SUCCESS  */}
<section id="screen-success" style={{display: 'none'}}>
<div className="form-stage-card success-container">
<div className="success-icon-wrap"><i className="fa-solid fa-check"></i></div>
<h2 className="success-title">وصل البريف بنجاح!</h2>
<p className="success-desc">شكرًا لك. أصبح لدى فريق <strong style={{color: '#fff'}}>قبس</strong> الآن صورة واضحة ومفصلة عن مشروعك ورؤيتك. سيقوم المدير الإبداعي واستشاري المشروعات بمراجعة بياناتك بدقة للتواصل معك لتحديد موعد الجلسة الاستكشافية.</p>
<div className="brief-id-badge">كود مرجع المشروع: <strong id="briefRefCode" style={{color: 'var(--primary-glow)', marginRight: '.5rem'}}>QBS-8942</strong></div>
<div className="confirm-whatsapp-banner"><div className="confirm-wa-icon"><i className="fa-brands fa-whatsapp"></i></div><div><div className="confirm-text">تم تجهيز البريف بنجاح، سيتم فتح واتساب لإرساله إلى فريق قبس.</div><div className="confirm-sub" id="waAutoNote">تم فتح محادثة واتساب تلقائيًا — ستجد رسالة البريف جاهزة، اضغط إرسال فقط. إذا لم تفتح، استخدم الزر بالأسفل.</div></div></div>
<div className="success-btns">
<a href="#" id="btnOpenWhatsApp" className="btn-whatsapp"><i className="fa-brands fa-whatsapp"></i><span>إرسال عبر واتساب الآن</span></a>
<button className="btn-ghost-light"><i className="fa-solid fa-copy"></i><span>نسخ نص البريف</span></button>
</div>
<div className="success-btns" style={{marginTop: '.2rem'}}>
<button className="btn-ghost-light" style={{padding: '.8rem 1.5rem', fontSize: '.9rem'}}><i className="fa-solid fa-house"></i><span>العودة إلى الرئيسية</span></button>
<a className="btn-ghost-light" href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener" style={{padding: '.8rem 1.5rem', fontSize: '.9rem', borderColor: 'rgba(37,211,102,.35)'}}><i className="fa-solid fa-globe" style={{color: '#25d366'}}></i><span>زيارة موقع قبس</span></a>
<button className="btn-ghost-light" style={{padding: '.8rem 1.5rem', fontSize: '.9rem'}}><i className="fa-solid fa-list-check"></i><span>معاينة البريف في لوحة قبس</span></button>
</div>
<div className="wa-preview-wrap"><details id="waPreviewDetails"><summary><i className="fa-brands fa-whatsapp" style={{color: '#25d366'}}></i> معاينة رسالة الواتساب المجهزة <span style={{fontWeight: '400', color: 'var(--text-dim)', fontSize: '.78rem'}}>(اضغط للعرض)</span></summary><div className="wa-preview-text" id="waMessagePreview">...</div></details></div>
<p className="success-site-note">Qabas — قَبَس | حلول رقمية.. تفوق التوقعات — <a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener">زيارة موقع قبس: qabas-three.vercel.app</a></p>
</div>
</section>
{/*  ADMIN  */}
<section id="screen-admin" className="admin-view-wrap">
<div className="admin-header"><div><h2 className="admin-headline">لوحة بريفات <span>قبس</span></h2><p style={{color: 'var(--text-muted)', fontSize: '.95rem'}}>متابعة طلبات العملاء الجدد ومراحل تأهيل واستلام المشروعات</p></div><button className="btn-action btn-prev"><i className="fa-solid fa-arrow-right"></i><span>العودة للبريف</span></button></div>
<div className="kanban-board">
<div className="kanban-col"><div className="kanban-col-head"><div className="kanban-col-title"><i className="fa-solid fa-bell" style={{color: '#facc15'}}></i><span>عملاء جدد</span></div><span className="kanban-count" id="count-new">2</span></div><div className="kanban-cards-stack" id="stack-new">
<div className="pipeline-card"><div className="pipeline-client-name">منصة سحابة الشرق</div><div className="pipeline-company">خدمات لوجستية وسحابية</div><div className="pipeline-badge-row"><span className="review-tag">مواقع إلكترونية</span><span className="review-tag">أتمتة</span></div><div className="pipeline-meta"><span className="pipeline-budget">10,000 – 20,000 ج.م</span><span>منذ ساعتين</span></div></div>
<div className="pipeline-card"><div className="pipeline-client-name">أتيليه نوران</div><div className="pipeline-company">أزياء ومجوهرات راقية</div><div className="pipeline-badge-row"><span className="review-tag">تصميم وهوية</span><span className="review-tag">تصوير</span></div><div className="pipeline-meta"><span className="pipeline-budget">أكثر من 20,000 ج.م</span><span>اليوم</span></div></div>
</div></div>
<div className="kanban-col"><div className="kanban-col-head"><div className="kanban-col-title"><i className="fa-solid fa-magnifying-glass"></i><span>قيد المراجعة</span></div><span className="kanban-count" id="count-review">1</span></div><div className="kanban-cards-stack" id="stack-review"><div className="pipeline-card"><div className="pipeline-client-name">كافيه لو ريڤ (Le Rêve)</div><div className="pipeline-company">ضيافة ومطاعم</div><div className="pipeline-badge-row"><span className="review-tag">سوشيال ميديا</span><span className="review-tag">مونتاج</span></div><div className="pipeline-meta"><span className="pipeline-budget">5,000 – 10,000 ج.م</span><span>أمس</span></div></div></div></div>
<div className="kanban-col"><div className="kanban-col-head"><div className="kanban-col-title"><i className="fa-brands fa-whatsapp" style={{color: '#25d366'}}></i><span>تم التواصل</span></div><span className="kanban-count" id="count-contacted">1</span></div><div className="kanban-cards-stack" id="stack-contacted"><div className="pipeline-card"><div className="pipeline-client-name">تطبيق فيتنس ون</div><div className="pipeline-company">صحة ورياضة تقنية</div><div className="pipeline-badge-row"><span className="review-tag">إعلانات ممولة</span><span className="review-tag">استراتيجية</span></div><div className="pipeline-meta"><span className="pipeline-budget">20,000+ ج.م</span><span>26 مارس</span></div></div></div></div>
<div className="kanban-col"><div className="kanban-col-head"><div className="kanban-col-title"><i className="fa-solid fa-rocket" style={{color: '#a855f7'}}></i><span>قيد التنفيذ</span></div><span className="kanban-count" id="count-active">1</span></div><div className="kanban-cards-stack" id="stack-active"><div className="pipeline-card"><div className="pipeline-client-name">أكاديمية إلهام للتعليم</div><div className="pipeline-company">تعليم وتدريب رقمي</div><div className="pipeline-badge-row"><span className="review-tag">تصميم وهوية</span><span className="review-tag">موقع كامل</span></div><div className="pipeline-meta"><span className="pipeline-budget">15,000 ج.م</span><span>نشط الآن</span></div></div></div></div>
</div>
</section>
</main>
<div className="detail-modal" id="briefModal"><div className="modal-dialog"><button className="modal-close-btn"><i className="fa-solid fa-xmark"></i></button><div style={{marginBottom: '1.5rem'}}><span className="hero-badge" style={{marginBottom: '.5rem'}} id="m-status">عميل جديد</span><h2 id="m-name" style={{fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff'}}>اسم العميل</h2><p id="m-company" style={{color: 'var(--text-muted)', fontSize: '.95rem'}}>الشركة والنشاط</p></div><div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}><div className="review-data-point"><span className="review-label">التواصل</span><span className="review-value" id="m-contact">-</span></div><div className="review-data-point"><span className="review-label">الخدمات المطلوبة</span><div className="review-tags" id="m-services"></div></div><div className="review-data-point"><span className="review-label">الميزانية المحددة والجدول الزمني</span><span className="review-value" id="m-budget" style={{color: '#38ef7d', fontWeight: '700'}}>-</span></div><div className="review-data-point"><span className="review-label">الهدف الأساسي وملاحظات العميل</span><p className="review-value" id="m-notes" style={{background: 'rgba(0,0,0,.3)', padding: '.85rem', borderRadius: '8px', fontSize: '.9rem', lineHeight: '1.6'}}>-</p></div></div></div></div>
<footer><div><strong>قبس | QABAS DIGITAL SOLUTIONS</strong> &copy; 2026. جميع الحقوق محفوظة.</div><div className="brand-pill-motto" style={{fontSize: '.7rem', borderColor: 'rgba(255,255,255,.06)'}}>Quality &bull; Ambition &bull; Boldness &bull; Artistry &bull; Substance</div><div className="footer-links"><a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener"><i className="fa-solid fa-tag"></i> الأسعار والباقات</a><a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener"><i className="fa-solid fa-globe"></i> موقع قبس</a><a href="#"><i className="fa-brands fa-instagram"></i></a><a href="#"><i className="fa-brands fa-facebook"></i></a></div></footer>
</div>
<div id="toast"></div>

    </>
  );
}
