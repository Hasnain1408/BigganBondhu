"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function ElectricCapacitanceContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `বৈদ্যুতিক ধারণক্ষমতা হল একটি সিস্টেমের বৈদ্যুতিক চার্জ সঞ্চয় করার ক্ষমতা, সাধারণত একটি ক্যাপাসিটরে, যা সঞ্চিত চার্জ এবং সম্ভাব্য পার্থক্যের অনুপাত হিসেবে সংজ্ঞায়িত হয়। এটি বৈদ্যুতিক শক্তি সঞ্চয় এবং নিয়ন্ত্রণে গুরুত্বপূর্ণ ভূমিকা পালন করে।\n\n
মূল বৈশিষ্ট্যসমূহ:
- সংজ্ঞা: C = Q/V (ধারণক্ষমতা = চার্জ/ভোল্টেজ)
- একক: ফ্যারাড (F), যেখানে ১ ফ্যারাড = ১ কুলম্ব প্রতি ভোল্ট
- ক্যাপাসিটরের প্রকার: সমান্তরাল প্লেট, নলাকার, গোলাকার
- প্রভাবকারী উপাদান: প্লেটের ক্ষেত্রফল, প্লেটের মধ্যে দূরত্ব, এবং ডাইইলেকট্রিক উপাদানের ধ্রুবক
- শক্তি সঞ্চয়: U = (১/২)CV²
- কুলম্ব ধ্রুবক: k ≈ ৮.৯৯ × ১০⁹ N·m²/C²
- ডাইইলেকট্রিক ধ্রুবক: ε = ε₀εᵣ, যেখানে ε₀ ≈ ৮.৮৫ × ১০⁻¹² F/m\n\n
ক্যাপাসিটরের প্রকারভেদ:
1. **সমান্তরাল প্লেট ক্যাপাসিটর**: দুটি সমান্তরাল ধাতব প্লেট দ্বারা গঠিত, যেখানে ধারণক্ষমতা C = εA/d
2. **নলাকার ক্যাপাসিটর**: সমাক্ষ নলাকার পৃষ্ঠ দ্বারা গঠিত, তারের মধ্যে ব্যবহৃত
3. **গোলাকার ক্যাপাসিটর**: গোলাকার পৃষ্ঠের মধ্যে ধারণক্ষমতা, বিশেষ অ্যাপ্লিকেশনে ব্যবহৃত
4. **ইলেকট্রোলাইটিক ক্যাপাসিটর**: উচ্চ ধারণক্ষমতার জন্য ইলেকট্রোলাইট ব্যবহার করে\n\n
বৈশিষ্ট্য:
- চার্জ সঞ্চয়: ক্যাপাসিটর চার্জ সঞ্চয় করে এবং প্রয়োজনে মুক্তি দেয়
- ডাইইলেকট্রিক প্রভাব: ডাইইলেকট্রিক উপাদান ধারণক্ষমতা বাড়ায়
- সময় ধ্রুবক: RC সার্কিটে চার্জিং এবং ডিসচার্জিং সময় নির্ধারণ করে
- সিরিজ এবং সমান্তরাল সংযোগ: সিরিজে ১/C = ১/C₁ + ১/C₂, সমান্তরালে C = C₁ + C₂\n\n
উদাহরণ:
- একটি সমান্তরাল প্লেট ক্যাপাসিটরে বায়ু (εᵣ = ১) থাকলে ধারণক্ষমতা কম, কিন্তু গ্লাস (εᵣ ≈ ৫-১০) থাকলে ধারণক্ষমতা বাড়ে
- ক্যামেরার ফ্ল্যাশে ক্যাপাসিটর দ্রুত চার্জ সরবরাহ করে\n\n
প্রয়োগ:
- ইলেকট্রনিক সার্কিট: ফিল্টারিং এবং টাইমিংয়ের জন্য
- শক্তি সঞ্চয়: ব্যাটারি ব্যাকআপ এবং পাওয়ার সাপ্লাইতে
- টাচ স্ক্রিন: ধারণক্ষমতার পরিবর্তন সনাক্তকরণ
- মেডিকেল ডিভাইস: ডিফিব্রিলেটরে দ্রুত শক্তি মুক্তির জন্য\n\n
গুরুত্বপূর্ণ সূত্রাবলী:
- ধারণক্ষমতা: C = Q/V
- সমান্তরাল প্লেট ক্যাপাসিটর: C = εA/d
- সঞ্চিত শক্তি: U = (১/২)CV²`
      : `Electric capacitance is the ability of a system to store electric charge, typically in a capacitor, defined as the ratio of stored charge to the potential difference. It plays a critical role in storing and managing electrical energy.\n\n
