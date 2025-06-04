"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ElectricForceQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "কুলম্বের সূত্রের সঠিক রূপ কোনটি?",
      options: [
        "F = k * (|q₁q₂|/r²)",
        "F = k * (q₁q₂/r)",
        "F = k * (q₁ + q₂)/r²",
        "F = q₁q₂/r²",
      ],
      answer: 0,
    },
    {
      question: "কুলম্ব ধ্রুবকের মান কত?",
      options: [
        "8.85 × 10⁻¹² N·m²/C²",
        "8.99 × 10⁹ N·m²/C²",
        "9.8 m/s²",
        "1.6 × 10⁻¹⁹ C",
      ],
      answer: 1,
    },
    {
      question: "দুটি ঋণাত্মক চার্জের মধ্যে বল কী ধরনের হবে?",
      options: [
        "আকর্ষণী",
        "বিকর্ষণী",
        "কোনো বল নেই",
        "নির্ভর করে দূরত্বের উপর",
      ],
      answer: 1,
    },
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
      question: "ইলেকট্রোস্ট্যাটিক বল কখন ক্রিয়া করে?",
      options: [
        "গতিশীল চার্জের মধ্যে",
        "স্থির চার্জের মধ্যে",
        "চৌম্বক ক্ষেত্রে",
        "শুধুমাত্র ধনাত্মক চার্জের মধ্যে",
      ],
      answer: 1,
    },
  ] : [
    {
      question: "What is the correct form of Coulomb's law?",
      options: [
        "F = k * (|q₁q₂|/r²)",
        "F = k * (q₁q₂/r)",
        "F = k * (q₁ + q₂)/r²",
        "F = q₁q₂/r²",
      ],
      answer: 0,
    },
    {
      question: "What is the value of the Coulomb constant?",
      options: [
        "8.85 × 10⁻¹² N·m²/C²",
        "8.99 × 10⁹ N·m²/C²",
        "9.8 m/s²",
        "1.6 × 10⁻¹⁹ C",
      ],
      answer: 1,
    },
    {
      question: "What type of force exists between two negative charges?",
      options: [
        "Attractive",
        "Repulsive",
        "No force",
        "Depends on distance",
      ],
      answer: 1,
    },
    {
      question: "What is the definition of electric field?",
      options: [
        "E = F/q",
        "E = k * (q₁q₂/r²)",
        "E = q/r²",
        "E = F * q",
      ],
      answer: 0,
    },
    {
      question: "When does the electrostatic force act?",
      options: [
        "Between moving charges",
        "Between stationary charges",
        "In a magnetic field",
        "Only between positive charges",
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