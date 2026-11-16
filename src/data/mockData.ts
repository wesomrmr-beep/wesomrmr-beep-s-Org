import {
  AccountRole,
  CategoryId,
  CraftsmanProfile,
  OrderStatus,
  RegisteredUser,
  ServiceCategory,
  ServiceOrder,
} from '../types/sunna';

export const ADMIN_WHATSAPP_NUMBER = '218910005500';
export const SUBSCRIPTION_FEE_DISPLAY = '35 د.ل / شهرياً';
export const LOCAL_WALLET_ACCOUNT = '091-000-5500 (محفظة سداد / تداول المحلية)';
export const LOCAL_BANK_IBAN = 'LY44 0021 0000 1984 5500 2201';

export const DISTRICTS: string[] = [
  'الكل',
  'وسط المدينة',
  'الحي الشمالي',
  'الحي الشرقي',
  'حي الأندلس',
  'المنطقة الصناعية',
  'الأحياء السكنية الجديدة',
];

export const WORKING_DISTRICTS_OPTIONS: string[] = DISTRICTS.filter((d) => d !== 'الكل');

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: CategoryId.CONSTRUCTION,
    title: 'البناء والمقاولات',
    shortDesc: 'مقاولات عامة، دهان وطلاء، سباكة وكهرباء',
    subServices: ['مقاولات عامة', 'دهان وطلاء', 'سباكة وتمديدات صحية', 'كهرباء'],
    accentHex: '#1B365D',
  },
  {
    id: CategoryId.CARPENTRY,
    title: 'النجارة والأثاث',
    shortDesc: 'أسطى نجار، فك وتركيب الأثاث، صيانة الأبواب',
    subServices: ['أسطى نجار', 'فك وتركيب الأثاث', 'صيانة الأبواب والنوافذ'],
    accentHex: '#B45309',
  },
  {
    id: CategoryId.TECHNICAL,
    title: 'الصيانة الفنية',
    shortDesc: 'صيانة الغسالات، الثلاجات، والمكيفات',
    subServices: ['صيانة غسالات', 'صيانة ثلاجات', 'صيانة وتعبئة مكيفات'],
    accentHex: '#0F766E',
  },
  {
    id: CategoryId.TRANSPORT,
    title: 'النقل والآليات',
    shortDesc: 'نقل البضائع والأثاث، سائقو السيارات الثقيلة',
    subServices: ['نقل البضائع والأثاث', 'سائقو السيارات الثقيلة والمعدات'],
    accentHex: '#C2410C',
  },
  {
    id: CategoryId.GENERAL,
    title: 'الخدمات العامة والبيئة',
    shortDesc: 'بستاني وتنسيق حدائق، عامل نظافة، خدمات مساعدة',
    subServices: ['بستاني وتنسيق حدائق', 'عامل نظافة (صديق البيئة)', 'خدمات مساعدة متنوعة'],
    accentHex: '#15803D',
  },
];

