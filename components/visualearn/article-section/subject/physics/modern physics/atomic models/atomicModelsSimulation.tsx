
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Atom } from "lucide-react"

export default function AtomicModelsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [energyLevel, setEnergyLevel] = useState(1)
  const [showOrbits, setShowOrbits] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const nucleusX = canvasWidth / 2
  const nucleusY = canvasHeight / 2
  const electronRadius = 5
  const orbitRadii = [50, 100, 150, 200] // Radii for n=1,2,3,4

  // Simulation state
  const electronAngle = useRef(0)

  const drawNucleus = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(nucleusX, nucleusY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#ff4444"
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "নিউক্লিয়াস" : "Nucleus", nucleusX, nucleusY + 40)
  }

  const drawOrbits = (ctx: CanvasRenderingContext2D) => {
    orbitRadii.forEach((r, index) => {
      ctx.beginPath()
      ctx.arc(nucleusX, nucleusY, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0, 0, 255, ${0.3 + 0.2 * index})`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(`n=${index + 1}`, nucleusX + r + 10, nucleusY)
    })
  }

  const drawElectron = (ctx: CanvasRenderingContext2D) => {
    const r = orbitRadii[energyLevel - 1]
    const x = nucleusX + r * Math.cos(electronAngle.current)
    const y = nucleusY + r * Math.sin(electronAngle.current)
    ctx.beginPath()
    ctx.arc(x, y, electronRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#4444ff"
    ctx.fill()
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw elements
    drawNucleus(ctx)
    if (showOrbits) drawOrbits(ctx)
    drawElectron(ctx)

    // Update electron position
    if (isPlaying) {
      electronAngle.current += 0.05
      setAnimationTime(prev => prev + 0.016)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `শক্তি স্তর: n=${energyLevel}`,
      `সময়: ${animationTime.toFixed(2)} s`,
      ``,
      `ধারণা: বোরের মডেল`
    ] : [
      `Energy Level: n=${energyLevel}`,
      `Time: ${animationTime.toFixed(2)} s`,
      ``,
      `Concept: Bohr’s Model`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("ধারণা") || text.includes("Concept")) {
        ctx.fillStyle = "#ffff00"
      } else {
        ctx.fillStyle = "#fff"
      }
      ctx.fillText(text, 20, 35 + index * 16)
    })

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    electronAngle.current = 0
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [energyLevel, showOrbits, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setEnergyLevel(1)
    electronAngle.current = 0
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
            onClick={() => setShowOrbits(!showOrbits)} 
            variant={showOrbits ? "default" : "outline"}
          >
            <Atom className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "কক্ষপথ দেখান" : "Show Orbits"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "শক্তি স্তর (n)" : "Energy Level (n)"}</Label>
              <Slider
                min={1}
                max={4}
                step={1}
                value={[energyLevel]}
                onValueChange={(v) => setEnergyLevel(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">n={energyLevel}</p>
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
