
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function OscillationsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `দোলন হল একটি ভারসাম্য অবস্থানের চারপাশে পুনরাবৃত্ত গতি। এটি স্প্রিং, দোলনা এবং তরঙ্গে দেখা যায়।
মূল ধারণা:
- সরল হারমোনিক গতি
- পুনরুদ্ধারকারী বল
- দোলনকাল এবং কম্পাঙ্ক
- শক্তি সংরক্ষণ
- স্যাঁতসেঁতে দোলন
সূত্রাবলী:
- দোলনকাল: T = 2π √(m/k)
- কম্পাঙ্ক: f = 1/T
- স্থানচ্যুতি: x = A cos(ωt)
- পুনরুদ্ধারকারী বল: F = -kx
- শক্তি: E = ½ k A²`
      : `Oscillations involve repetitive motion around an equilibrium position, observed in springs, pendulums, and waves.
Key Concepts:
- Simple harmonic motion
- Restoring force
- Period and frequency
- Energy conservation
- Damped oscillations
Formulas:
- Period: T = 2π √(m/k)
- Frequency: f = 1/T
- Displacement: x = A cos(ωt)
- Restoring force: F = -kx
- Energy: E = ½ k A²`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "দোলন" : "Oscillations"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "দোলন হল এমন গতি যেখানে একটি বস্তু তার ভারসাম্য অবস্থানের চারপাশে পুনরাবৃত্তভাবে সরে। এটি প্রকৃতিতে এবং প্রকৌশলে ব্যাপকভাবে পরিলক্ষিত হয়, যেমন স্প্রিং-ভর সিস্টেম, দোলনা, এবং শব্দ তরঙ্গে।"
                  : "Oscillations are motions where an object repeatedly moves around its equilibrium position. They are widely observed in nature and engineering, such as in spring-mass systems, pendulums, and sound waves."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "দোলন একটি পুনরুদ্ধারকারী বল দ্বারা চালিত হয় যা বস্তুকে ভারসাম্য অবস্থানে ফিরিয়ে আনে। সরল হারমোনিক গতি (SHM) হল দোলনের সবচেয়ে মৌলিক রূপ।"
                    : "Oscillations are driven by a restoring force that brings the object back to equilibrium. Simple harmonic motion (SHM) is the most fundamental form of oscillation."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সরল হারমোনিক গতি (SHM)" : "Simple Harmonic Motion (SHM)"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "SHM-এ, পুনরুদ্ধারকারী বল স্থানচ্যুতির সমানুপাতিক এবং বিপরীতমুখী। এটি স্প্রিং এবং দোলনার মতো সিস্টেমে দেখা যায়।"
                  : "In SHM, the restoring force is proportional to displacement and directed opposite to it. It is observed in systems like springs and pendulums."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "পুনরুদ্ধারকারী বল:" : "Restoring Force:"}
                  </p>
                  <p className="font-mono text-lg">F = -kx</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "যেখানে k = স্প্রিং ধ্রুবক, x = স্থানচ্যুতি"
                      : "Where k = spring constant, x = displacement"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "স্থানচ্যুতি:" : "Displacement:"}
                  </p>
                  <p className="font-mono text-lg">x = A cos(ωt)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "যেখানে A = বিস্তার, ω = কৌণিক কম্পাঙ্ক"
                      : "Where A = amplitude, ω = angular frequency"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium">
                  {lang === "bn" ? "দোলনকাল এবং কম্পাঙ্ক:" : "Period and Frequency:"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono">T = 2π √(m/k)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === "bn" ? "দোলনকাল: একটি পূর্ণ দোলনের সময়" : "Period: Time for one complete oscillation"}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono">f = 1/T</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === "bn" ? "কম্পাঙ্ক: প্রতি সেকেন্ডে দোলন সংখ্যা" : "Frequency: Oscillations per second"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শক্তি সংরক্ষণ" : "Energy Conservation"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "SHM-এ, মোট শক্তি গতিশক্তি এবং স্থিতিস্থাপক সম্ভাব্য শক্তির মধ্যে রূপান্তরিত হয়।"
                  : "In SHM, total energy oscillates between kinetic and elastic potential energy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "গতিশক্তি:" : "Kinetic Energy:"}
                  </p>
                  <p className="font-mono text-lg">K = ½ mv²</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "v = বেগ" : "v = velocity"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "সম্ভাব্য শক্তি:" : "Potential Energy:"}
                  </p>
                  <p className="font-mono text-lg">U = ½ kx²</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "x = স্থানচ্যুতি" : "x = displacement"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium">{lang === "bn" ? "মোট শক্তি:" : "Total Energy:"}</p>
                <p className="font-mono">E = ½ k A²</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" ? "ধ্রুবক, বিস্তারের উপর নির্ভরশীল" : "Constant, depends on amplitude"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "স্যাঁতসেঁতে এবং জোরপূর্বক দোলন" : "Damped and Forced Oscillations"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "স্যাঁতসেঁতে দোলনে ঘর্ষণ বা প্রতিরোধের কারণে বিস্তার কমে। জোরপূর্বক দোলনে বাহ্যিক বল প্রয়োগ করা হয়।"
                  : "Damped oscillations lose amplitude due to friction or resistance. Forced oscillations involve an external driving force."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Damped Oscillations</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "যেমন: গাড়ির শক শোষক"
                      : "Example: Car shock absorbers"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Forced Oscillations</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "যেমন: সেতুর কম্পন বাতাসের কারণে"
                      : "Example: Bridge vibrations due to wind"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium">{lang === "bn" ? "সংনাদন:" : "Resonance:"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "যখন জোরপূর্বক বলের কম্পাঙ্ক সিস্টেমের প্রাকৃতিক কম্পাঙ্কের সমান হয়।"
                    : "Occurs when the driving frequency matches the system’s natural frequency."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "সেতু নকশা" : "Bridge design"}</li>
                  <li>• {lang === "bn" ? "বিল্ডিং ভূমিকম্প প্রতিরোধ" : "Earthquake-resistant buildings"}</li>
                  <li>• {lang === "bn" ? "যানবাহন সাসপেনশন" : "Vehicle suspension"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "ঘড়ির কম্পাঙ্ক নিয়ন্ত্রণ" : "Clock frequency regulation"}</li>
                  <li>• {lang === "bn" ? "লেজার সিস্টেম" : "Laser systems"}</li>
                  <li>• {lang === "bn" ? "শব্দ তরঙ্গ বিশ্লেষণ" : "Sound wave analysis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "দোলনকাল ভর এবং স্প্রিং ধ্রুবকের উপর নির্ভর করে।" : "Period depends on mass and spring constant."}</li>
                <li>• {lang === "bn" ? "সংনাদন বিপজ্জনক হতে পারে যদি না নিয়ন্ত্রিত হয়।" : "Resonance can be dangerous if uncontrolled."}</li>
                <li>• {lang === "bn" ? "শক্তি সংরক্ষিত থাকে আদর্শ SHM-এ।" : "Energy is conserved in ideal SHM."}</li>
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
