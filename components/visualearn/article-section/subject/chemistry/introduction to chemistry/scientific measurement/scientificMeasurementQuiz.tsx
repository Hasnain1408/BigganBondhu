
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Scientific Measurement Quiz",
    bn: "বৈজ্ঞানিক পরিমাপ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Scientific Measurement",
    bn: "বৈজ্ঞানিক পরিমাপ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the SI unit for mass?",
        bn: "ভরের এসআই একক কী?"
      },
      options: [
        { en: "Meter", bn: "মিটার" },
        { en: "Kilogram", bn: "কিলোগ্রাম" },
        { en: "Liter", bn: "লিটার" },
        { en: "Kelvin", bn: "কেলভিন" }
      ],
      answer: 1,
      explanation: {
        en: "The SI unit for mass is kilogram.",
        bn: "ভরের এসআই একক হল কিলোগ্রাম।"
      }
    },
    {
      question: {
        en: "Which tool measures volume?",
        bn: "কোন সরঞ্জাম আয়তন পরিমাপ করে?"
      },
      options: [
        { en: "Balance", bn: "তুলা" },
        { en: "Ruler", bn: "রুলার" },
        { en: "Graduated cylinder", bn: "গ্রাজুয়েটেড সিলিন্ডার" },
        { en: "Thermometer", bn: "থার্মোমিটার" }
      ],
      answer: 2,
      explanation: {
        en: "A graduated cylinder measures volume.",
        bn: "গ্রাজুয়েটেড সিলিন্ডার আয়তন পরিমাপ করে।"
      }
    },
    {
      question: {
        en: "What are significant figures?",
        bn: "তাৎপর্যপূর্ণ সংখ্যা কী?"
      },
      options: [
        { en: "All digits", bn: "সব সংখ্যা" },
        { en: "Meaningful digits", bn: "অর্থবহ সংখ্যা" },
        { en: "Random digits", bn: "এলোমেলো সংখ্যা" },
        { en: "Whole numbers", bn: "পূর্ণ সংখ্যা" }
      ],
      answer: 1,
      explanation: {
        en: "Significant figures are meaningful digits in a measurement.",
        bn: "তাৎপর্যপূর্ণ সংখ্যা পরিমাপের অর্থবহ সংখ্যা।"
      }
    },
    {
      question: {
        en: "What does accuracy refer to?",
        bn: "নির্ভুলতা কী বোঝায়?"
      },
      options: [
        { en: "Consistency of measurements", bn: "পরিমাপের ধারাবাহিকতা" },
        { en: "Correctness of measurements", bn: "পরিমাপের সঠিকতা" },
        { en: "Number of digits", bn: "সংখ্যার পরিমাণ" },
        { en: "Tool size", bn: "সরঞ্জামের আকার" }
      ],
      answer: 1,
      explanation: {
        en: "Accuracy refers to how correct a measurement is.",
        bn: "নির্ভুলতা বলতে পরিমাপের সঠিকতা বোঝায়।"
      }
    },
    {
      question: {
        en: "What is an application of scientific measurement?",
        bn: "বৈজ্ঞানিক পরিমাপের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Writing stories", bn: "গল্প লেখা" },
        { en: "Quality control", bn: "মান নিয়ন্ত্রণ" },
        { en: "Drawing art", bn: "চিত্র অঙ্কন" },
        { en: "Playing music", bn: "সঙ্গীত বাজানো" }
      ],
      answer: 1,
      explanation: {
        en: "Scientific measurement is used in quality control in industry.",
        bn: "বৈজ্ঞানিক পরিমাপ শিল্পে মান নিয়ন্ত্রণে ব্যবহৃত হয়।"
      }
    }
  ]
}

export default function ScientificMeasurementQuiz() {
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
