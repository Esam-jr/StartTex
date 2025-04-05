import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Test password
const TEST_PASSWORD = "Admin@123";

export async function GET() {
  try {
    // Test both async and sync methods
    
    // Method 1: genSalt + hash
    const salt1 = await bcrypt.genSalt(10);
    const hash1 = await bcrypt.hash(TEST_PASSWORD, salt1);
    const verify1 = await bcrypt.compare(TEST_PASSWORD, hash1);
    
    // Method 2: hash with rounds directly
    const hash2 = await bcrypt.hash(TEST_PASSWORD, 10);
    const verify2 = await bcrypt.compare(TEST_PASSWORD, hash2);
    
    // Method 3: sync methods
    const salt3 = bcrypt.genSaltSync(10);
    const hash3 = bcrypt.hashSync(TEST_PASSWORD, salt3);
    const verify3 = await bcrypt.compare(TEST_PASSWORD, hash3);
    
    // Method 4: hardcoded existing hash
    const existingHash = "$2a$10$qdYbOyGcMvA3TQzEHFzqHO0CNQvs3MPL5rX.v6HvnN4x9T8oDvZju";
    const verify4 = await bcrypt.compare(TEST_PASSWORD, existingHash);
    
    // Method 5: fresh hash with same rounds as existing hash
    const hash5 = await bcrypt.hash(TEST_PASSWORD, 10);
    const verify5 = await bcrypt.compare(TEST_PASSWORD, hash5);
    
    // Method 6: create hash with different rounds
    const hash6 = await bcrypt.hash(TEST_PASSWORD, 12);
    const verify6 = await bcrypt.compare(TEST_PASSWORD, hash6);
    
    return NextResponse.json({
      results: {
        method1: {
          salt: salt1,
          hash: hash1,
          verified: verify1
        },
        method2: {
          hash: hash2,
          verified: verify2
        },
        method3: {
          salt: salt3,
          hash: hash3,
          verified: verify3
        },
        method4: {
          existingHash,
          verified: verify4
        },
        method5: {
          hash: hash5,
          verified: verify5
        },
        method6: {
          hash: hash6,
          verified: verify6
        }
      },
      summary: {
        method1_works: verify1,
        method2_works: verify2,
        method3_works: verify3,
        method4_works: verify4,
        method5_works: verify5,
        method6_works: verify6,
        all_methods_work: verify1 && verify2 && verify3 && verify4 && verify5 && verify6
      }
    });
  } catch (error) {
    console.error("Error in bcrypt debug:", error);
    return NextResponse.json(
      { error: "Debug test failed", details: error },
      { status: 500 }
    );
  }
} 