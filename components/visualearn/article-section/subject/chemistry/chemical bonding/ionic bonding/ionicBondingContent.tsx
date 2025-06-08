"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function IonicBondingContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `আয়নিক বন্ধন হল পরমাণুর মধ্যে ইলেকট্রন স্থানান্তরের মাধ্যমে আয়ন গঠন এবং বিপরীত চার্জযুক্ত আয়নের মধ্যে তড়িৎস্থিতিক আকর্ষণ।
মূল ধারণা:
- ইলেকট্রন হস্তান্তর: ধাতু থেকে অধাতুতে।
- আয়ন: ধনাত্মক (ক্যাটায়ন) এবং ঋণাত্মক (অ্যানায়ন)।
- যৌগ: উচ্চ গলনাঙ্ক, পানিতে দ্রবণীয়।
উদাহরণ:
- NaCl: সোডিয়াম ক্লোরাইড।
- MgO: ম্যাগনেসিয়াম অক্সাইড।
বৈশিষ্ট্য:
- শক্তিশালী বন্ধন।
- স্ফটিক কাঠামো।
- তড়িৎ পরিবাহিতা (দ্রবণে)।`
      : `Ionic bonding involves the transfer of electrons between atoms to form ions, resulting in electrostatic attraction between oppositely charged ions.
Key Concepts:
- Electron Transfer: From metal to non-metal.
- Ions: Positive (cation) and negative (anion).
- Compounds: High melting point, water-soluble.
Examples:
- NaCl: Sodium chloride.
- MgO: Magnesium oxide.
Properties:
- Strong bonding.
- Crystal lattice structure.
- Electrical conductivity (in solution).`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আয়নিক বন্ধন" : "Ionic Bonding"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "আয়নিক বন্ধন হল ধাতু এবং অধাতুর মধ্যে ইলেকট্রন স্থানান্তরের মাধ্যমে গঠিত রাসায়নিক বন্ধন, যা শক্তিশালী তড়িৎস্থিতিক আকর্ষণ সৃষ্টি করে।"
                  : "Ionic bonding is a chemical bond formed by the transfer of electrons between metals and non-metals, creating strong electrostatic attraction."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ধাতু ইলেকট্রন ত্যাগ করে ধনাত্মক আয়ন গঠন করে, এবং অধাতু ইলেকট্রন গ্রহণ করে ঋণাত্মক আয়ন গঠন করে।"
                    : "Metals lose electrons to form positive ions, while non-metals gain electrons to form negative ions."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "আয়নিক বন্ধনের প্রক্রিয়া" : "Ionic Bonding Process"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "ধাতু এবং অধাতুর মধ্যে ইলেকট্রন স্থানান্তরের ফলে আয়ন গঠিত হয়, যা তড়িৎস্থিতিক আকর্ষণে আবদ্ধ হয়।"
                  : "Electron transfer between a metal and non-metal forms ions, which are held together by electrostatic attraction."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "ধাতু: ইলেকট্রন ত্যাগ করে ক্যাটায়ন গঠন করে।" : "Metal: Loses electrons to form cations."}</li>
                <li>• {lang === "bn" ? "অধাতু: ইলেকট্রন গ্রহণ করে অ্যানায়ন গঠন করে।" : "Non-metal: Gains electrons to form anions."}</li>
                <li>• {lang === "bn" ? "আকর্ষণ: বিপরীত চার্জের মধ্যে শক্তিশালী বন্ধন।" : "Attraction: Strong bond between opposite charges."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "আয়নিক যৌগের বৈশিষ্ট্য" : "Properties of Ionic Compounds"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "আয়নিক যৌগগুলির উচ্চ গলনাঙ্ক এবং ফুটনাঙ্ক থাকে এবং এগুলি সাধারণত পানিতে দ্রবণীয়।"
                  : "Ionic compounds have high melting and boiling points and are typically soluble in water."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "কঠিন অবস্থায় স্ফটিক কাঠামো।" : "Crystal lattice structure in solid state."}</li>
                <li>• {lang === "bn" ? "দ্রবণে তড়িৎ পরিবাহী।" : "Conduct electricity in solution."}</li>
                <li>• {lang === "bn" ? "ভঙ্গুর প্রকৃতি।" : "Brittle nature."}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "সাধারণ আয়নিক যৌগগুলির মধ্যে রয়েছে সোডিয়াম ক্লোরাইড (NaCl) এবং ক্যালসিয়াম অক্সাইড (CaO)।"
                  : "Common ionic compounds include sodium chloride (NaCl) and calcium oxide (CaO)."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">NaCl</p>
                  <p className="text-sm">{lang === "bn" ? "Na⁺ + Cl⁻ → NaCl" : "Na⁺ + Cl⁻ → NaCl"}</p>
                </div>
                <div>
                  <p className="font-medium">CaO</p>
                  <p className="text-sm">{lang === "bn" ? "Ca²⁺ + O²⁻ → CaO" : "Ca²⁺ + O²⁻ → CaO"}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "আয়নিক বন্ধনের প্রয়োগ" : "Applications of Ionic Bonding"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "লবণ উৎপাদন" : "Salt production"}</li>
                  <li>• {lang === "bn" ? "সিরামিক তৈরি" : "Ceramic manufacturing"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "দৈনন্দিন জীবন" : "Daily Life"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "খাদ্য সংরক্ষণ (NaCl)" : "Food preservation (NaCl)"}</li>
                  <li>• {lang === "bn" ? "ব্যাটারি প্রযুক্তি" : "Battery technology"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ধাতু এবং অধাতুর মধ্যে বন্ধন।" : "Bonding between metals and non-metals."}</li>
                <li>• {lang === "bn" ? "চার্জ ভারসাম্য রক্ষা করুন।" : "Balance charges in compounds."}</li>
                <li>• {lang === "bn" ? "উচ্চ গলনাঙ্ক মনে রাখুন।" : "Remember high melting points."}</li>
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