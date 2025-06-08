"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Plant Structure Quiz",
    bn: "উদ্ভিদ গঠন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of plant structure",
    bn: "উদ্ভিদ গঠন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which plant organ is primarily responsible for water absorption?",
        bn: "কোন উদ্ভিদ অঙ্গ প্রাথমিকভাবে পানি শোষণের জন্য দায়ী?"
      },
      options: [
        { en: "Leaf", bn: "পাতা" },
        { en: "Stem", bn: "কাণ্ড" },
        { en: "Root", bn: "মূল" },
        { en: "Flower", bn: "ফুল" }
      ],
      answer: 2,
      explanation: {
        en: "Roots absorb water and nutrients from the soil, anchoring the plant.",
        bn: "মূল মাটি থেকে পানি এবং পুষ্টি শোষণ করে, উদ্ভিদকে নোঙর করে।"
      }
    },
    {
      question: {
        en: "What is the primary function of leaves?",
        bn: "পাতার প্রাথমিক কাজ কী?"
      },
      options: [
        { en: "Transport", bn: "পরিবহন" },
        { en: "Photosynthesis", bn: "আলোকসংশ্লেষণ" },
        { en: "Support", bn: "সমর্থন" },
        { en: "Reproduction", bn: "প্রজনন" }
      ],
      answer: 1,
      explanation: {
        en: "Leaves are the primary site of photosynthesis, producing food for the plant.",
        bn: "পাতা আলোকসংশ্লেষণের প্রাথমিক স্থান, উদ্ভিদের জন্য খাদ্য উৎপন্ন করে।"
      }
    },
    {
      question: {
        en: "Which tissue is responsible for plant growth?",
        bn: "কোন টিস্যু উদ্ভিদের বৃদ্ধির জন্য দায়ী?"
      },
      options: [
        { en: "Vascular", bn: "ভাস্কুলার" },
        { en: "Meristem", bn: "মেরিস্টেম" },
        { en: "Dermal", bn: "ডার্মাল" },
        { en: "Ground", bn: "গ্রাউন্ড" }
      ],
      answer: 1,
      explanation: {
        en: "Meristem tissue contains actively dividing cells, driving plant growth.",
        bn: "মেরিস্টেম টিস্যুতে সক্রিয়ভাবে বিভাজনকারী কোষ থাকে, যা উদ্ভিদের বৃদ্ধি চালায়।"
      }
    },
    {
      question: {
        en: "Which vascular tissue transports water in plants?",
        bn: "কোন ভাস্কুলার টিস্যু উদ্ভিদে পানি পরিবহন করে?"
      },
      options: [
        { en: "Phloem", bn: "ফ্লোয়েম" },
        { en: "Xylem", bn: "জাইলেম" },
        { en: "Parenchyma", bn: "প্যারেনকাইমা" },
        { en: "Collenchyma", bn: "কলেনকাইমা" }
      ],
      answer: 1,
      explanation: {
        en: "Xylem transports water and minerals from roots to other parts of the plant.",
        bn: "জাইলেম মূল থেকে উদ্ভিদের অন্যান্য অংশে পানি এবং খনিজ পরিবহন করে।"
      }
    },
    {
      question: {
        en: "What is the role of the stem in a plant?",
        bn: "উদ্ভিদে কাণ্ডের ভূমিকা কী?"
      },
      options: [
        { en: "Photosynthesis", bn: "আলোকসংশ্লেষণ" },
        { en: "Absorption", bn: "শোষণ" },
        { en: "Support and transport", bn: "সমর্থন এবং পরিবহন" },
        { en: "Seed production", bn: "বীজ উৎপাদন" }
      ],
      answer: 2,
      explanation: {
        en: "The stem supports the plant and transports water, nutrients, and sugars.",
        bn: "কাণ্ড উদ্ভিদকে সমর্থন করে এবং পানি, পুষ্টি এবং শর্করা পরিবহন করে।"
      }
    }
  ]
}

export default function PlantStructureQuiz() {
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