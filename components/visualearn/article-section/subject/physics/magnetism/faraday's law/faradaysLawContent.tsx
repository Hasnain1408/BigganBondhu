
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function FaradaysLawContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ফ্যারাডের সূত্র চৌম্বক প্রবাহের পরিবর্তনের মাধ্যমে তড়িৎচালক শক্তি বর্ণনা করে।
মূল ধারণা:
- সমীকরণ: ε = -dΦ_B/dt।
- ফ্লাক্স: Φ_B = BA cosθ।
- লেন্জের সূত্র: প্রতিরোধী প্রবাহ।
ধারণা:
- পরিবর্তন: চৌম্বক ক্ষেত্র বা কুণ্ডলী।
- তড়িৎ: সৃষ্ট প্রবাহ।
- দিক: ডান হাতের নিয়ম।
বৈশিষ্ট্য:
- EMF: ভোল্টে পরিমাপ।
উদাহরণ:
- জেনারেটর: ঘূর্ণন।
- ট্রান্সফরমার: প্রবাহ।
প্রয়োগ:
- বিদ্যুৎ: জেনারেটর।
- প্রযুক্তি: ট্রান্সফরমার।
- বিজ্ঞান: পরীক্ষণ।
টিপস:
- সূত্র মনে রাখুন।
- ফ্লাক্স বুঝুন।
- লেন্জের সূত্র প্রয়োগ করুন।`
      : `Faraday's Law describes electromotive force induced by changing magnetic flux.
Key Concepts:
- Equation: ε = -dΦ_B/dt.
- Flux: Φ_B = BA cosθ.
- Lenz’s Law: Opposing current.
Assumptions:
- Change: Magnetic field or coil.
- Electricity: Induced current.
- Direction: Right-hand rule.
Properties:
- EMF: Measured in volts.
Examples:
- Generator: Rotation.
- Transformer: Current.
Applications:
- Power: Generators.
- Technology: Transformers.
- Science: Experiments.
Tips:
- Memorize equations.
- Understand flux.
- Apply Lenz’s Law.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ফ্যারাডের সূত্র" : "Faraday's Law"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "তড়িৎচালক শক্তির সৃষ্টি।"
                  : "Induction of electromotive force."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "চৌম্বক প্রবাহের পরিবর্তন।"
                    : "Change in magnetic flux."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধারণা" : "Assumptions"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "ফ্যারাডের সূত্রের ভিত্তি।"
                  : "Basis of Faraday's Law."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "পরিবর্তন" : "Change"}</strong>: 
                  {lang === "bn" ? "চৌম্বক ক্ষেত্র।" : "Magnetic field."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "দিক" : "Direction"}</strong>: 
                  {lang === "bn" ? "ডান হাতের নিয়ম।" : "Right-hand rule."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ফ্যারাডের সূত্রের উদাহরণ।"
                  : "Examples of Faraday's Law."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "জেনারেটর" : "Generator"}</p>
                  <p className="text-sm">{lang === "bn" ? "ঘূর্ণন।" : "Rotation."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ট্রান্সফরমার" : "Transformer"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রবাহ।" : "Current."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "বিদ্যুৎ" : "Power"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জেনারেটর" : "Generators"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "ট্রান্সফরমার" : "Transformers"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিজ্ঞান" : "Science"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "পরীক্ষণ" : "Experiments"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সূত্র মনে রাখুন।" : "Memorize equations."}</li>
                <li>• {lang === "bn" ? "ফ্লাক্স বুঝুন।" : "Understand flux."}</li>
                <li>• {lang === "bn" ? "লেন্জের সূত্র।" : "Apply Lenz’s Law."}</li>
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
