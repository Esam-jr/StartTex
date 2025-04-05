import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { UserRole } from "./[...nextauth]/route";

// This is a helper endpoint to set up the admin account
// It should be removed or secured in production

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET() {
  try {
    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from("users")
      .select("*")
      .eq("email", "admin@starttex.com")
      .single();

    if (existingAdmin) {
      // Update admin's password
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      
      const { error: updateError } = await supabase
        .from("users")
        .update({
          password_hash: hashedPassword
        })
        .eq("email", "admin@starttex.com");

      if (updateError) {
        console.error("Error updating admin:", updateError);
        return NextResponse.json(
          { message: "Error updating admin", error: updateError },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Admin password updated",
        email: "admin@starttex.com",
        password: "Admin@123"
      });
    }

    // Create new admin if it doesn't exist
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    
    const { data: newAdmin, error: createError } = await supabase
      .from("users")
      .insert([
        {
          email: "admin@starttex.com",
          name: "Admin User",
          password_hash: hashedPassword,
          role: UserRole.ADMIN,
          provider: "credentials"
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error("Error creating admin:", createError);
      return NextResponse.json(
        { message: "Error creating admin", error: createError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Admin account created",
      email: "admin@starttex.com",
      password: "Admin@123"
    });
  } catch (error) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
} 