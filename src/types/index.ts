export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'PARTNER' | 'DEALER' | 'SELLER' | 'CUSTOMER';
  avatar?: string;
  phone?: string;
}

export interface VendorDetails {
  id: string;
  shopName: string;
  shopSlug: string;
  shopDescription?: string;
  shopLogo?: string;
  shopBanner?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  upazila: string;
  district: string;
  division: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  isFeatured: boolean;
  rating: number;
  totalSales: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  isActive: boolean;
  children?: Category[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  basePrice: number;
  salePrice?: number;
  images: string[];
  stockCount: number;
  sku?: string;
  tags: ('NEW' | 'HOT' | 'DISCOUNTED')[];
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  category: Category;
  vendorId: string;
  vendor: VendorDetails;
  weight?: number;
  metaTitle?: string;
  metaDesc?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingDistrict: string;
  shippingUpazila: string;
  shippingPostalCode?: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: 'BKASH' | 'NAGAD' | 'ROCKET' | 'COD' | 'CARD';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  fulfillmentStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  vendorId: string;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  total: number;
  fulfillmentStatus: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  bannerImage?: string;
  isPublished: boolean;
  publishedAt?: string;
  author: User;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: string;
}
