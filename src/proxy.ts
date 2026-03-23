import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function proxy(req) {
    // Redirect non-admin users away from admin routes.
    const userRole = (req.nextauth.token?.role as string)?.toLowerCase()

    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Admin routes require authentication before role checks run.
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
