import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, noContent } from '../../_utils/cors';
import { productSchema } from '../../_utils/schemas';
import { mapProduct } from '../../_utils/mapDecimal';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/products/:id - Lấy chi tiết sản phẩm theo id hoặc slug (alias)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Xác định query theo id (number) hoặc slug (string)
  const numericId = Number(id);
  const isNumeric = !isNaN(numericId) && Number.isInteger(numericId);

  const product = await prisma.product.findFirst({
    where: isNumeric
      ? { id: numericId }
      : { alias: id }, // slug = alias
    include: {
      category: {
        include: {
          // Lấy parent category nếu có
          products: false,
        },
      },
      brand: true,
      images: true,
    },
  });

  if (!product) {
    return withCors({ error: 'Product not found' }, 404);
  }

  // Lấy thêm parent category nếu cần
  let parentCategory = null;
  if (product.category?.parentId) {
    parentCategory = await prisma.category.findUnique({
      where: { id: product.category.parentId },
    });
  }

  // Lấy sản phẩm liên quan (cùng category, khác id)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isActive: true,
    },
    take: 8,
    include: {
      category: true,
      brand: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const mappedProduct = mapProduct(product);

  return withCors({
    ...mappedProduct,
    images: product.images,
    category: {
      ...product.category,
      parent: parentCategory,
    },
    relatedProducts: relatedProducts.map(mapProduct),
  });
}

// PUT /api/products/:id - Cập nhật sản phẩm
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return withCors({ error: 'Invalid product ID' }, 400);
  }

  const json = await req.json().catch(() => null);
  const parsed = productSchema.partial().safeParse(json);

  if (!parsed.success) {
    return withCors({ error: parsed.error.format() }, 400);
  }

  try {
    const updated = await prisma.product.update({
      where: { id: numericId },
      data: parsed.data,
      include: { category: true, brand: true },
    });
    return withCors(mapProduct(updated));
  } catch (error: any) {
    if (error.code === 'P2025') {
      return withCors({ error: 'Product not found' }, 404);
    }
    throw error;
  }
}

// DELETE /api/products/:id - Xóa sản phẩm
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return withCors({ error: 'Invalid product ID' }, 400);
  }

  try {
    await prisma.product.delete({
      where: { id: numericId },
    });
    return withCors({ success: true });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return withCors({ error: 'Product not found' }, 404);
    }
    throw error;
  }
}
