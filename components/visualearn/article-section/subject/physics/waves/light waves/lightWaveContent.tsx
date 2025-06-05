"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function LightWaveContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `আলোর তরঙ্গ হল ইলেক্ট্রোম্যাগনেটিক তরঙ্গ যা দৃশ্যমান আলোর পরিসরে পড়ে এবং বিভিন্ন তরঙ্গের বৈশিষ্ট্য যেমন ব্যতিক্রম, বিচ্ছুরণ এবং পোলারাইজেশন প্রদর্শন করে।
মূল বৈশিষ্ট্যসমূহ:
- তরঙ্গের প্রকৃতি: ট্রান্সভার্স তরঙ্গ
- গতি: শূন্য মাধ্যমে 3×10⁸ মি/সে
- তরঙ্গদৈর্ঘ্য: 400-700 ন্যানোমিটার (দৃশ্যমান আলো)
- ফ্রিকোয়েন্সি: 4×10¹⁪⁴-7.5×10¹⁪⁴ Hz
গুরুত্বপূর্ণ ঘটনা:
- ব্যতিক্রম: দুটি তরঙ্গের সুপারপজিশন
- বিচ্ছুরণ: প্রতিবন্ধকের চারপাশে তরঙ্গের বাঁকানো
- পোলারাইজেশন: তরঙ্গের দোলনের দিক নিয়ন্ত্রণ
- প্রতিফলন এবং প্রতিসরণ
সূত্রাবলী:
- তরঙ্গ সমীকরণ: y = A sin(ωt - kx)
- গতি: c = fλ
- প্রতিসরণ সূচক: n = c/v
- শক্তি: E = hf`
      : `Light waves are electromagnetic waves that fall in the visible spectrum and exhibit properties such as interference, diffraction, and polarization.
