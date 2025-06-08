"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Conservation Biology Quiz",
    bn: "সংরক্ষণ জীববিজ্ঞান কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of conservation biology",
    bn: "সংরক্ষণ জীববিজ্ঞান সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary goal of conservation biology?",
        bn: "সংরক্ষণ জীববিজ্ঞানের প্রাথমিক লক্ষ্য কী?"
      },
      options: [
        { en: "Increase pollution", bn: "দূষণ বৃদ্ধি" },
        { en: "Protect biodiversity", bn: "জৈববৈচিত্র্য রক্ষা" },
        { en: "Promote deforestation", bn: "বন উজাড় প্রচার" },
        { en: "Reduce water supply", bn: "পানি সরবরাহ হ্রাস" }
      ],
      answer: 1,
      explanation: {
        en: "Conservation biology aims to protect biodiversity, including species, ecosystems, and genetic diversity.",
        bn: "সংরক্ষণ জীববিজ্ঞান জৈববৈচিত্র্য রক্ষা করতে চায়, যার মধ্যে প্রজাতি, ইকোসিস্টেম এবং জিনগত বৈচিত্র্য অন্তর্ভুক্ত।"
      }
    },
    {
      question: {
        en: "What is an example of a protected area?",
        bn: "সংরক্ষিত এলাকার একটি উদাহরণ কী?"
      },
      options: [
        { en: "Urban city", bn: "শহুরে শহর" },
        { en: "National park", bn: "জাতীয় উদ্যান" },
        { en: "Industrial zone", bn: "শিল্প এলাকা" },
        { en: "Farmland", bn: "কৃষিজমি" }
      ],
      answer: 1,
      explanation: {
        en: "National parks are protected areas established to conserve wildlife and natural resources.",
        bn: "জাতীয় উদ্যান সংরক্ষিত এলাকা, যা বন্যপ্রাণী এবং প্রাকৃতিক সম্পদ সংরক্ষণের জন্য প্রতিষ্ঠিত।"
      }
    },
    {
      question: {
        en: "What is a major cause of biodiversity loss?",
        bn: "জৈববৈচিত্র্য হ্রাসের প্রধান কারণ কী?"
      },
      options: [
        { en: "Reforestation", bn: "বনায়ন" },
        { en: "Habitat loss", bn: "আবাসস্থল হ্রাস" },
        { en: "Species reintroduction", bn: "প্রজাতি পুনঃঅধিষ্ঠান" },
        { en: "Sustainable farming", bn: "টেকসই কৃষি" }
      ],
      answer: 1,
      explanation: {
        en: "Habitat loss, often due to deforestation or urbanization, is a major cause of biodiversity loss.",
        bn: "আবাসস্থল হ্রাস, প্রায়শই বন উজাড় বা নগরায়নের কারণে, জৈববৈচিত্র্য হ্রাসের প্রধান কারণ।"
      }
    },
    {
      question: {
        en: "What does species reintroduction involve?",
        bn: "প্রজাতি পুনঃঅধিষ্ঠান কী জড়িত?"
      },
      options: [
        { en: "Removing species", bn: "প্রজাতি অপসারণ" },
        { en: "Relocating species to their native habitat", bn: "প্রজাতিকে তাদের স্থানীয় আবাসস্থলে স্থানান্তর" },
        { en: "Increasing pollution", bn: "দূষণ বৃদ্ধি" },
        { en: "Reducing biodiversity", bn: "জৈববৈচিত্র্য হ্রাস" }
      ],
      answer: 1,
      explanation: {
        en: "Species reintroduction involves returning species to their native habitats to restore populations.",
        bn: "প্রজাতি পুনঃঅধিষ্ঠান প্রজাতিকে তাদের স্থানীয় আবাসস্থলে ফিরিয়ে জনসংখ্যা পুনরুদ্ধার করে।"
      }
    },
    {
      question: {
        en: "Which factor poses a challenge to conservation efforts?",
        bn: "কোন কারণ সংরক্ষণ প্রচেষ্টার জন্য চ্যালেঞ্জ তৈরি করে?"
      },
      options: [
        { en: "Climate change", bn: "জলবায়ু পরিবর্তন" },
        { en: "Protected areas", bn: "সংরক্ষিত এলাকা" },
        { en: "Wildlife corridors", bn: "বন্যপ্রাণী করিডর" },
        { en: "Sustainable practices", bn: "টেকসই অনুশীলন" }
      ],
      answer: 0,
      explanation: {
        en: "Climate change alters habitats and threatens species, posing a significant challenge to conservation.",
        bn: "Climate change আবাসস্থল পরিবর্তন করে এবং প্রজাতির জন্য হুমকি সৃষ্টি করে, সংরক্ষণের জন্য উল্লেখযোগ্য চ্যালেঞ্জ তৈরি করে।"
      }
    }
  ]
}

export default function ConservationBiologyQuiz() {
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