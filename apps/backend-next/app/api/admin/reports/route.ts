// apps/backend-next/app/api/admin/reports/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* --- helper functions monthKey/monthLabel giữ nguyên --- */
function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
function monthLabel(date: Date) {
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

/**
 * CORS headers - trong dev bạn có thể để '*' hoặc cụ thể origin 'http://localhost:4000'
 * Nếu bạn dùng credentials (cookie/token) thay đổi accordingly và set Access-Control-Allow-Credentials: true
 */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // hoặc 'http://localhost:4000' cho an toàn hơn
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  // "Access-Control-Allow-Credentials": "true" // bật nếu cần gửi cookie/credentials từ FE
};

export async function OPTIONS() {
  // trả về preflight response
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const monthsParam = url.searchParams.get("months") || "12";

    const months = Math.max(1, Math.min(36, parseInt(monthsParam, 10) || 12));

    const now = new Date();
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1),
      1
    );

    const prevStart = new Date(startDate);
    prevStart.setFullYear(prevStart.getFullYear() - 1);

    const prevEnd = new Date(now);
    prevEnd.setFullYear(prevEnd.getFullYear() - 1);

    /** (giữ nguyên các truy vấn prisma + tính toán) */
    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: startDate } },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    const prevOrders = await prisma.order.findMany({
      where: { createdAt: { gte: prevStart, lte: prevEnd } },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    const labels: string[] = [];
    const monthKeys: string[] = [];

    for (let i = 0; i < months; i++) {
      const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      labels.push(monthLabel(d));
      monthKeys.push(monthKey(d));
    }

    const thisYearMap: Record<string, number> = {};
    for (const k of monthKeys) thisYearMap[k] = 0;

    for (const o of orders) {
      const k = monthKey(o.createdAt);
      const v = Number(o.totalAmount);
      if (thisYearMap[k] !== undefined) {
        thisYearMap[k] += v;
      }
    }
    const thisYear = monthKeys.map((k) => thisYearMap[k] ?? 0);

    const prevMonthKeys = monthKeys.map((k) => {
      const [year, month] = k.split("-").map(Number);
      return `${year - 1}-${month}`;
    });

    const lastYearMap: Record<string, number> = {};
    for (const k of prevMonthKeys) lastYearMap[k] = 0;

    for (const o of prevOrders) {
      const k = monthKey(o.createdAt);
      const v = Number(o.totalAmount);
      if (lastYearMap[k] !== undefined) {
        lastYearMap[k] += v;
      }
    }
    const lastYear = prevMonthKeys.map((k) => lastYearMap[k] ?? 0);

    const totalRevenue = thisYear.reduce((a, b) => a + b, 0);
    const totalOrders = orders.length;
    const avgOrderValue =
      totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: {
          createdAt: { gte: startDate },
        },
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            images: { select: { url: true }, take: 1 },
          },
        },
      },
    });

    const productMap = new Map<
      number,
      {
        id: number;
        name: string;
        sold: number;
        revenue: number;
        imageUrl?: string | null;
      }
    >();

    for (const item of orderItems) {
      const pid = item.productId;
      const qty = item.quantity;
      const revenue = qty * Number(item.price);

      let img: string | null = null;
      if (item.product) {
        img =
          item.product.imageUrl ??
          (item.product.images && item.product.images[0]?.url) ??
          null;
      }

      if (!productMap.has(pid)) {
        productMap.set(pid, {
          id: pid,
          name: item.product?.name ?? `#${pid}`,
          sold: qty,
          revenue,
          imageUrl: img,
        });
      } else {
        const p = productMap.get(pid)!;
        p.sold += qty;
        p.revenue += revenue;
        if (!p.imageUrl && img) p.imageUrl = img;
      }
    }

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 20);

    // Trả response kèm CORS headers
    return NextResponse.json(
      {
        summary: {
          totalRevenue,
          totalOrders,
          avgOrderValue,
        },
        monthly: {
          labels,
          thisYear,
          lastYear,
        },
        topProducts,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err: any) {
    console.error("REPORT ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// // apps/backend-next/app/api/admin/reports/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // Helper: tháng dạng key & label
// function monthKey(date: Date) {
//   return `${date.getFullYear()}-${date.getMonth() + 1}`;
// }
// function monthLabel(date: Date) {
//   return `${date.getMonth() + 1}/${date.getFullYear()}`;
// }

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const monthsParam = url.searchParams.get("months") || "12";

//     const months = Math.max(1, Math.min(36, parseInt(monthsParam, 10) || 12));

//     const now = new Date();
//     const startDate = new Date(
//       now.getFullYear(),
//       now.getMonth() - (months - 1),
//       1
//     );

//     const prevStart = new Date(startDate);
//     prevStart.setFullYear(prevStart.getFullYear() - 1);

//     const prevEnd = new Date(now);
//     prevEnd.setFullYear(prevEnd.getFullYear() - 1);

//     /** ===============================
//      * 1) Lấy đơn hàng trong khoảng thời gian
//      * =============================== */
//     const orders = await prisma.order.findMany({
//       where: { createdAt: { gte: startDate } },
//       select: {
//         id: true,
//         totalAmount: true,
//         createdAt: true,
//       },
//     });

//     /** Năm trước */
//     const prevOrders = await prisma.order.findMany({
//       where: { createdAt: { gte: prevStart, lte: prevEnd } },
//       select: {
//         id: true,
//         totalAmount: true,
//         createdAt: true,
//       },
//     });

//     /** ===============================
//      * 2) Labels của từng tháng
//      * =============================== */
//     const labels: string[] = [];
//     const monthKeys: string[] = [];

//     for (let i = 0; i < months; i++) {
//       const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
//       labels.push(monthLabel(d));
//       monthKeys.push(monthKey(d));
//     }

//     /** ===============================
//      * 3) Tính doanh thu theo từng tháng (This Year)
//      * =============================== */
//     const thisYearMap: Record<string, number> = {};
//     for (const k of monthKeys) thisYearMap[k] = 0;

//     for (const o of orders) {
//       const k = monthKey(o.createdAt);
//       const v = Number(o.totalAmount);
//       if (thisYearMap[k] !== undefined) {
//         thisYearMap[k] += v;
//       }
//     }

//     const thisYear = monthKeys.map((k) => thisYearMap[k] ?? 0);

//     /** ===============================
//      * 4) Năm trước
//      * =============================== */
//     const prevMonthKeys = monthKeys.map((k) => {
//       const [year, month] = k.split("-").map(Number);
//       return `${year - 1}-${month}`;
//     });

//     const lastYearMap: Record<string, number> = {};
//     for (const k of prevMonthKeys) lastYearMap[k] = 0;

//     for (const o of prevOrders) {
//       const k = monthKey(o.createdAt);
//       const v = Number(o.totalAmount);
//       if (lastYearMap[k] !== undefined) {
//         lastYearMap[k] += v;
//       }
//     }

//     const lastYear = prevMonthKeys.map((k) => lastYearMap[k] ?? 0);

//     /** ===============================
//      * 5) Summary
//      * =============================== */
//     const totalRevenue = thisYear.reduce((a, b) => a + b, 0);
//     const totalOrders = orders.length;
//     const avgOrderValue =
//       totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

//     /** ===============================
//      * 6) Top sản phẩm (dựa vào OrderItem)
//      * =============================== */
//     const orderItems = await prisma.orderItem.findMany({
//       where: {
//         order: {
//           createdAt: { gte: startDate },
//         },
//       },
//       include: {
//         product: { select: { id: true, name: true } },
//       },
//     });

//     const productMap = new Map<
//       number,
//       { id: number; name: string; sold: number; revenue: number }
//     >();

//     for (const item of orderItems) {
//       const pid = item.productId;
//       const qty = item.quantity;
//       const revenue = qty * Number(item.price);

//       if (!productMap.has(pid)) {
//         productMap.set(pid, {
//           id: pid,
//           name: item.product?.name ?? `#${pid}`,
//           sold: qty,
//           revenue,
//         });
//       } else {
//         const p = productMap.get(pid)!;
//         p.sold += qty;
//         p.revenue += revenue;
//       }
//     }

//     const topProducts = Array.from(productMap.values())
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 20);

//     /** ===============================
//      * 7) Response
//      * =============================== */
//     return NextResponse.json(
//       {
//         summary: {
//           totalRevenue,
//           totalOrders,
//           avgOrderValue,
//         },
//         monthly: {
//           labels,
//           thisYear,
//           lastYear,
//         },
//         topProducts,
//       },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("REPORT ERROR:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: err.message },
//       { status: 500 }
//     );
//   }
// }
