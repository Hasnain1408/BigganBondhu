
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ClassificationOfMatterContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পদার্থের শ্রেণীবিভাগ পদার্থকে তার গঠন এবং বৈশিষ্ট্যের ভিত্তিতে শ্রেণীকরণ করে।
মূল ধারণা:
- পদার্থ: যা স্থান দখল করে এবং ভর আছে।
- শ্রেণীবিভাগ: বিশুদ্ধ পদার্থ এবং মিশ্রণ।
প্রকার:
- বিশুদ্ধ পদার্থ: উপাদান (যেমন, অক্সিজেন) এবং যৌগ (যেমন, পানি)।
- মিশ্রণ: সমসত্ব (যেমন, লবণ পানি) এবং বিষমসত্ব (যেমন, বালি-পানি)।
বৈশিষ্ট্য:
- উপাদান: বিভাজ্য নয়।
- যৌগ: নির্দিষ্ট অনুপাতে উপাদান।
- মিশ্রণ: পরিবর্তনশীল গঠন।
উদাহরণ:
- উপাদান: হাইড্রোজেন।
- যৌগ: কার্বন ডাইঅক্সাইড।
- মিশ্রণ: বাতাস।
প্রয়োগ:
- শিল্প: পদার্থ পৃথকীকরণ।
- গবেষণা: পদার্থ বিশ্লেষণ।
- শিক্ষা: পদার্থের প্রকৃতি শেখা।
টিপস:
- গঠন চিহ্নিত করুন।
- বৈশিষ্ট্য পরীক্ষা করুন।
- শ্রেণীবিভাগের চিত্র ব্যবহার করুন।`
      : `Classification of Matter categorizes substances based on composition and properties.
Key Concepts:
- Matter: Anything with mass and volume.
- Classification: Pure substances and mixtures.
Types:
- Pure Substances: Elements (e.g., oxygen) and compounds (e.g., water).
- Mixtures: Homogeneous (e.g., saltwater) and heterogeneous (e.g., sand-water).
Properties:
- Elements: Indivisible chemically.
- Compounds: Fixed ratio of elements.
- Mixtures: Variable composition.
Examples:
- Element: Hydrogen.
- Compound: Carbon dioxide.
- Mixture: Air.
Applications:
- Industry: Separating substances.
- Research: Analyzing materials.
- Education: Learning matter’s nature.
Tips:
- Identify composition.
- Examine properties.
- Use classification charts.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পদার্থের শ্রেণীবিভাগ" : "Classification of Matter"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পদার্থকে গঠন এবং বৈশিষ্ট্যের ভিত্তিতে শ্রেণীকরণ করা হয়।"
                  : "Matter is categorized by composition and properties."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "পদার্থের ভর এবং আয়তন থাকে।"
                    : "Matter has mass and occupies space."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পদার্থ বিশুদ্ধ বা মিশ্রণ হতে পারে।"
                  : "Matter can be pure or a mixture."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "বিশুদ্ধ পদার্থ" : "Pure Substances"}</strong>: 
                  {lang === "bn" ? "উপাদান এবং যৌগ।" : "Elements and compounds."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "মিশ্রণ" : "Mixtures"}</strong>: 
                  {lang === "bn" ? "সমসত্ব এবং বিষমসত্ব।" : "Homogeneous and heterogeneous."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ শ্রেণীবিভাগ বোঝায়।"
                  : "Practical examples illustrate classification."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "উপাদান" : "Element"}</p>
                  <p className="text-sm">{lang === "bn" ? "হাইড্রোজেন।" : "Hydrogen."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "যৌগ" : "Compound"}</p>
                  <p className="text-sm">{lang === "bn" ? "পানি।" : "Water."}</p>
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
                  <li>• {lang === "bn" ? "পদার্থ পৃথকীকরণ" : "Substance separation"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "পদার্থ বিশ্লেষণ" : "Material analysis"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "শিক্ষা" : "Education"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "প্রকৃতি শেখা" : "Learning matter’s nature"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "গঠন চিহ্নিত করুন।" : "Identify composition."}</li>
                <li>• {lang === "bn" ? "বৈশিষ্ট্য পরীক্ষা।" : "Examine properties."}</li>
                <li>• {lang === "bn" ? "চিত্র ব্যবহার।" : "Use charts."}</li>
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
