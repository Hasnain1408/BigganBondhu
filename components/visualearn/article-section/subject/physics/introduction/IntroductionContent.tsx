"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

interface IntroductionContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function IntroductionContent({ topic }: IntroductionContentProps) {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পদার্থবিজ্ঞান হল প্রকৃতির মৌলিক নিয়মগুলি অধ্যয়নের বিজ্ঞান।
মূল শাখাসমূহ:
- ক্লাসিক্যাল মেকানিক্স: বস্তুর গতি এবং বল
- তাপগতিবিদ্যা: তাপ এবং শক্তি
- তড়িৎ ও চুম্বকত্ব: বৈদ্যুতিক এবং চৌম্বকীয় বল
- আলোকবিজ্ঞান: আলোর প্রকৃতি এবং আচরণ
- আধুনিক পদার্থবিজ্ঞান: কোয়ান্টাম মেকানিক্স এবং আপেক্ষিকতা তত্ত্ব`
      : `Physics is the science of studying the fundamental laws of nature.
Main branches:
- Classical Mechanics: Motion and forces
- Thermodynamics: Heat and energy
- Electricity & Magnetism: Electric and magnetic forces
- Optics: Nature and behavior of light
- Modern Physics: Quantum mechanics and relativity`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পদার্থবিজ্ঞানের ভূমিকা" : "Introduction to Physics"}
            </h3>
            <p>
              {lang === "bn"
                ? "পদার্থবিজ্ঞান হল প্রকৃতির মৌলিক নিয়মগুলি অধ্যয়নের বিজ্ঞান।"
                : "Physics is the science of studying the fundamental laws of nature."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল শাখাসমূহ" : "Main Branches"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ক্লাসিক্যাল মেকানিক্স: বস্তুর গতি এবং বল"
                  : "Classical Mechanics: Motion and forces"}
              </li>
              <li>
                {lang === "bn"
                  ? "তাপগতিবিদ্যা: তাপ এবং শক্তি"
                  : "Thermodynamics: Heat and energy"}
              </li>
              <li>
                {lang === "bn"
                  ? "তড়িৎ ও চুম্বকত্ব: বৈদ্যুতিক এবং চৌম্বকীয় বল"
                  : "Electricity & Magnetism: Electric and magnetic forces"}
              </li>
              <li>
                {lang === "bn"
                  ? "আলোকবিজ্ঞান: আলোর প্রকৃতি এবং আচরণ"
                  : "Optics: Nature and behavior of light"}
              </li>
              <li>
                {lang === "bn"
                  ? "আধুনিক পদার্থবিজ্ঞান: কোয়ান্টাম মেকানিক্স এবং আপেক্ষিকতা তত্ত্ব"
                  : "Modern Physics: Quantum mechanics and relativity"}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <LanguageToggle lang={lang} setLang={setLang} />
            <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 