"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: { en: "Nuclear Reactions Quiz", bn: "নিউক্লিয়ার রিঅ্যাকশন কুইজ" },
  subtitle: { en: "Assess your understanding of nuclear reactions", bn: "নিউক্লিয়ার বিক্রিয়া সম্পর্কে আপনার ধারণা যাচাই করুন" },
  questions: [
    {
      question: { en: "What happens during nuclear fission?", bn: "নিউক্লিয়ার ফিশন চলাকালে কী ঘটে?" },
      options: [
        { en: "Two light nuclei combine", bn: "দুটি হালকা নিউক্লিয়াস মিশে যায়" },
        { en: "One nucleus splits into two", bn: "একটি নিউক্লিয়াস দুই ভাগে বিভক্ত হয়" },
        { en: "Electron changes orbit", bn: "ইলেকট্রন কক্ষপথ পরিবর্তন করে" },
        { en: "Photon is emitted", bn: "ফোটন নির্গত হয়" }
      ],
      answer: 1,
      explanation: {
        en: "Fission is the splitting of a heavy nucleus into lighter nuclei.",
        bn: "ফিশন হলো একটি ভারী নিউক্লিয়াসের ছোট ছোট নিউক্লিয়াসে বিভাজন।"
      }
    },
    {
      question: { en: "Which reaction powers the Sun?", bn: "সূর্যকে কোন বিক্রিয়া শক্তি দেয়?" },
      options: [
        { en: "Fission", bn: "ফিশন" },
        { en: "Fusion", bn: "ফিউশন" },
        { en: "Decay", bn: "ক্ষয়" },
        { en: "Combustion", bn: "দহন" }
      ],
      answer: 1,
      explanation: {
        en: "The Sun is powered by nuclear fusion reactions.",
        bn: "সূর্য নিউক্লিয়ার ফিউশন বিক্রিয়ার মাধ্যমে শক্তি পায়।"
      }
    },
    {
      question: { en: "Which equation explains mass-energy conversion?", bn: "কোন সমীকরণ ভর-শক্তি রূপান্তর ব্যাখ্যা করে?" },
      options: [
        { en: "F = ma", bn: "F = ma" },
        { en: "E = hf", bn: "E = hf" },
        { en: "E = mc²", bn: "E = mc²" },
        { en: "V = IR", bn: "V = IR" }
      ],
      answer: 2,
      explanation: {
        en: "Einstein's equation E = mc² describes how mass converts to energy.",
        bn: "আইনস্টাইনের সমীকরণ E = mc² ভর থেকে শক্তি রূপান্তর ব্যাখ্যা করে।"
      }
    },
    {
      question: { en: "Which is a product of fission?", bn: "ফিশনের ফলে কোনটি উৎপন্ন হয়?" },
      options: [
        { en: "Large nucleus", bn: "বড় নিউক্লিয়াস" },
        { en: "Energy and neutrons", bn: "শক্তি ও নিউট্রন" },
        { en: "Helium gas", bn: "হিলিয়াম গ্যাস" },
        { en: "Photon only", bn: "শুধু ফোটন" }
      ],
      answer: 1,
      explanation: {
        en: "Fission produces energy and free neutrons along with smaller nuclei.",
        bn: "ফিশনের ফলে শক্তি, ফ্রি নিউট্রন এবং ছোট নিউক্লিয়াস তৈরি হয়।"
      }
    },
    {
      question: { en: "What is required for sustained fission reaction?", bn: "একটানা ফিশন বিক্রিয়ার জন্য কী প্রয়োজন?" },
      options: [
        { en: "Chain reaction", bn: "চেইন রিঅ্যাকশন" },
        { en: "Coolant", bn: "কুল্যান্ট" },
        { en: "Helium gas", bn: "হিলিয়াম গ্যাস" },
        { en: "Sunlight", bn: "সূর্যালোক" }
      ],
      answer: 0,
      explanation: {
        en: "Sustained fission relies on a chain reaction of neutron-induced splits.",
        bn: "একটানা ফিশনের জন্য নিউট্রনের চেইন রিঅ্যাকশন প্রয়োজন।"
      }
    }
  ]
}

export default function NuclearReactionsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Nuclear Reactions Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
