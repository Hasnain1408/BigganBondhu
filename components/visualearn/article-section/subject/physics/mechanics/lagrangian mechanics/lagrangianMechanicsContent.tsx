
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function LagrangianMechanicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ল্যাগ্রাঞ্জিয়ান মেকানিক্স হল ক্লাসিক্যাল মেকানিক্সের একটি পুনর্গঠন যা ল্যাগ্রাঞ্জিয়ান ব্যবহার করে জটিল সিস্টেমের সমাধান সহজ করে।
মূল ধারণা:
- ল্যাগ্রাঞ্জিয়ান: L = T - V
- অ্যাকশন এবং স্টেশনারি অ্যাকশন নীতি
- অয়লার-ল্যাগ্রাঞ্জ সমীকরণ
- সাধারণীকৃত স্থানাঙ্ক
- সংরক্ষণ আইন
সূত্রাবলী:
- ল্যাগ্রাঞ্জিয়ান: L = T - V
- অ্যাকশন: S = ∫ L dt
- অয়লার-ল্যাগ্রাঞ্জ: d/dt (∂L/∂q̇) - ∂L/∂q = 0
- গতিশক্তি: T = ½ m v²
- সম্ভাব্য শক্তি: V (সিস্টেম নির্ভর)`
      : `Lagrangian Mechanics is a reformulation of classical mechanics using the Lagrangian, simplifying solutions for complex systems.
