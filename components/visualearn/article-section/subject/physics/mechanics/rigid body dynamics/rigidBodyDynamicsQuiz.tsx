
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Rigid Body Dynamics Quiz",
    bn: "অনমনীয় বস্তুর গতিবিজ্ঞান কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of rigid body dynamics",
    bn: "আপনার অনমনীয় বস্তুর গতিবিজ্ঞান জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the torque produced by a 10 N force applied at 0.5 m from the axis of rotation?",
        bn: "ঘূর্ণন অক্ষ থেকে 0.5 মিটার দূরে প্রয়োগ করা 10 N বল দ্বারা উৎপন্ন টর্ক কত?"
      },
      options: [
        { en: "5 N·m", bn: "5 N·m" },
        { en: "20 N·m", bn: "20 N·m" },
        { en: "2 N·m", bn: "2 N·m" },
        { en: "50 N·m", bn: "50 N·m" }
      ],
      answer: 0,
      explanation: {
        en: "Torque τ = r × F = 0.5 × 10 = 5 N·m.",
        bn: "টর্ক τ = r × F = 0.5 × 10 = 5 N·m।"
      }
    },
    {
      question: {
        en: "The moment of inertia of a solid sphere about its diameter is:",
        bn: "একটি কঠিন গোলকের ব্যাসের চারপাশে জড়তার মুহূর্ত কী?"
      },
      options: [
        { en: "2/5 MR²", bn: "2/5 MR²" },
        { en: "1/2 MR²", bn: "1/2 MR²" },
        { en: "MR²", bn: "MR²" },
        { en: "2/3 MR²", bn: "2/3 MR²" }
      ],
      answer: 0,
      explanation: {
        en: "For a solid sphere, I = 2/5 MR² about its diameter.",
        bn: "কঠিন গোলকের জন্য, I = 2/5 MR² ব্যাসের চারপাশে।"
      }
    },
    {
      question: {
        en: "If no external torque acts on a system, what is conserved?",
        bn: "যদি কোনো বাহ্যিক টর্ক সিস্টেমে কাজ না করে, তবে কী সংরক্ষিত থাকে?"
      },
      options: [
        { en: "Linear momentum", bn: "রৈখিক ভরবেগ" },
        { en: "Angular momentum", bn: "কৌণিক ভরবেগ" },
        { en: "Kinetic energy", bn: "গতিশক্তি" },
        { en: "Potential energy", bn: "সম্ভাব্য শক্তি" }
      ],
      answer: 1,
      explanation: {
        en: "Angular momentum L = I ω is conserved when no external torque acts.",
        bn: "কৌণিক ভরবেগ L = I ω সংরক্ষিত থাকে যখন কোনো বাহ্যিক টর্ক কাজ করে না।"
      }
    },
    {
      question: {
        en: "What is the rotational kinetic energy of a disk with I = 0.2 kg·m² and ω = 10 rad/s?",
        bn: "I = 0.2 kg·m² এবং ω = 10 rad/s সহ একটি ডিস্কের ঘূর্ণন গতিশক্তি কত?"
      },
      options: [
        { en: "10 J", bn: "10 J" },
        { en: "20 J", bn: "20 J" },
        { en: "100 J", bn: "100 J" },
        { en: "200 J", bn: "200 J" }
      ],
      answer: 0,
      explanation: {
        en: "K = ½ I ω² = ½ × 0.2 × 10² = 10 J.",
        bn: "K = ½ I ω² = ½ × 0.2 × 10² = 10 J।"
      }
    },
    {
      question: {
        en: "The equation τ = I α is analogous to which linear equation?",
        bn: "τ = I α সমীকরণটি কোন রৈখিক সমীকরণের সাথে সাদৃশ্যপূর্ণ?"
      },
      options: [
        { en: "F = ma", bn: "F = ma" },
        { en: "p = mv", bn: "p = mv" },
        { en: "K = ½ mv²", bn: "K = ½ mv²" },
        { en: "W = Fd", bn: "W = Fd" }
      ],
      answer: 0,
      explanation: {
        en: "τ = I α is the rotational equivalent of F = ma, where τ is torque, I is moment of inertia, and α is angular acceleration.",
        bn: "τ = I α হল F = ma-এর ঘূর্ণন সমতুল্য, যেখানে τ হল টর্ক, I হল জড়তার মুহূর্ত, এবং α হল কৌণিক ত্বরণ।"
      }
    }
  ]
}

export default function RigidBodyDynamicsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Rigid Body Dynamics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
