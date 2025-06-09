
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function HessLawContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `হেসের সূত্র বলে যে একটি বিক্রিয়ার মোট এনথালপি পরিবর্তন পথ নির্বিশেষে একই থাকে।
মূল ধারণা:
- এনথালপি পরিবর্তন (ΔH): বিক্রিয়ার শক্তি পরিবর্তন।
- পথ স্বাধীনতা: মধ্যবর্তী ধাপ নির্বিশেষে ΔH একই।
প্রক্রিয়া:
- বিক্রিয়াকে মধ্যবর্তী ধাপে ভাগ করুন।
- প্রতিটি ধাপের ΔH যোগ করুন।
উদাহরণ:
- কার্বন থেকে CO₂ গঠন: C + O₂ → CO₂ বা C → CO → CO₂।
- ΔH সরাসরি বা ধাপে ধাপে একই।
প্রয়োগ:
- শিল্প: বিক্রিয়ার শক্তি গণনা।
- গবেষণা: জটিল বিক্রিয়া বিশ্লেষণ।
- শিক্ষা: শক্তি সংরক্ষণ শেখা।
টিপস:
- বিক্রিয়ার ধাপ চিহ্নিত করুন।
- ΔH যোগ বা বিয়োগ সঠিকভাবে করুন।
- গঠনের এনথালপি টেবিল ব্যবহার করুন।`
      : `Hess's Law states that the total enthalpy change for a reaction is the same regardless of the pathway taken.
Key Concepts:
- Enthalpy Change (ΔH): Energy change in a reaction.
- Path Independence: ΔH is the same regardless of intermediate steps.
Process:
- Divide the reaction into intermediate steps.
- Sum the ΔH of each step.
Examples:
- Formation of CO₂ from carbon: C + O₂ → CO₂ or C → CO → CO₂.
- ΔH is the same via direct or stepwise paths.
Applications:
- Industry: Calculating reaction energies.
- Research: Analyzing complex reactions.
- Education: Learning energy conservation.
Tips:
- Identify reaction steps.
- Sum or subtract ΔH correctly.
- Use enthalpy of formation tables.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "হেসের সূত্র" : "Hess's Law"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "হেসের সূত্র এনথালপি পরিবর্তনের পথ স্বাধীনতা বোঝায়।"
                  : "Hess's Law explains path independence of enthalpy change."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ΔH পথ নির্বিশেষে একই থাকে।"
                    : "ΔH remains the same regardless of path."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রক্রিয়া" : "Process"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "বিক্রিয়াকে ধাপে ভাগ করে ΔH যোগ করুন।"
                  : "Divide reaction into steps and sum ΔH."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "ধাপ বিভাজন" : "Step Division"}</strong>: 
                  {lang === "bn" ? "মধ্যবর্তী বিক্রিয়া।" : "Intermediate reactions."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "যোগ" : "Summation"}</strong>: 
                  {lang === "bn" ? "ΔH মোট।" : "Total ΔH."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ হেসের সূত্র বোঝায়।"
                  : "Practical examples illustrate Hess's Law."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "CO₂ গঠন" : "CO₂ Formation"}</p>
                  <p className="text-sm">{lang === "bn" ? "C → CO₂।" : "C → CO₂."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ধাপে গঠন" : "Stepwise"}</p>
                  <p className="text-sm">{lang === "bn" ? "C → CO → CO₂।" : "C → CO → CO₂."}</p>
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
                  <li>• {lang === "bn" ? "শক্তি গণনা" : "Energy calculation"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "বিক্রিয়া বিশ্লেষণ" : "Reaction analysis"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "শিক্ষা" : "Education"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "শক্তি সংরক্ষণ" : "Energy conservation"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ধাপ চিহ্নিত করুন।" : "Identify steps."}</li>
                <li>• {lang === "bn" ? "ΔH সঠিকভাবে যোগ করুন।" : "Sum ΔH correctly."}</li>
                <li>• {lang === "bn" ? "টেবিল ব্যবহার করুন।" : "Use formation tables."}</li>
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
