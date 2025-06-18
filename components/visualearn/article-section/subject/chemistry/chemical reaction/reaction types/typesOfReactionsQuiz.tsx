"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Types of Reactions Quiz",
    bn: "বিক্রিয়ার প্রকারভেদ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of chemical reaction types",
    bn: "রাসায়নিক বিক্রিয়ার প্রকারভেদ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which type of reaction involves two substances combining to form one product?",
        bn: "কোন ধরনের বিক্রিয়ায় দুটি পদার্থ মিলে একটি উৎপাদ তৈরি করে?"
      },
      options: [
        { en: "Decomposition", bn: "পচন" },
        { en: "Combination", bn: "সংযোজন" },
        { en: "Single Replacement", bn: "একক স্থানান্তর" },
        { en: "Combustion", bn: "দহন" }
      ],
      answer: 1,
      explanation: {
        en: "Combination reactions involve two or more reactants forming a single product.",
        bn: "সংযোজন বিক্রিয়ায় দুটি বা ততোধিক বিক্রিয়ক একটি উৎপাদ তৈরি করে।"
      }
    },
    {
      question: {
        en: "What type of reaction is represented by: Zn + CuSO₄ → ZnSO₄ + Cu?",
        bn: "Zn + CuSO₄ → ZnSO₄ + Cu বিক্রিয়াটি কোন প্রকারের?"
      },
      options: [
        { en: "Combination", bn: "সংযোজন" },
        { en: "Decomposition", bn: "পচন" },
        { en: "Single Replacement", bn: "একক স্থানান্তর" },
        { en: "Double Replacement", bn: "দ্বৈত স্থানান্তর"}
      ],

      answer: 2,
      explanation: {
        en: "This is a single replacement reaction where zinc replaces copper in the compound.",
        bn: "এটি একটি একক স্থানান্তর বিক্রিয়া, যেখানে জিঙ্ক কপারের স্থান নেয়।"
      }
    },
    {
      question: {
        en: "Which reaction type produces carbon dioxide and water when a hydrocarbon burns?",
        bn: "কোন বিক্রিয়া প্রকারে হাইড্রোকার্বন দহনে কার্বন ডাইঅক্সাইড এবং জল উৎপন্ন হয়?"
      },
      options: [
        { en: "Combination", bn: "সংযোজন" },
        { en: "Decomposition", bn: "পচন" },
        { en: "Combustion", bn: "দহন" },
        { en: "Double Replacement", bn: "দ্বৈত স্থানান্তর" }
      ],
      answer: 2,
      explanation: {
        en: "Combustion reactions of hydrocarbons produce CO₂ and H₂O.",
        bn: "হাইড্রোকার্বনের দহন বিক্রিয়ায় CO₂ এবং H₂O উৎপন্ন হয়।"
      }
    },
    {
      question: {
        en: "What is the reaction type of: 2H₂O → 2H₂ + O₂?",
        bn: "2H₂O → 2H₂ + O₂ বিক্রিয়াটি কোন প্রকারের?"
      },
      options: [
        { en: "Combination", bn: "সংযোজন" },
        { en: "Decomposition", bn: "পচন" },
        { en: "Single Replacement", bn: "একক স্থানান্তর" },
        { en: "Combustion", bn: "দহন" }
      ],
      answer: 1,
      explanation: {
        en: "This is a decomposition reaction where water breaks into hydrogen and oxygen.",
        bn: "এটি একটি পচন বিক্রিয়া, যেখানে জল ভেঙে হাইড্রোজেন এবং অক্সিজেনে পরিণত হয়।"
      }
    },
    {
      question: {
        en: "Which reaction involves the exchange of ions between two compounds?",
        bn: "কোন বিক্রিয়ায় দুটি যৌগের মধ্যে আয়ন বিনিময় হয়?"
      },
      options: [
        { en: "Combination", bn: "সংযোজন" },
        { en: "Single Replacement", bn: "একক স্থানান্তর" },
        { en: "Double Replacement", bn: "দ্বৈত স্থানান্তর" },
        { en: "Combustion", bn: "দহন" }
      ],
      answer: 2,
      explanation: {
        en: "Double replacement reactions involve ions swapping between two compounds.",
        bn: "দ্বৈত স্থানান্তর বিক্রিয়ায় দুটি যৌগের আয়ন পরস্পরের সাথে বিনিময় হয়।"
      }
    }
  ]
}

export default function TypesOfReactionsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Chemistry Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}