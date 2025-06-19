
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Clock } from "lucide-react"

export default function SpecialRelativitySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [velocity, setVelocity] = useState(0.5)
  const [showClocks, setShowClocks] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const c = 1 // Speed of light (normalized)
  const restClockX = 200
  const movingClockX = 400
  const clockY = canvasHeight / 2
  const clockRadius = 50

  // Simulation state
  const restTime = useRef(0)
  const movingTime = useRef(0)

  const drawClocks = (ctx: CanvasRenderingContext2D) => {
    // Rest clock
    ctx.beginPath()
    ctx.arc(restClockX, clockY, clockRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#e0e0e0"
    ctx.fill()
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "বিশ্রাম ঘড়ি" : "Rest Clock", restClockX, clockY - clockRadius - 10)

    // Moving clock
    ctx.beginPath()
    ctx.arc(movingClockX, clockY, clockRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#e0e0e0"
    ctx.fill()
    ctx.strokeStyle = "#333"
    ctx.stroke()
    ctx.fillStyle = "#000"
    ctx.fillText(lang === "bn" ? "চলমান ঘড়ি" : "Moving Clock", movingClockX, clockY - clockRadius - 10)

    // Draw clock hands
    const restAngle = (restTime.current % 12) * (Math.PI / 6)
    const movingAngle = (movingTime.current % 12) * (Math.PI / 6)
    ctx.beginPath()
    ctx.moveTo(restClockX, clockY)
    ctx.lineTo(restClockX + clockRadius * 0.8 * Math.sin(restAngle), clockY - clockRadius * 0.8 * Math.cos(restAngle))
    ctx.strokeStyle = "#ff4444"
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(movingClockX, clockY)
    ctx.lineTo(movingClockX + clockRadius * 0.8 * Math.sin(movingAngle), clockY - clockRadius * 0.8 * Math.cos(movingAngle))
    ctx.strokeStyle = "#4444ff"
    ctx.stroke()
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Update times
    if (isPlaying) {
      restTime.current += 0.01
      const gamma = 1 / Math.sqrt(1 - velocity ** 2 / c ** 2)
      movingTime.current += 0.01 / gamma
      setAnimationTime(prev => prev + 0.016)
    }

    // Draw clocks
    if (showClocks) drawClocks(ctx)

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 120)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const gamma = 1 / Math.sqrt(1 - velocity ** 2 / c ** 2)
    const info = lang === "bn" ? [
      `গতি: ${velocity.toFixed(2)}c`,
      `লরেন্টজ ফ্যাক্টর: ${gamma.toFixed(2)}`,
      `বিশ্রাম সময়: ${restTime.current.toFixed(2)}s`,
      `চলমান সময়: ${movingTime.current.toFixed(2)}s`,
      ``,
      `ধারণা: সময় প্রসারণ`
    ] : [
      `Velocity: ${velocity.toFixed(2)}c`,
      `Lorentz Factor: ${gamma.toFixed(2)}`,
      `Rest Time: ${restTime.current.toFixed(2)}s`,
      `Moving Time: ${movingTime.current.toFixed(2)}s`,
      ``,
      `Concept: Time Dilation`
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
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [velocity, showClocks, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setVelocity(0.5)
    restTime.current = 0
    movingTime.current = 0
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
            onClick={() => setShowClocks(!showClocks)} 
            variant={showClocks ? "default" : "outline"}
          >
            <Clock className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "ঘড়ি দেখান" : "Show Clocks"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "গতি (c-এর ভগ্নাংশ)" : "Velocity (fraction of c)"}</Label>
              <Slider
                min={0}
                max={0.99}
                step={0.01}
                value={[velocity]}
                onValueChange={(v) => setVelocity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{velocity.toFixed(2)}c</p>
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
