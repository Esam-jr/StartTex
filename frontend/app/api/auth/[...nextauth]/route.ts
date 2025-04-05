import NextAuth from "next-auth"
import type { Session, User } from "next-auth"
import type { DefaultSession } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { AdapterUser } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

// Extend the built-in types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: User & {
      id: string
      role: string
    }
  }

  interface User {
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
}

interface DatabaseUser {
  id: string
  email: string
  name: string
  role: string
  password_hash: string
  avatar_url?: string
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
}

if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_KEY")
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (typeof credentials?.email !== 'string' || typeof credentials?.password !== 'string') {
          throw new Error("Invalid credentials")
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) {
          throw new Error("Invalid credentials")
        }

        const dbUser = user as DatabaseUser

        try {
          const isValid = await bcrypt.compare(
            credentials.password,
            dbUser.password_hash || ''
          )

          if (!isValid) {
            throw new Error("Invalid credentials")
          }

          return {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
            image: dbUser.avatar_url
          }
        } catch (error) {
          console.error("Error comparing passwords:", error)
          throw new Error("Invalid credentials")
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID || "",
      clientSecret: process.env.LINKEDIN_SECRET || "",
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true
      }

      // Handle social login
      try {
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single()

        if (existingUser) {
          // Update user's social provider info
          await supabase
            .from("users")
            .update({
              provider: account?.provider,
              avatar_url: user.image,
              name: user.name
            })
            .eq("id", existingUser.id)
          return true
        }

        // Create new user from social login
        const { error: createError } = await supabase
          .from("users")
          .insert({
            email: user.email,
            name: user.name,
            avatar_url: user.image,
            provider: account?.provider,
            role: "ENTREPRENEUR" // Default role for social sign-ups
          })

        if (createError) {
          console.error("Error creating user:", createError)
          return false
        }

        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt"
  }
})

export { handler as GET, handler as POST } 