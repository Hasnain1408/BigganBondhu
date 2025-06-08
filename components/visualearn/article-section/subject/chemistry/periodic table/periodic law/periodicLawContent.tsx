"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PeriodicLawContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পর্যায় সূত্র বলে যে মৌলগুলির বৈশিষ্ট্য তাদের পারমাণবিক সংখ্যার পর্যায়বৃত্ত ফাংশন, যা পর্যায় সারণীতে পুনরাবৃত্ত নিদর্শন সৃষ্টি করে। এই সূত্রটি মৌলগুলির শ্রেণীবদ্ধকরণ এবং তাদের বৈশিষ্ট্যের পূর্বাভাস দেওয়ার ভিত্তি।
ইতিহাস:
- দিমিত্রি মেন্ডেলিভ: ১৮৬৯ সালে পর্যায় সারণী তৈরি করেন, পারমাণবিক ভরের উপর ভিত্তি করে।
- হেনরি মোসলি: ১৯১৩ সালে পারমাণবিক সংখ্যার উপর ভিত্তি করে সূত্রটি সংশোধন করেন।
মূল ধারণা:
- পর্যায়বৃত্তি: বৈশিষ্ট্য যেমন পারমাণবিক ব্যাসার্ধ, আয়নীকরণ শক্তি নিয়মিত বিরতিতে পুনরাবৃত্ত হয়।
- গ্রুপ এবং পর্যায়: গ্রুপে একই ভ্যালেন্স ইলেকট্রন, পর্যায়ে একই শক্তি স্তর।
প্রধান বৈশিষ্ট্য:
- পারমাণবিক ব্যাসার্ধ: পর্যায়ে বাম থেকে ডানে কমে, গ্রুপে উপর থেকে নিচে বাড়ে।
- আয়নীকরণ শক্তি: পর্যায়ে বাম থেকে ডানে বাড়ে, গ্রুপে নিচে কমে।
- তড়িৎ ঋণাত্মকতা: পর্যায়ে বাম থেকে ডানে বাড়ে।
উদাহরণ:
- গ্রুপ ১: Li, Na, K একই প্রতিক্রিয়াশীলতা দেখায়।
- পর্যায় ২: Li থেকে Ne পর্যন্ত বৈশিষ্ট্য পরিবর্তন।
প্রয়োগ:
- মৌলের বৈশিষ্ট্য পূর্বাভাস: নতুন মৌল আবিষ্কার।
- রাসায়নিক যৌগ গঠন: বন্ধন প্রকৃতি বোঝা।
- শিল্প ও প্রযুক্তি: মৌল নির্বাচন।
টিপস:
- পারমাণবিক সংখ্যা মনে রাখুন।
- পর্যায় এবং গ্রুপের প্রবণতা বুঝুন।
- মেন্ডেলিভের সারণী অধ্যয়ন করুন।`
      : `Periodic Law states that the properties of elements are a periodic function of their atomic numbers, resulting in recurring patterns in the periodic table. This law forms the basis for classifying elements and predicting their properties.
