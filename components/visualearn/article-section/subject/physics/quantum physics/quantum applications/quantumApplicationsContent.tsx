
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function QuantumApplicationsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `কোয়ান্টাম অ্যাপ্লিকেশন কোয়ান্টাম মেকানিক্সের ব্যবহারিক ব্যবহার অন্বেষণ করে, যেমন কোয়ান্টাম কম্পিউটিং, ক্রিপ্টোগ্রাফি, এবং চিকিৎসা ইমেজিং।
মূল ধারণা:
- কোয়ান্টাম কম্পিউটিং
- কোয়ান্টাম ক্রিপ্টোগ্রাফি
- কোয়ান্টাম টানেলিং
- কোয়ান্টাম সেন্সর
- চিকিৎসা ইমেজিং
প্রযুক্তি:
- কিউবিট এবং সুপারপজিশন
- এনট্যাঙ্গলমেন্ট
- কোয়ান্টাম গেট`
      : `Quantum Applications explores practical uses of quantum mechanics, including quantum computing, cryptography, and medical imaging.
Key Concepts:
- Quantum computing
- Quantum cryptography
- Quantum tunneling
- Quantum sensors
- Medical imaging
Technologies:
- Qubit and superposition
- Entanglement
- Quantum gates`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "কোয়ান্টাম অ্যাপ্লিকেশন" : "Quantum Applications"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "কোয়ান্টাম মেকানিক্স প্রযুক্তি এবং বিজ্ঞানে বিপ্লব ঘটিয়েছে, যেমন কোয়ান্টাম কম্পিউটিং এবং চিকিৎসা ইমেজিংয়ে।"
                  : "Quantum mechanics has revolutionized technology and science, enabling advancements like quantum computing and medical imaging."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Key Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "কোয়ান্টাম অ্যাপ্লিকেশন সুপারপজিশন, এনট্যাঙ্গলমেন্ট এবং টানেলিংয়ের মতো নীতির উপর নির্ভর করে।"
                    : "Quantum applications rely on principles like superposition, entanglement, and tunneling."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোয়ান্টাম কম্পিউটিং" : "Quantum Computing"}
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "কোয়ান্টাম কম্পিউটার কিউবিট ব্যবহার করে, যা সুপারপজিশন এবং এনট্যাঙ্গলমেন্টের মাধ্যমে জটিল গণনা সম্পাদন করে।"
                  : "Quantum computers use qubits, leveraging superposition and entanglement to perform complex computations."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "কিউবিট:" : "Qubit:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "|0⟩, |1⟩, বা সুপারপজিশন" : "|0⟩, |1⟩, or superposition"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "উদাহরণ:" : "Example:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "শোরের অ্যালগরিদম" : "Shor’s algorithm"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোয়ান্টাম ক্রিপ্টোগ্রাফি" : "Quantum Cryptography"}
            </h4>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "কোয়ান্টাম ক্রিপ্টোগ্রাফি এনট্যাঙ্গলমেন্ট এবং পরিমাপ ব্যবহার করে নিরাপদ যোগাযোগ নিশ্চিত করে।"
                  : "Quantum cryptography uses entanglement and measurement to ensure secure communication."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "প্রোটোকল:" : "Protocol:"}
                  </p>
                  <p className="text-sm">
                    {lang === "bn" ? "BB84" : "BB84"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "কোয়ান্টাম টানেলিং" : "Quantum Tunneling"}
            </h4>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "কণা শক্তিশালী বাধা অতিক্রম করতে পারে, যা ইলেকট্রনিক্সে ব্যবহৃত হয়।"
                  : "Particles can cross energy barriers, used in electronics like tunnel diodes."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "অ্যাপ্লিকেশন:" : "Application:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "টানেল ডায়োড" : "Tunnel diode"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "চিকিৎসা ইমেজিং" : "Medical Imaging"}
            </h4>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "কোয়ান্টাম নীতি এমআরআই এবং পিইটি স্ক্যানের মতো প্রযুক্তিতে ব্যবহৃত হয়।"
                  : "Quantum principles are used in technologies like MRI and PET scans."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "উদাহরণ:" : "Example:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "এমআরআই" : "MRI"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "নীতি:" : "Principle:"}</p>
                  <p className="text-sm">
                    {lang === "bn" ? "নিউক্লিয়ার স্পিন" : "Nuclear spin"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "কিউবিট ক্লাসিক্যাল বিট থেকে ভিন্ন।" : "Qubits differ from classical bits."}</li>
                <li>• {lang === "bn" ? "এনট্যাঙ্গলমেন্ট দূরবর্তী সম্পর্ক সৃষ্টি করে।" : "Entanglement creates distant correlations."}</li>
                <li>• {lang === "bn" ? "কোয়ান্টাম টানেলিং শক্তি দক্ষতা বাড়ায়।" : "Quantum tunneling enhances energy efficiency."}</li>
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
