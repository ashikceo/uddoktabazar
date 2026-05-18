"use client";

import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  basePrice: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showDiscount?: boolean;
}

export function PriceDisplay({
  basePrice,
  salePrice,
  size = "md",
  className,
  showDiscount = true,
}: PriceDisplayProps) {
  const hasDiscount = salePrice !== undefined && salePrice < basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((basePrice - salePrice!) / basePrice) * 100)
    : 0;

  const sizes = {
    sm: { price: "text-sm", old: "text-xs", badge: "text-[10px]" },
    md: { price: "text-lg", old: "text-sm", badge: "text-xs" },
    lg: { price: "text-2xl", old: "text-lg", badge: "text-sm" },
  };

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span className={cn("font-bold text-emerald-700", sizes[size].price)}>
        ৳{hasDiscount ? salePrice?.toLocaleString() : basePrice.toLocaleString()}
      </span>

      {hasDiscount && (
        <>
          <span
            className={cn(
              "text-gray-400 line-through",
              sizes[size].old
            )}
          >
            ৳{basePrice.toLocaleString()}
          </span>
          {showDiscount && (
            <span
              className={cn(
                "bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-semibold",
                sizes[size].badge
              )}
            >
              -{discountPercent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
