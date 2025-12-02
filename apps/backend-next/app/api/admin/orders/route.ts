import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/admin/orders - Lấy tất cả đơn hàng (Admin only)
export async function GET(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập' }, 401);
    }

    // Kiểm tra quyền admin
    if (tokenUser.role !== 'ADMIN') {
      return withCors({ error: 'Không có quyền truy cập' }, 403);
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    // Count total
    const total = await prisma.order.count({ where });

    // Get orders with user info
    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return withCors({
      orders: orders.map((order) => ({
        ...order,
        totalAmount: Number(order.totalAmount),
        items: order.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin get orders error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
