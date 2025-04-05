import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import * as z from "zod";

// Define validation schema for registration
const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  role: z.enum(["ADMIN", "ENTREPRENEUR", "SPONSOR", "REVIEWER"]).default("ENTREPRENEUR"),
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const json = await req.json();
    const body = registerSchema.parse(json);

    // Check if user already exists
    const { data: existingUser, error: queryError } = await supabase
      .from("users")
      .select("id")
      .eq("email", body.email)
      .single();

    if (queryError && queryError.code !== 'PGRST116') {
      console.error("Error checking existing user:", queryError);
      return NextResponse.json(
        { message: "Error checking user existence" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert([
        {
          email: body.email,
          password_hash: hashedPassword, // Make sure column is named password_hash in Supabase
          name: body.name,
          role: body.role,
          provider: "credentials", // Set provider for credential-based signup
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (createError) {
      console.error("Error creating user:", createError);
      return NextResponse.json(
        { message: "Error creating user: " + createError.message },
        { status: 500 }
      );
    }

    // Return success with user data (excluding sensitive info)
    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        { 
          message: "Invalid registration data", 
          errors: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      { message: "Internal server error during registration" },
      { status: 500 }
    );
  }
} 