import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, RotateCcw, Globe, Target, Zap, CheckCircle, Trophy, Star, Crown, Sparkles } from "lucide-react";
import { QuizTexts, Language } from "./types";

interface QuizResultProps {
  lang: Language;
  darkMode: boolean;
  score: number;
  bestStreak: number;
  perfectAnswers: number;
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
  perfectAnswers,
  questionsLength,
  texts,
  onRetry,
  onLanguageToggle,
}: QuizResultProps) {
  const percentage = Math.round((score / questionsLength) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "🏆 " + texts.excellent + " Masterful!";
    if (percentage >= 80) return "⭐ " + texts.excellent;
    if (percentage >= 60) return "✨ " + texts.good;
    return "📚 " + texts.needsPractice;
  };

  const getScoreColor = () => {
    if (percentage >= 90) return "text-yellow-600";
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    return "text-red-600";
  };

  const getGradientColors = () => {
    if (percentage >= 90) return "from-yellow-500 to-orange-500";
    if (percentage >= 80) return "from-green-500 to-emerald-500";
    if (percentage >= 60) return "from-blue-500 to-cyan-500";
    return "from-red-500 to-pink-500";
  };

  const getBadges = () => {
    const badges = [];
    if (percentage === 100) badges.push({ icon: Crown, text: "Perfect Score!", color: "bg-yellow-500" });
    if (bestStreak >= 5) badges.push({ icon: Zap, text: "Streak Master!", color: "bg-orange-500" });
    if (perfectAnswers >= 3) badges.push({ icon: Star, text: "Speed Demon!", color: "bg-purple-500" });
    if (score >= questionsLength * 0.8) badges.push({ icon: Trophy, text: "High Achiever!", color: "bg-green-500" });
    return badges;
  };

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

      <div className="relative max-w-6xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="w-full">
          {/* Main Result Card */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
            <Card className="relative shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden">
              
              {/* Header */}
              <CardHeader className={`text-center bg-gradient-to-r ${getGradientColors()} text-white p-8 relative overflow-hidden`}>
                {/* Floating sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  <Sparkles className="absolute top-4 left-8 w-6 h-6 text-yellow-300 animate-pulse" />
                  <Sparkles className="absolute top-12 right-12 w-4 h-4 text-white animate-bounce" />
                  <Sparkles className="absolute bottom-8 left-16 w-5 h-5 text-yellow-200 animate-ping" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
                      <Award className="w-16 h-16 text-yellow-300" />
                    </div>
                    <div>
                      <CardTitle className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                        {texts.finalScore}
                      </CardTitle>
                      <p className={`text-2xl font-bold animate-pulse`}>
                        {getScoreMessage()}
                      </p>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  {getBadges().length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      {getBadges().map((badge, index) => (
                        <div
                          key={index}
                          className={`${badge.color} text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold animate-in slide-in-from-bottom-4 duration-500`}
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          <badge.icon className="w-4 h-4" />
                          {badge.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Score Display */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className={`text-8xl font-bold ${getScoreColor()} animate-in zoom-in-50 duration-1000`}>
                      {percentage}%
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 rounded-full blur animate-pulse"></div>
                  </div>
                  <p className="text-gray-600 text-xl mt-2">Overall Performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {/* Total Score */}
                  <div className="group text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300">
                      <Target className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2 animate-in slide-in-from-bottom-4 duration-500">
                      {score}/{questionsLength}
                    </div>
                    <p className="text-blue-100 font-semibold">{texts.score}</p>
                  </div>

                  {/* Best Streak */}
                  <div className="group text-center p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                      {bestStreak}
                    </div>
                    <p className="text-orange-100 font-semibold">{texts.bestStreak}</p>
                  </div>

                  {/* Perfect Answers */}
                  <div className="group text-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300">
                      <Star className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-400">
                      {perfectAnswers}
                    </div>
                    <p className="text-purple-100 font-semibold">Perfect</p>
                  </div>

                  {/* Accuracy */}
                  <div className="group text-center p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-600">
                      {percentage}%
                    </div>
                    <p className="text-green-100 font-semibold">Accuracy</p>
                  </div>
                </div>

                {/* Performance Visualization */}
                <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Performance Breakdown</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{score}/{questionsLength} questions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getGradientColors()} rounded-full transition-all duration-2000 ease-out relative overflow-hidden`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform translate-x-[-100%] animate-shimmer"></div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onRetry}
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                      {texts.retryQuiz}
                    </div>
                  </Button>
                  
                  <Button
                    onClick={onLanguageToggle}
                    variant="outline"
                    className="group border-3 border-purple-300 text-purple-700 hover:bg-purple-50 px-12 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      Switch to {lang === "en" ? "বাংলা" : "English"}
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Message */}
          <div className="text-center">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <p className="text-gray-700 text-lg font-medium">
                {percentage >= 80 
                  ? "🎉 Outstanding work! You've mastered the concepts!" 
                  : percentage >= 60
                  ? "💪 Great effort! Keep practicing to improve even more!"
                  : "📖 Don't give up! Review the explanations and try again!"
                }
              </p>
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
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}