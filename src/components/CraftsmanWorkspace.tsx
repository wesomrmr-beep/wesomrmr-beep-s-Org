import React, { useState } from 'react';
import {
  Briefcase,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  CreditCard,
  MapPin,
  MessageCircle,
  Phone,
  Upload,
  UserCheck,
  X,
} from 'lucide-react';
import {
  CategoryId,
  OrderStatus,
  RegisteredUser,
  ServiceOrder,
} from '../types/sunna';
import {
  buildCraftsmanToClientWaUrl,
  buildSubscriptionWaUrl,
  LOCAL_BANK_IBAN,
  LOCAL_WALLET_ACCOUNT,
  SERVICE_CATEGORIES,
  SUBSCRIPTION_FEE_DISPLAY,
  WORKING_DISTRICTS_OPTIONS,
} from '../data/mockData';
import { SunnaLogo } from './SunnaLogo';
import { PortfolioGallery } from './PortfolioGallery';

type CraftsmanTab = 'orders' | 'subscription' | 'profile';

interface CraftsmanWorkspaceProps {
  user: RegisteredUser;
  orders: ServiceOrder[];
  onUpdateUser: (updated: RegisteredUser) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onSwitchToClient: () => void;
  onOpenLegal: () => void;
  onOpenPlayAssets: () => void;
}

