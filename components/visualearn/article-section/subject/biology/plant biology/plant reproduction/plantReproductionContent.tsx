"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PlantReproductionContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `উদ্ভিদ প্রজনন হল নতুন উদ্ভিদ সৃষ্টি।
প্রকার:
- অযৌন
- যৌন
প্রক্রিয়া:
- পরাগায়ন
- নিষেক
অঙ্গ:
- ফুল
- বীজ`
      : `Plant reproduction creates new plants.
Types:
- Asexual
- Sexual
Processes:
- Pollination
- Fertilization
Organs:
- Flower
- Seed`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "উদ্ভিদ প্রজনন" : "Plant Reproduction"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "উদ্ভিদ প্রজনন নতুন উদ্ভিদ উৎপন্ন করে, প্রজাতির ধারাবাহিকতা নিশ্চিত করে।"
                  : "Plant reproduction produces new plants, ensuring species continuity."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "উদ্ভিদ অযৌন বা যৌন প্রজননের মাধ্যমে নতুন প্রজন্ম তৈরি করে।"
                    : "Plants reproduce asexually or sexually to create new generations."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রজননের প্রকার" : "Types of Reproduction"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "অযৌন" : "Asexual"}</p>
                  <p className="text-sm">{lang === "bn" ? "ক্লোন তৈরি।" : "Produces clones."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "যৌন" : "Sexual"}</p>
                  <p className="text-sm">{lang === "bn" ? "বৈচিত্র্য তৈরি।" : "Creates diversity."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রজনন প্রক্রিয়া" : "Reproduction Processes"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পরাগায়ন" : "Pollination"}</p>
                  <p className="text-sm">{lang === "bn" ? "পরাগ স্থানান্তর।" : "Pollen transfer."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নিষেক" : "Fertilization"}</p>
                  <p className="text-sm">{lang === "bn" ? "ডিম্বাণু মিলন।" : "Egg fusion."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রজনন অঙ্গ" : "Reproductive Organs"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ফুল" : "Flower"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রজনন কাঠামো।" : "Reproductive structure."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "বীজ" : "Seed"}</p>
                  <p className="text-sm">{lang === "bn" ? "নতুন উদ্ভিদ।" : "New plant."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "হাইব্রিড বীজ" : "Hybrid seeds"}</li>
                  <li>• {lang === "bn" ? "পরাগায়ন ব্যবস্থাপনা" : "Pollination management"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জৈববৈচিত্র্য রক্ষা" : "Biodiversity conservation"}</li>
                  <li>• {lang === "bn" ? "বনায়ন" : "Reforestation"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "অযৌন প্রজনন দ্রুত।" : "Asexual reproduction is fast."}</li>
                <li>• {lang === "bn" ? "যৌন প্রজনন বৈচিত্র্য দেয়।" : "Sexual reproduction adds diversity."}</li>
                <li>• {lang === "bn" ? "পরাগায়ন পোকার উপর নির্ভর করে।" : "Pollination relies on insects."}</li>
                <li>• {lang === "bn" ? "বীজ অঙ্কুরিত হয়।" : "Seeds germinate."}</li>
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