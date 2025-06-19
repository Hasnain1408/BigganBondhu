
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function KineticTheoryContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `গতিশক্তি তত্ত্ব গ্যাসের কণার গতি ব্যাখ্যা করে।
মূল ধারণা:
- কণা: ক্রমাগত গতিশীল।
- গড় গতিশক্তি: KE = (3/2)kT।
- k: বোলৎজম্যান ধ্রুবক (1.38 × 10⁻²³ J/K)।
ধারণা:
- সংঘর্ষ: ইলাস্টিক।
- চাপ: কণার সংঘর্ষ।
- তাপমাত্রা: গতিশক্তির মাপ।
বৈশিষ্ট্য:
- কণার আকার: অবহেলনীয়।
উদাহরণ:
- গ্যাস বিস্তার।
- চাপ বৃদ্ধি।
প্রয়োগ:
- শিল্প: গ্যাস প্রক্রিয়া।
- বিজ্ঞান: তাপমাত্রা পরিমাপ।
- প্রকৌশল: ইঞ্জিন।
টিপস:
- সূত্র বুঝুন।
- গণনা শিখুন।
- ধারণা প্রয়োগ করুন।`
      : `Kinetic Theory explains gas behavior through particle motion.
Key Concepts:
- Particles: Constantly moving.
- Average Kinetic Energy: KE = (3/2)kT.
- k: Boltzmann constant (1.38 × 10⁻²³ J/K).
Assumptions:
- Collisions: Elastic.
- Pressure: Particle collisions.
- Temperature: Measure of kinetic energy.
Properties:
- Particle size: Negligible.
Examples:
- Gas diffusion.
- Pressure increase.
Applications:
- Industry: Gas processes.
- Science: Temperature measurement.
- Engineering: Engines.
Tips:
- Understand formulas.
- Learn calculations.
- Apply concepts.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "গতিশক্তি তত্ত্ব" : "Kinetic Theory"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "গ্যাস কণার গতির তত্ত্ব।"
                  : "Theory of gas particle motion."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কণার গতি গ্যাসের আচরণ নির্ধারণ করে।"
                    : "Particle motion determines gas behavior."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "গতিশক্তি তত্ত্বের ভিত্তি।"
                  : "Foundations of kinetic theory."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "সংঘর্ষ" : "Collisions"}</strong>: 
                  {lang === "bn" ? "ইলাস্টিক।" : "Elastic."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "তাপমাত্রা" : "Temperature"}</strong>: 
                  {lang === "bn" ? "গতিশক্তির মাপ।" : "Measure of kinetic energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "গতিশক্তি তত্ত্বের ব্যবহারিক উদাহরণ।"
                  : "Practical examples of kinetic theory."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বিস্তার" : "Diffusion"}</p>
                  <p className="text-sm">{lang === "bn" ? "গ্যাস ছড়িয়ে পড়ে।" : "Gas spreads out."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "চাপ" : "Pressure"}</p>
                  <p className="text-sm">{lang === "bn" ? "তাপমাত্রায় বৃদ্ধি।" : "Increases with temperature."}</p>
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
                  <li>• {lang === "bn" ? "গ্যাস প্রক্রিয়া" : "Gas processes"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "তাপমাত্রা পরিমাপ" : "Temperature measurement"}</li>
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
                <li>• {lang === "bn" ? "সূত্র বুঝুন।" : "Understand formulas."}</li>
                <li>• {lang === "bn" ? "গণনা শিখুন।" : "Learn calculations."}</li>
                <li>• {lang === "bn" ? "ধারণা প্রয়োগ।" : "Apply concepts."}</li>
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
