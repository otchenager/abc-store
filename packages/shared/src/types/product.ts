export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  categoryId: string;
  brandId: string | null;
  createdAt: string;
  updatedAt: string;
}
