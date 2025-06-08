"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Balancing Equations Quiz",
    bn: "সমীকরণ সামঞ্জস্যকরণ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of balancing chemical equations",
    bn: "রাসায়নিক সমীকরণ সামঞ্জস্যকরণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the coefficient of O₂ in the balanced equation: CH₄ + __O₂ → CO₂ + 2H₂O?",
        bn: "সামঞ্জস্যপূর্ণ সমীকরণে O₂ এর গুণাঙ্ক কত: CH₄ + __O₂ → CO₂ + 2H₂O?"
      },
      options: [
        { en: "1", bn: "1" },
        { en: "2", bn: "2" },
        { en: "3", bn: "3" },
        { en: "4", bn: "4" }
      ],
      answer: 1,
      explanation: {
        en: "To balance the equation, 2 oxygen atoms are needed on the product side (1 from CO₂ + 2 from 2H₂O = 4 O atoms). Thus, 2O₂ (4 O atoms) is required, so the coefficient is 2.",
        bn: "সমীকরণ সামঞ্জস্য করতে, উৎপাদ পক্ষে ২টি অক্সিজেন পরমাণু প্রয়োজন (CO₂ থেকে ১ + 2H₂O থেকে ২ = ৪টি O পরমাণু)। তাই, 2O₂ (৪টি O পরমাণু) প্রয়োজন, গুণাঙ্ক ২।"
      }
    },
    {
      question: {
        en: "How many hydrogen atoms are on the reactant side in the balanced equation: 2H₂ + O₂ → 2H₂O?",
        bn: "সামঞ্জস্যপূর্ণ সমীকরণে বিক্রিয়ক পক্ষে কতটি হাইড্রোজেন পরমাণু: 2H₂ + O₂ → 2H₂O?"
      },
      options: [
        { en: "2", bn: "2" },
        { en: "4", bn: "4" },
        { en: "6", bn: "6" },
        { en: "8", bn: "8" }
      ],
      answer: 1,
      explanation: {
        en: "In 2H₂, each H₂ molecule has 2 hydrogen atoms, and the coefficient 2 means 2 molecules, so 2 × 2 = 4 hydrogen atoms.",
        bn: "2H₂ তে, প্রতিটি H₂ অণুতে ২টি হাইড্রোজেন পরমাণু রয়েছে, এবং গুণাঙ্ক ২ মানে ২টি অণু, তাই ২ × ২ = ৪টি হাইড্রোজেন পরমাণু।"
      }
    },
    {
      question: {
        en: "Which element is typically balanced last in combustion reactions?",
        bn: "দহন বিক্রিয়ায় সাধারণত কোন মৌলটি শেষে সামঞ্জস্য করা হয়?"
      },
      options: [
        { en: "Carbon", bn: "কার্বন" },
        { en: "Hydrogen", bn: "হাইড্রোজেন" },
        { en: "Oxygen", bn: "অক্সিজেন" },
        { en: "Nitrogen", bn: "নাইট্রোজেন" }
      ],
      answer: 2,
      explanation: {
        en: "Oxygen is balanced last in combustion reactions because it often appears in multiple compounds (e.g., O₂, CO₂, H₂O), making it easier to adjust after carbon and hydrogen.",
        bn: "দহন বিক্রিয়ায় অক্সিজেন শেষে সামঞ্জস্য করা হয় কারণ এটি প্রায়শই একাধিক যৌগে থাকে (যেমন, O₂, CO₂, H₂O), তাই কার্বন এবং হাইড্রোজেনের পরে সামঞ্জস্য করা সহজ।"
      }
    },
    {
      question: {
        en: "Is the equation balanced: C₂H₆ + O₂ → 2CO₂ + 3H₂O?",
        bn: "সমীকরণটি কি সামঞ্জস্যপূর্ণ: C₂H₆ + O₂ → 2CO₂ + 3H₂O?"
      },
      options: [
        { en: "Yes", bn: "হ্যাঁ" },
        { en: "No", bn: "না" }
      ],
      answer: 1,
      explanation: {
        en: "No, it’s not balanced. Reactants: 2C, 6H, 2O. Products: 2C, 6H, 7O. Oxygen atoms are unequal. The balanced equation is 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.",
        bn: "না, এটি সামঞ্জস্যপূর্ণ নয়। বিক্রিয়ক: ২C, ৬H, ২O। উৎপাদ: ২C, ৬H, ৭O। অক্সিজেন পরমাণু অসমান। সামঞ্জস্যপূর্ণ সমীকরণ: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O।"
      }
    },
    {
      question: {
        en: "What is conserved in a balanced chemical equation?",
        bn: "সামঞ্জস্যপূর্ণ রাসায়নিক সমীকরণে কী সংরক্ষিত হয়?"
      },
      options: [
        { en: "Energy", bn: "শক্তি" },
        { en: "Mass", bn: "ভর" },
        { en: "Volume", bn: "আয়তন" },
        { en: "Pressure", bn: "চাপ" }
      ],
      answer: 1,
      explanation: {
        en: "A balanced chemical equation conserves mass, as the number of each type of atom is equal on both sides, per the law of conservation of mass.",
        bn: "সামঞ্জস্যপূর্ণ রাসায়নিক সমীকরণ ভর সংরক্ষণ করে, কারণ উভয় পক্ষে প্রতিটি ধরনের পরমাণুর সংখ্যা সমান, ভর সংরক্ষণের নিয়ম অনুযায়ী।"
      }
    }
  ]
}

export default function BalancingEquationsQuiz() {
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