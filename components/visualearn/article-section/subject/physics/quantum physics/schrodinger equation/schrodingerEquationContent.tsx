
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function SchrodingerEquationContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `শ্রোডিঙ্গার সমীকরণ কোয়ান্টাম সিস্টেমের বিবর্তন নিয়ন্ত্রণ করে, তরঙ্গ ফাংশন এবং শক্তি অবস্থা বর্ণনা করে।
মূল ধারণা:
- সময়-নির্ভর শ্রোডিঙ্গার সমীকরণ
- সময়-স্বাধীন শ্রোডিঙ্গার সমীকরণ
- তরঙ্গ ফাংশন এবং সম্ভাবনা
- স্থির অবস্থা
- হ্যামিলটোনিয়ান
সূত্রাবলী:
- সময়-নির্ভর: iħ ∂ψ/∂t = Ĥψ
- সময়-স্বাধীন: Ĥψ = Eψ
- হ্যামিলটোনিয়ান: Ĥ = -ħ²/(2m) ∇² + V
- সম্ভাবনা ঘনত্ব: |ψ|²`
      : `The Schrödinger Equation governs the evolution of quantum systems, describing wave functions and energy states.
Key Concepts:
- Time-dependent Schrödinger equation
- Time-independent Schrödinger equation
- Wave function and probability
- Stationary states
- Hamiltonian
Formulas:
- Time-dependent: iħ ∂ψ/∂t = Ĥψ
- Time-independent: Ĥψ = Eψ
- Hamiltonian: Ĥ = -ħ²/(2m) ∇² + V
- Probability density: |ψ|²`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "শ্রোডিঙ্গার সমীকরণ" : "Schrödinger Equation"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "শ্রোডিঙ্গার সমীকরণ কোয়ান্টাম মেকানিক্সের মূল ভিত্তি, যা তরঙ্গ ফাংশনের মাধ্যমে কোয়ান্টাম সিস্টেমের আচরণ বর্ণনা করে।"
                  : "The Schrödinger Equation is the foundation of quantum mechanics, describing the behavior of quantum systems via the wave function."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "এটি কোয়ান্টাম সিস্টেমের সময়ের সাথে বিবর্তন এবং শক্তি অবস্থা নির্ধারণ করে, সম্ভাবনার উপর ভিত্তি করে।"
                    : "It determines the time evolution and energy states of quantum systems, based on probabilities."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সময়-নির্ভর শ্রোডিঙ্গার সমীকরণ" : "Time-Dependent Schrödinger Equation"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "এই সমীকরণ তরঙ্গ ফাংশনের সময়ের সাথে পরিবর্তন বর্ণনা করে।"
                  : "This equation describes how the wave function evolves over time."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "সমীকরণ:" : "Equation:"}
                  </p>
                  <p className="font-mono text-lg">iħ ∂ψ/∂t = Ĥψ</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "Ĥ = হ্যামিলটোনিয়ান, ψ = তরঙ্গ ফাংশন" : "Ĥ = Hamiltonian, ψ = wave function"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সময়-স্বাধীন শ্রোডিঙ্গার সমীকরণ" : "Time-Independent Schrödinger Equation"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "এটি স্থির অবস্থার শক্তি স্তর এবং তরঙ্গ ফাংশন নির্ধারণ করে।"
                  : "It determines the energy levels and wave functions for stationary states."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "সমীকরণ:" : "Equation:"}
                  </p>
                  <p className="font-mono text-lg">Ĥψ = Eψ</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "E = শক্তি, ψ = তরঙ্গ ফাংশন" : "E = energy, ψ = wave function"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "হ্যামিলটোনিয়ান" : "Hamiltonian"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "হ্যামিলটোনিয়ান সিস্টেমের মোট শক্তি প্রকাশ করে, গতিশক্তি এবং সম্ভাব্য শক্তির সমষ্টি।"
                  : "The Hamiltonian represents the total energy of the system, the sum of kinetic and potential energy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "হ্যামিলটোনিয়ান:" : "Hamiltonian:"}</p>
                  <p className="font-mono text-lg">Ĥ = -ħ²/(2m) ∇² + V</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "V = সম্ভাব্য শক্তি, m = ভর" : "V = potential energy, m = mass"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "স্থির অবস্থা এবং সম্ভাবনা" : "Stationary States and Probability"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "স্থির অবস্থায় তরঙ্গ ফাংশনের সম্ভাবনা ঘনত্ব সময়ের সাথে পরিবর্তন হয় না।"
                  : "In stationary states, the probability density of the wave function does not change with time."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সম্ভাবনা ঘনত্ব:" : "Probability Density:"}</p>
                  <p className="font-mono text-lg">|ψ|²</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "উদাহরণ:" : "Example:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "অনন্ত কূপে কণা" : "Particle in an infinite well"}
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
                  {lang === "bn" ? "পদার্থবিজ্ঞান" : "Physics"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "পরমাণুর শক্তি স্তর" : "Atomic energy levels"}</li>
                  <li>• {lang === "bn" ? "কোয়ান্টাম টানেলিং" : "Quantum tunneling"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "কোয়ান্টাম কম্পিউটিং" : "Quantum computing"}</li>
                  <li>• {lang === "bn" ? "সেমিকন্ডাক্টর ডিভাইস" : "Semiconductor devices"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "তরঙ্গ ফাংশন স্বাভাবিক করা আবশ্যক।" : "Wave function must be normalized."}</li>
                <li>• {lang === "bn" ? "হ্যামিলটোনিয়ান শক্তির অপারেটর।" : "Hamiltonian is the energy operator."}</li>
                <li>• {lang === "bn" ? "স্থির অবস্থায় শক্তি নির্দিষ্ট।" : "Energy is definite in stationary states."}</li>
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
