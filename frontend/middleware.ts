import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Simplified middleware for protecting routes and handling admin access
export default withAuth(
  function middleware(req) {
    // Check for admin routes
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    
    // Get token from the request's nextauth property
    const token = req.nextauth?.token;
    
    // If trying to access admin routes but not an admin, redirect to dashboard
    if (isAdminRoute && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      // Only proceed if the user has a valid token
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

// Only protect these specific paths
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/admin/:path*", 
    "/profile/:path*"
  ]
}; 