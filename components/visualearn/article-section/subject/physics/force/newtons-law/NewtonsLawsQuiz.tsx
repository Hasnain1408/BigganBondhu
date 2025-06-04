"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NewtonsLawsQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "নিউটনের প্রথম সূত্র কী বোঝায়?",
      options: [
        "F = ma",
        "কোনো বস্তু স্থির থাকে বা অভিন্ন গতিতে থাকে যদি কোনো বাহ্যিক বল না থাকে।",
        "প্রতিটি ক্রিয়ার জন্য সমান ও বিপরীত প্রতিক্রিয়া থাকে।",
        "বেগের পরিবর্তনের হার",
      ],
      answer: 1,
    },
    {
      question: "নিউটনের দ্বিতীয় সূত্রের সূত্র কী?",
      options: [
        "v = u + at",
        "F = ma",
        "s = ut + ½at²",
        "a = F/m²",
      ],
      answer: 1,
    },
    {
      question: "নিউটনের তৃতীয় সূত্র অনুসারে কী ঘটে?",
      options: [
        "বস্তু স্থির থাকে।",
        "বেগ পরিবর্তন হয়।",
        "প্রতিটি ক্রিয়ার জন্য সমান ও বিপরীত প্রতিক্রিয়া থাকে।",
        "ত্বরণ শূন্য হয়।",
      ],
      answer: 2,
    },
  ] : [
    {
      question: "What does Newton's First Law describe?",
      options: [
        "F = ma",
        "An object remains at rest or in uniform motion unless acted upon by an external force.",
        "For every action, there is an equal and opposite reaction.",
        "Rate of change of velocity",
      ],
      answer: 1,
    },
    {
      question: "What is the formula for Newton's Second Law?",
      options: [
        "v = u + at",
        "F = ma",
        "s = ut + ½at²",
        "a = F/m²",
      ],
      answer: 1,
    },
    {
      question: "What happens according to Newton's Third Law?",
      options: [
        "An object remains at rest.",
        "Velocity changes.",
        "For every action, there is an equal and opposite reaction.",
        "Acceleration becomes zero.",
      ],
      answer: 2,
    },
  ]

  const handleSubmit = () => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
    setSelected(null)
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
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {showResult ? (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">
              {lang === "bn" ? "কুইজ সম্পন্ন!" : "Quiz Completed!"}
            </h2>
            <p>
              {lang === "bn"
                ? `আপনার স্কোর: ${score}/${questions.length}`
                : `Your Score: ${score}/${questions.length}`}
            </p>
            <Button onClick={handleRestart}>
              {lang === "bn" ? "পুনরায় শুরু করুন" : "Restart Quiz"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              {lang === "bn"
                ? `প্রশ্ন ${currentQuestion + 1}: ${questions[currentQuestion].question}`
                : `Question ${currentQuestion + 1}: ${questions[currentQuestion].question}`}
            </h2>
            <RadioGroup
              value={selected?.toString()}
              onValueChange={(val) => setSelected(parseInt(val))}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button onClick={handleSubmit} disabled={selected === null}>
              {lang === "bn" ? "জমা দিন" : "Submit"}
            </Button>
          </div>
        )}

        <div className="mt-4 border-t pt-4">
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