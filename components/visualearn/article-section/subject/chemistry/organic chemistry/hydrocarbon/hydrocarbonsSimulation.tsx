"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function HydrocarbonsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [moleculeIndex, setMoleculeIndex] = useState(0)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const molecules = [
    { name: lang === "bn" ? "মিথেন" : "Methane", description: lang === "bn" ? "অ্যালকান, একক বন্ধন" : "Alkane, single bonds" },
    { name: lang === "bn" ? "ইথেন" : "Ethene", description: lang === "bn" ? "অ্যালকিন, ডাবল বন্ধন" : "Alkene, double bond" },
    { name: lang === "bn" ? "ইথাইন" : "Ethyne", description: lang === "bn" ? "অ্যালকাইন, ট্রিপল বন্ধন" : "Alkyne, triple bond" },
    { name: lang === "bn" ? "বেনজিন" : "Benzene", description: lang === "bn" ? "অ্যারোমেটিক, বেনজিন রিং" : "Aromatic, benzene ring" },
  ]

  const drawMethane = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()

    const t = animationTime * 0.05 * animationSpeed
    for (let i = 0; i < 4; i++) {
      const angle = t + (i * Math.PI / 2)
      const x = centerX + 50 * Math.cos(angle)
      const y = centerY + 50 * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#fff"
      ctx.fill()
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "কার্বন" : "Carbon", centerX - 20, centerY - 30)
      ctx.fillText(lang === "bn" ? "হাইড্রোজেন" : "Hydrogen", centerX + 60, centerY)
    }
  }

  const drawEthene = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX - 30, centerY, 20, 0, Math.PI * 2)
    ctx.arc(centerX + 30, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()

    for (let i = 0; i < 2; i++) {
      ctx.beginPath()
      ctx.moveTo(centerX - 30, centerY + i * 5 - 2.5)
      ctx.lineTo(centerX + 30, centerY + i * 5 - 2.5)
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    const t = animationTime * 0.05 * animationSpeed
    for (let i = 0; i < 4; i++) {
      const angle = t + i
      const baseX = i < 2 ? centerX - 30 : centerX + 30
      const offset = i % 2 === 0 ? -50 : 50
      const x = baseX
      const y = centerY + offset

      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#fff"
      ctx.fill()
      ctx.strokeStyle = "#333"
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(baseX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "ডাবল বন্ধন" : "Double Bond", centerX - 40, centerY - 40)
    }
  }

  const drawEthyne = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX - 30, centerY, 20, 0, Math.PI * 2)
    ctx.arc(centerX + 30, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(centerX - 30, centerY + i * 4 - 4)
      ctx.lineTo(centerX + 30, centerY + i * 4 - 4)
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    ctx.beginPath()
    ctx.arc(centerX - 60, centerY, 10, 0, Math.PI * 2)
    ctx.arc(centerX + 60, centerY, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - 60, centerY)
    ctx.lineTo(centerX - 30, centerY)
    ctx.moveTo(centerX + 60, centerY)
    ctx.lineTo(centerX + 30, centerY)
    ctx.stroke()

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "ট্রিপল বন্ধন" : "Triple Bond", centerX - 40, centerY - 40)
    }
  }

  const drawBenzene = (ctx: CanvasRenderingContext2D) => {
    const radius = 70
    const t = animationTime * 0.02 * animationSpeed

    const positions = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + t
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      positions.push({ x, y })
    }

    for (let i = 0; i < 6; i++) {
      const { x, y } = positions[i]
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fillStyle = "#333"
      ctx.fill()

      const next = positions[(i + 1) % 6]
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(next.x, next.y)
      ctx.strokeStyle = i % 2 === 0 ? "#333" : "#666"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + t
      const x = centerX + (radius + 30) * Math.cos(angle)
      const y = centerY + (radius + 30) * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#fff"
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(positions[i].x, positions[i].y)
      ctx.stroke()
    }

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "বেনজিন রিং" : "Benzene Ring", centerX - 40, centerY - 90)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    switch (moleculeIndex) {
      case 0: drawMethane(ctx); break
      case 1: drawEthene(ctx); break
      case 2: drawEthyne(ctx); break
      case 3: drawBenzene(ctx); break
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 220, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.fillText(molecules[moleculeIndex].name, 20, 35)
    ctx.fillText(molecules[moleculeIndex].description, 20, 55)
    ctx.fillText(lang === "bn" ? `মলিকিউল: ${moleculeIndex + 1}/4` : `Molecule: ${moleculeIndex + 1}/4`, 20, 75)

    if (isPlaying) {
      setAnimationTime((prev) => prev + 1)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying, moleculeIndex, showLabels, animationSpeed, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMoleculeIndex(0)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="w-full h-full" />
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
            {isPlaying ? <><Pause className="h-4 w-4 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}</> : <><Play className="h-4 w-4 mr-2" /> {lang === "bn" ? "চালান" : "Play"}</>}
          </Button>
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
          </Button>
          <Button onClick={() => setShowLabels(!showLabels)} variant={showLabels ? "default" : "outline"}>
            <Calculator className="h-4 w-4 mr-2" /> {lang === "bn" ? "লেবেল দেখান" : "Show Labels"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "মলিকিউল নির্বাচন" : "Select Molecule"}</Label>
              <Slider min={0} max={3} step={1} value={[moleculeIndex]} onValueChange={(v) => setMoleculeIndex(v[0])} className="mt-2" />
              <p className="text-right mt-1 text-sm font-mono">{molecules[moleculeIndex].name}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider min={0.1} max={3} step={0.1} value={[animationSpeed]} onValueChange={(v) => setAnimationSpeed(v[0])} className="mt-2" />
              <p className="text-right mt-1 text-sm">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">{lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}</p>
          <div className="flex gap-2 mt-2">
            <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>English</Button>
            <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>বাংলা</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
