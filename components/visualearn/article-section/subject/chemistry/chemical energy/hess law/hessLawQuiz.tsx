
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Hess's Law Quiz",
    bn: "হেসের সূত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Hess's Law",
    bn: "হেসের সূত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Hess's Law state?",
        bn: "হেসের সূত্র কী বলে?"
      },
      options: [
        { en: "Energy depends on temperature", bn: "শক্তি তাপমাত্রার উপর নির্ভর করে" },
        { en: "Enthalpy change is path-independent", bn: "এনথালপি পরিবর্তন পথ-নিরপেক্ষ" },
        { en: "Pressure affects enthalpy", bn: "চাপ এনথালপিকে প্রভাবিত করে" },
        { en: "Reactions are reversible", bn: "বিক্রিয়া বিপরীতমুখী" }
      ],
      answer: 1,
      explanation: {
        en: "Hess's Law states that the total enthalpy change is the same regardless of the reaction pathway.",
        bn: "হেসের সূত্র বলে যে মোট এনথালপি পরিবর্তন বিক্রিয়ার পথ নির্বিশেষে একই থাকে।"
      }
    },
    {
      question: {
        en: "How is Hess's Law applied?",
        bn: "হেসের সূত্র কীভাবে প্রয়োগ করা হয়?"
      },
      options: [
        { en: "Measuring reaction rates", bn: "বিক্রিয়ার হার পরিমাপ" },
        { en: "Summing enthalpy of steps", bn: "ধাপের এনথালপি যোগ" },
        { en: "Calculating bond lengths", bn: "বন্ধন দৈর্ঘ্য গণনা" },
        { en: "Determining pH", bn: "pH নির্ধারণ" }
      ],
      answer: 1,
      explanation: {
        en: "Hess's Law is applied by summing the enthalpy changes of intermediate steps.",
        bn: "হেসের সূত্র মধ্যবর্তী ধাপের এনথালপি পরিবর্তন যোগ করে প্রয়োগ করা হয়।"
      }
    },
    {
      question: {
        en: "What is an example of a Hess's Law application?",
        bn: "হেসের সূত্রের একটি প্রয়োগের উদাহরণ কী?"
      },
      options: [
        { en: "Measuring gas volume", bn: "গ্যাসের আয়তন পরিমাপ" },
        { en: "Calculating CO₂ formation energy", bn: "CO₂ গঠনের শক্তি গণনা" },
        { en: "Determining melting point", bn: "গলনাঙ্ক নির্ধারণ" },
        { en: "Analyzing reaction speed", bn: "বিক্রিয়ার গতি বিশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "Hess's Law is used to calculate the energy for CO₂ formation via direct or stepwise paths.",
        bn: "হেসের সূত্র সরাসরি বা ধাপে ধাপে CO₂ গঠনের শক্তি গণনায় ব্যবহৃত হয়।"
      }
    },
    {
      question: {
        en: "Why is Hess's Law useful in industry?",
        bn: "শিল্পে হেসের সূত্র কেন উপযোগী?"
      },
      options: [
        { en: "To measure temperature", bn: "তাপমাত্রা পরিমাপের জন্য" },
        { en: "To calculate reaction energies", bn: "বিক্রিয়ার শক্তি গণনার জন্য" },
        { en: "To determine gas pressure", bn: "গ্যাসের চাপ নির্ধারণের জন্য" },
        { en: "To find molecular weight", bn: "আণবিক ভর নির্ণয়ের জন্য" }
      ],
      answer: 1,
      explanation: {
        en: "Hess's Law helps calculate reaction energies, optimizing industrial processes.",
        bn: "হেসের সূত্র বিক্রিয়ার শক্তি গণনা করে, শিল্প প্রক্রিয়া অপ্টিমাইজ করে।"
      }
    },
    {
      question: {
        en: "What tool is often used with Hess's Law?",
        bn: "হেসের সূত্রের সাথে প্রায়শই কোন সরঞ্জাম ব্যবহৃত হয়?"
      },
      options: [
        { en: "pH meter", bn: "pH মিটার" },
        { en: "Enthalpy of formation table", bn: "গঠনের এনথালপি টেবিল" },
        { en: "Thermometer", bn: "থার্মোমিটার" },
        { en: "Spectrometer", bn: "স্পেকট্রোমিটার" }
      ],
      answer: 1,
      explanation: {
        en: "Enthalpy of formation tables provide ΔH values for Hess's Law calculations.",
        bn: "গঠনের এনথালপি টেবিল হেসের সূত্র গণনার জন্য ΔH মান সরবরাহ করে।"
      }
    }
  ]
}

export default function HessLawQuiz() {
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
