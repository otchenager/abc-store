import type { Product, Category, Brand } from "@repo/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

// ---- Types ----

export interface ProductWithRelations extends Product {
  category: Pick<Category, "id" | "name" | "slug">;
  brand: Pick<Brand, "id" | "name" | "slug"> | null;
}

export interface ProductsResponse {
  data: ProductWithRelations[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FilterOption {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface FiltersResponse {
  categories: FilterOption[];
  brands: FilterOption[];
  priceRange: { min: number; max: number };
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

// ---- API helpers ----

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// ---- Product endpoints ----

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  if (filters.search) params.set("search", filters.search);
  if (filters.featured) params.set("featured", "true");
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  const qs = params.toString();
  return apiFetch<ProductsResponse>(`/api/products${qs ? `?${qs}` : ""}`);
}

export async function getProductFilters(): Promise<FiltersResponse> {
  return apiFetch<FiltersResponse>("/api/products/filters");
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations> {
  return apiFetch<ProductWithRelations>(`/api/products/${slug}`);
}
