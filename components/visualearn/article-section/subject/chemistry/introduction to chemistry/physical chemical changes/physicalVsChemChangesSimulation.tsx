
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function PhysicalVsChemChangesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [changeType, setChangeType] = useState(0) // 0 (physical), 1 (chemical)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw container
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(canvasWidth / 4, canvasHeight / 4, canvasWidth / 2, canvasHeight / 2)

    if (changeType === 0) {
      // Physical Change: Ice melting
      ctx.fillStyle = isPlaying ? "rgba(0, 191, 255, 0.5)" : "#00bfff"
      const meltProgress = isPlaying ? Math.min(t / 5, 1) : 0
      ctx.fillRect(
        canvasWidth / 4,
        canvasHeight / 4 + (canvasHeight / 2) * (1 - meltProgress),
        canvasWidth / 2,
        (canvasHeight / 2) * meltProgress
      )
      if (meltProgress < 1) {
        ctx.fillStyle = "#fff"
        ctx.fillRect(
          canvasWidth / 4,
          canvasHeight / 4,
          canvasWidth / 2,
          (canvasHeight / 2) * (1 - meltProgress)
        )
      }
    } else {
      // Chemical Change: Iron rusting
      ctx.fillStyle = "#c0c0c0"
      ctx.fillRect(canvasWidth / 4, canvasHeight / 4, canvasWidth / 2, canvasHeight / 2)
      if (isPlaying) {
        ctx.fillStyle = "rgba(139, 69, 19, 0.5)"
        const rustProgress = Math.min(t / 5, 1)
        ctx.fillRect(
          canvasWidth / 4,
          canvasHeight / 4,
          (canvasWidth / 2) * rustProgress,
          canvasHeight / 2
        )
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
        ? `পরিবর্তন: ${changeType === 0 ? "ভৌত (বরফ গলা)" : "রাসায়নিক (মরিচা)"}` 
        : `Change: ${changeType === 0 ? "Physical (Ice Melting)" : "Chemical (Rusting)"}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "ভৌত বনাম রাসায়নিক পরিবর্তন সিমুলেশন" : "Physical vs Chemical Changes Simulation",
        canvasWidth / 2,
        canvasHeight - 20
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
  }, [isPlaying, changeType, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setChangeType(0)
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
            )}
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
              <Label className="text-sm">{lang === "bn" ? "পরিবর্তনের প্রকার" : "Change Type"}</Label>
              <Slider
                min={0}
                max={1}
                step={1}
                value={[changeType]}
                onValueChange={(v) => setChangeType(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">
                {lang === "bn" ? (changeType === 0 ? "ভৌত" : "রাসায়নিক") : (changeType === 0 ? "Physical" : "Chemical")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
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
