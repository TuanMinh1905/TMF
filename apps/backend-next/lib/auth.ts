import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Secret key cho JWT - nên đưa vào .env
const JWT_SECRET = process.env.JWT_SECRET || 'tmfashion-super-secret-key-2024';
const JWT_EXPIRES_IN = '7d'; // Token hết hạn sau 7 ngày

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
  fullName?: string | null;
}

// Tạo JWT token
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Lấy token từ request (header hoặc cookie)
export function getTokenFromRequest(req: NextRequest): string | null {
  // 1. Kiểm tra Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // 2. Kiểm tra cookie
  const tokenCookie = req.cookies.get('accessToken');
  if (tokenCookie?.value) {
    return tokenCookie.value;
  }

  return null;
}

// Middleware helper: lấy user từ request
export function getUserFromRequest(req: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

// Check xem user có phải admin không
export function isAdmin(user: JWTPayload | null): boolean {
  return user?.role === 'ADMIN';
}
