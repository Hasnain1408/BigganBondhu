"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Periodic Law Quiz",
    bn: "পরায় সূত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Periodic Law",
    bn: "পরায় সূত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Who refined the Periodic Law using atomic numbers?",
        bn: "কে পারমাণবিক সংখ্যা ব্যবহার করে পরায় সূত্র সংশোধন করেছেন?"
      },
      options: [
        { en: "Dmitri Mendeleev", bn: "দিমিত্রি মেন্ডেলিভ" },
        { en: "Henry Moseley", bn: "হেনরি মোসলি" },
        { en: "John Dalton", bn: "জন ডাল্টন" },
        { en: "Antoine Lavoisier", bn: "অ্যান্টোয়ান লাভোয়েয়ার" }
      ],
      answer: 1,
      explanation: {
        en: "Henry Moseley refined Periodic Law in 1913 by arranging elements by atomic number, correcting inconsistencies in Mendeleev’s table.",
        bn: "হেনরি মোসলি ১৯১৩ সালে পারমাণবিক সংখ্যার মাধ্যমে মৌল সাজিয়ে পরায় সূত্র সংশোধন করেছেন, মেন্ডেলিভের সারণীর অসঙ্গতি সংশোধন করে।"
      }
    },
    {
      question: {
        en: "What does Periodic Law state about element properties?",
        bn: "পরায় সূত্র মৌলের বৈশিষ্ট্য সম্পর্কে কী বলে?"
      },
      options: [
        { en: "They are random", bn: "এগুলি এলোমেলো" },
        { en: "They are constant", bn: "এগুলি স্থির" },
        { en: "They repeat periodically", bn: "এগুলি পর্যায়ভিত্তে পুনরাবৃত্ত হয়" },
        { en: "They decrease linearly", bn: "এগুলি রৈখিকভাবে কমে" }
      ],
      answer: 2,
      explanation: {
        en: "Periodic Law states that element properties are a periodic function of their atomic numbers, repeating at regular intervals.",
        bn: "পরায় সূত্র বলে যে মৌলের বৈশিষ্ট্য তাদের পারমাণবিক সংখ্যার পর্যায়বৃত ফাংশন, যা নিয়মিত বিরতিতে পুনরাবৃত্ত হয়।"
      }
    },
    {
      question: {
        en: "How does atomic radius change down a group?",
        bn: "গ্রুপে নিচে পারমাণবিক ব্যাসার্ধ কীভাবে পরিবর্তিত হয়?"
      },
      options: [
        { en: "Increases", bn: "বাড়ে" },
        { en: "Decreases", bn: "কমে" },
        { en: "Remains constant", bn: "স্থির থাকে" },
        { en: "Varies randomly", bn: "এলোমেলোভাবে পরিবর্তিত হয়" }
      ],
      answer: 0,
      explanation: {
        en: "Atomic radius increases down a group due to additional electron shells, increasing the distance from the nucleus.",
        bn: "গ্রুপে নিচে পারমাণবিক ব্যাসার্ধ বাড়ে কারণ অতিরিক্ত ইলেকট্রন শেল নিউক্লিয়াস থেকে দূরত্ব বাড়ায়।"
      }
    },
    {
      question: {
        en: "Which property increases across a period from left to right?",
        bn: "কোন বৈশিষ্ট্য পর্যায়ে বাম থেকে ডানে বাড়ে?"
      },
      options: [
        { en: "Atomic radius", bn: "পারমাণবিক ব্যাসার্ধ" },
        { en: "Ionization energy", bn: "আয়নীকরণ শক্তি" },
        { en: "Metallic character", bn: "ধাতবিক বৈশিষ্ট্য" },
        { en: "Atomic mass", bn: "পারমাণবিক ভর" }
      ],
      answer: 1,
      explanation: {
        en: "Ionization energy increases across a period due to higher nuclear charge, making electrons harder to remove.",
        bn: "পর্যায়ে আয়নীকরণ শক্তি বাড়ে কারণ উচ্চতর নিউক্লিয়ার চার্জ ইলেকট্রন অপসারণকে কঠিন করে।"
      }
    },
    {
      question: {
        en: "What is the basis of Mendeleev’s original periodic table?",
        bn: "মেন্ডেলিভের মূল পর্যায় সারণীর ভিত্তি কী ছিল?"
      },
      options: [
        { en: "Atomic number", bn: "পারমাণবিক সংখ্যা" },
        { en: "Atomic mass", bn: "পারমাণবিক ভর" },
        { en: "Valence electrons", bn: "ভ্যালেন্স ইলেকট্রন" },
        { en: "Electronegativity", bn: "তড়িৎ ঋণাত্মকতা" }
      ],
      answer: 1,
      explanation: {
        en: "Mendeleev’s original periodic table was based on atomic mass, arranging elements by increasing mass and noting periodic properties.",
        bn: "মেন্ডেলিভের মূল পর্যায় সারণী পারমাণবিক ভরের উপর ভিত্তি করে ছিল, মৌলগুলিকে বাড়তি ভর অনুসারে সাজিয়ে পর্যায় বৈশিষ্ট্য লক্ষ্য করা হয়।"
      }
    }
  ]
}

export default function PeriodicLawQuiz() {
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