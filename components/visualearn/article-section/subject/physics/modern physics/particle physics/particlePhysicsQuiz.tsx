
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Particle Physics Quiz",
    bn: "কণা পদার্থবিজ্ঞান কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of particle physics",
    bn: "কণা পদার্থবিজ্ঞান সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does the Standard Model describe?",
        bn: "স্ট্যান্ডার্ড মডেল কী বর্ণনা করে?"
      },
      options: [
        { en: "Gravity", bn: "মহাকর্ষ" },
        { en: "Fundamental particles and forces", bn: "মৌলিক কণা এবং বল" },
        { en: "Atomic structure", bn: "পরমাণুর গঠন" },
        { en: "Relativity", bn: "আপেক্ষিকতা" }
      ],
      answer: 1,
      explanation: {
        en: "The Standard Model describes fundamental particles (quarks, leptons) and forces (except gravity).",
        bn: "স্ট্যান্ডার্ড মডেল মৌলিক কণা (কোয়ার্ক, লেপটন) এবং বল (মহাকর্ষ ব্যতীত) বর্ণনা করে।"
      }
    },
    {
      question: {
        en: "Which particle is a lepton?",
        bn: "কোন কণাটি লেপটন?"
      },
      options: [
        { en: "Proton", bn: "প্রোটন" },
        { en: "Neutron", bn: "নিউট্রন" },
        { en: "Electron", bn: "ইলেকট্রন" },
        { en: "Quark", bn: "কোয়ার্ক" }
      ],
      answer: 2,
      explanation: {
        en: "The electron is a lepton, a type of fundamental particle in the Standard Model.",
        bn: "ইলেকট্রন একটি লেপটন, স্ট্যান্ডার্ড মডেলে একটি মৌলিক কণার প্রকার।"
      }
    },
    {
      question: {
        en: "What is the force carrier for the electromagnetic force?",
        bn: "তড়িৎচুম্বকীয় বলের বাহক কণা কী?"
      },
      options: [
        { en: "Gluon", bn: "গ্লুয়ন" },
        { en: "Photon", bn: "ফোটন" },
        { en: "W boson", bn: "ডব্লিউ বোসন" },
        { en: "Higgs boson", bn: "হিগস বোসন" }
      ],
      answer: 1,
      explanation: {
        en: "The photon is the force carrier for the electromagnetic force in the Standard Model.",
        bn: "ফোটন স্ট্যান্ডার্ড মডেলে তড়িৎচুম্বকীয় বলের বাহক কণা।"
      }
    },
    {
      question: {
        en: "What does the Higgs boson do?",
        bn: "হিগস বোসন কী করে?"
      },
      options: [
        { en: "Carries the strong force", bn: "শক্তিশালী বল বহন করে" },
        { en: "Gives particles mass", bn: "কণাকে ভর প্রদান করে" },
        { en: "Mediates weak force", bn: "দুর্বল বল মধ্যস্থতা করে" },
        { en: "Binds quarks", bn: "কোয়ার্ক বাঁধে" }
      ],
      answer: 1,
      explanation: {
        en: "The Higgs boson interacts with particles to give them mass via the Higgs field.",
        bn: "হিগস বোসন হিগস ক্ষেত্রের মাধ্যমে কণার সাথে মিথস্ক্রিয়া করে তাদের ভর প্রদান করে।"
      }
    },
    {
      question: {
        en: "Which force is not included in the Standard Model?",
        bn: "কোন বল স্ট্যান্ডার্ড মডেলে অন্তর্ভুক্ত নয়?"
      },
      options: [
        { en: "Electromagnetic", bn: "তড়িৎচুম্বকীয়" },
        { en: "Strong nuclear", bn: "শক্তিশালী নিউক্লিয়ার" },
        { en: "Weak nuclear", bn: "দুর্বল নিউক্লিয়ার" },
        { en: "Gravity", bn: "মহাকর্ষ" }
      ],
      answer: 3,
      explanation: {
        en: "Gravity is not included in the Standard Model, which covers the other three forces.",
        bn: "মহাকর্ষ স্ট্যান্ডার্ড মডেলে অন্তর্ভুক্ত নয়, যা অন্য তিনটি বল কভার করে।"
      }
    }
  ]
}

export default function ParticlePhysicsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Particle Physics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
