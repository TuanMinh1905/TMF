import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { withCors, noContent } from '../../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.email || !body?.password) {
      return withCors({ error: 'Email và password là bắt buộc' }, 400);
    }

    const { email, password } = body;

    // 1. Tìm user trong DB
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return withCors({ error: 'Email hoặc mật khẩu không đúng' }, 401);
    }

    // 2. Kiểm tra password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return withCors({ error: 'Email hoặc mật khẩu không đúng' }, 401);
    }

    // 3. Tạo JWT token
    const accessToken = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 4. Trả về response
    const response = withCors({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });

    // Optional: Set cookie cho token
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return withCors({ error: 'Internal server error' }, 500);
  }
}
