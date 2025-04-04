import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, Clock, DollarSign, Filter, Info, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StartupCallsPage() {
  const startupCalls = [
    {
      id: 1,
      title: "Spring 2023 Innovation Challenge",
      description:
        "Seeking innovative solutions in healthcare technology that address accessibility and affordability.",
      deadline: "May 30, 2023",
      funding: "$50,000 - $150,000",
      eligibility: "Early-stage startups with MVP, less than $1M in funding",
      category: "Healthcare",
      status: "Open",
      daysLeft: 14,
    },
    {
      id: 2,
      title: "Green Tech Accelerator Program",
      description:
        "Supporting startups focused on sustainable energy solutions and environmental conservation technologies.",
      deadline: "June 15, 2023",
      funding: "$75,000 - $200,000",
      eligibility: "Pre-seed to Seed stage, focus on sustainability",
      category: "CleanTech",
      status: "Open",
      daysLeft: 30,
    },
    {
      id: 3,
      title: "EdTech Transformation Initiative",
      description:
        "Looking for innovative educational technology solutions that improve learning outcomes and accessibility.",
      deadline: "July 10, 2023",
      funding: "$40,000 - $120,000",
      eligibility: "All stages, must demonstrate educational impact",
      category: "Education",
      status: "Open",
      daysLeft: 55,
    },
    {
      id: 4,
      title: "FinTech Revolution Program",
      description:
        "Seeking disruptive financial technology solutions that improve financial inclusion and accessibility.",
      deadline: "June 5, 2023",
      funding: "$100,000 - $250,000",
      eligibility: "Seed to Series A, focus on financial inclusion",
      category: "FinTech",
      status: "Open",
      daysLeft: 20,
    },
    {
      id: 5,
      title: "AI & Machine Learning Cohort",
      description:
        "Supporting startups leveraging artificial intelligence and machine learning to solve complex problems.",
      deadline: "July 25, 2023",
      funding: "$150,000 - $300,000",
      eligibility: "Technical founding team, working prototype required",
      category: "AI/ML",
      status: "Open",
      daysLeft: 70,
    },
    {
      id: 6,
      title: "Social Impact Venture Program",
      description:
        "Funding startups with a clear social mission addressing community challenges and creating positive change.",
      deadline: "June 30, 2023",
      funding: "$25,000 - $100,000",
      eligibility: "Clear social impact metrics, any stage",
      category: "Social Impact",
      status: "Open",
      daysLeft: 45,
    },
  ]

  return (
    <div className="container mx-auto py-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Startup Calls</h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover open funding opportunities and programs for your startup. Apply to the ones that match your vision
          and take your business to the next level.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search startup calls..." className="pl-8" />
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
              <SelectItem value="social">Social Impact</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Funding Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ranges</SelectItem>
              <SelectItem value="under50k">Under $50K</SelectItem>
              <SelectItem value="50k-100k">$50K - $100K</SelectItem>
              <SelectItem value="100k-200k">$100K - $200K</SelectItem>
              <SelectItem value="over200k">Over $200K</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="open" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="open">Open Calls</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="closed">Past Calls</TabsTrigger>
        </TabsList>

        <TabsContent value="open">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {startupCalls.map((call) => (
              <Card key={call.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{call.title}</CardTitle>
                      <CardDescription className="mt-1">{call.category}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{call.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{call.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Deadline: {call.deadline} ({call.daysLeft} days left)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Funding: {call.funding}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">Eligibility: {call.eligibility}</span>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4">
                  <Button asChild className="w-full">
                    <Link href={`/startup-call/${call.id}`}>
                      Apply Now
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
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Upcoming Calls</h3>
            <p className="mt-2 text-center text-muted-foreground max-w-md">
              New startup calls are being prepared. Check back soon or subscribe to our newsletter to be notified when
              new opportunities are available.
            </p>
            <Button className="mt-4">Subscribe to Updates</Button>
          </div>
        </TabsContent>

        <TabsContent value="closed">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Info className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Past Calls</h3>
            <p className="mt-2 text-center text-muted-foreground max-w-md">
              View our archive of past startup calls, including winners and success stories from previous cohorts.
            </p>
            <Button className="mt-4" variant="outline">
              View Archive
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 text-center">
        <h2 className="text-2xl font-bold mb-3">Need Help With Your Application?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team is available to answer your questions and guide you through the application process. We also offer
          workshops and resources to help you prepare a strong application.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline">Contact Support</Button>
          <Button>View Resources</Button>
        </div>
      </div>
    </div>
  )
}

