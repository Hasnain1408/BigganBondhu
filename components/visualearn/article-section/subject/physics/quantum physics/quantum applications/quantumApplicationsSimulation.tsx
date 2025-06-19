
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Waves } from "lucide-react"

export default function QuantumApplicationsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [alpha, setAlpha] = useState(0.5)
  const [showBloch, setShowBloch] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const sphereCenterX = canvasWidth / 2
  const sphereCenterY = canvasHeight / 2
  const sphereRadius = 150

  // Simulation state
  const phase = useRef(0)

  const drawBlochSphere = (ctx: CanvasRenderingContext2D) => {
    // Draw sphere outline
    ctx.beginPath()
    ctx.arc(sphereCenterX, sphereCenterY, sphereRadius, 0, Math.PI * 2)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(sphereCenterX - sphereRadius, sphereCenterY)
    ctx.lineTo(sphereCenterX + sphereRadius, sphereCenterY)
    ctx.moveTo(sphereCenterX, sphereCenterY - sphereRadius)
    ctx.lineTo(sphereCenterX, sphereCenterY + sphereRadius)
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 1
    ctx.stroke()

    // Label axes
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "|0⟩" : "|0⟩", sphereCenterX, sphereCenterY - sphereRadius - 10)
    ctx.fillText(lang === "bn" ? "|1⟩" : "|1⟩", sphereCenterX, sphereCenterY + sphereRadius + 20)
  }

  const drawQubitState = (ctx: CanvasRenderingContext2D) => {
    const theta = Math.acos(1 - 2 * alpha)
    const phi = phase.current

    // Calculate Bloch vector
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(theta)

    // Project to 2D
    const x2D = sphereCenterX + x * sphereRadius
    const y2D = sphereCenterY - z * sphereRadius // z-axis up in canvas

    // Draw state vector
    ctx.beginPath()
    ctx.moveTo(sphereCenterX, sphereCenterY)
    ctx.lineTo(x2D, y2D)
    ctx.strokeStyle = "#ff4444"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw state point
    ctx.beginPath()
    ctx.arc(x2D, y2D, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#ff4444"
    ctx.fill()

    // Draw probability bars
    if (showBloch) {
      const prob0 = 1 - alpha
      const prob1 = alpha
      const barWidth = 50
      const barHeightMax = 100

      // |0⟩ probability
      ctx.fillStyle = "#4444ff"
      ctx.fillRect(canvasWidth - 150, canvasHeight - prob0 * barHeightMax - 50, barWidth, prob0 * barHeightMax)
      ctx.fillStyle = "#000"
      ctx.fillText(lang === "bn" ? "|0⟩ সম্ভাবনা" : "|0⟩ Probability", canvasWidth - 125, canvasHeight - 60)

      // |1⟩ probability
      ctx.fillStyle = "#ff4444"
      ctx.fillRect(canvasWidth - 80, canvasHeight - prob1 * barHeightMax - 50, barWidth, prob1 * barHeightMax)
      ctx.fillStyle = "#000"
      ctx.fillText(lang === "bn" ? "|1⟩ সম্ভাবনা" : "|1⟩ Probability", canvasWidth - 55, canvasHeight - 60)
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
    drawBlochSphere(ctx)
    drawQubitState(ctx)

    // Update phase
    if (isPlaying) {
      phase.current += 0.05
      setAnimationTime(prev => prev + 0.016)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `সুপারপজিশন: ${alpha.toFixed(2)}|1⟩`,
      `সময়: ${animationTime.toFixed(2)} s`,
      ``,
      `ধারণা: কিউবিট`
    ] : [
      `Superposition: ${alpha.toFixed(2)}|1⟩`,
      `Time: ${animationTime.toFixed(2)} s`,
      ``,
      `Concept: Qubit`
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
    phase.current = 0
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [alpha, showBloch, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setAlpha(0.5)
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
            onClick={() => setShowBloch(!showBloch)} 
            variant={showBloch ? "default" : "outline"}
          >
            <Waves className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "ব্লচ স্ফিয়ার" : "Bloch Sphere"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "সুপারপজিশন (α)" : "Superposition (α)"}</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[alpha]}
                onValueChange={(v) => setAlpha(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{alpha.toFixed(2)}</p>
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
