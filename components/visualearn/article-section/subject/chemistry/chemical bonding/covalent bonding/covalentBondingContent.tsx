"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function CovalentBondingContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `সহযোজী বন্ধন হল পরমাণুর মধ্যে ইলেকট্রন ভাগাভাগির মাধ্যমে গঠিত বন্ধন, সাধারণত অধাতুর মধ্যে।
মূল ধারণা:
- ইলেকট্রন ভাগাভাগি: স্থিতিশীল অষ্টক গঠন।
- প্রকার: একক, দ্বৈত, ত্রৈত বন্ধন।
- যৌগ: নিম্ন গলনাঙ্ক, অধিকাংশ অদ্রবণীয়।
উদাহরণ:
- H₂O: জল।
- CO₂: কার্বন ডাইঅক্সাইড।
বৈশিষ্ট্য:
- দিকনির্দেশক বন্ধন।
- নির্দিষ্ট আকৃতি।
- অপরিবাহী (সাধারণত)।`
      : `Covalent bonding involves the sharing of electrons between atoms to achieve a stable electron configuration, typically between non-metals.
Key Concepts:
- Electron Sharing: Forms stable octet.
- Types: Single, double, triple bonds.
- Compounds: Low melting point, mostly insoluble.
Examples:
- H₂O: Water.
- CO₂: Carbon dioxide.
Properties:
- Directional bonding.
- Specific molecular shapes.
- Non-conductive (generally).`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "সহযোজী বন্ধন" : "Covalent Bonding"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "সহযোজী বন্ধন হল অধাতু পরমাণুর মধ্যে ইলেকট্রন ভাগাভাগির মাধ্যমে গঠিত রাসায়নিক বন্ধন, যা অণু গঠন করে।"
                  : "Covalent bonding is a chemical bond formed by the sharing of electrons between non-metal atoms, forming molecules."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "পরমাণুগুলি ইলেকট্রন ভাগ করে অষ্টক নিয়ম পূরণ করে, যা স্থিতিশীল অণু গঠন করে।"
                    : "Atoms share electrons to satisfy the octet rule, forming stable molecules."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সহযোজী বন্ধনের প্রক্রিয়া" : "Covalent Bonding Process"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "দুটি পরমাণু তাদের বহিঃস্থ ইলেকট্রন ভাগ করে একটি স্থিতিশীল বন্ধন গঠন করে।"
                  : "Two atoms share their valence electrons to form a stable bond."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "একক বন্ধন: ১ জোড়া ইলেকট্রন ভাগ।" : "Single bond: 1 pair of electrons shared."}</li>
                <li>• {lang === "bn" ? "দ্বৈত বন্ধন: ২ জোড়া ইলেকট্রন ভাগ।" : "Double bond: 2 pairs of electrons shared."}</li>
                <li>• {lang === "bn" ? "ত্রৈত বন্ধন: ৩ জোড়া ইলেকট্রন ভাগ।" : "Triple bond: 3 pairs of electrons shared."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সহযোজী যৌগের বৈশিষ্ট্য" : "Properties of Covalent Compounds"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "সহযোজী যৌগগুলির নিম্ন গলনাঙ্ক এবং ফুটনাঙ্ক থাকে এবং এগুলি সাধারণত পানিতে অদ্রবণীয়।"
                  : "Covalent compounds have low melting and boiling points and are generally insoluble in water."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "অণু গঠন।" : "Molecular structure."}</li>
                <li>• {lang === "bn" ? "দিকনির্দেশক বন্ধন।" : "Directional bonding."}</li>
                <li>• {lang === "bn" ? "সাধারণত অপরিবাহী।" : "Generally non-conductive."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "সাধারণ সহযোজী যৌগগুলির মধ্যে রয়েছে জল (H₂O) এবং মিথেন (CH₄)।"
                  : "Common covalent compounds include water (H₂O) and methane (CH₄)."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">H₂O</p>
                  <p className="text-sm">{lang === "bn" ? "দুটি একক বন্ধন" : "Two single bonds"}</p>
                </div>
                <div>
                  <p className="font-medium">CO₂</p>
                  <p className="text-sm">{lang === "bn" ? "দুটি দ্বৈত বন্ধন" : "Two double bonds"}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সহযোজী বন্ধনের প্রয়োগ" : "Applications of Covalent Bonding"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "জৈব রসায়ন" : "Organic Chemistry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জৈব অণু গঠন" : "Organic molecule formation"}</li>
                  <li>• {lang === "bn" ? "পলিমার তৈরি" : "Polymer production"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "সেমিকন্ডাক্টর" : "Semiconductors"}</li>
                  <li>• {lang === "bn" ? "ফার্মাসিউটিক্যালস" : "Pharmaceuticals"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "অধাতুর মধ্যে বন্ধন।" : "Bonding between non-metals."}</li>
                <li>• {lang === "bn" ? "অষ্টক নিয়ম মনে রাখুন।" : "Remember the octet rule."}</li>
                <li>• {lang === "bn" ? "বন্ধন প্রকার গণনা করুন।" : "Count bond types."}</li>
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