"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PhotosynthesisContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `আলোকসংশ্লেষণ হল উদ্ভিদের খাদ্য তৈরির প্রক্রিয়া।
উপাদান:
- সূর্যালোক
- ক্লোরোফিল
- কার্বন ডাই অক্সাইড
- পানি
প্রক্রিয়া:
- আলোক নির্ভর প্রতিক্রিয়া
- আলোক স্বাধীন প্রতিক্রিয়া
ফলাফল:
- গ্লুকোজ
- অক্সিজেন`
      : `Photosynthesis is the process by which plants make food.
Components:
- Sunlight
- Chlorophyll
- Carbon Dioxide
- Water
Process:
- Light-dependent Reactions
- Light-independent Reactions
Products:
- Glucose
- Oxygen`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আলোকসংশ্লেষণ" : "Photosynthesis"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "আলোকসংশ্লেষণ উদ্ভিদের একটি গুরুত্বপূর্ণ প্রক্রিয়া যা সূর্যালোক ব্যবহার করে খাদ্য উৎপাদন করে এবং পরিবেশে অক্সিজেন সরবরাহ করে।"
                  : "Photosynthesis is a vital process in plants that uses sunlight to produce food and supplies oxygen to the environment."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "আলোকসংশ্লেষণ সূর্যের শক্তিকে রাসায়নিক শক্তিতে রূপান্তর করে, গ্লুকোজ তৈরি করে এবং অক্সিজেন নির্গত করে।"
                    : "Photosynthesis converts solar energy into chemical energy, producing glucose and releasing oxygen."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "আলোকসংশ্লেষণের উপাদান" : "Components of Photosynthesis"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সূর্যালোক" : "Sunlight"}</p>
                  <p className="text-sm">{lang === "bn" ? "শক্তির উৎস।" : "Energy source."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ক্লোরোফিল" : "Chlorophyll"}</p>
                  <p className="text-sm">{lang === "bn" ? "আলো শোষণ করে।" : "Absorbs light."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "কার্বন ডাই অক্সাইড" : "Carbon Dioxide"}</p>
                  <p className="text-sm">{lang === "bn" ? "কাঁচামাল।" : "Raw material."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পানি" : "Water"}</p>
                  <p className="text-sm">{lang === "bn" ? "ইলেক্ট্রন সরবরাহ।" : "Electron supply."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "আলোকসংশ্লেষণের প্রক্রিয়া" : "Process of Photosynthesis"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "আলোক নির্ভর প্রতিক্রিয়া" : "Light-dependent Reactions"}</p>
                  <p className="text-sm">{lang === "bn" ? "ATP, NADPH উৎপন্ন।" : "Produces ATP, NADPH."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "আলোক স্বাধীন প্রতিক্রিয়া" : "Light-independent Reactions"}</p>
                  <p className="text-sm">{lang === "bn" ? "গ্লুকোজ তৈরি।" : "Produces glucose."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ফলাফল" : "Products"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গ্লুকোজ" : "Glucose"}</p>
                  <p className="text-sm">{lang === "bn" ? "উদ্ভিদের খাদ্য।" : "Plant food."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অক্সিজেন" : "Oxygen"}</p>
                  <p className="text-sm">{lang === "bn" ? "পরিবেশে মুক্তি।" : "Released into environment."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "ফসল উৎপাদন বৃদ্ধি" : "Crop yield enhancement"}</li>
                  <li>• {lang === "bn" ? "জৈব জ্বালানি" : "Biofuels"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "কার্বন হ্রাস" : "Carbon reduction"}</li>
                  <li>• {lang === "bn" ? "অক্সিজেন উৎপাদন" : "Oxygen production"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ক্লোরোফিল সবুজ আলো শোষণ করে।" : "Chlorophyll absorbs green light."}</li>
                <li>• {lang === "bn" ? "ক্যালভিন চক্র গ্লুকোজ তৈরি করে।" : "Calvin cycle produces glucose."}</li>
                <li>• {lang === "bn" ? "অক্সিজেন পানি থেকে আসে।" : "Oxygen comes from water."}</li>
                <li>• {lang === "bn" ? "সূর্যালোক শক্তি সরবরাহ করে।" : "Sunlight provides energy."}</li>
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