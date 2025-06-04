"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function ElectricFieldSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sourceCharge, setSourceCharge] = useState(1e-6) // Source charge in Coulombs
  const [testCharge, setTestCharge] = useState(1e-6) // Test charge in Coulombs
  const [distance, setDistance] = useState(0.1) // Distance in meters
  const [lang, setLang] = useState<"en" | "bn">("en")

  const k = 8.99e9 // Coulomb constant (N·m²/C²)
  const scale = 1e5 // Scale factor for visualization
  const centerX = 400 // Canvas center X
  const centerY = 225 // Canvas center Y

  // Calculate electric field and force
  const calculateField = () => {
    const field = (k * sourceCharge) / (distance * distance) // E = k * q/r²
    const force = field * testCharge // F = q * E
    const fieldDirection = sourceCharge > 0 ? 1 : -1 // Positive charge: field points outward
    return { field, force, fieldDirection }
  }

  // Positions
  const sourcePos = { x: centerX - distance * 1000 / 2, y: centerY }
  const testPos = { x: centerX + distance * 1000 / 2, y: centerY }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw electric field lines
    const { field, force, fieldDirection } = calculateField()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 1

    const numLines = 12
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * 2 * Math.PI
      const radius = 50
      ctx.beginPath()
      ctx.moveTo(sourcePos.x, sourcePos.y)
      const endX = sourcePos.x + Math.cos(angle) * radius * fieldDirection
      const endY = sourcePos.y + Math.sin(angle) * radius * fieldDirection
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }

    // Draw source charge
    ctx.beginPath()
    ctx.arc(sourcePos.x, sourcePos.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = sourceCharge > 0 ? "#ef4444" : "#22c55e"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw test charge
    ctx.beginPath()
    ctx.arc(testPos.x, testPos.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = testCharge > 0 ? "#ef4444" : "#22c55e"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw field vector at test charge
    const fieldScaled = Math.min(field * scale, 100) // Cap for visualization
    const arrowLength = fieldScaled * fieldDirection
    ctx.beginPath()
    ctx.moveTo(testPos.x, testPos.y)
    ctx.lineTo(testPos.x + arrowLength, testPos.y)
    ctx.strokeStyle = "#ff00ff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw arrowhead
    const arrowSize = 10
    const angle1 = fieldDirection > 0 ? Math.PI / 6 : -Math.PI / 6
    ctx.beginPath()
    ctx.moveTo(testPos.x + arrowLength, testPos.y)
    ctx.lineTo(testPos.x + arrowLength - arrowSize * Math.cos(angle1), testPos.y - arrowSize * Math.sin(angle1))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(testPos.x + arrowLength, testPos.y)
    ctx.lineTo(testPos.x + arrowLength - arrowSize * Math.cos(angle1 + Math.PI / 3), testPos.y - arrowSize * Math.sin(angle1 + Math.PI / 3))
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(
      lang === "bn" ? `বৈদ্যুতিক ক্ষেত্র: ${(field / 1000).toFixed(2)} kN/C` : `Electric Field: ${(field / 1000).toFixed(2)} kN/C`,
      width - 150,
      30
    )
    ctx.fillText(
      lang === "bn" ? `বল: ${force.toFixed(2)} N` : `Force: ${force.toFixed(2)} N`,
      width - 150,
      50
    )
    ctx.fillText(
      lang === "bn" ? `উৎস চার্জ: ${(sourceCharge * 1e6).toFixed(2)} μC` : `Source Charge: ${(sourceCharge * 1e6).toFixed(2)} μC`,
      20,
      30
    )
    ctx.fillText(
      lang === "bn" ? `পরীক্ষা চার্জ: ${(testCharge * 1e6).toFixed(2)} μC` : `Test Charge: ${(testCharge * 1e6).toFixed(2)} μC`,
      20,
      50
    )
    ctx.fillText(
      lang === "bn" ? `দূরত্ব: ${distance.toFixed(2)} মি` : `Distance: ${distance.toFixed(2)} m`,
      20,
      70
    )

    if (isPlaying) {
      // Animate test charge movement based on force
      setDistance(prev => {
        const acceleration = force / 1e-6 // Assume test charge mass = 1e-6 kg
        const velocity = acceleration * 0.016 // Assume 60 fps
        const newDistance = prev + velocity * 0.001 * (sourceCharge * testCharge > 0 ? 1 : -1)
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
  }, [isPlaying, sourceCharge, testCharge, distance, lang])

  const reset = () => {
    setSourceCharge(1e-6)
    setTestCharge(1e-6)
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
              <Label>{lang === "bn" ? "উৎস চার্জ (μC)" : "Source Charge (μC)"}</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[sourceCharge * 1e6]}
                onValueChange={(v) => setSourceCharge(v[0] * 1e-6)}
              />
              <p className="text-right mt-2">{(sourceCharge * 1e6).toFixed(2)} μC</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "পরীক্ষা চার্জ (μC)" : "Test Charge (μC)"}</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[testCharge * 1e6]}
                onValueChange={(v) => setTestCharge(v[0] * 1e-6)}
              />
              <p className="text-right mt-2">{(testCharge * 1e6).toFixed(2)} μC</p>
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