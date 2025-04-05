import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, CheckCircle, Globe, Rocket, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold inline-block">StartTex</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/startup-calls"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Startup Calls
              </Link>
              <Link
                href="/sponsor-calls"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Sponsor Calls
              </Link>
              <Link
                href="/events"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Events
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="ghost" className="text-base">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="text-base">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Launching Soon</div>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              The Ultimate Startup Management System
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Connect startups with investors, streamline management, and accelerate growth with our comprehensive
              platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-12 px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-16 w-full max-w-5xl rounded-lg border bg-background/50 p-4 shadow-xl backdrop-blur-sm">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                width={1200}
                height={600}
                alt="Dashboard Preview"
                className="rounded-lg border shadow-sm"
              />
            </div>
          </div>
        </section>

        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Powerful Features for Startups and Investors
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              StartTex provides all the tools you need to manage your startup ecosystem efficiently.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Track performance metrics and gain valuable insights into your startup's growth.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Shield className="h-6 w-6" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Secure Platform</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security to protect your sensitive data and communications.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Globe className="h-6 w-6" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Global Network</h3>
                <p className="text-muted-foreground">
                  Connect with investors and startups from around the world to expand your reach.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Streamlined Workflows</h3>
                <p className="text-muted-foreground">
                  Automate repetitive tasks and focus on what matters most for your business.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Rocket className="h-6 w-6" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Pitch Management</h3>
                <p className="text-muted-foreground">
                  Create, manage, and track your startup pitches to potential investors.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Investment Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor investments, track returns, and manage your portfolio with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Trusted by Startups and Investors
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Here's what our users have to say about StartTex.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
            <div className="rounded-lg border bg-background p-6 shadow">
              <p className="mb-4 italic text-muted-foreground">
                "StartTex has completely transformed how we manage our startup. The platform is intuitive, powerful, and
                has helped us connect with the right investors."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10" />
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">CEO, TechNova</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow">
              <p className="mb-4 italic text-muted-foreground">
                "As an investor, StartTex gives me visibility into promising startups and streamlines the entire
                investment process. It's a game-changer."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10" />
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Partner, Venture Capital Firm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary via-purple-600 to-blue-600">
          <div className="container flex flex-col items-center justify-center gap-4 py-12 text-center md:py-24 lg:py-32">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-primary-foreground sm:text-3xl md:text-5xl">
              Ready to Accelerate Your Startup?
            </h2>
            <p className="max-w-[85%] leading-normal text-primary-foreground/80 sm:text-lg sm:leading-7">
              Join thousands of startups and investors already using StartTex.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button variant="secondary" size="lg" className="h-12 px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 border-primary-foreground/20 px-8 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Rocket className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} StartTex. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/test-accounts" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Test Accounts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

