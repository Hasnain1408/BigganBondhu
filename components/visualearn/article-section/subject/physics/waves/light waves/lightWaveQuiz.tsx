"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award } from "lucide-react"

export default function LightWaveQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "আলোর তরঙ্গের প্রকৃতি কী?",
      options: [
        "অনুদৈর্ঘ্য তরঙ্গ",
        "ট্রান্সভার্স তরঙ্গ",
        "যান্ত্রিক তরঙ্গ",
        "স্থির তরঙ্গ",
      ],
      answer: 1,
      explanation: "আলোর তরঙ্গ ট্রান্সভার্স তরঙ্গ, যেখানে বৈদ্যুতিক এবং চৌম্বক ক্ষেত্র পরস্পরের এবং প্রচারের দিকের সাথে লম্ব।"
    },
    {
      question: "শূন্য মাধ্যমে আলোর গতি কত?",
      options: [
        "3×10⁶ মি/সে",
        "3×10⁸ মি/সে",
        "3×10¹⁪⁰ মি/সে",
        "3×10⁴ মি/সে",
      ],
      answer: 1,
      explanation: "শূন্য মাধ্যমে আলোর গতি 3×10⁸ মি/সে।"
    },
    {
      question: "ব্যতিক্রমের ফলে কী ঘটে?",
      options: [
        "তরঙ্গের বাঁকানো",
        "তরঙ্গের দোলনের দিক নিয়ন্ত্রণ",
        "উজ্জ্বল এবং অন্ধকার ব্যান্ড তৈরি",
        "তরঙ্গের গতি পরিবর্তন",
      ],
      answer: 2,
      explanation: "ব্যতিক্রমে দুটি তরঙ্গের সুপারপজিশন ঘটে, যা গঠনমূলক বা ধ্বংসাত্মক হতে পারে, ফলে উজ্জ্বল এবং অন্ধকার ব্যান্ড তৈরি হয়।"
    },
    {
      question: "দৃশ্যমান আলোর তরঙ্গদৈর্ঘ্যের পরিসর কত?",
      options: [
        "100-400 ন্যানোমিটার",
        "400-700 ন্যানোমিটার",
        "700-1000 ন্যানোমিটার",
        "10-100 ন্যানোমিটার",
      ],
      answer: 1,
      explanation: "দৃশ্যমান আলোর তরঙ্গদৈর্ঘ্য 400-700 ন্যানোমিটারের মধ্যে থাকে।"
    },
    {
      question: "ফোটনের শক্তির সূত্র কী?",
      options: [
        "E = mc²",
        "E = hf",
        "E = λf",
        "E = h/c",
      ],
      answer: 1,
      explanation: "ফোটনের শক্তি E = hf, যেখানে h হল প্লাঙ্কের ধ্রুবক এবং f হল ফ্রিকোয়েন্সি।"
    }
  ] : [
    {
      question: "What is the nature of light waves?",
      options: [
        "Longitudinal waves",
        "Transverse waves",
        "Mechanical waves",
        "Stationary waves",
      ],
      answer: 1,
      explanation: "Light waves are transverse waves, where electric and magnetic fields are perpendicular to each other and to the direction of propagation."
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: [
        "3×10⁶ m/s",
        "3×10⁸ m/s",
        "3×10¹⁪⁰ m/s",
        "3×10⁴ m/s",
      ],
      answer: 1,
      explanation: "The speed of light in a vacuum is 3×10⁸ m/s."
    },
    {
      question: "What is the result of interference?",
      options: [
        "Bending of waves",
        "Control of oscillation direction",
        "Bright and dark bands",
        "Change in wave speed",
      ],
      answer: 2,
      explanation: "Interference causes superposition of waves, leading to constructive or destructive interference, resulting in bright and dark bands."
    },
    {
      question: "What is the wavelength range of visible light?",
      options: [
        "100-400 nanometers",
        "400-700 nanometers",
        "700-1000 nanometers",
        "10-100 nanometers",
      ],
      answer: 1,
      explanation: "The wavelength of visible light ranges from 400 to 700 nanometers."
    },
    {
      question: "What is the formula for the energy of a photon?",
      options: [
        "E = mc²",
        "E = hf",
        "E = λf",
        "E = h/c",
      ],
      answer: 1,
      explanation: "The energy of a photon is E = hf, where h is Planck’s constant and f is the frequency."
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
      if (percentage >= 80) return "চমৎকার! আপনি আলোর তরঙ্গ সম্পর্কে খুবই ভালো ধারণা রাখেন।"
      if (percentage >= 60) return "ভালো! আরো একটু অনুশীলন করলে আরও ভালো হবে।"
      return "আরো অধ্যয়ন প্রয়োজন। বিষয়টি আবার পড়ে দেখুন।"
    } else {
      if (percentage >= 80) return "Excellent! You have a great understanding of light waves."
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