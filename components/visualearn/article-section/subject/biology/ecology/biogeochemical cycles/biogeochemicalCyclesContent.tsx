"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function BiogeochemicalCyclesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `জৈবভূরাসায়নিক চক্র পুষ্টি পুনঃচক্রণ করে।
প্রকার:
- কার্বন চক্র
- নাইট্রোজেন চক্র
উপাদান:
- জৈবিক
- অজৈবিক
প্রক্রিয়া:
- শোষণ
- রূপান্তর`
      : `Biogeochemical cycles recycle nutrients.
Types:
- Carbon Cycle
- Nitrogen Cycle
Components:
- Biotic
- Abiotic
Processes:
- Uptake
- Transformation`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "জৈবভূরাসায়নিক চক্র" : "Biogeochemical Cycles"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "জৈবভূরাসায়নিক চক্র জীব ও পরিবেশের মধ্যে পুষ্টির পুনঃচক্রণ নিশ্চিত করে।"
                  : "Biogeochemical cycles ensure nutrient recycling between living organisms and the environment."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জৈবভূরাসায়নিক চক্র পুষ্টি, যেমন কার্বন এবংশীলৰ নাইট্রোজেন, জীব ও অজৈবিক উপাদানের মধ্যে স্থানান্তর করে।"
                    : "Biogeochemical cycles transfer nutrients like carbon and nitrogen between biotic and abiotic components."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "চক্রের প্রকার" : "Types of Cycles"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "কার্বন চক্র" : "Carbon Cycle"}</p>
                  <p className="text-sm">{lang === "bn" ? "CO2 সঞ্চালন।" : "CO2 circulation."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নাইট্রোজেন চক্র" : "Nitrogen Cycle"}</p>
                  <p className="text-sm">{lang === "bn" ? "নাইট্রোজেন স্থিরকরণ।" : "Nitrogen fixation."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উপাদান" : "Components"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "জৈবিক" : "Biotic"}</p>
                  <p className="text-sm">{lang === "bn" ? "উদ্ভিদ, প্রাণী।" : "Plants, animals."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অজৈবিক" : "Abiotic"}</p>
                  <p className="text-sm">{lang === "bn" ? "মাটি, পানি।" : "Soil, water."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রক্রিয়া" : "Processes"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "শোষণ" : "Uptake"}</p>
                  <p className="text-sm">{lang === "bn" ? "পুষ্টি গ্রহণ।" : "Nutrient absorption."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রূপান্তর" : "Transformation"}</p>
                  <p className="text-sm">{lang === "bn" ? "রাসায়নিক পরিবর্তন।" : "Chemical change."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "কার্বন হ্রাস" : "Carbon sequestration"}</li>
                  <li>• {lang === "bn" ? "মাটির উর্বরতা" : "Soil fertility"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "সার ব্যবস্থাপনা" : "Fertilizer management"}</li>
                  <li>• {lang === "bn" ? "ফসল ঘূর্ণন" : "Crop rotation"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কার্বন আলোকসংশ্লেষণে ব্যবহৃত।" : "Carbon used in photosynthesis."}</li>
                <li>• {lang === "bn" ? "নাইট্রোজেন ফিক্সেশন ব্যাকটেরিয়া করে।" : "Nitrogen fixation by bacteria."}</li>
                <li>• {lang === "bn" ? "পানি চক্রের মূল উপাদান।" : "Water is a key component."}</li>
                <li>• {lang === "bn" ? "চক্র ভারসাম্য বজায় রাখে।" : "Cycles maintain equilibrium."}</li>
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