
import { z } from 'zod';
export const categorySchema = z.object({ name: z.string().min(1) });
export const brandSchema = z.object({ name: z.string().min(1) });
export const productSchema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  alias: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
  categoryId: z.number().int().positive(),
  brandId: z.number().int().positive(),
});
