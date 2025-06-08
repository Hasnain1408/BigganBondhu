"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PeriodicTrendsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পর্যায় সারণীতে মৌলগুলির বৈশিষ্ট্যের ধরণকে পর্যায় প্রবণতা বলে, যেমন পারমাণবিক ব্যাসার্ধ, আয়নীকরণ শক্তি এবং তড়িৎ ঋণাত্মকতা।
মূল ধারণা:
- পারমাণবিক ব্যাসার্ধ: বাম থেকে ডানে কমে, উপর থেকে নিচে বাড়ে।
- আয়নীকরণ শক্তি: বাম থেকে ডানে বাড়ে, উপর থেকে নিচে কমে।
- তড়িৎ ঋণাত্মকতা: বাম থেকে ডানে বাড়ে।
উদাহরণ:
- Na > Mg (পারমাণবিক ব্যাসার্ধ)।
- F > Cl (তড়িৎ ঋণাত্মকতা)।
প্রয়োগ:
- মৌলের প্রতিক্রিয়াশীলতা।
- রাসায়নিক বন্ধন।`
      : `Periodic trends describe patterns in elemental properties across the periodic table, such as atomic radius, ionization energy, and electronegativity.
Key Concepts:
- Atomic Radius: Decreases left to right, increases top to bottom.
- Ionization Energy: Increases left to right, decreases top to bottom.
- Electronegativity: Increases left to right.
Examples:
- Na > Mg (atomic radius).
- F > Cl (electronegativity).
Applications:
- Element reactivity.
- Chemical bonding.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পর্যায় প্রবণতা" : "Periodic Trends"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পর্যায় প্রবণতা পর্যায় সারণীতে মৌলের বৈশিষ্ট্যের নিয়মিত পরিবর্তন বোঝায়।"
                  : "Periodic trends refer to regular variations in element properties across the periodic table."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "প্রবণতাগুলি মৌলের পারমাণবিক গঠন এবং ইলেকট্রন বিন্যাসের উপর নির্ভর করে।"
                    : "Trends depend on atomic structure and electron configuration."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান প্রবণতা" : "Main Trends"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পর্যায় সারণীতে বিভিন্ন বৈশিষ্ট্যের পরিবর্তন।"
                  : "Changes in properties across the periodic table."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "পারমাণবিক ব্যাসার্ধ" : "Atomic Radius"}</strong>: 
                  {lang === "bn" ? "পর্যায়ে বাম থেকে ডানে কমে, গ্রুপে উপর থেকে নিচে বাড়ে।" : "Decreases across a period, increases down a group."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "আয়নীকরণ শক্তি" : "Ionization Energy"}</strong>: 
                  {lang === "bn" ? "পর্যায়ে বাম থেকে ডানে বাড়ে, গ্রুপে উপর থেকে নিচে কমে।" : "Increases across a period, decreases down a group."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "তড়িৎ ঋণাত্মকতা" : "Electronegativity"}</strong>: 
                  {lang === "bn" ? "পর্যায়ে বাম থেকে ডানে বাড়ে।" : "Increases across a period."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "প্রবণতাগুলি মৌলের তুলনা করতে সহায়ক।"
                  : "Trends help compare elements."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পারমাণবিক ব্যাসার্ধ" : "Atomic Radius"}</p>
                  <p className="text-sm">Li > Na > K</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "তড়িৎ ঋণাত্মকতা" : "Electronegativity"}</p>
                  <p className="text-sm">F > O > N</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "রসায়ন" : "Chemistry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "প্রতিক্রিয়াশীলতা পূর্বাভাস" : "Predict reactivity"}</li>
                  <li>• {lang === "bn" ? "বন্ধন প্রকৃতি" : "Bonding nature"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিক্ষা" : "Education"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "মৌল শ্রেণীবদ্ধকরণ" : "Element classification"}</li>
                  <li>• {lang === "bn" ? "প্রবণতা শিক্ষণ" : "Teaching trends"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "পর্যায়ে ডানে প্রবণতা বাড়ে।" : "Trends increase across periods."}</li>
                <li>• {lang === "bn" ? "গ্রুপে নিচে প্রবণতা পরিবর্তন।" : "Trends change down groups."}</li>
                <li>• {lang === "bn" ? "ইলেকট্রন বিন্যাস মনে রাখুন।" : "Consider electron configuration."}</li>
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