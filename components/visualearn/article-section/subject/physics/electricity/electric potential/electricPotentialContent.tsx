"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectricPotentialContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বৈদ্যুতিক বিভব হল একটি নির্দিষ্ট বিন্দুতে একক ধনাত্মক চার্জকে অসীম দূরত্ব থেকে আনতে যে কাজ করতে হয়।
মূল বৈশিষ্ট্যসমূহ:
- স্কেলার রাশি (দিক নেই)
- একক: ভোল্ট (V)
- বৈদ্যুতিক ক্ষেত্রের সাথে সম্পর্কিত
- সরণের উপর নির্ভরশীল নয়
সূত্রাবলী:
- V = kQ/r (বিন্দু চার্জের জন্য)
- V = W/q (কাজের সংজ্ঞা)
- E = -dV/dr (বৈদ্যুতিক ক্ষেত্র)
- সমবিভব তল: V = ধ্রুবক
বৈদ্যুতিক বিভব শক্তি: U = qV
ধারকের শক্তি: U = ½CV²`
      : `Electric potential is the work done per unit positive charge in bringing it from infinity to a specific point in an electric field.
Key characteristics:
- Scalar quantity (no direction)
- Unit: Volt (V)
- Related to electric field
- Path independent
Formulas:
- V = kQ/r (for point charge)
- V = W/q (work definition)
- E = -dV/dr (electric field)
- Equipotential surface: V = constant
Electric potential energy: U = qV
Capacitor energy: U = ½CV²`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বৈদ্যুতিক বিভব" : "Electric Potential"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "বৈদ্যুতিক বিভব হল একটি নির্দিষ্ট বিন্দুতে একক ধনাত্মক চার্জকে অসীম দূরত্ব থেকে আনতে যে কাজ করতে হয়। এটি একটি স্কেলার রাশি এবং ভোল্ট (V) এককে পরিমাপ করা হয়।"
                  : "Electric potential is the work done per unit positive charge in bringing it from infinity to a specific point in an electric field. It is a scalar quantity measured in volts (V)."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "গাণিতিক সংজ্ঞা" : "Mathematical Definition"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn" 
                    ? "V = W/q, যেখানে V = বৈদ্যুতিক বিভব, W = কাজ, q = চার্জ"
                    : "V = W/q, where V = electric potential, W = work done, q = charge"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                {lang === "bn"
                  ? "স্কেলার রাশি: বৈদ্যুতিক বিভবের কোনো দিক নেই, শুধুমাত্র মান আছে"
                  : "Scalar quantity: Electric potential has magnitude only, no direction"}
              </li>
              <li>
                {lang === "bn"
                  ? "একক: ভোল্ট (V) = জুল/কুলম্ব (J/C)"
                  : "Unit: Volt (V) = Joule/Coulomb (J/C)"}
              </li>
              <li>
                {lang === "bn"
                  ? "পথ নিরপেক্ষ: বিভবের পার্থক্য চলার পথের উপর নির্ভর করে না"
                  : "Path independent: Potential difference doesn't depend on the path taken"}
              </li>
              <li>
                {lang === "bn"
                  ? "সুপারপজিশন নীতি: একাধিক চার্জের মোট বিভব হল আলাদা আলাদা বিভবের যোগফল"
                  : "Superposition principle: Total potential due to multiple charges is the algebraic sum"}
              </li>
            </ul>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "বিন্দু চার্জের জন্য:" : "For Point Charge:"}
                </p>
                <p className="font-mono text-lg">V = kQ/r = (1/4πε₀)(Q/r)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "যেখানে k = 9×10⁹ N⋅m²/C², Q = চার্জ, r = দূরত্ব"
                    : "where k = 9×10⁹ N⋅m²/C², Q = charge, r = distance"}
                </p>
              </div>
              
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "বৈদ্যুতিক ক্ষেত্রের সাথে সম্পর্ক:" : "Relation with Electric Field:"}
                </p>
                <p className="font-mono text-lg">E = -dV/dr</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "বৈদ্যুতিক ক্ষেত্র = বিভব গ্রেডিয়েন্টের ঋণাত্মক মান"
                    : "Electric field = negative gradient of potential"}
                </p>
              </div>

              <div>
                <p className="font-medium">
                  {lang === "bn" ? "বৈদ্যুতিক বিভব শক্তি:" : "Electric Potential Energy:"}
                </p>
                <p className="font-mono text-lg">U = qV = kqQ/r</p>
              </div>

              <div>
                <p className="font-medium">
                  {lang === "bn" ? "ধারকের শক্তি:" : "Capacitor Energy:"}
                </p>
                <p className="font-mono text-lg">U = ½CV² = ½QV = Q²/2C</p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সমবিভব তল" : "Equipotential Surfaces"}
            </h4>
            <div className="space-y-2">
              <p>
                {lang === "bn"
                  ? "সমবিভব তল হল এমন একটি তল যার সব বিন্দুতে বৈদ্যুতিক বিভব সমান থাকে।"
                  : "An equipotential surface is a surface on which all points have the same electric potential."}
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  {lang === "bn"
                    ? "বৈদ্যুতিক ক্ষেত্রের রেখা সমবিভব তলের সাথে লম্ব"
                    : "Electric field lines are perpendicular to equipotential surfaces"}
                </li>
                <li>
                  {lang === "bn"
                    ? "সমবিভব তলে চার্জ চালনায় কোনো কাজ করতে হয় না"
                    : "No work is done in moving a charge along an equipotential surface"}
                </li>
                <li>
                  {lang === "bn"
                    ? "পরিবাহীর পৃষ্ঠ সর্বদা সমবিভব তল"
                    : "The surface of a conductor is always equipotential"}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">
                  {lang === "bn" ? "ভোল্টমিটার" : "Voltmeter"}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {lang === "bn"
                    ? "বৈদ্যুতিক বিভবের পার্থক্য পরিমাপ করে"
                    : "Measures electric potential difference"}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">
                  {lang === "bn" ? "ব্যাটারি" : "Battery"}
                </h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {lang === "bn"
                    ? "ধ্রুব বিভবের পার্থক্য প্রদান করে"
                    : "Provides constant potential difference"}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200">
                  {lang === "bn" ? "ক্যাথোড রে টিউব" : "Cathode Ray Tube"}
                </h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  {lang === "bn"
                    ? "ইলেকট্রন ত্বরণে ব্যবহৃত"
                    : "Used for electron acceleration"}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                <h5 className="font-medium text-red-800 dark:text-red-200">
                  {lang === "bn" ? "তড়িৎ বিশ্লেষণ" : "Electrolysis"}
                </h5>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {lang === "bn"
                    ? "রাসায়নিক বিক্রিয়ায় ব্যবহৃত"
                    : "Used in chemical reactions"}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                {lang === "bn"
                  ? "বৈদ্যুতিক বিভব এবং বৈদ্যুতিক বিভব শক্তি আলাদা ধারণা। বিভব হল একক চার্জের জন্য শক্তি, আর বিভব শক্তি হল নির্দিষ্ট চার্জের জন্য শক্তি।"
                  : "Electric potential and electric potential energy are different concepts. Potential is energy per unit charge, while potential energy is energy for a specific charge."}
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