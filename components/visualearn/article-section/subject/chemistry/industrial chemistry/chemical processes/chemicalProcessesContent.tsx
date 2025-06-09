
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ChemicalProcessesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `রাসায়নিক প্রক্রিয়া কাঁচামালকে রাসায়নিক বিক্রিয়ার মাধ্যমে পণ্যে রূপান্তর করে।
মূল ধারণা:
- বিক্রিয়া: রাসায়নিক বন্ধন ভাঙা এবং গঠন।
- দক্ষতা: উৎপাদ এবং শক্তি ব্যবহার অপ্টিমাইজেশন।
প্রকার:
- শিল্প: যেমন, অ্যামোনিয়া সংশ্লেষণ।
- প্রাকৃতিক: যেন, ফটোসিন্থেসিস।
মূল উপাদান:
- প্রতিক্রিয়ক: প্রারম্ভিক পদার্থ।
- পণ্য: চূড়ান্ত পদার্থ।
- শর্ত: তাপমাত্রা, চাপ।
উদাহরণ:
- হাবের-বোশ প্রক্রিয়া: N₂ + H₂ → NH₃।
- পেট্রোলিয়াম শোধন: অপরিশোধিত তেল থেকে জ্বালানি।
প্রয়োগ:
- শিল্প: রাসায়নিক উৎপাদন।
- কৃষি: সার উৎপাদন।
- পরিবেশ: বর্জ্য হ্রাস।
টিপস:
- বিক্রিয়ার শর্ত বুঝুন।
- দক্ষতা বিশ্লেষণ করুন।
- পরিবেশের প্রভাব মূল্যায়ন করুন।`
      : `Chemical processes transform raw materials into products through chemical reactions.
Key Concepts:
- Reactions: Breaking and forming chemical bonds.
- Efficiency: Optimizing yield and energy use.
Types:
- Industrial: E.g., ammonia synthesis.
- Natural: E.g., photosynthesis.
Key Components:
- Reactants: Starting materials.
- Products: Final substances.
- Conditions: Temperature, pressure.
Examples:
- Haber-Bosch Process: N₂ + H₂ → NH₃.
- Petroleum Refining: Crude oil to fuels.
Applications:
- Industry: Chemical production.
- Agriculture: Fertilizer production.
- Environment: Waste reduction.
Tips:
- Understand reaction conditions.
- Analyze efficiency.
- Evaluate environmental impact.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "রাসায়নিক প্রক্রিয়া" : "Chemical Processes"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "রাসায়নিক প্রক্রিয়া কাঁচামালকে পণ্যে রূপান্তর করে।"
                  : "Chemical processes transform raw materials into products."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "বিক্রিয়া বন্ধন ভাঙা এবং গঠনের মাধ্যমে কাজ করে।"
                    : "Reactions involve breaking and forming bonds."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "প্রক্রিয়া শিল্প বা প্রাকৃতিক হতে পারে।"
                  : "Processes can be industrial or natural."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "শিল্প" : "Industrial"}</strong>: 
                  {lang === "bn" ? "অ্যামোনিয়া উৎপাদন।" : "Ammonia production."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "প্রাকৃতিক" : "Natural"}</strong>: 
                  {lang === "bn" ? "ফটোসিন্থেসিস।" : "Photosynthesis."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ প্রক্রিয়া বোঝায়।"
                  : "Practical examples illustrate processes."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "হাবের-বোশ" : "Haber-Bosch"}</p>
                  <p className="text-sm">{lang === "bn" ? "অ্যামোনিয়া উৎপাদন।" : "Ammonia production."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পেট্রোলিয়াম শোধন" : "Petroleum Refining"}</p>
                  <p className="text-sm">{lang === "bn" ? "জ্বালানি উৎপাদন।" : "Fuel production."}</p>
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
                  <li>• {lang === "bn" ? "রাসায়নিক উৎপাদন" : "Chemical production"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "সার উৎপাদন" : "Fertilizer production"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "বর্জ্য হ্রাস" : "Waste reduction"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "শর্ত বুঝুন।" : "Understand conditions."}</li>
                <li>• {lang === "bn" ? "দক্ষতা বিশ্লেষণ।" : "Analyze efficiency."}</li>
                <li>• {lang === "bn" ? "প্রভাব মূল্যায়ন।" : "Evaluate impact."}</li>
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
