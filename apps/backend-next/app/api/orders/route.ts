import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/orders - Lấy danh sách đơn hàng của user
export async function GET(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập' }, 401);
    }

    const orders = await prisma.order.findMany({
      where: { userId: tokenUser.userId },
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
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}

// POST /api/orders - Tạo đơn hàng mới (checkout)
export async function POST(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập để đặt hàng' }, 401);
    }

    const body = await req.json();
    const { shippingAddress, phone, note } = body;

    if (!shippingAddress || !phone) {
      return withCors({ error: 'Địa chỉ giao hàng và số điện thoại là bắt buộc' }, 400);
    }

    // Lấy giỏ hàng của user
    const cart = await prisma.cart.findUnique({
      where: { userId: tokenUser.userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return withCors({ error: 'Giỏ hàng trống' }, 400);
    }

    // Tính tổng tiền
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    // Tạo đơn hàng
    const order = await prisma.order.create({
      data: {
        userId: tokenUser.userId,
        status: 'PENDING',
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
        phone: phone,
        note: note || null,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
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
    });

    // Xóa giỏ hàng sau khi đặt hàng thành công
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return withCors({
      message: 'Đặt hàng thành công!',
      order: {
        ...order,
        totalAmount: Number(order.totalAmount),
        items: order.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      },
    }, 201);
  } catch (error) {
    console.error('Create order error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
