"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function WavePropertiesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `তরঙ্গ হল এমন একটি ব্যাঘাত যা শক্তি স্থানান্তর করে কিন্তু পদার্থ স্থানান্তর করে না। তরঙ্গের প্রধান বৈশিষ্ট্যগুলির মধ্যে রয়েছে প্রতিফলন, প্রতিসরণ, অপবর্তন, ব্যতিচার এবং সমবর্তন।
মূল বৈশিষ্ট্যসমূহ:
- প্রশস্ততা: তরঙ্গের সর্বোচ্চ সরণ
- তরঙ্গদৈর্ঘ্য: দুটি পরপর শীর্ষের মধ্যে দূরত্ব
- কম্পাঙ্ক: প্রতি সেকেন্ডে কম্পনের সংখ্যা
- পর্যায়: তরঙ্গের অবস্থান
সূত্রাবলী:
- v = fλ (তরঙ্গ বেগ)
- T = 1/f (পর্যায়কাল)
- I ∝ A² (তীব্রতা)
- n = c/v (প্রতিসরাঙ্ক)
তরঙ্গের প্রকারভেদ:
- অনুপ্রস্থ তরঙ্গ: কণার সরণ তরঙ্গের গতির সাথে লম্ব
- অনুদৈর্ঘ্য তরঙ্গ: কণার সরণ তরঙ্গের গতির সমান্তরাল`
      : `Waves are disturbances that transfer energy without transferring matter. Key wave properties include reflection, refraction, diffraction, interference, and polarization.
