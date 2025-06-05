import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, RotateCcw, Globe, Target, Zap, CheckCircle } from "lucide-react";
import { QuizTexts, Language } from "./types";

interface QuizResultProps {
  lang: Language;
  darkMode: boolean;
  score: number;
  bestStreak: number;
  questionsLength: number;
  texts: QuizTexts;
  onRetry: () => void;
  onLanguageToggle: () => void;
}

export default function QuizResult({
  lang,
  darkMode,
  score,
  bestStreak,
  questionsLength,
  texts,
  onRetry,
  onLanguageToggle,
}: QuizResultProps) {
  const getScoreMessage = () => {
    const percentage = (score / questionsLength) * 100;
    if (percentage >= 80) return texts.excellent;
    if (percentage >= 60) return texts.good;
    return texts.needsPractice;
  };

  const getScoreColor = () => {
    const percentage = (score / questionsLength) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

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
              <div className="text-3xl font-bold mb-2">
                {score}/{questionsLength}
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
                {Math.round((score / questionsLength) * 100)}%
              </div>
              <p className="text-purple-100">Accuracy</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {texts.retryQuiz}
            </Button>
            <Button
              onClick={onLanguageToggle}
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
  );
}