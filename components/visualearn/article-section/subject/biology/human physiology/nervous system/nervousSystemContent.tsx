"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function NervousSystemContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `স্নায়ুতন্ত্র শরীরের নিয়ন্ত্রণ করে।
অঙ্গ:
- মস্তিষ্ক
- মেরুদণ্ড
- স্নায়ু
প্রক্রিয়া:
- সংকেত প্রেরণ
- সমন্বয়
কাজ:
- নিয়ন্ত্রণ
- প্রতিক্রিয়া`
      : `The nervous system controls the body.
Organs:
- Brain
- Spinal Cord
- Nerves
Processes:
- Signal Transmission
- Coordination
Functions:
- Control
- Response`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "স্নায়ুতন্ত্র" : "Nervous System"}
            </h3>

            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "স্নায়ুতন্ত্র শরীরের ক্রিয়াকলাপ নিয়ন্ত্রণ করে এবং পরিবেশের সাথে সমন্বয় করে।"
                  : "The nervous system regulates body functions and coordinates with the environment."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "স্নায়ুতন্ত্র স্নায়ু সংকেতের মাধ্যমে শরীরের অঙ্গগুলির মধ্যে যোগাযোগ স্থাপন করে।"
                    : "The nervous system communicates between body organs via nerve signals."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অঙ্গ" : "Organs"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <ul className="list-disc list-inside text-sm">
                <li>{lang === "bn" ? "মস্তিষ্ক" : "Brain"}</li>
                <li>{lang === "bn" ? "মেরুদণ্ড" : "Spinal Cord"}</li>
                <li>{lang === "bn" ? "স্নায়ু" : "Nerves"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রক্রিয়া" : "Processes"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
              <ul className="list-disc list-inside text-sm">
                <li>{lang === "bn" ? "সংকেত প্রেরণ" : "Signal Transmission"}</li>
                <li>{lang === "bn" ? "সমন্বয়" : "Coordination"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কাজ" : "Functions"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-2">
              <ul className="list-disc list-inside text-sm">
                <li>{lang === "bn" ? "নিয়ন্ত্রণ" : "Control"}</li>
                <li>{lang === "bn" ? "প্রতিক্রিয়া" : "Response"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
            </h4>
            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm list-disc list-inside space-y-1">
                <li>{lang === "bn" ? "স্নায়ুতন্ত্র দ্রুত প্রতিক্রিয়া নিশ্চিত করে।" : "The nervous system ensures quick responses."}</li>
                <li>{lang === "bn" ? "মস্তিষ্ক সিদ্ধান্ত গ্রহণে গুরুত্বপূর্ণ।" : "The brain is essential for decision-making."}</li>
                <li>{lang === "bn" ? "স্নায়ু সংকেত বৈদ্যুতিক প্রকৃতির।" : "Nerve signals are electrical in nature."}</li>
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
