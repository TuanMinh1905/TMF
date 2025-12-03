import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/brands/:id - Lấy brand theo id hoặc slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Xác định query theo id (number) hoặc slug (string)
  const numericId = Number(id);
  const isNumeric = !isNaN(numericId) && Number.isInteger(numericId);

  const brand = await prisma.brand.findFirst({
    where: isNumeric
      ? { id: numericId }
      : { slug: id },
    include: {
      products: {
        where: { isActive: true },
        take: 20,
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!brand) {
    return withCors({ error: 'Brand not found' }, 404);
  }

  return withCors(brand);
}
