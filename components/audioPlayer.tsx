// projectile-motion/components/AudioPlayer.tsx
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"

export default function AudioPlayer({
  isPlaying,
  togglePlay,
  lang,
}: {
  isPlaying: boolean
  togglePlay: () => void
  lang: "en" | "bn"
}) {
  return (
    <Button variant="outline" size="sm" onClick={togglePlay}>
      <Volume2 className={`h-4 w-4 mr-1 ${isPlaying ? "text-primary" : ""}`} />
      {isPlaying
        ? lang === "bn" ? "অডিও বিরতি" : "Pause Audio"
        : lang === "bn" ? "শুনুন" : "Listen"}
    </Button>
  )
}
