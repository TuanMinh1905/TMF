import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// POST /api/auth/register - Đăng ký tài khoản mới
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.email || !body?.password) {
      return withCors({ error: 'Email và password là bắt buộc' }, 400);
    }

    const { email, password, fullName, phone } = body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return withCors({ error: 'Email không hợp lệ' }, 400);
    }

    // Validate password length
    if (password.length < 6) {
      return withCors({ error: 'Mật khẩu phải có ít nhất 6 ký tự' }, 400);
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return withCors({ error: 'Email đã được sử dụng' }, 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        fullName: fullName?.trim() || null,
        role: 'CUSTOMER', // Chỉ cho phép đăng ký CUSTOMER
      },
    });

    // Tạo JWT token
    const accessToken = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Trả về response
    const response = withCors({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      message: 'Đăng ký thành công',
    });

    // Set cookie
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