Key characteristics:
- Amplitude: Maximum displacement of the wave
- Wavelength: Distance between two consecutive peaks
- Frequency: Number of oscillations per second
- Phase: Position in the wave cycle
Formulas:
- v = fλ (wave velocity)
- T = 1/f (time period)
- I ∝ A² (intensity)
- n = c/v (refractive index)
Wave types:
- Transverse waves: Particle displacement perpendicular to wave motion
- Longitudinal waves: Particle displacement parallel to wave motion`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "তরঙ্গের বৈশিষ্ট্য" : "Wave Properties"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "তরঙ্গ হল এমন একটি ব্যাঘাত যা শক্তি স্থানান্তর করে কিন্তু পদার্থ স্থানান্তর করে না। তরঙ্গ বিভিন্ন মাধ্যমে চলাচল করতে পারে এবং প্রতিফলন, প্রতিসরণ, অপবর্তন, ব্যতিচার এবং সমবর্তনের মতো বৈশিষ্ট্য প্রদর্শন করে।"
                  : "Waves are disturbances that transfer energy without transferring matter. They can travel through various media and exhibit properties like reflection, refraction, diffraction, interference, and polarization."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "তরঙ্গের মৌলিক পরামিতি" : "Basic Wave Parameters"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">
                      {lang === "bn" ? "প্রশস্ততা (A):" : "Amplitude (A):"}
                    </p>
                    <p className="text-sm">
                      {lang === "bn" 
                        ? "তরঙ্গের সর্বোচ্চ সরণ। এটি তরঙ্গের শক্তির সাথে সম্পর্কিত।"
                        : "Maximum displacement of the wave. Related to wave energy."}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      {lang === "bn" ? "তরঙ্গদৈর্ঘ্য (λ):" : "Wavelength (λ):"}
                    </p>
                    <p className="text-sm">
                      {lang === "bn" 
                        ? "দুটি পরপর একই দশার বিন্দুর মধ্যে দূরত্ব।"
                        : "Distance between two consecutive points in phase."}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      {lang === "bn" ? "কম্পাঙ্ক (f):" : "Frequency (f):"}
                    </p>
                    <p className="text-sm">
                      {lang === "bn" 
                        ? "প্রতি সেকেন্ডে সম্পূর্ণ কম্পনের সংখ্যা। একক হার্টজ (Hz)।"
                        : "Number of complete oscillations per second. Unit is Hertz (Hz)."}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      {lang === "bn" ? "পর্যায়কাল (T):" : "Time Period (T):"}
                    </p>
                    <p className="text-sm">
                      {lang === "bn" 
                        ? "একটি সম্পূর্ণ কম্পন সম্পন্ন করতে সময় লাগে। T = 1/f।"
                        : "Time taken for one complete oscillation. T = 1/f."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "তরঙ্গের প্রকারভেদ" : "Types of Waves"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">
                  {lang === "bn" ? "অনুপ্রস্থ তরঙ্গ" : "Transverse Waves"}
                </h5>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>
                    {lang === "bn"
                      ? "কণার সরণ তরঙ্গের গতির সাথে লম্ব"
                      : "Particle displacement perpendicular to wave motion"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "উদাহরণ: আলোক তরঙ্গ, দড়ির তরঙ্গ"
                      : "Examples: Light waves, rope waves"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "সমবর্তন প্রদর্শন করে"
                      : "Exhibits polarization"}
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">
                  {lang === "bn" ? "অনুদৈর্ঘ্য তরঙ্গ" : "Longitudinal Waves"}
                </h5>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>
                    {lang === "bn"
                      ? "কণার সরণ তরঙ্গের গতির সমান্তরাল"
                      : "Particle displacement parallel to wave motion"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "উদাহরণ: শব্দ তরঙ্গ, স্প্রিং তরঙ্গ"
                      : "Examples: Sound waves, spring waves"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "সংকোচন ও প্রসারণের অঞ্চল তৈরি করে"
                      : "Creates compressions and rarefactions"}
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "তরঙ্গ বেগ:" : "Wave Velocity:"}
                </p>
                <p className="font-mono text-lg">v = fλ</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "যেখানে v = বেগ, f = কম্পাঙ্ক, λ = তরঙ্গদৈর্ঘ্য"
                    : "where v = velocity, f = frequency, λ = wavelength"}
                </p>
              </div>
              
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "তরঙ্গের তীব্রতা:" : "Wave Intensity:"}
                </p>
                <p className="font-mono text-lg">I ∝ A²</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "তীব্রতা প্রশস্ততার বর্গের সমানুপাতিক"
                    : "Intensity is proportional to amplitude squared"}
                </p>
              </div>

              <div>
                <p className="font-medium">
                  {lang === "bn" ? "প্রতিসরণ সূত্র:" : "Refraction Law:"}
                </p>
                <p className="font-mono text-lg">n₁sinθ₁ = n₂sinθ₂</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "স্নেলের সূত্র, n = প্রতিসরাঙ্ক"
                    : "Snell's Law, n = refractive index"}
                </p>
              </div>

              <div>
                <p className="font-medium">
                  {lang === "bn" ? "ডপলার প্রভাব:" : "Doppler Effect:"}
                </p>
                <p className="font-mono text-lg">f' = f(v ± v₀)/(v ∓ vₛ)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "পর্যবেক্ষক বা উৎসের গতির কারণে কম্পাঙ্কের পরিবর্তন"
                    : "Frequency change due to relative motion between source and observer"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "তরঙ্গের আচরণ" : "Wave Behaviors"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                <h5 className="font-medium text-red-800 dark:text-red-200">
                  {lang === "bn" ? "প্রতিফলন" : "Reflection"}
                </h5>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {lang === "bn"
                    ? "তরঙ্গ মাধ্যমের সীমানা থেকে ফিরে আসে। আপতন কোণ = প্রতিফলন কোণ।"
                    : "Wave bounces off a boundary. Angle of incidence = angle of reflection."}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200">
                  {lang === "bn" ? "প্রতিসরণ" : "Refraction"}
                </h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  {lang === "bn"
                    ? "তরঙ্গ মাধ্যম পরিবর্তন করলে দিক পরিবর্তন করে।"
                    : "Wave changes direction when entering a different medium."}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">
                  {lang === "bn" ? "অপবর্তন" : "Diffraction"}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {lang === "bn"
                    ? "তরঙ্গ বাধার চারপাশে বেঁকে যায়।"
                    : "Wave bends around obstacles or through openings."}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">
                  {lang === "bn" ? "ব্যতিচার" : "Interference"}
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "দুটি তরঙ্গের মিলনে শক্তির পুনর্বণ্টন। গঠনমূলক ও ধ্বংসাত্মক ব্যতিচার।"
                    : "Superposition of waves causing energy redistribution. Constructive and destructive interference."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">
                  {lang === "bn" ? "আল্ট্রাসাউন্ড" : "Ultrasound"}
                </h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {lang === "bn"
                    ? "চিকিৎসা ইমেজিংয়ে উচ্চ কম্পাঙ্কের শব্দ তরঙ্গ ব্যবহার"
                    : "Medical imaging using high frequency sound waves"}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
                  {lang === "bn" ? "রেডিও যোগাযোগ" : "Radio Communication"}
                </h5>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {lang === "bn"
                    ? "তরঙ্গের মাধ্যমে তথ্য প্রেরণ"
                    : "Information transmission via electromagnetic waves"}
                </p>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-3 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200">
                  {lang === "bn" ? "ভূমিকম্প নিরূপণ" : "Earthquake Detection"}
                </h5>
                <p className="text-sm text-pink-700 dark:text-pink-300">
                  {lang === "bn"
                    ? "সিসমিক তরঙ্গ বিশ্লেষণ"
                    : "Analysis of seismic waves"}
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950 p-3 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200">
                  {lang === "bn" ? "ফাইবার অপটিক্স" : "Fiber Optics"}
                </h5>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  {lang === "bn"
                    ? "সম্পূর্ণ অভ্যন্তরীণ প্রতিফলনের মাধ্যমে আলোক সংকেত প্রেরণ"
                    : "Light signal transmission via total internal reflection"}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                {lang === "bn"
                  ? "যান্ত্রিক তরঙ্গের (যেমন শব্দ) চলাচলের জন্য মাধ্যম প্রয়োজন, কিন্তু তড়িৎচৌম্বক তরঙ্গের (যেমন আলো) মাধ্যম প্রয়োজন নেই।"
                  : "Mechanical waves (e.g., sound) require a medium, but electromagnetic waves (e.g., light) do not need a medium to propagate."}
              </p>
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