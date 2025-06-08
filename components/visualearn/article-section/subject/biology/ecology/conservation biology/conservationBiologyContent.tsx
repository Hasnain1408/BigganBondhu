"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ConservationBiologyContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `সংরক্ষণ জীববিজ্ঞান জৈববৈচিত্র্য রক্ষা করে।
লক্ষ্য:
- প্রজাতি সংরক্ষণ
- ইকোসিস্টেম পুনরুদ্ধার
পদ্ধতি:
- সংরক্ষিত এলাকা
- পুনঃঅধিষ্ঠান
চ্যালেঞ্জ:
- আবাসস্থল হ্রাস
- জলবায়ু পরিবর্তন`
      : `Conservation biology protects biodiversity.
Goals:
- Species Preservation
- Ecosystem Restoration
Methods:
- Protected Areas
- Reintroduction
Challenges:
- Habitat Loss
- Climate Change`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "সংরক্ষণ জীববিজ্ঞান" : "Conservation Biology"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "সংরক্ষণ জীববিজ্ঞান জৈববৈচিত্র্য এবং ইকোসিস্টেম রক্ষার জন্য কাজ করে।"
                  : "Conservation biology works to protect biodiversity and ecosystems."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "সংরক্ষণ জীববিজ্ঞান প্রজাতি এবং তাদের আবাসস্থল রক্ষা করে ইকোসিস্টেম ভারসাম্য বজায় রাখে।"
                    : "Conservation biology preserves species and habitats to maintain ecosystem balance."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "লক্ষ্য" : "Goals"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রজাতি সংরক্ষণ" : "Species Preservation"}</p>
                  <p className="text-sm">{lang === "bn" ? "বিলুপ্তি রোধ।" : "Prevent extinction."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ইকোসিস্টেম পুনরুদ্ধার" : "Ecosystem Restoration"}</p>
                  <p className="text-sm">{lang === "bn" ? "আবাসস্থল মেরামত।" : "Habitat repair."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পদ্ধতি" : "Methods"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সংরক্ষিত এলাকা" : "Protected Areas"}</p>
                  <p className="text-sm">{lang === "bn" ? "জাতীয় উদ্যান।" : "National parks."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পুনঃঅধিষ্ঠান" : "Reintroduction"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রজাতি ফিরিয়ে আনা।" : "Species reintroduction."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "চ্যান্লেঞ্জ" : "Challenges"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "আবাসস্থল হ্রাস" : "Habitat Loss"}</p>
                  <p className className="text-sm">{lang === "bn" ? "বন উজাড়।" : "Deforestation."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "জলবায়ু পরিবর্তন" : "Climate Change"}</p>
                  <p className="text-sm">{lang === "bn" ? "পরিবেশ পরিবর্তন।" : "Environmental change."}</p>
                </div>
              </div>
            </div>

            <h4 className className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "পরিব পৰা" : "Environment"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জৈববৈচিত্র্য রক্ষা" : "Biodiversity protection"}</li>
                  <li>• {lang === "bn" ? "ইকোসিস্টেম সেবা" : "Ecosystem services"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "টেকসই কৃষি" : "Sustainable farming"}</li>
                  <li>• {lang === "bn" ? "পরাগায়ন রক্ষা" : "Pollinator protection"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "জৈববৈচিত্র্য ইকোসিস্টেমের জন্য গুরুত্বপূর্ণ।" : "Biodiversity is key to ecosystems."}</li>
                <li>• {lang === "bn" ? "আবাসস্থল রক্ষা প্রজাতি বাঁচায়।" : "Habitat protection saves species."}</li>
                <li>• {lang === "bn" ? "পুনঃঅধিষ্ঠান প্রজাতি পুনরুদ্ধার করে।" : "Reintroduction restores species."}</li>
                <li>• {lang === "bn" ? "জলবায়ু পরিবর্তন চ্যালেঞ্জ।" : "Climate change is a challenge."}</li>
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