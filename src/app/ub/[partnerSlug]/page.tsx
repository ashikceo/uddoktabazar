"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Product, VendorDetails } from "@/types";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Store,
  ShieldCheck,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

// ─── MOCK DATA (Replace with API calls) ───

const mockPartners: Record<string, VendorDetails> = {
  bancharampuruddoktarbazar: {
    id: "1",
    shopName: "Bancharampur Uddoktar Bazar",
    shopSlug: "bancharampuruddoktarbazar",
    shopDescription:
      "Your trusted local marketplace in Bancharampur. We offer quality products at affordable prices with fast local delivery.",
    shopBanner: "/images/vendors/bancharampur-banner.jpg",
    shopLogo: "/images/vendors/bancharampur-logo.jpg",
    phone: "01712345678",
    whatsapp: "01712345678",
    email: "bancharampur@uddoktarbazar.com",
    address: "Bancharampur Bazar, Main Road",
    upazila: "Bancharampur",
    district: "Brahmanbaria",
    division: "Chittagong",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.5,
    totalSales: 1200,
  },
  madarganjuddoktarbazar: {
    id: "2",
    shopName: "Madarganj Uddoktar Bazar",
    shopSlug: "madarganjuddoktarbazar",
    shopDescription:
      "Madarganj's premier online marketplace. Bringing quality products to your doorstep.",
    shopBanner: "/images/vendors/madarganj-banner.jpg",
    shopLogo: "/images/vendors/madarganj-logo.jpg",
    phone: "01712345679",
    whatsapp: "01712345679",
    email: "madarganj@uddoktarbazar.com",
    address: "Madarganj Bazar, Central Market",
    upazila: "Madarganj",
    district: "Jamalpur",
    division: "Mymensingh",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.3,
    totalSales: 890,
  },
  dhanmandiuddokterbazar: {
    id: "3",
    shopName: "Dhanmandi Uddokter Bazar",
    shopSlug: "dhanmandiuddokterbazar",
    shopDescription:
      "Dhaka's trusted local partner store in Dhanmandi area. Quality guaranteed.",
    shopBanner: "/images/vendors/dhanmandi-banner.jpg",
    shopLogo: "/images/vendors/dhanmandi-logo.jpg",
    phone: "01712345680",
    whatsapp: "01712345680",
    email: "dhanmandi@uddoktarbazar.com",
    address: "Dhanmandi Area, Block C",
    upazila: "Kotwali",
    district: "Dhaka",
    division: "Dhaka",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.7,
    totalSales: 2100,
  },
  titasuddoktarbazar: {
    id: "4",
    shopName: "Titas Uddoktar Bazar",
    shopSlug: "titasuddoktarbazar",
    shopDescription:
      "Serving Titas and surrounding areas with quality products and excellent service.",
    shopBanner: "/images/vendors/titas-banner.jpg",
    shopLogo: "/images/vendors/titas-logo.jpg",
    phone: "01712345681",
    whatsapp: "01712345681",
    email: "titas@uddoktarbazar.com",
    address: "Titas Bazar, Main Street",
    upazila: "Titas",
    district: "Comilla",
    division: "Chittagong",
    verificationStatus: "VERIFIED",
    isFeatured: false,
    rating: 4.2,
    totalSales: 650,
  },
  pirojpuruddoktarbazar: {
    id: "5",
    shopName: "Pirojpur Uddoktar Bazar",
    shopSlug: "pirojpuruddoktarbazar",
    shopDescription:
      "Pirojpur's leading online marketplace. ২৪ নং ওয়ার্ড, পিরোজপুর সদর.",
    shopBanner: "/images/vendors/pirojpur-banner.jpg",
    shopLogo: "/images/vendors/pirojpur-logo.jpg",
    phone: "01922802177",
    whatsapp: "01922802177",
    email: "pirojpur@uddoktarbazar.com",
    address: "২৪ নং ওয়ার্ড, পিরোজপুর সদর",
    upazila: "Pirojpur Sadar",
    district: "Pirojpur",
    division: "Barisal",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.8,
    totalSales: 3200,
  },
};

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
    vendor: mockPartners.bancharampuruddoktarbazar,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
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
    vendor: mockPartners.bancharampuruddoktarbazar,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
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
    vendor: mockPartners.bancharampuruddoktarbazar,
    createdAt: "2024-01-30",
    updatedAt: "2024-01-30",
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
    vendor: mockPartners.madarganjuddoktarbazar,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
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
    vendor: mockPartners.madarganjuddoktarbazar,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
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
    vendor: mockPartners.madarganjuddoktarbazar,
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
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
    vendor: mockPartners.dhanmandiuddokterbazar,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
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
    vendor: mockPartners.dhanmandiuddokterbazar,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
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
    vendor: mockPartners.titasuddoktarbazar,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
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
    vendor: mockPartners.titasuddoktarbazar,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
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
    vendor: mockPartners.pirojpuruddoktarbazar,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
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
    vendor: mockPartners.pirojpuruddoktarbazar,
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
  },
];

