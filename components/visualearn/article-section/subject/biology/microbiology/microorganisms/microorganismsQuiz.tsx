"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Microorganisms Quiz",
    bn: "জীবাণু কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of microorganisms",
    bn: "জীবাণু সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which type of microorganism is prokaryotic?",
        bn: "কোন ধরনের জীবাণু প্রোক্যারিওটিক?"
      },
      options: [
        { en: "Viruses", bn: "ভাইরাস" },
        { en: "Bacteria", bn: "ব্যাকটেরিয়া" },
        { en: "Fungi", bn: "ছত্রাক" },
        { en: "Protozoa", bn: "প্রোটোজোয়া" }
      ],
      answer: 1,
      explanation: {
        en: "Bacteria are prokaryotic, lacking a true nucleus, while fungi and protozoa are eukaryotic. Viruses are not considered living organisms.",
        bn: "ব্যাকটেরিয়া প্রোক্যারিওটিক, যার সত্যিকারের নিউক্লিয়াস নেই। ছত্রাক এবং প্রোটোজোয়া ইউক্যারিওটিক। ভাইরাস জীবন্ত জীব হিসেবে বিবেচিত হয় না।"
      }
    },
    {
      question: {
        en: "What is a key beneficial role of microorganisms in the environment?",
        bn: "পরিবেশে জীবাণুর একটি মূল উপকারী ভূমিকা কী?"
      },
      options: [
        { en: "Causing diseases", bn: "রোগ সৃষ্টি" },
        { en: "Nutrient cycling", bn: "পুষ্টি চক্র" },
        { en: "Food spoilage", bn: "খাদ্য নষ্ট" },
        { en: "Infecting crops", bn: "ফসল সংক্রমণ" }
      ],
      answer: 1,
      explanation: {
        en: "Microorganisms like bacteria and fungi aid in nutrient cycling by decomposing organic matter, recycling nutrients in ecosystems.",
        bn: "ব্যাকটেরিয়া এবং ছত্রাকের মতো জীবাণু জৈব পদার্থ পচনের মাধ্যমে পুষ্টি চক্রে সহায়তা করে।"
      }
    },
    {
      question: {
        en: "Which microorganism requires a host cell to replicate?",
        bn: "কোন জীবাণুর প্রতিলিপি তৈরির জন্য হোস্ট কোষ প্রয়োজন?"
      },
      options: [
        { en: "Bacteria", bn: "ব্যাকটেরিয়া" },
        { en: "Fungi", bn: "ছত্রাক" },
        { en: "Viruses", bn: "ভাইরাস" },
        { en: "Algae", bn: "শৈবাল" }
      ],
      answer: 2,
      explanation: {
        en: "Viruses are non-living outside host cells and require a host to replicate their genetic material.",
        bn: "ভাইরাস হোস্ট কোষের বাইরে অ-জীবন্ত এবং তাদের জিনগত উপাদান প্রতিলিপির জন্য হোস্ট প্রয়োজন।"
      }
    },
    {
      question: {
        en: "What is a common industrial use of microorganisms?",
        bn: "জীবাণুর একটি সাধারণ শিল্প ব্যবহার কী?"
      },
      options: [
        { en: "Causing infections", bn: "সংক্রমণ সৃষ্টি" },
        { en: "Producing antibiotics", bn: "অ্যান্টিবায়োটিক উৎপাদন" },
        { en: "Spoiling food", bn: "খাদ্য নষ্ট করা" },
        { en: "Reducing soil fertility", bn: "মাটির উর্বরতা হ্রাস" }
      ],
      answer: 1,
      explanation: {
        en: "Microorganisms like bacteria and fungi are used to produce antibiotics, such as penicillin, in industry.",
        bn: "ব্যাকটেরিয়া এবং ছত্রাকের মতো জীবাণু শিল্পে অ্যান্টিবায়োটিক, যেমন পেনিসিলিন, উৎপাদনের জন্য ব্যবহৃত হয়।"
      }
    },
    {
      question: {
        en: "Which microorganism is primarily responsible for food spoilage?",
        bn: "কোন জীবাণু প্রাথমিকভাবে খাদ্য নষ্টের জন্য দায়ী?"
      },
      options: [
        { en: "Algae", bn: "শৈবাল" },
        { en: "Protozoa", bn: "প্রোটোজোয়া" },
        { en: "Fungi", bn: "ছত্রাক" },
        { en: "Viruses", bn: "ভাইরাস" }
      ],
      answer: 2,
      explanation: {
        en: "Fungi, along with some bacteria, are primarily responsible for food spoilage due to their ability to break down organic matter.",
        bn: "ছত্রাক, কিছু ব্যাকটেরিয়ার সাথে, জৈব পদার্থ ভাঙার ক্ষমতার কারণে খাদ্য নষ্টের জন্য প্রাথমিকভাবে দায়ী।"
      }
    }
  ]
}

export default function MicroorganismsQuiz() {
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