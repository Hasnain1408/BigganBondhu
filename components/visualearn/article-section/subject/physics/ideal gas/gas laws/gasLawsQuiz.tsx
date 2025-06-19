
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Gas Laws Quiz",
    bn: "গ্যাসের সূত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Gas Laws",
    bn: "গ্যাসের সূত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Boyle’s Law state?",
        bn: "বয়েলের সূত্র কী বলে?"
      },
      options: [
        { en: "P and V are proportional", bn: "চাপ এবং আয়তন সমানুপাতিক" },
        { en: "P and V are inversely proportional", bn: "চাপ এবং আয়তন বিপরীত সমানুপাতিক" },
        { en: "V and T are inversely proportional", bn: "আয়তন এবং তাপমাত্রা বিপরীত সমানুপাতিক" },
        { en: "P and T are inversely proportional", bn: "চাপ এবং তাপমাত্রা বিপরীত সমানুপাতিক" }
      ],
      answer: 1,
      explanation: {
        en: "Boyle’s Law states that pressure and volume are inversely proportional (P₁V₁ = P₂V₂).",
        bn: "বয়েলের সূত্র বলে চাপ এবং আয়তন বিপরীত সমানুপাতিক (P₁V₁ = P₂V₂)।"
      }
    },
    {
      question: {
        en: "What is the formula for Charles’s Law?",
        bn: "চার্লসের সূত্রের সূত্র কী?"
      },
      options: [
        { en: "P/T = constant", bn: "P/T = ধ্রুবক" },
        { en: "V/T = constant", bn: "V/T = ধ্রুবক" },
        { en: "PV = constant", bn: "PV = ধ্রুবক" },
        { en: "P = V/T", bn: "P = V/T" }
      ],
      answer: 1,
      explanation: {
        en: "Charles’s Law states V/T = constant.",
        bn: "চার্লসের সূত্র বলে V/T = ধ্রুবক।"
      }
    },
    {
      question: {
        en: "What does Gay-Lussac’s Law relate?",
        bn: "গে-লুসাকের সূত্র কী সম্পর্কিত?"
      },
      options: [
        { en: "Pressure and volume", bn: "চাপ এবং আয়তন" },
        { en: "Volume and temperature", bn: "আয়তন এবং তাপমাত্রা" },
        { en: "Pressure and temperature", bn: "চাপ এবং তাপমাত্রা" },
        { en: "Pressure and moles", bn: "চাপ এবং মোল" }
      ],
      answer: 2,
      explanation: {
        en: "Gay-Lussac’s Law relates pressure and temperature (P/T = constant).",
        bn: "গে-লুসাকের সূত্র চাপ এবং তাপমাত্রার সম্পর্ক নির্দেশ করে (P/T = ধ্রুবক)।"
      }
    },
    {
      question: {
        en: "What is an example of Boyle’s Law?",
        bn: "বয়েলের সূত্রের একটি উদাহরণ কী?"
      },
      options: [
        { en: "Balloon in hot air", bn: "গরম বাতাসে বেলুন" },
        { en: "Tire pressure increase", bn: "টায়ারের চাপ বৃদ্ধি" },
        { en: "Syringe compression", bn: "সিরিঞ্জ সংকোচন" },
        { en: "Gas tank heating", bn: "গ্যাস ট্যাঙ্ক গরম করা" }
      ],
      answer: 2,
      explanation: {
        en: "Syringe compression demonstrates Boyle’s Law as volume decreases, pressure increases.",
        bn: "সিরিঞ্জ সংকোচন বয়েলের সূত্র প্রদর্শন করে কারণ আয়তন কমলে চাপ বাড়ে।"
      }
    },
    {
      question: {
        en: "What is an application of Gas Laws?",
        bn: "গ্যাসের সূত্রের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "GPS navigation", bn: "জিপিএস নেভিগেশন" },
        { en: "Oxygen supply in hospitals", bn: "হাসপাতালে অক্সিজেন সরবরাহ" },
        { en: "Circuit design", bn: "সার্কিট ডিজাইন" },
        { en: "Chemical synthesis", bn: "রাসায়নিক সংশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "Oxygen supply in hospitals relies on Gas Laws for pressure and volume control.",
        bn: "হাসপাতালে অক্সিজেন সরবরাহ চাপ এবং আয়তন নিয়ন্ত্রণের জন্য গ্যাসের সূত্রের উপর নির্ভর করে।"
      }
    }
  ]
}

export default function GasLawsQuiz() {
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
