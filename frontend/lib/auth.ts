import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

// Define user roles
export enum UserRole {
  ADMIN = "ADMIN",
  ENTREPRENEUR = "ENTREPRENEUR",
  SPONSOR = "SPONSOR",
  REVIEWER = "REVIEWER",
}

// Define user schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  role: z.nativeEnum(UserRole),
  avatarUrl: z.string().optional(),
  bio: z.string().optional(),
  socialLinks: z.record(z.string()).optional(),
  provider: z.string(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      async profile(profile) {
        // Create or update user in Supabase
        const { data: user, error } = await supabase
          .from("users")
          .upsert({
            id: profile.id.toString(),
            email: profile.email,
            name: profile.name,
            avatarUrl: profile.avatar_url,
            provider: "github",
            role: UserRole.ENTREPRENEUR, // Default role for OAuth users
            createdAt: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) throw error;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatarUrl,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        const { data: user, error } = await supabase
          .from("users")
          .upsert({
            id: profile.sub,
            email: profile.email,
            name: profile.name,
            avatarUrl: profile.picture,
            provider: "google",
            role: UserRole.ENTREPRENEUR,
            createdAt: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) throw error;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatarUrl,
        };
      },
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      async profile(profile) {
        const { data: user, error } = await supabase
          .from("users")
          .upsert({
            id: profile.sub,
            email: profile.email,
            name: profile.name,
            avatarUrl: profile.picture,
            provider: "linkedin",
            role: UserRole.ENTREPRENEUR,
            createdAt: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) throw error;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatarUrl,
        };
      },
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const { data: user, error } = await supabase
          .from("users")
          .select()
          .eq("email", email)
          .eq("provider", "credentials")
          .single();

        if (!user || error) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatarUrl,
        };
      },
    }),
  ],
}); 