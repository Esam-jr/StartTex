import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function handles pages that should be protected by authentication
export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    // If non-admin user tries to access admin pages
    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect only these paths with authentication
// Note: signin and signup pages are REMOVED from here to prevent redirect loops
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*", 
    "/profile/:path*",
  ],
}; 