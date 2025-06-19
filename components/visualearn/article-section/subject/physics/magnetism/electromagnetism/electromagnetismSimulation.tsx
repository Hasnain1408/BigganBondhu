
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function ElectromagnetismSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(1) // Frequency in arbitrary units
  const [amplitude, setAmplitude] = useState(50) // Amplitude in pixels
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [time, setTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const c = 3e8 // Speed of light (m/s, for context)

  const drawWave = (ctx: CanvasRenderingContext2D, field: string, color: string, offsetY: number) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    const k = frequency * 0.05 // Wave number
    const omega = frequency * 2 * Math.PI * animationSpeed // Angular frequency
    for (let x = 0; x < canvasWidth; x += 2) {
      const y = amplitude * Math.sin(k * x - omega * time) + offsetY
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw axes
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, canvasHeight / 2)
    ctx.lineTo(canvasWidth, canvasHeight / 2)
    ctx.stroke()

    // Draw electric field (E, red)
    drawWave(ctx, "E", "#ff0000", canvasHeight / 4)

    // Draw magnetic field (B, blue)
    drawWave(ctx, "B", "#0000ff", 3 * canvasHeight / 4)

    // Draw info
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" 
        ? `ফ্রিকোয়েন্সি: ${frequency.toFixed(1)} (a.u.), তরঙ্গদৈর্ঘ্য: ${(1 / frequency).toFixed(2)} (a.u.)` 
        : `Frequency: ${frequency.toFixed(1)} (a.u.), Wavelength: ${(1 / frequency).toFixed(2)} (a.u.)`,
      canvasWidth / 2,
      30
    )

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, canvasHeight - 90, 350, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" 
        ? "তড়িৎচুম্বকীয় তরঙ্গ: E এবং B ক্ষেত্র" 
        : "Electromagnetic Wave: E and B Fields",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "তড়িৎচুম্বকত্ব সিমুলেশন" : "Electromagnetism Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
      ctx.textAlign = "left"
      ctx.fillText(lang === "bn" ? "E ক্ষেত্র" : "E Field", 20, canvasHeight / 4)
      ctx.fillText(lang === "bn" ? "B ক্ষেত্র" : "B Field", 20, 3 * canvasHeight / 4)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)
    if (isPlaying) {
      setTime(prev => prev + 0.016) // ~60 FPS
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
  }, [isPlaying, frequency, amplitude, showLabels, animationSpeed, time, lang])

  const reset = () => {
    setIsPlaying(false)
    setFrequency(1)
    setAmplitude(50)
    setAnimationSpeed(1)
    setTime(0)
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
              <Label className="text-sm">{lang === "bn" ? "ফ্রিকোয়েন্সি" : "Frequency"}</Label>
              <Slider
                min={0.5}
                max={5}
                step={0.1}
                value={[frequency]}
                onValueChange={(v) => setFrequency(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{frequency.toFixed(1)} (a.u.)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রশস্ততা" : "Amplitude"}</Label>
              <Slider
                min={10}
                max={100}
                step={1}
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{amplitude} px</p>
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
