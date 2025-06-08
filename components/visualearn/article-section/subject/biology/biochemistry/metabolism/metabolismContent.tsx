"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function MetabolismContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বিপাক হল জৈব রাসায়নিক প্রক্রিয়া।
প্রকার:
- ক্যাটাবলিজম
- অ্যানাবলিজম
পথ:
- গ্লাইকোলাইসিস
- ক্রেবস চক্র
ফলাফল:
- শক্তি
- অণু`
      : `Metabolism is a set of biochemical processes.
Types:
- Catabolism
- Anabolism
Pathways:
- Glycolysis
- Krebs Cycle
Outcomes:
- Energy
- Molecules`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বিপাক" : "Metabolism"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "বিপাক হল কোষে রাসায়নিক প্রতিক্রিয়ার সমষ্টি যা শক্তি উৎপাদন এবং অণু সংশ্লেষণ করে।"
                  : "Metabolism is the sum of chemical reactions in cells that produce energy and synthesize molecules."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "বিপাক শক্তি রূপান্তর এবং জৈব অণু তৈরির মাধ্যমে জীবন ধারণ করে।"
                    : "Metabolism sustains life by converting energy and building biological molecules."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বিপাকের প্রকার" : "Types of Metabolism"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ক্যাটাবলিজম" : "Catabolism"}</p>
                  <p className="text-sm">{lang === "bn" ? "অণু ভাঙা।" : "Breaking down molecules."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অ্যানাবলিজম" : "Anabolism"}</p>
                  <p className="text-sm">{lang === "bn" ? "অণু তৈরি।" : "Building molecules."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বিপাকের পথ" : "Metabolic Pathways"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গ্লাইকোলাইসিস" : "Glycolysis"}</p>
                  <p className="text-sm">{lang === "bn" ? "গ্লুকোজ ভাঙা।" : "Glucose breakdown."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ক্রেবস চক্র" : "Krebs Cycle"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি উৎপাদন।" : "Energy production."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ফলাফল" : "Outcomes"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "শক্তি" : "Energy"}</p>
                  <p className="text-sm">{lang === "bn" ? "ATP উৎপন্ন।" : "ATP production."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অণু" : "Molecules"}</p>
                  <p className="text-sm">{lang === "bn" ? "জৈব পদার্থ।" : "Biological compounds."}</p>
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
                  <li>• {lang === "bn" ? "মেটাবলিক রোগ চিকিৎসা" : "Metabolic disease treatment"}</li>
                  <li>• {lang === "bn" ? "ডায়াবেটিস ব্যবস্থাপনা" : "Diabetes management"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "ফসলের বিপাক উন্নতি" : "Crop metabolism enhancement"}</li>
                  <li>• {lang === "bn" ? "জৈব জ্বালানি" : "Biofuels"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ক্যাটাবলিজম শক্তি মুক্তি দেয়।" : "Catabolism releases energy."}</li>
                <li>• {lang === "bn" ? "অ্যানাবলিজম শক্তি ব্যবহার করে।" : "Anabolism uses energy."}</li>
                <li>• {lang === "bn" ? "গ্লাইকোলাইসিস সাইটোপ্লাজমে ঘটে।" : "Glycolysis occurs in cytoplasm."}</li>
                <li>• {lang === "bn" ? "ক্রেবস চক্র মাইটোকন্ড্রিয়ায়।" : "Krebs cycle in mitochondria."}</li>
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