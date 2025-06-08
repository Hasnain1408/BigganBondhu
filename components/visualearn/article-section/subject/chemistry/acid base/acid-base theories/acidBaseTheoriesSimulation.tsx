"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function AcidBaseTheoriesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [theory, setTheory] = useState<"arrhenius" | "bronsted" | "lewis">("arrhenius")
  const [showLabels, setShowLabels] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw reaction based on theory
    ctx.font = "16px Arial"
    ctx.textAlign = "center"

    if (theory === "arrhenius") {
      // HCl → H⁺ + Cl⁻ in water
      ctx.fillStyle = "#f00"
      ctx.fillText("HCl", canvasWidth / 3, canvasHeight / 2)
      ctx.fillStyle = "#000"
      ctx.fillText("→", canvasWidth / 2, canvasHeight / 2)
      ctx.fillStyle = "#00f"
      ctx.fillText("H⁺", canvasWidth * 2 / 3 - 30, canvasHeight / 2 - 20 * Math.sin(t))
      ctx.fillStyle = "#0f0"
      ctx.fillText("Cl⁻", canvasWidth * 2 / 3 + 30, canvasHeight / 2 + 20 * Math.sin(t))
    } else if (theory === "bronsted") {
      // NH₃ + HCl → NH₄⁺ + Cl⁻
      ctx.fillStyle = "#f00"
      ctx.fillText("NH₃", canvasWidth / 3 - 30, canvasHeight / 2)
      ctx.fillStyle = "#f00"
      ctx.fillText("HCl", canvasWidth / 3 + 30, canvasHeight / 2)
      ctx.fillStyle = "#000"
      ctx.fillText("→", canvasWidth / 2, canvasHeight / 2)
      ctx.fillStyle = "#00f"
      ctx.fillText("NH₄⁺", canvasWidth * 2 / 3 - 30, canvasHeight / 2 - 20 * Math.sin(t))
      ctx.fillStyle = "#0f0"
      ctx.fillText("Cl⁻", canvasWidth * 2 / 3 + 30, canvasHeight / 2 + 20 * Math.sin(t))
    } else {
      // BF₃ + NH₃ → F₃B:NH₃
      ctx.fillStyle = "#f00"
      ctx.fillText("BF₃", canvasWidth / 3 - 30, canvasHeight / 2)
      ctx.fillStyle = "#f00"
      ctx.fillText("NH₃", canvasWidth / 3 + 30, canvasHeight / 2)
      ctx.fillStyle = "#000"
      ctx.fillText("→", canvasWidth / 2, canvasHeight / 2)
      ctx.fillStyle = "#00f"
      ctx.fillText("F₃B:NH₃", canvasWidth * 2 / 3, canvasHeight / 2 + 20 * Math.sin(t))
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `তত্ত্ব: ${theory === "arrhenius" ? "আর্রেনিয়াস" : theory === "bronsted" ? "ব্রনস্টেড-লোরি" : "লুইস"}` 
      : `Theory: ${theory.charAt(0).toUpperCase() + theory.slice(1)}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "প্রতিক্রিয়া" : "Reaction",
        canvasWidth / 2,
        canvasHeight - 50
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
  }, [isPlaying, animationSpeed, theory, showLabels, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setAnimationSpeed(1)
    setTheory("arrhenius")
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

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তত্ত্ব" : "Theory"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={theory === "arrhenius" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheory("arrhenius")}
                >
                  {lang === "bn" ? "আর্রেনিয়াস" : "Arrhenius"}
                </Button>
                <Button
                  variant={theory === "bronsted" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheory("bronsted")}
                >
                  {lang === "bn" ? "ব্রনস্টেড" : "Brønsted"}
                </Button>
                <Button
                  variant={theory === "lewis" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheory("lewis")}
                >
                  {lang === "bn" ? "লুইস" : "Lewis"}
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