Key characteristics:
- Wave nature: Transverse waves
- Speed: 3×10⁸ m/s in vacuum
- Wavelength: 400-700 nanometers (visible light)
- Frequency: 4×10¹⁪⁴-7.5×10¹⁪⁴ Hz
Important phenomena:
- Interference: Superposition of two waves
- Diffraction: Bending of waves around obstacles
- Polarization: Control of wave oscillation direction
- Reflection and refraction
Formulas:
- Wave equation: y = A sin(ωt - kx)
- Speed: c = fλ
- Refractive index: n = c/v
- Energy: E = hf`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আলোর তরঙ্গ" : "Light Waves"}
            </h3>

            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "আলোর তরঙ্গ হল ইলেক্ট্রোম্যাগনেটিক তরঙ্গ যা দৃশ্যমান বর্ণালীতে পড়ে এবং ব্যতিক্রম, বিচ্ছুরণ, এবং পোলারাইজেশনের মতো বৈশিষ্ট্য প্রদর্শন করে। এগুলি ট্রান্সভার্স তরঙ্গ যা শূন্য মাধ্যমে 3×10⁸ মি/সে গতিতে চলে।"
                  : "Light waves are electromagnetic waves in the visible spectrum that exhibit properties like interference, diffraction, and polarization. They are transverse waves traveling at 3×10⁸ m/s in a vacuum."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "গাণিতিক সংজ্ঞা" : "Mathematical Definition"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "তরঙ্গ সমীকরণ: y = A sin(ωt - kx), যেখানে A = প্রশস্ততা, ω = কৌণিক ফ্রিকোয়েন্সি, k = তরঙ্গ সংখ্যা"
                    : "Wave equation: y = A sin(ωt - kx), where A = amplitude, ω = angular frequency, k = wave number"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                {lang === "bn"
                  ? "ট্রান্সভার্স তরঙ্গ: বৈদ্যুতিক এবং চৌম্বক ক্ষেত্র পরস্পরের এবং প্রচারের দিকের সাথে লম্ব"
                  : "Transverse waves: Electric and magnetic fields are perpendicular to each other and to the direction of propagation"}
              </li>
              <li>
                {lang === "bn"
                  ? "গতি: শূন্য মাধ্যমে 3×10⁸ মি/সে, মাধ্যমে ধীর হয়"
                  : "Speed: 3×10⁸ m/s in vacuum, slower in other media"}
              </li>
              <li>
                {lang === "bn"
                  ? "তরঙ্গদৈর্ঘ্য: দৃশ্যমান আলোর জন্য 400-700 ন্যানোমিটার"
                  : "Wavelength: 400-700 nanometers for visible light"}
              </li>
              <li>
                {lang === "bn"
                  ? "ইলেক্ট্রোম্যাগনেটিক বর্ণালী: UV, IR, এবং দৃশ্যমান আলো সহ বিভিন্ন পরিসর"
                  : "Electromagnetic spectrum: Includes UV, IR, and visible light ranges"}
              </li>
            </ul>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ ঘটনা" : "Important Phenomena"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "ব্যতিক্রম:" : "Interference:"}
                </p>
                <p className="text-sm">
                  {lang === "bn"
                    ? "দুটি তরঙ্গের সুপারপজিশন, যা গঠনমূলক (উচ্চ প্রশস্ততা) বা ধ্বংসাত্মক (নিম্ন প্রশস্ততা) হতে পারে"
                    : "Superposition of two waves, leading to constructive (higher amplitude) or destructive (lower amplitude) interference"}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "বিচ্ছুরণ:" : "Diffraction:"}
                </p>
                <p className="text-sm">
                  {lang === "bn"
                    ? "তরঙ্গের প্রতিবন্ধকের চারপাশে বাঁকানো, যেমন স্লিট বা প্রান্তের মাধ্যমে ছড়িয়ে পড়া"
                    : "Bending of waves around obstacles or through slits, spreading out the wave"}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "পোলারাইজেশন:" : "Polarization:"}
                </p>
                <p className="text-sm">
                  {lang === "bn"
                    ? "তরঙ্গের দোলনের দিক নিয়ন্ত্রণ, যেমন পোলারাইজারের মাধ্যমে"
                    : "Controlling the oscillation direction of waves, e.g., through polarizers"}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "প্রতিফলন এবং প্রতিসরণ:" : "Reflection and Refraction:"}
                </p>
                <p className="text-sm">
                  {lang === "bn"
                    ? "আলোর ফিরে আসা (প্রতিফলন) এবং মাধ্যম পরিবর্তনে বাঁকানো (প্রতিসরণ)"
                    : "Reflection (bouncing back) and refraction (bending when entering a new medium)"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "তরঙ্গের গতি:" : "Wave Speed:"}
                </p>
                <p className="font-mono text-lg">c = fλ</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "যেখানে c = আলোর গতি, f = ফ্রিকোয়েন্সি, λ = তরঙ্গদৈর্ঘ্য"
                    : "where c = speed of light, f = frequency, λ = wavelength"}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "প্রতিসরণ সূচক:" : "Refractive Index:"}
                </p>
                <p className="font-mono text-lg">n = c/v</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "যেখানে n = প্রতিসরণ সূচক, c = শূন্যে গতি, v = মাধ্যমে গতি"
                    : "where n = refractive index, c = speed in vacuum, v = speed in medium"}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "শক্তি:" : "Energy:"}
                </p>
                <p className="font-mono text-lg">E = hf</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "যেখানে E = ফোটনের শক্তি, h = প্লাঙ্কের ধ্রুবক, f = ফ্রিকোয়েন্সি"
                    : "where E = photon energy, h = Planck’s constant, f = frequency"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">
                  {lang === "bn" ? "অপটিক্স" : "Optics"}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {lang === "bn"
                    ? "লেন্স এবং আয়নায় প্রতিফলন এবং প্রতিসরণ ব্যবহৃত"
                    : "Used in lenses and mirrors via reflection and refraction"}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">
                  {lang === "bn" ? "ফাইবার অপটিক্স" : "Fiber Optics"}
                </h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {lang === "bn"
                    ? "ডেটা স্থানান্তরের জন্য আলোর তরঙ্গ ব্যবহার"
                    : "Uses light waves for data transmission"}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200">
                  {lang === "bn" ? "লেজার" : "Lasers"}
                </h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  {lang === "bn"
                    ? "সুসংগত আলোর উৎস, চিকিৎসা এবং শিল্পে ব্যবহৃত"
                    : "Coherent light source used in medicine and industry"}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                <h5 className="font-medium text-red-800 dark:text-red-200">
                  {lang === "bn" ? "হোলোগ্রাফি" : "Holography"}
                </h5>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {lang === "bn"
                    ? "ব্যতিক্রম ব্যবহার করে 3D চিত্র তৈরি"
                    : "Uses interference to create 3D images"}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                {lang === "bn"
                  ? "আলোর তরঙ্গ কণা-তরঙ্গ দ্বৈততা প্রদর্শন করে, যা ফোটন হিসেবে কণার মতো এবং তরঙ্গের মতো উভয়ভাবে আচরণ করে।"
                  : "Light waves exhibit wave-particle duality, behaving both as particles (photons) and waves."}
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