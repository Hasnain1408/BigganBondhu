
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function HessLawSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [pathChoice, setPathChoice] = useState(0) // 0 (direct), 1 (stepwise)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Simulate C + O₂ → CO₂ (ΔH = -393.5 kJ/mol)
    const progress = Math.min(t / 10, 1)

    // Draw energy diagram
    ctx.beginPath()
    if (pathChoice === 0) {
      // Direct path
      ctx.moveTo(canvasWidth / 4, canvasHeight - 50) // Reactants
      ctx.lineTo(canvasWidth / 2, canvasHeight - 100) // Activation energy
      ctx.lineTo(canvasWidth * 3 / 4, canvasHeight - 150) // Products
    } else {
      // Stepwise path: C → CO → CO₂
      ctx.moveTo(canvasWidth / 4, canvasHeight - 50) // Reactants
      ctx.lineTo(canvasWidth / 3, canvasHeight - 80) // Step 1: C → CO
      ctx.lineTo(canvasWidth / 2, canvasHeight - 60) // Transition
      ctx.lineTo(canvasWidth * 2 / 3, canvasHeight - 120) // Step 2: CO → CO₂
      ctx.lineTo(canvasWidth * 3 / 4, canvasHeight - 150) // Products
    }
    ctx.strokeStyle = "#000"
    ctx.stroke()

    // Draw reactants and products
    ctx.fillStyle = "#ff0000" // C + O₂
    ctx.beginPath()
    ctx.arc(canvasWidth / 4, canvasHeight - 50, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#00ff00" // CO₂
    ctx.beginPath()
    ctx.arc(canvasWidth * 3 / 4, canvasHeight - 150, 10, 0, Math.PI * 2)
    ctx.fill()

    if (pathChoice === 1 && progress > 0.5) {
      // Draw intermediate CO
      ctx.fillStyle = "#0000ff"
      ctx.beginPath()
      ctx.arc(canvasWidth / 3, canvasHeight - 80, 10, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw ΔH arrow
    ctx.beginPath()
    ctx.moveTo(canvasWidth * 3 / 4 + 10, canvasHeight - 50)
    ctx.lineTo(canvasWidth * 3 / 4 + 10, canvasHeight - 150)
    ctx.strokeStyle = "#ff0000"
    ctx.stroke()
    ctx.fillStyle = "#ff0000"
    ctx.fillText(lang === "bn" ? "ΔH" : "ΔH", canvasWidth * 3 / 4 + 20, canvasHeight - 100)

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `পথ: ${pathChoice === 0 ? "সরাসরি" : "ধাপে ধাপে"}` : `Path: ${pathChoice === 0 ? "Direct" : "Stepwise"}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "হেসের সূত্র সিমুলেশন" : "Hess's Law Simulation",
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
  }, [isPlaying, pathChoice, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setPathChoice(0)
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
              <Label className="text-sm">{lang === "bn" ? "বিক্রিয়ার পথ" : "Reaction Path"}</Label>
              <Slider
                min={0}
                max={1}
                step={1}
                value={[pathChoice]}
                onValueChange={(v) => setPathChoice(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">
                {lang === "bn" ? (pathChoice === 0 ? "সরাসরি" : "ধাপে ধাপে") : (pathChoice === 0 ? "Direct" : "Stepwise")}
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
