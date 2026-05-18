"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  MapPin,
  Phone,
  Store,
  ChevronRight,
  Star,
  Filter,
  Grid3X3,
  List,
  ShieldCheck,
} from "lucide-react";
import { VendorDetails } from "@/types";

// ─── MOCK DATA ───
const mockVendors: VendorDetails[] = [
  {
    id: "1",
    shopName: "Bancharampur Uddoktar Bazar",
    shopSlug: "bancharampuruddoktarbazar",
    phone: "01712345678",
    address: "Bancharampur Bazar, Main Road",
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
    address: "Madarganj Bazar, Central Market",
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
    address: "Dhanmandi Area, Block C",
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
    address: "Titas Bazar, Main Street",
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
    address: "২৪ নং ওয়ার্ড, পিরোজপুর সদর",
    upazila: "Pirojpur Sadar",
    district: "Pirojpur",
    division: "Barisal",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.8,
    totalSales: 3200,
  },
  {
    id: "6",
    shopName: "Feni Uddoktar Bazar",
    shopSlug: "feniuddoktarbazar",
    phone: "01712345682",
    address: "Feni Sadar Bazar",
    upazila: "Feni Sadar",
    district: "Feni",
    division: "Chittagong",
    verificationStatus: "PENDING",
    isFeatured: false,
    rating: 0,
    totalSales: 0,
  },
  {
    id: "7",
    shopName: "Rajshahi Uddoktar Bazar",
    shopSlug: "rajshahiuddoktarbazar",
    phone: "01712345683",
    address: "Rajshahi City Center",
    upazila: "Boalia",
    district: "Rajshahi",
    division: "Rajshahi",
    verificationStatus: "VERIFIED",
    isFeatured: false,
    rating: 4.1,
    totalSales: 450,
  },
  {
    id: "8",
    shopName: "Sylhet Uddoktar Bazar",
    shopSlug: "sylhetuddoktarbazar",
    phone: "01712345684",
    address: "Sylhet City Point",
    upazila: "Sylhet Sadar",
    district: "Sylhet",
    division: "Sylhet",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.6,
    totalSales: 1500,
  },
];

// Unique divisions & districts for filters
const divisions = Array.from(new Set(mockVendors.map((v) => v.division)));

export default function VendorListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "sales">("name");

  // Filter & sort vendors
  const filteredVendors = mockVendors
    .filter((vendor) => {
      const matchesSearch =
        !searchQuery ||
        vendor.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.upazila.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDivision = !selectedDivision || vendor.division === selectedDivision;
      return matchesSearch && matchesDivision;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.shopName.localeCompare(b.shopName);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "sales") return b.totalSales - a.totalSales;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Partner Lists
          </h1>
          <p className="text-gray-500">
            Discover verified regional partners across Bangladesh. Visit their local stores for exclusive deals.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, district, or upazila..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Division Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Divisions</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="sales">Sort by Sales</option>
              </select>

              {/* View Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500">
            Showing {filteredVendors.length} of {mockVendors.length} partners
          </div>
        </div>

        {/* Vendor Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="relative h-32 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                  <Store className="w-12 h-12 text-emerald-300 group-hover:scale-110 transition-transform" />
                  {vendor.verificationStatus === "VERIFIED" && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="success" className="text-[10px]">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {vendor.shopName}
                  </h3>

                  <div className="space-y-1.5 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">
                        {vendor.upazila}, {vendor.district}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{vendor.phone}</span>
                    </div>
                    {vendor.rating > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                        <span>
                          {vendor.rating} ({vendor.totalSales} sales)
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/ub/${vendor.shopSlug}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    View Shop
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vendor List View (Table) */}
        {viewMode === "list" && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Partner Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Username/Slug
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Area Assignment
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredVendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Store className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {vendor.shopName}
                            </p>
                            {vendor.rating > 0 && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                {vendor.rating} · {vendor.totalSales} sales
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {vendor.shopSlug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">
                            {vendor.upazila}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {vendor.district}, {vendor.division}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-emerald-500" />
                          {vendor.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {vendor.verificationStatus === "VERIFIED" ? (
                          <Badge variant="success">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="warning">Pending</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/ub/${vendor.shopSlug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                          View Shop
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No partners found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
