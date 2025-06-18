

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PhysicalVsChemChangesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ভৌত এবং রাসায়নিক পরিবর্তন পদার্থের রূপান্তর বর্ণনা করে।
মূল ধারণা:
- ভৌত পরিবর্তন: গঠন অপরিবর্তিত থাকে।
- রাসায়নিক পরিবর্তন: নতুন পদার্থ তৈরি হয়।
প্রকার:
- ভৌত: যেমন, বরফ গলা।
- রাসায়নিক: যেমন, মরিচা পড়া।
বৈশিষ্ট্য:
- ভৌত: প্রায়শই বিপরীতমুখী।
- রাসায়নিক: নতুন রাসায়নিক বন্ধন।
উদাহরণ:
- ভৌত: পানি জমে বরফ।
- রাসায়নিক: কাঠ পোড়ানো।
প্রয়োগ:
- শিল্প: পদার্থ প্রক্রিয়াকরণ।
- জীবন: রান্না, হজম।
- পরিবেশ: পুনর্ব্যবহার।
টিপস:
- বৈশিষ্ট্য চিহ্নিত করুন।
- নতুন পদার্থ পরীক্ষা করুন।
- পরিবর্তন বিশ্লেষণ করুন।`
      : `Physical and chemical changes describe transformations of matter.
Key Concepts:
- Physical Change: Composition remains unchanged.
- Chemical Change: New substances form.
Types:
- Physical: E.g., melting ice.
- Chemical: E.g., rusting iron.
Properties:
- Physical: Often reversible.
- Chemical: New chemical bonds.
Examples:
- Physical: Water freezing to ice.
- Chemical: Burning wood.
Applications:
- Industry: Material processing.
- Life: Cooking, digestion.
- Environment: Recycling.
Tips:
- Identify properties.
- Check for new substances.
- Analyze transformations.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ভৌত বনাম রাসায়নিক পরিবর্তন" : "Physical vs Chemical Changes"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পদার্থের রূপ বা গঠনে পরিবর্তন হয়।"
                  : "Matter changes in form or composition."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ভৌত পরিবর্তনে গঠন অপরিবর্তিত, রাসায়নিকে নতুন পদার্থ।"
                    : "Physical changes keep composition; chemical changes form new substances."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পরিবর্তন ভৌত বা রাসায়নিক হতে পারে।"
                  : "Changes can be physical or chemical."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "ভৌত" : "Physical"}</strong>: 
                  {lang === "bn" ? "বরফ গলা।" : "Melting ice."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "রাসায়নিক" : "Chemical"}</strong>: 
                  {lang === "bn" ? "মরিচা পড়া।" : "Rusting iron."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ পরিবর্তন বোঝায়।"
                  : "Practical examples illustrate changes."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ভৌত" : "Physical"}</p>
                  <p className="text-sm">{lang === "bn" ? "পানি জমে বরফ।" : "Water to ice."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রাসায়নিক" : "Chemical"}</p>
                  <p className="text-sm">{lang === "bn" ? "কাঠ পোড়ানো।" : "Burning wood."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "পদার্থ প্রক্রিয়াকরণ" : "Material processing"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "জীবন" : "Life"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "রান্না, হজম" : "Cooking, digestion"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "পুনর্ব্যবহার" : "Recycling"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "বৈশিষ্ট্য চিহ্নিত করুন।" : "Identify properties."}</li>
                <li>• {lang === "bn" ? "নতুন পদার্থ পরীক্ষা।" : "Check for new substances."}</li>
                <li>• {lang === "bn" ? "পরিবর্তন বিশ্লেষণ।" : "Analyze transformations."}</li>
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
