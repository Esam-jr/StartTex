"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  BarChart3,
  Building,
  Calendar,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  HandCoins,
  HelpCircle,
  LineChart,
  Mail,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  Star,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function SponsorDashboardPage() {
  const [isOpen, setIsOpen] = useState(false)

  const sponsorships = [
    {
      id: 1,
      title: "Healthcare Innovation Fund",
      amount: "$75,000",
      startups: 5,
      status: "Active",
      startDate: "Jan 15, 2023",
      endDate: "Dec 31, 2023",
      progress: 65,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "AI for Good Challenge",
      amount: "$100,000",
      startups: 3,
      status: "Active",
      startDate: "Mar 1, 2023",
      endDate: "Feb 28, 2024",
      progress: 40,
      logo: "/placeholder.svg?height=80&width=80",
    },
  ]

  const linkedStartups = [
    {
      id: 1,
      name: "MediTech Solutions",
      description: "AI-powered diagnostic tools for rural healthcare providers",
      stage: "Seed",
      funding: "$150,000",
      sponsorship: "Healthcare Innovation Fund",
      progress: 75,
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "BioScan",
      description: "Portable medical imaging devices for underserved communities",
      stage: "Pre-Seed",
      funding: "$80,000",
      sponsorship: "Healthcare Innovation Fund",
      progress: 40,
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "HealthAI",
      description: "Machine learning platform for early disease detection",
      stage: "Seed",
      funding: "$200,000",
      sponsorship: "Healthcare Innovation Fund",
      progress: 60,
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "DiagnosAI",
      description: "AI-powered medical image analysis for radiologists",
      stage: "Series A",
      funding: "$500,000",
      sponsorship: "AI for Good Challenge",
      progress: 85,
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "ClimatePredict",
      description: "AI models for climate change prediction and mitigation",
      stage: "Seed",
      funding: "$175,000",
      sponsorship: "AI for Good Challenge",
      progress: 30,
      logo: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sponsor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your sponsor dashboard. Monitor your sponsorships and track the progress of supported startups.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsorships</CardTitle>
            <HandCoins className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                $175,000 total
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Supported Startups</CardTitle>
            <Building className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                5 active, 3 graduated
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Score</CardTitle>
            <LineChart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                +0.3 from last quarter
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                Next: Demo Day (May 20)
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Sponsorships */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Sponsorships</CardTitle>
              <CardDescription>Your current sponsorship programs and their status</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Sponsorship
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sponsorships.map((sponsorship) => (
              <div key={sponsorship.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={sponsorship.logo || "/placeholder.svg"}
                      alt={sponsorship.title}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{sponsorship.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {sponsorship.startDate} - {sponsorship.endDate}
                        </p>
                      </div>
                      <Badge>{sponsorship.status}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Sponsorship Amount</p>
                        <p className="font-medium">{sponsorship.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supported Startups</p>
                        <p className="font-medium">{sponsorship.startups}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Program Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={sponsorship.progress} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{sponsorship.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                    <Button size="sm">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linked Startups */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Startup Projects</CardTitle>
          <CardDescription>Startups supported through your sponsorship programs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Startups</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare Innovation</TabsTrigger>
              <TabsTrigger value="ai">AI for Good</TabsTrigger>
            </TabsList>
            <div className="space-y-4">
              {linkedStartups.map((startup) => (
                <Collapsible
                  key={startup.id}
                  open={isOpen === startup.id}
                  onOpenChange={() => setIsOpen(isOpen === startup.id ? false : startup.id)}
                  className="rounded-lg border"
                >
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={startup.logo || "/placeholder.svg"}
                          alt={startup.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{startup.name}</h3>
                            <p className="text-sm text-muted-foreground">{startup.description}</p>
                          </div>
                          <Badge variant="outline">{startup.stage}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                            {startup.sponsorship}
                          </Badge>
                        </div>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isOpen === startup.id ? "rotate-180" : ""}`}
                          />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CollapsibleContent>
                    <Separator />
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Funding Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Total Funding:</span>
                              <span className="text-sm font-medium">{startup.funding}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Your Contribution:</span>
                              <span className="text-sm font-medium">$50,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Funding Used:</span>
                              <span className="text-sm font-medium">{startup.progress}%</span>
                            </div>
                          </div>
                          <Progress value={startup.progress} className="h-2 mt-2" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Team Size:</span>
                              <span className="text-sm font-medium">8 members</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Monthly Growth:</span>
                              <span className="text-sm font-medium text-green-600">+12%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Customer Base:</span>
                              <span className="text-sm font-medium">2,500+</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recent Updates</h4>
                          <div className="space-y-2 text-sm">
                            <p>• Completed beta testing with 100 users</p>
                            <p>• Secured partnership with 2 hospitals</p>
                            <p>• Preparing for Series A fundraising</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact Team
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Full Profile
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Return on Impact</CardTitle>
              <CardDescription>Analytics and impact metrics for your sponsorships</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Last 12 Months
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
                <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
                <DropdownMenuItem>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Impact Score</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center py-4">
                  <div className="h-32 w-32 relative flex items-center justify-center">
                    <PieChart className="h-32 w-32 text-primary/20" />
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold">4.2</span>
                      <span className="text-xs text-muted-foreground">out of 5</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Social Impact:</span>
                    <span className="font-medium">4.5/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Innovation:</span>
                    <span className="font-medium">4.3/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sustainability:</span>
                    <span className="font-medium">3.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Startup Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-40 w-full rounded-lg border bg-muted/40 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Growth metrics chart would appear here</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Monthly Growth:</span>
                    <span className="font-medium text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funding Success Rate:</span>
                    <span className="font-medium">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Brand Visibility</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-40 w-full rounded-lg border bg-muted/40 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Brand visibility metrics would appear here</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Media Mentions:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Appearances:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Social Media Reach:</span>
                    <span className="font-medium">125K+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            View Detailed Analytics
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <Plus className="h-5 w-5" />
                <span className="text-xs">New Sponsorship</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <FileText className="h-5 w-5" />
                <span className="text-xs">View Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <Mail className="h-5 w-5" />
                <span className="text-xs">Contact Startups</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Preferences</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-1 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <p className="font-medium">Healthcare Innovation Demo Day</p>
                      <p className="text-sm text-muted-foreground">May 20, 2023 • 2:00 PM - 5:00 PM</p>
                    </div>
                    <Badge variant="outline">Sponsor Event</Badge>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Add to Calendar
                    </Button>
                    <Button size="sm">RSVP</Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <p className="font-medium">Sponsor Networking Breakfast</p>
                      <p className="text-sm text-muted-foreground">June 5, 2023 • 8:30 AM - 10:00 AM</p>
                    </div>
                    <Badge variant="outline">Networking</Badge>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Add to Calendar
                    </Button>
                    <Button size="sm">RSVP</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              View All Events
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
          <CardDescription>Our sponsorship team is here to help you maximize your impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Sponsorship Support</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Questions about your sponsorship programs or impact metrics? Our team is ready to assist.
                </p>
                <Button variant="link" className="px-0 mt-1">
                  Contact Support
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Sponsorship Resources</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Access guides, templates, and best practices to maximize your sponsorship impact.
                </p>
                <Button variant="link" className="px-0 mt-1">
                  View Resources
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

