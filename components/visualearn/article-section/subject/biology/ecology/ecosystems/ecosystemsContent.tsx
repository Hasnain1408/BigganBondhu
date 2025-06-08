"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TopicChatbot from "@/components/visualearn/topic-chatbot";
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS";

export default function EcosystemsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  const plainText =
    lang === "bn"
      ? `ইকোসিস্টেম হল জীব ও পরিবেশের মিথস্ক্রিয়া।
প্রকার:
- স্থলজ
- জলজ
উপাদান:
- জৈবিক
- অজৈবিক
প্রক্রিয়া:
- শক্তি প্রবাহ
- পুষ্টি চক্র`
      : `An ecosystem is the interaction between living organisms and their environment.
Types:
- Terrestrial
- Aquatic
Components:
- Biotic
- Abiotic
Processes:
- Energy Flow
- Nutrient Cycling`;

  const { isPlaying, toggleAudio } = useTTS(plainText, lang);

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ইকোসিস্টেম" : "Ecosystems"}
            </h3>

            <div className="space-y-3">
              <div className="text-base">
                <p>
                  {lang === "bn"
                    ? "ইকোসিস্টেম জীব ও তাদের পরিবেশের মধ্যে গতিশীল মিথস্ক্রিয়া, জীবনকে টিকিয়ে রাখার জন্য ভারসাম্য প্রদান করে।"
                    : "Ecosystems are dynamic interactions between living organisms and their environment, providing balance to sustain life."}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ইকোসিস্টেম শক্তি প্রবাহ এবং পুষ্টি চক্রের মাধ্যমে জীবের বেঁচে থাকা এবং পরিবেশের ভারসাম্য বজায় রাখে।"
                    : "Ecosystems sustain life through energy flow and nutrient cycling, maintaining ecological stability."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইকোসিস্টেমের প্রকার" : "Types of Ecosystems"}
            </h4>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "স্থলজ" : "Terrestrial"}</p>
                  <p className="text-sm">{lang === "bn" ? "বন, তৃণভূমি।" : "Forests, grasslands."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "জলজ" : "Aquatic"}</p>
                  <p className="text-sm">{lang === "bn" ? "মহাসাগর, হ্রদ।" : "Oceans, lakes."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইকোসিস্টেমের উপাদান" : "Components of Ecosystems"}
            </h4>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "জৈবিক" : "Biotic"}</p>
                  <p className="text-sm">{lang === "bn" ? "উদ্ভিদ, প্রাণী।" : "Plants, animals."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "অজৈবিক" : "Abiotic"}</p>
                  <p className="text-sm">{lang === "bn" ? "পানি, আলো।" : "Water, light."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রক্রিয়া" : "Processes"}
            </h4>

            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "শক্তি প্রবাহ" : "Energy Flow"}</p>
                  <p className="text-sm">{lang === "bn" ? "উৎপাদক থেকে গ্রাহক।" : "Producer to consumer."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পুষ্টি চক্র" : "Nutrient Cycling"}</p>
                  <p className="text-sm">{lang === "bn" ? "পুষ্টি পুনঃচক্রণ।" : "Recycling nutrients."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "পরিবেশ সংরক্ষণ" : "Conservation"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জৈববৈচিত্র্য রক্ষা" : "Biodiversity protection"}</li>
                  <li>• {lang === "bn" ? "ইকোসিস্টেম পুনরুদ্ধার" : "Ecosystem restoration"}</li>
                </ul>
              </div>

              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "টেকসই কৃষি" : "Sustainable farming"}</li>
                  <li>• {lang === "bn" ? "মাটির স্বাস্থ্য" : "Soil health management"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "উৎপাদক শক্তির ভিত্তি।" : "Producers are the base of ecosystems."}</li>
                <li>• {lang === "bn" ? "শক্তি প্রবাহ একমুখী।" : "Energy flow is unidirectional."}</li>
                <li>• {lang === "bn" ? "পুষ্টি চক্র বন্ধ।" : "Nutrient cycling is closed."}</li>
                <li>• {lang === "bn" ? "জৈবিক এবং অজৈবিক উপাদান ভারসাম্য রাখে।" : "Biotic and abiotic factors balance ecosystems."}</li>
              </ul>
            </div>
          </div>

          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

        <LanguageToggle lang={lang} setLang={setLang} />
        <TopicChatbot />
      </CardContent>
    </Card>
  );
}