export const INITIAL_CRAFTSMEN: CraftsmanProfile[] = [
  {
    id: 'c-101',
    name: 'الأسطى سالم المنصوري',
    categoryId: CategoryId.CONSTRUCTION,
    specialty: 'كهرباء وتمديدات منزلية',
    district: 'وسط المدينة',
    workingDistricts: ['وسط المدينة', 'حي الأندلس', 'الحي الشمالي'],
    rating: 4.9,
    reviewCount: 48,
    experienceYears: 12,
    isAvailable: true,
    phone: '218912345601',
    bio: 'فني كهرباء معتمد لتأسيس لوحات التوزيع الرئيسية، فحص الأعطال، وتركيب الإنارة الحديثة بأعلى معايير الأمان.',
    portfolioImages: [
      '/src/assets/images/craft_construction_1794850946416.jpg',
      '/src/assets/images/craft_ac_repair_1794850947328.jpg',
      '/src/assets/images/craft_carpentry_1794850947303.jpg',
    ],
  },
  {
    id: 'c-102',
    name: 'المقاول طارق الفيتوري',
    categoryId: CategoryId.CONSTRUCTION,
    specialty: 'مقاولات عامة ودهان وطلاء',
    district: 'الحي الشمالي',
    workingDistricts: ['الحي الشمالي', 'الحي الشرقي', 'الأحياء السكنية الجديدة'],
    rating: 4.8,
    reviewCount: 34,
    experienceYears: 15,
    isAvailable: true,
    phone: '218912345602',
    bio: 'تنفيذ أعمال الترميم، اللياسة، الدهانات الديكورية، وأعمال السباكة والتمديدات الصحية مع تسليم في الموعد المحدد.',
    portfolioImages: [
      '/src/assets/images/craft_construction_1794850946416.jpg',
      '/src/assets/images/craft_gardening_1794850948507.jpg',
    ],
  },
  {
    id: 'c-103',
    name: 'الأسطى عبد الرحمن النجار',
    categoryId: CategoryId.CARPENTRY,
    specialty: 'أسطى نجار وصيانة الأبواب والنوافذ',
    district: 'حي الأندلس',
    workingDistricts: ['حي الأندلس', 'وسط المدينة'],
    rating: 4.9,
    reviewCount: 62,
    experienceYears: 18,
    isAvailable: true,
    phone: '218912345603',
    bio: 'تفصيل وتركيب الأبواب الخشبية الصلبة، مطابخ الخشب الطبيعي، وفك وتركيب غرف النوم بدقة متناهية.',
    portfolioImages: [
      '/src/assets/images/craft_carpentry_1794850947303.jpg',
      '/src/assets/images/craft_construction_1794850946416.jpg',
    ],
  },
  {
    id: 'c-104',
    name: 'المهندس محمد الكيلاني',
    categoryId: CategoryId.TECHNICAL,
    specialty: 'أسطى صيانة كهرومنزلية (مكيفات وثلاجات)',
    district: 'الحي الشرقي',
    workingDistricts: ['الحي الشرقي', 'وسط المدينة', 'حي الأندلس'],
    rating: 4.7,
    reviewCount: 53,
    experienceYears: 9,
    isAvailable: true,
    phone: '218912345604',
    bio: 'صيانة فورية لغسالات الأوتوماتيك، الثلاجات، وشحن وتنظيف المكيفات السبلت والمركزية بقطع غيار أصلية.',
    portfolioImages: [
      '/src/assets/images/craft_ac_repair_1794850947328.jpg',
      '/src/assets/images/craft_construction_1794850946416.jpg',
    ],
  },
  {
    id: 'c-105',
    name: 'خالد الشريف للنقل',
    categoryId: CategoryId.TRANSPORT,
    specialty: 'نقل البضائع والأثاث',
    district: 'المنطقة الصناعية',
    workingDistricts: ['المنطقة الصناعية', 'وسط المدينة', 'الأحياء السكنية الجديدة'],
    rating: 4.8,
    reviewCount: 41,
    experienceYears: 11,
    isAvailable: false,
    phone: '218912345605',
    bio: 'شاحنات مغلقة ومجهزة لنقل الأثاث المنزلي والمكتبي والبضائع مع التغليف الآمن والتحميل والتنزيل.',
    portfolioImages: [
      '/src/assets/images/craft_transport_1794850948535.jpg',
      '/src/assets/images/craft_carpentry_1794850947303.jpg',
    ],
  },
  {
    id: 'c-106',
    name: 'يوسف الورفلي',
    categoryId: CategoryId.GENERAL,
    specialty: 'بستاني وتنسيق حدائق',
    district: 'الأحياء السكنية الجديدة',
    workingDistricts: ['الأحياء السكنية الجديدة', 'حي الأندلس'],
    rating: 4.9,
    reviewCount: 29,
    experienceYears: 7,
    isAvailable: true,
    phone: '218912345606',
    bio: 'تصميم وتنسيق الحدائق المنزلية، تقليم الأشجار، تركيب شبكات الري، وخدمات العناية البيئية النظيفة.',
    portfolioImages: [
      '/src/assets/images/craft_gardening_1794850948507.jpg',
      '/src/assets/images/craft_construction_1794850946416.jpg',
    ],
  },
];

