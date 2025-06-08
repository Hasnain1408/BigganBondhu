"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Covalent Bonding Quiz",
    bn: "সহযোজী বন্ধন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of covalent bonding",
    bn: "সহযোজী বন্ধন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What type of elements typically form covalent bonds?",
        bn: "কোন ধরনের মৌল সাধারণত সহযোজী বন্ধন গঠন করে?"
      },
      options: [
        { en: "Metal and Metal", bn: "ধাতু এবং ধাতু" },
        { en: "Metal and Non-metal", bn: "ধাতু এবং অধাতু" },
        { en: "Non-metal and Non-metal", bn: "অধাতু এবং অধাতু" },
        { en: "Noble Gas and Metal", bn: "নোবেল গ্যাস এবং ধাতু" }
      ],
      answer: 2,
      explanation: {
        en: "Covalent bonds form between non-metals that share electrons to achieve stability.",
        bn: "সহযোজী বন্ধন অধাতুগুলির মধ্যে গঠিত হয় যারা ইলেকট্রন ভাগ করে স্থিতিশীলতা অর্জন করে।"
      }
    },
    {
      question: {
        en: "How many electrons are shared in a double covalent bond?",
        bn: "দ্বৈত সহযোজী বন্ধনে কতটি ইলেকট্রন ভাগ করা হয়?"
      },
      options: [
        { en: "2", bn: "2" },
        { en: "4", bn: "4" },
        { en: "6", bn: "6" },
        { en: "8", bn: "8" }
      ],
      answer: 1,
      explanation: {
        en: "A double covalent bond involves the sharing of two pairs of electrons, or 4 electrons.",
        bn: "দ্বৈত সহযোজী বন্ধনে দুই জোড়া ইলেকট্রন ভাগ করা হয়, অর্থাৎ ৪টি ইলেকট্রন।"
      }
    },
    {
      question: {
        en: "Which molecule contains a triple covalent bond?",
        bn: "কোন অণুতে ত্রৈত সহযোজী বন্ধন রয়েছে?"
      },
      options: [
        { en: "H₂", bn: "H₂" },
        { en: "O₂", bn: "O₂" },
        { en: "N₂", bn: "N₂" },
        { en: "H₂O", bn: "H₂O" }
      ],
      answer: 2,
      explanation: {
        en: "N₂ contains a triple covalent bond, sharing three pairs of electrons.",
        bn: "N₂ ত্রৈত সহযোজী বন্ধন ধারণ করে, যেখানে তিন জোড়া ইলেকট্রন ভাগ করা হয়।"
      }
    },
    {
      question: {
        en: "What is a characteristic property of covalent compounds?",
        bn: "সহযোজী যৌগের একটি বৈশিষ্ট্যপূর্ণ গুণ কী?"
      },
      options: [
        { en: "High melting point", bn: "উচ্চ গলনাঙ্ক" },
        { en: "Low melting point", bn: "নিম্ন গলনাঙ্ক" },
        { en: "Conduct electricity", bn: "তড়িৎ পরিবহন" },
        { en: "Crystal lattice", bn: "স্ফটিক কাঠামো" }
      ],
      answer: 1,
      explanation: {
        en: "Covalent compounds typically have low melting points due to weak intermolecular forces.",
        bn: "সহযোজী যৌগের সাধারণত নিম্ন গলনাঙ্ক থাকে কারণ তাদের আন্তঃঅণুবীয় বল দুর্বল।"
      }
    },
    {
      question: {
        en: "Which compound is an example of covalent bonding?",
        bn: "কোন যৌগটি সহযোজী বন্ধনের উদাহরণ?"
      },
      options: [
        { en: "NaCl", bn: "NaCl" },
        { en: "MgO", bn: "MgO" },
        { en: "CH₄", bn: "CH₄" },
        { en: "KBr", bn: "KBr" }
      ],
      answer: 2,
      explanation: {
        en: "CH₄ is a covalent compound formed by the sharing of electrons between carbon and hydrogen.",
        bn: "CH₄ একটি সহযোজী যৌগ, যা কার্বন এবং হাইড্রোজেনের মধ্যে ইলেকট্রন ভাগাভাগির মাধ্যমে গঠিত।"
      }
    }
  ]
}

export default function CovalentBondingQuiz() {
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