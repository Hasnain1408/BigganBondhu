"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function GeneExpressionContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `জিন প্রকাশ হল ডিএনএ থেকে প্রোটিন সংশ্লেষণের প্রক্রিয়া।
মূল ধাপ:
- ট্রান্সক্রিপশন
- ট্রান্সলেশন
- নিয়ন্ত্রণ
গুরুত্বপূর্ণ উপাদান:
- ডিএনএ
- আরএনএ
- রাইবোজোম
- প্রোটিন
নিয়ন্ত্রণ প্রক্রিয়া:
- ট্রান্সক্রিপশনাল
- পোস্ট-ট্রান্সক্রিপশনাল
- ট্রান্সলেশনাল`
      : `Gene expression is the process by which DNA is used to synthesize proteins.
Key Steps:
- Transcription
- Translation
- Regulation
Key Components:
- DNA
- RNA
- Ribosomes
- Proteins
Regulation Mechanisms:
- Transcriptional
- Post-transcriptional
- Translational`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "জিন প্রকাশ" : "Gene Expression"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "জিন প্রকাশ হল এমন একটি প্রক্রিয়া যার মাধ্যমে ডিএনএ-তে সংরক্ষিত তথ্য প্রোটিনে রূপান্তরিত হয়, যা কোষের কার্যকারিতার জন্য অপরিহার্য। এই প্রক্রিয়াটি ট্রান্সক্রিপশন, ট্রান্সলেশন এবং নিয়ন্ত্রণের মাধ্যমে সম্পন্ন হয়।"
                  : "Gene expression is the process by which information encoded in DNA is converted into proteins, essential for cellular functions. This process involves transcription, translation, and regulation."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "জিন প্রকাশ কোষের জিনোমে থাকা নির্দেশাবলীকে কার্যকরী অণুতে (প্রোটিন বা আরএনএ) রূপান্তরিত করে। এটি জীবের বৃদ্ধি, বিকাশ এবং পরিবেশের সাথে অভিযোজনের জন্য গুরুত্বপূর্ণ।"
                    : "Gene expression converts instructions in a cell’s genome into functional molecules (proteins or RNA). It is critical for growth, development, and adaptation to the environment."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ট্রান্সক্রিপশন" : "Transcription"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "ট্রান্সক্রিপশন হল ডিএনএ থেকে মেসেঞ্জার আরএনএ (mRNA) সংশ্লেষণের প্রক্রিয়া। এটি নিউক্লিয়াসে ঘটে এবং আরএনএ পলিমারেজ এনজাইম দ্বারা নিয়ন্ত্রিত হয়।"
                  : "Transcription is the process of synthesizing messenger RNA (mRNA) from a DNA template. It occurs in the nucleus and is catalyzed by RNA polymerase."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ইনিশিয়েশন" : "Initiation"}</p>
                  <p className="text-sm">{lang === "bn" ? "আরএনএ পলিমারেজ প্রোমোটার অঞ্চলে বাঁধে।" : "RNA polymerase binds to the promoter region."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রসারণ" : "Elongation"}</p>
                  <p className="text-sm">{lang === "bn" ? "ডিএনএ টেমপ্লেট থেকে আরএনএ সংশ্লেষিত হয়।" : "RNA is synthesized from the DNA template."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সমাপ্তি" : "Termination"}</p>
                  <p className="text-sm">{lang === "bn" ? "টার্মিনেটর সিগন্যালে আরএনএ মুক্তি পায়।" : "RNA is released at a terminator signal."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ট্রান্সলেশন" : "Translation"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "ট্রান্সলেশন হল mRNA থেকে প্রোটিন সংশ্লেষণের প্রক্রিয়া, যা রাইবোজোমে ঘটে। tRNA অ্যামিনো অ্যাসিড বহন করে এবং কোডনের সাথে মিলে।"
                  : "Translation is the process of synthesizing proteins from mRNA in ribosomes. tRNA carries amino acids and matches them to codons."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ইনিশিয়েশন" : "Initiation"}</p>
                  <p className="text-sm">{lang === "bn" ? "রাইবোজোম mRNA-তে একত্রিত হয়।" : "Ribosome assembles on mRNA."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "প্রসারণ" : "Elongation"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিন চেইন বৃদ্ধি পায়।" : "Protein chain grows."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সমাপ্তি" : "Termination"}</p>
                  <p className="text-sm">{lang === "bn" ? "স্টপ কোডনে প্রোটিন মুক্তি পায়।" : "Protein is released at a stop codon."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জিন নিয়ন্ত্রণ" : "Gene Regulation"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "জিন নিয়ন্ত্রণ নিশ্চিত করে যে জিনগুলি সঠিক সময়ে এবং সঠিক কোষে প্রকাশিত হয়। এটি কোষের শক্তি সংরক্ষণ করে এবং কার্যকারিতা নিয়ন্ত্রণ করে।"
                  : "Gene regulation ensures genes are expressed at the right time and in the right cells, conserving energy and controlling function."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ট্রান্সক্রিপশনাল নিয়ন্ত্রণ" : "Transcriptional Regulation"}</p>
                  <p className="text-sm">{lang === "bn" ? "ট্রান্সক্রিপশন শুরু নিয়ন্ত্রণ।" : "Controls the start of transcription."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পোস্ট-ট্রান্সক্রিপশনাল" : "Post-transcriptional"}</p>
                  <p className="text-sm">{lang === "bn" ? "mRNA প্রক্রিয়াকরণ এবং স্থিতিশীলতা।" : "mRNA processing and stability."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ট্রান্সলেশনাল নিয়ন্ত্রণ" : "Translational Regulation"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিন সংশ্লেষণ নিয়ন্ত্রণ।" : "Controls protein synthesis."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গুরুত্বপূর্ণ উপাদান" : "Key Components"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ডিএনএ" : "DNA"}</p>
                  <p className="text-sm">{lang === "bn" ? "জিনগত তথ্যের টেমপ্লেট।" : "Template for genetic information."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "আরএনএ" : "RNA"}</p>
                  <p className="text-sm">{lang === "bn" ? "ডিএনএ থেকে প্রোটিনে মধ্যস্থতাকারী।" : "Intermediary from DNA to protein."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "রাইবোজোম" : "Ribosomes"}</p>
                  <p className="text-sm">{lang === "bn" ? "প্রোটিন সংশ্লেষণের স্থান।" : "Site of protein synthesis."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "জিন থেরাপি" : "Gene therapy"}</li>
                  <li>• {lang === "bn" ? "রোগ নির্ণয়" : "Disease diagnosis"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "জৈবপ্রযুক্তি" : "Biotechnology"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জিন সম্পাদনা" : "Gene editing"}</li>
                  <li>• {lang === "bn" ? "প্রোটিন উৎপাদন" : "Protein production"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "ট্রান্সক্রিপশন নিউক্লিয়াসে ঘটে, ট্রান্সলেশন সাইটোপ্লাজমে।" : "Transcription occurs in the nucleus, translation in the cytoplasm."}</li>
                <li>• {lang === "bn" ? "কোডন তিনটি নিউক্লিওটাইডের সেট।" : "Codons are sets of three nucleotides."}</li>
                <li>• {lang === "bn" ? "জিন নিয়ন্ত্রণ শক্তি সংরক্ষণ করে।" : "Gene regulation conserves cellular energy."}</li>
                <li>• {lang === "bn" ? "প্রোক্যারিওট এবং ইউক্যারিওটে নিয়ন্ত্রণ ভিন্ন।" : "Regulation differs in prokaryotes and eukaryotes."}</li>
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