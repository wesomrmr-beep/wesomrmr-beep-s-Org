import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  Lock,
  MessageCircle,
  Phone,
  ShieldAlert,
  Smartphone,
  Star,
  Wrench,
} from 'lucide-react';
import { SunnaLogo } from './SunnaLogo';

interface LegalPageProps {
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onBack }) => {
  const [copiedPolicy, setCopiedPolicy] = useState(false);

  const policyUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/#privacy-policy` : '#privacy-policy';

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(policyUrl).catch(() => {});
    }
    setCopiedPolicy(true);
    setTimeout(() => setCopiedPolicy(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <header className="bg-[#1B365D] text-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="العودة"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="font-display font-bold text-base sm:text-lg truncate">
              سياسة الخصوصية وشروط الاستخدام
            </h1>
          </div>
          <SunnaLogo variant="dark" size={34} showWordmark={false} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <section className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display font-bold text-lg text-[#1B365D]">
              صفحة النشر الرسمية لمتجر Google Play
            </h2>
            <p className="text-sm text-slate-600">
              مخصصة للإدراج في لوحة تحكم مطوري Google Play (App Content · Privacy Policy).
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-[#F8F9FA] hover:bg-slate-100 text-sm font-medium text-[#1B365D] inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copiedPolicy ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPolicy ? 'تم نسخ الرابط' : 'نسخ رابط السياسة'}</span>
          </button>
        </section>

        <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 leading-relaxed">
          <div className="pb-5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <FileText className="w-4 h-4 text-[#F58220]" />
              <span>تطبيق صُنّاع — أهل الخبرة في خدمتك</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">آخر تحديث: نوفمبر 2026</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-[#1B365D]">
              أولاً: سياسة الخصوصية وحماية البيانات
            </h2>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-[#1B365D] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F58220]" />
              <span>1. البيانات التي نجمعها</span>
            </h3>
            <p className="text-slate-700 text-sm sm:text-base">
              يجمع تطبيق «صُنّاع» الحد الأدنى اللازم لتشغيل منصة الدليل المهني والوساطة، ويشمل ذلك:
              الاسم الكامل، رقم الهاتف المرتبط بتطبيق واتساب، المدينة أو المنطقة الجغرافية، والتخصص
              المهني وصور الأعمال السابقة التي يختار الحرفي إضافتها طوعاً إلى ملفه العام.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-[#1B365D]">
              2. كيفية استخدام البيانات ومشاركتها
            </h3>
            <p className="text-slate-700 text-sm sm:text-base">
              تُستخدم بيانات مقدمي الخدمات لعرضها في دليل الحرفيين وتمكين العملاء من التواصل المباشر
              معهم عبر الاتصال الهاتفي أو روابط واتساب الرسمية (wa.me). لا يقوم التطبيق ببيع أو تأجير
              أرقام الهواتف أو البيانات الشخصية لأي جهات إعلانية خارجية.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-[#1B365D]">
              3. المدفوعات واشتراكات الحرفيين
            </h3>
            <p className="text-slate-700 text-sm sm:text-base">
              يتم تفعيل الاشتراك الشهري الرمزي للحرفيين عبر الحوالة الإلكترونية المحلية وإرسال صورة
              إيصال التحويل إلى غرفة واتساب الإدارة. لا يطلب التطبيق ولا يخزن بيانات البطاقات
              المصرفية الحساسة أو الأرقام السرية داخل خوادمه.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h2 className="font-display font-extrabold text-2xl text-[#1B365D] flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-[#F58220]" />
              <span>ثانياً: شروط الاستخدام وإخلاء المسؤولية</span>
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-slate-700 list-disc pr-5">
              <li>
                يعمل تطبيق «صُنّاع» كمنصة وساطة تقنية ودليل مهني للربط بين العملاء ومقدمي الخدمات
                المستقلين، ولا يُعد طرفاً في العقود أو الاتفاقات المالية المبرمة مباشرة بين الطرفين.
              </li>
              <li>
                يتحمل العميل والحرفي مسؤولية التحقق المتبادل من تفاصيل العمل، التسعير، مواعيد التنفيذ،
                وضمانات الصيانة قبل البدء بالخدمة.
              </li>
              <li>
                يلتزم مقدم الخدمة بتقديم معلومات حقيقية عن تخصصه ومناطق عمله، ويحق لإدارة «صُنّاع»
                إيقاف أي حساب يخالف معايير الأمانة المهنية أو شروط الاستخدام.
              </li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
};

interface GooglePlayKitPageProps {
  onBack: () => void;
}

export const GooglePlayKitPage: React.FC<GooglePlayKitPageProps> = ({ onBack }) => {
  const downloadSvgLogo = (variant: 'light' | 'dark') => {
    const bg = variant === 'dark' ? '#1B365D' : '#1B365D';
    const strokeMain = '#FFFFFF';
    const svg = `<svg width="512" height="512" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="16" fill="${bg}"/>
  <path d="M14 16H28" stroke="#F58220" stroke-width="4" stroke-linecap="round"/>
  <path d="M48 36C48 27.1634 40.8366 20 32 20C25.5 20 20.5 24 19 29.5L13 36H48Z" stroke="${strokeMain}" stroke-width="5.2" stroke-linejoin="round"/>
  <path d="M13 36V44C13 47.866 16.134 51 20 51H26" stroke="${strokeMain}" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M36 44H47L51 40M47 44L51 48" stroke="#F58220" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sunna-logo-${variant}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const screenshots = [
    {
      num: '01',
      title: 'خدمات شاملة بضغطة زر',
      subtitle: '5 أقسام رئيسية + جماعة الخدمات العامة',
      bg: 'bg-[#1B365D]',
      preview: (
        <div className="bg-[#F8F9FA] rounded-2xl p-3 text-[#212529] space-y-2.5 h-full flex flex-col justify-between">
          <div className="bg-[#1B365D] text-white rounded-xl p-2.5 flex items-center justify-between">
            <SunnaLogo variant="dark" size={24} />
            <span className="text-[10px] text-slate-300">أهل الخبرة في خدمتك</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
            <div className="bg-white border border-slate-200 rounded-lg p-2">البناء والمقاولات</div>
            <div className="bg-white border border-slate-200 rounded-lg p-2">النجارة والأثاث</div>
            <div className="bg-white border border-slate-200 rounded-lg p-2">الصيانة الفنية</div>
            <div className="bg-white border border-slate-200 rounded-lg p-2">النقل والآليات</div>
          </div>
          <div className="bg-[#F58220] text-white rounded-xl p-2.5 text-center text-[11px] font-bold">
            طلب جماعة الخدمات العامة
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'حرفيون موثوقون في منطقتك',
      subtitle: 'فلترة فورية حسب المدينة والتقييم',
      bg: 'bg-[#142947]',
      preview: (
        <div className="bg-[#F8F9FA] rounded-2xl p-3 text-[#212529] space-y-2 h-full flex flex-col justify-between">
          <div className="text-xs font-bold text-[#1B365D] border-b border-slate-200 pb-1.5">
            قسم البناء والمقاولات · وسط المدينة
          </div>
          <div className="space-y-2">
            {[
              { name: 'الأسطى سالم المنصوري', job: 'كهرباء منزلية', rate: '4.9' },
              { name: 'المقاول طارق الفيتوري', job: 'مقاولات ودهان', rate: '4.8' },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] font-bold text-[#1B365D]">{item.name}</div>
                  <div className="text-[9px] text-slate-500">{item.job} · متاح الآن</div>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-[#F58220] tabular-nums">
                  <Star className="w-3 h-3 fill-[#F58220]" />
                  <span>{item.rate}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-center text-slate-500">تقييمات حقيقية وتوافر فوري</div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'تواصل فوري عبر واتساب',
      subtitle: 'رسالة جاهزة بالموقع والتخصص',
      bg: 'bg-[#1B365D]',
      preview: (
        <div className="bg-[#F8F9FA] rounded-2xl p-3 text-[#212529] space-y-2.5 h-full flex flex-col justify-between">
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-1">
            <div className="text-xs font-bold text-[#1B365D]">الأسطى عبد الرحمن النجار</div>
            <div className="text-[10px] text-slate-600">نجارة وأبواب · خبرة 18 سنة</div>
          </div>
          <div className="space-y-1.5">
            <div className="bg-[#25D366] text-white rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-[11px] font-bold">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>تواصل عبر واتساب</span>
            </div>
            <div className="bg-[#1B365D] text-white rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-[11px] font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>اتصال هاتفي مباشر</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'لوحة تحكم الحرفي الذكية',
      subtitle: 'تحكم بالتوفر واستقبل الطلبات',
      bg: 'bg-[#142947]',
      preview: (
        <div className="bg-[#F8F9FA] rounded-2xl p-3 text-[#212529] space-y-2 h-full flex flex-col justify-between">
          <div className="bg-[#1B365D] text-white rounded-xl p-2 flex items-center justify-between text-[10px]">
            <span className="font-bold">متاح لاستقبال الطلبات</span>
            <span className="text-[#25D366] font-bold">مُفعّل</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-2 space-y-1.5">
            <div className="text-[11px] font-bold text-[#1B365D]">طلب جديد · وسط المدينة</div>
            <div className="text-[9px] text-slate-600">فحص قاطع كهرباء المطبخ</div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="bg-[#F58220] text-white text-center py-1 rounded-lg text-[10px] font-bold">
                قبول الطلب
              </div>
              <div className="bg-slate-100 text-slate-700 text-center py-1 rounded-lg text-[10px] font-bold">
                اعتذار
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '05',
      title: 'تفعيل الاشتراك بالحوالة المحلية',
      subtitle: 'إرسال إيصال الحوالة عبر واتساب الإدارة',
      bg: 'bg-[#1B365D]',
      preview: (
        <div className="bg-[#F8F9FA] rounded-2xl p-3 text-[#212529] space-y-2.5 h-full flex flex-col justify-between">
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-1">
            <div className="text-[10px] text-slate-500">الاشتراك الشهري الرمزي</div>
            <div className="text-sm font-extrabold text-[#1B365D] tabular-nums">35 د.ل / شهرياً</div>
            <div className="text-[9px] text-slate-600 tabular-nums">متبقي: 22 يوماً</div>
          </div>
          <div className="bg-[#25D366] text-white rounded-xl p-2.5 flex items-center justify-center gap-1.5 text-[10px] font-bold text-center">
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>أرسل إيصال الحوالة لتفعيل الاشتراك</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <header className="bg-[#1B365D] text-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="العودة"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="font-display font-bold text-base sm:text-lg truncate">
              حزمة الهوية البصرية ومتجر Google Play
            </h1>
          </div>
          <SunnaLogo variant="dark" size={34} showWordmark={false} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Dual Logo Showcase */}
        <section className="space-y-4">
          <div>
            <h2 className="font-display font-extrabold text-xl text-[#1B365D]">
              1. الشعار البصري المعتمد (نسختان جاهزتان)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              يدمج حرف «ص» العربي بخط هندسي عريض مع رمز مفتاح الصيانة، بوضوح عالٍ في الأيقونات الصغيرة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-6">
              <div className="bg-[#F8F9FA] border border-slate-100 rounded-xl p-8 flex items-center justify-center">
                <SunnaLogo variant="light" size={72} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-base text-[#1B365D]">
                    النسخة الملونة للخلفيات الفاتحة
                  </h3>
                  <p className="text-xs text-slate-500">كحلي #1B365D مع برتقالي صناعي #F58220</p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadSvgLogo('light')}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-xs font-bold inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل SVG</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-6">
              <div className="bg-[#1B365D] rounded-xl p-8 flex items-center justify-center">
                <SunnaLogo variant="dark" size={72} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-base text-[#1B365D]">
                    النسخة البيضاء للخلفيات الداكنة
                  </h3>
                  <p className="text-xs text-slate-500">أبيض نقي #FFFFFF مع برتقالي صناعي #F58220</p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadSvgLogo('dark')}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white text-xs font-bold inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل SVG</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Google Play Store Screenshots */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-extrabold text-xl text-[#1B365D]">
                2. صور العرض الـ 5 لمتجر Google Play
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                تستعرض رحلة العميل والحرفي بالهوية المعتمدة (الكحلي #1B365D والبرتقالي الصناعي #F58220).
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Smartphone className="w-4 h-4 text-[#F58220]" />
              <span>مقاس عرض الهاتف 9:16</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {screenshots.map((shot) => (
              <div
                key={shot.num}
                className={`${shot.bg} rounded-2xl p-4 text-white flex flex-col justify-between gap-4 shadow-sm`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#F58220] tabular-nums">{shot.num}.</div>
                  <h3 className="font-display font-bold text-sm leading-snug">{shot.title}</h3>
                  <p className="text-[11px] text-slate-300 leading-snug">{shot.subtitle}</p>
                </div>

                <div className="border-4 border-slate-900/60 rounded-2xl overflow-hidden bg-slate-900 p-1 flex-1 min-h-[220px]">
                  {shot.preview}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
                  <span>صُنّاع · Android</span>
                  <Wrench className="w-3 h-3 text-[#F58220]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
