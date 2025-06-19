
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function EnergyConservationContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `শক্তি সংরক্ষণ মোট শক্তির স্থিরতা বর্ণনা করে।
মূল ধারণা:
- সূত্র: KE + PE = স্থির।
- শক্তি: গতিশক্তি, বিভব শক্তি।
- একক: জুল (J)।
ধারণা:
- রূপান্তর: শক্তির রূপ পরিবর্তন।
- ব্যবস্থা: বিচ্ছিন্ন।
- সংরক্ষণ: মোট শক্তি অপরিবর্তিত।
বৈশিষ্ট্য:
- শক্তি: সৃষ্টি বা ধ্বংস হয় না।
উদাহরণ:
- দোলনা: গতি এবং উচ্চতা।
- রোলার কোস্টার: শক্তি রূপান্তর।
প্রয়োগ:
- প্রকৌশল: শক্তি দক্ষতা।
- পরিবেশ: পুনর্নবীকরণযোগ্য শক্তি।
- বিজ্ঞান: শক্তি বিশ্লেষণ।
টিপস:
- শক্তি প্রকার জানুন।
- সূত্র ব্যবহার করুন।
- সমস্যা সমাধান করুন।`
      : `Energy Conservation describes the constancy of total energy.
Key Concepts:
- Formula: KE + PE = constant.
- Energy: Kinetic, potential.
- Unit: Joule (J).
Assumptions:
- Transformation: Energy changes form.
- System: Isolated.
- Conservation: Total energy unchanged.
Properties:
- Energy: Neither created nor destroyed.
Examples:
- Pendulum: Motion and height.
- Roller coaster: Energy transformation.
Applications:
- Engineering: Energy efficiency.
- Environment: Renewable energy.
- Science: Energy analysis.
Tips:
- Know energy types.
- Use formula.
- Solve problems.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "শক্তি সংরক্ষণ" : "Energy Conservation"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "মোট শক্তির স্থিরতা।"
                  : "Constancy of total energy."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "শক্তির রূপান্তর এবং সংরক্ষণ।"
                    : "Energy transformation and conservation."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "শক্তি সংরক্ষণের ভিত্তি।"
                  : "Basis of energy conservation."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "রূপান্তর" : "Transformation"}</strong>: 
                  {lang === "bn" ? "শক্তির রূপ পরিবর্তন।" : "Energy changes form."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ব্যবস্থা" : "System"}</strong>: 
                  {lang === "bn" ? "বিচ্ছিন্ন।" : "Isolated."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "শক্তি সংরক্ষণের উদাহরণ।"
                  : "Examples of energy conservation."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "দোলনা" : "Pendulum"}</p>
                  <p className="text-sm">{lang === "bn" ? "গতি এবং উচ্চতা।" : "Motion and height."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রোলার কোস্টার" : "Roller coaster"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি রূপান্তর।" : "Energy transformation."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "শক্তি দক্ষতা" : "Energy efficiency"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "পুনর্নবীকরণযোগ্য শক্তি" : "Renewable energy"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "শক্তি বিশ্লেষণ" : "Energy analysis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "শক্তি প্রকার জানুন।" : "Know energy types."}</li>
                <li>• {lang === "bn" ? "সূত্র ব্যবহার করুন।" : "Use formula."}</li>
                <li>• {lang === "bn" ? "সমস্যা সমাধান করুন।" : "Solve problems."}</li>
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
