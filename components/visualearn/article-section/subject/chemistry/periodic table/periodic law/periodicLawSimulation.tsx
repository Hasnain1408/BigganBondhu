"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function PeriodicLawSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [propertyIndex, setPropertyIndex] = useState(0) // 0: Atomic Radius, 1: Ionization Energy, 2: Electronegativity
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const periodElements = [
    { symbol: "Li", radius: 152, ionization: 520, electronegativity: 0.98 },
    { symbol: "Be", radius: 112, ionization: 899, electronegativity: 1.57 },
    { symbol: "B", radius: 85, ionization: 801, electronegativity: 2.04 },
    { symbol: "C", radius: 77, ionization: 1086, electronegativity: 2.55 },
    { symbol: "N", radius: 70, ionization: 1402, electronegativity: 3.04 },
    { symbol: "O", radius: 66, ionization: 1314, electronegativity: 3.44 },
    { symbol: "F", radius: 64, ionization: 1681, electronegativity: 3.98 },
  ]

  const properties = [
    { name: "Atomic Radius", unit: "pm", key: "radius", max: 152, trend: "Decreases" },
    { name: "Ionization Energy", unit: "kJ/mol", key: "ionization", max: 1681, trend: "Increases" },
    { name: "Electronegativity", unit: "", key: "electronegativity", max: 3.98, trend: "Increases" },
  ]

  const drawTrend = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    const pulse = Math.sin(t) * 5
    const prop = properties[propertyIndex]
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw period (simplified period 2)
    periodElements.forEach((element, i) => {
      const x = 100 + i * 100
      const y = canvasHeight / 2
      const value = element[prop.key as keyof typeof element] as number
      const scale = (value / prop.max) * 50

      // Draw element circle with pulse effect
      ctx.beginPath()
      ctx.arc(x, y, scale + (isPlaying ? pulse : 0), 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${i * 40}, 70%, 50%)`
      ctx.fill()

      // Draw symbol
      ctx.fillStyle = "#000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(element.symbol, x, y + 5)

      // Draw value label
      if (showLabels) {
        ctx.fillText(`${value}${prop.unit}`, x, y - 60)
        ctx.fillText(lang === "bn" ? "মৌল" : "Element", x, y - 80)
      }
    })

    // Draw trend info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `বৈশিষ্ট্য: ${prop.name}` : `Property: ${prop.name}`,
      20,
      35
    )
    ctx.fillText(
      lang === "bn" ? `প্রবণতা: ${prop.trend === "Increases" ? "বাড়ে" : "কমে"}` : `Trend: ${prop.trend}`,
      20,
      55
    )
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawTrend(ctx)

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
  }, [isPlaying, propertyIndex, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setPropertyIndex(0)
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
              <Label className="text-sm">{lang === "bn" ? "বৈশিষ্ট্য নির্বাচন" : "Select Property"}</Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={[propertyIndex]}
                onValueChange={(v) => setPropertyIndex(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{properties[propertyIndex].name}</p>
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