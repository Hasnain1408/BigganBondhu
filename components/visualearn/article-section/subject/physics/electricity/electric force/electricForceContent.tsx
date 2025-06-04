"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectricForceContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বৈদ্যুতিক বল হল চার্জযুক্ত কণার মধ্যে আকর্ষণী বা বিকর্ষণী বল, যা কুলম্বের সূত্র দ্বারা নিয়ন্ত্রিত হয়। কুলম্বের সূত্র অনুসারে, দুটি চার্জের মধ্যে বল তাদের চার্জের গুণফলের সমানুপাতিক এবং তাদের মধ্যবর্তী দূরত্বের বর্গের বিপরীত সমানুপাতিক।\n\n
মূল বৈশিষ্ট্যসমূহ:
- কুলম্বের সূত্র: F = k * (|q₁q₂|/r²)
- আকর্ষণ/বিকর্ষণ: একই ধরনের চার্জ বিকর্ষণ করে, বিপরীত চার্জ আকর্ষণ করে
- বৈদ্যুতিক ক্ষেত্র: E = F/q
- কুলম্ব ধ্রুবক: k ≈ 8.99 × 10⁹ N·m²/C²
- প্রভাবকারী উপাদান: চার্জের পরিমাণ, দূরত্ব, এবং মাধ্যমের ধ্রুবক\n\n
বৈদ্যুতিক বলের প্রকারভেদ:
1. **ইলেক্ট্রোস্ট্যাটিক বল**: স্থির চার্জের মধ্যে ক্রিয়াশীল
2. **ইলেক্ট্রোডায়নামিক বল**: গতিশীল চার্জের ক্ষেত্রে প্রযোজ্য
3. **অন্তঃক্রিয়া**: কণার মধ্যে বলের মাত্রা এবং দিক নির্ভর করে চার্জের প্রকৃতির উপর\n\n
উদাহরণ:
- দুটি ইলেকট্রন বিকর্ষণ করে কারণ উভয়ই ঋণাত্মক চার্জ বহন করে
- একটি প্রোটন এবং একটি ইলেকট্রন আকর্ষণ করে কারণ তাদের চার্জ বিপরীত\n\n
প্রয়োগ:
- ইলেকট্রনিক ডিভাইস, ক্যাপাসিটর, এবং ইলেকট্রোস্ট্যাটিক প্রিন্টারে বৈদ্যুতিক বল গুরুত্বপূর্ণ।`
      : `Electric force is the attractive or repulsive force between charged particles, governed by Coulomb's law. According to Coulomb's law, the force between two charges is directly proportional to the product of their charges and inversely proportional to the square of the distance between them.\n\n
