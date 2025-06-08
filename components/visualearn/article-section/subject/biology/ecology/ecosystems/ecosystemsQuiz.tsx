"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Ecosystems Quiz",
    bn: "ইকোসিস্টেম কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of ecosystems",
    bn: "ইকোসিস্টেম সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is a primary component of an ecosystem?",
        bn: "ইকোসিস্টেমের একটি প্রাথমিক উপাদান কী?"
      },
      options: [
        { en: "Biotic factors", bn: "জৈবিক উপাদান" },
        { en: "Rocks", bn: "পাথর" },
        { en: "Clouds", bn: "মেঘ" },
        { en: "Buildings", bn: "ভবন" }
      ],
      answer: 0,
      explanation: {
        en: "Biotic factors, such as plants and animals, are living components that interact within ecosystems.",
        bn: "জৈবিক উপাদান, যেমন উদ্ভিদ এবং প্রাণী, ইকোসিস্টেমের মধ্যে মিথস্ক্রিয়া করে।"
      }
    },
    {
      question: {
        en: "What type of ecosystem includes oceans?",
        bn: "কোন ধরণের ইকোসিস্টেমে মহাসাগর অন্তর্ভুক্ত?"
      },
      options: [
        { en: "Terrestrial", bn: "স্থলজ" },
        { en: "Aquatic", bn: "جলজ" },
        { en: "Desert", bn: "মরুভূমি" },
        { en: "Grassland", bn: "তৃণভূমি" }
      ],
      answer: 1,
      explanation: {
        en: "Aquatic ecosystems include water-based environments like oceans and lakes.",
        bn: "জলজ ইকোসিস্টেমে জলভিত্তিক পরিবেশ যেমন মহাসাগর এবং হ্রদ অন্তর্ভুক্ত।"
      }
    },
    {
      question: {
        en: "What is the primary source of energy in most ecosystems?",
        bn: "বেশিরভাগ ইকোসিস্টেমে শক্তির প্রাথমিক উৎস কী?"
      },
      options: [
        { en: "Wind", bn: "বাতাস" },
        { en: "Sunlight", bn: "سূর্য আলোক" },
        { en: "Geothermal", bn: "ভূতাপীয়" },
        { en: "Fossil fuels", bn: "জীবাশ্ম জ্বালানি" }
      ],
      answer: 1,
      explanation: {
        en: "Sunlight is the primary energy source, driving photosynthesis in ecosystems.",
        bn: "সূর্যালোক প্রাথমিক শক্তির উৎস, ইকোসিস্টেমে আলোকসংশ্লেষণ চালায়।"
      }
    },
    {
      question: {
        en: "What process recycles nutrients in an ecosystem?",
        bn: "ইকোসিস্টেমে কোন প্রক্রিয়া পুষ্টি পুনঃচক্রণ করে?"
      },
      options: [
        { en: "Energy flow", bn: "শক্তি প্রবাহ" },
        { en: "Nutrient cycling", bn: "পুষ্টি চক্র" },
        { en: "Photosynthesis", bn: "আলোকসংশ্লেষণ" },
        { en: "Respiration", bn: "শ্বসন" }
      ],
      answer: 1,
      explanation: {
        en: "Nutrient cycling recycles essential elements like carbon and nitrogen through biotic and abiotic components.",
        bn: "পুষ্টি চক্র কার্বন এবং নাইট্রোজেনের মতো প্রয়োজনীয় উপাদান জৈবিক এবং অজৈবিক উপাদানের মাধ্যমে পুনঃচক্রণ করে।"
      }
    },
    {
      question: {
        en: "What is an example of an abiotic factor?",
        bn: "অজৈবিক উপাদানের একটি উদাহরণ কী?"
      },
      options: [
        { en: "Trees", bn: "গাছ" },
        { en: "Animals", bn: "প্রাণী" },
        { en: "Water", bn: "পানি" },
        { en: "Bacteria", bn: "ব্যাকটেরিয়া" }
      ],
      answer: 2,
      explanation: {
        en: "Water is an abiotic factor, a non-living component that influences ecosystems.",
        bn: "পানি একটি অজৈবিক উপাদান, একটি অ-জীবন্ত উপাদান যা ইকোসিস্টেমকে প্রভাবিত করে।"
      }
    }
  ]
};

export default function EcosystemsQuiz() {
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
  );
}