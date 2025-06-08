"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function TypesOfReactionsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `রাসায়নিক বিক্রিয়া হল পদার্থের রূপান্তর প্রক্রিয়া। প্রধান প্রকার:
- সংযোজন: দুটি পদার্থ মিলে একটি পদার্থ তৈরি করে।
- পচন: একটি পদার্থ ভেঙে দুটি বা ততোধিক পদার্থ তৈরি করে।
- একক স্থানান্তর: একটি মৌল অপরটির স্থান নেয়।
- দ্বৈত স্থানান্তর: দুটি যৌগের আয়ন বিনিময় করে।
- দহন: জ্বালানি অক্সিজেনের সাথে বিক্রিয়া করে তাপ উৎপন্ন করে।
উদাহরণ:
- সংযোজন: 2H₂ + O₂ → 2H₂O
- দহন: CH₄ + 2O₂ → CO₂ + 2H₂O
প্রয়োগ:
- শিল্প উৎপাদন।
- পরিবেশ রসায়ন।`
      : `Chemical reactions involve the transformation of substances. Main types:
- Combination: Two substances combine to form one product.
- Decomposition: One substance breaks into two or more products.
- Single Replacement: One element replaces another in a compound.
- Double Replacement: Ions in two compounds exchange places.
- Combustion: Fuel reacts with oxygen, releasing heat.
Examples:
- Combination: 2H₂ + O₂ → 2H₂O
- Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O
Applications:
- Industrial production.
- Environmental chemistry.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বিক্রিয়ার প্রকারভেদ" : "Types of Reactions"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "রাসায়নিক বিক্রিয়া হল পদার্থের রূপান্তর প্রক্রিয়া, যা বিভিন্ন প্রকারে শ্রেণীবদ্ধ করা হয়।"
                  : "Chemical reactions are processes where substances transform, classified into various types."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "বিক্রিয়ার প্রকারভেদ বিক্রিয়ক ও উৎপাদের প্রকৃতির উপর নির্ভর করে।"
                    : "Reaction types depend on the nature of substances and products formed."}
              </p>
            </div>
          </div>

          <h4 className="font-medium text-lg">
            {lang === "bn" ? "বিক্রিয়ার প্রকার" : "Types of Reactions"}
          </h4>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              {lang === "bn"
                ? "রাসায়নিক বিক্রিয়াগুলি পাঁচটি প্রধান প্রকারে ভাগ করা হয়।"
                : "Chemical reactions are categorized into five main types."}
            </p>
            <ul className="text-sm space-y-2">
              <li>
                • <strong>{lang === "bn" ? "সংযোজন" : "Combination"}</strong>: {lang === "bn" ? "দুটি বা ততোধিক পদার্থ একটি একটি উৎপাদ তৈরি করে।" : "Two or more substances form one product."} <br />
                <span className="font-mono">e.g., 2H₂ + O₂ → 2H₂O</span>
              </li>
              <li>
                • <strong>{lang === "bn" ? "পচন" : "Decomposition"}</strong>: {lang === "bn" ? "একটি যৌগ ভেঙে দুটি বা ততোধিক পদার্থ তৈরি করে।" : "One compound breaks into two or more substances."} <br />
                <span className="font-mono">e.g., 2H₂O → 2H₂ + O₂</span>
              </li>
              <li>
                • <strong>{lang === "bn" ? "একক স্থানান্তর" : "Single Replacement"}</strong>: {lang === "bn" ? "একটি মৌল যৌগের অপর একটি মৌলের স্থান নেয়।" : "One element replaces another in a compound."} <br />
                <span className="font-mono">e.g., Zn + CuSO₄ → ZnSO₄ + Cu</span>
              </li>
              <li>
                • <strong>{lang === "bn" ? "দ্বৈত স্থানান্তর" : "Double Replacement"}</strong>: {lang === "bn" ? "দুটি যৌগের আয়ন পরস্পরের সাথে বিনিময় হয়।" : "Ions in two compounds exchange places."} <br />
                <span className="font-mono">e.g., AgNO₃ + NaCl → AgCl + NaNO₃</span>
              </li>
              <li>
                • <strong>{lang === "bn" ? "দহন" : "Combustion"}</strong>: {lang === "bn" ? "জ্বালানি অক্সিজেনের সাথে বিক্রিয়া করে তাপ উৎপন্ন করে।" : "Fuel reacts with oxygen, releasing heat."} <br />
                <span className="font-mono">e.g., CH₄ + 2O₂ → CO₂ + 2H₂O</span>
              </li>
            </ul>
          </div>

          <h4 className="font-medium text-lg">
            {lang === "bn" ? "বিক্রিয়ার বৈশিষ্ট্য" : "Characteristics of Reactions"}
          </h4>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
            <p className="text-purple-700 dark:text-purple-300">
              {lang === "bn"
                ? "প্রতিটি বিক্রিয়ার নির্দিষ্ট বৈশিষ্ট্য রয়েছে যা তাদের শ্রেণীবদ্ধ করতে সহায়তা করে।"
                : "Each reaction type has specific characteristics that aid in classification."}
            </p>
            <ul className="text-sm space-y-1">
              <li>• {lang === "bn" ? "সংযোজন: একটি উৎপাদ।" : "Combination: One product."}</li>
              <li>• {lang === "bn" ? "পচন: একাধিক উৎপাদ।" : "Decomposition: Multiple products."}</li>
              <li>• {lang === "bn" ? "দহন: তাপ ও আলো।" : "Combustion: Heat and light."}</li>
            </ul>
          </div>

          <h4 className="font-medium text-lg">
            {lang === "bn" ? "উদাহরণ" : "Examples"}
          </h4>

          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
            <p className="text-green-700 dark:text-green-300">
              {lang === "bn"
                ? "বিভিন্ন বিক্রিয়ার উদাহরণ দৈনন্দিন ও শিল্পে দেখা যায়।"
                : "Examples of reactions are observed in daily life and industry."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{lang === "bn" ? "সংযোজন" : "Combination"}</p>
                <p className="text-sm font-mono">2Mg + O₂ → 2MgO</p>
              </div>
              <div>
                <p className="font-medium">{lang === "bn" ? "দহন" : "Combustion"}</p>
                <p className="text-sm font-mono">C₃H₈ + 5O₂ → 3CO₂ + 4H₂O</p>
              </div>
            </div>
          </div>

          <h4 className="font-medium text-lg">
            {lang === "bn" ? "বিক্রিয়ার প্রয়োগ" : "Applications of Reactions"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
              <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                {lang === "bn" ? "শিল্প" : "Industry"}
              </h5>
              <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                <li>• {lang === "bn" ? "ধাতু উৎপাদন" : "Metal production"}</li>
                <li>• {lang === "bn" ? "জ্বালানি উৎপাদন" : "Fuel production"}</li>
              </ul>
            </div>

            <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
              <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                {lang === "bn" ? "পরিবেশ" : "Environment"}
              </h5>
              <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                <li>• {lang === "bn" ? "বর্জ্য ব্যবস্থাপনা" : "Waste management"}</li>
                <li>• {lang === "bn" ? "দূষণ নিয়ন্ত্রণ" : "Pollution control"}</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
            </h4>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
              <li>• {lang === "bn" ? "বিক্রিয়ক ও উৎপাদ চিহ্নিত করুন।" : "Identify reactants and products."}</li>
              <li>• {lang === "bn" ? "বিক্রিয়ার ধরন শ্রেণীবদ্ধ করুন।" : "Classify reaction type."}</li>
              <li>• {lang === "bn" ? "দহনে অক্সিজেন মনে রাখুন।" : "Remember oxygen in combustion."}</li>
            </ul>
          </div>
        </div>

        <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
      </div>

      <LanguageToggle lang={lang} setLang={setLang} />

      <TopicChatbot />
    </CardContent>
  </Card>
)
}