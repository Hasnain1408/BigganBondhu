"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Boyle’s Law Quiz",
    bn: "বয়লের সূত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Boyle’s Law",
    bn: "বয়লের সূত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Boyle’s Law state about pressure and volume?",
        bn: "বয়লের সূত্র চাপ এবং আয়তন সম্পর্কে কী বলে?"
      },
      options: [
        { en: "Directly proportional", bn: "সরাসরি সমানুপাতিক" },
        { en: "Inversely proportional", bn: "বিপরীত সমানুপাতিক" },
        { en: "No relationship", bn: "কোনো সম্পর্ক নেই" },
        { en: "Equal", bn: "সমান" }
      ],
      answer: 1,
      explanation: {
        en: "Boyle’s Law states that at constant temperature, pressure and volume are inversely proportional (P ∝ 1/V).",
        bn: "বয়লের সূত্র বলে যে স্থির তাপমাত্রায় চাপ এবং আয়তন বিপরীত সমানুপাতিক (P ∝ 1/V)।"
      }
    },
    {
      question: {
        en: "Under what condition does Boyle’s Law apply?",
        bn: "কোন অবস্থায় বয়লের সূত্র প্রযোজ্য?"
      },
      options: [
        { en: "Constant pressure", bn: "স্থির চাপ" },
        { en: "Constant volume", bn: "স্থির আয়তন" },
        { en: "Constant temperature", bn: "স্থির তাপমাত্রা" },
        { en: "Constant moles", bn: "স্থির মোল" }
      ],
      answer: 2,
      explanation: {
        en: "Boyle’s Law applies when temperature remains constant, ensuring the pressure-volume relationship holds.",
        bn: "বয়লের সূত্র তখন প্রযোজ্য যখন তাপমাত্রা স্থির থাকে, চাপ-আয়তন সম্পর্ক নিশ্চিত করে।"
      }
    },
    {
      question: {
        en: "What is the equation for Boyle’s Law?",
        bn: "বয়লের সূত্রের সমীকরণ কী?"
      },
      options: [
        { en: "PV = nRT", bn: "PV = nRT" },
        { en: "P₁V₁ = P₂V₂", bn: "P₁V₁ = P₂V₂" },
        { en: "V/T = constant", bn: "V/T = স্থির" },
        { en: "P/T = constant", bn: "P/T = স্থির" }
      ],
      answer: 1,
      explanation: {
        en: "The equation P₁V₁ = P₂V₂ represents Boyle’s Law, showing the product of initial pressure and volume equals final pressure and volume.",
        bn: "P₁V₁ = P₂V₂ সমীকরণটি বয়লের সূত্রকে প্রকাশ করে, যা প্রাথমিক চাপ এবং আয়তনের গুণফল চূড়ান্ত চাপ এবং আয়তনের সমান।"
      }
    },
    {
      question: {
        en: "What happens to volume if pressure doubles in a syringe?",
        bn: "সিরিঞ্জে চাপ দ্বিগুণ হলে আয়তনের কী হয়?"
      },
      options: [
        { en: "Doubles", bn: "দ্বিগুণ হয়" },
        { en: "Halves", bn: "অর্ধেক হয়" },
        { en: "Remains same", bn: "অপরিবর্তিত থাকে" },
        { en: "Triples", bn: "তিনগুণ হয়" }
      ],
      answer: 1,
      explanation: {
        en: "According to Boyle’s Law, if pressure doubles at constant temperature, volume halves to maintain P₁V₁ = P₂V₂.",
        bn: "বয়লের সূত্র অনুসারে, স্থির তাপমাত্রায় চাপ দ্বিগুণ হলে আয়তন অর্ধেক হয় P₁V₁ = P₂V₂ বজায় রাখতে।"
      }
    },
    {
      question: {
        en: "Who discovered Boyle’s Law?",
        bn: "বয়লের সূত্র কে আবিষ্কার করেন?"
      },
      options: [
        { en: "Charles", bn: "শার্ল" },
        { en: "Avogadro", bn: "আভোগাড্রো" },
        { en: "Robert Boyle", bn: "রবার্ট বয়ল" },
        { en: "Dalton", bn: "ডাল্টন" }
      ],
      answer: 2,
      explanation: {
        en: "Robert Boyle discovered Boyle’s Law in 1662 through experiments with gas pressure and volume.",
        bn: "রবার্ট বয়ল ১৬৬২ সালে গ্যাসের চাপ এবং আয়তনের পরীক্ষার মাধ্যমে বয়লের সূত্র আবিষ্কার করেন।"
      }
    }
  ]
}

export default function BoylesLawQuiz() {
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