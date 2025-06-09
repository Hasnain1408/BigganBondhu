
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Green Chemistry Quiz",
    bn: "সবুজ রসায়ন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Green Chemistry",
    bn: "সবুজ রসায়ন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the main goal of Green Chemistry?",
        bn: "সবুজ রসায়নের মূল লক্ষ্য কী?"
      },
      options: [
        { en: "Increase reaction speed", bn: "বিক্রিয়ার গতি বাড়ানো" },
        { en: "Reduce environmental impact", bn: "পরিবেশের প্রভাব কমানো" },
        { en: "Maximize energy use", bn: "শক্তি ব্যবহার সর্বাধিক করা" },
        { en: "Enhance product color", bn: "পণ্যের রং উন্নত করা" }
      ],
      answer: 1,
      explanation: {
        en: "Green Chemistry aims to reduce environmental impact through sustainable processes.",
        bn: "সবুজ রসায়ন স্থায়ী প্রক্রিয়ার মাধ্যমে পরিবেশের প্রভাব কমানোর লক্ষ্য রাখে।"
      }
    },
    {
      question: {
        en: "Which is a principle of Green Chemistry?",
        bn: "সবুজ রসায়নের কোনটি একটি নীতি?"
      },
      options: [
        { en: "Increase waste production", bn: "বর্জ্য উৎপাদন বাড়ানো" },
        { en: "Use safer chemicals", bn: "নিরাপদ রাসায়নিক ব্যবহার" },
        { en: "Maximize toxic byproducts", bn: "বিষাক্ত উপজাত সর্বাধিক করা" },
        { en: "Ignore energy efficiency", bn: "শক্তি দক্ষতা উপেক্ষা করা" }
      ],
      answer: 1,
      explanation: {
        en: "Using safer chemicals is one of the 12 principles of Green Chemistry.",
        bn: "নিরাপদ রাসায়নিক ব্যবহার সবুজ রসায়নের ১২টি নীতির একটি।"
      }
    },
    {
      question: {
        en: "What is an example of a Green Chemistry practice?",
        bn: "সবুজ রসায়নের একটি অনুশীলনের উদাহরণ কী?"
      },
      options: [
        { en: "Using fossil fuels", bn: "জীবাশ্ম জ্বালানি ব্যবহার" },
        { en: "Bio-based solvents", bn: "জৈব দ্রাবক ব্যবহার" },
        { en: "Increasing waste", bn: "বর্জ্য বাড়ানো" },
        { en: "High-energy processes", bn: "উচ্চ-শক্তি প্রক্রিয়া" }
      ],
      answer: 1,
      explanation: {
        en: "Bio-based solvents are eco-friendly and align with Green Chemistry principles.",
        bn: "জৈব দ্রাবক পরিবেশ-বান্ধব এবং সবুজ রসায়নের নীতির সাথে সামঞ্জস্যপূর্ণ।"
      }
    },
    {
      question: {
        en: "Where is Green Chemistry applied?",
        bn: "সবুজ রসায়ন কোথায় প্রয়োগ করা হয়?"
      },
      options: [
        { en: "Pharmaceuticals", bn: "ফার্মাসিউটিক্যাল" },
        { en: "Sound engineering", bn: "শব্দ প্রকৌশল" },
        { en: "Mechanical design", bn: "যান্ত্রিক ডিজাইন" },
        { en: "Electrical circuits", bn: "বৈদ্যুতিক সার্কিট" }
      ],
      answer: 0,
      explanation: {
        en: "Green Chemistry is applied in pharmaceuticals to develop safer drugs.",
        bn: "সবুজ রসায়ন ফার্মাসিউটিক্যালে নিরাপদ ওষুধ তৈরির জন্য প্রয়োগ করা হয়।"
      }
    },
    {
      question: {
        en: "What does atom economy refer to in Green Chemistry?",
        bn: "সবুজ রসায়নে পরমাণু দক্ষতা কী বোঝায়?"
      },
      options: [
        { en: "Maximizing waste", bn: "বর্জ্য সর্বাধিক করা" },
        { en: "Maximizing material use", bn: "উপকরণ ব্যবহার সর্বাধিক করা" },
        { en: "Increasing energy", bn: "শক্তি বাড়ানো" },
        { en: "Reducing reaction speed", bn: "বিক্রিয়ার গতি কমানো" }
      ],
      answer: 1,
      explanation: {
        en: "Atom economy refers to maximizing the incorporation of materials into the final product.",
        bn: "পরমাণু দক্ষতা বলতে চূড়ান্ত পণ্যে উপকরণের সর্বাধিক অন্তর্ভুক্তি বোঝায়।"
      }
    }
  ]
}

export default function GreenChemistryQuiz() {
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
