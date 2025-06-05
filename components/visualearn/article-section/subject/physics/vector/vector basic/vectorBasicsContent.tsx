"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function VectorBasicsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ভেক্টর হল এমন রাশি যার মান এবং দিক উভয়ই থাকে। এটি স্থানচ্যুতি, বেগ, এবং বলের মতো ভৌত রাশি বর্ণনা করতে ব্যবহৃত হয়।
মূল বৈশিষ্ট্যসমূহ:
- মান এবং দিক
- উপাংশ: x, y, z
- একক ভেক্টর: মান ১
- শূন্য ভেক্টর: মান ০
গুরুত্বপূর্ণ ক্রিয়াকলাপ:
- যোগ: ভেক্টরের উপাংশের যোগফল
- বিয়োগ: উপাংশের পার্থক্য
- স্কেলার গুণন: মানের পরিবর্তন
- ডট প্রোডাক্ট: স্কেলার ফলাফল
- ক্রস প্রোডাক্ট: ভেক্টর ফলাফল
সূত্রাবলী:
- মান: |A| = √(Ax² + Ay²)
- ডট প্রোডাক্ট: A·B = |A||B|cosθ
- ক্রস প্রোডাক্ট: |A×B| = |A||B|sinθ
- কোণ: cosθ = (A·B)/(|A||B|) `
      : `Vectors are quantities with both magnitude and direction, used to describe physical quantities like displacement, velocity, and force.
Key characteristics:
- Magnitude and direction
- Components: x, y, z
- Unit vector: magnitude 1
- Zero vector: magnitude 0
Important operations:
- Addition: Sum of components
- Subtraction: Difference of components
- Scalar multiplication: Scaling magnitude
- Dot product: Scalar result
- Cross product: Vector result
Formulas:
- Magnitude: |A| = √(Ax² + Ay²)
- Dot product: A·B = |A||B|cosθ
- Cross product: |A×B| = |A||B|sinθ
- Angle: cosθ = (A·B)/(|A||B|) `

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ভেক্টরের মৌলিক বিষয়" : "Vector Basics"}
            </h3>

            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ভেক্টর হল এমন একটি রাশি যার মান এবং দিক উভয়ই থাকে। এটি স্থানচ্যুতি, বেগ, এবং বলের মতো ভৌত রাশি বর্ণনা করতে ব্যবহৃত হয়। ভেক্টরগুলি তীর দ্বারা উপস্থাপিত হয়, যেখানে তীরের দৈর্ঘ্য মান এবং দিক নির্দেশ করে।"
                  : "A vector is a quantity with both magnitude and direction, used to describe physical quantities like displacement, velocity, and force. Vectors are represented by arrows, where the length indicates magnitude and the orientation shows direction."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "গাণিতিক সংজ্ঞা" : "Mathematical Definition"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "একটি ভেক্টর A = (Ax, Ay) হিসেবে উপস্থাপিত হয়, যেখানে Ax এবং Ay হল x এবং y উপাংশ।"
                    : "A vector A = (Ax, Ay) is represented with components Ax and Ay along x and y axes."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                {lang === "bn"
                  ? "মান এবং দিক: ভেক্টরের দৈর্ঘ্য (মান) এবং দিক থাকে।"
                  : "Magnitude and direction: Vectors have a length (magnitude) and orientation."}
              </li>
              <li>
                {lang === "bn"
                  ? "উপাংশ: ভেক্টরকে x, y, এবং z উপাংশে ভাগ করা যায়।"
                  : "Components: Vectors can be broken into x, y, and z components."}
              </li>
              <li>
                {lang === "bn"
                  ? "একক ভেক্টর: মান ১, নির্দিষ্ট দিকে নির্দেশ করে।"
                  : "Unit vector: Has magnitude 1, points in a specific direction."}
              </li>
              <li>
                {lang === "bn"
                  ? "শূন্য ভেক্টর: মান ০, কোনো নির্দিষ্ট দিক নেই।"
                  : "Zero vector: Has magnitude 0, no specific direction."}
              </li>
            </ul>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ ক্রিয়াকলাপ" : "Important Operations"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "ভেক্টর যোগ:" : "Vector Addition:"}
                </p>
                <p className="font-mono text-lg">A + B = (Ax + Bx, Ay + By)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "উপাংশের যোগফল, ত্রিভুজ বা সমান্তরাল নিয়ম ব্যবহার করা হয়।"
                    : "Sum of components, using triangle or parallelogram rule."}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "ভেক্টর বিয়োগ:" : "Vector Subtraction:"}
                </p>
                <p className="font-mono text-lg">A - B = (Ax - Bx, Ay - By)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "উপাংশের পার্থক্য, বিপরীত ভেক্টর যোগের সমতুল্য।"
                    : "Difference of components, equivalent to adding the negative vector."}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "স্কেলার গুণন:" : "Scalar Multiplication:"}
                </p>
                <p className="font-mono text-lg">kA = (kAx, kAy)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "মানকে স্কেলার দ্বারা গুণ করা হয়, দিক অপরিবর্তিত থাকে।"
                    : "Scales the magnitude by a scalar, direction remains unchanged."}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {lang === "bn" ? "ডট প্রোডাক্ট:" : "Dot Product:"}
                </p>
                <p className="font-mono text-lg">A·B = AxBx + AyBy</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "bn"
                    ? "স্কেলার ফলাফল, ভেক্টরের মধ্যবর্তী কোণ সম্পর্কে তথ্য দেয়।"
                    : "Scalar result, provides information about the angle between vectors."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">
                  {lang === "bn" ? "পদার্থবিজ্ঞান" : "Physics"}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {lang === "bn"
                    ? "বল, বেগ, এবং ত্বরণ বর্ণনা করতে ব্যবহৃত।"
                    : "Used to describe force, velocity, and acceleration."}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">
                  {lang === "bn" ? "নেভিগেশন" : "Navigation"}
                </h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {lang === "bn"
                    ? "দিক এবং দূরত্ব নির্ণয়ে ব্যবহৃত।"
                    : "Used for direction and distance calculations."}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200">
                  {lang === "bn" ? "কম্পিউটার গ্রাফিক্স" : "Computer Graphics"}
                </h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  {lang === "bn"
                    ? "3D মডেলিং এবং অ্যানিমেশনে ভেক্টর ব্যবহৃত।"
                    : "Used in 3D modeling and animations."}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                <h5 className="font-medium text-red-800 dark:text-red-200">
                  {lang === "bn" ? "ইঞ্জিনিয়ারিং" : "Engineering"}
                </h5>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {lang === "bn"
                    ? "কাঠামোগত বিশ্লেষণে বল এবং মুহূর্ত গণনা।"
                    : "Calculates forces and moments in structural analysis."}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                {lang === "bn"
                  ? "ভেক্টর এবং স্কেলার ভিন্ন। স্কেলার শুধু মান থাকে, যেমন ভর, তাপমাত্রা।"
                  : "Vectors differ from scalars. Scalars have only magnitude, e.g., mass, temperature."}
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