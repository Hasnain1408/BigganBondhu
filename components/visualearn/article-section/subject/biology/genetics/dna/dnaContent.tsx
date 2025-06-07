"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function DNAContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ডিএনএ (ডিঅক্সিরাইবোনিউক্লিক অ্যাসিড) হল জীবের জিনগত তথ্য বহনকারী অণু। এটি একটি ডাবল হেলিক্স গঠন যা দুটি স্পাইরাল স্ট্র্যান্ড নিয়ে গঠিত।
মূল বৈশিষ্ট্যসমূহ:
- ডাবল হেলিক্স গঠন
- নিউক্লিওটাইড দিয়ে গঠিত
- হাইড্রোজেন বন্ধন দ্বারা সংযুক্ত
- অ্যান্টি-প্যারালাল স্ট্র্যান্ড
- ক্রোমাটিনে সংগঠিত
নিউক্লিওটাইড উপাদান:
- ফসফেট গ্রুপ
- ডিঅক্সিরাইবোজ সুগার
- নাইট্রোজেনাস বেস (A, T, C, G)
বেস জোড়া:
- A = T (দুটি হাইড্রোজেন বন্ধন)
- G ≡ C (তিনটি হাইড্রোজেন বন্ধন)`
      : `DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information in living organisms. It has a double helix structure formed by two spiraling strands.
