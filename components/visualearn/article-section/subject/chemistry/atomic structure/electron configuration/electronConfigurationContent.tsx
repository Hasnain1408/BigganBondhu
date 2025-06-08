"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectronConfigurationContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ইলেকট্রন বিন্যাস হল একটি পরমাণুর শক্তি স্তর এবং কক্ষপথে ইলেকট্রনের বিন্যাস। 
মূল নীতিসমূহ:
- আউফবাউ নীতি: ইলেকট্রন নিম্নতম শক্তি স্তরে প্রথমে প্রবেশ করে।
- পাউলির বর্জন নীতি: একটি কক্ষপথে সর্বাধিক দুটি ইলেকট্রন বিপরীত স্পিনে থাকতে পারে।
- হুন্ডের নিয়ম: একই শক্তি স্তরের কক্ষপথে ইলেকট্রন এককভাবে পূর্ণ হয়।
শক্তি স্তর:
- প্রধান শক্তি স্তর: n = 1, 2, 3, ...
- উপস্তর: s, p, d, f
- কক্ষপথের ধারণক্ষমতা: 2(2l + 1)
বিন্যাসের নিয়ম:
- s: 2 ইলেকট্রন
- p: 6 ইলেকট্রন
- d: 10 ইলেকট্রন
- f: 14 ইলেকট্রন`
      : `Electron configuration is the arrangement of electrons in an atom’s energy levels and orbitals.
