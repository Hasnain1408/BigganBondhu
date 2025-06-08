"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function FunctionalGroupsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কার্যকরী গ্রুপ হল অণুর মধ্যে নির্দিষ্ট পরমাণুর গ্রুপ যা তাদের বৈশিষ্ট্যপূর্ণ রাসায়নিক বিক্রিয়ার জন্য দায়ী।
প্রধান কার্যকরী গ্রুপ:
- হাইড্রক্সিল (-OH): অ্যালকোহল, যেমন ইথানল।
- কার্বনিল (>C=O): কিটোন এবং অ্যালডিহাইড।
- কার্বক্সিল (-COOH): কার্বক্সিলিক অ্যাসিড।
- অ্যামিন (-NH₂): অ্যামিন যৌগ।
- ডাবল এবং ট্রিপল বন্ধন: অ্যালকিন এবং অ্যালকাইন।
মূল ধারণা:
- কার্যকরী গ্রুপ অণুর বিক্রিয়াশীলতা নির্ধারণ করে।
- বিভিন্ন গ্রুপ বিভিন্ন শিল্পে ব্যবহৃত হয়, যেমন ওষুধ এবং প্লাস্টিক।
- গ্রুপের গঠন রাসায়নিক বৈশিষ্ট্য নিয়ন্ত্রণ করে।`
      : `Functional groups are specific groups of atoms within molecules responsible for their characteristic chemical reactions.
Key Functional Groups:
- Hydroxyl (-OH): Alcohols, e.g., ethanol.
- Carbonyl (>C=O): Ketones and aldehydes.
- Carboxyl (-COOH): Carboxylic acids.
- Amine (-NH₂): Amine compounds.
- Double and triple bonds: Alkenes and alkynes.
Key Concepts:
- Functional groups determine a molecule’s reactivity.
- Different groups are used in various industries, like pharmaceuticals and plastics.
- The structure of the group governs chemical properties.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কার্যকরী গ্রুপ" : "Functional Groups"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কার্যকরী গ্রুপ হল জৈব অণুর মধ্যে নির্দিষ্ট পরমাণু বা বন্ধনের গ্রুপ যা তাদের রাসায়নিক বৈশিষ্ট্য এবং বিক্রিয়াশীলতা নির্ধারণ করে। এগুলি জৈব রসায়নের মূল ভিত্তি এবং ওষুধ, প্লাস্টিক, এবং খাদ্য শিল্পে গুরুত্বপূর্ণ ভূমিকা পালন করে।"
                  : "Functional groups are specific groups of atoms or bonds within organic molecules that determine their chemical properties and reactivity. They form the cornerstone of organic chemistry and play a vital role in pharmaceuticals, plastics, and food industries."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কার্যকরী গ্রুপ অণুর রাসায়নিক আচরণ নিয়ন্ত্রণ করে এবং তাদের শ্রেণীবিভাগে সহায়তা করে।"
                    : "Functional groups control a molecule’s chemical behavior and aid in their classification."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "হাইড্রক্সিল গ্রুপ (-OH)" : "Hydroxyl Group (-OH)"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "হাইড্রক্সিল গ্রুপ অ্যালকোহল যৌগ গঠন করে। এটি পানিতে দ্রবণীয়তা বাড়ায় এবং হাইড্রোজেন বন্ধন গঠন করে।"
                  : "The hydroxyl group forms alcohols. It increases water solubility and forms hydrogen bonds."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "উদাহরণ: ইথানল (C₂H₅OH)" : "Example: Ethanol (C₂H₅OH)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: দ্রাবক, জীবাণুনাশক" : "Uses: Solvent, disinfectant"}</li>
                <li>• {lang === "bn" ? "বৈশিষ্ট্য: মেরু, হাইড্রোজেন বন্ধন" : "Properties: Polar, hydrogen bonding"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কার্বনিল গ্রুপ (>C=O)" : "Carbonyl Group (>C=O)"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "কার্বনিল গ্রুপ কিটোন এবং অ্যালডিহাইড গঠন করে। এটি মেরু এবং বিক্রিয়াশীল।"
                  : "The carbonyl group forms ketones and aldehydes. It is polar and reactive."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "উদাহরণ: অ্যাসিটোন (CH₃COCH₃)" : "Example: Acetone (CH₃COCH₃)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: দ্রাবক, রাসায়নিক সংশ্লেষণ" : "Uses: Solvent, chemical synthesis"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কার্বক্সিল গ্রুপ (-COOH)" : "Carboxyl Group (-COOH)"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "কার্বক্সিল গ্রুপ কার্বক্সিলিক অ্যাসিড গঠন করে। এটি অম্লীয় এবং হাইড্রোজেন বন্ধন গঠন করে।"
                  : "The carboxyl group forms carboxylic acids. It is acidic and forms hydrogen bonds."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "উদাহরণ: অ্যাসিটিক অ্যাসিড (CH₃COOH)" : "Example: Acetic acid (CH₃COOH)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: খাদ্য, ওষুধ" : "Uses: Food, pharmaceuticals"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অ্যামিন গ্রুপ (-NH₂)" : "Amine Group (-NH₂)"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "অ্যামিন গ্রুপ অ্যামিন যৌগ গঠন করে। এটি ক্ষারীয় এবং জৈব সংশ্লেষণে ব্যবহৃত হয়।"
                  : "The amine group forms amines. It is basic and used in organic synthesis."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "উদাহরণ: মিথাইলঅ্যামিন (CH₃NH₂)" : "Example: Methylamine (CH₃NH₂)"}</li>
                <li>• {lang === "bn" ? "ব্যবহার: ওষুধ, কীটনাশক" : "Uses: Pharmaceuticals, pesticides"}</li>
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
                  <li>• {lang === "bn" ? "ওষুধ উৎপাদন" : "Pharmaceutical production"}</li>
                  <li>• {lang === "bn" ? "পলিমার সংশ্লেষণ" : "Polymer synthesis"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "দৈনন্দিন জীবন" : "Daily Life"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "খাদ্য সংযোজন" : "Food additives"}</li>
                  <li>• {lang === "bn" ? "প্রসাধনী" : "Cosmetics"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কার্যকরী গ্রুপের গঠন মুখস্থ করুন।" : "Memorize the structure of functional groups."}</li>
                <li>• {lang === "bn" ? "প্রতিটি গ্রুপের বিক্রিয়াশীলতা বুঝুন।" : "Understand the reactivity of each group."}</li>
                <li>• {lang === "bn" ? "হাইড্রক্সিল এবং কার্বক্সিল গ্রুপ মেরু।" : "Hydroxyl and carboxyl groups are polar."}</li>
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