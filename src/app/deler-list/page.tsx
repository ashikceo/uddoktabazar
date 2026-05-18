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
  ShieldCheck,
  Filter,
  Building2,
} from "lucide-react";
import { VendorDetails } from "@/types";

// ─── MOCK DEALER DATA ───
const mockDealers: VendorDetails[] = [
  {
    id: "d1",
    shopName: "Dhaka Central Dealer Hub",
    shopSlug: "dhaka-central-dealer",
    phone: "01812345678",
    address: "Gulshan Avenue, Dhaka",
    upazila: "Gulshan",
    district: "Dhaka",
    division: "Dhaka",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.9,
    totalSales: 5600,
  },
  {
    id: "d2",
    shopName: "Chittagong Wholesale Dealer",
    shopSlug: "chittagong-wholesale",
    phone: "01812345679",
    address: "Agrabad Commercial Area",
    upazila: "Double Mooring",
    district: "Chittagong",
    division: "Chittagong",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.6,
    totalSales: 3200,
  },
  {
    id: "d3",
    shopName: "Rajshahi Regional Dealer",
    shopSlug: "rajshahi-regional",
    phone: "01812345680",
    address: "Shaheb Bazar, Rajshahi",
    upazila: "Boalia",
    district: "Rajshahi",
    division: "Rajshahi",
    verificationStatus: "VERIFIED",
    isFeatured: false,
    rating: 4.4,
    totalSales: 1800,
  },
  {
    id: "d4",
    shopName: "Khulna South Dealer Point",
    shopSlug: "khulna-south-dealer",
    phone: "01812345681",
    address: "KDA Avenue, Khulna",
    upazila: "Sonadanga",
    district: "Khulna",
    division: "Khulna",
    verificationStatus: "PENDING",
    isFeatured: false,
    rating: 0,
    totalSales: 0,
  },
  {
    id: "d5",
    shopName: "Barisal Distribution Center",
    shopSlug: "barisal-distribution",
    phone: "01812345682",
    address: "Band Road, Barisal",
    upazila: "Kotwali",
    district: "Barisal",
    division: "Barisal",
    verificationStatus: "VERIFIED",
    isFeatured: true,
    rating: 4.5,
    totalSales: 2400,
  },
  {
    id: "d6",
    shopName: "Sylhet Northern Dealer",
    shopSlug: "sylhet-northern",
    phone: "01812345683",
    address: "Zindabazar, Sylhet",
    upazila: "Sylhet Sadar",
    district: "Sylhet",
    division: "Sylhet",
    verificationStatus: "VERIFIED",
    isFeatured: false,
    rating: 4.3,
    totalSales: 1200,
  },
];

export default function DealerListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  const divisions = Array.from(new Set(mockDealers.map((d) => d.division)));

  const filteredDealers = mockDealers.filter((dealer) => {
    const matchesSearch =
      !searchQuery ||
      dealer.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.upazila.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = !selectedDivision || dealer.division === selectedDivision;
    return matchesSearch && matchesDivision;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Dealer Lists
          </h1>
          <p className="text-gray-500">
            Browse our authorized dealer network for bulk purchases, wholesale deals, and regional distribution.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search dealers by name, district, or upazila..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

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
          </div>
          <div className="text-sm text-gray-500 mt-3">
            Showing {filteredDealers.length} of {mockDealers.length} dealers
          </div>
        </div>

        {/* Dealer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-28 bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-sky-300" />
                {dealer.verificationStatus === "VERIFIED" && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="text-[10px]">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Authorized
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {dealer.shopName}
                </h3>

                <div className="space-y-1.5 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                    <span>
                      {dealer.upazila}, {dealer.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                    <span>{dealer.phone}</span>
                  </div>
                </div>

                <Link
                  href={`/ub/${dealer.shopSlug}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors"
                >
                  View Dealer Profile
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No dealers found
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
