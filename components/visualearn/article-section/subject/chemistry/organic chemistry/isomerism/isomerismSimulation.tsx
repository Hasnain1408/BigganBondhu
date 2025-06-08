"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function IsomerismSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [isomerType, setIsomerType] = useState<"structural" | "geometric" | "optical">("structural")
  const [showLabels, setShowLabels] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * rotationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Simulate 3D effect with 2D transformations
    ctx.save()
    ctx.translate(canvasWidth / 2, canvasHeight / 2)
    ctx.rotate(t)

    // Draw isomer based on type
    if (isomerType === "structural") {
      // Simulate n-butane vs isobutane
      ctx.beginPath()
      ctx.moveTo(-50, 0)
      ctx.lineTo(50, 0)
      ctx.moveTo(-25, -25)
      ctx.lineTo(-25, 25)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = "#f00"
      ctx.fillRect(-60, -10, 20, 20)
      ctx.fillRect(40, -10, 20, 20)
    } else if (isomerType === "geometric") {
      // Simulate cis-trans isomers
      ctx.beginPath()
      ctx.moveTo(-50, 0)
      ctx.lineTo(50, 0)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 4
      ctx.stroke()
      ctx.fillStyle = "#00f"
      ctx.fillRect(-60, -20, 20, 20)
      ctx.fillRect(40, -20, 20, 20)
    } else {
      // Simulate optical isomers (mirror image)
      ctx.beginPath()
      ctx.moveTo(0, -50)
      ctx.lineTo(0, 50)
      ctx.moveTo(-50, 0)
      ctx.lineTo(50, 0)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = "#0f0"
      ctx.fillRect(20, -20, 20, 20)
      ctx.fillStyle = "#ff0"
      ctx.fillRect(-40, 20, 20, 20)
    }

    ctx.restore()

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `আইসোমার প্রকার: ${isomerType === "structural" ? "গঠনগত" : isomerType === "geometric" ? "জ্যামিতিক" : "অপটিক্যাল"}` 
      : `Isomer Type: ${isomerType.charAt(0).toUpperCase() + isomerType.slice(1)}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "আইসোমার" : "Isomer",
        canvasWidth / 2,
        canvasHeight / 2 + 100
      )
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)

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
  }, [isPlaying, rotationSpeed, isomerType, showLabels, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setRotationSpeed(1)
    setIsomerType("structural")
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
              <Label className="text-sm">{lang === "bn" ? "ঘূর্ণন গতি" : "Rotation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[rotationSpeed]}
                onValueChange={(v) => setRotationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{rotationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "আইসোমার প্রকার" : "Isomer Type"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={isomerType === "structural" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsomerType("structural")}
                >
                  {lang === "bn" ? "গঠনগত" : "Structural"}
                </Button>
                <Button
                  variant={isomerType === "geometric" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsomerType("geometric")}
                >
                  {lang === "bn" ? "জ্যামিতিক" : "Geometric"}
                </Button>
                <Button
                  variant={isomerType === "optical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsomerType("optical")}
                >
                  {lang === "bn" ? "অপটিক্যাল" : "Optical"}
                </Button>
              </div>
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