export interface Product {
  id: string;
  name: string;
  category: string;
  storeId: string;
  storeName: string;
  price: number;
  originalPrice: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  badge?: string;
  tags: string[];
  description: string;
  specifications: Record<string, string>;
  nutrition?: Record<string, string> | null;
  featured?: boolean;
  isTrending?: boolean;
}

export interface Store {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  deliveryTimeMins: number;
  minOrder: number;
  freeDeliveryThreshold: number;
  address: string;
  phone: string;
  openingHours: string;
  isOpen: boolean;
  category: string;
  image: string;
  bannerImage: string;
  isVerified: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  flat: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'store_owner' | 'admin';
  phone: string;
  coins: number;
  avatar: string;
  storeId?: string;
  savedAddresses?: Address[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  flatDiscount: number;
  minOrderValue: number;
  description: string;
  maxDiscount: number;
  expiry: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderTimeline {
  step: string;
  time: string;
  completed: boolean;
}

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
}

export interface Order {
  id: string;
  createdAt: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  storeId: string;
  storeName: string;
  status: 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  deliveryPartner: DeliveryPartner;
  items: OrderItem[];
  itemTotal: number;
  deliveryFee: number;
  discount: number;
  couponApplied: string | null;
  coinsRedeemed: number;
  coinsEarned?: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  deliveryAddress: string;
  slot?: string;
  timeline: OrderTimeline[];
}

export interface MealKit {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  prepTime: string;
  difficulty: string;
  servings: number;
  discountedPrice: number;
  originalPrice: number;
  productIds: string[];
  products?: Product[];
  recipeSteps: string[];
}

