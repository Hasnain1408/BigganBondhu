"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Charles’s Law Quiz",
    bn: "শার্লের সূত্র কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Charles’s Law",
    bn: "শার্লের সূত্র সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Charles’s Law state about volume and temperature?",
        bn: "শার্লের সূত্র আয়তন এবং তাপমাত্রা সম্পর্কে কী বলে?"
      },
      options: [
        { en: "Inversely proportional", bn: "বিপরীত সমানুপাতিক" },
        { en: "Directly proportional", bn: "সরাসরি সমানুপাতিক" },
        { en: "No relationship", bn: "কোনো সম্পর্ক নেই" },
        { en: "Equal", bn: "সমান" }
      ],
      answer: 1,
      explanation: {
        en: "Charles’s Law states that at constant pressure, volume is directly proportional to absolute temperature (V ∝ T).",
        bn: "শার্লের সূত্র বলে যে স্থির চাপে আয়তন পরম তাপমাত্রার সরাসরি সমানুপাতিক (V ∝ T)।"
      }
    },
    {
      question: {
        en: "Under what condition does Charles’s Law apply?",
        bn: "কোন অবস্থায় শার্লের সূত্র প্রযোজ্য?"
      },
      options: [
        { en: "Constant temperature", bn: "স্থির তাপমাত্রা" },
        { en: "Constant volume", bn: "স্থির আয়তন" },
        { en: "Constant pressure", bn: "স্থির চাপ" },
        { en: "Constant moles", bn: "স্থির মোল" }
      ],
      answer: 2,
      explanation: {
        en: "Charles’s Law applies when the pressure is kept constant, allowing the relationship between volume and temperature to be observed.",
        bn: "শার্লের সূত্র তখনই প্রযোজ্য যখন চাপ স্থির রাখা হয়, যাতে আয়তন এবং তাপমাত্রার মধ্যে সম্পর্ক বোঝা যায়।"
      }
    }
  ]
}

export default function CharlesLawQuizPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quizData.title.en}</CardTitle>
        <p className="text-sm text-muted-foreground">{quizData.subtitle.en}</p>
      </CardHeader>
      <CardContent>
        <QuizControls quizData={quizData} />
      </CardContent>
    </Card>
  )
}
