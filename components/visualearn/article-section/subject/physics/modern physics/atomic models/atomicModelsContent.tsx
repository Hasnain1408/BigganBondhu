
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function AtomicModelsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পরমাণু মডেল পরমাণুর গঠন সম্পর্কিত তত্ত্বের ঐতিহাসিক বিকাশ অন্বেষণ করে, ডাল্টনের মডেল থেকে কোয়ান্টাম যান্ত্রিক মডেল পর্যন্ত।
মূল ধারণা:
- ডাল্টনের পরমাণু তত্ত্ব
- থমসনের প্লাম পুডিং মডেল
- রাদারফোর্ডের নিউক্লিয়ার মডেল
- বোরের মডেল
- কোয়ান্টাম যান্ত্রিক মডেল`
      : `Atomic Models explores the historical development of atomic structure theories, from Dalton’s model to the quantum mechanical model.
Key Concepts:
- Dalton’s atomic theory
- Thomson’s plum pudding model
- Rutherford’s nuclear model
- Bohr’s model
- Quantum mechanical model`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পরমাণু মডেল" : "Atomic Models"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পরমাণু মডেলগুলি সময়ের সাথে পরমাণুর গঠন সম্পর্কে আমাদের বোঝার বিবর্তন দেখায়।"
                  : "Atomic models illustrate the evolution of our understanding of atomic structure over time."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "প্রতিটি মডেল পরমাণুর গঠন বোঝার জন্য নতুন পরীক্ষামূলক প্রমাণ প্রদান করে।"
                    : "Each model provided new experimental evidence to understand atomic structure."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডাল্টনের পরমাণু তত্ত্ব" : "Dalton’s Atomic Theory"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পরমাণু অবিভাজ্য এবং অবিনশ্বর কণা।"
                  : "Atoms are indivisible and indestructible particles."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "মূল বৈশিষ্ট্য:" : "Key Feature:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "রাসায়নিক বিক্রিয়ায় পরমাণু পুনর্বিন্যাস হয়।" : "Atoms rearrange in chemical reactions."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "থমসনের প্লাম পুডিং মডেল" : "Thomson’s Plum Pudding Model"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "ইলেকট্রন ঋণাত্মক চার্জযুক্ত কণা, ধনাত্মক মাধ্যমে ছড়িয়ে থাকে।"
                  : "Electrons are negatively charged particles embedded in a positive medium."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "আবিষ্কার:" : "Discovery:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "ইলেকট্রনের আবিষ্কার" : "Discovery of the electron"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "রাদারফোর্ডের নিউক্লিয়ার মডেল" : "Rutherford’s Nuclear Model"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "পরমাণুর কেন্দ্রে একটি ছোট, ঘন নিউক্লিয়াস, চারপাশে ইলেকট্রন ঘুরে।"
                  : "A small, dense nucleus at the center, with electrons orbiting around it."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রমাণ:" : "Evidence:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "গোল্ড ফয়েল পরীক্ষা" : "Gold foil experiment"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বোরের মডেল" : "Bohr’s Model"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "ইলেকট্রন নির্দিষ্ট কক্ষপথে ঘুরে, কোয়ান্টাইজড শক্তি স্তরে।"
                  : "Electrons orbit in fixed paths with quantized energy levels."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "অবদান:" : "Contribution:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "হাইড্রোজেন বর্ণালী ব্যাখ্যা" : "Explanation of hydrogen spectra"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোয়ান্টাম যান্ত্রিক মডেল" : "Quantum Mechanical Model"}
            </h4>
            <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg space-y-3">
              <p className="text-pink-700 dark:text-pink-300">
                {lang === "bn"
                  ? "ইলেকট্রন মেঘের মতো সম্ভাব্যতা অঞ্চলে থাকে, অরবিটালে।"
                  : "Electrons exist in probability clouds called orbitals."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ভিত্তি:" : "Basis:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "শ্রোডিঙ্গার সমীকরণ" : "Schrödinger equation"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রতিটি মডেল পূর্ববর্তী মডেলের সীমাবদ্ধতা দূর করে।" : "Each model addresses limitations of the previous one."}</li>
                <li>• {lang === "bn" ? "কোয়ান্টাম মডেল আধুনিক রসায়নের ভিত্তি।" : "Quantum model is the basis of modern chemistry."}</li>
                <li>• {lang === "bn" ? "নিউক্লিয়াসে প্রোটন এবং নিউট্রন থাকে।" : "Nucleus contains protons and neutrons."}</li>
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
