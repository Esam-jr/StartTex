"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, ChevronRight, Rocket, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function StartupCallPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [progress, setProgress] = useState(25)

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
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Application Progress: {progress}%</span>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Startup Application</h1>
        </div>
        <p className="mt-2 text-center text-muted-foreground">
          Submit your startup details to connect with potential investors
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8 w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Company Details</TabsTrigger>
          <TabsTrigger value="pitch">Pitch Deck</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="review">Review & Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Provide basic information about your startup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Enter your company name" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input id="founded" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea id="description" placeholder="Describe your company, mission, and vision" rows={5} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="team-size">Team Size</Label>
                <Select>
                  <SelectTrigger id="team-size">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 employees</SelectItem>
                    <SelectItem value="6-10">6-10 employees</SelectItem>
                    <SelectItem value="11-25">11-25 employees</SelectItem>
                    <SelectItem value="26-50">26-50 employees</SelectItem>
                    <SelectItem value="51+">51+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Headquarters Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button
                onClick={() => {
                  setActiveTab("pitch")
                  setProgress(50)
                }}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pitch" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pitch Deck</CardTitle>
              <CardDescription>Upload your pitch deck and provide key information about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-dashed p-10">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Drag & drop your pitch deck</p>
                    <p className="text-sm text-muted-foreground">Supports PDF, PPT, or PPTX (max 20MB)</p>
                  </div>
                  <Button variant="outline">Browse Files</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="elevator-pitch">Elevator Pitch</Label>
                <Textarea id="elevator-pitch" placeholder="Describe your product in 1-2 sentences" rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="problem">Problem Statement</Label>
                <Textarea id="problem" placeholder="What problem are you solving?" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solution</Label>
                <Textarea id="solution" placeholder="How does your product solve this problem?" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-market">Target Market</Label>
                <Textarea id="target-market" placeholder="Describe your target customers and market size" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitive-advantage">Competitive Advantage</Label>
                <Textarea
                  id="competitive-advantage"
                  placeholder="What makes your solution unique compared to competitors?"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab("details")
                  setProgress(25)
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("financials")
                  setProgress(75)
                }}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Provide details about your funding needs and financial status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="funding-stage">Current Funding Stage</Label>
                  <Select>
                    <SelectTrigger id="funding-stage">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B</SelectItem>
                      <SelectItem value="series-c">Series C+</SelectItem>
                      <SelectItem value="profitable">Profitable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funding-raised">Total Funding Raised to Date</Label>
                  <Input id="funding-raised" placeholder="$0" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="funding-seeking">Funding Amount Seeking</Label>
                  <Input id="funding-seeking" placeholder="$0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valuation">Current Valuation</Label>
                  <Input id="valuation" placeholder="$0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue-model">Revenue Model</Label>
                <Textarea
                  id="revenue-model"
                  placeholder="Describe how your business makes or plans to make money"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-revenue">Current Monthly Revenue (if any)</Label>
                <Input id="current-revenue" placeholder="$0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="burn-rate">Monthly Burn Rate</Label>
                <Input id="burn-rate" placeholder="$0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="runway">Current Runway (months)</Label>
                <Input id="runway" type="number" placeholder="0" />
              </div>

              <div className="rounded-lg border border-dashed p-10">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Upload financial projections</p>
                    <p className="text-sm text-muted-foreground">Supports Excel, PDF (max 10MB)</p>
                  </div>
                  <Button variant="outline">Browse Files</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab("pitch")
                  setProgress(50)
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("review")
                  setProgress(100)
                }}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your application before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-muted/50 p-6">
                <h3 className="mb-4 text-lg font-medium">Application Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                      <p>TechNova Solutions</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Industry</p>
                      <p>Technology</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company Description</p>
                    <p className="text-sm">
                      TechNova is a cutting-edge AI platform that helps businesses automate customer service operations
                      through natural language processing and machine learning.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Funding Stage</p>
                      <p>Seed</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Funding Seeking</p>
                      <p>$1,500,000</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uploaded Documents</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Pitch Deck (TechNova_Pitch.pdf)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Financial Projections (TechNova_Financials.xlsx)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-medium">Terms & Conditions</h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4 text-sm">
                    <p>
                      By submitting this application, you agree to the StartTex Terms of Service and Privacy Policy. You
                      confirm that all information provided is accurate and complete to the best of your knowledge.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab("financials")
                  setProgress(75)
                }}
              >
                Previous
              </Button>
              <Button>Submit Application</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

