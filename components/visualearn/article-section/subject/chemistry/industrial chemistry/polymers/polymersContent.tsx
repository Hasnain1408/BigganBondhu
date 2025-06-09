
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PolymersContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পলিমার হল বড় অণু যা মনোমার নামক পুনরাবৃত্তি সাবইউনিট দিয়ে তৈরি।
মূল ধারণা:
- মনোমার: পলিমার তৈরির মৌলিক ইউনিট।
- পলিমারাইজেশন: মনোমারের সংযোগ প্রক্রিয়া।
প্রকার:
- প্রাকৃতিক: সেলুলোজ, প্রোটিন।
- কৃত্রিম: পলিইথিলিন, নাইলন।
পলিমারাইজেশন প্রক্রিয়া:
- যোগ পলিমারাইজেশন: ডাবল বন্ড ভেঙে সংযোগ।
- ঘনীভবন পলিমারাইজেশন: ছোট অণু নির্গত হয়।
বৈশিষ্ট্য:
- উচ্চ আণবিক ভর, নমনীয়তা, শক্তি।
- তাপমাত্রা ও রাসায়নিক প্রতিরোধ।
উদাহরণ:
- পলিইথিলিন: প্লাস্টিক ব্যাগ।
- পলিভিনাইল ক্লোরাইড (PVC): পাইপ।
প্রয়োগ:
- শিল্প: প্যাকেজিং, নির্মাণ।
- চিকিৎসা: প্রস্থেটিকস, ড্রাগ ডেলিভারি।
- দৈনন্দিন: কাপড়, পাত্র।
টিপস:
- মনোমার এবং পলিমারের গঠন বুঝুন।
- পলিমারাইজেশন প্রক্রিয়া চিহ্নিত করুন।
- বৈশিষ্ট্য এবং প্রয়োগের সম্পর্ক বুঝুন।`
      : `Polymers are large molecules composed of repeating subunits called monomers.
Key Concepts:
- Monomer: Basic building blocks of polymers.
- Polymerization: Process of linking monomers.
Types:
- Natural: Cellulose, proteins.
- Synthetic: Polyethylene, nylon.
Polymerization Processes:
- Addition Polymerization: Breaking double bonds to link.
- Condensation Polymerization: Releases small molecules.
Properties:
- High molecular weight, flexibility, strength.
- Resistance to heat and chemicals.
Examples:
- Polyethylene: Plastic bags.
- Polyvinyl Chloride (PVC): Pipes.
Applications:
- Industry: Packaging, construction.
- Medicine: Prosthetics, drug delivery.
- Daily Life: Clothing, containers.
Tips:
- Understand monomer and polymer structures.
- Identify polymerization processes.
- Relate properties to applications.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "পলিমার" : "Polymers"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পলিমার বড় অণু যা মনোমার দিয়ে তৈরি।"
                  : "Polymers are large molecules made of monomers."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "মনোমার পলিমারের মৌলিক ইউনিট।"
                    : "Monomers are the building blocks of polymers."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রকার" : "Types"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পলিমার প্রাকৃতিক বা কৃত্রিম হতে পারে।"
                  : "Polymers can be natural or synthetic."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "প্রাকৃতিক" : "Natural"}</strong>: 
                  {lang === "bn" ? "সেলুলোজ, প্রোটিন।" : "Cellulose, proteins."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "কৃত্রিম" : "Synthetic"}</strong>: 
                  {lang === "bn" ? "পলিইথিলিন, নাইলন।" : "Polyethylene, nylon."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পলিমারাইজেশন" : "Polymerization"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "মনোমার সংযোগের প্রক্রিয়া।"
                  : "Process of linking monomers."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "যোগ" : "Addition"}</strong>: 
                  {lang === "bn" ? "ডাবল বন্ড ভেঙে।" : "Breaks double bonds."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ঘনীভবন" : "Condensation"}</strong>: 
                  {lang === "bn" ? "ছোট অণু নির্গত।" : "Releases small molecules."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ পলিমার বোঝায়।"
                  : "Practical examples illustrate polymers."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "পলিইথিলিন" : "Polyethylene"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্লাস্টিক ব্যাগ।" : "Plastic bags."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "PVC" : "PVC"}</p>
                  <p className="text-sm">{lang === "bn" ? "পাইপ।" : "Pipes."}</p>
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
                  <li>• {lang === "bn" ? "প্যাকেজিং" : "Packaging"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "প্রস্থেটিকস" : "Prosthetics"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "দৈনন্দিন" : "Daily Life"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "কাপড়" : "Clothing"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "মনোমার গঠন বুঝুন।" : "Understand monomer structure."}</li>
                <li>• {lang === "bn" ? "পলিমারাইজেশন চিহ্নিত করুন।" : "Identify polymerization."}</li>
                <li>• {lang === "bn" ? "প্রয়োগের সম্পর্ক বুঝুন।" : "Relate to applications."}</li>
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
