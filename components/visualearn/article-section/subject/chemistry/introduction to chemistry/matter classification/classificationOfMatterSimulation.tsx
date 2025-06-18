
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function ClassificationOfMatterSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [matterType, setMatterType] = useState(0) // 0 (element), 1 (compound), 2 (mixture)
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

    // Draw particles based on matter type
    ctx.fillStyle = "#ff0000"
    if (matterType === 0) {
      // Element: Single type of particle (e.g., O₂)
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.arc(
          canvasWidth / 4 + 50 + (i % 5) * 50 + 10 * Math.sin(t + i),
          canvasHeight / 4 + 50 + Math.floor(i / 5) * 50 + 10 * Math.cos(t + i),
          10,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    } else if (matterType === 1) {
      // Compound: Two types of particles bonded (e.g., H₂O)
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = "#ff0000" // Oxygen
        ctx.beginPath()
        ctx.arc(
          canvasWidth / 4 + 50 + i * 60 + 10 * Math.sin(t + i),
          canvasHeight / 4 + 50 + 10 * Math.cos(t + i),
          12,
          0,
          Math.PI * 2
        )
        ctx.fill()
        ctx.fillStyle = "#0000ff" // Hydrogen
        for (let j = 0; j < 2; j++) {
          ctx.beginPath()
          ctx.arc(
            canvasWidth / 4 + 50 + i * 60 + 20 * Math.cos((j * Math.PI) + t),
            canvasHeight / 4 + 50 + 20 * Math.sin((j * Math.PI) + t),
            8,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
      }
    } else {
      // Mixture: Multiple types of particles (e.g., saltwater)
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#00ff00" : "#0000ff"
        ctx.beginPath()
        ctx.arc(
          canvasWidth / 4 + 50 + (i % 5) * 50 + 10 * Math.sin(t + i),
          canvasHeight / 4 + 50 + Math.floor(i / 5) * 50 + 10 * Math.cos(t + i),
          10,
          0,
          Math.PI * 2
        )
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
        ? `পদার্থ: ${matterType === 0 ? "উপাদান" : matterType === 1 ? "যৌগ" : "মিশ্রণ"}` 
        : `Matter: ${matterType === 0 ? "Element" : matterType === 1 ? "Compound" : "Mixture"}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "পদার্থের শ্রেণীবিভাগ সিমুলেশন" : "Classification of Matter Simulation",
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
  }, [isPlaying, matterType, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMatterType(0)
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
              <Label className="text-sm">{lang === "bn" ? "পদার্থের প্রকার" : "Matter Type"}</Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={[matterType]}
                onValueChange={(v) => setMatterType(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">
                {lang === "bn" 
                  ? (matterType === 0 ? "উপাদান" : matterType === 1 ? "যৌগ" : "মিশ্রণ") 
                  : (matterType === 0 ? "Element" : matterType === 1 ? "Compound" : "Mixture")}
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
