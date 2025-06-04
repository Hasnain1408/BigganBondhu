"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ProjectileMotionContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `প্রজেক্টাইল মোশন হল এমন একটি বস্তুর গতি যা কেবল মাধ্যাকর্ষণের প্রভাবে বাতাসে নিক্ষেপ বা প্রক্ষেপিত হয়।
মূল বৈশিষ্ট্যসমূহ:
- অনুভূমিক গতি: ধ্রুব গতি
- উল্লম্ব গতি: ধ্রুব ত্বরণ (৯.৮ m/s²)
- পথ: প্যারাবলিক ট্রাজেক্টরি
সূত্রাবলী:
- উড্ডয়নের সময় = (২v₀sinθ)/g
- সর্বোচ্চ উচ্চতা = (v₀²sin²θ)/২g
- ব্যাপ্তি = (v₀²sin2θ)/g`
      : `Projectile motion is the motion of an object thrown or projected into the air, subject only to gravity.
Key characteristics:
- Horizontal motion: Constant velocity
- Vertical motion: Constant acceleration (9.8 m/s²)
- Path: Parabolic trajectory
Formulas:
- Time of flight = (2v₀sinθ)/g
- Max height = (v₀²sin²θ)/2g
- Range = (v₀²sin2θ)/g`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "প্রজেক্টাইল মোশন" : "Projectile Motion"}
            </h3>
            <p>
              {lang === "bn"
                ? "প্রজেক্টাইল মোশন হল এমন একটি বস্তুর গতি যা কেবল মাধ্যাকর্ষণের প্রভাবে বাতাসে নিক্ষেপ বা প্রক্ষেপিত হয়।"
                : "The motion of an object thrown or projected into the air, subject only to acceleration due to gravity."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "অনুভূমিক গতি: ধ্রুব গতি (কোনো ত্বরণ নেই)"
                  : "Horizontal motion: Constant velocity (no acceleration)"}
              </li>
              <li>
                {lang === "bn"
                  ? "উল্লম্ব গতি: ধ্রুব ত্বরণ (g = ৯.৮ m/s² নিচের দিকে)"
                  : "Vertical motion: Constant acceleration (g = 9.8 m/s² downward)"}
              </li>
              <li>
                {lang === "bn"
                  ? "পথ: প্যারাবলিক ট্রাজেক্টরি"
                  : "Path: Parabolic trajectory"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  উড্ডয়নের সময়: t = (২v₀sinθ)/g <br />
                  সর্বোচ্চ উচ্চতা: h = (v₀²sin²θ)/২g <br />
                  ব্যাপ্তি: R = (v₀²sin2θ)/g
                </>
              ) : (
                <>
                  Time of flight: t = (2v₀sinθ)/g <br />
                  Maximum height: h = (v₀²sin²θ)/2g <br />
                  Range: R = (v₀²sin2θ)/g
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
