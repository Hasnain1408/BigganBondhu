"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import TopicChatbot from "@/components/visualearn/topic-chatbot"

export default function NewtonsLawsContent() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const plainText =
    lang === "bn"
      ? `নিউটনের গতিসূত্রগুলি পদার্থবিজ্ঞানে বস্তুর গতি এবং বলের সম্পর্ক বর্ণনা করে।
মূল বৈশিষ্ট্যসমূহ:
- প্রথম সূত্র: জড়তা - কোনো বস্তু স্থির থাকে বা অভিন্ন গতিতে থাকে যদি কোনো বাহ্যিক বল না থাকে।
- দ্বিতীয় সূত্র: ত্বরণ - F = ma
- তৃতীয় সূত্র: ক্রিয়া-প্রতিক্রিয়া - প্রতিটি ক্রিয়ার জন্য সমান ও বিপরীত প্রতিক্রিয়া থাকে।
সূত্রাবলী:
- F = ma
- a = F/m`
      : `Newton's Laws of Motion describe the relationship between the motion of an object and the forces acting on it in physics.
Key characteristics:
- First Law: Inertia - An object remains at rest or in uniform motion unless acted upon by an external force.
- Second Law: Acceleration - F = ma
- Third Law: Action-Reaction - For every action, there is an equal and opposite reaction.
Formulas:
- F = ma
- a = F/m`

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
              {lang === "bn" ? "নিউটনের গতিসূত্র" : "Newton's Laws of Motion"}
            </h3>
            <p>
              {lang === "bn"
                ? "নিউটনের গতিসূত্রগুলি পদার্থবিজ্ঞানে বস্তুর গতি এবং বলের সম্পর্ক বর্ণনা করে।"
                : "Newton's Laws of Motion describe the relationship between the motion of an object and the forces acting on it in physics."}
            </p>

            <h4 className="font-medium">
              {lang === "bn" ? "মূল বৈশিষ্ট্যসমূহ" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside">
              <li>
                {lang === "bn"
                  ? "প্রথম সূত্র: জড়তা - কোনো বস্তু স্থির থাকে বা অভিন্ন গতিতে থাকে যদি কোনো বাহ্যিক বল না থাকে।"
                  : "First Law: Inertia - An object remains at rest or in uniform motion unless acted upon by an external force."}
              </li>
              <li>
                {lang === "bn"
                  ? "দ্বিতীয় সূত্র: ত্বরণ - F = ma"
                  : "Second Law: Acceleration - F = ma"}
              </li>
              <li>
                {lang === "bn"
                  ? "তৃতীয় সূত্র: ক্রিয়া-প্রতিক্রিয়া - প্রতিটি ক্রিয়ার জন্য সমান ও বিপরীত প্রতিক্রিয়া থাকে।"
                  : "Third Law: Action-Reaction - For every action, there is an equal and opposite reaction."}
              </li>
            </ul>

            <h4 className="font-medium">
              {lang === "bn" ? "গুরুত্বপূর্ণ সূত্রাবলী" : "Important Formulas"}
            </h4>
            <p>
              {lang === "bn" ? (
                <>
                  F = ma <br />
                  a = F/m
                </>
              ) : (
                <>
                  F = ma <br />
                  a = F/m
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