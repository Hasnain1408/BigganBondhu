
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Ideal Gas Equation Quiz",
    bn: "আদর্শ গ্যাস সমীকরণ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the Ideal Gas Equation",
    bn: "আদর্শ গ্যাস সমীকরণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the Ideal Gas Equation?",
        bn: "আদর্শ গ্যাস সমীকরণ কী?"
      },
      options: [
        { en: "PV = nRT", bn: "PV = nRT" },
        { en: "P = nRT/V", bn: "P = nRT/V" },
        { en: "V = nRT/P", bn: "V = nRT/P" },
        { en: "PV = RT", bn: "PV = RT" }
      ],
      answer: 0,
      explanation: {
        en: "The Ideal Gas Equation is PV = nRT.",
        bn: "আদর্শ গ্যাস সমীকরণ হল PV = nRT।"
      }
    },
    {
      question: {
        en: "What is the value of the gas constant R?",
        bn: "গ্যাস ধ্রুবক R-এর মান কত?"
      },
      options: [
        { en: "8.314 J/(mol·K)", bn: "8.314 J/(mol·K)" },
        { en: "1.38 × 10⁻²³ J/K", bn: "1.38 × 10⁻²³ J/K" },
        { en: "6.67 × 10⁻¹¹ N·m²/kg²", bn: "6.67 × 10⁻¹¹ N·m²/kg²" },
        { en: "9.8 m/s²", bn: "9.8 m/s²" }
      ],
      answer: 0,
      explanation: {
        en: "The gas constant R is 8.314 J/(mol·K).",
        bn: "গ্যাস ধ্রুবক R হল 8.314 J/(mol·K)।"
      }
    },
    {
      question: {
        en: "What does 'n' represent in PV = nRT?",
        bn: "PV = nRT-তে 'n' কী নির্দেশ করে?"
      },
      options: [
        { en: "Pressure", bn: "চাপ" },
        { en: "Volume", bn: "আয়তন" },
        { en: "Number of moles", bn: "মোল সংখ্যা" },
        { en: "Temperature", bn: "তাপমাত্রা" }
      ],
      answer: 2,
      explanation: {
        en: "'n' represents the number of moles in the Ideal Gas Equation.",
        bn: "'n' আদর্শ গ্যাস সমীকরণে মোল সংখ্যা নির্দেশ করে।"
      }
    },
    {
      question: {
        en: "What happens to pressure if temperature increases and volume is constant?",
        bn: "আয়তন স্থির থাকলে তাপমাত্রা বাড়লে চাপের কী হয়?"
      },
      options: [
        { en: "Decreases", bn: "কমে" },
        { en: "Increases", bn: "বাড়ে" },
        { en: "Remains constant", bn: "স্থির থাকে" },
        { en: "Becomes zero", bn: "শূন্য হয়" }
      ],
      answer: 1,
      explanation: {
        en: "If temperature increases and volume is constant, pressure increases (P ∝ T).",
        bn: "তাপমাত্রা বাড়লে এবং আয়তন স্থির থাকলে, চাপ বাড়ে (P ∝ T)।"
      }
    },
    {
      question: {
        en: "What is an application of the Ideal Gas Equation?",
        bn: "আদর্শ গ্যাস সমীকরণের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "GPS navigation", bn: "জিপিএস নেভিগেশন" },
        { en: "Gas engine design", bn: "গ্যাস ইঞ্জিন ডিজাইন" },
        { en: "Circuit analysis", bn: "সার্কিট বিশ্লেষণ" },
        { en: "Magnetic field measurement", bn: "চৌম্বক ক্ষেত্র পরিমাপ" }
      ],
      answer: 1,
      explanation: {
        en: "Gas engine design uses the Ideal Gas Equation.",
        bn: "গ্যাস ইঞ্জিন ডিজাইনে আদর্শ গ্যাস সমীকরণ ব্যবহৃত হয়।"
      }
    }
  ]
}

export default function IdealGasEquationQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
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
