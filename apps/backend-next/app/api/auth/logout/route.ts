import { NextRequest } from 'next/server';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// POST /api/auth/logout - Đăng xuất (xóa cookie)
export async function POST(req: NextRequest) {
  const response = withCors({ message: 'Đăng xuất thành công' });

  // Xóa cookie accessToken
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Xóa ngay
    path: '/',
  });

  return response;
}
