import { useState, useEffect } from 'react';

export function useQabasChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'أهلاً بك في قبس. أنا مساعدك الذكي، كيف يمكنني مساعدتك في اختيار الباقة المناسبة لمشروعك؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  // Show tooltip after 3 seconds on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock API integration function ready for backend
  const sendMessageToBackend = async (userMessageText) => {
    try {
      /* 
        ====================================================
        BACKEND ENDPOINT INTEGRATION PLACEHOLDER
        ====================================================
        To connect to your live backend API:
        
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessageText, history: messages })
        });
        const data = await response.json();
        return data.reply;
      */

      // Simulated AI response for demo readiness
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const lower = userMessageText.toLowerCase();
      if (lower.includes('nova') || lower.includes('نوفا')) {
        return 'باقة NOVA هي حلنا المتكامل للشركات والمتاجر. تشمل: أوتوميشن ذكي 24/7، 10 تصاميم، 5 ريلز مونتاج، موقع احترافي، وإدارة صفحة كاملة بسعر 4,500 ج.م. هل تحب حجزها مباشرة عبر الواتساب؟';
      } else if (lower.includes('مونتاج') || lower.includes('ريل')) {
        return 'باقات المونتاج تبدأ من 10 ريلز (2,500 ج.م)، 20 ريلز (4,500 ج.م)، وحتى 30 ريلز (6,000 ج.م). مدة الريل حتى 1:10 دقيقة مع تعديلين مجانيين لكل فيديو.';
      } else if (lower.includes('موقع') || lower.includes('ويب')) {
        return 'نوفر مواقع بالإيجار الشهري (800 ج.م/شهر)، الشراء الكامل (4,000 ج.م)، وأوتوميشن المواقع (5,000 ج.م). ما نوع موقعك الإلكتروني؟';
      } else if (lower.includes('ميزانية') || lower.includes('احسب') || lower.includes('تكل')) {
        return 'يمكنك استخدام حاسبة الباقات المخصصة في قسم الباقات بالأعلى لتفصيل باقة على مقاس ميزانيتك تماماً.';
      }

      return 'شكراً لتواصلك مع قبس. فريقنا جاهز لمساعدتك في أسرع وقت، ويمكنك أيضاً حجز استشارة مخصصة عبر الواتساب.';
    } catch (err) {
      console.error("Chat API error:", err);
      return "عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.";
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const aiReplyText = await sendMessageToBackend(text);

    const aiMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiReplyText,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return {
    isOpen,
    setIsOpen,
    showTooltip,
    setShowTooltip,
    messages,
    loading,
    sendMessage,
  };
}
