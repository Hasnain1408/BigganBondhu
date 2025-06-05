"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function SoundWaveContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `শব্দ তরঙ্গ হল একটি যান্ত্রিক তরঙ্গ যা পদার্থের কণাগুলির কম্পনের মাধ্যমে শক্তি স্থানান্তর করে।
মূল বৈশিষ্ট্যসমূহ:
- দ্রাঘিমিক তরঙ্গ (কম্পন তরঙ্গের দিকে)
- মাধ্যমের প্রয়োজন হয়
- সংকোচন ও প্রসারণ অঞ্চল
- ফ্রিকোয়েন্সি: 20 Hz - 20,000 Hz
সূত্রাবলী:
- v = fλ (তরঙ্গ সমীকরণ)
- v = √(E/ρ) (শব্দের গতি)
- I = P/A (তীব্রতা)
- β = 10 log(I/I₀) (ডেসিবেল)
ডপলার প্রভাব: f' = f(v±vₒ)/(v±vₛ)
প্রতিধ্বনি: t = 2d/v`
      : `Sound waves are mechanical waves that transfer energy through the vibration of particles in a medium.
Key characteristics:
- Longitudinal wave (vibration parallel to direction)
- Requires a medium to propagate
- Compression and rarefaction regions
- Frequency range: 20 Hz - 20,000 Hz
Formulas:
- v = fλ (wave equation)
- v = √(E/ρ) (speed of sound)
- I = P/A (intensity)
- β = 10 log(I/I₀) (decibel)
Doppler effect: f' = f(v±vₒ)/(v±vₛ)
Echo: t = 2d/v`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "শব্দ তরঙ্গ" : "Sound Waves"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "শব্দ তরঙ্গ হল একটি যান্ত্রিক তরঙ্গ যা পদার্থের কণাগুলির কম্পনের মাধ্যমে শক্তি স্থানান্তর করে। এটি একটি দ্রাঘিমিক তরঙ্গ যেখানে কণাগুলি তরঙ্গের গতির দিকেই কম্পিত হয়।"
                  : "Sound waves are mechanical waves that transfer energy through the vibration of particles in a medium. They are longitudinal waves where particles vibrate parallel to the direction of wave propagation."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মৌলিক সংজ্ঞা" : "Basic Definition"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn" 
                    ? "শব্দ তরঙ্গ = চাপের পরিবর্তনের তরঙ্গ যা কান শুনতে পায়"
                    : "Sound wave = pressure variation wave that can be detected by the ear"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শব্দ তরঙ্গের প্রকৃতি" : "Nature of Sound Waves"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  {lang === "bn" ? "দ্রাঘিমিক তরঙ্গ" : "Longitudinal Wave"}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {lang === "bn"
                    ? "কণাগুলি তরঙ্গের গতির দিকেই কম্পিত হয়। সংকোচন ও প্রসারণ অঞ্চল তৈরি হয়।"
                    : "Particles vibrate parallel to wave direction. Creates compression and rarefaction regions."}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "যান্ত্রিক তরঙ্গ" : "Mechanical Wave"}
                </h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {lang === "bn"
                    ? "প্রচারের জন্য মাধ্যমের প্রয়োজন। শূন্য স্থানে শব্দ চলাচল করতে পারে না।"
                    : "Requires a medium to propagate. Cannot travel through vacuum."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শব্দ তরঙ্গের বৈশিষ্ট্য" : "Characteristics of Sound Waves"}
            </h4>
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                  {lang === "bn" ? "ফ্রিকোয়েন্সি (f)" : "Frequency (f)"}
                </h5>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <li>
                    {lang === "bn"
                      ? "• শ্রবণযোগ্য পরিসর: 20 Hz - 20,000 Hz"
                      : "• Audible range: 20 Hz - 20,000 Hz"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• অশ্রবণীয় (< 20 Hz): ইনফ্রাসনিক"
                      : "• Inaudible (< 20 Hz): Infrasonic"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• অতিশ্রবণীয় (> 20,000 Hz): আল্ট্রাসনিক"
                      : "• Ultrasonic (> 20,000 Hz): Ultrasonic"}
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  {lang === "bn" ? "তরঙ্গদৈর্ঘ্য (λ)" : "Wavelength (λ)"}
                </h5>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {lang === "bn"
                    ? "দুটি পরপর সংকোচন বা প্রসারণের মধ্যে দূরত্ব। λ = v/f"
                    : "Distance between two consecutive compressions or rarefactions. λ = v/f"}
                </p>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "বিস্তার (A)" : "Amplitude (A)"}
                </h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">
                  {lang === "bn"
                    ? "কণার সর্বোচ্চ সরণ। শব্দের তীব্রতা নির্ধারণ করে।"
                    : "Maximum displacement of particles. Determines loudness of sound."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শব্দের গতি" : "Speed of Sound"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "সাধারণ সূত্র:" : "General Formula:"}
                </p>
                <p className="font-mono text-lg">v = √(E/ρ)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "যেখানে E = স্থিতিস্থাপক গুণাঙ্ক, ρ = ঘনত্ব"
                    : "where E = elastic modulus, ρ = density"}
                </p>
              </div>
              
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "বিভিন্ন মাধ্যমে গতি:" : "Speed in Different Media:"}
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>
                    {lang === "bn"
                      ? "• বাতাসে (20°C): 343 m/s"
                      : "• In air (20°C): 343 m/s"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• পানিতে: 1500 m/s"
                      : "• In water: 1500 m/s"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• ইস্পাতে: 5000 m/s"
                      : "• In steel: 5000 m/s"}
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium">
                  {lang === "bn" ? "তাপমাত্রার প্রভাব:" : "Temperature Effect:"}
                </p>
                <p className="font-mono text-lg">v = v₀ + 0.6T</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "যেখানে T = তাপমাত্রা (°C), v₀ = 331 m/s (0°C এ)"
                    : "where T = temperature (°C), v₀ = 331 m/s (at 0°C)"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শব্দের তীব্রতা ও প্রাবল্য" : "Intensity and Loudness"}
            </h4>
            <div className="space-y-3">
              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  {lang === "bn" ? "তীব্রতা (I)" : "Intensity (I)"}
                </h5>
                <p className="font-mono text-lg mb-2">I = P/A = ρvω²A²/2</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {lang === "bn"
                    ? "একক ক্ষেত্রফলের মধ্য দিয়ে প্রতি সেকেন্ডে প্রবাহিত শক্তি। একক: W/m²"
                    : "Power per unit area. Unit: W/m². Proportional to square of amplitude."}
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "ডেসিবেল স্কেল" : "Decibel Scale"}
                </h5>
                <p className="font-mono text-lg mb-2">β = 10 log₁₀(I/I₀)</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  {lang === "bn"
                    ? "যেখানে I₀ = 10⁻¹² W/m² (শ্রবণ সীমা)"
                    : "where I₀ = 10⁻¹² W/m² (threshold of hearing)"}
                </p>
                <div className="mt-2 text-xs space-y-1">
                  <p>{lang === "bn" ? "• ফিসফিস: 20 dB" : "• Whisper: 20 dB"}</p>
                  <p>{lang === "bn" ? "• সাধারণ কথা: 60 dB" : "• Normal conversation: 60 dB"}</p>
                  <p>{lang === "bn" ? "• ট্রাফিক: 80 dB" : "• Traffic: 80 dB"}</p>
                  <p>{lang === "bn" ? "• জেট ইঞ্জিন: 140 dB" : "• Jet engine: 140 dB"}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডপলার ইফেক্ট" : "Doppler Effect"}
            </h4>
            <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg space-y-3">
              <p className="text-pink-700 dark:text-pink-300">
                {lang === "bn"
                  ? "উৎস বা পর্যবেক্ষকের গতির কারণে শব্দের ফ্রিকোয়েন্সি পরিবর্তন।"
                  : "Change in frequency due to relative motion between source and observer."}
              </p>
              
              <div>
                <p className="font-medium text-pink-800 dark:text-pink-200">
                  {lang === "bn" ? "সাধারণ সূত্র:" : "General Formula:"}
                </p>
                <p className="font-mono text-lg">f' = f × (v ± v₀)/(v ± vₛ)</p>
                <div className="text-sm text-pink-700 dark:text-pink-300 mt-2">
                  <p>{lang === "bn" ? "যেখানে:" : "where:"}</p>
                  <ul className="ml-4 space-y-1">
                    <li>f' = {lang === "bn" ? "পর্যবেক্ষিত ফ্রিকোয়েন্সি" : "observed frequency"}</li>
                    <li>f = {lang === "bn" ? "প্রকৃত ফ্রিকোয়েন্সি" : "actual frequency"}</li>
                    <li>v = {lang === "bn" ? "শব্দের গতি" : "speed of sound"}</li>
                    <li>v₀ = {lang === "bn" ? "পর্যবেক্ষকের গতি" : "observer's velocity"}</li>
                    <li>vₛ = {lang === "bn" ? "উৎসের গতি" : "source's velocity"}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-pink-900 p-3 rounded">
                <h6 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিহ্ন নিয়ম:" : "Sign Convention:"}
                </h6>
                <ul className="text-xs text-pink-700 dark:text-pink-300 space-y-1">
                  <li>
                    {lang === "bn"
                      ? "• পর্যবেক্ষক উৎসের দিকে গেলে: +v₀"
                      : "• Observer moving towards source: +v₀"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• উৎস পর্যবেক্ষকের দিকে গেলে: -vₛ"
                      : "• Source moving towards observer: -vₛ"}
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রতিধ্বনি" : "Echo"}
            </h4>
            <div className="bg-cyan-50 dark:bg-cyan-950 p-4 rounded-lg space-y-2">
              <p className="text-cyan-700 dark:text-cyan-300">
                {lang === "bn"
                  ? "প্রতিধ্বনি হল প্রতিফলিত শব্দ যা মূল শব্দের পর আলাদাভাবে শোনা যায়।"
                  : "Echo is reflected sound that can be heard distinctly after the original sound."}
              </p>
              
              <div>
                <p className="font-medium text-cyan-800 dark:text-cyan-200">
                  {lang === "bn" ? "প্রতিধ্বনি শুনতে শর্ত:" : "Conditions for Echo:"}
                </p>
                <ul className="text-sm text-cyan-700 dark:text-cyan-300 ml-4 space-y-1">
                  <li>
                    {lang === "bn"
                      ? "• নূন্যতম দূরত্ব: 17 মিটার (বাতাসে)"
                      : "• Minimum distance: 17 meters (in air)"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• সময়ের ব্যবধান: ≥ 0.1 সেকেন্ড"
                      : "• Time interval: ≥ 0.1 second"}
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-cyan-800 dark:text-cyan-200">
                  {lang === "bn" ? "প্রতিধ্বনির সময়:" : "Echo Time:"}
                </p>
                <p className="font-mono text-lg">t = 2d/v</p>
                <p className="text-sm text-cyan-700 dark:text-cyan-300">
                  {lang === "bn" 
                    ? "যেখানে d = প্রতিফলকের দূরত্ব, v = শব্দের গতি"
                    : "where d = distance to reflector, v = speed of sound"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অনুরণন" : "Resonance"}
            </h4>
            <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg space-y-2">
              <p className="text-emerald-700 dark:text-emerald-300">
                {lang === "bn"
                  ? "যখন কোনো বস্তুর প্রাকৃতিক কম্পাঙ্ক বাহ্যিক বলের কম্পাঙ্কের সাথে মিলে যায়।"
                  : "When the natural frequency of an object matches the frequency of external force."}
              </p>
              
              <div>
                <p className="font-medium text-emerald-800 dark:text-emerald-200">
                  {lang === "bn" ? "বায়ু স্তম্ভে অনুরণন:" : "Resonance in Air Column:"}
                </p>
                <ul className="text-sm text-emerald-700 dark:text-emerald-300 ml-4 space-y-1">
                  <li>
                    {lang === "bn"
                      ? "• বন্ধ নল: f = nv/4L (n = 1,3,5...)"
                      : "• Closed pipe: f = nv/4L (n = 1,3,5...)"}
                  </li>
                  <li>
                    {lang === "bn"
                      ? "• খোলা নল: f = nv/2L (n = 1,2,3...)"
                      : "• Open pipe: f = nv/2L (n = 1,2,3...)"}
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-violet-50 dark:bg-violet-950 p-3 rounded-lg">
                <h5 className="font-medium text-violet-800 dark:text-violet-200">
                  {lang === "bn" ? "আল্ট্রাসাউন্ড" : "Ultrasound"}
                </h5>
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  {lang === "bn"
                    ? "চিকিৎসা, গর্ভস্থ শিশু দেখা, ত্রুটি নির্ণয়"
                    : "Medical imaging, fetal monitoring, defect detection"}
                </p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-950 p-3 rounded-lg">
                <h5 className="font-medium text-rose-800 dark:text-rose-200">
                  {lang === "bn" ? "সোনার" : "SONAR"}
                </h5>
                <p className="text-sm text-rose-700 dark:text-rose-300">
                  {lang === "bn"
                    ? "সমুদ্রের গভীরতা ও বস্তু সনাক্তকরণ"
                    : "Ocean depth measurement and object detection"}
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-lg">
                <h5 className="font-medium text-amber-800 dark:text-amber-200">
                  {lang === "bn" ? "সঙ্গীত যন্ত্র" : "Musical Instruments"}
                </h5>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {lang === "bn"
                    ? "স্ট্রিং, উইন্ড ও পারকাশন ইন্সট্রুমেন্ট"
                    : "String, wind, and percussion instruments"}
                </p>
              </div>
              <div className="bg-lime-50 dark:bg-lime-950 p-3 rounded-lg">
                <h5 className="font-medium text-lime-800 dark:text-lime-200">
                  {lang === "bn" ? "শব্দ নিয়ন্ত্রণ" : "Sound Control"}
                </h5>
                <p className="text-sm text-lime-700 dark:text-lime-300">
                  {lang === "bn"
                    ? "শব্দ নিরোধক, একুস্টিক ডিজাইন"
                    : "Soundproofing, acoustic design"}
                </p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-l-4 border-red-400">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
              </h4>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {lang === "bn"
                  ? "শব্দ তরঙ্গ শুধুমাত্র পদার্থের মধ্য দিয়ে যেতে পারে। শূন্য স্থানে শব্দ নেই। এজন্য মহাকাশে কোনো শব্দ শোনা যায় না।"
                  : "Sound waves can only travel through matter. There is no sound in vacuum. This is why no sound can be heard in space."}
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