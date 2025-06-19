// faradaysLawQuiz.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizContent } from "../../../../quiz/types";
import QuizControls from "../../../../quiz/quizControls";

const quizData: QuizContent = {
  title: {
    en: "Faraday's Law Quiz",
    bn: "ফ্যারাডের সূত্র কুইজ"
  },
  subtitle: {
    en: "Test your understanding of electromagnetic induction",
    bn: "তড়িৎ-চৌম্বকীয় আবেশ সম্পর্কে আপনার বোঝাপড়া পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What does Faraday's Law of Induction state?",
        bn: "ফ্যারাডের আবেশ সূত্র কী বলে?"
      },
      options: [
        { en: "The induced EMF is proportional to the rate of change of magnetic flux", bn: "প্ররোচিত EMF চৌম্বকীয় ফ্লাক্সের পরিবর্তনের হারের সমানুপাতিক" },
        { en: "The induced current is proportional to the magnetic field strength", bn: "প্ররোচিত তড়িৎপ্রবাহ চৌম্বক ক্ষেত্রের শক্তির সমানুপাতিক" },
        { en: "The magnetic flux is equal to the electric flux", bn: "চৌম্বকীয় ফ্লাক্স বৈদ্যুতিক ফ্লাক্সের সমান" },
        { en: "The induced voltage depends on the resistance of the coil", bn: "প্ররোচিত ভোল্টেজ কুণ্ডলীর রোধের উপর নির্ভর করে" }
      ],
      answer: 0,
      explanation: {
        en: "Faraday's Law states that the induced electromotive force (EMF) in any closed circuit is equal to the negative of the time rate of change of the magnetic flux through the circuit.",
        bn: "ফ্যারাডের সূত্র বলে যে কোনো বদ্ধ বর্তনীতে প্ররোচিত তড়িচ্চালক বল (EMF) বর্তনীর মধ্য দিয়ে চৌম্বকীয় ফ্লাক্সের সময়ের সাথে পরিবর্তনের হারের ঋণাত্মকের সমান।"
      }
    },
    {
      question: {
        en: "What is the SI unit of magnetic flux?",
        bn: "চৌম্বকীয় ফ্লাক্সের SI একক কী?"
      },
      options: [
        { en: "Weber (Wb)", bn: "ওয়েবার (Wb)" },
        { en: "Tesla (T)", bn: "টেসলা (T)" },
        { en: "Henry (H)", bn: "হেনরি (H)" },
        { en: "Farad (F)", bn: "ফ্যারাড (F)" }
      ],
      answer: 0,
      explanation: {
        en: "Magnetic flux is measured in Weber (Wb), where 1 Wb = 1 T·m².",
        bn: "চৌম্বকীয় ফ্লাক্স ওয়েবার (Wb) এককে পরিমাপ করা হয়, যেখানে 1 Wb = 1 T·m²।"
      }
    },
    {
      question: {
        en: "Which of the following would NOT increase the induced EMF in a coil?",
        bn: "নিচের কোনটি একটি কুণ্ডলীতে প্ররোচিত EMF বাড়াবে না?"
      },
      options: [
        { en: "Increasing the resistance of the wire", bn: "তারের রোধ বৃদ্ধি করা" },
        { en: "Increasing the number of turns in the coil", bn: "কুণ্ডলীর পাক সংখ্যা বৃদ্ধি করা" },
        { en: "Increasing the rate of change of magnetic flux", bn: "চৌম্বকীয় ফ্লাক্সের পরিবর্তনের হার বৃদ্ধি করা" },
        { en: "Using a stronger magnet", bn: "শক্তিশালী চুম্বক ব্যবহার করা" }
      ],
      answer: 0,
      explanation: {
        en: "The induced EMF depends on the rate of change of flux (Faraday's Law) and number of turns (N), but not directly on the resistance of the wire.",
        bn: "প্ররোচিত EMF ফ্লাক্সের পরিবর্তনের হার (ফ্যারাডের সূত্র) এবং পাক সংখ্যার (N) উপর নির্ভর করে, কিন্তু সরাসরি তারের রোধের উপর নয়।"
      }
    },
    {
      question: {
        en: "What is Lenz's Law related to?",
        bn: "লেঞ্জের সূত্র কীসের সাথে সম্পর্কিত?"
      },
      options: [
        { en: "Direction of induced current", bn: "প্ররোচিত তড়িৎপ্রবাহের দিক" },
        { en: "Magnitude of induced EMF", bn: "প্ররোচিত EMF এর পরিমাণ" },
        { en: "Strength of magnetic field", bn: "চৌম্বক ক্ষেত্রের শক্তি" },
        { en: "Resistance of the conductor", bn: "পরিবাহীর রোধ" }
      ],
      answer: 0,
      explanation: {
        en: "Lenz's Law states that the direction of the induced current will oppose the change in magnetic flux that produced it.",
        bn: "লেঞ্জের সূত্র বলে যে প্ররোচিত তড়িৎপ্রবাহের দিক সেই চৌম্বকীয় ফ্লাক্সের পরিবর্তনের বিরোধিতা করবে যা এটি তৈরি করেছে।"
      }
    },
    {
      question: {
        en: "If a coil of 50 turns experiences a change in magnetic flux of 0.2 Wb in 0.5 seconds, what is the induced EMF?",
        bn: "যদি 50 পাকের একটি কুণ্ডলী 0.5 সেকেন্ডে 0.2 Wb চৌম্বকীয় ফ্লাক্সের পরিবর্তন অনুভব করে, তাহলে প্ররোচিত EMF কত?"
      },
      options: [
        { en: "20 V", bn: "20 V" },
        { en: "5 V", bn: "5 V" },
        { en: "0.004 V", bn: "0.004 V" },
        { en: "250 V", bn: "250 V" }
      ],
      answer: 0,
      explanation: {
        en: "Using Faraday's Law: EMF = -N(ΔΦ/Δt) = -50 × (0.2/0.5) = -20 V (magnitude is 20 V).",
        bn: "ফ্যারাডের সূত্র ব্যবহার করে: EMF = -N(ΔΦ/Δt) = -50 × (0.2/0.5) = -20 V (পরিমাণ 20 V)।"
      }
    }
  ]
};

export default function FaradaysLawQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Physics Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  );
}