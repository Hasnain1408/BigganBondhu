"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function KinematicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [initialVelocity, setInitialVelocity] = useState(5)
  const [acceleration, setAcceleration] = useState(2)
  const [timeScale, setTimeScale] = useState(1)
  const [time, setTime] = useState(0)
  const [lang, setLang] = useState<"en" | "bn">("en")
  
  const groundY = 350
  const startX = 50
  const scale = 20

  const calculateMotion = () => {
    // Displacement: s = ut + ½at²
    const displacement = initialVelocity * time + 0.5 * acceleration * time * time
    // Velocity: v = u + at
    const velocity = initialVelocity + acceleration * time
    // Maximum displacement (assuming simulation stops at 30s or when displacement exceeds canvas)
    const maxTime = 30
    const maxDisplacement = initialVelocity * maxTime + 0.5 * acceleration * maxTime * maxTime
    return { displacement, velocity, maxDisplacement }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    ctx.clearRect(0, 0, width, height)
    
    // Draw ground
    ctx.beginPath()
    ctx.moveTo(0, groundY)
    ctx.lineTo(width, groundY)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    
    const { displacement, velocity, maxDisplacement } = calculateMotion()
    
    // Draw object
    const currentX = startX + displacement * scale
    if (currentX <= width) {
      ctx.beginPath()
      ctx.arc(currentX, groundY, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = "#1d4ed8"
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw velocity vector
      ctx.beginPath()
      ctx.moveTo(currentX, groundY)
      ctx.lineTo(currentX + velocity * scale * 0.5, groundY)
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 2
      ctx.stroke()
    }
    
    // Draw labels
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(
      lang === "bn" ? `স্থানচ্যুতি: ${displacement.toFixed(1)} মি` : `Displacement: ${displacement.toFixed(1)} m`,
      width - 150,
      30
    )
    ctx.fillText(
      lang === "bn" ? `বেগ: ${velocity.toFixed(1)} মি/সে` : `Velocity: ${velocity.toFixed(1)} m/s`,
      width - 150,
      55
    )
    ctx.fillText(
      lang === "bn" ? `সময়: ${time.toFixed(1)} সে` : `Time: ${time.toFixed(1)} s`,
      20,
      30
    )
    
    // Increment time
    setTime(prevTime => {
      if (prevTime >= 30 || currentX > width) {
        return 0
      }
      return prevTime + 0.016 * timeScale
    })
    
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, initialVelocity, acceleration, timeScale, time, lang])

  const reset = () => {
    setTime(0)
    setIsPlaying(false)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
        </div>

        <div className="flex justify-center gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "প্রাথমিক বেগ (মি/সে)" : "Initial Velocity (m/s)"}</Label>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[initialVelocity]}
                onValueChange={(v) => setInitialVelocity(v[0])}
              />
              <p className="text-right mt-2">{initialVelocity.toFixed(1)} {lang === "bn" ? "মি/সে" : "m/s"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "ত্বরণ (মি/সে²)" : "Acceleration (m/s²)"}</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[acceleration]}
                onValueChange={(v) => setAcceleration(v[0])}
              />
              <p className="text-right mt-2">{acceleration.toFixed(1)} {lang === "bn" ? "মি/সে²" : "m/s²"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "সময় স্কেল" : "Time Scale"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[timeScale]}
                onValueChange={(v) => setTimeScale(v[0])}
              />
              <p className="text-right mt-2">{timeScale.toFixed(1)}x</p>
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