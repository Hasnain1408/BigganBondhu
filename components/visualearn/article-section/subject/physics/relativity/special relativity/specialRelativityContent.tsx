
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function SpecialRelativityContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বিশেষ আপেক্ষিকতা ধ্রুব গতিতে চলমান বস্তুর পদার্থবিজ্ঞান অন্বেষণ করে, বিশেষ করে আলোর গতির কাছাকাছি, সময় প্রসারণ এবং দৈর্ঘ্য সংকোচন প্রবর্তন করে।
মূল ধারণা:
- আলোর গতির ধ্রুবতা
- সময় প্রসারণ
- দৈর্ঘ্য সংকোচন
- আপেক্ষিকতার নীতি
- লরেন্টজ রূপান্তর
সূত্রাবলী:
- সময় প্রসারণ: Δt = Δt₀ / √(1 - v²/c²)
- দৈর্ঘ্য সংকোচন: L = L₀ √(1 - v²/c²)
- লরেন্টজ ফ্যাক্টর: γ = 1 / √(1 - v²/c²)`
      : `Special Relativity explores the physics of objects moving at constant speeds, particularly near the speed of light, introducing time dilation and length contraction.
Key Concepts:
- Constancy of the speed of light
- Time dilation
- Length contraction
- Principle of relativity
- Lorentz transformation
Formulas:
- Time dilation: Δt = Δt₀ / √(1 - v²/c²)
- Length contraction: L = L₀ √(1 - v²/c²)
- Lorentz factor: γ = 1 / √(1 - v²/c²)`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বিশেষ আপেক্ষিকতা" : "Special Relativity"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "বিশেষ আপেক্ষিকতা, আইনস্টাইনের ১৯০৫ সালের তত্ত্ব, ধ্রুব গতিতে চলমান পর্যবেক্ষকদের জন্য পদার্থবিজ্ঞানের আইন বর্ণনা করে।"
                  : "Special Relativity, Einstein’s 1905 theory, describes the laws of physics for observers moving at constant speeds."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "আলোর গতি সব পর্যবেক্ষকের জন্য ধ্রুব, এবং পদার্থবিজ্ঞানের আইন সব ইনার্শিয়াল ফ্রেমে একই।"
                    : "The speed of light is constant for all observers, and the laws of physics are the same in all inertial frames."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সময় প্রসারণ" : "Time Dilation"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "চলমান ঘড়ি বিশ্রামে থাকা ঘড়ির তুলনায় ধীরে চলে।"
                  : "A moving clock runs slower compared to a clock at rest."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "সূত্র:" : "Formula:"}
                  </p>
                  <p className="font-mono text-lg">Δt = Δt₀ / √(1 - v²/c²)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "Δt₀ = সঠিক সময়, v = গতি, c = আলোর গতি" : "Δt₀ = proper time, v = velocity, c = speed of light"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "দৈর্ঘ্য সংকোচন" : "Length Contraction"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "চলমান বস্তু তার গতির দিকে সংকুচিত হয়।"
                  : "A moving object contracts in the direction of motion."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "সূত্র:" : "Formula:"}
                  </p>
                  <p className="font-mono text-lg">L = L₀ √(1 - v²/c²)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "L₀ = সঠিক দৈর্ঘ্য" : "L₀ = proper length"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "লরেন্টজ রূপান্তর" : "Lorentz Transformation"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "স্থান এবং সময়ের স্থানাঙ্ক বিভিন্ন ইনার্শিয়াল ফ্রেমের মধ্যে রূপান্তরিত হয়।"
                  : "Space and time coordinates transform between different inertial frames."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "লরেন্টজ ফ্যাক্টর:" : "Lorentz Factor:"}</p>
                  <p className="font-mono text-lg">γ = 1 / √(1 - v²/c²)</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জিপিএস" : "GPS"}</li>
                  <li>• {lang === "bn" ? "কণা ত্বরক" : "Particle accelerators"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "মিউয়ন ক্ষয়" : "Muon decay"}</li>
                  <li>• {lang === "bn" ? "ই-এম তরঙ্গ" : "EM waves"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "আলোর গতি সর্বোচ্চ সীমা।" : "Speed of light is the ultimate limit."}</li>
                <li>• {lang === "bn" ? "সময় এবং স্থান আপেক্ষিক।" : "Time and space are relative."}</li>
                <li>• {lang === "bn" ? "E = mc² শক্তি-ভর সমতুল্যতা।" : "E = mc² shows energy-mass equivalence."}</li>
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
