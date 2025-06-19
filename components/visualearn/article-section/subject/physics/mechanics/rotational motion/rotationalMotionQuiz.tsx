

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Rotational Motion Quiz",
    bn: "ঘূর্ণন গতি কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of rotational motion",
    bn: "আপনার ঘূর্ণন গতি জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the angular velocity of an object rotating at 120 rpm?",
        bn: "120 rpm-এ ঘূর্ণায়মান একটি বস্তুর কৌণিক বেগ কত?"
      },
      options: [
        { en: "4π rad/s", bn: "4π rad/s" },
        { en: "2π rad/s", bn: "2π rad/s" },
        { en: "12π rad/s", bn: "12π rad/s" },
        { en: "8π rad/s", bn: "8π rad/s" }
      ],
      answer: 0,
      explanation: {
        en: "ω = (120 rev/min) × (2π rad/rev) × (1 min/60 s) = 4π rad/s.",
        bn: "ω = (120 rev/min) × (2π rad/rev) × (1 min/60 s) = 4π rad/s।"
      }
    },
    {
      question: {
        en: "The torque on an object is zero when the angle between r and F is:",
        bn: "r এবং F-এর মধ্যে কোণ যখন কত হয় তখন বস্তুর উপর টর্ক শূন্য হয়?"
      },
      options: [
        { en: "0° or 180°", bn: "0° বা 180°" },
        { en: "90°", bn: "90°" },
        { en: "45°", bn: "45°" },
        { en: "270°", bn: "270°" }
      ],
      answer: 0,
      explanation: {
        en: "Torque τ = r F sinθ. When θ = 0° or 180°, sinθ = 0, so τ = 0.",
        bn: "টর্ক τ = r F sinθ। যখন θ = 0° বা 180°, sinθ = 0, তাই τ = 0।"
      }
    },
    {
      question: {
        en: "What is the moment of inertia of a thin ring about its center?",
        bn: "একটি পাতলা রিং-এর কেন্দ্রের চারপাশে জড়তার মুহূর্ত কী?"
      },
      options: [
        { en: "MR²", bn: "MR²" },
        { en: "½ MR²", bn: "½ MR²" },
        { en: "2 MR²", bn: "2 MR²" },
        { en: "1/3 MR²", bn: "1/3 MR²" }
      ],
      answer: 0,
      explanation: {
        en: "For a thin ring about its center, I = MR².",
        bn: "পাতলা রিং-এর কেন্দ্রের চারপাশে, I = MR²।"
      }
    },
    {
      question: {
        en: "If angular momentum is conserved, what happens when moment of inertia decreases?",
        bn: "কৌণিক ভরবেগ সংরক্ষিত থাকলে, জড়তার মুহূর্ত কমলে কী হয়?"
      },
      options: [
        { en: "Angular velocity decreases", bn: "কৌণিক বেগ কমে" },
        { en: "Angular velocity increases", bn: "কৌণিক বেগ বাড়ে" },
        { en: "Torque increases", bn: "টর্ক বাড়ে" },
        { en: "Energy decreases", bn: "শক্তি কমে" }
      ],
      answer: 1,
      explanation: {
        en: "L = I ω is constant. If I decreases, ω must increase to conserve L.",
        bn: "L = I ω ধ্রুবক। যদি I কমে, L সংরক্ষণের জন্য ω বাড়তে হবে।"
      }
    },
    {
      question: {
        en: "The rotational kinetic energy of an object with I = 0.5 kg·m² and ω = 4 rad/s is:",
        bn: "I = 0.5 kg·m² এবং ω = 4 rad/s সহ একটি বস্তুর ঘূর্ণন গতিশক্তি কত?"
      },
      options: [
        { en: "4 J", bn: "4 J" },
        { en: "8 J", bn: "8 J" },
        { en: "16 J", bn: "16 J" },
        { en: "32 J", bn: "32 J" }
      ],
      answer: 0,
      explanation: {
        en: "K = ½ I ω² = ½ × 0.5 × 4² = 4 J.",
        bn: "K = ½ I ω² = ½ × 0.5 × 4² = 4 J।"
      }
    }
  ]
}

export default function RotationalMotionQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Rotational Motion Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
