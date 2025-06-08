"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function StoichiometrySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [reactionIndex, setReactionIndex] = useState(0)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [molesInput, setMolesInput] = useState(2)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  type Reaction = {
    name: string
    reactants: { symbol: string; coeff: number }[]
    products: { symbol: string; coeff: number }[]
    moleRatios: Record<string, number>
  }

  const reactions: Reaction[] = [
    {
      name: "2H₂ + O₂ → 2H₂O",
      reactants: [{ symbol: "H₂", coeff: 2 }, { symbol: "O₂", coeff: 1 }],
      products: [{ symbol: "H₂O", coeff: 2 }],
      moleRatios: { "H₂": 2, "O₂": 1, "H₂O": 2 },
    },
    {
      name: "2Na + Cl₂ → 2NaCl",
      reactants: [{ symbol: "Na", coeff: 2 }, { symbol: "Cl₂", coeff: 1 }],
      products: [{ symbol: "NaCl", coeff: 2 }],
      moleRatios: { "Na": 2, "Cl₂": 1, "NaCl": 2 },
    },
  ]

  const drawReaction = (ctx: CanvasRenderingContext2D, reaction: typeof reactions[0]) => {
    const t = animationTime * 0.05 * animationSpeed
    const progress = Math.min((t % 100) / 50, 1)

    const baseReactant = reaction.reactants[0].symbol
    const baseCoeff = reaction.moleRatios[baseReactant]
    const moleMap: Record<string, number> = {}

    Object.entries(reaction.moleRatios).forEach(([compound, coeff]) => {
      moleMap[compound] = molesInput * (coeff / baseCoeff)
    })

    // Draw reactants
    reaction.reactants.forEach((reactant, i) => {
      const x = 100 + i * 150 - progress * 200
      const moles = moleMap[reactant.symbol]
      ctx.beginPath()
      ctx.arc(x, centerY - 50, 30, 0, Math.PI * 2)
      ctx.fillStyle = "#ff4444"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`${reactant.coeff} ${reactant.symbol}`, x, centerY - 45)
      if (showLabels) {
        ctx.fillText(`${moles.toFixed(1)} moles`, x, centerY - 80)
        ctx.fillText(lang === "bn" ? "বিক্রিয়ক" : "Reactant", x, centerY - 100)
      }
    })

    // Draw products
    reaction.products.forEach((product, i) => {
      const x = canvasWidth - 100 - i * 150 + progress * 200
      const moles = moleMap[product.symbol]
      ctx.beginPath()
      ctx.arc(x, centerY + 50, 30, 0, Math.PI * 2)
      ctx.fillStyle = "#44ff44"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(`${product.coeff} ${product.symbol}`, x, centerY + 55)
      if (showLabels) {
        ctx.fillText(`${moles.toFixed(1)} moles`, x, centerY + 90)
        ctx.fillText(lang === "bn" ? "উৎপাদ" : "Product", x, centerY + 110)
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

    // Display equation and mole ratios
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(lang === "bn" ? `সমীকরণ: ${reaction.name}` : `Equation: ${reaction.name}`, 20, 35)

    let offset = 55
    Object.keys(reaction.moleRatios).forEach((key) => {
      ctx.fillText(`${moleMap[key].toFixed(1)} ${key}`, 20, offset)
      offset += 20
    })
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
  }, [isPlaying, reactionIndex, showLabels, animationSpeed, lang, molesInput])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setReactionIndex(0)
    setMolesInput(2)
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

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রথম বিক্রিয়কের মোল" : "Moles of First Reactant"}</Label>
              <Slider
                min={1}
                max={5}
                step={0.1}
                value={[molesInput]}
                onValueChange={(v) => setMolesInput(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{molesInput.toFixed(1)} moles</p>
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
