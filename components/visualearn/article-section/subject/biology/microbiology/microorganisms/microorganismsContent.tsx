"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function MicroorganismsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `জীবাণু হল ক্ষুদ্র জীব যা এককোষী বা বহুকোষী হতে পারে।
প্রকার:
- ব্যাকটেরিয়া
- ভাইরাস
- ছত্রাক
- প্রোটোজোয়া
- শৈবাল
গুরুত্ব:
- পরিবেশ
- ঔষধ
- শিল্প
ক্ষতিকর প্রভাব:
- রোগ
- খাদ্য নষ্ট`
      : `Microorganisms are tiny organisms, which may be single-celled or multicellular.
Types:
- Bacteria
- Viruses
- Fungi
- Protozoa
- Algae
Importance:
- Environment
- Medicine
- Industry
Harmful Effects:
- Diseases
- Food spoilage`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "জীবাণু" : "Microorganisms"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "জীবাণু হল অণুবীক্ষণিক জীব যা খালি চোখে দেখা যায় না। এরা পরিবেশ, ঔষধ এবং শিল্পে গুরুত্বপূর্ণ ভূমিকা পালন করে, তবে কিছু জীবাণু রোগ এবং ক্ষতির কারণ হতে পারে।"
                  : "Microorganisms are microscopic organisms invisible to the naked eye. They play crucial roles in the environment, medicine, and industry, but some can cause diseases and harm."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জীবাণু বিভিন্ন রূপে পাওয়া যায় এবং জীবজগতের ভারসাম্য বজায় রাখতে অবদান রাখে। এদের কিছু উপকারী, যেমন খাদ্য উৎপাদনে, আবার কিছু ক্ষতিকর, যেমন সংক্রমণের কারণ।"
                    : "Microorganisms exist in various forms and contribute to ecological balance. Some are beneficial, such as in food production, while others are harmful, causing infections."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জীবাণুর প্রকার" : "Types of Microorganisms"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ব্যাকটেরিয়া" : "Bacteria"}</p>
                  <p className="text-sm">{lang === "bn" ? "এককোষী, প্রোক্যারিওটিক, উপকারী বা ক্ষতিকর।" : "Single-celled, prokaryotic, beneficial or harmful."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ভাইরাস" : "Viruses"}</p>
                  <p className="text-sm">{lang === "bn" ? "অ-জীবন্ত, কোষে সংক্রমণ ঘটায়।" : "Non-living, infects host cells."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ছত্রাক" : "Fungi"}</p>
                  <p className="text-sm">{lang === "bn" ? "ইউক্যারিওটিক, পচনকারী বা প্যাথোজেন।" : "Eukaryotic, decomposers or pathogens."}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রোটোজোয়া" : "Protozoa"}</p>
                  <p className="text-sm">{lang === "bn" ? "এককোষী, ইউক্যারিওটিক, প্রায়শই মোটাইল।" : "Single-celled, eukaryotic, often motile."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "শৈবাল" : "Algae"}</p>
                  <p className="text-sm">{lang === "bn" ? "আলোকসংশ্লেষী, পরিবেশে অক্সিজেন উৎপাদন করে।" : "Photosynthetic, produce oxygen in ecosystems."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জীবাণুর গুরুত্ব" : "Importance of Microorganisms"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পরিবেশ" : "Environment"}</p>
                  <p className="text-sm">{lang === "bn" ? "পচন, পুষ্টি চক্র।" : "Decomposition, nutrient cycling."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ঔষধ" : "Medicine"}</p>
                  <p className="text-sm">{lang === "bn" ? "অ্যান্টিবায়োটিক, ভ্যাকসিন উৎপাদন।" : "Antibiotic, vaccine production."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "শিল্প" : "Industry"}</p>
                  <p className="text-sm">{lang === "bn" ? "খাদ্য উৎপাদন, বায়োটেক।" : "Food production, biotech."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ক্ষতিকর প্রভাব" : "Harmful Effects"}
            </h4>
            
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-3">
              <p className="text-red-700 dark:text-red-300">
                {lang === "bn"
                  ? "কিছু জীবাণু রোগ সৃষ্টি করে এবং খাদ্য নষ্ট করে।"
                  : "Some microorganisms cause diseases and spoil food."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "রোগ" : "Diseases"}</p>
                  <p className="text-sm">{lang === "bn" ? "যেমন, নিউমোনিয়া, টিবি।" : "E.g., pneumonia, tuberculosis."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "খাদ্য নষ্ট" : "Food Spoilage"}</p>
                  <p className="text-sm">{lang === "bn" ? "ছত্রাক, ব্যাকটেরিয়া দ্বারা।" : "Caused by fungi, bacteria."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "মাটির উর্বরতা বৃদ্ধি" : "Soil fertility enhancement"}</li>
                  <li>• {lang === "bn" ? "জৈব সার" : "Biofertilizers"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "অ্যান্টিবায়োটিক উৎপাদন" : "Antibiotic production"}</li>
                  <li>• {lang === "bn" ? "প্রোবায়োটিক" : "Probiotics"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "জীবাণু অণুবীক্ষণে দৃশ্যমান।" : "Microorganisms are visible under a microscope."}</li>
                <li>• {lang === "bn" ? "ভাইরাস জীবন্ত কোষের বাইরে সক্রিয় নয়।" : "Viruses are not active outside living cells."}</li>
                <li>• {lang === "bn" ? "ব্যাকটেরিয়া উপকারী এবং ক্ষতিকর উভয়ই হতে পারে।" : "Bacteria can be both beneficial and harmful."}</li>
                <li>• {lang === "bn" ? "জীবাণু পরিবেশের ভারসাম্য রক্ষা করে।" : "Microorganisms maintain ecological balance."}</li>
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