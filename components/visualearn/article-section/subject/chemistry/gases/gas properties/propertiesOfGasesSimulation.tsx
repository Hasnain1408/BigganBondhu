"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function PropertiesOfGasesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [pressure, setPressure] = useState(1) // Relative pressure (1-5)
  const [temperature, setTemperature] = useState(300) // Kelvin (200-400)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const containerWidth = 400
  const containerHeight = 300
  const containerX = (canvasWidth - containerWidth) / 2
  const containerY = (canvasHeight - containerHeight) / 2
  const numParticles = 50

  type Particle = { x: number; y: number; vx: number; vy: number }
  const particles: Particle[] = Array(numParticles).fill(0).map(() => ({
    x: containerX + Math.random() * containerWidth,
    y: containerY + Math.random() * containerHeight,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
  }))

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw container
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(containerX, containerY, containerWidth, containerHeight)

    // Update and draw particles
    const speedFactor = Math.sqrt(temperature / 300) * pressure
    particles.forEach(p => {
      p.x += p.vx * speedFactor * animationSpeed
      p.y += p.vy * speedFactor * animationSpeed

      // Bounce off walls
      if (p.x < containerX || p.x > containerX + containerWidth) p.vx *= -1
      if (p.y < containerY || p.y > containerY + containerHeight) p.vy *= -1

      // Keep particles within bounds
      p.x = Math.max(containerX, Math.min(containerX + containerWidth, p.x))
      p.y = Math.max(containerY, Math.min(containerY + containerHeight, p.y))

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${temperature % 360}, 70%, 50%)`
      ctx.fill()
    })

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `চাপ: ${pressure.toFixed(1)}x` : `Pressure: ${pressure.toFixed(1)}x`,
      20,
      35
    )
    ctx.fillText(
      lang === "bn" ? `তাপমাত্রা: ${temperature} K` : `Temperature: ${temperature} K`,
      20,
      55
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.fillText(lang === "bn" ? "গ্যাস কণা" : "Gas Particles", containerX + containerWidth / 2, containerY - 20)
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
  }, [isPlaying, pressure, temperature, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setPressure(1)
    setTemperature(300)
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
              <Label className="text-sm">{lang === "bn" ? "চাপ" : "Pressure"}</Label>
              <Slider
                min={1}
                max={5}
                step={0.1}
                value={[pressure]}
                onValueChange={(v) => setPressure(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{pressure.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তাপমাত্রা" : "Temperature"}</Label>
              <Slider
                min={200}
                max={400}
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