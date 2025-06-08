"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Enzymes Quiz",
    bn: "এনজাইম কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of enzymes",
    bn: "এনজাইম সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary function of enzymes?",
        bn: "এনজাইমের প্রাথমিক কাজ কী?"
      },
      options: [
        { en: "Store energy", bn: "শক্তি সঞ্চয়" },
        { en: "Speed up reactions", bn: "প্রতিক্রিয়া ত্বরান্বিত" },
        { en: "Transport nutrients", bn: "পুষ্টি পরিবহন" },
        { en: "Synthesize DNA", bn: "ডিএনএ সংশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "Enzymes act as biological catalysts, speeding up chemical reactions by lowering activation energy.",
        bn: "এনজাইম জৈবিক প্রভাবক হিসেবে কাজ করে, সক্রিয়করণ শক্তি কমিয়ে রাসায়নিক প্রতিক্রিয়ার গতি বাড়ায়।"
      }
    },
    {
      question: {
        en: "Which type of molecule are most enzymes?",
        bn: "অধিকাংশ এনজাইম কোন ধরণের অণু?"
      },
      options: [
        { en: "Carbohydrate", bn: "কার্বোহাইড্রেট" },
        { en: "Lipid", bn: "লিপিড" },
        { en: "Protein", bn: "প্রোটিন" },
        { en: "Nucleic acid", bn: "নিউক্লিক অ্যাসিড" }
      ],
      answer: 2,
      explanation: {
        en: "Most enzymes are proteins, though some RNA molecules (ribozymes) can also act as enzymes.",
        bn: "অধিকাংশ এনজাইম প্রোটিন, যদিও কিছু আরএনএ অণু (রাইবোজাইম) এনজাইম হিসেবে কাজ করতে পারে।"
      }
    },
    {
      question: {
        en: "What term describes an enzyme's specificity for a substrate?",
        bn: "এনজাইমের সাবস্ট্রেটের জন্য নির্দিষ্টতাকে কী বলা হয়?"
      },
      options: [
        { en: "Denaturation", bn: "বিকৃতকরণ" },
        { en: "Active site", bn: "সক্রিয় স্থান" },
        { en: "Lock and key", bn: "তালা এবং চাবি" },
        { en: "Cofactor", bn: "কো-ফ্যাক্টর" }
      ],
      answer: 2,
      explanation: {
        en: "The 'lock and key' model describes how enzymes are specific to their substrates, fitting like a key in a lock.",
        bn: "‘তালা এবং চাবি’ মডেল বর্ণনা করে কীভাবে এনজাইম তাদের সাবস্ট্রেটের জন্য নির্দিষ্ট, তালায় চাবির মতো ফিট করে।"
      }
    },
    {
      question: {
        en: "What can cause an enzyme to lose its function?",
        bn: "কী কারণে এনজাইম তার কার্যকারিতা হারাতে পারে?"
      },
      options: [
        { en: "Optimal pH", bn: "অনুকূল pH" },
        { en: "High temperature", bn: "উচ্চ তাপমাত্রা" },
        { en: "Substrate binding", bn: "সাবস্ট্রেট বাঁধন" },
        { en: "Catalyst reuse", bn: "প্রভাবক পুনঃব্যবহার" }
      ],
      answer: 1,
      explanation: {
        en: "High temperatures can denature enzymes, altering their shape and causing loss of function.",
        bn: "উচ্চ তাপমাত্রা এনজাইমকে বিকৃত করতে পারে, তাদের আকৃতি পরিবর্তন করে কার্যকারিতা হ্রাস করে।"
      }
    },
    {
      question: {
        en: "Which enzyme is commonly used in the digestive system?",
        bn: "হজমতন্ত্রে কোন এনজাইম সাধারণত ব্যবহৃত হয়?"
      },
      options: [
        { en: "Amylase", bn: "অ্যামাইলেস" },
        { en: "Polymerase", bn: "পলিমারেস" },
        { en: "Ligase", bn: "লাইগেস" },
        { en: "Helicase", bn: "হেলিকেস" }
      ],
      answer: 0,
      explanation: {
        en: "Amylase is a digestive enzyme that breaks down starches into sugars in the mouth and small intestine.",
        bn: "অ্যামাইলেস একটি হজমকারী এনজাইম যা মুখ এবং ক্ষুদ্রান্ত্রে স্টার্চকে শর্করায় ভেঙে দেয়।"
      }
    }
  ]
}

export default function EnzymesQuiz() {
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