Key Principles:
- Aufbau Principle: Electrons fill the lowest energy orbitals first.
- Pauli Exclusion Principle: Each orbital can hold up to two electrons with opposite spins.
- Hund’s Rule: Electrons fill orbitals singly before pairing up.
Energy Levels:
- Principal Energy Levels: n = 1, 2, 3, ...
- Sublevels: s, p, d, f
- Orbital Capacity: 2(2l + 1)
Configuration Rules:
- s: 2 electrons
- p: 6 electrons
- d: 10 electrons
- f: 14 electrons`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ইলেকট্রন বিন্যাস" : "Electron Configuration"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ইলেকট্রন বিন্যাস হল একটি পরমাণুর শক্তি স্তর এবং কক্ষপথে ইলেকট্রনের বিন্যাস। এটি পরমাণুর রাসায়নিক বৈশিষ্ট্য নির্ধারণে গুরুত্বপূর্ণ ভূমিকা পালন করে।"
                  : "Electron configuration describes how electrons are distributed in an atom’s energy levels and orbitals, playing a crucial role in determining an atom’s chemical properties."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ইলেকট্রন পরমাণুর নিউক্লিয়াসের চারপাশে নির্দিষ্ট শক্তি স্তর এবং কক্ষপথে থাকে। প্রতিটি কক্ষপথে নির্দিষ্ট সংখ্যক ইলেকট্রন থাকতে পারে।"
                    : "Electrons reside in specific energy levels and orbitals around an atom’s nucleus. Each orbital can hold a specific number of electrons."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শক্তি স্তর এবং উপস্তর" : "Energy Levels and Sublevels"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "প্রধান শক্তি স্তর (n) এবং উপস্তর (s, p, d, f) দ্বারা ইলেকট্রন বিন্যাস বর্ণনা করা হয়। প্রতিটি স্তরে নির্দিষ্ট সংখ্যক কক্ষপথ থাকে।"
                  : "Electron configuration is described by principal energy levels (n) and sublevels (s, p, d, f). Each level contains a specific number of orbitals."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "প্রধান শক্তি স্তর" : "Principal Energy Levels"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "n = 1, 2, 3, ...; সর্বাধিক ইলেকট্রন: 2n²"
                      : "n = 1, 2, 3, ...; Max electrons: 2n²"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "উপস্তর" : "Sublevels"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "s (2 ইলেকট্রন), p (6 ইলেকট্রন), d (10 ইলেকট্রন), f (14 ইলেকট্রন)"
                      : "s (2 electrons), p (6 electrons), d (10 electrons), f (14 electrons)"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইলেকট্রন বিন্যাসের নীতি" : "Electron Configuration Principles"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <p className="font-medium text-purple-700 dark:text-purple-300">
                    {lang === "bn" ? "আউফবাউ নীতি" : "Aufbau Principle"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "ইলেকট্রন প্রথমে নিম্নতম শক্তির কক্ষপথে প্রবেশ করে।"
                      : "Electrons fill orbitals starting with the lowest energy."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-purple-700 dark:text-purple-300">
                    {lang === "bn" ? "পাউলির বর্জন নীতি" : "Pauli Exclusion Principle"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "প্রতিটি কক্ষপথে দুটি ইলেকট্রন বিপরীত স্পিন সহ থাকতে পারে।"
                      : "Each orbital holds up to two electrons with opposite spins."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-purple-700 dark:text-purple-300">
                    {lang === "bn" ? "হুন্ডের নিয়ম" : "Hund’s Rule"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "ইলেকট্রন একই শক্তি স্তরের কক্ষপথে এককভাবে পূর্ণ হয়।"
                      : "Electrons fill orbitals singly before pairing up."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কক্ষপথ এবং ইলেকট্রন ধারণক্ষমতা" : "Orbitals and Electron Capacity"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "প্রতিটি উপস্তরে নির্দিষ্ট সংখ্যক কক্ষপথ থাকে, এবং প্রতিটি কক্ষপথে দুটি ইলেকট্রন থাকতে পারে।"
                  : "Each sublevel contains a specific number of orbitals, and each orbital can hold two electrons."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">s-উপস্তর / s-sublevel</p>
                  <p className="text-sm">1 কক্ষপথ / 1 orbital, 2 ইলেকট্রন / 2 electrons</p>
                </div>
                <div>
                  <p className="font-medium">p-উপস্তর / p-sublevel</p>
                  <p className="text-sm">3 কক্ষপথ / 3 orbitals, 6 ইলেকট্রন / 6 electrons</p>
                </div>
                <div>
                  <p className="font-medium">d-উপস্তর / d-sublevel</p>
                  <p className="text-sm">5 কক্ষপথ / 5 orbitals, 10 ইলেকট্রন / 10 electrons</p>
                </div>
                <div>
                  <p className="font-medium">f-উপস্তর / f-sublevel</p>
                  <p className="text-sm">7 কক্ষপথ / 7 orbitals, 14 ইলেকট্রন / 14 electrons</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইলেকট্রন বিন্যাস নোটেশন" : "Electron Configuration Notation"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "ইলেকট্রন বিন্যাস নোটেশন প্রতিটি উপস্তরে ইলেকট্রনের সংখ্যা নির্দেশ করে। উদাহরণ: কার্বন (C): 1s² 2s² 2p²"
                  : "Electron configuration notation indicates the number of electrons in each sublevel. Example: Carbon (C): 1s² 2s² 2p²"}
              </p>
              <div className="space-y-2">
                <p className="font-medium">{lang === "bn" ? "নোটেশন বিন্যাস:" : "Notation Format:"}</p>
                <p className="font-mono">[n][sublevel][number of electrons]</p>
                <p className="text-sm">
                  {lang === "bn" ? "যেমন, 2s² = 2য় শক্তি স্তরে s-উপস্তরে 2টি ইলেকট্রন" : "e.g., 2s² = 2 electrons in s-sublevel of 2nd energy level"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যতিক্রম এবং বিশেষ ক্ষেত্র" : "Exceptions and Special Cases"}
            </h4>
            
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-3">
              <p className="text-red-700 dark:text-red-300">
                {lang === "bn"
                  ? "কিছু উপাদান, যেমন ক্রোমিয়াম (Cr) এবং কপার (Cu), স্থিতিশীলতার জন্য ব্যতিক্রমী বিন্যাস অনুসরণ করে।"
                  : "Some elements, like Chromium (Cr) and Copper (Cu), follow exceptional configurations for stability."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Cr: [Ar] 3d⁵ 4s¹</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "আধা-পূর্ণ 3d উপস্তরের জন্য"
                      : "For half-filled 3d sublevel"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Cu: [Ar] 3d¹⁰ 4s¹</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "পূর্ণ 3d উপস্তরের জন্য"
                      : "For fully filled 3d sublevel"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "রসায়ন" : "Chemistry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "রাসায়নিক বন্ধন" : "Chemical bonding"}</li>
                  <li>• {lang === "bn" ? "পর্যায় সারণির বৈশিষ্ট্য" : "Periodic table properties"}</li>
                  <li>• {lang === "bn" ? "প্রতিক্রিয়ার পূর্বাভাস" : "Reaction prediction"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "পদার্থবিজ্ঞান" : "Physics"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "বর্ণালী বিশ্লেষণ" : "Spectral analysis"}</li>
                  <li>• {lang === "bn" ? "কোয়ান্টাম মেকানিক্স" : "Quantum mechanics"}</li>
                  <li>• {lang === "bn" ? "উপাদান শনাক্তকরণ" : "Element identification"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "আউফবাউ ক্রম মনে রাখুন: 1s, 2s, 2p, 3s, 3p, 4s, 3d, ..." : "Remember Aufbau order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, ..."}</li>
                <li>• {lang === "bn" ? "ব্যতিক্রমী উপাদানগুলির জন্য d-উপস্তর পরীক্ষা করুন" : "Check d-sublevel for exceptional elements"}</li>
                <li>• {lang === "bn" ? "ইলেকট্রন গণনা যোগ করে পরীক্ষা করুন" : "Verify electron count sums to atomic number"}</li>
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