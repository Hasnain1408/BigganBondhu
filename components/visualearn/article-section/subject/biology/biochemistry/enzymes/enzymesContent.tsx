"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function EnzymesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `এনজাইম হল জৈবিক প্রভাবক।
প্রকার:
- মেটাবলিক
- হজমকারী
কাজ:
- প্রতিক্রিয়া ত্বরান্বিত
- নির্দিষ্টতা
বৈশিষ্ট্য:
- প্রোটিন
- পুনঃব্যবহারযোগ্য`
      : `Enzymes are biological catalysts.
Types:
- Metabolic
- Digestive
Functions:
- Speed up reactions
- Specificity
Properties:
- Proteins
- Reusable`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "এনজাইম" : "Enzymes"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "এনজাইম হল প্রোটিন যা জৈব রাসায়নিক প্রতিক্রিয়াকে ত্বরান্বিত করে, জীবন প্রক্রিয়ার জন্য অপরিহার্য।"
                  : "Enzymes are proteins that accelerate biochemical reactions, essential for life processes."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "এনজাইম রাসায়নিক প্রতিক্রিয়ার গতি বাড়ায় সক্রিয়করণ শক্তি কমিয়ে, নির্দিষ্ট সাবস্ট্রেটের সাথে কাজ করে।"
                    : "Enzymes increase reaction rates by lowering activation energy, working with specific substrates."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "এনজাইমের প্রকার" : "Types of Enzymes"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "মেটাবলিক" : "Metabolic"}</p>
                  <p className="text-sm">{lang === "bn" ? "বিপাক নিয়ন্ত্রণ।" : "Regulates metabolism."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "হজমকারী" : "Digestive"}</p>
                  <p className="text-sm">{lang === "bn" ? "খাদ্য ভাঙে।" : "Breaks down food."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "এনজাইমের কাজ" : "Functions of Enzymes"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রতিক্রিয়া ত্বরান্বিত" : "Speed up Reactions"}</p>
                  <p className="text-sm">{lang === "bn" ? "গতি বাড়ায়।" : "Increases rate."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নির্দিষ্টতা" : "Specificity"}</p>
                  <p className="text-sm">{lang === "bn" ? "নির্দিষ্ট সাবস্ট্রেট।" : "Specific substrate."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "এনজাইমের বৈশিষ্ট্য" : "Properties of Enzymes"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রোটিন" : "Proteins"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিন প্রকৃতি।" : "Protein nature."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পুনঃব্যবহারযোগ্য" : "Reusable"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রতিক্রিয়ায় অপরিবর্তিত।" : "Unchanged in reactions."}</p>
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
                  <li>• {lang === "bn" ? "এনজাইম থেরাপি" : "Enzyme therapy"}</li>
                  <li>• {lang === "bn" ? "রোগ নির্ণয়" : "Disease diagnosis"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "খাদ্য প্রক্রিয়াকরণ" : "Food processing"}</li>
                  <li>• {lang === "bn" ? "ডিটারজেন্ট" : "Detergents"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "এনজাইম নির্দিষ্ট সাবস্ট্রেটে কাজ করে।" : "Enzymes are substrate-specific."}</li>
                <li>• {lang === "bn" ? "তাপমাত্রা এনজাইম কার্যকারিতা প্রভাবিত করে।" : "Temperature affects enzyme activity."}</li>
                <li>• {lang === "bn" ? "pH এনজাইমের জন্য গুরুত্বপূর্ণ।" : "pH is critical for enzymes."}</li>
                <li>• {lang === "bn" ? "এনজাইম পুনঃব্যবহারযোগ্য।" : "Enzymes are reusable."}</li>
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