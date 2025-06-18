
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Physical vs Chemical Changes Quiz",
    bn: "ভৌত বনাম রাসায়নিক পরিবর্তন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Physical vs Chemical Changes",
    bn: "ভৌত এবং রাসায়নিক পরিবর্তন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is a physical change?",
        bn: "ভৌত পরিবর্তন কী?"
      },
      options: [
        { en: "Forms new substances", bn: "নতুন পদার্থ তৈরি করে" },
        { en: "Changes form, not composition", bn: "রূপ পরিবর্তন, গঠন নয়" },
        { en: "Involves new chemical bonds", bn: "নতুন রাসায়নিক বন্ধন জড়িত" },
        { en: "Produces heat only", bn: "কেবল তাপ উৎপন্ন করে" }
      ],
      answer: 1,
      explanation: {
        en: "A physical change alters form or state but not composition.",
        bn: "ভৌত পরিবর্তন রূপ বা অবস্থা পরিবর্তন করে কিন্তু গঠন নয়।"
      }
    },
    {
      question: {
        en: "Which is an example of a chemical change?",
        bn: "রাসায়নিক পরিবর্তনের উদাহরণ কোনটি?"
      },
      options: [
        { en: "Cutting paper", bn: "কাগজ কাটা" },
        { en: "Burning wood", bn: "কাঠ পোড়ানো" },
        { en: "Melting ice", bn: "বরফ গলা" },
        { en: "Boiling water", bn: "পানি ফোটানো" }
      ],
      answer: 1,
      explanation: {
        en: "Burning wood forms new substances, a chemical change.",
        bn: "কাঠ পোড়ানো নতুন পদার্থ তৈরি করে, এটি রাসায়নিক পরিবর্তন।"
      }
    },
    {
      question: {
        en: "What indicates a chemical change?",
        bn: "রাসায়নিক পরিবর্তনের সূচক কী?"
      },
      options: [
        { en: "Change in shape", bn: "আকৃতির পরিবর্তন" },
        { en: "Formation of gas", bn: "গ্যাস গঠন" },
        { en: "Change in size", bn: "আকারের পরিবর্তন" },
        { en: "Change in state", bn: "অবস্থার পরিবর্তন" }
      ],
      answer: 1,
      explanation: {
        en: "Formation of gas often indicates a chemical change.",
        bn: "গ্যাস গঠন প্রায়শই রাসায়নিক পরিবর্তনের সূচক।"
      }
    },
    {
      question: {
        en: "Which is typically reversible?",
        bn: "কোনটি সাধারণত বিপরীতমুখী?"
      },
      options: [
        { en: "Burning", bn: "পোড়ানো" },
        { en: "Rusting", bn: "মরিচা পড়া" },
        { en: "Freezing", bn: "জমা" },
        { en: "Cooking", bn: "রান্না" }
      ],
      answer: 2,
      explanation: {
        en: "Freezing is a physical change and typically reversible.",
        bn: "জমা একটি ভৌত পরিবর্তন এবং সাধারণত বিপরীতমুখী।"
      }
    },
    {
      question: {
        en: "What is an application of physical changes?",
        bn: "ভৌত পরিবর্তনের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Digesting food", bn: "খাবার হজম" },
        { en: "Recycling plastics", bn: "প্লাস্টিক পুনর্ব্যবহার" },
        { en: "Burning fuel", bn: "জ্বালানি পোড়ানো" },
        { en: "Baking bread", bn: "রুটি বেকিং" }
      ],
      answer: 1,
      explanation: {
        en: "Recycling plastics involves physical changes like melting.",
        bn: "প্লাস্টিক পুনর্ব্যবহারে গলনের মতো ভৌত পরিবর্তন জড়িত।"
      }
    }
  ]
}

export default function PhysicalVsChemChangesQuiz() {
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
