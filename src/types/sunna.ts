export enum AccountRole {
  CLIENT = 'client',
  CRAFTSMAN = 'craftsman',
}

export enum AppStage {
  SPLASH = 'splash',
  ROLE_SELECT = 'role-select',
  REGISTER = 'register',
  APP = 'app',
  LEGAL = 'legal',
  PLAY_ASSETS = 'play-assets',
}

export enum CategoryId {
  CONSTRUCTION = 'construction',
  CARPENTRY = 'carpentry',
  TECHNICAL = 'technical',
  TRANSPORT = 'transport',
  GENERAL = 'general',
}

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export interface ServiceCategory {
  id: CategoryId;
  title: string;
  shortDesc: string;
  subServices: string[];
  accentHex: string;
}

export interface CraftsmanProfile {
  id: string;
  name: string;
  categoryId: CategoryId;
  specialty: string;
  district: string;
  workingDistricts: string[];
  rating: number;
  reviewCount: number;
  experienceYears: number;
  isAvailable: boolean;
  phone: string;
  bio: string;
  portfolioImages: string[];
}

export interface ServiceOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  craftsmanId: string;
  craftsmanName: string;
  craftsmanPhone: string;
  specialty: string;
  district: string;
  problemDescription: string;
  preferredTime: string;
  status: OrderStatus;
  createdAt: string;
}

export interface RegisteredUser {
  name: string;
  phone: string;
  district: string;
  role: AccountRole;
  agreedToTerms: boolean;
  // Craftsman-specific fields
  categoryId: CategoryId;
  specialty: string;
  workingDistricts: string[];
  bio: string;
  portfolioImages: string[];
  isAvailable: boolean;
  subscriptionDaysLeft: number;
  subscriptionReceiptSent: boolean;
}
