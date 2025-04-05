import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types/user";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test user constants
const TEST_PASSWORD = "Test@123";

export async function GET() {
  try {
    // Generate a unique email with timestamp
    const timestamp = new Date().getTime();
    const testEmail = `test-user-${timestamp}@starttex.com`;
    const testName = `Test User ${timestamp}`;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(TEST_PASSWORD, salt);

    // Create test user
    const { error: insertError } = await supabase.from("users").insert({
      email: testEmail,
      name: testName,
      password_hash: hashedPassword,
      role: UserRole.ENTREPRENEUR,
      provider: "credentials",
    });

    if (insertError) {
      console.error("Error creating test user:", insertError);
      return NextResponse.json(
        { error: "Failed to create test user" },
        { status: 500 }
      );
    }

    // Return test user credentials
    return NextResponse.json(
      {
        message: "Test user created successfully",
        credentials: {
          email: testEmail,
          password: TEST_PASSWORD,
          role: UserRole.ENTREPRENEUR,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in creating test user:", error);
    return NextResponse.json(
      { error: "Test user creation failed" },
      { status: 500 }
    );
  }
} 