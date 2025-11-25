
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../../_utils/cors';
import { productSchema } from '../../_utils/schemas';
import { mapProduct } from '../../_utils/mapDecimal';
export async function OPTIONS() { return noContent(204); }
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const prod = await prisma.product.findUnique({ where: { id }, include: { category: true, brand: true } });
  if (!prod) return withCors({ error: 'Not found' }, 404);
  return withCors(mapProduct(prod));
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const json = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) return withCors({ error: parsed.error.format() }, 400);
  try {
    const updated = await prisma.product.update({ where: { id }, data: parsed.data, include: { category: true, brand: true } });
    return withCors(mapProduct(updated));
  } catch { return withCors({ error: 'Not found' }, 404); }
}
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try { await prisma.product.delete({ where: { id } }); return noContent(204); }
  catch { return withCors({ error: 'Not found' }, 404); }
}
