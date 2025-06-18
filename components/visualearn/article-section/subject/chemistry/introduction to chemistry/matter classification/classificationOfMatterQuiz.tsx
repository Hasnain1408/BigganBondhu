
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Classification of Matter Quiz",
    bn: "পদার্থের শ্রেণীবিভাগ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Classification of Matter",
    bn: "পদার্থের শ্রেণীবিভাগ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is matter?",
        bn: "পদার্থ কী?"
      },
      options: [
        { en: "Anything with mass and volume", bn: "যা ভর এবং আয়তন আছে" },
        { en: "Only solids", bn: "কেবল কঠিন পদার্থ" },
        { en: "Energy forms", bn: "শক্তির রূপ" },
        { en: "Invisible substances", bn: "অদৃশ্য পদার্থ" }
      ],
      answer: 0,
      explanation: {
        en: "Matter is anything that has mass and occupies space.",
        bn: "পদার্থ হল যা ভর আছে এবং স্থান দখল করে।"
      }
    },
    {
      question: {
        en: "Which is an example of a pure substance?",
        bn: "বিশুদ্ধ পদার্থের উদাহরণ কোনটি?"
      },
      options: [
        { en: "Air", bn: "বাতাস" },
        { en: "Saltwater", bn: "লবণ পানি" },
        { en: "Water", bn: "পানি" },
        { en: "Soil", bn: "মাটি" }
      ],
      answer: 2,
      explanation: {
        en: "Water is a compound, a type of pure substance.",
        bn: "পানি একটি যৌগ, যা বিশুদ্ধ পদার্থের একটি প্রকার।"
      }
    },
    {
      question: {
        en: "What is a homogeneous mixture?",
        bn: "সমসত্ব মিশ্রণ কী?"
      },
      options: [
        { en: "Sand and water", bn: "বালি এবং পানি" },
        { en: "Sugar solution", bn: "চিনির দ্রবণ" },
        { en: "Oil and water", bn: "তেল এবং পানি" },
        { en: "Gravel", bn: "নুড়ি" }
      ],
      answer: 1,
      explanation: {
        en: "A homogeneous mixture, like a sugar solution, has uniform composition.",
        bn: "সমসত্ব মিশ্রণ, যেমন চিনির দ্রবণ, একই গঠনের হয়।"
      }
    },
    {
      question: {
        en: "Which cannot be broken down chemically?",
        bn: "কোনটি রাসায়নিকভাবে ভাঙা যায় না?"
      },
      options: [
        { en: "Water", bn: "পানি" },
        { en: "Sugar", bn: "চিনি" },
        { en: "Oxygen", bn: "0" },
        { en: "Salt", bn: "লবণ" }
      ],
      answer: 2,
      explanation: {
        en: "Oxygen is an element and cannot be broken down chemically.",
        bn: "অক্সিজেন একটি মৌল এবং রাসায়নিকভাবে ভাঙা যায় না।"
      }
    },
    {
      question: {
        en: "What is an application of classifying matter?",
        bn: "পদার্থ শ্রেণীকরণের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Measuring temperature", bn: "তাপমাত্রা পরিমাণ" },
        { en: "Separating substances", bn: "পদার্থ পৃথকীকরণ" },
        { en: "Calculating speed", bn: "গতি গণনা" },
        { en: "Recording sound", bn: "শব্দ রেকর্ডিং" }
      ],
      answer: 1,
      explanation: {
        en: "Classifying matter helps in separating substances in industry or research.",
        bn: "পদার্থ শ্রেণীকরণ শিল্প বা গবেষণায় পদার্থ পৃথকীকরণে সহায়তা করে।"
      }
    }
  ]
}

export default function ClassificationOfMatterQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
