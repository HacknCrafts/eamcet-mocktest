"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [questionStatus, setQuestionStatus] = useState<Record<number, string>>({})

  // Sample test data
  const testData = {
    title: "Mathematics Test",
    questions: [
      {
        id: 1,
        text: "What is the value of x in the equation 2x + 5 = 15?",
        type: "multiple-choice",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 3"],
      },
      {
        id: 2,
        text: "Solve for y: 3y - 8 = 10",
        type: "multiple-choice",
        options: ["y = 6", "y = 18", "y = 6.67", "y = 9"],
      },
      {
        id: 3,
        text: "What is the area of a circle with radius 4 units?",
        type: "multiple-choice",
        options: ["16π square units", "8π square units", "4π square units", "12π square units"],
      },
      {
        id: 4,
        text: "Simplify the expression: 3(2x - 4) + 5x",
        type: "multiple-choice",
        options: ["11x - 12", "6x - 12", "11x - 4", "6x - 4"],
      },
      {
        id: 5,
        text: "Explain the Pythagorean theorem and provide an example of its application.",
        type: "text",
      },
      {
        id: 6,
        text: "What is the derivative of f(x) = x² + 3x - 5?",
        type: "multiple-choice",
        options: ["f'(x) = 2x + 3", "f'(x) = x² + 3", "f'(x) = 2x", "f'(x) = 2x - 5"],
      },
      {
        id: 7,
        text: "Solve the inequality: 2x - 5 > 7",
        type: "multiple-choice",
        options: ["x > 6", "x > 5", "x > 4", "x > 3"],
      },
      {
        id: 8,
        text: "What is the value of sin(30°)?",
        type: "multiple-choice",
        options: ["0.5", "0.866", "0", "1"],
      },
      {
        id: 9,
        text: "Describe the relationship between the radius and diameter of a circle.",
        type: "text",
      },
      {
        id: 10,
        text: "If a triangle has sides of lengths 3, 4, and 5 units, what type of triangle is it?",
        type: "multiple-choice",
        options: ["Right triangle", "Equilateral triangle", "Isosceles triangle", "Scalene triangle"],
      },
    ],
  }

  // Initialize question status
  useEffect(() => {
    const initialStatus: Record<number, string> = {}
    testData.questions.forEach((q) => {
      initialStatus[q.id] = "not-viewed"
    })
    initialStatus[1] = "current" // First question is current
    setQuestionStatus(initialStatus)
  }, [])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [testData.questions[currentQuestion].id]: value,
    }))

    setQuestionStatus((prev) => ({
      ...prev,
      [testData.questions[currentQuestion].id]: "attempted",
    }))
  }

  const handleTextAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [testData.questions[currentQuestion].id]: e.target.value,
    }))

    if (e.target.value.trim() !== "") {
      setQuestionStatus((prev) => ({
        ...prev,
        [testData.questions[currentQuestion].id]: "attempted",
      }))
    }
  }

  const navigateToQuestion = (index: number) => {
    // Mark previous question as viewed if not attempted
    if (questionStatus[testData.questions[currentQuestion].id] === "current") {
      setQuestionStatus((prev) => ({
        ...prev,
        [testData.questions[currentQuestion].id]: answers[testData.questions[currentQuestion].id]
          ? "attempted"
          : "viewed",
      }))
    }

    // Set new current question
    setCurrentQuestion(index)
    setQuestionStatus((prev) => ({
      ...prev,
      [testData.questions[index].id]: "current",
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < testData.questions.length - 1) {
      navigateToQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      navigateToQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    // In a real app, you would submit the answers to the server
    alert("Test submitted successfully!")
    router.push("/student-dashboard")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attempted":
        return "bg-green-500 text-white"
      case "current":
        return "bg-blue-500 text-white"
      case "viewed":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-300 text-gray-700"
    }
  }

  const currentQ = testData.questions[currentQuestion]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{testData.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <Button variant="destructive" onClick={handleSubmitTest}>
            Submit Test
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Question navigation sidebar */}
        <div className="w-full border-b bg-muted p-4 md:w-64 md:border-b-0 md:border-r md:p-6">
          <h2 className="mb-4 font-semibold">Questions</h2>
          <div className="grid grid-cols-5 gap-2 md:grid-cols-3">
            {testData.questions.map((question, index) => (
              <button
                key={question.id}
                className={`flex h-10 w-10 items-center justify-center rounded-md font-medium ${getStatusColor(
                  questionStatus[question.id],
                )}`}
                onClick={() => navigateToQuestion(index)}
              >
                {question.id}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Attempted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Viewed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-300"></div>
              <span className="text-sm">Not Viewed</span>
            </div>
          </div>
        </div>
        {/* Question content */}
        <div className="flex-1 p-4 md:p-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium">
                  Question {currentQ.id} of {testData.questions.length}
                </h3>
                <p className="mt-2 text-lg">{currentQ.text}</p>
              </div>
              {currentQ.type === "multiple-choice" ? (
                <RadioGroup value={answers[currentQ.id] || ""} onValueChange={handleAnswerChange} className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="answer">Your Answer</Label>
                  <Textarea
                    id="answer"
                    placeholder="Type your answer here..."
                    className="min-h-[150px]"
                    value={answers[currentQ.id] || ""}
                    onChange={handleTextAnswerChange}
                  />
                </div>
              )}
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === testData.questions.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
