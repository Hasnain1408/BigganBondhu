"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function BoylesLawContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বয়লের সূত্র বলে যে স্থির তাপমাত্রায়, গ্যাসের চাপ তার আয়তনের বিপরীত সমানুপাতিক। এর অর্থ, চাপ বাড়লে আয়তন কমে এবং চাপ কমলে আয়তন বাড়ে।
মূল ধারণা:
- সমীকরণ: P₁V₁ = P₂V₂, যেখানে P চাপ এবং V আয়তন।
- স্থির তাপমাত্রা: সূত্রটি কেবল তখনই প্রযোজ্য যখন তাপমাত্রা অপরিবর্তিত থাকে।
- গ্যাস কণা: চাপ বৃদ্ধি কণার সংঘর্ষ বাড়ায়।
ইতিহাস:
- রবার্ট বয়ল: ১৬৬২ সালে এই সূত্র প্রতিষ্ঠা করেন।
প্রধান বৈশিষ্ট্য:
- বিপরীত সম্পর্ক: চাপ এবং আয়তনের মধ্যে বিপরীত সম্পর্ক।
- আদর্শ গ্যাস: সূত্রটি আদর্শ গ্যাসের জন্য সবচেয়ে সঠিক।
- ইউনিট: চাপ (প্যাসকেল), আয়তন (লিটার)।
উদাহরণ:
- সিরিঞ্জ: সিরিঞ্জ টিপলে আয়তন কমে, চাপ বাড়ে।
- ডাইভিং: গভীর জলে চাপ বাড়ে, বাতাসের আয়তন কমে।
প্রয়োগ:
- চিকিৎসায়: শ্বাসযন্ত্রে গ্যাস সংকোচন।
- শিল্পে: গ্যাস সিলিন্ডারে সংক্ষেপণ।
- পরিবহনে: টায়ারে বাতাসের চাপ।
টিপস:
- তাপমাত্রা স্থির রাখুন।
- ইউনিট রূপান্তরে সতর্ক থাকুন।
- সমীকরণটি সঠিকভাবে ব্যবহার করুন।`
      : `Boyle’s Law states that at constant temperature, the pressure of a gas is inversely proportional to its volume. This means as pressure increases, volume decreases, and vice versa.
Key Concepts:
- Equation: P₁V₁ = P₂V₂, where P is pressure and V is volume.
- Constant Temperature: The law applies only when temperature remains constant.
- Gas Particles: Increased pressure results in more particle collisions.
History:
- Robert Boyle: Established the law in 1662.
Key Characteristics:
- Inverse Relationship: Pressure and volume are inversely related.
- Ideal Gas: The law is most accurate for ideal gases.
- Units: Pressure (Pascals), volume (liters).
Examples:
- Syringe: Pressing a syringe decreases volume, increasing pressure.
- Diving: Deeper water increases pressure, reducing air volume.
Applications:
- Medicine: Gas compression in ventilators.
- Industry: Gas storage in cylinders.
- Transportation: Air pressure in tires.
Tips:
- Keep temperature constant.
- Be careful with unit conversions.
- Use the equation correctly.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বয়লের সূত্র" : "Boyle’s Law"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "বয়লের সূত্র গ্যাসের চাপ এবং আয়তনের বিপরীত সম্পর্ক বোঝায়, যা স্থির তাপমাত্রায় প্রযোজ্য।"
                  : "Boyle’s Law describes the inverse relationship between gas pressure and volume at constant temperature."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "ইতিহাস" : "History"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "রবার্ট বয়ল ১৬৬২ সালে পরীক্ষার মাধ্যমে এই সূত্র প্রতিষ্ঠা করেন।"
                    : "Robert Boyle established this law through experiments in 1662."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "বয়লের সূত্র চাপ এবং আয়তনের সম্পর্ক বোঝায়।"
                  : "Boyle’s Law explains the relationship between pressure and volume."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "সমীকরণ" : "Equation"}</strong>: 
                  {lang === "bn" ? "P₁V₁ = P₂V₂।" : "P₁V₁ = P₂V₂."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "স্থির তাপমাত্রা" : "Constant Temperature"}</strong>: 
                  {lang === "bn" ? "তাপমাত্রা অপরিবর্তিত থাকতে হবে।" : "Temperature must remain constant."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গ্যাস কণা" : "Gas Particles"}</strong>: 
                  {lang === "bn" ? "চাপ বাড়লে সংঘর্ষ বাড়ে।" : "More collisions with increased pressure."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান বৈশিষ্ট্য" : "Key Characteristics"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "বয়লের সূত্র গ্যাসের আচরণের বিপরীত সম্পর্ক বোঝায়।"
                  : "Boyle’s Law explains the inverse behavior of gases."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "বিপরীত সম্পর্ক" : "Inverse Relationship"}</strong>: 
                  {lang === "bn" ? "চাপ বাড়লে আয়তন কমে।" : "Pressure up, volume down."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ইউনিট" : "Units"}</strong>: 
                  {lang === "bn" ? "চাপ: প্যাসকেল, আয়তন: লিটার।" : "Pressure: Pascals, Volume: Liters."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ বয়লের সূত্র বোঝায়।"
                  : "Practical examples illustrate Boyle’s Law."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "সিরিঞ্জ" : "Syringe"}</p>
                  <p className="text-sm">{lang === "bn" ? "টিপলে আয়তন কমে, চাপ বাড়ে।" : "Pressing reduces volume, increases pressure."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ডাইভিং" : "Diving"}</p>
                  <p className="text-sm">{lang === "bn" ? "গভীরে চাপ বাড়ে, আয়তন কমে।" : "Deeper water increases pressure, reduces volume."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "শ্বাসযন্ত্র" : "Ventilators"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্যাস সিলিন্ডার" : "Gas cylinders"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "পরিবহন" : "Transportation"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "টায়ার চাপ" : "Tire pressure"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "তাপমাত্রা স্থির রাখুন।" : "Keep temperature constant."}</li>
                <li>• {lang === "bn" ? "ইউনিট রূপান্তরে সতর্ক থাকুন।" : "Be careful with unit conversions."}</li>
                <li>• {lang === "bn" ? "সমীকরণটি সঠিকভাবে ব্যবহার করুন।" : "Use the equation correctly."}</li>
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