// ─── LOADING COMPONENT ───
function PartnerStoreLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-[250px] rounded-2xl" />
      <div className="flex gap-4">
        <Skeleton className="w-24 h-24 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOT FOUND COMPONENT ───
function PartnerNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Partner Store Not Found</h1>
        <p className="text-gray-500 mb-6">
          The partner store you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/vandor-list"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          View All Partners
        </Link>
      </main>
      <Footer />
    </div>
  );
}

// ─── MAIN PARTNER STORE PAGE ───
export default function PartnerStorePage() {
  const params = useParams();
  const partnerSlug = params.partnerSlug as string;
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [partnerSlug]);

  const partner = mockPartners[partnerSlug];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PartnerStoreLoading />
        </main>
        <Footer />
      </div>
    );
  }

  if (!partner) {
    return <PartnerNotFound />;
  }

  // Filter products for this partner
  const partnerProducts = mockProducts.filter((p) => p.vendorId === partner.id);

  // Apply search and tag filters
  const filteredProducts = partnerProducts.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || product.tags.includes(selectedTag as any);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(partnerProducts.flatMap((p) => p.tags))
  ) as ("NEW" | "HOT" | "DISCOUNTED")[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Partner Banner */}
        <div className="relative h-[250px] sm:h-[300px] bg-emerald-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
              <div className="flex items-end gap-4 sm:gap-6">
                {/* Shop Logo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl shadow-lg flex items-center justify-center flex-shrink-0 border-4 border-white">
                  <Store className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
                </div>

                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                      {partner.shopName}
                    </h1>
                    {partner.verificationStatus === "VERIFIED" && (
                      <Badge variant="success" className="flex-shrink-0">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-emerald-200 text-sm sm:text-base">
                    {partner.shopName} Uddoktar Bazar - {partner.district} District
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Partner Info Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {partner.upazila}, {partner.district}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact</p>
                  <p className="text-sm font-medium text-gray-900">{partner.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="text-sm font-medium text-gray-900">
                    {partner.rating} / 5.0 ({partner.totalSales} sales)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{partner.email}</p>
                </div>
              </div>
            </div>

            {partner.shopDescription && (
              <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {partner.shopDescription}
              </p>
            )}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products in this store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Filter className="w-4 h-4" />
                Filter:
              </span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  !selectedTag
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? tag === "HOT"
                        ? "bg-red-600 text-white"
                        : tag === "NEW"
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tag === "HOT" && "🔥 Hot"}
                  {tag === "NEW" && "✨ New"}
                  {tag === "DISCOUNTED" && "🏷️ Discounted"}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Products from {partner.shopName}
              </h2>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} products found
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} columns={4} />
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Back to Marketplace */}
          <div className="text-center pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Uddoktar Bazar Marketplace
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
