import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/admin/orders/[id] - Chi tiết đơn hàng
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
    const orderId = parseInt(id);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
                sku: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return withCors({ error: 'Không tìm thấy đơn hàng' }, 404);
    }

    return withCors({
      order: {
        ...order,
        totalAmount: Number(order.totalAmount),
        items: order.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      },
    });
  } catch (error) {
    console.error('Get order detail error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}

// PUT /api/admin/orders/[id] - Cập nhật trạng thái đơn hàng
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser || tokenUser.role !== 'ADMIN') {
      return withCors({ error: 'Không có quyền truy cập' }, 403);
    }

    const { id } = await params;
    const orderId = parseInt(id);
    const body = await req.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return withCors({ error: 'Trạng thái không hợp lệ' }, 400);
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return withCors({
      order: {
        ...order,
        totalAmount: Number(order.totalAmount),
      },
      message: 'Cập nhật trạng thái thành công',
    });
  } catch (error) {
    console.error('Update order status error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