Key characteristics:
- Double helix structure
- Composed of nucleotides
- Connected by hydrogen bonds
- Anti-parallel strands
- Organized into chromatin
Nucleotide components:
- Phosphate group
- Deoxyribose sugar
- Nitrogenous base (A, T, C, G)
Base pairing:
- A = T (two hydrogen bonds)
- G ≡ C (three hydrogen bonds)`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ডিএনএ গঠন" : "DNA Structure"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ডিএনএ (ডিঅক্সিরাইবোনিউক্লিক অ্যাসিড) হল জীবের জিনগত তথ্যের প্রধান বাহক। এটি একটি ডাবল হেলিক্স গঠন যা ১৯৫৩ সালে ওয়াটসন এবং ক্রিক দ্বারা প্রস্তাবিত হয়। ডিএনএ জীবের বৃদ্ধি, বিকাশ এবং প্রজননের জন্য নির্দেশাবলী ধারণ করে।"
                  : "DNA (Deoxyribonucleic Acid) is the primary carrier of genetic information in living organisms. It has a double helix structure, proposed by Watson and Crick in 1953. DNA contains instructions for growth, development, and reproduction."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ডিএনএ দুটি পলিনিউক্লিওটাইড স্ট্র্যান্ড নিয়ে গঠিত যা একটি ডাবল হেলিক্স গঠন করে। প্রতিটি স্ট্র্যান্ড নিউক্লিওটাইডের পুনরাবৃত্ত ইউনিট দিয়ে গঠিত, এবং এই স্ট্র্যান্ডগুলি হাইড্রোজেন বন্ধনের মাধ্যমে সংযুক্ত।"
                    : "DNA consists of two polynucleotide strands forming a double helix. Each strand is made of repeating nucleotide units, and these strands are connected by hydrogen bonds."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "নিউক্লিওটাইড গঠন" : "Nucleotide Structure"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p>
                {lang === "bn"
                  ? "প্রতিটি নিউক্লিওটাইড তিনটি উপাদান নিয়ে গঠিত: একটি ফসফেট গ্রুপ, একটি ডিঅক্সিরাইবোজ সুগার এবং একটি নাইট্রোজেনাস বেস।"
                  : "Each nucleotide consists of three components: a phosphate group, a deoxyribose sugar, and a nitrogenous base."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "ফসফেট গ্রুপ" : "Phosphate Group"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "ডিএনএর মেরুদণ্ড গঠন করে।" : "Forms the backbone of DNA."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "ডিঅক্সিরাইবোজ সুগার" : "Deoxyribose Sugar"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "পাঁচ কার্বন বিশিষ্ট শর্করা অণু।" : "A five-carbon sugar molecule."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "নাইট্রোজেনাস বেস" : "Nitrogenous Base"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "এডেনিন (A), থাইমিন (T), সাইটোসিন (C), গুয়ানিন (G)।" : "Adenine (A), Thymine (T), Cytosine (C), Guanine (G)."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডাবল হেলিক্স গঠন" : "Double Helix Structure"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "ডিএনএর দুটি স্ট্র্যান্ড অ্যান্টি-প্যারালাল, অর্থাৎ একটি স্ট্র্যান্ড 5' থেকে 3' এবং অপরটি 3' থেকে 5' দিকে চলে। এটি একটি ঘূর্ণিত সিঁড়ির মতো গঠন তৈরি করে।"
                  : "The two DNA strands are anti-parallel, meaning one strand runs 5' to 3' and the other 3' to 5'. This creates a twisted ladder-like structure."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "মেজর গ্রুভ" : "Major Groove"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিনের সাথে মিথস্ক্রিয়ার জন্য বৃহত্তর ফাঁক।" : "Larger gap for protein interactions."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "মাইনর গ্রুভ" : "Minor Groove"}</p>
                  <p className="text-sm">{lang === "bn" ? "ছোট ফাঁক, কম অ্যাক্সেসযোগ্য।" : "Smaller gap, less accessible."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "বেস জোড়া এবং হাইড্রোজেন বন্ধন" : "Base Pairing and Hydrogen Bonds"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p>
                {lang === "bn"
                  ? "ডিএনএর স্ট্র্যান্ডগুলি নির্দিষ্ট বেস জোড়ার মাধ্যমে সংযুক্ত থাকে: এডেনিন (A) থাইমিন (T) এর সাথে এবং গুয়ানিন (G) সাইটোসিন (C) এর সাথে।"
                  : "DNA strands are connected by specific base pairing: Adenine (A) pairs with Thymine (T), and Guanine (G) pairs with Cytosine (C)."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono">A = T</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "দুটি হাইড্রোজেন বন্ধন" : "Two hydrogen bonds"}
                  </p>
                </div>
                <div>
                  <p className="font-mono">G ≡ C</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "তিনটি হাইড্রোজেন বন্ধন" : "Three hydrogen bonds"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডিএনএর প্যাকেজিং" : "DNA Packaging"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "ডিএনএ কোষের নিউক্লিয়াসে ক্রোমাটিন হিসেবে সংগঠিত হয়। এটি হিস্টোন প্রোটিনের চারপাশে পাকিয়ে নিউক্লিওসোম গঠন করে।"
                  : "DNA is organized into chromatin within the cell nucleus. It wraps around histone proteins to form nucleosomes."}
              </p>
              <div className="space-y-2">
                <p className="font-medium">{lang === "bn" ? "নিউক্লিওসোম" : "Nucleosome"}</p>
                <p className="text-sm">{lang === "bn" ? "ডিএনএ হিস্টোন অষ্টকের চারপাশে ১.৬৫ বার পাকানো।" : "DNA wrapped around a histone octamer 1.65 times."}</p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডিএনএর প্রকার" : "Types of DNA"}
            </h4>
            
            <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg space-y-3">
              <p className="text-teal-700 dark:text-teal-300">
                {lang === "bn"
                  ? "ডিএনএ বিভিন্ন রূপে পাওয়া যায়, যেমন B-DNA, A-DNA, এবং Z-DNA। B-DNA সবচেয়ে সাধারণ।"
                  : "DNA exists in different forms, such as B-DNA, A-DNA, and Z-DNA. B-DNA is the most common."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">B-DNA</p>
                  <p className="text-sm">{lang === "bn" ? "ডান-হাতি হেলিক্স, সাধারণ জৈবিক রূপ।" : "Right-handed helix, common biological form."}</p>
                </div>
                <div>
                  <p className="font-medium">A-DNA</p>
                  <p className="text-sm">{lang === "bn" ? "ডান-হাতি, কম জলযুক্ত অবস্থায়।" : "Right-handed, in dehydrated conditions."}</p>
                </div>
                <div>
                  <p className="font-medium">Z-DNA</p>
                  <p className="text-sm">{lang === "bn" ? "বাম-হাতি হেলিক্স, নির্দিষ্ট ক্রমে।" : "Left-handed helix, in specific sequences."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জৈবিক গুরুত্ব" : "Biological Importance"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "জিনগত তথ্য সংরক্ষণ" : "Genetic Information Storage"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জিনের ক্রম সংরক্ষণ" : "Stores gene sequences"}</li>
                  <li>• {lang === "bn" ? "প্রোটিন সংশ্লেষণের নির্দেশ" : "Guides protein synthesis"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রতিলিপি এবং প্রতিরূপণ" : "Transcription and Replication"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "ডিএনএ প্রতিরূপণ" : "DNA replication"}</li>
                  <li>• {lang === "bn" ? "আরএনএ সংশ্লেষণ" : "RNA synthesis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ডিএনএর বেস জোড়া নির্দিষ্ট: A-T, G-C" : "DNA base pairing is specific: A-T, G-C"}</li>
                <li>• {lang === "bn" ? "ডাবল হেলিক্স ডান-হাতি (B-DNA)" : "Double helix is right-handed (B-DNA)"}</li>
                <li>• {lang === "bn" ? "অ্যান্টি-প্যারালাল স্ট্র্যান্ড মনে রাখুন" : "Remember anti-parallel strands"}</li>
                <li>• {lang === "bn" ? "হিস্টোন প্রোটিন ডিএনএ প্যাকেজিংয়ে সহায়ক" : "Histone proteins aid DNA packaging"}</li>
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