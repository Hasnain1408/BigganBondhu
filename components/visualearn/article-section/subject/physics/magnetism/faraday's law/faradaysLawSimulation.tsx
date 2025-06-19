
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function FaradaysLawSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [magnetSpeed, setMagnetSpeed] = useState(50) // Magnet speed in pixels/s
  const [coilTurns, setCoilTurns] = useState(5) // Number of coil turns
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [magnetY, setMagnetY] = useState(100)

  const canvasWidth = 800
  const canvasHeight = 500
  const coilX = canvasWidth / 2
  const coilY = canvasHeight / 2
  const coilRadius = 50
  const B0 = 0.1 // Magnetic field strength (T)

  const drawCoil = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#8b4513"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.ellipse(coilX, coilY, coilRadius, coilRadius * 0.4, 0, 0, 2 * Math.PI)
    ctx.stroke()
    for (let i = 1; i < coilTurns; i++) {
      const offset = (i / coilTurns) * 20
      ctx.beginPath()
      ctx.ellipse(coilX, coilY, coilRadius + offset, (coilRadius + offset) * 0.4, 0, 0, 2 * Math.PI)
      ctx.stroke()
    }
  }

  const drawMagnet = (ctx: CanvasRenderingContext2D) => {
    const magnetWidth = 40
    const magnetHeight = 80
    const magnetX = coilX - magnetWidth / 2
    ctx.fillStyle = "#ff0000" // North pole
    ctx.fillRect(magnetX, magnetY, magnetWidth, magnetHeight / 2)
    ctx.fillStyle = "#0000ff" // South pole
    ctx.fillRect(magnetX, magnetY + magnetHeight / 2, magnetWidth, magnetHeight / 2)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(magnetX, magnetY, magnetWidth, magnetHeight)
    ctx.fillStyle = "#fff"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("N", magnetX + magnetWidth / 2, magnetY + magnetHeight / 4)
    ctx.fillText("S", magnetX + magnetWidth / 2, magnetY + 3 * magnetHeight / 4)
  }

  const drawFieldLines = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#00f"
    ctx.lineWidth = 1
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath()
      ctx.moveTo(coilX + i * 20, magnetY)
      ctx.quadraticCurveTo(coilX + i * 20, coilY, coilX + i * 20, magnetY + 160)
      ctx.stroke()
    }
  }

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw coil
    drawCoil(ctx)

    // Draw magnet
    drawMagnet(ctx)

    // Draw field lines
    drawFieldLines(ctx)

    // Calculate magnetic flux and EMF
    const distance = Math.abs(magnetY - coilY)
    const B = B0 * Math.exp(-distance / 100) // Simplified field decay
    const flux = B * Math.PI * coilRadius ** 2 * 1e-4 // Flux in Wb
    const emf = coilTurns * (flux * Math.cos(magnetSpeed * 0.01 * animationSpeed)) * 0.1 // Simplified EMF
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" 
        ? `EMF: ${(emf * 1000).toFixed(2)} mV, ফ্লাক্স: ${flux.toFixed(4)} Wb` 
        : `EMF: ${(emf * 1000).toFixed(2)} mV, Flux: ${flux.toFixed(4)} Wb`,
      canvasWidth / 2,
      30
    )

    // Draw current direction (Lenz’s Law)
    ctx.fillStyle = emf > 0 ? "#00ff00" : "#ff0000"
    ctx.beginPath()
    ctx.arc(coilX + coilRadius + 30, coilY, 10, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `প্রবাহ: ${emf > 0 ? "ঘড়ির" : "বিপরীত"}` : `Current: ${emf > 0 ? "Clockwise" : "Counterclockwise"}`,
      coilX + coilRadius + 50,
      coilY + 5
    )

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, canvasHeight - 90, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? "ফ্যারাডের সূত্র: ε = -dΦ_B/dt" : "Faraday's Law: ε = -dΦ_B/dt",
      20,
      canvasHeight - 65
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "ফ্যারাডের সূত্র সিমুলেশন" : "Faraday's Law Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const updateMagnet = () => {
    setMagnetY(prev => {
      const newY = prev + (magnetSpeed * 0.01 * animationSpeed * (isPlaying ? 1 : 0))
      if (newY > canvasHeight - 100 || newY < 100) {
        setMagnetSpeed(-magnetSpeed)
        return prev
      }
      return newY
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)
    updateMagnet()

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, magnetSpeed, coilTurns, showLabels, animationSpeed, magnetY, lang])

  const reset = () => {
    setIsPlaying(false)
    setMagnetSpeed(50)
    setCoilTurns(5)
    setAnimationSpeed(1)
    setMagnetY(100)
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
              <Label className="text-sm">{lang === "bn" ? "চুম্বকের গতি" : "Magnet Speed"}</Label>
              <Slider
                min={10}
                max={100}
                step={1}
                value={[Math.abs(magnetSpeed)]}
                onValueChange={(v) => setMagnetSpeed(v[0] * Math.sign(magnetSpeed))}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{Math.abs(magnetSpeed)} px/s</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কুণ্ডলীর সংখ্যা" : "Coil Turns"}</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[coilTurns]}
                onValueChange={(v) => setCoilTurns(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{coilTurns}</p>
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
