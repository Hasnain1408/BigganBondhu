
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function PotentialEnergySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [initialDisplacement, setInitialDisplacement] = useState(50) // Initial displacement in pixels
  const [springConstant, setSpringConstant] = useState(0.05) // Spring constant in N/m
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [spring, setSpring] = useState({ x: 0, v: 0, t: 0 })

  const canvasWidth = 800
  const canvasHeight = 500
  const mass = 1 // Mass in kg
  const equilibriumY = canvasHeight / 2
  const anchorY = 100

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw anchor
    ctx.fillStyle = "#333"
    ctx.fillRect(canvasWidth / 2 - 50, anchorY - 10, 100, 20)

    // Draw spring
    const massY = equilibriumY + spring.x
    const coils = 20
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, anchorY)
    for (let i = 0; i <= coils; i++) {
      const y = anchorY + (i / coils) * (massY - anchorY)
      const xOffset = i % 2 === 0 ? 20 : -20
      ctx.lineTo(canvasWidth / 2 + xOffset, y)
    }
    ctx.stroke()

    // Draw mass
    ctx.fillStyle = "#3498db"
    ctx.fillRect(canvasWidth / 2 - 25, massY - 25, 50, 50)

    // Calculate potential energy
    const pe = 0.5 * springConstant * (spring.x * 0.01) ** 2 // PE = ½kx² (x scaled to meters)
    const v = spring.v * 0.01 // Velocity scaled
    const ke = 0.5 * mass * v ** 2 // Kinetic energy
    const totalEnergy = pe + ke

    // Draw energy bars
    const barWidth = 50
    ctx.fillStyle = "#e74c3c"
    ctx.fillRect(600, 400 - (ke / 0.01) * 200, barWidth, (ke / 0.01) * 200)
    ctx.fillStyle = "#2ecc71"
    ctx.fillRect(660, 400 - (pe / 0.01) * 200, barWidth, (pe / 0.01) * 200)
    ctx.fillStyle = "#f1c40f"
    ctx.fillRect(720, 400 - (totalEnergy / 0.01) * 200, barWidth, (totalEnergy / 0.01) * 200)

    // Draw energy labels
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "গতিশক্তি" : "KE", 625, 420)
    ctx.fillText(lang === "bn" ? "বিভব শক্তি" : "PE", 685, 420)
    ctx.fillText(lang === "bn" ? "মোট শক্তি" : "Total", 745, 420)

    // Draw energy values
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn"
        ? `KE: ${ke.toFixed(2)} J, PE: ${pe.toFixed(2)} J, মোট: ${totalEnergy.toFixed(2)} J`
        : `KE: ${ke.toFixed(2)} J, PE: ${pe.toFixed(2)} J, Total: ${totalEnergy.toFixed(2)} J`,
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
      lang === "bn" ? "বিভব শক্তি: PE = ½kx²" : "Potential Energy: PE = ½kx²",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "বিভব শক্তি সিমুলেশন" : "Potential Energy Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updateSpring = () => {
    setSpring(prev => {
      const dt = 0.01 * animationSpeed
      const a = -(springConstant / mass) * (prev.x * 0.01) // a = -kx/m (x scaled)
      const newV = prev.v + a * dt * 100 // Scaled for pixels
      const newX = prev.x + newV * dt
      const newT = prev.t + dt
      return {
        x: newX,
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
      updateSpring()
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    setSpring({ x: initialDisplacement, v: 0, t: 0 })
  }, [initialDisplacement, springConstant])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, showLabels, animationSpeed, spring, lang])

  const reset = () => {
    setIsPlaying(false)
    setInitialDisplacement(50)
    setSpringConstant(0.05)
    setAnimationSpeed(1)
    setSpring({ x: 50, v: 0, t: 0 })
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
              <Label className="text-sm">{lang === "bn" ? "প্রাথমিক স্থানচ্যুতি" : "Initial Displacement"}</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[initialDisplacement]}
                onValueChange={(v) => setInitialDisplacement(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{initialDisplacement} cm</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "স্প্রিং ধ্রুবক" : "Spring Constant"}</Label>
              <Slider
                min={0.01}
                max={0.1}
                step={0.01}
                value={[springConstant]}
                onValueChange={(v) => setSpringConstant(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{springConstant.toFixed(2)} N/m</p>
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
