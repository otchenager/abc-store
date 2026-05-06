import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Brands
  const apple = await prisma.brand.upsert({
    where: { slug: "apple" },
    update: {},
    create: {
      name: "Apple",
      slug: "apple",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  });

  const samsung = await prisma.brand.upsert({
    where: { slug: "samsung" },
    update: {},
    create: {
      name: "Samsung",
      slug: "samsung",
      logoUrl: null,
    },
  });

  const sony = await prisma.brand.upsert({
    where: { slug: "sony" },
    update: {},
    create: { name: "Sony", slug: "sony", logoUrl: null },
  });

  // Categories
  const phones = await prisma.category.upsert({
    where: { slug: "phones" },
    update: {},
    create: {
      name: "Phones",
      slug: "phones",
      imageUrl: null,
    },
  });

  const laptops = await prisma.category.upsert({
    where: { slug: "laptops" },
    update: {},
    create: { name: "Laptops", slug: "laptops", imageUrl: null },
  });

  const tablets = await prisma.category.upsert({
    where: { slug: "tablets" },
    update: {},
    create: { name: "Tablets", slug: "tablets", imageUrl: null },
  });

  const headphones = await prisma.category.upsert({
    where: { slug: "headphones" },
    update: {},
    create: { name: "Headphones", slug: "headphones", imageUrl: null },
  });

  const watches = await prisma.category.upsert({
    where: { slug: "watches" },
    update: {},
    create: { name: "Watches", slug: "watches", imageUrl: null },
  });

  // Products
  const products = [
    {
      name: "iPhone 16 Pro",
      slug: "iphone-16-pro",
      description: "The most powerful iPhone ever. Titanium design, A18 Pro chip, and a 48MP camera system.",
      price: 1099,
      oldPrice: null,
      imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=400",
      isFeatured: true,
      isPublished: true,
      categoryId: phones.id,
      brandId: apple.id,
    },
    {
      name: "iPhone 16",
      slug: "iphone-16",
      description: "iPhone 16 with A18 chip, 48MP camera, and Action Button.",
      price: 799,
      oldPrice: 899,
      imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=400",
      isFeatured: true,
      isPublished: true,
      categoryId: phones.id,
      brandId: apple.id,
    },
    {
      name: "iPhone 15",
      slug: "iphone-15",
      description: "Previous generation iPhone with Dynamic Island and 48MP camera.",
      price: 699,
      oldPrice: 799,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: phones.id,
      brandId: apple.id,
    },
    {
      name: "Samsung Galaxy S25 Ultra",
      slug: "samsung-galaxy-s25-ultra",
      description: "Galaxy AI. Built-in S Pen. 200MP camera system.",
      price: 1299,
      oldPrice: null,
      imageUrl: null,
      isFeatured: true,
      isPublished: true,
      categoryId: phones.id,
      brandId: samsung.id,
    },
    {
      name: "Samsung Galaxy S25",
      slug: "samsung-galaxy-s25",
      description: "Compact flagship with Snapdragon 8 Elite and Galaxy AI.",
      price: 799,
      oldPrice: 849,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: phones.id,
      brandId: samsung.id,
    },
    {
      name: "MacBook Pro 14\" M4",
      slug: "macbook-pro-14-m4",
      description: "The most capable MacBook Pro ever. M4 chip with up to 32GB unified memory.",
      price: 1999,
      oldPrice: null,
      imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=400",
      isFeatured: true,
      isPublished: true,
      categoryId: laptops.id,
      brandId: apple.id,
    },
    {
      name: "MacBook Air 13\" M3",
      slug: "macbook-air-13-m3",
      description: "Impossibly thin. Incredibly capable. M3 chip, all-day battery life.",
      price: 1099,
      oldPrice: 1299,
      imageUrl: null,
      isFeatured: true,
      isPublished: true,
      categoryId: laptops.id,
      brandId: apple.id,
    },
    {
      name: "iPad Pro 13\" M4",
      slug: "ipad-pro-13-m4",
      description: "The ultimate iPad experience with M4 chip and Ultra Retina XDR display.",
      price: 1299,
      oldPrice: null,
      imageUrl: null,
      isFeatured: true,
      isPublished: true,
      categoryId: tablets.id,
      brandId: apple.id,
    },
    {
      name: "iPad Air 11\" M2",
      slug: "ipad-air-11-m2",
      description: "Serious performance. In a thin, light design. M2 chip.",
      price: 599,
      oldPrice: 699,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: tablets.id,
      brandId: apple.id,
    },
    {
      name: "Samsung Galaxy Tab S10+",
      slug: "samsung-galaxy-tab-s10-plus",
      description: "12.4\" Dynamic AMOLED display. S Pen included. IP68 rated.",
      price: 999,
      oldPrice: 1099,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: tablets.id,
      brandId: samsung.id,
    },
    {
      name: "AirPods Pro 2",
      slug: "airpods-pro-2",
      description: "Active Noise Cancellation. Adaptive Audio. Personalized Spatial Audio.",
      price: 249,
      oldPrice: null,
      imageUrl: null,
      isFeatured: true,
      isPublished: true,
      categoryId: headphones.id,
      brandId: apple.id,
    },
    {
      name: "AirPods 4",
      slug: "airpods-4",
      description: "Redesigned fit. H2 chip. Up to 30 hours total listening time.",
      price: 129,
      oldPrice: 179,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: headphones.id,
      brandId: apple.id,
    },
    {
      name: "Sony WH-1000XM5",
      slug: "sony-wh-1000xm5",
      description: "Industry-leading noise canceling headphones with 30-hour battery.",
      price: 349,
      oldPrice: 399,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: headphones.id,
      brandId: sony.id,
    },
    {
      name: "Apple Watch Series 10",
      slug: "apple-watch-series-10",
      description: "Our thinnest, lightest Apple Watch ever. Advanced health sensors.",
      price: 399,
      oldPrice: null,
      imageUrl: null,
      isFeatured: true,
      isPublished: true,
      categoryId: watches.id,
      brandId: apple.id,
    },
    {
      name: "Apple Watch Ultra 2",
      slug: "apple-watch-ultra-2",
      description: "The most rugged and capable Apple Watch ever made. Titanium case.",
      price: 799,
      oldPrice: null,
      imageUrl: null,
      isFeatured: false,
      isPublished: true,
      categoryId: watches.id,
      brandId: apple.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log(`✅ Seeded ${products.length} products across ${5} categories and ${3} brands.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });