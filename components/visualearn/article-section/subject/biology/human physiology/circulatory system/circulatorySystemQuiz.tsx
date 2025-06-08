"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Circulatory System Quiz",
    bn: "রক্ত সংবহনতন্ত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the circulatory system",
    bn: "রক্ত সংবহনতন্ত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What organ pumps blood throughout the body?",
        bn: "কোন অঙ্গ শরীরে রক্ত পাম্প করে?"
      },
      options: [
        { en: "Lungs", bn: "ফুসফুস" },
        { en: "Heart", bn: "হঠৃদয়" },
        { en: "Kidneys", bn: "কিডনি" },
        { en: "Liver", bn: "যকৃত" }
      ],
      answer: 1,
      explanation: {
        en: "The heart pumps blood, delivering oxygen and nutrients to tissues.",
        bn: "হৃদয় রক্ত পাম্প করে, টিস্যুতে অক্সিজেন এবং পুষ্টি সরবরাহ করে।"
      }
    },
    {
      question: {
        en: "Which vessels carry oxygen-rich blood away from the heart?",
        bn: "কোন রক্তনালী হৃদ্পা থেকে অক্সিজেন সমৃদ্ধ রক্ত বহন করে?",
      },
      options: [
        { en: "Veins", bn: "শিরা" },
        { en: "Arteries", bn: "ধমনী" },
        { en: "Capillaries", bn: "কৈশিকা" },
        { en: "Venules", bn: "শিরিকা" }
      ],
      answer: 1,
      explanation: {
        en: "Arteries carry oxygen-rich blood away from the heart to the body’s tissues.",
        bn: "ধানী হৃদয় থেকে শরীরের টিস্যুতে অক্সিজেন সমৃদ্ধ রক্ত বহন করে।"
      }
    },
    {
      question: {
        en: "What is the main function of red blood cells?",
        bn: "লোহিত রক্তকণিকার প্রধান কাজ কী?",
      },
      options: [
        { en: "Fight infections", bn: "সংক্রমণের বিরুদ্ধে লড়াই" },
        { en: "Carry oxygen", bn: "অক্সিজেন বহন" },
        { en: "Clot blood", bn: "রক্ত জমাট বাঁধা" },
        { en: "Digest nutrients", bn: "পুষ্টি হজম" }
      ],
      answer: 1,
      explanation: {
        en: "Red blood cells carry oxygen from the lungs to tissues and carbon dioxide back to the lungs.",
        bn: "লোহিত রক্তকণিকা ফুসফুস থেকে টিস্যুতে অক্সিজেন এবং কার্বন ডাই অক্সাইড ফুসফুসে ফিরিয়ে নিয়ে যায়।"
      }
    },
    {
      question: {
        en: "Which component of blood helps in clotting?",
        bn: "রক্তের কোন উপাদান জমাট বাঁধতে সাহায্য করে?"
      },
      options: [
        { en: "Plasma", bn: "প্লাজমা" },
        { en: "Platelets", bn: "প্লেটলেট" },
        { en: "White Blood Cells", bn: "শ্বেত রক্তকণিকা" },
        { en: "Hemoglobin", bn: "হিমোগ্লোবিন" }
      ],
      answer: 1,
      explanation: {
        en: "Platelets help form clots to stop bleeding at injury sites.",
        bn: "প্লেটলেট আঘাতের স্থানে রক্তপাত বন্ধ করতে জমাট তৈরি করতে সহায়তা করে।"
      }
    },
    {
      question: {
        en: "What is a key function of the circulatory system besides transport?",
        bn: "পরিবহন ছাড়া রক্ত সংবহনতন্ত্রের একটি মূল কাজ কী?"
      },
      options: [
        { en: "Digestion", bn: "হজম" },
        { en: "Regulation", bn: "নিয়ন্ত্রণ" },
        { en: "Photosynthesis", bn: "আলোকসংশ্লেষণ" },
        { en: "Replication", bn: "প্রতিলিপি" }
      ],
      answer: 1,
      explanation: {
        en: "The circulatory system regulates body temperature, pH, and fluid balance.",
        bn: "রক্ত সংবহনতন্ত্র শরীরের তাপমাত্রা, pH, এবং তরল ভারসাম্য নিয়ন্ত্রণ করে।"
      }
    }
  ]
}

export default function CirculatorySystemQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-t-lg">
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