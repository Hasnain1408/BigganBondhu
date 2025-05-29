"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function RelativeMotionSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [observerSpeed, setObserverSpeed] = useState(2)
  const [objectSpeed, setObjectSpeed] = useState(5)
  const [lang, setLang] = useState<"en" | "bn">("en")

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Ground line
    ctx.strokeStyle = "#444"
    ctx.beginPath()
    ctx.moveTo(0, 300)
    ctx.lineTo(800, 300)
    ctx.stroke()

    const time = timeRef.current
    const relativeSpeed = objectSpeed - observerSpeed

    // Object position
    const objX = 100 + objectSpeed * time * 20
    const obsX = 100 + observerSpeed * time * 20

    // Draw object
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(objX, 270, 30, 30)
    ctx.fillStyle = "#000"
    ctx.fillText(lang === "bn" ? "বস্তু" : "Object", objX, 265)

    // Draw observer
    ctx.fillStyle = "#10b981"
    ctx.fillRect(obsX, 320, 30, 30)
    ctx.fillStyle = "#000"
    ctx.fillText(lang === "bn" ? "পর্যবেক্ষক" : "Observer", obsX, 370)

    // Draw relative velocity vector
    ctx.beginPath()
    ctx.moveTo(obsX + 15, 320)
    ctx.lineTo(obsX + 15 + relativeSpeed * 20, 320)
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillText(
      lang === "bn" ? `আপেক্ষিক বেগ: ${relativeSpeed.toFixed(1)} মি/সে` : `Relative Speed: ${relativeSpeed.toFixed(1)} m/s`,
      obsX + 15,
      310
    )

    timeRef.current += 0.016
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    }
    return () => cancelAnimationFrame(requestRef.current!)
  }, [isPlaying, objectSpeed, observerSpeed, lang])

  const reset = () => {
    timeRef.current = 0
    setIsPlaying(false)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> {lang === "bn" ? "চালান" : "Play"}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "বস্তুর বেগ (মি/সে)" : "Object Speed (m/s)"}</Label>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[objectSpeed]}
                onValueChange={(v) => setObjectSpeed(v[0])}
              />
              <p className="text-right mt-2">{objectSpeed.toFixed(1)} {lang === "bn" ? "মি/সে" : "m/s"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "পর্যবেক্ষকের বেগ (মি/সে)" : "Observer Speed (m/s)"}</Label>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[observerSpeed]}
                onValueChange={(v) => setObserverSpeed(v[0])}
              />
              <p className="text-right mt-2">{observerSpeed.toFixed(1)} {lang === "bn" ? "মি/সে" : "m/s"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant={lang === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button
              variant={lang === "bn" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("bn")}
            >
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}