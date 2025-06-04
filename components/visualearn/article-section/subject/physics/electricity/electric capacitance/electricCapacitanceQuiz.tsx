"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ElectricCapacitanceQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "বৈদ্যুতিক ধারণক্ষমতার সংজ্ঞা কী?",
      options: [
        "C = Q/V",
        "C = V/Q",
        "C = ε₀A/d",
        "C = (১/২)QV",
      ],
      answer: 0,
    },
    {
      question: "ধারণক্ষমতার একক কী?",
      options: [
        "ভোল্ট (V)",
        "ফ্যারাড (F)",
        "কুলম্ব (C)",
        "জুল (J)",
      ],
      answer: 1,
    },
    {
      question: "সমান্তরাল প্লেট ক্যাপাসিটরের ধারণক্ষমতার সূত্র কী?",
      options: [
        "C = εA/d",
        "C = Q/V",
        "C = ε₀/d",
        "C = A/d",
      ],
      answer: 0,
    },
    {
      question: "ক্যাপাসিটরে সঞ্চিত শক্তির সূত্র কী?",
      options: [
        "U = (১/২)CV²",
        "U = QV",
        "U = CV",
        "U = (১/২)Q/V",
      ],
      answer: 0,
    },
    {
      question: "ডাইইলেকট্রিক উপাদান কীভাবে ধারণক্ষমতাকে প্রভাবিত করে?",
      options: [
        "ধারণক্ষমতা কমায়",
        "ধারণক্ষমতা বাড়ায়",
        "কোনো প্রভাব নেই",
        "শুধুমাত্র চার্জ কমায়",
      ],
      answer: 1,
    },
  ] : [
    {
      question: "What is the definition of electric capacitance?",
      options: [
        "C = Q/V",
        "C = V/Q",
        "C = ε₀A/d",
        "C = (1/2)QV",
      ],
      answer: 0,
    },
    {
      question: "What is the unit of capacitance?",
      options: [
        "Volt (V)",
        "Farad (F)",
        "Coulomb (C)",
        "Joule (J)",
      ],
      answer: 1,
    },
    {
      question: "What is the formula for the capacitance of a parallel plate capacitor?",
      options: [
        "C = εA/d",
        "C = Q/V",
        "C = ε₀/d",
        "C = A/d",
      ],
      answer: 0,
    },
    {
      question: "What is the formula for the energy stored in a capacitor?",
      options: [
        "U = (1/2)CV²",
        "U = QV",
        "U = CV",
        "U = (1/2)Q/V",
      ],
      answer: 0,
    },
    {
      question: "How does a dielectric material affect capacitance?",
      options: [
        "Decreases capacitance",
        "Increases capacitance",
        "No effect",
        "Only reduces charge",
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