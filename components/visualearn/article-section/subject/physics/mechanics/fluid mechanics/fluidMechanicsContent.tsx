
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function FluidMechanicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `তরল যান্ত্রিকী হল পদার্থবিজ্ঞানের একটি শাখা যা তরল এবং গ্যাসের আচরণ, স্থির এবং গতিশীল অবস্থায় অধ্যয়ন করে।
মূল ধারণা:
- তরলের ঘনত্ব এবং চাপ
- ভাস্কর্য এবং আর্কিমিডিসের নীতি
- প্রবাহের ধরন: স্তরিত এবং অশান্ত
- ভিসকোসিটি এবং প্রবাহ হার
- বার্নোলির সমীকরণ
সূত্রাবলী:
- ঘনত্ব: ρ = m/V
- চাপ: P = F/A
- আর্কিমিডিস: F_b = ρ_f V g
- বার্নোলির সমীকরণ: P + ½ρv² + ρgh = ধ্রুবক
- প্রবাহ হার: Q = A v`
      : `Fluid Mechanics is a branch of physics that studies the behavior of fluids (liquids and gases) at rest and in motion.
Key Concepts:
- Fluid density and pressure
- Buoyancy and Archimedes' principle
- Flow types: laminar and turbulent
- Viscosity and flow rate
- Bernoulli’s equation
Formulas:
- Density: ρ = m/V
- Pressure: P = F/A
- Archimedes: F_b = ρ_f V g
- Bernoulli’s equation: P + ½ρv² + ρgh = constant
- Flow rate: Q = A v`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "তরল যান্ত্রিকী" : "Fluid Mechanics"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "তরল যান্ত্রিকী পদার্থবিজ্ঞানের একটি শাখা যা তরল এবং গ্যাসের স্থির এবং গতিশীল অবস্থায় আচরণ অধ্যয়ন করে। এটি তরলের ঘনত্ব, চাপ, ভাস্কর্য, এবং প্রবাহের গতিবিদ্যার মতো বিষয়গুলি কভার করে।"
                  : "Fluid Mechanics is a branch of physics that studies the behavior of fluids (liquids and gases) at rest (fluid statics) and in motion (fluid dynamics). It covers topics like density, pressure, buoyancy, and flow dynamics."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "তরলগুলি তাদের পাত্রের আকৃতি গ্রহণ করে এবং চাপ, ঘনত্ব, এবং ভিসকোসিটির মতো বৈশিষ্ট্য দ্বারা চিহ্নিত হয়। তরল যান্ত্রিকী দুটি প্রধান শাখায় বিভক্ত: তরল স্থিতিবিজ্ঞান এবং তরল গতিবিজ্ঞান।"
                    : "Fluids take the shape of their container and are characterized by properties like pressure, density, and viscosity. Fluid Mechanics is divided into two main branches: fluid statics and fluid dynamics."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "তরল স্থিতিবিজ্ঞান" : "Fluid Statics"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "তরল স্থিতিবিজ্ঞান স্থির তরলের আচরণ অধ্যয়ন করে, যেমন চাপ এবং ভাস্কর্য।"
                  : "Fluid statics studies the behavior of fluids at rest, focusing on pressure and buoyancy."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "চাপ:" : "Pressure:"}
                  </p>
                  <p className="font-mono text-lg">P = F/A</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "চাপ হল প্রতি একক ক্ষেত্রফলে বল। ইউনিট: প্যাসকেল (Pa)"
                      : "Pressure is force per unit area. Unit: Pascal (Pa)"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "ঘনত্ব:" : "Density:"}
                  </p>
                  <p className="font-mono text-lg">ρ = m/V</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "ঘনত্ব হল প্রতি একক আয়তনে ভর। ইউনিট: kg/m³"
                      : "Density is mass per unit volume. Unit: kg/m³"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium">
                  {lang === "bn" ? "আর্কিমিডিসের নীতি:" : "Archimedes' Principle:"}
                </p>
                <p className="font-mono">F_b = ρ_f V g</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "একটি তরলে নিমজ্জিত বস্তুর উপর ভাস্কর্য বল তরলের ঘনত্ব, নিমজ্জিত আয়তন, এবং মাধ্যাকর্ষণ ত্বরণের গুণফল।"
                    : "The buoyant force on an object submerged in a fluid equals the weight of the displaced fluid."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "তরল গতিবিজ্ঞান" : "Fluid Dynamics"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "তরল গতিবিজ্ঞান গতিশীল তরলের আচরণ অধ্যয়ন করে, যেমন প্রবাহের ধরন এবং বার্নোলির নীতি।"
                  : "Fluid dynamics studies the behavior of fluids in motion, including flow types and Bernoulli’s principle."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "প্রবাহ হার:" : "Flow Rate:"}
                  </p>
                  <p className="font-mono text-lg">Q = A v</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "প্রবাহ হার হল প্রতি একক সময়ে তরলের আয়তন প্রবাহ।"
                      : "Flow rate is the volume of fluid passing per unit time."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "বার্নোলির সমীকরণ:" : "Bernoulli’s Equation:"}
                  </p>
                  <p className="font-mono text-lg">P + ½ρv² + ρgh = constant</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "চাপ, গতিশক্তি, এবং সম্ভাব্য শক্তির সমষ্টি ধ্রুবক।"
                      : "Sum of pressure, kinetic, and potential energy is constant."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রবাহের ধরন" : "Types of Flow"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "তরল প্রবাহ দুই ধরনের হতে পারে: স্তরিত (মসৃণ) এবং অশান্ত (অনিয়মিত)।"
                  : "Fluid flow can be laminar (smooth) or turbulent (irregular)."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Laminar Flow</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "মসৃণ, সুশৃঙ্খল প্রবাহ যেখানে তরল স্তরে স্তরে চলে।"
                      : "Smooth, orderly flow where fluid moves in layers."}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Turbulent Flow</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "অনিয়মিত, ঘূর্ণিময় প্রবাহ যেখানে তরল মিশ্রিত হয়।"
                      : "Irregular, chaotic flow with mixing and eddies."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ভিসকোসিটি" : "Viscosity"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "ভিসকোসিটি হল তরলের প্রবাহের প্রতিরোধ ক্ষমতা। এটি তরলের অভ্যন্তরীণ ঘর্ষণের পরিমাপ।"
                  : "Viscosity is a fluid’s resistance to flow, measuring internal friction."}
              </p>
              <p className="font-mono text-lg">F = η A (dv/dx)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === "bn"
                  ? "যেখানে η হল ভিসকোসিটি, A হল ক্ষেত্রফল, এবং dv/dx হল বেগের গ্রেডিয়েন্ট।"
                  : "Where η is viscosity, A is area, and dv/dx is velocity gradient."}
              </p>
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
                  <li>• {lang === "bn" ? "পাইপলাইন ডিজাইন" : "Pipeline design"}</li>
                  <li>• {lang === "bn" ? "বিমানের এয়ারোডিনামিক্স" : "Aerodynamics of aircraft"}</li>
                  <li>• {lang === "bn" ? "জাহাজ নকশা" : "Ship design"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "রক্ত প্রবাহ বিশ্লেষণ" : "Blood flow analysis"}</li>
                  <li>• {lang === "bn" ? "শ্বাসযন্ত্রের গতিবিদ্যা" : "Respiratory dynamics"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "চাপ সর্বদা তরলের গভীরতার সাথে বৃদ্ধি পায়।" : "Pressure increases with depth in a fluid."}</li>
                <li>• {lang === "bn" ? "বার্নোলির সমীকরণ শক্তি সংরক্ষণের নীতির উপর ভিত্তি করে।" : "Bernoulli’s equation is based on energy conservation."}</li>
                <li>• {lang === "bn" ? "ভিসকোসিটি তাপমাত্রার উপর নির্ভর করে।" : "Viscosity depends on temperature."}</li>
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
