"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function BuffersContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বাফার হল এমন দ্রবণ যা অল্প পরিমাণে অ্যাসিড বা বেস যোগ করলে pH পরিবর্তন প্রতিরোধ করে, স্থিতিশীল pH বজায় রাখে।
মূল ধারণা:
- বাফার: দুর্বল অ্যাসিড এবং এর কনজুগেট বেস বা দুর্বল বেস এবং এর কনজুগেট অ্যাসিড দিয়ে তৈরি।
- কার্যপ্রণালী: H⁺ বা OH⁻ নিরপেক্ষ করে pH স্থিতিশীল রাখে।
প্রকার:
- অম্লীয় বাফার: দুর্বল অ্যাসিড এবং এর লবণ (যেমন, CH₃COOH + CH₃COONa)।
- ক্ষারীয় বাফার: দুর্বল বেস এবং এর লবণ (যেমন, NH₃ + NH₄Cl)।
হেন্ডারসন-হ্যাসেলব্যালচ সমীকরণ:
- pH = pKa + log([বেস]/[অ্যাসিড])।
- বাফারের pH গণনার জন্য ব্যবহৃত।
উদাহরণ:
- রক্তের বাফার: H₂CO₃/HCO₃⁻, pH ৭.৩৫-৭.৪৫ বজায় রাখে।
- অ্যাসিটিক অ্যাসিড বাফার: CH₃COOH/CH₃COONa।
প্রয়োগ:
- জীববিজ্ঞান: শরীরে pH নিয়ন্ত্রণ।
- শিল্প: রাসায়নিক প্রক্রিয়ায় স্থিতিশীলতা।
- গবেষণা: পরীক্ষায় নির্দিষ্ট pH বজায় রাখা।
টিপস:
- বাফারের ক্ষমতা সীমিত; অতিরিক্ত অ্যাসিড/বেস ব্যর্থ করতে পারে।
- pKa এবং উপাদানের অনুপাত বুঝুন।
- হেন্ডারসন সমীকরণ প্রয়োগ করুন।`
      : `Buffers are solutions that resist changes in pH upon addition of small amounts of acid or base, maintaining a stable pH.
Key Concepts:
- Buffer: Composed of a weak acid and its conjugate base or a weak base and its conjugate acid.
- Mechanism: Neutralizes added H⁺ or OH⁻ to stabilize pH.
Types:
- Acidic Buffer: Weak acid and its salt (e.g., CH₃COOH + CH₃COONa).
- Basic Buffer: Weak base and its salt (e.g., NH₃ + NH₄Cl).
Henderson-Hasselbalch Equation:
- pH = pKa + log([base]/[acid]).
- Used to calculate buffer pH.
Examples:
- Blood Buffer: H₂CO₃/HCO₃⁻, maintains pH 7.35-7.45.
- Acetic Acid Buffer: CH₃COOH/CH₃COONa.
Applications:
- Biology: Regulates pH in the body.
- Industry: Stabilizes chemical processes.
- Research: Maintains specific pH in experiments.
Tips:
- Buffer capacity is limited; excess acid/base can overwhelm it.
- Understand pKa and component ratios.
- Apply the Henderson-Hasselbalch equation.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বাফার" : "Buffers"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "বাফার দ্রবণ pH পরিবর্তন প্রতিরোধ করে।"
                  : "Buffers resist pH changes in solutions."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "দুর্বল অ্যাসিড এবং কনজুগেট বেস বাফার তৈরি করে।"
                    : "Weak acids and conjugate bases form buffers."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "বাফার অম্লীয় বা ক্ষারীয় হতে পারে।"
                  : "Buffers can be acidic or basic."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "অম্লীয়" : "Acidic"}</strong>: 
                  {lang === "bn" ? "দুর্বল অ্যাসিড এবং লবণ।" : "Weak acid and its salt."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ক্ষারীয়" : "Basic"}</strong>: 
                  {lang === "bn" ? "দুর্বল বেস এবং লবণ।" : "Weak base and its salt."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "হেন্ডারসন-হ্যাসেলব্যালচ" : "Henderson-Hasselbalch"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "pH গণনার জন্য সমীকরণ ব্যবহৃত হয়।"
                  : "Equation used to calculate buffer pH."}
              </p>
              <p className="text-sm">
                {lang === "bn" ? "pH = pKa + log([বেস]/[অ্যাসিড])।" : "pH = pKa + log([base]/[acid])."}
              </p>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ বাফার বোঝায়।"
                  : "Practical examples illustrate buffers."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "রক্তের বাফার" : "Blood Buffer"}</p>
                  <p className="text-sm">{lang === "bn" ? "H₂CO₃/HCO₃⁻।" : "H₂CO₃/HCO₃⁻."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অ্যাসিটিক অ্যাসিড" : "Acetic Acid"}</p>
                  <p className="text-sm">{lang === "bn" ? "CH₃COOH/CH₃COONa।" : "CH₃COOH/CH₃COONa."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "জীববিজ্ঞান" : "Biology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "pH নিয়ন্ত্রণ" : "pH regulation"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "প্রক্রিয়া স্থিতিশীলতা" : "Process stability"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "গবেষণা" : "Research"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "নির্দিষ্ট pH" : "Specific pH"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "বাফার ক্ষমতা সীমিত।" : "Buffer capacity is limited."}</li>
                <li>• {lang === "bn" ? "pKa বুঝুন।" : "Understand pKa."}</li>
                <li>• {lang === "bn" ? "সমীকরণ প্রয়োগ করুন।" : "Apply the equation."}</li>
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