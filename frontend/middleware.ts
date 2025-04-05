import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/signin") ||
    req.nextUrl.pathname.startsWith("/signup");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  try {
    if (isAuthPage) {
      if (isAuth) {
        // If user is already logged in and tries to access auth pages
        if (token?.role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null; // Allow access to auth pages if not logged in
    }

    if (!isAuth) {
      // If user is not logged in and tries to access protected pages
      let callbackUrl = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        callbackUrl += req.nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, req.url));
    }

    if (isAdminPage && token?.role !== "ADMIN") {
      // If non-admin user tries to access admin pages
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

// Protect these paths with authentication
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/signin",
    "/signup",
    "/profile/:path*"
  ]
}; 