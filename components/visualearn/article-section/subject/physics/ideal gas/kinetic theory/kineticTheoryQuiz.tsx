
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Kinetic Theory Quiz",
    bn: "গতিশক্তি তত্ত্ব কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Kinetic Theory",
    bn: "গতিশক্তি তত্ত্ব সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Kinetic Theory explain?",
        bn: "গতিশক্তি তত্ত্ব কী ব্যাখ্যা করে?"
      },
      options: [
        { en: "Gas behavior", bn: "গ্যাসের আচরণ" },
        { en: "Solid structure", bn: "কঠিন গঠন" },
        { en: "Liquid flow", bn: "তরল প্রবাহ" },
        { en: "Electric fields", bn: "বৈদ্যুতিক ক্ষেত্র" }
      ],
      answer: 0,
      explanation: {
        en: "Kinetic Theory explains gas behavior through particle motion.",
        bn: "গতিশক্তি তত্ত্ব কণার গতির মাধ্যমে গ্যাসের আচরণ ব্যাখ্যা করে।"
      }
    },
    {
      question: {
        en: "What is the formula for average kinetic energy?",
        bn: "গড় গতিশক্তির সূত্র কী?"
      },
      options: [
        { en: "KE = (1/2)kT", bn: "KE = (1/2)kT" },
        { en: "KE = (3/2)kT", bn: "KE = (3/2)kT" },
        { en: "KE = kT", bn: "KE = kT" },
        { en: "KE = (3/2)k/T", bn: "KE = (3/2)k/T" }
      ],
      answer: 1,
      explanation: {
        en: "The average kinetic energy is KE = (3/2)kT.",
        bn: "গড় গতিশক্তি হল KE = (3/2)kT।"
      }
    },
    {
      question: {
        en: "What is the Boltzmann constant’s value?",
        bn: "বোলৎজম্যান ধ্রুবকের মান কত?"
      },
      options: [
        { en: "1.38 × 10⁻²³ J/K", bn: "1.38 × 10⁻²³ J/K" },
        { en: "6.67 × 10⁻¹¹ N·m²/kg²", bn: "6.67 × 10⁻¹¹ N·m²/kg²" },
        { en: "8.31 J/(mol·K)", bn: "8.31 J/(mol·K)" },
        { en: "9.8 m/s²", bn: "9.8 m/s²" }
      ],
      answer: 0,
      explanation: {
        en: "The Boltzmann constant is 1.38 × 10⁻²³ J/K.",
        bn: "বোলৎজম্যান ধ্রুবক হল 1.38 × 10⁻²³ J/K।"
      }
    },
    {
      question: {
        en: "What assumption does Kinetic Theory make about collisions?",
        bn: "গতিশক্তি তত্ত্ব সংঘর্ষ সম্পর্কে কী ধারণা করে?"
      },
      options: [
        { en: "Inelastic", bn: "অনিলাস্টিক" },
        { en: "Elastic", bn: "ইলাস্টিক" },
        { en: "Random", bn: "এলোমেলো" },
        { en: "Sticky", bn: "আঠালো" }
      ],
      answer: 1,
      explanation: {
        en: "Kinetic Theory assumes collisions are elastic.",
        bn: "গতিশক্তি তত্ত্ব ধরে নেয় যে সংঘর্ষ ইলাস্টিক।"
      }
    },
    {
      question: {
        en: "What is an application of Kinetic Theory?",
        bn: "গতিশক্তি তত্ত্বের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "GPS navigation", bn: "জিপিএস নেভিগেশন" },
        { en: "Gas engine design", bn: "গ্যাস ইঞ্জিন ডিজাইন" },
        { en: "Circuit analysis", bn: "সার্কিট বিশ্লেষণ" },
        { en: "Magnetic field measurement", bn: "চৌম্বক ক্ষেত্র পরিমাপ" }
      ],
      answer: 1,
      explanation: {
        en: "Gas engine design uses principles of Kinetic Theory.",
        bn: "গ্যাস ইঞ্জিন ডিজাইনে গতিশক্তি তত্ত্বের নীতি ব্যবহৃত হয়।"
      }
    }
  ]
}

export default function KineticTheoryQuiz() {
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
