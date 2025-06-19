"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function RelativityParadoxesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `আপেক্ষিকতার প্যারাডক্সগুলি আপেক্ষিকতায় আপাত বিরোধিতা পরীক্ষা করে, যেমন যমজ প্যারাডক্স এবং মই প্যারাডক্স, যা আপেক্ষিকতার নীতি দ্বারা সমাধান হয়।
মূল ধারণা:
- যমজ প্যারাডক্স
- মই প্যারাডক্স
- পোল-বার্ন প্যারাডক্স
- সমকালীনতার আপেক্ষিকতা
- অ-ইনার্শিয়াল ফ্রেম`
      : `Relativity Paradoxes examines apparent contradictions in relativity, like the twin paradox and ladder paradox, resolved by relativistic principles.
Key Concepts:
- Twin paradox
- Ladder paradox
- Pole-barn paradox
- Relativity of simultaneity
- Non-inertial frames`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আপেক্ষিকতার প্যারাডক্স" : "Relativity Paradoxes"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "আপেক্ষিকতার প্যারাডক্সগুলি বিশেষ এবং সাধারণ আপেক্ষিকতার প্রত্যক্ষ বিরোধিতার মতো মনে হয়, কিন্তু সঠিক বিশ্লেষণে সমাধান হয়।"
                  : "Relativity paradoxes appear as contradictions in special and general relativity but are resolved with proper analysis."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "প্যারাডক্সগুলি সময়, স্থান এবং সমকালীনতার আপেক্ষিক প্রকৃতি থেকে উদ্ভূত হয়।"
                    : "Paradoxes arise from the relative nature of time, space, and simultaneity."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "যমজ প্যারাডক্স" : "Twin Paradox"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "একজন যমজ ভ্রমণকারী উচ্চ গতিতে ভ্রমণ করে এবং ফিরে এসে দেখে তার ভাইবোন বয়সে বড়।"
                  : "One twin travels at high speed and returns to find their sibling aged more."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "সমাধান:" : "Resolution:"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" 
                      ? "ভ্রমণকারী যমজ ত্বরণ অনুভব করে (অ-ইনার্শিয়াল ফ্রেম), যা অসমতা সৃষ্টি করে।" 
                      : "The traveling twin experiences acceleration (non-inertial frame), creating asymmetry."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মই/পোল-বার্ন প্যারাডক্স" : "Ladder/Pole-Barn Paradox"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "একটি দীর্ঘ মই একটি ছোট গোয়ালঘরে ফিট করে কিনা তা দেখার প্যারাডক্স।"
                  : "A paradox about whether a long ladder can fit in a shorter barn."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "সমাধান:" : "Resolution:"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" 
                      ? "সমকালীনতার আপেক্ষিকতা - বিভিন্ন ফ্রেমে ঘটনাগুলি একসাথে ঘটে না।" 
                      : "Relativity of simultaneity - events are not simultaneous in different frames."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সমকালীনতার আপেক্ষিকতা" : "Relativity of Simultaneity"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "দুটি ঘটনা যা একটি ফ্রেমে একসাথে ঘটে, অন্য ফ্রেমে ভিন্ন সময়ে ঘটতে পারে।"
                  : "Two events simultaneous in one frame may occur at different times in another frame."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সূত্র:" : "Formula:"}</p>
                  <p className="font-mono text-lg">Δt' = γ(vΔx/c²)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "v = আপেক্ষিক গতি, Δx = স্থানীয় পৃথকীকরণ" : "v = relative velocity, Δx = spatial separation"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অন্যান্য বিখ্যাত প্যারাডক্স" : "Other Famous Paradoxes"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "ঘড়ি প্যারাডক্স" : "Clock Paradox"}
                </h5>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  {lang === "bn" 
                    ? "পারস্পরিক সময় প্রসারণের আপাত বিরোধিতা।" 
                    : "Apparent contradiction in mutual time dilation."}
                </p>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "গ্যারেজ প্যারাডক্স" : "Garage Paradox"}
                </h5>
                <p className="text-sm text-pink-700 dark:text-pink-300">
                  {lang === "bn" 
                    ? "দৈর্ঘ্য সংকোচন এবং দরজা বন্ধ করার সময়।" 
                    : "Length contraction and timing of door closures."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্যারাডক্স সমাধানের নীতি" : "Principles for Resolving Paradoxes"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                  {lang === "bn" ? "সতর্ক বিশ্লেষণ" : "Careful Analysis"}
                </h5>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <li>• {lang === "bn" ? "সব ফ্রেম বিবেচনা" : "Consider all frames"}</li>
                  <li>• {lang === "bn" ? "ত্বরণ পরীক্ষা" : "Check for acceleration"}</li>
                </ul>
              </div>
              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "গাণিতিক যাচাই" : "Mathematical Verification"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "লরেন্টজ রূপান্তর" : "Lorentz transformations"}</li>
                  <li>• {lang === "bn" ? "স্পেসটাইম ডায়াগ্রাম" : "Spacetime diagrams"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্যারাডক্স আসলে বিরোধিতা নয়, ভুল বোঝাবুঝি।" : "Paradoxes are not contradictions, just misunderstandings."}</li>
                <li>• {lang === "bn" ? "সব রেফারেন্স ফ্রেম বিবেচনা করুন।" : "Consider all reference frames carefully."}</li>
                <li>• {lang === "bn" ? "অ-ইনার্শিয়াল ফ্রেম ভিন্নভাবে আচরণ করে।" : "Non-inertial frames behave differently."}</li>
                <li>• {lang === "bn" ? "স্পেসটাইম ডায়াগ্রাম সাহায্য করে।" : "Spacetime diagrams help visualization."}</li>
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