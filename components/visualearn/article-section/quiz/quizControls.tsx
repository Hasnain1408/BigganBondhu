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
    <div className={`min-h-screen transition-all duration-1000 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800" 
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto p-6">
        {/* Header Card */}
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                  <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Trophy className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    {quizData.title[lang]}
                  </h1>
                </div>
                <p className="text-blue-100 text-lg font-medium">{quizData.subtitle[lang]}</p>
              </div>
              
              {/* Language and Dark Mode Toggle */}
              <div className="flex gap-4">
                <Button
                  onClick={toggleLanguage}
                  variant="outline"
                  className="group border-2 border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold">{lang === "en" ? "বাংলা" : "English"}</span>
                </Button>
                <Button
                  onClick={toggleDarkMode}
                  variant="outline"
                  className="group border-2 border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
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

        {/* Main Quiz Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Enhanced Stats Bar */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100 p-6">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Question Progress */}
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {currentQuestion + 1}/{quizData.questions.length}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{texts.question}</div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-3xl font-bold text-green-600">{score}</span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{texts.score}</div>
                  </div>
                </div>

                {/* Streak */}
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className={`w-5 h-5 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-400'}`} />
                      <span className="text-3xl font-bold text-purple-600">{streak}</span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{texts.streak}</div>
                    {getStreakBonus() && (
                      <div className="text-xs font-bold text-orange-600 animate-bounce mt-1">
                        {getStreakBonus()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timer */}
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className={`bg-white rounded-2xl p-4 shadow-lg border transition-all duration-300 ${
                    timeLeft <= 10 
                      ? 'border-red-200 bg-red-50 animate-pulse' 
                      : timeLeft <= 20
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Timer className={`w-5 h-5 ${
                        timeLeft <= 10 ? 'text-red-500' : timeLeft <= 20 ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span className={`text-3xl font-bold ${
                        timeLeft <= 10 ? 'text-red-600' : timeLeft <= 20 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {timeLeft}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{texts.timeLeft}</div>
                  </div>
                </div>

                {/* Perfect Answers */}
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-pink-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="w-5 h-5 text-pink-500" />
                      <span className="text-3xl font-bold text-pink-600">{perfectAnswers}</span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Perfect</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="relative w-full bg-gray-200 h-3 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`,
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform translate-x-[-100%] animate-shimmer"></div>
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

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}