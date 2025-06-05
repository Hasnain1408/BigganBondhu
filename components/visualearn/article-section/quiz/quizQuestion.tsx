// quizQuestion.tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Target, ArrowRight } from "lucide-react";
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
}: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      {/* Question */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 leading-relaxed">
          {question.question[lang]}
        </h3>
        <RadioGroup
          value={selected?.toString()}
          onValueChange={(value) => onSelect(parseInt(value))}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                disabled={showExplanation}
              />
              <Label
                htmlFor={`option-${index}`}
                className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selected === index
                    ? darkMode
                      ? 'border-blue-400 bg-blue-900/30 text-blue-100'
                      : 'border-blue-500 bg-blue-50 text-blue-800'
                    : darkMode
                      ? 'border-gray-600 hover:border-blue-400 hover:bg-blue-900/20 text-gray-200'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 text-gray-800'
                } ${showExplanation ? 'cursor-not-allowed' : ''}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option[lang]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-xl border-2 ${
          selected === question.answer
            ? 'border-green-300 bg-green-50'
            : 'border-red-300 bg-red-50'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {selected === question.answer ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${
              selected === question.answer
                ? 'text-green-700'
                : 'text-red-700'
            }`}>
              {selected === question.answer ? texts.correct : texts.incorrect}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>{texts.explanation}</strong> {question.explanation[lang]}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end mt-8">
        {!showExplanation ? (
          <Button
            onClick={onSubmit}
            disabled={selected === null}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
          >
            <Target className="w-4 h-4 mr-2" />
            {texts.submit}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {currentQuestion === questionsLength - 1 ? texts.finalScore : texts.nextQuestion}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}