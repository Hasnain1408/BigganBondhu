"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function VectorComponentsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ভেক্টর উপাংশ হল একটি ভেক্টরকে পরস্পর লম্ব দিকে ভাগ করার পদ্ধতি।
মূল বৈশিষ্ট্যসমূহ:
- স্থানাঙ্ক অক্ষে অভিক্ষেপ
- মান এবং দিক উভয়ই আছে
- ত্রিকোণমিতি ব্যবহার করে গণনা
- ভেক্টর যোগ-বিয়োগে সুবিধা
সূত্রাবলী:
- Ax = A cos θ (x-উপাংশ)
- Ay = A sin θ (y-উপাংশ)
- A = √(Ax² + Ay²) (মান)
- θ = tan⁻¹(Ay/Ax) (কোণ)
ভেক্টর যোগ: R = A + B
উপাংশভিত্তিক: Rx = Ax + Bx, Ry = Ay + By`
      : `Vector components are the projection of a vector along perpendicular coordinate axes.
Key characteristics:
- Projection along coordinate axes
- Both magnitude and direction
- Calculated using trigonometry
- Facilitates vector addition and subtraction
Formulas:
- Ax = A cos θ (x-component)
- Ay = A sin θ (y-component)
- A = √(Ax² + Ay²) (magnitude)
- θ = tan⁻¹(Ay/Ax) (angle)
Vector addition: R = A + B
Component-wise: Rx = Ax + Bx, Ry = Ay + By`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ভেক্টর উপাংশ" : "Vector Components"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ভেক্টর উপাংশ হল একটি ভেক্টরকে পরস্পর লম্ব স্থানাঙ্ক অক্ষের সাথে অভিক্ষিপ্ত করার পদ্ধতি। এটি জটিল ভেক্টর সমস্যাগুলি সহজ করে তোলে এবং ভেক্টর যোগ-বিয়োগে বিশেষভাবে সহায়ক।"
                  : "Vector components are the projections of a vector along perpendicular coordinate axes. This method simplifies complex vector problems and is particularly useful in vector addition and subtraction operations."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn" 
                    ? "যেকোনো ভেক্টরকে দুটি বা তিনটি পরস্পর লম্ব উপাংশে ভাগ করা যায়। দ্বিমাত্রিক ক্ষেত্রে x এবং y উপাংশ, ত্রিমাত্রিক ক্ষেত্রে x, y এবং z উপাংশ।"
                    : "Any vector can be decomposed into two or three perpendicular components. In 2D: x and y components, in 3D: x, y, and z components."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "দ্বিমাত্রিক ভেক্টর উপাংশ" : "Two-Dimensional Vector Components"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "X-উপাংশ (অনুভূমিক):" : "X-Component (Horizontal):"}
                  </p>
                  <p className="font-mono text-lg">Ax = A cos θ</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" 
                      ? "যেখানে A = ভেক্টরের মান, θ = x-অক্ষের সাথে কোণ"
                      : "where A = magnitude, θ = angle with x-axis"}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "Y-উপাংশ (উল্লম্ব):" : "Y-Component (Vertical):"}
                  </p>
                  <p className="font-mono text-lg">Ay = A sin θ</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" 
                      ? "ভেক্টরের উল্লম্ব অভিক্ষেপ"
                      : "Vertical projection of the vector"}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="font-medium">
                  {lang === "bn" ? "মান ও কোণ নির্ণয়:" : "Finding Magnitude and Angle:"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-mono">|A| = √(Ax² + Ay²)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === "bn" ? "পিথাগোরাসের উপপাদ্য" : "Pythagorean theorem"}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono">θ = tan⁻¹(Ay/Ax)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === "bn" ? "বিপরীত ট্যানজেন্ট" : "Inverse tangent"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ত্রিমাত্রিক ভেক্টর উপাংশ" : "Three-Dimensional Vector Components"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "ত্রিমাত্রিক স্থানে একটি ভেক্টর A = Ax î + Ay ĵ + Az k̂ আকারে প্রকাশ করা হয়।"
                  : "In 3D space, a vector A = Ax î + Ay ĵ + Az k̂ where î, ĵ, k̂ are unit vectors."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="font-mono text-lg">Ax = A cos α</p>
                  <p className="text-sm">{lang === "bn" ? "X-দিকের উপাংশ" : "X-direction"}</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-lg">Ay = A cos β</p>
                  <p className="text-sm">{lang === "bn" ? "Y-দিকের উপাংশ" : "Y-direction"}</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-lg">Az = A cos γ</p>
                  <p className="text-sm">{lang === "bn" ? "Z-দিকের উপাংশ" : "Z-direction"}</p>
                </div>
              </div>
              
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded">
                <p className="font-medium">
                  {lang === "bn" ? "দিকের কোসাইনের সম্পর্ক:" : "Direction Cosines Relation:"}
                </p>
                <p className="font-mono text-center">cos²α + cos²β + cos²γ = 1</p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ভেক্টর যোগ উপাংশ পদ্ধতিতে" : "Vector Addition Using Components"}
            </h4>
            
            <div className="space-y-3">
              <p>
                {lang === "bn"
                  ? "উপাংশ পদ্ধতি ভেক্টর যোগ-বিয়োগকে অনেক সহজ করে তোলে। প্রতিটি দিকের উপাংশ আলাদাভাবে যোগ করা হয়।"
                  : "The component method makes vector addition and subtraction much easier. Components in each direction are added separately."}
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                  {lang === "bn" ? "দুটি ভেক্টর A এবং B এর যোগফল R:" : "Sum of Two Vectors A and B = R:"}
                </h5>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">{lang === "bn" ? "উপাংশ যোগ:" : "Component Addition:"}</p>
                      <p className="font-mono">Rx = Ax + Bx</p>
                      <p className="font-mono">Ry = Ay + By</p>
                      <p className="font-mono">Rz = Az + Bz</p>
                    </div>
                    <div>
                      <p className="font-medium">{lang === "bn" ? "ফলাফল ভেক্টর:" : "Resultant Vector:"}</p>
                      <p className="font-mono">|R| = √(Rx² + Ry² + Rz²)</p>
                      <p className="font-mono">θ = tan⁻¹(Ry/Rx)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  {lang === "bn" ? "ভেক্টর বিয়োগ:" : "Vector Subtraction:"}
                </h5>
                <p className="text-red-700 dark:text-red-300">
                  {lang === "bn"
                    ? "A - B = A + (-B), যেখানে -B হল B এর বিপরীত ভেক্টর"
                    : "A - B = A + (-B), where -B is the negative of vector B"}
                </p>
                <div className="mt-2">
                  <p className="font-mono">Rx = Ax - Bx</p>
                  <p className="font-mono">Ry = Ay - By</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "একক ভেক্টর" : "Unit Vectors"}
            </h4>
            
            <div className="space-y-3">
              <p>
                {lang === "bn"
                  ? "একক ভেক্টর হল এমন ভেক্টর যার মান ১। এগুলি দিক নির্দেশ করতে ব্যবহৃত হয়।"
                  : "Unit vectors have magnitude 1 and are used to indicate direction."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-center">
                  <p className="font-bold text-blue-800 dark:text-blue-200">î</p>
                  <p className="text-sm">{lang === "bn" ? "X-অক্ষের দিকে" : "X-axis direction"}</p>
                  <p className="font-mono text-xs">î = (1, 0, 0)</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-center">
                  <p className="font-bold text-green-800 dark:text-green-200">ĵ</p>
                  <p className="text-sm">{lang === "bn" ? "Y-অক্ষের দিকে" : "Y-axis direction"}</p>
                  <p className="font-mono text-xs">ĵ = (0, 1, 0)</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg text-center">
                  <p className="font-bold text-red-800 dark:text-red-200">k̂</p>
                  <p className="text-sm">{lang === "bn" ? "Z-অক্ষের দিকে" : "Z-axis direction"}</p>
                  <p className="font-mono text-xs">k̂ = (0, 0, 1)</p>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium">
                  {lang === "bn" ? "যেকোনো ভেক্টরের একক ভেক্টর:" : "Unit Vector of Any Vector:"}
                </p>
                <p className="font-mono text-center text-lg">Â = A/|A|</p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ডট গুণফল (স্কেলার গুণফল)" : "Dot Product (Scalar Product)"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "দুটি ভেক্টরের ডট গুণফল একটি স্কেলার রাশি যা উপাংশের গুণফলের যোগফল।"
                  : "The dot product of two vectors is a scalar quantity equal to the sum of products of corresponding components."}
              </p>
              
              <div className="space-y-2">
                <p className="font-medium">
                  {lang === "bn" ? "সূত্র:" : "Formula:"}
                </p>
                <p className="font-mono text-lg">A · B = AxBx + AyBy + AzBz</p>
                <p className="font-mono text-lg">A · B = |A||B|cos θ</p>
                <p className="text-sm">
                  {lang === "bn" 
                    ? "যেখানে θ = A এবং B এর মধ্যকার কোণ"
                    : "where θ = angle between A and B"}
                </p>
              </div>
              
              <div className="border-t pt-2">
                <p className="font-medium text-sm">
                  {lang === "bn" ? "বিশেষ ক্ষেত্র:" : "Special Cases:"}
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• {lang === "bn" ? "A · B = 0 যদি A ⊥ B (লম্ব)" : "A · B = 0 if A ⊥ B (perpendicular)"}</li>
                  <li>• {lang === "bn" ? "A · A = |A|² (নিজের সাথে)" : "A · A = |A|² (with itself)"}</li>
                </ul>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ক্রস গুণফল (ভেক্টর গুণফল)" : "Cross Product (Vector Product)"}
            </h4>
            
            <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg space-y-3">
              <p className="text-teal-700 dark:text-teal-300">
                {lang === "bn"
                  ? "দুটি ভেক্টরের ক্রস গুণফল একটি ভেক্টর যা উভয়ের সাথে লম্ব।"
                  : "The cross product of two vectors is a vector perpendicular to both."}
              </p>
              
              <div className="space-y-2">
                <p className="font-medium">
                  {lang === "bn" ? "সূত্র (নির্ণায়ক পদ্ধতি):" : "Formula (Determinant Method):"}
                </p>
                <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded">
                  <div className="text-center">
                    |  î    ĵ    k̂  |<br/>
                    | Ax   Ay   Az |<br/>
                    | Bx   By   Bz |
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="font-medium">
                    {lang === "bn" ? "উপাংশ আকারে:" : "Component Form:"}
                  </p>
                  <div className="space-y-1 font-mono text-sm">
                    <p>A × B = (AyBz - AzBy)î + (AzBx - AxBz)ĵ + (AxBy - AyBx)k̂</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="font-medium">
                    {lang === "bn" ? "মান:" : "Magnitude:"}
                  </p>
                  <p className="font-mono">|A × B| = |A||B|sin θ</p>
                </div>
              </div>
              
              <div className="border-t pt-2">
                <p className="font-medium text-sm">
                  {lang === "bn" ? "বৈশিষ্ট্য:" : "Properties:"}
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• {lang === "bn" ? "A × B = -(B × A) (অবিনিময়যোগ্য)" : "A × B = -(B × A) (anti-commutative)"}</li>
                  <li>• {lang === "bn" ? "A × A = 0 (নিজের সাথে)" : "A × A = 0 (with itself)"}</li>
                  <li>• {lang === "bn" ? "A × B = 0 যদি A ∥ B (সমান্তরাল)" : "A × B = 0 if A ∥ B (parallel)"}</li>
                </ul>
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
                  <li>• {lang === "bn" ? "বল বিশ্লেষণ" : "Force analysis"}</li>
                  <li>• {lang === "bn" ? "গতি বিশ্লেষণ" : "Motion analysis"}</li>
                  <li>• {lang === "bn" ? "ক্ষেত্র তত্ত্ব" : "Field theory"}</li>
                  <li>• {lang === "bn" ? "তরঙ্গ বিশ্লেষণ" : "Wave analysis"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "প্রকৌশল" : "Engineering"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "কাঠামোগত বিশ্লেষণ" : "Structural analysis"}</li>
                  <li>• {lang === "bn" ? "রোবোটিক্স" : "Robotics"}</li>
                  <li>• {lang === "bn" ? "নেভিগেশন" : "Navigation"}</li>
                  <li>• {lang === "bn" ? "সিগন্যাল প্রসেসিং" : "Signal processing"}</li>
                </ul>
              </div>
              
              <div className="bg-cyan-50 dark:bg-cyan-950 p-4 rounded-lg">
                <h5 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">
                  {lang === "bn" ? "কম্পিউটার গ্রাফিক্স" : "Computer Graphics"}
                </h5>
                <ul className="text-sm text-cyan-700 dark:text-cyan-300 space-y-1">
                  <li>• {lang === "bn" ? "৩D রেন্ডারিং" : "3D rendering"}</li>
                  <li>• {lang === "bn" ? "অ্যানিমেশন" : "Animation"}</li>
                  <li>• {lang === "bn" ? "আলো গণনা" : "Lighting calculations"}</li>
                  <li>• {lang === "bn" ? "রূপান্তর ম্যাট্রিক্স" : "Transformation matrices"}</li>
                </ul>
              </div>
              
              <div className="bg-lime-50 dark:bg-lime-950 p-4 rounded-lg">
                <h5 className="font-medium text-lime-800 dark:text-lime-200 mb-2">
                  {lang === "bn" ? "গণিত" : "Mathematics"}
                </h5>
                <ul className="text-sm text-lime-700 dark:text-lime-300 space-y-1">
                  <li>• {lang === "bn" ? "জ্যামিতি" : "Geometry"}</li>
                  <li>• {lang === "bn" ? "ক্যালকুলাস" : "Calculus"}</li>
                  <li>• {lang === "bn" ? "রৈখিক বীজগণিত" : "Linear algebra"}</li>
                  <li>• {lang === "bn" ? "সমীকরণ সমাধান" : "Equation solving"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কোণ সর্বদা ধনাত্মক x-অক্ষ থেকে ঘড়ির কাঁটার বিপরীতে মাপুন" : "Always measure angles counterclockwise from positive x-axis"}</li>
                <li>• {lang === "bn" ? "উপাংশের চিহ্ন (ধনাত্মক/ঋণাত্মক) দিকের উপর নির্ভর করে" : "Signs of components depend on direction (positive/negative axes)"}</li>
                <li>• {lang === "bn" ? "ভেক্টর যোগে ত্রিভুজ নিয়ম বা সামান্তরিক নিয়ম ব্যবহার করুন" : "Use triangle rule or parallelogram rule for vector addition"}</li>
                <li>• {lang === "bn" ? "একক ভেক্টর সর্বদা মান ১ রাখে" : "Unit vectors always have magnitude 1"}</li>
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