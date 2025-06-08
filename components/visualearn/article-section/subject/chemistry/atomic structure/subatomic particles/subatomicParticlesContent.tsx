"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function SubatomicParticlesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `উপপরমাণবিক কণা হল পরমাণুর মৌলিক উপাদান, যার মধ্যে প্রোটন, নিউট্রন এবং ইলেকট্রন রয়েছে।
প্রধান কণা:
- প্রোটন: ধনাত্মক চার্জ, নিউক্লিয়াসে থাকে।
- নিউট্রন: কোনো চার্জ নেই, নিউক্লিয়াসে থাকে।
- ইলেকট্রন: ঋণাত্মক চার্জ, নিউক্লিয়াসের চারপাশে ঘুরে।
বৈশিষ্ট্য:
- ভর: প্রোটন ≈ নিউট্রন, ইলেকট্রন অনেক হালকা।
- চার্জ: +1 (প্রোটন), 0 (নিউট্রন), -1 (ইলেকট্রন)।
- আবিষ্কার: প্রোটন (রাদারফোর্ড), নিউট্রন (চ্যাডউইক), ইলেকট্রন (থমসন)।
অন্যান্য কণা:
- কোয়ার্ক: প্রোটন এবং নিউট্রনের উপাদান।
- লেপটন: ইলেকট্রনের পরিবার।`
      : `Subatomic particles are the fundamental components of atoms, including protons, neutrons, and electrons.
Key Particles:
- Proton: Positive charge, located in the nucleus.
- Neutron: No charge, located in the nucleus.
- Electron: Negative charge, orbits the nucleus.
Properties:
- Mass: Proton ≈ Neutron, electron is much lighter.
- Charge: +1 (proton), 0 (neutron), -1 (electron).
- Discovery: Proton (Rutherford), Neutron (Chadwick), Electron (Thomson).
Other Particles:
- Quarks: Components of protons and neutrons.
- Leptons: Family including electrons.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "উপপরমাণবিক কণা" : "Subatomic Particles"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "উপপরমাণবিক কণা হল পরমাণুর মৌলিক উপাদান, যা পরমাণুর গঠন এবং বৈশিষ্ট্য নির্ধারণ করে।"
                  : "Subatomic particles are the building blocks of atoms, determining their structure and properties."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "প্রোটন, নিউট্রন এবং ইলেকট্রন পরমাণুর প্রধান উপাদান। এই কণাগুলির বৈশিষ্ট্য পরমাণুর আচরণ নিয়ন্ত্রণ করে।"
                    : "Protons, neutrons, and electrons are the primary components of atoms, governing their behavior."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রোটন" : "Proton"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "প্রোটন হল ধনাত্মক চার্জযুক্ত কণা, যা পরমাণুর নিউক্লিয়াসে থাকে।"
                  : "Protons are positively charged particles located in the atom’s nucleus."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "চার্জ: +1" : "Charge: +1"}</li>
                <li>• {lang === "bn" ? "ভর: 1.6726 × 10⁻²⁷ কেজি" : "Mass: 1.6726 × 10⁻²⁷ kg"}</li>
                <li>• {lang === "bn" ? "আবিষ্কার: আর্নেস্ট রাদারফোর্ড (১৯১৭)" : "Discovered by Ernest Rutherford (1917)"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "নিউট্রন" : "Neutron"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "নিউট্রন হল চার্জবিহীন কণা, যা নিউক্লিয়াসে প্রোটনের সাথে থাকে।"
                  : "Neutrons are neutral particles found in the nucleus alongside protons."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "চার্জ: 0" : "Charge: 0"}</li>
                <li>• {lang === "bn" ? "ভর: 1.6749 × 10⁻²⁷ কেজি" : "Mass: 1.6749 × 10⁻²⁷ kg"}</li>
                <li>• {lang === "bn" ? "আবিষ্কার: জেমস চ্যাডউইক (১৯৩২)" : "Discovered by James Chadwick (1932)"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ইলেকট্রন" : "Electron"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "ইলেকট্রন হল ঋণাত্মক চার্জযুক্ত কণা, যা নিউক্লিয়াসের চারপাশে ঘুরে।"
                  : "Electrons are negatively charged particles that orbit the nucleus."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "চার্জ: -1" : "Charge: -1"}</li>
                <li>• {lang === "bn" ? "ভর: 9.1094 × 10⁻³¹ কেজি" : "Mass: 9.1094 × 10⁻³¹ kg"}</li>
                <li>• {lang === "bn" ? "আবিষ্কার: জে. জে. থমসন (১৮৯৭)" : "Discovered by J.J. Thomson (1897)"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "অন্যান্য উপপরমাণবিক কণা" : "Other Subatomic Particles"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "প্রোটন এবং নিউট্রন কোয়ার্ক দ্বারা গঠিত। ইলেকট্রন লেপটন পরিবারের অংশ।"
                  : "Protons and neutrons are made of quarks. Electrons are part of the lepton family."}
              </p>
              <ul className="text-sm space-y-1">
                <li>• {lang === "bn" ? "কোয়ার্ক: গ্লুয়ন দ্বারা সংযুক্ত" : "Quarks: Held by gluons"}</li>
                <li>• {lang === "bn" ? "লেপটন: ইলেকট্রন, মিউয়ন, টাউ" : "Leptons: Electron, muon, tau"}</li>
              </ul>
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
                  <li>• {lang === "bn" ? "কণা ত্বরণ" : "Particle acceleration"}</li>
                  <li>• {lang === "bn" ? "নিউক্লিয়ার প্রতিক্রিয়া" : "Nuclear reactions"}</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "রসায়ন" : "Chemistry"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "রাসায়নিক বন্ধন" : "Chemical bonding"}</li>
                  <li>• {lang === "bn" ? "আইসোটোপ বিশ্লেষণ" : "Isotope analysis"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রোটন সংখ্যা = পরমাণু সংখ্যা।" : "Proton number = atomic number."}</li>
                <li>• {lang === "bn" ? "ইলেকট্রন ভর প্রায় অবহেলিত।" : "Electron mass is nearly negligible."}</li>
                <li>• {lang === "bn" ? "নিউট্রন আইসোটোপ নির্ধারণ করে।" : "Neutrons determine isotopes."}</li>
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