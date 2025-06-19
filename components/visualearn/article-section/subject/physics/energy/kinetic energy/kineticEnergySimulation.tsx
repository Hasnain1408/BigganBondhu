
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function KineticEnergySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [initialVelocity, setInitialVelocity] = useState(5) // Initial velocity in m/s
  const [mass, setMass] = useState(2) // Mass in kg
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [car, setCar] = useState({ x: 50, v: 5, t: 0 })

  const canvasWidth = 800
  const canvasHeight = 500
  const groundY = canvasHeight - 100

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw ground
    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, groundY, canvasWidth, 100)

    // Draw car
    ctx.fillStyle = "#3498db"
    ctx.fillRect(car.x, groundY - 50, 80, 50)
    // Wheels
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.arc(car.x + 20, groundY, 10, 0, Math.PI * 2)
    ctx.arc(car.x + 60, groundY, 10, 0, Math.PI * 2)
    ctx.fill()

    // Calculate kinetic energy
    const ke = 0.5 * mass * (car.v * 0.1) ** 2 // KE = ½mv² (v scaled to m/s)

    // Draw energy bar
    const barWidth = 50
    ctx.fillStyle = "#e74c3c"
    ctx.fillRect(600, 400 - (ke / 0.5) * 200, barWidth, (ke / 0.5) * 200)

    // Draw energy label
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "গতিশক্তি" : "KE", 625, 420)

    // Draw kinetic energy value
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn"
        ? `KE: ${ke.toFixed(2)} J`
        : `KE: ${ke.toFixed(2)} J`,
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
      lang === "bn" ? "গতিশক্তি: KE = ½mv²" : "Kinetic Energy: KE = ½mv²",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "গতিশক্তি সিমুলেশন" : "Kinetic Energy Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updateCar = () => {
    setCar(prev => {
      const dt = 0.01 * animationSpeed
      const newX = prev.x + prev.v * dt * 50 // Scaled for visibility
      const newV = prev.v // Constant velocity (no acceleration)
      const newT = prev.t + dt
      return {
        x: newX < canvasWidth - 80 ? newX : 50,
        v: newX < canvasWidth - 80 ? newV : initialVelocity,
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
      updateCar()
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    setCar({ x: 50, v: initialVelocity, t: 0 })
  }, [initialVelocity])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, mass, showLabels, animationSpeed, car, lang])

  const reset = () => {
    setIsPlaying(false)
    setInitialVelocity(5)
    setMass(2)
    setAnimationSpeed(1)
    setCar({ x: 50, v: 5, t: 0 })
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
              <Label className="text-sm">{lang === "bn" ? "প্রাথমিক বেগ" : "Initial Velocity"}</Label>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[initialVelocity]}
                onValueChange={(v) => setInitialVelocity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{initialVelocity.toFixed(1)} m/s</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভর" : "Mass"}</Label>
              <Slider
                min={1}
                max={5}
                step={0.1}
                value={[mass]}
                onValueChange={(v) => setMass(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{mass.toFixed(1)} kg</p>
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
