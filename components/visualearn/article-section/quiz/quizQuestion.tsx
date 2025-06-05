// quizQuestion.tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Target, ArrowRight, Sparkles, Clock } from "lucide-react";
import { Question, Language, QuizTexts } from "./types";

interface QuizQuestionProps {
  question: Question;
  lang: Language;
  darkMode: boolean;
  selected: number | null;
  showExplanation: boolean;
  texts: QuizTexts;
  onSelect: (value: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  questionsLength: number;
  currentQuestion: number;
  timeLeft: number;
  streak: number;
}

export default function QuizQuestion({
  question,
  lang,
  darkMode,
  selected,
  showExplanation,
  texts,
  onSelect,
  onSubmit,
  onNext,
  questionsLength,
  currentQuestion,
  timeLeft,
  streak,
}: QuizQuestionProps) {
  const getOptionAnimation = (index: number) => {
    return `animate-in slide-in-from-left-5 duration-500 delay-${index * 100}`;
  };

  const getResultIcon = () => {
    if (selected === question.answer) {
      return <CheckCircle className="w-6 h-6 text-green-600 animate-bounce" />;
    }
    return <XCircle className="w-6 h-6 text-red-600 animate-pulse" />;
  };

  return (
    <div className="space-y-8 relative">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-12 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Question Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <span className="text-white font-bold text-sm">{currentQuestion + 1}</span>
                </div>
                <div className="h-1 flex-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((currentQuestion + 1) / questionsLength) * 100}%` }}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 leading-relaxed bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                {question.question[lang]}
              </h3>
            </div>
            
            {/* Timer indicator */}
            <div className={`ml-4 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
              timeLeft <= 10 
                ? 'bg-red-100 text-red-700 animate-pulse shadow-lg shadow-red-200' 
                : timeLeft <= 20
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>

          {/* Options */}
          <RadioGroup
            value={selected?.toString()}
            onValueChange={(value) => onSelect(parseInt(value))}
            className="space-y-4"
            disabled={showExplanation || timeLeft === 0} // Disable when time is up
          >
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`${getOptionAnimation(index)} transform transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="relative group/option">
                  <div className={`absolute -inset-0.5 rounded-xl blur transition-all duration-300 ${
                    selected === index
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-50'
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 opacity-0 group-hover/option:opacity-30'
                  }`}></div>
                  
                  <div className="relative flex items-center space-x-4">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className={`transition-all duration-300 ${
                        selected === index ? 'text-blue-600 scale-110' : 'text-gray-400'
                      }`}
                      disabled={showExplanation}
                    />
                    
                    <Label
                      htmlFor={`option-${index}`}
                      className={`flex-1 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group/label ${
                        selected === index
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 shadow-lg transform scale-[1.01]'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 text-gray-800 hover:shadow-md'
                      } ${showExplanation ? 'cursor-not-allowed opacity-75' : 'hover:transform hover:translate-y-[-2px]'}`}
                    >
                      {/* Option letter */}
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold transition-all duration-300 ${
                          selected === index
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 group-hover/label:bg-gradient-to-r group-hover/label:from-blue-100 group-hover/label:to-purple-100'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium text-lg">{option[lang]}</span>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/label:opacity-20 transform translate-x-[-100%] group-hover/label:translate-x-[100%] transition-all duration-1000"></div>
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Explanation Card */}
      {showExplanation && (
        <div className={`transform animate-in slide-in-from-bottom-5 duration-500 relative group`}>
          <div className={`absolute -inset-0.5 rounded-2xl blur transition-all duration-300 ${
            selected === question.answer
              ? 'bg-gradient-to-r from-green-400 to-emerald-400 opacity-50'
              : 'bg-gradient-to-r from-red-400 to-rose-400 opacity-50'
          }`}></div>
          
          <div className={`relative p-6 rounded-2xl border-2 shadow-xl ${
            selected === question.answer
              ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50'
              : 'border-red-300 bg-gradient-to-br from-red-50 to-rose-50'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-full ${
                selected === question.answer
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}>
                {getResultIcon()}
              </div>
              <span className={`font-bold text-xl ${
                selected === question.answer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {selected === question.answer ? texts.correct : texts.incorrect}
              </span>
              {selected === question.answer && (
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              )}
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/50">
              <p className="text-gray-800 leading-relaxed text-lg">
                <span className="font-bold text-gray-900">{texts.explanation}</span> {question.explanation[lang]}
              </p>
            </div>
            
            {/* Correct answer highlight */}
            {selected !== question.answer && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  <span className="font-bold">Correct answer:</span> {String.fromCharCode(65 + question.answer)}. {question.options[question.answer][lang]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end mt-8">
        {!showExplanation ? (
          <Button
            onClick={onSubmit}
            disabled={selected === null}
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl px-10 py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold text-lg">{texts.submit}</span>
            </div>
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="group relative bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <span className="font-semibold text-lg">
                {currentQuestion === questionsLength - 1 ? texts.finalScore : texts.nextQuestion}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}