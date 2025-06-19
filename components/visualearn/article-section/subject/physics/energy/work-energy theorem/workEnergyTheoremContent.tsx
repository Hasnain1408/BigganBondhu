
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function WorkEnergyTheoremContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কার্য-শক্তি উপপাদ্য কার্য এবং গতিশক্তির সম্পর্ক বর্ণনা করে।
মূল ধারণা:
- সূত্র: W = ΔKE = ½mv²(f) - ½mv²(i)।
- কার্য: F × d × cosθ।
- একক: জুল (J)।
ধারণা:
- কার্য: শক্তি স্থানান্তর।
- গতিশক্তি: বস্তুর গতি।
- নেট কার্য: মোট শক্তি পরিবর্তন।
বৈশিষ্ট্য:
- সংরক্ষণ: শক্তি সংরক্ষিত।
উদাহরণ:
- গাড়ি: ত্বরণে কার্য।
- বল: বস্তু উত্তোলন।
প্রয়োগ:
- প্রকৌশল: মেশিন ডিজাইন।
- খেলাধুলা: বল নিক্ষেপ।
- বিজ্ঞান: শক্তি বিশ্লেষণ।
টিপস:
- সূত্র মনে রাখুন।
- কোণ বিবেচনা করুন।
- সমস্যা সমাধান করুন।`
      : `The Work-Energy Theorem relates work to the change in kinetic energy.
Key Concepts:
- Formula: W = ΔKE = ½mv²(f) - ½mv²(i).
- Work: F × d × cosθ.
- Unit: Joule (J).
Assumptions:
- Work: Energy transfer.
- Kinetic Energy: Object’s motion.
- Net Work: Total energy change.
Properties:
- Conservation: Energy conserved.
Examples:
- Car: Work in acceleration.
- Ball: Lifting object.
Applications:
- Engineering: Machine design.
- Sports: Throwing ball.
- Science: Energy analysis.
Tips:
- Memorize formula.
- Consider angle.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কার্য-শক্তি উপপাদ্য" : "Work-Energy Theorem"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কার্য এবং গতিশক্তির সম্পর্ক।"
                  : "Relation between work and kinetic energy."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কার্য গতিশক্তি পরিবর্তন করে।"
                    : "Work changes kinetic energy."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "কার্য-শক্তির ভিত্তি।"
                  : "Basis of work-energy."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "কার্য" : "Work"}</strong>: 
                  {lang === "bn" ? "শক্তি স্থানান্তর।" : "Energy transfer."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গতিশক্তি" : "Kinetic Energy"}</strong>: 
                  {lang === "bn" ? "গতির শক্তি।" : "Motion energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "কার্য-শক্তির উদাহরণ।"
                  : "Examples of work-energy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গাড়ি" : "Car"}</p>
                  <p className="text-sm">{lang === "bn" ? "ত্বরণ।" : "Acceleration."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "বল" : "Ball"}</p>
                  <p className="text-sm">{lang === "bn" ? "উত্তোলন।" : "Lifting."}</p>
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
                  <li>• {lang === "bn" ? "মেশিন ডিজাইন" : "Machine design"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "খেলাধুলা" : "Sports"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "বল নিক্ষেপ" : "Throwing ball"}</li>
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
                <li>• {lang === "bn" ? "সূত্র মনে রাখুন।" : "Memorize formula."}</li>
                <li>• {lang === "bn" ? "কোণ বিবেচনা।" : "Consider angle."}</li>
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
