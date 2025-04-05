import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      // If no session, redirect to sign-in
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Check user role and redirect accordingly
    if (session.user.role === "ADMIN") {
      console.log("Redirecting admin user to admin dashboard");
      return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      console.log("Redirecting regular user to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    console.error("Error in auth redirect:", error);
    // If any error occurs, redirect to dashboard as fallback
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
} 