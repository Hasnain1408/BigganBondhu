
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function GreenChemistryContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `সবুজ রসায়ন পরিবেশের প্রভাব কমাতে রাসায়নিক প্রক্রিয়া ডিজাইন করে।
মূল ধারণা:
- স্থায়িত্ব: সম্পদ সংরক্ষণ।
- বর্জ্য হ্রাস: কম বিষাক্ত উপজাত।
নীতি:
- প্রতিরোধ: বর্জ্য উৎপন্ন না করে প্রতিরোধ।
- পরমাণু দক্ষতা: উপকরণের সর্বোচ্চ ব্যবহার।
- নিরাপদ রাসায়নিক: কম বিষাক্ত পদার্থ।
উদাহরণ:
- জৈব দ্রাবক: পরিবেশ-বান্ধব দ্রাবক।
- এনজাইম: প্রাকৃতিক অনুঘটক।
প্রয়োগ:
- শিল্প: সবুজ উৎপাদন।
- ফার্মাসিউটিক্যাল: নিরাপদ ওষুধ।
- কৃষি: পরিবেশ-বান্ধব কীটনাশক।
টিপস:
- ১২টি নীতি শিখুন।
- বর্জ্য মূল্যায়ন করুন।
- সবুজ বিকল্প চিহ্নিত করুন।`
      : `Green Chemistry designs chemical processes to reduce environmental impact.
Key Concepts:
- Sustainability: Conserving resources.
- Waste Reduction: Minimizing toxic byproducts.
Principles:
- Prevention: Prevent waste rather than treat it.
- Atom Economy: Maximize material use.
- Safer Chemicals: Use less toxic substances.
Examples:
- Bio-based Solvents: Eco-friendly solvents.
- Enzymes: Natural catalysts.
Applications:
- Industry: Green manufacturing.
- Pharmaceuticals: Safer drugs.
- Agriculture: Eco-friendly pesticides.
Tips:
- Learn the 12 principles.
- Assess waste output.
- Identify green alternatives.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "সবুজ রসায়ন" : "Green Chemistry"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "সবুজ রসায়ন পরিবেশ-বান্ধব প্রক্রিয়ার উপর গুরুত্ব দেয়।"
                  : "Green Chemistry emphasizes eco-friendly processes."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "স্থায়িত্ব এবং বর্জ্য হ্রাস মূল লক্ষ্য।"
                    : "Sustainability and waste reduction are core goals."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "নীতি" : "Principles"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "সবুজ রসায়নের ১২টি নীতি প্রক্রিয়া ডিজাইন নির্দেশ করে।"
                  : "Green Chemistry's 12 principles guide process design."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "প্রতিরোধ" : "Prevention"}</strong>: 
                  {lang === "bn" ? "বর্জ্য প্রতিরোধ।" : "Prevent waste."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "পরমাণু দক্ষতা" : "Atom Economy"}</strong>: 
                  {lang === "bn" ? "উপকরণ ব্যবহার।" : "Maximize material use."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ সবুজ রসায়ন বোঝায়।"
                  : "Practical examples illustrate Green Chemistry."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "জৈব দ্রাবক" : "Bio-based Solvents"}</p>
                  <p className="text-sm">{lang === "bn" ? "পরিবেশ-বান্ধব।" : "Eco-friendly."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "এনজাইম" : "Enzymes"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রাকৃতিক অনুঘটক।" : "Natural catalysts."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "সবুজ উৎপাদন" : "Green manufacturing"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "ফার্মাসিউটিক্যাল" : "Pharmaceuticals"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "নিরাপদ ওষুধ" : "Safer drugs"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "পরিবেশ-বান্ধব কীটনাশক" : "Eco-friendly pesticides"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "নীতি শিখুন।" : "Learn principles."}</li>
                <li>• {lang === "bn" ? "বর্জ্য মূল্যায়ন।" : "Assess waste."}</li>
                <li>• {lang === "bn" ? "বিকল্প চিহ্নিত করুন।" : "Identify alternatives."}</li>
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
