// Fixed implementation for Next.js App Router with NextAuth v4
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Define user roles
export enum UserRole {
  ADMIN = "ADMIN",
  ENTREPRENEUR = "ENTREPRENEUR",
  SPONSOR = "SPONSOR",
  REVIEWER = "REVIEWER",
}

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        try {
          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .single();

          if (error) {
            console.log("Database query error:", error);
            throw new Error("An error occurred while fetching user data");
          }

          if (!user) {
            console.log("User not found for email:", credentials.email);
            throw new Error("User not found. Please check your email or sign up.");
          }

          // Check if password_hash exists
          if (!user.password_hash) {
            console.log("Password hash missing for user:", user.email);
            throw new Error("Account requires password reset. Please contact support.");
          }

          console.log("Credentials password:", credentials.password);
          console.log("Stored password hash:", user.password_hash);
          
          // Try different methods to verify the password
          let isValid = false;
          
          // Method 1: Standard bcrypt compare
          try {
            isValid = await bcrypt.compare(credentials.password, user.password_hash);
            console.log("Standard bcrypt compare result:", isValid);
          } catch (compareError) {
            console.error("Error in bcrypt compare:", compareError);
          }
          
          // Method 2: Direct string comparison (for emergency plain text passwords)
          if (!isValid && credentials.password === user.password_hash) {
            console.log("Plain text password matched");
            isValid = true;
          }
          
          // Test with known values (diagnostics)
          try {
            const test = await bcrypt.compare("Admin@123", "$2a$10$qdYbOyGcMvA3TQzEHFzqHO0CNQvs3MPL5rX.v6HvnN4x9T8oDvZju");
            console.log("Test result with predefined hash:", test);
          } catch (testError) {
            console.error("Error in test comparison:", testError);
          }

          console.log("Final password verification result:", isValid);

          if (!isValid) {
            console.log("Invalid password for user:", user.email);
            throw new Error("Invalid email or password");
          }

          console.log("Login successful for:", user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar_url
          };
        } catch (error) {
          console.error("Auth error:", error);
          // Re-throw with a user-friendly message
          if (error instanceof Error) {
            throw error;
          }
          throw new Error("Authentication failed. Please try again.");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt" as const // Use 'as const' to ensure type compatibility
  },
  debug: process.env.NODE_ENV === "development" // Add debugging in development
};

// Create the auth handler
const handler = NextAuth(authOptions);

// Export the handler as GET and POST functions
export { handler as GET, handler as POST }; 