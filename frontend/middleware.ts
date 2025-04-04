import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

type ProtectedRoutes = {
  [key: string]: string[];
};

// Define protected routes and their required roles
const protectedRoutes: ProtectedRoutes = {
  "/dashboard": ["ADMIN", "ENTREPRENEUR", "SPONSOR", "REVIEWER"],
  "/admin": ["ADMIN"],
  "/sponsor": ["SPONSOR"],
  "/reviewer": ["REVIEWER"],
  "/entrepreneur": ["ENTREPRENEUR"],
};

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Public routes - allow access
  if (!isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // No session - redirect to login
  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  const requiredRoles = getRequiredRoles(request.nextUrl.pathname);
  if (!requiredRoles.includes(session.user.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectUrl = getRoleBasedRedirect(session.user.role);
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

// Helper functions
function isProtectedRoute(pathname: string): boolean {
  return Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  );
}

function getRequiredRoles(pathname: string): string[] {
  const route = Object.keys(protectedRoutes).find(route => 
    pathname.startsWith(route)
  );
  return route ? protectedRoutes[route] : [];
}

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "SPONSOR":
      return "/sponsor";
    case "REVIEWER":
      return "/reviewer";
    case "ENTREPRENEUR":
      return "/entrepreneur";
    default:
      return "/auth/login";
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/sponsor/:path*",
    "/reviewer/:path*",
    "/entrepreneur/:path*",
  ],
}; 