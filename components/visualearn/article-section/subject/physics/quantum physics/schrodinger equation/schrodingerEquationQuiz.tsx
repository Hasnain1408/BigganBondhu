
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Schrödinger Equation Quiz",
    bn: "শ্রোডিঙ্গার সমীকরণ কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of the Schrödinger equation",
    bn: "আপনার শ্রোডিঙ্গার সমীকরণ জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does the time-dependent Schrödinger equation describe?",
        bn: "সময়-নির্ভর শ্রোডিঙ্গার সমীকরণ কী বর্ণনা করে?"
      },
      options: [
        { en: "Stationary energy states", bn: "স্থির শক্তি অবস্থা" },
        { en: "Time evolution of wave function", bn: "তরঙ্গ ফাংশনের সময় বিবর্তন" },
        { en: "Classical trajectories", bn: "ক্লাসিক্যাল গতিপথ" },
        { en: "Particle momentum", bn: "কণার ভরবেগ" }
      ],
      answer: 1,
      explanation: {
        en: "The time-dependent Schrödinger equation, iħ ∂ψ/∂t = Ĥψ, describes how the wave function evolves over time.",
        bn: "সময়-নির্ভর শ্রোডিঙ্গার সমীকরণ, iħ ∂ψ/∂t = Ĥψ, তরঙ্গ ফাংশনের সময়ের সাথে বিবর্তন বর্ণনা করে।"
      }
    },
    {
      question: {
        en: "In the time-independent Schrödinger equation, Ĥψ = Eψ, what does E represent?",
        bn: "সময়-স্বাধীন শ্রোডিঙ্গার সমীকরণে, Ĥψ = Eψ, E কী নির্দেশ করে?"
      },
      options: [
        { en: "Momentum", bn: "ভরবেগ" },
        { en: "Potential energy", bn: "সম্ভাব্য শক্তি" },
        { en: "Total energy", bn: "মোট শক্তি" },
        { en: "Kinetic energy", bn: "গতিশক্তি" }
      ],
      answer: 2,
      explanation: {
        en: "E represents the total energy of the system in the time-independent Schrödinger equation.",
        bn: "E সময়-স্বাধীন শ্রোডিঙ্গার সমীকরণে সিস্টেমের মোট শক্তি নির্দেশ করে।"
      }
    },
    {
      question: {
        en: "What is the role of the Hamiltonian in the Schrödinger equation?",
        bn: "শ্রোডিঙ্গার সমীকরণে হ্যামিলটোনিয়ানের ভূমিকা কী?"
      },
      options: [
        { en: "Measures position", bn: "অবস্থান পরিমাপ করে" },
        { en: "Represents total energy", bn: "মোট শক্তি প্রকাশ করে" },
        { en: "Calculates probability", bn: "সম্ভাবনা গণনা করে" },
        { en: "Determines wave frequency", bn: "তরঙ্গ কম্পাঙ্ক নির্ধারণ করে" }
      ],
      answer: 1,
      explanation: {
        en: "The Hamiltonian Ĥ represents the total energy (kinetic + potential) of the quantum system.",
        bn: "হ্যামিলটোনিয়ান Ĥ কোয়ান্টাম সিস্টেমের মোট শক্তি (গতিশক্তি + সম্ভাব্য শক্তি) প্রকাশ করে।"
      }
    },
    {
      question: {
        en: "For a particle in an infinite potential well, the wave function is:",
        bn: "অনন্ত সম্ভাব্য কূপে একটি কণার তরঙ্গ ফাংশন কী?"
      },
      options: [
        { en: "Exponential", bn: "ঘাতাঙ্কীয়" },
        { en: "Linear", bn: "রৈখিক" },
        { en: "Sinusoidal", bn: "সাইনোসয়েডাল" },
        { en: "Constant", bn: "ধ্রুবক" }
      ],
      answer: 2,
      explanation: {
        en: "The wave function for a particle in an infinite potential well is sinusoidal, typically of the form ψ(x) = A sin(nπx/L).",
        bn: "অনন্ত সম্ভাব্য কূপে কণার তরঙ্গ ফাংশন সাইনোসয়েডাল, সাধারণত ψ(x) = A sin(nπx/L) রূপে।"
      }
    },
    {
      question: {
        en: "What does |ψ|² represent in the context of the Schrödinger equation?",
        bn: "শ্রোডিঙ্গার সমীকরণের প্রেক্ষাপটে |ψ|² কী নির্দেশ করে?"
      },
      options: [
        { en: "Energy density", bn: "শক্তি ঘনত্ব" },
        { en: "Probability density", bn: "সম্ভাবনা ঘনত্ব" },
        { en: "Momentum density", bn: "ভরবেগ ঘনত্ব" },
        { en: "Wave amplitude", bn: "তরঙ্গ প্রশস্ততা" }
      ],
      answer: 1,
      explanation: {
        en: "|ψ|² is the probability density, indicating the likelihood of finding the particle in a given region.",
        bn: "|ψ|² হল সম্ভাবনা ঘনত্ব, যা একটি নির্দিষ্ট অঞ্চলে কণাটি খুঁজে পাওয়ার সম্ভাবনা নির্দেশ করে।"
      }
    }
  ]
}

export default function SchrodingerEquationQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Schrödinger Equation Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
