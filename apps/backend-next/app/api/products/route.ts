
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../_utils/cors';
import { productSchema } from '../_utils/schemas';
import { mapProducts, mapProduct } from '../_utils/mapDecimal';

export async function OPTIONS() { return noContent(204); }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Math.min(Number(searchParams.get('pageSize') ?? '20'), 100);
  const skip = (page - 1) * pageSize;
  const categoryId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');

  // Build where clause
  let where: any = {};

  // Filter theo categoryId
  if (categoryId) {
    const catId = Number(categoryId);
    
    // Tìm category được yêu cầu
    const category = await prisma.category.findUnique({
      where: { id: catId },
    });

    if (category) {
      // Kiểm tra xem category này có con không (là category cha)
      const childCategories = await prisma.category.findMany({
        where: { parentId: catId },
        select: { id: true },
      });

      if (childCategories.length > 0) {
        // Nếu là category cha → lấy sản phẩm của tất cả category con
        const childIds = childCategories.map(c => c.id);
        where.categoryId = { in: childIds };
      } else {
        // Nếu là category con (leaf) → lấy sản phẩm của chính nó
        where.categoryId = catId;
      }
    }
  }

  // Filter theo brandId
  if (brandId) {
    where.brandId = Number(brandId);
  }

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({ 
      where,
      skip, 
      take: pageSize, 
      include: { category: true, brand: true }, 
      orderBy: { id: 'desc' } 
    }),
  ]);

  return withCors({ page, pageSize, total, items: mapProducts(items) });
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) return withCors({ error: parsed.error.format() }, 400);
  const created = await prisma.product.create({ data: parsed.data, include: { category: true, brand: true } });
  return withCors(mapProduct(created), 201);
}
