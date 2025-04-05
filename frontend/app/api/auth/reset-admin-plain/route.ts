import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { UserRole } from "@/types/user";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin credentials
const ADMIN_EMAIL = "admin@starttex.com";
const ADMIN_PASSWORD = "Admin@123";

export async function GET() {
  try {
    // Delete existing admin user
    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("email", ADMIN_EMAIL);
    
    if (deleteError) {
      console.error("Error deleting admin:", deleteError);
    }
    
    // Create new admin user with plain password (WARNING: For testing only!)
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        email: ADMIN_EMAIL,
        name: "Admin User",
        password_hash: ADMIN_PASSWORD, // WARNING: This is intentionally NOT hashed for testing
        role: UserRole.ADMIN,
        provider: "credentials",
      });

    if (insertError) {
      console.error("Error recreating admin:", insertError);
      return NextResponse.json(
        { error: "Failed to recreate admin user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Admin account reset with plain text password (FOR TESTING ONLY)",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        warning: "This endpoint uses plain text passwords and should NEVER be used in production"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting admin:", error);
    return NextResponse.json(
      { error: "Admin reset failed" },
      { status: 500 }
    );
  }
} 