History:
- Dmitri Mendeleev: Developed the periodic table in 1869 based on atomic mass.
- Henry Moseley: Refined the law in 1913 using atomic numbers.
Key Concepts:
- Periodicity: Properties like atomic radius and ionization energy repeat at regular intervals.
- Groups and Periods: Groups have similar valence electrons, periods share the same energy level.
Key Characteristics:
- Atomic Radius: Decreases left to right across a period, increases top to bottom in a group.
- Ionization Energy: Increases left to right across a period, decreases down a group.
- Electronegativity: Increases left to right across a period.
Examples:
- Group 1: Li, Na, K exhibit similar reactivity.
- Period 2: Properties change from Li to Ne.
Applications:
- Predicting Element Properties: Discovering new elements.
- Chemical Bonding: Understanding bond nature.
- Industry and Technology: Selecting elements.
Tips:
- Memorize atomic numbers.
- Understand period and group trends.
- Study Mendeleev’s table.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পর্যায় সূত্র" : "Periodic Law"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পর্যায় সূত্র মৌলগুলির বৈশিষ্ট্যের পর্যায়বৃত্ত পুনরাবৃত্তি বোঝায়, যা পর্যায় সারণীর ভিত্তি।"
                  : "Periodic Law explains the periodic repetition of element properties, forming the foundation of the periodic table."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "ইতিহাস" : "History"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "দিমিত্রি মেন্ডেলিভ এবং হেনরি মোসলি পর্যায় সূত্রের বিকাশে গুরুত্বপূর্ণ ভূমিকা পালন করেন।"
                    : "Dmitri Mendeleev and Henry Moseley played key roles in developing Periodic Law."}
                </p>
                <ul className="text-sm space-y-1">
                  <li>• {lang === "bn" ? "১৮৬৯: মেন্ডেলিভের সারণী।" : "1869: Mendeleev’s table."}</li>
                  <li>• {lang === "bn" ? "১৯১৩: মোসলির সংশোধন।" : "1913: Moseley’s refinement."}</li>
                </ul>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পর্যায়বৃত্তি এবং গ্রুপ/পর্যায়ের বিন্যাস মৌলগুলির বৈশিষ্ট্য বোঝায়।"
                  : "Periodicity and group/period arrangements explain element properties."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "পর্যায়বৃত্তি" : "Periodicity"}</strong>: 
                  {lang === "bn" ? "বৈশিষ্ট্য নিয়মিত বিরতিতে পুনরাবৃত্ত হয়।" : "Properties repeat at regular intervals."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গ্রুপ" : "Groups"}</strong>: 
                  {lang === "bn" ? "একই ভ্যালেন্স ইলেকট্রন।" : "Same valence electrons."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "পর্যায়" : "Periods"}</strong>: 
                  {lang === "bn" ? "একই শক্তি স্তর।" : "Same energy level."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান বৈশিষ্ট্য" : "Key Characteristics"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "পর্যায় সূত্র বৈশিষ্ট্যের প্রবণতা বোঝায়।"
                  : "Periodic Law explains property trends."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "পারমাণবিক ব্যাসার্ধ" : "Atomic Radius"}</strong>: 
                  {lang === "bn" ? "পর্যায়ে কমে, গ্রুপে বাড়ে।" : "Decreases across period, increases down group."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "আয়নীকরণ শক্তি" : "Ionization Energy"}</strong>: 
                  {lang === "bn" ? "পর্যায়ে বাড়ে, গ্রুপে কমে।" : "Increases across period, decreases down group."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "তড়িৎ ঋণাত্মকতা" : "Electronegativity"}</strong>: 
                  {lang === "bn" ? "পর্যায়ে বাড়ে।" : "Increases across period."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "পর্যায় সূত্রের প্রয়োগ মৌলের আচরণ বোঝায়।"
                  : "Applications of Periodic Law illustrate element behavior."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গ্রুপ ১" : "Group 1"}</p>
                  <p className="text-sm">{lang === "bn" ? "Li, Na, K একই প্রতিক্রিয়াশীলতা।" : "Li, Na, K show similar reactivity."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পর্যায় ২" : "Period 2"}</p>
                  <p className="text-sm">{lang === "bn" ? "Li থেকে Ne বৈশিষ্ট্য পরিবর্তন।" : "Properties change from Li to Ne."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "মৌল আবিষ্কার" : "Element Discovery"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "নতুন মৌল পূর্বাভাস" : "Predict new elements"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "রাসায়নিক বন্ধন" : "Chemical Bonding"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "বন্ধন প্রকৃতি বোঝা" : "Understand bond nature"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "মৌল নির্বাচন" : "Element selection"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "পারমাণবিক সংখ্যা মনে রাখুন।" : "Memorize atomic numbers."}</li>
                <li>• {lang === "bn" ? "প্রবণতা বুঝুন।" : "Understand trends."}</li>
                <li>• {lang === "bn" ? "সারণী অধ্যয়ন করুন।" : "Study the table."}</li>
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