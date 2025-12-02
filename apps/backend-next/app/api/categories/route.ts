
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../_utils/cors';
import { categorySchema } from '../_utils/schemas';

export async function OPTIONS() { return noContent(204); }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? undefined;
  const flat = searchParams.get('flat'); // Nếu có ?flat=true thì trả flat list

  // Lấy tất cả categories, sắp xếp theo sortOrder
  const categories = await prisma.category.findMany({
    where: q ? { name: { contains: q } } : undefined,
    orderBy: { sortOrder: 'asc' },
  });

  // Nếu muốn trả flat list (dạng cũ)
  if (flat === 'true') {
    return withCors(categories);
  }

  // Tách roots (parentId = null) và children
  const roots = categories.filter(cat => cat.parentId === null);
  const childrenMap: Record<number, typeof categories> = {};

  for (const cat of categories) {
    if (cat.parentId !== null) {
      if (!childrenMap[cat.parentId]) {
        childrenMap[cat.parentId] = [];
      }
      childrenMap[cat.parentId].push(cat);
    }
  }

  // Gắn children vào mỗi root
  const tree = roots.map(root => ({
    ...root,
    children: childrenMap[root.id] || [],
  }));

  return withCors(tree);
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = categorySchema.safeParse(json);
  if (!parsed.success) return withCors({ error: parsed.error.format() }, 400);
  const created = await prisma.category.create({ data: parsed.data });
  return withCors(created, 201);
}
