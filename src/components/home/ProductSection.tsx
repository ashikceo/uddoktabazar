"use client";

import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/Tabs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Product } from "@/types";

interface ProductSectionProps {
  allProducts: Product[];
  partnerProducts: Product[];
  hotProducts: Product[];
  title?: string;
}

export function ProductSection({
  allProducts,
  partnerProducts,
  hotProducts,
  title = "Our Products",
}: ProductSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <Tabs defaultTab="all">
        <TabList>
          <TabTrigger value="all">All Over Available Product</TabTrigger>
          <TabTrigger value="partner">All Partner Product</TabTrigger>
          <TabTrigger value="hot">All Partner Hot Products</TabTrigger>
        </TabList>

        <TabContent value="all">
          <ProductGrid products={allProducts} columns={4} />
        </TabContent>

        <TabContent value="partner">
          <ProductGrid products={partnerProducts} columns={4} />
        </TabContent>

        <TabContent value="hot">
          <ProductGrid products={hotProducts} columns={4} />
        </TabContent>
      </Tabs>
    </div>
  );
}
