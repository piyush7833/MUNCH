"use client"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = path === '/pages/profile' || path.startsWith('/pages/orders') || path === "/pages/contact" || path.startsWith("/pages/edit/profile")

  const isAdmin = path.startsWith('/pages/admin');
  const isUser = path === '/pages/cart';
  const isShopOwner = path.startsWith('/pages/add') || path.startsWith('/pages/edit/product') || path.startsWith('/pages/edit/shop')
  const token = request.cookies.get('token')?.value || '';
  const role = request.cookies.get('role')?.value || '';
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/pages/auth', request.nextUrl))
  }

  if (isShopOwner && (role === "User" || !token || !role)) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (isAdmin && role !== "Admin") {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (path === "/pages/auth" && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if (isUser && role !== "User") {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/pages/add/:path*',
    '/pages/edit/:path*',
    '/pages/admin/:path*',
    '/pages/profile',
    '/pages/orders',
    '/pages/contact',
    '/pages/auth',
    '/pages/cart',
  ]
}
