"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Electron Configuration Quiz",
    bn: "ইলেকট্রন বিন্যাস কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of electron configurations",
    bn: "ইলেকট্রন বিন্যাস সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the electron configuration of Nitrogen (Z = 7)?",
        bn: "নাইট্রোজেন (Z = 7) এর ইলেকট্রন বিন্যাস কী?"
      },
      options: [
        { en: "1s² 2s² 2p²", bn: "1s² 2s² 2p²" },
        { en: "1s² 2s² 2p³", bn: "1s² 2s² 2p³" },
        { en: "1s² 2s³ 2p²", bn: "1s² 2s³ 2p²" },
        { en: "1s² 2p⁵", bn: "1s² 2p⁵" }
      ],
      answer: 1,
      explanation: {
        en: "Nitrogen has 7 electrons. Following Aufbau principle: 1s² (2 electrons), 2s² (2 electrons), 2p³ (3 electrons) = 1s² 2s² 2p³.",
        bn: "নাইট্রোজেনের 7টি ইলেকট্রন। আউফবাউ নীতি অনুসারে: 1s² (2 ইলেকট্রন), 2s² (2 ইলেকট্রন), 2p³ (3 ইলেকট্রন) = 1s² 2s² 2p³।"
      }
    },
    {
      question: {
        en: "How many electrons can the 3p sublevel hold?",
        bn: "3p উপস্তর কতটি ইলেকট্রন ধরে রাখতে পারে?"
      },
      options: [
        { en: "2", bn: "2" },
        { en: "6", bn: "6" },
        { en: "10", bn: "10" },
        { en: "14", bn: "14" }
      ],
      answer: 1,
      explanation: {
        en: "The p sublevel has 3 orbitals, each holding 2 electrons, so 3p can hold 3 × 2 = 6 electrons.",
        bn: "p উপস্তরে 3টি কক্ষপথ থাকে, প্রতিটি 2টি ইলেকট্রন ধরে, তাই 3p 3 × 2 = 6 ইলেকট্রন ধরতে পারে।"
      }
    },
    {
      question: {
        en: "Which principle states that electrons fill orbitals singly before pairing?",
        bn: "কোন নীতি বলে যে ইলেকট্রন জোড়া হওয়ার আগে এককভাবে কক্ষপথ পূর্ণ করে?"
      },
      options: [
        { en: "Aufbau Principle", bn: "আউফবাউ নীতি" },
        { en: "Pauli Exclusion Principle", bn: "পাউলির বর্জন নীতি" },
        { en: "Hund’s Rule", bn: "হুন্ডের নিয়ম" },
        { en: "Heisenberg Principle", bn: "হাইজেনবার্গ নীতি" }
      ],
      answer: 2,
      explanation: {
        en: "Hund’s Rule states that electrons occupy orbitals singly with parallel spins before pairing up to maximize stability.",
        bn: "হুন্ডের নিয়ম বলে যে ইলেকট্রন জোড়া হওয়ার আগে সমান্তরাল স্পিন সহ এককভাবে কক্ষপথে প্রবেশ করে।"
      }
    },
    {
      question: {
        en: "What is the electron configuration of Chromium (Z = 24)?",
        bn: "ক্রোমিয়াম (Z = 24) এর ইলেকট্রন বিন্যাস কী?"
      },
      options: [
        { en: "[Ar] 4s² 3d⁴", bn: "[Ar] 4s² 3d⁴" },
        { en: "[Ar] 4s¹ 3d⁵", bn: "[Ar] 4s¹ 3d⁵" },
        { en: "[Ar] 4s² 3d³", bn: "[Ar] 4s² 3d³" },
        { en: "[Ar] 4s² 3d⁵", bn: "[Ar] 4s² 3d⁵" }
      ],
      answer: 1,
      explanation: {
        en: "Chromium is an exception. It has [Ar] 4s¹ 3d⁵ instead of [Ar] 4s² 3d⁴ for a half-filled 3d sublevel, which is more stable.",
        bn: "ক্রোমিয়াম একটি ব্যতিক্রম। এটির বিন্যাস [Ar] 4s¹ 3d⁵, কারণ আধা-পূর্ণ 3d উপস্তর বেশি স্থিতিশীল।"
      }
    },
    {
      question: {
        en: "How many electrons are in the valence shell of Oxygen (Z = 8)?",
        bn: "অক্সিজেন (Z = 8) এর বহিঃস্থ শেলে কতটি ইলেকট্রন থাকে?"
      },
      options: [
        { en: "2", bn: "2" },
        { en: "4", bn: "4" },
        { en: "6", bn: "6" },
        { en: "8", bn: "8" }
      ],
      answer: 2,
      explanation: {
        en: "Oxygen’s electron configuration is 1s² 2s² 2p⁴. The valence shell (n = 2) has 2s² 2p⁴ = 6 electrons.",
        bn: "অক্সিজেনের ইলেকট্রন বিন্যাস 1s² 2s² 2p⁴। বহিঃস্থ শেল (n = 2) এ 2s² 2p⁴ = 6 ইলেকট্রন।"
      }
    }
  ]
}

export default function ElectronConfigurationQuiz() {
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