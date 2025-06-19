
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function UniversalGravitationContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `সর্বজনীন মাধ্যাকর্ষণ ভর মধ্যে আকর্ষণ শক্তি বর্ণনা করে।
মূল ধারণা:
- শক্তি: F = G m₁m₂ / r².
- G: মাধ্যাকর্ষণ ধ্রুবক (6.674 × 10⁻¹¹ N·m²/kg²)।
মাধ্যাকর্ষণ:
- নিউটন: সর্বজনীন আইন।
- ভর: বড় ভর, বেশি শক্তি।
- দূরত্ব: দূরত্ব বাড়লে, শক্তি কমে।
বৈশিষ্ট্য:
- আকর্ষণ: সব ভরের মধ্যে।
উদাহরণ:
- গ্রহের গতি।
- জোয়ার-ভাটা।
প্রয়োগ:
- মহাকাশ: উপগ্রহ।
- জ্যোতির্বিজ্ঞান: নক্ষত্র।
- প্রকৌশল: স্থিতিশীলতা।
টিপস:
- সূত্র বুঝুন।
- দূরত্বের প্রভাব জানুন।
- উদাহরণ পর্যবেক্ষণ করুন।`
      : `Universal Gravitation describes the attractive force between masses.
Key Concepts:
- Force: F = G m₁m₂ / r².
- G: Gravitational constant (6.674 × 10⁻¹¹ N·m²/kg²).
Gravitation:
- Newton: Universal law.
- Mass: Larger mass, greater force.
- Distance: Greater distance, less force.
Properties:
- Attraction: Between all masses.
Examples:
- Planetary motion.
- Tides.
Applications:
- Space: Satellites.
- Astronomy: Stars.
- Engineering: Stability.
Tips:
- Understand the formula.
- Know distance effects.
- Observe examples.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "সর্বজনীন মাধ্যাকর্ষণ" : "Universal Gravitation"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ভর মধ্যে আকর্ষণ শক্তি।"
                  : "Attractive force between masses."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "মাধ্যাকর্ষণ শক্তি ভর এবং দূরত্বের উপর নির্ভর করে।"
                    : "Gravitational force depends on mass and distance."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মাধ্যাকর্ষণ" : "Gravitation"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "নিউটনের সর্বজনীন মাধ্যাকর্ষণ আইন।"
                  : "Newton’s law of universal gravitation."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "শক্তি" : "Force"}</strong>: 
                  {lang === "bn" ? "F = G m₁m₂ / r²।" : "F = G m₁m₂ / r²."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "দূরত্ব" : "Distance"}</strong>: 
                  {lang === "bn" ? "দূরত্ব বর্গের বিপরীত।" : "Inversely proportional to distance squared."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "মাধ্যাকর্ষণের ব্যবহারিক উদাহরণ।"
                  : "Practical examples of gravitation."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গ্রহের গতি" : "Planetary Motion"}</p>
                  <p className="text-sm">{lang === "bn" ? "সূর্যের চারপাশে।" : "Around the Sun."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "জোয়ার" : "Tides"}</p>
                  <p className="text-sm">{lang === "bn" ? "চাঁদের প্রভাব।" : "Moon’s effect."}</p>
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
                  <li>• {lang === "bn" ? "উপগ্রহ" : "Satellites"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "জ্যোতির্বিজ্ঞান" : "Astronomy"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "নক্ষত্র" : "Stars"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "স্থিতিশীলতা" : "Stability"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সূত্র বুঝুন।" : "Understand the formula."}</li>
                <li>• {lang === "bn" ? "দূরত্বের প্রভাব।" : "Know distance effects."}</li>
                <li>• {lang === "bn" ? "উদাহরণ পর্যবেক্ষণ।" : "Observe examples."}</li>
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
