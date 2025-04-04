"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Filter, HandCoins, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function SponsorCallPage() {
  const [activeTab, setActiveTab] = useState("browse")

  const startups = [
    {
      id: 1,
      name: "GreenTech Solutions",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Sustainable energy solutions for residential and commercial buildings",
      industry: "CleanTech",
      fundingStage: "Seed",
      fundingGoal: "$2.5M",
      location: "San Francisco, CA",
      tags: ["Renewable Energy", "IoT", "Sustainability"],
    },
    {
      id: 2,
      name: "MediHealth AI",
      logo: "/placeholder.svg?height=80&width=80",
      description: "AI-powered diagnostic tools for healthcare professionals",
      industry: "HealthTech",
      fundingStage: "Series A",
      fundingGoal: "$5M",
      location: "Boston, MA",
      tags: ["AI", "Healthcare", "Diagnostics"],
    },
    {
      id: 3,
      name: "FinanceFlow",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Blockchain-based financial services for underbanked populations",
      industry: "FinTech",
      fundingStage: "Seed",
      fundingGoal: "$1.8M",
      location: "New York, NY",
      tags: ["Blockchain", "Finance", "Inclusion"],
    },
    {
      id: 4,
      name: "EduLearn",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Personalized learning platform for K-12 students",
      industry: "EdTech",
      fundingStage: "Pre-Seed",
      fundingGoal: "$750K",
      location: "Austin, TX",
      tags: ["Education", "AI", "SaaS"],
    },
    {
      id: 5,
      name: "DeliveryDash",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Last-mile delivery optimization platform for urban areas",
      industry: "LogisticsTech",
      fundingStage: "Series A",
      fundingGoal: "$4M",
      location: "Chicago, IL",
      tags: ["Logistics", "AI", "Urban Mobility"],
    },
    {
      id: 6,
      name: "SecureShield",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Next-generation cybersecurity solutions for enterprise",
      industry: "CyberSecurity",
      fundingStage: "Seed",
      fundingGoal: "$3M",
      location: "Seattle, WA",
      tags: ["Security", "Enterprise", "AI"],
    },
  ]

  return (
    <div className="container mx-auto py-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <HandCoins className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Sponsor Portal</h1>
        </div>
        <p className="mt-2 text-center text-muted-foreground">
          Discover promising startups and investment opportunities
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Startups</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          <TabsTrigger value="investments">My Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search startups..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Funding Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B+</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {startups.map((startup) => (
              <Card key={startup.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={startup.logo || "/placeholder.svg"}
                          alt={startup.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{startup.name}</CardTitle>
                        <CardDescription>{startup.location}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{startup.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline">{startup.industry}</Badge>
                    <Badge variant="outline">{startup.fundingStage}</Badge>
                    {startup.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">Seeking: {startup.fundingGoal}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{startup.name}</DialogTitle>
                        <DialogDescription>
                          {startup.industry} • {startup.location}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 font-medium">Company Overview</h3>
                            <p className="text-sm text-muted-foreground">{startup.description}</p>
                            <div className="mt-4">
                              <h4 className="mb-1 text-sm font-medium">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {startup.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-2 font-medium">Investment Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Funding Stage:</span>
                                <span className="font-medium">{startup.fundingStage}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Funding Goal:</span>
                                <span className="font-medium">{startup.fundingGoal}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Minimum Investment:</span>
                                <span className="font-medium">$50,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Equity Offered:</span>
                                <span className="font-medium">8-12%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="mb-2 font-medium">Traction & Metrics</h3>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-3">
                              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                              <p className="text-xl font-bold">$45,000</p>
                              <p className="text-xs text-green-600">+12% MoM</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <p className="text-sm text-muted-foreground">Active Users</p>
                              <p className="text-xl font-bold">12,500</p>
                              <p className="text-xs text-green-600">+8% MoM</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <p className="text-sm text-muted-foreground">CAC</p>
                              <p className="text-xl font-bold">$42</p>
                              <p className="text-xs text-green-600">-5% MoM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Download Pitch Deck</Button>
                        <Button>Express Interest</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">No favorites yet</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Browse startups and add them to your favorites to track them here.
            </p>
            <Button className="mt-4" onClick={() => setActiveTab("browse")}>
              Browse Startups
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="mt-6">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <HandCoins className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">No investments yet</h3>
            <p className="mt-2 text-center text-muted-foreground">
              When you invest in startups, they will appear here for easy tracking.
            </p>
            <Button className="mt-4" onClick={() => setActiveTab("browse")}>
              Discover Opportunities
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

