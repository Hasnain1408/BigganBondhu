
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Waves } from "lucide-react"

export default function SchrodingerEquationSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [quantumNumber, setQuantumNumber] = useState(1)
  const [wellWidth, setWellWidth] = useState(100)
  const [showProbability, setShowProbability] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const wellXStart = 300
  const wellXEnd = wellXStart + wellWidth
  const baseY = canvasHeight - 100
  const hbar = 1 // Simplified units
  const mass = 1
  const scale = 100

  // Simulation state
  const phase = useRef(0)

  const drawWell = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(wellXStart, baseY)
    ctx.lineTo(wellXStart, baseY - 200)
    ctx.moveTo(wellXEnd, baseY)
    ctx.lineTo(wellXEnd, baseY - 200)
    ctx.lineTo(wellXEnd, baseY)
    ctx.lineTo(wellXStart, baseY)
    ctx.stroke()
  }

  const drawWaveFunction = (ctx: CanvasRenderingContext2D) => {
    const n = quantumNumber
    const L = wellWidth / scale
    const energy = (n ** 2 * Math.PI ** 2 * hbar ** 2) / (2 * mass * L ** 2)
    const A = Math.sqrt(2 / L)
    const omega = energy / hbar

    // Draw real part of wave function
    ctx.beginPath()
    ctx.strokeStyle = "#ff4444"
    ctx.lineWidth = 2
    for (let x = 0; x <= wellWidth; x += 1) {
      const xReal = x / scale
      const psi = A * Math.sin(n * Math.PI * xReal / L) * Math.cos(omega * phase.current)
      const y = baseY - psi * 50
      if (x === 0) ctx.moveTo(wellXStart + x, y)
      else ctx.lineTo(wellXStart + x, y)
    }
    ctx.stroke()

    // Draw probability density
    if (showProbability) {
      ctx.beginPath()
      ctx.strokeStyle = "#4444ff"
      ctx.lineWidth = 1
      for (let x = 0; x <= wellWidth; x += 1) {
        const xReal = x / scale
        const psi = A * Math.sin(n * Math.PI * xReal / L)
        const prob = psi ** 2
        const y = baseY - prob * 100
        if (x === 0) ctx.moveTo(wellXStart + x, y)
        else ctx.lineTo(wellXStart + x, y)
      }
      ctx.stroke()
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#e0e0e0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw elements
    drawWell(ctx)
    drawWaveFunction(ctx)

    // Update phase
    if (isPlaying) {
      phase.current += 0.05
      setAnimationTime(prev => prev + 0.016)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 120)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const L = wellWidth / scale
    const energy = (quantumNumber ** 2 * Math.PI ** 2 * hbar ** 2) / (2 * mass * L ** 2)
    const info = lang === "bn" ? [
      `কোয়ান্টাম সংখ্যা: ${quantumNumber}`,
      `কূপের প্রস্থ: ${wellWidth.toFixed(0)}`,
      `শক্তি: ${energy.toFixed(2)}`,
      ``,
      `সমীকরণ: Ĥψ = Eψ`
    ] : [
      `Quantum Number: ${quantumNumber}`,
      `Well Width: ${wellWidth.toFixed(0)}`,
      `Energy: ${energy.toFixed(2)}`,
      ``,
      `Equation: Ĥψ = Eψ`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("সমীকরণ") || text.includes("Equation")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("Ĥψ")) {
        ctx.fillStyle = "#ffaa00"
        ctx.font = "12px monospace"
      } else {
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
      }
      ctx.fillText(text, 20, 35 + index * 16)
    })

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    phase.current = 0
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [quantumNumber, wellWidth, showProbability, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setQuantumNumber(1)
    setWellWidth(100)
    phase.current = 0
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
            onClick={() => setShowProbability(!showProbability)} 
            variant={showProbability ? "default" : "outline"}
          >
            <Waves className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "সম্ভাবনা দেখান" : "Probability"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কোয়ান্টাম সংখ্যা" : "Quantum Number"}</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[quantumNumber]}
                onValueChange={(v) => setQuantumNumber(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{quantumNumber}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কূপের প্রস্থ" : "Well Width"}</Label>
              <Slider
                min={50}
                max={200}
                step={10}
                value={[wellWidth]}
                onValueChange={(v) => setWellWidth(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{wellWidth.toFixed(0)}</p>
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
