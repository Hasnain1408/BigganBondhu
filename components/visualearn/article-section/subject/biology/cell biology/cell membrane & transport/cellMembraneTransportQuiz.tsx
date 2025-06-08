"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Cell Membrane & Transport Quiz",
    bn: "কোষ ঝিল্লি ও পরিবহন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of cell membrane and transport",
    bn: "কোষ ঝিল্লি ও পরিবহন সম্পর্কে আপনার জ্ঞ পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary component of the cell membrane?",
        bn: "কোষ ঝিল্লির প্রাথমিক উপাদান কী?" },
      },
      options: [
        { en: "Carbohydrates", bn: "কার্বোহাইড্রেট" },
        { en: "Phospholipids", bn: "ফসফোলিপিড" },
        { en: "Nucleic acids", bn: "নিউক্লিক অ্যাসিড" },
        { en: "Proteins", bn: "প্রোটিন" }
      ],
      answer: 1,
      explanation: {
        en: "Phospholipids form the bilayer of the cell membrane, providing structure and selective permeability.",
        bn: "ফসফোলিপিড কোষ ঝিল্লির দ্বিস্তর গঠন করে, গঠন এবং নির্বাচনী প্রবেশযোগ্যতা প্রদান করে।"
      }
    },
    {
      question: {
        en: "What type of transport requires no energy?",
        bn: "কোন ধরণের পরিবহনের জন্য শক্তির প্রয়োজন হয় না?" },
      },
      options: [
        { en: "Active transport", bn: "সক্রিয় পরিবহন" },
        { en: "Passive transport", bn: "নিষ্ক্রিয় পরিবহন" },
        { en: "Endocytosis", bn: "এন্ডোসাইটোসিস" },
        { en: "Exocytosis", bn: "এক্সোসাইটোসিস" }
      ],
      answer: 1,
      explanation: {
        en: "Passive transport, like diffusion, moves substances down their concentration gradient without energy.",
        bn: "নিষ্ক্রিয় পরিবহন, যেমন বিসরণ, পদার্থকে তাদের ঘনত্বের গ্রেডিয়েন্ট বরাবর শক্তি ছাড়াই সরায়।"
      }
    },
    {
      question: {
        en: "What process moves large molecules into the cell?",
        bn: "কোন প্রক্রিয়া বড় অণুকে কোষে প্রবেশ করায়?" },
      },
      options: [
        { en: "Diffusion", bn: "বিসরণ" },
        { en: "Osmosis", bn: "অভিস্রবণ" },
        { en: "Endocytosis", bn: "এন্ডোসাইটোসিস" },
        { en: "Facilitated diffusion", bn: "সহজতর বিসরণ" }
      ],
      answer: 2,
      explanation: {
        en: "Endocytosis engulfs large molecules or particles into the cell via membrane vesicles.",
        bn: "এন্ডোসাইটোসিস ঝিল্লি ভেসিকলের মাধ্যমে বড় অণু বা কণাকে কোষে প্রবেশ করায়।"
      }
    },
    {
      question: {
        en: "What is the movement of water across a semi-permeable membrane called?",
        bn: "আধা-প্রবেশযোগ্য ঝিল্লি জুড়ে পানির গতিবিধিকে কী বলা হয়?" },
      },
      options: [
        { en: "Diffusion", bn: "বিসরণ" },
        { en: "Osmosis", bn: "অভিস্রবণ" },
        { en: "Active transport", bn: "সক্রিয় পরিবহন" },
        { en: "Exocytosis", bn: "এক্সোসাইটোসিস" }
      ],
      answer: 1,
      explanation: {
        en: "Osmosis is the passive movement of water across a semi-permeable membrane from high to low concentration.",
        bn: "অভিস্রবণ হল আধা-প্রবেশযোগ্য ঝিল্লি জুড়ে পানির নিষ্ক্রিয় গতিবিধি, উচ্চ থেকে নিম্ন ঘনত্বের দিকে।"
      }
    },
    {
      question: {
        en: "What structure in the membrane aids facilitated diffusion?",
        bn: "ঝিল্লির কোন গঠন সহজতর বিসরণে সহায়তা করে?" },
      },
      options: [
        { en: "Cholesterol", bn: "কোলেস্টেরল" },
        { en: "Carrier proteins", bn: "বাহক প্রোটিন" },
        { en: "Phospholipids", bn: "ফসফোলিপিড" },
        { en: "Glycolipids", bn: "গ্লাইকোলিপিড" }
      ],
      answer: 1,
      explanation: {
        en: "Carrier proteins in the membrane facilitate the diffusion of specific molecules across it.",
        bn: "ঝিল্লির বাহক প্রোটিন নির্দিষ্ট অণুর বিসরণকে সহজতর করে।"
      }
    }
  ]
}

export default function CellMembraneTransportQuiz() {
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