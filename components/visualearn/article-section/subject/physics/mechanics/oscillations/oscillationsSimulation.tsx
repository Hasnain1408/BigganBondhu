
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Move, Activity } from "lucide-react"

export default function OscillationsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mass, setMass] = useState(1)
  const [springConstant, setSpringConstant] = useState(100)
  const [amplitude, setAmplitude] = useState(50)
  const [damping, setDamping] = useState(0.1)
  const [showEnergy, setShowEnergy] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const anchorX = 200
  const anchorY = canvasHeight / 2
  const scale = 2

  // Simulation state
  const position = useRef(0)
  const velocity = useRef(0)
  const equilibriumY = anchorY

  const drawSpring = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const coils = 10
    const springWidth = 20
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(anchorX - 100, anchorY)
    for (let i = 0; i <= coils; i++) {
      const t = i / coils
      const px = anchorX - 100 + t * (x - anchorX + 100)
      const py = anchorY + (i % 2 === 0 ? springWidth : -springWidth)
      ctx.lineTo(px, py)
    }
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const drawMass = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "#ff4444"
    ctx.beginPath()
    ctx.rect(x - 20, y - 20, 40, 40)
    ctx.fill()
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  const drawEnergyBars = (ctx: CanvasRenderingContext2D) => {
    if (!showEnergy) return
    const kinetic = 0.5 * mass * velocity.current ** 2
    const potential = 0.5 * springConstant * position.current ** 2
    const total = kinetic + potential

    const barWidth = 30
    const maxHeight = 100
    const barX = canvasWidth - 150
    ctx.fillStyle = "#00aa00"
    ctx.fillRect(barX, canvasHeight - (kinetic / total) * maxHeight, barWidth, (kinetic / total) * maxHeight)
    ctx.fillStyle = "#4444ff"
    ctx.fillRect(barX + barWidth + 10, canvasHeight - (potential / total) * maxHeight, barWidth, (potential / total) * maxHeight)

    ctx.fillStyle = "#333"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "গতিশক্তি" : "Kinetic", barX + barWidth / 2, canvasHeight - maxHeight - 10)
    ctx.fillText(lang === "bn" ? "সম্ভাব্য" : "Potential", barX + barWidth + 10 + barWidth / 2, canvasHeight - maxHeight - 10)
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Update physics
    if (isPlaying) {
      const dt = 0.016 // 60 FPS
      const accel = (-springConstant * position.current - damping * velocity.current) / mass
      velocity.current += accel * dt
      position.current += velocity.current * dt
      setAnimationTime(prev => prev + dt)
    }

    // Draw elements
    ctx.fillStyle = "#e0e0e0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    drawSpring(ctx, anchorX + position.current * scale, equilibriumY)
    drawMass(ctx, anchorX + position.current * scale, equilibriumY)
    drawEnergyBars(ctx)

    // Equilibrium line
    ctx.strokeStyle = "#999"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(anchorX, equilibriumY)
    ctx.lineTo(anchorX + 200, equilibriumY)
    ctx.stroke()
    ctx.setLineDash([])

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 160)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const period = 2 * Math.PI * Math.sqrt(mass / springConstant)
    const info = lang === "bn" ? [
      `ভর: ${mass.toFixed(1)} kg`,
      `স্প্রিং ধ্রুবক: ${springConstant.toFixed(0)} N/m`,
      `বিস্তার: ${amplitude.toFixed(0)} cm`,
      `স্যাঁতসেঁতে: ${damping.toFixed(2)} Ns/m`,
      `দোলনকাল: ${period.toFixed(2)} s`,
      ``,
      `সূত্র: T = 2π √(m/k)`
    ] : [
      `Mass: ${mass.toFixed(1)} kg`,
      `Spring Constant: ${springConstant.toFixed(0)} N/m`,
      `Amplitude: ${amplitude.toFixed(0)} cm`,
      `Damping: ${damping.toFixed(2)} Ns/m`,
      `Period: ${period.toFixed(2)} s`,
      ``,
      `Formula: T = 2π √(m/k)`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("সূত্র") || text.includes("Formula")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("T =")) {
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
    position.current = amplitude / 100 // Convert cm to m
    velocity.current = 0
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mass, springConstant, amplitude, damping, showEnergy, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMass(1)
    setSpringConstant(100)
    setAmplitude(50)
    setDamping(0.1)
    position.current = amplitude / 100
    velocity.current = 0
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
            onClick={() => setShowEnergy(!showEnergy)} 
            variant={showEnergy ? "default" : "outline"}
          >
            <Activity className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "শক্তি দেখান" : "Energy"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভর (kg)" : "Mass (kg)"}</Label>
              <Slider
                min={0.5}
                max={5}
                step={0.1}
                value={[mass]}
                onValueChange={(v) => setMass(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{mass.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "স্প্রিং ধ্রুবক (N/m)" : "Spring Constant (N/m)"}</Label>
              <Slider
                min={50}
                max= {200}
                step={10}
                value={[springConstant]}
                onValueChange={(v) => setSpringConstant(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{springConstant.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "বিস্তার (cm)" : "Amplitude (cm)"}</Label>
              <Slider
                min={20}
                max={100}
                step={5}
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{amplitude.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "স্যাঁতসেঁতে (Ns/m)" : "Damping (Ns/m)"}</Label>
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={[damping]}
                onValueChange={(v) => setDamping(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{damping.toFixed(2)}</p>
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
