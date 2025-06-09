
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function ThermochemistrySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [reactionType, setReactionType] = useState(0) // -1 (endothermic), 0 (neutral), +1 (exothermic)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw calorimeter (container)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(canvasWidth / 4, canvasHeight / 4, canvasWidth / 2, canvasHeight / 2)

    // Simulate temperature change
    const baseTemperature = reactionType === 0 ? 25 : reactionType * 10 * Math.min(t, 2)
    const tempColor = reactionType > 0 ? "#ff5500" : reactionType < 0 ? "#00b0ff" : "#555"

    // Draw liquid in calorimeter
    ctx.fillStyle = tempColor
    ctx.fillRect(
      canvasWidth / 4 + 10,
      canvasHeight / 4 + canvasHeight / 4,
      canvasWidth / 20 - 20,
      canvasHeight / 4 - 10
    )

    // Draw thermometer
    ctx.fillStyle = "#000"
    ctx.fillRect(canvasWidth / 2 - 5, canvasHeight / 4 - 10, 10, canvasHeight / 2 + 20)
    // Draw temperature indicator
    ctx.fillStyle = "#ff0000"
    ctx.fillRect(
      canvasWidth / 2 -  canvasHeight / 2 - 2.5,
      canvasHeight / 4 + canvasHeight / 4 - (baseTemperature / 50 * canvasHeight / 4),
      5,
      baseTemperature / 50 * canvasHeight / 4
    )

    // Simulate heat flow (particles)
    if (isPlaying) {
      const particleCount = 10
      for (let i = 0; i < particleCount; i++) {
        const x = canvasWidth / 2 + Math.cos(t + i) * 50
        const y = canvasHeight / 2 + Math.sin(t + i) * 50
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = reactionType > 0 ? "#ff5500" : "#00b0"
        ctx.fill()
      }
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
ctx.fillText(
  lang === "bn"
    ? `বিক্রিয়া: ${reactionType > 0 ? "এক্সোথার্মিক" : reactionType < 0 ? "এন্ডোথার্মিক" : "নিরপেক্ষ"}`
    : `Reaction: ${reactionType > 0 ? "Exothermic" : reactionType < 0 ? "Endothermic" : "Neutral"}`,
  20,
  35
)

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "তাপ পরিবর্তন সিমুলেশন" : "Heat Flow Simulation",
        canvasWidth / 2,
        canvasHeight - 30
      )
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)

    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, reactionType, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setReactionType(0)
    setAnimationSpeed(1)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-gray-900 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> {lang === "bn" ? "চালান" : "Play"}
              </>
              )
            }
          </Button>
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট" : "Reset"}
          </Button>
          <Button 
            onClick={() => setShowLabels(!showLabels)} 
            variant={showLabels ? "default" : "outline"}
          >
            <Calculator className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "লেবেল দেখান" : "Labels"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "বিক্রিয়ার প্রকার" : "Reaction Type"}</Label>
              <Slider
                min={-1}
                max={1}
                step={1}
                value={[reactionType]}
                onValueChange={(v) => setReactionType(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">
                {lang === "bn"
                  ? reactionType > 0
                    ? "এক্সোথার্মিক"
                    : reactionType === 0
                    ? "নিরপেক্ষ"
                    : "এন্ডোথার্মিক"
                  : reactionType > 0
                    ? "Exothermic"
                    : reactionType === 0
                    ? "Neutral"
                    : "Endothermic"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0}
                max={0}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{animationSpeed.toFixed(1)}x</p>
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
