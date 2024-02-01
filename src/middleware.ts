import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { toast } from 'react-toastify'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isProtected = path === '/profile'  || path === '/orders'

  const isAdmin=path==='/verifyshops'
  const isShopOwner=path==='/addshop' || path==='/addproduct' || path==="/editproduct"
  // console.log("frontend",request.cookies)
  const token = request.cookies.get('token')?.value || '';
  const role = request.cookies.get('role')?.value || '';
console.log(role)
  if(isProtected && !token) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl))
  }
    
  if(isShopOwner && role!="ShopOwner") {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if(isAdmin && role!="Admin") {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
    
  if(path==="/auth" && token ){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile',
    '/auth',
    '/orders',
    '/addshop',
    '/addproduct',
    '/editproduct',
    '/verifyshops',
  ]
}