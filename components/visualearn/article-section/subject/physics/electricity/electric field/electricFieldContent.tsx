"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectricFieldContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বৈদ্যুতিক ক্ষেত্র হল একটি চার্জযুক্ত বস্তুর চারপাশের এমন একটি অঞ্চল যেখানে অন্য চার্জগুলি একটি বল অনুভব করে। এটি প্রতি একক চার্জের উপর ক্রিয়াশীল বল হিসেবে সংজ্ঞায়িত হয়। বৈদ্যুতিক ক্ষেত্র বৈদ্যুতিক চার্জের মধ্যে শক্তির মিথস্ক্রিয়া বোঝাতে গুরুত্বপূর্ণ ভূমিকা পালন করে।\n\n
মূল বৈশিষ্ট্যসমূহ:
- সংজ্ঞা: E = F/q (বৈদ্যুতিক ক্ষেত্র = বল/চার্জ)
- একক: নিউটন প্রতি কুলম্ব (N/C) বা ভোল্ট প্রতি মিটার (V/m)
- দিক: ধনাত্মক চার্জ থেকে দূরে এবং ঋণাত্মক চার্জের দিকে
- বিন্দু চার্জের জন্য বৈদ্যুতিক ক্ষেত্র: E = k * (q/r²)
- কুলম্ব ধ্রুবক: k ≈ 8.99 × 10⁹ N·m²/C²
- প্রভাবকারী উপাদান: চার্জের পরিমাণ, দূরত্ব, এবং মাধ্যমের ধ্রুবক\n\n
বৈদ্যুতিক ক্ষেত্রের প্রকারভেদ:
1. **অভিন্ন ক্ষেত্র**: সমান্তরাল প্লেট ক্যাপাসিটরের মধ্যে পাওয়া যায়, যেখানে ক্ষেত্রের মান এবং দিক স্থির থাকে
2. **অ-অভিন্ন ক্ষেত্র**: বিন্দু চার্জ বা জটিল চার্জ বিন্যাসের ক্ষেত্রে, যেখানে ক্ষেত্রের মান এবং দিক পরিবর্তিত হয়
3. **স্থির ক্ষেত্র**: স্থির চার্জ দ্বারা উৎপন্ন
4. **গতিশীল ক্ষেত্র**: গতিশীল চার্জ বা পরিবর্তনশীল চৌম্বক ক্ষেত্র দ্বারা উৎপন্ন\n\n
বৈদ্যুতিক ক্ষেত্রের বৈশিষ্ট্য:
- ক্ষেত্র রেখা: ধনাত্মক চার্জ থেকে শুরু হয় এবং ঋণাত্মক চার্জে শেষ হয়
- ক্ষেত্রের ঘনত্ব: ক্ষেত্র রেখার ঘনত্ব ক্ষেত্রের তীব্রতা নির্দেশ করে
- সুপারপজিশন: একাধিক চার্জের ক্ষেত্র ভেক্টর যোগ দ্বারা নির্ধারিত হয়\n\n
উদাহরণ:
- একটি ধনাত্মক চার্জের কাছাকাছি বৈদ্যুতিক ক্ষেত্র বাইরের দিকে নির্দেশ করে
- সমান্তরাল প্লেট ক্যাপাসিটরের মধ্যে বৈদ্যুতিক ক্ষেত্র অভিন্ন এবং ধনাত্মক প্লেট থেকে ঋণাত্মক প্লেটের দিকে নির্দেশ করে\n\n
প্রয়োগ:
- ক্যাপাসিটর: শক্তি সঞ্চয়ের জন্য বৈদ্যুতিক ক্ষেত্র ব্যবহৃত হয়
- ইলেকট্রোস্ট্যাটিক প্রিন্টার: কালি স্থানান্তরের জন্য ক্ষেত্র ব্যবহার করা হয়
- কণা ত্বরণ: কণা ত্বরকগুলিতে চার্জযুক্ত কণার গতি নিয়ন্ত্রণের জন্য বৈদ্যুতিক ক্ষেত্র ব্যবহৃত হয়
- ইলেকট্রনিক ডিভাইস: ট্রানজিস্টর এবং ইন্টিগ্রেটেড সার্কিটে বৈদ্যুতিক ক্ষেত্র গুরুত্বপূর্ণ\n\n
গুরুত্বপূর্ণ সূত্রাবলী:
- বৈদ্যুতিক ক্ষেত্র: E = F/q
- বিন্দু চার্জের জন্য: E = k * (q/r²)
- সমান্তরাল প্লেট ক্যাপাসিটর: E = V/d`
      : `An electric field is a region around a charged object where other charges experience a force, defined as the force per unit charge. It plays a critical role in understanding the interaction of electric charges.\n\n
