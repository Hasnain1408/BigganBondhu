"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function HydrocarbonsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `হাইড্রোকার্বন হল জৈব যৌগ যা শুধুমাত্র কার্বন এবং হাইড্রোজেন দিয়ে গঠিত। এগুলি জৈব রসায়নের মূল ভিত্তি এবং জ্বালানি, প্লাস্টিক এবং ওষুধের কাঁচামাল হিসেবে ব্যবহৃত হয়।
প্রধান শ্রেণী:
- অ্যালকেন: শুধুমাত্র একক বন্ধন (যেমন, মিথেন, ইথেন)।
- অ্যালকিন: ডাবল বন্ধন (যেমন, ইথিন, প্রোপিন)।
- অ্যালকাইন: ট্রিপল বন্ধন (যেমন, ইথাইন, প্রোপাইন)।
- অ্যারোমেটিক: বেনজিন রিং (যেমন, বেনজিন, টলুইন)।
মূল ধারণা:
- হাইড্রোকার্বনের গঠন তাদের রাসায়নিক বৈশিষ্ট্য নির্ধারণ করে।
- অসম্পৃক্ত হাইড্রোকার্বন (অ্যালকিন, অ্যালকাইন) বিক্রিয়াশীল।
- অ্যারোমেটিক যৌগ বিশেষ স্থিতিশীলতা প্রদর্শন করে।`
      : `Hydrocarbons are organic compounds composed solely of carbon and hydrogen. They form the backbone of organic chemistry and are used as fuels, plastics, and pharmaceutical precursors.
