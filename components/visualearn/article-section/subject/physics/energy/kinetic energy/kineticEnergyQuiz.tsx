
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Kinetic Energy Quiz",
    bn: "গতিশক্তি কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Kinetic Energy",
    bn: "গতিশক্তি সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is kinetic energy?",
        bn: "গতিশক্তি কী?"
      },
      options: [
        { en: "Stored energy due to position", bn: "অবস্থানের কারণে সঞ্চিত শক্তি" },
        { en: "Energy due to motion", bn: "গতির কারণে শক্তি" },
        { en: "Energy of heat", bn: "তাপের শক্তি" },
        { en: "Energy of light", bn: "আলোর শক্তি" }
      ],
      answer: 1,
      explanation: {
        en: "Kinetic energy is the energy of an object due to its motion.",
        bn: "গতিশক্তি হল বস্তুর গতির কারণে তার শক্তি।"
      }
    },
    {
      question: {
        en: "What is the formula for kinetic energy?",
        bn: "গতিশক্তির সূত্র কী?"
      },
      options: [
        { en: "KE = mgh", bn: "KE = mgh" },
        { en: "KE = ½mv²", bn: "KE = ½mv²" },
        { en: "KE = ½kx²", bn: "KE = ½kx²" },
        { en: "KE = Fd", bn: "KE = Fd" }
      ],
      answer: 1,
      explanation: {
        en: "Kinetic energy is calculated as KE = ½mv².",
        bn: "গতিশক্তি KE = ½mv² হিসাবে গণনা করা হয়।"
      }
    },
    {
      question: {
        en: "What is the unit of kinetic energy?",
        bn: "গতিশক্তির একক কী?"
      },
      options: [
        { en: "Newton", bn: "নিউটন" },
        { en: "Joule", bn: "জুল" },
        { en: "Watt", bn: "ওয়াট" },
        { en: "Tesla", bn: "টেসলা" }
      ],
      answer: 1,
      explanation: {
        en: "The unit of kinetic energy is Joule (J).",
        bn: "গতিশক্তির একক হল জুল (J)।"
      }
    },
    {
      question: {
        en: "How does kinetic energy depend on velocity?",
        bn: "গতিশক্তি বেগের উপর কীভাবে নির্ভর করে?"
      },
      options: [
        { en: "Linearly", bn: "রৈখিকভাবে" },
        { en: "Quadratically", bn: "দ্বিঘাতভাবে" },
        { en: "Inversely", bn: "বিপরীতভাবে" },
        { en: "Not at all", bn: "মোটেও না" }
      ],
      answer: 1,
      explanation: {
        en: "Kinetic energy depends quadratically on velocity (KE ∝ v²).",
        bn: "গতিশক্তি বেগের দ্বিঘাতভাবে নির্ভর করে (KE ∝ v²)।"
      }
    },
    {
      question: {
        en: "What is an application of kinetic energy?",
        bn: "গতিশক্তির একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Dam construction", bn: "বাঁধ নির্মাণ" },
        { en: "Vehicle design", bn: "যানবাহন ডিজাইন" },
        { en: "Circuit analysis", bn: "সার্কিট বিশ্লেষণ" },
        { en: "Radiation detection", bn: "বিকিরণ সনাক্তকরণ" }
      ],
      answer: 1,
      explanation: {
        en: "Vehicle design uses kinetic energy to optimize performance and safety.",
        bn: "যানবাহন ডিজাইন কর্মক্ষমতা এবং নিরাপত্তা উন্নত করতে গতিশক্তি ব্যবহার করে।"
      }
    }
  ]
}

export default function KineticEnergyQuiz() {
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
