"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"

// Extend CanvasRenderingContext2D to include fillCircle
declare global {
  interface CanvasRenderingContext2D {
    fillCircle?(x: number, y: number, radius: number): void
  }
}
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye } from "lucide-react"

export default function MendelianGeneticsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [crossType, setCrossType] = useState<"monohybrid" | "dihybrid">("monohybrid")
  const [showPhenotypes, setShowPhenotypes] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions and layout
  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  // Genetic cross data
  const monohybridCross = [
    { genotype: "AA", phenotype: "Tall", probability: 0.25 },
    { genotype: "Aa", phenotype: "Tall", probability: 0.5 },
    { genotype: "aa", phenotype: "Short", probability: 0.25 }
  ]

  const dihybridCross = [
    { genotype: "AABB", phenotype: "Tall, Yellow", probability: 9/16 },
    { genotype: "AABb", phenotype: "Tall, Yellow", probability: 3/16 },
    { genotype: "AaBB", phenotype: "Tall, Yellow", probability: 3/16 },
    { genotype: "AaBb", phenotype: "Tall, Yellow", probability: 1/16 },
    { genotype: "AAbb", phenotype: "Tall, Green", probability: 3/16 },
    { genotype: "Aabb", phenotype: "Tall, Green", probability: 1/16 },
    { genotype: "aaBB", phenotype: "Short, Yellow", probability: 3/16 },
    { genotype: "aaBb", phenotype: "Short, Yellow", probability: 1/16 },
    { genotype: "aabb", phenotype: "Short, Green", probability: 1/16 }
  ]

  const drawPunnettSquare = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // Background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Punnett Square
    const squareSize = crossType === "monohybrid" ? 200 : 300
    const cellSize = crossType === "monohybrid" ? squareSize / 2 : squareSize / 4
    const startX = centerX - squareSize / 2
    const startY = centerY - squareSize / 2

    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2

    // Draw grid
    if (crossType === "monohybrid") {
      for (let i = 0; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(startX + i * cellSize, startY)
        ctx.lineTo(startX + i * cellSize, startY + squareSize)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(startX, startY + i * cellSize)
        ctx.lineTo(startX + squareSize, startY + i * cellSize)
        ctx.stroke()
      }

      // Labels
      ctx.fillStyle = "#333"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText("A", startX + cellSize / 2, startY - 10)
      ctx.fillText("a", startX + 1.5 * cellSize, startY - 10)
      ctx.fillText("A", startX - 20, startY + cellSize / 2)
      ctx.fillText("a", startX - 20, startY + 1.5 * cellSize)

      // Fill cells with genotypes
      const genotypes = ["AA", "Aa", "Aa", "aa"]
      monohybridCross.forEach((entry, index) => {
        const row = Math.floor(index / 2)
        const col = index % 2
        const cellX = startX + col * cellSize
        const cellY = startY + row * cellSize

        ctx.fillStyle = entry.phenotype === "Tall" ? "#90EE90" : "#ADD8E6"
        ctx.fillRect(cellX + 2, cellY + 2, cellSize - 4, cellSize - 4)

        ctx.fillStyle = "#333"
        ctx.font = "14px Arial"
        ctx.fillText(entry.genotype, cellX + cellSize / 2, cellY + cellSize / 2 - 10)
        if (showPhenotypes) {
          ctx.font = "12px Arial"
          ctx.fillText(entry.phenotype, cellX + cellSize / 2, cellY + cellSize / 2 + 10)
        }
      })
    } else {
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath()
        ctx.moveTo(startX + i * cellSize, startY)
        ctx.lineTo(startX + i * cellSize, startY + squareSize)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(startX, startY + i * cellSize)
        ctx.lineTo(startX + squareSize, startY + i * cellSize)
        ctx.stroke()
      }

      // Labels
      const labels = ["AB", "Ab", "aB", "ab"]
      ctx.fillStyle = "#333"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      labels.forEach((label, i) => {
        ctx.fillText(label, startX + (i + 0.5) * cellSize, startY - 10)
        ctx.fillText(label, startX - 30, startY + (i + 0.5) * cellSize)
      })

      // Fill cells with genotypes
      const genotypes = [
        "AABB", "AABb", "AaBB", "AaBb",
        "AABb", "AAbb", "AaBb", "Aabb",
        "AaBB", "AaBb", "aaBB", "aaBb",
        "AaBb", "Aabb", "aaBb", "aabb"
      ]
      dihybridCross.forEach((entry, index) => {
        const row = Math.floor(index / 4)
        const col = index % 4
        const cellX = startX + col * cellSize
        const cellY = startY + row * cellSize

        ctx.fillStyle = entry.phenotype.includes("Tall") ? 
          (entry.phenotype.includes("Yellow") ? "#90EE90" : "#ADD8E6") :
          (entry.phenotype.includes("Yellow") ? "#FFD700" : "#B0C4DE")
        ctx.fillRect(cellX + 2, cellY + 2, cellSize - 4, cellSize - 4)

        ctx.fillStyle = "#333"
        ctx.font = "12px Arial"
        ctx.fillText(entry.genotype, cellX + cellSize / 2, cellY + cellSize / 2 - 10)
        if (showPhenotypes) {
          ctx.font = "10px Arial"
          ctx.fillText(entry.phenotype, cellX + cellSize / 2, cellY + cellSize / 2 + 10)
        }
      })
    }

    // Animation effect: Highlight cells sequentially
    if (isPlaying) {
      const highlightIndex = Math.floor((time % 60) / (60 / (crossType === "monohybrid" ? 4 : 16)))
      const row = Math.floor(highlightIndex / (crossType === "monohybrid" ? 2 : 4))
      const col = highlightIndex % (crossType === "monohybrid" ? 2 : 4)
      const cellX = startX + col * cellSize
      const cellY = startY + row * cellSize

      ctx.fillStyle = "rgba(255, 255, 0, 0.3)"
      ctx.fillRect(cellX + 2, cellY + 2, cellSize - 4, cellSize - 4)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 250, 140)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `সংকর প্রকার: ${crossType === "monohybrid" ? "মনোহাইব্রিড" : "ডাইহাইব্রিড"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `ফিনোটাইপ: ${showPhenotypes ? "দৃশ্যমান" : "অদৃশ্য"}`,
      `বৈশিষ্ট্য: ${crossType === "monohybrid" ? "উচ্চতা" : "উচ্চতা, রঙ"}`,
      `অনুপাত: ${crossType === "monohybrid" ? "1:2:1" : "9:3:3:1"}`
    ] : [
      `Cross Type: ${crossType === "monohybrid" ? "Monohybrid" : "Dihybrid"}`,
      `Animation Speed: ${animationSpeed.toFixed(1)}x`,
      `Phenotypes: ${showPhenotypes ? "Visible" : "Hidden"}`,
      `Traits: ${crossType === "monohybrid" ? "Height" : "Height, Color"}`,
      `Ratio: ${crossType === "monohybrid" ? "1:2:1" : "9:3:3:1"}`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 20)
    })

    // Draw example plants
    const plantX = startX + squareSize + 50
    const plantY = startY
    ctx.fillStyle = "#228B22"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"

    if (crossType === "monohybrid") {
      ctx.fillRect(plantX, plantY, 20, 100) // Tall plant
      ctx.fillText(showPhenotypes ? "Tall" : "AA/Aa", plantX + 10, plantY - 10)
      ctx.fillStyle = "#4682B4"
      ctx.fillRect(plantX + 50, plantY + 50, 20, 50) // Short plant
      ctx.fillText(showPhenotypes ? "Short" : "aa", plantX + 60, plantY + 40)
    } else {
      ctx.fillStyle = "#228B22"
      ctx.fillRect(plantX, plantY, 20, 100) // Tall, Yellow
      ctx.fillStyle = "#FFD700"
      ctx.fillCircle(plantX + 10, plantY - 10, 5)
      ctx.fillText(showPhenotypes ? "Tall, Yellow" : "A_B_", plantX + 10, plantY - 20)
      ctx.fillStyle = "#4682B4"
      ctx.fillRect(plantX + 50, plantY + 50, 20, 50) // Short, Green
      ctx.fillStyle = "#90EE90"
      ctx.fillCircle(plantX + 60, plantY + 40, 5)
      ctx.fillText(showPhenotypes ? "Short, Green" : "aabb", plantX + 60, plantY + 30)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawPunnettSquare(ctx, animationTime)
    
    if (isPlaying) {
      setAnimationTime(prev => prev + animationSpeed)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    // Extend canvas context to include fillCircle
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.fillCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.fill()
        }
      }
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, crossType, showPhenotypes, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setCrossType("monohybrid")
    setShowPhenotypes(true)
    setAnimationSpeed(1)
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
            onClick={() => setShowPhenotypes(!showPhenotypes)} 
            variant={showPhenotypes ? "default" : "outline"}
          >
            <Eye className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "ফিনোটাইপ" : "Phenotypes"}
          </Button>
          <Button 
            onClick={() => setCrossType(crossType === "monohybrid" ? "dihybrid" : "monohybrid")} 
            variant={crossType === "monohybrid" ? "outline" : "default"}
          >
            {lang === "bn" ? (crossType === "monohybrid" ? "ডাইহাইব্রিড" : "মনোহাইব্রিড") : (crossType === "monohybrid" ? "Dihybrid" : "Monohybrid")}
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
              <Label className="text-sm">{lang === "bn" ? "সংকর প্রকার" : "Cross Type"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={crossType === "monohybrid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCrossType("monohybrid")}
                >
                  {lang === "bn" ? "মনোহাইব্রিড" : "Monohybrid"}
                </Button>
                <Button
                  variant={crossType === "dihybrid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCrossType("dihybrid")}
                >
                  {lang === "bn" ? "ডাইহাইব্রিড" : "Dihybrid"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "মনোহাইব্রিড সংকর" : "Monohybrid Cross"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "একটি বৈশিষ্ট্যের জন্য জিনোটাইপ ও ফিনোটাইপ পূর্বাভাস, যেমন উচ্চতা।"
                  : "Predicts genotypes and phenotypes for one trait, such as height."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ডাইহাইব্রিড সংকর" : "Dihybrid Cross"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "দুটি বৈশিষ্ট্যের জন্য জিনোটাইপ ও ফিনোটাইপ পূর্বাভাস, যেমন উচ্চতা ও রঙ।"
                  : "Predicts genotypes and phenotypes for two traits, such as height and color."}
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