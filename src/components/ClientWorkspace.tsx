import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Hammer,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Star,
  Trees,
  Truck,
  User,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import {
  CategoryId,
  CraftsmanProfile,
  OrderStatus,
  RegisteredUser,
  ServiceOrder,
} from '../types/sunna';
import {
  buildClientToCraftsmanWaUrl,
  buildGeneralGroupWaUrl,
  DISTRICTS,
  SERVICE_CATEGORIES,
  WORKING_DISTRICTS_OPTIONS,
} from '../data/mockData';
import { SunnaLogo } from './SunnaLogo';
import { PortfolioGallery } from './PortfolioGallery';

type ClientTab = 'home' | 'orders' | 'account';

interface ClientWorkspaceProps {
  user: RegisteredUser;
  craftsmen: CraftsmanProfile[];
  orders: ServiceOrder[];
  onUpdateUser: (updated: RegisteredUser) => void;
  onCreateOrder: (order: ServiceOrder) => void;
  onSwitchToCraftsman: () => void;
  onOpenLegal: () => void;
  onOpenPlayAssets: () => void;
  onResetOnboarding: () => void;
}

const CATEGORY_ICONS: Record<CategoryId, React.ReactNode> = {
  [CategoryId.CONSTRUCTION]: <Building2 className="w-7 h-7" />,
  [CategoryId.CARPENTRY]: <Hammer className="w-7 h-7" />,
  [CategoryId.TECHNICAL]: <Wrench className="w-7 h-7" />,
  [CategoryId.TRANSPORT]: <Truck className="w-7 h-7" />,
  [CategoryId.GENERAL]: <Trees className="w-7 h-7" />,
};

