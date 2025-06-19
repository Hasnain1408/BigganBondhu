
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Relativity Paradoxes Quiz",
    bn: "আপেক্ষিকতার প্যারাডক্স কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of relativity paradoxes",
    bn: "আপেক্ষিকতার প্যারাডক্স সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What resolves the twin paradox?",
        bn: "যমজ প্যারাডক্সের সমাধান কী?"
      },
      options: [
        { en: "Absolute time", bn: "নিরঙ্কুশ সময়" },
        { en: "Non-inertial frames", bn: "অ-ইনার্শিয়াল ফ্রেম" },
        { en: "Constant velocity", bn: "ধ্রুব গতি" },
        { en: "Gravitational force", bn: "মহাকর্ষীয় বল" }
      ],
      answer: 1,
      explanation: {
        en: "The twin paradox is resolved because the traveling twin’s acceleration (non-inertial frame) breaks the symmetry, causing less proper time to elapse for them.",
        bn: "যমজ প্যারাডক্স সমাধান হয় কারণ ভ্রমণকারী যমজের ত্বরণ (অ-ইনার্শিয়াল ফ্রেম) প্রতিসাম্য ভাঙে, যার ফলে তাদের জন্য কম সঠিক সময় অতিবাহিত হয়।"
      }
    },
    {
      question: {
        en: "What causes the ladder paradox?",
        bn: "মই প্যারাডক্সের কারণ কী?"
      },
      options: [
        { en: "Time dilation", bn: "সময় প্রসারণ" },
        { en: "Length contraction", bn: "দৈর্ঘ্য সংকোচন" },
        { en: "Gravitational lensing", bn: "মহাকর্ষীয় লেন্সিং" },
        { en: "Energy conservation", bn: "শক্তি সংরক্ষণ" }
      ],
      answer: 1,
      explanation: {
        en: "The ladder paradox arises from length contraction, where a fast-moving ladder appears shorter, but relativity of simultaneity resolves the apparent contradiction.",
        bn: "মই প্যারাডক্স দৈর্ঘ্য সংকোচন থেকে উদ্ভূত হয়, যেখানে দ্রুতগতির মই ছোট দেখায়, কিন্তু সমকালীনতার আপেক্ষিকতা আপাত বিরোধিতা সমাধান করে।"
      }
    },
    {
      question: {
        en: "What is the relativity of simultaneity?",
        bn: "সমকালীনতার আপেক্ষিকতা কী?"
      },
      options: [
        { en: "Events are always simultaneous", bn: "ঘটনাগুলি সবসময় একযোগে ঘটে" },
        { en: "Events simultaneous in one frame may not be in another", bn: "এক ফ্রেমে একযোগে ঘটনা অন্য ফ্রেমে নাও হতে পারে" },
        { en: "Time is absolute", bn: "সময় নিরঙ্কুশ" },
        { en: "Space is fixed", bn: "স্থান স্থির" }
      ],
      answer: 1,
      explanation: {
        en: "Relativity of simultaneity means events simultaneous in one reference frame may occur at different times in another, due to relative motion.",
        bn: "সমকালীনতার আপেক্ষিকতার অর্থ হল একটি রেফারেন্স ফ্রেমে একযোগে ঘটনা অন্য ফ্রেমে ভিন্ন সময়ে ঘটতে পারে, আপেক্ষিক গতির কারণে।"
      }
    },
    {
      question: {
        en: "In the pole-barn paradox, what allows the pole to fit in the barn?",
        bn: "পোল-বার্ন প্যারাডক্সে, পোলটি শস্যাগারে ফিট করতে কী সাহায্য করে?"
      },
      options: [
        { en: "Time dilation", bn: "সময় প্রসারণ" },
        { en: "Length contraction", bn: "দৈর্ঘ্য সংকোচন" },
        { en: "Gravitational time dilation", bn: "মহাকর্ষীয় সময় প্রসারণ" },
        { en: "Mass increase", bn: "ভর বৃদ্ধি" }
      ],
      answer: 1,
      explanation: {
        en: "Length contraction allows the fast-moving pole to appear shorter and fit into the barn, resolved by considering simultaneity.",
        bn: "দৈর্ঘ্য সংকোচন দ্রুতগতির পোলকে ছোট দেখায় এবং শস্যাগারে ফিট করতে সাহায্য করে, সমকালীনতা বিবেচনা করে সমাধান হয়।"
      }
    },
    {
      question: {
        en: "Why does the traveling twin age less in the twin paradox?",
        bn: "যমজ প্যারাডক্সে ভ্রমণকারী যমজ কেন কম বয়সী হয়?"
      },
      options: [
        { en: "Higher velocity", bn: "উচ্চ গতি" },
        { en: "Acceleration and time dilation", bn: "ত্বরণ এবং সময় প্রসারণ" },
        { en: "Lower gravity", bn: "কম মহাকর্ষ" },
        { en: "Shorter distance", bn: "ছোট দূরত্ব" }
      ],
      answer: 1,
      explanation: {
        en: "The traveling twin ages less due to time dilation during high-speed travel and acceleration, which breaks the symmetry of inertial frames.",
        bn: "ভ্রমণকারী যমজ উচ্চ গতির ভ্রমণ এবং ত্বরণের সময় সময় প্রসারণের কারণে কম বয়সী হয়, যা ইনার্শিয়াল ফ্রেমের প্রতিসাম্য ভাঙে।"
      }
    }
  ]
}

export default function RelativityParadoxesQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Relativity Paradoxes Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}
