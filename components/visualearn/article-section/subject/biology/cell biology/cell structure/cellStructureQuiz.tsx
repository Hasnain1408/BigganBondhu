"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Cell Structure Quiz",
    bn: "কোষ গঠন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of cell structure",
    bn: "কোষ গঠন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which cell type lacks a nucleus?",
        bn: "কোন ধরণের কোষে নিউক্লিয়াস থাকে না?"
      },
      options: [
        { en: "Eukaryotic", bn: "ইউক্যারিওটিক" },
        { en: "Prokaryotic", bn: "প্রোক্যারিওটিক" },
        { en: "Animal cell", bn: "প্রাণী কোষ" },
        { en: "Plant cell", bn: "উদ্ভিদ কোষ" }
      ],
      answer: 1,
      explanation: {
        en: "Prokaryotic cells, like bacteria, lack a nucleus and have DNA in the cytoplasm.",
        bn: "প্রোক্যারিওটিক কোষ, যেমন ব্যাকটেরিয়া, নিউক্লিয়াস ছাড়া থাকে এবং সাইটোপ্লাজমে ডিএনএ থাকে।"
      }
    },
    {
      question: {
        en: "What is the function of the nucleus?",
        bn: "নিউক্লিয়াসের কাজ কী?"
      },
      options: [
        { en: "Energy production", bn: "শক্তি উৎপাদন" },
        { en: "Protein synthesis", bn: "প্রোটিন সংশ্লেষণ" },
        { en: "Genetic information storage", bn: "জিনগত তথ্য সংরক্ষণ" },
        { en: "Waste removal", bn: "বর্জ্য অপসারণ" }
      ],
      answer: 2,
      explanation: {
        en: "The nucleus stores genetic information in the form of DNA, controlling cell activities.",
        bn: "নিউক্লিয়াস ডিএনএ আকারে জিনগত তথ্য সংরক্ষণ করে, কোষের ক্রিয়াকলাপ নিয়ন্ত্রণ করে।"
      }
    },
    {
      question: {
        en: "Which organelle produces energy?",
        bn: "কোন অর্গানেল শক্তি উৎপন্ন করে?"
      },
      options: [
        { en: "Nucleus", bn: "নিউক্লিয়াস" },
        { en: "Ribosome", bn: "রাইবোসোম" },
        { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" },
        { en: "Golgi apparatus", bn: "গলজি যন্ত্র" }
      ],
      answer: 2,
      explanation: {
        en: "Mitochondria produce energy through cellular respiration, generating ATP.",
        bn: "মাইটোকন্ড্রিয়া কোষীয় শ্বসনের মাধ্যমে শক্তি উৎপন্ন করে, এটিপি তৈরি করে।"
      }
    },
    {
      question: {
        en: "What is the role of the cell membrane?",
        bn: "কোষ ঝিল্লির ভূমিকা কী?"
      },
      options: [
        { en: "Protein synthesis", bn: "প্রোটিন সংশ্লেষণ" },
        { en: "Regulating transport", bn: "পরিবহন নিয়ন্ত্রণ" },
        { en: "DNA replication", bn: "ডিএনএ প্রতিলিপি" },
        { en: "Energy storage", bn: "শক্তি সঞ্চয়" }
      ],
      answer: 1,
      explanation: {
        en: "The cell membrane regulates the transport of substances in and out of the cell.",
        bn: "কোষ ঝিল্লি কোষের ভিতরে এবং বাইরে পদার্থের পরিবহন নিয়ন্ত্রণ করে।"
      }
    },
    {
      question: {
        en: "Which organelle is found only in plant cells?",
        bn: "কোন অর্গানেল শুধুমাত্র উদ্ভিদ কোষে পাওয়া যায়?"
      },
      options: [
        { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" },
        { en: "Chloroplast", bn: "ক্লোরোপ্লাস্ট" },
        { en: "Ribosome", bn: "রাইবোসোম" },
        { en: "Nucleus", bn: "নিউক্লিয়াস" }
      ],
      answer: 1,
      explanation: {
        en: "Chloroplasts, found only in plant cells, conduct photosynthesis.",
        bn: "ক্লোরোপ্লাস্ট, শুধুমাত্র উদ্ভিদ কোষে পাওয়া যায়, আলোকসংশ্লেষণ পরিচালনা করে।"
      }
    }
  ]
}

export default function CellStructureQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            {quizData.title.en}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}