"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"
const quizData: QuizContent = {
  title: {
    en: "Functional Groups Quiz",
    bn: "কার্যকরী গ্রুপ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of functional groups",
    bn: "কার্যকরী গ্রুপ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which functional group is characteristic of alcohols?",
        bn: "কোন কার্যকরী গ্রুপ অ্যালকোহলের বৈশিষ্ট্যপূর্ণ?"
      },
      options: [
        { en: "Carbonyl", bn: "কার্বনিল" },
        { en: "Hydroxyl", bn: "হাইড্রক্সিল" },
        { en: "Carboxyl", bn: "কার্বক্সিল" },
        { en: "Amine", bn: "অ্যামিন" }
      ],
      answer: 1,
      explanation: {
        en: "The hydroxyl group (-OH) is characteristic of alcohols, such as ethanol.",
        bn: "হাইড্রক্সিল গ্রুপ (-OH) অ্যালকোহলের বৈশিষ্ট্যপূর্ণ, যেমন ইথানল।"
      }
    },
    {
      question: {
        en: "What functional group is found in ketones?",
        bn: "কিটোনে কোন কার্যকরী গ্রুপ পাওয়া যায়?"
      },
      options: [
        { en: "Hydroxyl", bn: "হাইড্রক্সিল" },
        { en: "Carbonyl", bn: "কার্বনিল" },
        { en: "Carboxyl", bn: "কার্বক্সিল" },
        { en: "Ester", bn: "এস্টার" }
      ],
      answer: 1,
      explanation: {
        en: "Ketones contain a carbonyl group (>C=O) bonded to two carbon atoms.",
        bn: "কিটোনে একটি কার্বনিল গ্রুপ (>C=O) থাকে যা দুটি কার্বন পরমাণুর সাথে বন্ধিত।"
      }
    },
    {
      question: {
        en: "Which functional group makes a compound acidic?",
        bn: "কোন কার্যকরী গ্রুপ যৌগকে অম্লীয় করে?"
      },
      options: [
        { en: "Amine", bn: "অ্যামিন" },
        { en: "Hydroxyl", bn: "হাইড্রক্সিল" },
        { en: "Carboxyl", bn: "কার্বক্সিল" },
        { en: "Alkyl", bn: "অ্যালকাইল" }
      ],
      answer: 2,
      explanation: {
        en: "The carboxyl group (-COOH) donates a proton, making compounds like acetic acid acidic.",
        bn: "কার্বক্সিল গ্রুপ (-COOH) প্রোটন দান করে, যেমন অ্যাসিটিক অ্যাসিডকে অম্লীয় করে।"
      }
    },
    {
      question: {
        en: "What is the functional group in amines?",
        bn: "অ্যামিনে কোন কার্যকরী গ্রুপ থাকে?"
      },
      options: [
        { en: "-OH", bn: "-OH" },
        { en: "-NH₂", bn: "-NH₂" },
        { en: "-COOH", bn: "-COOH" },
        { en: ">C=O", bn: ">C=O" }
      ],
      answer: 1,
      explanation: {
        en: "Amines contain the -NH₂ functional group, which is basic in nature.",
        bn: "অ্যামিনে -NH₂ কার্যকরী গ্রুপ থাকে, যা ক্ষারীয় প্রকৃতির।"
      }
    },
    {
      question: {
        en: "Which functional group is found in both aldehydes and ketones?",
        bn: "কোন কার্যকরী গ্রুপ অ্যালডিহাইড এবং কিটোনে উভয়েই পাওয়া যায়?"
      },
      options: [
        { en: "Hydroxyl", bn: "হাইড্রক্সিল" },
        { en: "Carbonyl", bn: "কার্বনিল" },
        { en: "Carboxyl", bn: "কার্বক্সিল" },
        { en: "Amine", bn: "অ্যামিন" }
      ],
      answer: 1,
      explanation: {
        en: "Both aldehydes and ketones contain the carbonyl group (>C=O).",
        bn: "অ্যালডিহাইড এবং কিটোন উভয়েই কার্বনিল গ্রুপ (>C=O) ধারণ করে।"
      }
    }
  ]
}

export default function FunctionalGroupsQuiz() {
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