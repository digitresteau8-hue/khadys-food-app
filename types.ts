
export type MenuCategory = 
  | 'Entree' 
  | 'Plat Africain' 
  | 'Plat Européen' 
  | 'Spécialité Maison' 
  | 'Plat du Jour' 
  | 'Dessert' 
  | 'Boisson' 
  | 'Box Sauce'
  | 'Box Repas'
  | 'Pack'
  | 'Buffet';

export type OrderStatus = 
  | 'RECEIVED' 
  | 'CONFIRMED' 
  | 'PREPARING' 
  | 'READY' 
  | 'DELIVERING' 
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod = 'CASH' | 'AIRTEL_MONEY' | 'MOOV_MONEY';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  rating: number;
  isAvailable: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isPlatDuJour?: boolean;
  isSpécialitéMaison?: boolean;
  isPromo?: boolean;
  includes?: string[]; 
  minPeople?: number;  
}

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image: string;
  date: string;
  adminReply?: string; 
}

export interface CartItem extends MenuItem {
  quantity: number;
  instructions?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  timestamp: string;
}

export enum Page {
  HOME = 'HOME',
  MENU = 'MENU',
  TRAITEUR = 'TRAITEUR',
  CART = 'CART',
  BOX = 'BOX',
  PACKS = 'PACKS',
  COMMANDES = 'COMMANDES',
  COMPTE = 'COMPTE',
  INFOS = 'INFOS',
  ADMIN = 'ADMIN'
}

export enum AdminView {
  DASHBOARD = 'DASHBOARD',
  ORDERS = 'ORDERS',
  MENU_MGMT = 'MENU_MGMT',
  BOX_SAUCES = 'BOX_SAUCES',
  PACK_BUFFET = 'PACK_BUFFET',
  CATERING = 'CATERING',
  LIVREUR = 'LIVREUR',
  AI_STRATEGY = 'AI_STRATEGY',
  CLUB_KHADY = 'CLUB_KHADY',
  SETTINGS = 'SETTINGS'
}

export interface District {
  name: string;
  zone: 'center' | 'periphery';
}

export interface CateringRequest {
  id: string;
  customer_name: string;
  phone: string;
  event_type: string;
  guests_count: number;
  event_date: string;
  location: string;
  details: string;
  status: 'PENDING' | 'CONTACTED' | 'VALIDATED' | 'COMPLETED';
}
