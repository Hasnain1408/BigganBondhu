"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Plant Reproduction Quiz",
    bn: "উদ্ভিদ প্রজনন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of plant reproduction",
    bn: "উদ্ভিদ প্রজনন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which type of reproduction produces genetically identical offspring?",
        bn: "কোন ধরণের প্রজনন জিনগতভাবে অভিন্ন সন্তান উৎপন্ন করে?"
      },
      options: [
        { en: "Sexual", bn: "যৌন" },
        { en: "Asexual", bn: "অযৌন" },
        { en: "Pollination", bn: "পরাগায়ন" },
        { en: "Fertilization", bn: "নিষেক" }
      ],
      answer: 1,
      explanation: {
        en: "Asexual reproduction produces genetically identical offspring through methods like budding or runners.",
        bn: "অযৌন প্রজনন বুডিং বা রানারের মতো পদ্ধতির মাধ্যমে জিনগতভাবে অভিন্ন সন্তান উৎপন্ন করে।"
      }
    },
    {
      question: {
        en: "What is the primary reproductive organ of flowering plants?",
        bn: "ফুলের উদ্ভিদের প্রাথমিক প্রজনন অঙ্গ কী?"
      },
      options: [
        { en: "Leaf", bn: "পাতা" },
        { en: "Stem", bn: "কাণ্ড" },
        { en: "Flower", bn: "ফুল" },
        { en: "Root", bn: "মূল" }
      ],
      answer: 2,
      explanation: {
        en: "The flower is the reproductive organ in flowering plants, containing male and female parts.",
        bn: "ফুল ফুলের উদ্ভিদের প্রজনন অঙ্গ, যেখানে পুরুষ এবং মহিলা অংশ থাকে।"
      }
    },
    {
      question: {
        en: "What process transfers pollen from anther to stigma?",
        bn: "কোন প্রক্রিয়া পরাগকে অ্যান্থার থেকে স্টিগমায় স্থানান্তর করে?"
      },
      options: [
        { en: "Fertilization", bn: "নিষেক" },
        { en: "Pollination", bn: "পরাগায়ন" },
        { en: "Germination", bn: "অঙ্কুরোদগম" },
        { en: "Transpiration", bn: "ট্রান্সপিরেশন" }
      ],
      answer: 1,
      explanation: {
        en: "Pollination is the transfer of pollen from the anther to the stigma, enabling fertilization.",
        bn: "পরাগায়ন হল অ্যান্থার থেকে স্টিগমায় পরাগ স্থানান্তর, যা নিষেক সক্ষম করে।"
      }
    },
    {
      question: {
        en: "What is formed after fertilization in plants?",
        bn: "উদ্ভিদে নিষেকের পর কী গঠিত হয়?"
      },
      options: [
        { en: "Pollen", bn: "পরাগ" },
        { en: "Seed", bn: "বীজ" },
        { en: "Stigma", bn: "স্টিগমা" },
        { en: "Petal", bn: "পাপড়ি" }
      ],
      answer: 1,
      explanation: {
        en: "After fertilization, a seed is formed, containing the embryo of the new plant.",
        bn: "নিষেকের পর একটি বীজ গঠিত হয়, যাতে নতুন উদ্ভিদের ভ্রূণ থাকে।"
      }
    },
    {
      question: {
        en: "Which organism often aids in pollination?",
        bn: "কোন জীব প্রায়ই পরাগায়নে সহায়তা করে?"
      },
      options: [
        { en: "Bacteria", bn: "ব্যাকটেরিয়া" },
        { en: "Fungi", bn: "ফাংগাই" },
        { en: "Bees", bn: "মৌমাছি" },
        { en: "Algae", bn: "শৈবাল" }
      ],
      answer: 2,
      explanation: {
        en: "Bees are common pollinators, transferring pollen while collecting nectar from flowers.",
        bn: "মৌমাছি সাধারণ পরাগায়ক, ফুল থেকে নেকটার সংগ্রহ করার সময় পরাগ স্থানান্তর করে।"
      }
    }
  ]
}

export default function PlantReproductionQuiz() {
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