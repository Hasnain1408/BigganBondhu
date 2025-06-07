"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ImmuneSystemContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ইমিউন সিস্টেম হল শরীরের প্রতিরক্ষা ব্যবস্থা।
প্রকার:
- সহজাত ইমিউনিটি
- অভিযোজিত ইমিউনিটি
উপাদান:
- শ্বেত রক্তকণিকা
- অ্যান্টিবডি
- লিম্ফ নোড
প্রক্রিয়া:
- প্যাথোজেন সনাক্তকরণ
- রোগ প্রতিরোধ
- মেমরি কোষ`
      : `The immune system is the body’s defense mechanism.
Types:
- Innate Immunity
- Adaptive Immunity
Components:
- White Blood Cells
- Antibodies
- Lymph Nodes
Processes:
- Pathogen Detection
- Disease Resistance
- Memory Cells`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ইমিউন সিস্টেম" : "Immune System"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ইমিউন সিস্টেম শরীরকে সংক্রমণ এবং রোগ থেকে রক্ষা করে। এটি বিভিন্ন উপাদান এবং প্রক্রিয়ার মাধ্যমে প্যাথোজেনের বিরুদ্ধে কাজ করে।"
                  : "The immune system protects the body from infections and diseases through various components and processes that combat pathogens."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ইমিউন সিস্টেম প্যাথোজেন সনাক্ত করে এবং ধ্বংস করে, শরীরের ভারসাম্য বজায় রাখে এবং ভবিষ্যতের সংক্রমণের বিরুদ্ধে মেমরি তৈরি করে।"
                    : "The immune system identifies and destroys pathogens, maintains bodily balance, and builds memory against future infections."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইমিউনিটির প্রকার" : "Types of Immunity"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সহজাত ইমিউনিটি" : "Innate Immunity"}</p>
                  <p className="text-sm">{lang === "bn" ? "জন্মগত, দ্রুত প্রতিক্রিয়া।" : "Inborn, rapid response."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অভিযোজিত ইমিউনিটি" : "Adaptive Immunity"}</p>
                  <p className="text-sm">{lang === "bn" ? "নির্দিষ্ট, মেমরি তৈরি করে।" : "Specific, builds memory."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইমিউন সিস্টেমের উপাদান" : "Components of the Immune System"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "শ্বেত রক্তকণিকা" : "White Blood Cells"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্যাথোজেন ধ্বংস করে।" : "Destroys pathogens."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অ্যান্টিবডি" : "Antibodies"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্যাথোজেনকে নিষ্ক্রিয় করে।" : "Neutralizes pathogens."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "লিম্ফ নোড" : "Lymph Nodes"}</p>
                  <p className="text-sm">{lang === "bn" ? "ইমিউন প্রতিক্রিয়ার কেন্দ্র।" : "Hubs for immune response."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইমিউন প্রক্রিয়া" : "Immune Processes"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্যাথোজেন সনাক্তকরণ" : "Pathogen Detection"}</p>
                  <p className="text-sm">{lang === "bn" ? "বিদেশী অণু চিহ্নিত করে।" : "Identifies foreign molecules."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রোগ প্রতিরোধ" : "Disease Resistance"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্যাথোজেন ধ্বংস বা নিষ্ক্রিয়।" : "Destroys or neutralizes pathogens."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "মেমরি কোষ" : "Memory Cells"}</p>
                  <p className="text-sm">{lang === "bn" ? "দ্রুত ভবিষ্যৎ প্রতিক্রিয়া।" : "Faster future responses."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "ভ্যাকসিন" : "Vaccines"}</li>
                  <li>• {lang === "bn" ? "ইমিউনোথেরাপি" : "Immunotherapy"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "অটোইমিউন রোগ" : "Autoimmune diseases"}</li>
                  <li>• {lang === "bn" ? "অ্যালার্জি" : "Allergies"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সহজাত ইমিউনিটি তাৎক্ষণিক কাজ করে।" : "Innate immunity acts immediately."}</li>
                <li>• {lang === "bn" ? "অভিযোজিত ইমিউনিটি নির্দিষ্ট এবং স্মৃতিশক্তি রাখে।" : "Adaptive immunity is specific and retains memory."}</li>
                <li>• {lang === "bn" ? "অ্যান্টিবডি প্যাথোজেনকে লক্ষ্য করে।" : "Antibodies target specific pathogens."}</li>
                <li>• {lang === "bn" ? "ভ্যাকসিন মেমরি কোষ তৈরি করে।" : "Vaccines create memory cells."}</li>
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