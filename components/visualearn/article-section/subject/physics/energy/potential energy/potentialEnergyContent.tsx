
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PotentialEnergyContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বিভব শক্তি বস্তুর অবস্থান বা গঠনের শক্তি।
মূল ধারণা:
- সূত্র: PE = mgh (মাধ্যাকর্ষণ), PE = ½kx² (স্থিতিস্থাপক)।
- প্রকার: মাধ্যাকর্ষণ, স্থিতিস্থাপক, রাসায়নিক।
- একক: জুল (J)।
ধারণা:
- সঞ্চিত: অবস্থান ভিত্তিক।
- রূপান্তর: গতিশক্তিতে।
- সংরক্ষণ: শক্তি স্থির।
বৈশিষ্ট্য:
- অবস্থান: উচ্চতা বা বিকৃতি।
উদাহরণ:
- পানি: বাঁধে সঞ্চিত।
- স্প্রিং: সংকুচিত।
প্রয়োগ:
- প্রকৌশল: বাঁধ নির্মাণ।
- খেলাধুলা: তীরন্দাজ।
- বিজ্ঞান: শক্তি বিশ্লেষণ।
টিপস:
- প্রকার জানুন।
- সূত্র ব্যবহার করুন।
- সমস্যা সমাধান করুন।`
      : `Potential Energy is energy stored due to position or configuration.
Key Concepts:
- Formula: PE = mgh (gravitational), PE = ½kx² (elastic).
- Types: Gravitational, elastic, chemical.
- Unit: Joule (J).
Assumptions:
- Stored: Position-based.
- Transformation: To kinetic energy.
- Conservation: Energy constant.
Properties:
- Position: Height or deformation.
Examples:
- Water: Stored in dam.
- Spring: Compressed.
Applications:
- Engineering: Dam construction.
- Sports: Archery.
- Science: Energy analysis.
Tips:
- Know types.
- Use formulas.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বিভব শক্তি" : "Potential Energy"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "অবস্থান বা গঠনের শক্তি।"
                  : "Energy due to position or configuration."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "বিভব শক্তির প্রকার এবং সূত্র।"
                    : "Types and formulas of potential energy."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "বিভব শক্তির ভিত্তি।"
                  : "Basis of potential energy."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "সঞ্চিত" : "Stored"}</strong>: 
                  {lang === "bn" ? "অবস্থান ভিত্তিক।" : "Position-based."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "রূপান্তর" : "Transformation"}</strong>: 
                  {lang === "bn" ? "গতিশক্তিতে।" : "To kinetic energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "বিভব শক্তির উদাহরণ।"
                  : "Examples of potential energy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পানি" : "Water"}</p>
                  <p className="text-sm">{lang === "bn" ? "বাঁধে সঞ্চিত।" : "Stored in dam."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "স্প্রিং" : "Spring"}</p>
                  <p className="text-sm">{lang === "bn" ? "সংকুচিত।" : "Compressed."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "বাঁধ নির্মাণ" : "Dam construction"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "খেলাধুলা" : "Sports"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "তীরন্দাজ" : "Archery"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "শক্তি বিশ্লেষণ" : "Energy analysis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রকার জানুন।" : "Know types."}</li>
                <li>• {lang === "bn" ? "সূত্র ব্যবহার করুন।" : "Use formulas."}</li>
                <li>• {lang === "bn" ? "সমস্যা সমাধান করুন।" : "Solve problems."}</li>
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