Key Classes:
- Alkanes: Single bonds only (e.g., methane, ethane).
- Alkenes: Double bonds (e.g., ethene, propene).
- Alkynes: Triple bonds (e.g., ethyne, propyne).
- Aromatic: Benzene ring (e.g., benzene, toluene).
Key Concepts:
- Hydrocarbon structure determines chemical properties.
- Unsaturated hydrocarbons (alkenes, alkynes) are reactive.
- Aromatic compounds exhibit special stability.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "হাইড্রোকার্বন" : "Hydrocarbons"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "হাইড্রোকার্বন হল জৈব রসায়নের মৌলিক যৌগ, যা শুধুমাত্র কার্বন এবং হাইড্রোজেন পরমাণু নিয়ে গঠিত। এগুলি প্রাকৃতিক গ্যাস, পেট্রোলিয়াম এবং অন্যান্য জ্বালানির প্রধান উপাদান এবং প্লাস্টিক, রাবার এবং ওষুধ শিল্পে গুরুত্বপূর্ণ ভূমিকা পালন করে।"
                  : "Hydrocarbons are the fundamental compounds of organic chemistry, consisting only of carbon and hydrogen atoms. They are the primary components of natural gas, petroleum, and other fuels, and play a critical role in the plastics, rubber, and pharmaceutical industries."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "হাইড্রোকার্বনের গঠন এবং বন্ধন তাদের ভৌত এবং রাসায়নিক বৈশিষ্ট্য নির্ধারণ করে, যা তাদের শিল্প ও দৈনন্দিন ব্যবহারের জন্য গুরুত্বপূর্ণ।"
                    : "The structure and bonding of hydrocarbons determine their physical and chemical properties, which are crucial for their industrial and everyday applications."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অ্যালকান" : "Alkanes"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "অ্যালকানে শুধুমাত্র কার্বন-কার্বন এবং কার্বন-হাইড্রজেন একক বন্ধন থাকে। এগুলি সাধারণত অপেক্ষাকৃত অবিক্রিয়াশীল এবং জ্বালানি হিসেবে ব্যবহৃত হয়।"
                  : "Alkanes contain only single carbon-carbon and carbon-hydrogen bonds. They are relatively unreactive and are commonly used as fuels."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "সাধারণ সূত্র: CₙH₂ₙ₊₂" : "General formula: CₙH₂ₙ+₂"}</li>
                <li>• {lang === "bn" ? "উদাহরণ: মিথেন (CH₄), ইথেন (C₂H₆)" : "Examples: Methane (CH₄), Ethane (C₂H₆)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: জ্বালানি, দ্রাবক" : "Uses: Fuels, solvents"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অ্যালকিন" : "Alkenes"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "অ্যালকিনে অন্তত একটি কার্বন-কার্বন ডাবল বন্ধন থাকে। এগুলি অ্যালকানের তুলনায় বেশি বিক্রিয়াশীল এবং পলিমার উৎপাদনে ব্যবহৃত হয়।"
                  : "Alkenes contain at least one carbon-carbon double bond. They are more reactive than alkanes and are used in polymer production."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "সাধারণ সূত্র: CₙH₂ₙ" : "General formula: CₙH₂ₙ"}</li>
                <li>• {lang === "bn" ? "উদাহরণ: ইথেন (C₂H₄), প্রোকিন (C₃H₆)" : "Examples: Ethene (C₂H₄), Propene (C₃H₆)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: প্লাস্টিক, সিন্থেটিক ফাইবার" : "Uses: Plastics, synthetic fibers"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অ্যালকাইন" : "Alkynes"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "অ্যালকাইনে অন্তত একটি কার্বন-কার্বন ট্রিপল বন্ধন থাকে। এগুলি অত্যন্ত বিক্রিয়াশীল এবং জৈব সংশ্লেষণে ব্যবহৃত হয়।"
                  : "Alkynes contain at least one carbon-carbon triple bond. They are highly reactive and used in organic synthesis."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "সাধারণ সূত্র: CₙH₂ₙ-₂" : "General formula: CₙH₂ₙ-₂"}</li>
                <li>• {lang === "bn" ? "উদাহরণ: ইথাইন (C₂H₂), প্রোপাইন (C₃H₄)" : "Examples: Ethyne (C₂H₂), Propyne (C₃H₄)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: ওয়েল্ডিং, রাসায়নিক সংশ্লেষণ" : "Uses: Welding, chemical synthesis"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অ্যারোমেটিক হাইড্রোকার্বন" : "Aromatic Hydrocarbons"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "অ্যারোমেটিক হাইড্রোকার্বনে বেন্জিন রিং থাকে, যা তাদের বিশেষ স্থিতিশীলতা প্রদান করে। এগুলি ওষুধ এবং রঙ শিল্পে ব্যবহৃত হয়।"
                  : "Aromatic hydrocarbons contain a benzene ring, providing unique stability. They are used in pharmaceuticals and dyes."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "উদাহরণ: বেনজিন (C₆H₆), টলুইন (C₇H₈)" : "Examples: Benzene (C₆H₆), Toluene (C₇H₈)"}</li>
                <li>• {lang === "bn" ? "বৈশিষ্ট্য: স্থিতিশীল, সুগন্ধযুক্ত" : "Properties: Stable, aromatic"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: দ্রাবক, ওষুধ" : "Uses: Solvents, pharmaceuticals"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জ্বালানি উৎপাদন" : "Fuel production"}</li>
                  <li>• {lang === "bn" ? "পলিমার উৎপাদন" : "Polymer production"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "Daily Life" : "Daily Life"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "প্লাস্টিক পণ্য" : "Plastic products"}</li>
                  <li>• {lang === "bn" ? "রান্নার গ্যাস" : "Cooking gas"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "অ্যালকান অবিক্রিয়াশীল, অ্যালকিন ও অ্যালকাইন বিক্রিয়াশীল।" : "Alkanes are unreactive; alkenes and alkynes are reactive."}</li>
                <li>• {lang === "bn" ? "অ্যারোমেটিক যৌগের স্থিতিশীলতা মনে রাখুন।" : "Remember the stability of aromatic compounds."}</li>
                <li>• {lang === "bn" ? "সাধারণ সূত্রগুলো মুখস্থ করুন।" : "Memorize general formulas."}</li>
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