Key characteristics:
- Definition: E = F/q (Electric field = Force/Charge)
- Unit: Newton per Coulomb (N/C) or Volt per meter (V/m)
- Direction: Away from positive charges, toward negative charges
- Electric field due to a point charge: E = k * (q/r²)
- Coulomb constant: k ≈ 8.99 × 10⁹ N·m²/C²
- Influencing factors: Charge magnitude, distance, and medium permittivity\n\n
Types of electric fields:
1. **Uniform field**: Found between parallel plate capacitors, where the field strength and direction are constant
2. **Non-uniform field**: Found near point charges or complex charge configurations, where field strength and direction vary
3. **Static field**: Produced by stationary charges
4. **Dynamic field**: Produced by moving charges or changing magnetic fields\n\n
Properties of electric fields:
- Field lines: Originate from positive charges and terminate at negative charges
- Field density: The density of field lines indicates the field strength
- Superposition: The field from multiple charges is the vector sum of individual fields\n\n
Examples:
- The electric field near a positive charge points outward
- In a parallel plate capacitor, the electric field is uniform and directed from the positive to the negative plate\n\n
Applications:
- Capacitors: Electric fields are used for energy storage
- Electrostatic printers: Fields are used to transfer ink
- Particle accelerators: Electric fields control the motion of charged particles
- Electronic devices: Electric fields are critical in transistors and integrated circuits\n\n
Important formulas:
- Electric field: E = F/q
- For a point charge: E = k * (q/r²)
- Parallel plate capacitor: E = V/d`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বৈদ্যুতিক ক্ষেত্র" : "Electric Field"}
            </h3>
            <p>
              {lang === "bn"
                ? "বৈদ্যুতিক ক্ষেত্র হল একটি চার্জযুক্ত বস্তুর চারপাশের এমন একটি অঞ্চল যেখানে অন্য চার্জগুলি একটি বল অনুভব করে।"
                : "A region around a charged object where other charges experience a force, defined as the force per unit charge."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "সংজ্ঞা: E = F/q (বৈদ্যুতিক ক্ষেত্র = বল/চার্জ)"
                  : "Definition: E = F/q (Electric field = Force/Charge)"}
              </li>
              <li>
                {lang === "bn"
                  ? "একক: নিউটন প্রতি কুলম্ব (N/C) বা ভোল্ট প্রতি মিটার (V/m)"
                  : "Unit: Newton per Coulomb (N/C) or Volt per meter (V/m)"}
              </li>
              <li>
                {lang === "bn"
                  ? "দিক: ধনাত্মক চার্জ থেকে দূরে এবং ঋণাত্মক চার্জের দিকে"
                  : "Direction: Away from positive charges, toward negative charges"}
              </li>
              <li>
                {lang === "bn"
                  ? "বিন্দু চার্জের জন্য: E = k * (q/r²)"
                  : "Electric field due to a point charge: E = k * (q/r²)"}
              </li>
              <li>
                {lang === "bn"
                  ? "কুলম্ব ধ্রুবক: k ≈ 8.99 × 10⁹ N·m²/C²"
                  : "Coulomb constant: k ≈ 8.99 × 10⁹ N·m²/C²"}
              </li>
              <li>
                {lang === "bn"
                  ? "প্রভাবকারী উপাদান: চার্জের পরিমাণ, দূরত্ব, এবং মাধ্যমের ধ্রুবক"
                  : "Influencing factors: Charge magnitude, distance, and medium permittivity"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "বৈদ্যুতিক ক্ষেত্রের প্রকারভেদ" : "Types of Electric Fields"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "অভিন্ন ক্ষেত্র: সমান্তরাল প্লেট ক্যাপাসিটরের মধ্যে, যেখানে ক্ষেত্র স্থির থাকে"
                  : "Uniform field: Found between parallel plate capacitors, where the field is constant"}
              </li>
              <li>
                {lang === "bn"
                  ? "অ-অভিন্ন ক্ষেত্র: বিন্দু চার্জের কাছে, যেখানে ক্ষেত্র পরিবর্তিত হয়"
                  : "Non-uniform field: Near point charges, where the field varies"}
              </li>
              <li>
                {lang === "bn"
                  ? "স্থির ক্ষেত্র: স্থির চার্জ দ্বারা উৎপন্ন"
                  : "Static field: Produced by stationary charges"}
              </li>
              <li>
                {lang === "bn"
                  ? "গতিশীল ক্ষেত্র: গতিশীল চার্জ বা পরিবর্তনশীল চৌম্বক ক্ষেত্র দ্বারা উৎপন্ন"
                  : "Dynamic field: Produced by moving charges or changing magnetic fields"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "বৈশিষ্ট্য" : "Properties"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ক্ষেত্র রেখা: ধনাত্মক চার্জ থেকে শুরু হয় এবং ঋণাত্মক চার্জে শেষ হয়"
                  : "Field lines: Originate from positive charges and terminate at negative charges"}
              </li>
              <li>
                {lang === "bn"
                  ? "ক্ষেত্রের ঘনত্ব: রেখার ঘনত্ব ক্ষেত্রের তীব্রতা নির্দেশ করে"
                  : "Field density: The density of field lines indicates field strength"}
              </li>
              <li>
                {lang === "bn"
                  ? "সুপারপজিশন: একাধিক চার্জের ক্ষেত্র ভেক্টর যোগ দ্বারা নির্ধারিত হয়"
                  : "Superposition: The field from multiple charges is the vector sum"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ধনাত্মক চার্জের কাছে ক্ষেত্র বাইরের দিকে নির্দেশ করে"
                  : "The electric field near a positive charge points outward"}
              </li>
              <li>
                {lang === "bn"
                  ? "সমান্তরাল প্লেট ক্যাপাসিটরে ক্ষেত্র অভিন্ন এবং ধনাত্মক থেকে ঋণাত্মক প্লেটের দিকে"
                  : "In a parallel plate capacitor, the field is uniform and directed from positive to negative plate"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ক্যাপাসিটর: শক্তি সঞ্চয়ের জন্য বৈদ্যুতিক ক্ষেত্র"
                  : "Capacitors: Electric fields for energy storage"}
              </li>
              <li>
                {lang === "bn"
                  ? "ইলেকট্রোস্ট্যাটিক প্রিন্টার: কালি স্থানান্তরের জন্য ক্ষেত্র"
                  : "Electrostatic printers: Fields for ink transfer"}
              </li>
              <li>
                {lang === "bn"
                  ? "কণা ত্বরণ: চার্জযুক্ত কণার গতি নিয়ন্ত্রণ"
                  : "Particle accelerators: Control motion of charged particles"}
              </li>
              <li>
                {lang === "bn"
                  ? "ইলেকট্রনিক ডিভাইস: ট্রানজিস্টর এবং সার্কিটে ক্ষেত্র"
                  : "Electronic devices: Fields in transistors and circuits"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  বৈদ্যুতিক ক্ষেত্র: E = F/q <br />
                  বিন্দু চার্জের জন্য: E = k * (q/r²) <br />
                  সমান্তরাল প্লেট ক্যাপাসিটর: E = V/d
                </>
              ) : (
                <>
                  Electric field: E = F/q <br />
                  For a point charge: E = k * (q/r²) <br />
                  Parallel plate capacitor: E = V/d
                </>
              )}
            </p>
          </div>

          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

        <LanguageToggle lang={lang} setLang={setLang} />

        <TopicChatbot />
      </CardContent>
    </Card>
  )
}