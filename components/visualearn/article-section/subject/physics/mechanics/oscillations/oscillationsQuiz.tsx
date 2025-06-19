
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Oscillations Quiz",
    bn: "দোলন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of oscillations",
    bn: "আপনার দোলন জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the period of a spring-mass system with mass 2 kg and spring constant 200 N/m?",
        bn: "2 কেজি ভর এবং 200 N/m স্প্রিং ধ্রুবক সহ একটি স্প্রিং-ভর সিস্টেমের দোলনকাল কত?"
      },
      options: [
        { en: "0.63 s", bn: "0.63 s" },
        { en: "1.26 s", bn: "1.26 s" },
        { en: "2.0 s", bn: "2.0 s" },
        { en: "0.2 s", bn: "0.2 s" }
      ],
      answer: 1,
      explanation: {
        en: "T = 2π √(m/k) = 2π √(2/200) = 2π √(0.01) ≈ 1.26 s.",
        bn: "T = 2π √(m/k) = 2π √(2/200) = 2π √(0.01) ≈ 1.26 s।"
      }
    },
    {
      question: {
        en: "In SHM, the restoring force is proportional to:",
        bn: "SHM-এ, পুনরুদ্ধারকারী বল কীসের সমানুপাতিক?"
      },
      options: [
        { en: "Velocity", bn: "বেগ" },
        { en: "Acceleration", bn: "ত্বরণ" },
        { en: "Displacement", bn: "স্থানচ্যুতি" },
        { en: "Mass", bn: "ভর" }
      ],
      answer: 2,
      explanation: {
        en: "In SHM, the restoring force F = -kx is proportional to displacement x.",
        bn: "SHM-এ, পুনরুদ্ধারকারী বল F = -kx স্থানচ্যুতি x-এর সমানুপাতিক।"
      }
    },
    {
      question: {
        en: "What is the frequency of an oscillation with a period of 0.5 s?",
        bn: "0.5 সেকেন্ড দোলনকাল সহ একটি দোলনের কম্পাঙ্ক কত?"
      },
      options: [
        { en: "0.5 Hz", bn: "0.5 Hz" },
        { en: "1 Hz", bn: "1 Hz" },
        { en: "2 Hz", bn: "2 Hz" },
        { en: "4 Hz", bn: "4 Hz" }
      ],
      answer: 2,
      explanation: {
        en: "Frequency f = 1/T = 1/0.5 = 2 Hz.",
        bn: "কম্পাঙ্ক f = 1/T = 1/0.5 = 2 Hz।"
      }
    },
    {
      question: {
        en: "At maximum displacement in SHM, the kinetic energy is:",
        bn: "SHM-এ সর্বাধিক স্থানচ্যুতিতে গতিশক্তি কত?"
      },
      options: [
        { en: "Maximum", bn: "সর্বাধিক" },
        { en: "Zero", bn: "শূন্য" },
        { en: "Half the total energy", bn: "মোট শক্তির অর্ধেক" },
        { en: "Equal to potential energy", bn: "সম্ভাব্য শক্তির সমান" }
      ],
      answer: 1,
      explanation: {
        en: "At maximum displacement, velocity is zero, so kinetic energy K = ½ mv² = 0.",
        bn: "সর্বাধিক স্থানচ্যুতিতে বেগ শূন্য, তাই গতিশক্তি K = ½ mv² = 0।"
      }
    },
    {
      question: {
        en: "Resonance occurs when the driving frequency equals:",
        bn: "সংনাদন ঘটে যখন জোরপূর্বক কম্পাঙ্ক কীসের সমান হয়?"
      },
      options: [
        { en: "Half the natural frequency", bn: "প্রাকৃতিক কম্পাঙ্কের অর্ধেক" },
        { en: "Twice the natural frequency", bn: "প্রাকৃতিক কম্পাঙ্কের দ্বিগুণ" },
        { en: "The natural frequency", bn: "প্রাকৃতিক কম্পাঙ্ক" },
        { en: "Zero frequency", bn: "শূন্য কম্পাঙ্ক" }
      ],
      answer: 2,
      explanation: {
        en: "Resonance occurs when the driving frequency matches the natural frequency of the system.",
        bn: "সংনাদন ঘটে যখন জোরপূর্বক কম্পাঙ্ক সিস্টেমের প্রাকৃতিক কম্পাঙ্কের সমান হয়।"
      }
    }
  ]
}

export default function OscillationsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Oscillations Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
