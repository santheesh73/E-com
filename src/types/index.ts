export interface ProductReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'electronics' | 'wearables' | 'audio' | 'streetwear' | 'footwear' | 'gaming';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  tags: string[];
  badge?: string;
  badgeType?: 'hot' | 'sale' | 'new' | 'limited';
  isFlashDeal?: boolean;
  flashDealEnd?: string; // ISO or relative
  stock: number;
  colors?: { name: string; hex: string; bgClass: string }[];
  sizes?: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  image: string;
  itemCount: number;
  gradient: string;
}

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  status: 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  brand: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
