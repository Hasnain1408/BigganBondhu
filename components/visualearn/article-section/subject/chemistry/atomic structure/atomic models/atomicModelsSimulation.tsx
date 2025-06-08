"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function AtomicModelsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [modelIndex, setModelIndex] = useState(0) // 0: Dalton, 1: Thomson, 2: Rutherford, 3: Bohr, 4: Quantum
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const models = [
    { name: lang === "bn" ? "ডালটন মডেল" : "Dalton Model", description: lang === "bn" ? "অবিভাজ্য কঠিন কণা" : "Indivisible solid particle" },
    { name: lang === "bn" ? "থমসন মডেল" : "Thomson Model", description: lang === "bn" ? "প্লাম পুডিং মডেল" : "Plum pudding model" },
    { name: lang === "bn" ? "রাদারফোর্ড মডেল" : "Rutherford Model", description: lang === "bn" ? "কেন্দ্রীয় নিউক্লিয়াস" : "Central nucleus" },
    { name: lang === "bn" ? "বোর মডেল" : "Bohr Model", description: lang === "bn" ? "নির্দিষ্ট কক্ষপথ" : "Fixed orbits" },
    { name: lang === "bn" ? "কোয়ান্টাম মডেল" : "Quantum Model", description: lang === "bn" ? "সম্ভাব্যতার মেঘ" : "Probability cloud" },
  ]

  const drawDalton = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2)
    ctx.fillStyle = "#888"
    ctx.fill()
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "কঠিন পরমাণু" : "Solid Atom", centerX, centerY - 60)
    }
  }

  const drawThomson = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 80, 0, Math.PI * 2)
    ctx.fillStyle = "#ffaa00"
    ctx.fill()
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3
      const x = centerX + 40 * Math.cos(angle)
      const y = centerY + 40 * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#0000ff"
      ctx.fill()
    }
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "ধনাত্মক পদার্থ" : "Positive Matter", centerX, centerY - 100)
      ctx.fillText(lang === "bn" ? "ইলেকট্রন" : "Electrons", centerX + 50, centerY)
    }
  }

  const drawRutherford = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    const t = animationTime * 0.05 * animationSpeed
    for (let i = 0; i < 3; i++) {
      const angle = t + (i * 2 * Math.PI) / 3
      const x = centerX + 100 * Math.cos(angle)
      const y = centerY + 100 * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#0000ff"
      ctx.fill()
      ctx.strokeStyle = "#444"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2)
      ctx.stroke()
    }
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "নিউক্লিয়াস" : "Nucleus", centerX, centerY - 30)
      ctx.fillText(lang === "bn" ? "ইলেকট্রন" : "Electron", centerX + 110, centerY)
    }
  }

  const drawBohr = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    const t = animationTime * 0.05 * animationSpeed
    const radii = [80, 120, 160]
    radii.forEach((r, i) => {
      ctx.strokeStyle = "#444"
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
      ctx.stroke()
      const angle = t + i
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#0000ff"
      ctx.fill()
    })
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "নিউক্লিয়াস" : "Nucleus", centerX, centerY - 30)
      ctx.fillText(lang === "bn" ? "কক্ষপথ" : "Orbit", centerX + 170, centerY)
    }
  }

  const drawQuantum = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    const t = animationTime * 0.05 * animationSpeed
    for (let i = 0; i < 50; i++) {
      const r = 50 + Math.random() * 100
      const angle = t + Math.random() * 2 * Math.PI
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 0, 255, ${0.2 + Math.random() * 0.5})`
      ctx.fill()
    }
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "নিউক্লিয়াস" : "Nucleus", centerX, centerY - 30)
      ctx.fillText(lang === "bn" ? "ইলেকট্রন মেঘ" : "Electron Cloud", centerX + 150, centerY)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    switch (modelIndex) {
      case 0: drawDalton(ctx); break
      case 1: drawThomson(ctx); break
      case 2: drawRutherford(ctx); break
      case 3: drawBohr(ctx); break
      case 4: drawQuantum(ctx); break
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(models[modelIndex].name, 20, 35)
    ctx.fillText(models[modelIndex].description, 20, 55)
    ctx.fillText(lang === "bn" ? `মডেল: ${modelIndex + 1}/5` : `Model: ${modelIndex + 1}/5`, 20, 75)

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
  }, [isPlaying, modelIndex, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setModelIndex(0)
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
            {lang === "bn" ? "লেবেল দেখান" : "Labels"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "মডেল নির্বাচন" : "Select Model"}</Label>
              <Slider
                min={0}
                max={4}
                step={1}
                value={[modelIndex]}
                onValueChange={(v) => setModelIndex(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{models[modelIndex].name}</p>
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