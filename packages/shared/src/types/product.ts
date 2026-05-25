export interface ProductSpec {
  icon: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  specs: string | null;
  reviews: string | null;
  clicks: number;
  clicksMonth: number;
  reviewCount: number;
  rating: number;
  isFeatured: boolean;
  isPublished: boolean;
  categoryId: string;
  brandId: string | null;
  createdAt: string;
  updatedAt: string;
}
