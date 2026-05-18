import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// POST /api/orders - Create order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderSchema = z.object({
      shippingName: z.string().min(2),
      shippingPhone: z.string().regex(/^01[3-9]\d{8}$/),
      shippingAddress: z.string().min(10),
      shippingCity: z.string().min(2),
      shippingDistrict: z.string().min(2),
      shippingUpazila: z.string().min(2),
      shippingPostalCode: z.string().optional(),
      paymentMethod: z.enum(["BKASH", "NAGAD", "ROCKET", "COD", "CARD"]),
      items: z.array(
        z.object({
          productId: z.string().uuid(),
          quantity: z.number().int().min(1),
        })
      ),
      customerNote: z.string().optional(),
    });

    const data = orderSchema.parse(body);

    // Fetch products to calculate totals
    const productIds = data.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { vendor: true },
    });

    // Calculate totals
    let subtotal = 0;
    const orderItems = data.items.map((item) => {
      const product = products.find((p: any) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const price = product.salePrice?.toNumber() || product.basePrice.toNumber();
      const total = price * item.quantity;
      subtotal += total;

      return {
        productId: item.productId,
        vendorId: product.vendorId,
        title: product.title,
        image: product.images[0],
        price,
        quantity: item.quantity,
        total,
      };
    });

    const shippingCost = subtotal > 1999 ? 0 : 120;
    const total = subtotal + shippingCost;

    // Generate order number
    const orderNumber = `UB-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        shippingName: data.shippingName,
        shippingPhone: data.shippingPhone,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingDistrict: data.shippingDistrict,
        shippingUpazila: data.shippingUpazila,
        shippingPostalCode: data.shippingPostalCode,
        subtotal,
        shippingCost,
        total,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentMethod === "COD" ? "PENDING" : "PENDING",
        customerNote: data.customerNote,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    });

    // Update product stock
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockCount: { decrement: item.quantity },
        },
      });
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET /api/orders - List orders (Admin/User)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add auth check
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: {
              select: { id: true, title: true, images: true },
            },
          },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
