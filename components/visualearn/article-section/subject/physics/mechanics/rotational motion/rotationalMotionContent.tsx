
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function RotationalMotionContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ঘূর্ণন গতি একটি অক্ষের চারপাশে বস্তুর ঘূর্ণন বর্ণনা করে, যা কৌণিক বেগ এবং টর্কের মতো পরিমাণ দ্বারা চিহ্নিত।
মূল ধারণা:
- কৌণিক বেগ এবং ত্বরণ
- টর্ক
- জড়তার মুহূর্ত
- কৌণিক ভরবেগ
- ঘূর্ণন গতিশক্তি
সূত্রাবলী:
- কৌণিক বেগ: ω = dθ/dt
- টর্ক: τ = r × F
- জড়তার মুহূর্ত: I = Σ m r²
- কৌণিক ভরবেগ: L = I ω
- গতিশক্তি: K = ½ I ω²`
      : `Rotational Motion describes the rotation of objects about an axis, characterized by angular quantities like velocity and torque.
Key Concepts:
- Angular velocity and acceleration
- Torque
- Moment of inertia
- Angular momentum
- Rotational kinetic energy
Formulas:
- Angular velocity: ω = dθ/dt
- Torque: τ = r × F
- Moment of inertia: I = Σ m r²
- Angular momentum: L = I ω
- Kinetic energy: K = ½ I ω²`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ঘূর্ণন গতি" : "Rotational Motion"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ঘূর্ণন গতি পদার্থবিজ্ঞানের একটি গুরুত্বপূর্ণ অংশ যা একটি নির্দিষ্ট অক্ষের চারপাশে বস্তুর ঘূর্ণন অধ্যয়ন করে। এটি রৈখিক গতির সাথে সমান্তরাল সম্পর্কযুক্ত।"
                  : "Rotational Motion is a key part of physics that studies the rotation of objects about a fixed axis. It parallels linear motion concepts."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ঘূর্ণন গতি কৌণিক পরিমাণ যেমন বেগ, ত্বরণ, এবং ভরবেগের মাধ্যমে বর্ণিত হয়, যা রৈখিক গতির সমতুল্য।"
                    : "Rotational motion is described by angular quantities like velocity, acceleration, and momentum, analogous to linear motion."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কৌণিক পরিমাণ" : "Angular Quantities"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "কৌণিক পরিমাণ ঘূর্ণনের গতিশীলতা বর্ণনা করে।"
                  : "Angular quantities describe the dynamics of rotation."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "কৌণিক বেগ:" : "Angular Velocity:"}
                  </p>
                  <p className="font-mono text-lg">ω = dθ/dt</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "কোণের পরিবর্তনের হার" : "Rate of change of angle"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "কৌণিক ত্বরণ:" : "Angular Acceleration:"}
                  </p>
                  <p className="font-mono text-lg">α = dω/dt</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "কৌণিক বেগের পরিবর্তনের হার" : "Rate of change of angular velocity"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "টর্ক" : "Torque"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "টর্ক হল ঘূর্ণন সৃষ্টিকারী বল, যা বল এবং অক্ষ থেকে দূরত্বের উপর নির্ভর করে।"
                  : "Torque is the force causing rotation, dependent on force and distance from the axis."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "টর্ক:" : "Torque:"}
                  </p>
                  <p className="font-mono text-lg">τ = r × F</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "r = দূরত্ব, F = বল" : "r = distance, F = force"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জড়তার মুহূর্ত এবং কৌণিক ভরবেগ" : "Moment of Inertia and Angular Momentum"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "জড়তার মুহূর্ত ঘূর্ণনের প্রতিরোধ পরিমাপ করে, এবং কৌণিক ভরবেগ ঘূর্ণনের পরিমাণ নির্দেশ করে।"
                  : "Moment of inertia measures resistance to rotation, and angular momentum quantifies rotational motion."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "জড়তার মুহূর্ত:" : "Moment of Inertia:"}</p>
                  <p className="font-mono text-lg">I = Σ m r²</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "m = ভর, r = দূরত্ব" : "m = mass, r = distance"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "কৌণিক ভরবেগ:" : "Angular Momentum:"}</p>
                  <p className="font-mono text-lg">L = I ω</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "I = জড়তার মুহূর্ত, ω = কৌণিক বেগ" : "I = moment of inertia, ω = angular velocity"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ঘূর্ণন গতিশক্তি" : "Rotational Kinetic Energy"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "ঘূর্ণন গতিশক্তি একটি বস্তুর ঘূর্ণন গতির শক্তি পরিমাপ করে।"
                  : "Rotational kinetic energy measures the energy of an object’s rotational motion."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "গতিশক্তি:" : "Kinetic Energy:"}</p>
                  <p className="font-mono text-lg">K = ½ I ω²</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "যান্ত্রিক" : "Mechanical"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "চাকা এবং গিয়ার" : "Wheels and gears"}</li>
                  <li>• {lang === "bn" ? "ইঞ্জিন" : "Engines"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "জ্যোতির্বিজ্ঞান" : "Astronomy"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "গ্রহের ঘূর্ণন" : "Planetary rotation"}</li>
                  <li>• {lang === "bn" ? "নক্ষত্রের গতি" : "Stellar motion"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কৌণিক এবং রৈখিক পরিমাণের মধ্যে সম্পর্ক মনে রাখুন।" : "Remember the relationship between angular and linear quantities."}</li>
                <li>• {lang === "bn" ? "টর্ক অক্ষের উপর নির্ভরশীল।" : "Torque depends on the axis."}</li>
                <li>• {lang === "bn" ? "কৌণিক ভরবেগ সংরক্ষণ বাহ্যিক টর্কের অনুপস্থিতিতে।" : "Angular momentum conservation applies without external torques."}</li>
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
