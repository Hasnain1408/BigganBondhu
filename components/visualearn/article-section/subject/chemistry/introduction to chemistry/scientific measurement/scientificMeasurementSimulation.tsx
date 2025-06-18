
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function ScientificMeasurementSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [measurementType, setMeasurementType] = useState(0) // 0 (mass), 1 (volume), 2 (temperature)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw lab table
    ctx.fillStyle = "#8b4513"
    ctx.fillRect(0, canvasHeight - 100, canvasWidth, 100)

    if (measurementType === 0) {
      // Mass: Balance scale
      ctx.fillStyle = "#c0c0c0"
      ctx.fillRect(canvasWidth / 2 - 100, canvasHeight - 200, 200, 50) // Balance base
      ctx.fillRect(canvasWidth / 2 - 50, canvasHeight - 250, 100, 50) // Balance pan
      if (isPlaying) {
        ctx.fillStyle = "#ff0000"
        const mass = Math.sin(t) * 10 + 50 // Simulated mass in grams
        ctx.fillRect(canvasWidth / 2 - 25, canvasHeight - 230, 50, 30)
        ctx.fillStyle = "#000"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`${mass.toFixed(2)} g`, canvasWidth / 2, canvasHeight - 260)
      }
    } else if (measurementType === 1) {
      // Volume: Graduated cylinder
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.strokeRect(canvasWidth / 2 - 50, canvasHeight - 250, 100, 150)
      if (isPlaying) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)"
        const volume = Math.sin(t) * 10 + 50 // Simulated volume in mL
        ctx.fillRect(canvasWidth / 2 - 50, canvasHeight - 100 - volume, 100, volume)
        ctx.fillStyle = "#000"
        ctx.font = "14px Arial"
        ctx.textAlign = "right"
        ctx.fillText(`${volume.toFixed(1)} mL`, canvasWidth / 2 + 60, canvasHeight - 100 - volume / 2)
      }
    } else {
      // Temperature: Thermometer
      ctx.fillStyle = "#c0c0c0"
      ctx.fillRect(canvasWidth / 2 - 10, canvasHeight - 250, 20, 150)
      ctx.fillStyle = "#fff"
      ctx.fillRect(canvasWidth / 2 - 5, canvasHeight - 245, 10, 140)
      if (isPlaying) {
        ctx.fillStyle = "#ff0000"
        const temp = Math.sin(t) * 5 + 25 // Simulated temperature in °C
        const height = (temp / 100) * 140
        ctx.fillRect(canvasWidth / 2 - 5, canvasHeight - 105 - height, 10, height)
        ctx.fillStyle = "#000"
        ctx.font = "14px Arial"
        ctx.textAlign = "right"
        ctx.fillText(`${temp.toFixed(1)} °C`, canvasWidth / 2 + 30, canvasHeight - 105 - height / 2)
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
        ? `পরিমাপ: ${measurementType === 0 ? "ভর" : measurementType === 1 ? "আয়তন" : "তাপমাত্রা"}` 
        : `Measurement: ${measurementType === 0 ? "Mass" : measurementType === 1 ? "Volume" : "Temperature"}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "বৈজ্ঞানিক পরিমাপ সিমুলেশন" : "Scientific Measurement Simulation",
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
  }, [isPlaying, measurementType, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMeasurementType(0)
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
              <Label className="text-sm">{lang === "bn" ? "পরিমাপের প্রকার" : "Measurement Type"}</Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={[measurementType]}
                onValueChange={(v) => setMeasurementType(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">
                {lang === "bn" 
                  ? (measurementType === 0 ? "ভর" : measurementType === 1 ? "আয়তন" : "তাপমাত্রা") 
                  : (measurementType === 0 ? "Mass" : measurementType === 1 ? "Volume" : "Temperature")}
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
