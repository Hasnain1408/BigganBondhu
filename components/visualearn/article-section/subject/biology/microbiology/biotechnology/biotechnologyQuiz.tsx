"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Biotechnology Quiz",
    bn: "জৈবপ্রযুক্তি কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of biotechnology",
    bn: "জৈবপ্রযুক্তি সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is a common tool used for gene editing?",
        bn: "জিন সম্পাদনার জন্য একটি সাধারণ সরঞ্জাম কী?"
      },
      options: [
        { en: "PCR", bn: "পিসিআর" },
        { en: "CRISPR", bn: "ক্রিসপার" },
        { en: "Gel Electrophoresis", bn: "জেল ইলেক্ট্রোফোরেসিস" },
        { en: "Microarray", bn: "মাইক্রোঅ্যারে" }
      ],
      answer: 1,
      explanation: {
        en: "CRISPR is a precise tool for gene editing, allowing targeted modifications to DNA.",
        bn: "ক্রিসপার জিন সম্পাদনার জন্য একটি নির্ভুল সরঞ্জাম, যা ডিএনএ-তে নির্দিষ্ট পরিবর্তনের অনুমতি দেয়।"
      }
    },
    {
      question: {
        en: "What is the primary purpose of tissue culture in biotechnology?",
        bn: "জৈবপ্রযুক্তিতে টিস্যু কালচারের প্রাথমিক উদ্দেশ্য কী?"
      },
      options: [
        { en: "Produce antibiotics", bn: "অ্যান্টিবায়োটিক উৎপাদন" },
        { en: "Grow cells or tissues in a lab", bn: "ল্যাবে কোষ বা টিস্যু বৃদ্ধি" },
        { en: "Edit genes", bn: "জিন সম্পাদনা" },
        { en: "Create biofuels", bn: "জৈব জ্বালানি তৈরি" }
      ],
      answer: 1,
      explanation: {
        en: "Tissue culture involves growing cells or tissues in a controlled lab environment, often for plant propagation or research.",
        bn: "টিস্যু কালচার নিয়ন্ত্রিত ল্যাব পরিবেশে কোষ বা টিস্যু বৃদ্ধি করে, প্রায়শই উদ্ভিদ প্রজনন বা গবেষণার জন্য।"
      }
    },
    {
      question: {
        en: "What is recombinant DNA technology used for?",
        bn: "রিকম্বিন্যান্ট ডিএনএ প্রযুক্তি কিসের জন্য ব্যবহৃত হয়?"
      },
      options: [
        { en: "Combining DNA from different sources", bn: "বিভিন্ন উৎস থেকে ডিএনএ সংযোজন" },
        { en: "Sequencing entire genomes", bn: "সম্পূর্ণ জিনোম সিকোয়েন্সিং" },
        { en: "Cloning animals", bn: "প্রাণী ক্লোনিং" },
        { en: "Diagnosing diseases", bn: "রোগ নির্ণয়" }
      ],
      answer: 0,
      explanation: {
        en: "Recombinant DNA technology combines DNA from different sources to create new genetic combinations, such as for producing insulin.",
        bn: "রিকম্বিন্যান্ট ডিএনএ প্রযুক্তি বিভিন্ন উৎস থেকে ডিএনএ সংযোজন করে নতুন জিনগত সমন্বয় তৈরি করে, যেমন ইনসুলিন উৎপাদনের জন্য।"
      }
    },
    {
      question: {
        en: "Which is a key application of biotechnology in agriculture?",
        bn: "কৃষিতে জৈবপ্রযুক্তির একটি মূল প্রয়োগ কী?"
      },
      options: [
        { en: "Producing vaccines", bn: "ভ্যাকসিন উৎপাদন" },
        { en: "Genetically modified crops", bn: "জিনগতভাবে পরিবর্তিত ফসল" },
        { en: "Creating antibiotics", bn: "অ্যান্টিবায়োটিক তৈরি" },
        { en: "Developing biofuels", bn: "জৈব জ্বালানি উন্নয়ন" }
      ],
      answer: 1,
      explanation: {
        en: "Biotechnology in agriculture produces genetically modified crops to enhance yield, pest resistance, or nutritional value.",
        bn: "কৃষিতে জৈবপ্রযুক্তি জিনগতভাবে পরিবর্তিত ফসল উৎপাদন করে ফলন, কীট প্রতিরোধ বা পুষ্টিমান বাড়াতে।"
      }
    },
    {
      question: {
        en: "What is a major ethical concern in biotechnology?",
        bn: "জৈবপ্রযুক্তিতে একটি প্রধান নৈতিক উদ্বেগ কী?"
      },
      options: [
        { en: "Improved crop yield", bn: "উন্নত ফসল ফলন" },
        { en: "Gene editing in humans", bn: "মানুষের জিন সম্পাদনা" },
        { en: "Vaccine production", bn: "ভ্যাকসিন উৎপাদন" },
        { en: "Tissue culture", bn: "টিস্যু কালচার" }
      ],
      answer: 1,
      explanation: {
        en: "Gene editing in humans raises ethical concerns about unintended consequences and societal impacts.",
        bn: "মানুষের জিন সম্পাদনা অপ্রত্যাশিত পরিণতি এবং সামাজিক প্রভাব নিয়ে নৈতিক উদ্বেগ সৃষ্টি করে।"
      }
    }
  ]
}

export default function BiotechnologyQuiz() {
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