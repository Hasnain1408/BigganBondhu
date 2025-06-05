"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award } from "lucide-react"

export default function VectorBasicsQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "ভেক্টরের সংজ্ঞা কী?",
      options: [
        "শুধু মান থাকা রাশি",
        "মান এবং দিক উভয় থাকা রাশি",
        "শুধু দিক থাকা রাশি",
        "কোনো মান বা দিক নেই",
      ],
      answer: 1,
      explanation: "ভেক্টর হল এমন রাশি যার মান এবং দিক উভয়ই থাকে, যেমন স্থানচ্যুতি বা বেগ।"
    },
    {
      question: "দুটি ভেক্টর A = (3, 4) এবং B = (1, 2) এর যোগফল কত?",
      options: [
        "(2, 2)",
        "(4, 6)",
        "(3, 2)",
        "(5, 6)",
      ],
      answer: 1,
      explanation: "ভেক্টর যোগের জন্য, উপাংশ যোগ করা হয়: A + B = (3+1, 4+2) = (4, 6)।"
    },
    {
      question: "একটি ভেক্টর A = (3, 4) এর মান কত?",
      options: [
        "5",
        "7",
        "12",
        "25",
      ],
      answer: 0,
      explanation: "ভেক্টরের মান |A| = √(Ax² + Ay²) = √(3² + 4²) = √(9 + 16) = √25 = 5।"
    },
    {
      question: "ডট প্রোডাক্টের ফলাফল কী ধরনের রাশি?",
      options: [
        "ভেক্টর",
        "স্কেলার",
        "ম্যাট্রিক্স",
        "কোনোটিই নয়",
      ],
      answer: 1,
      explanation: "ডট প্রোডাক্ট A·B = AxBx + AyBy একটি স্কেলার ফলাফল দেয়।"
    },
    {
      question: "একক ভেক্টরের মান কত?",
      options: [
        "0",
        "1",
        "2",
        "অনির্দিষ্ট",
      ],
      answer: 1,
      explanation: "একক ভেক্টরের মান সর্বদা ১, এবং এটি একটি নির্দিষ্ট দিক নির্দেশ করে।"
    }
  ] : [
    {
      question: "What is the definition of a vector?",
      options: [
        "A quantity with magnitude only",
        "A quantity with both magnitude and direction",
        "A quantity with direction only",
        "A quantity with neither magnitude nor direction",
      ],
      answer: 1,
      explanation: "A vector is a quantity with both magnitude and direction, such as displacement or velocity."
    },
    {
      question: "What is the sum of vectors A = (3, 4) and B = (1, 2)?",
      options: [
        "(2, 2)",
        "(4, 6)",
        "(3, 2)",
        "(5, 6)",
      ],
      answer: 1,
      explanation: "For vector addition, components are summed: A + B = (3+1, 4+2) = (4, 6)."
    },
    {
      question: "What is the magnitude of vector A = (3, 4)?",
      options: [
        "5",
        "7",
        "12",
        "25",
      ],
      answer: 0,
      explanation: "The magnitude of a vector is |A| = √(Ax² + Ay²) = √(3² + 4²) = √(9 + 16) = √25 = 5."
    },
    {
      question: "What type of quantity is the dot product?",
      options: [
        "Vector",
        "Scalar",
        "Matrix",
        "None of these",
      ],
      answer: 1,
      explanation: "The dot product A·B = AxBx + AyBy results in a scalar quantity."
    },
    {
      question: "What is the magnitude of a unit vector?",
      options: [
        "0",
        "1",
        "2",
        "Undefined",
      ],
      answer: 1,
      explanation: "A unit vector always has a magnitude of 1 and points in a specific direction."
    }
  ]

  const handleSubmit = () => {
    const isCorrect = selected === questions[currentQuestion].answer
    if (isCorrect) {
      setScore(score + 1)
    }

    setAnsweredQuestions(prev => {
      const newAnswered = [...prev]
      newAnswered[currentQuestion] = isCorrect
      return newAnswered
    })

    setShowExplanation(true)
  }

  const handleNext = () => {
    setSelected(null)
    setShowExplanation(false)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
    setAnsweredQuestions([])
    setShowExplanation(false)
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (lang === "bn") {
      if (percentage >= 80) return "চমৎকার! আপনি ভেক্টরের মৌলিক বিষয় সম্পর্কে খুবই ভালো ধারণা রাখেন।"
      if (percentage >= 60) return "ভালো! আরো একটু অনুশীলন করলে আরও ভালো হবে।"
      return "আরো অধ্যয়ন প্রয়োজন। বিষয়টি আবার পড়ে দেখুন।"
    } else {
      if (percentage >= 80) return "Excellent! You have a great understanding of vector basics."
      if (percentage >= 60) return "Good! A little more practice will help you improve."
      return "More study needed. Review the topic again."
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {showResult ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Award className={`h-16 w-16 ${getScoreColor()}`} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">
                {lang === "bn" ? "কুইজ সম্পন্ন!" : "Quiz Completed!"}
              </h2>
              <p className={`text-xl font-semibold ${getScoreColor()}`}>
                {lang === "bn"
                  ? `আপনার স্কোর: ${score}/${questions.length}`
                  : `Your Score: ${score}/${questions.length}`}
              </p>
              <p className="text-lg mt-2">
                {((score / questions.length) * 100).toFixed(0)}%
              </p>
            </div>

            <p className="text-muted-foreground max-w-md mx-auto">
              {getScoreMessage()}
            </p>

            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              {answeredQuestions.map((isCorrect, index) => (
                <div key={index} className="flex justify-center">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              ))}
            </div>

            <Button onClick={handleRestart} size="lg">
              {lang === "bn" ? "পুনরায় শুরু করুন" : "Restart Quiz"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {lang === "bn"
                  ? `প্রশ্ন ${currentQuestion + 1} এর ${questions.length}`
                  : `Question ${currentQuestion + 1} of ${questions.length}`}
              </div>
              <div className="text-sm text-muted-foreground">
                {lang === "bn" ? `স্কোর: ${score}` : `Score: ${score}`}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {questions[currentQuestion].question}
              </h2>

              <RadioGroup
                value={selected?.toString()}
                onValueChange={(val) => setSelected(parseInt(val))}
                disabled={showExplanation}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className={showExplanation ? (
                        index === questions[currentQuestion].answer
                          ? "border-green-500"
                          : index === selected
                            ? "border-red-500"
                            : ""
                      ) : ""}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`flex-1 cursor-pointer ${
                        showExplanation ? (
                          index === questions[currentQuestion].answer
                            ? "text-green-600 font-medium"
                            : index === selected
                              ? "text-red-600"
                              : ""
                        ) : ""
                      }`}
                    >
                      {option}
                      {showExplanation && index === questions[currentQuestion].answer && (
                        <CheckCircle className="inline h-4 w-4 ml-2 text-green-500" />
                      )}
                      {showExplanation && index === selected && index !== questions[currentQuestion].answer && (
                        <XCircle className="inline h-4 w-4 ml-2 text-red-500" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showExplanation && (
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    {lang === "bn" ? "ব্যাখ্যা:" : "Explanation:"}
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    {questions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {!showExplanation ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selected === null}
                    className="flex-1"
                  >
                    {lang === "bn" ? "জমা দিন" : "Submit"}
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="flex-1">
                    {currentQuestion + 1 < questions.length
                      ? (lang === "bn" ? "পরবর্তী প্রশ্ন" : "Next Question")
                      : (lang === "bn" ? "ফলাফল দেখুন" : "See Results")
                    }
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-medium">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant={lang === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button
              variant={lang === "bn" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("bn")}
            >
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}