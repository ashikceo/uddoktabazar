"use client";

import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeatureBar } from "@/components/home/FeatureBar";
import { PartnerList } from "@/components/home/PartnerList";
import { ProductSection } from "@/components/home/ProductSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { Product, VendorDetails } from "@/types";

// ─── MOCK DATA (Replace with API calls in production) ───

const mockPartners: VendorDetails[] = [
  {
    id: "1",
    shopName: "Bancharampur Uddoktar Bazar",
    shopSlug: "bancharampuruddoktarbazar",
    phone: "01712345678",
    address: "Bancharampur Bazar",
    upazila: "Bancharampur",
    district: "Brahmanbaria",
    division: "Chittagong",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.5,
    totalSales: 1200,
  },
  {
    id: "2",
    shopName: "Madarganj Uddoktar Bazar",
    shopSlug: "madarganjuddoktarbazar",
    phone: "01712345679",
    address: "Madarganj Bazar",
    upazila: "Madarganj",
    district: "Jamalpur",
    division: "Mymensingh",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.3,
    totalSales: 890,
  },
  {
    id: "3",
    shopName: "Dhanmandi Uddokter Bazar",
    shopSlug: "dhanmandiuddokterbazar",
    phone: "01712345680",
    address: "Dhanmandi Area",
    upazila: "Kotwali",
    district: "Dhaka",
    division: "Dhaka",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.7,
    totalSales: 2100,
  },
  {
    id: "4",
    shopName: "Titas Uddoktar Bazar",
    shopSlug: "titasuddoktarbazar",
    phone: "01712345681",
    address: "Titas Bazar",
    upazila: "Titas",
    district: "Comilla",
    division: "Chittagong",
    verificationStatus: "VERIFIED",
    isFeatured: false,
    rating: 4.2,
    totalSales: 650,
  },
  {
    id: "5",
    shopName: "Pirojpur Uddoktar Bazar",
    shopSlug: "pirojpuruddoktarbazar",
    phone: "01922802177",
    address: "২৪ নং ওয়ার্ড",
    upazila: "Pirojpur Sadar",
    district: "Pirojpur",
    division: "Barisal",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.8,
    totalSales: 3200,
  },
];

