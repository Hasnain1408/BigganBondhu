"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function ElectricForceSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [charge1, setCharge1] = useState(1e-6) // Charge 1 in Coulombs
  const [charge2, setCharge2] = useState(-1e-6) // Charge 2 in Coulombs
  const [distance, setDistance] = useState(0.1) // Distance in meters
  const [lang, setLang] = useState<"en" | "bn">("en")

  const k = 8.99e9 // Coulomb constant (N·m²/C²)
  const scale = 1e7 // Scale factor for visualization
  const centerX = 400 // Canvas center X
  const centerY = 225 // Canvas center Y

  // Calculate electric force
  const calculateForce = () => {
    const force = (k * Math.abs(charge1 * charge2)) / (distance * distance)
    const isAttractive = (charge1 * charge2) < 0
    return { force, isAttractive }
  }

  // Charge positions
  const charge1Pos = { x: centerX - distance * 1000 / 2, y: centerY }
  const charge2Pos = { x: centerX + distance * 1000 / 2, y: centerY }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw electric field lines (simplified)
    const { force, isAttractive } = calculateForce()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 1

    const numLines = 8
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * 2 * Math.PI
      const radius = 50
      ctx.beginPath()
      ctx.moveTo(charge1Pos.x, charge1Pos.y)
      const endX = isAttractive
        ? charge2Pos.x
        : charge1Pos.x + Math.cos(angle) * radius
      const endY = isAttractive
        ? charge2Pos.y
        : charge1Pos.y + Math.sin(angle) * radius
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }

    // Draw charges
    ctx.beginPath()
    ctx.arc(charge1Pos.x, charge1Pos.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = charge1 > 0 ? "#ef4444" : "#22c55e"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(charge2Pos.x, charge2Pos.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = charge2 > 0 ? "#ef4444" : "#22c55e"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw force arrow
    const forceScaled = Math.min(force * scale, 100) // Cap force for visualization
    const arrowLength = isAttractive ? -forceScaled : forceScaled
    ctx.beginPath()
    ctx.moveTo(charge2Pos.x, charge2Pos.y)
    ctx.lineTo(charge2Pos.x + arrowLength, charge2Pos.y)
    ctx.strokeStyle = "#ff00ff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw arrowhead
    const arrowSize = 10
    const angle1 = isAttractive ? Math.PI / 6 : -Math.PI / 6
    ctx.beginPath()
    ctx.moveTo(charge2Pos.x + arrowLength, charge2Pos.y)
    ctx.lineTo(charge2Pos.x + arrowLength - arrowSize * Math.cos(angle1), charge2Pos.y - arrowSize * Math.sin(angle1))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(charge2Pos.x + arrowLength, charge2Pos.y)
    ctx.lineTo(charge2Pos.x + arrowLength - arrowSize * Math.cos(angle1 + Math.PI / 3), charge2Pos.y - arrowSize * Math.sin(angle1 + Math.PI / 3))
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(
      lang === "bn" ? `বল: ${force.toFixed(2)} N` : `Force: ${force.toFixed(2)} N`,
      width - 150,
      30
    )
    ctx.fillText(
      lang === "bn" ? `চার্জ ১: ${(charge1 * 1e6).toFixed(2)} μC` : `Charge 1: ${(charge1 * 1e6).toFixed(2)} μC`,
      20,
      30
    )
    ctx.fillText(
      lang === "bn" ? `চার্জ ২: ${(charge2 * 1e6).toFixed(2)} μC` : `Charge 2: ${(charge2 * 1e6).toFixed(2)} μC`,
      20,
      50
    )
    ctx.fillText(
      lang === "bn" ? `দূরত্ব: ${distance.toFixed(2)} মি` : `Distance: ${distance.toFixed(2)} m`,
      20,
      70
    )

    if (isPlaying) {
      // Animate distance change for dynamic effect
      setDistance(prev => {
        const newDistance = prev + 0.001 * (isAttractive ? -1 : 1)
        return Math.max(0.05, Math.min(newDistance, 0.3))
      })
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, charge1, charge2, distance, lang])

  const reset = () => {
    setCharge1(1e-6)
    setCharge2(-1e-6)
    setDistance(0.1)
    setIsPlaying(false)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
        </div>

        <div className="flex justify-center gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "চার্জ ১ (μC)" : "Charge 1 (μC)"}</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[charge1 * 1e6]}
                onValueChange={(v) => setCharge1(v[0] * 1e-6)}
              />
              <p className="text-right mt-2">{(charge1 * 1e6).toFixed(2)} μC</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "চার্জ ২ (μC)" : "Charge 2 (μC)"}</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[charge2 * 1e6]}
                onValueChange={(v) => setCharge2(v[0] * 1e-6)}
              />
              <p className="text-right mt-2">{(charge2 * 1e6).toFixed(2)} μC</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "দূরত্ব (মি)" : "Distance (m)"}</Label>
              <Slider
                min={0.05}
                max={0.3}
                step={0.01}
                value={[distance]}
                onValueChange={(v) => setDistance(v[0])}
              />
              <p className="text-right mt-2">{distance.toFixed(2)} m</p>
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