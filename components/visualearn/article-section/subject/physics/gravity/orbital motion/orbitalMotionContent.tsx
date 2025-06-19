
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function OrbitalMotionContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কক্ষীয় গতি কেন্দ্রীয় বস্তুর চারপাশে গতি।
মূল ধারণা:
- কেপলারের আইন: কক্ষের আকৃতি, সময়।
- কক্ষীয় বেগ: v = √(GM/r)।
কক্ষ:
- বৃত্তাকার: স্থির দূরত্ব।
- উপবৃত্তাকার: পরিবর্তনশীল দূরত্ব।
- সময়কাল: এক চক্রের সময়।
বৈশিষ্ট্য:
- মাধ্যাকর্ষণ: কেন্দ্রীয় শক্তি।
উদাহরণ:
- উপগ্রহ: যোগাযোগ।
- গ্রহ: সূর্যের চারপাশে।
প্রয়োগ:
- মহাকাশ: নৌযান।
- জ্যোতির্বিজ্ঞান: নক্ষত্র।
- প্রযুক্তি: জিপিএস।
টিপস:
- কেপলারের আইন শিখুন।
- বেগ গণনা করুন।
- কক্ষের আকৃতি বুঝুন।`
      : `Orbital Motion is the movement around a central body.
Key Concepts:
- Kepler’s Laws: Orbit shape, time.
- Orbital Velocity: v = √(GM/r).
Orbits:
- Circular: Constant distance.
- Elliptical: Varying distance.
- Period: Time for one cycle.
Properties:
- Gravitation: Central force.
Examples:
- Satellites: Communication.
- Planets: Around the Sun.
Applications:
- Space: Spacecraft.
- Astronomy: Stars.
- Technology: GPS.
Tips:
- Learn Kepler’s laws.
- Calculate velocity.
- Understand orbit shapes.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কক্ষীয় গতি" : "Orbital Motion"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কেন্দ্রীয় বস্তুর চারপাশে বক্র গতি।"
                  : "Curved motion around a central body."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কেপলারের আইন এবং বেগ কক্ষ নির্ধারণ করে।"
                    : "Kepler’s laws and velocity define orbits."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কক্ষ" : "Orbits"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "কক্ষের প্রকার এবং বৈশিষ্ট্য।"
                  : "Types and properties of orbits."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "বৃত্তাকার" : "Circular"}</strong>: 
                  {lang === "bn" ? "স্থির দূরত্ব।" : "Constant distance."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "উপবৃত্তাকার" : "Elliptical"}</strong>: 
                  {lang === "bn" ? "পরিবর্তনশীল দূরত্ব।" : "Varying distance."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "কক্ষীয় গতির ব্যবহারিক উদাহরণ।"
                  : "Practical examples of orbital motion."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "উপগ্রহ" : "Satellites"}</p>
                  <p className="text-sm">{lang === "bn" ? "যোগাযোগ।" : "Communication."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "গ্রহ" : "Planets"}</p>
                  <p className="text-sm">{lang === "bn" ? "সূর্যের চারপাশে।" : "Around the Sun."}</p>
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
                  <li>• {lang === "bn" ? "নক্ষত্র" : "Stars"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "জিপিএস" : "GPS"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কেপলারের আইন শিখুন।" : "Learn Kepler’s laws."}</li>
                <li>• {lang === "bn" ? "বেগ গণনা।" : "Calculate velocity."}</li>
                <li>• {lang === "bn" ? "কক্ষের আকৃতি।" : "Understand orbit shapes."}</li>
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
