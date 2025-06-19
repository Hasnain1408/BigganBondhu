
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function QuantumBasicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কোয়ান্টাম বেসিক্স কোয়ান্টাম মেকানিক্সের মৌলিক নীতিগুলি অন্বেষণ করে, যেমন তরঙ্গ-কণা দ্বৈততা, সুপারপজিশন, এবং অনিশ্চয়তা।
মূল ধারণা:
- তরঙ্গ-কণা দ্বৈততা
- সুপারপজিশন নীতি
- হাইজেনবার্গের অনিশ্চয়তা নীতি
- কোয়ান্টাম স্টেট এবং ওয়েভ ফাংশন
- পরিমাপ সমস্যা
সূত্রাবলী:
- হাইজেনবার্গ: Δx Δp ≥ ħ/2
- তরঙ্গদৈর্ঘ্য: λ = h/p
- শক্তি: E = hν
- ওয়েভ ফাংশন: |ψ|² = সম্ভাবনা ঘনত্ব`
      : `Quantum Basics explores fundamental principles of quantum mechanics, including wave-particle duality, superposition, and uncertainty.
Key Concepts:
- Wave-particle duality
- Superposition principle
- Heisenberg uncertainty principle
- Quantum state and wave function
- Measurement problem
Formulas:
- Heisenberg: Δx Δp ≥ ħ/2
- Wavelength: λ = h/p
- Energy: E = hν
- Wave function: |ψ|² = probability density`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কোয়ান্টাম বেসিক্স" : "Quantum Basics"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কোয়ান্টাম মেকানিক্স হল পদার্থবিজ্ঞানের একটি শাখা যা পরমাণু এবং উপ-পরমাণবিক স্তরে পদার্থ এবং শক্তির আচরণ অধ্যয়ন করে। এটি ক্লাসিক্যাল পদার্থবিজ্ঞান থেকে ভিন্ন, কারণ এটি সম্ভাবনা এবং তরঙ্গ-সদৃশ বৈশিষ্ট্যের উপর নির্ভর করে।"
                  : "Quantum mechanics is a branch of physics that studies the behavior of matter and energy at atomic and subatomic levels. It differs from classical physics by relying on probabilities and wave-like properties."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কোয়ান্টাম মেকানিক্সে কণা তরঙ্গের মতো আচরণ করে, একাধিক অবস্থায় থাকতে পারে, এবং পরিমাপের আগে তাদের বৈশিষ্ট্য অনিশ্চিত থাকে।"
                    : "In quantum mechanics, particles exhibit wave-like behavior, can exist in multiple states, and their properties are uncertain until measured."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "তরঙ্গ-কণা দ্বৈততা" : "Wave-Particle Duality"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "কণা, যেমন ইলেকট্রন বা ফোটন, পরিস্থিতির উপর নির্ভর করে তরঙ্গ বা কণার মতো আচরণ করতে পারে।"
                  : "Particles, such as electrons or photons, can behave as waves or particles depending on the experiment."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "দে ব্রোগলি তরঙ্গদৈর্ঘ্য:" : "de Broglie Wavelength:"}
                  </p>
                  <p className="font-mono text-lg">λ = h/p</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "h = প্লাঙ্ক ধ্রুবক, p = ভরবেগ" : "h = Planck’s constant, p = momentum"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "ফোটন শক্তি:" : "Photon Energy:"}
                  </p>
                  <p className="font-mono text-lg">E = hν</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "ν = কম্পাঙ্ক" : "ν = frequency"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সুপারপজিশন নীতি" : "Superposition Principle"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "একটি কোয়ান্টাম সিস্টেম একাধিক অবস্থার সমন্বয়ে থাকতে পারে যতক্ষণ না এটি পরিমাপ করা হয়।"
                  : "A quantum system can exist in a combination of multiple states until it is measured."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "ওয়েভ ফাংশন:" : "Wave Function:"}
                  </p>
                  <p className="font-mono text-lg">ψ(x,t)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "|ψ|² = সম্ভাবনা ঘনত্ব" : "|ψ|² = probability density"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "হাইজেনবার্গের অনিশ্চয়তা নীতি" : "Heisenberg Uncertainty Principle"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "অবস্থান এবং ভরবেগের মতো নির্দিষ্ট জোড়া বৈশিষ্ট্য একযোগে নির্ভুলভাবে জানা যায় না।"
                  : "Certain pairs of properties, like position and momentum, cannot be known simultaneously with precision."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "অনিশ্চয়তা:" : "Uncertainty:"}</p>
                  <p className="font-mono text-lg">Δx Δp ≥ ħ/2</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "ħ = প্লাঙ্ক ধ্রুবক / 2π" : "ħ = Planck’s constant / 2π"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পরিমাপ সমস্যা" : "Measurement Problem"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "পরিমাপের সময় একটি কোয়ান্টাম সিস্টেম একটি নির্দিষ্ট অবস্থায় 'পতন' করে।"
                  : "Upon measurement, a quantum system 'collapses' to a definite state."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "উদাহরণ:" : "Example:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "ইলেকট্রনের স্পিন পরিমাপ" : "Measuring an electron’s spin"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রভাব:" : "Effect:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "সুপারপজিশনের ধ্বংস" : "Collapse of superposition"}
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
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "লেজার" : "Lasers"}</li>
                  <li>• {lang === "bn" ? "সেমিকন্ডাক্টর" : "Semiconductors"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "এমআরআই" : "MRI"}</li>
                  <li>• {lang === "bn" ? "পিইটি স্ক্যান" : "PET scans"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কোয়ান্টাম ঘটনা সম্ভাবনার উপর নির্ভর করে।" : "Quantum phenomena rely on probabilities."}</li>
                <li>• {lang === "bn" ? "পরিমাপ সিস্টেমের অবস্থা পরিবর্তন করে।" : "Measurement alters the system’s state."}</li>
                <li>• {lang === "bn" ? "তরঙ্গ ফাংশন সম্পূর্ণ তথ্য ধারণ করে।" : "Wave function contains all system information."}</li>
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
