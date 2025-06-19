
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Radioactivity Quiz",
    bn: "তেজস্ক্রিয়তা কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Radioactivity",
    bn: "তেজস্ক্রিয়তা সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is radioactivity?",
        bn: "তেজস্ক্রিয়তা কী?"
      },
      options: [
        { en: "Emission from unstable nuclei", bn: "অস্থির নিউক্লিয়াস থেকে নির্গমন" },
        { en: "Heat transfer", bn: "তাপ স্থানান্তর" },
        { en: "Light reflection", bn: "আলোর প্রতিফলন" },
        { en: "Sound propagation", bn: "শব্দ প্রচার" }
      ],
      answer: 0,
      explanation: {
        en: "Radioactivity is the emission of particles or radiation from unstable nuclei.",
        bn: "তেজস্ক্রিয়তা হল অস্থির নিউক্লিয়াস থেকে কণা বা বিকিরণের নির্গমন।"
      }
    },
    {
      question: {
        en: "What particle is emitted in alpha decay?",
        bn: "আলফা ক্ষয়ে কোন কণা নির্গত হয়?"
      },
      options: [
        { en: "Electron", bn: "ইলেকট্রন" },
        { en: "Photon", bn: "ফোটন" },
        { en: "Helium nucleus", bn: "হিলিয়াম নিউক্লিয়াস" },
        { en: "Neutron", bn: "নিউট্রন" }
      ],
      answer: 2,
      explanation: {
        en: "Alpha decay emits a helium nucleus (2 protons, 2 neutrons).",
        bn: "আলফা ক্ষয়ে হিলিয়াম নিউক্লিয়াস (২ প্রোটন, ২ নিউট্রন) নির্গত হয়।"
      }
    },
    {
      question: {
        en: "What is the unit of radioactivity?",
        bn: "তেজস্ক্রিয়তার একক কী?"
      },
      options: [
        { en: "Joule", bn: "জুল" },
        { en: "Becquerel", bn: "বেকারেল" },
        { en: "Tesla", bn: "টেসলা" },
        { en: "Watt", bn: "ওয়াট" }
      ],
      answer: 1,
      explanation: {
        en: "The unit of radioactivity is Becquerel (Bq), measuring decays per second.",
        bn: "তেজস্ক্রিয়তার একক হল বেকারেল (Bq), যা প্রতি সেকেন্ডে ক্ষয় পরিমাপ করে।"
      }
    },
    {
      question: {
        en: "What is half-life?",
        bn: "অর্ধায়ু কী?"
      },
      options: [
        { en: "Time for complete decay", bn: "সম্পূর্ণ ক্ষয়ের সময়" },
        { en: "Time for half decay", bn: "অর্ধেক ক্ষয়ের সময়" },
        { en: "Time for radiation absorption", bn: "বিকিরণ শোষণের সময়" },
        { en: "Time for nuclear fusion", bn: "পারমাণবিক সংযোজনের সময়" }
      ],
      answer: 1,
      explanation: {
        en: "Half-life is the time taken for half of the radioactive atoms to decay.",
        bn: "অর্ধায়ু হল তেজস্ক্রিয় কণার অর্ধেক ক্ষয় হতে যে সময় লাগে।"
      }
    },
    {
      question: {
        en: "What is an application of radioactivity?",
        bn: "তেজস্ক্রিয়তার একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Carbon dating", bn: "কার্বন ডেটিং" },
        { en: "Gas compression", bn: "গ্যাস সংকোচন" },
        { en: "Circuit design", bn: "সার্কিট ডিজাইন" },
        { en: "Thermal insulation", bn: "তাপ নিরোধক" }
      ],
      answer: 0,
      explanation: {
        en: "Carbon dating uses radioactivity to determine the age of organic materials.",
        bn: "কার্বন ডেটিং তেজস্ক্রিয়তা ব্যবহার করে জৈব পদার্থের বয়স নির্ধারণ করে।"
      }
    }
  ]
}

export default function RadioactivityQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Physics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
