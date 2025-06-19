
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function RadioactivityContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `তেজস্ক্রিয়তা অস্থির নিউক্লিয়াসের কণা বা বিকিরণ নির্গমন।
মূল ধারণা:
- প্রকার: আলফা, বিটা, গামা।
- অর্ধায়ু: সময়ের অর্ধেক ক্ষয়।
- একক: বেকারেল (Bq)।
ধারণা:
- ক্ষয়: স্বতঃস্ফূর্ত।
- নিউক্লিয়াস: প্রোটন, নিউট্রন।
- বিকিরণ: শক্তি নির্গমন।
বৈশিষ্ট্য:
- আলফা: হিলিয়াম নিউক্লিয়াস।
- বিটা: ইলেকট্রন বা পজিট্রন।
- গামা: ফোটন।
উদাহরণ:
- ইউরেনিয়াম: ক্ষয়।
- কার্বন-১৪: ডেটিং।
প্রয়োগ:
- চিকিৎসা: ক্যান্সার চিকিৎসা।
- শিল্প: ধোঁয়া সনাক্তকরণ।
- বিজ্ঞান: ডেটিং।
টিপস:
- প্রকার জানুন।
- অর্ধায়ু গণনা।
- নিরাপত্তা মেনে চলুন।`
      : `Radioactivity is the emission of particles or radiation from unstable nuclei.
Key Concepts:
- Types: Alpha, Beta, Gamma.
- Half-life: Time for half decay.
- Unit: Becquerel (Bq).
Assumptions:
- Decay: Spontaneous.
- Nucleus: Protons, neutrons.
- Radiation: Energy emission.
Properties:
- Alpha: Helium nucleus.
- Beta: Electron or positron.
- Gamma: Photon.
Examples:
- Uranium: Decay.
- Carbon-14: Dating.
Applications:
- Medicine: Cancer treatment.
- Industry: Smoke detection.
- Science: Dating.
Tips:
- Know types.
- Calculate half-life.
- Follow safety.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "তেজস্ক্রিয়তা" : "Radioactivity"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "নিউক্লিয়াসের ক্ষয় প্রক্রিয়া।"
                  : "Process of nuclear decay."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "তেজস্ক্রিয় ক্ষয়ের প্রকার।"
                    : "Types of radioactive decay."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "তেজস্ক্রিয়তার ভিত্তি।"
                  : "Basis of radioactivity."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "ক্ষয়" : "Decay"}</strong>: 
                  {lang === "bn" ? "স্বতঃস্ফূর্ত।" : "Spontaneous."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "বিকিরণ" : "Radiation"}</strong>: 
                  {lang === "bn" ? "শক্তি নির্গমন।" : "Energy emission."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বৈশিষ্ট্য" : "Properties"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "তেজস্ক্রিয় কণার প্রকৃতি।"
                  : "Nature of radioactive particles."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "আলফা" : "Alpha"}</p>
                  <p className="text-sm">{lang === "bn" ? "হিলিয়াম নিউক্লিয়াস।" : "Helium nucleus."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "বিটা" : "Beta"}</p>
                  <p className="text-sm">{lang === "bn" ? "ইলেকট্রন।" : "Electron."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "গামা" : "Gamma"}</p>
                  <p className="text-sm">{lang === "bn" ? "ফোটন।" : "Photon."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg space-y-3">
              <p className="text-teal-700 dark:text-teal-300">
                {lang === "bn"
                  ? "তেজস্ক্রিয়তার উদাহরণ।"
                  : "Examples of radioactivity."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ইউরেনিয়াম" : "Uranium"}</p>
                  <p className="text-sm">{lang === "bn" ? "ক্ষয়।" : "Decay."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "কার্বন-১৪" : "Carbon-14"}</p>
                  <p className="text-sm">{lang === "bn" ? "ডেটিং।" : "Dating."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <p className="font-medium">{lang === "bn" ? "চিকিৎসা" : "Medicine"}</p>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "ক্যান্সার চিকিৎসা" : "Cancer treatment"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <p className="font-medium">{lang === "bn" ? "শিল্প" : "Industry"}</p>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "ধোঁয়া সনাক্তকরণ" : "Smoke detection"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <p className="font-medium">{lang === "bn" ? "বিজ্ঞান" : "Science"}</p>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "ডেটিং" : "Dating"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-600 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400 mt-4">
              <p className="font-medium text-yellow-700 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• {lang === "bn" ? "প্রকার জানুন।" : "Know types."}</li>
                <li>• {lang === "bn" ? "অর্ধায়ু গণনা।" : "Calculate half-life."}</li>
                <li>• {lang === "bn" ? "নিরাপত্তা মেনে চলুন।" : "Follow safety."}</li>
              </ul>
            </div>

            <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
          </div>

          <LanguageToggle lang={lang} setLang={setLang} />

          <TopicChatbot />
        </div>
      </CardContent>
    </Card>
  )
}
