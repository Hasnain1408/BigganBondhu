
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Quantum Basics Quiz",
    bn: "কোয়ান্টাম বেসিক্স কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of quantum mechanics fundamentals",
    bn: "আপনার কোয়ান্টাম মেকানিক্স মৌলিক জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does wave-particle duality imply?",
        bn: "তরঙ্গ-কণা দ্বৈততা কী বোঝায়?"
      },
      options: [
        { en: "Particles always behave as waves", bn: "কণা সবসময় তরঙ্গের মতো আচরণ করে" },
        { en: "Particles can exhibit both wave and particle properties", bn: "কণা তরঙ্গ এবং কণার উভয় বৈশিষ্ট্য প্রদর্শন করতে পারে" },
        { en: "Waves cannot interact with particles", bn: "তরঙ্গ কণার সাথে মিথস্ক্রিয়া করতে পারে না" },
        { en: "Only light behaves as a wave", bn: "শুধুমাত্র আলো তরঙ্গের মতো আচরণ করে" }
      ],
      answer: 1,
      explanation: {
        en: "Wave-particle duality means particles like electrons can show wave-like (e.g., interference) or particle-like (e.g., localized impact) behavior depending on the experiment.",
        bn: "তরঙ্গ-কণা দ্বৈততার অর্থ হল ইলেকট্রনের মতো কণা পরীক্ষার উপর নির্ভর করে তরঙ্গ-সদৃশ (যেমন, হস্তক্ষেপ) বা কণা-সদৃশ (যেমন, স্থানীয় প্রভাব) আচরণ দেখাতে পারে।"
      }
    },
    {
      question: {
        en: "What does the Heisenberg uncertainty principle state?",
        bn: "হাইজেনবার্গের অনিশ্চয়তা নীতি কী বলে?"
      },
      options: [
        { en: "Position and momentum can be measured exactly", bn: "অবস্থান এবং ভরবেগ ঠিকভাবে পরিমাপ করা যায়" },
        { en: "Position and momentum cannot be measured simultaneously with arbitrary precision", bn: "অবস্থান এবং ভরবেগ একযোগে নির্বিচার নির্ভুলতার সাথে পরিমাপ করা যায় না" },
        { en: "Energy and time are always certain", bn: "শক্তি এবং সময় সবসময় নিশ্চিত" },
        { en: "Wave functions are always real numbers", bn: "তরঙ্গ ফাংশন সবসময় বাস্তব সংখ্যা" }
      ],
      answer: 1,
      explanation: {
        en: "The Heisenberg uncertainty principle states that the product of uncertainties in position (Δx) and momentum (Δp) is at least ħ/2, limiting simultaneous precision.",
        bn: "হাইজেনবার্গের অনিশ্চয়তা নীতি বলে যে অবস্থান (Δx) এবং ভরবেগ (Δp)-এর অনিশ্চয়তার গুণফল কমপক্ষে ħ/2, যা একযোগে নির্ভুলতা সীমিত করে।"
      }
    },
    {
      question: {
        en: "What is the physical significance of |ψ|² in quantum mechanics?",
        bn: "কোয়ান্টাম মেকানিক্সে |ψ|²-এর ভৌত তাৎপর্য কী?"
      },
      options: [
        { en: "Energy of the particle", bn: "কণার শক্তি" },
        { en: "Momentum of the particle", bn: "কণার ভরবেগ" },
        { en: "Probability density of finding the particle", bn: "কণাটি খুঁজে পাওয়ার সম্ভাবনা ঘনত্ব" },
        { en: "Wave function amplitude", bn: "তরঙ্গ ফাংশনের প্রশস্ততা" }
      ],
      answer: 2,
      explanation: {
        en: "|ψ|² represents the probability density, giving the likelihood of finding a particle in a specific region of space.",
        bn: "|ψ|² সম্ভাবনা ঘনত্ব নির্দেশ করে, যা একটি নির্দিষ্ট স্থানে কণাটি খুঁজে পাওয়ার সম্ভাবনা দেয়।"
      }
    },
    {
      question: {
        en: "What happens to a quantum system in superposition when measured?",
        bn: "পরিমাপের সময় সুপারপজিশনে থাকা একটি কোয়ান্টাম সিস্টেমের কী হয়?"
      },
      options: [
        { en: "It remains in superposition", bn: "এটি সুপারপজিশনে থাকে" },
        { en: "It collapses to a definite state", bn: "এটি একটি নির্দিষ্ট অবস্থায় পতন করে" },
        { en: "Its energy increases", bn: "এর শক্তি বৃদ্ধি পায়" },
        { en: "Its wave function disappears", bn: "এর তরঙ্গ ফাংশন অদৃশ্য হয়ে যায়" }
      ],
      answer: 1,
      explanation: {
        en: "Measurement causes a quantum system in superposition to collapse to one of its possible definite states.",
        bn: "পরিমাপের ফলে সুপারপজিশনে থাকা কোয়ান্টাম সিস্টেম তার সম্ভাব্য নির্দিষ্ট অবস্থাগুলির একটিতে পতন করে।"
      }
    },
    {
      question: {
        en: "The de Broglie wavelength of a particle is given by:",
        bn: "একটি কণার দে ব্রোগলি তরঙ্গদৈর্ঘ্য কী দ্বারা প্রকাশ করা হয়?"
      },
      options: [
        { en: "λ = h/E", bn: "λ = h/E" },
        { en: "λ = h/p", bn: "λ = h/p" },
        { en: "λ = p/h", bn: "λ = p/h" },
        { en: "λ = E/h", bn: "λ = E/h" }
      ],
      answer: 1,
      explanation: {
        en: "The de Broglie wavelength is λ = h/p, where h is Planck’s constant and p is the particle’s momentum.",
        bn: "দে ব্রোগলি তরঙ্গদৈর্ঘ্য হল λ = h/p, যেখানে h হল প্লাঙ্ক ধ্রুবক এবং p হল কণার ভরবেগ।"
      }
    }
  ]
}

export default function QuantumBasicsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Quantum Basics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
