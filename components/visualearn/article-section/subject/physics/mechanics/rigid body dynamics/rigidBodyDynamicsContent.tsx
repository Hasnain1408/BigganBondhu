
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function RigidBodyDynamicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `অনমনীয় বস্তুর গতিবিজ্ঞান অ-বিকৃতিশীল বস্তুর গতি অধ্যয়ন করে, যা বল এবং টর্কের অধীনে ট্রান্সলেশন এবং ঘূর্ণনকে একত্রিত করে।
মূল ধারণা:
- কৌণিক বেগ এবং ত্বরণ
- টর্ক এবং ঘূর্ণন জড়তা
- কৌণিক ভরবেগ
- শক্তি সংরক্ষণ
- গতির সমীকরণ
সূত্রাবলী:
- টর্ক: τ = r × F
- ঘূর্ণন জড়তা: I = Σ m r²
- কৌণিক ভরবেগ: L = I ω
- গতিশক্তি: K = ½ I ω²
- গতির সমীকরণ: τ = I α`
      : `Rigid Body Dynamics studies the motion of non-deformable objects, combining translation and rotation under forces and torques.
Key Concepts:
- Angular velocity and acceleration
- Torque and moment of inertia
- Angular momentum
- Energy conservation
- Equations of motion
Formulas:
- Torque: τ = r × F
- Moment of inertia: I = Σ m r²
- Angular momentum: L = I ω
- Kinetic energy: K = ½ I ω²
- Equation of motion: τ = I α`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "অনমনীয় বস্তুর গতিবিজ্ঞান" : "Rigid Body Dynamics"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "অনমনীয় বস্তুর গতিবিজ্ঞান পদার্থবিজ্ঞানের একটি শাখা যা এমন বস্তুর গতি অধ্যয়ন করে যা বিকৃত হয় না। এটি ট্রান্সলেশনাল এবং ঘূর্ণন গতির সমন্বয় করে, বল এবং টর্ক দ্বারা প্রভাবিত।"
                  : "Rigid Body Dynamics is a branch of physics that studies the motion of objects that do not deform. It combines translational and rotational motion, influenced by forces and torques."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "একটি অনমনীয় বস্তুতে প্রতিটি কণা একে অপরের সাথে স্থির দূরত্বে থাকে। এটি কৌণিক বেগ, টর্ক, এবং জড়তার ধারণার মাধ্যমে বর্ণিত হয়।"
                    : "In a rigid body, every particle maintains a fixed distance from others. It is described through concepts like angular velocity, torque, and inertia."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কৌণিক গতি" : "Angular Motion"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "কৌণিক গতি একটি নির্দিষ্ট অক্ষের চারপাশে বস্তুর ঘূর্ণন বর্ণনা করে।"
                  : "Angular motion describes the rotation of an object about a fixed axis."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "কৌণিক বেগ:" : "Angular Velocity:"}
                  </p>
                  <p className="font-mono text-lg">ω = dθ/dt</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "কোণের পরিবর্তনের হার, ইউনিট: rad/s" : "Rate of change of angle, Unit: rad/s"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "কৌণিক ত্বরণ:" : "Angular Acceleration:"}
                  </p>
                  <p className="font-mono text-lg">α = dω/dt</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "কৌণিক বেগের পরিবর্তনের হার, ইউনিট: rad/s²" : "Rate of change of angular velocity, Unit: rad/s²"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "টর্ক এবং জড়তা" : "Torque and Inertia"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "টর্ক হল ঘূর্ণন সৃষ্টিকারী বল, এবং জড়তার মুহূর্ত ঘূর্ণনের প্রতিরোধ পরিমাপ করে।"
                  : "Torque is the rotational equivalent of force, and moment of inertia measures resistance to rotation."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "টর্ক:" : "Torque:"}
                  </p>
                  <p className="font-mono text-lg">τ = r × F</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "r = দূরত্ব, F = বল" : "r = distance, F = force"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "জড়তার মুহূর্ত:" : "Moment of Inertia:"}
                  </p>
                  <p className="font-mono text-lg">I = Σ m r²</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "m = ভর, r = অক্ষ থেকে দূরত্ব" : "m = mass, r = distance from axis"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium">{lang === "bn" ? "গতির সমীকরণ:" : "Equation of Motion:"}</p>
                <p className="font-mono">τ = I α</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn" ? "নিউটনের দ্বিতীয় সূত্রের ঘূর্ণন রূপ" : "Rotational form of Newton’s second law"}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কৌণিক ভরবেগ" : "Angular Momentum"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "কৌণিক ভরবেগ ঘূর্ণন গতির পরিমাণ পরিমাপ করে এবং সংরক্ষিত থাকে যদি কোনো বাহ্যিক টর্ক না থাকে।"
                  : "Angular momentum measures the quantity of rotational motion and is conserved in the absence of external torques."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "কৌণিক ভরবেগ:" : "Angular Momentum:"}</p>
                  <p className="font-mono text-lg">L = I ω</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "I = জড়তার মুহূর্ত, ω = কৌণিক বেগ" : "I = moment of inertia, ω = angular velocity"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সংরক্ষণ:" : "Conservation:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "dL/dt = τ" : "dL/dt = τ"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "শক্তি" : "Energy"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "অনমনীয় বস্তুর গতিশক্তি ট্রান্সলেশনাল এবং ঘূর্ণন উভয় উপাদান নিয়ে গঠিত।"
                  : "The kinetic energy of a rigid body consists of both translational and rotational components."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ঘূর্ণন গতিশক্তি:" : "Rotational Kinetic Energy:"}</p>
                  <p className="font-mono text-lg">K = ½ I ω²</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ট্রান্সলেশনাল গতিশক্তি:" : "Translational Kinetic Energy:"}</p>
                  <p className="font-mono text-lg">K = ½ m v²</p>
                </div>
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
                  <li>• {lang === "bn" ? "যানবাহন গতিবিজ্ঞান" : "Vehicle dynamics"}</li>
                  <li>• {lang === "bn" ? "টারবাইন ডিজাইন" : "Turbine design"}</li>
                  <li>• {lang === "bn" ? "রোবটিক্স" : "Robotics"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "খেলাধুলা" : "Sports"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জিমন্যাস্টিক্স" : "Gymnastics"}</li>
                  <li>• {lang === "bn" ? "আইস স্কেটিং" : "Ice skating"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "টর্ক অক্ষের উপর নির্ভর করে।" : "Torque depends on the axis of rotation."}</li>
                <li>• {lang === "bn" ? "জড়তার মুহূর্ত বস্তুর ভর বণ্টনের উপর নির্ভর করে।" : "Moment of inertia depends on mass distribution."}</li>
                <li>• {lang === "bn" ? "কৌণিক ভরবেগ সংরক্ষিত থাকে বাহ্যিক টর্ক ছাড়া।" : "Angular momentum is conserved without external torques."}</li>
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
