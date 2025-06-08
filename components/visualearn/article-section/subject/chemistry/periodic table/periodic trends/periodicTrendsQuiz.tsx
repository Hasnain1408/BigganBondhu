"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Periodic Trends Quiz",
    bn: "পর্যায় প্রবণতা কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of periodic trends",
    bn: "পর্যায় প্রবণতা সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "How does atomic radius change across a period from left to right?",
        bn: "পর্যায়ে বাম থেকে ডানে পারমাণবিক ব্যাসার্ধ কীভাবে পরিবর্তিত হয়?"
      },
      options: [
        { en: "Increases", bn: "বাড়ে" },
        { en: "Decreases", bn: "কমে" },
        { en: "Remains constant", bn: "স্থির থাকে" },
        { en: "Varies randomly", bn: "এলোমেলোভাবে পরিবর্তিত হয়" }
      ],
      answer: 1,
      explanation: {
        en: "Atomic radius decreases across a period due to increasing nuclear charge, pulling electrons closer.",
        bn: "পর্যায়ে পারমাণবিক ব্যাসার্ধ কমে কারণ নিউক্লিয়ার চার্জ বাড়ে, ইলেকট্রনগুলিকে কাছে টানে।"
      }
    },
    {
      question: {
        en: "Which element has the highest ionization energy in period 2?",
        bn: "পর্যায় ২-এ কোন মৌলের আয়নীকরণ শক্তি সবচেয়ে বেশি?"
      },
      options: [
        { en: "Li", bn: "Li" },
        { en: "Be", bn: "Be" },
        { en: "O", bn: "O" },
        { en: "Ne", bn: "Ne" }
      ],
      answer: 3,
      explanation: {
        en: "Neon (Ne) has the highest ionization energy in period 2 as it has a stable electron configuration.",
        bn: "নিয়ন (Ne) পর্যায় ২-এ সবচেয়ে বেশি আয়নীকরণ শক্তি ধারণ করে কারণ এর ইলেকট্রন বিন্যাস স্থিতিশীল।"
      }
    },
    {
      question: {
        en: "How does electronegativity change down a group?",
        bn: "গ্রুপে নিচে তড়িৎ ঋণাত্মকতা কীভাবে পরিবর্তিত হয়?"
      },
      options: [
        { en: "Increases", bn: "বাড়ে" },
        { en: "Decreases", bn: "কমে" },
        { en: "Remains constant", bn: "স্থির থাকে" },
        { en: "Varies randomly", bn: "এলোমেলোভাবে পরিবর্তিত হয়" }
      ],
      answer: 1,
      explanation: {
        en: "Electronegativity decreases down a group due to increased atomic size and shielding effect.",
        bn: "গ্রুপে নিচে তড়িৎ ঋণাত্মকতা কমে কারণ পারমাণবিক আকার বাড়ে এবং শিল্ডিং প্রভাব বৃদ্ধি পায়।"
      }
    },
    {
      question: {
        en: "Which element has a larger atomic radius: Na or Cl?",
        bn: "কোন মৌলের পারমাণবিক ব্যাসার্ধ বড়ো: Na না Cl?"
      },
      options: [
        { en: "Na", bn: "Na" },
        { en: "Cl", bn: "Cl" },
        { en: "Both are equal", bn: "উভয় সমান" },
        { en: "Cannot compare", bn: "তুলনা করা যায় না" }
      ],
      answer: 0,
      explanation: {
        en: "Na has a larger atomic radius than Cl because it is to the left in the same period.",
        bn: "NaCl এর চেয়ে বড়ো পারমাণবিক ব্যাসার্ধ ধারণ করে কারণ এটি একই পর্যায়ে বামে অবস্থিত।"
      }
    },
    {
      question: {
        en: "What causes periodic trends?",
        bn: "পর্যায় প্রবণতার কারণ কী?"
      },
      options: [
        { en: "Atomic mass", bn: "পারমাণবিক ভর" },
        { en: "Nuclear charge", bn: "নিউক্লিয়ার চার্জ" },
        { en: "Valence electrons", bn: "ভ্যালেন্স ইলেকট্রন" },
        { en: "All of the above", bn: "উপরের সবকিছু" }
      ],
      answer: 3,
      explanation: {
        en: "Periodic trends are influenced by nuclear charge, valence electrons, and electron configuration.",
        bn: "পর্যায় প্রবণতা নিউক্লিয়ার চার্জ, ভ্যালেন্স ইলেকট্রন এবং ইলেকট্রন বিন্যাস দ্বারা প্রভাবিত হয়।"
      }
    }
  ]
}

export default function PeriodicTrendsQuiz() {
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