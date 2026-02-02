import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Kiểm tra nếu user truy cập /admin mà không có role admin (case-insensitive)
    const userRole = (req.nextauth.token?.role as string)?.toLowerCase()
    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Nếu truy cập /admin thì phải đăng nhập
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*']
}