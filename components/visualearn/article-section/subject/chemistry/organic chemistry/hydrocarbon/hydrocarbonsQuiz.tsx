"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Hydrocarbons Quiz",
    bn: "Quiz",
  },
  subtitle: {
    en: "Test your knowledge of hydrocarbons",
    bn: "Questions",
  },
  questions: [
    {
      question: {
        en: "Which hydrocarbon contains only single bonds?",
        bn: "Which hydrocarbon contains only single bonds?",
      },
      options: [
        { en: "Ethene", bn: "Ethylene" },
        { en: "Ethyne", bn: "Acetylene" },
        { en: "Methane", bn: "Methane" },
        { en: "Benzene", bn: "Benzene" },
      ],
      answer: 2,
      explanation: {
        en: "Methane (CH₄) is an alkane with only single bonds between carbon and hydrogen atoms.",
        bn: "Methane (CH₄) is an alkane with only single bonds.",
      },
    },
    {
      question: {
        en: "What is the general formula for alkenes?",
        bn: "What is the general formula for alkenes?",
      },
      options: [
        { en: "CₙH₂ₙ₊₂", bn: "CₙH₂ₙ₊₂" },
        { en: "CₙH₂ₙ", bn: "CₙH₂ₙ" },
        { en: "CₙH₂ₙ₋₂", bn: "CₙH₂ₙ₋₂" },
        { en: "CₙHₙ", bn: "CₙHₙ" },
      ],
      answer: 1,
      explanation: {
        en: "Alkenes have at least one double bond and follow the general formula CₙH₂ₙ.",
        bn: "Alkenes have at least one double bond and follow the general formula CₙH₂ₙ.",
      },
    },
    {
      question: {
        en: "Which hydrocarbon is used in welding due to its triple bond?",
        bn: "Which hydrocarbon is used in welding due to its triple bond?",
      },
      options: [
        { en: "Methane", bn: "Methane" },
        { en: "Ethene", bn: "Ethylene" },
        { en: "Ethyne", bn: "Acetylene" },
        { en: "Propane", bn: "Propane" },
      ],
      answer: 2,
      explanation: {
        en: "Ethyne (C₂H₂), also known as acetylene, has a triple bond and is used in welding torches.",
        bn: "Ethyne (C₂H₂), also known as acetylene, has a triple bond and is used in welding.",
      },
    },
    {
      question: {
        en: "What structural feature characterizes aromatic hydrocarbons?",
        bn: "What structural feature characterizes aromatic hydrocarbons?",
      },
      options: [
        { en: "Single bonds", bn: "Single bonds" },
        { en: "Double bonds", bn: "Double bonds" },
        { en: "Benzene ring", bn: "Benzene ring" },
        { en: "Triple bonds", bn: "Triple bonds" },
      ],
      answer: 2,
      explanation: {
        en: "Aromatic hydrocarbons are characterized by a benzene ring structure.",
        bn: "Aromatic hydrocarbons are characterized by a benzene ring.",
      },
    },
    {
      question: {
        en: "Which of the following is a saturated hydrocarbon?",
        bn: "Which of the following is a saturated hydrocarbon?",
      },
      options: [
        { en: "Ethene", bn: "Ethylene" },
        { en: "Ethyne", bn: "Acetylene" },
        { en: "Propane", bn: "Propane" },
        { en: "Benzene", bn: "Benzene" },
      ],
      answer: 2,
      explanation: {
        en: "Propane (C₃H₈) is an alkane and a saturated hydrocarbon, containing only single bonds.",
        bn: "Propane (C₃H₈) is an alkane and a saturated hydrocarbon with only single bonds.",
      },
    },
  ],
}

export default function HydrocarbonsQuiz() {
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