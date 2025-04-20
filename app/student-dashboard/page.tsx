"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, FileText, Home, LogOut, Menu, Search, Settings, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/student-dashboard" className="flex items-center gap-2 font-semibold">
                  <span className="text-primary">EduTest Student</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" asChild>
                  <Link href="/">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Link>
                </Button>
              </div>
              <nav className="grid gap-2 px-2 py-4">
                <Link
                  href="/student-dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary"
                >
                  <FileText className="h-5 w-5" />
                  My Tests
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/student-dashboard" className="flex items-center gap-2 font-semibold md:hidden">
          <span className="text-primary">EduTest Student</span>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link href="/student-dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-xl">EduTest Student</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/student-dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              My Tests
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Results
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="/student.jpeg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid items-start gap-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
              <p className="text-muted-foreground">View and take your assigned tests</p>
            </div>
            <div className="flex items-center gap-2">
              <form className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search tests..."
                    className="w-64 rounded-lg border border-input bg-background px-3 py-2 pl-8 md:w-80"
                  />
                </div>
              </form>
            </div>
          </div>
          <Tabs defaultValue="dashboard" className="mt-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="tests">Available Tests</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mt-6">
              <StudentOverview />
            </TabsContent>
            <TabsContent value="tests" className="mt-6">
              <AvailableTests />
            </TabsContent>
            <TabsContent value="results" className="mt-6">
              <TestResults />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function StudentOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Upcoming Tests</CardTitle>
          <CardDescription>Tests scheduled for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Mathematics", date: "Tomorrow, 10:00 AM", duration: "60 min" },
              { name: "Science", date: "Apr 25, 2:00 PM", duration: "45 min" },
              { name: "History", date: "Apr 30, 9:00 AM", duration: "90 min" },
            ].map((test, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-muted-foreground">{test.date}</p>
                </div>
                <div className="text-sm text-muted-foreground">{test.duration}</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Tests
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Results</CardTitle>
          <CardDescription>Your latest test scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "English", score: 85, total: 100 },
              { name: "Geography", score: 92, total: 100 },
              { name: "Physics", score: 78, total: 100 },
            ].map((result, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{result.name}</p>
                  <p className="font-medium">
                    {result.score}/{result.total}
                  </p>
                </div>
                <Progress value={(result.score / result.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Results
          </Button>
        </CardFooter>
      </Card>
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your test performance statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Average Score</p>
                <p className="text-sm font-medium">85%</p>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Tests Completed</p>
                <p className="text-sm font-medium">12/15</p>
              </div>
              <Progress value={(12 / 15) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">On-time Completion</p>
                <p className="text-sm font-medium">95%</p>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Detailed Analytics
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function AvailableTests() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        { name: "Mathematics Test", questions: 30, duration: "60 min", deadline: "Apr 24, 2023" },
        { name: "Science Quiz", questions: 20, duration: "45 min", deadline: "Apr 25, 2023" },
        { name: "History Exam", questions: 40, duration: "90 min", deadline: "Apr 30, 2023" },
        { name: "English Assessment", questions: 25, duration: "60 min", deadline: "May 2, 2023" },
        { name: "Geography Test", questions: 35, duration: "75 min", deadline: "May 5, 2023" },
        { name: "Physics Quiz", questions: 15, duration: "30 min", deadline: "May 10, 2023" },
      ].map((test, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{test.name}</CardTitle>
            <CardDescription>
              {test.questions} questions • {test.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Deadline</span>
                <span className="text-sm font-medium">{test.deadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <span className="text-sm font-medium text-green-500">Available</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => (window.location.href = "/student-dashboard/test")}>
              Start Test
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function TestResults() {
  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold">Test Results</h3>
        <p className="text-sm text-muted-foreground">View your performance in completed tests</p>
        <div className="mt-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium">Test Name</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Score</th>
                <th className="px-4 py-3 text-left font-medium">Time Taken</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "English Assessment", date: "Apr 15, 2023", score: "85/100", time: "55 min" },
                { name: "Geography Test", date: "Apr 10, 2023", score: "92/100", time: "70 min" },
                { name: "Physics Quiz", date: "Apr 5, 2023", score: "78/100", time: "28 min" },
                { name: "Chemistry Test", date: "Mar 28, 2023", score: "88/100", time: "58 min" },
                { name: "Biology Exam", date: "Mar 20, 2023", score: "95/100", time: "85 min" },
              ].map((result, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{result.name}</td>
                  <td className="px-4 py-3">{result.date}</td>
                  <td className="px-4 py-3">{result.score}</td>
                  <td className="px-4 py-3">{result.time}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
