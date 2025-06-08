"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Cell Division Quiz",
    bn: "কোষ বিভাজন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of cell division",
    bn: "কোষ বিভাজন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the process of cell division in somatic cells called?",
        bn: "সোমাটিক কোষে কোষ বিভাজনের প্রক্রিয়াকে কী বলা হয়?" },
      },
      options: [
        { en: "Meiosis", bn: "মিয়োসিস" },
        { en: "Mitosis", bn: "মাইটোসিস" },
        { en: "Binary fission", bn: "বাইনারি ফিশন" },
        { en: "Budding", bn: "বুডিং" }
      ],
      answer: 1,
      explanation: {
        en: "Mitosis is the process of cell division in somatic cells, producing two identical daughter cells.",
        bn: "মাইটোসিস হল সোমাটিক কোষে কোষ বিভাজনের প্রক্রিয়া, যা দুটি অভিন্ন কন্যা কোষ উৎপন্ন করে।"
      }
    },
    {
      question: {
        en: "Which phase of mitosis involves chromosome alignment at the cell’s equator?",
        bn: "মাইটোসিসের কোন পর্যায়ে ক্রোমোজোম কোষের বিষুবরেখায় সারিবদ্ধ হয়?" },
      },
      options: [
        { en: "Prophase", bn: "প্রোফেজ" },
        { en: "Metaphase", bn: "মেটাফেজ" },
        { en: "Anaphase", bn: "অ্যানাফেজ" },
        { en: "Telophase", bn: "টেলোফেজ" }
      ],
      answer: 1,
      explanation: {
        en: "During metaphase, chromosomes align at the cell’s equatorial plane before separation.",
        bn: "মেটাফেজে, ক্রোমোজোম কোষের বিষুবীয় সমতলে সারিবদ্ধ হয় বিচ্ছেদের আগে।"
      }
    },
    {
      question: {
        en: "What type of cell division produces gametes?",
        bn: "কোন ধরণের কোষ বিভাজন গ্যামেট উৎপন্ন করে?" },
      },
      options: [
        { en: "Mitosis", bn: "মাইটোসিস" },
        { en: "Meiosis", bn: "মিয়োসিস" },
        { en: "Cytokinesis", bn: "সাইটোকাইনেসিস" },
        { en: "Apoptosis", bn: "অ্যাপোপটোসিস" }
      ],
      answer: 1,
      explanation: {
        en: "Meiosis produces gametes (sperm and eggs) with half the chromosome number of the parent cell.",
        bn: "মিয়োসিস গ্যামেট (শুক্রাণু এবং ডিম্বাণু) উৎপন্ন করে, যার মূল কোষের অর্ধেক ক্রোমোজোম সংখ্যা থাকে।"
      }
    },
    {
      question: {
        en: "What is the final stage of cell division that divides the cytoplasm?",
        bn: "কোষ বিভাজনের চূড়ান্ত পর্যায় কী যা সাইটোপ্লাজম বিভক্ত করে?" },
      },
      options: [
        { en: "Anaphase", bn: "অ্যানাফেজ" },
        { en: "Telophase", bn: "টেলোফেজ" },
        { en: "Cytokinesis", bn: "সাইটোকাইনেসিস" },
        { en: "Prophase", bn: "প্রোফেজ" }
      ],
      answer: 2,
      explanation: {
        en: "Cytokinesis divides the cytoplasm, completing cell division after nuclear division.",
        bn: "সাইটোকাইনেসিস সাইটোপ্লাজম বিভক্ত করে, নিউক্লিয়ার বিভাজনের পর কোষ বিভাজন সম্পন্ন করে।"
      }
    },
    {
      question: {
        en: "What structure pulls chromosomes apart during anaphase?",
        bn: "অ্যানাফেজে কোন গঠন ক্রোমোজোমকে আলাদা করে?" },
      },
      options: [
        { en: "Centrioles", bn: "সেন্ট্রিওল" },
        { en: "Spindle fibers", bn: "স্পিন্ডল ফাইবার" },
        { en: "Nuclear envelope", bn: "নিউক্লিয়ার খাম" },
        { en: "Cell plate", bn: "কোষ প্লেট" }
      ],
      answer: 1,
      explanation: {
        en: "Spindle fibers pull chromosomes apart during anaphase to ensure proper segregation.",
        bn: "স্পিন্ডল ফাইবার অ্যানাফেজে ক্রোমোজোমকে আলাদা করে সঠিক বিভাজন নিশ্চিত করে।"
      }
    }
  ]
}

export default function CellDivisionQuiz() {
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