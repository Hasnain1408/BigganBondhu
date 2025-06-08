"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function LewisStructuresContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `লুইস কাঠামো হল অণুতে পরমাণুর মধ্যে বন্ধন এবং একাকী ইলেকট্রন জোড়ার চিত্র।
মূল ধারণা:
- বিন্দু: একাকী ইলেকট্রন।
- রেখা: বন্ধন জোড়া।
- অষ্টক নিয়ম: স্থিতিশীলতার জন্য ৮টি ইলেকট্রন।
নিয়ম:
- ভ্যালেন্স ইলেকট্রন গণনা।
- কঙ্কাল কাঠামো তৈরি।
- ইলেকট্রন বিতরণ।
উদাহরণ:
- CH₄: মিথেন।
- NH₃: অ্যামোনিয়া।
প্রয়োগ:
- অণুর আকৃতি নির্ণয়।
- রাসায়নিক প্রতিক্রিয়া বোঝা।`
      : `Lewis structures are diagrams showing the bonding between atoms and lone pairs of electrons in a molecule.
Key Concepts:
- Dots: Lone electrons.
- Lines: Bonding pairs.
- Octet Rule: 8 electrons for stability.
Rules:
- Count valence electrons.
- Build skeleton structure.
- Distribute electrons.
Examples:
- CH₄: Methane.
- NH₃: Ammonia.
Applications:
- Determine molecular shape.
- Understand chemical reactions.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "লুইস কাঠামো" : "Lewis Structures"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "লুইস কাঠামো অণুতে পরমাণুর মধ্যে বন্ধন এবং একাকী ইলেকট্রন জোড়া দেখায়, যা রাসায়নিক গঠন বোঝার জন্য গুরুত্বপূর্ণ।"
                  : "Lewis structures illustrate the bonding and lone electron pairs in a molecule, crucial for understanding chemical structures."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "লুইস কাঠামো অণুর ইলেকট্রন বিন্যাস বোঝায় এবং অষ্টক নিয়ম মেনে চলে।"
                    : "Lewis structures represent electron arrangements in molecules, following the octet rule."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "লুইস কাঠামো তৈরির নিয়ম" : "Rules for Drawing Lewis Structures"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "লুইস কাঠামো তৈরি করতে ভ্যালেন্স ইলেকট্রন গণনা করা, কঙ্কাল কাঠামো তৈরি করা এবং ইলেকট্রন বিতরণ করা প্রয়োজন।"
                  : "Drawing Lewis structures involves counting valence electrons, building a skeleton structure, and distributing electrons."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "ভ্যালেন্স ইলেকট্রন যোগ করুন।" : "Sum valence electrons."}</li>
                <li>• {lang === "bn" ? "কেন্দ্রীয় পরমাণু নির্বাচন করুন।" : "Choose central atom."}</li>
                <li>• {lang === "bn" ? "বন্ধন এবং একাকী জোড়া স্থাপন করুন।" : "Place bonds and lone pairs."}</li>
                <li>• {lang === "bn" ? "অষ্টক নিয়ম পরীক্ষা করুন।" : "Check octet rule."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "লুইস কাঠামোর বৈশিষ্ট্য" : "Features of Lewis Structures"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "লুইস কাঠামো বন্ধন জোড়া এবং একাকী জোড়া দেখায়, যা অণুর আকৃতি এবং প্রতিক্রিয়াশীলতা বোঝায়।"
                  : "Lewis structures show bonding pairs and lone pairs, aiding in understanding molecular shape and reactivity."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "বিন্দু: একাকী ইলেকট্রন।" : "Dots: Lone electrons."}</li>
                <li>• {lang === "bn" ? "রেখা: বন্ধন জোড়া।" : "Lines: Bonding pairs."}</li>
                <li>• {lang === "bn" ? "অষ্টক নিয়ম: ৮টি ইলেকট্রন।" : "Octet rule: 8 electrons."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "সাধারণ লুইস কাঠামোর মধ্যে রয়েছে মিথেন (CH₄) এবং অ্যামোনিয়া (NH₃)।"
                  : "Common Lewis structures include methane (CH₄) and ammonia (NH₃)."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">CH₄</p>
                  <p className="text-sm">{lang === "bn" ? "৪টি একক বন্ধন" : "Four single bonds"}</p>
                </div>
                <div>
                  <p className="font-medium">NH₃</p>
                  <p className="text-sm">{lang === "bn" ? "৩টি বন্ধন, ১টি একাকী জোড়া" : "Three bonds, one lone pair"}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "লুইস কাঠামোর প্রয়োগ" : "Applications of Lewis Structures"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "রসায়ন" : "Chemistry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "অণুর আকৃতি নির্ণয়" : "Molecular geometry"}</li>
                  <li>• {lang === "bn" ? "প্রতিক্রিয়াশীলতা বিশ্লেষণ" : "Reactivity analysis"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিক্ষা" : "Education"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "ইলেকট্রন বিন্যাস শিক্ষা" : "Electron configuration teaching"}</li>
                  <li>• {lang === "bn" ? "বন্ধন তত্ত্ব বোঝা" : "Bonding theory understanding"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ভ্যালেন্স ইলেকট্রন সঠিকভাবে গণনা করুন।" : "Count valence electrons accurately."}</li>
                <li>• {lang === "bn" ? "কেন্দ্রীয় পরমাণু চিহ্নিত করুন।" : "Identify the central atom."}</li>
                <li>• {lang === "bn" ? "অষ্টক নিয়ম যাচাই করুন।" : "Verify the octet rule."}</li>
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