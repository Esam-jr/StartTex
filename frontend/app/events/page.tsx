"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronLeft, ChevronRight, Filter, Info, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("month")

  const events = [
    {
      id: 1,
      title: "Spring 2023 Call Info Session",
      description: "Learn about the Spring 2023 Innovation Challenge and get tips for a successful application.",
      date: "May 15, 2023",
      time: "2:00 PM - 3:30 PM",
      location: "Virtual (Zoom)",
      type: "Info Session",
      callId: 1,
    },
    {
      id: 2,
      title: "Pitch Deck Workshop",
      description: "Learn how to create a compelling pitch deck that will impress investors and reviewers.",
      date: "May 18, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "StartTex HQ, Floor 3",
      type: "Workshop",
      callId: null,
    },
    {
      id: 3,
      title: "Green Tech Accelerator Q&A",
      description: "Ask questions about the Green Tech Accelerator Program and meet the program managers.",
      date: "May 22, 2023",
      time: "3:00 PM - 4:00 PM",
      location: "Virtual (Zoom)",
      type: "Q&A",
      callId: 2,
    },
    {
      id: 4,
      title: "Financial Modeling for Startups",
      description: "Learn how to create financial projections and models for your startup application.",
      date: "May 25, 2023",
      time: "1:00 PM - 3:00 PM",
      location: "Innovation Center, Room 204",
      type: "Workshop",
      callId: null,
    },
    {
      id: 5,
      title: "Spring 2023 Call Application Deadline",
      description: "Last day to submit applications for the Spring 2023 Innovation Challenge.",
      date: "May 30, 2023",
      time: "11:59 PM",
      location: "Online",
      type: "Deadline",
      callId: 1,
    },
    {
      id: 6,
      title: "Reviewer Orientation Webinar",
      description: "Training session for reviewers participating in the upcoming evaluation rounds.",
      date: "June 2, 2023",
      time: "9:00 AM - 10:30 AM",
      location: "Virtual (Zoom)",
      type: "Webinar",
      callId: null,
    },
  ]

  const eventTypes = [
    { value: "all", label: "All Events" },
    { value: "info-session", label: "Info Sessions" },
    { value: "workshop", label: "Workshops" },
    { value: "qa", label: "Q&A Sessions" },
    { value: "deadline", label: "Deadlines" },
    { value: "webinar", label: "Webinars" },
  ]

  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "info session":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "workshop":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "q&a":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "deadline":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "webinar":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container mx-auto py-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Event Calendar</h1>
        <p className="text-muted-foreground max-w-2xl">
          Stay up-to-date with all StartTex events, including info sessions, workshops, deadlines, and more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Related Call" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Calls</SelectItem>
              <SelectItem value="1">Spring 2023 Innovation Challenge</SelectItem>
              <SelectItem value="2">Green Tech Accelerator Program</SelectItem>
              <SelectItem value="3">EdTech Transformation Initiative</SelectItem>
              <SelectItem value="4">FinTech Revolution Program</SelectItem>
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
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

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
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="list">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {event.date} • {event.time}
                      </CardDescription>
                    </div>
                    <Badge className={cn(getBadgeColor(event.type))}>{event.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{event.location}</span>
                  </div>

                  {event.callId && (
                    <div className="mt-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                        Related to: Spring 2023 Innovation Challenge
                      </Badge>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-3">
                  <Button asChild className="w-full">
                    <Link href={`/events/${event.id}`}>{event.type === "Deadline" ? "View Details" : "Register"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>May 2023</CardTitle>
              <CardDescription>
                {view === "month" && "Monthly view of all events"}
                {view === "week" && "Weekly view from May 15 - May 21, 2023"}
                {view === "day" && "Daily view for May 15, 2023"}
              </CardDescription>
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
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 text-center">
        <h2 className="text-2xl font-bold mb-3">Never Miss an Event</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Subscribe to our calendar to stay updated with all events and deadlines. You can also export events to your
          preferred calendar application.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Subscribe to Calendar
          </Button>
          <Button>
            <Info className="mr-2 h-4 w-4" />
            Event Notifications
          </Button>
        </div>
      </div>
    </div>
  )
}

