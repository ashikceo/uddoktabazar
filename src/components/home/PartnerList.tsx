"use client";

import Link from "next/link";
import { Store, MapPin, ChevronRight } from "lucide-react";
import { VendorDetails } from "@/types";

interface PartnerListProps {
  partners: VendorDetails[];
}

export function PartnerList({ partners }: PartnerListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Store className="w-5 h-5 text-emerald-600" />
          All Partner Lists
        </h3>
        <Link
          href="/vandor-list"
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {partners.map((partner) => (
          <Link
            key={partner.id}
            href={`/ub/${partner.shopSlug}`}
            className="group flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
              <Store className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-700">
                {partner.shopName}
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span className="truncate">
                  {partner.upazila}, {partner.district}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
