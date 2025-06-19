
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function GasLawsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `গ্যাসের সূত্র গ্যাসের চাপ, আয়তন, তাপমাত্রার সম্পর্ক বর্ণনা করে।
মূল ধারণা:
- বয়েলের সূত্র: P₁V₁ = P₂V₂।
- চার্লসের সূত্র: V/T = ধ্রুবক।
- গে-লুসাকের সূত্র: P/T = ধ্রুবক।
সূত্র:
- বয়েল: চাপ এবং আয়তন বিপরীত সমানুপাতিক।
- চার্লস: আয়তন এবং তাপমাত্রা সমানুপাতিক।
- গে-লুসাক: চাপ এবং তাপমাত্রা সমানুপাতিক।
বৈশিষ্ট্য:
- ধ্রুবক: পরিমাণ এবং তাপমাত্রা।
উদাহরণ:
- টায়ারের চাপ।
- বেলুনের আয়তন।
প্রয়োগ:
- শিল্প: গ্যাস সংকোচন।
- চিকিৎসা: অক্সিজেন সরবরাহ।
- প্রকৌশল: ইঞ্জিন।
টিপস:
- সূত্র মনে রাখুন।
- একক রূপান্তর করুন।
- সমস্যা সমাধান করুন।`
      : `Gas Laws describe the relationships between pressure, volume, and temperature of gases.
Key Concepts:
- Boyle’s Law: P₁V₁ = P₂V₂.
- Charles’s Law: V/T = constant.
- Gay-Lussac’s Law: P/T = constant.
Laws:
- Boyle: Pressure and volume inversely proportional.
- Charles: Volume and temperature proportional.
- Gay-Lussac: Pressure and temperature proportional.
Properties:
- Constant: Amount and temperature.
Examples:
- Tire pressure.
- Balloon volume.
Applications:
- Industry: Gas compression.
- Medicine: Oxygen supply.
- Engineering: Engines.
Tips:
- Memorize formulas.
- Convert units.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "গ্যাসের সূত্র" : "Gas Laws"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "গ্যাসের আচরণের নিয়ম।"
                  : "Rules governing gas behavior."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "চাপ, আয়তন, তাপমাত্রার সম্পর্ক।"
                    : "Relationships between pressure, volume, temperature."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সূত্র" : "Laws"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "গ্যাসের সূত্রের বিবরণ।"
                  : "Description of gas laws."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "বয়েল" : "Boyle"}</strong>: 
                  {lang === "bn" ? "P₁V₁ = P₂V₂।" : "P₁V₁ = P₂V₂."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "চার্লস" : "Charles"}</strong>: 
                  {lang === "bn" ? "V/T = ধ্রুবক।" : "V/T = constant."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "গ্যাসের সূত্রের ব্যবহারিক উদাহরণ।"
                  : "Practical examples of gas laws."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "টায়ার" : "Tire"}</p>
                  <p className="text-sm">{lang === "bn" ? "চাপ বৃদ্ধি।" : "Pressure increase."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "বেলুন" : "Balloon"}</p>
                  <p className="text-sm">{lang === "bn" ? "আয়তন পরিবর্তন।" : "Volume change."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্যাস সংকোচন" : "Gas compression"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "অক্সিজেন" : "Oxygen supply"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "ইঞ্জিন" : "Engines"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সূত্র মনে রাখুন।" : "Memorize formulas."}</li>
                <li>• {lang === "bn" ? "একক রূপান্তর।" : "Convert units."}</li>
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
