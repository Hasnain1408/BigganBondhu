
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Magnetic Field Quiz",
    bn: "চৌম্বক ক্ষেত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Magnetic Fields",
    bn: "চৌম্বক ক্ষেত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the unit of magnetic field strength?",
        bn: "চৌম্বক ক্ষেত্রের শক্তির একক কী?"
      },
      options: [
        { en: "Tesla", bn: "টেসলা" },
        { en: "Newton", bn: "নিউটন" },
        { en: "Joule", bn: "জুল" },
        { en: "Watt", bn: "ওয়াট" }
      ],
      answer: 0,
      explanation: {
        en: "The unit of magnetic field strength is Tesla (T).",
        bn: "চৌম্বক ক্ষেত্রের শক্তির একক হল টেসলা (T)।"
      }
    },
    {
      question: {
        en: "What is the formula for the force on a moving charge in a magnetic field?",
        bn: "চৌম্বক ক্ষেত্রে গতিশীল চার্জের উপর শক্তির সূত্র কী?"
      },
      options: [
        { en: "F = qvB sinθ", bn: "F = qvB sinθ" },
        { en: "F = qvB", bn: "F = qvB" },
        { en: "F = qB/v", bn: "F = qB/v" },
        { en: "F = qv/B", bn: "F = qv/B" }
      ],
      answer: 0,
      explanation: {
        en: "The force is given by F = qvB sinθ, where θ is the angle between v and B.",
        bn: "শক্তি F = qvB sinθ দ্বারা দেওয়া হয়, যেখানে θ হল v এবং B-এর মধ্যে কোণ।"
      }
    },
    {
      question: {
        en: "What determines the direction of the magnetic field around a current-carrying wire?",
        bn: "বিদ্যুৎ প্রবাহিত তারের চারপাশে চৌম্বক ক্ষেত্রের দিক কী নির্ধারণ করে?"
      },
      options: [
        { en: "Left-hand rule", bn: "বাম হাতের নিয়ম" },
        { en: "Right-hand rule", bn: "ডান হাতের নিয়ম" },
        { en: "Newton’s law", bn: "নিউটনের সূত্র" },
        { en: "Coulomb’s law", bn: "কুলম্বের সূত্র" }
      ],
      answer: 1,
      explanation: {
        en: "The right-hand rule determines the field direction around a current-carrying wire.",
        bn: "ডান হাতের নিয়ম বিদ্যুৎ প্রবাহিত তারের চারপাশে ক্ষেত্রের দিক নির্ধারণ করে।"
      }
    },
    {
      question: {
        en: "What is an example of a magnetic field source?",
        bn: "চৌম্বক ক্ষেত্রের উৎসের একটি উদাহরণ কী?"
      },
      options: [
        { en: "Static charge", bn: "স্থির চার্জ" },
        { en: "Current-carrying wire", bn: "বিদ্যুৎ প্রবাহিত তার" },
        { en: "Insulator", bn: "অপরিবাহী" },
        { en: "Light wave", bn: "আলোর তরঙ্গ" }
      ],
      answer: 1,
      explanation: {
        en: "A current-carrying wire generates a magnetic field.",
        bn: "বিদ্যুৎ প্রবাহিত তার চৌম্বক ক্ষেত্র উৎপন্ন করে।"
      }
    },
    {
      question: {
        en: "What is an application of magnetic fields?",
        bn: "চৌম্বক ক্ষেত্রের একটি প্রয়োগ কী?"
      },
      options: [
        { en: "Gas compression", bn: "গ্যাস সংকোচন" },
        { en: "MRI scanning", bn: "এমআরআই স্ক্যানিং" },
        { en: "Thermal insulation", bn: "তাপ নিরোধক" },
        { en: "Chemical synthesis", bn: "রাসায়নিক সংশ্লেষণ" }
      ],
      answer: 1,
      explanation: {
        en: "MRI scanning uses strong magnetic fields.",
        bn: "এমআরআই স্ক্যানিং শক্তিশালী চৌম্বক ক্ষেত্র ব্যবহার করে।"
      }
    }
  ]
}

export default function MagneticFieldQuiz() {
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