Key Concepts:
- Lagrangian: L = T - V
- Action and the principle of stationary action
- Euler-Lagrange equation
- Generalized coordinates
- Conservation laws
Formulas:
- Lagrangian: L = T - V
- Action: S = ∫ L dt
- Euler-Lagrange: d/dt (∂L/∂q̇) - ∂L/∂q = 0
- Kinetic energy: T = ½ m v²
- Potential energy: V (system-dependent)`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ল্যাগ্রাঞ্জিয়ান মেকানিক্স" : "Lagrangian Mechanics"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ল্যাগ্রাঞ্জিয়ান মেকানিক্স হল নিউটনীয় মেকানিক্সের একটি বিকল্প পদ্ধতি যা জোসেফ-লুই ল্যাগ্রাঞ্জ দ্বারা বিকশিত। এটি গতিশক্তি এবং সম্ভাব্য শক্তির পার্থক্য (ল্যাগ্রাঞ্জিয়ান) ব্যবহার করে সিস্টেমের গতি বর্ণনা করে।"
                  : "Lagrangian Mechanics is an alternative to Newtonian mechanics developed by Joseph-Louis Lagrange. It describes the motion of systems using the difference between kinetic and potential energy (the Lagrangian)."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "ল্যাগ্রাঞ্জিয়ান মেকানিক্স সিস্টেমের গতিপথ নির্ধারণে অ্যাকশন নীতি ব্যবহার করে, যেখানে অ্যাকশন স্থির থাকে। এটি জটিল সিস্টেম, যেমন দোলনা বা গ্রহের কক্ষপথ, বিশ্লেষণে সুবিধাজনক।"
                    : "Lagrangian Mechanics uses the principle of stationary action to determine the path of a system, where action is stationary. It is particularly useful for complex systems like pendulums or planetary orbits."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ল্যাগ্রাঞ্জিয়ান এবং অ্যাকশন" : "Lagrangian and Action"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "ল্যাগ্রাঞ্জিয়ান হল গতিশক্তি (T) এবং সম্ভাব্য শক্তি (V)-এর পার্থক্য। অ্যাকশন হল ল্যাগ্রাঞ্জিয়ানের সময়ের ওপর সমাকলন।"
                  : "The Lagrangian is the kinetic energy (T) minus the potential energy (V). Action is the integral of the Lagrangian over time."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "ল্যাগ্রাঞ্জিয়ান:" : "Lagrangian:"}
                  </p>
                  <p className="font-mono text-lg">L = T - V</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "T = গতিশক্তি, V = সম্ভাব্য শক্তি" : "T = kinetic energy, V = potential energy"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "অ্যাকশন:" : "Action:"}
                  </p>
                  <p className="font-mono text-lg">S = ∫ L dt</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "সময়ের ওপর ল্যাগ্রাঞ্জিয়ানের সমাকলন" : "Integral of Lagrangian over time"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium">
                  {lang === "bn" ? "স্টেশনারি অ্যাকশন নীতি:" : "Principle of Stationary Action:"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "প্রকৃত গতিপথ অ্যাকশনকে স্থির (সর্বনিম্ন, সর্বাধিক, বা স্যাডল পয়েন্ট) করে।"
                    : "The actual path taken by a system makes the action stationary (minimum, maximum, or saddle point)."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অয়লার-ল্যাগ্রাঞ্জ সমীকরণ" : "Euler-Lagrange Equation"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "অয়লার-ল্যাগ্রাঞ্জ সমীকরণ গতির সমীকরণ প্রদান করে যা সিস্টেমের গতিপথ নির্ধারণ করে।"
                  : "The Euler-Lagrange equation provides the equations of motion that determine the system’s path."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "অয়লার-ল্যাগ্রাঞ্জ:" : "Euler-Lagrange:"}
                  </p>
                  <p className="font-mono text-lg">d/dt (∂L/∂q̇) - ∂L/∂q = 0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "q = সাধারণীকৃত স্থানাঙ্ক, q̇ = সময়ের সাপেক্ষে q-এর ডেরিভেটিভ"
                      : "q = generalized coordinate, q̇ = time derivative of q"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সাধারণীকৃত স্থানাঙ্ক" : "Generalized Coordinates"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "সাধারণীকৃত স্থানাঙ্ক সিস্টেমের অবস্থান বর্ণনা করতে ব্যবহৃত হয়, যা সাধারণত কার্টেসিয়ান স্থানাঙ্কের চেয়ে সুবিধাজনক।"
                  : "Generalized coordinates describe the system’s configuration, often more convenient than Cartesian coordinates."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "উদাহরণ:" : "Example:"}</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "দোলনার জন্য কোণ (θ)"
                      : "Angle (θ) for a pendulum"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সুবিধা:" : "Advantage:"}</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "বাধার প্রভাব স্বয়ংক্রিয়ভাবে বিবেচিত হয়"
                      : "Constraints are automatically accounted for"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "সংরক্ষণ আইন" : "Conservation Laws"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "ল্যাগ্রাঞ্জিয়ান মেকানিক্স নোইদার উপপাদ্যের মাধ্যমে সংরক্ষণ আইন প্রকাশ করে।"
                  : "Lagrangian Mechanics derives conservation laws via Noether’s theorem."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "শক্তি সংরক্ষণ:" : "Energy Conservation:"}</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "যখন L সময়ের উপর নির্ভর করে না"
                      : "When L is time-independent"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ভরবেগ সংরক্ষণ:" : "Momentum Conservation:"}</p>
                  <p className="text-sm">
                    {lang === "bn"
                      ? "যখন L স্থানাঙ্কের উপর নির্ভর করে না"
                      : "When L is coordinate-independent"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "পদার্থবিজ্ঞান" : "Physics"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "দ্বৈত দোলনা বিশ্লেষণ" : "Double pendulum analysis"}</li>
                  <li>• {lang === "bn" ? "গ্রহের কক্ষপথ" : "Planetary orbits"}</li>
                  <li>• {lang === "bn" ? "কণা পদার্থবিজ্ঞান" : "Particle physics"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "রোবটিক্স নিয়ন্ত্রণ" : "Robotics control"}</li>
                  <li>• {lang === "bn" ? "মহাকাশযান গতিপথ" : "Spacecraft trajectories"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "সঠিক সাধারণীকৃত স্থানাঙ্ক নির্বাচন সমাধান সহজ করে।" : "Choosing appropriate generalized coordinates simplifies solutions."}</li>
                <li>• {lang === "bn" ? "অয়লার-ল্যাগ্রাঞ্জ সমীকরণ প্রতিটি স্থানাঙ্কের জন্য প্রয়োগ করুন।" : "Apply Euler-Lagrange for each coordinate."}</li>
                <li>• {lang === "bn" ? "সংরক্ষণ আইন সমাধানের জন্য চেক করুন।" : "Check conservation laws to aid solutions."}</li>
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
