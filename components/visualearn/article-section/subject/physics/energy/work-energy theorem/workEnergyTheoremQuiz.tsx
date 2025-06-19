
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Work-Energy Theorem Quiz",
    bn: "কার্য-শক্তি উপপাদ্য কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the Work-Energy Theorem",
    bn: "কার্য-শক্তি উপপাদ্য সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does the Work-Energy Theorem state?",
        bn: "কার্য-শক্তি উপপাদ্য কী বলে?"
      },
      options: [
        { en: "Work equals change in kinetic energy", bn: "কার্য গতিশক্তির পরিবর্তনের সমান" },
        { en: "Work equals potential energy", bn: "কার্য বিভব শক্তির সমান" },
        { en: "Work equals total energy", bn: "কার্য মোট শক্তির সমান" },
        { en: "Work equals momentum", bn: "কার্য ভরবেগের সমান" }
      ],
      answer: 0,
      explanation: {
        en: "The Work-Energy Theorem states that net work equals the change in kinetic energy.",
        bn: "কার্য-শক্তি উপপাদ্য বলে নেট কার্য গতিশক্তির পরিবর্তনের সমান।"
      }
    },
    {
      question: {
        en: "What is the formula for work?",
        bn: "কার্যের সূত্র কী?"
      },
      options: [
        { en: "W = F × d", bn: "W = F × d" },
        { en: "W = F × d × cosθ", bn: "W = F × d × cosθ" },
        { en: "W = ½mv²", bn: "W = ½mv²" },
        { en: "W = mgh", bn: "W = mgh" }
      ],
      answer: 1,
      explanation: {
        en: "Work is calculated as W = F × d × cosθ, accounting for the angle between force and displacement.",
        bn: "কার্য W = F × d × cosθ হিসাবে গণনা করা হয়, বল এবং স্থানচ্যুতির মধ্যে কোণ বিবেচনা করে।"
      }
    },
    {
      question: {
        en: "What is the unit of work?",
        bn: "কার্যের একক কী?"
      },
      options: [
        { en: "Newton", bn: "নিউটন" },
        { en: "Joule", bn: "জুল" },
        { en: "Watt", bn: "ওয়াট" },
        { en: "Tesla", bn: "টেসলা" }
      ],
      answer: 1,
      explanation: {
        en: "The unit of work is Joule (J).",
        bn: "কার্যের একক হল জুল (J)।"
      }
    },
    {
      question: {
        en: "If no net work is done on an object, what happens to its kinetic energy?",
        bn: "যদি কোনো বস্তুর উপর নেট কার্য না করা হয়, তবে তার গতিশক্তির কী হয়?"
      },
      options: [
        { en: "Increases", bn: "বাড়ে" },
        { en: "Remains constant", bn: "স্থির থাকে" },
        { en: "Decreases", bn: "কমে" },
        { en: "Becomes zero", bn: "শূন্য হয়" }
      ],
      answer: 2,
      explanation: {
        en: "If no net work is done, the kinetic energy remains constant per the Work-Energy Theorem.",
        bn: "যদি নেট কার্য না করা হয়, কার্য-শক্তি উপপাদ্য অনুসারে গতিশক্তি স্থির থাকে।"
      }
    },
    {
      question: {
        en: "What is an application of the Work-Energy Theorem?",
        bn: "কার্য-শক্তি উপপাদ্যের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Circuit analysis", bn: "সার্কিট বিশ্লেষণ" },
        { en: "Machine design", bn: "মেশিন ডিজাইন" },
        { en: "Gas compression", bn: "গ্যাস সংকোচন" },
        { en: "Radiation detection", bn: "বিকিরণ সনাক্তকরণ" }
      ],
      answer: 1,
      explanation: {
        en: "The Work-Energy Theorem is used in machine design to analyze energy transfers.",
        bn: "কার্য-শক্তি উপপাদ্য মেশিন ডিজাইনে শক্তি স্থানান্তর বিশ্লেষণে ব্যবহৃত হয়।"
      }
    }
  ]
}

export default function WorkEnergyTheoremQuiz() {
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
