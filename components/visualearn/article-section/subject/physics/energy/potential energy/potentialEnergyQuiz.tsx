// potentialEnergyQuiz.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizContent } from "../../../../quiz/types";
import QuizControls from "../../../../quiz/quizControls";

const quizData: QuizContent = {
  title: {
    en: "Potential Energy Quiz",
    bn: "স্থিতিশক্তি কুইজ"
  },
  subtitle: {
    en: "Test your understanding of energy storage in physical systems",
    bn: "ভৌত ব্যবস্থায় শক্তি সঞ্চয় সম্পর্কে আপনার বোঝাপড়া পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the formula for gravitational potential energy near Earth's surface?",
        bn: "পৃথিবীর পৃষ্ঠের নিকট মহাকর্ষীয় স্থিতিশক্তির সূত্র কী?"
      },
      options: [
        { en: "PE = mgh", bn: "PE = mgh" },
        { en: "PE = ½mv²", bn: "PE = ½mv²" },
        { en: "PE = kx²", bn: "PE = kx²" },
        { en: "PE = Fd", bn: "PE = Fd" }
      ],
      answer: 0,
      explanation: {
        en: "Gravitational potential energy is calculated as mass (m) × gravitational acceleration (g) × height (h).",
        bn: "মহাকর্ষীয় স্থিতিশক্তি গণনা করা হয় ভর (m) × মহাকর্ষীয় ত্বরণ (g) × উচ্চতা (h) হিসাবে।"
      }
    },
    {
      question: {
        en: "Which type of potential energy is stored in a stretched spring?",
        bn: "একটি প্রসারিত স্প্রিংয়ে কোন ধরনের স্থিতিশক্তি সঞ্চিত থাকে?"
      },
      options: [
        { en: "Elastic potential energy", bn: "স্থিতিস্থাপক স্থিতিশক্তি" },
        { en: "Gravitational potential energy", bn: "মহাকর্ষীয় স্থিতিশক্তি" },
        { en: "Chemical potential energy", bn: "রাসায়নিক স্থিতিশক্তি" },
        { en: "Nuclear potential energy", bn: "পারমাণবিক স্থিতিশক্তি" }
      ],
      answer: 0,
      explanation: {
        en: "Elastic potential energy is stored when an elastic object (like a spring) is stretched or compressed.",
        bn: "যখন একটি স্থিতিস্থাপক বস্তু (স্প্রিংয়ের মতো) প্রসারিত বা সংকুচিত হয় তখন স্থিতিস্থাপক স্থিতিশক্তি সঞ্চিত হয়।"
      }
    },
    {
      question: {
        en: "If a 2 kg object is lifted 5 meters above the ground, what is its gravitational potential energy? (g = 9.8 m/s²)",
        bn: "যদি একটি 2 kg বস্তুকে মাটি থেকে 5 মিটার উপরে তোলা হয়, তাহলে এর মহাকর্ষীয় স্থিতিশক্তি কত? (g = 9.8 m/s²)"
      },
      options: [
        { en: "98 J", bn: "98 J" },
        { en: "10 J", bn: "10 J" },
        { en: "49 J", bn: "49 J" },
        { en: "20 J", bn: "20 J" }
      ],
      answer: 0,
      explanation: {
        en: "PE = mgh = 2 kg × 9.8 m/s² × 5 m = 98 J",
        bn: "PE = mgh = 2 kg × 9.8 m/s² × 5 m = 98 J"
      }
    },
    {
      question: {
        en: "What happens to gravitational potential energy when an object falls?",
        bn: "যখন একটি বস্তু পড়ে যায় তখন মহাকর্ষীয় স্থিতিশক্তির কী হয়?"
      },
      options: [
        { en: "It converts to kinetic energy", bn: "এটি গতিশক্তিতে রূপান্তরিত হয়" },
        { en: "It remains constant", bn: "এটি স্থির থাকে" },
        { en: "It converts to thermal energy", bn: "এটি তাপশক্তিতে রূপান্তরিত হয়" },
        { en: "It disappears", bn: "এটি অদৃশ্য হয়ে যায়" }
      ],
      answer: 0,
      explanation: {
        en: "As an object falls, its potential energy decreases while its kinetic energy increases by the same amount (energy conservation).",
        bn: "একটি বস্তু পড়ার সাথে সাথে এর স্থিতিশক্তি হ্রাস পায় এবং এর গতিশক্তি একই পরিমাণে বৃদ্ধি পায় (শক্তি সংরক্ষণ)।"
      }
    },
    {
      question: {
        en: "Which of these represents chemical potential energy?",
        bn: "নিচের কোনটি রাসায়নিক স্থিতিশক্তিকে প্রতিনিধিত্ব করে?"
      },
      options: [
        { en: "Energy stored in food molecules", bn: "খাদ্য অণুতে সঞ্চিত শক্তি" },
        { en: "Energy of a book on a shelf", bn: "একটি বইয়ের শক্তি একটি তাকে রাখা অবস্থায়" },
        { en: "Energy in a compressed spring", bn: "একটি সংকুচিত স্প্রিংয়ে শক্তি" },
        { en: "Energy of flowing water", bn: "প্রবাহিত জলের শক্তি" }
      ],
      answer: 0,
      explanation: {
        en: "Chemical potential energy is stored in molecular bonds, like in food, batteries, or fuels.",
        bn: "রাসায়নিক স্থিতিশক্তি আণবিক বন্ধনে সঞ্চিত থাকে, যেমন খাদ্য, ব্যাটারি বা জ্বালানীতে।"
      }
    }
  ]
};

export default function PotentialEnergyQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Physics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  );
}