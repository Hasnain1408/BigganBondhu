"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "pH Scale Quiz",
    bn: "pH স্কেল কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the pH scale",
    bn: "pH স্কেল সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does pH measure?",
        bn: "pH কী পরিমাপ করে?"
      },
      options: [
        { en: "Oxygen concentration", bn: "অক্সিজেন ঘনত্ব" },
        { en: "Hydrogen ion concentration", bn: "হাইড্রোজেন আয়ন ঘনত্ব" },
        { en: "Carbon count", bn: "কার্বন সংখ্যা" },
        { en: "Temperature", bn: "তাপমাত্রা" }
      ],
      answer: 1,
      explanation: {
        en: "pH measures the concentration of hydrogen ions (H⁺) in a solution.",
        bn: "pH একটি দ্রবণে হাইড্রোজেন আয়ন (H⁺) এর ঘনত্ব পরিমাপ করে।"
      }
    },
    {
      question: {
        en: "What is the pH of a neutral solution?",
        bn: "নিরপেক্ষ দ্রবণের pH কত?"
      },
      options: [
        { en: "0", bn: "০" },
        { en: "7", bn: "৭" },
        { en: "14", bn: "১৪" },
        { en: "10", bn: "১০" }
      ],
      answer: 1,
      explanation: {
        en: "A neutral solution, like pure water, has a pH of 7, where H⁺ and OH⁻ concentrations are equal.",
        bn: "নিরপেক্ষ দ্রবণ, যেমন বিশুদ্ধ জল, pH ৭ থাকে, যেখানে H⁺ এবং OH⁻ ঘনত্ব সমান।"
      }
    },
    {
      question: {
        en: "Which solution is acidic?",
        bn: "কোন দ্রবণ অম্লীয়?"
      },
      options: [
        { en: "pH = 8", bn: "pH = ৮" },
        { en: "pH = 7", bn: "pH = ৭" },
        { en: "pH = 3", bn: "pH = ৩" },
        { en: "pH = 10", bn: "pH = ১০" }
      ],
      answer: 2,
      explanation: {
        en: "A solution with pH < 7 is acidic. pH = 3 indicates a high H⁺ concentration.",
        bn: "pH < ৭ হলে দ্রবণ অম্লীয়। pH = ৩ উচ্চ H⁺ ঘনত্ব নির্দেশ করে।"
      }
    },
    {
      question: {
        en: "How does a pH change from 4 to 3 affect H⁺ concentration?",
        bn: "pH ৪ থেকে ৩ এ পরিবর্তন হলে H⁺ ঘনত্ব কীভাবে প্রভাবিত হয়?"
      },
      options: [
        { en: "Decreases by 10 times", bn: "১০ গুণ কমে" },
        { en: "Increases by 10 times", bn: "১০ গুণ বাড়ে" },
        { en: "Remains the same", bn: "একই থাকে" },
        { en: "Increases by 2 times", bn: "২ গুণ বাড়ে" }
      ],
      answer: 1,
      explanation: {
        en: "pH is a logarithmic scale; a decrease of 1 pH unit (4 to 3) increases H⁺ concentration by 10 times.",
        bn: "pH একটি লগারিদমিক স্কেল; ১ pH ইউনিট কমলে (৪ থেকে ৩) H⁺ ঘনত্ব ১০ গুণ বাড়ে।"
      }
    },
    {
      question: {
        en: "What is a common method to measure pH?",
        bn: "pH পরিমাপের একটি সাধারণ পদ্ধতি কী?"
      },
      options: [
        { en: "Thermometer", bn: "থার্মোমিটার" },
        { en: "pH meter", bn: "pH মিটার" },
        { en: "Balance scale", bn: "ভারসাম্য স্কেল" },
        { en: "Ruler", bn: "রুলার" }
      ],
      answer: 1,
      explanation: {
        en: "A pH meter or indicator paper is commonly used to measure pH accurately.",
        bn: "pH মিটার বা সূচক কাগজ সাধারণত pH সঠিকভাবে পরিমাপের জন্য ব্যবহৃত হয়।"
      }
    }
  ]
}

export default function PHScaleQuiz() {
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