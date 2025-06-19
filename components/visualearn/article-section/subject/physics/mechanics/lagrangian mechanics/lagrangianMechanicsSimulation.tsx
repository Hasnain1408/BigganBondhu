
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Move, Activity } from "lucide-react"

export default function LagrangianMechanicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mass1, setMass1] = useState(1)
  const [mass2, setMass2] = useState(1)
  const [length1, setLength1] = useState(100)
  const [length2, setLength2] = useState(100)
  const [showTrace, setShowTrace] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const anchorX = canvasWidth / 2
  const anchorY = 100
  const g = 9.81 // Gravity
  const scale = 1

  // Simulation state
  const theta1 = useRef(Math.PI / 2)
  const theta2 = useRef(Math.PI / 2)
  const omega1 = useRef(0)
  const omega2 = useRef(0)
  const trace = useRef<Array<{ x: number; y: number }>>([])

  const drawPendulum = (ctx: CanvasRenderingContext2D) => {
    const x1 = anchorX + length1 * Math.sin(theta1.current) * scale
    const y1 = anchorY + length1 * Math.cos(theta1.current) * scale
    const x2 = x1 + length2 * Math.sin(theta2.current) * scale
    const y2 = y1 + length2 * Math.cos(theta2.current) * scale

    // Draw trace
    if (showTrace) {
      ctx.strokeStyle = "rgba(0, 170, 255, 0.5)"
      ctx.lineWidth = 1
      ctx.beginPath()
      trace.current.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
    }

    // Draw rods
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(anchorX, anchorY)
    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    // Draw masses
    ctx.fillStyle = "#ff4444"
    ctx.beginPath()
    ctx.arc(x1, y1, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#4444ff"
    ctx.beginPath()
    ctx.arc(x2, y2, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  const updatePhysics = () => {
    const dt = 0.016 // 60 FPS
    const m1 = mass1
    const m2 = mass2
    const l1 = length1 / 100 // Convert to meters
    const l2 = length2 / 100
    const t1 = theta1.current
    const t2 = theta2.current
    const w1 = omega1.current
    const w2 = omega2.current

    // Euler-Lagrange derived equations for double pendulum
    const num1 = -g * (2 * m1 + m2) * Math.sin(t1)
    const num2 = -m2 * g * Math.sin(t1 - 2 * t2)
    const num3 = -2 * Math.sin(t1 - t2) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(t1 - t2))
    const den1 = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * t1 - 2 * t2))
    const alpha1 = (num1 + num2 + num3) / den1

    const num4 = 2 * Math.sin(t1 - t2)
    const num5 = w1 * w1 * l1 * (m1 + m2)
    const num6 = g * (m1 + m2) * Math.cos(t1)
    const num7 = w2 * w2 * l2 * m2 * Math.cos(t1 - t2)
    const den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * t1 - 2 * t2))
    const alpha2 = (num4 * (num5 + num6 + num7)) / den2

    omega1.current += alpha1 * dt
    omega2.current += alpha2 * dt
    theta1.current += omega1.current * dt
    theta2.current += omega2.current * dt

    // Update trace
    const x2 = anchorX + l1 * 100 * Math.sin(t1) * scale + l2 * 100 * Math.sin(t2) * scale
    const y2 = anchorY + l1 * 100 * Math.cos(t1) * scale + l2 * 100 * Math.cos(t2) * scale
    trace.current.push({ x: x2, y: y2 })
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

    // Draw pendulum
    drawPendulum(ctx)

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

    const info = lang === "bn" ? [
      `ভর ১: ${mass1.toFixed(1)} kg`,
      `ভর ২: ${mass2.toFixed(1)} kg`,
      `দৈর্ঘ্য ১: ${length1.toFixed(0)} cm`,
      `দৈর্ঘ্য ২: ${length2.toFixed(0)} cm`,
      ``,
      `ল্যাগ্রাঞ্জিয়ান: L = T - V`
    ] : [
      `Mass 1: ${mass1.toFixed(1)} kg`,
      `Mass 2: ${mass2.toFixed(1)} kg`,
      `Length 1: ${length1.toFixed(0)} cm`,
      `Length 2: ${length2.toFixed(0)} cm`,
      ``,
      `Lagrangian: L = T - V`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("ল্যাগ্রাঞ্জিয়ান") || text.includes("Lagrangian")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("L =")) {
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
  }, [mass1, mass2, length1, length2, showTrace, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMass1(1)
    setMass2(1)
    setLength1(100)
    setLength2(100)
    theta1.current = Math.PI / 2
    theta2.current = Math.PI / 2
    omega1.current = 0
    omega2.current = 0
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
            <Activity className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "ট্রেস দেখান" : "Trace"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভর ১ (kg)" : "Mass 1 (kg)"}</Label>
              <Slider
                min={0.5}
                max={5}
                step={0.1}
                value={[mass1]}
                onValueChange={(v) => setMass1(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{mass1.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভর ২ (kg)" : "Mass 2 (kg)"}</Label>
              <Slider
                min={0.5}
                max={5}
                step={0.1}
                value={[mass2]}
                onValueChange={(v) => setMass2(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{mass2.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "দৈর্ঘ্য ১ (cm)" : "Length 1 (cm)"}</Label>
              <Slider
                min={50}
                max={200}
                step={10}
                value={[length1]}
                onValueChange={(v) => setLength1(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{length1.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "দৈর্ঘ্য ২ (cm)" : "Length 2 (cm)"}</Label>
              <Slider
                min={50}
                max={200}
                step={10}
                value={[length2]}
                onValueChange={(v) => setLength2(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{length2.toFixed(0)}</p>
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
