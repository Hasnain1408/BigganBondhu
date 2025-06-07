"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Gene Expression Quiz",
    bn: "জিন প্রকাশ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of transcription, translation, and regulation",
    bn: "ট্রান্সক্রিপশন, ট্রান্সলেশন এবং নিয়ন্ত্রণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary product of transcription?",
        bn: "ট্রান্সক্রিপশনের প্রাথমিক পণ্য কী?"
      },
      options: [
        { en: "Protein", bn: "প্রোটিনទin" },
        { en: "mRNA", bn: "mRNA" },
        { en: "tRNA", bn: "tRNA" },
        { en: "DNA", bn: "ডিএনএ" }
      ],
      answer: 1,
      explanation: {
        en: "Transcription is the process of synthesizing mRNA from a DNA template in the nucleus.",
        bn: "ট্রান্সক্রিপশন হল নিউক্লিয়াসে ডিএনএ টেমপ্লেট থেকে mRNA সংশ্লেষণের প্রক্রিয়া।"
      }
    },
    {
      question: {
        en: "Where does translation occur in eukaryotic cells?",
        bn: "ইউক্যারিওটিক কোষে ট্রান্সলেশন কোথায় ঘটে?"
      },
      options: [
        { en: "Nucleus", bn: "নিউক্লিয়াস" },
        { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" },
        { en: "Cytoplasm", bn: "সাইটোপ্লাজম" },
        { en: "Endoplasmic Reticulum", bn: "এন্ডোপ্লাজমিক রেটিকুলাম" }
      ],
      answer: 2,
      explanation: {
        en: "Translation occurs in the cytoplasm, where ribosomes synthesize proteins from mRNA.",
        bn: "ট্রান্সলেশন সাইটোপ্লাজমে ঘটে, যেখানে রাইবোজোম mRNA থেকে প্রোটিন সংশ্লেষণ করে।"
      }
    },
    {
      question: {
        en: "What is the role of tRNA in translation?",
        bn: "ট্রান্সলেশনে tRNA-এর ভূমিকা কী?"
      },
      options: [
        { en: "Synthesizes mRNA", bn: "mRNA সংশ্লেষণ করে" },
        { en: "Carries amino acids to ribosomes", bn: "রাইবোজোমে অ্যামিনো অ্যাসিড বহন করে" },
        { en: "Binds to DNA", bn: "ডিএনএ-এর সাথে বাঁধে" },
        { en: "Regulates transcription", bn: "ট্রান্সক্রিপশন নিয়ন্ত্রণ করে" }
      ],
      answer: 1,
      explanation: {
        en: "tRNA carries specific amino acids to the ribosome, matching them to mRNA codons during translation.",
        bn: "tRNA নির্দিষ্ট অ্যামিনো অ্যাসিড রাইবোজোমে বহন করে, ট্রান্সলেশনের সময় mRNA কোডনের সাথে মিলিয়ে।"
      }
    },
    {
      question: {
        en: "Which enzyme is primarily responsible for transcription?",
        bn: "ট্রান্সক্রিপশনের জন্য প্রাথমিকভাবে কোন এনজাইম দায়ী?"
      },
      options: [
        { en: "DNA polymerase", bn: "ডিএনএ পলিমারেজ" },
        { en: "RNA polymerase", bn: "আরএনএ পলিমারেজ" },
        { en: "Ligase", bn: "লাইগেস" },
        { en: "Helicase", bn: "হেলিকেস" }
      ],
      answer: 1,
      explanation: {
        en: "RNA polymerase catalyzes the synthesis of RNA from a DNA template during transcription.",
        bn: "আরএনএ পলিমারেজ ট্রান্সক্রিপশনের সময় ডিএনএ টেমপ্লেট থেকে আরএনএ সংশ্লেষণ করে।"
      }
    },
    {
      question: {
        en: "What is a key mechanism of transcriptional regulation in prokaryotes?",
        bn: "প্রোক্যারিওটে ট্রান্সক্রিপশনাল নিয়ন্ত্রণের একটি মূল প্রক্রিয়া কী?"
      },
      options: [
        { en: "Operon system", bn: "অপারন সিস্টেম" },
        { en: "Splicing", bn: "স্প্লাইসিং" },
        { en: "Translation initiation", bn: "ট্রান্সলেশন ইনিশিয়েশন" },
        { en: "Polyadenylation", bn: "পলিঅ্যাডেনাইলেশন" }
      ],
      answer: 0,
      explanation: {
        en: "The operon system in prokaryotes regulates transcription by controlling the expression of multiple genes together.",
        bn: "প্রোক্যারিওটের অপারন সিস্টেম একাধিক জিনের প্রকাশ নিয়ন্ত্রণ করে ট্রান্সক্রিপশন নিয়ন্ত্রণ করে।"
      }
    }
  ]
}

export default function GeneExpressionQuiz() {
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