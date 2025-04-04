"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GlobalCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("month")

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Spring 2023 Call Application Opens",
      date: "May 1, 2023",
      type: "Call Date",
      audience: "Entrepreneurs",
      color: "blue",
    },
    {
      id: 2,
      title: "Pitch Deck Workshop",
      date: "May 18, 2023",
      type: "Workshop",
      audience: "Entrepreneurs",
      color: "purple",
    },
    {
      id: 3,
      title: "Spring 2023 Call Application Deadline",
      date: "May 30, 2023",
      type: "Deadline",
      audience: "Entrepreneurs",
      color: "red",
    },
    {
      id: 4,
      title: "Reviewer Orientation Webinar",
      date: "June 2, 2023",
      type: "Webinar",
      audience: "Reviewers",
      color: "amber",
    },
    {
      id: 5,
      title: "Sponsor Networking Breakfast",
      date: "June 5, 2023",
      type: "Networking",
      audience: "Sponsors",
      color: "green",
    },
    {
      id: 6,
      title: "Spring 2023 Call Review Period Begins",
      date: "June 1, 2023",
      type: "Call Date",
      audience: "Reviewers",
      color: "blue",
    },
    {
      id: 7,
      title: "Healthcare Innovation Demo Day",
      date: "May 20, 2023",
      type: "Demo Day",
      audience: "All",
      color: "indigo",
    },
    {
      id: 8,
      title: "Spring 2023 Call Results Announcement",
      date: "July 15, 2023",
      type: "Announcement",
      audience: "All",
      color: "cyan",
    },
    {
      id: 9,
      title: "Green Tech Accelerator Application Opens",
      date: "June 15, 2023",
      type: "Call Date",
      audience: "Entrepreneurs",
      color: "blue",
    },
    {
      id: 10,
      title: "Financial Modeling for Startups",
      date: "May 25, 2023",
      type: "Workshop",
      audience: "Entrepreneurs",
      color: "purple",
    },
  ]

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "purple":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "red":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "amber":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "green":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "indigo":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
      case "cyan":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container mx-auto py-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Global Event Calendar</h1>
        <p className="text-muted-foreground max-w-2xl">
          Stay up-to-date with all StartTex events, including call dates, deadlines, workshops, and announcements.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Event Types</SelectItem>
              <SelectItem value="call">Call Dates</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="webinar">Webinars</SelectItem>
              <SelectItem value="demo">Demo Days</SelectItem>
              <SelectItem value="announcement">Announcements</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Audiences</SelectItem>
              <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
              <SelectItem value="sponsors">Sponsors</SelectItem>
              <SelectItem value="reviewers">Reviewers</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Calendar
          </Button>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="list">List</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>May 2023</CardTitle>
                <CardDescription>
                  {view === "month" && "Monthly view of all events"}
                  {view === "week" && "Weekly view from May 15 - May 21, 2023"}
                  {view === "day" && "Daily view for May 15, 2023"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] w-full rounded-lg border bg-muted/40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">Calendar View</p>
                  <p className="text-sm text-muted-foreground">
                    A detailed calendar view would be displayed here, showing events in a {view} format.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800">Call Dates</Badge>
                <Badge className="bg-red-100 text-red-800">Deadlines</Badge>
                <Badge className="bg-purple-100 text-purple-800">Workshops</Badge>
                <Badge className="bg-amber-100 text-amber-800">Webinars</Badge>
                <Badge className="bg-indigo-100 text-indigo-800">Demo Days</Badge>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>All scheduled events in chronological order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${getBadgeColor(event.color).replace("hover:bg-", "bg-")}`}
                    >
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getBadgeColor(event.color)}>{event.type}</Badge>
                          <Badge variant="outline">For: {event.audience}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More Events
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
              <CardDescription>Visual timeline of all upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] w-full rounded-lg border bg-muted/40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">Timeline View</p>
                  <p className="text-sm text-muted-foreground">
                    A visual timeline of events would be displayed here, showing the progression of events over time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 text-center">
        <h2 className="text-2xl font-bold mb-3">Subscribe to Our Calendar</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Never miss an important date or event. Subscribe to our calendar to receive automatic updates and reminders
          for all StartTex events.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Google Calendar
          </Button>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Apple Calendar
          </Button>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Outlook
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download iCal File
          </Button>
        </div>
      </div>
    </div>
  )
}

