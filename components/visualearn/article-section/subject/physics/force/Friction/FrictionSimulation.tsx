"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function AdvancedFrictionSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [appliedForce, setAppliedForce] = useState(10)
  const [muStatic, setMuStatic] = useState(0.4)
  const [muKinetic, setMuKinetic] = useState(0.3)
  const [mass, setMass] = useState(2)
  const [timeScale, setTimeScale] = useState(1)
  const [velocity, setVelocity] = useState(0)
  const [position, setPosition] = useState(0)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [time, setTime] = useState(0)

  const g = 9.8
  const normalForce = mass * g
  const staticThreshold = muStatic * normalForce
  const groundY = 350
  const startX = 50
  const scale = 20

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.moveTo(0, groundY)
    ctx.lineTo(width, groundY)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()

    // Friction logic
    let netForce = 0
    let frictionForce = 0
    let isMoving = Math.abs(velocity) > 0.01

    if (!isMoving && Math.abs(appliedForce) <= staticThreshold) {
      frictionForce = appliedForce
      netForce = 0
    } else {
      frictionForce = muKinetic * normalForce
      netForce = appliedForce - frictionForce
    }

    const acceleration = netForce / mass
    const dt = 0.016 * timeScale

    // Update velocity and position
    const newVelocity = isMoving || netForce !== 0 ? velocity + acceleration * dt : 0
    const newPosition = position + newVelocity * dt

    setVelocity(newVelocity)
    setPosition(newPosition)
    setTime((prev) => prev + dt)

    const currentX = startX + newPosition * scale

    ctx.beginPath()
    ctx.arc(currentX, groundY, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
    ctx.stroke()

    // Info display
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(
      lang === "bn" ? `বেগ: ${newVelocity.toFixed(2)} মি/সে` : `Velocity: ${newVelocity.toFixed(2)} m/s`,
      20,
      30
    )
    ctx.fillText(
      lang === "bn" ? `ঘর্ষণ বল: ${frictionForce.toFixed(2)} নি` : `Friction: ${frictionForce.toFixed(2)} N`,
      20,
      50
    )
    ctx.fillText(
      lang === "bn" ? `অবস্থা: ${isMoving ? "গতিশীল" : "স্থিত"} ` : `State: ${isMoving ? "Moving" : "At Rest"}`,
      20,
      70
    )

    // Continue animation
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying, appliedForce, muStatic, muKinetic, mass, timeScale, velocity, position])

  const reset = () => {
    setIsPlaying(false)
    setTime(0)
    setVelocity(0)
    setPosition(0)
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "প্রয়োগকৃত বল (N)" : "Applied Force (N)"}</Label>
              <Slider min={0} max={30} step={0.1} value={[appliedForce]} onValueChange={(v) => setAppliedForce(v[0])} />
              <p className="text-right mt-2">{appliedForce.toFixed(1)} N</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "স্থিতি ঘর্ষণ গুণাঙ্ক" : "Static μ"}</Label>
              <Slider min={0} max={1} step={0.01} value={[muStatic]} onValueChange={(v) => setMuStatic(v[0])} />
              <p className="text-right mt-2">{muStatic.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "গতিশীল ঘর্ষণ গুণাঙ্ক" : "Kinetic μ"}</Label>
              <Slider min={0} max={1} step={0.01} value={[muKinetic]} onValueChange={(v) => setMuKinetic(v[0])} />
              <p className="text-right mt-2">{muKinetic.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "ভর (কেজি)" : "Mass (kg)"}</Label>
              <Slider min={0.5} max={10} step={0.1} value={[mass]} onValueChange={(v) => setMass(v[0])} />
              <p className="text-right mt-2">{mass.toFixed(1)} kg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "সময় স্কেল" : "Time Scale"}</Label>
              <Slider min={0.5} max={3} step={0.1} value={[timeScale]} onValueChange={(v) => setTimeScale(v[0])} />
              <p className="text-right mt-2">{timeScale.toFixed(1)}x</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">{lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}</p>
          <div className="flex gap-2 mt-2">
            <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>
              English
            </Button>
            <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
