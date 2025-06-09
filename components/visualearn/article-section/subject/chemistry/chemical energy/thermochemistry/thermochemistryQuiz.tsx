
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Thermochemistry Quiz",
    bn: "তাপরসায়ন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of thermochemistry",
    bn: "তাপরসায়ন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does thermochemistry study?",
        bn: "তাপরসায়ন কী অধ্যয়ন করে?"
      },
      options: [
        { en: "Atomic structure", bn: "পরমাণুর গঠান" },
        { en: "Heat changes in reactions", bn: "বিক্রিয়ায় তাপ পরিবর্তন" },
        { en: "Molecular weight", bn: "আণবিক ভর" },
        { en: "Gas laws", bn: "গ্যাসের সূত্র" }
      ],
      answer: 1,
      explanation: {
        en: "Thermochemistry studies heat changes in chemical and physical processes.",
        bn: "তাপরসায়ন রাসায়নিক এবং ভৌত প্রক্রিয়ায় তাপ পরিবর্তন অধ্যয়ন করে।"
      }
    },
    {
      question: {
        en: "Which process is exothermic?",
        bn: "কোন প্রক্রিয়া এক্সোথার্মিক?"
      },
      options: [
        { en: "Evaporation", bn: "বাষ্পীভবন" },
        { en: "Combustion", bn: "দহন" },
        { en: "Melting", bn: "Melting" },
        { en: "Sublimation", bn: "উর্ধ্বপাতন" }
      ],
      answer: 1,
      explanation: {
        en: "Combustion releases heat, making it exothermic.",
        bn: "দহন তাপ নির্গত করে, তাই এটি এক্সোথার্মিক।"
      }
    },
    {
      question: {
        en: "What is specific heat capacity?",
        bn: "নির্দিষ্ট তাপ ধারণক্ষমতা কী?"
      },
      options: [
        { en: "Heat to change temperature", bn: "তাপমাত্রা পরিবর্তনের তাপ" },
        { en: "Heat to change phase", bn: "Phase পরিবর্তনের তাপ" },
        { en: "Total heat in a substance", bn: "পদার্থের মোট তাপ" },
        { en: "Heat of reaction", bn: "বিক্রিয়ার তাপ" }
      ],
      answer:0,
      explanation: {
        en: "Specific heat capacity is the heat required to raise 1g of a substance by 1°C.",
        bn: "নির্দিষ্ট তাপ ধারণক্ষমতা হল ১ গ্রাম পদার্থের তাপমাত্রা ১°C বাড়াতে প্রয়োজনীয় তাপ।"
      }
    },
    {
      question: {
        en: "Which process absorbs heat?",
        bn: "কোন প্রক্রিয়া তাপ শোষণ করে?"
      },
      options: [
        { en: "Condensation", bn: "ঘনীভবন" },
        { en: "Evaporation", bn: "বাষ্পীভবন" },
        { en: "Freezing", bn: "জমাট বাঁধা" },
        { en: "Combustion", bn: "দহন" }
      ],
      answer: 1,
      explanation: {
        en: "Evaporation absorbs heat from the surroundings, making it endothermic.",
        bn: "বাষ্পীভবন পরিবেশ থেকে তাপ শোষণ করে, তাই এটি এন্ডোথার্মিক।"
      }
    },
    {
      question: {
        en: "What is an example of a thermochemistry application?",
        bn: "তাপরসায়নের একটি প্রয়োগের উদাহরণ কী?"
      },
      options: [
        { en: "Fuel efficiency in engines", bn: "ইঞ্জিনে জ্বালানি দক্ষতা" },
        { en: "Atomic structure analysis", bn: "পরমাণুর গঠন বিশ্লেষণ" },
        { en: "pH measurement", bn: "pH পরিমাপ" },
        { en: "Molecular synthesis", bn: "আণবিক সংশ্লেষণ" }
      ],
      answer: 0,
      explanation: {
        en: "Thermochemistry is applied in fuel efficiency to optimize combustion reactions.",
        bn: "তাপরসায়ন জ্বলন বিক্রিয়া অপ্টিমাইজ করতে জ্বালানি দক্ষতায় প্রয়োগ হয়।"
      }
    }
  ]
}

export default function ThermochemistryQuiz() {
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