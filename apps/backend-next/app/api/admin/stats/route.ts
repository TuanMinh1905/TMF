import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/admin/stats - Thống kê tổng quan cho dashboard
export async function GET(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser || tokenUser.role !== 'ADMIN') {
      return withCors({ error: 'Không có quyền truy cập' }, 403);
    }

    // Đếm các thống kê
    const [
      productCount,
      categoryCount,
      brandCount,
      customerCount,
      orderCount,
      pendingOrderCount,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.category.count({ where: { isActive: true } }),
      prisma.brand.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              fullName: true,
              email: true,
            },
          },
        },
      }),
    ]);

    // Tính tổng doanh thu (đơn hoàn thành)
    const completedOrders = await prisma.order.findMany({
      where: { status: 'COMPLETED' },
      select: { totalAmount: true },
    });
    const totalRevenue = completedOrders.reduce(
      (sum, o) => sum + Number(o.totalAmount),
      0
    );

    // Đếm đơn theo trạng thái
    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: true,
    });

    return withCors({
      stats: {
        products: productCount,
        categories: categoryCount,
        brands: brandCount,
        customers: customerCount,
        orders: orderCount,
        pendingOrders: pendingOrderCount,
        totalRevenue,
      },
      ordersByStatus: ordersByStatus.map((s) => ({
        status: s.status,
        count: s._count,
      })),
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        status: o.status,
        totalAmount: Number(o.totalAmount),
        createdAt: o.createdAt,
        customer: o.user?.fullName || o.user?.email || 'Khách',
      })),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
