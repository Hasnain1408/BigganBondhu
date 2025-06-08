"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Stoichiometry Quiz",
    bn: "স্টয়কিওমেট্রি কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of stoichiometric calculations",
    bn: "স্টয়কিওমেট্রিক গণনা সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "In the reaction 2H₂ + O₂ → 2H₂O, how many moles of O₂ are needed for 4 moles of H₂?",
        bn: "2H₂ + O₂ → 2H₂O বিক্রিয়ায়, ৪ মোল H₂ এর জন্য কত মোল O₂ প্রয়োজন?"
      },
      options: [
        { en: "1", bn: "1" },
        { en: "2", bn: "2" },
        { en: "3", bn: "3" },
        { en: "4", bn: "4" }
      ],
      answer: 1,
      explanation: {
        en: "The mole ratio of H₂ to O₂ is 2:1. For 4 moles of H₂, (4/2) × 1 = 2 moles of O₂ are needed.",
        bn: "H₂ এবং O₂ এর মোল অনুপাত ২:১। ৪ মোল H₂ এর জন্য, (৪/২) × ১ = ২ মোল O₂ প্রয়োজন।"
      }
    },
    {
      question: {
        en: "What is the mole ratio of CH₄ to CO₂ in: CH₄ + 2O₂ → CO₂ + 2H₂O?",
        bn: "CH₄ + 2O₂ → CO₂ + 2H₂O বিক্রিয়ায় CH₄ এবং CO₂ এর মোল অনুপাত কত?"
      },
      options: [
        { en: "1:1", bn: "1:1" },
        { en: "1:2", bn: "1:2" },
        { en: "2:1", bn: "2:1" },
        { en: "2:2", bn: "2:2" }
      ],
      answer: 0,
      explanation: {
        en: "The coefficients show 1 mole of CH₄ produces 1 mole of CO₂, so the ratio is 1:1.",
        bn: "গুণাঙ্ক দেখায় ১ মোল CH₄ থেকে ১ মোল CO₂ উৎপন্ন হয়, তাই অনুপাত ১:১।"
      }
    },
    {
      question: {
        en: "If 16g of CH₄ reacts completely (CH₄ + 2O₂ → CO₂ + 2H₂O), how many grams of CO₂ are produced? (Molar masses: CH₄=16g/mol, CO₂=44g/mol)",
        bn: "যদি ১৬ গ্রাম CH₄ সম্পূর্ণ বিক্রিয়া করে (CH₄ + 2O₂ → CO₂ + 2H₂O), তবে কত গ্রাম CO₂ উৎপন্ন হয়? (মোলার ভর: CH₄=১৬ গ্রাম/মোল, CO₂=৪৪ গ্রাম/মোল)"
      },
      options: [
        { en: "22g", bn: "22 গ্রাম" },
        { en: "44g", bn: "44 গ্রাম" },
        { en: "88g", bn: "88 গ্রাম" },
        { en: "16g", bn: "16 গ্রাম" }
      ],
      answer: 1,
      explanation: {
        en: "16g CH₄ = 1 mole (16/16). From the 1:1 ratio, 1 mole CH₄ produces 1 mole CO₂ = 44g (1 × 44).",
        bn: "১৬ গ্রাম CH₄ = ১ মোল (১৬/১৬)। ১:১ অনুপাত থেকে, ১ মোল CH₄ থেকে ১ মোল CO₂ = ৪৪ গ্রাম (১ × ৪৪)।"
      }
    },
    {
      question: {
        en: "Which reactant is limiting in: 2H₂ + O₂ → 2H₂O, if 2 moles H₂ and 2 moles O₂ are available?",
        bn: "2H₂ + O₂ → 2H₂O বিক্রিয়ায় কোন বিক্রিয়ক সীমিত, যদি ২ মোল H₂ এবং ২ মোল O₂ থাকে?"
      },
      options: [
        { en: "H₂", bn: "H₂" },
        { en: "O₂", bn: "O₂" },
        { en: "Neither", bn: "কোনটিই নয়" },
        { en: "Both", bn: "উভয়ই" }
      ],
      answer: 0,
      explanation: {
        en: "The ratio is 2:1 (H₂:O₂). For 2 moles H₂, 1 mole O₂ is needed. Since 2 moles O₂ are available, H₂ is limiting.",
        bn: "অনুপাত ২:১ (H₂:O₂)। ২ মোল H₂ এর জন্য ১ মোল O₂ প্রয়োজন। যেহেতু ২ মোল O₂ আছে, H₂ সীমিত।"
      }
    },
    {
      question: {
        en: "What is the purpose of stoichiometry?",
        bn: "স্টয়কিওমেট্রির উদ্দেশ্য কী?"
      },
      options: [
        { en: "Balance equations", bn: "সমীকরণ সামঞ্জস্য করা" },
        { en: "Calculate quantities", bn: "পরিমাণ গণনা করা" },
        { en: "Identify reaction type", bn: "বিক্রিয়ার প্রকার চিহ্নিত করা" },
        { en: "Measure reaction rate", bn: "বিক্রিয়ার হার পরিমাপ করা" }
      ],
      answer: 1,
      explanation: {
        en: "Stoichiometry calculates quantities of reactants and products based on balanced equations.",
        bn: "স্টয়কিওমেট্রি সামঞ্জস্যপূর্ণ সমীকরণের উপর ভিত্তি করে বিক্রিয়ক ও উৎপাদের পরিমাণ গণনা করে।"
      }
    }
  ]
}

export default function StoichiometryQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Chemistry Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}