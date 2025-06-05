"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award } from "lucide-react"

export default function WavePropertiesQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "তরঙ্গের বেগ (v), কম্পাঙ্ক (f) এবং তরঙ্গদৈর্ঘ্য (λ) এর মধ্যে সম্পর্ক কী?",
      options: [
        "v = f + λ",
        "v = fλ",
        "v = f/λ",
        "v = λ/f"
      ],
      answer: 1,
      explanation: "তরঙ্গের বেগ, কম্পাঙ্ক এবং তরঙ্গদৈর্ঘ্যের মধ্যে সম্পর্ক v = fλ। এটি তরঙ্গের মৌলিক সমীকরণ।"
    },
    {
      question: "নিচের কোনটি অনুপ্রস্থ তরঙ্গের উদাহরণ?",
      options: ["শব্দ তরঙ্গ", "স্প্রিং তরঙ্গ", "আলোক তরঙ্গ", "সিসমিক P-তরঙ্গ"],
      answer: 2,
      explanation: "আলোক তরঙ্গ একটি অনুপ্রস্থ তরঙ্গ, যেখানে কণার সরণ তরঙ্গের গতির সাথে লম্ব। শব্দ তরঙ্গ এবং সিসমিক P-তরঙ্গ অনুদৈর্ঘ্য তরঙ্গ।"
    },
    {
      question: "যখন দুটি তরঙ্গ মিলিত হয়ে বৃহত্তর প্রশস্ততার তরঙ্গ তৈরি করে, তখন তাকে কী বলে?",
      options: [
        "ধ্বংসাত্মক ব্যতিচার",
        "গঠনমূলক ব্যতিচার",
        "অপবর্তন",
        "সমবর্তন"
      ],
      answer: 1,
      explanation: "যখন দুটি তরঙ্গ একই দশায় মিলিত হয়, তখন তারা গঠনমূলক ব্যতিচার সৃষ্টি করে এবং বৃহত্তর প্রশস্ততার তরঙ্গ তৈরি করে।"
    },
    {
      question: "তরঙ্গের কোন বৈশিষ্ট্যের জন্য মাধ্যমের প্রয়োজন নেই?",
      options: [
        "প্রতিফলন",
        "প্রতিসরণ",
        "অপবর্তন",
        "সমস্ত বৈশিষ্ট্যের মাধ্যম প্রয়োজন"
      ],
      answer: 3,
      explanation: "তড়িৎচৌম্বক তরঙ্গ (যেমন আলো) মাধ্যম ছাড়াই চলাচল করতে পারে, কিন্তু যান্ত্রিক তরঙ্গের (যেমন শব্দ) মাধ্যম প্রয়োজন।"
    },
    {
      question: "ডপলার প্রভাব কী নির্দেশ করে?",
      options: [
        "তরঙ্গের বেগ পরিবর্তন",
        "পর্যবেক্ষকের সাপেক্ষে উৎসের গতির কারণে কম্পাঙ্কের পরিবর্তন",
        "তরঙ্গদৈর্ঘ্যের পরিবর্তন",
        "তরঙ্গের শক্তির পরিবর্তন"
      ],
      answer: 1,
      explanation: "ডপলার প্রভাব হল পর্যবেক্ষকের সাপেক্ষে উৎসের গতির কারণে তরঙ্গের আপাত কম্পাঙ্কের পরিবর্তন। উদাহরণ: অ্যাম্বুলেন্সের সাইরেনের শব্দের পিচ পরিবর্তন।"
    }
  ] : [
    {
      question: "What is the relationship between wave velocity (v), frequency (f), and wavelength (λ)?",
      options: [
        "v = f + λ",
        "v = fλ",
        "v = f/λ",
        "v = λ/f"
      ],
      answer: 1,
      explanation: "The fundamental wave equation is v = fλ, where v is velocity, f is frequency, and λ is wavelength."
    },
    {
      question: "Which of the following is an example of transverse wave?",
      options: ["Sound wave", "Spring wave", "Light wave", "Seismic P-wave"],
      answer: 2,
      explanation: "Light is a transverse wave where particle displacement is perpendicular to wave motion. Sound and seismic P-waves are longitudinal waves."
    },
    {
      question: "When two waves combine to form a wave with larger amplitude, it's called:",
      options: [
        "Destructive interference",
        "Constructive interference",
        "Diffraction",
        "Polarization"
      ],
      answer: 1,
      explanation: "Constructive interference occurs when waves combine in phase, resulting in greater amplitude."
    },
    {
      question: "Which wave behavior doesn't require a medium?",
      options: [
        "Reflection",
        "Refraction",
        "Diffraction",
        "All behaviors require medium"
      ],
      answer: 3,
      explanation: "Electromagnetic waves (like light) can travel without medium, but mechanical waves (like sound) require a medium."
    },
    {
      question: "What does Doppler effect indicate?",
      options: [
        "Change in wave speed",
        "Change in frequency due to relative motion between source and observer",
        "Change in wavelength",
        "Change in wave energy"
      ],
      answer: 1,
      explanation: "Doppler effect is the change in frequency or wavelength of a wave in relation to an observer moving relative to the wave source. Example: Changing pitch of ambulance siren."
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
      if (percentage >= 80) return "অসাধারণ! আপনি তরঙ্গের বৈশিষ্ট্য সম্পর্কে গভীর জ্ঞান রাখেন।"
      if (percentage >= 60) return "ভালো! আরেকটু চর্চা করলে আপনি আরও ভালো করবেন।"
      return "আরো অধ্যয়ন প্রয়োজন। অনুগ্রহ করে বিষয়টি আবার পড়ুন।"
    } else {
      if (percentage >= 80) return "Excellent! You have deep understanding of wave properties."
      if (percentage >= 60) return "Good! With a little more practice you'll improve."
      return "More study needed. Please review the topic again."
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