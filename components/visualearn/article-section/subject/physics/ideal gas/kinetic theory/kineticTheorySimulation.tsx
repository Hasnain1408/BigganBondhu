
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function KineticTheorySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [temperature, setTemperature] = useState(300) // Temperature in Kelvin
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [particles, setParticles] = useState<{x: number, y: number, vx: number, vy: number}[]>([])

  const canvasWidth = 800
  const canvasHeight = 500
  const numParticles = 30
  const k = 1.38e-23 // Boltzmann constant
  const particleRadius = 5

  const initializeParticles = () => {
    const newParticles = []
    const speedScale = Math.sqrt(temperature / 300) * 2
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: Math.random() * (canvasWidth - 2 * particleRadius) + particleRadius,
        y: Math.random() * (canvasHeight - 2 * particleRadius) + particleRadius,
        vx: (Math.random() - 0.5) * speedScale,
        vy: (Math.random() - 0.5) * speedScale
      })
    }
    return newParticles
  }

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw container
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(10, 10, canvasWidth - 20, canvasHeight - 20)

    // Draw particles
    particles.forEach(p => {
      ctx.fillStyle = "#ff0000"
      ctx.beginPath()
      ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2)
      ctx.fill()
    })

    // Calculate average kinetic energy
    const avgSpeed = particles.reduce((sum, p) => sum + Math.sqrt(p.vx * p.vx + p.vy * p.vy), 0) / numParticles
    const ke = (3/2) * k * temperature
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" 
        ? `তাপমাত্রা: ${temperature} K, গড় KE: ${(ke * 1e23).toFixed(2)} × 10⁻²³ J` 
        : `Temperature: ${temperature} K, Avg KE: ${(ke * 1e23).toFixed(2)} × 10⁻²³ J`,
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
      lang === "bn" ? "গতিশক্তি তত্ত্ব: KE = (3/2)kT" : "Kinetic Theory: KE = (3/2)kT",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "গতিশক্তি তত্ত্ব সিমুলেশন" : "Kinetic Theory Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updateParticles = () => {
    const speedScale = Math.sqrt(temperature / 300) * 2
    setParticles(prev => prev.map(p => {
      let newX = p.x + p.vx * animationSpeed
      let newY = p.y + p.vy * animationSpeed
      let newVx = p.vx
      let newVy = p.vy

      // Wall collisions
      if (newX < particleRadius + 10) {
        newX = particleRadius + 10
        newVx = -newVx
      }
      if (newX > canvasWidth - particleRadius - 10) {
        newX = canvasWidth - particleRadius - 10
        newVx = -newVx
      }
      if (newY < particleRadius + 10) {
        newY = particleRadius + 10
        newVy = -newVy
      }
      if (newY > canvasHeight - particleRadius - 10) {
        newY = canvasHeight - particleRadius - 10
        newVy = -newVy
      }

      return { x: newX, y: newY, vx: newVx, vy: newVy }
    }))
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)
    if (isPlaying) {
      updateParticles()
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    setParticles(initializeParticles())
  }, [temperature])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, particles, showLabels, animationSpeed, lang])

  const reset = () => {
    setIsPlaying(false)
    setTemperature(300)
    setAnimationSpeed(1)
    setParticles(initializeParticles())
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
              <Label className="text-sm">{lang === "bn" ? "তাপমাত্রা" : "Temperature"}</Label>
              <Slider
                min={100}
                max={500}
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
