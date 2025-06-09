
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function EnthalpyContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `এনথালপি ধ্রুব চাপে একটি সিস্টেমের তাপ শক্তি পরিমাপ করে।
মূল ধারণা:
- এনথালপি (H): H = U + PV, যেখানে U হল অভ্যন্তরীণ শক্তি, P চাপ, V আয়তন।
- এনথালপি পরিবর্তন (ΔH): বিক্রিয়ায় তাপ শোষণ বা নির্গমন।
প্রকার:
- এক্সোথার্মিক: ΔH নেগেটিভ, তাপ নির্গত হয়।
- এন্ডোথার্মিক: ΔH পজিটিভ, তাপ শোষিত হয়।
মূল পরিমাণ:
- গঠনের এনথালপি: ১ মোল যৌগ গঠনে শক্তি পরিবর্তন।
- বন্ধন শক্তি: বন্ধন ভাঙা বা গঠনে শক্তি।
উদাহরণ:
- দহন: মিথেন দহনে ΔH নেগেটিভ।
- ফটোসিন্থেসিস: ΔH পজিটিভ।
প্রয়োগ:
- শিল্প: জ্বালানি বিক্রিয়া ডিজাইন।
- গবেষণা: বিক্রিয়ার শক্তি বিশ্লেষণ।
- পরিবেশ: শক্তি দক্ষতা।
টিপস:
- ΔH চিহ্ন বুঝুন।
- গঠনের এনথালপি টেবিল ব্যবহার করুন।
- বন্ধন শক্তি গণনা শিখুন।`
      : `Enthalpy measures the heat content of a system at constant pressure.
Key Concepts:
- Enthalpy (H): H = U + PV, where U is internal energy, P is pressure, V is volume.
- Enthalpy Change (ΔH): Heat absorbed or released in a reaction.
Types:
- Exothermic: ΔH negative, heat released.
- Endothermic: ΔH positive, heat absorbed.
Key Quantities:
- Enthalpy of Formation: Energy change to form 1 mole of a compound.
- Bond Energy: Energy to break or form bonds.
Examples:
- Combustion: Methane combustion has negative ΔH.
- Photosynthesis: Positive ΔH.
Applications:
- Industry: Designing fuel reactions.
- Research: Analyzing reaction energies.
- Environment: Energy efficiency.
Tips:
- Understand ΔH signs.
- Use enthalpy of formation tables.
- Learn bond energy calculations.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "এনথালপি" : "Enthalpy"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "এনথালপি তাপ শক্তি পরিমাপ করে।"
                  : "Enthalpy measures heat content."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "এনথালপি অভ্যন্তরীণ শক্তির সাথে সম্পর্কিত।"
                    : "Enthalpy relates to internal energy."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "এনথালপি পরিবর্তন এক্সোথার্মিক বা এন্ডোথার্মিক হতে পারে।"
                  : "Enthalpy changes can be exothermic or endothermic."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "এক্সোথার্মিক" : "Exothermic"}</strong>: 
                  {lang === "bn" ? "তাপ নির্গত।" : "Releases heat."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "এন্ডোথার্মিক" : "Endothermic"}</strong>: 
                  {lang === "bn" ? "তাপ শোষিত।" : "Absorbs heat."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ এনথালপি বোঝায়।"
                  : "Practical examples illustrate enthalpy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "দহন" : "Combustion"}</p>
                  <p className="text-sm">{lang === "bn" ? "মিথেন দহন।" : "Methane combustion."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ফটোসিন্থেসিস" : "Photosynthesis"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি শোষণ।" : "Energy absorption."}</p>
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
                  <li>• {lang === "bn" ? "জ্বালানি ডিজাইন" : "Fuel design"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "শক্তি বিশ্লেষণ" : "Energy analysis"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "দক্ষতা" : "Efficiency"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ΔH চিহ্ন বুঝুন।" : "Understand ΔH signs."}</li>
                <li>• {lang === "bn" ? "টেবিল ব্যবহার করুন।" : "Use formation tables."}</li>
                <li>• {lang === "bn" ? "বন্ধন শক্তি গণনা।" : "Calculate bond energies."}</li>
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
