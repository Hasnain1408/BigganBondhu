"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Photosynthesis Quiz",
    bn: "আলোকসংশ্লেষণ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of photosynthesis",
    bn: "আলোকসংশ্লেষণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary source of energy for photosynthesis?",
        bn: "আলোকসংশ্লেষণের জন্য শক্তির প্রাথমিক উৎস কী?"
      },
      options: [
        { en: "Glucose", bn: "গ্লুকোজ" },
        { en: "Sunlight", bn: "সূর্যালোক" },
        { en: "Oxygen", bn: "অক্সিজেন" },
        { en: "Carbon Dioxide", bn: "কার্বন ডাই অক্সাইড" }
      ],
      answer: 1,
      explanation: {
        en: "Sunlight provides the energy needed for photosynthesis, absorbed by chlorophyll.",
        bn: "সূর্যালোক আলোকসংশ্লেষণের জন্য প্রয়োজনীয় শক্তি সরবরাহ করে, ক্লোরোফিল দ্বারা শোষিত।"
      }
    },
    {
      question: {
        en: "Which molecule absorbs light in photosynthesis?",
        bn: "আলোকসংশ্লেষণে কোন অণু আলো শোষণ করে?"
      },
      options: [
        { en: "Glucose", bn: "গ্লুকোজ" },
        { en: "Chlorophyll", bn: "ক্লোরোফিল" },
        { en: "Water", bn: "পানি" },
        { en: "NADPH", bn: "এনএডিপিএইচ" }
      ],
      answer: 1,
      explanation: {
        en: "Chlorophyll, a pigment in chloroplasts, absorbs light energy for photosynthesis.",
        bn: "ক্লোরোফিল, ক্লোরোপ্লাস্টের একটি রঙ্গক, আলোকসংশ্লেষণের জন্য আলো শক্তি শোষণ করে।"
      }
    },
    {
      question: {
        en: "What is a product of the light-dependent reactions?",
        bn: "আলোক নির্ভর প্রতিক্রিয়ার একটি ফলাফল কী?"
      },
      options: [
        { en: "Glucose", bn: "গ্লুকোজ" },
        { en: "Carbon Dioxide", bn: "কার্বন ডাই অক্সাইড" },
        { en: "ATP", bn: "এটিপি" },
        { en: "Water", bn: "পানি" }
      ],
      answer: 2,
      explanation: {
        en: "Light-dependent reactions produce ATP and NADPH, used in the Calvin cycle.",
        bn: "আলোক নির্ভর প্রতিক্রিয়া এটিপি এবং এনএডিপিএইচ উৎপন্ন করে, যা ক্যালভিন চক্রে ব্যবহৃত হয়।"
      }
    },
    {
      question: {
        en: "Where does the Calvin cycle occur?",
        bn: "ক্যালভিন চক্র কোথায় ঘটে?"
      },
      options: [
        { en: "Thylakoid membrane", bn: "থাইলাকয়েড ঝিল্লি" },
        { en: "Stroma", bn: "স্ট্রোমা" },
        { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" },
        { en: "Cytoplasm", bn: "সাইটোপ্লাজম" }
      ],
      answer: 1,
      explanation: {
        en: "The Calvin cycle, or light-independent reactions, occurs in the stroma of chloroplasts.",
        bn: "ক্যালভিন চক্র, বা আলোক স্বাধীন প্রতিক্রিয়া, ক্লোরোপ্লাস্টের স্ট্রোমায় ঘটে।"
      }
    },
    {
      question: {
        en: "What gas is released during photosynthesis?",
        bn: "আলোকসংশ্লেষণের সময় কোন গ্যাস নির্গত হয়?"
      },
      options: [
        { en: "Carbon Dioxide", bn: "কার্বন ডাই অক্সাইড" },
        { en: "Nitrogen", bn: "নাইট্রোজেন" },
        { en: "Oxygen", bn: "অক্সিজেন" },
        { en: "Hydrogen", bn: "হাইড্রোজেন" }
      ],
      answer: 2,
      explanation: {
        en: "Oxygen is released as a byproduct of photosynthesis when water is split.",
        bn: "পানি বিভক্ত হলে আলোকসংশ্লেষণের উপজাত হিসেবে অক্সিজেন নির্গত হয়।"
      }
    }
  ]
}



export default function PhotosynthesisQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-lg text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-semibold">
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
