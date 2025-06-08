"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function PropertiesOfGasesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `গ্যাসের বৈশিষ্ট্যগুলির মধ্যে সংকোচনীয়তা, প্রসারণশীলতা, এবং চাপ, আয়তন ও তাপমাত্রার দ্বারা নিয়ন্ত্রিত আচরণ অন্তর্ভুক্ত, যা গ্যাস সূত্র দ্বারা বর্ণিত। গ্যাসের কোনো নির্দিষ্ট আকৃতি বা আয়তন নেই।
মূল ধারণা:
- সংকোচনীয়তা: গ্যাস কণাগুলি সহজে সংকুচিত হয় কারণ তাদের মধ্যে ফাঁকা স্থান বেশি।
- প্রসারণশীলতা: গ্যাস পাত্রের সম্পূর্ণ আয়তন গ্রহণ করে।
- গতিশক্তি: গ্যাস কণার গতি তাপমাত্রার উপর নির্ভর করে।
প্রধান বৈশিষ্ট্য:
- চাপ: পাত্রের দেয়ালে কণার সংঘর্ষ থেকে উৎপন্ন।
- আয়তন: পাত্রের আকার দ্বারা নির্ধারিত।
- তাপমাত্রা: কণার গড় গতিশক্তির পরিমাপ।
গ্যাস সূত্র:
- বয়লের সূত্র: স্থির তাপমাত্রায় চাপ এবং আয়তনের গুণফল স্থির (P ∝ 1/V)।
- শার্লের সূত্র: স্থির চাপে আয়তন তাপমাত্রার সমানুপাতিক (V ∝ T)।
- আভোগাড্রোর সূত্র: সমান আয়তনের গ্যাসে সমান সংখ্যক কণা থাকে।
- আদর্শ গ্যাস সূত্র: PV = nRT, যেখানে n মোল সংখ্যা, R গ্যাস ধ্রুবক।
উদাহরণ:
- বেলুন: তাপমাত্রা বাড়লে আয়তন বাড়ে (শার্লের সূত্র)।
- স্প্রে ক্যান: চাপ বাড়লে আয়তন কমে (বয়লের সূত্র)।
- শ্বাস-প্রশ্বাস: ফুসফুসে গ্যাসের প্রসারণ।
প্রয়োগ:
- শিল্পে: গ্যাস সংক্ষেপণ (LPG), রাসায়নিক উৎপাদন।
- চিকিৎসায়: অক্সিজেন সরবরাহ, অ্যানেসথেসিয়া।
- পরিবেশে: বায়ুমণ্ডলীয় গ্যাস বিশ্লেষণ।
- পরিবহনে: গ্যাস চালিত যানবাহন।
টিপস:
- তাপমাত্রা সবসময় কেলভিনে রূপান্তর করুন।
- গ্যাস সূত্রের ইউনিট (প্যাসকেল, লিটার) মনে রাখুন।
- আদর্শ গ্যাসের ধারণা এবং বাস্তব গ্যাসের পার্থক্য বুঝুন।
- গ্যাস কণার গতি এবং তাপমাত্রার সম্পর্ক মনে রাখুন।`
      : `Properties of gases include compressibility, expansibility, and behavior governed by pressure, volume, and temperature, described by gas laws. Gases lack fixed shape or volume.
