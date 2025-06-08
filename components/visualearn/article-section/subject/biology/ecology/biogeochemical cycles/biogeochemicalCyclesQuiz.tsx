// biogeochemicalCyclesQuiz.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizContent } from "../../../../quiz/types";
import QuizControls from "../../../../quiz/quizControls";

const quizData: QuizContent = {
  title: {
    en: "Biogeochemical Cycles Quiz",
    bn: "জৈবভূ-রাসায়নিক চক্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Earth's nutrient cycles",
    bn: "পৃথিবীর পুষ্টি চক্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which process converts atmospheric nitrogen into ammonia?",
        bn: "কোন প্রক্রিয়া বায়ুমণ্ডলীয় নাইট্রোজেনকে অ্যামোনিয়ায় রূপান্তরিত করে?"
      },
      options: [
        { en: "Nitrogen fixation", bn: "নাইট্রোজেন স্থিরীকরণ" },
        { en: "Denitrification", bn: "ডিনাইট্রিফিকেশন" },
        { en: "Ammonification", bn: "অ্যামোনিফিকেশন" },
        { en: "Nitrification", bn: "নাইট্রিফিকেশন" }
      ],
      answer: 0,
      explanation: {
        en: "Nitrogen fixation is performed by certain bacteria that convert N₂ into NH₃ (ammonia).",
        bn: "নাইট্রোজেন স্থিরীকরণ কিছু ব্যাকটেরিয়া দ্বারা সম্পাদিত হয় যা N₂ কে NH₃ (অ্যামোনিয়া) তে রূপান্তর করে।"
      }
    },
    {
      question: {
        en: "What is the primary reservoir for the phosphorus cycle?",
        bn: "ফসফরাস চক্রের প্রাথমিক আধার কী?"
      },
      options: [
        { en: "Rocks and sediments", bn: "শিলা এবং পলি" },
        { en: "Atmosphere", bn: "বায়ুমণ্ডল" },
        { en: "Oceans", bn: "মহাসাগর" },
        { en: "Living organisms", bn: "জীবন্ত জীব" }
      ],
      answer: 0,
      explanation: {
        en: "Phosphorus is mainly stored in rocks and sediments, unlike carbon and nitrogen which have atmospheric reservoirs.",
        bn: "ফসফরাস প্রধানত শিলা এবং পলিতে সংরক্ষিত থাকে, কার্বন এবং নাইট্রোজেনের মতো নয় যার বায়ুমণ্ডলীয় আধার রয়েছে।"
      }
    },
    {
      question: {
        en: "Which process returns carbon to the atmosphere through decomposition?",
        bn: "কোন প্রক্রিয়া পচনের মাধ্যমে কার্বনকে বায়ুমণ্ডলে ফেরত দেয়?"
      },
      options: [
        { en: "Respiration", bn: "শ্বসন" },
        { en: "Photosynthesis", bn: "সালোকসংশ্লেষণ" },
        { en: "Combustion", bn: "দহন" },
        { en: "Sedimentation", bn: "অবক্ষেপণ" }
      ],
      answer: 0,
      explanation: {
        en: "Decomposers break down organic matter and release CO₂ back to the atmosphere through respiration.",
        bn: "ডিকম্পোজারগুলি জৈব পদার্থ ভেঙে দেয় এবং শ্বসনের মাধ্যমে CO₂ কে বায়ুমণ্ডলে ফেরত দেয়।"
      }
    },
    {
      question: {
        en: "What human activity has significantly altered the nitrogen cycle?",
        bn: "কোন মানবিক কার্যকলাপ নাইট্রোজেন চক্রকে উল্লেখযোগ্যভাবে পরিবর্তন করেছে?"
      },
      options: [
        { en: "Fertilizer production", bn: "সার উৎপাদন" },
        { en: "Deforestation", bn: "বন উজাড়" },
        { en: "Burning fossil fuels", bn: "জীবাশ্ম জ্বালানি পোড়ানো" },
        { en: "Urbanization", bn: "নগরায়ন" }
      ],
      answer: 0,
      explanation: {
        en: "The Haber-Bosch process for synthetic fertilizer production has doubled Earth's nitrogen fixation rate.",
        bn: "সিন্থেটিক সার উৎপাদনের জন্য হ্যাবার-বোশ প্রক্রিয়া পৃথিবীর নাইট্রোজেন স্থিরীকরণের হার দ্বিগুণ করেছে।"
      }
    },
    {
      question: {
        en: "Which biogeochemical cycle lacks a significant atmospheric component?",
        bn: "কোন জৈবভূ-রাসায়নিক চক্রে একটি উল্লেখযোগ্য বায়ুমণ্ডলীয় উপাদান নেই?"
      },
      options: [
        { en: "Phosphorus cycle", bn: "ফসফরাস চক্র" },
        { en: "Carbon cycle", bn: "কার্বন চক্র" },
        { en: "Nitrogen cycle", bn: "নাইট্রোজেন চক্র" },
        { en: "Water cycle", bn: "জল চক্র" }
      ],
      answer: 0,
      explanation: {
        en: "The phosphorus cycle moves through lithosphere, hydrosphere and biosphere but has minimal atmospheric exchange.",
        bn: "ফসফরাস চক্র লিথোস্ফিয়ার, হাইড্রোস্ফিয়ার এবং বায়োস্ফিয়ারের মধ্য দিয়ে চলে কিন্তু বায়ুমণ্ডলীয় বিনিময় ন্যূনতম।"
      }
    }
  ]
};

export default function BiogeochemicalCyclesQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Biology Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  );
}