export const INITIAL_ORDERS: ServiceOrder[] = [
  {
    id: 'ord-301',
    clientName: 'أحمد العماري',
    clientPhone: '218923456789',
    craftsmanId: 'self-craftsman',
    craftsmanName: 'الأسطى سالم المنصوري',
    craftsmanPhone: '218912345601',
    specialty: 'كهرباء وتمديدات منزلية',
    district: 'وسط المدينة',
    problemDescription: 'انقطاع متكرر في قاطع الكهرباء الرئيسي للمطبخ مع الحاجة لفحص التوصيلات.',
    preferredTime: 'اليوم · 04:30 مساءً',
    status: OrderStatus.PENDING,
    createdAt: 'منذ 15 دقيقة',
  },
  {
    id: 'ord-302',
    clientName: 'سعاد المهدي',
    clientPhone: '218924567890',
    craftsmanId: 'self-craftsman',
    craftsmanName: 'الأسطى سالم المنصوري',
    craftsmanPhone: '218912345601',
    specialty: 'سباكة وتمديدات صحية',
    district: 'حي الأندلس',
    problemDescription: 'تسريب مياه أسفل حوض المغسلة الرئيسية والحاجة لاستبدال المحبس والوصلات.',
    preferredTime: 'غداً · 10:00 صباحاً',
    status: OrderStatus.ACCEPTED,
    createdAt: 'منذ ساعتين',
  },
];

export const DEFAULT_USER: RegisteredUser = {
  name: 'محمود الزنتاني',
  phone: '218915554433',
  district: 'وسط المدينة',
  role: AccountRole.CLIENT,
  agreedToTerms: true,
  categoryId: CategoryId.CONSTRUCTION,
  specialty: 'كهرباء وتمديدات منزلية',
  workingDistricts: ['وسط المدينة', 'حي الأندلس'],
  bio: 'خبرة أكثر من 10 سنوات في التمديدات الكهربائية وصيانة لوحات التوزيع للمنازل والمحلات.',
  portfolioImages: [
    '/src/assets/images/craft_construction_1794850946416.jpg',
    '/src/assets/images/craft_ac_repair_1794850947328.jpg',
  ],
  isAvailable: true,
  subscriptionDaysLeft: 22,
  subscriptionReceiptSent: false,
};

function sanitizeWaNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `218${digits.slice(1)}`;
  }
  return digits || ADMIN_WHATSAPP_NUMBER;
}

export function buildClientToCraftsmanWaUrl(params: {
  craftsmanName: string;
  craftsmanPhone: string;
  specialty: string;
  district: string;
}): string {
  const message = `السلام عليكم ${params.craftsmanName}، تواصلت معك عبر تطبيق صُنّاع. أحتاج إلى خدمة في مجال: ${params.specialty} في منطقة ${params.district}. هل أنت متاح؟ سأرسل لك الموقع الجغرافي وصورة توضيحية الآن.`;
  return `https://wa.me/${sanitizeWaNumber(params.craftsmanPhone)}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralGroupWaUrl(params: {
  serviceType: string;
  district: string;
}): string {
  const message = `السلام عليكم إدارة تطبيق صُنّاع، أرغب في طلب (جماعة الخدمات العامة) لخدمة: ${params.serviceType} في منطقة ${params.district}. نرجو التواصل للاتفاق.`;
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildSubscriptionWaUrl(params: {
  craftsmanName: string;
  specialty: string;
  phone: string;
}): string {
  const message = `السلام عليكم إدارة تطبيق صُنّاع، أرغب في تفعيل الاشتراك الشهري. الاسم: ${params.craftsmanName} | المهنة: ${params.specialty} | الهاتف: ${params.phone}. مرفق صورة إيصال الحوالة الإلكترونية المحلية.`;
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildCraftsmanToClientWaUrl(params: {
  clientName: string;
  clientPhone: string;
  specialty: string;
}): string {
  const message = `السلام عليكم ${params.clientName}، تم قبول طلبكم في تطبيق صُنّاع بخصوص خدمة (${params.specialty}). يسعدني التنسيق معكم لتحديد الموعد والموقع.`;
  return `https://wa.me/${sanitizeWaNumber(params.clientPhone)}?text=${encodeURIComponent(message)}`;
}