Key characteristics:
- Coulomb's law: F = k * (|q₁q₂|/r²)
- Attraction/Repulsion: Like charges repel, unlike charges attract
- Electric field: E = F/q
- Coulomb constant: k ≈ 8.99 × 10⁹ N·m²/C²
- Influencing factors: Charge magnitude, distance, and medium permittivity\n\n
Types of electric force:
1. **Electrostatic force**: Acts between stationary charges
2. **Electrodynamic force**: Applies to moving charges
3. **Interaction**: The magnitude and direction of the force depend on the nature of the charges\n\n
Examples:
- Two electrons repel each other due to their negative charges
- A proton and an electron attract due to their opposite charges\n\n
Applications:
- Electric force is critical in electronic devices, capacitors, and electrostatic printers.`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বৈদ্যুতিক বল" : "Electric Force"}
            </h3>
            <p>
              {lang === "bn"
                ? "বৈদ্যুতিক বল হল চার্জযুক্ত কণার মধ্যে আকর্ষণী বা বিকর্ষণী বল, যা কুলম্বের সূত্র দ্বারা নিয়ন্ত্রিত হয়।"
                : "The attractive or repulsive force between charged particles, governed by Coulomb's law."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "কুলম্বের সূত্র: F = k * (|q₁q₂|/r²)"
                  : "Coulomb's law: F = k * (|q₁q₂|/r²)"}
              </li>
              <li>
                {lang === "bn"
                  ? "আকর্ষণ/বিকর্ষণ: একই ধরনের চার্জ বিকর্ষণ করে, বিপরীত চার্জ আকর্ষণ করে"
                  : "Attraction/Repulsion: Like charges repel, unlike charges attract"}
              </li>
              <li>
                {lang === "bn"
                  ? "বৈদ্যুতিক ক্ষেত্র: E = F/q"
                  : "Electric field: E = F/q"}
              </li>
              <li>
                {lang === "bn"
                  ? "কুলম্ব ধ্রুবক: k ≈ 8.99 × 10⁹ N·m²/C²"
                  : "Coulomb constant: k ≈ 8.99 × 10⁹ N·m²/C²"}
              </li>
              <li>
                {lang === "bn"
                  ? "প্রভাবকারী উপাদান: চার্জের পরিমাণ, দূরত্ব, এবং মাধ্যমের ধ্রুবক"
                  : "Influencing factors: Charge magnitude, distance, and medium permittivity"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "বৈদ্যুতিক বলের প্রকারভেদ" : "Types of Electric Force"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ইলেক্ট্রোস্ট্যাটিক বল: স্থির চার্জের মডেহে ক্রিয়াশীল"
                  : "Electrostatic force: Acts between stationary charges"}
              </li>
              <li>
                {lang === "bn"
                  ? "ইলেক্ট্রোডায়নামিক বল: গতিশীল চার্জের ক্ষেত্রে প্রযোজ্য"
                  : "Electrodynamic force: Applies to moving charges"}
              </li>
              <li>
                {lang === "bn"
                  ? "অন্তঃক্রিয়া: বলের মাত্রা এবং দিক চার্জের প্রকৃতির উপর নির্ভর করে"
                  : "Interaction: The magnitude and direction depend on the nature of the charges"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "দুটি ইলেকট্রন বিকর্ষণ করে কারণ উভয়ই ঋণাত্মক চার্জ বহন করে"
                  : "Two electrons repel each other due to their negative charges"}
              </li>
              <li>
                {lang === "bn"
                  ? "একটি প্রোটন এবং একটি ইলেকট্রন আকর্ষণ করে কারণ তাদের চার্জ বিপরীত"
                  : "A proton and an electron attract due to their opposite charges"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ইলেকট্রনিক ডিভাইস: ট্রানজিস্টর এবং ইন্টিগ্রেটেড সার্কিটে বৈদ্যুতিক বল ব্যবহৃত হয়"
                  : "Electronic devices: Used in transistors and integrated circuits"}
              </li>
              <li>
                {lang === "bn"
                  ? "ক্যাপাসিটর: চার্জ সঞ্চয়ের জন্য বৈদ্যুতিক বল ব্যবহৃত হয়"
                  : "Capacitors: Electric force is used for charge storage"}
              </li>
              <li>
                {lang === "bn"
                  ? "ইলেকট্রোস্ট্যাটিক প্রিন্টার: কালি স্থানান্তরের জন্য বৈদ্যুতিক বল ব্যবহৃত হয়"
                  : "Electrostatic printers: Electric force is used for ink transfer"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  কুলম্বের সূত্র: F = k * (|q₁q₂|/r²) <br />
                  বৈদ্যুতিক ক্ষেত্র: E = F/q <br />
                  বৈদ্যুতিক ক্ষেত্র (বিন্দু চার্জ): E = k * (q/r²)
                </>
              ) : (
                <>
                  Coulomb's law: F = k * (|q₁q₂|/r²) <br />
                  Electric field: E = F/q <br />
                  Electric field (point charge): E = k * (q/r²)
                </>
              )}
            </p>
          </div>

          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

        <LanguageToggle lang={lang} setLang={setLang} />

        <TopicChatbot />
      </CardContent>
    </Card>
  )
}