"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function KinematicsQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "কাইনেমেটিক্সে স্থানচ্যুতি কী?",
      options: [
        "বস্তুর ভর",
        "বস্তুর অবস্থানের পরিবর্তন",
        "বস্তুর উপর বল",
        "বস্তুর ত্বরণ",
      ],
      answer: 1,
    },
    {
      question: "নিম্নলিখিত কোন সূত্রটি বেগের জন্য সঠিক?",
      options: [
        "v = u + at",
        "v = s/t",
        "v = u + ½at²",
        "v = u² + 2as",
      ],
      answer: 0,
    },
    {
      question: "ত্বরণ কী বোঝায়?",
      options: [
        "স্থানচ্যুতির হার",
        "বেগের পরিবর্তনের হার",
        "বস্তুর ভর",
        "সময়ের পরিবর্তন",
      ],
      answer: 1,
    },
  ] : [
    {
      question: "What is displacement in kinematics?",
      options: [
        "The mass of an object",
        "The change in an object's position",
        "The force acting on an object",
        "The acceleration of an object",
      ],
      answer: 1,
    },
    {
      question: "Which of the following is the correct formula for velocity?",
      options: [
        "v = u + at",
        "v = s/t",
        "v = u + ½at²",
        "v = u² + 2as",
      ],
      answer: 0,
    },
    {
      question: "What does acceleration represent?",
      options: [
        "Rate of change of displacement",
        "Rate of change of velocity",
        "Mass of an object",
        "Change in time",
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