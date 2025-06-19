
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Energy Conservation Quiz",
    bn: "শক্তি সংরক্ষণ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Energy Conservation",
    bn: "শক্তি সংরক্ষণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does the Law of Energy Conservation state?",
        bn: "শক্তি সংরক্ষণের সূত্র কী বলে?"
      },
      options: [
        { en: "Energy can be created", bn: "শক্তি সৃষ্টি করা যায়" },
        { en: "Energy can be destroyed", bn: "শক্তি ধ্বংস করা যায়" },
        { en: "Total energy remains constant", bn: "মোট শক্তি স্থির থাকে" },
        { en: "Energy is proportional to mass", bn: "শক্তি ভরের সমানুপাতিক" }
      ],
      answer: 2,
      explanation: {
        en: "The Law of Energy Conservation states that the total energy of an isolated system remains constant.",
        bn: "শক্তি সংরক্ষণের সূত্র বলে যে বিচ্ছিন্ন ব্যবস্থার মোট শক্তি স্থির থাকে।"
      }
    },
    {
      question: {
        en: "What is the formula for total mechanical energy?",
        bn: "মোট যান্ত্রিক শক্তির সূত্র কী?"
      },
      options: [
        { en: "KE + PE", bn: "KE + PE" },
        { en: "KE - PE", bn: "KE - PE" },
        { en: "KE × PE", bn: "KE × PE" },
        { en: "KE / PE", bn: "KE / PE" }
      ],
      answer: 0,
      explanation: {
        en: "Total mechanical energy is the sum of kinetic energy (KE) and potential energy (PE).",
        bn: "মোট যান্ত্রিক শক্তি হল গতিশক্তি (KE) এবং বিভব শক্তি (PE) এর যোগফল।"
      }
    },
    {
      question: {
        en: "What is the unit of energy?",
        bn: "শক্তির একক কী?"
      },
      options: [
        { en: "Newton", bn: "নিউটন" },
        { en: "Joule", bn: "জুল" },
        { en: "Watt", bn: "ওয়াট" },
        { en: "Tesla", bn: "টেসলা" }
      ],
      answer: 1,
      explanation: {
        en: "The unit of energy is Joule (J).",
        bn: "শক্তির একক হল জুল (J)।"
      }
    },
    {
      question: {
        en: "In a frictionless pendulum, what happens to total energy?",
        bn: "ঘর্ষণহীন দোলনায় মোট শক্তির কী হয়?"
      },
      options: [
        { en: "Increases", bn: "বাড়ে" },
        { en: "Decreases", bn: "কমে" },
        { en: "Remains constant", bn: "স্থির থাকে" },
        { en: "Becomes zero", bn: "শূন্য হয়" }
      ],
      answer: 2,
      explanation: {
        en: "In a frictionless pendulum, total energy remains constant as it transforms between KE and PE.",
        bn: "ঘর্ষণহীন দোলনায় মোট শক্তি স্থির থাকে কারণ এটি KE এবং PE এর মধ্যে রূপান্তরিত হয়।"
      }
    },
    {
      question: {
        en: "What is an application of energy conservation?",
        bn: "শক্তি সংরক্ষণের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Circuit design", bn: "সার্কিট ডিজাইন" },
        { en: "Renewable energy", bn: "পুনর্নবীকরণযোগ্য শক্তি" },
        { en: "Gas compression", bn: "গ্যাস সংকোচন" },
        { en: "Radiation detection", bn: "বিকিরণ সনাক্তকরণ" }
      ],
      answer: 1,
      explanation: {
        en: "Renewable energy systems rely on energy conservation principles to optimize efficiency.",
        bn: "পুনর্নবীকরণযোগ্য শক্তি ব্যবস্থা দক্ষতা বাড়াতে শক্তি সংরক্ষণের নীতির উপর নির্ভর করে।"
      }
    }
  ]
}

export default function EnergyConservationQuiz() {
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
