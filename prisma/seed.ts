import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@uddoktarbazar.com" },
    update: {},
    create: {
      email: "admin@uddoktarbazar.com",
      password: adminPassword,
      name: "System Administrator",
      role: "ADMIN",
      phone: "01922802177",
      profile: {
        create: {
          address: "২৪ নং ওয়ার্ড, পিরোজপুর সদর",
          city: "Pirojpur",
          district: "Pirojpur",
          division: "Barisal",
          upazila: "Pirojpur Sadar",
        },
      },
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create sample categories
  const categories = [
    { name: "Home & Kitchen", slug: "home-kitchen", description: "Kitchen appliances, cookware, and home essentials", icon: "🏠" },
    { name: "Electronics", slug: "electronics", description: "Gadgets, devices, and electronic accessories", icon: "📱" },
    { name: "Health & Beauty", slug: "health-beauty", description: "Personal care, cosmetics, and wellness products", icon: "💄" },
    { name: "Fashion", slug: "fashion", description: "Clothing, accessories, and footwear", icon: "👕" },
    { name: "Food & Beverages", slug: "food-beverages", description: "Groceries, snacks, and drinks", icon: "🍔" },
    { name: "Books & Stationery", slug: "books-stationery", description: "Books, notebooks, and office supplies", icon: "📚" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories created");

  // Create sample partner users and vendor details
  const partners = [
    {
      email: "bancharampur@uddoktarbazar.com",
      name: "Bancharampur Partner",
      shopName: "Bancharampur Uddoktar Bazar",
      shopSlug: "bancharampuruddoktarbazar",
      phone: "01712345678",
      district: "Brahmanbaria",
      upazila: "Bancharampur",
      division: "Chittagong",
    },
    {
      email: "madarganj@uddoktarbazar.com",
      name: "Madarganj Partner",
      shopName: "Madarganj Uddoktar Bazar",
      shopSlug: "madarganjuddoktarbazar",
      phone: "01712345679",
      district: "Jamalpur",
      upazila: "Madarganj",
      division: "Mymensingh",
    },
    {
      email: "dhanmandi@uddoktarbazar.com",
      name: "Dhanmandi Partner",
      shopName: "Dhanmandi Uddokter Bazar",
      shopSlug: "dhanmandiuddokterbazar",
      phone: "01712345680",
      district: "Dhaka",
      upazila: "Kotwali",
      division: "Dhaka",
    },
    {
      email: "titas@uddoktarbazar.com",
      name: "Titas Partner",
      shopName: "Titas Uddoktar Bazar",
      shopSlug: "titasuddoktarbazar",
      phone: "01712345681",
      district: "Comilla",
      upazila: "Titas",
      division: "Chittagong",
    },
    {
      email: "pirojpur@uddoktarbazar.com",
      name: "Pirojpur Partner",
      shopName: "Pirojpur Uddoktar Bazar",
      shopSlug: "pirojpuruddoktarbazar",
      phone: "01922802177",
      district: "Pirojpur",
      upazila: "Pirojpur Sadar",
      division: "Barisal",
    },
  ];

  for (const partner of partners) {
    const password = await bcrypt.hash("partner123", 10);
    const user = await prisma.user.upsert({
      where: { email: partner.email },
      update: {},
      create: {
        email: partner.email,
        password,
        name: partner.name,
        role: "PARTNER",
        phone: partner.phone,
        profile: {
          create: {
            district: partner.district,
            upazila: partner.upazila,
            division: partner.division,
          },
        },
        vendorDetails: {
          create: {
            shopName: partner.shopName,
            shopSlug: partner.shopSlug,
            phone: partner.phone,
            address: `${partner.upazila} Bazar, Main Road`,
            upazila: partner.upazila,
            district: partner.district,
            division: partner.division,
            verificationStatus: "VERIFIED",
            isFeatured: true,
          },
        },
      },
    });
    console.log(`✅ Partner created: ${user.email}`);
  }

  // Create sample products
  const homeKitchen = await prisma.category.findUnique({ where: { slug: "home-kitchen" } });
  const electronics = await prisma.category.findUnique({ where: { slug: "electronics" } });
  const foodBeverages = await prisma.category.findUnique({ where: { slug: "food-beverages" } });
  const fashion = await prisma.category.findUnique({ where: { slug: "fashion" } });

  const bancharampurVendor = await prisma.vendorDetails.findUnique({
    where: { shopSlug: "bancharampuruddoktarbazar" },
  });

  if (homeKitchen && bancharampurVendor) {
    await prisma.product.createMany({
      data: [
        {
          title: "Premium Glass Serving Bowls Set",
          slug: "premium-glass-serving-bowls",
          description: "Beautiful colorful glass serving bowls perfect for any occasion. Set of 6 pieces.",
          basePrice: 640,
          salePrice: 590,
          images: ["/images/products/bowls.jpg"],
          stockCount: 25,
          tags: ["NEW", "HOT"],
          categoryId: homeKitchen.id,
          vendorId: bancharampurVendor.id,
          createdById: admin.id,
        },
        {
          title: "Topp Super Clean Detergent Powder - 1kg",
          slug: "topp-super-clean-detergent",
          description: "Powerful cleaning detergent powder for all fabrics. 1kg pack.",
          basePrice: 320,
          salePrice: 280,
          images: ["/images/products/detergent.jpg"],
          stockCount: 100,
          tags: ["DISCOUNTED"],
          categoryId: homeKitchen.id,
          vendorId: bancharampurVendor.id,
          createdById: admin.id,
        },
      ],
    });
    console.log("✅ Sample products created");
  }

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
