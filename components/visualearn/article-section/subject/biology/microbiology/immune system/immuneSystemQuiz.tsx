"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Immune System Quiz",
    bn: "ইমিউন সিস্টেম কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the immune system",
    bn: "ইমিউন সিস্টেম সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which type of immunity provides immediate, non-specific defense?",
        bn: "কোন ধরনের ইমিউনিটি তাৎক্ষণিক, অ-নির্দিষ্ট প্রতিরক্ষা প্রদান করে?"
      },
      options: [
        { en: "Adaptive immunity", bn: "অভিযোজিত ইমিউনিটি" },
        { en: "Innate immunity", bn: "সহজাত ইমিউনিটি" },
        { en: "Passive immunity", bn: "প্যাসিভ ইমিউনিটি" },
        { en: "Acquired immunity", bn: "অর্জিত ইমিউনিটি" }
      ],
      answer: 1,
      explanation: {
        en: "Innate immunity provides immediate, non-specific defense against pathogens using barriers and phagocytes.",
        bn: "সহজাত ইমিউনিটি বাধা এবং ফাগোসাইট ব্যবহার করে প্যাথোজেনের বিরুদ্ধে তাৎক্ষণিক, অ-নির্দিষ্ট প্রতিরক্ষা প্রদান করে।"
      }
    },
    {
      question: {
        en: "What is the primary function of antibodies?",
        bn: "অ্যান্টিবডির প্রাথমিক কাজ কী?"
      },
      options: [
        { en: "Produce pathogens", bn: "প্যাথোজেন উৎপাদন" },
        { en: "Neutralize pathogens", bn: "প্যাথোজেন নিষ্ক্রিয় করা" },
        { en: "Digest nutrients", bn: "পুষ্টি হজম করা" },
        { en: "Transport oxygen", bn: "অক্সিজেন পরিবহন" }
      ],
      answer: 1,
      explanation: {
        en: "Antibodies neutralize pathogens by binding to them, marking them for destruction by immune cells.",
        bn: "অ্যান্টিবডি প্যাথোজেনের সাথে বাঁধনের মাধ্যমে তাদের নিষ্ক্রিয় করে, ইমিউন কোষ দ্বারা ধ্বংসের জন্য চিহ্নিত করে।"
      }
    },
    {
      question: {
        en: "Which cells are responsible for immunological memory?",
        bn: "কোন কোষগুলি ইমিউনোলজিকাল মেমরির জন্য দায়ী?"
      },
      options: [
        { en: "Red blood cells", bn: "লোহিত রক্তকণিকা" },
        { en: "Memory cells", bn: "মেমরি কোষ" },
        { en: "Platelets", bn: "প্লেটলেট" },
        { en: "Phagocytes", bn: "ফাগোসাইট" }
      ],
      answer: 1,
      explanation: {
        en: "Memory cells, part of adaptive immunity, enable faster responses to previously encountered pathogens.",
        bn: "মেমরি কোষ, অভিযোজিত ইমিউনিটির অংশ, পূর্বে সম্মুখীন প্যাথোজেনের বিরুদ্ধে দ্রুত প্রতিক্রিয়া সক্ষম করে।"
      }
    },
    {
      question: {
        en: "What is a key component of the innate immune system?",
        bn: "সহজাত ইমিউন সিস্টেমের একটি মূল উপাদান কী?"
      },
      options: [
        { en: "Antibodies", bn: "অ্যান্টিবডি" },
        { en: "Phagocytes", bn: "ফাগোসাইট" },
        { en: "Memory cells", bn: "মেমরি কোষ" },
        { en: "T-cells", bn: "টি-কোষ" }
      ],
      answer: 1,
      explanation: {
        en: "Phagocytes, such as macrophages, engulf and destroy pathogens in the innate immune response.",
        bn: "ফাগোসাইট, যেমন ম্যাক্রোফেজ, সহজাত ইমিউন প্রতিক্রিয়ায় প্যাথোজেন গ্রাস করে এবং ধ্বংস করে।"
      }
    },
    {
      question: {
        en: "How do vaccines enhance the immune system?",
        bn: "ভ্যাকসিন কীভাবে ইমিউন সিস্টেমকে উন্নত করে?"
      },
      options: [
        { en: "By producing pathogens", bn: "প্যাথোজেন উৎপাদন করে" },
        { en: "By creating memory cells", bn: "মেমরি কোষ তৈরি করে" },
        { en: "By reducing white blood cells", bn: "শ্বেত রক্তকণিকা হ্রাস করে" },
        { en: "By blocking lymph nodes", bn: "লিম্ফ নোড বাধা দিয়ে" }
      ],
      answer: 1,
      explanation: {
        en: "Vaccines stimulate the adaptive immune system to produce memory cells, enabling faster responses to future infections.",
        bn: "ভ্যাকসিন অভিযোজিত ইমিউন সিস্টেমকে উদ্দীপিত করে মেমরি কোষ তৈরি করে, ভবিষ্যৎ সংক্রমণের বিরুদ্ধে দ্রুত প্রতিক্রিয়া সক্ষম করে।"
      }
    }
  ]
}

export default function ImmuneSystemQuiz() {
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