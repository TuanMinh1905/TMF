
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../_utils/cors';
import { brandSchema } from '../_utils/schemas';
export async function OPTIONS() { return noContent(204); }
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? undefined;
  const brands = await prisma.brand.findMany({ where: q ? { name: { contains: q } } : undefined, orderBy: { name: 'asc' } });
  return withCors(brands);
}
export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = brandSchema.safeParse(json);
  if (!parsed.success) return withCors({ error: parsed.error.format() }, 400);
  const created = await prisma.brand.create({ data: parsed.data });
  return withCors(created, 201);
}
