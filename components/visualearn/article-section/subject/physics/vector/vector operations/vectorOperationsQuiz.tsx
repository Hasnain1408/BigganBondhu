import { useState } from "react"

export default function VectorOperationsQuiz() {
  const [lang, setLang] = useState("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<{ selected: number; correct: boolean }[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "ভেক্টর কী ধরনের রাশি?",
      options: ["স্কেলার", "ভেক্টর", "মাত্রাহীন", "মাত্রিক"],
      answer: 1,
      explanation: "ভেক্টর রাশির আছে মান এবং দিক—এটি ভেক্টর।"
    },
    {
      question: "ডট প্রোডাক্টের ফলাফল কী ধরনের হয়?",
      options: ["ভেক্টর", "স্কেলার", "ম্যাট্রিক্স", "জটিল সংখ্যা"],
      answer: 1,
      explanation: "ডট প্রোডাক্টের ফলাফল হয় স্কেলার (ABcosθ)।"
    },
    {
      question: "ক্রস প্রোডাক্টের ফলাফল কী?",
      options: ["স্কেলার", "ভেক্টর", "মাত্রাহীন", "শূন্য"],
      answer: 1,
      explanation: "ক্রস প্রোডাক্টের ফলাফল একটি নতুন ভেক্টর হয়, ABsinθn̂।"
    },
    {
      question: "যদি দুটি ভেক্টরের কোণ 90° হয় তবে ডট প্রোডাক্ট কত?",
      options: ["AB", "0", "ABsin90°", "AB/2"],
      answer: 1,
      explanation: "cos(90°) = 0, তাই ডট প্রোডাক্ট = ABcos90° = 0।"
    },
    {
      question: "ভেক্টর যোগের কোন পদ্ধতিটি সবচেয়ে প্রচলিত?",
      options: ["ক্রস পদ্ধতি", "সমান্তরাল পদ্ধতি", "টিপ-টু-টেল", "ডট পদ্ধতি"],
      answer: 2,
      explanation: "ভেক্টর যোগে টিপ-টু-টেল পদ্ধতি সবচেয়ে বেশি ব্যবহৃত হয়।"
    }
  ] : [
    {
      question: "What kind of quantity is a vector?",
      options: ["Scalar", "Vector", "Dimensionless", "Dimensional"],
      answer: 1,
      explanation: "A vector has both magnitude and direction—it's a vector quantity."
    },
    {
      question: "What type of result does a dot product yield?",
      options: ["Vector", "Scalar", "Matrix", "Complex number"],
      answer: 1,
      explanation: "Dot product yields a scalar (ABcosθ)."
    },
    {
      question: "What is the result of a cross product?",
      options: ["Scalar", "Vector", "Dimensionless", "Zero"],
      answer: 1,
      explanation: "Cross product results in a new vector ABsinθn̂."
    },
    {
      question: "What is the dot product if the angle between two vectors is 90°?",
      options: ["AB", "0", "ABsin90°", "AB/2"],
      answer: 1,
      explanation: "cos(90°) = 0, so dot product = ABcos90° = 0."
    },
    {
      question: "Which method is commonly used for vector addition?",
      options: ["Cross method", "Parallelogram method", "Tip-to-tail", "Dot method"],
      answer: 2,
      explanation: "Tip-to-tail method is most commonly used in vector addition."
    }
  ]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    const isCorrect = answerIndex === questions[currentQuestion].answer
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = { selected: answerIndex, correct: isCorrect }
    setAnswers(newAnswers)
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
    setAnswers([])
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-600 dark:text-green-400"
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (lang === "bn") {
      if (percentage >= 80) return "অসাধারণ! 🎉"
      if (percentage >= 60) return "ভালো! 👍"
      return "আরও অনুশীলন করুন! 📚"
    } else {
      if (percentage >= 80) return "Excellent! 🎉"
      if (percentage >= 60) return "Good job! 👍"
      return "Keep practicing! 📚"
    }
  }

  if (quizCompleted) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {lang === "bn" ? "ভেক্টর অপারেশন কুইজ" : "Vector Operations Quiz"}
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {lang === "en" ? "বাংলা" : "English"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className={`max-w-2xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {lang === "bn" ? "কুইজ সম্পূর্ণ!" : "Quiz Complete!"}
              </h2>
              <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className={`text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className={`text-2xl font-semibold ${getScoreColor()}`}>
                {getScoreMessage()}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={resetQuiz}
                className={`px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } shadow-lg`}
              >
                {lang === "bn" ? "আবার শুরু করুন" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {lang === "bn" ? "ভেক্টর অপারেশন কুইজ" : "Vector Operations Quiz"}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`max-w-2xl mx-auto mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-lg`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {lang === "bn" ? "প্রগতি" : "Progress"}
            </span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className={`max-w-2xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 transition-all duration-300`}>
          <div className="mb-8">
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
                    showExplanation
                      ? index === questions[currentQuestion].answer
                        ? isDarkMode 
                          ? 'bg-green-900 border-2 border-green-500 text-green-100' 
                          : 'bg-green-100 border-2 border-green-500 text-green-800'
                        : selectedAnswer === index
                        ? isDarkMode 
                          ? 'bg-red-900 border-2 border-red-500 text-red-100' 
                          : 'bg-red-100 border-2 border-red-500 text-red-800'
                        : isDarkMode 
                          ? 'bg-gray-700 border border-gray-600 text-gray-300' 
                          : 'bg-gray-50 border border-gray-300 text-gray-600'
                      : selectedAnswer === index
                      ? isDarkMode 
                        ? 'bg-blue-900 border-2 border-blue-500 text-blue-100' 
                        : 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                      : isDarkMode 
                        ? 'bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600' 
                        : 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100'
                  } font-medium shadow-md`}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                      showExplanation && index === questions[currentQuestion].answer
                        ? 'bg-green-500 text-white'
                        : showExplanation && selectedAnswer === index && index !== questions[currentQuestion].answer
                        ? 'bg-red-500 text-white'
                        : selectedAnswer === index
                        ? 'bg-blue-500 text-white'
                        : isDarkMode 
                          ? 'bg-gray-600 text-gray-300' 
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mb-6 p-4 rounded-xl ${isDarkMode ? 'bg-blue-900 border border-blue-700' : 'bg-blue-50 border border-blue-200'} animate-in slide-in-from-bottom duration-300`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                {lang === "bn" ? "ব্যাখ্যা:" : "Explanation:"}
              </h3>
              <p className={`${isDarkMode ? 'text-blue-100' : 'text-blue-700'}`}>
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className={`px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                } shadow-lg animate-in slide-in-from-right duration-300`}
              >
                {currentQuestion === questions.length - 1 
                  ? (lang === "bn" ? "ফলাফল দেখুন" : "View Results")
                  : (lang === "bn" ? "পরবর্তী" : "Next")
                }
              </button>
            </div>
          )}
        </div>

        {/* Vector Visualization */}
        <div className={`max-w-2xl mx-auto mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {lang === "bn" ? "ভেক্টর ভিজ্যুয়ালাইজেশন" : "Vector Visualization"}
          </h3>
          <div className="flex justify-center items-center h-40">
            <svg width="200" height="120" viewBox="0 0 200 120" className="border rounded-lg">
              {/* Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={isDarkMode ? "#374151" : "#e5e7eb"} strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="200" height="120" fill="url(#grid)" />
              
              {/* Vector A */}
              <g>
                <line x1="50" y1="80" x2="120" y2="40" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead-blue)"/>
                <text x="85" y="55" fill={isDarkMode ? "#93c5fd" : "#1d4ed8"} fontSize="12" fontWeight="bold">A</text>
              </g>
              
              {/* Vector B */}
              <g>
                <line x1="50" y1="80" x2="100" y2="100" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead-red)"/>
                <text x="75" y="95" fill={isDarkMode ? "#fca5a5" : "#dc2626"} fontSize="12" fontWeight="bold">B</text>
              </g>
              
              {/* Resultant Vector */}
              <g>
                <line x1="50" y1="80" x2="150" y2="60" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead-green)"/>
                <text x="100" y="65" fill={isDarkMode ? "#6ee7b7" : "#059669"} fontSize="12" fontWeight="bold">A+B</text>
              </g>
              
              {/* Arrow markers */}
              <defs>
                <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
                <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}