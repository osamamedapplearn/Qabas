import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Flame, PhoneCall, Minimize2, Check } from 'lucide-react';
import { useQabasChat } from '../hooks/useQabasChat';

export default function Chatbot() {
  const { isOpen, setIsOpen, showTooltip, setShowTooltip, messages, loading, sendMessage } = useQabasChat();
  const [inputPrompt, setInputPrompt] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleChipClick = (chipText) => sendMessage(chipText);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    sendMessage(`رقم الواتساب الخاص بي لحجز الاستشارة: ${phoneNumber}`);
    setLeadSubmitted(true);
    setShowLeadForm(false);
  };

  const suggestionChips = [
    { text: 'عايز أعرف تفاصيل باقة NOVA', label: 'باقة NOVA' },
    { text: 'محتاج مونتاج ريلز فقط', label: 'مونتاج ريلز' },
    { text: 'عايز أعمل موقع إلكتروني', label: 'تطوير موقع' },
    { text: 'حسب الميزانية (احسب تكلفة باقتي)', label: 'حاسبة الميزانية' },
  ];

  return (
    <>
      {/* ── Floating Trigger ── */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              className="relative bg-white border border-brand-red/15 text-brand-ink px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 max-w-xs shadow-[0_10px_30px_rgba(139,0,0,0.1)]"
            >
              <span>أهلاً بك في قبس! كيف يمكننا مساعدتك اليوم؟</span>
              <button onClick={() => setShowTooltip(false)} className="text-brand-ink-soft hover:text-brand-red mr-1" aria-label="إغلاق التلميح">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
          aria-label="مساعد قبس الذكي"
          className="relative w-16 h-16 rounded-full btn-glow flex items-center justify-center cursor-pointer shadow-xl shadow-brand-red/30"
        >
          <span className="absolute inset-0 rounded-full bg-brand-red-vivid/40 motion-safe:animate-ping pointer-events-none" />
          <div className="w-full h-full rounded-full flex items-center justify-center text-white relative z-10">
            {isOpen ? <X className="w-7 h-7" /> : <Flame className="w-7 h-7" />}
          </div>
        </motion.button>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 left-4 sm:left-8 z-40 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] rounded-3xl bg-white/95 backdrop-blur-xl border border-brand-red/15 shadow-[0_20px_60px_rgba(139,0,0,0.15)] flex flex-col overflow-hidden text-right"
          >
            {/* Header — Solid Logo Red */}
            <div className="p-4 px-6 bg-gradient-to-r from-brand-red-vivid to-brand-red flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-md">
                  <Bot className="w-5 h-5" />
                  <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-brand-red" />
                </div>
                <div>
                  <h4 className="font-arabic text-base font-bold text-white drop-shadow-sm">Qabas Co-Pilot</h4>
                  <span className="text-[11px] text-white/80 font-medium">المساعد الذكي لخدمة العملاء</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="تصغير المساعد" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-brand-snow">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-l from-brand-red-vivid to-brand-red text-white rounded-br-none'
                      : 'bg-white border border-brand-red/10 text-brand-ink rounded-bl-none'
                  }`}>
                    <p className="whitespace-pre-line font-body font-medium">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-brand-ink-soft mt-1.5 px-1 font-medium">{msg.timestamp}</span>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white border border-brand-red/10 w-fit shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red-vivid animate-bounce" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-deep animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chips */}
            <div className="px-5 py-3 bg-white border-t border-brand-red/10 flex gap-2 overflow-x-auto no-scrollbar shadow-inner">
              {suggestionChips.map((chip, idx) => (
                <button key={idx} onClick={() => handleChipClick(chip.text)} className="shrink-0 px-3.5 py-1.5 rounded-full bg-brand-snow border border-brand-red/20 hover:bg-brand-red hover:text-white hover:border-brand-red text-[11px] font-bold text-brand-maroon transition-all shadow-sm">
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Lead CTA */}
            {!showLeadForm && !leadSubmitted && (
              <div className="px-5 py-3 bg-white border-t border-brand-red/10 text-center">
                <button onClick={() => setShowLeadForm(true)} className="text-xs text-brand-red hover:text-brand-red-vivid font-extrabold flex items-center justify-center gap-1.5 w-full transition-colors">
                  <PhoneCall className="w-4 h-4" /> سجّل رقمك لحجز استشارة مخصصة
                </button>
              </div>
            )}

            {/* Lead Form */}
            {showLeadForm && (
              <form onSubmit={handleLeadSubmit} className="p-4 bg-brand-snow border-t border-brand-red/10 flex gap-3 shadow-inner">
                <input type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\s]{8,15}" placeholder="أدخل رقم الواتساب..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} aria-label="رقم الواتساب" className="flex-1 bg-white border border-brand-red/20 rounded-xl px-4 py-2.5 text-xs text-brand-ink font-bold placeholder-brand-ink-soft focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-sm transition-all" />
                <button type="submit" className="px-4 py-2.5 rounded-xl btn-glow text-white font-bold text-xs flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> إرسال
                </button>
              </form>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-brand-red/10 flex items-center gap-3 shadow-[0_-5px_15px_rgba(139,0,0,0.03)] z-10">
              <input type="text" placeholder="اكتب استفسارك هنا..." value={inputPrompt} onChange={(e) => setInputPrompt(e.target.value)} className="flex-1 bg-brand-snow border border-brand-red/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-ink font-medium placeholder-brand-ink-soft focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
              <button type="submit" disabled={!inputPrompt.trim()} aria-label="إرسال الرسالة" className="p-3 rounded-xl btn-glow text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
