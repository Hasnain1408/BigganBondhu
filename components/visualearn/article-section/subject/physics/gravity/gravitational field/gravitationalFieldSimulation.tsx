
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function GravitationalFieldSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mass, setMass] = useState(1e12) // Mass in kg
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const G = 6.674e-11 // Gravitational constant

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw space background
    ctx.fillStyle = "#0a0a23"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw central mass
    const cx = canvasWidth / 2
    const cy = canvasHeight / 2
    ctx.fillStyle = "#ff0000"
    ctx.beginPath()
    ctx.arc(cx, cy, 20, 0, Math.PI * 2)
    ctx.fill()

    // Draw field lines
    const numLines = 16
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2
      const points = []
      for (let r = 30; r < 200; r += 5) {
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        points.push({ x, y })
      }
      ctx.beginPath()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.moveTo(points[0].x, points[0].y)
      for (let j = 1; j < points.length; j++) {
        ctx.lineTo(points[j].x, points[j].y)
      }
      ctx.stroke()
      // Arrowhead
      const last = points[points.length - 1]
      const prev = points[points.length - 2]
      const dx = last.x - prev.x
      const dy = last.y - prev.y
      const len = Math.sqrt(dx * dx + dy * dy)
      const ux = dx / len
      const uy = dy / len
      ctx.beginPath()
      ctx.moveTo(last.x, last.y)
      ctx.lineTo(last.x - 10 * ux + 5 * uy, last.y - 10 * uy - 5 * ux)
      ctx.moveTo(last.x, last.y)
      ctx.lineTo(last.x - 10 * ux - 5 * uy, last.y - 10 * uy + 5 * ux)
      ctx.stroke()
    }

    // Draw test mass if playing
    if (isPlaying) {
      const r = 150 - (t % 100) * 0.5
      const testX = cx + r
      const testY = cy
      ctx.fillStyle = "#00ff00"
      ctx.beginPath()
      ctx.arc(testX, testY, 5, 0, Math.PI * 2)
      ctx.fill()
      const g = (G * mass) / (r * r)
      ctx.fillStyle = "#ffffff"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? `ক্ষেত্র শক্তি: ${g.toFixed(2)} N/kg` : `Field Strength: ${g.toFixed(2)} N/kg`,
        testX,
        testY - 20
      )
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `ভর: ${mass.toExponential(1)} kg` : `Mass: ${mass.toExponential(1)} kg`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "মাধ্যাকর্ষণ ক্ষেত্র সিমুলেশন" : "Gravitational Field Simulation",
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
  }, [isPlaying, mass, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMass(1e12)
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
              <Label className="text-sm">{lang === "bn" ? "ভর" : "Mass"}</Label>
              <Slider
                min={1e11}
                max={1e13}
                step={1e11}
                value={[mass]}
                onValueChange={(v) => setMass(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{mass.toExponential(1)} kg</p>
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
