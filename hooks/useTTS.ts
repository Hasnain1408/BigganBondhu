import { useRef, useState } from "react"

export function useTTS(plainText: string, lang: "en" | "bn") {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = async () => {
    if (isPlaying) {
      // Pause the current audio
      audioRef.current?.pause()
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)

    try {
      // Stop and clean up any existing audio instance
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const tokenRes = await fetch("https://southeastasia.api.cognitive.microsoft.com/sts/v1.0/issueToken", {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY!,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      const token = await tokenRes.text()
      const voice = lang === "bn" ? "bn-BD-PradeepNeural" : "en-US-GuyNeural"

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

      const audioBlob = await audioRes.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.play()
      audio.onended = () => setIsPlaying(false)
    } catch (err) {
      console.error("TTS error:", err)
      setIsPlaying(false)
    }
  }

  return { isPlaying, toggleAudio }
}
