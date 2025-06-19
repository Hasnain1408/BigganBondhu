
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "General Relativity Quiz",
    bn: "সাধারণ আপেক্ষিকতা কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of general relativity concepts",
    bn: "সাধারণ আপেক্ষিকতার ধারণা সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does the equivalence principle state?",
        bn: "সমতুল্যতার নীতি কী বলে?"
      },
      options: [
        { en: "Gravity is a force", bn: "মহাকর্ষ একটি বল" },
        { en: "Acceleration and gravity are equivalent", bn: "ত্বরণ এবং মহাকর্ষ সমতুল্য" },
        { en: "Light speed varies", bn: "আলোর গতি পরিবর্তিত হয়" },
        { en: "Time is absolute", bn: "সময় নিরঙ্কুশ" }
      ],
      answer: 1,
      explanation: {
        en: "The equivalence principle states that the effects of acceleration are indistinguishable from those of a gravitational field.",
        bn: "সমতুল্যতার নীতি বলে যে ত্বরণের প্রভাব মহাকর্ষীয় ক্ষেত্রের প্রভাব থেকে পৃথক করা যায় না।"
      }
    },
    {
      question: {
        en: "What causes gravitational time dilation?",
        bn: "মহাকর্ষীয় সময় প্রসারণের কারণ কী?"
      },
      options: [
        { en: "High velocity", bn: "উচ্চ গতি" },
        { en: "Spacetime curvature", bn: "স্থান-কালের বক্রতা" },
        { en: "Light speed", bn: "আলোর গতি" },
        { en: "Magnetic fields", bn: "চৌম্বক ক্ষেত্র" }
      ],
      answer: 1,
      explanation: {
        en: "Gravitational time dilation occurs due to spacetime curvature, causing clocks to run slower in stronger gravitational fields.",
        bn: "মহাকর্ষীয় সময় প্রসারণ স্থান-কালের বক্রতার কারণে ঘটে, যা শক্তিশালী মহাকর্ষীয় ক্ষেত্রে ঘড়িকে ধীরে চলতে বাধ্য করে।"
      }
    },
    {
      question: {
        en: "What do Einstein’s field equations relate?",
        bn: "আইনস্টাইনের ক্ষেত্র সমীকরণ কী সম্পর্কিত করে?"
      },
      options: [
        { en: "Force and mass", bn: "বল এবং ভর" },
        { en: "Spacetime curvature and mass-energy", bn: "স্থান-কালের বক্রতা এবং ভর-শক্তি" },
        { en: "Velocity and time", bn: "গতি এবং সময়" },
        { en: "Light and gravity", bn: "আলো এবং মহাকর্ষ" }
      ],
      answer: 1,
      explanation: {
        en: "Einstein’s field equations (Gμν = 8πTμν) relate spacetime curvature to the distribution of mass and energy.",
        bn: "আইনস্টাইনের ক্ষেত্র সমীকরণ (Gμν = 8πTμν) স্থান-কালের বক্রতাকে ভর এবং শক্তির বণ্টনের সাথে সম্পর্কিত করে।"
      }
    },
    {
      question: {
        en: "What is a geodesic in general relativity?",
        bn: "সাধারণ আপেক্ষিকতায় জিওডেসিক কী?"
      },
      options: [
        { en: "A straight line", bn: "সরল রেখা" },
        { en: "Shortest path in curved spacetime", bn: "বক্র স্থান-কালে সবচেয়ে ছোট পথ" },
        { en: "A gravitational wave", bn: "মহাকর্ষীয় তরঙ্গ" },
        { en: "A black hole", bn: "কৃষ্ণগহ্বর" }
      ],
      answer: 1,
      explanation: {
        en: "A geodesic is the shortest path an object follows in curved spacetime, analogous to a straight line in flat space.",
        bn: "জিওডেসিক হল বক্র স্থান-কালে একটি বস্তু যে সবচেয়ে ছোট পথ অনুসরণ করে, যা সমতল স্থানে সরল রেখার সমতুল্য।"
      }
    },
    {
      question: {
        en: "What phenomenon confirms general relativity by bending light?",
        bn: "কোন ঘটনা আলো বাঁকিয়ে সাধারণ আপেক্ষিকতা নিশ্চিত করে?"
      },
      options: [
        { en: "Time dilation", bn: "সময় প্রসারণ" },
        { en: "Gravitational lensing", bn: "মহাকর্ষীয় লেন্সিং" },
        { en: "Length contraction", bn: "দৈর্ঘ্য সংকোচন" },
        { en: "Doppler effect", bn: "ডপলার প্রভাব" }
      ],
      answer: 1,
      explanation: {
        en: "Gravitational lensing, the bending of light by massive objects, confirms general relativity, as observed during solar eclipses.",
        bn: "মহাকর্ষীয় লেন্সিং, ভরবিশিষ্ট বস্তু দ্বারা আলোর বাঁকানো, সাধারণ আপেক্ষিকতা নিশ্চিত করে, যা সূর্যগ্রহণের সময় পর্যবেক্ষণ করা হয়।"
      }
    }
  ]
}

export default function GeneralRelativityQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">General Relativity Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
