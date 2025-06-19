
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Quantum Applications Quiz",
    bn: "কোয়ান্টাম অ্যাপ্লিকেশন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of quantum mechanics applications",
    bn: "কোয়ান্টাম মেকানিক্সের অ্যাপ্লিকেশন সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is a qubit in quantum computing?",
        bn: "কোয়ান্টাম কম্পিউটিংয়ে কিউবিট কী?"
      },
      options: [
        { en: "A classical bit", bn: "ক্লাসিক্যাল বিট" },
        { en: "A quantum state in superposition", bn: "সুপারপজিশনে কোয়ান্টাম অবস্থা" },
        { en: "A high-speed processor", bn: "উচ্চ-গতির প্রসেসর" },
        { en: "A type of memory", bn: "মেমরির একটি প্রকার" }
      ],
      answer: 1,
      explanation: {
        en: "A qubit is a quantum bit that can exist in a superposition of |0⟩ and |1⟩ states, unlike a classical bit.",
        bn: "কিউবিট হল একটি কোয়ান্টাম বিট যা |0⟩ এবং |1⟩ অবস্থার সুপারপজিশনে থাকতে পারে, ক্লাসিক্যাল বিটের বিপরীতে।"
      }
    },
    {
      question: {
        en: "What principle does quantum cryptography primarily rely on?",
        bn: "কোয়ান্টাম ক্রিপ্টোগ্রাফি মূলত কোন নীতির উপর নির্ভর করে?"
      },
      options: [
        { en: "Superposition", bn: "সুপারপজিশন" },
        { en: "Entanglement", bn: "এনট্যাঙ্গলমেন্ট" },
        { en: "Tunneling", bn: "টানেলিং" },
        { en: "Wave-particle duality", bn: "তরঙ্গ-কণা দ্বৈততা" }
      ],
      answer: 1,
      explanation: {
        en: "Quantum cryptography, like the BB84 protocol, primarily uses entanglement to ensure secure communication.",
        bn: "কোয়ান্টাম ক্রিপ্টোগ্রাফি, যেমন BB84 প্রোটোকল, নিরাপদ যোগাযোগ নিশ্চিত করতে মূলত এনট্যাঙ্গলমেন্ট ব্যবহার করে।"
      }
    },
    {
      question: {
        en: "What is quantum tunneling used for in electronics?",
        bn: "ইলেকট্রনিক্সে কোয়ান্টাম টানেলিং কীসের জন্য ব্যবহৃত হয়?"
      },
      options: [
        { en: "Data storage", bn: "ডেটা স্টোরেজ" },
        { en: "High-speed switching", bn: "উচ্চ-গতির সুইচিং" },
        { en: "Signal amplification", bn: "সিগন্যাল পরিবর্ধন" },
        { en: "Voltage regulation", bn: "ভোল্টেজ নিয়ন্ত্রণ" }
      ],
      answer: 1,
      explanation: {
        en: "Quantum tunneling enables high-speed switching in devices like tunnel diodes.",
        bn: "কোয়ান্টাম টানেলিং টানেল ডায়োডের মতো ডিভাইসে উচ্চ-গতির সুইচিং সক্ষম করে।"
      }
    },
    {
      question: {
        en: "Which technology relies on nuclear spin for imaging?",
        bn: "কোন প্রযুক্তি ইমেজিংয়ের জন্য নিউক্লিয়ার স্পিনের উপর নির্ভর করে?"
      },
      options: [
        { en: "X-ray", bn: "এক্স-রে" },
        { en: "MRI", bn: "এমআরআই" },
        { en: "Ultrasound", bn: "আল্ট্রাসাউন্ড" },
        { en: "CT scan", bn: "সিটি স্ক্যান" }
      ],
      answer: 1,
      explanation: {
        en: "MRI (Magnetic Resonance Imaging) uses nuclear spin of atoms, aligned by magnetic fields, to produce detailed images.",
        bn: "এমআরআই (ম্যাগনেটিক রেজোন্যান্স ইমেজিং) চৌম্বক ক্ষেত্র দ্বারা সারিবদ্ধ পরমাণুর নিউক্লিয়ার স্পিন ব্যবহার করে বিস্তারিত চিত্র তৈরি করে।"
      }
    },
    {
      question: {
        en: "What is a key advantage of quantum computers over classical computers?",
        bn: "ক্লাসিক্যাল কম্পিউটারের তুলনায় কোয়ান্টাম কম্পিউটারের একটি মূল সুবিধা কী?"
      },
      options: [
        { en: "Lower power consumption", bn: "কম শক্তি খরচ" },
        { en: "Faster processing for specific problems", bn: "নির্দিষ্ট সমস্যার জন্য দ্রুত প্রক্রিয়াকরণ" },
        { en: "Smaller physical size", bn: "ছোট শারীরিক আকার" },
        { en: "Simpler programming", bn: "সহজ প্রোগ্রামিং" }
      ],
      answer: 1,
      explanation: {
        en: "Quantum computers can solve specific problems, like factoring large numbers, much faster due to superposition and entanglement.",
        bn: "কোয়ান্টাম কম্পিউটার সুপারপজিশন এবং এনট্যাঙ্গলমেন্টের কারণে নির্দিষ্ট সমস্যা, যেমন বড় সংখ্যার ফ্যাক্টরিং, অনেক দ্রুত সমাধান করতে পারে।"
      }
    }
  ]
}

export default function QuantumApplicationsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Quantum Applications Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
