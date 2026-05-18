"use client";

import { Truck, ShieldCheck, Tag, Users } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "FREE SHIPPING",
    subtitle: "Free ship on order over ৳1999",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "MONEY BACK",
    subtitle: "30 Day Money Back Guarantee",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Tag,
    title: "SPECIAL SALE",
    subtitle: "All items sale up to 25% off",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Users,
    title: "LOCAL PARTNERS",
    subtitle: "100+ verified regional partners",
    color: "bg-rose-50 text-rose-600",
  },
];

export function FeatureBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}>
            <feature.icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
            <p className="text-xs text-gray-500">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
