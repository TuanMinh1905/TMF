
import { NextResponse } from 'next/server';
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
export function withCors(json: any, status = 200) {
  return new NextResponse(JSON.stringify(json), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}
export function noContent(status = 204) { return new NextResponse(null, { status, headers: { ...corsHeaders } }); }
