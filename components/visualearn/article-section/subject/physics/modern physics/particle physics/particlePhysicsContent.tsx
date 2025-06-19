
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ParticlePhysicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কণা পদার্থবিজ্ঞান মৌলিক কণা এবং বল অধ্যয়ন করে যা পদার্থ এবং মিথস্ক্রিয়া গঠন করে, স্ট্যান্ডার্ড মডেল দ্বারা বর্ণিত।
মূল ধারণা:
- স্ট্যান্ডার্ড মডেল
- কোয়ার্ক এবং লেপটন
- বোসন
- চারটি মৌলিক বল
- হিগস বোসন`
      : `Particle Physics studies the fundamental particles and forces that constitute matter and interactions, described by the Standard Model.
Key Concepts:
- Standard Model
- Quarks and leptons
- Bosons
- Four fundamental forces
- Higgs boson`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কণা পদার্থবিজ্ঞান" : "Particle Physics"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কণা পদার্থবিজ্ঞান প্রকৃতির মৌলিক উপাদান এবং তাদের মিথস্ক্রিয়া বোঝার চেষ্টা করে।"
                  : "Particle physics seeks to understand the fundamental building blocks of nature and their interactions."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "স্ট্যান্ডার্ড মডেল কণা এবং বলের একটি তত্ত্ব যা পরীক্ষামূলকভাবে যাচাই করা হয়েছে।"
                    : "The Standard Model is a theory of particles and forces, experimentally verified."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "স্ট্যান্ডার্ড মডেল" : "Standard Model"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পদার্থের কণা (কোয়ার্ক, লেপটন) এবং বল বাহক (বোসন) বর্ণনা করে।"
                  : "Describes matter particles (quarks, leptons) and force carriers (bosons)."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "উপাদান:" : "Components:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "১৭টি মৌলিক কণা" : "17 fundamental particles"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোয়ার্ক এবং লেপটন" : "Quarks and Leptons"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "কোয়ার্ক প্রোটন ও নিউট্রন গঠন করে; লেপটনের মধ্যে ইলেকট্রন রয়েছে।"
                  : "Quarks form protons and neutrons; leptons include electrons."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "প্রকার:" : "Types:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "৬টি কোয়ার্ক, ৬টি লেপটন" : "6 quarks, 6 leptons"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বোসন" : "Bosons"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "বল বাহক কণা, যেমন ফোটন এবং গ্লুয়ন।"
                  : "Force carrier particles, such as photons and gluons."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "উদাহরণ:" : "Example:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "হিগস বোসন ভর প্রদান করে" : "Higgs boson gives mass"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "চারটি মৌলিক বল" : "Four Fundamental Forces"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "মহাকর্ষ, তড়িৎচুম্বকীয়, শক্তিশালী ও দুর্বল নিউক্লিয়ার বল।"
                  : "Gravity, electromagnetic, strong and weak nuclear forces."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বাহক:" : "Carrier:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "ফোটন (তড়িৎচুম্বকীয়)" : "Photon (electromagnetic)"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "স্ট্যান্ডার্ড মডেল মহাকর্ষ ব্যাখ্যা করে না।" : "Standard Model does not include gravity."}</li>
                <li>• {lang === "bn" ? "হিগস বোসন ২০১২ সালে আবিষ্কৃত।" : "Higgs boson discovered in 2012."}</li>
                <li>• {lang === "bn" ? "কণা ত্বরক পরীক্ষায় ব্যবহৃত হয়।" : "Particle accelerators are used in experiments."}</li>
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
