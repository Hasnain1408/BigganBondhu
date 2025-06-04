"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function RelativeMotionContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")


  const plainText =
    lang === "bn"
      ? `আপেক্ষিক গতি হল একটি বস্তুর গতি যা অন্য বস্তুর তুলনায় পর্যবেক্ষণ করা হয়, যাকে রেফারেন্স ফ্রেম বলা হয়।
মূল বৈশিষ্ট্যসমূহ:
- আপেক্ষিক বেগ: দুটি বস্তুর বেগের পার্থক্য
- রেফারেন্স ফ্রেম: পর্যবেক্ষণের দৃষ্টিকোণ
- ভেক্টর প্রকৃতি: দিক এবং মান
সূত্রাবলী:
- আপেক্ষিক বেগ (1D): v_AB = v_A - v_B
- আপেক্ষিক বেগ (2D): ভেক্টর বিয়োগ
- আপেক্ষিক দূরত্ব: d_AB = |r_A - r_B|`
      : `Relative motion is the motion of an object observed with respect to another object, called the reference frame.
Key characteristics:
- Relative velocity: Difference in velocities of two objects
- Reference frame: Perspective of observation
- Vector nature: Direction and magnitude
Formulas:
- Relative velocity (1D): v_AB = v_A - v_B
- Relative velocity (2D): Vector subtraction
- Relative distance: d_AB = |r_A - r_B|`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "আপেক্ষিক গতি" : "Relative Motion"}
            </h3>
            <p>
              {lang === "bn"
                ? "আপেক্ষিক গতি হল একটি বস্তুর গতি যা অন্য বস্তুর তুলনায় পর্যবেক্ষণ করা হয়, যাকে রেফারেন্স ফ্রেম বলা হয়।"
                : "The motion of an object observed with respect to another object, called the reference frame."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "আপেক্ষিক বেগ: দুটি বস্তুর বেগের পার্থক্য"
                  : "Relative velocity: Difference in velocities of two objects"}
              </li>
              <li>
                {lang === "bn"
                  ? "রেফারেন্স ফ্রেম: পর্যবেক্ষণের দৃষ্টিকোণ"
                  : "Reference frame: Perspective of observation"}
              </li>
              <li>
                {lang === "bn"
                  ? "ভেক্টর প্রকৃতি: দিক এবং মান"
                  : "Vector nature: Direction and magnitude"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  আপেক্ষিক বেগ (1D): v_AB = v_A - v_B <br />
                  আপেক্ষিক বেগ (2D): ভেক্টর বিয়োগ <br />
                  আপেক্ষিক দূরত্ব: d_AB = |r_A - r_B|
                </>
              ) : (
                <>
                  Relative velocity (1D): v_AB = v_A - v_B <br />
                  Relative velocity (2D): Vector subtraction <br />
                  Relative distance: d_AB = |r_A - r_B|
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