"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award } from "lucide-react"

export default function SoundWaveQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "শব্দ তরঙ্গের সংজ্ঞা কী?",
      options: [
        "একটি অনুদৈর্ঘ্য যান্ত্রিক তরঙ্গ",
        "একটি আড়াআড়ি তড়িৎ চুম্বক তরঙ্গ",
        "একটি স্থির তরঙ্গ",
        "একটি আলোক তরঙ্গ",
      ],
      answer: 0,
      explanation: "শব্দ তরঙ্গ হল একটি অনুদৈর্ঘ্য যান্ত্রিক তরঙ্গ যা মাধ্যমের কণাগুলোর সংকোচন ও প্রসারণের মাধ্যমে প্রবাহিত হয়।"
    },
    {
      question: "বাতাসে শব্দের গতিবেগ প্রায় কত?",
      options: ["৩০০ মিটার/সেকেন্ড", "৩৪০ মিটার/সেকেন্ড", "৩৮০ মিটার/সেকেন্ড", "৪০০ মিটার/সেকেন্ড"],
      answer: 1,
      explanation: "বায়ুতে ২০°সে তাপমাত্রায় শব্দের গতিবেগ প্রায় ৩৪৩ মিটার/সেকেন্ড বা প্রায় ৩৪০ মিটার/সেকেন্ড।"
    },
    {
      question: "শব্দের কম্পাঙ্ক ও তরঙ্গদৈর্ঘ্যের মধ্যে কী সম্পর্ক?",
      options: [
        "v = f × λ",
        "v = f / λ",
        "v = f + λ",
        "v = f - λ",
      ],
      answer: 0,
      explanation: "শব্দের গতিবেগ (v) = কম্পাঙ্ক (f) × তরঙ্গদৈর্ঘ্য (λ)। এটি সকল তরঙ্গের মৌলিক সমীকরণ।"
    },
    {
      question: "মানুষের শ্রবণযোগ্য কম্পাঙ্কের পরিসর কত?",
      options: [
        "১০ Hz থেকে ১০,০০০ Hz",
        "২০ Hz থেকে ২০,০০০ Hz",
        "৫০ Hz থেকে ১৫,০০০ Hz",
        "১০০ Hz থেকে ১০,০০০ Hz",
      ],
      answer: 1,
      explanation: "মানুষের শ্রবণযোগ্য কম্পাঙ্কের পরিসর সাধারণত ২০ Hz থেকে ২০,০০০ Hz (২০ kHz) পর্যন্ত।"
    },
    {
      question: "শব্দের তীব্রতা কিসের উপর নির্ভর করে?",
      options: [
        "কম্পাঙ্কের উপর",
        "তরঙ্গদৈর্ঘ্যের উপর",
        "বিস্তারের বর্গের উপর",
        "গতিবেগের উপর",
      ],
      answer: 2,
      explanation: "শব্দের তীব্রতা তরঙ্গের বিস্তারের বর্গের সমানুপাতিক। বিস্তার বেশি হলে শব্দ জোরে শোনায়।"
    }
  ] : [
    {
      question: "What is the definition of a sound wave?",
      options: [
        "A longitudinal mechanical wave",
        "A transverse electromagnetic wave",
        "A standing wave",
        "A light wave",
      ],
      answer: 0,
      explanation: "A sound wave is a longitudinal mechanical wave that propagates through compression and rarefaction of particles in a medium."
    },
    {
      question: "What is the approximate speed of sound in air?",
      options: ["300 m/s", "340 m/s", "380 m/s", "400 m/s"],
      answer: 1,
      explanation: "The speed of sound in air at 20°C is approximately 343 m/s, commonly rounded to 340 m/s."
    },
    {
      question: "What is the relationship between frequency and wavelength of sound?",
      options: [
        "v = f × λ",
        "v = f / λ",
        "v = f + λ",
        "v = f - λ",
      ],
      answer: 0,
      explanation: "The speed of sound (v) equals frequency (f) times wavelength (λ). This is the fundamental wave equation for all waves."
    },
    {
      question: "What is the range of human audible frequencies?",
      options: [
        "10 Hz to 10,000 Hz",
        "20 Hz to 20,000 Hz",
        "50 Hz to 15,000 Hz",
        "100 Hz to 10,000 Hz",
      ],
      answer: 1,
      explanation: "The human audible frequency range is typically from 20 Hz to 20,000 Hz (20 kHz), though this varies with age and individual hearing ability."
    },
    {
      question: "What does the intensity of sound depend on?",
      options: [
        "Frequency",
        "Wavelength",
        "Square of amplitude",
        "Speed",
      ],
      answer: 2,
      explanation: "Sound intensity is proportional to the square of the amplitude. Higher amplitude means louder sound."
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
      if (percentage >= 80) return "চমৎকার! আপনি শব্দ তরঙ্গ সম্পর্কে খুবই ভালো ধারণা রাখেন।"
      if (percentage >= 60) return "ভালো! আরো একটু অনুশীলন করলে আরও ভালো হবে।"
      return "আরো অধ্যয়ন প্রয়োজন। বিষয়টি আবার পড়ে দেখুন।"
    } else {
      if (percentage >= 80) return "Excellent! You have a great understanding of sound waves."
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