"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Isomerism Quiz",
    bn: "আইসোমেরিজম কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of isomerism and its types",
    bn: "আইসোমেরিজম এবং এর প্রকারভেদ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What defines isomers?",
        bn: "আইসোমার কী দ্বারা সংজ্ঞায়িত হয়?"
      },
      options: [
        { en: "Different molecular formulas", bn: "ভিন্ন আণবিক সূত্র" },
        { en: "Same molecular formula, different structures", bn: "একই আণবিক সূত্র, ভিন্ন গঠন" },
        { en: "Same structure, different properties", bn: "একই গঠন, ভিন্ন বৈশিষ্ট্য" },
        { en: "Different atomic masses", bn: "ভিন্ন পারমাণবিক ভর" }
      ],
      answer: 1,
      explanation: {
        en: "Isomers have the same molecular formula but different structural or spatial arrangements.",
        bn: "আইসোমারদের একই আণবিক সূত্র থাকে কিন্তু গঠনগত বা স্থানিক বিন্যাস ভিন্ন হয়।"
      }
    },
    {
      question: {
        en: "Which type of isomerism involves different carbon chain arrangements?",
        bn: "কোন ধরনের আইসোমেরিজম কার্বন শৃঙ্খলের ভিন্ন বিন্যাস জড়িত?"
      },
      options: [
        { en: "Geometric isomerism", bn: "জ্যামিতিক আইসোমেরিজম" },
        { en: "Chain isomerism", bn: "শৃঙ্খল আইসোমেরিজম" },
        { en: "Optical isomerism", bn: "অপটিক্যাল আইসোমেরিজম" },
        { en: "Positional isomerism", bn: "অবস্থান আইসোমেরিজম" }
      ],
      answer: 1,
      explanation: {
        en: "Chain isomerism is a type of structural isomerism where isomers differ in the arrangement of their carbon chains.",
        bn: "শৃঙ্খল আইসোমেরিজম হল গঠনগত আইসোমেরিজমের একটি প্রকার যেখানে আইসোমারগুলি কার্বন শৃঙ্খলের বিন্যাসে ভিন্ন হয়।"
      }
    },
    {
      question: {
        en: "What causes optical isomerism?",
        bn: "অপটিক্যাল আইসোমেরিজমের কারণ কী?"
      },
      options: [
        { en: "Double bonds", bn: "ডাবল বন্ড" },
        { en: "Chiral centers", bn: "কাইরাল কেন্দ্র" },
        { en: "Functional groups", bn: "কার্যকরী গ্রুপ" },
        { en: "Chain length", bn: "শৃঙ্খল দৈর্ঘ্য" }
      ],
      answer: 1,
      explanation: {
        en: "Optical isomerism occurs due to chiral centers, leading to non-superimposable mirror images that rotate polarized light.",
        bn: "অপটিক্যাল আইসোমেরিজম কাইরাল কেন্দ্রের কারণে ঘটে, যা অ-সুপারইম্পোজেবল মিরর ইমেজ সৃষ্টি করে এবং পোলারাইজড আলো ঘোরায়।"
      }
    },
    {
      question: {
        en: "Which pair represents positional isomers?",
        bn: "কোন জোড়া অবস্থান আইসোমার প্রতিনিধিত্ব করে?"
      },
      options: [
        { en: "n-Butane and isobutane", bn: "n-বিউটেন এবং আইসোবিউটেন" },
        { en: "1-Propanol and 2-propanol", bn: "১-প্রোপানল এবং ২-প্রোপানল" },
        { en: "Ethanol and methanol", bn: "ইথানল এবং মিথানল" },
        { en: "Cis- and trans-2-butene", bn: "সিস- এবং ট্রান্স-২-বিউটিন" }
      ],
      answer: 1,
      explanation: {
        en: "1-Propanol and 2-propanol are positional isomers because they differ in the position of the hydroxyl group.",
        bn: "১-প্রোপানল এবং ২-প্রোপানল অবস্থান আইসোমার কারণ তারা হাইড্রক্সিল গ্রুপের অবস্থানে ভিন্ন।"
      }
    },
    {
      question: {
        en: "Why are isomers important in pharmaceuticals?",
        bn: "ফার্মাসিউটিক্যালে আইসোমার কেন গুরুত্বপূর্ণ?"
      },
      options: [
        { en: "Same properties", bn: "একই বৈশিষ্ট্য" },
        { en: "Different biological activity", bn: "ভিন্ন জৈবিক কার্যকলাপ" },
        { en: "Lower cost", bn: "কম খরচ" },
        { en: "Easier synthesis", bn: "সহজ সংশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "Isomers can have different biological activities, affecting drug efficacy and safety, as seen with enantiomers.",
        bn: "আইসোমারদের ভিন্ন জৈবিক কার্যকলাপ থাকতে পারে, যা ওষুধের কার্যকারিতা এবং নিরাপত্তাকে প্রভাষিত করে।"
      }
    }
  ]
}

export default function IsomerismQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-semibold">Chemistry Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}