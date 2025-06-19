
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function UniversalGravitationSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [massRatio, setMassRatio] = useState(1) // Ratio of m2/m1
  const [distance, setDistance] = useState(200) // Pixel distance
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const G = 6.674e-11 // Scaled for visualization
  const m1 = 1e10 // Base mass for m1

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw space background
    ctx.fillStyle = "#0a0a23"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Masses
    const m2 = m1 * massRatio
    const x1 = canvasWidth / 3
    const x2 = x1 + distance
    const y = canvasHeight / 2

    // Draw masses
    ctx.fillStyle = "#ff0000"
    ctx.beginPath()
    ctx.arc(x1, y, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#00ff00"
    ctx.beginPath()
    ctx.arc(x2, y, 20 * Math.cbrt(massRatio), 0, Math.PI * 2)
    ctx.fill()

    // Draw force line
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x1, y)
    ctx.lineTo(x2, y)
    ctx.stroke()

    // Calculate force (scaled for visualization)
    const force = (G * m1 * m2) / (distance * distance) * 1e10
    ctx.fillStyle = "#ffffff"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" ? `শক্তি: ${force.toFixed(2)} N` : `Force: ${force.toFixed(2)} N`,
      (x1 + x2) / 2,
      y - 30
    )

    // Animation: Move masses closer
    if (isPlaying) {
      const newDistance = distance - (force / 1e12) * animationSpeed
      if (newDistance > 50) setDistance(newDistance)
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" 
        ? `ভর অনুপাত: ${massRatio.toFixed(1)}, দূরত্ব: ${distance.toFixed(0)} মি` 
        : `Mass Ratio: ${massRatio.toFixed(1)}, Distance: ${distance.toFixed(0)} m`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "সর্বজনীন মাধ্যাকর্ষণ সিমুলেশন" : "Universal Gravitation Simulation",
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
  }, [isPlaying, massRatio, distance, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMassRatio(1)
    setDistance(200)
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
              <Label className="text-sm">{lang === "bn" ? "ভর অনুপাত (m₂/m₁)" : "Mass Ratio (m₂/m₁)"}</Label>
              <Slider
                min={0.1}
                max={5}
                step={0.1}
                value={[massRatio]}
                onValueChange={(v) => setMassRatio(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{massRatio.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "দূরত্ব" : "Distance"}</Label>
              <Slider
                min={50}
                max={400}
                step={10}
                value={[distance]}
                onValueChange={(v) => setDistance(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{distance.toFixed(0)} m</p>
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
