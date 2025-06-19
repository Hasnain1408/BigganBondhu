
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Users } from "lucide-react"

export default function RelativityParadoxesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [velocity, setVelocity] = useState(0.8)
  const [showAges, setShowAges] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const c = 1 // Speed of light (normalized)
  const earthX = 200
  const earthY = canvasHeight / 2
  const spaceshipXStart = 200
  const spaceshipXEnd = 600
  const spaceshipY = canvasHeight / 2

  // Simulation state
  const spaceshipPos = useRef({ x: spaceshipXStart, y: spaceshipY })
  const earthTime = useRef(0)
  const spaceshipTime = useRef(0)
  const direction = useRef(1) // 1 for outward, -1 for return

  const drawEarth = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(earthX, earthY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#00aa00"
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "পৃথিবী" : "Earth", earthX, earthY + 40)
  }

  const drawSpaceship = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.moveTo(spaceshipPos.current.x - 20, spaceshipPos.current.y - 10)
    ctx.lineTo(spaceshipPos.current.x + 20, spaceshipPos.current.y)
    ctx.lineTo(spaceshipPos.current.x - 20, spaceshipPos.current.y + 10)
    ctx.closePath()
    ctx.fillStyle = "#ff4444"
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "মহাকাশযান" : "Spaceship", spaceshipPos.current.x, spaceshipPos.current.y - 20)
  }

  const drawAges = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" ? `পৃথিবীর বয়স: ${earthTime.current.toFixed(2)} বছর` : `Earth Age: ${earthTime.current.toFixed(2)} years`,
      earthX,
      earthY - 30
    )
    ctx.fillText(
      lang === "bn" ? `মহাকাশযানের বয়স: ${spaceshipTime.current.toFixed(2)} বছর` : `Spaceship Age: ${spaceshipTime.current.toFixed(2)} years`,
      spaceshipPos.current.x,
      spaceshipPos.current.y + 20
    )
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Update positions and times
    if (isPlaying) {
      spaceshipPos.current.x += direction.current * 2
      earthTime.current += 0.01
      const gamma = 1 / Math.sqrt(1 - velocity ** 2 / c ** 2)
      spaceshipTime.current += 0.01 / gamma
      setAnimationTime(prev => prev + 0.016)

      // Reverse direction at endpoints
      if (spaceshipPos.current.x >= spaceshipXEnd && direction.current === 1) {
        direction.current = -1
      } else if (spaceshipPos.current.x <= spaceshipXStart && direction.current === -1) {
        direction.current = 1
      }
    }

    // Draw elements
    drawEarth(ctx)
    drawSpaceship(ctx)
    if (showAges) drawAges(ctx)

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
      `পৃথিবীর সময়: ${earthTime.current.toFixed(2)} বছর`,
      `মহাকাশযানের সময়: ${spaceshipTime.current.toFixed(2)} বছর`,
      ``,
      `ধারণা: যমজ প্যারাডক্স`
    ] : [
      `Velocity: ${velocity.toFixed(2)}c`,
      `Lorentz Factor: ${gamma.toFixed(2)}`,
      `Earth Time: ${earthTime.current.toFixed(2)} years`,
      `Spaceship Time: ${spaceshipTime.current.toFixed(2)} years`,
      ``,
      `Concept: Twin Paradox`
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
    spaceshipPos.current = { x: spaceshipXStart, y: spaceshipY }
    earthTime.current = 0
    spaceshipTime.current = 0
    direction.current = 1
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [velocity, showAges, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setVelocity(0.8)
    spaceshipPos.current = { x: spaceshipXStart, y: spaceshipY }
    earthTime.current = 0
    spaceshipTime.current = 0
    direction.current = 1
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
            onClick={() => setShowAges(!showAges)} 
            variant={showAges ? "default" : "outline"}
          >
            <Users className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "বয়স দেখান" : "Show Ages"}
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
