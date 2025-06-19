
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function GeneralRelativityContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `সাধারণ আপেক্ষিকতা মহাকর্ষকে ভর এবং শক্তির দ্বারা সৃষ্ট স্থান-কালের বক্রতা হিসেবে বর্ণনা করে, বিশেষ আপেক্ষিকতাকে ত্বরিত ফ্রেমে প্রসারিত করে।
মূল ধারণা:
- সমতুল্যতার নীতি
- স্থান-কালের বক্রতা
- জিওডেসিক
- মহাকর্ষীয় সময় প্রসারণ
- আইনস্টাইনের ক্ষেত্র সমীকরণ
সূত্রাবলী:
- সময় প্রসারণ: Δt = Δt₀ / √(1 - 2GM/rc²)
- আইনস্টাইনের সমীকরণ: Gμν = 8πTμν`
      : `General Relativity describes gravity as the curvature of spacetime caused by mass and energy, extending special relativity to accelerated frames.
Key Concepts:
- Equivalence principle
- Spacetime curvature
- Geodesics
- Gravitational time dilation
- Einstein’s field equations
Formulas:
- Time dilation: Δt = Δt₀ / √(1 - 2GM/rc²)
- Einstein’s equation: Gμν = 8πTμν`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "সাধারণ আপেক্ষিকতা" : "General Relativity"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "সাধারণ আপেক্ষিকতা, আইনস্টাইনের ১৯১৫ সালের তত্ত্ব, মহাকর্ষকে স্থান-কালের জ্যামিতিক বক্রতা হিসেবে ব্যাখ্যা করে।"
                  : "General Relativity, Einstein’s 1915 theory, explains gravity as the geometric curvature of spacetime."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ভর স্থান-কালকে বক্র করে, এবং বক্র স্থান-কাল বস্তুর গতি নির্ধারণ করে।"
                    : "Mass curves spacetime, and curved spacetime dictates the motion of objects."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সমতুল্যতার নীতি" : "Equivalence Principle"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "ত্বরিত ফ্রেমে থাকা এবং মহাকর্ষীয় ক্ষেত্রে থাকা সমতুল্য।"
                  : "Being in an accelerated frame is equivalent to being in a gravitational field."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "উদাহরণ:" : "Example:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "লিফটে ত্বরণ" : "Acceleration in an elevator"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মহাকর্ষীয় সময় প্রসারণ" : "Gravitational Time Dilation"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "শক্তিশালী মহাকর্ষীয় ক্ষেত্রে ঘড়ি ধীরে চলে।"
                  : "Clocks in stronger gravitational fields run slower."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "সূত্র:" : "Formula:"}
                  </p>
                  <p className="font-mono text-lg">Δt = Δt₀ / √(1 - 2GM/rc²)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "G = মহাকর্ষীয় ধ্রুবক, M = ভর" : "G = gravitational constant, M = mass"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "আইনস্টাইনের ক্ষেত্র সমীকরণ" : "Einstein’s Field Equations"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "স্থান-কালের বক্রতা ভর-শক্তির বণ্টনের সাথে সম্পর্কিত।"
                  : "Spacetime curvature is related to the distribution of mass-energy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সমীকরণ:" : "Equation:"}</p>
                  <p className="font-mono text-lg">Gμν = 8πTμν</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জিপিএস সমন্বয়" : "GPS corrections"}</li>
                  <li>• {lang === "bn" ? "মহাকর্ষীয় তরঙ্গ সনাক্তকরণ" : "Gravitational wave detection"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "জ্যোতির্বিজ্ঞান" : "Astronomy"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "কৃষ্ণগহ্বর" : "Black holes"}</li>
                  <li>• {lang === "bn" ? "মহাবিশ্বের প্রসারণ" : "Universe expansion"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "মহাকর্ষ স্থান-কালের বক্রতা।" : "Gravity is spacetime curvature."}</li>
                <li>• {lang === "bn" ? "জিওডেসিক গতিপথ নির্ধারণ করে।" : "Geodesics determine paths."}</li>
                <li>• {lang === "bn" ? "আলো বক্র স্থান-কালে বাঁকে।" : "Light bends in curved spacetime."}</li>
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
