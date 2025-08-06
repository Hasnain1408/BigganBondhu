// quizControls.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Sun, Moon, Zap, Trophy, Timer, Star } from "lucide-react";
import QuizQuestion from "./quizQuestion";
import QuizResult from "./quizResult";
import { QuizContent, Language, getQuizTexts } from "./types";

interface QuizControlsProps {
  quizData: QuizContent;
}

export default function QuizControls({ quizData }: QuizControlsProps) {
  const [lang, setLang] = useState<Language>("en");
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [perfectAnswers, setPerfectAnswers] = useState(0);

  const texts = getQuizTexts(lang);

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0 && !showExplanation && !isQuizFinished) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !showExplanation) {
            // Automatically submit when time runs out
            if (selected === null) {
                // If no option was selected, force select a dummy value (-1) to trigger submission
                setSelected(-1);
            }
            handleSubmit();
        }
    }, [timeLeft, showExplanation, isQuizFinished]);

    const handleSubmit = () => {
        // If time ran out and no option was selected, treat as incorrect
        if (timeLeft === 0 && selected === null) {
            setShowExplanation(true);
            setStreak(0);
            return;
        }

        if (selected === null || selected === -1) return;

        setShowExplanation(true);

        if (selected === quizData.questions[currentQuestion].answer) {
            setScore(score + 1);
            setStreak(streak + 1);
            setBestStreak(Math.max(bestStreak, streak + 1));

            if (timeLeft > 20) {
                setPerfectAnswers(perfectAnswers + 1);
            }
        } else {
            setStreak(0);
        }
    };

  const handleNext = () => {
    if (currentQuestion === quizData.questions.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(30);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
    setPerfectAnswers(0);
    setTimeLeft(30);
    setIsQuizFinished(false);
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "bn" : "en");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSelect = (value: number) => {
    if (!showExplanation) {
      setSelected(value);
    }
  };

  const getStreakBonus = () => {
    if (streak >= 5) return "🔥 ON FIRE!";
    if (streak >= 3) return "⚡ HOT STREAK!";
    if (streak >= 2) return "✨ STREAK!";
    return "";
  };

  if (isQuizFinished) {
    return (
      <QuizResult
        lang={lang}
        darkMode={darkMode}
        score={score}
        bestStreak={bestStreak}
        perfectAnswers={perfectAnswers}
        questionsLength={quizData.questions.length}
        texts={texts}
        onRetry={handleRetry}
        onLanguageToggle={toggleLanguage}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? "bg-gray-900" 
        : "bg-gray-50"
    }`}>
      {/* Subtle academic background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? '#374151' : '#6b7280'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto p-6">
        {/* Header Card - Academic Style */}
        <div className="mb-6">
          <div className={`${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          } rounded-lg shadow-lg p-8`}>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                  <div className={`p-2 rounded-full ${
                    darkMode ? "bg-blue-900/50" : "bg-blue-50"
                  }`}>
                    <Trophy className={`w-8 h-8 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                  </div>
                  <h1 className={`text-4xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {quizData.title[lang]}
                  </h1>
                </div>
                <p className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {quizData.subtitle[lang]}
                </p>
              </div>
              
              {/* Language and Dark Mode Toggle */}
              <div className="flex gap-4">
                <Button
                  onClick={toggleLanguage}
                  variant="outline"
                  className={`group px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700 bg-gray-800" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                  }`}
                >
                  <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold">{lang === "en" ? "বাংলা" : "English"}</span>
                </Button>
                <Button
                  onClick={toggleDarkMode}
                  variant="outline"
                  className={`group px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700 bg-gray-800" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                  }`}
                >
                  {darkMode ? 
                    <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> : 
                    <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Quiz Card - Professional Style */}
        <div className={`${
          darkMode 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white border border-gray-200"
        } rounded-lg shadow-lg overflow-hidden`}>
          
          {/* Stats Bar - Clean Academic Layout */}
          <div className={`${
            darkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
          } border-b p-6`}>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Question Progress */}
              <div className="text-center">
                <div className={`${
                  darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
                } rounded-lg p-4 shadow-sm border`}>
                  <div className={`text-3xl font-bold mb-1 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}>
                    {currentQuestion + 1}/{quizData.questions.length}
                  </div>
                  <div className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {texts.question}
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="text-center">
                <div className={`${
                  darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
                } rounded-lg p-4 shadow-sm border`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className={`w-5 h-5 ${
                      darkMode ? "text-yellow-400" : "text-yellow-500"
                    }`} />
                    <span className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}>
                      {score}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {texts.score}
                  </div>
                </div>
              </div>

              {/* Streak */}
              <div className="text-center">
                <div className={`${
                  darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
                } rounded-lg p-4 shadow-sm border`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className={`w-5 h-5 ${
                      streak > 0 
                        ? (darkMode ? 'text-orange-400 animate-pulse' : 'text-orange-500 animate-pulse')
                        : (darkMode ? 'text-gray-500' : 'text-gray-400')
                    }`} />
                    <span className={`text-3xl font-bold ${
                      darkMode ? "text-purple-400" : "text-purple-600"
                    }`}>
                      {streak}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {texts.streak}
                  </div>
                  {getStreakBonus() && (
                    <div className={`text-xs font-bold animate-bounce mt-1 ${
                      darkMode ? "text-orange-400" : "text-orange-600"
                    }`}>
                      {getStreakBonus()}
                    </div>
                  )}
                </div>
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className={`rounded-lg p-4 shadow-sm border transition-all duration-300 ${
                  timeLeft <= 10 
                    ? (darkMode ? 'border-red-600 bg-red-900/20' : 'border-red-200 bg-red-50') + ' animate-pulse'
                    : timeLeft <= 20
                    ? (darkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50')
                    : (darkMode ? 'border-green-600 bg-green-900/20' : 'border-green-200 bg-green-50')
                }`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Timer className={`w-5 h-5 ${
                      timeLeft <= 10 
                        ? (darkMode ? 'text-red-400' : 'text-red-500')
                        : timeLeft <= 20 
                        ? (darkMode ? 'text-yellow-400' : 'text-yellow-500')
                        : (darkMode ? 'text-green-400' : 'text-green-500')
                    }`} />
                    <span className={`text-3xl font-bold ${
                      timeLeft <= 10 
                        ? (darkMode ? 'text-red-400' : 'text-red-600')
                        : timeLeft <= 20 
                        ? (darkMode ? 'text-yellow-400' : 'text-yellow-600')
                        : (darkMode ? 'text-green-400' : 'text-green-600')
                    }`}>
                      {timeLeft}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {texts.timeLeft}
                  </div>
                </div>
              </div>

              {/* Perfect Answers */}
              <div className="text-center">
                <div className={`${
                  darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
                } rounded-lg p-4 shadow-sm border`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className={`w-5 h-5 ${
                      darkMode ? "text-amber-400" : "text-amber-500"
                    }`} />
                    <span className={`text-3xl font-bold ${
                      darkMode ? "text-amber-400" : "text-amber-600"
                    }`}>
                      {perfectAnswers}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Perfect
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar - Minimal Academic Style */}
          <div className={`relative w-full h-2 ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}>
            <div 
              className={`absolute inset-0 h-full transition-all duration-1000 ease-out ${
                darkMode ? "bg-blue-500" : "bg-blue-600"
              }`}
              style={{ 
                width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`
              }}
            />
          </div>

          {/* Quiz Question Component */}
          <div className="p-8">
            <QuizQuestion
              question={quizData.questions[currentQuestion]}
              lang={lang}
              darkMode={darkMode}
              selected={selected}
              showExplanation={showExplanation}
              texts={texts}
              onSelect={handleSelect}
              onSubmit={handleSubmit}
              onNext={handleNext}
              questionsLength={quizData.questions.length}
              currentQuestion={currentQuestion}
              timeLeft={timeLeft}
              streak={streak}
            />
          </div>
        </div>
      </div>
    </div>
  );
}