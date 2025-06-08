"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Properties of Gases Quiz",
    bn: "গ্যাসের বৈশিষ্ট্য কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of gas properties and behavior",
    bn: "গ্যাসের বৈশিষ্ট্য এবং আচরণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What property allows gases to fill their container completely?",
        bn: "কোন বৈশিষ্ট্য গ্যাসকে পাত্র সম্পূর্ণরূপে পূরণ করতে দেয়?"
      },
      options: [
        { en: "Compressibility", bn: "সংকোচনীয়তা" },
        { en: "Expansibility", bn: "প্রসারণশীলতা" },
        { en: "Rigidity", bn: "কঠোরতা" },
        { en: "Density", bn: "ঘনত্ব" }
      ],
      answer: 1,
      explanation: {
        en: "Expansibility allows gases to spread out and occupy the entire volume of their container due to weak intermolecular forces.",
        bn: "প্রসারণশীলতা গ্যাসকে দুর্বল আন্তঃআণবিক শক্তির কারণে পাত্রের সম্পূর্ণ আয়তন দখল করতে দেয়।"
      }
    },
    {
      question: {
        en: "What does temperature measure in a gas?",
        bn: "গ্যাসে তাপমাত্রা কী পরিমাপ করে?"
      },
      options: [
        { en: "Particle mass", bn: "কণার ভর" },
        { en: "Container volume", bn: "পাত্রের আয়তন" },
        { en: "Average kinetic energy", bn: "গড় গতিশক্তি" },
        { en: "Pressure", bn: "চাপ" }
      ],
      answer: 2,
      explanation: {
        en: "Temperature measures the average kinetic energy of gas particles, which increases with faster particle motion.",
        bn: "তাপমাত্রা গ্যাস কণার গড় গতিশক্তি পরিমাপ করে, যা দ্রুত কণার গতির সাথে বাড়ে।"
      }
    },
    {
      question: {
        en: "Which gas law relates pressure and volume at constant temperature?",
        bn: "কোন গ্যাস সূত্র স্থির তাপমাত্রায় চাপ এবং আয়তনের সম্পর্ক বর্ণনা করে?"
      },
      options: [
        { en: "Charles’s Law", bn: "শার্লের সূত্র" },
        { en: "Boyle’s Law", bn: "বয়লের সূত্র" },
        { en: "Avogadro’s Law", bn: "আভোগাড্রোর সূত্র" },
        { en: "Ideal Gas Law", bn: "আদর্শ গ্যাস সূত্র" }
      ],
      answer: 1,
      explanation: {
        en: "Boyle’s Law states that at constant temperature, pressure and volume of a gas are inversely proportional (P ∝ 1/V).",
        bn: "বয়লের সূত্র বলে যে স্থির তাপমাত্রায় গ্যাসের চাপ এবং আয়তন বিপরীত সমানুপাতিক (P ∝ 1/V)।"
      }
    },
    {
      question: {
        en: "Why are gases highly compressible?",
        bn: "গ্যাস কেন অত্যন্ত সংকোচনীয়?"
      },
      options: [
        { en: "Strong intermolecular forces", bn: "শক্তিশালী আন্তঃআণবিক শক্তি" },
        { en: "Large spaces between particles", bn: "কণার মধ্যে বড় ফাঁকা স্থান" },
        { en: "Fixed volume", bn: "নির্দিষ্ট আয়তন" },
        { en: "High density", bn: "উচ্চ ঘনত্ব" }
      ],
      answer: 1,
      explanation: {
        en: "Gases are highly compressible due to large spaces between particles, allowing them to be squeezed closer together.",
        bn: "গ্যাস অত্যন্ত সংকোচনীয় কারণ কণার মধ্যে বড় ফাঁকা স্থান থাকে, যা তাদের কাছাকাছি সংকুচিত হতে দেয়।"
      }
    },
    {
      question: {
        en: "What is the ideal gas law equation?",
        bn: "আদর্শ গ্যাস সূত্রের সমীকরণ কী?"
      },
      options: [
        { en: "P = V/T", bn: "P = V/T" },
        { en: "PV = nRT", bn: "PV = nRT" },
        { en: "V = n/P", bn: "V = n/P" },
        { en: "P = nT/V", bn: "P = nT/V" }
      ],
      answer: 1,
      explanation: {
        en: "The ideal gas law is PV = nRT, relating pressure (P), volume (V), moles (n), temperature (T), and gas constant (R).",
        bn: "আদর্শ গ্যাস সূত্র হল PV = nRT, যা চাপ (P), আয়তন (V), মোল (n), তাপমাত্রা (T), এবং গ্যাস ধ্রুবক (R) সম্পর্কিত।"
      }
    }
  ]
}

export default function PropertiesOfGasesQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-semibold">Chemistry Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}