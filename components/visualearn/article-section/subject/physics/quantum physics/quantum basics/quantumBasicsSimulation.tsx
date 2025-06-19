
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Waves } from "lucide-react"

export default function QuantumBasicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [slitSeparation, setSlitSeparation] = useState(50)
  const [waveFrequency, setWaveFrequency] = useState(0.1)
  const [showPattern, setShowPattern] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const sourceY = canvasHeight / 2
  const slitX = 200
  const screenX = 600
  const slitWidth = 5
  const maxIntensity = 255

  // Simulation state
  const pattern = useRef(new Array(canvasHeight).fill(0))
  const wavePhase = useRef(0)

  const drawSetup = (ctx: CanvasRenderingContext2D) => {
    // Draw source
    ctx.fillStyle = "#ff4444"
    ctx.beginPath()
    ctx.arc(50, sourceY, 10, 0, Math.PI * 2)
    ctx.fill()

    // Draw slits
    ctx.fillStyle = "#333"
    ctx.fillRect(slitX - slitWidth, 0, slitWidth * 2, sourceY - slitSeparation / 2 - 10)
    ctx.fillRect(slitX - slitWidth, sourceY - slitSeparation / 2 + 10, slitWidth * 2, slitSeparation - 20)
    ctx.fillRect(slitX - slitWidth, sourceY + slitSeparation / 2 + 10, slitWidth * 2, canvasHeight - sourceY - slitSeparation / 2 - 10)

    // Draw screen
    ctx.fillStyle = "#666"
    ctx.fillRect(screenX, 0, 10, canvasHeight)
  }

  const updateInterference = () => {
    pattern.current.fill(0)
    const wavelength = 20
    const k = 2 * Math.PI / wavelength
    const phase = wavePhase.current

    for (let y = 0; y < canvasHeight; y++) {
      const y1 = sourceY - slitSeparation / 2
      const y2 = sourceY + slitSeparation / 2
      const r1 = Math.sqrt((screenX - slitX) ** 2 + (y - y1) ** 2)
      const r2 = Math.sqrt((screenX - slitX) ** 2 + (y - y2) ** 2)
      const amplitude = Math.cos(k * r1 + phase) + Math.cos(k * r2 + phase)
      pattern.current[y] = amplitude ** 2
    }

    const max = Math.max(...pattern.current)
    if (max > 0) {
      pattern.current = pattern.current.map(i => (i / max) * maxIntensity)
    }
  }

  const drawPattern = (ctx: CanvasRenderingContext2D) => {
    if (!showPattern) return
    for (let y = 0; y < canvasHeight; y++) {
      const intensity = pattern.current[y]
      ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`
      ctx.fillRect(screenX + 10, y, 30, 1)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#e0e0e0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Update and draw
    if (isPlaying) {
      wavePhase.current += waveFrequency
      updateInterference()
      setAnimationTime(prev => prev + 0.016)
    }
    drawSetup(ctx)
    drawPattern(ctx)

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 120)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `ফাটলের দূরত্ব: ${slitSeparation.toFixed(0)} px`,
      `তরঙ্গ কম্পাঙ্ক: ${waveFrequency.toFixed(2)} rad/s`,
      ``,
      `ধারণা: তরঙ্গ-কণা দ্বৈততা`
    ] : [
      `Slit Separation: ${slitSeparation.toFixed(0)} px`,
      `Wave Frequency: ${waveFrequency.toFixed(2)} rad/s`,
      ``,
      `Concept: Wave-Particle Duality`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("ধারণা") || text.includes("Concept")) {
        ctx.fillStyle = "#ffff00"
      } else {
        ctx.fillStyle = "#fff"
      }
      ctx.fillText(text, 20, 35 + index * 16)
    })

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    updateInterference()
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [slitSeparation, waveFrequency, showPattern, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setSlitSeparation(50)
    setWaveFrequency(0.1)
    wavePhase.current = 0
    updateInterference()
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
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
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
          </Button>
          <Button 
            onClick={() => setShowPattern(!showPattern)} 
            variant={showPattern ? "default" : "outline"}
          >
            <Waves className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "প্যাটার্ন দেখান" : "Pattern"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ফাটলের দূরত্ব (px)" : "Slit Separation (px)"}</Label>
              <Slider
                min={20}
                max={100}
                step={5}
                value={[slitSeparation]}
                onValueChange={(v) => setSlitSeparation(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{slitSeparation.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তরঙ্গ কম্পাঙ্ক (rad/s)" : "Wave Frequency (rad/s)"}</Label>
              <Slider
                min={0.05}
                max={0.5}
                step={0.01}
                value={[waveFrequency]}
                onValueChange={(v) => setWaveFrequency(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{waveFrequency.toFixed(2)}</p>
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
