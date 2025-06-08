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
      ? `পরমাণু মডেলগুলি পরমাণুর গঠন বর্ণনা করে, যা সময়ের সাথে বৈজ্ঞানিক আবিষ্কারের মাধ্যমে বিবর্তিত হয়েছে।
প্রধান মডেলগুলি:
- ডালটনের মডেল: পরমাণু অবিভাজ্য কঠিন কণা।
- থমসনের মডেল: প্লাম পুডিং মডেল, ইলেকট্রন ধনাত্মক পদার্থে স্থাপিত।
- রাদারফোর্ডের মডেল: কেন্দ্রে নিউক্লিয়াস, চারপাশে ইলেকট্রন।
- বোরের মডেল: ইলেকট্রন নির্দিষ্ট কক্ষপথে ঘুরে।
- কোয়ান্টাম মডেল: ইলেকট্রন সম্ভাব্যতার মেঘে থাকে।
মূল ধারণা:
- পরমাণুর গঠন বোঝা রাসায়নিক বৈশিষ্ট্য ব্যাখ্যা করে।
- প্রতিটি মডেল পূর্ববর্তী মডেলের সীমাবদ্ধতা দূর করে।
- আধুনিক মডেল কোয়ান্টাম মেকানিক্সের উপর ভিত্তি করে।`
      : `Atomic models describe the structure of atoms, evolving over time with scientific discoveries.
Key Models:
- Dalton’s Model: Atoms are indivisible solid particles.
- Thomson’s Model: Plum pudding model, electrons embedded in positive matter.
- Rutherford’s Model: Nucleus at the center with electrons orbiting.
- Bohr’s Model: Electrons orbit in fixed paths.
- Quantum Model: Electrons exist in probability clouds.
Key Concepts:
- Understanding atomic structure explains chemical properties.
- Each model addresses limitations of previous models.
- Modern model is based on quantum mechanics.`

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
                  ? "পরমাণু মডেলগুলি পরমাণুর গঠন এবং আচরণ বর্ণনা করে, যা বৈজ্ঞানিক গবেষণার মাধ্যমে সময়ের সাথে উন্নত হয়েছে। এটি রসায়ন এবং পদার্থবিজ্ঞানে গুরুত্বপূর্ণ ভূমিকা পালন করে।"
                  : "Atomic models describe the structure and behavior of atoms, refined over time through scientific research. They play a crucial role in chemistry and physics."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "পরমাণু হল পদার্থের মৌলিক একক, এবং এর গঠন বোঝা রাসায়নিক বন্ধন এবং বৈশিষ্ট্য ব্যাখ্যা করতে সহায়ক।"
                    : "Atoms are the fundamental units of matter, and understanding their structure helps explain chemical bonding and properties."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডালটনের পরমাণু মডেল" : "Dalton’s Atomic Model"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "জন ডালটন (১৮০৮) প্রস্তাব করেন যে পরমাণু অবিভাজ্য, কঠিন এবং অভিন্ন কণা।"
                  : "John Dalton (1808) proposed that atoms are indivisible, solid, and uniform particles."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রতিটি মৌলের পরমাণু অভিন্ন।" : "Atoms of an element are identical."}</li>
                <li>• {lang === "bn" ? "পরমাণু সৃষ্টি বা ধ্বংস হয় না।" : "Atoms cannot be created or destroyed."}</li>
                <li>• {lang === "bn" ? "যৌগ গঠনে পরমাণু নির্দিষ্ট অনুপাতে মিলিত হয়।" : "Atoms combine in fixed ratios to form compounds."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "থমসনের প্লাম পুডিং মডেল" : "Thomson’s Plum Pudding Model"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "জে. জে. থমসন (১৯০৪) আবিষ্কার করেন যে পরমাণুতে ইলেকট্রন থাকে। তিনি প্রস্তাব করেন যে পরমাণু একটি ধনাত্মক পদার্থে ইলেকট্রন স্থাপিত, যেন প্লাম পুডিং।"
                  : "J.J. Thomson (1904) discovered electrons and proposed that atoms are a positive mass with embedded electrons, like plums in pudding."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "ধনাত্মক চার্জ সমানভাবে ছড়িয়ে থাকে।" : "Positive charge is spread evenly."}</li>
                <li>• {lang === "bn" ? "ইলেকট্রন ঋণাত্মক কণা।" : "Electrons are negatively charged particles."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "রাদারফোর্ডের নিউক্লিয়ার মডেল" : "Rutherford’s Nuclear Model"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "আর্নেস্ট রাদারফোর্ড (১৯১১) আবিষ্কার করেন যে পরমাণুর কেন্দ্রে একটি ঘন নিউক্লিয়াস থাকে, এবং ইলেকট্রন এটির চারপাশে ঘুরে।"
                  : "Ernest Rutherford (1911) discovered a dense nucleus at the atom’s center, with electrons orbiting around it."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "নিউক্লিয়াসে প্রোটন থাকে।" : "Nucleus contains protons."}</li>
                <li>• {lang === "bn" ? "পরমাণুর বেশিরভাগ ভর নিউক্লিয়াসে।" : "Most of the atom’s mass is in the nucleus."}</li>
                <li>• {lang === "bn" ? "ইলেকট্রন দূরে ঘুরে।" : "Electrons orbit at a distance."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বোরের মডেল" : "Bohr’s Model"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "নীলস বোর (১৯১৩) প্রস্তাব করেন যে ইলেকট্রন নির্দিষ্ট শক্তি স্তরে ঘুরে এবং শক্তি শোষণ বা নির্গমন করে স্তর পরিবর্তন করে।"
                  : "Niels Bohr (1913) proposed that electrons orbit in fixed energy levels and change levels by absorbing or emitting energy."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "ইলেকট্রন নির্দিষ্ট কক্ষপথে থাকে।" : "Electrons exist in specific orbits."}</li>
                <li>• {lang === "bn" ? "শক্তি স্তর কোয়ান্টাইজড।" : "Energy levels are quantized."}</li>
                <li>• {lang === "bn" ? "বর্ণালী রেখা ব্যাখ্যা করে।" : "Explains spectral lines."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোয়ান্টাম মেকানিকাল মডেল" : "Quantum Mechanical Model"}
            </h4>
            
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-3">
              <p className="text-red-700 dark:text-red-300">
                {lang === "bn"
                  ? "আধুনিক মডেল (১৯২০-এর দশক) কোয়ান্টাম মেকানিক্সের উপর ভিত্তি করে। ইলেকট্রন সম্ভাব্যতার মেঘে থাকে।"
                  : "The modern model (1920s) is based on quantum mechanics, with electrons existing in probability clouds."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "ইলেকট্রন কক্ষপথের পরিবর্তে অরবিটালে থাকে।" : "Electrons are in orbitals, not orbits."}</li>
                <li>• {lang === "bn" ? "সম্ভাব্যতা বিতরণ।" : "Probability distribution."}</li>
                <li>• {lang === "bn" ? "শ্রোডিঙার সমীকরণ।" : "Schrödinger equation."}</li>
              </ul>
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
                  <li>• {lang === "bn" ? "পর্যায় সারণি" : "Periodic table"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "পদার্থবিজ্ঞান" : "Physics"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "বর্ণালী বিশ্লেষণ" : "Spectral analysis"}</li>
                  <li>• {lang === "bn" ? "কোয়ান্টাম কম্পিউটিং" : "Quantum computing"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রতিটি মডেলের সীমাবদ্ধতা মনে রাখুন।" : "Remember the limitations of each model."}</li>
                <li>• {lang === "bn" ? "কোয়ান্টাম মডেল আধুনিক এবং সঠিক।" : "Quantum model is modern and accurate."}</li>
                <li>• {lang === "bn" ? "বোরের মডেল বর্ণালী ব্যাখ্যায় সহায়ক।" : "Bohr’s model is useful for spectra."}</li>
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