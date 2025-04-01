import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const origin = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
  
  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Origin', origin);
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Access-Control-Allow-Credentials', 'true');

  return res;
}
