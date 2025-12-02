import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/admin/customers/[id] - Chi tiết khách hàng
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser || tokenUser.role !== 'ADMIN') {
      return withCors({ error: 'Không có quyền truy cập' }, 403);
    }

    const { id } = await params;
    const customerId = parseInt(id);

    const customer = await prisma.user.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        orders: {
          include: {
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
        },
      },
    });

    if (!customer) {
      return withCors({ error: 'Không tìm thấy khách hàng' }, 404);
    }

    // Calculate stats
    const totalSpent = customer.orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + Number(o.totalAmount), 0);

    return withCors({
      customer: {
        id: customer.id,
        email: customer.email,
        fullName: customer.fullName,
        role: customer.role,
        createdAt: customer.createdAt,
        orderCount: customer.orders.length,
        totalSpent,
        orders: customer.orders.map((order) => ({
          ...order,
          totalAmount: Number(order.totalAmount),
          items: order.items.map((item) => ({
            ...item,
            price: Number(item.price),
          })),
        })),
      },
    });
  } catch (error) {
    console.error('Get customer detail error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
