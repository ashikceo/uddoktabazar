import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productQuerySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("20"),
  category: z.string().optional(),
  vendor: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sortBy: z.enum(["price_asc", "price_desc", "newest", "popular"]).optional().default("newest"),
});

// GET /api/products - List products with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = productQuerySchema.parse(Object.fromEntries(searchParams));

    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = { isActive: true };

    if (query.category) {
      where.category = { slug: query.category };
    }

    if (query.vendor) {
      where.vendor = { shopSlug: query.vendor };
    }

    if (query.tag) {
      where.tags = { has: query.tag.toUpperCase() };
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.minPrice || query.maxPrice) {
      where.salePrice = {};
      if (query.minPrice) where.salePrice.gte = parseFloat(query.minPrice);
      if (query.maxPrice) where.salePrice.lte = parseFloat(query.maxPrice);
    }

    // Sort order
    const orderBy: any = {};
    switch (query.sortBy) {
      case "price_asc":
        orderBy.salePrice = "asc";
        break;
      case "price_desc":
        orderBy.salePrice = "desc";
        break;
      case "popular":
        orderBy.orderItems = { _count: "desc" };
        break;
      default:
        orderBy.createdAt = "desc";
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          vendor: {
            select: {
              id: true,
              shopName: true,
              shopSlug: true,
              upazila: true,
              district: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create product (Admin/Partner only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add auth middleware check
    const body = await request.json();

    const productSchema = z.object({
      title: z.string().min(3).max(200),
      description: z.string().min(10),
      basePrice: z.number().positive(),
      salePrice: z.number().positive().optional(),
      images: z.array(z.string().url()),
      stockCount: z.number().int().min(0),
      categoryId: z.string().uuid(),
      vendorId: z.string().uuid(),
      tags: z.array(z.enum(["NEW", "HOT", "DISCOUNTED"])).optional(),
      sku: z.string().optional(),
      weight: z.number().optional(),
    });

    const data = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        ...data,
        slug: data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now(),
      },
      include: {
        category: true,
        vendor: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
