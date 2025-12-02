import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/auth/me - Lấy thông tin user hiện tại
export async function GET(req: NextRequest) {
  try {
    // 1. Lấy user từ token
    const tokenUser = getUserFromRequest(req);

    if (!tokenUser) {
      return withCors({ error: 'Unauthorized - Token không hợp lệ hoặc hết hạn' }, 401);
    }

    // 2. Lấy thông tin user mới nhất từ DB
    const user = await prisma.user.findUnique({
      where: { id: tokenUser.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return withCors({ error: 'User không tồn tại' }, 404);
    }

    return withCors({ user });
  } catch (error) {
    console.error('Get me error:', error);
    return withCors({ error: 'Internal server error' }, 500);
  }
}
