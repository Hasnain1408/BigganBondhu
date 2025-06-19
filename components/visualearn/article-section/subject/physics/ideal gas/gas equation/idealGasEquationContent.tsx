
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function IdealGasEquationContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `আদর্শ গ্যাস সমীকরণ গ্যাসের বৈশিষ্ট্য বর্ণনা করে।
মূল ধারণা:
- সমীকরণ: PV = nRT।
- R: গ্যাস ধ্রুবক (8.314 J/(mol·K))।
- আদর্শ গ্যাস: কণার মধ্যে কোনো মিথস্ক্রিয়া নেই।
ধারণা:
- চাপ (P): কণার সংঘর্ষ।
- আয়তন (V): কণার স্থান।
- তাপমাত্রা (T): গতিশক্তি।
বৈশিষ্ট্য:
- n: মোল সংখ্যা।
উদাহরণ:
- বেলুন: তাপমাত্রায় আয়তন বৃদ্ধি।
- গ্যাস ট্যাঙ্ক: চাপ।
প্রয়োগ:
- শিল্প: গ্যাস সংকোচন।
- বিজ্ঞান: গ্যাস বিশ্লেষণ।
- প্রকৌশল: ইঞ্জিন।
টিপস:
- সমীকরণ মনে রাখুন।
- একক রূপান্তর করুন।
- সমস্যা সমাধান করুন।`
      : `The Ideal Gas Equation describes gas properties.
Key Concepts:
- Equation: PV = nRT.
- R: Gas constant (8.314 J/(mol·K)).
- Ideal Gas: No particle interactions.
Assumptions:
- Pressure (P): Particle collisions.
- Volume (V): Space for particles.
- Temperature (T): Kinetic energy.
Properties:
- n: Number of moles.
Examples:
- Balloon: Volume increases with temperature.
- Gas tank: Pressure.
Applications:
- Industry: Gas compression.
- Science: Gas analysis.
- Engineering: Engines.
Tips:
- Memorize equation.
- Convert units.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আদর্শ গ্যাস সমীকরণ" : "Ideal Gas Equation"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "গ্যাসের বৈশিষ্ট্যের সমীকরণ।"
                  : "Equation for gas properties."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "চাপ, আয়তন, তাপমাত্রার সম্পর্ক।"
                    : "Relates pressure, volume, temperature."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "আদর্শ গ্যাসের ভিত্তি।"
                  : "Basis of ideal gas."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "চাপ" : "Pressure"}</strong>: 
                  {lang === "bn" ? "কণার সংঘর্ষ।" : "Particle collisions."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "তাপমাত্রা" : "Temperature"}</strong>: 
                  {lang === "bn" ? "গতিশক্তি।" : "Kinetic energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "আদর্শ গ্যাস সমীকরণের উদাহরণ।"
                  : "Examples of ideal gas equation."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বেলুন" : "Balloon"}</p>
                  <p className="text-sm">{lang === "bn" ? "তাপমাত্রায় আয়তন।" : "Volume with temperature."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "গ্যাস ট্যাঙ্ক" : "Gas Tank"}</p>
                  <p className="text-sm">{lang === "bn" ? "চাপ।" : "Pressure."}</p>
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
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্যাস বিশ্লেষণ" : "Gas analysis"}</li>
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
                <li>• {lang === "bn" ? "সমীকরণ মনে রাখুন।" : "Memorize equation."}</li>
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
