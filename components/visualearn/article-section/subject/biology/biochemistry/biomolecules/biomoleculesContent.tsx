"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function BiomoleculesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `জৈব অণু হল জীবের মৌলিক উপাদান।
প্রকার:
- কার্বোহাইড্রেট
- প্রোটিন
- লিপিড
- নিউক্লিক অ্যাসিড
কাজ:
- শক্তি সরবরাহ
- গঠন
- তথ্য সংরক্ষণ`
      : `Biomolecules are the basic components of life.
Types:
- Carbohydrates
- Proteins
- Lipids
- Nucleic Acids
Functions:
- Energy Supply
- Structure
- Information Storage`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "জৈব অণু" : "Biomolecules"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "জৈব অণু হল জীবন্ত প্রাণীর মৌলিক বিল্ডিং ব্লক, যা জীবনের জন্য প্রয়োজনীয় প্রক্রিয়াগুলি সমর্থন করে। এরা শক্তি সরবরাহ, গঠন প্রদান এবং জিনগত তথ্য সংরক্ষণ করে।"
                  : "Biomolecules are the fundamental building blocks of living organisms, supporting essential life processes. They provide energy, structure, and store genetic information."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জৈব অণু জীবনের রাসায়নিক ভিত্তি গঠন করে, বিভিন্ন কাজ যেমন বিপাক, বৃদ্ধি এবং প্রজনন সমর্থন করে।"
                    : "Biomolecules form the chemical basis of life, supporting diverse functions like metabolism, growth, and reproduction."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জৈব অণুর প্রকার" : "Types of Biomolecules"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "কার্বোহাইড্রেট" : "Carbohydrates"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তির প্রাথমিক উৎস।" : "Primary energy source."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রোটিন" : "Proteins"}</p>
                  <p className="text-sm">{lang === "bn" ? "গঠন এবং এনজাইম।" : "Structure and enzymes."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "লিপিড" : "Lipids"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি সঞ্চয়, ঝিল্লি।" : "Energy storage, membranes."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নিউক্লিক অ্যাসিড" : "Nucleic Acids"}</p>
                  <p className="text-sm">{lang === "bn" ? "জিনগত তথ্য।" : "Genetic information."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জৈব অণুর কাজ" : "Functions of Biomolecules"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "শক্তি সরবরাহ" : "Energy Supply"}</p>
                  <p className="text-sm">{lang === "bn" ? "কার্বোহাইড্রেট, লিপিড।" : "Carbohydrates, lipids."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "গঠন" : "Structure"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিন, লিপিড।" : "Proteins, lipids."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "তথ্য সংরক্ষণ" : "Information Storage"}</p>
                  <p className="text-sm">{lang === "bn" ? "ডিএনএ, আরএনএ।" : "DNA, RNA."}</p>
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
                  <li>• {lang === "bn" ? "প্রোটিন ভিত্তিক ঔষধ" : "Protein-based drugs"}</li>
                  <li>• {lang === "bn" ? "জিন থেরাপি" : "Gene therapy"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জিনগতভাবে পরিবর্তিত ফসল" : "GM crops"}</li>
                  <li>• {lang === "bn" ? "বায়োপেস্টিসাইড" : "Biopesticides"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কার্বোহাইড্রেট দ্রুত শক্তি দেয়।" : "Carbohydrates provide quick energy."}</li>
                <li>• {lang === "bn" ? "প্রোটিন এনজাইম হিসেবে কাজ করে।" : "Proteins act as enzymes."}</li>
                <li>• {lang === "bn" ? "লিপিড কোষ ঝিল্লি গঠন করে।" : "Lipids form cell membranes."}</li>
                <li>• {lang === "bn" ? "ডিএনএ জিনগত তথ্য সংরক্ষণ করে।" : "DNA stores genetic information."}</li>
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