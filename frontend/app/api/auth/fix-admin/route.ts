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
    
    // Create new password hash - use genSaltSync and hashSync for consistent results
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, salt);
    
    // Perform multiple verification tests
    const verifyTest1 = await bcrypt.compare(ADMIN_PASSWORD, hashedPassword);
    console.log("Verification test 1:", verifyTest1);
    
    // Direct test with hardcoded hash
    const testHash = "$2a$10$qdYbOyGcMvA3TQzEHFzqHO0CNQvs3MPL5rX.v6HvnN4x9T8oDvZju";
    const verifyTest2 = await bcrypt.compare(ADMIN_PASSWORD, testHash);
    console.log("Verification test 2 (with existing hash):", verifyTest2);

    // Check if bcrypt is working correctly
    if (!verifyTest1) {
      console.error("CRITICAL: bcrypt verification is not working properly");
    }
    
    // Create new admin user
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        email: ADMIN_EMAIL,
        name: "Admin User",
        password_hash: hashedPassword,
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

    // Double-check the result
    const { data: createdUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", ADMIN_EMAIL)
      .single();

    // Verify with the stored hash
    let finalVerification = false;
    if (createdUser && createdUser.password_hash) {
      finalVerification = await bcrypt.compare(ADMIN_PASSWORD, createdUser.password_hash);
    }

    return NextResponse.json(
      {
        message: "Admin account reset successfully",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        passwordHash: hashedPassword,
        stored_hash: createdUser?.password_hash,
        verification_result: finalVerification
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fixing admin:", error);
    return NextResponse.json(
      { error: "Admin fix failed" },
      { status: 500 }
    );
  }
} 