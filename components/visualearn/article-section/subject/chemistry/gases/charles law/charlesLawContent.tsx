"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function CharlesLawContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `শার্লের সূত্র বলে যে স্থির চাপে, গ্যাসের আয়তন তার পরম তাপমাত্রার সরাসরি সমানুপাতিক। এর অর্থ, তাপমাত্রা বাড়লে আয়তন বাড়ে এবং তাপমাত্রা কমলে আয়তন কমে।
মূল ধারণা:
- সমীকরণ: V₁/T₁ = V₂/T₂, যেখানে V আয়তন এবং T পরম তাপমাত্রা (কেলভিনে)।
- স্থির চাপ: সূত্রটি কেবল তখনই প্রযোজ্য যখন চাপ অপরিবর্তিত থাকে।
- গ্যাস কণা: তাপমাত্রা বৃদ্ধি কণার গতিশক্তি বাড়ায়।
ইতিহাস:
- জ্যাক শার্ল: ১৭৮৭ সালে এই সূত্র প্রতিষ্ঠা করেন।
প্রধান বৈশিষ্ট্য:
- সরাসরি সম্পর্ক: আয়তন এবং তাপমাত্রার মধ্যে সরাসরি সম্পর্ক।
- পরম তাপমাত্রা: তাপমাত্রা অবশ্যই কেলভিনে পরিমাপ করতে হবে।
- আদর্শ গ্যাস: সূত্রটি আদর্শ গ্যাসের জন্য সবচেয়ে সঠিক।
উদাহরণ:
- বেলুন: গরম করলে বেলুনের আয়তন বাড়ে।
- গরম বাতাসের বেলুন: তাপমাত্রা বাড়লে উড়ে যায়।
প্রয়োগ:
- আবহাওয়া বেলুন: উচ্চতায় তাপমাত্রার পরিবর্তন।
- শিল্পে: গ্যাসের তাপমাত্রা নিয়ন্ত্রণ।
- চিকিৎসায়: শ্বাসযন্ত্রে গ্যাস সম্প্রসারণ।
টিপস:
- তাপমাত্রা কেলভিনে রূপান্তর করুন।
- চাপ স্থির রাখুন।
- সমীকরণটি সঠিকভাবে ব্যবহার করুন।`
      : `Charles’s Law states that at constant pressure, the volume of a gas is directly proportional to its absolute temperature. This means as temperature increases, volume increases, and vice versa.
Key Concepts:
- Equation: V₁/T₁ = V₂/T₂, where V is volume and T is absolute temperature (in Kelvin).
- Constant Pressure: The law applies only when pressure remains constant.
- Gas Particles: Increased temperature increases particle kinetic energy.
History:
- Jacques Charles: Established the law in 1787.
Key Characteristics:
- Direct Relationship: Volume and temperature are directly related.
- Absolute Temperature: Temperature must be measured in Kelvin.
- Ideal Gas: The law is most accurate for ideal gases.
Examples:
- Balloon: Heating a balloon increases its volume.
- Hot Air Balloon: Higher temperature causes it to rise.
Applications:
- Weather Balloons: Volume changes with temperature at altitude.
- Industry: Controlling gas temperature.
- Medicine: Gas expansion in ventilators.
Tips:
- Convert temperature to Kelvin.
- Keep pressure constant.
- Use the equation correctly.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "শার্লের সূত্র" : "Charles’s Law"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "শার্লের সূত্র গ্যাসের আয়তন এবং তাপমাত্রার সরাসরি সম্পর্ক বোঝায়, যা স্থির চাপে প্রযোজ্য।"
                  : "Charles’s Law describes the direct relationship between gas volume and temperature at constant pressure."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "ইতিহাস" : "History"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জ্যাক শার্ল ১৭৮৭ সালে পরীক্ষার মাধ্যমে এই সূত্র প্রতিষ্ঠা করেন।"
                    : "Jacques Charles established this law through experiments in 1787."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "শার্লের সূত্র আয়তন এবং তাপমাত্রার সম্পর্ক বোঝায়।"
                  : "Charles’s Law explains the relationship between volume and temperature."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "সমীকরণ" : "Equation"}</strong>: 
                  {lang === "bn" ? "V₁/T₁ = V₂/T₂।" : "V₁/T₁ = V₂/T₂."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "স্থির চাপ" : "Constant Pressure"}</strong>: 
                  {lang === "bn" ? "চাপ অপরিবর্তিত থাকতে হবে।" : "Pressure must remain constant."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গ্যাস কণা" : "Gas Particles"}</strong>: 
                  {lang === "bn" ? "তাপমাত্রা বাড়লে গতিশক্তি বাড়ে।" : "Higher temperature increases kinetic energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান বৈশিষ্ট্য" : "Key Characteristics"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "শার্লের সূত্র গ্যাসের আচরণের সরাসরি সম্পর্ক বোঝায়।"
                  : "Charles’s Law explains the direct behavior of gases."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "সরাসরি সম্পর্ক" : "Direct Relationship"}</strong>: 
                  {lang === "bn" ? "তাপমাত্রা বাড়লে আয়তন বাড়ে।" : "Temperature up, volume up."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "ইউনিট" : "Units"}</strong>: 
                  {lang === "bn" ? "আয়তন: লিটার, তাপমাত্রা: কেলভিন।" : "Volume: Liters, Temperature: Kelvin."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ শার্লের সূত্র বোঝায়।"
                  : "Practical examples illustrate Charles’s Law."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বেলুন" : "Balloon"}</p>
                  <p className="text-sm">{lang === "bn" ? "গরম করলে আয়তন বাড়ে।" : "Heating increases volume."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "গরম বাতাসের বেলুন" : "Hot Air Balloon"}</p>
                  <p className="text-sm">{lang === "bn" ? "তাপমাত্রা বাড়লে উড়ে।" : "Higher temperature causes rising."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "আবহাওয়া" : "Weather"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "আবহাওয়া বেলুন" : "Weather balloons"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "তাপমাত্রা নিয়ন্ত্রণ" : "Temperature control"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "শ্বাসযন্ত্র" : "Ventilators"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "তাপমাত্রা কেলভিনে রূপান্তর করুন।" : "Convert temperature to Kelvin."}</li>
                <li>• {lang === "bn" ? "চাপ স্থির রাখুন।" : "Keep pressure constant."}</li>
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