"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function BalancingEquationsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `রাসায়নিক সমীকরণ সামঞ্জস্যকরণে প্রতিটি মৌলের পরমাণুর সংখ্যা উভয় পক্ষে সমান করা হয়।
মূল ধারণা:
- ভর সংরক্ষণ: বিক্রিয়ক এবং উৎপাদে সমান পরমাণু।
- গুণাঙ্ক: পরমাণু সংখ্যা সামঞ্জস্য করতে ব্যবহৃত।
পদক্ষেপ:
- সমীকরণ লিখুন।
- প্রতিটি মৌল গণনা করুন।
- গুণাঙ্ক সামঞ্জস্য করুন।
উদাহরণ:
- CH₄ + 2O₂ → CO₂ + 2H₂O
প্রয়োগ:
- শিল্প প্রক্রিয়া।
- রাসায়নিক বিশ্লেষণ।`
      : `Balancing chemical equations ensures the same number of each atom type on both sides, conserving mass.
Key Concepts:
- Conservation of Mass: Equal atoms in reactants and products.
- Coefficients: Used to adjust atom counts.
Steps:
- Write the equation.
- Count atoms of each element.
- Adjust coefficients.
Examples:
- CH₄ + 2O₂ → CO₂ + 2H₂O
Applications:
- Industrial processes.
- Chemical analysis.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "রাসায়নিক সমীকরণ সামঞ্জস্যকরণ" : "Balancing Equations"}
            </h3>
            <p className="text-base">
              {lang === "bn"
                ? "রাসায়নিক সমীকরণ সামঞ্জস্যকরণ ভর সংরক্ষণের নিয়ম মান্য করে।"
                : "Balancing chemical equations ensures the law of conservation of mass is followed."}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
          </h4>
          <p className="text-blue-700 dark:text-blue-300">
            {lang === "bn"
              ? "উভয় পক্ষে পরমাণুর সমান সংখ্যা ভর সংরক্ষণ প্রকাশ করে।"
              : "Equal numbers of atoms on both sides reflect mass conservation."}
          </p>
        </div>

        <h4 className="font-medium text-lg">
          {lang === "bn" ? "সমীকরণ সামঞ্জস্যকরণের পদক্ষেপ" : "Steps to Balance Equations"}
        </h4>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-3">
          <p className="text-gray-700 dark:text-gray-300">
            {lang === "bn"
              ? "সমীকরণ সামঞ্জস্যকরণের একটি পদ্ধতিগত উপায়।"
              : "A systematic method to balance equations."}
          </p>
          <ul className="text-sm space-y-1">
            <li>• {lang === "bn" ? "অসামঞ্জস্য সমীকরণ লিখুন।" : "Write the unbalanced equation."}</li>
            <li>• {lang === "bn" ? "প্রতিটি মৌলের পরমাণু গণনা করুন।" : "Count atoms of each element."}</li>
            <li>• {lang === "bn" ? "পরমাণু সামঞ্জস্য করতে গুণাঙ্ক সামঞ্জস্য করুন।" : "Adjust coefficients to balance atoms."}</li>
            <li>• {lang === "bn" ? "পরমাণু সমতা যাচাই করুন।" : "Verify atom balance."}</li>
          </ul>
        </div>

        <h4 className="font-medium text-lg">
          {lang === "bn" ? "সামঞ্জস্যপূর্ণ সমীকরণের বৈশিষ্ট্য" : "Characteristics of Balanced Equations"}
        </h4>

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
          <p className="text-purple-700 dark:text-purple-300">
            {lang === "bn"
              ? "সামঞ্জস্যপূর্ণ সমীকরণ প্রকৃত রাসায়নিক রূপান্তর প্রকাশ করে।"
              : "Balanced equations reflect real chemical transformations."}
          </p>
          <ul className="text-sm space-y-1">
            <li>• {lang === "bn" ? "উভয় পক্ষে সমান পরমাণু।" : "Equal atoms on both sides."}</li>
            <li>• {lang === "bn" ? "ক্ষুদ্রতম পূর্ণসংখ্যা ব্যবহার।" : "Uses smallest whole numbers."}</li>
            <li>• {lang === "bn" ? "ভর সংরক্ষণ করে।" : "Conserves mass."}</li>
          </ul>
        </div>

        <h4 className="font-medium text-lg">
          {lang === "bn" ? "উদাহরণ" : "Examples"}
        </h4>

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
          <p className="text-green-700 dark:text-green-300">
            {lang === "bn"
              ? "উদাহরণগুলি সমীকরণ সামঞ্জস্য করার পদ্ধতি দেখায়।"
              : "Examples show how to balance equations."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">{lang === "bn" ? "দাহ" : "Combustion"}</p>
              <p className="text-sm font-mono">CH₄ + 2O₂ → CO₂ + 2H₂O</p>
            </div>
            <div>
              <p className="font-medium">{lang === "bn" ? "যোজন" : "Combination"}</p>
              <p className="text-sm font-mono">2H₂ + O₂ → 2H₂O</p>
            </div>
          </div>
        </div>

        <h4 className="font-medium text-lg">
          {lang === "bn" ? "সমীকরণ সামঞ্জস্যকরণের প্রয়োগ" : "Applications of Balancing Equations"}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
            <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
              {lang === "bn" ? "শিল্প" : "Industry"}
            </h5>
            <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
              <li>• {lang === "bn" ? "রাসায়নিক উৎপাদন" : "Chemical production"}</li>
              <li>• {lang === "bn" ? "প্রক্রিয়া অপ্টিমাইজেশন" : "Process optimization"}</li>
            </ul>
          </div>

          <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
            <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
              {lang === "bn" ? "গবেষণা" : "Research"}
            </h5>
            <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
              <li>• {lang === "bn" ? "স্টয়কিওমেট্রি গণনা" : "Stoichiometry calculations"}</li>
              <li>• {lang === "bn" ? "বিক্রিয়া পূর্বাভাস" : "Reaction prediction"}</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
            <li>• {lang === "bn" ? "জটিল অণু দিয়ে শুরু করুন।" : "Start with complex molecules."}</li>
            <li>• {lang === "bn" ? "অক্সিজেন শেষে সামঞ্জস্য করুন।" : "Balance oxygen last."}</li>
            <li>• {lang === "bn" ? "ক্ষুদ্রতম গুণাঙ্ক ব্যবহার করুন।" : "Use smallest coefficients."}</li>
          </ul>
        </div>

        <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        <LanguageToggle lang={lang} setLang={setLang} />
        <TopicChatbot />
      </CardContent>
    </Card>
  )
}
