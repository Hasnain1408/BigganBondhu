
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function MagneticFieldSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [current, setCurrent] = useState(5) // Current in amperes
  const [chargeVelocity, setChargeVelocity] = useState(50) // Velocity in arbitrary units
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [particle, setParticle] = useState({ x: 600, y: 250, vx: -chargeVelocity, vy: 0 })

  const canvasWidth = 800
  const canvasHeight = 500
  const mu0 = 4 * Math.PI * 1e-7 // Permeability of free space
  const q = 1e-6 // Charge in coulombs

  const drawFieldLines = (ctx: CanvasRenderingContext2D) => {
    const wireX = canvasWidth / 4
    const wireY = canvasHeight / 2
    const Bscale = 100000 // Scaling for visualization

    ctx.strokeStyle = "#00f"
    ctx.lineWidth = 1
    for (let r = 20; r <= 100; r += 20) {
      ctx.beginPath()
      ctx.arc(wireX, wireY, r, 0, 2 * Math.PI)
      ctx.stroke()

      // Arrows to indicate field direction (out of page)
      for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 4) {
        const arrowX = wireX + r * Math.cos(theta)
        const arrowY = wireY + r * Math.sin(theta)
        ctx.fillStyle = "#00f"
        ctx.fillRect(arrowX - 2, arrowY - 2, 4, 4) // Dot for out-of-page
      }
    }
  }

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw wire
    const wireX = canvasWidth / 4
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(wireX, 0)
    ctx.lineTo(wireX, canvasHeight)
    ctx.stroke()

    // Draw field lines
    drawFieldLines(ctx)

    // Draw particle
    ctx.fillStyle = "#ff0000"
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2)
    ctx.fill()

    // Calculate magnetic field and force
    const r = Math.abs(particle.x - wireX) / 100 // Distance in meters (scaled)
    const B = (mu0 * current) / (2 * Math.PI * r) // Magnetic field
    const F = q * chargeVelocity * B // Lorentz force (simplified, sinθ = 1)
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" 
        ? `ক্ষেত্র: ${(B * 1000).toFixed(2)} mT, শক্তি: ${(F * 1e6).toFixed(2)} µN` 
        : `Field: ${(B * 1000).toFixed(2)} mT, Force: ${(F * 1e6).toFixed(2)} µN`,
      canvasWidth / 2,
      30
    )

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, canvasHeight - 90, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? "চৌম্বক শক্তি: F = qvB sinθ" : "Magnetic Force: F = qvB sinθ",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "চৌম্বক ক্ষেত্র সিমুলেশন" : "Magnetic Field Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updateParticle = () => {
    setParticle(prev => {
      const r = Math.abs(prev.x - canvasWidth / 4) / 100
      const B = (mu0 * current) / (2 * Math.PI * r)
      const F = q * chargeVelocity * B
      const ay = F / 1e-6 // Acceleration (scaled mass)
      const newY = prev.y + prev.vy * 0.01 * animationSpeed
      const newVy = prev.vy + ay * 0.01 * animationSpeed
      const newX = prev.x + prev.vx * 0.01 * animationSpeed

      return {
        x: newX,
        y: Math.max(10, Math.min(canvasHeight - 10, newY)),
        vx: prev.vx,
        vy: newVy
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)
    if (isPlaying) {
      updateParticle()
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
  }, [isPlaying, current, chargeVelocity, showLabels, animationSpeed, particle, lang])

  const reset = () => {
    setIsPlaying(false)
    setCurrent(5)
    setChargeVelocity(50)
    setAnimationSpeed(1)
    setParticle({ x: 600, y: 250, vx: -50, vy: 0 })
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
              <Label className="text-sm">{lang === "bn" ? "বিদ্যুৎ প্রবাহ" : "Current"}</Label>
              <Slider
                min={1}
                max={10}
                step={0.1}
                value={[current]}
                onValueChange={(v) => setCurrent(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{current.toFixed(1)} A</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কণার বেগ" : "Charge Velocity"}</Label>
              <Slider
                min={10}
                max={100}
                step={1}
                value={[chargeVelocity]}
                onValueChange={(v) => setChargeVelocity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{chargeVelocity} (a.u.)</p>
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
