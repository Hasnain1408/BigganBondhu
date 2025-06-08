"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Lewis Structures Quiz",
    bn: "লুইস কাঠামো কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Lewis structures",
    bn: "লুইস কাঠামো সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What do dots represent in a Lewis structure?",
        bn: "লুইস কাঠামোতে বিন্দুগুলি কী নির্দেশ করে?"
      },
      options: [
        { en: "Bonding electrons", bn: "বন্ধন ইলেকট্রন" },
        { en: "Lone pair electrons", bn: "একাকী জোড়া ইলেকট্রন" },
        { en: "Core electrons", bn: "কোর ইলেকট্রন" },
        { en: "Valence electrons", bn: "ভ্যালেন্স ইলেকট্রন" }
      ],
      answer: 1,
      explanation: {
        en: "Dots in a Lewis structure represent lone pair electrons that are not involved in bonding.",
        bn: "লুইস কাঠামোতে বিন্দুগুলি একাকী জোড়া ইলেকট্রন নির্দেশ করে, যা বন্ধনে অংশ নেয় না।"
      }
    },
    {
      question: {
        en: "How many valence electrons does nitrogen have in the NH₃ molecule?",
        bn: "NH₃ অণুতে নাইট্রোজেনের কতটি ভ্যালেন্স ইলেকট্রন রয়েছে?"
      },
      options: [
        { en: "3", bn: "3" },
        { en: "5", bn: "5" },
        { en: "7", bn: "7" },
        { en: "8", bn: "8" }
      ],
      answer: 1,
      explanation: {
        en: "Nitrogen has 5 valence electrons, which can be determined from its group number (15 or V).",
        bn: "নাইট্রোজেনের ৫টি ভ্যালেন্স ইলেকট্রন রয়েছে, যা এর গ্রুপ নম্বর (১৫ বা V) থেকে নির্ধারিত হয়।"
      }
    },
    {
      question: {
        en: "What is the total number of electrons in the Lewis structure of CH₄?",
        bn: "CH₄ এর লুইস কাঠামোতে মোট কতটি ইলেকট্রন রয়েছে?"
      },
      options: [
        { en: "6", bn: "6" },
        { en: "8", bn: "8" },
        { en: "10", bn: "10" },
        { en: "12", bn: "12" }
      ],
      answer: 1,
      explanation: {
        en: "CH₄ has 8 electrons: Carbon contributes 4, and each hydrogen contributes 1 (4 × 1 = 4).",
        bn: "CH₄ এর ৮টি ইলেকট্রন রয়েছে: কার্বন ৪টি এবং প্রতিটি হাইড্রোজেন ১টি (৪ × ১ = ৪) অবদান রাখে।"
      }
    },
    {
      question: {
        en: "How many lone pairs are on the nitrogen atom in NH₃?",
        bn: "NH₃ তে নাইট্রোজেন পরমাণুতে কতটি একাকী জোড়া রয়েছে?"
      },
      options: [
        { en: "0", bn: "0" },
        { en: "1", bn: "1" },
        { en: "2", bn: "2" },
        { en: "3", bn: "3" }
      ],
      answer: 1,
      explanation: {
        en: "In NH₃, nitrogen forms three bonds with hydrogen, leaving one lone pair (2 electrons).",
        bn: "NH₃ তে, নাইট্রোজেন হাইড্রোজেনের সাথে তিনটি বন্ধন গঠন করে, একটি একাকী জোড়া (২টি ইলেকট্রন) রেখে।"
      }
    },
    {
      question: {
        en: "Which molecule follows the octet rule in its Lewis structure?",
        bn: "কোন অণুটি তার লুইস কাঠামোতে অষ্টক নিয়ম মেনে চলে?"
      },
      options: [
        { en: "BF₃", bn: "BF₃" },
        { en: "CO₂", bn: "CO₂" },
        { en: "NO", bn: "NO" },
        { en: "SO₃", bn: "SO₃" }
      ],
      answer: 1,
      explanation: {
        en: "CO₂ follows the octet rule, with each atom (C and O) having 8 electrons in its Lewis structure.",
        bn: "CO₂ অষ্টক নিয়ম মেনে চলে, যেখানে প্রতিটি পরমাণু (C এবং O) লুইস কাঠামোতে ৮টি ইলেকট্রন ধারণ করে।"
      }
    }
  ]
}

export default function LewisStructuresQuiz() {
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