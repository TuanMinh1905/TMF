import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { corsHeaders, noContent } from "../_utils/cors";

export function OPTIONS() {
  return noContent();
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
