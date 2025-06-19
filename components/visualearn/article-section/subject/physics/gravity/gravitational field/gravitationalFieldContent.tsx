
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function GravitationalFieldContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `মাধ্যাকর্ষণ ক্ষেত্র ভরের চারপাশে শক্তির অঞ্চল।
মূল ধারণা:
- ক্ষেত্র শক্তি: g = GM / r²।
- G: মাধ্যাকর্ষণ ধ্রুবক (6.674 × 10⁻¹¹ N·m²/kg²)।
ক্ষেত্র:
- শক্তি: ভর প্রতি শক্তি।
- দিক: কেন্দ্রের দিকে।
- তীব্রতা: দূরত্বে কমে।
বৈশিষ্ট্য:
- ক্ষেত্র রেখা: দিক নির্দেশ।
উদাহরণ:
- পৃথিবী: g ≈ 9.8 m/s²।
- চাঁদ: g ≈ 1.6 m/s²।
প্রয়োগ:
- মহাকাশ: নৌযান।
- প্রকৌশল: কাঠামো।
- জ্যোতির্বিজ্ঞান: গ্রহ।
টিপস:
- সূত্র বুঝুন।
- ক্ষেত্র রেখা চিত্র অঙ্কন।
- তীব্রতা গণনা শিখুন।`
      : `Gravitational Field is the region around a mass where force is exerted.
Key Concepts:
- Field Strength: g = GM / r².
- G: Gravitational constant (6.674 × 10⁻¹¹ N·m²/kg²).
Field:
- Strength: Force per unit mass.
- Direction: Toward the center.
- Intensity: Decreases with distance.
Properties:
- Field Lines: Indicate direction.
Examples:
- Earth: g ≈ 9.8 m/s².
- Moon: g ≈ 1.6 m/s².
Applications:
- Space: Spacecraft.
- Engineering: Structures.
- Astronomy: Planets.
Tips:
- Understand the formula.
- Draw field lines.
- Learn to calculate intensity.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "মাধ্যাকর্ষণ ক্ষেত্র" : "Gravitational Field"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ভরের চারপাশে শক্তির অঞ্চল।"
                  : "Region of force around a mass."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ক্ষেত্র শক্তি ভর এবং দূরত্বের উপর নির্ভর করে।"
                    : "Field strength depends on mass and distance."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ক্ষেত্র" : "Field"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "মাধ্যাকর্ষণ ক্ষেত্রের তীব্রতা।"
                  : "Intensity of gravitational field."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "শক্তি" : "Strength"}</strong>: 
                  {lang === "bn" ? "g = GM / r²।" : "g = GM / r²."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "দিক" : "Direction"}</strong>: 
                  {lang === "bn" ? "কেন্দ্রের দিকে।" : "Toward the center."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ।"
                  : "Practical examples."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পৃথিবী" : "Earth"}</p>
                  <p className="text-sm">{lang === "bn" ? "g ≈ 9.8 m/s²।" : "g ≈ 9.8 m/s²."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "চাঁদ" : "Moon"}</p>
                  <p className="text-sm">{lang === "bn" ? "g ≈ 1.6 m/s²।" : "g ≈ 1.6 m/s²."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "মহাকাশ" : "Space"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "নৌযান" : "Spacecraft"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "জ্যোতির্বিজ্ঞান" : "Astronomy"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্রহ" : "Planets"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "কাঠামো" : "Structures"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সূত্র বুঝুন।" : "Understand the formula."}</li>
                <li>• {lang === "bn" ? "ক্ষেত্র রেখা অঙ্কন।" : "Draw field lines."}</li>
                <li>• {lang === "bn" ? "তীব্রতা গণনা।" : "Calculate intensity."}</li>
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
