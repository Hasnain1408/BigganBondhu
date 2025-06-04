"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award } from "lucide-react"

export default function ElectricChargeQuiz() {
  const [lang, setLang] = useState("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "কুলম্বের সূত্র অনুযায়ী দুটি চার্জের মধ্যে বল কীসের উপর নির্ভর করে?",
      options: [
        "কেবল চার্জের পরিমাণের উপর",
        "কেবল দূরত্বের উপর",
        "চার্জের পরিমাণ ও দূরত্ব উভয়ের উপর",
        "কেবল মাধ্যমের উপর",
      ],
      answer: 2,
      explanation: "কুলম্বের সূত্র অনুযায়ী, F = k(q₁q₂)/r²। এখানে বল F চার্জের পরিমাণ (q₁, q₂) এবং তাদের মধ্যকার দূরত্ব (r) উভয়ের উপর নির্ভর করে।"
    },
    {
      question: "একই ধরনের চার্জের মধ্যে কী ঘটে?",
      options: [
        "আকর্ষণ",
        "বিকর্ষণ", 
        "কিছি ঘটে না",
        "নিরপেক্ষ হয়ে যায়",
      ],
      answer: 1,
      explanation: "একই ধরনের চার্জ (যেমন: দুটি ধনাত্মক বা দুটি ঋণাত্মক) পরস্পরকে বিকর্ষণ করে। বিপরীত চার্জ আকর্ষণ করে।"
    },
    {
      question: "বৈদ্যুতিক ক্ষেত্রের একক কী?",
      options: [
        "কুলম্ব (C)",
        "নিউটন (N)",
        "নিউটন/কুলম্ব (N/C)",
        "জুল (J)",
      ],
      answer: 2,
      explanation: "বৈদ্যুতিক ক্ষেত্রের তীব্রতা হল একক চার্জের উপর প্রযুক্ত বল। তাই এর একক নিউটন/কুলম্ব (N/C) বা ভোল্ট/মিটার (V/m)।"
    },
    {
      question: "চার্জ সংরক্ষণ নীতি অনুযায়ী:",
      options: [
        "চার্জ সৃষ্টি হতে পারে",
        "চার্জ ধ্বংস হতে পারে",
        "চার্জ সৃষ্টি বা ধ্বংস হতে পারে না",
        "চার্জ পরিবর্তিত হতে পারে",
      ],
      answer: 2,
      explanation: "চার্জ সংরক্ষণ নীতি অনুযায়ী, একটি বিচ্ছিন্ন সিস্টেমে মোট চার্জের পরিমাণ সবসময় স্থির থাকে। চার্জ সৃষ্টি বা ধ্বংস হতে পারে না, শুধু স্থানান্তরিত হতে পারে।"
    },
    {
      question: "দূরত্ব দ্বিগুণ হলে কুলম্ব বল কত গুণ হয়?",
      options: [
        "২ গুণ",
        "৪ গুণ",
        "১/২ গুণ",
        "১/৪ গুণ",
      ],
      answer: 3,
      explanation: "কুলম্বের সূত্রে F ∝ 1/r²। তাই দূরত্ব দ্বিগুণ হলে বল (1/2²) = 1/4 গুণ হয়ে যায়। এটি ব্যস্ত বর্গ সূত্র।"
    },
  ] : [
    {
      question: "According to Coulomb's Law, the force between two charges depends on:",
      options: [
        "Only the magnitude of charges",
        "Only the distance between them",
        "Both magnitude of charges and distance",
        "Only the medium between them",
      ],
      answer: 2,
      explanation: "Coulomb's Law states F = k(q₁q₂)/r². The force depends on both the magnitude of charges (q₁, q₂) and the square of distance (r²) between them."
    },
    {
      question: "What happens between like charges?",
      options: [
        "They attract each other",
        "They repel each other",
        "Nothing happens",
        "They become neutral",
      ],
      answer: 1,
      explanation: "Like charges (both positive or both negative) repel each other, while unlike charges attract each other. This is a fundamental property of electric charges."
    },
    {
      question: "What is the unit of electric field?",
      options: [
        "Coulomb (C)",
        "Newton (N)",
        "Newton per Coulomb (N/C)",
        "Joule (J)",
      ],
      answer: 2,
      explanation: "Electric field intensity is force per unit charge, so its unit is Newton per Coulomb (N/C), which is equivalent to Volt per meter (V/m)."
    },
    {
      question: "According to the law of charge conservation:",
      options: [
        "Charge can be created",
        "Charge can be destroyed",
        "Charge can neither be created nor destroyed",
        "Charge can be transformed",
      ],
      answer: 2,
      explanation: "The law of charge conservation states that the total electric charge in an isolated system remains constant. Charge can only be transferred from one object to another, never created or destroyed."
    },
    {
      question: "If the distance between charges is doubled, the Coulomb force becomes:",
      options: [
        "2 times stronger",
        "4 times stronger",
        "1/2 as strong",
        "1/4 as strong",
      ],
      answer: 3,
      explanation: "From Coulomb's Law, F ∝ 1/r². When distance is doubled, the force becomes (1/2²) = 1/4 times as strong. This follows the inverse square law."
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
      if (percentage >= 80) return "চমৎকার! আপনি বৈদ্যুতিক চার্জ সম্পর্কে খুবই ভালো ধারণা রাখেন।"
      if (percentage >= 60) return "ভালো! আরো একটু অনুশীলন করলে আরও ভালো হবে।"
      return "আরো অধ্যয়ন প্রয়োজন। বিষয়টি আবার পড়ে দেখুন।"
    } else {
      if (percentage >= 80) return "Excellent! You have a great understanding of electric charge."
      if (percentage >= 60) return "Good! A little more practice will help you improve."
      return "More study needed. Review the topic again."
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {lang === "bn" ? "বৈদ্যুতিক চার্জ কুইজ" : "Electric Charge Quiz"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "bn" 
              ? "বৈদ্যুতিক চার্জের মৌলিক ধারণা পরীক্ষা করুন" 
              : "Test your understanding of electric charge fundamentals"
            }
          </p>
        </div>

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