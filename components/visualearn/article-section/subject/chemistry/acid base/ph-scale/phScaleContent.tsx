"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PHScaleContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `pH স্কেল একটি দ্রাণের অম্লতা বা ক্ষারত্ব পরিমাপ করে, যা 0 (অতি অম্লীয়) থেকে 14 (অতি ক্ষারীয়) পর্যন্ত, ৭ নিরপেক্ষ।
মূল ধারণা:
- pH = -log[H⁺]: হাইড্রোজেন আয়নের ঘনত্বের পরিমাপ।
- নিরপেক্ষ: pH ৭ এ H⁺ এবং OH⁻ সমান।
- অম্লীয়: pH < ৭, H⁺ বেশি।
- ক্ষারীয়: pH > ৭, OH⁻ বেশি।
ইতিহাস:
- সোরেন সোরেনসেন: ১৯০৯ সালে pH স্কেল প্রতিষ্ঠা করেন।
প্রধান বৈশিষ্ট্য:
- লগারিদমিক স্কেল: pH ১ এবং ২ এর মধ্যে ১০ গুণ পার্থক্য।
- পরিমাপ: pH মিটার বা সূচক কাগজ।
উদাহরণ:
- লেবুর রস: pH ~2.5, অম্লীয়।
- সাবান: pH ~10, ক্ষারীয়।
- জল: pH ~7, নিরপেক্ষ।
প্রয়োগ:
- চিকিৎসা: রক্তের pH নিয়ন্ত্রণ (7.35-7.45)।
- কৃষি: মাটির pH ফসলের জন্য।
- শিল্প: জল শোধন এবং উৎপাদন।
টিপস:
- pH গণনায় H⁺ ঘনত্ব ব্যবহার করুন।
- সূচক রং পরিবর্তন বুঝুন।
- pH পরিমাপে সঠিক যন্ত্র ব্যবহার করুন।`
      : `The pH scale measures the acidity or basicity of a solution, ranging from 0 (highly acidic) to 14 (highly basic), with 7 being neutral.
Key Concepts:
- pH = -log[H⁺]: Measures hydrogen ion concentration.
- Neutral: pH 7, where H⁺ and OH⁻ are equal.
- Acidic: pH < 7, higher H⁺.
- Basic: pH > 7, higher OH⁻.
History:
- Søren Sørensen: Introduced the pH scale in 1909.
Key Characteristics:
- Logarithmic Scale: A pH difference of 1 represents a tenfold change in H⁺.
- Measurement: pH meter or indicator paper.
Examples:
- Lemon Juice: pH ~2.5, acidic.
- Soap: pH ~10, basic.
- Water: pH ~7, neutral.
Applications:
- Medicine: Blood pH regulation (7.35-7.45).
- Agriculture: Soil pH for crop growth.
- Industry: Water treatment and production.
Tips:
- Use H⁺ concentration for pH calculations.
- Understand indicator color changes.
- Use accurate pH measurement tools.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "pH স্কেল" : "pH Scale"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "pH স্কেল একটি দ্রবণের অম্লতা বা ক্ষারত্ব পরিমাপ করে।"
                  : "The pH scale quantifies the acidity or basicity of a solution."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "ইতিহাস" : "History"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "সোরেন সোরেনসেন ১৯০৯ সালে pH স্কেল প্রতিষ্ঠা করেন।"
                    : "Søren Sørensen introduced the pH scale in 1909."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "pH হাইড্রোজেন আয়ন ঘনত্বের পরিমাপ করে।"
                  : "pH measures hydrogen ion concentration."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "নিরপেক্ষ" : "Neutral"}</strong>: 
                  {lang === "bn" ? "pH ৭ এ H⁺ এবং OH⁻ সমান।" : "pH 7, H⁺ equals OH⁻."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "অম্লীয়" : "Acidic"}</strong>: 
                  {lang === "bn" ? "pH < ৭, H⁺ বেশি।" : "pH < 7, higher H⁺."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ক্ষারীয়" : "Basic"}</strong>: 
                  {lang === "bn" ? "pH > ৭, OH⁻ বেশি।" : "pH > 7, higher OH⁻."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান বৈশিষ্ট্য" : "Key Characteristics"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "pH একটি লগারিদমিক স্কেল, ১ ইউনিট পার্থক্য মানে ১০ গুণ পরিবর্তন।"
                  : "pH is a logarithmic scale; a 1-unit difference means a tenfold change."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "পরিমাপ" : "Measurement"}</strong>: 
                  {lang === "bn" ? "pH মিটার বা সূচক কাগজ।" : "pH meter or indicator paper."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ pH স্কেল বোঝায়।"
                  : "Practical examples illustrate the pH scale."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "লেবুর রস" : "Lemon Juice"}</p>
                  <p className="text-sm">{lang === "bn" ? "pH ~2.5, অম্লীয়।" : "pH ~2.5, acidic."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "জল" : "Water"}</p>
                  <p className="text-sm">{lang === "bn" ? "pH ~7, নিরপেক্ষ।" : "pH ~7, neutral."}></p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "রক্তের pH" : "Blood pH"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "মাটির pH" : "Soil pH"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "sh" : "Industry"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "জল শোধন" : "Water treatment"}></li>}
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূৰ্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "H⁺ ঘনত্ব গণনা করুন।" : "Calculate H⁺ concentration."}</li>
                <li>• {lang === "bn" ? "সূচক রং বুঝুন।" : "Understand indicator colors."}></li>
                <li>• {lang === "bn" ? "সঠিক যন্ত্র ব্যবহার করুn।" : "Use accurate tools."}></li>
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