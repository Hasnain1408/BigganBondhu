"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import TopicChatbot from "@/components/visualearn/topic-chatbot"

export default function KinematicsContent() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const plainText =
    lang === "bn"
      ? `কাইনেমেটিক্স হল পদার্থবিজ্ঞানের একটি শাখা যা বস্তুর গতি অধ্যয়ন করে, ত্বরণ বা বলের কারণ বিবেচনা না করে।
মূল বৈশিষ্ট্যসমূহ:
- স্থানচ্যুতি: বস্তুর অবস্থানের পরিবর্তন
- বেগ: স্থানচ্যুতির হার
- ত্বরণ: বেগের পরিবর্তনের হার
সূত্রাবলী:
- v = u + at
- s = ut + ½at²
- v² = u² + 2as`
      : `Kinematics is a branch of physics that studies the motion of objects without considering the causes of motion, such as forces or acceleration.
Key characteristics:
- Displacement: Change in an object's position
- Velocity: Rate of change of displacement
- Acceleration: Rate of change of velocity
Formulas:
- v = u + at
- s = ut + ½at²
- v² = u² + 2as`

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
              {lang === "bn" ? "কাইনেমেটিক্স" : "Kinematics"}
            </h3>
            <p>
              {lang === "bn"
                ? "কাইনেমেটিক্স হল পদার্থবিজ্ঞানের একটি শাখা যা বস্তুর গতি অধ্যয়ন করে, ত্বরণ বা বলের কারণ বিবেচনা না করে।"
                : "Kinematics is a branch of physics that studies the motion of objects without considering the causes of motion, such as forces or acceleration."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "স্থানচ্যুতি: বস্তুর অবস্থানের পরিবর্তন"
                  : "Displacement: Change in an object's position"}
              </li>
              <li>
                {lang === "bn"
                  ? "বেগ: স্থানচ্যুতির হার"
                  : "Velocity: Rate of change of displacement"}
              </li>
              <li>
                {lang === "bn"
                  ? "ত্বরণ: বেগের পরিবর্তনের হার"
                  : "Acceleration: Rate of change of velocity"}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  v = u + at <br />
                  s = ut + ½at² <br />
                  v² = u² + 2as
                </>
              ) : (
                <>
                  v = u + at <br />
                  s = ut + ½at² <br />
                  v² = u² + 2as
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