
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Lagrangian Mechanics Quiz",
    bn: "ল্যাগ্রাঞ্জিয়ান মেকানিক্স কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Lagrangian mechanics",
    bn: "আপনার ল্যাগ্রাঞ্জিয়ান মেকানিক্স জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the Lagrangian of a system defined as?",
        bn: "একটি সিস্টেমের ল্যাগ্রাঞ্জিয়ান কীভাবে সংজ্ঞায়িত হয়?"
      },
      options: [
        { en: "T + V", bn: "T + V" },
        { en: "T - V", bn: "T - V" },
        { en: "V - T", bn: "V - T" },
        { en: "½ (T + V)", bn: "½ (T + V)" }
      ],
      answer: 1,
      explanation: {
        en: "The Lagrangian is defined as L = T - V, where T is kinetic energy and V is potential energy.",
        bn: "ল্যাগ্রাঞ্জিয়ান L = T - V হিসেবে সংজ্ঞায়িত, যেখানে T হল গতিশক্তি এবং V হল সম্ভাব্য শক্তি।"
      }
    },
    {
      question: {
        en: "The Euler-Lagrange equation is derived from which principle?",
        bn: "অয়লার-ল্যাগ্রাঞ্জ সমীকরণ কোন নীতি থেকে উৎপন্ন হয়?"
      },
      options: [
        { en: "Newton’s second law", bn: "নিউটনের দ্বিতীয় সূত্র" },
        { en: "Conservation of energy", bn: "শক্তি সংরক্ষণ" },
        { en: "Principle of stationary action", bn: "স্টেশনারি অ্যাকশন নীতি" },
        { en: "Principle of least time", bn: "সর্বনিম্ন সময় নীতি" }
      ],
      answer: 2,
      explanation: {
        en: "The Euler-Lagrange equation is derived from the principle of stationary action, which states that the actual path minimizes or maximizes action.",
        bn: "অয়লার-ল্যাগ্রাঞ্জ সমীকরণ স্টেশনারি অ্যাকশন নীতি থেকে উৎপন্ন, যা বলে প্রকৃত পথ অ্যাকশনকে সর্বনিম্ন বা সর্বাধিক করে।"
      }
    },
    {
      question: {
        en: "For a free particle with no potential energy, what is the Lagrangian?",
        bn: "কোনো সম্ভাব্য শক্তি ছাড়া একটি মুক্ত কণার ল্যাগ্রাঞ্জিয়ান কী?"
      },
      options: [
        { en: "V", bn: "V" },
        { en: "T", bn: "T" },
        { en: "T + V", bn: "T + V" },
        { en: "0", bn: "0" }
      ],
      answer: 1,
      explanation: {
        en: "For a free particle, V = 0, so the Lagrangian L = T - V = T, the kinetic energy.",
        bn: "মুক্ত কণার জন্য, V = 0, তাই ল্যাগ্রাঞ্জিয়ান L = T - V = T, গতিশক্তি।"
      }
    },
    {
      question: {
        en: "What does the term ∂L/∂q̇ represent in the Euler-Lagrange equation?",
        bn: "অয়লার-ল্যাগ্রাঞ্জ সমীকরণে ∂L/∂q̇ পদটি কী নির্দেশ করে?"
      },
      options: [
        { en: "Potential energy", bn: "সম্ভাব্য শক্তি" },
        { en: "Kinetic energy", bn: "গতিশক্তি" },
        { en: "Generalized momentum", bn: "সাধারণীকৃত ভরবেগ" },
        { en: "Generalized force", bn: "সাধারণীকৃত বল" }
      ],
      answer: 2,
      explanation: {
        en: "The term ∂L/∂q̇ represents the generalized momentum conjugate to the generalized coordinate q.",
        bn: "∂L/∂q̇ পদটি সাধারণীকৃত স্থানাঙ্ক q-এর সাথে সম্পর্কিত সাধারণীকৃত ভরবেগ নির্দেশ করে।"
      }
    },
    {
      question: {
        en: "What advantage do generalized coordinates provide in Lagrangian mechanics?",
        bn: "ল্যাগ্রাঞ্জিয়ান মেকানিক্সে সাধারণীকৃত স্থানাঙ্ক কী সুবিধা প্রদান করে?"
      },
      options: [
        { en: "Increase computational complexity", bn: "গণনার জটিলতা বৃদ্ধি" },
        { en: "Simplify handling of constraints", bn: "বাধা পরিচালনা সহজ করা" },
        { en: "Require Cartesian coordinates", bn: "কার্টেসিয়ান স্থানাঙ্কের প্রয়োজন" },
        { en: "Eliminate the need for energy", bn: "শক্তির প্রয়োজনীয়তা দূর করা" }
      ],
      answer: 1,
      explanation: {
        en: "Generalized coordinates simplify the handling of constraints by choosing coordinates that naturally account for them.",
        bn: "সাধারণীকৃত স্থানাঙ্ক বাধা পরিচালনা সহজ করে কারণ তারা স্বাভাবিকভাবে বাধার জন্য বিবেচনা করে।"
      }
    }
  ]
}

export default function LagrangianMechanicsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Lagrangian Mechanics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
