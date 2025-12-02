import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/admin/customers - Lấy danh sách khách hàng (Admin only)
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
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build where clause - chỉ lấy CUSTOMER
    const where: any = {
      role: 'CUSTOMER',
    };

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { fullName: { contains: search } },
      ];
    }

    // Count total
    const total = await prisma.user.count({ where });

    // Get customers with order stats
    const customers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            orders: true,
          },
        },
        orders: {
          select: {
            totalAmount: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    // Calculate total spent for each customer
    const customersWithStats = customers.map((customer) => {
      const totalSpent = customer.orders
        .filter((o) => o.status !== 'CANCELLED')
        .reduce((sum, o) => sum + Number(o.totalAmount), 0);

      return {
        id: customer.id,
        email: customer.email,
        fullName: customer.fullName,
        role: customer.role,
        createdAt: customer.createdAt,
        orderCount: customer._count.orders,
        totalSpent,
      };
    });

    return withCors({
      customers: customersWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin get customers error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
