import { NextRequest } from 'next/server';
import { getUserFromRequest, isAdmin, JWTPayload } from '@/lib/auth';
import { withCors } from '../api/_utils/cors';

// Helper để check auth và trả về user hoặc error response
export function requireAuth(req: NextRequest): { user: JWTPayload } | { error: Response } {
  const user = getUserFromRequest(req);
  
  if (!user) {
    return {
      error: withCors({ error: 'Unauthorized - Vui lòng đăng nhập' }, 401),
    };
  }

  return { user };
}

// Helper để check admin role
export function requireAdmin(req: NextRequest): { user: JWTPayload } | { error: Response } {
  const authResult = requireAuth(req);
  
  if ('error' in authResult) {
    return authResult;
  }

  if (!isAdmin(authResult.user)) {
    return {
      error: withCors({ error: 'Forbidden - Bạn không có quyền truy cập' }, 403),
    };
  }

  return authResult;
}
