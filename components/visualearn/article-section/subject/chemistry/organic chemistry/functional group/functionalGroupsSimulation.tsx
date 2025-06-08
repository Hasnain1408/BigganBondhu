"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function FunctionalGroupsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [groupIndex, setGroupIndex] = useState(0) // 0: Hydroxyl, 1: Carbonyl, 2: Carboxyl, 3: Amine
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const groups = [
    { name: lang === "bn" ? "হাইড্রক্সিল" : "Hydroxyl", description: lang === "bn" ? "অ্যালকোহল, -OH" : "Alcohol, -OH" },
    { name: lang === "bn" ? "কার্বনিল" : "Carbonyl", description: lang === "bn" ? "কিটোন/অ্যালডিহাইড, >C=O" : "Ketone/Aldehyde, >C=O" },
    { name: lang === "bn" ? "কার্বক্সিল" : "Carboxyl", description: lang === "bn" ? "কার্বক্সিলিক অ্যাসিড, -COOH" : "Carboxylic Acid, -COOH" },
    { name: lang === "bn" ? "অ্যামিন" : "Amine", description: lang === "bn" ? "অ্যামিন যৌগ, -NH₂" : "Amine, -NH₂" }
  ]

  const drawHydroxyl = (ctx: CanvasRenderingContext2D) => {
    // Carbon backbone
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    // Oxygen
    const t = animationTime * 0.05 * animationSpeed
    const ox = centerX + 50 * Math.cos(t)
    const oy = centerY + 50 * Math.sin(t)
    ctx.beginPath()
    ctx.arc(ox, oy, 15, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    // Hydrogen
    ctx.beginPath()
    ctx.arc(ox + 30, oy, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#333"
    ctx.fill()
    ctx.stroke()
    // Bonds
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(ox, oy)
    ctx.moveTo(ox, oy)
    ctx.lineTo(ox + 30, oy)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "-OH গ্রুপ" : "-OH Group", centerX, centerY - 50)
    }
  }

  const drawCarbonyl = (ctx: CanvasRenderingContext2D) => {
    // Carbon backbone
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    // Oxygen
    const t = animationTime * 0.05 * animationSpeed
    const ox = centerX + 50 * Math.cos(t)
    const oy = centerY + 50 * Math.sin(t)
    ctx.beginPath()
    ctx.arc(ox, oy, 15, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    // Double bond
    ctx.beginPath()
    for (let i = 0; i < 2; i++) {
      ctx.moveTo(centerX, centerY + i * 5 - 2.5)
      ctx.lineTo(ox, oy + i * 5 - 2.5)
    }
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? ">C=O গ্রুপ" : ">C=O Group", centerX, centerY - 50)
    }
  }

  const drawCarboxyl = (ctx: CanvasRenderingContext2D) => {
    // Carbon backbone
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    // Oxygen (double bond)
    const t = animationTime * 0.05 * animationSpeed
    const ox1 = centerX + 50 * Math.cos(t)
    const oy1 = centerY + 50 * Math.sin(t)
    ctx.beginPath()
    ctx.arc(ox1, oy1, 15, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    // Double bond
    ctx.beginPath()
    for (let i = 0; i < 2; i++) {
      ctx.moveTo(centerX, centerY + i * 5 - 2.5)
      ctx.lineTo(ox1, oy1 + i * 5 - 2.5)
    }
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    // Oxygen (single bond) and Hydrogen
    const ox2 = centerX - 50 * Math.cos(t)
    const oy2 = centerY - 50 * Math.sin(t)
    ctx.beginPath()
    ctx.arc(ox2, oy2, 15, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(ox2 + 30, oy2, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#333"
    ctx.fill()
    ctx.stroke()
    // Bonds
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(ox2, oy2)
    ctx.moveTo(ox2, oy2)
    ctx.lineTo(ox2 + 30, oy2)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "-COOH গ্রুপ" : "-COOH Group", centerX, centerY - 50)
    }
  }

  const drawAmine = (ctx: CanvasRenderingContext2D) => {
    // Carbon backbone
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    // Nitrogen
    const t = animationTime * 0.05 * animationSpeed
    const nx = centerX + 50 * Math.cos(t)
    const ny = centerY + 50 * Math.sin(t)
    ctx.beginPath()
    ctx.arc(nx, ny, 15, 0, Math.PI * 2)
    ctx.fillStyle = "#0000ff"
    ctx.fill()
    // Hydrogens
    for (let i = 0; i < 2; i++) {
      const hx = nx + 30 * Math.cos(t + i * Math.PI)
      const hy = ny + 30 * Math.sin(t + i * Math.PI)
      ctx.beginPath()
      ctx.arc(hx, hy, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#333"
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(nx, ny)
      ctx.lineTo(hx, hy)
      ctx.stroke()
    }
    // Bond to carbon
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(nx, ny)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "-NH₂ গ্রুপ" : "-NH₂ Group", centerX, centerY - 50)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    switch (groupIndex) {
      case 0: drawHydroxyl(ctx); break
      case 1: drawCarbonyl(ctx); break
      case 2: drawCarboxyl(ctx); break
      case 3: drawAmine(ctx); break
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(groups[groupIndex].name, 20, 35)
    ctx.fillText(groups[groupIndex].description, 20, 55)
    ctx.fillText(lang === "bn" ? `গ্রুপ: ${groupIndex + 1}/4` : `Group: ${groupIndex + 1}/4`, 20, 75)

    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
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
  }, [isPlaying, groupIndex, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setGroupIndex(0)
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
            onClick={() => setShowLabels(!showLabels)} 
            variant={showLabels ? "default" : "outline"}
          >
            <Calculator className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "লেবেল দেখান" : "Show Labels"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "গ্রুপ নির্বাচন" : "Select Group"}</Label>
              <Slider
                min={0}
                max={3}
                step={1}
                value={[groupIndex]}
                onValueChange={(v) => setGroupIndex(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{groups[groupIndex].name}</p>
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