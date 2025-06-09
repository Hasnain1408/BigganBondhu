
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Chemical Processes Quiz",
    bn: "রাসায়নিক প্রক্রিয়া কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of chemical processes",
    bn: "রাসায়নিক প্রক্রিয়া সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is a chemical process?",
        bn: "রাসায়নিক প্রক্রিয়া কী?"
      },
      options: [
        { en: "Physical change of state", bn: "ভৌত অবস্থার পরিবর্তন" },
        { en: "Transformation via chemical reactions", bn: "রাসায়নিক বিক্রিয়ার মাধ্যমে রূপান্তর" },
        { en: "Temperature measurement", bn: "তাপমাত্রা পরিমাপ" },
        { en: "Pressure adjustment", bn: "চাপ সমন্বয়" }
      ],
      answer: 1,
      explanation: {
        en: "A chemical process involves transforming materials through chemical reactions.",
        bn: "রাসায়নিক প্রক্রিয়া রাসায়নিক বিক্রিয়ার মাধ্যমে পদার্থের রূপান্তর করে।"
      }
    },
    {
      question: {
        en: "What is an example of an industrial chemical process?",
        bn: "শিল্প রাসায়নিক প্রক্রিয়ার একটি উদাহরণ কী?"
      },
      options: [
        { en: "Photosynthesis", bn: "ফটোসিন্থেসিস" },
        { en: "Haber-Bosch process", bn: "হাবের-বোশ প্রক্রিয়া" },
        { en: "Respiration", bn: "শ্বসন" },
        { en: "Evaporation", bn: "বাষ্পীভবন" }
      ],
      answer: 1,
      explanation: {
        en: "The Haber-Bosch process synthesizes ammonia, an industrial chemical process.",
        bn: "হাবের-বোশ প্রক্রিয়া অ্যামোনিয়া সংশ্লেষণ করে, একটি শিল্প রাসায়নিক প্রক্রিয়া।"
      }
    },
    {
      question: {
        en: "What factor affects chemical process efficiency?",
        bn: "কোন উপাদান রাসায়নিক প্রক্রিয়ার দক্ষতাকে প্রভাবিত করে?"
      },
      options: [
        { en: "Color of reactants", bn: "প্রতিক্রিয়কের রং" },
        { en: "Temperature and pressure", bn: "তাপমাত্রা এবং চাপ" },
        { en: "Shape of container", bn: "পাত্রের আকৃতি" },
        { en: "Light intensity", bn: "আলোর তীব্রতা" }
      ],
      answer: 1,
      explanation: {
        en: "Temperature and pressure significantly affect the efficiency of chemical processes.",
        bn: "তাপমাত্রা এবং চাপ রাসায়নিক প্রক্রিয়ার দক্ষতাকে উল্লেখযোগ্যভাবে প্রভাবিত করে।"
      }
    },
    {
      question: {
        en: "What is a key component of a chemical process?",
        bn: "রাসায়নিক প্রক্রিয়ার একটি মূল উপাদান কী?"
      },
      options: [
        { en: "Reactants", bn: "প্রতিক্রিয়ক" },
        { en: "Electrical charge", bn: "বৈদ্যুতিক চার্জ" },
        { en: "Sound waves", bn: "শব্দ তরঙ্গ" },
        { en: "Magnetic fields", bn: "চৌম্বক ক্ষেত্র" }
      ],
      answer: 0,
      explanation: {
        en: "Reactants are the starting materials in a chemical process.",
        bn: "প্রতিক্রিয়ক হল রাসায়নিক প্রক্রিয়ার প্রারম্ভিক পদার্থ।"
      }
    },
    {
      question: {
        en: "What is an application of chemical processes?",
        bn: "রাসায়নিক প্রক্রিয়ার একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Measuring wind speed", bn: "বাতাসের গতি পরিমাপ" },
        { en: "Fertilizer production", bn: "সার উৎপাদন" },
        { en: "Calculating distance", bn: "দূরত্ব গণনা" },
        { en: "Recording sound", bn: "শব্দ রেকর্ডিং" }
      ],
      answer: 1,
      explanation: {
        en: "Chemical processes are used in fertilizer production, e.g., via the Haber-Bosch process.",
        bn: "রাসায়নিক প্রক্রিয়া সার উৎপাদনে ব্যবহৃত হয়, যেমন হাবের-বোশ প্রক্রিয়ার মাধ্যমে।"
      }
    }
  ]
}

export default function ChemicalProcessesQuiz() {
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