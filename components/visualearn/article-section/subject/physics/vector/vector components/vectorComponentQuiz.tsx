"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award, RotateCcw, Globe, Zap, Target, ArrowRight, ArrowLeft } from "lucide-react"

export default function VectorComponentsQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [darkMode, setDarkMode] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  const questions = lang === "bn" ? [
    {
      question: "একটি ভেক্টরের মান 10 এবং x-অক্ষের সাথে কোণ 30°। এর x-উপাংশ কত?",
      options: [
        "5.0",
        "8.66",
        "10.0",
        "6.93",
      ],
      answer: 1,
      explanation: "x-উপাংশ = |V| × cos θ = 10 × cos(30°) = 10 × 0.866 = 8.66। cos(30°) = √3/2 ≈ 0.866।"
    },
    {
      question: "ভেক্টর উপাংশ বিশ্লেষণে কোন সূত্রটি সঠিক?",
      options: [
        "Vₓ = |V| sin θ, Vᵧ = |V| cos θ",
        "Vₓ = |V| cos θ, Vᵧ = |V| sin θ",
        "Vₓ = |V| tan θ, Vᵧ = |V| cot θ",
        "Vₓ = |V|/cos θ, Vᵧ = |V|/sin θ",
      ],
      answer: 1,
      explanation: "ভেক্টর উপাংশের সঠিক সূত্র: Vₓ = |V| cos θ (অনুভূমিক উপাংশ) এবং Vᵧ = |V| sin θ (উল্লম্ব উপাংশ), যেখানে θ হল x-অক্ষের সাথে কোণ।"
    },
    {
      question: "যদি Vₓ = 6 এবং Vᵧ = 8 হয়, তাহলে ভেক্টরের মান কত?",
      options: [
        "14",
        "10",
        "2",
        "48",
      ],
      answer: 1,
      explanation: "ভেক্টরের মান |V| = √(Vₓ² + Vᵧ²) = √(6² + 8²) = √(36 + 64) = √100 = 10। এটি পিথাগোরাসের উপপাদ্য অনুসরণ করে।"
    },
    {
      question: "একটি ভেক্টরের y-উপাংশ 15 এবং x-অক্ষের সাথে কোণ 60°। ভেক্টরের মান কত?",
      options: [
        "30",
        "17.32",
        "12.99",
        "26",
      ],
      answer: 1,
      explanation: "Vᵧ = |V| sin θ থেকে, |V| = Vᵧ/sin θ = 15/sin(60°) = 15/(√3/2) = 15 × (2/√3) = 30/√3 × √3/√3 = 30√3/3 = 10√3 ≈ 17.32।"
    },
    {
      question: "দুটি উপাংশ Vₓ = -4 এবং Vᵧ = 3 দিয়ে গঠিত ভেক্টরের দিক কোন চতুর্ভাগে?",
      options: [
        "প্রথম চতুর্ভাগ (Quadrant I)",
        "দ্বিতীয় চতুর্ভাগ (Quadrant II)",
        "তৃতীয় চতুর্ভাগ (Quadrant III)",
        "চতুর্থ চতুর্ভাগ (Quadrant IV)",
      ],
      answer: 1,
      explanation: "Vₓ = -4 (ঋণাত্মক) এবং Vᵧ = 3 (ধনাত্মক) হলে ভেক্টরটি দ্বিতীয় চতুর্ভাগে অবস্থিত। দ্বিতীয় চতুর্ভাগে x ঋণাত্মক এবং y ধনাত্মক।"
    },
    {
      question: "একটি ভেক্টরের মান 20 এবং x-উপাংশ 12। এর y-উপাংশ কত?",
      options: [
        "8",
        "16",
        "32",
        "24",
      ],
      answer: 1,
      explanation: "পিথাগোরাসের উপপাদ্য অনুসারে: |V|² = Vₓ² + Vᵧ²। সুতরাং Vᵧ = √(|V|² - Vₓ²) = √(20² - 12²) = √(400 - 144) = √256 = 16।"
    },
    {
      question: "ভেক্টর A⃗ = 3î + 4ĵ এর দিক কোণ কত?",
      options: [
        "36.87°",
        "53.13°",
        "45°",
        "60°",
      ],
      answer: 1,
      explanation: "দিক কোণ θ = tan⁻¹(Vᵧ/Vₓ) = tan⁻¹(4/3) = tan⁻¹(1.33) ≈ 53.13°। এটি x-অক্ষের সাথে ভেক্টরের কোণ।"
    },
    {
      question: "যদি একটি ভেক্টর 45° কোণে থাকে এবং x-উপাংশ 5√2 হয়, তাহলে ভেক্টরের মান কত?",
      options: [
        "5",
        "10",
        "5√2",
        "10√2",
      ],
      answer: 1,
      explanation: "45° কোণে cos(45°) = 1/√2। Vₓ = |V| cos θ থেকে, 5√2 = |V| × (1/√2)। সুতরাং |V| = 5√2 × √2 = 5 × 2 = 10।"
    }
  ] : [
    {
      question: "A vector has magnitude 10 and makes 30° angle with x-axis. What is its x-component?",
      options: [
        "5.0",
        "8.66",
        "10.0",
        "6.93",
      ],
      answer: 1,
      explanation: "x-component = |V| × cos θ = 10 × cos(30°) = 10 × 0.866 = 8.66. Remember: cos(30°) = √3/2 ≈ 0.866."
    },
    {
      question: "Which formula is correct for vector component analysis?",
      options: [
        "Vₓ = |V| sin θ, Vᵧ = |V| cos θ",
        "Vₓ = |V| cos θ, Vᵧ = |V| sin θ",
        "Vₓ = |V| tan θ, Vᵧ = |V| cot θ",
        "Vₓ = |V|/cos θ, Vᵧ = |V|/sin θ",
      ],
      answer: 1,
      explanation: "The correct formulas are: Vₓ = |V| cos θ (horizontal component) and Vᵧ = |V| sin θ (vertical component), where θ is the angle with x-axis."
    },
    {
      question: "If Vₓ = 6 and Vᵧ = 8, what is the magnitude of the vector?",
      options: [
        "14",
        "10",
        "2",
        "48",
      ],
      answer: 1,
      explanation: "Magnitude |V| = √(Vₓ² + Vᵧ²) = √(6² + 8²) = √(36 + 64) = √100 = 10. This follows the Pythagorean theorem."
    },
    {
      question: "A vector has y-component 15 and makes 60° with x-axis. What is its magnitude?",
      options: [
        "30",
        "17.32",
        "12.99",
        "26",
      ],
      answer: 1,
      explanation: "From Vᵧ = |V| sin θ, we get |V| = Vᵧ/sin θ = 15/sin(60°) = 15/(√3/2) = 15 × (2/√3) = 30/√3 = 10√3 ≈ 17.32."
    },
    {
      question: "A vector with components Vₓ = -4 and Vᵧ = 3 lies in which quadrant?",
      options: [
        "Quadrant I",
        "Quadrant II",
        "Quadrant III",
        "Quadrant IV",
      ],
      answer: 1,
      explanation: "With Vₓ = -4 (negative) and Vᵧ = 3 (positive), the vector lies in Quadrant II where x is negative and y is positive."
    },
    {
      question: "A vector has magnitude 20 and x-component 12. What is its y-component?",
      options: [
        "8",
        "16",
        "32",
        "24",
      ],
      answer: 1,
      explanation: "Using Pythagorean theorem: |V|² = Vₓ² + Vᵧ². So Vᵧ = √(|V|² - Vₓ²) = √(20² - 12²) = √(400 - 144) = √256 = 16."
    },
    {
      question: "What is the direction angle of vector A⃗ = 3î + 4ĵ?",
      options: [
        "36.87°",
        "53.13°",
        "45°",
        "60°",
      ],
      answer: 1,
      explanation: "Direction angle θ = tan⁻¹(Vᵧ/Vₓ) = tan⁻¹(4/3) = tan⁻¹(1.33) ≈ 53.13°. This is the angle the vector makes with the x-axis."
    },
    {
      question: "If a vector makes 45° with x-axis and has x-component 5√2, what is its magnitude?",
      options: [
        "5",
        "10",
        "5√2",
        "10√2",
      ],
      answer: 1,
      explanation: "At 45°, cos(45°) = 1/√2. From Vₓ = |V| cos θ, we get 5√2 = |V| × (1/√2). Therefore |V| = 5√2 × √2 = 5 × 2 = 10."
    }
  ]

  const texts = lang === "bn" ? {
    title: "ভেক্টর উপাংশ কুইজ",
    subtitle: "আপনার ভেক্টর জ্ঞান পরীক্ষা করুন",
    question: "প্রশ্ন",
    of: "এর",
    nextQuestion: "পরবর্তী প্রশ্ন",
    prevQuestion: "পূর্ববর্তী প্রশ্ন",
    submit: "জমা দিন",
    showExplanation: "ব্যাখ্যা দেখুন",
    hideExplanation: "ব্যাখ্যা লুকান",
    explanation: "ব্যাখ্যা:",
    correct: "সঠিক!",
    incorrect: "ভুল!",
    score: "স্কোর",
    finalScore: "চূড়ান্ত স্কোর",
    excellent: "চমৎকার!",
    good: "ভাল!",
    needsPractice: "আরো অনুশীলন প্রয়োজন",
    retryQuiz: "আবার চেষ্টা করুন",
    timeLeft: "বাকি সময়",
    streak: "ধারাবাহিক সঠিক",
    bestStreak: "সেরা ধারা",
    seconds: "সেকেন্ড"
  } : {
    title: "Vector Components Quiz",
    subtitle: "Test your vector knowledge",
    question: "Question",
    of: "of",
    nextQuestion: "Next Question",
    prevQuestion: "Previous Question",
    submit: "Submit Answer",
    showExplanation: "Show Explanation",
    hideExplanation: "Hide Explanation",
    explanation: "Explanation:",
    correct: "Correct!",
    incorrect: "Incorrect!",
    score: "Score",
    finalScore: "Final Score",
    excellent: "Excellent!",
    good: "Good job!",
    needsPractice: "Needs more practice",
    retryQuiz: "Retry Quiz",
    timeLeft: "Time Left",
    streak: "Streak",
    bestStreak: "Best Streak",
    seconds: "seconds"
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft, showResult])

  // Start timer when question changes
  useEffect(() => {
    if (!quizCompleted) {
      setTimeLeft(30)
      setIsTimerActive(true)
    }
  }, [currentQuestion])

  const handleSubmit = () => {
    if (selected === null && timeLeft > 0) return
    
    setIsTimerActive(false)
    const isCorrect = selected === questions[currentQuestion].answer
    
    if (isCorrect) {
      setScore(score + 1)
      setStreak(streak + 1)
      setBestStreak(Math.max(bestStreak, streak + 1))
    } else {
      setStreak(0)
    }
    
    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelected(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
      setQuizCompleted(true)
      setIsTimerActive(false)
    }
  }

  // const prevQuestion = () => {
  //   if (currentQuestion > 0) {
  //     setCurrentQuestion(currentQuestion - 1)
  //     setSelected(null)
  //     setShowExplanation(false)
  //   }
  // }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
    setAnsweredQuestions([])
    setShowExplanation(false)
    setQuizCompleted(false)
    setStreak(0)
    setTimeLeft(30)
    setIsTimerActive(true)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return texts.excellent
    if (percentage >= 60) return texts.good
    return texts.needsPractice
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (showResult) {
    return (
      <div className={`max-w-4xl mx-auto p-6 min-h-screen ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
      }`}>
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Award className="w-16 h-16 text-yellow-300" />
              <div>
                <CardTitle className="text-3xl font-bold">{texts.finalScore}</CardTitle>
                <p className={`${getScoreColor()} mt-2`}>{getScoreMessage()}</p>

              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className={`text-3xl font-bold mb-2`}>
                  {score}/{questions.length}
                </div>
                <p className="text-blue-100">{texts.score}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold mb-2">{bestStreak}</div>
                <p className="text-green-100">{texts.bestStreak}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <p className="text-purple-100">Accuracy</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {texts.retryQuiz}
              </Button>
              <Button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                variant="outline"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Globe className="w-5 h-5 mr-2" />
                Switch to {lang === "en" ? "বাংলা" : "English"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 min-h-screen ${
      darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
    }`}>
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{texts.title}</CardTitle>
              <p className="text-blue-100 mt-1">{texts.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Globe className="w-4 h-4 mr-2" />
                {lang === "en" ? "বাংলা" : "English"}
              </Button>

              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {darkMode ? "🌙 Dark" : "☀️ Light"}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Progress and Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-6 mb-4 sm:mb-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentQuestion + 1}/{questions.length}
                </div>
                <div className="text-sm text-gray-600">{texts.question}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">{texts.score}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{streak}</div>
                <div className="text-sm text-gray-600">{texts.streak}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
                {timeLeft}
              </div>
              <div className="text-sm text-gray-600">{texts.timeLeft}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 leading-relaxed">
              {questions[currentQuestion].question}
            </h3>
            <RadioGroup
              value={selected?.toString()}
              onValueChange={(value) => setSelected(parseInt(value))}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                    disabled={showExplanation}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selected === index
                        ? darkMode
                          ? 'border-blue-400 bg-blue-900/30 text-blue-00'
                          : 'border-blue-500 bg-blue-50 text-blue-800'
                        : darkMode
                          ? 'border-gray-600 hover:border-blue-400 hover:bg-blue-900/20 text-gray-200'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 text-gray-800'
                      } ${showExplanation ? 'cursor-not-allowed' : ''}`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mb-6 p-4 rounded-xl border-2 ${
              selected === questions[currentQuestion].answer
                ? 'border-green-300 bg-green-50'
                : 'border-red-300 bg-red-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selected === questions[currentQuestion].answer ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold ${
                  selected === questions[currentQuestion].answer
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}>
                  {selected === questions[currentQuestion].answer ? texts.correct : texts.incorrect}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>{texts.explanation}</strong> {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* <Button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1 sm:flex-none border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {texts.prevQuestion}
            </Button> */}
            
            <div className="flex gap-4 flex-1 sm:flex-none">
              {!showExplanation ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selected === null}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {texts.submit}
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {currentQuestion === questions.length - 1 ? texts.finalScore : texts.nextQuestion}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}