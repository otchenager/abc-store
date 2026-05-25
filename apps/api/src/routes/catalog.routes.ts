import { Prisma } from "@prisma/client";
import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cron from "node-cron";
import { prisma } from "../database/prisma.js";

const RUSSIAN_CITIES = [
  "Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск",
  "Казань", "Нижний Новгород", "Челябинск", "Самара",
  "Омск", "Ростов-на-Дону", "Уфа", "Красноярск",
  "Воронеж", "Пермь", "Волгоград", "Краснодар",
  "Тюмень", "Иркутск", "Хабаровск", "Владивосток"
];

const RUSSIAN_NAMES = [
  "Алексей К.", "Мария С.", "Дмитрий В.", "Анна Р.", "Сергей М.",
  "Екатерина Б.", "Андрей Н.", "Ольга Д.", "Михаил Ф.", "Юлия Т.",
  "Павел Е.", "Наталья К.", "Иван С.", "Светлана Л.", "Артём В.",
  "Виктория Р.", "Никита О.", "Татьяна М.", "Роман Б.", "Алина Ш.",
  "Денис К.", "Марина Г.", "Кирилл Д.", "Ксения Н.", "Вадим П."
];

async function generateAndSaveReview(slug: string, product: {
  name: string;
  description: string | null;
  price: number;
  category: { name: string } | null;
  brand: { name: string } | null;
}) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const city = RUSSIAN_CITIES[Math.floor(Math.random() * RUSSIAN_CITIES.length)];
    const name = RUSSIAN_NAMES[Math.floor(Math.random() * RUSSIAN_NAMES.length)];
    const stars = Math.random() > 0.2 ? 5 : 4;

    const prompt = `Напиши реалистичный отзыв покупателя интернет-магазина на русском языке.

Товар: ${product.name}
Категория: ${product.category?.name ?? "Техника"}
Бренд: ${product.brand?.name ?? ""}
Цена: ${Math.round((product.price ?? 0) * 75).toLocaleString("ru-RU")} ₽
Описание: ${product.description ?? ""}
Имя покупателя: ${name}
Город: ${city}
Рейтинг: ${stars} из 5

Требования к отзыву:
- 2-3 предложения, не больше
- Упомяни конкретную деталь именно этого товара
- Живой разговорный стиль, как пишут реальные люди
- НЕ используй: "рекомендую", "отличный товар", "доволен покупкой"
- Можно упомянуть доставку или сервис ABC Store
- Текст должен звучать как от реального человека

Ответь ТОЛЬКО этим JSON без markdown, без объяснений:
{"name":"${name}","city":"${city}","text":"ТЕКСТ_ОТЗЫВА","stars":${stars}}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    const cleaned = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const newReview = JSON.parse(cleaned);

    if (!newReview.name || !newReview.text || !newReview.stars) {
      throw new Error("Invalid review structure");
    }

    const current = await prisma.product.findUnique({
      where: { slug },
      select: { reviews: true, reviewsArchive: true },
    });

    const currentReviews: unknown[] = current?.reviews
      ? JSON.parse(current.reviews)
      : [];

    const archive: unknown[] = current?.reviewsArchive
      ? JSON.parse(current.reviewsArchive)
      : [...currentReviews];

    const updatedArchive = [...archive, newReview];

    const shuffled = [...updatedArchive].sort(() => Math.random() - 0.5);
    const displayReviews = shuffled.slice(0, 3);

    await prisma.product.update({
      where: { slug },
      data: {
        reviews: JSON.stringify(displayReviews),
        reviewsArchive: JSON.stringify(updatedArchive),
      },
    });

    console.log(`✓ New review generated for ${slug}. Archive: ${updatedArchive.length} reviews`);
  } catch (error) {
    console.error(`✗ Review generation failed for ${slug}:`, error);
  }
}

export const catalogRouter = Router();

// GET /api/products
catalogRouter.get("/", async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      featured,
      sort = "popular",
      page = "1",
      limit = "12",
    } = req.query as Record<string, string | undefined>;

    const pageNum = Math.max(1, parseInt(page ?? "1") || 1);
    const limitNum = Math.min(48, Math.max(1, parseInt(limit ?? "12") || 12));
    const skip = (pageNum - 1) * limitNum;

    const minPriceNum = minPrice ? parseFloat(minPrice) : NaN;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : NaN;

    const where: Prisma.ProductWhereInput = { isPublished: true };

    if (category) where.category = { slug: category };
    if (brand) where.brand = { slug: brand };

    if (!isNaN(minPriceNum) || !isNaN(maxPriceNum)) {
      where.price = {
        ...(!isNaN(minPriceNum) ? { gte: minPriceNum } : {}),
        ...(!isNaN(maxPriceNum) ? { lte: maxPriceNum } : {}),
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (featured === "true") where.isFeatured = true;

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (sort === "price_asc")  orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };
    if (sort === "popular")    orderBy = { clicks: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          brand: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);
 
    res.json({
      data: products,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
 
// GET /api/products/filters
catalogRouter.get("/filters", async (_req, res) => {
  try {
    const [categories, brands, priceRange] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: { select: { products: { where: { isPublished: true } } } },
        },
      }),
      prisma.brand.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: { select: { products: { where: { isPublished: true } } } },
        },
      }),
      prisma.product.aggregate({
        where: { isPublished: true },
        _min: { price: true },
        _max: { price: true },
      }),
    ]);
 
    res.json({
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        count: c._count.products,
      })),
      brands: brands.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        count: b._count.products,
      })),
      priceRange: {
        min: priceRange._min.price ?? 0,
        max: priceRange._max.price ?? 9999,
      },
    });
  } catch (error) {
    console.error("GET /api/products/filters error:", error);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
});
 
// GET /api/products/:slug
catalogRouter.get("/:slug", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug, isPublished: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        brand: { select: { id: true, name: true, slug: true } },
      },
    });
 
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
 
    res.json(product);
  } catch (error) {
    console.error("GET /api/products/:slug error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST /api/products/:slug/click
catalogRouter.post("/:slug/click", async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { slug: req.params.slug },
      data: {
        clicks: { increment: 1 },
        clicksMonth: { increment: 1 },
      },
      select: {
        clicks: true,
        name: true,
        description: true,
        price: true,
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
    });

    // Every 16 clicks → +1 reviewCount
    if (product.clicks % 16 === 0) {
      await prisma.product.update({
        where: { slug: req.params.slug },
        data: { reviewCount: { increment: 1 } },
      });
    }

    // Every 48 clicks → generate new review via Gemini (background, non-blocking)
    if (product.clicks % 48 === 0) {
      generateAndSaveReview(req.params.slug, product).catch(console.error);
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Click error:", error);
    res.json({ ok: false });
  }
});

// ── Monthly reset ─────────────────────────────────────────────────────────────

async function monthlyReset() {
  try {
    console.log("🔄 Running monthly reset...");

    const topProducts = await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { clicksMonth: "desc" },
      take: 8,
      select: { id: true, name: true, clicksMonth: true },
    });

    console.log("🏆 New featured products:");
    topProducts.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} — ${p.clicksMonth} clicks`);
    });

    const topIds = topProducts.map(p => p.id);

    await prisma.product.updateMany({
      where: { id: { in: topIds } },
      data: { isFeatured: true },
    });

    await prisma.product.updateMany({
      where: { id: { notIn: topIds } },
      data: { isFeatured: false },
    });

    await prisma.product.updateMany({
      data: { clicksMonth: 0 },
    });

    console.log("✅ Monthly reset complete!");
  } catch (error) {
    console.error("❌ Monthly reset failed:", error);
  }
}

// Run every 1st of month at 00:00
cron.schedule("0 0 1 * *", () => {
  console.log("📅 1st of month — running monthly reset");
  monthlyReset();
});

console.log("✅ Monthly cron job scheduled (runs 1st of each month at 00:00)");

// POST /api/products/admin/monthly-reset  (manual trigger for testing)
catalogRouter.post("/admin/monthly-reset", async (_req, res) => {
  await monthlyReset();
  res.json({ ok: true, message: "Monthly reset triggered manually" });
});