Key characteristics:
- Definition: C = Q/V (Capacitance = Charge/Voltage)
- Unit: Farad (F), where 1 Farad = 1 Coulomb per Volt
- Types of capacitors: Parallel plate, cylindrical, spherical
- Influencing factors: Plate area, distance between plates, and dielectric constant
- Energy storage: U = (1/2)CV²
- Coulomb constant: k ≈ 8.99 × 10⁹ N·m²/C²
- Dielectric constant: ε = ε₀εᵣ, where ε₀ ≈ 8.85 × 10⁻¹² F/m\n\n
Types of capacitors:
1. **Parallel plate capacitor**: Consists of two parallel metal plates, with capacitance C = εA/d
2. **Cylindrical capacitor**: Formed by coaxial cylindrical surfaces, used in cables
3. **Spherical capacitor**: Formed by spherical surfaces, used in specialized applications
4. **Electrolytic capacitor**: Uses an electrolyte for high capacitance\n\n
Properties:
- Charge storage: Capacitors store charge and release it when needed
- Dielectric effect: Dielectric materials increase capacitance
- Time constant: Determines charging/discharging time in RC circuits
- Series and parallel connections: In series, 1/C = 1/C₁ + 1/C₂; in parallel, C = C₁ + C₂\n\n
Examples:
- A parallel plate capacitor with air (εᵣ = 1) has lower capacitance, but with glass (εᵣ ≈ 5-10), capacitance increases
- Camera flashes use capacitors to deliver quick bursts of charge\n\n
Applications:
- Electronic circuits: For filtering and timing
- Energy storage: In battery backups and power supplies
- Touch screens: Detect changes in capacitance
- Medical devices: For rapid energy release in defibrillators\n\n
Important formulas:
- Capacitance: C = Q/V
- Parallel plate capacitor: C = εA/d
- Stored energy: U = (1/2)CV²`

 const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "বৈদ্যুতিক ধারণক্ষমতা" : "Electric Capacitance"}
            </h3>
            <p>
              {lang === "bn"
                ? "বৈদ্যুতিক ধারণক্ষমতা হল একটি সিস্টেমের বৈদ্যুতিক চার্জ সঞ্চয় করার ক্ষমতা, যা সঞ্চিত চার্জ এবং সম্ভাব্য পার্থক্যের অনুপাত হিসেবে সংজ্ঞায়িত হয়।"
                : "The ability of a system to store electric charge, defined as the ratio of stored charge to the potential difference."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "সংজ্ঞা: C = Q/V (ধারণক্ষমতা = চার্জ/ভোল্টেজ)"
                  : "Definition: C = Q/V (Capacitance = Charge/Voltage)"}
              </li>
              <li>
                {lang === "bn"
                  ? "একক: ফ্যারাড (F), ১ ফ্যারাড = ১ কুলম্ব প্রতি ভোল্ট"
                  : "Unit: Farad (F), 1 Farad = 1 Coulomb per Volt"}
              </li>
              <li>
                {lang === "bn"
                  ? "ক্যাপাসিটরের প্রকার: সমান্তরাল প্লেট, নলাকার, গোলাকার"
                  : "Types of capacitors: Parallel plate, cylindrical, spherical"}
              </li>
              <li>
                {lang === "bn"
                  ? "প্রভাবকারী উপাদান: প্লেটের ক্ষেত্রফল, দূরত্ব, এবং ডাইইলেকট্রিক ধ্রুবক"
                  : "Influencing factors: Plate area, distance, and dielectric constant"}
              </li>
              <li>
                {lang === "bn"
                  ? "শক্তি সঞ্চয়: U = (১/২)CV²"
                  : "Energy storage: U = (1/2)CV²"}
              </li>
              <li>
                {lang === "bn"
                  ? "কুলম্ব ধ্রুবক: k ≈ ৮.৯৯ × ১০⁹ N·m²/C²"
                  : "Coulomb constant: k ≈ 8.99 × 10⁹ N·m²/C²"}
              </li>
              <li>
                {lang === "bn"
                  ? "ডাইইলেকট্রিক ধ্রুবক: ε = ε₀εᵣ, যেখানে ε₀ ≈ ৮.৮৫ × ১০⁻¹² F/m"
                  : "Dielectric constant: ε = ε₀εᵣ, where ε₀ ≈ 8.85 × 10⁻¹² F/m"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "ক্যাপাসিটরের প্রকারভেদ" : "Types of Capacitors"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "সমান্তরাল প্লেট ক্যাপাসিটর: C = εA/d"
                  : "Parallel plate capacitor: C = εA/d"}
              </li>
              <li>
                {lang === "bn"
                  ? "নলাকার ক্যাপাসিটর: সমাক্ষ নলাকার পৃষ্ঠ, তারে ব্যবহৃত"
                  : "Cylindrical capacitor: Coaxial surfaces, used in cables"}
              </li>
              <li>
                {lang === "bn"
                  ? "গোলাকার ক্যাপাসিটর: বিশেষ অ্যাপ্লিকেশনে ব্যবহৃত"
                  : "Spherical capacitor: Used in specialized applications"}
              </li>
              <li>
                {lang === "bn"
                  ? "ইলেকট্রোলাইটিক ক্যাপাসিটর: উচ্চ ধারণক্ষমতার জন্য"
                  : "Electrolytic capacitor: For high capacitance"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "বৈশিষ্ট্য" : "Properties"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "চার্জ সঞ্চয়: ক্যাপাসিটর চার্জ সঞ্চয় করে এবং মুক্তি দেয়"
                  : "Charge storage: Stores and releases charge"}
              </li>
              <li>
                {lang === "bn"
                  ? "ডাইইলেকট্রিক প্রভাব: ধারণক্ষমতা বাড়ায়"
                  : "Dielectric effect: Increases capacitance"}
              </li>
              <li>
                {lang === "bn"
                  ? "সময় ধ্রুবক: RC সার্কিটে চার্জিং/ডিসচার্জিং সময়"
                  : "Time constant: Determines charging/discharging time"}
              </li>
              <li>
                {lang === "bn"
                  ? "সংযোগ: সিরিজে ১/C = ১/C₁ + ১/C₂, সমান্তরালে C = C₁ + C₂"
                  : "Connections: Series 1/C = 1/C₁ + 1/C₂, parallel C = C₁ + C₂"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "বায়ু (εᵣ = ১) থাকলে ধারণক্ষমতা কম, গ্লাস (εᵣ ≈ ৫-১০) থাকলে বাড়ে"
                  : "Air (εᵣ = 1) gives lower capacitance, glass (εᵣ ≈ 5-10) increases it"}
              </li>
              <li>
                {lang === "bn"
                  ? "ক্যামেরার ফ্ল্যাশে দ্রুত চার্জ সরবরাহ"
                  : "Camera flashes deliver quick bursts of charge"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "ইলেকট্রনিক সার্কিট: ফিল্টারিং এবং টাইমিং"
                  : "Electronic circuits: Filtering and timing"}
              </li>
              <li>
                {lang === "bn"
                  ? "শক্তি সঞ্চয়: ব্যাটারি ব্যাকআপ এবং পাওয়ার সাপ্লাই"
                  : "Energy storage: Battery backups and power supplies"}
              </li>
              <li>
                {lang === "bn"
                  ? "টাচ স্ক্রিন: ধারণক্ষমতার পরিবর্তন সনাক্তকরণ"
                  : "Touch screens: Detect capacitance changes"}
              </li>
              <li>
                {lang === "bn"
                  ? "মেডিকেল ডিভাইস: ডিফিব্রিলেটরে শক্তি মুক্তি"
                  : "Medical devices: Energy release in defibrillators"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  ধারণক্ষমতা: C = Q/V <br />
                  সমান্তরাল প্লেট ক্যাপাসিটর: C = εA/d <br />
                  সঞ্চিত শক্তি: U = (১/২)CV²
                </>
              ) : (
                <>
                  Capacitance: C = Q/V <br />
                  Parallel plate capacitor: C = εA/d <br />
                  Stored energy: U = (1/2)CV²
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