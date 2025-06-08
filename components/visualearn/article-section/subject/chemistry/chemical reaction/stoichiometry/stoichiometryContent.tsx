"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function StoichiometryContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `স্টয়কিওমেট্রি হল রাসায়নিক বিক্রিয়ায় বিক্রিয়ক এবং উৎপাদের পরিমাণ গণনা করার পদ্ধতি।
মূল ধারণা:
- মোল অনুপাত: সামঞ্জস্যপূর্ণ সমীকরণ থেকে প্রাপ্ত।
- সীমিত বিক্রিয়ক: বিক্রিয়া সীমাবদ্ধ করে।
ধাপ:
১. সমীকরণ সামঞ্জস্য করুন।
২. মোল অনুপাত নির্ধারণ করুন।
৩. পরিমাণ গণনা করুন।
উদাহরণ:
- CH₄ + 2O₂ → CO₂ + 2H₂O: ১ মোল CH₄ থেকে ১ মোল CO₂।
প্রয়োগ:
- শিল্প উৎপাদন।
- পরীক্ষাগার গণনা।
টিপস:
- সর্বদা সমীকরণ সামঞ্জস্য করুন।
- মোলার ভর যাচাই করুন।`
      : `Stoichiometry is the calculation of quantities of reactants and products in chemical reactions.
Key Concepts:
- Mole Ratio: Derived from balanced equations.
- Limiting Reactant: Restricts the reaction.
Steps:
1. Balance the equation.
2. Determine mole ratios.
3. Calculate quantities.
Examples:
- CH₄ + 2O₂ → CO₂ + 2H₂O: 1 mole CH₄ yields 1 mole CO₂.
Applications:
- Industrial production.
- Laboratory calculations.
Tips:
- Always balance the equation first.
- Verify molar masses.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "স্টয়কিওমেট্রি" : "Stoichiometry"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "স্টয়কিওমেট্রি রাসায়নিক বিক্রিয়ার পরিমাণগত সম্পর্ক বোঝায়।"
                  : "Stoichiometry deals with quantitative relationships in chemical reactions."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "মোল অনুপাত এবং সীমিত বিক্রিয়ক বিক্রিয়ার ফলাফল নির্ধারণ করে।"
                    : "Mole ratios and limiting reactants determine reaction outcomes."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ধাপ" : "Steps"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "সঠিক গণনার জন্য ধাপগুলি অনুসরণ করুন।"
                  : "Follow these steps for accurate calculations."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "ধাপ ১" : "Step 1"}</strong>: 
                  {lang === "bn" ? "রাসায়নিক সমীকরণ সামঞ্জস্য করুন।" : "Balance the chemical equation."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ধাপ ২" : "Step 2"}</strong>: 
                  {lang === "bn" ? "মোল অনুপাত নির্ধারণ করুন।" : "Determine mole ratios."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ধাপ ৩" : "Step 3"}</strong>: 
                  {lang === "bn" ? "প্রয়োজনীয় পরিমাণ গণনা করুন।" : "Calculate required quantities."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ স্টয়কিওমেট্রি বোঝায়।"
                  : "Practical examples illustrate stoichiometry."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "দহন" : "Combustion"}</p>
                  <p className="text-sm">CH₄ + 2O₂ → CO₂ + 2H₂O</p>
                  <p className="text-sm">{lang === "bn" ? "১ মোল CH₄ থেকে ২ মোল H₂O।" : "1 mole CH₄ yields 2 moles H₂O."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সংশ্লেষণ" : "Synthesis"}</p>
                  <p className="text-sm">2Na + Cl₂ → 2NaCl</p>
                  <p className="text-sm">{lang === "bn" ? "২ মোল Na থেকে ২ মোল NaCl।" : "2 moles Na yield 2 moles NaCl."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "উৎপাদন পরিকল্পনা" : "Production planning"}</li>
                  <li>• {lang === "bn" ? "ব্যয় নিয়ন্ত্রণ" : "Cost control"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "পরীক্ষাগার" : "Laboratory"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "পরীক্ষার ডিজাইন" : "Experiment design"}</li>
                  <li>• {lang === "bn" ? "ফলাফল বিশ্লেষণ" : "Result analysis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সমীকরণ সামঞ্জস্যের উপর নির্ভর করুন।" : "Rely on balanced equations."}</li>
                <li>• {lang === "bn" ? "মোলার ভর দুবার যাচাই করুন।" : "Double-check molar masses."}</li>
                <li>• {lang === "bn" ? "ইউনিট রূপান্তরে সতর্ক থাকুন।" : "Be cautious with unit conversions."}</li>
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