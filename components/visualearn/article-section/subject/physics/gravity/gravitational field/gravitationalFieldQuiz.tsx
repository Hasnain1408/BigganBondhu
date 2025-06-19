
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Gravitational Field Quiz",
    bn: "মাধ্যাকর্ষণ ক্ষেত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Gravitational Field",
    bn: "মাধ্যাকর্ষণ ক্ষেত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is gravitational field strength?",
        bn: "মাধ্যাকর্ষণ ক্ষেত্রের শক্তি কী?"
      },
      options: [
        { en: "Force per unit mass", bn: "ভর প্রতি শক্তি" },
        { en: "Mass per unit force", bn: "শক্তি প্রতি ভর" },
        { en: "Force per unit distance", bn: "দূরত্ব প্রতি শক্তি" },
        { en: "Mass per unit distance", bn: "দূরত্ব প্রতি ভর" }
      ],
      answer: 0,
      explanation: {
        en: "Gravitational field strength is force per unit mass, g = F/m.",
        bn: "মাধ্যাকর্ষণ ক্ষেত্রের শক্তি হল ভর প্রতি শক্তি, g = F/m।"
      }
    },
    {
      question: {
        en: "What is the formula for gravitational field strength?",
        bn: "মাধ্যাকর্ষণ ক্ষেত্রের শক্তির সূত্র কী?"
      },
      options: [
        { en: "g = GM / r", bn: "g = GM / r" },
        { en: "g = GM / r²", bn: "g = GM / r²" },
        { en: "g = G r² / M", bn: "g = G r² / M" },
        { en: "g = G r / M", bn: "g = G r / M" }
      ],
      answer: 1,
      explanation: {
        en: "The formula is g = GM / r².",
        bn: "সূত্রটি হল g = GM / r²।"
      }
    },
    {
      question: {
        en: "What is Earth’s gravitational field strength near its surface?",
        bn: "পৃথিবীর পৃষ্ঠের কাছে মাধ্যাকর্ষণ ক্ষেত্রের শক্তি কত?"
      },
      options: [
        { en: "1.6 m/s²", bn: "1.6 m/s²" },
        { en: "9.8 m/s²", bn: "9.8 m/s²" },
        { en: "3.7 m/s²", bn: "3.7 m/s²" },
        { en: "11.2 m/s²", bn: "11.2 m/s²" }
      ],
      answer: 1,
      explanation: {
        en: "Earth’s gravitational field strength is approximately 9.8 m/s².",
        bn: "পৃথিবীর মাধ্যাকর্ষণ ক্ষেত্রের শক্তি প্রায় 9.8 m/s²।"
      }
    },
    {
      question: {
        en: "How do gravitational field lines indicate direction?",
        bn: "মাধ্যাকর্ষণ ক্ষেত্রের রেখা কীভাবে দিক নির্দেশ করে?"
      },
      options: [
        { en: "Away from mass", bn: "ভর থেকে দূরে" },
        { en: "Parallel to mass", bn: "ভরের সমান্তরাল" },
        { en: "Toward mass", bn: "ভরের দিকে" },
        { en: "Randomly", bn: "এলোমেলোভাবে" }
      ],
      answer: 2,
      explanation: {
        en: "Field lines point toward the mass, showing the direction of the force force.",
        bn: "ক্ষেত্রের রেখা ভরের দিকে নির্দেশ করে, শক্তির দিক দেখায়।"
      }
    },
    {
      question: {
        en: "What is an application of gravitational field knowledge?",
        bn: "মাধ্যা ক্ষণ ক্ষেত্রের জ্ঞানের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Spacecraft navigation", bn: "নৌযান নৌযান নেভিগেশন" },
        { en: "Circuit design", bn: "সার্কিট ডিজাইন" },
        { en: "Chemical synthesis", bn: "রাসায়নিক সংশ্লষ" },
        { en: "Sound engineering", bn: "শব্দ প্রকৌশল" }
      ],
      answer: 0,
      explanation: {
        en: "Applications of gravitational field knowledge include spacecraft navigation.",
        bn: "মাধ্যাকর্ষণ ক্ষেত্রের জ্ঞানের প্রয়োগে নৌযান নেভিগেশন অন্তর্ভুক্ত।"
      }
    }
  ]
}

export default function GravitationalFieldQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
