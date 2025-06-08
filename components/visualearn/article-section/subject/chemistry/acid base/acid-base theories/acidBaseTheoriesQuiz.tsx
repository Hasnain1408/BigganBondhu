"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Acid-Base Theories Quiz",
    bn: "অ্যাসিড-বেস তত্ত্ব কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of acid-base theories",
    bn: "অ্যাসিড-বেস তত্ত্ব সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "According to Arrhenius, what does an acid produce in water?",
        bn: "আর্রেনিয়াস অনুসারে, অ্যাসিড জলে কী উৎপন্ন করে?"
      },
      options: [
        { en: "OH⁻", bn: "OH⁻" },
        { en: "H⁺", bn: "H⁺" },
        { en: "Electrons", bn: "ইলেকট্রন" },
        { en: "Protons", bn: "প্রোটন" }
      ],
      answer: 1,
      explanation: {
        en: "Arrhenius theory defines an acid as a substance that produces H⁺ ions in water.",
        bn: "আর্রেনিয়াস তত্ত্ব অনুসারে অ্যাসিড জলে H⁺ আয়ন উৎপন্ন করে।"
      }
    },
    {
      question: {
        en: "What is a Brønsted-Lowry base?",
        bn: "ব্রনস্টেড-লোরি বেস কী?"
      },
      options: [
        { en: "Proton donor", bn: "প্রোটন দানকারী" },
        { en: "Electron pair acceptor", bn: "ইলেকট্রন জোড় গ্রহণকারী" },
        { en: "Proton acceptor", bn: "প্রোটন গ্রহণকারী" },
        { en: "OH⁻ producer", bn: "OH⁻ উৎপাদক" }
      ],
      answer: 2,
      explanation: {
        en: "A Brønsted-Lowry base accepts protons (H⁺) in a reaction.",
        bn: "ব্রনস্টেড-লোরি বেস প্রতিক্রিয়ায় প্রোটন (H⁺) গ্রহণ করে।"
      }
    },
    {
      question: {
        en: "Which reaction represents a Lewis acid-base reaction?",
        bn: "কোন প্রতিক্রিয়া লুইস অ্যাসিড-বেস প্রতিক্রিয়া প্রতিনিধিত্ব করে?"
      },
      options: [
        { en: "HCl → H⁺ + Cl⁻", bn: "HCl → H⁺ + Cl⁻" },
        { en: "NH₃ + HCl → NH₄⁺ + Cl⁻", bn: "NH₃ + HCl → NH₄⁺ + Cl⁻" },
        { en: "BF₃ + NH₃ → F₃B:NH₃", bn: "BF₃ + NH₃ → F₃B:NH₃" },
        { en: "NaOH → Na⁺ + OH⁻", bn: "NaOH → Na⁺ + OH⁻" }
      ],
      answer: 2,
      explanation: {
        en: "In a Lewis acid-base reaction, BF₃ (acid) accepts an electron pair from NH₃ (base).",
        bn: "লুইস অ্যাসিড-বেস প্রতিক্রিয়ায়, BF₃ (অ্যাসিড) NH₃ (বেস) থেকে ইলেকট্রন জোড় গ্রহণ করে।"
      }
    },
    {
      question: {
        en: "What is a limitation of the Arrhenius theory?",
        bn: "আর্রেনিয়াস তত্ত্বের সীমাবদ্ধতা কী?"
      },
      options: [
        { en: "Applies only to gases", bn: "শুধুমাত্র গ্যাসের জন্য প্রযোজ্য" },
        { en: "Applies only to aqueous solutions", bn: "শুধুমাত্র জলীয় দ্রবণে প্রযোজ্য" },
        { en: "Ignores proton transfer", bn: "প্রোটন স্থানান্তর উপেক্ষা করে" },
        { en: "Excludes electron pairs", bn: "ইলেকট্রন জোড় বাদ দেয়" }
      ],
      answer: 1,
      explanation: {
        en: "The Arrhenius theory is limited to aqueous solutions and cannot explain acid-base behavior in non-aqueous systems.",
        bn: "আর্রেনিয়াস তত্ত্ব জলীয় দ্রবণে সীমাবদ্ধ এবং অ-জলীয় সিস্টেমে ব্যাখ্যা করতে পারে না।"
      }
    },
    {
      question: {
        en: "Which substance acts as a Brønsted-Lowry base in NH₃ + HCl → NH₄⁺ + Cl⁻?",
        bn: "NH₃ + HCl → NH₄⁺ + Cl⁻ প্রতিক্রিয়ায় কোন পদার্থ ব্রনস্টেড-লোরি বেস হিসেবে কাজ করে?"
      },
      options: [
        { en: "HCl", bn: "HCl" },
        { en: "NH₃", bn: "NH₃" },
        { en: "NH₄⁺", bn: "NH₄⁺" },
        { en: "Cl⁻", bn: "Cl⁻" }
      ],
      answer: 1,
      explanation: {
        en: "NH₃ acts as a Brønsted-Lowry base by accepting a proton from HCl to form NH₄⁺.",
        bn: "NH₃ HCl থেকে প্রোটন গ্রহণ করে NH₄⁺ তৈরি করে, ব্রনস্টেড-লোরি বেস হিসেবে কাজ করে।"
      }
    }
  ]
}

export default function AcidBaseTheoriesQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-semibold">Chemistry Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}