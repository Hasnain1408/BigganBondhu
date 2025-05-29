"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuizQuestion {
  question: string
  options: string[]
  answerIndex: number
}

const quizData: Record<"en" | "bn", QuizQuestion[]> = {
  en: [
    {
      question: "What type of friction prevents a stationary object from moving?",
      options: ["Static Friction", "Kinetic Friction", "Rolling Friction", "Fluid Friction"],
      answerIndex: 0,
    },
    {
      question: "Which factor affects the coefficient of friction?",
      options: ["Mass of object", "Speed of object", "Nature of surfaces", "Gravitational force"],
      answerIndex: 2,
    },
    {
      question: "What is the formula for frictional force?",
      options: ["F = ma", "F = μN", "F = mv²/r", "F = kx"],
      answerIndex: 1,
    },
  ],
  bn: [
    {
      question: "কোন ধরণের ঘর্ষণ একটি স্থির বস্তুকে চলাচল করতে বাধা দেয়?",
      options: ["স্থিতিঘর্ষণ", "গতিঘর্ষণ", "গড়াল ঘর্ষণ", "দ্রব ঘর্ষণ"],
      answerIndex: 0,
    },
    {
      question: "ঘর্ষণ গুণাঙ্ক কোন উপাদানের উপর নির্ভর করে?",
      options: ["বস্তুর ভর", "বস্তুর গতি", "পৃষ্ঠের প্রকৃতি", "মাধ্যাকর্ষণ বল"],
      answerIndex: 2,
    },
    {
      question: "ঘর্ষণ বলের সূত্র কী?",
      options: ["F = ma", "F = μN", "F = mv²/r", "F = kx"],
      answerIndex: 1,
    },
  ],
}

export default function FrictionQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = quizData[lang]

  const handleOptionSelect = (qIndex: number, optionIndex: number) => {
    const updated = [...selectedAnswers]
    updated[qIndex] = optionIndex
    setSelectedAnswers(updated)
  }

  const score = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.answerIndex ? 1 : 0)
  }, 0)

  return (
    <Card className="mt-8">
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {lang === "bn" ? "ঘর্ষণ কুইজ" : "Friction Quiz"}
          </h3>
          <div className="flex gap-2">
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

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="space-y-2">
            <p className="font-medium">
              {qIndex + 1}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, optIndex) => (
                <Button
                  key={optIndex}
                  variant={
                    showResults
                      ? optIndex === q.answerIndex
                        ? "default"
                        : optIndex === selectedAnswers[qIndex]
                        ? "destructive"
                        : "outline"
                      : selectedAnswers[qIndex] === optIndex
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleOptionSelect(qIndex, optIndex)}
                  disabled={showResults}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {!showResults ? (
          <Button
            onClick={() => setShowResults(true)}
            className="mt-4"
            disabled={selectedAnswers.length !== questions.length}
          >
            {lang === "bn" ? "জমা দিন" : "Submit"}
          </Button>
        ) : (
          <p className="text-sm font-medium mt-4">
            {lang === "bn"
              ? `আপনার স্কোর: ${score}/${questions.length}`
              : `Your score: ${score}/${questions.length}`}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
