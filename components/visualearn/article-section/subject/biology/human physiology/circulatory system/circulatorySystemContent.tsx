"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function CirculatorySystemContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `রক্ত সংবহনতন্ত্র পুষ্টি ও অক্সিজেন পরিবহন করে।
অঙ্গ:
- হৃদয়
- রক্তনালী
- রক্ত
প্রক্রিয়া:
- পাম্পিং
- সঞ্চালন
কাজ:
- পরিবহন
- নিয়ন্ত্রণ`
      : `The circulatory system transports nutrients and oxygen.
Organs:
- Heart
- Blood Vessels
- Blood
Processes:
- Pumping
- Circulation
Functions:
- Transport
- Regulation`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "রক্ত সংবহনতন্ত্র" : "Circulatory System"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "রক্ত সংবহনতন্ত্র শরীরের কোষে পুষ্টি, অক্সিজেন এবং বর্জ্য পরিবহন করে।"
                  : "The circulatory system transports nutrients, oxygen, and waste to and from body cells."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "রক্ত সংবহনতন্ত্র শরীরের অভ্যন্তরীণ ভারসাম্য এবং কোষের কার্যকারিতা বজায় রাখে।"
                    : "The circulatory system maintains internal balance and supports cell function."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অঙ্গ" : "Organs"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "হৃদয়" : "Heart"}</p>
                  <p className="text-sm">{lang === "bn" ? "রক্ত পাম্প করে।" : "Pumps blood."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রক্তনালী" : "Blood Vessels"}</p>
                  <p className="text-sm">{lang === "bn" ? "পরিবহন পথ।" : "Transport pathways."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রক্ত" : "Blood"}</p>
                  <p className="text-sm">{lang === "bn" ? "পুষ্টি বহন।" : "Carries nutrients."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রক্রিয়া" : "Processes"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পাম্পিং" : "Pumping"}</p>
                  <p className="text-sm">{lang === "bn" ? "হৃদয়ের সংকোচন।" : "Heart contraction."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সঞ্চালন" : "Circulation"}</p>
                  <p className="text-sm">{lang === "bn" ? "রক্ত প্রবাহ।" : "Blood flow."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কাজ" : "Functions"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পরিবহন" : "Transport"}</p>
                  <p className="text-sm">{lang === "bn" ? "পুষ্টি, অক্সিজেন।" : "Nutrients, oxygen."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নিয়ন্ত্রণ" : "Regulation"}</p>
                  <p className="text-sm">{lang === "bn" ? "তাপমাত্রা, pH।" : "Temperature, pH."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "হৃদরোগ চিকিৎসা" : "Heart disease treatment"}</li>
                  <li>• {lang === "bn" ? "রক্ত পরীক্ষা" : "Blood tests"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "স্টেম সেল" : "Stem cells"}</li>
                  <li>• {lang === "bn" ? "কৃত্রিম হৃদয়" : "Artificial heart"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "হৃদয় রক্ত পাম্প করে।" : "Heart pumps blood."}</li>
                <li>• {lang === "bn" ? "ধমনী অক্সিজেন বহন করে।" : "Arteries carry oxygen."}</li>
                <li>• {lang === "bn" ? "শিরা CO2 ফেরত আনে।" : "Veins return CO2."}</li>
                <li>• {lang === "bn" ? "রক্ত তাপমাত্রা নিয়ন্ত্রণ করে।" : "Blood regulates temperature."}</li>
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