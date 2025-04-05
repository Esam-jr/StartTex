import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Simple test with one method
    const testPassword = "Admin@123";
    
    // Create a hash
    let hash = "";
    try {
      hash = await bcrypt.hash(testPassword, 10);
      console.log("Created hash:", hash);
    } catch (hashError) {
      console.error("Hash creation error:", hashError);
      return NextResponse.json({ error: "Failed to create hash", details: String(hashError) }, { status: 500 });
    }
    
    // Verify the hash
    let isValid = false;
    try {
      isValid = await bcrypt.compare(testPassword, hash);
      console.log("Hash verification result:", isValid);
    } catch (compareError) {
      console.error("Compare error:", compareError);
      return NextResponse.json({ error: "Failed to verify hash", details: String(compareError) }, { status: 500 });
    }
    
    return NextResponse.json({
      message: "Bcrypt test completed",
      success: isValid,
      passwordUsed: testPassword,
      hashCreated: hash
    });
  } catch (error) {
    console.error("Error in simple bcrypt test:", error);
    return NextResponse.json(
      { error: "Test failed", details: String(error) },
      { status: 500 }
    );
  }
} 