Key Concepts:
- Compressibility: Gas particles compress easily due to large intermolecular spaces.
- Expansibility: Gases occupy the entire container volume.
- Kinetic Energy: Particle motion depends on temperature.
Key Characteristics:
- Pressure: Generated from particle collisions with container walls.
- Volume: Determined by container size.
- Temperature: Measure of average particle kinetic energy.
Gas Laws:
- Boyle’s Law: At constant temperature, pressure and volume are inversely proportional (P ∝ 1/V).
- Charles’s Law: At constant pressure, volume is proportional to temperature (V ∝ T).
- Avogadro’s Law: Equal volumes of gases contain equal numbers of particles.
- Ideal Gas Law: PV = nRT, where n is moles, R is gas constant.
Examples:
- Balloon: Volume increases with temperature (Charles’s Law).
- Spray Can: Pressure increases, volume decreases (Boyle’s Law).
- Breathing: Gas expansion in lungs.
Applications:
- Industry: Gas compression (LPG), chemical production.
- Medicine: Oxygen supply, anesthesia.
- Environment: Atmospheric gas analysis.
- Transportation: Gas-powered vehicles.
Tips:
- Always convert temperature to Kelvin.
- Memorize gas law units (Pascals, liters).
- Understand ideal vs. real gas behavior.
- Remember the relationship between particle motion and temperature.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "গ্যাসের বৈশিষ্ট্য" : "Properties of Gases"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "গ্যাসের বৈশিষ্ট্য তাদের অনন্য আচরণ বোঝায়, যা চাপ, আয়তন, এবং তাপমাত্রার দ্বারা নিয়ন্ত্রিত হয় এবং গ্যাস সূত্র দ্বারা ব্যাখ্যা করা হয়।"
                  : "Properties of gases explain their unique behavior, governed by pressure, volume, and temperature, and described by gas laws."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "গ্যাসের সংকোচনীয়তা, প্রসারণশীলতা এবং গতিশক্তি তাদের ব্যবহারিক প্রয়োগে গুরুত্বপূর্ণ।"
                    : "Compressibility, expansibility, and kinetic energy are critical to gas applications."}
                </p>
                <ul className="text-sm space-y-1">
                  <li>• {lang === "bn" ? "সংকোচনীয়তা: কণা সংকুচিত হয়।" : "Compressibility: Particles condense."}</li>
                  <li>• {lang === "bn" ? "প্রসারণ: পাত্র পূর্ণ করে।" : "Expansion: Fills container."}</li>
                </ul>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান বৈশিষ্ট্য" : "Key Characteristics"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "চাপ, আয়তন এবং তাপমাত্রা গ্যাসের আচরণ বোঝার জন্য অপরিহার্য।"
                  : "Pressure, volume, and temperature are essential for understanding gas behavior."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "চাপ" : "Pressure"}</strong>: 
                  {lang === "bn" ? "কণার সংঘর্ষ থেকে উৎপন্ন।" : "From particle collisions."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "আয়তন" : "Volume"}</strong>: 
                  {lang === "bn" ? "পাত্রের আকার দ্বারা নির্ধারিত।" : "Determined by container size."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "তাপমাত্রা" : "Temperature"}</strong>: 
                  {lang === "bn" ? "কণার গতিশক্তির পরিমাপ।" : "Measure of particle kinetic energy."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গ্যাস সূত্র" : "Gas Laws"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "গ্যাস সূত্র গ্যাসের চাপ, আয়তন এবং তাপমাত্রার সম্পর্ক ব্যাখ্যা করে।"
                  : "Gas laws describe relationships between pressure, volume, and temperature."}
              </p>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>{lang === "bn" ? "বয়লের সূত্র" : "Boyle’s Law"}</strong>: 
                  {lang === "bn" ? "P ∝ 1/V (স্থির তাপমাত্রায়)।" : "P ∝ 1/V (constant T)."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "শার্লের সূত্র" : "Charles’s Law"}</strong>: 
                  {lang === "bn" ? "V ∝ T (স্থির চাপে)।" : "V ∝ T (constant P)."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "আদর্শ গ্যাস সূত্র" : "Ideal Gas Law"}</strong>: 
                  {lang === "bn" ? "PV = nRT।" : "PV = nRT."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ গ্যাসের বৈশিষ্ট্য বোঝায়।"
                  : "Practical examples illustrate gas properties."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "বেলুন" : "Balloon"}</p>
                  <p className="text-sm">{lang === "bn" ? "তাপমাত্রা বাড়লে আয়তন বাড়ে।" : "Volume increases with temperature."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "স্প্রে ক্যান" : "Spray Can"}</p>
                  <p className="text-sm">{lang === "bn" ? "চাপ বাড়লে আয়তন কমে।" : "Pressure increases, volume decreases."}</p>
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
                  <li>• {lang === "bn" ? "গ্যাস সংক্ষেপণ" : "Gas compression"}</li>
                  <li>• {lang === "bn" ? "রাসায়নিক উৎপাদন" : "Chemical production"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "অক্সিজেন সরবরাহ" : "Oxygen supply"}</li>
                  <li>• {lang === "bn" ? "অ্যানেসথেসিয়া" : "Anesthesia"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "পরিবেশ" : "Environment"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্যাস বিশ্লেষণ" : "Gas analysis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "তাপমাত্রা কেলভিনে রূপান্তর করুন।" : "Convert temperature to Kelvin."}</li>
                <li>• {lang === "bn" ? "ইউনিট মনে রাখুন।" : "Memorize units."}</li>
                <li>• {lang === "bn" ? "আদর্শ গ্যাস বুঝুন।" : "Understand ideal gas."}</li>
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