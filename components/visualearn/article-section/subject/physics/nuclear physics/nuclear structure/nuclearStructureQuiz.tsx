// components/topics/physics/nuclear/nuclearStructureQuiz.tsx

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: { en: "Nuclear Structure Quiz", bn: "নিউক্লিয়ার স্ট্রাকচার কুইজ" },
  subtitle: { en: "Test your nuclear physics knowledge", bn: "আপনার নিউক্লিয়ার পদার্থবিজ্ঞান জ্ঞান পরীক্ষা করুন" },
  questions: [
    {
      question: { en: "What are nucleons?", bn: "নিউক্লিওন কী?" },
      options: [
        { en: "Only protons", bn: "শুধু প্রোটন" },
        { en: "Only neutrons", bn: "শুধু নিউট্রন" },
        { en: "Protons and neutrons", bn: "প্রোটন এবং নিউট্রন" },
        { en: "Electrons", bn: "ইলেকট্রন" }
      ],
      answer: 2,
      explanation: {
        en: "Nucleons include both protons and neutrons.",
        bn: "নিউক্লিওনের মধ্যে প্রোটন এবং নিউট্রন উভয়ই অন্তর্ভুক্ত।"
      }
    },
    {
      question: { en: "What is the atomic number (Z)?", bn: "পারমাণবিক সংখ্যা (Z) কী?" },
      options: [
        { en: "Number of neutrons", bn: "নিউট্রনের সংখ্যা" },
        { en: "Number of protons", bn: "প্রোটনের সংখ্যা" },
        { en: "Number of electrons", bn: "ইলেকট্রনের সংখ্যা" },
        { en: "Sum of protons and neutrons", bn: "প্রোটন ও নিউট্রনের যোগফল" }
      ],
      answer: 1,
      explanation: {
        en: "Atomic number is the number of protons in the nucleus.",
        bn: "পারমাণবিক সংখ্যা হলো নিউক্লিয়াসে থাকা প্রোটনের সংখ্যা।"
      }
    },
    {
      question: { en: "What is binding energy?", bn: "বাইন্ডিং এনার্জি কী?" },
      options: [
        { en: "Energy released when an electron is removed", bn: "ইলেকট্রন সরালে নির্গত শক্তি" },
        { en: "Energy required to split a nucleus", bn: "নিউক্লিয়াস বিভক্ত করতে প্রয়োজনীয় শক্তি" },
        { en: "Thermal energy of nucleus", bn: "নিউক্লিয়াসের তাপ শক্তি" },
        { en: "Kinetic energy of protons", bn: "প্রোটনের গতিশক্তি" }
      ],
      answer: 1,
      explanation: {
        en: "Binding energy is the energy required to break a nucleus into its components.",
        bn: "নিউক্লিয়াসকে এর উপাদানগুলিতে বিভক্ত করতে যেটুকু শক্তি দরকার, সেটিই বাইন্ডিং এনার্জি।"
      }
    },
    {
      question: { en: "What are isotopes?", bn: "আইসোটোপ কী?" },
      options: [
        { en: "Same Z, same A", bn: "একই Z, একই A" },
        { en: "Same A, different Z", bn: "একই A, ভিন্ন Z" },
        { en: "Same Z, different A", bn: "একই Z, ভিন্ন A" },
        { en: "Different Z and A", bn: "ভিন্ন Z ও A" }
      ],
      answer: 2,
      explanation: {
        en: "Isotopes have same number of protons (Z) but different number of neutrons (A varies).",
        bn: "আইসোটোপের প্রোটন সংখ্যা এক, কিন্তু নিউট্রন সংখ্যা ভিন্ন।"
      }
    },
    {
      question: { en: "Which model describes nucleons in energy levels?", bn: "কোন মডেল নিউক্লিওনকে শক্তির স্তরে ব্যাখ্যা করে?" },
      options: [
        { en: "Planetary model", bn: "প্ল্যানেটারি মডেল" },
        { en: "Bohr model", bn: "বোর মডেল" },
        { en: "Shell model", bn: "শেল মডেল" },
        { en: "Quantum cloud model", bn: "কোয়ান্টাম ক্লাউড মডেল" }
      ],
      answer: 2,
      explanation: {
        en: "The shell model organizes nucleons in quantized energy levels within the nucleus.",
        bn: "শেল মডেল অনুযায়ী নিউক্লিওন নির্দিষ্ট শক্তি স্তরে অবস্থান করে।"
      }
    }
  ]
};

export default function NuclearStructureQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-yellow-600 to-red-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Nuclear Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
