"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectricChargeContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বৈদ্যুতিক চার্জ হল পদার্থের একটি মৌলিক ধর্ম যা বৈদ্যুতিক ও চৌম্বকীয় শক্তির উৎস।
মূল বৈশিষ্ট্যসমূহ:
- দুই প্রকার চার্জ: ধনাত্মক (+) ও ঋণাত্মক (-)
- একই ধরনের চার্জ পরস্পরকে বিকর্ষণ করে
- বিপরীত চার্জ পরস্পরকে আকর্ষণ করে
- চার্জ সংরক্ষণশীল - সৃষ্টি বা ধ্বংস হয় না
সূত্রাবলী:
- কুলম্বের সূত্র: F = k(q₁q₂)/r²
- বৈদ্যুতিক ক্ষেত্র: E = F/q = kQ/r²
- বৈদ্যুতিক বিভব: V = kQ/r`
      : `Electric charge is a fundamental property of matter that is the source of electric and magnetic forces.
Key characteristics:
- Two types: Positive (+) and Negative (-)
- Like charges repel each other
- Opposite charges attract each other
- Charge is conserved - cannot be created or destroyed
- Measured in Coulombs (C)
Formulas:
- Coulomb's Law: F = k(q₁q₂)/r²
- Electric Field: E = F/q = kQ/r²
- Electric Potential: V = kQ/r`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বৈদ্যুতিক চার্জ" : "Electric Charge"}
            </h3>
            <p>
              {lang === "bn"
                ? "বৈদ্যুতিক চার্জ হল পদার্থের একটি মৌলিক ধর্ম যা বৈদ্যুতিক ও চৌম্বকীয় শক্তির উৎস।"
                : "A fundamental property of matter that is the source of electric and magnetic forces in nature."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "দুই প্রকার চার্জ: ধনাত্মক (+) ও ঋণাত্মক (-)"
                  : "Two types of charge: Positive (+) and Negative (-)"}
              </li>
              <li>
                {lang === "bn"
                  ? "একই ধরনের চার্জ পরস্পরকে বিকর্ষণ করে"
                  : "Like charges repel each other"}
              </li>
              <li>
                {lang === "bn"
                  ? "বিপরীত চার্জ পরস্পরকে আকর্ষণ করে"
                  : "Opposite charges attract each other"}
              </li>
              <li>
                {lang === "bn"
                  ? "চার্জ সংরক্ষণশীল - সৃষ্টি বা ধ্বংস হয় না"
                  : "Charge is conserved - cannot be created or destroyed"}
              </li>
              <li>
                {lang === "bn"
                  ? "একক: কুলম্ব (C)"
                  : "Unit: Coulomb (C)"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  কুলম্বের সূত্র: F = k(q₁q₂)/r² <br />
                  বৈদ্যুতিক ক্ষেত্র: E = F/q = kQ/r² <br />
                  বৈদ্যুতিক বিভব: V = kQ/r <br />
                  কুলম্ব ধ্রুবক: k = 9.0 × 10⁹ N⋅m²/C²
                </>
              ) : (
                <>
                  Coulomb's Law: F = k(q₁q₂)/r² <br />
                  Electric Field: E = F/q = kQ/r² <br />
                  Electric Potential: V = kQ/r <br />
                  Coulomb constant: k = 9.0 × 10⁹ N⋅m²/C²
                </>
              )}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "দৈনন্দিন উদাহরণ" : "Everyday Examples"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "কাপড়ে ঘর্ষণের ফলে স্থির বিদ্যুৎ"
                  : "Static electricity from rubbing clothes"}
              </li>
              <li>
                {lang === "bn"
                  ? "বজ্রপাত - বায়ুমণ্ডলীয় চার্জ নিঃসরণ"
                  : "Lightning - atmospheric charge discharge"}
              </li>
              <li>
                {lang === "bn"
                  ? "ব্যাটারি - রাসায়নিক শক্তি থেকে বিদ্যুৎ"
                  : "Batteries - chemical energy to electrical energy"}
              </li>
            </ul>
          </div>

          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

        <LanguageToggle lang={lang} setLang={setLang} />

        <TopicChatbot />
      </CardContent>
    </Card>
  )
}