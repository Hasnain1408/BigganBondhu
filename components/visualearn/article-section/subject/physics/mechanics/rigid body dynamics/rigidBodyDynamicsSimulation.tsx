
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, RotateCw } from "lucide-react"

export default function RigidBodyDynamicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [momentOfInertia, setMomentOfInertia] = useState(1)
  const [torque, setTorque] = useState(5)
  const [angularVelocity, setAngularVelocity] = useState(0)
  const [showTrace, setShowTrace] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const barLength = 200
  const scale = 1

  // Simulation state
  const angle = useRef(0)
  const trace = useRef<Array<{ x: number; y: number }>>([])

  const drawBar = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(angle.current)
    ctx.fillStyle = "#ff4444"
    ctx.fillRect(-barLength / 2, -10, barLength, 20)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.strokeRect(-barLength / 2, -10, barLength, 20)
    ctx.fillStyle = "#4444ff"
    ctx.beginPath()
    ctx.arc(barLength / 2, 0, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const drawTrace = (ctx: CanvasRenderingContext2D) => {
    if (!showTrace) return
    ctx.strokeStyle = "rgba(0, 170, 255, 0.5)"
    ctx.lineWidth = 1
    ctx.beginPath()
    trace.current.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y)
      else ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()
  }

  const updatePhysics = () => {
    const dt = 0.016 // 60 FPS
    const alpha = torque / momentOfInertia
    setAngularVelocity(prev => prev + alpha * dt)
    angle.current += angularVelocity * dt

    // Update trace
    const traceX = centerX + (barLength / 2) * Math.cos(angle.current) * scale
    const traceY = centerY + (barLength / 2) * Math.sin(angle.current) * scale
    trace.current.push({ x: traceX, y: traceY })
    if (trace.current.length > 200) trace.current.shift()
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
    drawTrace(ctx)
    drawBar(ctx)

    // Update physics
    if (isPlaying) {
      updatePhysics()
      setAnimationTime(prev => prev + 0.016)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 140)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const kineticEnergy = 0.5 * momentOfInertia * angularVelocity * angularVelocity
    const info = lang === "bn" ? [
      `জড়তার মুহূর্ত: ${momentOfInertia.toFixed(1)} kg·m²`,
      `টর্ক: ${torque.toFixed(1)} N·m`,
      `কৌণিক বেগ: ${angularVelocity.toFixed(2)} rad/s`,
      `গতিশক্তি: ${kineticEnergy.toFixed(2)} J`,
      ``,
      `সূত্র: τ = I α`
    ] : [
      `Moment of Inertia: ${momentOfInertia.toFixed(1)} kg·m²`,
      `Torque: ${torque.toFixed(1)} N·m`,
      `Angular Velocity: ${angularVelocity.toFixed(2)} rad/s`,
      `Kinetic Energy: ${kineticEnergy.toFixed(2)} J`,
      ``,
      `Formula: τ = I α`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("সূত্র") || text.includes("Formula")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("τ =")) {
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
    trace.current = []
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [momentOfInertia, torque, angularVelocity, showTrace, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMomentOfInertia(1)
    setTorque(5)
    setAngularVelocity(0)
    angle.current = 0
    trace.current = []
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
            onClick={() => setShowTrace(!showTrace)} 
            variant={showTrace ? "default" : "outline"}
          >
            <RotateCw className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "ট্রেস দেখান" : "Trace"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "জড়তার মুহূর্ত (kg·m²)" : "Moment of Inertia (kg·m²)"}</Label>
              <Slider
                min={0.5}
                max={5}
                step={0.1}
                value={[momentOfInertia]}
                onValueChange={(v) => setMomentOfInertia(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{momentOfInertia.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "টর্ক (N·m)" : "Torque (N·m)"}</Label>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[torque]}
                onValueChange={(v) => setTorque(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{torque.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কৌণিক বেগ (rad/s)" : "Angular Velocity (rad/s)"}</Label>
              <Slider
                min={0}
                max={20}
                step={0.1}
                value={[angularVelocity]}
                onValueChange={(v) => setAngularVelocity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{angularVelocity.toFixed(2)}</p>
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
