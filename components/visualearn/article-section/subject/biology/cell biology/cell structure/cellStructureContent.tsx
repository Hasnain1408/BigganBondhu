"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function CellStructureContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কোষ গঠন হল জীবের মৌলিক একক।
প্রকার:
- প্রোক্যারিওটিক
- ইউক্যারিওটিক
উপাদান:
- নিউক্লিয়াস
- ঝিল্লি
- অর্গানেল
কাজ:
- বিপাক
- প্রজনন
- সংকেত`
      : `Cell structure is the basic unit of life.
Types:
- Prokaryotic
- Eukaryotic
Components:
- Nucleus
- Membrane
- Organelles
Functions:
- Metabolism
- Reproduction
- Signaling`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কোষ গঠন" : "Cell Structure"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কোষ হল জীবনের মৌলিক কাঠামো এবং কার্যকরী একক, যা জীবনের সমস্ত প্রক্রিয়া সমর্থন করে।"
                  : "Cells are the basic structural and functional unit of life, supporting all life processes."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কোষ জীবনের সমস্ত ক্রিয়াকলাপের জন্য দায়ী, যেমন শক্তি উৎপাদন, বৃদ্ধি এবং প্রজনন।"
                    : "Cells are responsible for all life activities, including energy production, growth, and reproduction."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোষের প্রকার" : "Types of Cells"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রোক্যারিওটিক" : "Prokaryotic"}</p>
                  <p className="text-sm">{lang === "bn" ? "নিউক্লিয়াস নেই।" : "No nucleus."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ইউক্যারিওটিক" : "Eukaryotic"}</p>
                  <p className="text-sm">{lang === "bn" ? "নিউক্লিয়াস আছে।" : "Has nucleus."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোষের উপাদান" : "Cell Components"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "নিউক্লিয়াস" : "Nucleus"}</p>
                  <p className="text-sm">{lang === "bn" ? "জিনগত তথ্য।" : "Genetic information."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ঝিল্লি" : "Membrane"}</p>
                  <p className="text-sm">{lang === "bn" ? "সুরক্ষা, পরিবহন।" : "Protection, transport."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অর্গানেল" : "Organelles"}</p>
                  <p className="text-sm">{lang === "bn" ? "নির্দিষ্ট কাজ।" : "Specific functions."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোষের কাজ" : "Cell Functions"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বিপাক" : "Metabolism"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তি উৎপাদন।" : "Energy production."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রজনন" : "Reproduction"}</p>
                  <p className="text-sm">{lang === "bn" ? "কোষ বিভাজন।" : "Cell division."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সংকেত" : "Signaling"}</p>
                  <p className="text-sm">{lang === "bn" ? "যোগাযোগ।" : "Communication."}</p>
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
                  <li>• {lang === "bn" ? "স্টেম সেল থেরাপি" : "Stem cell therapy"}</li>
                  <li>• {lang === "bn" ? "ক্যান্সার গবেষণা" : "Cancer research"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "বায়োটেক" : "Biotechnology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জিন সম্পাদনা" : "Gene editing"}</li>
                  <li>• {lang === "bn" ? "সিনথেটিক বায়োলজি" : "Synthetic biology"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রোক্যারিওট ব্যাকটেরিয়া।" : "Prokaryotes include bacteria."}</li>
                <li>• {lang === "bn" ? "ইউক্যারিওটে নিউক্লিয়াস থাকে।" : "Eukaryotes have a nucleus."}</li>
                <li>• {lang === "bn" ? "মাইটোকন্ড্রিয়া শক্তি উৎপন্ন করে।" : "Mitochondria produce energy."}</li>
                <li>• {lang === "bn" ? "ঝিল্লি কোষ নিয়ন্ত্রণ করে।" : "Membrane regulates the cell."}</li>
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