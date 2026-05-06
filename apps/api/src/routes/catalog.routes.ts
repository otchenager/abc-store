import { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../database/prisma.js";

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
 
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
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