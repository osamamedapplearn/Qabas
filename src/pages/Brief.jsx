import React, { useState, useRef } from "react";
import "./Brief.css";
import { BRIEF_SERVICES as SERVICES, servicePriceLabel } from "../content";

const WA_NUMBER = '201144712845';

const STEPS = [
  { n: 1, label: "بياناتك" },
  { n: 2, label: "عن البراند" },
  { n: 3, label: "احتياجاتك" },
  { n: 4, label: "جمهورك" },
  { n: 5, label: "أهدافك" },
  { n: 6, label: "الذوق والمنافسون" },
  { n: 7, label: "الميزانية" },
];

const GOALS = [
  { key: "زيادة المبيعات المباشرة", title: "زيادة المبيعات", desc: "تحقيق عائد استثماري فوري وتكثيف عمليات الشراء", icon: "fa-chart-line" },
  { key: "بناء وترسيخ الهوية", title: "بناء الهوية والبراند", desc: "صناعة حضور ذهني راسخ ومظهر فاخر واثق", icon: "fa-crown" },
  { key: "زيادة الانتشار والوعي", title: "الانتشار والوعي (Awareness)", desc: "الوصول إلى أكبر شريحة ممكنة والتصدر بالسوق", icon: "fa-satellite-dish" },
  { key: "إطلاق منتج أو خدمة جديدة", title: "إطلاق منتج جديد", desc: "حملة تدشين متكاملة للمنتج الجديد بضجة قوية", icon: "fa-rocket" },
  { key: "تحسين الصورة الاحترافية", title: "تحسين الاحترافية والسمعة", desc: "رفع مستوى المصداقية وجذب عملاء نخبة ومستثمرين", icon: "fa-shield-halved" },
  { key: "أهداف تسويقية أخرى", title: "أخرى / متعدد", desc: "حزمة أهداف متداخلة قصيرة وطويلة المدى", icon: "fa-arrows-to-circle" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step, formData, selectedServices, selectedGoals) {
  const errs = {};
  if (step === 1) {
    if (!formData.client_company.trim()) errs.client_company = "فضلاً أدخل اسم العميل / الشركة.";
    if (!formData.client_name.trim()) errs.client_name = "فضلاً أدخل اسم المسؤول.";
    const digits = formData.client_phone.replace(/\D/g, "");
    if (!formData.client_phone.trim()) errs.client_phone = "فضلاً أدخل رقم الهاتف / واتساب.";
    else if (digits.length < 7) errs.client_phone = "رقم الهاتف غير مكتمل — تأكد من إدخال رقم صحيح.";
    if (!formData.client_email.trim()) errs.client_email = "فضلاً أدخل البريد الإلكتروني.";
    else if (!EMAIL_RE.test(formData.client_email.trim())) errs.client_email = "صيغة البريد الإلكتروني غير صحيحة.";
  }
  if (step === 2) {
    if (!formData.brand_story.trim()) errs.brand_story = "فضلاً اكتب نبذة مختصرة عن البراند — هذا الحقل مطلوب.";
    else if (formData.brand_story.trim().length < 10) errs.brand_story = "النبذة قصيرة جدًا — أضف تفاصيل أكثر (10 أحرف على الأقل).";
  }
  if (step === 3) {
    if (selectedServices.size === 0) errs.services = "اختر خدمة واحدة على الأقل للمتابعة.";
  }
  if (step === 5) {
    if (selectedGoals.size === 0) errs.goals = "اختر هدفًا واحدًا على الأقل للمتابعة.";
  }
  return errs;
}

function buildWhatsAppMessage(formData, selectedServices, selectedGoals, refCode) {
  const services = [...selectedServices].join('، ') || '-';
  const goals = [...selectedGoals].join('، ') || '-';
  return `🌟 *بريف مشروع جديد — قبس QABAS*
كود المرجع: ${refCode}

👤 *بيانات العميل*
الاسم: ${formData.client_name || '-'}
الشركة/الكيان: ${formData.client_company || '-'}
الهاتف: ${formData.client_phone || '-'}
البريد: ${formData.client_email || '-'}
المجال: ${formData.client_industry || '-'}
الموقع الحالي: ${formData.client_website || '-'}
السوشيال: ${formData.client_socials || '-'}

🏷️ *عن البراند*
قصة البراند: ${formData.brand_story || '-'}
المنتجات/الخدمات: ${formData.brand_products || '-'}
الميزة التنافسية: ${formData.brand_usp || '-'}
الهوية البصرية الحالية: ${formData.has_identity}

🎯 *الاحتياجات والخدمات*
الخدمات المطلوبة: ${services}
تفاصيل: ${formData.services_detail || '-'}

👥 *الجمهور المستهدف*
الفئة العمرية: ${formData.audience_age || '-'}
الجنس: ${formData.audience_gender}
الموقع الجغرافي: ${formData.audience_location || '-'}
المستوى الاقتصادي: ${formData.audience_economic || '-'}
الاهتمامات: ${formData.audience_interests || '-'}
القنوات المفضلة: ${formData.audience_channels || '-'}

📈 *الأهداف والنتائج*
الأهداف: ${goals}
مؤشرات النجاح: ${formData.project_kpi || '-'}

🔍 *المنافسون*
أسماء: ${formData.competitors_names || '-'}
روابط: ${formData.competitors_links || '-'}
نقاط قوتهم: ${formData.competitors_pros || '-'}
نقاط ضعفهم: ${formData.competitors_cons || '-'}

🎨 *الذوق البصري*
ألوان مفضلة: ${formData.colors_fav || '-'}
ألوان يتجنبها: ${formData.colors_avoid || '-'}
أسلوب التصميم: ${formData.visual_style || '-'}

💰 *الميزانية والجدول الزمني*
الميزانية: ${formData.project_budget}
موعد البدء: ${formData.project_start}
ملاحظات إضافية: ${formData.additional_notes || '-'}

---
تم الإرسال عبر موقع قبس الرقمي 🚀`;
}

export default function Brief() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [view, setView] = useState("welcome"); // welcome, form, review, success
  const [selectedServices, setSelectedServices] = useState(new Set(["تصميم وهوية بصرية","مواقع إلكترونية وبرمجة"]));
  const [selectedGoals, setSelectedGoals] = useState(new Set(["زيادة المبيعات المباشرة","بناء وترسيخ الهوية"]));
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [briefRef, setBriefRef] = useState("QBS-8942");
  const [waMessage, setWaMessage] = useState("");
  const [waUrl, setWaUrl] = useState("#");
  const toastTimer = useRef(null);

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

  const showToast = (msg, isErr) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, err: !!isErr });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const handleInputChange = (e) => {
    const { id, value, name, type } = e.target;
    const key = type === "radio" ? name : id;
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Helpers for controlled fields
  const bind = (id) => ({
    id,
    value: formData[id],
    onChange: handleInputChange,
    "aria-invalid": errors[id] ? true : undefined,
  });

  const checkRadio = (name, value) => ({
    name,
    value,
    checked: formData[name] === value,
    onChange: handleInputChange,
  });

  const toggleService = (s) => {
    const newSet = new Set(selectedServices);
    if (newSet.has(s)) newSet.delete(s);
    else newSet.add(s);
    setSelectedServices(newSet);
    setErrors((prev) => {
      if (!prev.services) return prev;
      const next = { ...prev };
      delete next.services;
      return next;
    });
  };

  const toggleGoal = (g) => {
    const newSet = new Set(selectedGoals);
    if (newSet.has(g)) newSet.delete(g);
    else newSet.add(g);
    setSelectedGoals(newSet);
    setErrors((prev) => {
      if (!prev.goals) return prev;
      const next = { ...prev };
      delete next.goals;
      return next;
    });
  };

  const cardKeyDown = (e, fn) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  const jumpToStep = (step) => {
    setErrors({});
    setCurrentStep(step);
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requestStep = (target) => {
    if (target === currentStep) return;
    if (target < currentStep) {
      jumpToStep(target);
      return;
    }
    // Forward jump: validate every step in between, land on first invalid one
    for (let s = currentStep; s < target; s++) {
      const errs = validateStep(s, formData, selectedServices, selectedGoals);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        if (s !== currentStep) setCurrentStep(s);
        showToast("أكمل الحقول المطلوبة أولاً قبل التقدم.", true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    jumpToStep(target);
  };

  const navigateStep = (dir) => {
    if (dir === 1) {
      const errs = validateStep(currentStep, formData, selectedServices, selectedGoals);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        const firstMsg = Object.values(errs)[0];
        showToast(firstMsg, true);
        return;
      }
      setErrors({});
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setView("review");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (currentStep > 1) {
        setErrors({});
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const submitFinalBrief = () => {
    const ref = `QBS-${Math.floor(1000 + Math.random() * 9000)}`;
    const message = buildWhatsAppMessage(formData, selectedServices, selectedGoals, ref);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    setBriefRef(ref);
    setWaMessage(message);
    setWaUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyBrief = async () => {
    if (!waMessage) return;
    try {
      await navigator.clipboard.writeText(waMessage);
      showToast("تم نسخ نص البريف بنجاح.", false);
    } catch {
      showToast("تعذر النسخ التلقائي — انسخ النص من المعاينة.", true);
    }
  };

  const goHome = () => {
    setView("welcome");
    setCurrentStep(1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const v = (val) => (val && String(val).trim() ? val : "-");

  return (
    <>

<div className="cosmic-arc" aria-hidden="true"></div>
<div className="app-container brief-page">
<header className="brief-header">
<a href="#" className="brand-group" onClick={(e) => { e.preventDefault(); goHome(); }}>
<div className="brand-mark" title="QABAS"><div className="brand-mark-cell"><i className="fa-solid fa-paper-plane" style={{transform: 'scaleX(-1)'}}></i></div><div className="brand-mark-cell"><i className="fa-solid fa-bolt"></i></div><div className="brand-mark-cell"><i className="fa-solid fa-wave-square"></i></div><div className="brand-mark-cell"><i className="fa-solid fa-link"></i></div></div>
<div className="brand-text-block"><span className="brand-arabic">قَبَسْ</span><span className="brand-latin">QABAS</span></div>
</a>
<div className="brand-pill-motto"><span><span className="motto-letter">Q</span>uality.</span><span><span className="motto-letter">A</span>mbition.</span><span><span className="motto-letter">B</span>oldness.</span><span><span className="motto-letter">A</span>rtistry.</span><span><span className="motto-letter">S</span>ubstance.</span></div>
</header>
<main className="brief-main">
{/*  WELCOME  */}
<section id="screen-welcome" className="view-welcome" style={{display: view === 'welcome' ? '' : 'none'}}>
<div className="hero-banner-visual"><img src="https://www.designarena.ai/u/a610a667-0dd7-45ce-aa61-55952e6d4d49" alt="Qabas Digital Agency Aesthetic Banner" /></div>
<div className="hero-badge"><i className="fa-solid fa-sparkles"></i> رحلة انطلاق شريكتك الرقمية</div>
<h1 className="hero-title">خلّي <span>قبس</span> يعرف مشروعك أكثر</h1>
<p className="hero-subtitle">كل ما عرفنا مشروعك وتفاصيل رؤيتك بشكل أفضل، قدرنا نبني لك الحل الإبداعي المناسب بدقة فائقة وأثر استثنائي في السوق.</p>
<button className="btn-start-hero" onClick={() => { setView('form'); setCurrentStep(1); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><span>ابدأ البريف الآن</span><i className="fa-solid fa-arrow-left"></i></button>
<div className="welcome-links-row">
<a className="link-visit-qabas" href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener"><i className="fa-solid fa-globe"></i> زيارة موقع قبس <i className="fa-solid fa-arrow-up-left" style={{fontSize: '.7rem', opacity: '.7'}}></i></a>
</div>
<div className="trust-row"><span className="trust-chip"><i className="fa-solid fa-check"></i> إرسال مباشر عبر واتساب</span><span className="trust-chip"><i className="fa-solid fa-lock"></i> بياناتك بأمان مع فريق قبس</span><span className="trust-chip"><i className="fa-solid fa-bolt"></i> رد خلال 24 ساعة</span></div>
<p className="welcome-micro">Qabas — قَبَس | حلول رقمية.. تفوق التوقعات — <a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener">qabas-three.vercel.app</a></p>
</section>
{/*  FORM  */}
<section id="screen-form" style={{display: view === 'form' ? '' : 'none'}}>
<div className="stepper-header"><div className="stepper-track-wrap"><div className="stepper-track" id="stepsTrack">
{STEPS.map((s) => (
<button key={s.n} type="button" onClick={() => requestStep(s.n)} aria-current={currentStep === s.n ? "step" : undefined} aria-label={`الخطوة ${s.n}: ${s.label}`} className={`step-pill${currentStep === s.n ? " active" : ""}${currentStep > s.n ? " completed" : ""}`}><span className="step-num">{String(s.n).padStart(2, "0")}</span><span>{s.label}</span></button>
))}
</div></div><div className="progress-line-container"><div className="progress-line-fill" id="progressFillBar" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep} aria-label={`التقدم: الخطوة ${currentStep} من ${totalSteps}`} style={{width: `${(currentStep / totalSteps) * 100}%`}}></div></div></div>
<div className="form-stage-card">
<div className="step-content" id="step-1" style={{display: currentStep === 1 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-regular fa-id-badge"></i> بيانات العميل الأساسية</h2><p className="stage-desc">معلومات التواصل السريع للبدء في تنسيق استراتيجيتك مع فريق قبس</p></div><span className="stage-badge">STEP 01 / 07</span></div>
<div className="fields-grid">
<div className="form-group"><label className="form-label" htmlFor="client_company">اسم العميل / الشركة <span className="required-star">*</span></label><div className="input-wrapper"><input type="text" className="form-control" placeholder="مثال: شركة مدار للحلول التقنية" {...bind("client_company")} aria-required="true" /><i className="fa-solid fa-building field-icon"></i></div>{errors.client_company && <p className="field-error" role="alert">{errors.client_company}</p>}</div>
<div className="form-group"><label className="form-label" htmlFor="client_name">اسم المسؤول <span className="required-star">*</span></label><div className="input-wrapper"><input type="text" className="form-control" placeholder="مثال: أحمد عبد الله" {...bind("client_name")} aria-required="true" /><i className="fa-solid fa-user field-icon"></i></div>{errors.client_name && <p className="field-error" role="alert">{errors.client_name}</p>}</div>
<div className="form-group"><label className="form-label" htmlFor="client_phone">رقم الهاتف / واتساب <span className="required-star">*</span></label><div className="input-wrapper"><input type="tel" className="form-control" placeholder="مثال: +20 10 1234 5678" {...bind("client_phone")} aria-required="true" /><i className="fa-brands fa-whatsapp field-icon"></i></div>{errors.client_phone && <p className="field-error" role="alert">{errors.client_phone}</p>}</div>
<div className="form-group"><label className="form-label" htmlFor="client_email">البريد الإلكتروني <span className="required-star">*</span></label><div className="input-wrapper"><input type="email" className="form-control" placeholder="name@company.com" {...bind("client_email")} aria-required="true" /><i className="fa-solid fa-envelope field-icon"></i></div>{errors.client_email && <p className="field-error" role="alert">{errors.client_email}</p>}</div>
<div className="form-group"><label className="form-label" htmlFor="client_industry">مجال النشاط التجاري</label><div className="input-wrapper"><input type="text" className="form-control" placeholder="مثال: تجارة إلكترونية، مطاعم..." {...bind("client_industry")} /><i className="fa-solid fa-briefcase field-icon"></i></div></div>
<div className="form-group"><label className="form-label" htmlFor="client_website">رابط الموقع الحالي (إن وجد)</label><div className="input-wrapper"><input type="url" className="form-control" placeholder="https://example.com" {...bind("client_website")} /><i className="fa-solid fa-globe field-icon"></i></div></div>
<div className="form-group field-span-2"><label className="form-label" htmlFor="client_socials">روابط السوشيال ميديا الحالية</label><div className="input-wrapper"><input type="text" className="form-control" placeholder="Instagram, LinkedIn, Facebook, TikTok..." {...bind("client_socials")} /><i className="fa-solid fa-share-nodes field-icon"></i></div></div>
</div>
</div>
<div className="step-content" id="step-2" style={{display: currentStep === 2 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-fingerprint"></i> عن البراند والهوية</h2><p className="stage-desc">ساعدنا نتعرف على جوهر مشروعك، وقيمك التنافسية</p></div><span className="stage-badge">STEP 02 / 07</span></div>
<div className="fields-grid full">
<div className="form-group"><label className="form-label" htmlFor="brand_story">عرفنا بنفسك وبنشاطك التجاري <span className="required-star">*</span></label><textarea className="form-control" placeholder="اكتب نبذة مختصرة عن فكرة البراند وقصته، وكيف بدأ؟" {...bind("brand_story")} aria-required="true"></textarea>{errors.brand_story && <p className="field-error" role="alert">{errors.brand_story}</p>}</div>
<div className="form-group"><label className="form-label" htmlFor="brand_products">ما هي المنتجات أو الخدمات التي تقدمها تحديدًا؟</label><textarea className="form-control" placeholder="تفاصيل قائمة خدماتك أو المنتجات الرئيسية وأسعارها التقديرية" {...bind("brand_products")}></textarea></div>
<div className="form-group"><label className="form-label" htmlFor="brand_usp">ما الذي يميّزك عن المنافسين؟ (القيمة الفريدة USP)</label><input type="text" className="form-control" placeholder="مثال: الجودة العالية، خدمة العملاء السريعة..." style={{paddingRight: '1.25rem'}} {...bind("brand_usp")} /></div>
<div className="form-group"><label className="form-label">هل لديك هوية بصرية حالية؟</label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" id="has_id_yes" {...checkRadio("has_identity", "نعم لدي هوية كاملة")} /><label className="radio-pill-label" htmlFor="has_id_yes"><span className="custom-radio-circle"></span><span>نعم، لدي هوية وشعار</span></label></div>
<div className="radio-pill-item"><input type="radio" id="has_id_partial" {...checkRadio("has_identity", "لدي شعار فقط وأحتاج تطوير")} /><label className="radio-pill-label" htmlFor="has_id_partial"><span className="custom-radio-circle"></span><span>لدي شعار فقط وأحتاج تجديد</span></label></div>
<div className="radio-pill-item"><input type="radio" id="has_id_none" {...checkRadio("has_identity", "مشروع جديد لا توجد هوية")} /><label className="radio-pill-label" htmlFor="has_id_none"><span className="custom-radio-circle"></span><span>مشروع جديد بالكامل</span></label></div>
</div></div>
</div>
</div>
<div className="step-content" id="step-3" style={{display: currentStep === 3 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-cubes"></i> ماذا تحتاج من قبس؟</h2><p className="stage-desc">اختر خدمة أو أكثر لتكوين باقة العمل المتكاملة لمشروعك</p></div><span className="stage-badge">STEP 03 / 07</span></div>
<div className="selectable-cards-grid" id="servicesGrid">
{SERVICES.map((s) => {
  const selected = selectedServices.has(s.key);
  return (
<div key={s.key} className={`select-card${selected ? " selected" : ""}`} role="checkbox" aria-checked={selected} aria-label={s.key} tabIndex={0} onClick={() => toggleService(s.key)} onKeyDown={(e) => cardKeyDown(e, () => toggleService(s.key))}><div className="select-card-header"><div className="select-card-icon"><i className={`fa-solid ${s.icon}`}></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">{s.title}</div><div className="select-card-desc">{s.desc}</div><div className="select-card-price">{servicePriceLabel(s)}</div></div>
  );
})}
</div>
{errors.services && <p className="field-error" role="alert" style={{marginTop: '1rem'}}>{errors.services}</p>}
<div className="form-group" style={{marginTop: '1.75rem'}}><label className="form-label" htmlFor="services_detail">احكيلنا بالتفصيل، إيه اللي محتاجه من قبس بالتحديد؟</label><textarea className="form-control" placeholder="اكتب أي ملاحظات أو أفكار مسبقة ترغب في تنفيذها..." {...bind("services_detail")}></textarea></div>
</div>
<div className="step-content" id="step-4" style={{display: currentStep === 4 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-users-viewfinder"></i> الجمهور المستهدف</h2><p className="stage-desc">من هم الأشخاص الذين نصنع هذا العمل من أجلهم؟</p></div><span className="stage-badge">STEP 04 / 07</span></div>
<div className="fields-grid">
<div className="form-group"><label className="form-label" htmlFor="audience_age">الفئة العمرية المستهدفة</label><div className="input-wrapper"><input type="text" className="form-control" placeholder="مثال: من 22 إلى 45 سنة" {...bind("audience_age")} /><i className="fa-solid fa-calendar-days field-icon"></i></div></div>
<div className="form-group"><label className="form-label">الجنس</label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" id="gender_all" {...checkRadio("audience_gender", "الجميع (ذكور وإناث)")} /><label className="radio-pill-label" htmlFor="gender_all"><span className="custom-radio-circle"></span><span>الجميع</span></label></div>
<div className="radio-pill-item"><input type="radio" id="gender_female" {...checkRadio("audience_gender", "سيدات فقط")} /><label className="radio-pill-label" htmlFor="gender_female"><span className="custom-radio-circle"></span><span>سيدات</span></label></div>
<div className="radio-pill-item"><input type="radio" id="gender_male" {...checkRadio("audience_gender", "رجال فقط")} /><label className="radio-pill-label" htmlFor="gender_male"><span className="custom-radio-circle"></span><span>رجال</span></label></div>
</div></div>
<div className="form-group"><label className="form-label" htmlFor="audience_location">الموقع الجغرافي</label><div className="input-wrapper"><input type="text" className="form-control" placeholder="مثال: القاهرة والإسكندرية، أو دول الخليج..." {...bind("audience_location")} /><i className="fa-solid fa-map-pin field-icon"></i></div></div>
<div className="form-group"><label className="form-label" htmlFor="audience_economic">المستوى الاقتصادي</label><div className="input-wrapper"><input type="text" className="form-control" placeholder="مثال: Class A / B+ أو متوسط الدخل" {...bind("audience_economic")} /><i className="fa-solid fa-gem field-icon"></i></div></div>
<div className="form-group field-span-2"><label className="form-label" htmlFor="audience_interests">اهتمامات وسلوكيات الجمهور</label><textarea className="form-control" placeholder="ما هي اهتماماتهم؟ ما التطبيقات التي يفضلونها؟ ما المشكلات التي يبحثون عن حل لها؟" {...bind("audience_interests")}></textarea></div>
<div className="form-group field-span-2"><label className="form-label" htmlFor="audience_channels">كيف يصل إليك العملاء حاليًا؟</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} placeholder="مثال: ترشيحات الأصدقاء، إنستغرام، إعلانات جوجل..." {...bind("audience_channels")} /></div>
</div>
</div>
<div className="step-content" id="step-5" style={{display: currentStep === 5 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-bullseye"></i> أهداف المشروع</h2><p className="stage-desc">ما الهدف الأساسي الذي تسعى لتحقيقه من خلال العمل مع قبس؟</p></div><span className="stage-badge">STEP 05 / 07</span></div>
<div className="selectable-cards-grid" id="goalsGrid">
{GOALS.map((g) => {
  const selected = selectedGoals.has(g.key);
  return (
<div key={g.key} className={`select-card${selected ? " selected" : ""}`} role="checkbox" aria-checked={selected} aria-label={g.key} tabIndex={0} onClick={() => toggleGoal(g.key)} onKeyDown={(e) => cardKeyDown(e, () => toggleGoal(g.key))}><div className="select-card-header"><div className="select-card-icon"><i className={`fa-solid ${g.icon}`}></i></div><div className="select-check"><i className="fa-solid fa-check"></i></div></div><div className="select-card-title">{g.title}</div><div className="select-card-desc">{g.desc}</div></div>
  );
})}
</div>
{errors.goals && <p className="field-error" role="alert" style={{marginTop: '1rem'}}>{errors.goals}</p>}
<div className="form-group" style={{marginTop: '1.75rem'}}><label className="form-label" htmlFor="project_kpi">كيف ستعرف أن هذا المشروع قد نجح تمامًا؟ (مقياس النجاح KPI)</label><textarea className="form-control" placeholder="مثال: وصولنا لـ 1,000 عميل خلال 3 أشهر، أو مضاعفة عائد الإنفاق الإعلاني..." {...bind("project_kpi")}></textarea></div>
</div>
<div className="step-content" id="step-6" style={{display: currentStep === 6 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-palette"></i> المنافسون والذوق البصري</h2><p className="stage-desc">لنعرف الاتجاه الفني الذي يروق لك والاتجاه الذي نبتعد عنه</p></div><span className="stage-badge">STEP 06 / 07</span></div>
<div className="fields-grid">
<div className="form-group"><label className="form-label" htmlFor="competitors_names">أهم المنافسين محليًا أو عالميًا</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} placeholder="اذكر 2 - 3 منافسين بارزين" {...bind("competitors_names")} /></div>
<div className="form-group"><label className="form-label" htmlFor="competitors_links">روابط حسابات أو مواقع المنافسين</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} placeholder="https://instagram.com/competitor" {...bind("competitors_links")} /></div>
<div className="form-group"><label className="form-label" htmlFor="competitors_pros">ما الذي يعجبك في عملهم؟</label><textarea className="form-control" placeholder="مثال: بساطة التصميم، طريقة تصوير المنتجات..." {...bind("competitors_pros")}></textarea></div>
<div className="form-group"><label className="form-label" htmlFor="competitors_cons">ما الذي لا يعجبك وتود تجنبه؟</label><textarea className="form-control" placeholder="مثال: الألوان باهتة، إعلاناتهم مكررة..." {...bind("competitors_cons")}></textarea></div>
<div className="form-group"><label className="form-label" htmlFor="colors_fav">الألوان المفضلة للبراند</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} placeholder="مثال: أسود، أحمر داكن، ذهبي..." {...bind("colors_fav")} /></div>
<div className="form-group"><label className="form-label" htmlFor="colors_avoid">الألوان التي لا ترغب باستخدامها إطلاقًا</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} placeholder="مثال: لا نريد الأصفر، أو الألوان الفاقعة" {...bind("colors_avoid")} /></div>
<div className="form-group field-span-2"><label className="form-label" htmlFor="visual_style">وصف الستايل العام الذي تفضله</label><input type="text" className="form-control" style={{paddingRight: '1.25rem'}} placeholder="مثال: فخم، جريء وعصري، مينيمال هادئ..." {...bind("visual_style")} /></div>
</div>
</div>
<div className="step-content" id="step-7" style={{display: currentStep === 7 ? '' : 'none'}}>
<div className="stage-header"><div><h2 className="stage-title"><i className="fa-solid fa-wallet"></i> الميزانية والجدول الزمني</h2><p className="stage-desc">تحديد الإطار الاستثماري المناسب لتصميم الباقة المثالية</p></div><span className="stage-badge">STEP 07 / 07</span></div>
<div className="fields-grid full">
<div className="form-group"><label className="form-label">الميزانية المتوقعة للمشروع <span className="required-star">*</span></label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" id="b_1" {...checkRadio("project_budget", "أقل من 2,000 جنيه")} /><label className="radio-pill-label" htmlFor="b_1"><span className="custom-radio-circle"></span><span>أقل من 2,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" id="b_2" {...checkRadio("project_budget", "2,000 – 5,000 جنيه")} /><label className="radio-pill-label" htmlFor="b_2"><span className="custom-radio-circle"></span><span>2,000 – 5,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" id="b_3" {...checkRadio("project_budget", "5,000 – 10,000 جنيه")} /><label className="radio-pill-label" htmlFor="b_3"><span className="custom-radio-circle"></span><span>5,000 – 10,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" id="b_4" {...checkRadio("project_budget", "10,000 – 20,000 جنيه")} /><label className="radio-pill-label" htmlFor="b_4"><span className="custom-radio-circle"></span><span>10,000 – 20,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" id="b_5" {...checkRadio("project_budget", "أكثر من 20,000 جنيه")} /><label className="radio-pill-label" htmlFor="b_5"><span className="custom-radio-circle"></span><span>أكثر من 20,000 جنيه</span></label></div>
<div className="radio-pill-item"><input type="radio" id="b_6" {...checkRadio("project_budget", "أحتاج إلى اقتراح مناسب")} /><label className="radio-pill-label" htmlFor="b_6"><span className="custom-radio-circle"></span><span>أحتاج إلى اقتراح مناسب</span></label></div>
</div></div>
<div className="form-group" style={{marginTop: '1rem'}}><label className="form-label">الموعد المستهدف لبدء المشروع</label><div className="radio-pill-group">
<div className="radio-pill-item"><input type="radio" id="start_asap" {...checkRadio("project_start", "فورًا وبشكل عاجل")} /><label className="radio-pill-label" htmlFor="start_asap"><span className="custom-radio-circle"></span><span>فورًا (بشكل عاجل)</span></label></div>
<div className="radio-pill-item"><input type="radio" id="start_week" {...checkRadio("project_start", "خلال أسبوع")} /><label className="radio-pill-label" htmlFor="start_week"><span className="custom-radio-circle"></span><span>خلال أسبوع</span></label></div>
<div className="radio-pill-item"><input type="radio" id="start_month" {...checkRadio("project_start", "خلال شهر")} /><label className="radio-pill-label" htmlFor="start_month"><span className="custom-radio-circle"></span><span>خلال شهر</span></label></div>
<div className="radio-pill-item"><input type="radio" id="start_tbd" {...checkRadio("project_start", "لم أحدد بعد")} /><label className="radio-pill-label" htmlFor="start_tbd"><span className="custom-radio-circle"></span><span>لم أحدد بعد</span></label></div>
</div></div>
<div className="form-group" style={{marginTop: '1rem'}}><label className="form-label" htmlFor="additional_notes">هل هناك أي تفاصيل أخرى تريد أن يعرفها فريق قبس؟</label><textarea className="form-control" placeholder="ملاحظات ختامية، تواريخ معينة لمناسبات، شروط خاصة..." {...bind("additional_notes")}></textarea></div>
</div>
</div>
<div className="stage-actions-bar"><button type="button" className="btn-action btn-prev" id="btnPrev" style={{visibility: currentStep > 1 ? 'visible' : 'hidden'}} onClick={() => navigateStep(-1)}><i className="fa-solid fa-arrow-right"></i><span>السابق</span></button><button type="button" className="btn-action btn-next" id="btnNext" onClick={() => navigateStep(1)}><span>{currentStep === totalSteps ? "مراجعة البريف" : "التالي"}</span><i className="fa-solid fa-arrow-left"></i></button></div>
</div>
</section>
{/*  REVIEW  */}
<section id="screen-review" style={{display: view === 'review' ? '' : 'none'}}>
<div className="stage-header" style={{border: 'none', marginBottom: '1.5rem'}}><div><h1 className="stage-title" style={{fontSize: '2.2rem'}}><i className="fa-solid fa-clipboard-check"></i> راجع بريف مشروعك</h1><p className="stage-desc">تأكد من دقة كافة البيانات والمدخلات قبل إرسالها رسميًا إلى فريق قبس عبر واتساب.</p></div><span className="stage-badge">REVIEW STAGE</span></div>
<div className="review-grid">
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-user-check"></i> 01. بيانات العميل</div><button type="button" className="btn-edit-step" onClick={() => jumpToStep(1)}><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point"><span className="review-label">اسم العميل / الشركة</span><span className="review-value" id="rev-company">{v(formData.client_company)}</span></div><div className="review-data-point"><span className="review-label">اسم المسؤول</span><span className="review-value" id="rev-name">{v(formData.client_name)}</span></div><div className="review-data-point"><span className="review-label">الهاتف / واتساب</span><span className="review-value" id="rev-phone">{v(formData.client_phone)}</span></div><div className="review-data-point"><span className="review-label">البريد الإلكتروني</span><span className="review-value" id="rev-email">{v(formData.client_email)}</span></div><div className="review-data-point"><span className="review-label">مجال النشاط</span><span className="review-value" id="rev-industry">{v(formData.client_industry)}</span></div><div className="review-data-point"><span className="review-label">الموقع والسوشيال</span><span className="review-value" id="rev-links">{v([formData.client_website, formData.client_socials].filter((x) => x && x.trim()).join(" — "))}</span></div></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-fingerprint"></i> 02. عن البراند</div><button type="button" className="btn-edit-step" onClick={() => jumpToStep(2)}><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point" style={{gridColumn: '1/-1'}}><span className="review-label">نبذة عن النشاط</span><span className="review-value" id="rev-story">{v(formData.brand_story)}</span></div><div className="review-data-point"><span className="review-label">ما يميزك (USP)</span><span className="review-value" id="rev-usp">{v(formData.brand_usp)}</span></div><div className="review-data-point"><span className="review-label">حالة الهوية الحالية</span><span className="review-value" id="rev-hasid">{v(formData.has_identity)}</span></div></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-cubes"></i> 03. الخدمات المطلوبة من قبس</div><button type="button" className="btn-edit-step" onClick={() => jumpToStep(3)}><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-tags" id="rev-services-tags">{[...selectedServices].map((s) => (<span key={s} className="review-tag">{s}</span>))}</div><div className="review-data-point" style={{marginTop: '.5rem'}}><span className="review-label">تفاصيل إضافية عن المطلوب</span><span className="review-value" id="rev-services-notes">{v(formData.services_detail)}</span></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-crosshairs"></i> 04 & 05. الجمهور والأهداف</div><button type="button" className="btn-edit-step" onClick={() => jumpToStep(4)}><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point"><span className="review-label">الجمهور والموقع</span><span className="review-value" id="rev-audience-summary">{v([formData.audience_age, formData.audience_location].filter((x) => x && x.trim()).join(" — "))}</span></div><div className="review-data-point"><span className="review-label">الأهداف المحددة</span><div className="review-tags" id="rev-goals-tags">{[...selectedGoals].map((g) => (<span key={g} className="review-tag">{g}</span>))}</div></div><div className="review-data-point" style={{gridColumn: '1/-1'}}><span className="review-label">مقياس النجاح المنشود</span><span className="review-value" id="rev-kpi">{v(formData.project_kpi)}</span></div></div></div>
<div className="review-section-card"><div className="review-card-head"><div className="review-card-title"><i className="fa-solid fa-coins"></i> 06 & 07. الميزانية والجدول الزمني</div><button type="button" className="btn-edit-step" onClick={() => jumpToStep(7)}><i className="fa-solid fa-pen-to-square"></i> تعديل</button></div><div className="review-items-list"><div className="review-data-point"><span className="review-label">الميزانية المختارة</span><span className="review-value" id="rev-budget" style={{color: '#4ade80', fontWeight: '700'}}>{v(formData.project_budget)}</span></div><div className="review-data-point"><span className="review-label">الموعد المستهدف للبدء</span><span className="review-value" id="rev-timeline">{v(formData.project_start)}</span></div><div className="review-data-point" style={{gridColumn: '1/-1'}}><span className="review-label">ملاحظات ختامية</span><span className="review-value" id="rev-extra-notes">{v(formData.additional_notes)}</span></div></div></div>
</div>
<div className="stage-actions-bar" style={{marginTop: '2.5rem'}}><button type="button" className="btn-action btn-prev" onClick={() => jumpToStep(totalSteps)}><i className="fa-solid fa-arrow-right"></i><span>العودة للتعديل</span></button><button type="button" className="btn-action btn-next" style={{background: 'linear-gradient(135deg,#1da851 0%,#0e7a3a 100%)', boxShadow: '0 8px 24px rgba(37,211,102,.35)', fontSize: '1.15rem', padding: '1.1rem 2.2rem'}} onClick={submitFinalBrief}><span>إرسال البريف إلى قبس</span><i className="fa-brands fa-whatsapp" style={{fontSize: '1.4rem'}}></i></button></div>
<p style={{textAlign: 'center', marginTop: '1rem', fontSize: '.82rem', color: 'var(--text-dim)'}}><i className="fa-solid fa-lock"></i> بالضغط على إرسال سيتم تجهيز بريفك وفتح واتساب لإرساله مباشرة إلى فريق قبس — لن تحتاج إلا للضغط على زر الإرسال في واتساب.</p>
</section>
{/*  SUCCESS  */}
<section id="screen-success" style={{display: view === 'success' ? '' : 'none'}}>
<div className="form-stage-card success-container">
<div className="success-icon-wrap"><i className="fa-solid fa-check"></i></div>
<h2 className="success-title">وصل البريف بنجاح!</h2>
<p className="success-desc">شكرًا لك. أصبح لدى فريق <strong style={{color: '#fff'}}>قبس</strong> الآن صورة واضحة ومفصلة عن مشروعك ورؤيتك. سيقوم المدير الإبداعي واستشاري المشروعات بمراجعة بياناتك بدقة للتواصل معك لتحديد موعد الجلسة الاستكشافية.</p>
<div className="brief-id-badge">كود مرجع المشروع: <strong id="briefRefCode" style={{color: 'var(--primary-glow)', marginRight: '.5rem'}}>{briefRef}</strong></div>
<div className="confirm-whatsapp-banner"><div className="confirm-wa-icon"><i className="fa-brands fa-whatsapp"></i></div><div><div className="confirm-text">تم تجهيز البريف بنجاح، سيتم فتح واتساب لإرساله إلى فريق قبس.</div><div className="confirm-sub" id="waAutoNote">تم فتح محادثة واتساب تلقائيًا — ستجد رسالة البريف جاهزة، اضغط إرسال فقط. إذا لم تفتح، استخدم الزر بالأسفل.</div></div></div>
<div className="success-btns">
<a href={waUrl} id="btnOpenWhatsApp" className="btn-whatsapp" target="_blank" rel="noopener"><i className="fa-brands fa-whatsapp"></i><span>إرسال عبر واتساب الآن</span></a>
<button type="button" className="btn-ghost-light" onClick={copyBrief}><i className="fa-solid fa-copy"></i><span>نسخ نص البريف</span></button>
</div>
<div className="success-btns" style={{marginTop: '.2rem'}}>
<button type="button" className="btn-ghost-light" style={{padding: '.8rem 1.5rem', fontSize: '.9rem'}} onClick={goHome}><i className="fa-solid fa-house"></i><span>العودة إلى الرئيسية</span></button>
<a className="btn-ghost-light" href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener" style={{padding: '.8rem 1.5rem', fontSize: '.9rem', borderColor: 'rgba(37,211,102,.35)'}}><i className="fa-solid fa-globe" style={{color: '#25d366'}}></i><span>زيارة موقع قبس</span></a>
</div>
<div className="wa-preview-wrap"><details id="waPreviewDetails"><summary><i className="fa-brands fa-whatsapp" style={{color: '#25d366'}}></i> معاينة رسالة الواتساب المجهزة <span style={{fontWeight: '400', color: 'var(--text-dim)', fontSize: '.78rem'}}>(اضغط للعرض)</span></summary><div className="wa-preview-text" id="waMessagePreview">{waMessage || "..."}</div></details></div>
<p className="success-site-note">Qabas — قَبَس | حلول رقمية.. تفوق التوقعات — <a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener">زيارة موقع قبس: qabas-three.vercel.app</a></p>
</div>
</section>
</main>
<footer className="brief-footer"><div><strong>قبس | QABAS DIGITAL SOLUTIONS</strong> &copy; 2026. جميع الحقوق محفوظة.</div><div className="brand-pill-motto" style={{fontSize: '.7rem', borderColor: 'rgba(255,255,255,.06)'}}>Quality &bull; Ambition &bull; Boldness &bull; Artistry &bull; Substance</div><div className="footer-links"><a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener"><i className="fa-solid fa-tag"></i> الأسعار والباقات</a><a href="https://qabas-three.vercel.app/#pricing" target="_blank" rel="noopener"><i className="fa-solid fa-globe"></i> موقع قبس</a><a href="#"><i className="fa-brands fa-instagram"></i></a><a href="#"><i className="fa-brands fa-facebook"></i></a></div></footer>
</div>
<div id="toast" role="status" aria-live="polite" className={toast ? `show${toast.err ? " err" : ""}` : ""}>{toast ? toast.msg : ""}</div>

    </>
  );
}
