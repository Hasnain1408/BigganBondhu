
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Droplet, Wind } from "lucide-react"

export default function FluidMechanicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [fluidVelocity, setFluidVelocity] = useState(5)
  const [pipeRadius, setPipeRadius] = useState(50)
  const [viscosity, setViscosity] = useState(0.01)
  const [showStreamlines, setShowStreamlines] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const pipeY = canvasHeight / 2
  const pipeLength = canvasWidth - 100
  const maxRadius = 100

  // Particle system for fluid visualization
  const particles = useRef<Array<{ x: number; y: number; vx: number }>>([])
  const particleCount = 100

  // Initialize particles
  const initializeParticles = () => {
    particles.current = []
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * 100,
        y: pipeY - pipeRadius + Math.random() * 2 * pipeRadius,
        vx: fluidVelocity * (1 - Math.abs((pipeY - (pipeY - pipeRadius + Math.random() * 2 * pipeRadius)) / pipeRadius) ** 2)
      })
    }
  }

  const drawPipe = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#e0e0e0"
    ctx.fillRect(50, pipeY - pipeRadius, pipeLength, 2 * pipeRadius)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.strokeRect(50, pipeY - pipeRadius, pipeLength, 2 * pipeRadius)
  }

  const drawStreamlines = (ctx: CanvasRenderingContext2D) => {
    if (!showStreamlines) return
    ctx.strokeStyle = "#00aaff"
    ctx.lineWidth = 1
    for (let y = pipeY - pipeRadius + 10; y < pipeY + pipeRadius; y += 20) {
      ctx.beginPath()
      ctx.moveTo(50, y)
      ctx.lineTo(50 + pipeLength, y)
      ctx.stroke()
    }
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#0077cc"
    particles.current.forEach(particle => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const updateParticles = () => {
    particles.current.forEach(particle => {
      particle.x += particle.vx * (0.01 / viscosity)
      if (particle.x > 50 + pipeLength) {
        particle.x = 50
        particle.y = pipeY - pipeRadius + Math.random() * 2 * pipeRadius
        particle.vx = fluidVelocity * (1 - Math.abs((pipeY - particle.y) / pipeRadius) ** 2)
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw pipe and streamlines
    drawPipe(ctx)
    drawStreamlines(ctx)

    // Draw and update particles
    drawParticles(ctx)
    if (isPlaying) {
      updateParticles()
      setAnimationTime(prev => prev + 1)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 140)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const flowRate = (fluidVelocity * Math.PI * pipeRadius ** 2) / 10000
    const info = lang === "bn" ? [
      `প্রবাহ বেগ: ${fluidVelocity.toFixed(1)} m/s`,
      `পাইপ ব্যাসার্ধ: ${pipeRadius.toFixed(0)} mm`,
      `ভিসকোসিটি: ${viscosity.toFixed(3)} Pa·s`,
      `প্রবাহ হার: ${flowRate.toFixed(3)} m³/s`,
      ``,
      `সূত্র: Q = A × v`
    ] : [
      `Flow Velocity: ${fluidVelocity.toFixed(1)} m/s`,
      `Pipe Radius: ${pipeRadius.toFixed(0)} mm`,
      `Viscosity: ${viscosity.toFixed(3)} Pa·s`,
      `Flow Rate: ${flowRate.toFixed(3)} m³/s`,
      ``,
      `Formula: Q = A × v`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("সূত্র") || text.includes("Formula")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("Q =")) {
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
    initializeParticles()
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [fluidVelocity, pipeRadius, viscosity, showStreamlines, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setFluidVelocity(5)
    setPipeRadius(50)
    setViscosity(0.01)
    initializeParticles()
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
            onClick={() => setShowStreamlines(!showStreamlines)} 
            variant={showStreamlines ? "default" : "outline"}
          >
            <Wind className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "স্ট্রিমলাইন দেখান" : "Streamlines"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রবাহ বেগ" : "Flow Velocity (m/s)"}</Label>
              <Slider
                min={1}
                max={10}
                step={0.1}
                value={[fluidVelocity]}
                onValueChange={(v) => setFluidVelocity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{fluidVelocity.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "পাইপ ব্যাসার্ধ" : "Pipe Radius (mm)"}</Label>
              <Slider
                min={20}
                max={100}
                step={5}
                value={[pipeRadius]}
                onValueChange={(v) => setPipeRadius(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{pipeRadius.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভিসকোসিটি" : "Viscosity (Pa·s)"}</Label>
              <Slider
                min={0.001}
                max={0.1}
                step={0.001}
                value={[viscosity]}
                onValueChange={(v) => setViscosity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{viscosity.toFixed(3)}</p>
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
