
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Orbital Motion Quiz",
    bn: "কক্ষীয় গতি কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Orbital Motion",
    bn: "কক্ষীয় গতি সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Kepler’s First Law state?",
        bn: "কেপলারের প্রথম আইন কী বলে?"
      },
      options: [
        { en: "Orbits are circular", bn: "কক্ষ বৃত্তাকার" },
        { en: "Orbits are elliptical", bn: "কক্ষ উপবৃত্তাকার" },
        { en: "Equal areas in equal times", bn: "সমান সময়ে সমান ক্ষেত্রফল" },
        { en: "Period squared equals radius cubed", bn: "সময়ের বর্গ ব্যাসার্ধের ঘনফলের সমান" }
      ],
      answer: 1,
      explanation: {
        en: "Kepler’s First Law states that orbits are elliptical.",
        bn: "কেপলারের প্রথম আইন বলে যে কক্ষ উপবৃত্তাকার।"
      }
    },
    {
      question: {
        en: "What is the formula for orbital velocity?",
        bn: "কক্ষীয় বেগের সূত্র কী?"
      },
      options: [
        { en: "v = GM / r", bn: "v = GM / r" },
        { en: "v = √(GM / r)", bn: "v = √(GM / r)" },
        { en: "v = G r / M", bn: "v = G r / M" },
        { en: "v = √(G r / M)", bn: "v = √(G r / M)" }
      ],
      answer: 1,
      explanation: {
        en: "The formula is v = √(GM / r).",
        bn: "সূত্রটি হল v = √(GM / r)।"
      }
    },
    {
      question: {
        en: "What does Kepler’s Second Law describe?",
        bn: "কেপলারের দ্বিতীয় আইন কী বর্ণনা করে?"
      },
      options: [
        { en: "Orbit shape", bn: "কক্ষের আকৃতি" },
        { en: "Equal areas in equal times", bn: "সমান সময়ে সমান ক্ষেত্রফল" },
        { en: "Period and radius relation", bn: "সময় এবং ব্যাসার্ধের সম্পর্ক" },
        { en: "Orbital velocity", bn: "কক্ষীয় বেগ" }
      ],
      answer: 1,
      explanation: {
        en: "Kepler’s Second Law states equal areas are swept in equal times.",
        bn: "কেপলারের দ্বিতীয় আইন বলে সমান সময়ে সমান ক্ষেত্রফল পরিস্কৃত হয়।"
      }
    },
    {
      question: {
        en: "What is an example of orbital motion?",
        bn: "কক্ষীয় গতির একটি উদাহরণ কী?"
      },
      options: [
        { en: "Car on a road", bn: "রাস্তায় গাড়ি" },
        { en: "Satellite around Earth", bn: "পৃথিবীর চারপাশে উপগ্রহ" },
        { en: "Pendulum swing", bn: "দোলনার দোলা" },
        { en: "Falling object", bn: "পড়ন্ত বস্তু" }
      ],
      answer: 1,
      explanation: {
        en: "Satellites around Earth exhibit orbital motion.",
        bn: "পৃথিবীর চারপাশে উপগ্রহ কক্ষীয় গতি প্রদর্শন করে।"
      }
    },
    {
      question: {
        en: "What is an application of orbital motion?",
        bn: "কক্ষীয় গতির একটি প্রয়োগ কী?"
      },
      options: [
        { en: "GPS navigation", bn: "জিপিএস নেভিগেশন" },
        { en: "Battery design", bn: "ব্যাটারি ডিজাইন" },
        { en: "Circuit analysis", bn: "সার্কিট বিশ্লেষণ" },
        { en: "Chemical synthesis", bn: "রাসায়নিক সংশ্লেষণ" }
      ],
      answer: 0,
      explanation: {
        en: "GPS navigation relies on satellites in orbital motion.",
        bn: "জিপিএস নেভিগেশন কক্ষীয় গতিতে থাকা উপগ্রহের উপর নির্ভর করে।"
      }
    }
  ]
}

export default function OrbitalMotionQuiz() {
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
