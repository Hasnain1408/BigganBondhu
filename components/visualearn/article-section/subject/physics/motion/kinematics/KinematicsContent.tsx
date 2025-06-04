"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function KinematicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কাইনেমেটিক্স হল পদার্থবিজ্ঞানের একটি শাখা যা বস্তুর গতি অধ্যয়ন করে, ত্বরণ বা বলের কারণ বিবেচনা না করে।
মূল বৈশিষ্ট্যসমূহ:
- স্থানচ্যুতি: বস্তুর অবস্থানের পরিবর্তন
- বেগ: স্থানচ্যুতির হার
- ত্বরণ: বেগের পরিবর্তনের হার
সূত্রাবলী:
- v = u + at
- s = ut + ½at²
- v² = u² + 2as`
      : `Kinematics is a branch of physics that studies the motion of objects without considering the causes of motion, such as forces or acceleration.
Key characteristics:
- Displacement: Change in an object's position
- Velocity: Rate of change of displacement
- Acceleration: Rate of change of velocity
Formulas:
- v = u + at
- s = ut + ½at²
- v² = u² + 2as`

   const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কাইনেমেটিক্স" : "Kinematics"}
            </h3>
            <p>
              {lang === "bn"
                ? "কাইনেমেটিক্স হল পদার্থবিজ্ঞানের একটি শাখা যা বস্তুর গতি অধ্যয়ন করে, ত্বরণ বা বলের কারণ বিবেচনা না করে।"
                : "Kinematics is a branch of physics that studies the motion of objects without considering the causes of motion, such as forces or acceleration."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "স্থানচ্যুতি: বস্তুর অবস্থানের পরিবর্তন"
                  : "Displacement: Change in an object's position"}
              </li>
              <li>
                {lang === "bn"
                  ? "বেগ: স্থানচ্যুতির হার"
                  : "Velocity: Rate of change of displacement"}
              </li>
              <li>
                {lang === "bn"
                  ? "ত্বরণ: বেগের পরিবর্তনের হার"
                  : "Acceleration: Rate of change of velocity"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  v = u + at <br />
                  s = ut + ½at² <br />
                  v² = u² + 2as
                </>
              ) : (
                <>
                  v = u + at <br />
                  s = ut + ½at² <br />
                  v² = u² + 2as
                </>
              )}
            </p>
          </div>

          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

         <LanguageToggle lang={lang} setLang={setLang} />

        <TopicChatbot />
      </CardContent>
    </Card>
  )
}