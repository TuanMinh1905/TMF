
import { z } from 'zod';
export const categorySchema = z.object({ name: z.string().min(1) });
export const brandSchema = z.object({ name: z.string().min(1) });
export const productSchema = z.object({
  name: z.string().min(1), sku: z.string().min(1),
  price: z.number().nonnegative(),
  categoryId: z.number().int().positive(),
  brandId: z.number().int().positive(),
});
