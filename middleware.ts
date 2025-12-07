import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/prepare', '/chat', '/interview']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Define auth routes (unavailable to logged-in users)
  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // 1. Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Redirect authenticated users from auth routes to prepare page
  if (isAuthRoute && token) {
    const prepareUrl = new URL('/prepare', request.url)
    return NextResponse.redirect(prepareUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
