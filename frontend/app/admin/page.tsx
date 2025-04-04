import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  Rocket,
  Star,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the StartTex Admin Dashboard. Here's an overview of your system.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Startup Calls</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                3 closing this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submitted Ideas</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                24 pending review
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Ideas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                +8 this month
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                +32 this week
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
            <DollarSign className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200">
                5 new this month
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Funds Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-200">
                68% of total budget
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Star className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                12 overdue
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Review Time</CardTitle>
            <Clock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <div className="flex items-center text-xs">
              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                -0.8 days from last month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Startup Call Management Panel */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Startup Call Management</CardTitle>
            <CardDescription>Overview of active and upcoming startup calls</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Spring 2023 Startup Call</p>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>32 submissions</p>
                        <p>Closes in 14 days</p>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Fall 2023 Startup Call</p>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>Budget: $500,000</p>
                        <p>Starts in 45 days</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="closed" className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Calendar className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Winter 2022 Startup Call</p>
                        <Badge variant="secondary">Closed</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>48 submissions, 18 approved</p>
                        <p>Closed on Feb 28, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create New Startup Call</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">New startup submission: TechNova</p>
                    <p className="text-xs text-muted-foreground">Submitted to Spring 2023 Call</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Startup Idea Submissions Panel */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest startup idea submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">AI Solutions Inc.</p>
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Submitted 3 days ago</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Submissions
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Status</CardTitle>
            <CardDescription>Reviewer assignment and completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">EcoTech Solutions</p>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        2/3 Complete
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="text-xs text-muted-foreground">John Doe - Completed</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="text-xs text-muted-foreground">Jane Smith - Completed</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <p className="text-xs text-muted-foreground">Mark Wilson - Pending</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Manage Reviewers
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Analytics Section */}
      <Card>
        <CardHeader>
          <CardTitle>System Analytics</CardTitle>
          <CardDescription>Key performance metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full rounded-lg border bg-muted/40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <BarChart3 className="h-10 w-10 text-muted-foreground" />
              <p className="font-medium">Analytics Dashboard</p>
              <p className="text-sm text-muted-foreground">Detailed charts and metrics would appear here</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Export Report</Button>
          <Button>View Detailed Analytics</Button>
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
                <FileText className="h-5 w-5" />
                <span className="text-xs">New Call</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <Users className="h-5 w-5" />
                <span className="text-xs">Add User</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <Star className="h-5 w-5" />
                <span className="text-xs">Assign Review</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center">
                <HelpCircle className="h-5 w-5" />
                <span className="text-xs">Help</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-1 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Healthy
                  </Badge>
                </div>
                <Progress value={92} className="h-2" />
                <span className="text-xs text-muted-foreground">92% capacity</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Operational
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
                <span className="text-xs text-muted-foreground">100% uptime</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                    Warning
                  </Badge>
                </div>
                <Progress value={78} className="h-2" />
                <span className="text-xs text-muted-foreground">78% available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

