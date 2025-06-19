
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectromagnetismContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `তড়িৎচুম্বকত্ব বিদ্যুৎ ও চৌম্বক ক্ষেত্রের সম্পর্ক বর্ণনা করে।
মূল ধারণা:
- ম্যাক্সওয়েলের সমীকরণ: ক্ষেত্রের নিয়ম।
- তরঙ্গ: তড়িৎচুম্বকীয় তরঙ্গ।
- শক্তি: F = q(E + v × B)।
ধারণা:
- বিদ্যুৎ: চৌম্বক ক্ষেত্র উৎপন্ন করে।
- চুম্বক: বিদ্যুৎ প্রবাহ সৃষ্টি করে।
- তরঙ্গ: আলো, রেডিও।
বৈশিষ্ট্য:
- আলোর গতি: c = 3 × 10⁸ m/s।
উদাহরণ:
- রেডিও: তরঙ্গ প্রেরণ।
- মোটর: ক্ষেত্র মিথস্ক্রিয়া।
প্রয়োগ:
- যোগাযোগ: রেডিও, মোবাইল।
- প্রযুক্তি: ট্রান্সফরমার।
- বিজ্ঞান: ত্বরণ।
টিপস:
- সমীকরণ বুঝুন।
- তরঙ্গ বৈশিষ্ট্য শিখুন।
- প্রয়োগ দেখুন।`
      : `Electromagnetism describes the relationship between electric and magnetic fields.
Key Concepts:
- Maxwell’s Equations: Field laws.
- Waves: Electromagnetic waves.
- Force: F = q(E + v × B).
Assumptions:
- Electricity: Generates magnetic fields.
- Magnetism: Induces electric currents.
- Waves: Light, radio.
Properties:
- Speed of light: c = 3 × 10⁸ m/s.
Examples:
- Radio: Wave transmission.
- Motor: Field interaction.
Applications:
- Communication: Radio, mobile.
- Technology: Transformers.
- Science: Acceleration.
Tips:
- Understand equations.
- Learn wave properties.
- Explore applications.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "তড়িৎচুম্বকত্ব" : "Electromagnetism"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ক্ষেত্রের মিথস্ক্রিয়ার অধ্যয়ন।"
                  : "Study of field interactions."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "বিদ্যুৎ ও চুম্বকের সম্পর্ক।"
                    : "Relation between electricity and magnetism."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "তড়িৎচুম্বকত্বের ভিত্তি।"
                  : "Basis of electromagnetism."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "বিদ্যুৎ" : "Electricity"}</strong>: 
                  {lang === "bn" ? "চৌম্বক ক্ষেত্র সৃষ্টি।" : "Creates magnetic fields."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "তরঙ্গ" : "Waves"}</strong>: 
                  {lang === "bn" ? "আলো, রেডিও।" : "Light, radio."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "তড়িৎচুম্বকত্বের উদাহরণ।"
                  : "Examples of electromagnetism."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "রেডিও" : "Radio"}</p>
                  <p className="text-sm">{lang === "bn" ? "তরঙ্গ প্রেরণ।" : "Wave transmission."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "মোটর" : "Motor"}</p>
                  <p className="text-sm">{lang === "bn" ? "ক্ষেত্র মিথস্ক্রিয়া।" : "Field interaction."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "যোগাযোগ" : "Communication"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "রেডিও" : "Radio"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "ট্রান্সফরমার" : "Transformers"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "ত্বরণ" : "Acceleration"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সমীকরণ বুঝুন।" : "Understand equations."}</li>
                <li>• {lang === "bn" ? "তরঙ্গ শিখুন।" : "Learn waves."}</li>
                <li>• {lang === "bn" ? "প্রয়োগ দেখুন।" : "Explore applications."}</li>
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