export const CraftsmanWorkspace: React.FC<CraftsmanWorkspaceProps> = ({
  user,
  orders,
  onUpdateUser,
  onUpdateOrderStatus,
  onSwitchToClient,
  onOpenLegal,
  onOpenPlayAssets,
}) => {
  const [activeTab, setActiveTab] = useState<CraftsmanTab>('orders');
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  // Local profile editing state
  const [profName, setProfName] = useState(user.name);
  const [profPhone, setProfPhone] = useState(user.phone);
  const [profCatId, setProfCatId] = useState<CategoryId>(user.categoryId);
  const [profSpecialty, setProfSpecialty] = useState(user.specialty);
  const [profDistricts, setProfDistricts] = useState<string[]>(user.workingDistricts);
  const [profBio, setProfBio] = useState(user.bio);
  const [profImages, setProfImages] = useState<string[]>(user.portfolioImages);

  const selectedCategoryObj =
    SERVICE_CATEGORIES.find((c) => c.id === profCatId) || SERVICE_CATEGORIES[0];

  const handleToggleAvailability = () => {
    onUpdateUser({ ...user, isAvailable: !user.isAvailable });
  };

  const handleCopyWallet = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setReceiptPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfImages((prev) => [...prev, reader.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleDistrict = (dist: string) => {
    setProfDistricts((prev) =>
      prev.includes(dist) ? prev.filter((d) => d !== dist) : [...prev, dist]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: profName.trim() || user.name,
      phone: profPhone.trim() || user.phone,
      categoryId: profCatId,
      specialty: profSpecialty,
      workingDistricts: profDistricts.length > 0 ? profDistricts : [user.district],
      bio: profBio,
      portfolioImages: profImages,
    });
    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 2500);
  };

  const renderOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.ACCEPTED:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#15803D]">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم القبول</span>
          </span>
        );
      case OrderStatus.DECLINED:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700">
            <X className="w-4 h-4" />
            <span>تم الاعتذار</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F58220]">
            <ClipboardList className="w-4 h-4" />
            <span>طلب جديد</span>
          </span>
        );
    }
  };

  const currentSelectedOrder = selectedOrder
    ? orders.find((o) => o.id === selectedOrder.id) || selectedOrder
    : null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] pb-24 md:pb-10">
      {/* Top App Bar (Clean 3-Zone Contract) */}
      <header className="bg-[#1B365D] text-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <SunnaLogo variant="dark" size={36} />

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`min-h-[44px] px-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'orders'
                  ? 'text-[#F58220] font-bold underline underline-offset-8'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              الطلبات
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('subscription')}
              className={`min-h-[44px] px-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'subscription'
                  ? 'text-[#F58220] font-bold underline underline-offset-8'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              اشتراكي
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`min-h-[44px] px-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'profile'
                  ? 'text-[#F58220] font-bold underline underline-offset-8'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              ملفي المهني
            </button>
            <button
              type="button"
              onClick={onOpenPlayAssets}
              className="min-h-[44px] px-2 text-slate-200 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              ملف المتجر
            </button>
          </nav>

          <button
            type="button"
            onClick={onSwitchToClient}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            واجهة العميل
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* TAB 1: INCOMING ORDERS + AVAILABILITY SWITCH + SUBSCRIPTION STATUS BAR */}
        {activeTab === 'orders' && (
          <>
            {/* Large Availability Toggle & Subscription Status Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">حالة الظهور للعملاء في منطقتك</div>
                  <h1 className="font-display font-extrabold text-lg sm:text-xl text-[#1B365D]">
                    {user.isAvailable ? 'متاح لاستقبال الطلبات' : 'مشغول حالياً'}
                  </h1>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={user.isAvailable}
                  onClick={handleToggleAvailability}
                  className={`relative inline-flex h-10 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] ${
                    user.isAvailable ? 'bg-[#25D366]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-9 w-9 transform rounded-full bg-white shadow transition duration-200 ${
                      user.isAvailable ? '-translate-x-10' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="lg:col-span-5 bg-[#1B365D] text-white rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between text-xs text-slate-200">
                    <span>حالة الاشتراك الشهري</span>
                    <span className="font-bold text-[#F58220] tabular-nums">
                      متبقي {user.subscriptionDaysLeft} يوم
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F58220] rounded-full"
                      style={{ width: `${Math.min(100, (user.subscriptionDaysLeft / 30) * 100)}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('subscription')}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  تجديد الاشتراك
                </button>
              </div>
            </div>

            {/* Incoming Orders List & Detail Split */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-extrabold text-xl text-[#1B365D]">
                    الطلبات الواردة في منطقتك
                  </h2>
                  <span className="text-xs text-slate-500 tabular-nums">
                    {orders.length} طلبات
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.map((ord) => {
                    const isSelected = currentSelectedOrder?.id === ord.id;
                    return (
                      <button
                        key={ord.id}
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className={`w-full text-right bg-white rounded-2xl p-5 border transition-all shadow-sm space-y-2.5 cursor-pointer ${
                          isSelected
                            ? 'border-[#1B365D] ring-1 ring-[#1B365D]'
                            : 'border-slate-200 hover:border-[#F58220]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display font-bold text-base text-[#1B365D]">
                            {ord.clientName}
                          </h3>
                          {renderOrderStatusBadge(ord.status)}
                        </div>

                        <p className="text-sm text-slate-700 line-clamp-2">
                          {ord.problemDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#F58220]" />
                            <span>{ord.district}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{ord.preferredTime}</span>
                          <span aria-hidden="true">·</span>
                          <span>{ord.createdAt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Details Screen Panel */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-20">
                {!currentSelectedOrder ? (
                  <div className="py-12 text-center space-y-2 text-slate-500">
                    <ClipboardList className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="font-display font-bold text-base text-[#1B365D]">
                      اختر طلباً لعرض التفاصيل
                    </p>
                    <p className="text-xs">
                      عند قبول الطلب ستظهر أزرار الاتصال المباشر وواتساب للتواصل مع العميل
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="text-xs text-slate-500">تفاصيل طلب العميل</div>
                        <h3 className="font-display font-extrabold text-xl text-[#1B365D] mt-0.5">
                          {currentSelectedOrder.clientName}
                        </h3>
                      </div>
                      {renderOrderStatusBadge(currentSelectedOrder.status)}
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">المنطقة:</span>
                        <span className="font-bold text-[#212529]">
                          {currentSelectedOrder.district}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">الموعد المطلوب:</span>
                        <span className="font-bold text-[#212529]">
                          {currentSelectedOrder.preferredTime}
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-2">
                        <div className="text-slate-500">وصف المشكلة:</div>
                        <p className="bg-[#F8F9FA] p-3.5 rounded-xl text-[#212529] leading-relaxed">
                          {currentSelectedOrder.problemDescription}
                        </p>
                      </div>
                    </div>

                    {currentSelectedOrder.status === OrderStatus.PENDING && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateOrderStatus(currentSelectedOrder.id, OrderStatus.ACCEPTED)
                          }
                          className="min-h-[48px] rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-display font-bold text-sm cursor-pointer"
                        >
                          قبول الطلب
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateOrderStatus(currentSelectedOrder.id, OrderStatus.DECLINED)
                          }
                          className="min-h-[48px] rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-display font-bold text-sm cursor-pointer"
                        >
                          اعتذار
                        </button>
                      </div>
                    )}

                    {currentSelectedOrder.status === OrderStatus.ACCEPTED && (
                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        <p className="text-xs font-bold text-[#15803D]">
                          تم قبول الطلب — يمكنك الآن التواصل مباشرة مع العميل:
                        </p>
                        <a
                          href={buildCraftsmanToClientWaUrl({
                            clientName: currentSelectedOrder.clientName,
                            clientPhone: currentSelectedOrder.clientPhone,
                            specialty: currentSelectedOrder.specialty,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>مراسلة العميل عبر واتساب</span>
                        </a>
                        <a
                          href={`tel:+${currentSelectedOrder.clientPhone}`}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white font-display font-bold text-sm flex items-center justify-center gap-2"
                        >
                          <Phone className="w-5 h-5" />
                          <span>اتصال هاتفي بالعميل</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* TAB 2: MONTHLY SUBSCRIPTION & LOCAL TRANSFER PAYMENT */}
        {activeTab === 'subscription' && (
          <section className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#1B365D] text-white rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-[#F58220] font-bold">الاشتراك الشهري الرمزي</span>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl tabular-nums">
                  {SUBSCRIPTION_FEE_DISPLAY}
                </h1>
                <p className="text-sm text-slate-200">
                  يضمن ظهور حسابك في دليل الحرفيين واستقبال طلبات العملاء طوال الشهر
                </p>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 text-center">
                <div className="text-xs text-slate-300">المدة المتبقية</div>
                <div className="font-display font-extrabold text-2xl text-[#F58220] tabular-nums">
                  {user.subscriptionDaysLeft} يوم
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <h2 className="font-display font-bold text-xl text-[#1B365D]">
                  بيانات التحويل عبر الحوالة الإلكترونية المحلية
                </h2>
                <p className="text-sm text-slate-600">
                  قم بتحويل قيمة الاشتراك إلى أحد الحسابات التالية، ثم أرسل صورة الإيصال إلى إدارة تطبيق صُنّاع عبر زر واتساب أدناه.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-2">
                  <div className="text-xs text-slate-500">رقم المحفظة الإلكترونية المحلية</div>
                  <div className="font-bold text-sm text-[#1B365D] tabular-nums">
                    {LOCAL_WALLET_ACCOUNT}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyWallet('0910005500')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F58220] min-h-[36px] cursor-pointer"
                  >
                    {copiedWallet ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedWallet ? 'تم النسخ' : 'نسخ الرقم'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-2">
                  <div className="text-xs text-slate-500">رقم الحساب المصرفي (IBAN)</div>
                  <div className="font-bold text-sm text-[#1B365D] tabular-nums" dir="ltr">
                    {LOCAL_BANK_IBAN}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyWallet(LOCAL_BANK_IBAN)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F58220] min-h-[36px] cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>نسخ الحساب</span>
                  </button>
                </div>
              </div>

              {/* Optional receipt preview inside app */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#212529]">
                  معاينة صورة إيصال الحوالة (اختياري قبل الإرسال عبر واتساب)
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="min-h-[44px] px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#1B365D] bg-[#F8F9FA] text-sm font-bold text-[#1B365D] inline-flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>اختر صورة الإيصال</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptUpload}
                      className="hidden"
                    />
                  </label>
                  {receiptPreview && (
                    <img
                      src={receiptPreview}
                      alt="معاينة إيصال الحوالة"
                      className="h-16 w-24 object-cover rounded-xl border border-slate-200"
                    />
                  )}
                </div>
              </div>

              <a
                href={buildSubscriptionWaUrl({
                  craftsmanName: user.name,
                  specialty: user.specialty,
                  phone: user.phone,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onUpdateUser({ ...user, subscriptionReceiptSent: true })}
                className="w-full min-h-[54px] px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-base flex items-center justify-center gap-3 shadow-sm transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                <span>أرسل إيصال الحوالة لتفعيل الاشتراك</span>
              </a>

              {user.subscriptionReceiptSent && (
                <div className="p-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-bold text-[#15803D]">
                  تم تجهيز طلب التفعيل بنجاح. بمجرد إرسال صورة الإيصال في غرفة واتساب الإدارة سيتم تحديث أيام الاشتراك.
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: PROFESSIONAL PROFILE SETUP (ملفي المهني) */}
        {activeTab === 'profile' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <form
              onSubmit={handleSaveProfile}
              className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm"
            >
              <h1 className="font-display font-extrabold text-2xl text-[#1B365D]">
                إعداد الملف المهني
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prof-name" className="block text-sm font-bold mb-1.5">
                    الاسم المهني
                  </label>
                  <input
                    id="prof-name"
                    type="text"
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA]"
                  />
                </div>
                <div>
                  <label htmlFor="prof-phone" className="block text-sm font-bold mb-1.5">
                    رقم واتساب العمل
                  </label>
                  <input
                    id="prof-phone"
                    type="tel"
                    dir="ltr"
                    value={profPhone}
                    onChange={(e) => setProfPhone(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA] text-left tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prof-cat" className="block text-sm font-bold mb-1.5">
                    القسم الرئيسي
                  </label>
                  <select
                    id="prof-cat"
                    value={profCatId}
                    onChange={(e) => {
                      const nextCat = e.target.value as CategoryId;
                      setProfCatId(nextCat);
                      const found = SERVICE_CATEGORIES.find((c) => c.id === nextCat);
                      if (found) setProfSpecialty(found.subServices[0]);
                    }}
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA]"
                  >
                    {SERVICE_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="prof-spec" className="block text-sm font-bold mb-1.5">
                    التخصص الدقيق
                  </label>
                  <select
                    id="prof-spec"
                    value={profSpecialty}
                    onChange={(e) => setProfSpecialty(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA]"
                  >
                    {selectedCategoryObj.subServices.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold mb-2">مناطق العمل التي تغطيها</span>
                <div className="flex flex-wrap gap-2">
                  {WORKING_DISTRICTS_OPTIONS.map((dist) => {
                    const active = profDistricts.includes(dist);
                    return (
                      <button
                        key={dist}
                        type="button"
                        onClick={() => toggleDistrict(dist)}
                        className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1B365D] text-white'
                            : 'bg-[#F8F9FA] border border-slate-300 text-slate-700'
                        }`}
                      >
                        {dist}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="prof-bio" className="block text-sm font-bold mb-1.5">
                  نبذة عن خبرتك وأعمالك
                </label>
                <textarea
                  id="prof-bio"
                  rows={3}
                  value={profBio}
                  onChange={(e) => setProfBio(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA] text-sm"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-bold block">معرض صور الأعمال السابقة</span>
                    <span className="text-xs text-slate-500">
                      اضغط على أي صورة لمعاينتها وتكبيرها كما يراها العملاء
                    </span>
                  </div>
                  <label className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-slate-300 hover:border-[#1B365D] text-xs font-bold text-[#1B365D] inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>إضافة صورة</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortfolioUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <PortfolioGallery
                  images={profImages}
                  craftsmanName={profName || user.name}
                  editable
                  onRemoveImage={(idx) =>
                    setProfImages((prev) => prev.filter((_, i) => i !== idx))
                  }
                />
              </div>

              {profileSavedNotice && (
                <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-bold text-[#15803D]">
                  تم حفظ وتحديث ملفك المهني بنجاح.
                </div>
              )}

              <button
                type="submit"
                className="min-h-[48px] px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-display font-bold text-sm cursor-pointer"
              >
                حفظ الملف المهني
              </button>
            </form>

            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="font-display font-bold text-lg text-[#1B365D]">خيارات الحساب</h2>
              <button
                type="button"
                onClick={onSwitchToClient}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#1B365D] text-white font-bold text-sm cursor-pointer"
              >
                التبديل إلى واجهة العميل
              </button>
              <button
                type="button"
                onClick={onOpenLegal}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 text-[#1B365D] font-bold text-sm cursor-pointer"
              >
                سياسة الخصوصية وشروط الاستخدام
              </button>
              <button
                type="button"
                onClick={onOpenPlayAssets}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 text-[#1B365D] font-bold text-sm cursor-pointer"
              >
                حزمة الهوية ومتجر Google Play
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Tab Bar (Mobile Only - Strictly 3 Tabs: الطلبات - اشتراكي - ملفي المهني) */}
      <nav
        aria-label="التنقل السفلي للحرفي"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-3 h-16"
      >
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'orders' ? 'text-[#F58220] font-bold' : 'text-slate-600'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[11px]">الطلبات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('subscription')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'subscription' ? 'text-[#F58220] font-bold' : 'text-slate-600'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-[11px]">اشتراكي</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'profile' ? 'text-[#F58220] font-bold' : 'text-slate-600'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[11px]">ملفي المهني</span>
        </button>
      </nav>
    </div>
  );
};
