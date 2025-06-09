
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ThermochemistryContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn" ?
      `তাপরসায়ন রাসায়নিক বিক্রিয়া এবং ভৌত প্রক্রিয়ায় তাপ পরিবর্তন অধ্যয়ন করে।
মূল ধারণা:
- তাপ: অণুগুলির গতিশক্তির পরিমাণ।
- এক্সোথার্মিক: তাপ নির্গত হয়।
- এন্ডোথার্মিক: তাপ শোষিত হয়।
মূল পরিমাণ:
- নির্দিষ্ট তাপ ধারণক্ষমতা: ১ গ্রাম পদার্থের তাপমাত্রা ১°C বাড়াতে প্রয়োজনীয় তাপ।
- বিক্রিয়ার তাপ: বিক্রিয়ায় তাপ পরিবর্তন।
উদাহরণ:
- দহন: মিথেন দহনে তাপ নির্গত হয়।
- বাষ্পীভবন: জলের বাষ্পীভবনে তাপ শোষিত হয়।
প্রয়োগ:
- শিল্প: জ্বালানি দক্ষতা।
- পরিবেশ: গ্রিনহাউস গ্যাস নিয়ন্ত্রণ।
- দৈনন্দিন: রান্না, গরম করা।
টিপস:
- তাপ প্রবাহ বুঝুন।
- এক্সোথার্মিক বনাম এন্ডোথার্মিক চিহ্নিত করুন।
- তাপ ধারণক্ষমতা গণনা করুন।`
      : `Thermochemistry studies heat changes in chemical reactions and physical processes.
Key Concepts:
- Heat: Energy related to molecular motion.
- Exothermic: Heat is released.
- Endothermic: Heat is absorbed.
Key Quantities:
- Specific Heat Capacity: Heat required to raise 1g of a substance by 1°C.
- Heat of Reaction: Heat change during a reaction.
Examples:
- Combustion: Methane combustion releases heat.
- Evaporation: Water evaporation absorbs heat.
Applications:
- Industry: Fuel efficiency.
- Environment: Greenhouse gas control.
- Daily Life: Cooking, heating.
Tips:
- Understand heat flow.
- Identify exothermic vs. endothermic.
- Calculate heat capacity.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "তাপরসায়ন" : "Thermochemistry"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "তাপরসায়ন তাপ পরিবর্তন অধ্যয়ন করে।"
                  : "Thermochemistry studies heat changes."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "তাপ অণুর গতিশক্তির সাথে সম্পর্কিত।"
                    : "Heat relates to molecular motion."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "বিক্রিয়া এক্সোথার্মিক বা এন্ডোথার্মিক হতে পারে।"
                  : "Reactions can be exothermic or endothermic."}
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
                  ? "ব্যবহারিক উদাহরণ তাপরসায়ন বোঝায়।"
                  : "Practical examples illustrate thermochemistry."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "দহন" : "Combustion"}</p>
                  <p className="text-sm">{lang === "bn" ? "মিথেন দহন।" : "Methane combustion."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "বাষ্পীভবন" : "Evaporation"}</p>
                  <p className="text-sm">{lang === "bn" ? "জলের বাষ্পীভবন।" : "Water evaporation."}</p>
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
                  <li>• {lang === "bn" ? "জ্বালানি দক্ষতা" : "Fuel efficiency"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্রিনহাউস নিয়ন্ত্রণ" : "Greenhouse control"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "দৈনন্দিন" : "Daily Life"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "রান্না" : "Cooking"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "তাপ প্রবাহ বুঝুন।" : "Understand heat flow."}</li>
                <li>• {lang === "bn" ? "প্রকার চিহ্নিত করুন।" : "Identify reaction types."}</li>
                <li>• {lang === "bn" ? "গণনা করুন।" : "Calculate heat."}</li>
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