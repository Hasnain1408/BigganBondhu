"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Buffers Quiz",
    bn: "বাফার কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of buffers",
    bn: "বাফার সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary function of a buffer?",
        bn: "বাফারের প্রাথমিক কাজ কী?"
      },
      options: [
        { en: "Increase pH", bn: "pH বাড়ানো" },
        { en: "Resist pH changes", bn: "pH পরিবর্তন প্রতিরোধ" },
        { en: "Lower pH", bn: "pH কমানো" },
        { en: "Change color", bn: "রং পরিবর্তন" }
      ],
      answer: 1,
      explanation: {
        en: "Buffers resist changes in pH when small amounts of acid or base are added.",
        bn: "বাফার অল্প পরিমাণে অ্যাসিড বা বেস যোগ করলে pH পরিবর্তন প্রতিরোধ করে।"
      }
    },
    {
      question: {
        en: "What components make up an acidic buffer?",
        bn: "অম্লীয় বাফারের উপাদান কী?"
      },
      options: [
        { en: "Strong acid and base", bn: "প্রবল অ্যাসিড এবং বেস" },
        { en: "Weak acid and its salt", bn: "দুর্বল অ্যাসিড এবং এর লবণ" },
        { en: "Strong base and its salt", bn: "প্রবল বেস এবং এর লবণ" },
        { en: "Weak base and acid", bn: "দুর্বল বেস এবং অ্যাসিড" }
      ],
      answer: 1,
      explanation: {
        en: "An acidic buffer is made of a weak acid and its conjugate base (e.g., from its salt).",
        bn: "অম্লীয় বাফার দুর্বল অ্যাসিড এবং এর কনজুগেট বেস (যেমন, লবণ থেকে) দিয়ে তৈরি।"
      }
    },
    {
      question: {
        en: "What equation is used to calculate buffer pH?",
        bn: "বাফারের pH গণনার জন্য কোন সমীকরণ ব্যবহৃত হয়?"
      },
      options: [
        { en: "pH = -log[H⁺]", bn: "pH = -log[H⁺]" },
        { en: "pH = pKa + log([base]/[acid])", bn: "pH = pKa + log([বেস]/[অ্যাসিড])" },
        { en: "pH = [H⁺] + [OH⁻]", bn: "pH = [H⁺] + [OH⁻]" },
        { en: "pH = log([acid]/[base])", bn: "pH = log([অ্যাসিড]/[বেস])" }
      ],
      answer: 1,
      explanation: {
        en: "The Henderson-Hasselbalch equation, pH = pKa + log([base]/[acid]), calculates buffer pH.",
        bn: "হেন্ডারসন-হ্যাসেলব্যালচ সমীকরণ, pH = pKa + log([বেস]/[অ্যাসিড]), বাফারের pH গণনা করে।"
      }
    },
    {
      question: {
        en: "Which is an example of a biological buffer?",
        bn: "জৈবিক বাফারের উদাহরণ কোনটি?"
      },
      options: [
        { en: "HCl/NaCl", bn: "HCl/NaCl" },
        { en: "H₂CO₃/HCO₃⁻", bn: "H₂CO₃/HCO₃⁻" },
        { en: "NH₃/NH₄Cl", bn: "NH₃/NH₄Cl" },
        { en: "CH₃COOH/NaOH", bn: "CH₃COOH/NaOH" }
      ],
      answer: 1,
      explanation: {
        en: "The H₂CO₃/HCO₃⁻ system is a key biological buffer in blood, maintaining pH 7.35-7.45.",
        bn: "H₂CO₃/HCO₃⁻ সিস্টেম রক্তে একটি গুরুত্বপূর্ণ জৈবিক বাফার, pH ৭.৩৫-৭.৪৫ বজায় রাখে।"
      }
    },
    {
      question: {
        en: "What happens if too much acid is added to a buffer?",
        bn: "বাফারে অত্যধিক অ্যাসিড যোগ করলে কী হয়?"
      },
      options: [
        { en: "pH remains constant", bn: "pH অপরিবর্তিত থাকে" },
        { en: "Buffer capacity is exceeded", bn: "বাফার ক্ষমতা অতিক্রমিত হয়" },
        { en: "pH increases", bn: "pH বাড়ে" },
        { en: "Buffer becomes basic", bn: "বাফার ক্ষারীয় হয়" }
      ],
      answer: 1,
      explanation: {
        en: "Excess acid can overwhelm the buffer's capacity, causing a significant pH drop.",
        bn: "অতিরিক্ত অ্যাসিড বাফারের ক্ষমতা অতিক্রম করতে পারে, যার ফলে pH উল্লেখযোগ্যভাবে কমে যায়।"
      }
    }
  ]
}

export default function BuffersQuiz() {
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