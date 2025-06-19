
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Special Relativity Quiz",
    bn: "বিশেষ আপেক্ষিকতা কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of special relativity concepts",
    bn: "বিশেষ আপেক্ষিকতার ধারণা সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the principle of relativity?",
        bn: "আপেক্ষিকতার নীতি কী?"
      },
      options: [
        { en: "Light speed varies by observer", bn: "আলোর গতি পর্যবেক্ষকের উপর নির্ভর করে" },
        { en: "Physical laws are the same in all inertial frames", bn: "ভৌত আইন সব ইনার্শিয়াল ফ্রেমে একই" },
        { en: "Time is absolute", bn: "সময় নিরঙ্কুশ" },
        { en: "Space is fixed", bn: "স্থান স্থির" }
      ],
      answer: 1,
      explanation: {
        en: "The principle of relativity states that the laws of physics are identical in all inertial reference frames.",
        bn: "আপেক্ষিকতার নীতি বলে যে পদার্থবিজ্ঞানের আইন সব ইনার্শিয়াল রেফারেন্স ফ্রেমে একই।"
      }
    },
    {
      question: {
        en: "What does time dilation imply?",
        bn: "সময় প্রসারণ কী বোঝায়?"
      },
      options: [
        { en: "Moving clocks run faster", bn: "চলমান ঘড়ি দ্রুত চলে" },
        { en: "Moving clocks run slower", bn: "চলমান ঘড়ি ধীরে চলে" },
        { en: "Time is constant", bn: "সময় ধ্রুবক" },
        { en: "Clocks stop at light speed", bn: "আলোর গতিতে ঘড়ি থেমে যায়" }
      ],
      answer: 1,
      explanation: {
        en: "Time dilation means a clock moving relative to an observer runs slower, as given by Δt = Δt₀ / √(1 - v²/c²).",
        bn: "সময় প্রসারণের অর্থ হল একটি পর্যবেক্ষকের সাপেক্ষে চলমান ঘড়ি ধীরে চলে, যেমন Δt = Δt₀ / √(1 - v²/c²) দ্বারা দেওয়া।"
      }
    },
    {
      question: {
        en: "What is the formula for length contraction?",
        bn: "দৈর্ঘ্য সংকোচনের সূত্র কী?"
      },
      options: [
        { en: "L = L₀ √(1 - v²/c²)", bn: "L = L₀ √(1 - v²/c²)" },
        { en: "L = L₀ / √(1 - v²/c²)", bn: "L = L₀ / √(1 - v²/c²)" },
        { en: "L = L₀ (1 - v²/c²)", bn: "L = L₀ (1 - v²/c²)" },
        { en: "L = L₀ v/c", bn: "L = L₀ v/c" }
      ],
      answer: 0,
      explanation: {
        en: "Length contraction is given by L = L₀ √(1 - v²/c²), where L₀ is the proper length.",
        bn: "দৈর্ঘ্য সংকোচন L = L₀ √(1 - v²/c²) দ্বারা দেওয়া হয়, যেখানে L₀ হল সঠিক দৈর্ঘ্য।"
      }
    },
    {
      question: {
        en: "What is the Lorentz factor?",
        bn: "লরেন্টজ ফ্যাক্টর কী?"
      },
      options: [
        { en: "γ = √(1 - v²/c²)", bn: "γ = √(1 - v²/c²)" },
        { en: "γ = 1 / √(1 - v²/c²)", bn: "γ = 1 / √(1 - v²/c²)" },
        { en: "γ = v/c", bn: "γ = v/c" },
        { en: "γ = c/v", bn: "γ = c/v" }
      ],
      answer: 1,
      explanation: {
        en: "The Lorentz factor is γ = 1 / √(1 - v²/c²), used in time dilation and length contraction.",
        bn: "লরেন্টজ ফ্যাক্টর হল γ = 1 / √(1 - v²/c²), যা সময় প্রসারণ এবং দৈর্ঘ্য সংকোচনে ব্যবহৃত হয়।"
      }
    },
    {
      question: {
        en: "Why is special relativity important for GPS?",
        bn: "জিপিএসের জন্য বিশেষ আপেক্ষিকতা কেন গুরুত্বপূর্ণ?"
      },
      options: [
        { en: "Adjusts for satellite speed", bn: "উপগ্রহের গতির জন্য সমন্বয় করে" },
        { en: "Increases signal strength", bn: "সিগন্যালের শক্তি বাড়ায়" },
        { en: "Reduces battery usage", bn: "ব্যাটারি ব্যবহার কমায়" },
        { en: "Improves antenna design", bn: "অ্যান্টেনার নকশা উন্নত করে" }
      ],
      answer: 0,
      explanation: {
        en: "GPS accounts for time dilation due to the relative motion of satellites, ensuring accurate positioning.",
        bn: "জিপিএস উপগ্রহের আপেক্ষিক গতির কারণে সময় প্রসারণের জন্য সমন্বয় করে, সঠিক অবস্থান নিশ্চিত করে।"
      }
    }
  ]
}

export default function SpecialRelativityQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Special Relativity Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
