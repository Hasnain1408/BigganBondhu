"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ElectricFieldQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "বৈদ্যুতিক ক্ষেত্রের সংজ্ঞা কী?",
      options: [
        "E = F/q",
        "E = k * (q₁q₂/r²)",
        "E = q/r²",
        "E = F * q",
      ],
      answer: 0,
    },
    {
      question: "বৈদ্যুতিক ক্ষেত্রের একক কী?",
      options: [
        "নিউটন (N)",
        "নিউটন প্রতি কুলম্ব (N/C)",
        "কুলম্ব (C)",
        "জুল (J)",
      ],
      answer: 1,
    },
    {
      question: "ধনাত্মক চার্জের কাছে বৈদ্যুতিক ক্ষেত্রের দিক কোনটি?",
      options: [
        "চার্জের দিকে",
        "চার্জ থেকে দূরে",
        "কোনো দিক নেই",
        "চার্জের সমান্তরাল",
      ],
      answer: 1,
    },
    {
      question: "বিন্দু চার্জের জন্য বৈদ্যুতিক ক্ষেত্রের সূত্র কী?",
      options: [
        "E = k * (q/r²)",
        "E = F/q",
        "E = k * (q/r)",
        "E = q/r²",
      ],
      answer: 0,
    },
    {
      question: "সমান্তরাল প্লেট ক্যাপাসিটরে বৈদ্যুতিক ক্ষেত্র কেমন হয়?",
      options: [
        "অ-অভিন্ন এবং পরিবর্তনশীল",
        "অভিন্ন এবং স্থির",
        "শুধুমাত্র গতিশীল",
        "কোনো ক্ষেত্র নেই",
      ],
      answer: 1,
    },
  ] : [
    {
      question: "What is the definition of an electric field?",
      options: [
        "E = F/q",
        "E = k * (q₁q₂/r²)",
        "E = q/r²",
        "E = F * q",
      ],
      answer: 0,
    },
    {
      question: "What is the unit of electric field?",
      options: [
        "Newton (N)",
        "Newton per Coulomb (N/C)",
        "Coulomb (C)",
        "Joule (J)",
      ],
      answer: 1,
    },
    {
      question: "What is the direction of the electric field near a positive charge?",
      options: [
        "Toward the charge",
        "Away from the charge",
        "No direction",
        "Parallel to the charge",
      ],
      answer: 1,
    },
    {
      question: "What is the formula for the electric field due to a point charge?",
      options: [
        "E = k * (q/r²)",
        "E = F/q",
        "E = k * (q/r)",
        "E = q/r²",
      ],
      answer: 0,
    },
    {
      question: "What is the electric field like in a parallel plate capacitor?",
      options: [
        "Non-uniform and variable",
        "Uniform and constant",
        "Dynamic only",
        "No field exists",
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