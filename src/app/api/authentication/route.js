// File: app/api/admin/login/route.js

import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'admin_1234@7645'; // Change this to your secure password

export async function POST(req) {
  const body = await req.json();
  const { password } = body;

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ message: 'Login successful' });

  // ✅ Set cookie for 2 hours
  response.cookies.set('adminAuth', 'true', {
    httpOnly: true,
    maxAge: 60 * 60 * 2,
    path: '/',
    sameSite: 'strict',
    secure: true,
  });

  return response;
}
