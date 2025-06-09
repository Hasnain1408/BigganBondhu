
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function ChemicalProcessesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [temperature, setTemperature] = useState(400) // °C
  const [pressure, setPressure] = useState(200) // atm
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const calculateYield = () => {
    // Simplified model for ammonia yield
    const yieldFactor = (pressure / 200) * Math.exp(-temperature / 400)
    return Math.min(Math.max(yieldFactor * 30, 5), 50) // Yield between 5% and 50%
  }

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw reactor
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(canvasWidth / 4, canvasHeight / 4, canvasWidth / 2, canvasHeight / 2)

    // Draw reactants (N₂ + 3H₂)
    ctx.fillStyle = "#ff0000" // N₂
    ctx.beginPath()
    ctx.arc(canvasWidth / 4 - 50, canvasHeight / 2, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#0000ff" // H₂
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(canvasWidth / 4 - 50, canvasHeight / 2 + 30 * (i - 1), 10, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw product (NH₃)
    const yieldPercent = calculateYield()
    const nh3Count = Math.floor(yieldPercent / 5)
    ctx.fillStyle = "#00ff00"
    for (let i = 0; i < nh3Count; i++) {
      ctx.beginPath()
      ctx.arc(
        canvasWidth * 3 / 4 + 50,
        canvasHeight / 2 + 30 * (i - nh3Count / 2),
        12,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }

    // Draw reaction animation
    if (isPlaying) {
      ctx.fillStyle = "rgba(255, 165, 0, 0.5)"
      ctx.beginPath()
      ctx.arc(canvasWidth / 2, canvasHeight / 2, 20 + 10 * Math.sin(t), 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `তাপমাত্রা: ${temperature}°C` : `Temperature: ${temperature}°C`,
      20,
      35
    )
    ctx.fillText(
      lang === "bn" ? `চাপ: ${pressure} atm` : `Pressure: ${pressure} atm`,
      20,
      55
    )
    ctx.fillText(
      lang === "bn" ? `উৎপাদ: ${yieldPercent.toFixed(1)}%` : `Yield: ${yieldPercent.toFixed(1)}%`,
      20,
      75
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "হাবের-বোশ প্রক্রিয়া সিমুলেশন" : "Haber-Bosch Process Simulation",
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
  }, [isPlaying, temperature, pressure, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setTemperature(400)
    setPressure(200)
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
              <Label className="text-sm">{lang === "bn" ? "তাপমাত্রা (°C)" : "Temperature (°C)"}</Label>
              <Slider
                min={300}
                max={500}
                step={10}
                value={[temperature]}
                onValueChange={(v) => setTemperature(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{temperature}°C</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "চাপ (atm)" : "Pressure (atm)"}</Label>
              <Slider
                min={100}
                max={300}
                step={10}
                value={[pressure]}
                onValueChange={(v) => setPressure(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{pressure} atm</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
