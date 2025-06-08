"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Groups and Families Quiz",
    bn: "গ্রুপ এবং পরিবার কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of groups and families in the periodic table",
    bn: "পর্যায় সারণীর গ্রুপ এবং পরিবার সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "Which group is known as the alkali metals?",
        bn: "কোন গ্রুপটি ক্ষার ধাতু হিসেবে পরিচিত?"
      },
      options: [
        { en: "Group 1", bn: "গ্রুপ ১" },
        { en: "Group 2", bn: "গ্রুপ ২" },
        { en: "Group 17", bn: "গ্রুপ ১৭" },
        { en: "Group 18", bn: "গ্রুপ ১৮" }
      ],
      answer: 0,
      explanation: {
        en: "Group 1 elements, excluding hydrogen, are called alkali metals due to their high reactivity and ability to form basic hydroxides.",
        bn: "গ্রুপ ১- এর মৌলগুলি, হাইড্রোজেন ছাড়া, ক্ষার ধাতু বলা হয় কারণ এদের উচ্চ প্রতিক্রিয়াশীলতা এবং ক্ষারীয় হাইড্রক্সাইড গঠনের ক্ষমতা।"
      }
    },
    {
      question: {
        en: "How many valence electrons do halogens (Group 17) have?",
        bn: "হ্যালোজেন (গ্রুপ ১৭) এর কতটি ভ্যালেন্স ইলেকট্রন থাকে?"
      },
      options: [
        { en: "1", bn: "1" },
        { en: "2", bn: "2" },
        { en: "7", bn: "7" },
        { en: "8", bn: "8" }
      ],
      answer: 2,
      explanation: {
        en: "Halogens in Group 17 have 7 valence electrons, making them highly reactive as they need one electron to achieve a stable octet.",
        bn: "গ্রুপ ১৭- এর হ্যালোজেনের ৭টি ভ্যালেন্স ইলেকট্রন থাকে, যা তাদের অত্যন্ত প্রতিক্রিয়াশীল করে কারণ তারা স্থিতিশীল অষ্টক পূর্ণ করতে একটি ইলেকট্রন প্রয়োজন।"
      }
    },
    {
      question: {
        en: "Which element is NOT a noble gas?",
        bn: "কোন মৌলটি উৎকৃষ্ট গ্যাস নয়?"
      },
      options: [
        { en: "Ne", bn: "Ne" },
        { en: "Ar", bn: "Ar" },
        { en: "Cl", bn: "Cl" },
        { en: "Kr", bn: "Kr" }
      ],
      answer: 2,
      explanation: {
        en: "Chlorine (Cl) is a halogen (Group 17), not a noble gas. Noble gases (Group 18) include Ne, Ar, and Kr, which are inert.",
        bn: "ক্লোরিন (Cl) হ্যালোজেন (গ্রুপ ১৭), উৎকৃষ্ট গ্যাস নয়। উৎকৃষ্ট গ্যাস (গ্রুপ ১৮) এর মধ্যে Ne, Ar, এবং Kr রয়েছে, যা অপ্রতিক্রিয়াশীল।"
      }
    },
    {
      question: {
        en: "Why are noble gases (Group 18) unreactive?",
        bn: "উৎকৃষ্ট গ্যাস (গ্রুপ ১৮) কেন অপ্রতিক্রিয়াশীল?"
      },
      options: [
        { en: "They have 1 valence electron", bn: "তাদের ১টি ভ্যালেন্স ইলেকট্রন" },
        { en: "They have a full valence shell", bn: "তাদের পূর্ণ ভ্যালেন্স শেল" },
        { en: "They are metals", bn: "তারা ধাতু" },
        { en: "They form strong bonds", bn: "তারা শক্তিশালী বন্ধন গঠন করে" }
      ],
      answer: 1,
      explanation: {
        en: "Noble gases have a full valence shell (8 electrons, except He with 2), making them stable and unreactive.",
        bn: "উৎকৃষ্ট গ্যাসের পূর্ণ ভ্যালেন্স শেল থাকে (৮টি ইলেকট্রন, He ব্যতীত ২টি), যা তাদের স্থিতিশীল এবং অপ্রতিক্রিয়াশীল করে।"
      }
    },
    {
      question: {
        en: "Which group’s reactivity increases down the periodic table?",
        bn: "কোন গ্রুপের প্রতিক্রিয়াশীলতা পর্যায় সারণীতে নিচে বাড়ে?"
      },
      options: [
        { en: "Group 1", bn: "গ্রুপ ১" },
        { en: "Group 17", bn: "গ্রুপ ১৭" },
        { en: "Group 18", bn: "গ্রুপ ১৮" },
        { en: "Group 16", bn: "গ্রুপ ১৬" }
      ],
      answer: 0,
      explanation: {
        en: "Group 1 (alkali metals) reactivity increases down the table due to larger atomic size and easier loss of valence electrons.",
        bn: "গ্রুপ ১ (ক্ষার ধাতু) এর প্রতিক্রিয়াশীলতা সারয় সারণীতে নিচে বাড়ে কারণ বড় পারমাণবিক আকার এবং ভ্যালেন্স ইলেকট্রন হারানো সহজ হয়।"
      }
    }
  ]
}

export default function GroupsAndFamiliesQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-semibold">Chemistry Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}