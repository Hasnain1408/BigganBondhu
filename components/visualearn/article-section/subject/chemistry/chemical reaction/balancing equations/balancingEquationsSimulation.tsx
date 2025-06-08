"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function BalancingEquationsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [equationIndex, setEquationIndex] = useState(0) // 0: CH₄ + O₂, 1: H₂ + O₂, 2: Na + Cl₂
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [coefficients, setCoefficients] = useState([1, 1, 1, 1]) // [reactant1, reactant2, product1, product2]

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const equations = [
    {
      name: "CH₄ + O₂ → CO₂ + H₂O",
      balanced: [1, 2, 1, 2],
      atoms: [
        { element: "C", reactants: [1, 0], products: [1, 0] },
        { element: "H", reactants: [4, 0], products: [0, 2] },
        { element: "O", reactants: [0, 2], products: [2, 1] },
      ],
    },
    {
      name: "H₂ + O₂ → H₂O",
      balanced: [2, 1, 2, 0],
      atoms: [
        { element: "H", reactants: [2, 0], products: [2, 0] },
        { element: "O", reactants: [0, 2], products: [1, 0] },
      ],
    },
    {
      name: "Na + Cl₂ → NaCl",
      balanced: [2, 1, 2, 0],
      atoms: [
        { element: "Na", reactants: [1, 0], products: [1, 0] },
        { element: "Cl", reactants: [0, 2], products: [1, 0] },
      ],
    },
  ]

  const drawEquation = (ctx: CanvasRenderingContext2D, equation: typeof equations[0]) => {
    const t = animationTime * 0.05 * animationSpeed
    const progress = Math.min((t % 100) / 50, 1)

    // Calculate atom counts
    const atomCounts = equation.atoms.map(atom => ({
      element: atom.element,
      reactantCount: coefficients[0] * atom.reactants[0] + coefficients[1] * atom.reactants[1],
      productCount: coefficients[2] * atom.products[0] + coefficients[3] * atom.products[1],
    }))

    // Draw reactants
    equation.name.split("→")[0].split("+").forEach((reactant, i) => {
      const x = 100 + i * 150 - progress * 200
      ctx.beginPath()
      ctx.arc(x, centerY - 50, 30, 0, Math.PI * 2)
      ctx.fillStyle = "#ff4444"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`${coefficients[i]} ${reactant.trim()}`, x, centerY - 45)
      if (showLabels) {
        ctx.fillText(lang === "bn" ? "বিক্রিয়ক" : "Reactant", x, centerY - 80)
      }
    })

    // Draw products
    equation.name.split("→")[1].split("+").forEach((product, i) => {
      if (product.trim()) {
        const x = canvasWidth - 100 - i * 150 + progress * 200
        ctx.beginPath()
        ctx.arc(x, centerY + 50, 30, 0, Math.PI * 2)
        ctx.fillStyle = "#44ff44"
        ctx.fill()
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.fillText(`${coefficients[2 + i]} ${product.trim()}`, x, centerY + 55)
        if (showLabels) {
          ctx.fillText(lang === "bn" ? "উৎপাদ" : "Product", x, centerY + 90)
        }
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

    // Display atom counts
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `সমীকরণ: ${equation.name}` : `Equation: ${equation.name}`,
      20,
      35
    )
    atomCounts.forEach((count, i) => {
      ctx.fillText(
        lang === "bn"
          ? `${count.element}: বিক্রিয়ক=${count.reactantCount}, উৎপাদ=${count.productCount}`
          : `${count.element}: Reactants=${count.reactantCount}, Products=${count.productCount}`,
        20,
        55 + i * 20
      )
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    const equation = equations[equationIndex]
    drawEquation(ctx, equation)

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
  }, [isPlaying, equationIndex, showLabels, animationSpeed, animationTime, lang, coefficients])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setCoefficients([1, 1, 1, 1])
  }

  const applyBalancedCoefficients = () => {
    setCoefficients(equations[equationIndex].balanced)
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
          <Button onClick={applyBalancedCoefficients} variant="outline">
            {lang === "bn" ? "সামঞ্জস্যপূর্ণ করুন" : "Balance"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "সমীকরণ নির্বাচন" : "Select Equation"}</Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={[equationIndex]}
                onValueChange={(v) => {
                  setEquationIndex(v[0])
                  setCoefficients([1, 1, 1, 1])
                }}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{equations[equationIndex].name}</p>
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
              <Label className="text-sm">{lang === "bn" ? "গুণাঙ্ক সামঞ্জস্য" : "Adjust Coefficients"}</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[coefficients[0]]}
                onValueChange={(v) => setCoefficients([v[0], ...coefficients.slice(1)])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{coefficients[0]}</p>
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