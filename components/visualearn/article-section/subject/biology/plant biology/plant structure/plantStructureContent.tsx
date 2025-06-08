"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PlantStructureContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `উদ্ভিদ গঠন হল উদ্ভিদের শারীরিক কাঠামো।
অঙ্গ:
- মূল
- কাণ্ড
- পাতা
টিস্যু:
- মেরিস্টেম
- ভাস্কুলার
কাজ:
- সমর্থন
- পরিবহন`
      : `Plant structure is the physical organization of plants.
Organs:
- Root
- Stem
- Leaf
Tissues:
- Meristem
- Vascular
Functions:
- Support
- Transport`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "উদ্ভিদের গঠন" : "Plant Structure"}
            </h3> {/* FIXED: Correct closing tag */}

            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn" 
                  ? "উদ্ভিদের গঠন উদ্ভিদের অঙ্গ ও টিস্যু নিয়ে গঠিত, যা বৃদ্ধি, সমর্থন এবং পুষ্টি পরিবহন সমর্থন করে।"
                  : "Plant structure consists of organs and tissues that support growth, support, and nutrient transport."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "উদ্ভিদের গঠন উদ্ভিদের জীবন প্রক্রিয়া, যেমন আলোকসংশ্লেষণ এবং পুষ্টি শোষণের জন্য অপরিহার্য।"
                    : "Plant structure is essential for life processes like photosynthesis and nutrient uptake."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদ্ভিদের অঙ্গ" : "Plant Organs"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "মূল" : "Root"}</p>
                  <p className="text-sm">{lang === "bn" ? "শোষণ, নোঙর।" : "Absorption, anchoring."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "কাণ্ড" : "Stem"}</p>
                  <p className="text-sm">{lang === "bn" ? "সমর্থন, পরিবহন।" : "Support, transport."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পাতা" : "Leaf"}</p>
                  <p className="text-sm">{lang === "bn" ? "আলোকসংশ্লেষণ।" : "Photosynthesis."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদ্ভিদের টিস্যু" : "Plant Tissues"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "মেরিস্টেম" : "Meristem"}</p>
                  <p className="text-sm">{lang === "bn" ? "বৃদ্ধি।" : "Growth."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ভাস্কুলার" : "Vascular"}</p>
                  <p className="text-sm">{lang === "bn" ? "পানি, পুষ্টি পরিবহন।" : "Water, nutrient transport."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কাজ" : "Functions"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সমর্থন" : "Support"}</p>
                  <p className="text-sm">{lang === "bn" ? "গঠন স্থিতিশীলতা।" : "Structural stability."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পরিবহন" : "Transport"}</p>
                  <p className="text-sm">{lang === "bn" ? "পুষ্টি বিতরণ।" : "Nutrient distribution."}</p>
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
                  <li>• {lang === "bn" ? "ফসল উন্নতি" : "Crop improvement"}</li>
                  <li>• {lang === "bn" ? "মাটি সংরক্ষণ" : "Soil conservation"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "বায়োটেক" : "Biotechnology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জিনগত পরিবর্তন" : "Genetic modification"}</li>
                  <li>• {lang === "bn" ? "টিস্যু কালচার" : "Tissue culture"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "মূল পানি শোষণ করে।" : "Roots absorb water."}</li>
                <li>• {lang === "bn" ? "কাণ্ড উদ্ভিদকে সমর্থন করে।" : "Stems support the plant."}</li>
                <li>• {lang === "bn" ? "পাতা খাদ্য তৈরি করে।" : "Leaves produce food."}</li>
                <li>• {lang === "bn" ? "জাইলেম পানি পরিবহন করে।" : "Xylem transports water."}</li>
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