import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const allowedOrigin = "http://localhost:4000"; // frontend-nuxt của bạn

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight request
export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    // Lấy tất cả fields của brand (id, name, logoUrl, description)
    const brands = await prisma.brand.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(brands, {
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Error fetching brands:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
