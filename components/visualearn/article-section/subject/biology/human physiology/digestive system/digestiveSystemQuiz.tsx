"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Digestive System Quiz",
    bn: "পাচনতন্ত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the digestive system",
    bn: "পাচনতন্ত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Where does digestion begin?",
        bn: "হজম কোথায় শুরু হয়?"
      },
      options: [
        { en: "Stomach", bn: "পাকস্থলী" },
        { en: "Mouth", bn: "মুখ" },
        { en: "Small Intestine", bn: "ছোট অন্ত্র" },
        { en: "Large Intestine", bn: "বড় অন্ত্র" }
      ],
      answer: 1,
      explanation: {
        en: "Digestion begins in the mouth with chewing and salivary enzymes breaking down food.",
        bn: "হজম মুখে শুরু হয় চিবানো এবং লালার এনজাইম দিয়ে খাদ্য ভাঙার মাধ্যমে।"
      }
    },
    {
      question: {
        en: "Which organ primarily digests proteins?",
        bn: "কোন অঙ্গ প্রাথমিকভাবে প্রোটিন হজম করে?"
      },
      options: [
        { en: "Mouth", bn: "মুখ" },
        { en: "Stomach", bn: "পাকস্থলী" },
        { en: "Liver", bn: "যকৃত" },
        { en: "Pancreas", bn: "অগ্ন্যাশয়" }
      ],
      answer: 1,
      explanation: {
        en: "The stomach uses gastric acid and pepsin to primarily digest proteins.",
        bn: "পাকস্থলী গ্যাস্ট্রিক অ্যাসিড এবং পেপসিন ব্যবহার করে প্রাথমিকভাবে প্রোটিন হজম করে।"
      }
    },
    {
      question: {
        en: "Where does most nutrient absorption occur?",
        bn: "বেশিরভাগ পুষ্টি শোষণ কোথায় ঘটে?"
      },
      options: [
        { en: "Stomach", bn: "পাকস্থলী" },
        { en: "Small Intestine", bn: "ছোট অন্ত্র" },
        { en: "Large Intestine", bn: "বড় অন্ত্র" },
        { en: "Esophagus", bn: "খাদ্যনালী" }
      ],
      answer: 1,
      explanation: {
        en: "The small intestine, with its large surface area, is the primary site for nutrient absorption.",
        bn: "ছোট অন্ত্র, এর বৃহৎ পৃষ্ঠতলের কারণে, পুষ্টি শোষণের প্রাথমিক স্থান।"
      }
    },
    {
      question: {
        en: "What is the main function of the large intestine?",
        bn: "বড় অন্ত্রের প্রধান কাজ কী?"
      },
      options: [
        { en: "Protein digestion", bn: "প্রোটিন হজম" },
        { en: "Nutrient absorption", bn: "পুষ্টি শোষণ" },
        { en: "Waste formation", bn: "বর্জ্য গঠন" },
        { en: "Acid secretion", bn: "অ্যাসিড নিঃসরণ" }
      ],
      answer: 2,
      explanation: {
        en: "The large intestine forms and stores waste by absorbing water from undigested food.",
        bn: "বড় অন্ত্র অপাচ্য খাদ্য থেকে পানি শোষণ করে বর্জ্য গঠন এবং সঞ্চয় করে।"
      }
    },
    {
      question: {
        en: "Which nutrient is primarily broken down into glucose?",
        bn: "কোন পুষ্টি প্রাথমিকভাবে গ্লুকোজে ভাঙে?"
      },
      options: [
        { en: "Proteins", bn: "প্রোটিন" },
        { en: "Fats", bn: "চর্বি" },
        { en: "Carbohydrates", bn: "কার্বোহাইড্রেট" },
        { en: "Vitamins", bn: "ভিটামিন" }
      ],
      answer: 2,
      explanation: {
        en: "Carbohydrates are broken down into glucose, which is used for energy.",
        bn: "কার্বোহাইড্রেট গ্লুকোজে ভাঙে, যা শক্তির জন্য ব্যবহৃত হয়।"
      }
    }
  ]
}

export default function DigestiveSystemQuiz() {
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