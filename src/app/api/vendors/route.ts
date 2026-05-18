import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// GET /api/vendors - List vendors with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get("division");
    const district = searchParams.get("district");
    const upazila = searchParams.get("upazila");
    const search = searchParams.get("search");
    const verified = searchParams.get("verified");

    const where: any = {};

    if (division) where.division = division;
    if (district) where.district = district;
    if (upazila) where.upazila = upazila;
    if (verified === "true") where.verificationStatus = "VERIFIED";

    if (search) {
      where.OR = [
        { shopName: { contains: search, mode: "insensitive" } },
        { shopSlug: { contains: search, mode: "insensitive" } },
        { district: { contains: search, mode: "insensitive" } },
        { upazila: { contains: search, mode: "insensitive" } },
      ];
    }

    const vendors = await prisma.vendorDetails.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ vendors });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}
