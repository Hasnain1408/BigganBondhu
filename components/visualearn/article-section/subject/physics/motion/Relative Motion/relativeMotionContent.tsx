"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import TopicChatbot from "@/components/visualearn/topic-chatbot"

export default function RelativeMotionContent() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const audioRef = useRef<HTMLAudioElement | null>(null)

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

  const toggleAudio = async () => {
    if (isAudioPlaying) {
      audioRef.current?.pause()
      setIsAudioPlaying(false)
      return
    }

    setIsAudioPlaying(true)

    try {
      const tokenRes = await fetch("https://southeastasia.api.cognitive.microsoft.com/sts/v1.0/issueToken", {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": "YOUR-KEY-HERE", // replace with your actual key
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (!tokenRes.ok) throw new Error("Failed to get Azure TTS token")
      const token = await tokenRes.text()

      const voice = lang === "bn" ? "bn-BD-NabanitaNeural" : "en-US-JennyNeural"
      const ssml = `
        <speak version='1.0' xml:lang='${lang === "bn" ? "bn-BD" : "en-US"}'>
          <voice name='${voice}'>${plainText}</voice>
        </speak>
      `

      const audioRes = await fetch("https://southeastasia.tts.speech.microsoft.com/cognitiveservices/v1", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        },
        body: ssml,
      })

      if (!audioRes.ok) throw new Error("Failed to synthesize speech")
      const audioBlob = await audioRes.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audioRef.current = audio
      audio.play()
      audio.onended = () => setIsAudioPlaying(false)
    } catch (error) {
      console.error("Azure TTS error:", error)
      setIsAudioPlaying(false)
    }
  }

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

          <Button variant="outline" size="sm" onClick={toggleAudio}>
            <Volume2 className={`h-4 w-4 mr-1 ${isAudioPlaying ? "text-primary" : ""}`} />
            {isAudioPlaying
              ? lang === "bn" ? "অডিও বিরতি" : "Pause Audio"
              : lang === "bn" ? "শুনুন" : "Listen"}
          </Button>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>
              English
            </Button>
            <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>
              বাংলা
            </Button>
          </div>
        </div>

        <TopicChatbot />
      </CardContent>
    </Card>
  )
}