import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Hammer,
  Search,
  ShieldCheck,
  Smartphone,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { AccountRole, CategoryId, RegisteredUser } from '../types/sunna';
import { SERVICE_CATEGORIES, WORKING_DISTRICTS_OPTIONS } from '../data/mockData';
import { SunnaLogo } from './SunnaLogo';

interface OnboardingFlowProps {
  step: 'splash' | 'role-select' | 'register';
  initialUser: RegisteredUser;
  onChangeStep: (step: 'splash' | 'role-select' | 'register') => void;
  onCompleteRegistration: (user: RegisteredUser) => void;
  onQuickEnterDemo: (role: AccountRole) => void;
  onOpenLegal: () => void;
  onOpenPlayAssets: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  step,
  initialUser,
  onChangeStep,
  onCompleteRegistration,
  onQuickEnterDemo,
  onOpenLegal,
  onOpenPlayAssets,
}) => {
  const [selectedRole, setSelectedRole] = useState<AccountRole>(initialUser.role);
  const [name, setName] = useState(initialUser.name);
  const [phone, setPhone] = useState(initialUser.phone);
  const [district, setDistrict] = useState(initialUser.district);
  const [categoryId, setCategoryId] = useState<CategoryId>(initialUser.categoryId);
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectRole = (role: AccountRole) => {
    setSelectedRole(role);
    onChangeStep('register');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('يرجى إدخال الاسم الكامل.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMsg('يرجى إدخال رقم هاتف صحيح مرتبط بواتساب.');
      return;
    }
    if (!agreed) {
      setErrorMsg('يجب الموافقة على شروط الاستخدام وسياسة الخصوصية للمتابعة.');
      return;
    }

    const chosenCat = SERVICE_CATEGORIES.find((c) => c.id === categoryId) || SERVICE_CATEGORIES[0];
    setErrorMsg('');
    onCompleteRegistration({
      ...initialUser,
      name: name.trim(),
      phone: phone.trim(),
      district,
      role: selectedRole,
      agreedToTerms: true,
      categoryId,
      specialty: chosenCat.subServices[0],
      workingDistricts: [district],
    });
  };

  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-[#1B365D] text-white flex flex-col justify-between">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between">
          <SunnaLogo variant="dark" size={44} />
          <div className="flex items-center gap-4 text-sm">
            <button
              type="button"
              onClick={onOpenLegal}
              className="text-slate-200 hover:text-white underline-offset-4 hover:underline transition-colors min-h-[44px] px-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <button
              type="button"
              onClick={onOpenPlayAssets}
              className="text-slate-200 hover:text-white underline-offset-4 hover:underline transition-colors min-h-[44px] px-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              ملف متجر Google Play
            </button>
          </div>
        </div>

        <main className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <SunnaLogo variant="dark" size={76} showWordmark={false} />
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-white [text-wrap:balance]">
              تطبيق صُنّاع
              <span className="block text-[#F58220] mt-2">أهل الخبرة في خدمتك</span>
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              منصة وساطة إلكترونية ودليل مهني موثوق يربط العملاء بأصحاب المهن الحرة، الحرفيين،
              المقاولين، خدمات النقل، والخدمات العامة في منطقتك مع تواصل فوري عبر واتساب والاتصال المباشر.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onChangeStep('role-select')}
                className="min-h-[48px] px-7 py-3 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-display font-bold text-base inline-flex items-center gap-2 transition-colors shadow-lg shadow-black/20 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>ابدأ الآن</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onQuickEnterDemo(AccountRole.CLIENT)}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                معاينة واجهة العميل مباشرة
              </button>
              <button
                type="button"
                onClick={() => onQuickEnterDemo(AccountRole.CRAFTSMAN)}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                معاينة لوحة الحرفي مباشرة
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 space-y-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-white/15">
                <Smartphone className="w-6 h-6 text-[#F58220] shrink-0" />
                <div>
                  <h2 className="font-display font-bold text-lg text-white">أقسام المنصة الرئيسية</h2>
                  <p className="text-xs text-slate-300">مصممة لسرعة الوصول عبر نظام Android</p>
                </div>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-100">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <span>5 قطاعات حرفية متخصصة + قسم خاص لطلب جماعة الخدمات العامة</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <span>تواصل فوري عبر روابط واتساب المبرمجة مسبقاً والاتصال الهاتفي</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <span>لوحة حرفي متكاملة بإدارة التوفر، الطلبات الواردة، والاشتراك الشهري</span>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <footer className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <span>منصة صُنّاع للخدمات المهنية والحرفية</span>
          <div className="flex items-center gap-4">
            <span>أولوية الإطلاق: Android</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenLegal}
              className="hover:text-white underline cursor-pointer"
            >
              شروط الاستخدام وإخلاء المسؤولية
            </button>
          </div>
        </footer>
      </div>
    );
  }

  if (step === 'role-select') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between">
        <header className="bg-[#1B365D] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <SunnaLogo variant="dark" size={38} />
            <button
              type="button"
              onClick={() => onChangeStep('splash')}
              className="text-sm text-slate-200 hover:text-white min-h-[44px] px-3 whitespace-nowrap shrink-0 cursor-pointer"
            >
              العودة للبداية
            </button>
          </div>
        </header>

        <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1B365D] [text-wrap:balance]">
              اختر نوع الحساب للمتابعة
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              حدد دورك في منصة صُنّاع للوصول إلى الواجهة والأدوات المخصصة لك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => handleSelectRole(AccountRole.CLIENT)}
              className="group text-right bg-white border border-slate-200 hover:border-[#1B365D] rounded-2xl p-7 transition-all shadow-sm hover:shadow-md flex flex-col justify-between gap-6 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center group-hover:bg-[#1B365D] group-hover:text-white transition-colors">
                  <Search className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-[#1B365D]">
                    أنا عميل (أبحث عن خدمة)
                  </h2>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    تصفح أقسام البناء والنجارة والصيانة والنقل، قارن تقييمات الحرفيين في منطقتك، وتواصل معهم مباشرة عبر واتساب أو الهاتف.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm font-bold text-[#F58220]">
                <span>تسجيل كعميل</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole(AccountRole.CRAFTSMAN)}
              className="group text-right bg-white border border-slate-200 hover:border-[#F58220] rounded-2xl p-7 transition-all shadow-sm hover:shadow-md flex flex-col justify-between gap-6 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F58220]/15 text-[#F58220] flex items-center justify-center group-hover:bg-[#F58220] group-hover:text-white transition-colors">
                  <Wrench className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-[#1B365D]">
                    أنا صاحب مهنة / حرفي (أقدم خدمة)
                  </h2>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    أنشئ ملفك المهني، اعرض صور أعمالك السابقة، استقبل طلبات العملاء في منطقتك، وفعّل اشتراكك الشهري الرمزي بسهولة.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm font-bold text-[#1B365D]">
                <span>تسجيل كصاحب مهنة</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </button>
          </div>
        </main>

        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pb-8 text-center text-xs text-slate-500">
          يمكنك التبديل لاحقاً بين واجهة العميل وواجهة الحرفي لمعاينة جميع الشاشات
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <header className="bg-[#1B365D] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <SunnaLogo variant="dark" size={38} />
          <button
            type="button"
            onClick={() => onChangeStep('role-select')}
            className="text-sm text-slate-200 hover:text-white min-h-[44px] px-3 whitespace-nowrap shrink-0 cursor-pointer"
          >
            تغيير نوع الحساب
          </button>
        </div>
      </header>

      <main className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-[#1B365D] text-white flex items-center justify-center shrink-0">
              {selectedRole === AccountRole.CLIENT ? (
                <UserCheck className="w-5 h-5" />
              ) : (
                <Hammer className="w-5 h-5" />
              )}
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-[#1B365D]">
                {selectedRole === AccountRole.CLIENT
                  ? 'إنشاء حساب عميل جديد'
                  : 'تسجيل حساب صاحب مهنة / حرفي'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedRole === AccountRole.CLIENT
                  ? 'أدخل بياناتك للتواصل السريع مع الحرفيين في منطقتك'
                  : 'أدخل بياناتك المهنية ليتمكن العملاء من الوصول إليك عبر واتساب'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="reg-name" className="block text-sm font-bold text-[#212529] mb-1.5">
                الاسم الكامل
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: محمود الزنتاني"
                className="w-full min-h-[46px] px-4 rounded-xl border border-slate-300 bg-white text-[#212529] focus:outline-none focus:border-[#1B365D]"
              />
            </div>

            <div>
              <label htmlFor="reg-phone" className="block text-sm font-bold text-[#212529] mb-1.5">
                رقم الهاتف المرتبط بواتساب
              </label>
              <input
                id="reg-phone"
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="218915554433"
                className="w-full min-h-[46px] px-4 rounded-xl border border-slate-300 bg-white text-[#212529] text-left tabular-nums focus:outline-none focus:border-[#1B365D]"
              />
            </div>

            <div>
              <label htmlFor="reg-district" className="block text-sm font-bold text-[#212529] mb-1.5">
                المدينة / المنطقة
              </label>
              <select
                id="reg-district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full min-h-[46px] px-4 rounded-xl border border-slate-300 bg-white text-[#212529] focus:outline-none focus:border-[#1B365D]"
              >
                {WORKING_DISTRICTS_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {selectedRole === AccountRole.CRAFTSMAN && (
              <div>
                <label htmlFor="reg-cat" className="block text-sm font-bold text-[#212529] mb-1.5">
                  القسم المهني الأساسي
                </label>
                <select
                  id="reg-cat"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                  className="w-full min-h-[46px] px-4 rounded-xl border border-slate-300 bg-white text-[#212529] focus:outline-none focus:border-[#1B365D]"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-[#1B365D] focus:ring-[#1B365D] shrink-0"
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  أوافق على{' '}
                  <button
                    type="button"
                    onClick={onOpenLegal}
                    className="text-[#1B365D] font-bold underline hover:text-[#F58220] cursor-pointer"
                  >
                    شروط الاستخدام وسياسة الخصوصية
                  </button>{' '}
                  وإخلاء المسؤولية الخاص بمنصة صُنّاع.
                </span>
              </label>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-display font-bold text-base transition-colors cursor-pointer"
            >
              تأكيد التسجيل والدخول للتطبيق
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
