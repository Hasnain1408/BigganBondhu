
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function IdealGasEquationSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(10) // Volume in liters
  const [temperature, setTemperature] = useState(300) // Temperature in Kelvin
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const R = 8.314 // Gas constant in J/(mol·K)
  const n = 1 // Moles
  const numParticles = 30

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw container
    const containerWidth = Math.sqrt(volume) * 100
    const containerHeight = Math.sqrt(volume) * 100
    const x = (canvasWidth - containerWidth) / 2
    const y = (canvasHeight - containerHeight) / 2
    ctx.fillStyle = "#87ceeb"
    ctx.fillRect(x, y, containerWidth, containerHeight)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, containerWidth, containerHeight)

    // Draw particles
    const speedScale = Math.sqrt(temperature / 300)
    for (let i = 0; i < numParticles; i++) {
      const px = x + Math.random() * containerWidth
      const py = y + Math.random() * containerHeight
      ctx.fillStyle = `hsl(${(temperature / 500) * 360}, 70%, 50%)`
      ctx.beginPath()
      ctx.arc(px, py, 3 * speedScale, 0, Math.PI * 2)
      ctx.fill()
    }

    // Calculate pressure (PV = nRT)
    const pressure = (n * R * temperature) / volume / 1000 // kPa
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" 
        ? `চাপ: ${pressure.toFixed(2)} kPa, আয়তন: ${volume.toFixed(2)} L, তাপমাত্রা: ${temperature} K` 
        : `Pressure: ${pressure.toFixed(2)} kPa, Volume: ${volume.toFixed(2)} L, Temperature: ${temperature} K`,
      canvasWidth / 2,
      y - 20
    )

    // Animate changes
    if (isPlaying) {
      const newVolume = 10 + 5 * Math.sin(t)
      setVolume(newVolume)
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? "আদর্শ গ্যাস সমীকরণ: PV = nRT" : "Ideal Gas Equation: PV = nRT",
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "আদর্শ গ্যাস সমীকরণ সিমুলেশন" : "Ideal Gas Equation Simulation",
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
  }, [isPlaying, volume, temperature, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setVolume(10)
    setTemperature(300)
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "আয়তন" : "Volume"}</Label>
              <Slider
                min={5}
                max={15}
                step={0.1}
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{volume.toFixed(2)} L</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তাপমাত্রা" : "Temperature"}</Label>
              <Slider
                min={200}
                max={400}
                step={10}
                value={[temperature]}
                onValueChange={(v) => setTemperature(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{temperature} K</p>
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
