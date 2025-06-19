
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Atomic Models Quiz",
    bn: "পরমাণু মডেল কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of atomic models",
    bn: "পরমাণু মডেল সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What did Dalton’s atomic theory propose?",
        bn: "ডাল্টনের পরমাণু তত্ত্ব কী প্রস্তাব করেছিল?"
      },
      options: [
        { en: "Atoms are divisible", bn: "পরমাণু বিভাজ্য" },
        { en: "Atoms are indivisible", bn: "পরমাণু অবিভাজ্য" },
        { en: "Atoms have no mass", bn: "পরমাণুর কোনো ভর নেই" },
        { en: "Atoms are charged", bn: "পরমাণু চার্জযুক্ত" }
      ],
      answer: 1,
      explanation: {
        en: "Dalton’s theory proposed that atoms are indivisible and indestructible particles.",
        bn: "ডাল্টনের তত্ত্ব প্রস্তাব করেছিল যে পরমাণু অবিভাজ্য এবং অবিনশ্বর কণা।"
      }
    },
    {
      question: {
        en: "What is Thomson’s plum pudding model?",
        bn: "থমসনের প্লাম পুডিং মডেল কী?"
      },
      options: [
        { en: "Nucleus with orbiting electrons", bn: "নিউক্লিয়াসের চারপাশে ঘুরন্ত ইলেকট্রন" },
        { en: "Electrons in a positive medium", bn: "ধনাত্মক মাধ্যমে ইলেকট্রন" },
        { en: "Quantized orbits", bn: "কোয়ান্টাইজড কক্ষপথ" },
        { en: "Probability clouds", bn: "সম্ভাব্যতা মেঘ" }
      ],
      answer: 1,
      explanation: {
        en: "Thomson’s model described electrons embedded in a positively charged medium, like plums in a pudding.",
        bn: "থমসনের মডেল ইলেকট্রনকে ধনাত্মক চার্জযুক্ত মাধ্যমে স্থাপিত হিসেবে বর্ণনা করেছিল, যেমন পুডিংয়ে প্লাম।"
      }
    },
    {
      question: {
        en: "What did Rutherford’s gold foil experiment reveal?",
        bn: "রাদারফোর্ডের গোল্ড ফয়েল পরীক্ষা কী প্রকাশ করেছিল?"
      },
      options: [
        { en: "Electrons orbit the nucleus", bn: "ইলেকট্রন নিউক্লিয়াসের চারপাশে ঘুরে" },
        { en: "Atoms are mostly empty space", bn: "পরমাণু প্রায়শই ফাঁকা স্থান" },
        { en: "Atoms are indivisible", bn: "পরমাণু অবিভাজ্য" },
        { en: "Electrons are positive", bn: "ইলেকট্রন ধনাত্মক" }
      ],
      answer: 1,
      explanation: {
        en: "Rutherford’s experiment showed that atoms are mostly empty space with a dense nucleus at the center.",
        bn: "রাদারফোর্ডের পরীক্ষা দেখিয়েছিল যে পরমাণু প্রায় ফাঁকা স্থান এবং কেন্দ্রে একটি ঘন নিউক্লিয়াস রয়েছে।"
      }
    },
    {
      question: {
        en: "What is a key feature of Bohr’s model?",
        bn: "বোরের মডেলের মূল বৈশিষ্ট্য কী?"
      },
      options: [
        { en: "Electrons in probability clouds", bn: "সম্ভাব্যতা মেঘে ইলেকট্রন" },
        { en: "Quantized energy levels", bn: "কোয়ান্টাইজড শক্তি স্তর" },
        { en: "Positive electrons", bn: "ধনাত্মক ইলেকট্রন" },
        { en: "No nucleus", bn: "কোনো নিউক্লিয়াস নেই" }
      ],
      answer: 1,
      explanation: {
        en: "Bohr’s model introduced quantized energy levels, where electrons orbit in fixed paths.",
        bn: "বোরের মডেল কোয়ান্টাইজড শক্তি স্তর প্রবর্তন করেছিল, যেখানে ইলেকট্রন নির্দিষ্ট কক্ষপথে ঘুরে।"
      }
    },
    {
      question: {
        en: "What does the quantum mechanical model use to describe electrons?",
        bn: "কোয়ান্টাম যান্ত্রিক মডেল ইলেকট্রন বর্ণনা করতে কী ব্যবহার করে?"
      },
      options: [
        { en: "Fixed orbits", bn: "নির্দিষ্ট কক্ষপথ" },
        { en: "Probability clouds", bn: "সম্ভাব্যতা মেঘ" },
        { en: "Positive medium", bn: "ধনাত্মক মাধ্যম" },
        { en: "Planetary paths", bn: "গ্রহের পথ" }
      ],
      answer: 1,
      explanation: {
        en: "The quantum mechanical model uses probability clouds (orbitals) to describe electron positions.",
        bn: "কোয়ান্টাম যান্ত্রিক মডেল ইলেকট্রনের অবস্থান বর্ণনা করতে সম্ভাব্যতা মেঘ (অরবিটাল) ব্যবহার করে।"
      }
    }
  ]
}

export default function AtomicModelsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Atomic Models Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
