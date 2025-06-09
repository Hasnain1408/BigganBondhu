
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Polymers Quiz",
    bn: "পলিমার কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of polymers",
    bn: "পলিমার সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is a polymer?",
        bn: "পলিমার কী?"
      },
      options: [
        { en: "A small molecule", bn: "ছোট অণু" },
        { en: "A repeating chain of monomers", bn: "মনোমারের পুনরাবৃত্তি শিকল" },
        { en: "A single atom", bn: "একক পরমাণু" },
        { en: "A type of gas", bn: "গ্যাসের প্রকার" }
      ],
      answer: 1,
      explanation: {
        en: "A polymer is a large molecule made of repeating monomer units.",
        bn: "পলিমার হল মনোমার ইউনিটের পুনরাবৃত্তি দিয়ে তৈরি বড় অণু।"
      }
    },
    {
      question: {
        en: "Which is an example of a natural polymer?",
        bn: "প্রাকৃতিক পলিমারের উদাহরণ কোনটি?"
      },
      options: [
        { en: "Polyethylene", bn: "পলিইথিলিন" },
        { en: "Cellulose", bn: "সেলুলোজ" },
        { en: "Nylon", bn: "নাইলন" },
        { en: "PVC", bn: "PVC" }
      ],
      answer: 1,
      explanation: {
        en: "Cellulose is a natural polymer, found in plant cell walls.",
        bn: "সেলুলোজ একটি প্রাকৃতিক পলিমার, উদ্ভিদ কোষের দেয়ালে পাওয়া যায়।"
      }
    },
    {
      question: {
        en: "What process links monomers to form polymers?",
        bn: "কোন প্রক্রিয়ায় মনোমার সংযোগ করে পলিমার তৈরি হয়?"
      },
      options: [
        { en: "Combustion", bn: "দহন" },
        { en: "Polymerization", bn: "পলিমারাইজেশন" },
        { en: "Evaporation", bn: "বাষ্পীভবন" },
        { en: "Oxidation", bn: "অক্সিডেশন" }
      ],
      answer: 1,
      explanation: {
        en: "Polymerization is the process of linking monomers to form polymers.",
        bn: "পলিমারাইজেশন হল মনোমার সংযোগ করে পলিমার তৈরির প্রক্রিয়া।"
      }
    },
    {
      question: {
        en: "Which polymer is commonly used in plastic bags?",
        bn: "কোন পলিমার প্লাস্টিক ব্যাগে সাধারণত ব্যবহৃত হয়?"
      },
      options: [
        { en: "Polystyrene", bn: "পলিস্টাইরিন" },
        { en: "Polyethylene", bn: "পলিইথিলিন" },
        { en: "Polyester", bn: "পলিস্টার" },
        { en: "Nylon", bn: "নাইলন" }
      ],
      answer: 1,
      explanation: {
        en: "Polyethylene is widely used in plastic bags due to its flexibility and strength.",
        bn: "পলিইথিলিন নমনীয়তা এবং শক্তির কারণে প্লাস্টিক ব্যাগে ব্যবহৃত হয়।"
      }
    },
    {
      question: {
        en: "What is a characteristic of condensation polymerization?",
        bn: "ঘনীভবন পলিমারাইজেশনের বৈশিষ্ট্য কী?"
      },
      options: [
        { en: "Breaks double bonds", bn: "ডাবল বন্ড ভাঙে" },
        { en: "Releases small molecules", bn: "ছোট অণু নির্গত হয়" },
        { en: "Increases temperature", bn: "তাপমাত্রা বাড়ায়" },
        { en: "Requires catalysts only", bn: "শুধুমাত্র অনুঘটক প্রয়োজন" }
      ],
      answer: 1,
      explanation: {
        en: "Condensation polymerization releases small molecules, like water, as byproducts.",
        bn: "ঘনীভবন পলিমারাইজেশন জলের মতো ছোট অণু নির্গত করে।"
      }
    }
  ]
}

export default function PolymersQuiz() {
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
