"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RelativeMotionQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "আপেক্ষিক গতি কী?",
      options: [
        "একটি বস্তুর নিজস্ব গতি",
        "একটি বস্তুর গতি অন্য বস্তুর তুলনায়",
        "মাধ্যাকর্ষণের কারণে গতি",
        "ধ্রুব ত্বরণের গতি"
      ],
      correct: 1
    },
    {
      question: "আপেক্ষিক বেগের সূত্র (1D) কী?",
      options: [
        "v_AB = v_A + v_B",
        "v_AB = v_A - v_B",
        "v_AB = v_A × v_B",
        "v_AB = v_A ÷ v_B"
      ],
      correct: 1
    },
    {
      question: "রেফারেন্স ফ্রেম কী?",
      options: [
        "গতির দিক",
        "পর্যবেক্ষণের দৃষ্টিকোণ",
        "বস্তুর ভর",
        "গতির ত্বরণ"
      ],
      correct: 1
    }
  ] : [
    {
      question: "What is relative motion?",
      options: [
        "The motion of an object in isolation",
        "The motion of an object with respect to another",
        "Motion due to gravity",
        "Motion with constant acceleration"
      ],
      correct: 1
    },
    {
      question: "What is the formula for relative velocity in 1D?",
      options: [
        "v_AB = v_A + v_B",
        "v_AB = v_A - v_B",
        "v_AB = v_A × v_B",
        "v_AB = v_A ÷ v_B"
      ],
      correct: 1
    },
    {
      question: "What is a reference frame?",
      options: [
        "The direction of motion",
        "The perspective of observation",
        "The mass of an object",
        "The acceleration of motion"
      ],
      correct: 1
    }
  ]

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            {lang === "bn" ? "আপেক্ষিক গতি কুইজ" : "Relative Motion Quiz"}
          </h3>
          {showResult ? (
            <div>
              <p className="text-lg">
                {lang === "bn"
                  ? `আপনার স্কোর: ${score}/${questions.length}`
                  : `Your score: ${score}/${questions.length}`}
              </p>
              <Button onClick={resetQuiz} className="mt-2">
                {lang === "bn" ? "পুনরায় শুরু করুন" : "Restart Quiz"}
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">
                {lang === "bn" ? `প্রশ্ন ${currentQuestion + 1}: ${questions[currentQuestion].question}` : `Question ${currentQuestion + 1}: ${questions[currentQuestion].question}`}
              </p>
              <div className="space-y-2 mt-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>
              English
            </Button>
            <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}