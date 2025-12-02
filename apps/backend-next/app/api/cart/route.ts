import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { withCors, noContent } from '../_utils/cors';

export async function OPTIONS() {
  return noContent(204);
}

// GET /api/cart - Lấy giỏ hàng của user
export async function GET(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập để xem giỏ hàng' }, 401);
    }

    // Tìm hoặc tạo cart cho user
    let cart = await prisma.cart.findUnique({
      where: { userId: tokenUser.userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                compareAtPrice: true,
                imageUrl: true,
                stock: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!cart) {
      // Tạo cart mới nếu chưa có
      cart = await prisma.cart.create({
        data: { userId: tokenUser.userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  compareAtPrice: true,
                  imageUrl: true,
                  stock: true,
                },
              },
            },
          },
        },
      });
    }

    // Tính tổng tiền
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return withCors({
      cart: {
        id: cart.id,
        items: cart.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          product: {
            ...item.product,
            price: Number(item.product.price),
            compareAtPrice: item.product.compareAtPrice ? Number(item.product.compareAtPrice) : null,
          },
        })),
        totalItems,
        totalAmount,
      },
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}

// POST /api/cart - Thêm sản phẩm vào giỏ hàng
export async function POST(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập để thêm vào giỏ hàng' }, 401);
    }

    const body = await req.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return withCors({ error: 'productId là bắt buộc' }, 400);
    }

    // Kiểm tra product tồn tại
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return withCors({ error: 'Sản phẩm không tồn tại' }, 404);
    }

    // Tìm hoặc tạo cart
    let cart = await prisma.cart.findUnique({
      where: { userId: tokenUser.userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: tokenUser.userId },
      });
    }

    // Kiểm tra xem sản phẩm đã có trong cart chưa
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    let cartItem;
    if (existingItem) {
      // Cập nhật số lượng
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
    } else {
      // Thêm mới
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
        include: { product: true },
      });
    }

    return withCors({
      message: 'Đã thêm vào giỏ hàng',
      item: {
        id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        product: {
          id: cartItem.product.id,
          name: cartItem.product.name,
          price: Number(cartItem.product.price),
          imageUrl: cartItem.product.imageUrl,
        },
      },
    }, 201);
  } catch (error) {
    console.error('Add to cart error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}

// PUT /api/cart - Cập nhật số lượng sản phẩm trong giỏ
export async function PUT(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập' }, 401);
    }

    const body = await req.json();
    const { itemId, quantity } = body;

    if (!itemId || quantity === undefined) {
      return withCors({ error: 'itemId và quantity là bắt buộc' }, 400);
    }

    // Kiểm tra item thuộc về cart của user
    const cart = await prisma.cart.findUnique({
      where: { userId: tokenUser.userId },
    });

    if (!cart) {
      return withCors({ error: 'Giỏ hàng không tồn tại' }, 404);
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });

    if (!cartItem) {
      return withCors({ error: 'Sản phẩm không có trong giỏ hàng' }, 404);
    }

    if (quantity <= 0) {
      // Xóa nếu quantity = 0
      await prisma.cartItem.delete({ where: { id: itemId } });
      return withCors({ message: 'Đã xóa sản phẩm khỏi giỏ hàng' });
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true },
    });

    return withCors({
      message: 'Đã cập nhật số lượng',
      item: {
        id: updated.id,
        quantity: updated.quantity,
        product: {
          id: updated.product.id,
          name: updated.product.name,
          price: Number(updated.product.price),
        },
      },
    });
  } catch (error) {
    console.error('Update cart error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}

// DELETE /api/cart - Xóa sản phẩm khỏi giỏ hàng
export async function DELETE(req: NextRequest) {
  try {
    const tokenUser = getUserFromRequest(req);
    if (!tokenUser) {
      return withCors({ error: 'Vui lòng đăng nhập' }, 401);
    }

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return withCors({ error: 'itemId là bắt buộc' }, 400);
    }

    // Kiểm tra item thuộc về cart của user
    const cart = await prisma.cart.findUnique({
      where: { userId: tokenUser.userId },
    });

    if (!cart) {
      return withCors({ error: 'Giỏ hàng không tồn tại' }, 404);
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: Number(itemId), cartId: cart.id },
    });

    if (!cartItem) {
      return withCors({ error: 'Sản phẩm không có trong giỏ hàng' }, 404);
    }

    await prisma.cartItem.delete({ where: { id: Number(itemId) } });

    return withCors({ message: 'Đã xóa sản phẩm khỏi giỏ hàng' });
  } catch (error) {
    console.error('Delete cart item error:', error);
    return withCors({ error: 'Lỗi server' }, 500);
  }
}
