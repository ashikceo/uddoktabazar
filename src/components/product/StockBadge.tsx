"use client";

import { Badge } from "@/components/ui/Badge";

interface StockBadgeProps {
  count: number;
}

export function StockBadge({ count }: StockBadgeProps) {
  if (count === 0) {
    return <Badge variant="danger">Out of Stock</Badge>;
  }
  if (count <= 5) {
    return <Badge variant="warning">Only {count} left</Badge>;
  }
  if (count <= 20) {
    return <Badge variant="info">In Stock</Badge>;
  }
  return <Badge variant="success">In Stock</Badge>;
}
