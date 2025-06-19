
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function MagneticFieldContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `চৌম্বক ক্ষেত্র চুম্বক বা বিদ্যুৎ প্রবাহের চারপাশের শক্তি বর্ণনা করে।
মূল ধারণা:
- ক্ষেত্র রেখা: উত্তর থেকে দক্ষিণ মেরু।
- শক্তি: F = qvB sinθ।
- একক: টেসলা (T)।
ধারণা:
- উৎস: চুম্বক, বিদ্যুৎ প্রবাহ।
- দিক: ডান হাতের নিয়ম।
- প্রভাব: চার্জযুক্ত কণার উপর।
বৈশিষ্ট্য:
- অভিন্ন ক্ষেত্র: সমান্তরাল রেখা।
উদাহরণ:
- চুম্বক: কম্পাস।
- তার: বিদ্যুৎ প্রবাহ।
প্রয়োগ:
- প্রযুক্তি: মোটর, জেনারেটর।
- চিকিৎসা: এমআরআই।
- বিজ্ঞান: কণা ত্বরণ।
টিপস:
- সূত্র মনে রাখুন।
- দিক নির্ণয় করুন।
- সমস্যা সমাধান করুন।`
      : `Magnetic Fields describe the force around magnets or currents.
Key Concepts:
- Field Lines: North to south pole.
- Force: F = qvB sinθ.
- Unit: Tesla (T).
Assumptions:
- Source: Magnets, electric currents.
- Direction: Right-hand rule.
- Effect: On charged particles.
Properties:
- Uniform Field: Parallel lines.
Examples:
- Magnet: Compass.
- Wire: Current.
Applications:
- Technology: Motors, generators.
- Medicine: MRI.
- Science: Particle acceleration.
Tips:
- Memorize formulas.
- Determine direction.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "চৌম্বক ক্ষেত্র" : "Magnetic Field"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "চুম্বকের শক্তির এলাকা।"
                  : "Region of magnetic force."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "চৌম্বক শক্তির বৈশিষ্ট্য।"
                    : "Properties of magnetic forces."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "চৌম্বক ক্ষেত্রের ভিত্তি।"
                  : "Basis of magnetic fields."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "উৎস" : "Source"}</strong>: 
                  {lang === "bn" ? "চুম্বক, প্রবাহ।" : "Magnets, currents."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "দিক" : "Direction"}</strong>: 
                  {lang === "bn" ? "ডান হাতের নিয়ম।" : "Right-hand rule."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "চৌম্বক ক্ষেত্রের উদাহরণ।"
                  : "Examples of magnetic fields."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "কম্পাস" : "Compass"}</p>
                  <p className="text-sm">{lang === "bn" ? "চুম্বকের প্রভাব।" : "Magnet effect."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "তার" : "Wire"}</p>
                  <p className="text-sm">{lang === "bn" ? "বিদ্যুৎ প্রবাহ।" : "Current flow."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "মোটর" : "Motors"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "এমআরআই" : "MRI"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "কণা ত্বরণ" : "Particle acceleration"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সূত্র মনে রাখুন।" : "Memorize formulas."}</li>
                <li>• {lang === "bn" ? "দিক নির্ণয়।" : "Determine direction."}</li>
                <li>• {lang === "bn" ? "সমস্যা সমাধান।" : "Solve problems."}</li>
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