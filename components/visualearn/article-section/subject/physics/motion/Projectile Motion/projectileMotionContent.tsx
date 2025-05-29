"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import TopicChatbot from "@/components/visualearn/topic-chatbot"

export default function ProjectileMotionContent() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const plainText =
    lang === "bn"
      ? `প্রজেক্টাইল মোশন হল এমন একটি বস্তুর গতি যা কেবল মাধ্যাকর্ষণের প্রভাবে বাতাসে নিক্ষেপ বা প্রক্ষেপিত হয়।
মূল বৈশিষ্ট্যসমূহ:
- অনুভূমিক গতি: ধ্রুব গতি
- উল্লম্ব গতি: ধ্রুব ত্বরণ (৯.৮ m/s²)
- পথ: প্যারাবলিক ট্রাজেক্টরি
সূত্রাবলী:
- উড্ডয়নের সময় = (২v₀sinθ)/g
- সর্বোচ্চ উচ্চতা = (v₀²sin²θ)/২g
- ব্যাপ্তি = (v₀²sin2θ)/g`
      : `Projectile motion is the motion of an object thrown or projected into the air, subject only to gravity.
Key characteristics:
- Horizontal motion: Constant velocity
- Vertical motion: Constant acceleration (9.8 m/s²)
- Path: Parabolic trajectory
Formulas:
- Time of flight = (2v₀sinθ)/g
- Max height = (v₀²sin²θ)/2g
- Range = (v₀²sin2θ)/g`

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
              {lang === "bn" ? "প্রজেক্টাইল মোশন" : "Projectile Motion"}
            </h3>
            <p>
              {lang === "bn"
                ? "প্রজেক্টাইল মোশন হল এমন একটি বস্তুর গতি যা কেবল মাধ্যাকর্ষণের প্রভাবে বাতাসে নিক্ষেপ বা প্রক্ষেপিত হয়।"
                : "The motion of an object thrown or projected into the air, subject only to acceleration due to gravity."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "অনুভূমিক গতি: ধ্রুব গতি (কোনো ত্বরণ নেই)"
                  : "Horizontal motion: Constant velocity (no acceleration)"}
              </li>
              <li>
                {lang === "bn"
                  ? "উল্লম্ব গতি: ধ্রুব ত্বরণ (g = ৯.৮ m/s² নিচের দিকে)"
                  : "Vertical motion: Constant acceleration (g = 9.8 m/s² downward)"}
              </li>
              <li>
                {lang === "bn"
                  ? "পথ: প্যারাবলিক ট্রাজেক্টরি"
                  : "Path: Parabolic trajectory"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  উড্ডয়নের সময়: t = (২v₀sinθ)/g <br />
                  সর্বোচ্চ উচ্চতা: h = (v₀²sin²θ)/২g <br />
                  ব্যাপ্তি: R = (v₀²sin2θ)/g
                </>
              ) : (
                <>
                  Time of flight: t = (2v₀sinθ)/g <br />
                  Maximum height: h = (v₀²sin²θ)/2g <br />
                  Range: R = (v₀²sin2θ)/g
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
