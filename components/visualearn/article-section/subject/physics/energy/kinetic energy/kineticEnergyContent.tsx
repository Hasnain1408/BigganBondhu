
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function KineticEnergyContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `গতিশক্তি বস্তুর গতির শক্তি।
মূল ধারণা:
- সূত্র: KE = ½mv²।
- প্রকার: রৈখিক, ঘূর্ণন।
- একক: জুল (J)।
ধারণা:
- গতি: বেগের উপর নির্ভর।
- রূপান্তর: বিভব শক্তিতে।
- সংরক্ষণ: শক্তি স্থির।
বৈশিষ্ট্য:
- বেগ: দ্বিঘাত সম্পর্ক।
উদাহরণ:
- গাড়ি: ত্বরণে শক্তি।
- বল: নিক্ষেপ।
প্রয়োগ:
- প্রকৌশল: যানবাহন ডিজাইন।
- খেলাধুলা: ক্রীড়া বিশ্লেষণ।
- বিজ্ঞান: শক্তি গণনা।
টিপস:
- সূত্র মনে রাখুন।
- বেগ বিবেচনা করুন।
- সমস্যা সমাধান করুন।`
      : `Kinetic Energy is the energy of an object due to its motion.
Key Concepts:
- Formula: KE = ½mv².
- Types: Translational, rotational.
- Unit: Joule (J).
Assumptions:
- Motion: Depends on velocity.
- Transformation: To potential energy.
- Conservation: Energy constant.
Properties:
- Velocity: Quadratic relationship.
Examples:
- Car: Energy in acceleration.
- Ball: Throwing.
Applications:
- Engineering: Vehicle design.
- Sports: Performance analysis.
- Science: Energy calculations.
Tips:
- Memorize formula.
- Consider velocity.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "গতিশক্তি" : "Kinetic Energy"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "গতির কারণে শক্তি।"
                  : "Energy due to motion."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "গতিশক্তির সূত্র এবং প্রকার।"
                    : "Formula and types of kinetic energy."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "গতিশক্তির ভিত্তি।"
                  : "Basis of kinetic energy."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "গতি" : "Motion"}</strong>: 
                  {lang === "bn" ? "বেগের উপর নির্ভর।" : "Depends on velocity."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "রূপান্তর" : "Transformation"}</strong>: 
                  {lang === "bn" ? "বিভব শক্তিতে।" : "To potential energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "গতিশক্তির উদাহরণ।"
                  : "Examples of kinetic energy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গাড়ি" : "Car"}</p>
                  <p className="text-sm">{lang === "bn" ? "ত্বরণ।" : "Acceleration."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "বল" : "Ball"}</p>
                  <p className="text-sm">{lang === "bn" ? "নিক্ষেপ।" : "Throwing."}</p>
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
                  <li>• {lang === "bn" ? "যানবাহন ডিজাইন" : "Vehicle design"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "খেলাধুলা" : "Sports"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "ক্রীড়া বিশ্লেষণ" : "Performance analysis"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "শক্তি গণনা" : "Energy calculations"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সূত্র মনে রাখুন।" : "Memorize formula."}</li>
                <li>• {lang === "bn" ? "বেগ বিবেচনা করুন।" : "Consider velocity."}</li>
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
