"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Biomolecules Quiz",
    bn: "জৈব অণু কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of biomolecules",
    bn: "জৈব অণু সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which biomolecule is the primary source of energy for cells?",
        bn: "কোন জৈব অণু কোষের জন্য শক্তির প্রাথমিক উৎস?"
      },
      options: [
        { en: "Proteins", bn: "প্রোটিন" },
        { en: "Carbohydrates", bn: "কার্বোহাইড্রেট" },
        { en: "Lipids", bn: "লিপিড" },
        { en: "Nucleic Acids", bn: "নিউক্লিক অ্যাসিড" }
      ],
      answer: 1,
      explanation: {
        en: "Carbohydrates, such as glucose, are the primary energy source for cells through processes like glycolysis.",
        bn: "কার্বোহাইড্রেট, যেমন গ্লুকোজ, গ্লাইকোলাইসিসের মতো প্রক্রিয়ার মাধ্যমে কোষের জন্য শক্তির প্রাথমিক উৎস।"
      }
    },
    {
      question: {
        en: "What is the main function of proteins?",
        bn: "প্রোটিনের প্রধান কাজ কী?"
      },
      options: [
        { en: "Energy storage", bn: "শক্তি সঞ্চয়" },
        { en: "Genetic information", bn: "জিনগত তথ্য" },
        { en: "Catalyzing reactions", bn: "প্রতিক্রিয়া ত্বরান্বিত করা" },
        { en: "Cell membrane formation", bn: "কোষ ঝিল্লি গঠন" }
      ],
      answer: 2,
      explanation: {
        en: "Proteins, as enzymes, primarily catalyze biochemical reactions, speeding up metabolic processes.",
        bn: "প্রোটিন, এনজাইম হিসেবে, প্রাথমিকভাবে জৈব রাসায়নিক প্রতিক্রিয়া ত্বরান্বিত করে, বিপাক প্রক্রিয়া দ্রুত করে।"
      }
    },
    {
      question: {
        en: "Which biomolecule forms cell membranes?",
        bn: "কোন জৈব অণু কোষ ঝিল্লি গঠন করে?"
      },
      options: [
        { en: "Carbohydrates", bn: "কার্বোহাইড্রেট" },
        { en: "Lipids", bn: "লিপিড" },
        { en: "Nucleic Acids", bn: "নিউক্লিক অ্যাসিড" },
        { en: "Proteins", bn: "প্রোটিন" }
      ],
      answer: 1,
      explanation: {
        en: "Lipids, particularly phospholipids, form the bilayer structure of cell membranes.",
        bn: "লিপিড, বিশেষ করে ফসফোলিপিড, কোষ ঝিল্লির ডাবল লেয়ার গঠন করে।"
      }
    },
    {
      question: {
        en: "Which biomolecule stores genetic information?",
        bn: "কোন জৈব অণু জিনগত তথ্য সংরক্ষণ করে?"
      },
      options: [
        { en: "Carbohydrates", bn: "কার্বোহাইড্রেট" },
        { en: "Proteins", bn: "প্রোটিন" },
        { en: "Nucleic Acids", bn: "নিউক্লিক অ্যাসিড" },
        { en: "Lipids", bn: "লিপিড" }
      ],
      answer: 2,
      explanation: {
        en: "Nucleic acids, like DNA and RNA, store and transmit genetic information.",
        bn: "নিউক্লিক অ্যাসিড, যেমন ডিএনএ এবং আরএনএ, জিনগত তথ্য সংরক্ষণ এবং স্থানান্তর করে।"
      }
    },
    {
      question: {
        en: "What is a common example of a carbohydrate?",
        bn: "কার্বোহাইড্রেটের একটি সাধারণ উদাহরণ কী?"
      },
      options: [
        { en: "Glucose", bn: "গ্লুকোজ" },
        { en: "Hemoglobin", bn: "হিমোগ্লোবিন" },
        { en: "Cholesterol", bn: "কোলেস্টেরল" },
        { en: "DNA", bn: "ডিএনএ" }
      ],
      answer: 0,
      explanation: {
        en: "Glucose is a simple sugar and a common carbohydrate used for energy.",
        bn: "গ্লুকোজ একটি সরল শর্করা এবং শক্তির জন্য ব্যবহৃত একটি সাধারণ কার্বোহাইড্রেট।"
      }
    }
  ]
}

export default function BiomoleculesQuiz() {
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