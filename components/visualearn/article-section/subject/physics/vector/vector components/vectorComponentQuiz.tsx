// vectorComponentQuiz.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Sun, Moon } from "lucide-react";
import QuizQuestion from "../../../../quiz/quizQuestion";
import QuizControls from "../../../../quiz/quizControls";
import QuizResult from "../../../../quiz/quizResult";
import { QuizContent } from "../../../../quiz/types";

// Quiz data - only thing that changes between different topic quizzes
const quizData: QuizContent = {
  title: {
    en: "Vector Components Quiz",
    bn: "ভেক্টর উপাংশ কুইজ"
  },
  subtitle: {
    en: "Test your vector knowledge",
    bn: "আপনার ভেক্টর জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "A vector has magnitude 10 and makes 30° angle with x-axis. What is its x-component?",
        bn: "একটি ভেক্টরের মান 10 এবং x-অক্ষের সাথে কোণ 30°। এর x-উপাংশ কত?"
      },
      options: [
        { en: "5.0", bn: "5.0" },
        { en: "8.66", bn: "8.66" },
        { en: "10.0", bn: "10.0" },
        { en: "6.93", bn: "6.93" }
      ],
      answer: 1,
      explanation: {
        en: "x-component = |V| × cos θ = 10 × cos(30°) = 10 × 0.866 = 8.66. Remember: cos(30°) = √3/2 ≈ 0.866.",
        bn: "x-উপাংশ = |V| × cos θ = 10 × cos(30°) = 10 × 0.866 = 8.66। cos(30°) = √3/2 ≈ 0.866।"
      }
    },
    {
      question: {
        en: "Which formula is correct for vector component analysis?",
        bn: "ভেক্টর উপাংশ বিশ্লেষণে কোন সূত্রটি সঠিক?"
      },
      options: [
        { en: "Vₓ = |V| sin θ, Vᵧ = |V| cos θ", bn: "Vₓ = |V| sin θ, Vᵧ = |V| cos θ" },
        { en: "Vₓ = |V| cos θ, Vᵧ = |V| sin θ", bn: "Vₓ = |V| cos θ, Vᵧ = |V| sin θ" },
        { en: "Vₓ = |V| tan θ, Vᵧ = |V| cot θ", bn: "Vₓ = |V| tan θ, Vᵧ = |V| cot θ" },
        { en: "Vₓ = |V|/cos θ, Vᵧ = |V|/sin θ", bn: "Vₓ = |V|/cos θ, Vᵧ = |V|/sin θ" }
      ],
      answer: 1,
      explanation: {
        en: "The correct formulas are: Vₓ = |V| cos θ (horizontal component) and Vᵧ = |V| sin θ (vertical component), where θ is the angle with x-axis.",
        bn: "ভেক্টর উপাংশের সঠিক সূত্র: Vₓ = |V| cos θ (অনুভূমিক উপাংশ) এবং Vᵧ = |V| sin θ (উল্লম্ব উপাংশ), যেখানে θ হল x-অক্ষের সাথে কোণ।"
      }
    }
  ]
};

export default function VectorComponentQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Physics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  );
}