const mockCategories = [
  { id: "1", name: "Home & Kitchen", slug: "home-kitchen", image: "/images/categories/kitchen.jpg" },
  { id: "2", name: "Electronics", slug: "electronics", image: "/images/categories/electronics.jpg" },
  { id: "3", name: "Health & Beauty", slug: "health-beauty", image: "/images/categories/beauty.jpg" },
  { id: "4", name: "Fashion", slug: "fashion", image: "/images/categories/fashion.jpg" },
  { id: "5", name: "Food & Beverages", slug: "food-beverages", image: "/images/categories/food.jpg" },
  { id: "6", name: "Books & Stationery", slug: "books-stationery", image: "/images/categories/books.jpg" },
];

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Premium Glass Serving Bowls Set - 6 Pieces Colorful Design",
    slug: "premium-glass-serving-bowls",
    description: "Beautiful colorful glass serving bowls perfect for any occasion.",
    basePrice: 640,
    salePrice: 590,
    images: ["/images/products/bowls.jpg"],
    stockCount: 25,
    tags: ["NEW", "HOT"],
    isActive: true,
    isFeatured: true,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "1",
    vendor: mockPartners[0],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Decorative LED Lantern - Antique Design",
    slug: "decorative-led-lantern",
    description: "Beautiful antique style LED lantern for home decoration.",
    basePrice: 1200,
    salePrice: 950,
    images: ["/images/products/lantern.jpg"],
    stockCount: 15,
    tags: ["HOT", "DISCOUNTED"],
    isActive: true,
    isFeatured: true,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "2",
    vendor: mockPartners[1],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Round Wooden Serving Tray with Legs",
    slug: "round-wooden-serving-tray",
    description: "Elegant round wooden serving tray with sturdy legs.",
    basePrice: 450,
    salePrice: 380,
    images: ["/images/products/tray.jpg"],
    stockCount: 30,
    tags: ["NEW"],
    isActive: true,
    isFeatured: false,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "3",
    vendor: mockPartners[2],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "4",
    title: "MyLife Stainless Steel Pressure Cooker 5L",
    slug: "mylife-pressure-cooker-5l",
    description: "High quality stainless steel pressure cooker with safety features.",
    basePrice: 2800,
    salePrice: 2400,
    images: ["/images/products/cooker.jpg"],
    stockCount: 8,
    tags: ["HOT"],
    isActive: true,
    isFeatured: true,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "4",
    vendor: mockPartners[3],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Modhu Pure Honey - 500ml Organic",
    slug: "modhu-pure-honey-500ml",
    description: "100% pure organic honey from Modhu brand. Natural and healthy.",
    basePrice: 850,
    salePrice: 750,
    images: ["/images/products/honey.jpg"],
    stockCount: 50,
    tags: ["NEW", "DISCOUNTED"],
    isActive: true,
    isFeatured: true,
    categoryId: "5",
    category: { id: "5", name: "Food & Beverages", slug: "food-beverages", isActive: true },
    vendorId: "5",
    vendor: mockPartners[4],
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
  },
  {
    id: "6",
    title: "Topp Super Clean Detergent Powder - 1kg",
    slug: "topp-super-clean-detergent",
    description: "Powerful cleaning detergent powder for all fabrics.",
    basePrice: 320,
    salePrice: 280,
    images: ["/images/products/detergent.jpg"],
    stockCount: 100,
    tags: ["DISCOUNTED"],
    isActive: true,
    isFeatured: false,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "1",
    vendor: mockPartners[0],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "7",
    title: "Jinsin Sharbat Syrup - 400ml",
    slug: "jinsin-sharbat-syrup",
    description: "Traditional herbal syrup for energy and vitality.",
    basePrice: 550,
    salePrice: 480,
    images: ["/images/products/syrup.jpg"],
    stockCount: 40,
    tags: ["NEW"],
    isActive: true,
    isFeatured: false,
    categoryId: "5",
    category: { id: "5", name: "Food & Beverages", slug: "food-beverages", isActive: true },
    vendorId: "2",
    vendor: mockPartners[1],
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: "8",
    title: "Electric Mosquito Killer Lamp - USB Powered",
    slug: "electric-mosquito-killer",
    description: "Safe and effective USB powered mosquito killer lamp.",
    basePrice: 680,
    salePrice: 550,
    images: ["/images/products/mosquito-lamp.jpg"],
    stockCount: 20,
    tags: ["HOT", "DISCOUNTED"],
    isActive: true,
    isFeatured: true,
    categoryId: "2",
    category: { id: "2", name: "Electronics", slug: "electronics", isActive: true },
    vendorId: "3",
    vendor: mockPartners[2],
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
  },
  {
    id: "9",
    title: "OLEVS Premium Couple Watches - Silver Edition",
    slug: "olevs-couple-watches-silver",
    description: "Elegant silver couple watches with date display.",
    basePrice: 3500,
    salePrice: 2900,
    images: ["/images/products/watches.jpg"],
    stockCount: 12,
    tags: ["HOT", "DISCOUNTED"],
    isActive: true,
    isFeatured: true,
    categoryId: "4",
    category: { id: "4", name: "Fashion", slug: "fashion", isActive: true },
    vendorId: "4",
    vendor: mockPartners[3],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: "10",
    title: "Sound Hub Bluetooth Speaker - Portable",
    slug: "sound-hub-bluetooth-speaker",
    description: "High quality portable Bluetooth speaker with deep bass.",
    basePrice: 1200,
    salePrice: 990,
    images: ["/images/products/speaker.jpg"],
    stockCount: 35,
    tags: ["NEW", "HOT"],
    isActive: true,
    isFeatured: true,
    categoryId: "2",
    category: { id: "2", name: "Electronics", slug: "electronics", isActive: true },
    vendorId: "5",
    vendor: mockPartners[4],
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
  },
  {
    id: "11",
    title: "Red Plastic Food Container Set - 3 Pieces",
    slug: "red-food-container-set",
    description: "Durable plastic food containers in vibrant red color.",
    basePrice: 380,
    salePrice: 320,
    images: ["/images/products/container.jpg"],
    stockCount: 60,
    tags: ["NEW"],
    isActive: true,
    isFeatured: false,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "1",
    vendor: mockPartners[0],
    createdAt: "2024-01-30",
    updatedAt: "2024-01-30",
  },
  {
    id: "12",
    title: "Multi-Function Vegetable Cutter - 8 Settings",
    slug: "multi-vegetable-cutter",
    description: "Professional vegetable cutter with 8 different settings.",
    basePrice: 750,
    salePrice: 650,
    images: ["/images/products/cutter.jpg"],
    stockCount: 18,
    tags: ["HOT", "DISCOUNTED"],
    isActive: true,
    isFeatured: true,
    categoryId: "1",
    category: { id: "1", name: "Home & Kitchen", slug: "home-kitchen", isActive: true },
    vendorId: "2",
    vendor: mockPartners[1],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
];

// Filter products for different tabs
const allProducts = mockProducts;
const partnerProducts = mockProducts.filter((p) => p.vendorId !== "5");
const hotProducts = mockProducts.filter((p) => p.tags.includes("HOT"));

// ─── LOADING SKELETON ───
function HomeLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="w-full h-[400px] rounded-2xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN HOME PAGE ───
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Suspense fallback={<HomeLoading />}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Feature Bar */}
            <FeatureBar />

            {/* Partner List Section */}
            <PartnerList partners={mockPartners} />

            {/* Product Sections with Tabs */}
            <ProductSection
              title="All Over Available Product"
              allProducts={allProducts}
              partnerProducts={partnerProducts}
              hotProducts={hotProducts}
            />

            {/* Categories Grid */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {mockCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="text-sm font-bold text-white">{category.name}</h3>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">📦</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Newsletter */}
            <section className="bg-emerald-900 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Join Our Newsletter
              </h2>
              <p className="text-emerald-200 mb-6 max-w-md mx-auto">
                Subscribe to get updates on new products, special offers, and partner news.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-colors">
                  Subscribe
                </button>
              </div>
            </section>
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
