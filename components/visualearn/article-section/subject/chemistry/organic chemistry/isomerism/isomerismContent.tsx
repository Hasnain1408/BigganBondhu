"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function IsomerismContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `আইসোমেরিজম এমন যৌগগুলিকে বোঝায় যাদের আণবিক সূত্র একই কিন্তু গঠন বা স্থানিক বিন্যাস ভিন্ন, যা তাদের ভিন্ন বৈশিষ্ট্য প্রদান করে।
মূল ধারণা:
- আইসোমার: একই আণবিক সূত্র কিন্তু ভিন্ন গঠন।
- প্রকার: গঠনগত এবং স্টেরিওআইসোমেরিজম।
গঠনগত আইসোমেরিজম:
- শৃঙ্খল আইসোমেরিজম: কার্বন শৃঙ্খলের ভিন্ন বিন্যাস।
- অবস্থান আইসোমেরিজম: কার্যকরী গ্রুপের ভিন্ন অবস্থান।
- কার্যকরী গ্রুপ আইসোমেরিজম: ভিন্ন কার্যকরী গ্রুপ।
স্টেরিওআইসোমেরিজম:
- জ্যামিতিক আইসোমেরিজম: ডাবল বন্ডের চারপাশে স্থানিক বিন্যাস।
- অপটিক্যাল আইসোমেরিজম: কাইরাল কেন্দ্রের কারণে আলোর পোলারাইজেশন।
উদাহরণ:
- বিউটেন: n-বিউটেন এবং আইসোবিউটেন (শৃঙ্খল আইসোমেরিজম)।
- প্রোপানল: ১-প্রোপানল এবং ২-প্রোপানল (অবস্থান আইসোমেরিজম)।
- ল্যাকটিক অ্যাসিড: ডান এবং বাম হাতের কাইরাল আইসোমার (অপটিক্যাল)।
প্রয়োগ:
- ফার্মাসিউটিক্যাল: ওষুধের কার্যকারিতা আইসোমারের উপর নির্ভর করে।
- খাদ্য শিল্প: স্বাদ এবং গন্ধ ভিন্ন আইসোমারের জন্য।
- রাসায়নিক সংশ্লেষণ: নির্দিষ্ট আইসোমার উৎপাদন।
টিপস:
- আণবিক সূত্র চেক করুন।
- গঠন এবং স্থানিক বিন্যাস তুলনা করুন।
- কাইরাল কেন্দ্র সনাক্ত করুন।`
      : `Isomerism refers to compounds with the same molecular formula but different structural or spatial arrangements, resulting in distinct properties.
Key Concepts:
- Isomers: Same molecular formula, different structures.
- Types: Structural and stereoisomerism.
Structural Isomerism:
- Chain Isomerism: Different carbon chain arrangements.
- Positional Isomerism: Different positions of functional groups.
- Functional Group Isomerism: Different functional groups.
Stereoisomerism:
- Geometric Isomerism: Spatial arrangement around double bonds.
- Optical Isomerism: Due to chiral centers affecting light polarization.
Examples:
- Butane: n-Butane and isobutane (chain isomerism).
- Propanol: 1-Propanol and 2-propanol (positional isomerism).
- Lactic Acid: Right- and left-handed chiral isomers (optical).
Applications:
- Pharmaceuticals: Drug efficacy depends on specific isomers.
- Food Industry: Flavor and aroma vary with isomers.
- Chemical Synthesis: Producing specific isomers.
Tips:
- Check molecular formulas.
- Compare structures and spatial arrangements.
- Identify chiral centers.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আইসোমেরিজম" : "Isomerism"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "আইসোমেরিজম এমন যৌগ বোঝায় যাদের আণবিক সূত্র একই কিন্তু গঠন ভিন্ন।"
                  : "Isomerism refers to compounds with identical molecular formulas but different structures."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "আইসোমারগুলি ভিন্ন বৈশিষ্ট্য প্রদর্শন করে গঠন বা স্থানিক বিন্যাসের জন্য।"
                    : "Isomers exhibit different properties due to structural or spatial variations."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গঠনগত আইসোমেরিজম" : "Structural Isomerism"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "গঠনগত আইসোমারগুলির মধ্যে কার্বন শৃঙ্খল বা কার্যকরী গ্রুপের বিন্যাস ভিন্ন।"
                  : "Structural isomers differ in carbon chain or functional group arrangement."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "শৃঙ্খল" : "Chain"}</strong>: 
                  {lang === "bn" ? "কার্বন শৃঙ্খলের ভিন্নতা।" : "Different carbon chains."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "অবস্থান" : "Positional"}</strong>: 
                  {lang === "bn" ? "কার্যকরী গ্রুপের অবস্থান।" : "Functional group position."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "স্টেরিওআইসোমেরিজম" : "Stereoisomerism"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "স্টেরিওআইসোমারগুলি স্থানিক বিন্যাসে ভিন্ন।"
                  : "Stereoisomers differ in spatial arrangement."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "জ্যামিতিক" : "Geometric"}</strong>: 
                  {lang === "bn" ? "ডাবল বন্ডের বিন্যাস।" : "Double bond arrangement."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "অপটিক্যাল" : "Optical"}</strong>: 
                  {lang === "bn" ? "কাইরাল কেন্দ্র।" : "Chiral centers."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ আইসোমেরিজম বোঝায়।"
                  : "Practical examples illustrate isomerism."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বিউটেন" : "Butane"}</p>
                  <p className="text-sm">{lang === "bn" ? "n-বিউটেন এবং আইসোবিউটেন।" : "n-Butane and isobutane."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ল্যাকটিক অ্যাসিড" : "Lactic Acid"}</p>
                  <p className="text-sm">{lang === "bn" ? "কাইরাল আইসোমার।" : "Chiral isomers."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "ফার্মাসিউটিক্যাল" : "Pharmaceuticals"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "ওষুধের কার্যকারিতা" : "Drug efficacy"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "খাদ্য শিল্প" : "Food Industry"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "স্বাদ এবং গন্ধ" : "Flavor and aroma"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "রাসায়নিক সংশ্লেষণ" : "Chemical Synthesis"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "নির্দিষ্ট আইসোমার" : "Specific isomers"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "আণবিক সূত্র চেক করুন।" : "Check molecular formulas."}</li>
                <li>• {lang === "bn" ? "গঠন তুলনা করুন।" : "Compare structures."}</li>
                <li>• {lang === "bn" ? "কাইরাল কেন্দ্র সনাক্ত করুন।" : "Identify chiral centers."}</li>
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