
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Fluid Mechanics Quiz",
    bn: "তরল যান্ত্রিকী কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of fluid mechanics",
    bn: "আপনার তরল যান্ত্রিকী জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the pressure at a depth of 10 m in water (density = 1000 kg/m³, g = 9.8 m/s²)?",
        bn: "10 মিটার গভীরতায় পানির চাপ কত (ঘনত্ব = 1000 kg/m³, g = 9.8 m/s²)?"
      },
      options: [
        { en: "9800 Pa", bn: "9800 Pa" },
        { en: "98000 Pa", bn: "98000 Pa" },
        { en: "980000 Pa", bn: "980000 Pa" },
        { en: "980 Pa", bn: "980 Pa" }
      ],
      answer: 1,
      explanation: {
        en: "Pressure = ρgh = 1000 × 9.8 × 10 = 98000 Pa.",
        bn: "চাপ = ρgh = 1000 × 9.8 × 10 = 98000 Pa।"
      }
    },
    {
      question: {
        en: "A fluid flows through a pipe with a cross-sectional area of 0.02 m² at a velocity of 2 m/s. What is the flow rate?",
        bn: "একটি তরল 0.02 m² ক্রস-সেকশনাল এরিয়ার পাইপের মাধ্যমে 2 m/s বেগে প্রবাহিত হয়। প্রবাহ হার কত?"
      },
      options: [
        { en: "0.04 m³/s", bn: "0.04 m³/s" },
        { en: "0.4 m³/s", bn: "0.4 m³/s" },
        { en: "0.004 m³/s", bn: "0.004 m³/s" },
        { en: "4 m³/s", bn: "4 m³/s" }
      ],
      answer: 0,
      explanation: {
        en: "Flow rate Q = A × v = 0.02 × 2 = 0.04 m³/s.",
        bn: "প্রবাহ হার Q = A × v = 0.02 × 2 = 0.04 m³/s।"
      }
    },
    {
      question: {
        en: "According to Archimedes' principle, the buoyant force on an object equals:",
        bn: "আর্কিমিডিসের নীতি অনুসারে, একটি বস্তুর উপর ভাস্কর্য বল কীসের সমান?"
      },
      options: [
        { en: "Weight of the object", bn: "বস্তুর ওজন" },
        { en: "Weight of the fluid displaced", bn: "স্থানচ্যুত তরলের ওজন" },
        { en: "Volume of the object", bn: "বস্তুর আয়তন" },
        { en: "Density of the object", bn: "বস্তুর ঘনত্ব" }
      ],
      answer: 1,
      explanation: {
        en: "Archimedes' principle states that the buoyant force equals the weight of the fluid displaced by the object.",
        bn: "আর্কিমিডিসের নীতি বলে যে ভাস্কর্য বল বস্তু দ্বারা স্থানচ্যুত তরলের ওজনের সমান।"
      }
    },
    {
      question: {
        en: "In Bernoulli’s equation, what does the term ½ρv² represent?",
        bn: "বার্নোলির সমীকরণে ½ρv² পদটি কী নির্দেশ করে?"
      },
      options: [
        { en: "Potential energy", bn: "সম্ভাব্য শক্তি" },
        { en: "Kinetic energy per unit volume", bn: "প্রতি একক আয়তনে গতিশক্তি" },
        { en: "Pressure energy", bn: "চাপ শক্তি" },
        { en: "Viscous energy", bn: "ভিসকোস শক্তি" }
      ],
      answer: 1,
      explanation: {
        en: "The term ½ρv² represents the kinetic energy per unit volume of the fluid in Bernoulli’s equation.",
        bn: "½ρv² পদটি বার্নোলির সমীকরণে তরলের প্রতি একক আয়তনে গতিশক্তি নির্দেশ করে।"
      }
    },
    {
      question: {
        en: "Which type of flow is characterized by smooth, parallel layers of fluid?",
        bn: "কোন ধরনের প্রবাহ মসৃণ, সমান্তরাল তরল স্তর দ্বারা চিহ্নিত হয়?"
      },
      options: [
        { en: "Turbulent flow", bn: "অশান্ত প্রবাহ" },
        { en: "Laminar flow", bn: "স্তরিত প্রবাহ" },
        { en: "Compressible flow", bn: "সংকোচনযোগ্য প্রবাহ" },
        { en: "Viscous flow", bn: "ভিসকোস প্রবাহ" }
      ],
      answer: 1,
      explanation: {
        en: "Laminar flow is characterized by smooth, parallel layers of fluid with no mixing between layers.",
        bn: "স্তরিত প্রবাহ মসৃণ, সমান্তরাল তরল স্তর দ্বারা চিহ্নিত যেখানে স্তরগুলির মধ্যে কোনো মিশ্রণ হয় না।"
      }
    }
  ]
}

export default function FluidMechanicsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Fluid Mechanics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
