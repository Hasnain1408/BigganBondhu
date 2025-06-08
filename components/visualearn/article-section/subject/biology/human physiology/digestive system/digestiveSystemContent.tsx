"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function DigestiveSystemContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পাচনতন্ত্র খাদ্য ভেঙে পুষ্টি শোষণ করে।
অঙ্গ:
- মুখ
- পাকস্থলী
- অন্ত্র
প্রক্রিয়া:
- হজম
- শোষণ
- নিষ্কাশন
পুষ্টি:
- কার্বোহাইড্রেট
- প্রোটিন
- চর্বি`
      : `The digestive system breaks down food to absorb nutrients.
Organs:
- Mouth
- Stomach
- Intestines
Processes:
- Digestion
- Absorption
- Excretion
Nutrients:
- Carbohydrates
- Proteins
- Fats`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পাচনতন্ত্র" : "Digestive System"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পাচনতন্ত্র খাদ্যকে ছোট অণুতে ভেঙে শরীরের জন্য পুষ্টি শোষণ করে এবং বর্জ্য নিষ্কাশন করে।"
                  : "The digestive system breaks food into smaller molecules, absorbs nutrients for the body, and eliminates waste."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "পাচনতন্ত্র খাদ্য থেকে শক্তি এবং পুষ্টি সরবরাহ করে, শরীরের বৃদ্ধি এবং কার্যকারিতা বজায় রাখে।"
                    : "The digestive system provides energy and nutrients from food, supporting body growth and function."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পাচনতন্ত্রের অঙ্গ" : "Organs of the Digestive System"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "মুখ" : "Mouth"}</p>
                  <p className="text-sm">{lang === "bn" ? "চিবানো, এনজাইম।" : "Chewing, enzymes."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পাকস্থলী" : "Stomach"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিন হজম।" : "Protein digestion."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অন্ত্র" : "Intestines"}</p>
                  <p className="text-sm">{lang === "bn" ? "শোষণ, বর্জ্য।" : "Absorption, waste."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পাচন প্রক্রিয়া" : "Digestive Processes"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "হজম" : "Digestion"}</p>
                  <p className="text-sm">{lang === "bn" ? "খাদ্য ভাঙা।" : "Breaking down food."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "শোষণ" : "Absorption"}</p>
                  <p className="text-sm">{lang === "bn" ? "পুষ্টি গ্রহণ।" : "Nutrient uptake."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নিষ্কাশন" : "Excretion"}</p>
                  <p className="text-sm">{lang === "bn" ? "বর্জ্য অপসারণ।" : "Waste removal."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পুষ্টি" : "Nutrients"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "কার্বোহাইড্রেট" : "Carbohydrates"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি সরবরাহ।" : "Energy supply."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রোটিন" : "Proteins"}</p>
                  <p className="text-sm">{lang === "bn" ? "গঠন, মেরামত।" : "Structure, repair."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "চর্বি" : "Fats"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি সঞ্চয়।" : "Energy storage."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "স্বাস্থ্য" : "Health"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "পুষ্টি ব্যবস্থাপনা" : "Nutrition management"}</li>
                  <li>• {lang === "bn" ? "পাচন রোগ চিকিৎসা" : "Digestive disease treatment"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "প্রোবায়োটিক" : "Probiotics"}</li>
                  <li>• {lang === "bn" ? "মাইক্রোবায়োম" : "Microbiome"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "মুখে হজম শুরু হয়।" : "Digestion starts in the mouth."}</li>
                <li>• {lang === "bn" ? "পাকস্থলী অ্যাসিড নিঃসরণ করে।" : "Stomach secretes acid."}</li>
                <li>• {lang === "bn" ? "ছোট অন্ত্র পুষ্টি শোষণ করে।" : "Small intestine absorbs nutrients."}</li>
                <li>• {lang === "bn" ? "বড় অন্ত্র বর্জ্য তৈরি করে।" : "Large intestine forms waste."}</li>
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