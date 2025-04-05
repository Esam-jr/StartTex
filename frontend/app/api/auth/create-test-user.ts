import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { UserRole } from "./[...nextauth]/route";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    // Create password hash
    const plainPassword = "Test@123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Generate a unique email with timestamp
    const timestamp = new Date().getTime();
    const email = `test.user.${timestamp}@starttex.com`;
    
    // Insert test user
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert([
        {
          email: email,
          name: "Test User",
          password_hash: hashedPassword,
          role: UserRole.ENTREPRENEUR,
          provider: "credentials",
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error("Error creating test user:", createError);
      return NextResponse.json(
        { message: "Error creating test user", error: createError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Test user created successfully",
      credentials: {
        email: email,
        password: plainPassword,
        role: UserRole.ENTREPRENEUR
      }
    });
  } catch (error) {
    console.error("Test user creation error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
} 