export const ClientWorkspace: React.FC<ClientWorkspaceProps> = ({
  user,
  craftsmen,
  orders,
  onUpdateUser,
  onCreateOrder,
  onSwitchToCraftsman,
  onOpenLegal,
  onOpenPlayAssets,
  onResetOnboarding,
}) => {
  const [activeTab, setActiveTab] = useState<ClientTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('الكل');
  const [selectedCraftsman, setSelectedCraftsman] = useState<CraftsmanProfile | null>(null);

  // Order confirmation form inside craftsman profile
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredTime, setPreferredTime] = useState('اليوم · أقرب وقت ممكن');
  const [orderRecordedNotice, setOrderRecordedNotice] = useState<string | null>(null);

  // General Services Group modal state
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupServiceType, setGroupServiceType] = useState('تشطيب وتجهيز متكامل (فريق عمل شامل)');
  const [groupDistrict, setGroupDistrict] = useState(user.district || WORKING_DISTRICTS_OPTIONS[0]);

  // Account edit state
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editDistrict, setEditDistrict] = useState(user.district);
  const [accountSaved, setAccountSaved] = useState(false);

  const filteredCraftsmen = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return craftsmen.filter((c) => {
      const matchCat = selectedCategory === 'all' || c.categoryId === selectedCategory;
      const matchDistrict =
        selectedDistrict === 'الكل' ||
        c.district === selectedDistrict ||
        c.workingDistricts.includes(selectedDistrict);
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.specialty.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.bio.toLowerCase().includes(q);
      return matchCat && matchDistrict && matchQuery;
    });
  }, [craftsmen, selectedCategory, selectedDistrict, searchQuery]);

  const handleOpenCraftsman = (c: CraftsmanProfile) => {
    setSelectedCraftsman(c);
    setProblemDescription('');
    setPreferredTime('اليوم · أقرب وقت ممكن');
    setOrderRecordedNotice(null);
  };

  const recordOrderAndGetWaUrl = (craftsman: CraftsmanProfile) => {
    const districtToUse = selectedDistrict !== 'الكل' ? selectedDistrict : user.district;
    const desc =
      problemDescription.trim() || `طلب خدمة في مجال ${craftsman.specialty}`;

    const newOrder: ServiceOrder = {
      id: `ord-${Date.now()}`,
      clientName: user.name,
      clientPhone: user.phone,
      craftsmanId: craftsman.id,
      craftsmanName: craftsman.name,
      craftsmanPhone: craftsman.phone,
      specialty: craftsman.specialty,
      district: districtToUse,
      problemDescription: desc,
      preferredTime,
      status: OrderStatus.PENDING,
      createdAt: 'الآن',
    };

    onCreateOrder(newOrder);
    setOrderRecordedNotice('تم تسجيل طلبك في قائمة «طلباتي» وجارٍ فتح محادثة واتساب.');

    return buildClientToCraftsmanWaUrl({
      craftsmanName: craftsman.name,
      craftsmanPhone: craftsman.phone,
      specialty: craftsman.specialty,
      district: districtToUse,
    });
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: editName.trim() || user.name,
      phone: editPhone.trim() || user.phone,
      district: editDistrict,
    });
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2500);
  };

  const renderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.ACCEPTED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم القبول</span>
          </span>
        );
      case OrderStatus.DECLINED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700">
            <X className="w-4 h-4" />
            <span>اعتذر الحرفي</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B45309]">
            <ClipboardList className="w-4 h-4" />
            <span>بانتظار الرد</span>
          </span>
        );
    }
  };

  const activeCategoryObj = SERVICE_CATEGORIES.find((cat) => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] pb-24 md:pb-10">
      {/* Top App Bar (Clean 3-Zone Contract on Desktop + Compact Header on Mobile) */}
      <header className="bg-[#1B365D] text-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            {selectedCraftsman ? (
              <button
                type="button"
                onClick={() => setSelectedCraftsman(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="الرجوع لقائمة الحرفيين"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <SunnaLogo variant="dark" size={36} />
            )}
            {selectedCraftsman && (
              <span className="font-display font-bold text-base truncate max-w-[200px]">
                ملف الحرفي
              </span>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                setSelectedCraftsman(null);
                setActiveTab('home');
              }}
              className={`min-h-[44px] px-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#F58220] font-bold underline underline-offset-8'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              الرئيسية
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCraftsman(null);
                setActiveTab('orders');
              }}
              className={`min-h-[44px] px-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'orders'
                  ? 'text-[#F58220] font-bold underline underline-offset-8'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              طلباتي
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCraftsman(null);
                setActiveTab('account');
              }}
              className={`min-h-[44px] px-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'account'
                  ? 'text-[#F58220] font-bold underline underline-offset-8'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              حسابي
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
            onClick={onSwitchToCraftsman}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            لوحة الحرفي
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* CRAFTSMAN PROFILE & ORDER CONFIRMATION VIEW */}
        {activeTab === 'home' && selectedCraftsman && (
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setSelectedCraftsman(null)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1B365D] hover:text-[#F58220] min-h-[44px] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى قائمة الحرفيين</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Craftsman Bio & Portfolio */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-60 sm:h-72 bg-slate-200">
                  <img
                    src={selectedCraftsman.portfolioImages[0]}
                    alt={`نماذج أعمال ${selectedCraftsman.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 text-xs text-slate-200 mb-1">
                      <span>{selectedCraftsman.specialty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">خبرة {selectedCraftsman.experienceYears} سنة</span>
                    </div>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl">
                      {selectedCraftsman.name}
                    </h1>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 text-sm">
                    <div className="flex items-center gap-2 text-[#212529] font-bold">
                      <Star className="w-4 h-4 text-[#F58220] fill-[#F58220]" />
                      <span className="tabular-nums">{selectedCraftsman.rating}</span>
                      <span className="text-slate-500 font-normal tabular-nums">
                        ({selectedCraftsman.reviewCount} تقييم)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-[#1B365D]" />
                      <span>{selectedCraftsman.workingDistricts.join(' · ')}</span>
                    </div>

                    <div
                      className={`font-bold text-sm ${
                        selectedCraftsman.isAvailable ? 'text-[#15803D]' : 'text-slate-500'
                      }`}
                    >
                      {selectedCraftsman.isAvailable ? 'متاح الآن لاستقبال الطلبات' : 'مشغول حالياً'}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display font-bold text-lg text-[#1B365D]">نبذة مهنية</h2>
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                      {selectedCraftsman.bio}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display font-bold text-lg text-[#1B365D]">
                        معرض نماذج الأعمال السابقة
                      </h2>
                      <span className="text-xs text-slate-500">اضغط على أي صورة للتكبير</span>
                    </div>
                    <PortfolioGallery
                      images={selectedCraftsman.portfolioImages}
                      craftsmanName={selectedCraftsman.name}
                    />
                  </div>
                </div>
              </div>

              {/* Order Description & Direct Contact CTAs */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="font-display font-bold text-xl text-[#1B365D]">
                    تأكيد الطلب والتواصل المباشر
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    اكتب وصفاً مختصراً للمشكلة والموعد المناسب ثم تواصل مباشرة
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="problem-desc"
                      className="block text-sm font-bold text-[#212529] mb-1.5"
                    >
                      وصف المشكلة أو الخدمة المطلوبة
                    </label>
                    <textarea
                      id="problem-desc"
                      rows={4}
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      placeholder="مثال: لدي عطل في قاطع الكهرباء الرئيسي وأحتاج فحصاً اليوم..."
                      className="w-full p-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA] text-sm text-[#212529] focus:outline-none focus:border-[#1B365D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-time"
                      className="block text-sm font-bold text-[#212529] mb-1.5"
                    >
                      الموعد المفضل
                    </label>
                    <input
                      id="preferred-time"
                      type="text"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA] text-sm text-[#212529] focus:outline-none focus:border-[#1B365D]"
                    />
                  </div>
                </div>

                {orderRecordedNotice && (
                  <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-bold text-[#15803D]">
                    {orderRecordedNotice}
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <a
                    href={buildClientToCraftsmanWaUrl({
                      craftsmanName: selectedCraftsman.name,
                      craftsmanPhone: selectedCraftsman.phone,
                      specialty: selectedCraftsman.specialty,
                      district: selectedDistrict !== 'الكل' ? selectedDistrict : user.district,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordOrderAndGetWaUrl(selectedCraftsman)}
                    className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-base flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>تواصل عبر واتساب</span>
                  </a>

                  <a
                    href={`tel:+${selectedCraftsman.phone}`}
                    onClick={() => recordOrderAndGetWaUrl(selectedCraftsman)}
                    className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white font-display font-bold text-base flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>اتصال هاتفي مباشر</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOME TAB: SEARCH + 5 CATEGORIES + GENERAL GROUP + CRAFTSMEN DIRECTORY */}
        {activeTab === 'home' && !selectedCraftsman && (
          <>
            {/* Search & Hero Greeting */}
            <section className="bg-[#1B365D] text-white rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-300 mb-1">
                    مرحباً {user.name} · {user.district}
                  </p>
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl [text-wrap:balance]">
                    ابحث عن أمهر الحرفيين في منطقتك
                  </h1>
                </div>
                <div className="text-xs text-slate-200 hidden sm:block">
                  أهل الخبرة في خدمتك
                </div>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن خدمة أو حرفي (سباك، نجار، مكيفات، نقل أثاث...)"
                  className="w-full min-h-[50px] pr-12 pl-4 rounded-xl bg-white text-[#212529] placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                />
              </div>
            </section>

            {/* 5 Core Service Categories Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display font-extrabold text-xl text-[#1B365D]">
                  أقسام الخدمات الرئيسية
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="text-sm font-bold text-[#F58220] hover:underline min-h-[44px] px-2 cursor-pointer"
                  >
                    عرض جميع الأقسام
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(isActive ? 'all' : cat.id)
                      }
                      className={`text-right rounded-2xl p-5 border transition-all flex flex-col justify-between gap-4 cursor-pointer ${
                        isActive
                          ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-md'
                          : 'bg-white text-[#212529] border-slate-200 hover:border-[#F58220]'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive
                            ? 'bg-[#F58220] text-white'
                            : 'bg-[#1B365D]/10 text-[#1B365D]'
                        }`}
                      >
                        {CATEGORY_ICONS[cat.id]}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base">{cat.title}</h3>
                        <p
                          className={`text-xs mt-1.5 leading-relaxed ${
                            isActive ? 'text-slate-200' : 'text-slate-600'
                          }`}
                        >
                          {cat.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Prominent Special Section: طلب جماعة الخدمات العامة */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F58220]/15 text-[#F58220] flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display font-extrabold text-xl text-[#1B365D]">
                    طلب جماعة الخدمات العامة
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                    قسم خاص للمشاريع الكبيرة، تجهيز المباني، التنظيف الشامل، والفرق المهنية المتكاملة بإشراف وتنسيق مباشر من إدارة تطبيق صُنّاع.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGroupModal(true)}
                className="w-full md:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-display font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>طلب جماعة الخدمات العامة</span>
              </button>
            </section>

            {/* Craftsmen List with District Filter */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[#1B365D]">
                    {activeCategoryObj ? activeCategoryObj.title : 'دليل الحرفيين المتاحين'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    عدد النتائج: {filteredCraftsmen.length} حرفي
                  </p>
                </div>

                {/* District Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {DISTRICTS.map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => setSelectedDistrict(dist)}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        selectedDistrict === dist
                          ? 'bg-[#1B365D] text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-[#1B365D]'
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>
              </div>

              {filteredCraftsmen.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                  <p className="font-display font-bold text-lg text-[#1B365D]">
                    لا توجد نتائج مطابقة في هذه المنطقة حالياً
                  </p>
                  <p className="text-sm text-slate-600">
                    جرب اختيار «الكل» في فلتر المنطقة أو البحث بكلمة أخرى، أو اطلب جماعة الخدمات العامة.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCraftsmen.map((craftsman) => (
                    <button
                      key={craftsman.id}
                      type="button"
                      onClick={() => handleOpenCraftsman(craftsman)}
                      className="text-right bg-white border border-slate-200 hover:border-[#1B365D] rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="h-44 bg-slate-200 relative overflow-hidden">
                          <img
                            src={craftsman.portfolioImages[0]}
                            alt={craftsman.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="p-5 space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span
                              className={`font-bold ${
                                craftsman.isAvailable ? 'text-[#15803D]' : 'text-slate-500'
                              }`}
                            >
                              {craftsman.isAvailable ? 'متاح الآن' : 'مشغول حالياً'}
                            </span>
                            <div className="flex items-center gap-1 font-bold text-[#212529] tabular-nums">
                              <Star className="w-3.5 h-3.5 text-[#F58220] fill-[#F58220]" />
                              <span>{craftsman.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-display font-bold text-lg text-[#1B365D]">
                            {craftsman.name}
                          </h3>
                          <p className="text-sm text-slate-600">{craftsman.specialty}</p>
                        </div>
                      </div>

                      <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#F58220]" />
                          <span>{craftsman.district}</span>
                        </span>
                        <span className="font-bold text-[#1B365D]">عرض الملف والطلب</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* ORDERS TAB (طلباتي) */}
        {activeTab === 'orders' && (
          <section className="space-y-5">
            <div>
              <h1 className="font-display font-extrabold text-2xl text-[#1B365D]">طلباتي</h1>
              <p className="text-sm text-slate-600 mt-1">
                سجل الطلبات التي تواصلت بشأنها مع الحرفيين عبر تطبيق صُنّاع
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-display font-bold text-lg text-[#1B365D]">
                  لم ترسل أي طلبات خدمة بعد
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="min-h-[44px] px-5 py-2 rounded-xl bg-[#F58220] text-white text-sm font-bold cursor-pointer"
                >
                  تصفح الحرفيين الآن
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display font-bold text-lg text-[#1B365D]">
                          {ord.craftsmanName}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {ord.specialty} · {ord.district} · {ord.createdAt}
                        </p>
                      </div>
                      {renderStatusLabel(ord.status)}
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed bg-[#F8F9FA] p-3 rounded-xl">
                      {ord.problemDescription}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <span className="text-xs text-slate-500">{ord.preferredTime}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={buildClientToCraftsmanWaUrl({
                            craftsmanName: ord.craftsmanName,
                            craftsmanPhone: ord.craftsmanPhone,
                            specialty: ord.specialty,
                            district: ord.district,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>واتساب</span>
                        </a>
                        <a
                          href={`tel:+${ord.craftsmanPhone}`}
                          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#1B365D] text-white text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <Phone className="w-4 h-4" />
                          <span>اتصال</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ACCOUNT TAB (حسابي) */}
        {activeTab === 'account' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <form
              onSubmit={handleSaveAccount}
              className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm"
            >
              <h1 className="font-display font-extrabold text-2xl text-[#1B365D]">بيانات حسابي</h1>

              <div>
                <label htmlFor="acc-name" className="block text-sm font-bold mb-1.5">
                  الاسم
                </label>
                <input
                  id="acc-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 bg-[#F8F9FA]"
                />
              </div>

              <div>
                <label htmlFor="acc-phone" className="block text-sm font-bold mb-1.5">
                  رقم الهاتف (واتساب)
                </label>
                <input
                  id="acc-phone"
                  type="tel"
                  dir="ltr"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 bg-[#F8F9FA] text-left tabular-nums"
                />
              </div>

              <div>
                <label htmlFor="acc-dist" className="block text-sm font-bold mb-1.5">
                  المدينة / المنطقة
                </label>
                <select
                  id="acc-dist"
                  value={editDistrict}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 bg-[#F8F9FA]"
                >
                  {WORKING_DISTRICTS_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {accountSaved && (
                <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-bold text-[#15803D]">
                  تم حفظ بيانات الحساب بنجاح.
                </div>
              )}

              <button
                type="submit"
                className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white font-display font-bold text-sm cursor-pointer"
              >
                حفظ التعديلات
              </button>
            </form>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="font-display font-bold text-lg text-[#1B365D]">
                  التبديل وإعدادات النشر
                </h2>
                <button
                  type="button"
                  onClick={onSwitchToCraftsman}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#F58220] hover:bg-[#e07316] text-white font-bold text-sm cursor-pointer"
                >
                  الانتقال إلى لوحة صاحب المهنة / الحرفي
                </button>
                <button
                  type="button"
                  onClick={onOpenLegal}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#1B365D] font-bold text-sm cursor-pointer"
                >
                  سياسة الخصوصية وشروط الاستخدام
                </button>
                <button
                  type="button"
                  onClick={onOpenPlayAssets}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#1B365D] font-bold text-sm cursor-pointer"
                >
                  ملف الهوية البصرية ومتجر Google Play
                </button>
                <button
                  type="button"
                  onClick={onResetOnboarding}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-slate-600 hover:text-red-700 text-xs font-bold cursor-pointer"
                >
                  العودة إلى شاشة البداية والتسجيل
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Tab Bar (Mobile Only - Strictly 3 Tabs: الرئيسية - طلباتي - حسابي) */}
      <nav
        aria-label="التنقل السفلي للعميل"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-3 h-16"
      >
        <button
          type="button"
          onClick={() => {
            setSelectedCraftsman(null);
            setActiveTab('home');
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'home' ? 'text-[#F58220] font-bold' : 'text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">الرئيسية</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedCraftsman(null);
            setActiveTab('orders');
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'orders' ? 'text-[#F58220] font-bold' : 'text-slate-600'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[11px]">طلباتي</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedCraftsman(null);
            setActiveTab('account');
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'account' ? 'text-[#F58220] font-bold' : 'text-slate-600'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px]">حسابي</span>
        </button>
      </nav>

      {/* Modal / Bottom Sheet: طلب جماعة الخدمات العامة */}
      {showGroupModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="group-modal-title"
        >
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto sm:hidden" />
            <div className="flex items-center justify-between">
              <h2 id="group-modal-title" className="font-display font-extrabold text-xl text-[#1B365D]">
                طلب جماعة الخدمات العامة
              </h2>
              <button
                type="button"
                onClick={() => setShowGroupModal(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="grp-service" className="block text-sm font-bold mb-1.5">
                  نوع المشروع أو الخدمة المطلوبة
                </label>
                <select
                  id="grp-service"
                  value={groupServiceType}
                  onChange={(e) => setGroupServiceType(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA] text-sm"
                >
                  <option value="تشطيب وتجهيز متكامل (فريق عمل شامل)">
                    تشطيب وتجهيز متكامل (فريق عمل شامل)
                  </option>
                  <option value="تنظيف وتنسيق حدائق لمبنى أو فيلا">
                    تنظيف وتنسيق حدائق لمبنى أو فيلا
                  </option>
                  <option value="نقل أثاث وتجهيز مقر شركة مع الفك والتركيب">
                    نقل أثاث وتجهيز مقر شركة مع الفك والتركيب
                  </option>
                  <option value="صيانة شاملة (كهرباء + سباكة + تكييف)">
                    صيانة شاملة (كهرباء + سباكة + تكييف)
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="grp-dist" className="block text-sm font-bold mb-1.5">
                  المنطقة
                </label>
                <select
                  id="grp-dist"
                  value={groupDistrict}
                  onChange={(e) => setGroupDistrict(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-[#F8F9FA] text-sm"
                >
                  {WORKING_DISTRICTS_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <a
              href={buildGeneralGroupWaUrl({
                serviceType: groupServiceType,
                district: groupDistrict,
              })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowGroupModal(false)}
              className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-base flex items-center justify-center gap-2.5 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>إرسال الطلب لإدارة صُنّاع عبر واتساب</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
