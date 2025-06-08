"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function TypesOfReactionsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [reactionIndex, setReactionIndex] = useState(0) // 0: Combination, 1: Decomposition, 2: Combustion
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const reactions = [
    {
      name: "Combination",
      equation: "2H₂ + O₂ → 2H₂O",
      reactants: [{ symbol: "H₂" }, { symbol: "O₂" }],
      products: [{ symbol: "H₂O" }, { symbol: "H₂O" }],
    },
    {
      name: "Decomposition",
      equation: "2H₂O → 2H₂ + O₂",
      reactants: [{ symbol: "H₂O" }, { symbol: "H₂O" }],
      products: [{ symbol: "H₂" }, { symbol: "O₂" }],
    },
    {
      name: "Combustion",
      equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
      reactants: [{ symbol: "CH₄" }, { symbol: "O₂" }, { symbol: "O₂" }],
      products: [{ symbol: "CO₂" }, { symbol: "H₂O" }, { symbol: "H₂O" }],
    },
  ]

  const drawReaction = (ctx: CanvasRenderingContext2D, reaction: typeof reactions[0]) => {
    const t = animationTime * 0.05 * animationSpeed
    const progress = Math.min(t % 100 / 50, 1)

    // Draw reactants
    reaction.reactants.forEach((reactant, i) => {
      const x = 100 + i * 100 - progress * 200
      ctx.beginPath()
      ctx.arc(x, centerY - 50, 30, 0, Math.PI * 2)
      ctx.fillStyle = "#ff4444"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(reactant.symbol, x, centerY - 45)
      if (showLabels) {
        ctx.fillText(lang === "bn" ? "বিক্রিয়ক" : "Reactant", x, centerY - 80)
      }
    })

    // Draw products
    reaction.products.forEach((product, i) => {
      const x = canvasWidth - 100 - i * 100 + progress * 200
      ctx.beginPath()
      ctx.arc(x, centerY + 50, 30, 0, Math.PI * 2)
      ctx.fillStyle = "#44ff44"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(product.symbol, x, centerY + 55)
      if (showLabels) {
        ctx.fillText(lang === "bn" ? "উৎপাদ" : "Product", x, centerY + 90)
      }
    })

    // Draw arrow
    ctx.beginPath()
    ctx.moveTo(centerX - 50, centerY)
    ctx.lineTo(centerX + 50, centerY)
    ctx.lineTo(centerX + 40, centerY - 10)
    ctx.moveTo(centerX + 50, centerY)
    ctx.lineTo(centerX + 40, centerY + 10)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Display equation
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 50)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `বিক্রিয়া: ${reaction.equation}` : `Reaction: ${reaction.equation}`,
      20,
      35
    )
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    const reaction = reactions[reactionIndex]
    drawReaction(ctx, reaction)

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
  }, [isPlaying, reactionIndex, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setReactionIndex(0)
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
              <Label className="text-sm">{lang === "bn" ? "বিক্রিয়া নির্বাচন" : "Select Reaction"}</Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={[reactionIndex]}
                onValueChange={(v) => setReactionIndex(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{reactions[reactionIndex].name}</p>
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