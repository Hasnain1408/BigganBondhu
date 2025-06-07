// vectorComponentQuiz.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizContent } from "../../../../quiz/types";
import QuizControls from "../../../../quiz/quizControls";
// import { Button } from "@/components/ui/button";
// import { Globe, Sun, Moon } from "lucide-react";
// import QuizQuestion from "../../../../quiz/quizQuestion";
// import QuizResult from "../../../../quiz/quizResult";


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
    "question": {
      "en": "A vector has a magnitude of 20 and makes a 60° angle with the x-axis. What is its x-component?",
      "bn": "একটি ভেক্টরের মান 20 এবং x-অক্ষের সাথে কোণ 60°। এর x-উপাংশ কত?"
    },
    "options": [
      { "en": "10.0", "bn": "10.0" },
      { "en": "17.32", "bn": "17.32" },
      { "en": "20.0", "bn": "20.0" },
      { "en": "11.55", "bn": "11.55" }
    ],
    "answer": 0,
    "explanation": {
      "en": "x-component = |V| × cos θ = 20 × cos(60°) = 20 × 0.5 = 10.0. Remember: cos(60°) = 0.5.",
      "bn": "x-উপাংশ = |V| × cos θ = 20 × cos(60°) = 20 × 0.5 = 10.0। cos(60°) = 0.5।"
    }
  },
  {
    "question": {
      "en": "A vector has a magnitude of 15 and makes a 45° angle with the x-axis. What is its y-component?",
      "bn": "একটি ভেক্টরের মান 15 এবং x-অক্ষের সাথে কোণ 45°। এর y-উপাংশ কত?"
    },
    "options": [
      { "en": "7.5", "bn": "7.5" },
      { "en": "10.61", "bn": "10.61" },
      { "en": "15.0", "bn": "15.0" },
      { "en": "12.25", "bn": "12.25" }
    ],
    "answer": 1,
    "explanation": {
      "en": "y-component = |V| × sin θ = 15 × sin(45°) = 15 × (√2/2) ≈ 15 × 0.707 = 10.61. Remember: sin(45°) = √2/2 ≈ 0.707.",
      "bn": "y-উপাংশ = |V| × sin θ = 15 × sin(45°) = 15 × (√2/2) ≈ 15 × 0.707 = 10.61। sin(45°) = √2/2 ≈ 0.707।"
    }
  },
  {
    "question": {
      "en": "What is the magnitude of a vector with components Vₓ = 3 and Vᵧ = 4?",
      "bn": "Vₓ = 3 এবং Vᵧ = 4 উপাংশ বিশিষ্ট ভেক্টরের মান কত?"
    },
    "options": [
      { "en": "5.0", "bn": "5.0" },
      { "en": "7.0", "bn": "7.0" },
      { "en": "3.5", "bn": "3.5" },
      { "en": "4.5", "bn": "4.5" }
    ],
    "answer": 0,
    "explanation": {
      "en": "Magnitude = √(Vₓ² + Vᵧ²) = √(3² + 4²) = √(9 + 16) = √25 = 5.0.",
      "bn": "মান = √(Vₓ² + Vᵧ²) = √(3² + 4²) = √(9 + 16) = √25 = 5.0।"
    }
  },
  {
    "question": {
      "en": "A vector’s x-component is 12 and y-component is 5. What angle does it make with the x-axis?",
      "bn": "একটি ভেক্টরের x-উপাংশ 12 এবং y-উপাংশ 5। এটি x-অক্ষের সাথে কী কোণ গঠন করে?"
    },
    "options": [
      { "en": "22.62°", "bn": "22.62°" },
      { "en": "67.38°", "bn": "67.38°" },
      { "en": "45.0°", "bn": "45.0°" },
      { "en": "30.0°", "bn": "30.0°" }
    ],
    "answer": 0,
    "explanation": {
      "en": "Angle θ = tan⁻¹(Vᵧ/Vₓ) = tan⁻¹(5/12) ≈ tan⁻¹(0.4167) ≈ 22.62°. Use arctangent to find the angle.",
      "bn": "কোণ θ = tan⁻¹(Vᵧ/Vₓ) = tan⁻¹(5/12) ≈ tan⁻¹(0.4167) ≈ 22.62°। কোণ নির্ণয়ে আর্কট্যানজেন্ট ব্যবহার করুন।"
    }
  },
  {
    "question": {
      "en": "Which of the following correctly describes the relationship between a vector’s magnitude and its components?",
      "bn": "নিম্নলিখিত কোনটি ভেক্টরের মান এবং এর উপাংশগুলির সম্পর্ক সঠিকভাবে বর্ণনা করে?"
    },
    "options": [
      { "en": "|V| = Vₓ + Vᵧ", "bn": "|V| = Vₓ + Vᵧ" },
      { "en": "|V| = √(Vₓ² + Vᵧ²)", "bn": "|V| = √(Vₓ² + Vᵧ²)" },
      { "en": "|V| = Vₓ² + Vᵧ²", "bn": "|V| = Vₓ² + Vᵧ²" },
      { "en": "|V| = |Vₓ| × |Vᵧ|", "bn": "|V| = |Vₓ| × |Vᵧ|" }
    ],
    "answer": 1,
    "explanation": {
      "en": "The magnitude of a vector is given by the Pythagorean theorem: |V| = √(Vₓ² + Vᵧ²), combining the squares of its x and y components.",
      "bn": "ভেক্টরের মান পিথাগোরাস উপপাদ্য দ্বারা নির্ণয় করা হয়: |V| = √(Vₓ² + Vᵧ²), যা এর x এবং y উপাংশের বর্গের সমষ্টি।"
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



