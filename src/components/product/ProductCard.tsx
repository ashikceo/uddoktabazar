"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "./PriceDisplay";
import { StockBadge } from "./StockBadge";
import { ProductActions } from "./ProductActions";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images[0] || "/images/placeholder.jpg";
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;

  return (
    <div
      className={cn(
        "group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.tags.map((tag) => (
            <Badge
              key={tag}
              variant={
                tag === "HOT"
                  ? "danger"
                  : tag === "NEW"
                  ? "success"
                  : "warning"
              }
              className="shadow-sm"
            >
              {tag === "HOT" && "🔥 Hot Item"}
              {tag === "NEW" && "✨ New"}
              {tag === "DISCOUNTED" && "🏷️ Discounted"}
            </Badge>
          ))}
          {hasDiscount && !product.tags.includes("DISCOUNTED") && (
            <Badge variant="warning">🏷️ Discounted</Badge>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <StockBadge count={product.stockCount} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <Link
          href={`/category/${product.category.slug}`}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {product.category.name}
        </Link>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 hover:text-emerald-700 transition-colors min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Vendor */}
        <p className="mt-1 text-xs text-gray-500">
          by{" "}
          <Link
            href={`/ub/${product.vendor.shopSlug}`}
            className="text-emerald-600 hover:underline"
          >
            {product.vendor.shopName}
          </Link>
        </p>

        {/* Price */}
        <div className="mt-3">
          <PriceDisplay
            basePrice={product.basePrice}
            salePrice={product.salePrice}
            size="md"
          />
        </div>

        {/* Actions */}
        <div className="mt-4">
          <ProductActions product={product} layout="card" />
        </div>
      </div>
    </div>
  );
}
