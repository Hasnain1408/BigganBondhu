"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ProjectileMotionQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "প্রজেক্টাইলের ব্যাপ্তির সূত্র কী?",
      options: [
        "R = (v₀² * sin(2θ)) / g",
        "R = v₀ * t",
        "R = (v₀ * sinθ) / g",
        "R = (2 * v₀ * cosθ) / g",
      ],
      answer: 0,
    },
    {
      question: "কোন কোণে প্রজেক্টাইলের ব্যাপ্তি সর্বাধিক হয়?",
      options: ["৩০°", "৪৫°", "৬০°", "৯০°"],
      answer: 1,
    },
    {
      question: "ট্রাজেক্টরির সর্বোচ্চ বিন্দুতে উল্লম্ব বেগ কত?",
      options: [
        "সর্বাধিক",
        "শূন্য",
        "প্রাথমিক উল্লম্ব বেগের সমান",
        "মাধ্যাকর্ষণের সমান",
      ],
      answer: 1,
    },
  ] : [
    {
      question: "What is the formula for the range of a projectile?",
      options: [
        "R = (v₀² * sin(2θ)) / g",
        "R = v₀ * t",
        "R = (v₀ * sinθ) / g",
        "R = (2 * v₀ * cosθ) / g",
      ],
      answer: 0,
    },
    {
      question: "At what angle is the range of a projectile maximized?",
      options: ["30°", "45°", "60°", "90°"],
      answer: 1,
    },
    {
      question: "What is the vertical velocity at the highest point of the trajectory?",
      options: [
        "Maximum",
        "Zero",
        "Equal to initial vertical velocity",
        "Equal to gravity",
      ],
      answer: 1,
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