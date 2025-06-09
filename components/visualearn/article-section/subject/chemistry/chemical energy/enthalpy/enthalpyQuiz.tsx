
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Enthalpy Quiz",
    bn: "এনথালপি কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of enthalpy",
    bn: "এনথালপি সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is enthalpy?",
        bn: "এনথালপি কী?"
      },
      options: [
        { en: "Pressure of a system", bn: "সিস্টেমের চাপ" },
        { en: "Heat content at constant pressure", bn: "ধ্রুব চাপে তাপ শক্তি" },
        { en: "Volume change", bn: "আয়তন পরিবর্তন" },
        { en: "Molecular weight", bn: "আণবিক ভর" }
      ],
      answer: 1,
      explanation: {
        en: "Enthalpy (H) measures the heat content of a system at constant pressure, H = U + PV.",
        bn: "এনথালপি (H) ধ্রুব চাপে সিস্টেমের তাপ শক্তি পরিমাপ করে, H = U + PV।"
      }
    },
    {
      question: {
        en: "What does a negative ΔH indicate?",
        bn: "নেগেটিভ ΔH কী নির্দেশ করে?"
      },
      options: [
        { en: "Endothermic reaction", bn: "এন্ডোথার্মিক বিক্রিয়া" },
        { en: "Exothermic reaction", bn: "এক্সোথার্মিক বিক্রিয়া" },
        { en: "No heat change", bn: "কোনো তাপ পরিবর্তন নেই" },
        { en: "Pressure increase", bn: "চাপ বৃদ্ধি" }
      ],
      answer: 1,
      explanation: {
        en: "A negative ΔH indicates an exothermic reaction, where heat is released.",
        bn: "নেগেটিভ ΔH একটি এক্সোথার্মিক বিক্রিয়া নির্দেশ করে, যেখানে তাপ নির্গত হয়।"
      }
    },
    {
      question: {
        en: "What is the enthalpy of formation?",
        bn: "গঠনের এনথালপি কী?"
      },
      options: [
        { en: "Energy to break bonds", bn: "বন্ধন ভাঙার শক্তি" },
        { en: "Energy to form 1 mole of a compound", bn: "১ মোল যৌগ গঠনের শক্তি" },
        { en: "Heat of combustion", bn: "দহনের তাপ" },
        { en: "Total system energy", bn: "মোট সিস্টেম শক্তি" }
      ],
      answer: 1,
      explanation: {
        en: "Enthalpy of formation is the energy change when 1 mole of a compound is formed from its elements.",
        bn: "গঠনের এনথালপি হল ১ মোল যৌগ তার মৌল থেকে গঠিত হলে শক্তি পরিবর্তন।"
      }
    },
    {
      question: {
        en: "Which process has a positive ΔH?",
        bn: "কোন প্রক্রিয়ার ΔH পজিটিভ?"
      },
      options: [
        { en: "Combustion of methane", bn: "মিথেন দহন" },
        { en: "Photosynthesis", bn: "ফটোসিন্থেসিস" },
        { en: "Neutralization", bn: "নিরপেক্ষীকরণ" },
        { en: "Condensation", bn: "ঘনীভবন" }
      ],
      answer: 1,
      explanation: {
        en: "Photosynthesis absorbs energy, making it endothermic with a positive ΔH.",
        bn: "ফটোসিনথেসিস শক্তি শোষণ করে, তাই এটি এন্ডোথার্মিক এবং ΔH পজিটিভ।"
      }
    },
    {
      question: {
        en: "How is bond energy used in enthalpy calculations?",
        bn: "বন্ধন শক্তি এনথালপি গণনায় কীভাবে ব্যবহৃত হয়?"
      },
      options: [
        { en: "Measures pressure changes", bn: "চাপ পরিবর্তন পরিমাপ" },
        { en: "Calculates energy to break/form bonds", bn: "বন্ধন ভাঙা/গঠনের শক্তি গণনা" },
        { en: "Determines volume", bn: "আয়তন নির্ধারণ" },
        { en: "Finds reaction rate", bn: "বিক্রিয়ার হার নির্ণয়" }
      ],
      answer: 1,
      explanation: {
        en: "Bond energy is used to calculate enthalpy changes by summing energy to break and form bonds.",
        bn: "বন্ধন শক্তি বন্ধন ভাঙা এবং গঠনের শক্তি যোগ করে এনথালপি পরিবর্তন গণনা করে।"
      }
    }
  ]
}

export default function EnthalpyQuiz() {
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
