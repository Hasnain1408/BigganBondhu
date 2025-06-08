"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Ionic Bonding Quiz",
    bn: "আয়নিক বন্ধন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of ionic bonding",
    bn: "আয়নিক বন্ধন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What type of elements typically form ionic bonds?",
        bn: "কোন ধরনের মৌল সাধারণত আয়নিক বন্ধন গঠন করে?"
      },
      options: [
        { en: "Metal and Metal", bn: "ধাতু এবং ধাতু" },
        { en: "Metal and Non-metal", bn: "ধাতু এবং অধাতু" },
        { en: "Non-metal and Non-metal", bn: "অধাতু এবং অধাতু" },
        { en: "Noble Gas and Metal", bn: "নোবেল গ্যাস এবং ধাতু" }
      ],
      answer: 1,
      explanation: {
        en: "Ionic bonds form between metals, which lose electrons, and non-metals, which gain electrons.",
        bn: "আয়নিক বন্ধন ধাতু (যা ইলেকট্রন ত্যাগ করে) এবং অধাতু (যা ইলেকট্রন গ্রহণ করে) এর মধ্যে গঠিত হয়।"
      }
    },
    {
      question: {
        en: "What is the charge of the sodium ion in NaCl?",
        bn: "NaCl-এ সোডিয়াম আয়নের চার্জ কত?"
      },
      options: [
        { en: "+1", bn: "+1" },
        { en: "-1", bn: "-1" },
        { en: "+2", bn: "+2" },
        { en: "0", bn: "0" }
      ],
      answer: 0,
      explanation: {
        en: "Sodium loses one electron to form Na⁺, which has a +1 charge.",
        bn: "সোডিয়াম একটি ইলেকট্রন ত্যাগ করে Na⁺ গঠন করে, যার চার্জ +1।"
      }
    },
    {
      question: {
        en: "Which property is characteristic of ionic compounds?",
        bn: "আয়নিক যৌগের কোন বৈশিষ্ট্য প্রকৃতিগত?"
      },
      options: [
        { en: "Low melting point", bn: "নিম্ন গলনাঙ্ক" },
        { en: "High melting point", bn: "উচ্চ গলনাঙ্ক" },
        { en: "Soft structure", bn: "নরম কাঠামো" },
        { en: "Non-conductive in solution", bn: "দ্রবণে অপরিবাহী" }
      ],
      answer: 1,
      explanation: {
        en: "Ionic compounds have high melting points due to strong electrostatic forces in their crystal lattice.",
        bn: "আয়নিক যৌগের উচ্চ গলনাঙ্ক থাকে কারণ তাদের স্ফটিক কাঠামোতে শক্তিশালী তড়িৎস্থিতিক বল রয়েছে।"
      }
    },
    {
      question: {
        en: "What holds ionic compounds together?",
        bn: "আয়নিক যৌগগুলিকে একত্রে কী ধরে রাখে?"
      },
      options: [
        { en: "Covalent bonds", bn: "সহযোজী বন্ধন" },
        { en: "Hydrogen bonds", bn: "হাইড্রোজেন বন্ধন" },
        { en: "Electrostatic attraction", bn: "তড়িৎস্থিতিক আকর্ষণ" },
        { en: "Metallic bonds", bn: "ধাতব বন্ধন" }
      ],
      answer: 2,
      explanation: {
        en: "Electrostatic attraction between oppositely charged ions holds ionic compounds together.",
        bn: "বিপরীত চার্জযুক্ত আয়নের মধ্যে তড়িৎস্থিতিক আকর্ষণ আয়নিক যৌগকে একত্রে ধরে রাখে।"
      }
    },
    {
      question: {
        en: "Which compound is an example of ionic bonding?",
        bn: "কোন যৌগটি আয়নিক বন্ধনের উদাহরণ?"
      },
      options: [
        { en: "H₂O", bn: "H₂O" },
        { en: "CO₂", bn: "CO₂" },
        { en: "NaCl", bn: "NaCl" },
        { en: "CH₄", bn: "CH₄" }
      ],
      answer: 2,
      explanation: {
        en: "NaCl is an ionic compound formed by the transfer of electrons between sodium and chlorine.",
        bn: "NaCl একটি আয়নিক যৌগ, যা সোডিয়াম এবং ক্লোরিনের মধ্যে ইলেকট্রন স্থানান্তরের মাধ্যমে গঠিত।"
      }
    }
  ]
}

export default function IonicBondingQuiz() {
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