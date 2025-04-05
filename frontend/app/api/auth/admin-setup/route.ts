import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types/user";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin credentials
const ADMIN_EMAIL = "admin@starttex.com";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_NAME = "Admin User";

export async function GET() {
  try {
    // Check if admin user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select()
      .eq("email", ADMIN_EMAIL)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking admin:", fetchError);
      return NextResponse.json(
        { error: "Failed to check admin user" },
        { status: 500 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    if (existingUser) {
      // Update existing admin user
      const { error: updateError } = await supabase
        .from("users")
        .update({
          password_hash: hashedPassword,
          name: ADMIN_NAME,
          role: UserRole.ADMIN,
          provider: "credentials",
        })
        .eq("email", ADMIN_EMAIL);

      if (updateError) {
        console.error("Error updating admin:", updateError);
        return NextResponse.json(
          { error: "Failed to update admin user" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Admin updated successfully", email: ADMIN_EMAIL },
        { status: 200 }
      );
    } else {
      // Create new admin user
      const { error: insertError } = await supabase.from("users").insert({
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        password_hash: hashedPassword,
        role: UserRole.ADMIN,
        provider: "credentials",
      });

      if (insertError) {
        console.error("Error creating admin:", insertError);
        return NextResponse.json(
          { error: "Failed to create admin user" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Admin created successfully", email: ADMIN_EMAIL },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in admin setup:", error);
    return NextResponse.json(
      { error: "Admin setup failed" },
      { status: 500 }
    );
  }
} 