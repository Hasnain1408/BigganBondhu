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
        en: "Which scientist proposed the plum pudding model of the atom?",
        bn: "কোন বিজ্ঞানী পরমাণুর প্লাম পুডিং মডেল প্রস্তাব করেছিলেন?"
      },
      options: [
        { en: "John Dalton", bn: "জন ডালটন" },
        { en: "J.J. Thomson", bn: "জে. জে. থমসন" },
        { en: "Ernest Rutherford", bn: "আর্নেস্ট রাদারফোর্ড" },
        { en: "Niels Bohr", bn: "নীলস বোর" }
      ],
      answer: 1,
      explanation: {
        en: "J.J. Thomson proposed the plum pudding model in 1904, suggesting electrons are embedded in a positive mass.",
        bn: "জে. জে. থমসন ১৯০৪ সালে প্লাম পুডিং মডেল প্রস্তাব করেন, যেখানে ইলেকট্রন ধনাত্মক পদার্থে স্থাপিত।"
      }
    },
    {
      question: {
        en: "What did Rutherford’s gold foil experiment demonstrate?",
        bn: "রাদারফোর্ডের স্বর্ণ ফয়েল পরীক্ষা কী প্রদর্শন করেছিল?"
      },
      options: [
        { en: "Atoms are indivisible", bn: "পরমাণু অবিভাজ্য" },
        { en: "Electrons orbit in fixed paths", bn: "ইলেকট্রন নির্দিষ্ট পথে ঘুরে" },
        { en: "Atoms have a dense nucleus", bn: "পরমাণুর ঘন নিউক্লিয়াস আছে" },
        { en: "Electrons exist in clouds", bn: "ইলেকট্রন মেঘে থাকে" }
      ],
      answer: 2,
      explanation: {
        en: "Rutherford’s 1911 experiment showed that atoms have a small, dense nucleus, leading to the nuclear model.",
        bn: "রাদারফোর্ডের ১৯১১ সালের পরীক্ষা দেখায় যে পরমাণুর একটি ছোট, ঘন নিউক্লিয়াস রয়েছে।"
      }
    },
    {
      question: {
        en: "Which model introduced quantized energy levels for electrons?",
        bn: "কোন মডেল ইলেকট্রনের জন্য কোয়ান্টাইজড শক্তি স্তর প্রবর্তন করেছিল?"
      },
      options: [
        { en: "Dalton’s Model", bn: "ডালটনের মডেল" },
        { en: "Thomson’s Model", bn: "থমসনের মডেল" },
        { en: "Bohr’s Model", bn: "বোরের মডেল" },
        { en: "Quantum Model", bn: "কোয়ান্টাম মডেল" }
      ],
      answer: 2,
      explanation: {
        en: "Bohr’s model (1913) introduced quantized energy levels, explaining electron transitions and spectral lines.",
        bn: "বোরের মডেল (১৯১৩) কোয়ান্টাইজড শক্তি স্তর প্রবর্তন করে, যা ইলেকট্রন স্থানান্তর ব্যাখ্যা করে।"
      }
    },
    {
      question: {
        en: "What is the key feature of the quantum mechanical model?",
        bn: "কোয়ান্টাম মেকানিকাল মডেলের মূল বৈশিষ্ট্য কী?"
      },
      options: [
        { en: "Solid indivisible atoms", bn: "কঠিন অবিভাজ্য পরমাণু" },
        { en: "Fixed electron orbits", bn: "নির্দিষ্ট ইলেকট্রন কক্ষপথ" },
        { en: "Electron probability clouds", bn: "ইলেকট্রন সম্ভাব্যতার মেঘ" },
        { en: "Positive mass with electrons", bn: "ইলেকট্রন সহ ধনাত্মক ভর" }
      ],
      answer: 2,
      explanation: {
        en: "The quantum mechanical model describes electrons in probability clouds, based on quantum mechanics.",
        bn: "কোয়ান্টাম মেকানিকাল মডেল ইলেকট্রনকে সম্ভাব্যতার মেঘে বর্ণনা করে।"
      }
    },
    {
      question: {
        en: "Which model was the first to propose that atoms are indivisible?",
        bn: "কোন মডেল প্রথম প্রস্তাব করেছিল যে পরমাণু অবিভাজ্য?"
      },
      options: [
        { en: "Dalton’s Model", bn: "ডালটনের মডেল" },
        { en: "Thomson’s Model", bn: "থমসনের মডেল" },
        { en: "Rutherford’s Model", bn: "রাদারফোর্ডের মডেল" },
        { en: "Bohr’s Model", bn: "বোরের মডেল" }
      ],
      answer: 0,
      explanation: {
        en: "Dalton’s model (1808) was the first to propose that atoms are indivisible solid particles.",
        bn: "ডালটনের মডেল (১৮০৮) প্রথম প্রস্তাব করে যে পরমাণু অবিভাজ্য কঠিন কণা।"
      }
    }
  ]
}

export default function AtomicModelsQuiz() {
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