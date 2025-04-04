"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Rocket } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Check for error messages from URL
  useEffect(() => {
    const error = searchParams.get("error")
    if (error) {
      if (error === "CredentialsSignin") {
        toast.error("Invalid email or password. Please try again.")
      } else {
        toast.error(`Authentication error: ${error}`)
      }
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      toast.error("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        console.error("Sign-in error:", result.error)
        
        // Show specific error messages
        if (result.error.includes("email or password")) {
          toast.error("Invalid email or password. Please verify your credentials and try again.")
        } else if (result.error.includes("User not found")) {
          toast.error("Account not found. Please check your email or sign up.")
        } else if (result.error.includes("password reset")) {
          toast.error("Account requires password reset. Please contact support.")
        } else {
          toast.error("Sign-in failed. Please try again.")
        }
        
        setIsLoading(false)
      } else {
        toast.success("Signed in successfully!")
        
        // Fetch user session to get role data
        const session = await fetch('/api/auth/session');
        const sessionData = await session.json();
        
        // Redirect based on role
        if (sessionData?.user?.role === "ADMIN") {
          console.log("Admin user detected, redirecting to admin dashboard");
          router.push("/admin");
        } else {
          console.log("Regular user detected, redirecting to dashboard");
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Sign-in exception:", error)
      toast.error("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    try {
      // For social sign-in, use redirect but make sure the server-side 
      // callback redirects based on user role
      await signIn(provider, {
        callbackUrl: "/api/auth/redirect", // This URL should check role and redirect accordingly
      });
    } catch (error) {
      toast.error("Failed to connect with the social provider. Please try again.");
    }
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <Link href="/" className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-blue-600" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Rocket className="h-6 w-6" />
          <span>StartTex</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "StartTex has revolutionized how we connect with investors and manage our startup's growth. The platform
              is intuitive and powerful."
            </p>
            <footer className="text-sm">Sofia Davis, Founder at TechLaunch</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <Button variant="outline" className="w-full" onClick={() => handleSocialSignIn("google")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign in with Google
              </Button>

              <Button variant="outline" className="w-full" onClick={() => handleSocialSignIn("github")}>
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>

              <Button variant="outline" className="w-full" onClick={() => handleSocialSignIn("linkedin")}>
                <Linkedin className="mr-2 h-4 w-4" />
                Sign in with LinkedIn
              </Button>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

