// quizControls.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Sun, Moon } from "lucide-react";
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

  const texts = getQuizTexts(lang);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showExplanation && !isQuizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleSubmit();
    }
  }, [timeLeft, showExplanation, isQuizFinished]);

  const handleSubmit = () => {
    if (selected === null) return;
    
    setShowExplanation(true);
    
    if (selected === quizData.questions[currentQuestion].answer) {
      setScore(score + 1);
      setStreak(streak + 1);
      setBestStreak(Math.max(bestStreak, streak + 1));
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

  if (isQuizFinished) {
    return (
      <QuizResult
        lang={lang}
        darkMode={darkMode}
        score={score}
        bestStreak={bestStreak}
        questionsLength={quizData.questions.length}
        texts={texts}
        onRetry={handleRetry}
        onLanguageToggle={toggleLanguage}
      />
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
    }`}>
      {/* Header with title and controls */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {quizData.title[lang]}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{quizData.subtitle[lang]}</p>
        
        {/* Language and Dark Mode Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={toggleLanguage}
            variant="outline"
            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <Globe className="w-4 h-4 mr-2" />
            {lang === "en" ? "বাংলা" : "English"}
          </Button>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Progress and Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-center gap-6 mb-4 sm:mb-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {currentQuestion + 1}/{quizData.questions.length}
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
          style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
        />
      </div>

      {/* Quiz Question Component */}
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
      />
    </div>
  );
}



