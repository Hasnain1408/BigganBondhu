"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function BuffersSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [acidBaseAmount, setAcidBaseAmount] = useState(0) // -1 (acid) to +1 (base)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Simulate two solutions: Buffered (left) and Non-buffered (right)
    const bufferedPH = 7 + acidBaseAmount * 0.1 // Buffer resists pH change
    const nonBufferedPH = 7 + acidBaseAmount * 3 // Non-buffer changes dramatically
    const bufferedColor = getColor(bufferedPH)
    const nonBufferedColor = getColor(nonBufferedPH)

    // Draw buffered solution (left)
    ctx.fillStyle = bufferedColor
    ctx.fillRect(50, 50, canvasWidth / 2 - 75, canvasHeight - 100)
    ctx.fillStyle = "#000"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" ? `বাফার: pH ${bufferedPH.toFixed(1)}` : `Buffer: pH ${bufferedPH.toFixed(1)}`,
      canvasWidth / 4,
      canvasHeight - 30
    )

    // Draw non-buffered solution (right)
    ctx.fillStyle = nonBufferedColor
    ctx.fillRect(canvasWidth / 2 + 25, 50, canvasWidth / 2 - 75, canvasHeight - 100)
    ctx.fillStyle = "#000"
    ctx.fillText(
      lang === "bn" ? `নন-বাফার: pH ${nonBufferedPH.toFixed(1)}` : `Non-Buffer: pH ${nonBufferedPH.toFixed(1)}`,
      canvasWidth * 3 / 4,
      canvasHeight - 30
    )

    // Simulate H⁺ or OH⁻ addition
    if (isPlaying) {
      const particleCount = Math.abs(acidBaseAmount) * 10
      for (let i = 0; i < particleCount; i++) {
        const x = canvasWidth / 2 - 50 + Math.random() * 100
        const y = 50 + (canvasHeight - 100) * (Math.sin(t + i) + 1) / 2
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = acidBaseAmount < 0 ? "#ff5555" : "#55ff55"
        ctx.fill()
      }
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `যোগ করা: ${acidBaseAmount < 0 ? "অ্যাসিড" : acidBaseAmount > 0 ? "বেস" : "কিছু নয়"}` 
      : `Added: ${acidBaseAmount < 0 ? "Acid" : acidBaseAmount > 0 ? "Base" : "None"}`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "বাফার বনাম নন-বাফার" : "Buffer vs Non-Buffer",
        canvasWidth / 2,
        30
      )
    }
  }

  const getColor = (pH: number) => {
    if (pH <= 2) return "#ff0000"
    if (pH <= 4) return "#ff9900"
    if (pH <= 6) return "#ffff00"
    if (pH <= 8) return "#00ff00"
    if (pH <= 10) return "#00ccff"
    return "#0000ff"
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
  }, [isPlaying, acidBaseAmount, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setAcidBaseAmount(0)
    setAnimationSpeed(1)
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যাসিড/বেস পরিমাণ" : "Acid/Base Amount"}</Label>
              <Slider
                min={-1}
                max={1}
                step={0.1}
                value={[acidBaseAmount]}
                onValueChange={(v) => setAcidBaseAmount(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{acidBaseAmount.toFixed(2)}</p>
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