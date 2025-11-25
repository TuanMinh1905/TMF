
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
  const [total, items] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({ skip, take: pageSize, include: { category: true, brand: true }, orderBy: { id: 'desc' } }),
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
