
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function OrbitalMotionSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [velocity, setVelocity] = useState(100) // Velocity in arbitrary units
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAngle] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const G = 6.674e-11 // Scaled gravitational constant
  const M = 5.972e24 // Planet mass (Earth-like)
  const r = 200 // Orbital radius in pixels
  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const theta = animationTime * 0.02 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw space background
    ctx.fillStyle = "#0a0a23"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw planet
    const cx = canvasWidth / 2
    const cy = canvasHeight / 2
    ctx.fillStyle = "#1e90ff"
    ctx.beginPath()
    ctx.arc(cx, cy, 30, 0, Math.PI * 2)
    ctx.fill()

    // Calculate orbit parameters
    const vCircular = Math.sqrt((G * M) / r) * 1e-10 // Scaled for visualization
    const eccentricity = Math.abs(velocity - vCircular) / vCircular
    const a = r / (1 - eccentricity * eccentricity) // Semi-major axis
    const b = a * Math.sqrt(1 - eccentricity * eccentricity) // Semi-minor axis

    // Draw orbit path
    ctx.beginPath()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 1
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
      const rOrbit = (a * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(t))
      const x = cx + rOrbit * Math.cos(t)
      const y = cy + rOrbit * Math.sin(t)
      if (t === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw satellite
    const rOrbit = (a * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(theta))
    const satX = cx + rOrbit * Math.cos(theta)
    const satY = cy + rOrbit * Math.sin(theta)
    ctx.fillStyle = "#ff0000"
    ctx.beginPath()
    ctx.arc(satX, satY, 5, 0, Math.PI * 2)
    ctx.fill()

    // Display info
    ctx.fillStyle = "#ffffff"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" 
        ? `বেগ: ${(velocity * 1e10).toFixed(2)} m/s, উৎকেন্দ্রিকতা: ${eccentricity.toFixed(2)}` 
        : `Velocity: ${(velocity * 1e10).toFixed(2)} m/s, Eccentricity: ${eccentricity.toFixed(2)}`,
      cx,
      cy - 50
    )

    // Draw info box
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" 
        ? `বৃত্তাকার কক্ষের বেগ: ${(vCircular * 1e10).toFixed(2)} m/s` 
        : `Circular Orbit Velocity: ${(vCircular * 1e10).toFixed(2)} m/s`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "কক্ষীয় গতি সিমুলেশন" : "Orbital Motion Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)

    if (isPlaying) {
      setAngle(prev => prev + 1)
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
  }, [isPlaying, velocity, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAngle(0)
    setIsPlaying(false)
    setVelocity(100)
    setAnimationSpeed(1)
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
              <Label className="text-sm">{lang === "bn" ? "বেগ" : "Velocity"}</Label>
              <Slider
                min={50}
                max={150}
                step={1}
                value={[velocity]}
                onValueChange={(v) => setVelocity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{(velocity * 1e10).toFixed(2)} m/s</p>
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
