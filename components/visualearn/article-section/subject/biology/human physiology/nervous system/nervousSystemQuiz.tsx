"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Nervous System Quiz",
    bn: "স্নায়ুতন্ত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the nervous system",
    bn: "স্নায়ুতন্ত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the main control center of the nervous system?",
        bn: "স্নায়ুতন্ত্রের প্রধান নিয়ন্ত্রণ কেন্দ্র কী?",
      },
      options: [
        { en: "Heart", bn: "হৃদয়" },
        { en: "Brain", bn: "মস্তিষ্ক" },
        { en: "Liver", bn: "যকৃত" },
        { en: "Lungs", bn: "ফুসফুস" }
      ],
      answer: 1,
      explanation: {
        en: "The brain is the main control center, coordinating body functions and processing information.",
        bn: "মস্তিষ্ক প্রধান নিয়ন্ত্রণ কেন্দ্র, শরীরের কার্যকলাপ সমন্বয় এবং তথ্য প্রক্রিয়াকরণ করে।"
      }
    },
    {
      question: {
        en: "What cells transmit nerve signals?",
        bn: "কোন কোষ স্নায়ু সংকেত প্রেরণ করে?" ,
      },
      options: [
        { en: "Neurons", bn: "নিউরন" },
        { en: "Red Blood Cells", bn: "লোহিত রক্তকণিকা" },
        { en: "Platelets", bn: "প্লেটলেট" },
        { en: "Muscle Cells", bn: "পেশী কোষ" }
      ],
      answer: 0,
      explanation: {
        en: "Neurons are specialized cells that transmit nerve impulses throughout the nervous system.",
        bn: "নিউরন বিশেষায়িত কোষ যা স্নায়ুতন্ত্রে স্নায়ু প্রেরণ করে।"
      }
    },
    {
      question: {
        en: "What protects the spinal cord?",
        bn: "মেরুদণ্ডকে কী রক্ষা করে?" ,
      },
      options: [
        { en: "Ribs", bn: "পাঁজর" },
        { en: "Vertebral Column", bn: "মেরুদণ্ড স্তম্ভ" },
        { en: "Skull", bn: "মাথার খুলি" },
        { en: "Pelvis", bn: "পেলভিস" }
      ],
      answer: 1,
      explanation: {
        en: "The vertebral column (spine) encases and protects the spinal cord from injury.",
        bn: "মেরুদণ্ড স্তম্ভ (মেরুদণ্ড) মেরুদণ্ডকে আঘাত থেকে রক্ষা করে।"
      }
    },
    {
      question: {
        en: "What is the role of the peripheral nervous system?",
        bn: "পেরিফেরাল স্নায়ুতন্ত্রের ভূমিকা কী?" ,
      },
      options: [
        { en: "Control digestion", bn: "হজম নিয়ন্ত্রণ" },
        { en: "Connect brain to body", bn: "মস্তিষ্ককে শরীরের সাথে সংযোগ" },
        { en: "Produce hormones", bn: "হরমোন উৎপাদন" },
        { en: "Filter blood", bn: "রক্ত ফিল্টার" }
      ],
      answer: 1,
      explanation: {
        en: "The peripheral nervous system connects the brain and spinal cord to the rest of body, relaying signals.",
        bn: "পেরিফেরাল স্নায়ুতন্ত্র মস্তিষ্ক এবং মেরুদণ্ডকে শরীরের বাকি অংশের সাথে সংযোগ করে, সংকেত প্রেরণ করে।"
      }
    },
    {
      question: {
        en: "What is a reflex action?",
        bn: "প্রতিবর্তী ক্রিয়া কী?" ,
      },
      options: [
        { en: "Voluntary movement", bn: "স্বেচ্ছাকৃত গতি" },
        { en: "Involuntary response", bn: "অনৈচ্ছিক প্রতিক্রিয়া" },
        { en: "Hormonal secretion", bn: "হরমোন নিঃসরণ" },
        { en: "Protein synthesis", bn: "প্রোটিন সংশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "A reflex action is an involuntary, rapid response to a stimulus, like pulling your hand away from heat.",
        bn: "প্রতিবর্তী ক্রিয়া একটি অনৈচ্ছিক, দ্রুত প্রতিক্রিয়া, যেমন তাপ থেকে হাত সরিয়ে নেওয়া।"
      }
    }
  ]
}

export default function NervousSystemQuiz() {
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