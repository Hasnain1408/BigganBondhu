"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Conservation Biology Quiz",
    bn: "সংরক্ষণ জীববিজ্ঞান কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of biodiversity conservation",
    bn: "জৈব বৈচিত্র্য সংরক্ষণ সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What is the primary goal of conservation biology?",
        bn: "সংরক্ষণ জীববিজ্ঞানের প্রাথমিক লক্ষ্য কী?"
      },
      options: [
        { en: "To study animal behavior", bn: "প্রাণীর আচরণ অধ্যয়ন করা" },
        { en: "To protect and manage biodiversity", bn: "জৈব বৈচিত্র্য রক্ষা ও ব্যবস্থাপনা করা" },
        { en: "To develop new agricultural techniques", bn: "নতুন কৃষি প্রযুক্তি উন্নয়ন করা" },
        { en: "To study microbial organisms", bn: "অণুজীব অধ্যয়ন করা" }
      ],
      answer: 1,
      explanation: {
        en: "Conservation biology focuses on protecting species, habitats, and ecosystems from extinction.",
        bn: "সংরক্ষণ জীববিজ্ঞান প্রজাতি, বাসস্থান এবং বাস্তুতন্ত্রকে বিলুপ্তি থেকে রক্ষার উপর দৃষ্টি নিবদ্ধ করে।"
      }
    },
    {
      question: {
        en: "Which of these is considered a 'biodiversity hotspot'?",
        bn: "নিচের কোনটি 'জৈব বৈচিত্র্য হটস্পট' হিসেবে বিবেচিত?"
      },
      options: [
        { en: "The Amazon Rainforest", bn: "আমাজন রেইনফরেস্ট" },
        { en: "The Sahara Desert", bn: "সাহারা মরুভূমি" },
        { en: "Antarctica", bn: "অ্যান্টার্কটিকা" },
        { en: "The Great Plains", bn: "গ্রেট প্লেইন্স" }
      ],
      answer: 0,
      explanation: {
        en: "The Amazon Rainforest contains about 10% of the world's known biodiversity.",
        bn: "আমাজন রেইনফরেস্টে বিশ্বের প্রায় ১০% পরিচিত জৈব বৈচিত্র্য রয়েছে।"
      }
    },
    {
      question: {
        en: "What does IUCN stand for?",
        bn: "IUCN-এর পূর্ণরূপ কী?"
      },
      options: [
        { en: "International Union for Conservation of Nature", bn: "ইন্টারন্যাশনাল ইউনিয়ন ফর কনজারভেশন অফ নেচার" },
        { en: "International University of Conservation Nations", bn: "ইন্টারন্যাশনাল ইউনিভার্সিটি অফ কনজারভেশন নেশনস" },
        { en: "Institute for Urban Conservation Needs", bn: "ইনস্টিটিউট ফর আরবান কনজারভেশন নিডস" },
        { en: "International United Conservation Network", bn: "ইন্টারন্যাশনাল ইউনাইটেড কনজারভেশন নেটওয়ার্ক" }
      ],
      answer: 0,
      explanation: {
        en: "IUCN is the global authority on the status of the natural world and measures needed to safeguard it.",
        bn: "IUCN হল প্রাকৃতিক বিশ্বের অবস্থা এবং এটিকে সুরক্ষিত করার জন্য প্রয়োজনীয় ব্যবস্থার উপর বৈশ্বিক কর্তৃপক্ষ।"
      }
    },
    {
      question: {
        en: "Which of these is NOT a major threat to biodiversity?",
        bn: "নিচের কোনটি জৈব বৈচিত্র্যের জন্য প্রধান হুমকি নয়?"
      },
      options: [
        { en: "Habitat destruction", bn: "বাসস্থান ধ্বংস" },
        { en: "Climate change", bn: "জলবায়ু পরিবর্তন" },
        { en: "Natural selection", bn: "প্রাকৃতিক নির্বাচন" },
        { en: "Invasive species", bn: "আক্রমণাত্মক প্রজাতি" }
      ],
      answer: 2,
      explanation: {
        en: "Natural selection is an evolutionary process, not a conservation threat.",
        bn: "প্রাকৃতিক নির্বাচন একটি বিবর্তনীয় প্রক্রিয়া, সংরক্ষণের হুমকি নয়।"
      }
    },
    {
      question: {
        en: "What percentage of the Earth's land surface is currently protected?",
        bn: "বর্তমানে পৃথিবীর ভূপৃষ্ঠের কত শতাংশ সুরক্ষিত?"
      },
      options: [
        { en: "About 5%", bn: "প্রায় ৫%" },
        { en: "About 15%", bn: "প্রায় ১৫%" },
        { en: "About 25%", bn: "প্রায় ২৫%" },
        { en: "About 35%", bn: "প্রায় ৩৫%" }
      ],
      answer: 1,
      explanation: {
        en: "As of 2023, approximately 15% of land and freshwater areas are protected globally.",
        bn: "২০২৩ সাল পর্যন্ত, বৈশ্বিকভাবে প্রায় ১৫% স্থল ও মিঠা পানির এলাকা সুরক্ষিত।"
      }
    }
  ]
}

export default function ConservationBiologyQuiz() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quizData.title.en}</CardTitle>
      </CardHeader>
      <CardContent>
        <QuizControls quizData={quizData} />
      </CardContent>
    </Card>
  )
}