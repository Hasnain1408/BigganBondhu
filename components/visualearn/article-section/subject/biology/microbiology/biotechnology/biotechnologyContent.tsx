"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function BiotechnologyContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `জৈবপ্রযুক্তি হল জীববিজ্ঞানের প্রয়োগ প্রযুক্তিতে।
শাখা:
- জিন সম্পাদনা
- টিস্যু কালচার
- রিকম্বিন্যান্ট ডিএনএ
প্রয়োগ:
- ঔষধ
- কৃষি
- শিল্প
ঝুঁকি:
- নৈতিক সমস্যা
- পরিবেশগত প্রভাব`
      : `Biotechnology is the application of biology in technology.
Branches:
- Gene Editing
- Tissue Culture
- Recombinant DNA
Applications:
- Medicine
- Agriculture
- Industry
Risks:
- Ethical Issues
- Environmental Impact`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "জৈবপ্রযুক্তি" : "Biotechnology"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "জৈবপ্রযুক্তি জীববিজ্ঞানের নীতি ব্যবহার করে পণ্য ও পরিষেবা উন্নয়ন করে। এটি ঔষধ, কৃষি এবং শিল্পে বিপ্লব ঘটিয়েছে, তবে নৈতিক ও পরিবেশগত চ্যালেঞ্জও উপস্থিত করে।"
                  : "Biotechnology uses biological principles to develop products and services. It has revolutionized medicine, agriculture, and industry, but also presents ethical and environmental challenges."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জৈবপ্রযুক্তি জীবন্ত প্রাণীর জিনগত উপাদান পরিবর্তন করে উন্নত ফলাফল অর্জন করে, যেমন রোগ প্রতিরোধী ফসল বা নতুন ঔষধ।"
                    : "Biotechnology manipulates living organisms' genetic material to achieve improved outcomes, such as disease-resistant crops or novel medicines."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জৈবপ্রযুক্তির শাখা" : "Branches of Biotechnology"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "জিন সম্পাদনা" : "Gene Editing"}</p>
                  <p className="text-sm">{lang === "bn" ? "নির্দিষ্ট জিন পরিবর্তন, যেমন CRISPR।" : "Targeted gene modification, e.g., CRISPR."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture"}</p>
                  <p className="text-sm">{lang === "bn" ? "কোষ বা টিস্যু ল্যাবে বৃদ্ধি।" : "Growth of cells or tissues in a lab."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA"}</p>
                  <p className="text-sm">{lang === "bn" ? "বিভিন্ন উৎস থেকে ডিএনএ সংযোজন।" : "Combining DNA from different sources."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জৈবপ্রযুক্তির প্রয়োগ" : "Applications of Biotechnology"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ঔষধ" : "Medicine"}</p>
                  <p className="text-sm">{lang === "bn" ? "ইনসুলিন, ভ্যাকসিন উৎপাদন।" : "Insulin, vaccine production."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "কৃষি" : "Agriculture"}</p>
                  <p className="text-sm">{lang === "bn" ? "জিনগতভাবে পরিবর্তিত ফসল।" : "Genetically modified crops."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "শিল্প" : "Industry"}</p>
                  <p className="text-sm">{lang === "bn" ? "জৈব জ্বালানি, এনজাইম।" : "Biofuels, enzymes."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ঝুঁকি ও চ্যালেঞ্জ" : "Risks and Challenges"}
            </h4>
            
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-3">
              <p className="text-red-700 dark:text-red-300">
                {lang === "bn"
                  ? "জৈবপ্রযুক্তি নৈতিক প্রশ্ন এবং পরিবেশের উপর সম্ভাব্য ক্ষতিকর প্রভাব সৃষ্টি করতে পারে।"
                  : "Biotechnology raises ethical questions and potential harmful environmental impacts."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "নৈতিক সমস্যা" : "Ethical Issues"}</p>
                  <p className="text-sm">{lang === "bn" ? "জিন সম্পাদনার নৈতিকতা।" : "Ethics of gene editing."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পরিবেশগত প্রভাব" : "Environmental Impact"}</p>
                  <p className="text-sm">{lang === "bn" ? "জৈববৈচিত্র্যের ক্ষতি।" : "Loss of biodiversity."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জিন থেরাপি" : "Gene therapy"}</li>
                  <li>• {lang === "bn" ? "ব্যক্তিগতকৃত ঔষধ" : "Personalized medicine"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "বায়োরিমিডিয়েশন" : "Bioremediation"}</li>
                  <li>• {lang === "bn" ? "জৈব জ্বালানি" : "Biofuels"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "CRISPR জিন সম্পাদনার একটি শক্তিশালী সরঞ্জাম।" : "CRISPR is a powerful gene-editing tool."}</li>
                <li>• {lang === "bn" ? "জিএমও ফসল খাদ্য নিরাপত্তা বাড়ায়।" : "GMO crops enhance food security."}</li>
                <li>• {lang === "bn" ? "নৈতিক বিবেচনা জৈবপ্রযুক্তির মূল বিষয়।" : "Ethical considerations are central to biotechnology."}</li>
                <li>• {lang === "bn" ? "বায়োরিমিডিয়েশন দূষণ পরিষ্কার করে।" : "Bioremediation cleans up pollution."}</li>
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