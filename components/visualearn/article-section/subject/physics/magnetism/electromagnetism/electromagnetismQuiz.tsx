
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Electromagnetism Quiz",
    bn: "তড়িৎচুম্বকত্ব কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Electromagnetism",
    bn: "তড়িৎচুম্বকত্ব সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does electromagnetism study?",
        bn: "তড়িৎচুম্বকত্ব কী অধ্যয়ন করে?"
      },
      options: [
        { en: "Electric and magnetic fields", bn: "বিদ্যুৎ ও চৌম্বক ক্ষেত্র" },
        { en: "Gas behavior", bn: "গ্যাসের আচরণ" },
        { en: "Thermal energy", bn: "তাপ শক্তি" },
        { en: "Gravitational forces", bn: "মাধ্যাকর্ষণ শক্তি" }
      ],
      answer: 0,
      explanation: {
        en: "Electromagnetism studies the interactions between electric and magnetic fields.",
        bn: "তড়িৎচুম্বকত্ব বিদ্যুৎ ও চৌম্বক ক্ষেত্রের মিথস্ক্রিয়া অধ্যয়ন করে।"
      }
    },
    {
      question: {
        en: "What is the speed of electromagnetic waves in a vacuum?",
        bn: "শূন্য মাধ্যমে তড়িৎচুম্বকীয় তরঙ্গের গতি কত?"
      },
      options: [
        { en: "3 × 10⁸ m/s", bn: "3 × 10⁸ m/s" },
        { en: "3 × 10⁶ m/s", bn: "3 × 10⁶ m/s" },
        { en: "9.8 m/s²", bn: "9.8 m/s²" },
        { en: "1.38 × 10⁻²³ m/s", bn: "1.38 × 10⁻²³ m/s" }
      ],
      answer: 0,
      explanation: {
        en: "Electromagnetic waves travel at the speed of light, 3 × 10⁸ m/s in a vacuum.",
        bn: "তড়িৎচুম্বকীয় তরঙ্গ শূন্য মাধ্যমে আলোর গতিতে, 3 × 10⁸ m/s-এ চলে।"
      }
    },
    {
      question: {
        en: "What generates a magnetic field according to electromagnetism?",
        bn: "তড়িৎচুম্বকত্ব অনুসারে কী চৌম্বক ক্ষেত্র উৎপন্ন করে?"
      },
      options: [
        { en: "Static charge", bn: "স্থির চার্জ" },
        { en: "Moving charge", bn: "গতিশীল চার্জ" },
        { en: "Insulator", bn: "অপরিবাহী" },
        { en: "Gravity", bn: "মাধ্যাকর্ষণ" }
      ],
      answer: 1,
      explanation: {
        en: "A moving charge (current) generates a magnetic field.",
        bn: "গতিশীল চার্জ (বিদ্যুৎ প্রবাহ) চৌম্বক ক্ষেত্র উৎপন্ন করে।"
      }
    },
    {
      question: {
        en: "What is an example of an electromagnetic wave?",
        bn: "তড়িৎচুম্বকীয় তরঙ্গের একটি উদাহরণ কী?"
      },
      options: [
        { en: "Sound wave", bn: "শব্দ তরঙ্গ" },
        { en: "Radio wave", bn: "রেডিও তরঙ্গ" },
        { en: "Water wave", bn: "পানির তরঙ্গ" },
        { en: "Seismic wave", bn: "ভূকম্প তরঙ্গ" }
      ],
      answer: 1,
      explanation: {
        en: "Radio waves are electromagnetic waves.",
        bn: "রেডিও তরঙ্গ তড়িৎচুম্বকীয় তরঙ্গ।"
      }
    },
    {
      question: {
        en: "What is an application of electromagnetism?",
        bn: "তড়িৎচুম্বকত্বের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Gas compression", bn: "গ্যাস সংকোচন" },
        { en: "Transformer design", bn: "ট্রান্সফরমার ডিজাইন" },
        { en: "Thermal insulation", bn: "তাপ নিরোধক" },
        { en: "Chemical synthesis", bn: "রাসায়নিক সংশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "Transformers rely on electromagnetic principles.",
        bn: "ট্রান্সফরমার তড়িৎচুম্বকীয় নীতির উপর নির্ভর করে।"
      }
    }
  ]
}

export default function ElectromagnetismQuiz() {
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
