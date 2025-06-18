
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ScientificMeasurementContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বৈজ্ঞানিক পরিমাপ পদার্থের বৈশিষ্ট্য পরিমাণ নির্ধারণ করে।
মূল ধারণা:
- নির্ভুলতা: পরিমাপের সঠিকতা।
- তাৎপর্যপূর্ণ সংখ্যা: অর্থবহ সংখ্যা।
একক:
- দৈর্ঘ্য: মিটার।
- ভর: কিলোগ্রাম।
- তাপমাত্রা: কেলভিন।
সরঞ্জাম:
- দৈর্ঘ্য: রুলার।
- ভর: তুলা।
- আয়তন: গ্রাজুয়েটেড সিলিন্ডার।
প্রয়োগ:
- গবেষণা: তথ্য সংগ্রহ।
- শিল্প: মান নিয়ন্ত্রণ।
- শিক্ষা: পরীক্ষণ শেখা।
টিপস:
- সঠিক সরঞ্জাম ব্যবহার করুন।
- তাৎপর্যপূর্ণ সংখ্যা গণনা করুন।
- একক রূপান্তর শিখুন।`
      : `Scientific Measurement quantifies properties of matter.
Key Concepts:
- Accuracy: Correctness of measurements.
- Significant Figures: Meaningful digits.
Units:
- Length: Meter.
- Mass: Kilogram.
- Temperature: Kelvin.
Tools:
- Length: Ruler.
- Mass: Balance.
- Volume: Graduated cylinder.
Applications:
- Research: Data collection.
- Industry: Quality control.
- Education: Learning experiments.
Tips:
- Use proper tools.
- Count significant figures.
- Learn unit conversions.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বৈজ্ঞানিক পরিমাপ" : "Scientific Measurement"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পদার্থের বৈশিষ্ট্য সুনির্দিষ্টভাবে পরিমাণ নির্ধারণ।"
                  : "Precise quantification of matter’s properties."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "নির্ভুলতা এবং তাৎপর্যপূর্ণ সংখ্যা গুরুত্বপূর্ণ।"
                    : "Accuracy and significant figures are crucial."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "একক" : "Units"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পরিমাপের জন্য স্ট্যান্ডার্ড একক ব্যবহৃত হয়।"
                  : "Standard units are used for measurements."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "দৈর্ঘ্য" : "Length"}</strong>: 
                  {lang === "bn" ? "মিটার।" : "Meter."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ভর" : "Mass"}</strong>: 
                  {lang === "bn" ? "কিলোগ্রাম।" : "Kilogram."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সরঞ্জাম" : "Tools"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "বিভিন্ন সরঞ্জাম পরিমাপের জন্য ব্যবহৃত হয়।"
                  : "Various tools are used for measurements."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "দৈর্ঘ্য" : "Length"}</p>
                  <p className="text-sm">{lang === "bn" ? "রুলার।" : "Ruler."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "আয়তন" : "Volume"}</p>
                  <p className="text-sm">{lang === "bn" ? "গ্রাজুয়েটেড সিলিন্ডার।" : "Graduated cylinder."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "তথ্য সংগ্রহ" : "Data collection"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "মান নিয়ন্ত্রণ" : "Quality control"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "শিক্ষা" : "Education"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "পরীক্ষণ শেখা" : "Learning experiments"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সঠিক সরঞ্জাম ব্যবহার।" : "Use proper tools."}</li>
                <li>• {lang === "bn" ? "তাৎপর্যপূর্ণ সংখ্যা গণনা।" : "Count significant figures."}</li>
                <li>• {lang === "bn" ? "একক রূপান্তর শিখুন।" : "Learn unit conversions."}</li>
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
