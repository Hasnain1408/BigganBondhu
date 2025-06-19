
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Sun } from "lucide-react"

export default function GeneralRelativitySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mass, setMass] = useState(1)
  const [showLens, setShowLens] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const starX = 200
  const starY = canvasHeight / 2
  const massX = canvasWidth / 2
  const massY = canvasHeight / 2
  const lightStartX = 0
  const lightStartY = canvasHeight / 2 - 50

  // Simulation state
  const lightPos = useRef({ x: lightStartX, y: lightStartY })

  const drawMass = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(massX, massY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ভরবিশিষ্ট বস্তু" : "Massive Object", massX, massY + 40)
  }

  const drawStar = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(starX, starY, 15, 0, Math.PI * 2)
    ctx.fillStyle = "#ffaa00"
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "তারা" : "Star", starX, starY + 30)
  }

  const drawLightPath = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.moveTo(lightStartX, lightStartY)
    let x = lightStartX
    let y = lightStartY
    const dx = 1
    while (x < canvasWidth) {
      const r = Math.sqrt((x - massX) ** 2 + (y - massY) ** 2)
      const deflection = (mass * 0.1) / (r ** 2)
      y += deflection * (y > massY ? -1 : 1)
      ctx.lineTo(x, y)
      x += dx
    }
    ctx.strokeStyle = "#ff4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw light particle
    ctx.beginPath()
    ctx.arc(lightPos.current.x, lightPos.current.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#ff4444"
    ctx.fill()
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw elements
    drawMass(ctx)
    drawStar(ctx)
    if (showLens) drawLightPath(ctx)

    // Update light position
    if (isPlaying) {
      lightPos.current.x += 2
      const r = Math.sqrt((lightPos.current.x - massX) ** 2 + (lightPos.current.y - massY) ** 2)
      const deflection = (mass * 0.1) / (r ** 2)
      lightPos.current.y += deflection * (lightPos.current.y > massY ? -1 : 1)
      if (lightPos.current.x > canvasWidth) lightPos.current = { x: lightStartX, y: lightStartY }
      setAnimationTime(prev => prev + 0.016)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `ভর: ${mass.toFixed(2)}`,
      `সময়: ${animationTime.toFixed(2)} s`,
      ``,
      `ধারণা: মহাকর্ষীয় লেন্সিং`
    ] : [
      `Mass: ${mass.toFixed(2)}`,
      `Time: ${animationTime.toFixed(2)} s`,
      ``,
      `Concept: Gravitational Lensing`
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
    lightPos.current = { x: lightStartX, y: lightStartY }
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mass, showLens, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMass(1)
    lightPos.current = { x: lightStartX, y: lightStartY }
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
            onClick={() => setShowLens(!showLens)} 
            variant={showLens ? "default" : "outline"}
          >
            <Sun className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "লেন্সিং দেখান" : "Show Lensing"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভর (একক)" : "Mass (units)"}</Label>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[mass]}
                onValueChange={(v) => setMass(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{mass.toFixed(2)}</p>
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
