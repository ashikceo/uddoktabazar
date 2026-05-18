"use client";

import { ShoppingCart, Heart, ArrowRightLeft, Zap } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductActionsProps {
  product: Product;
  layout?: "card" | "detail";
}

export function ProductActions({ product, layout = "card" }: ProductActionsProps) {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(product.id);

  const isCard = layout === "card";

  return (
    <div className={cn("flex flex-col gap-2", !isCard && "gap-3")}>
      {!isCard && (
        <div className="flex items-center gap-3 mb-2">
          <label className="text-sm font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-3 py-1 font-medium min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className={cn("flex gap-2", isCard ? "flex-col" : "flex-row flex-wrap")}>
        {/* Order Now - Direct Checkout */}
        <button
          onClick={() => addToCart(product, quantity)}
          className={cn(
            "flex items-center justify-center gap-2 font-semibold text-white rounded-lg transition-all hover:shadow-lg active:scale-[0.98]",
            isCard
              ? "bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm"
              : "bg-emerald-600 hover:bg-emerald-700 px-6 py-3 flex-1"
          )}
        >
          <Zap className={cn(isCard ? "w-4 h-4" : "w-5 h-5")} />
          Order Now
        </button>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product, quantity)}
          className={cn(
            "flex items-center justify-center gap-2 font-medium border-2 border-emerald-600 text-emerald-700 rounded-lg transition-all hover:bg-emerald-50 active:scale-[0.98]",
            isCard
              ? "px-4 py-2 text-sm"
              : "px-6 py-3 flex-1"
          )}
        >
          <ShoppingCart className={cn(isCard ? "w-4 h-4" : "w-5 h-5")} />
          Add to Cart
        </button>
      </div>

      <div className="flex gap-2">
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-lg border transition-all hover:shadow-md active:scale-[0.98] flex-1",
            isCard ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
            isWishlisted
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          )}
        >
          <Heart
            className={cn(
              isCard ? "w-3.5 h-3.5" : "w-4 h-4",
              isWishlisted && "fill-current"
            )}
          />
          {isWishlisted ? "Saved" : "Wishlist"}
        </button>

        {/* Compare */}
        <button
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 text-gray-600 transition-all hover:bg-gray-50 hover:shadow-md active:scale-[0.98] flex-1",
            isCard ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
          )}
        >
          <ArrowRightLeft className={isCard ? "w-3.5 h-3.5" : "w-4 h-4"} />
          Compare
        </button>
      </div>
    </div>
  );
}
