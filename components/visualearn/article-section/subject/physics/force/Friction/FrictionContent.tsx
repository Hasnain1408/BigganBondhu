"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import TopicChatbot from "@/components/visualearn/topic-chatbot"

export default function FrictionContent() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const plainText =
    lang === "bn"
      ? `ঘর্ষণ হল দুটি পৃষ্ঠের মধ্যে সংস্পর্শে থাকা অবস্থায় গতির বিরোধিতা করা বল।
মূল বৈশিষ্ট্যসমূহ:
- স্থিতিঘর্ষণ: স্থির বস্তুকে গতিশীল করতে বাধা দেয়।
- গতিঘর্ষণ: গতিশীল বস্তুর গতি বাধা দেয়।
- ঘর্ষণ গুণাঙ্ক: পৃষ্ঠের প্রকৃতির উপর নির্ভর করে।
সূত্রাবলী:
- F_f = μN
- F_s,max = μ_sN`
      : `Friction is the force that opposes motion between two surfaces in contact.
Key characteristics:
- Static Friction: Prevents a stationary object from moving.
- Kinetic Friction: Opposes the motion of a moving object.
- Coefficient of Friction: Depends on the nature of the surfaces.
Formulas:
- F_f = μN
- F_s,max = μ_sN`

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
          "Ocp-Apim-Subscription-Key": "YOUR-KEY-HERE",
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
              {lang === "bn" ? "ঘর্ষণ" : "Friction"}
            </h3>
            <p>
              {lang === "bn"
                ? "ঘর্ষণ হল দুটি পৃষ্ঠের মধ্যে সংস্পর্শে থাকা অবস্থায় গতির বিরোধিতা করা বল।"
                : "Friction is the force that opposes motion between two surfaces in contact."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "স্থিতিঘর্ষণ: স্থির বস্তুকে গতিশীল করতে বাধা দেয়।"
                  : "Static Friction: Prevents a stationary object from moving."}
              </li>
              <li>
                {lang === "bn"
                  ? "গতিঘর্ষণ: গতিশীল বস্তুর গতি বাধা দেয়।"
                  : "Kinetic Friction: Opposes the motion of a moving object."}
              </li>
              <li>
                {lang === "bn"
                  ? "ঘর্ষণ গুণাঙ্ক: পৃষ্ঠের প্রকৃতির উপর নির্ভর করে।"
                  : "Coefficient of Friction: Depends on the nature of the surfaces."}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  F_f = μN <br />
                  F_s,max = μ_sN
                </>
              ) : (
                <>
                  F_f = μN <br />
                  F_s,max = μ_sN
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