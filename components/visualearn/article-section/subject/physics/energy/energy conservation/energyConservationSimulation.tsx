
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function EnergyConservationSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [initialAngle, setInitialAngle] = useState(45) // Initial angle in degrees
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [pendulum, setPendulum] = useState({ theta: 45, omega: 0, t: 0 })

  const canvasWidth = 800
  const canvasHeight = 500
  const length = 200 // Pendulum length in pixels
  const g = 9.8 // Gravity in m/s²
  const mass = 1 // Mass in kg
  const pivotX = canvasWidth / 2
  const pivotY = 100

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw pivot
    ctx.fillStyle = "#333"
    ctx.beginPath()
    ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2)
    ctx.fill()

    // Draw pendulum rod
    const thetaRad = (pendulum.theta * Math.PI) / 180
    const bobX = pivotX + length * Math.sin(thetaRad)
    const bobY = pivotY + length * Math.cos(thetaRad)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(pivotX, pivotY)
    ctx.lineTo(bobX, bobY)
    ctx.stroke()

    // Draw bob
    ctx.fillStyle = "#3498db"
    ctx.beginPath()
    ctx.arc(bobX, bobY, 10, 0, Math.PI * 2)
    ctx.fill()

    // Calculate energies
    const h = length * (1 - Math.cos(thetaRad)) * 0.01 // Height in meters (scaled)
    const pe = mass * g * h // Potential energy
    const v = length * pendulum.omega * 0.01 // Velocity (scaled)
    const ke = 0.5 * mass * v * v // Kinetic energy
    const totalEnergy = pe + ke

    // Draw energy bars
    const barWidth = 50
    ctx.fillStyle = "#e74c3c"
    ctx.fillRect(600, 400 - (ke / 0.05) * 200, barWidth, (ke / 0.05) * 200)
    ctx.fillStyle = "#2ecc71"
    ctx.fillRect(660, 400 - (pe / 0.05) * 200, barWidth, (pe / 0.05) * 200)
    ctx.fillStyle = "#f1c40f"
    ctx.fillRect(720, 400 - (totalEnergy / 0.05) * 200, barWidth, (totalEnergy / 0.05) * 200)

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
      lang === "bn" ? "শক্তি সংরক্ষণ: KE + PE = স্থির" : "Energy Conservation: KE + PE = constant",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "শক্তি সংরক্ষণ সিমুলেশন" : "Energy Conservation Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updatePendulum = () => {
    setPendulum(prev => {
      const dt = 0.01 * animationSpeed
      const alpha = -(g / (length * 0.01)) * Math.sin((prev.theta * Math.PI) / 180) // Angular acceleration
      const newOmega = prev.omega + alpha * dt
      const newTheta = prev.theta + newOmega * dt * (180 / Math.PI) // Convert to degrees
      const newT = prev.t + dt
      return {
        theta: newTheta,
        omega: newOmega,
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
      updatePendulum()
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    setPendulum({ theta: initialAngle, omega: 0, t: 0 })
  }, [initialAngle])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, showLabels, animationSpeed, pendulum, lang])

  const reset = () => {
    setIsPlaying(false)
    setInitialAngle(45)
    setAnimationSpeed(1)
    setPendulum({ theta: 45, omega: 0, t: 0 })
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
              <Label className="text-sm">{lang === "bn" ? "প্রাথমিক কোণ" : "Initial Angle"}</Label>
              <Slider
                min={0}
                max={90}
                step={1}
                value={[initialAngle]}
                onValueChange={(v) => setInitialAngle(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{initialAngle}°</p>
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
