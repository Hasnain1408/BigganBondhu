
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Universal Gravitation Quiz",
    bn: "সর্বজনীন মাধ্যাকর্ষণ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Universal Gravitation",
    bn: "সর্বজনীন মাধ্যাকর্ষণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Newton’s law of universal gravitation describe?",
        bn: "নিউটনের সর্বজনীন মাধ্যাকর্ষণ আইন কী বর্ণনা করে?"
      },
      options: [
        { en: "Electric forces", bn: "বৈদ্যুতিক শক্তি" },
        { en: "Gravitational forces", bn: "মাধ্যাকর্ষণ শক্তি" },
        { en: "Magnetic forces", bn: "চৌম্বক শক্তি" },
        { en: "Nuclear forces", bn: "নিউক্লিয়ার শক্তি" }
      ],
      answer: 1,
      explanation: {
        en: "Newton’s law describes gravitational forces between masses.",
        bn: "নিউটনের আইন ভরগুলির মধ্যে মাধ্যাকর্ষণ শক্তি বর্ণনা করে।"
      }
    },
    {
      question: {
        en: "What is the formula for gravitational force?",
        bn: "মাধ্যাকর্ষণ শক্তির সূত্র কী?"
      },
      options: [
        { en: "F = m₁m₂ / r", bn: "F = m₁m₂ / r" },
        { en: "F = G m₁m₂ / r²", bn: "F = G m₁m₂ / r²" },
        { en: "F = G r² / m₁m₂", bn: "F = G r² / m₁m₂" },
        { en: "F = G m₁m₂ / r", bn: "F = G m₁m₂ / r" }
      ],
      answer: 1,
      explanation: {
        en: "The formula is F = G m₁m₂ / r².",
        bn: "সূত্রটি হল F = G m₁m₂ / r²।"
      }
    },
    {
      question: {
        en: "What happens to gravitational force if distance doubles?",
        bn: "দূরত্ব দ্বিগুণ হলে মাধ্যাকর্ষণ শক্তির কী হয়?"
      },
      options: [
        { en: "Doubles", bn: "দ্বিগুণ" },
        { en: "Quadruples", bn: "চারগুণ" },
        { en: "Halves", bn: "অর্ধেক" },
        { en: "Quartered", bn: "চতুর্থাংশ" }
      ],
      answer: 3,
      explanation: {
        en: "Force is quartered as it’s inversely proportional to distance squared.",
        bn: "শক্তি চতুর্থাংশ হয় কারণ এটি দূরত্বের বর্গের বিপরীত সমানুপাতিক।"
      }
    },
    {
      question: {
        en: "What is an example of universal gravitation?",
        bn: "সর্বজনীন মাধ্যাকর্ষণের একটি উদাহরণ কী?"
      },
      options: [
        { en: "Electric current", bn: "বৈদ্যুতিক প্রবাহ" },
        { en: "Planetary motion", bn: "গ্রহের গতি" },
        { en: "Chemical reaction", bn: "রাসায়নিক বিক্রিয়া" },
        { en: "Sound waves", bn: "শব্দ তরঙ্গ" }
      ],
      answer: 1,
      explanation: {
        en: "Planetary motion is governed by universal gravitation.",
        bn: "গ্রহের গতি সর্বজনীন মাধ্যাকর্ষণ দ্বারা নিয়ন্ত্রিত হয়।"
      }
    },
    {
      question: {
        en: "What is an application of universal gravitation?",
        bn: "সর্বজনীন মাধ্যাকর্ষণের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Satellite orbits", bn: "উপগ্রহ কক্ষপথ" },
        { en: "Battery design", bn: "ব্যাটারি ডিজাইন" },
        { en: "Circuit analysis", bn: "সার্কিট বিশ্লেষণ" },
        { en: "Drug synthesis", bn: "ওষুধ সংশ্লেষণ" }
      ],
      answer: 0,
      explanation: {
        en: "Satellite orbits rely on universal gravitation.",
        bn: "উপগ্রহ কক্ষপথ সর্বজনীন মাধ্যাকর্ষণের উপর নির্ভর করে।"
      }
    }
  ]
}

export default function UniversalGravitationQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Physics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
