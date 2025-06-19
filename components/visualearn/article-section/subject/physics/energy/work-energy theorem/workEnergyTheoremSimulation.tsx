
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function WorkEnergyTheoremSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [force, setForce] = useState(10) // Force in newtons
  const [angle, setAngle] = useState(0) // Angle in degrees
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [block, setBlock] = useState({ x: 100, v: 0, t: 0 })

  const canvasWidth = 800
  const canvasHeight = 500
  const mass = 5 // Mass in kg
  const g = 9.8 // Gravity in m/s²
  const mu = 0.2 // Friction coefficient

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw ground
    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, canvasHeight - 100, canvasWidth, 100)

    // Draw block
    ctx.fillStyle = "#3498db"
    ctx.fillRect(block.x, canvasHeight - 150, 50, 50)

    // Draw force arrow
    const angleRad = (angle * Math.PI) / 180
    const forceX = block.x + 25
    const forceY = canvasHeight - 125
    const arrowLength = force * 5
    ctx.strokeStyle = "#e74c3c"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(forceX, forceY)
    ctx.lineTo(
      forceX + arrowLength * Math.cos(angleRad),
      forceY - arrowLength * Math.sin(angleRad)
    )
    ctx.stroke()
    // Arrowhead
    ctx.fillStyle = "#e74c3c"
    ctx.beginPath()
    ctx.moveTo(
      forceX + arrowLength * Math.cos(angleRad),
      forceY - arrowLength * Math.sin(angleRad)
    )
    ctx.lineTo(
      forceX + (arrowLength - 10) * Math.cos(angleRad + 0.3),
      forceY - (arrowLength - 10) * Math.sin(angleRad + 0.3)
    )
    ctx.lineTo(
      forceX + (arrowLength - 10) * Math.cos(angleRad - 0.3),
      forceY - (arrowLength - 10) * Math.sin(angleRad - 0.3)
    )
    ctx.closePath()
    ctx.fill()

    // Calculate work and kinetic energy
    const Fnet = force * Math.cos(angleRad) - mu * mass * g // Net force
    const a = Fnet / mass // Acceleration
    const work = force * Math.cos(angleRad) * (block.x - 100) * 0.01 // Work (scaled)
    const ke = 0.5 * mass * block.v * block.v // Kinetic energy
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn"
        ? `কার্য: ${work.toFixed(2)} J, গতিশক্তি: ${ke.toFixed(2)} J`
        : `Work: ${work.toFixed(2)} J, Kinetic Energy: ${ke.toFixed(2)} J`,
      canvasWidth / 2,
      50
    )

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, canvasHeight - 90, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? "কার্য-শক্তি: W = ΔKE" : "Work-Energy: W = ΔKE",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "কার্য-শক্তি উপপাদ্য সিমুলেশন" : "Work-Energy Theorem Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updateBlock = () => {
    setBlock(prev => {
      const angleRad = (angle * Math.PI) / 180
      const Fnet = force * Math.cos(angleRad) - mu * mass * g
      const a = Fnet / mass
      const dt = 0.01 * animationSpeed
      const newV = prev.v + a * dt
      const newX = prev.x + newV * dt * 100 // Scaled for visibility
      const newT = prev.t + dt
      return {
        x: Math.min(newX, canvasWidth - 50),
        v: newV,
        t: newT
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)
    if (isPlaying) {
      updateBlock()
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
  }, [isPlaying, force, angle, showLabels, animationSpeed, block, lang])

  const reset = () => {
    setIsPlaying(false)
    setForce(10)
    setAngle(0)
    setAnimationSpeed(1)
    setBlock({ x: 100, v: 0, t: 0 })
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
              <Label className="text-sm">{lang === "bn" ? "বল" : "Force"}</Label>
              <Slider
                min={0}
                max={20}
                step={0.1}
                value={[force]}
                onValueChange={(v) => setForce(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{force.toFixed(1)} N</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কোণ" : "Angle"}</Label>
              <Slider
                min={0}
                max={90}
                step={1}
                value={[angle]}
                onValueChange={(v) => setAngle(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{angle}°</p>
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
