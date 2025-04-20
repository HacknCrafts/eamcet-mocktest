"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Clock, FileText, Home, LogOut, Menu, Plus, Search, Settings, User, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("tests")

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
                <Link href="/admin-dashboard" className="flex items-center gap-2 font-semibold">
                  <span className="text-primary">EduTest Admin</span>
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
                  href="/admin-dashboard"
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
                  Tests
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary"
                >
                  <Users className="h-5 w-5" />
                  Students
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary"
                >
                  <Clock className="h-5 w-5" />
                  Timer Settings
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
        <Link href="/admin-dashboard" className="flex items-center gap-2 font-semibold md:hidden">
          <span className="text-primary">EduTest Admin</span>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link href="/admin-dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-xl">EduTest Admin</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/admin-dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Tests
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Students
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Timer Settings
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
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage tests, students, and settings</p>
            </div>
            <div className="flex items-center gap-2">
              <form className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-64 rounded-lg bg-background pl-8 md:w-80" />
                </div>
              </form>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Test
              </Button>
            </div>
          </div>
          <Tabs defaultValue="tests" className="mt-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tests" className="mt-6">
              <TestManagement />
            </TabsContent>
            <TabsContent value="students" className="mt-6">
              <StudentManagement />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <TimerSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function TestManagement() {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-semibold">Create New Test</h3>
          <p className="text-sm text-muted-foreground">Set up a new test with questions and answers</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="test-name">Test Name</Label>
              <Input id="test-name" placeholder="Enter test name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-duration">Duration (minutes)</Label>
              <Input id="test-duration" type="number" placeholder="60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-subject">Subject</Label>
              <Input id="test-subject" placeholder="e.g. Mathematics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-date">Test Date</Label>
              <Input id="test-date" type="date" />
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-medium">Questions</h4>
            <div className="mt-2 rounded-lg border p-4">
              <div className="space-y-2">
                <Label htmlFor="question-1">Question 1</Label>
                <Input id="question-1" placeholder="Enter your question" />
              </div>
              <div className="mt-2 space-y-2">
                <Label>Answer Options</Label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Option A" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Option B" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Option C" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Option D" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                <Label htmlFor="correct-answer">Correct Answer</Label>
                <Input id="correct-answer" placeholder="Enter correct answer" />
              </div>
            </div>
            <Button className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Save Test</Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-semibold">Existing Tests</h3>
          <p className="text-sm text-muted-foreground">Manage your created tests</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((test) => (
              <div key={test} className="rounded-lg border p-4">
                <h4 className="font-medium">Mathematics Test {test}</h4>
                <p className="text-sm text-muted-foreground">30 questions • 60 minutes</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm">Created: 2023-04-{test * 5}</span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentManagement() {
  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold">Student Management</h3>
        <p className="text-sm text-muted-foreground">Add and manage students</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-64 rounded-lg bg-background pl-8 md:w-80"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Tests Taken</th>
                <th className="px-4 py-3 text-left font-medium">Average Score</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John Doe", email: "john@example.com", tests: 5, score: "85%" },
                { name: "Jane Smith", email: "jane@example.com", tests: 3, score: "92%" },
                { name: "Bob Johnson", email: "bob@example.com", tests: 7, score: "78%" },
                { name: "Alice Brown", email: "alice@example.com", tests: 2, score: "90%" },
                { name: "Charlie Davis", email: "charlie@example.com", tests: 4, score: "82%" },
              ].map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.tests}</td>
                  <td className="px-4 py-3">{student.score}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
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

function TimerSettings() {
  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold">Timer Settings</h3>
        <p className="text-sm text-muted-foreground">Configure default timer settings for tests</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="default-duration">Default Test Duration (minutes)</Label>
            <Input id="default-duration" type="number" placeholder="60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warning-time">Warning Time (minutes before end)</Label>
            <Input id="warning-time" type="number" placeholder="10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="auto-submit">Auto Submit</Label>
            <select id="auto-submit" className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-extension">Allow Time Extension</Label>
            <select id="time-extension" className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  )
}

import { Label } from "@/components/ui/label"
