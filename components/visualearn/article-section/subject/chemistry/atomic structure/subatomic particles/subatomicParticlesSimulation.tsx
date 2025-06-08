"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function SubatomicParticlesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [protonCount, setProtonCount] = useState(6)
  const [neutronCount, setNeutronCount] = useState(6)
  const [electronCount, setElectronCount] = useState(6)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const nucleusRadius = 30
  const electronOrbitRadius = 120

  const drawNucleus = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#ff4444"
    ctx.fill()

    for (let i = 0; i < protonCount; i++) {
      const angle = (i * 2 * Math.PI) / protonCount
      const x = centerX + (nucleusRadius / 2) * Math.cos(angle)
      const y = centerY + (nucleusRadius / 2) * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#ff0000"
      ctx.fill()
    }

    for (let i = 0; i < neutronCount; i++) {
      const angle = (i * 2 * Math.PI) / neutronCount + Math.PI / neutronCount
      const x = centerX + (nucleusRadius / 2) * Math.cos(angle)
      const y = centerY + (nucleusRadius / 2) * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#888"
      ctx.fill()
    }

    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "প্রোটন" : "Proton", centerX + nucleusRadius + 10, centerY - 20)
      ctx.fillText(lang === "bn" ? "নিউট্রন" : "Neutron", centerX + nucleusRadius + 10, centerY)
    }
  }

  const drawElectrons = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    for (let i = 0; i < electronCount; i++) {
      const angle = t + (i * 2 * Math.PI) / electronCount
      const x = centerX + electronOrbitRadius * Math.cos(angle)
      const y = centerY + electronOrbitRadius * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#0000ff"
      ctx.fill()
      ctx.strokeStyle = "#444"
      ctx.beginPath()
      ctx.arc(centerX, centerY, electronOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()
    }
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "ইলেকট্রন" : "Electron", centerX + electronOrbitRadius + 10, centerY + 20)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    drawNucleus(ctx)
    drawElectrons(ctx)

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 120)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    const info = lang === "bn" ? [
      `প্রোটন: ${protonCount}`,
      `নিউট্রন: ${neutronCount}`,
      `ইলেকট্রন: ${electronCount}`,
      `চার্জ: ${protonCount - electronCount}`,
      `ভর: ~${protonCount + neutronCount} u`
    ] : [
      `Protons: ${protonCount}`,
      `Neutrons: ${neutronCount}`,
      `Electrons: ${electronCount}`,
      `Charge: ${protonCount - electronCount}`,
      `Mass: ~${protonCount + neutronCount} u`
    ]
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 16)
    })

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
  }, [isPlaying, protonCount, neutronCount, electronCount, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setProtonCount(6)
    setNeutronCount(6)
    setElectronCount(6)
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রোটন সংখ্যা" : "Proton Count"}</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[protonCount]}
                onValueChange={(v) => setProtonCount(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{protonCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "নিউট্রন সংখ্যা" : "Neutron Count"}</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[neutronCount]}
                onValueChange={(v) => setNeutronCount(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{neutronCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ইলেকট্রন সংখ্যা" : "Electron Count"}</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[electronCount]}
                onValueChange={(v) => setElectronCount(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{electronCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "প্রোটন" : "Proton"}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {lang === "bn" 
                  ? "ধনাত্মক চার্জ, নিউক্লিয়াসে থাকে।" 
                  : "Positive charge, located in nucleus."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {lang === "bn" ? "নিউট্রন" : "Neutron"}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "bn" 
                  ? "চার্জবিহীন, নিউক্লিয়াসে থাকে।" 
                  : "Neutral, located in nucleus."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ইলেকট্রন" : "Electron"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "ঋণাত্মক চার্জ, নিউক্লিয়াসের চারপাশে।" 
                  : "Negative charge, orbits nucleus."}
              </p>
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