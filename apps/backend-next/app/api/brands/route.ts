import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const allowedOrigin = "http://localhost:4000"; 

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
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
