"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function AcidBaseTheoriesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `অ্যাসিড-বেস তত্ত্বগুলি অ্যাসিড এবং বেসের আচরণ ব্যাখ্যা করে, যার মধ্যে আর্রেনিয়াস, ব্রনস্টেড-লোরি, এবং লুইস তত্ত্ব অন্তর্ভুক্ত।
মূল ধারণা:
- অ্যাসিড: প্রোটন দানকারী বা ইলেকট্রন জোড় গ্রহণকারী।
- বেস: প্রোটন গ্রহণকারী বা ইলেকট্রন জোড় দানকারী।
আর্রেনিয়াস তত্ত্ব:
- অ্যাসিড: জলে H⁺ উৎপন্ন করে।
- বেস: জলে OH⁻ উৎপন্ন করে।
- সীমাবদ্ধতা: শুধুমাত্র জলীয় দ্রবণে প্রযোজ্য।
ব্রনস্টেড-লোরি তত্ত্ব:
- অ্যাসিড: প্রোটন (H⁺) দানকারী।
- বেস: প্রোটন গ্রহণকারী।
- উদাহরণ: NH₃ + HCl → NH₄⁺ + Cl⁻।
লুইস তত্ত্ব:
- অ্যাসিড: ইলেকট্রন জোড় গ্রহণকারী।
- বেস: ইলেকট্রন জোড় দানকারী।
- উদাহরণ: BF₃ + NH₃ → F₃B:NH₃।
উদাহরণ:
- হাইড্রোক্লোরিক অ্যাসিড: HCl (আর্রেনিয়াস, ব্রনস্টেড-লোরি)।
- অ্যামোনিয়া: NH₃ (ব্রনস্টেড-লোরি, লুইস)।
প্রয়োগ:
- রাসায়নিক বিশ্লেষণ: অ্যাসিড-বেস টাইট্রেশন।
- শিল্প: অ্যাসিড-বেস প্রতিক্রিয়া উৎপাদনে।
- জীববিজ্ঞান: pH নিয়ন্ত্রণ।
টিপস:
- তত্ত্বের সীমাবদ্ধতা বুঝুন।
- প্রোটন এবং ইলেকট্রন স্থানান্তর চিহ্নিত করুন।
- উদাহরণ দিয়ে তত্ত্ব প্রয়োগ করুন।`
      : `Acid-base theories explain the behavior of acids and bases, including Arrhenius, Brønsted-Lowry, and Lewis theories.
Key Concepts:
- Acid: Proton donor or electron pair acceptor.
- Base: Proton acceptor or electron pair donor.
Arrhenius Theory:
- Acid: Produces H⁺ in water.
- Base: Produces OH⁻ in water.
- Limitation: Applies only to aqueous solutions.
Brønsted-Lowry Theory:
- Acid: Proton (H⁺) donor.
- Base: Proton acceptor.
- Example: NH₃ + HCl → NH₄⁺ + Cl⁻.
Lewis Theory:
- Acid: Electron pair acceptor.
- Base: Electron pair donor.
- Example: BF₃ + Jabber → F₃B:NH₃.
Examples:
- Hydrochloric Acid: HCl (Arrhenius, Brønsted-Lowry).
- Ammonia: NH₃ (Brønsted-Lowry, Lewis).
Applications:
- Chemical Analysis: Acid-base titrations.
- Industry: Acid-base reactions in production.
- Biology: pH regulation.
Tips:
- Understand theory limitations.
- Identify proton or electron transfers.
- Apply theories to examples.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "অ্যাসিড-বেস তত্ত্ব" : "Acid-Base Theories"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "অ্যাসিড-বেস তত্ত্ব অ্যাসিড এবং বেসের আচরণ ব্যাখ্যা করে।"
                  : "Acid-base theories define the characteristics and reactions of acids and bases."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "আর্রেনিয়াস তত্ত্ব" : "Arrhenius Theory"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জলীয় দ্রবণে অ্যাসিড H⁺ এবং বেস OH⁻ উৎপন্ন করে।"
                    : "Acids produce H⁺ and bases produce OH⁻ in aqueous solutions."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্রনস্টেড-লোরি তত্ত্ব" : "Brønsted-Lowry Theory"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "অ্যাসিড প্রোটন দান করে এবং বেস প্রোটন গ্রহণ করে।"
                  : "Acids donate protons, and bases accept protons."}
              </p>
              <p className="text-sm">
                {lang === "bn" ? "উদাহরণ: NH₃ + HCl → NH₄⁺ + Cl⁻।" : "Example: NH₃ + HCl → NH₄⁺ + Cl⁻."}
              </p>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "লুইস তত্ত্ব" : "Lewis Theory"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "অ্যাসিড ইলেকট্রন জোড় গ্রহণ করে এবং বেস ইলেকট্রন জোড় দান করে।"
                  : "Acids accept electron pairs, and bases donate electron pairs."}
              </p>
              <p className="text-sm">
                {lang === "bn" ? "উদাহরণ: BF₃ + NH₃ → F₃B:NH₃।" : "Example: BF₃ + NH₃ → F₃B:NH₃."}
              </p>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ অ্যাসিড-বেস তত্ত্ব বোঝায়।"
                  : "Practical examples illustrate acid-base theories."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "HCl" : "HCl"}</p>
                  <p className="text-sm">{lang === "bn" ? "আর্রেনিয়াস, ব্রনস্টেড-লোরি।" : "Arrhenius, Brønsted-Lowry."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "NH₃" : "NH₃"}</p>
                  <p className="text-sm">{lang === "bn" ? "ব্রনস্টেড-লোরি, লুইস।" : "Brønsted-Lowry, Lewis."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "রাসায়নিক বিশ্লেষণ" : "Chemical Analysis"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "টাইট্রেশন" : "Titrations"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "উৎপাদন প্রক্রিয়া" : "Production processes"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "জীববিজ্ঞান" : "Biology"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "pH নিয়ন্ত্রণ" : "pH regulation"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "তত্ত্বের সীমাবদ্ধতা বুঝুন।" : "Understand theory limitations."}</li>
                <li>• {lang === "bn" ? "প্রোটন স্থানান্তর চিহ্নিত করুন।" : "Identify proton transfers."}</li>
                <li>• {lang === "bn" ? "তত্ত্ব প্রয়োগ করুন।" : "Apply theories to examples."}</li>
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