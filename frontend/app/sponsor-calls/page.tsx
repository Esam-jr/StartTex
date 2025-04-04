import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building, DollarSign, Filter, HandCoins, Search, Star, Users, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SponsorCallsPage() {
  const sponsorOpportunities = [
    {
      id: 1,
      title: "Healthcare Innovation Fund",
      description: "Support breakthrough healthcare technologies that improve patient outcomes and reduce costs.",
      impact:
        "Fund promising startups working on medical devices, digital health solutions, and biotechnology innovations.",
      minSponsorship: "$25,000",
      featuredStartups: 12,
      category: "Healthcare",
      logo: "/placeholder.svg?height=80&width=80",
      successStories: [
        "MediTech Solutions - Raised $2M after program",
        "HealthAI - Acquired by major healthcare provider",
      ],
    },
    {
      id: 2,
      title: "Sustainable Future Initiative",
      description: "Accelerate the development of clean energy and sustainable technologies to combat climate change.",
      impact:
        "Support startups working on renewable energy, carbon capture, sustainable materials, and circular economy solutions.",
      minSponsorship: "$50,000",
      featuredStartups: 8,
      category: "CleanTech",
      logo: "/placeholder.svg?height=80&width=80",
      successStories: ["GreenPower - Expanded to 3 new markets", "EcoMaterials - Secured $5M Series A"],
    },
    {
      id: 3,
      title: "EdTech for All Program",
      description: "Democratize access to quality education through innovative technology solutions.",
      impact:
        "Fund startups developing accessible learning platforms, educational tools, and skill development solutions.",
      minSponsorship: "$20,000",
      featuredStartups: 15,
      category: "Education",
      logo: "/placeholder.svg?height=80&width=80",
      successStories: [
        "LearnQuest - Reached 1M+ students globally",
        "SkillBridge - Partnership with major universities",
      ],
    },
    {
      id: 4,
      title: "Financial Inclusion Fund",
      description: "Support innovations that bring financial services to underserved communities worldwide.",
      impact:
        "Back startups working on mobile banking, microfinance, blockchain solutions, and financial literacy tools.",
      minSponsorship: "$35,000",
      featuredStartups: 10,
      category: "FinTech",
      logo: "/placeholder.svg?height=80&width=80",
      successStories: ["MicroBank - Expanded to 5 countries", "PayEasy - 500K+ users in underserved regions"],
    },
    {
      id: 5,
      title: "AI for Good Challenge",
      description:
        "Harness the power of artificial intelligence to solve pressing social and environmental challenges.",
      impact: "Support AI startups focused on healthcare diagnostics, climate modeling, accessibility tools, and more.",
      minSponsorship: "$75,000",
      featuredStartups: 6,
      category: "AI/ML",
      logo: "/placeholder.svg?height=80&width=80",
      successStories: [
        "DiagnosAI - FDA approval for diagnostic tool",
        "ClimatePredict - Partnerships with 3 governments",
      ],
    },
    {
      id: 6,
      title: "Urban Innovation Program",
      description:
        "Transform cities through smart technology, sustainable infrastructure, and community-focused solutions.",
      impact:
        "Fund startups working on smart city technologies, urban mobility, affordable housing, and community services.",
      minSponsorship: "$40,000",
      featuredStartups: 9,
      category: "Smart Cities",
      logo: "/placeholder.svg?height=80&width=80",
      successStories: ["MobilityX - Deployed in 12 major cities", "CommunityConnect - 30+ municipal partnerships"],
    },
  ]

  return (
    <div className="container mx-auto py-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="flex items-center gap-2 mb-3">
          <HandCoins className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Sponsorship Opportunities</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Make a difference by supporting innovation in areas that align with your organization's values and goals.
          Partner with startups that are creating impactful solutions for tomorrow's challenges.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search opportunities..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="cleantech">CleanTech</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="ai">AI/ML</SelectItem>
              <SelectItem value="smartcities">Smart Cities</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Investment Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ranges</SelectItem>
              <SelectItem value="under25k">Under $25K</SelectItem>
              <SelectItem value="25k-50k">$25K - $50K</SelectItem>
              <SelectItem value="50k-100k">$50K - $100K</SelectItem>
              <SelectItem value="over100k">Over $100K</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Opportunities</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sponsorOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={opportunity.logo || "/placeholder.svg"}
                        alt={opportunity.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <CardDescription className="mt-1">{opportunity.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{opportunity.impact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Min. Sponsorship: {opportunity.minSponsorship}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.featuredStartups} Featured Startups</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Success Stories:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {opportunity.successStories.map((story, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          {story}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4">
                  <Button asChild className="w-full">
                    <Link href={`/sponsor-calls/${opportunity.id}`}>
                      Become a Sponsor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <HandCoins className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Upcoming Opportunities</h3>
            <p className="mt-2 text-center text-muted-foreground max-w-md">
              New sponsorship opportunities are being prepared. Contact our team to discuss custom sponsorship programs
              tailored to your organization's goals.
            </p>
            <Button className="mt-4">Contact Sponsorship Team</Button>
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Past Campaigns</h3>
            <p className="mt-2 text-center text-muted-foreground max-w-md">
              View our archive of past sponsorship campaigns, including impact reports and success stories.
            </p>
            <Button className="mt-4" variant="outline">
              View Past Campaigns
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-3">Why Sponsor Innovation?</h2>
            <p className="text-muted-foreground mb-4">By sponsoring startup programs, your organization can:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>Support innovation in areas aligned with your strategic goals</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>Gain early access to cutting-edge technologies and solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>Enhance your brand's visibility in the innovation ecosystem</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>Create meaningful partnerships with promising startups</span>
              </li>
            </ul>
            <Button className="mt-6">Learn More About Sponsorship Benefits</Button>
          </div>
          <div className="md:w-1/3">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-medium mb-4">Speak with our Sponsorship Team</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Interested in creating a custom sponsorship program? Our team is ready to help design a partnership that
                meets your specific goals.
              </p>
              <Button className="w-full">Schedule a Consultation</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

