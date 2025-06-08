"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Metabolism Quiz",
    bn: "বিপাক কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of metabolism",
    bn: "বিপাক সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is metabolism?",
        bn: "বিপাক কী?"
      },
      options: [
        { en: "Physical movement", bn: "শারীরিক গতি" },
        { en: "Chemical reactions in cells", bn: "কোষে রাসায়নিক প্রতিক্রিয়া" },
        { en: "Oxygen transport", bn: "অক্সিজেন পরিবহন" },
        { en: "DNA replication", bn: "ডিএনএ প্রতিলিপি" }
      ],
      answer: 1,
      explanation: {
        en: "Metabolism is the set of chemical reactions in cells that sustain life by producing energy and molecules.",
        bn: "বিপাক হল কোষে রাসায়নিক প্রতিক্রিয়ার সমষ্টি যা শক্তি ও অণু উৎপন্ন করে জীবন ধারণ করে।"
      }
    },
    {
      question: {
        en: "Which process breaks down molecules to release energy?",
        bn: "কোন প্রক্রিয়া অণু ভেঙে শক্তি মুক্তি দেয়?"
      },
      options: [
        { en: "Anabolism", bn: "অ্যানাবলিজম" },
        { en: "Catabolism", bn: "ক্যাটাবলিজম" },
        { en: "Photosynthesis", bn: "আলোকসংশ্লেষণ" },
        { en: "Transcription", bn: "ট্রান্সক্রিপশন" }
      ],
      answer: 1,
      explanation: {
        en: "Catabolism breaks down molecules to release energy, while anabolism builds molecules.",
        bn: "ক্যাটাবলিজম অণু ভেঙে শক্তি মুক্তি দেয়, যখন অ্যানাবলিজম অণু তৈরি করে।"
      }
    },
    {
      question: {
        en: "Where does glycolysis occur in the cell?",
        bn: "গ্লাইকোলাইসিস কোষের কোথায় ঘটে?"
      },
      options: [
        { en: "Nucleus", bn: "নিউক্লিয়াস" },
        { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" },
        { en: "Cytoplasm", bn: "সাইটোপ্লাজম" },
        { en: "Endoplasmic reticulum", bn: "এন্ডোপ্লাজমিক রেটিকুলাম" }
      ],
      answer: 2,
      explanation: {
        en: "Glycolysis, the breakdown of glucose, occurs in the cytoplasm of the cell.",
        bn: "গ্লাইকোলাইসিস, গ্লুকোজ ভাঙার প্রক্রিয়া, কোষের সাইটোপ্লাজমে ঘটে।"
      }
    },
    {
      question: {
        en: "What is the primary energy currency of cells?",
        bn: "কোষের প্রাথমিক শক্তি মুদ্রা কী?"
      },
      options: [
        { en: "ADP", bn: "এডিপি" },
        { en: "ATP", bn: "এটিপি" },
        { en: "NADH", bn: "এনএডিএইচ" },
        { en: "Glucose", bn: "গ্লুকোজ" }
      ],
      answer: 1,
      explanation: {
        en: "ATP (adenosine triphosphate) is the primary energy currency used in cellular processes.",
        bn: "এটিপি (অ্যাডেনোসিন ট্রাইফসফেট) কোষীয় প্রক্রিয়ায় ব্যবহৃত প্রাথমিক শক্তি মুদ্রা।"
      }
    },
    {
      question: {
        en: "Which metabolic pathway occurs in mitochondria?",
        bn: "কোন বিপাকীয় পথ মাইটোকন্ড্রিয়ায় ঘটে?"
      },
      options: [
        { en: "Glycolysis", bn: "গ্লাইকোলাইসিস" },
        { en: "Krebs Cycle", bn: "ক্রেবস চক্র" },
        { en: "Fermentation", bn: "গাঁজন" },
        { en: "Gluconeogenesis", bn: "গ্লুকোনিওজেনেসিস" }
      ],
      answer: 1,
      explanation: {
        en: "The Krebs Cycle, part of cellular respiration, occurs in the mitochondria, producing ATP.",
        bn: "ক্রেবস চক্র, কোষীয় শ্বসনের অংশ, মাইটোকন্ড্রিয়ায় ঘটে এবং এটিপি উৎপন্ন করে।"
      }
    }
  ]
}

export default function MetabolismQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            {quizData.title.en}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}