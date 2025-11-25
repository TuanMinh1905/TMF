
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../../_utils/cors';
import { categorySchema } from '../../_utils/schemas';
export async function OPTIONS() { return noContent(204); }
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const cat = await prisma.category.findUnique({ where: { id } });
  if (!cat) return withCors({ error: 'Not found' }, 404);
  return withCors(cat);
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const json = await req.json().catch(() => null);
  const parsed = categorySchema.safeParse(json);
  if (!parsed.success) return withCors({ error: parsed.error.format() }, 400);
  try {
    const updated = await prisma.category.update({ where: { id }, data: parsed.data });
    return withCors(updated);
  } catch { return withCors({ error: 'Not found' }, 404); }
}
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try { await prisma.category.delete({ where: { id } }); return noContent(204); }
  catch { return withCors({ error: 'Not found' }, 404); }
}
