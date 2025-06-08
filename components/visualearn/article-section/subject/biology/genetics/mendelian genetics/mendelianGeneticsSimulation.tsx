"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye, EyeOff, Zap, BarChart3, Shuffle, Settings } from "lucide-react"

// Extend CanvasRenderingContext2D
declare global {
  interface CanvasRenderingContext2D {
    fillCircle?(x: number, y: number, radius: number): void
    drawPlant?(x: number, y: number, height: number, color: string, fruitColor?: string): void
  }
}

interface GeneticEntry {
  genotype: string
  phenotype: string
  probability: number
  color: string
}

export default function EnhancedMendelianGeneticsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [crossType, setCrossType] = useState<"monohybrid" | "dihybrid">("monohybrid")
  const [showPhenotypes, setShowPhenotypes] = useState(true)
  const [showProbabilities, setShowProbabilities] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [highlightMode, setHighlightMode] = useState<"sequential" | "probabilistic" | "random">("sequential")
  const [visualStyle, setVisualStyle] = useState<"classic" | "modern" | "neon">("modern")
  const [particleSystem, setParticleSystem] = useState(true)
  const [showStatistics, setShowStatistics] = useState(false)

  // Particle system for visual effects
  const [particles, setParticles] = useState<Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    color: string
    size: number
  }>>([])

  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  // Enhanced genetic cross data with colors
  const monohybridCross: GeneticEntry[] = [
    { genotype: "AA", phenotype: "Tall", probability: 0.25, color: "#22c55e" },
    { genotype: "Aa", phenotype: "Tall", probability: 0.5, color: "#16a34a" },
    { genotype: "aa", phenotype: "Short", probability: 0.25, color: "#3b82f6" }
  ]

  const dihybridCross: GeneticEntry[] = [
    { genotype: "AABB", phenotype: "Tall, Yellow", probability: 1/16, color: "#22c55e" },
    { genotype: "AABb", phenotype: "Tall, Yellow", probability: 2/16, color: "#16a34a" },
    { genotype: "AaBB", phenotype: "Tall, Yellow", probability: 2/16, color: "#15803d" },
    { genotype: "AaBb", phenotype: "Tall, Yellow", probability: 4/16, color: "#166534" },
    { genotype: "AAbb", phenotype: "Tall, Green", probability: 1/16, color: "#84cc16" },
    { genotype: "Aabb", phenotype: "Tall, Green", probability: 2/16, color: "#65a30d" },
    { genotype: "aaBB", phenotype: "Short, Yellow", probability: 1/16, color: "#eab308" },
    { genotype: "aaBb", phenotype: "Short, Yellow", probability: 2/16, color: "#ca8a04" },
    { genotype: "aabb", phenotype: "Short, Green", probability: 1/16, color: "#3b82f6" }
  ]

  const getStyleColors = (style: string) => {
    switch (style) {
      case "neon":
        return {
          background: "#0a0a0a",
          grid: "#00ffff",
          text: "#ffffff",
          highlight: "#ff00ff"
        }
      case "classic":
        return {
          background: "#f8f9fa",
          grid: "#333333",
          text: "#000000",
          highlight: "#ffeb3b"
        }
      default: // modern
        return {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          grid: "#ffffff",
          text: "#ffffff",
          highlight: "#ffd700"
        }
    }
  }

  const createParticles = useCallback((x: number, y: number, color: string) => {
    if (!particleSystem) return
    
    const newParticles = Array.from({ length: 8 }, () => ({
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 60,
      color,
      size: Math.random() * 3 + 1
    }))
    
    setParticles(prev => [...prev.slice(-50), ...newParticles])
  }, [particleSystem])

  const updateParticles = useCallback(() => {
    setParticles(prev => prev
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1,
        vy: p.vy + 0.1 // gravity
      }))
      .filter(p => p.life > 0)
    )
  }, [])

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const colors = getStyleColors(visualStyle)
    
    if (visualStyle === "modern") {
      const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
      gradient.addColorStop(0, "#667eea")
      gradient.addColorStop(1, "#764ba2")
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = colors.background
    }
    
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Add animated background pattern for neon style
    if (visualStyle === "neon") {
      const time = animationTime * 0.01
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + Math.sin(time) * 0.05})`
      ctx.lineWidth = 1
      for (let i = 0; i < canvasWidth; i += 50) {
        for (let j = 0; j < canvasHeight; j += 50) {
          ctx.beginPath()
          ctx.arc(i, j, 20 + Math.sin(time + i * 0.01) * 5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }
  }

  const drawPunnettSquare = (ctx: CanvasRenderingContext2D, time: number) => {
    drawBackground(ctx)
    
    const colors = getStyleColors(visualStyle)
    const data = crossType === "monohybrid" ? monohybridCross : dihybridCross
    const squareSize = crossType === "monohybrid" ? 240 : 320
    const cellSize = crossType === "monohybrid" ? squareSize / 2 : squareSize / 4
    const startX = centerX - squareSize / 2
    const startY = centerY - squareSize / 2 - 30

    // Draw glowing grid
    ctx.strokeStyle = colors.grid
    ctx.lineWidth = visualStyle === "neon" ? 3 : 2
    if (visualStyle === "neon") {
      ctx.shadowColor = colors.grid
      ctx.shadowBlur = 10
    }

    // Draw grid lines with animation
    const gridSize = crossType === "monohybrid" ? 2 : 4
    for (let i = 0; i <= gridSize; i++) {
      const offset = Math.sin(time * 0.02 + i) * (visualStyle === "neon" ? 2 : 0)
      
      ctx.beginPath()
      ctx.moveTo(startX + i * cellSize + offset, startY)
      ctx.lineTo(startX + i * cellSize + offset, startY + squareSize)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(startX, startY + i * cellSize + offset)
      ctx.lineTo(startX + squareSize, startY + i * cellSize + offset)
      ctx.stroke()
    }

    ctx.shadowBlur = 0

    // Enhanced labels with animation
    ctx.fillStyle = colors.text
    ctx.font = `${visualStyle === "neon" ? "bold " : ""}18px Arial`
    ctx.textAlign = "center"
    
    const labels = crossType === "monohybrid" ? ["A", "a"] : ["AB", "Ab", "aB", "ab"]
    labels.forEach((label, i) => {
      const bounce = Math.sin(time * 0.05 + i) * 3
      ctx.fillText(label, startX + (i + 0.5) * cellSize, startY - 15 + bounce)
      ctx.save()
      ctx.translate(startX - 25, startY + (i + 0.5) * cellSize)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText(label, 0, bounce)
      ctx.restore()
    })

    // Fill cells with enhanced visuals
    data.forEach((entry, index) => {
      const totalCells = crossType === "monohybrid" ? 4 : 16
      const cellsToShow = Math.max(1, Math.floor((entry.probability * totalCells)))
      
      for (let cellIndex = 0; cellIndex < cellsToShow; cellIndex++) {
        const actualIndex = index * cellsToShow + cellIndex
        if (actualIndex >= totalCells) break
        
        const row = Math.floor(actualIndex / gridSize)
        const col = actualIndex % gridSize
        const cellX = startX + col * cellSize
        const cellY = startY + row * cellSize

        // Enhanced cell styling
        let cellColor = entry.color
        let alpha = 0.8
        
        // Highlight logic based on mode
        let isHighlighted = false
        switch (highlightMode) {
          case "sequential":
            isHighlighted = actualIndex === Math.floor((time * animationSpeed % 60) / (60 / totalCells))
            break
          case "probabilistic":
            isHighlighted = Math.random() < entry.probability && Math.floor(time % 120) < 60
            break
          case "random":
            isHighlighted = Math.random() < 0.1
            break
        }

        if (isHighlighted && isPlaying) {
          alpha = 1
          if (visualStyle === "neon") {
            ctx.shadowColor = cellColor
            ctx.shadowBlur = 20
          }
          createParticles(cellX + cellSize / 2, cellY + cellSize / 2, cellColor)
        }

        // Draw cell with gradient
        const gradient = ctx.createRadialGradient(
          cellX + cellSize / 2, cellY + cellSize / 2, 0,
          cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 2
        )
        gradient.addColorStop(0, cellColor + Math.floor(alpha * 255).toString(16).padStart(2, '0'))
        gradient.addColorStop(1, cellColor + "80")
        
        ctx.fillStyle = gradient
        ctx.fillRect(cellX + 3, cellY + 3, cellSize - 6, cellSize - 6)
        ctx.shadowBlur = 0

        // Draw text with better styling
        ctx.fillStyle = visualStyle === "neon" ? "#ffffff" : "#000000"
        ctx.font = `${visualStyle === "neon" ? "bold " : ""}${crossType === "monohybrid" ? "16" : "12"}px Arial`
        ctx.fillText(entry.genotype, cellX + cellSize / 2, cellY + cellSize / 2 - 8)
        
        if (showPhenotypes) {
          ctx.font = `${crossType === "monohybrid" ? "12" : "10"}px Arial`
          ctx.fillText(entry.phenotype, cellX + cellSize / 2, cellY + cellSize / 2 + 12)
        }
        
        if (showProbabilities) {
          ctx.font = "10px Arial"
          ctx.fillText(`${(entry.probability * 100).toFixed(1)}%`, cellX + cellSize / 2, cellY + cellSize / 2 + 25)
        }
      }
    })

    // Draw particles
    particles.forEach(particle => {
      ctx.fillStyle = particle.color + Math.floor((particle.life / 60) * 255).toString(16).padStart(2, '0')
      ctx.fillCircle!(particle.x, particle.y, particle.size)
    })

    // Enhanced information panel
    const panelWidth = 280
    const panelHeight = showStatistics ? 220 : 160
    ctx.fillStyle = visualStyle === "neon" ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(15, 15, panelWidth, panelHeight)
    
    if (visualStyle === "neon") {
      ctx.strokeStyle = "#00ffff"
      ctx.lineWidth = 2
      ctx.strokeRect(15, 15, panelWidth, panelHeight)
    }

    ctx.fillStyle = colors.text
    ctx.font = "16px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `সংকর প্রকার: ${crossType === "monohybrid" ? "মনোহাইব্রিড" : "ডাইহাইব্রিড"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `হাইলাইট মোড: ${highlightMode === "sequential" ? "ক্রমিক" : highlightMode === "probabilistic" ? "সম্ভাব্য" : "এলোমেলো"}`,
      `ভিজ্যুয়াল স্টাইল: ${visualStyle === "neon" ? "নিয়ন" : visualStyle === "classic" ? "ক্লাসিক" : "আধুনিক"}`,
      `বৈশিষ্ট্য: ${crossType === "monohybrid" ? "উচ্চতা" : "উচ্চতা, রঙ"}`,
      `অনুপাত: ${crossType === "monohybrid" ? "3:1" : "9:3:3:1"}`
    ] : [
      `Cross Type: ${crossType === "monohybrid" ? "Monohybrid" : "Dihybrid"}`,
      `Animation Speed: ${animationSpeed.toFixed(1)}x`,
      `Highlight Mode: ${highlightMode.charAt(0).toUpperCase() + highlightMode.slice(1)}`,
      `Visual Style: ${visualStyle.charAt(0).toUpperCase() + visualStyle.slice(1)}`,
      `Traits: ${crossType === "monohybrid" ? "Height" : "Height, Color"}`,
      `Ratio: ${crossType === "monohybrid" ? "3:1" : "9:3:3:1"}`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 25, 45 + index * 22)
    })

    // Statistics panel
    if (showStatistics) {
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "পরিসংখ্যান:" : "Statistics:", 25, 175)
      ctx.font = "12px Arial"
      
      const stats = crossType === "monohybrid" 
        ? [`Dominant: 75%`, `Recessive: 25%`]
        : [`Tall, Yellow: 56.25%`, `Tall, Green: 18.75%`, `Short, Yellow: 18.75%`, `Short, Green: 6.25%`]
      
      stats.forEach((stat, index) => {
        ctx.fillText(stat, 25, 195 + index * 15)
      })
    }

    // Enhanced plant visualization
    const plantX = startX + squareSize + 60
    const plantY = startY + 20
    
    if (crossType === "monohybrid") {
      ctx.drawPlant!(plantX, plantY, 120, "#22c55e")
      ctx.fillStyle = colors.text
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.fillText(lang === "bn" ? "লম্বা" : "Tall", plantX + 15, plantY - 10)
      
      ctx.drawPlant!(plantX + 80, plantY + 40, 60, "#3b82f6")
      ctx.fillText(lang === "bn" ? "খাটো" : "Short", plantX + 95, plantY + 30)
    } else {
      ctx.drawPlant!(plantX, plantY, 120, "#22c55e", "#fbbf24")
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(lang === "bn" ? "লম্বা, হলুদ" : "Tall, Yellow", plantX + 15, plantY - 10)
      
      ctx.drawPlant!(plantX + 80, plantY + 40, 60, "#3b82f6", "#22c55e")
      ctx.fillText(lang === "bn" ? "খাটো, সবুজ" : "Short, Green", plantX + 95, plantY + 30)
    }
  }

  const animate = useCallback(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawPunnettSquare(ctx, animationTime)
    updateParticles()
    
    if (isPlaying) {
      setAnimationTime(prev => prev + animationSpeed)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }, [animationTime, isPlaying, crossType, showPhenotypes, showProbabilities, animationSpeed, lang, highlightMode, visualStyle, particles, showStatistics, updateParticles])

  useEffect(() => {
    // Extend canvas context
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.fillCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.fill()
        }
        
        ctx.drawPlant = function(x: number, y: number, height: number, color: string, fruitColor?: string) {
          // Stem
          this.fillStyle = "#166534"
          this.fillRect(x + 10, y, 10, height)
          
          // Leaves
          this.fillStyle = color
          for (let i = 0; i < height / 20; i++) {
            const leafY = y + i * 20
            this.beginPath()
            this.ellipse(x + 5, leafY, 8, 4, -Math.PI / 4, 0, Math.PI * 2)
            this.fill()
            this.beginPath()
            this.ellipse(x + 25, leafY, 8, 4, Math.PI / 4, 0, Math.PI * 2)
            this.fill()
          }
          
          // Fruits/flowers
          if (fruitColor) {
            this.fillStyle = fruitColor
            for (let i = 0; i < 3; i++) {
              this.fillCircle!(x + 15 + Math.sin(i) * 8, y + height / 3 + i * 15, 4)
            }
          }
        }
      }
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setParticles([])
  }

  const randomizeCross = () => {
    setCrossType(Math.random() > 0.5 ? "dihybrid" : "monohybrid")
    setHighlightMode(["sequential", "probabilistic", "random"][Math.floor(Math.random() * 3)] as any)
    setVisualStyle(["classic", "modern", "neon"][Math.floor(Math.random() * 3)] as any)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {lang === "bn" ? "উন্নত মেন্ডেলীয় জেনেটিক্স সিমুলেশন" : "Enhanced Mendelian Genetics Simulation"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button 
            onClick={() => setIsPlaying(!isPlaying)} 
            variant="outline" 
            size="lg"
            className="transition-all hover:scale-105"
          >
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
          
          <Button onClick={reset} variant="outline" size="lg" className="transition-all hover:scale-105">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট" : "Reset"}
          </Button>
          
          <Button onClick={randomizeCross} variant="outline" size="lg" className="transition-all hover:scale-105">
            <Shuffle className="h-4 w-4 mr-2" /> {lang === "bn" ? "এলোমেলো" : "Randomize"}
          </Button>
          
          <Button 
            onClick={() => setShowPhenotypes(!showPhenotypes)} 
            variant={showPhenotypes ? "default" : "outline"}
            size="lg"
            className="transition-all hover:scale-105"
          >
            {showPhenotypes ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
            {lang === "bn" ? "ফিনোটাইপ" : "Phenotypes"}
          </Button>
          
          <Button 
            onClick={() => setShowStatistics(!showStatistics)} 
            variant={showStatistics ? "default" : "outline"}
            size="lg"
            className="transition-all hover:scale-105"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {lang === "bn" ? "পরিসংখ্যান" : "Statistics"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
                className="mt-3"
              />
              <p className="text-right mt-2 text-sm font-medium">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "সংকর প্রকার" : "Cross Type"}</Label>
              <div className="flex gap-2 mt-3">
                <Button
                  variant={crossType === "monohybrid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCrossType("monohybrid")}
                  className="flex-1"
                >
                  {lang === "bn" ? "মনোহাইব্রিড" : "Monohybrid"}
                </Button>
                <Button
                  variant={crossType === "dihybrid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCrossType("dihybrid")}
                  className="flex-1"
                >
                  {lang === "bn" ? "ডাইহাইব্রিড" : "Dihybrid"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "হাইলাইট মোড" : "Highlight Mode"}</Label>
              <div className="space-y-2 mt-3">
                {["sequential", "probabilistic", "random"].map((mode) => (
                  <Button
                    key={mode}
                    variant={highlightMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setHighlightMode(mode as any)}
                    className="w-full text-xs"
                  >
                    {lang === "bn" 
                      ? (mode === "sequential" ? "ক্রমিক" : mode === "probabilistic" ? "সম্ভাব্য" : "এলোমেলো")
                      : mode.charAt(0).toUpperCase() + mode.slice(1)
                    }
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "ভিজ্যুয়াল স্টাইল" : "Visual Style"}</Label>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {["classic", "modern", "neon"].map((style) => (
                  <Button
                    key={style}
                    variant={visualStyle === style ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVisualStyle(style as any)}
                    className="text-xs"
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Label className="text-xs">{lang === "bn" ? "পার্টিকেল এফেক্ট" : "Particle Effects"}</Label>
                <Button
                  variant={particleSystem ? "default" : "outline"}
                  size="sm"
                  onClick={() => setParticleSystem(!particleSystem)}
                >
                  <Zap className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900">
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "প্রদর্শন বিকল্প" : "Display Options"}</Label>
              <div className="space-y-3 mt-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">{lang === "bn" ? "সম্ভাব্যতা দেখান" : "Show Probabilities"}</Label>
                  <Button
                    variant={showProbabilities ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowProbabilities(!showProbabilities)}
                  >
                    {showProbabilities ? "ON" : "OFF"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">{lang === "bn" ? "ভাষা" : "Language"}</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={lang === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLang("en")}
                      className="text-xs px-2"
                    >
                      EN
                    </Button>
                    <Button
                      variant={lang === "bn" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLang("bn")}
                      className="text-xs px-2"
                    >
                      বাং
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-2 border-emerald-200 dark:border-emerald-800">
            <CardContent className="pt-4">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                {lang === "bn" ? "মনোহাইব্রিড সংকর" : "Monohybrid Cross"}
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-3">
                {lang === "bn" 
                  ? "একটি বৈশিষ্ট্যের জন্য জিনোটাইপ ও ফিনোটাইপ পূর্বাভাস। উদাহরণ: উচ্চতা (লম্বা বনাম খাটো)।"
                  : "Predicts genotypes and phenotypes for one trait. Example: Height (tall vs short)."}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="text-xs font-semibold mb-2">{lang === "bn" ? "ফিনোটাইপিক অনুপাত:" : "Phenotypic Ratio:"}</div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
                    <span className="text-xs">3 {lang === "bn" ? "লম্বা" : "Tall"}</span>
                  </div>
                  <span className="text-xs">:</span>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-1"></div>
                    <span className="text-xs">1 {lang === "bn" ? "খাটো" : "Short"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 border-2 border-violet-200 dark:border-violet-800">
            <CardContent className="pt-4">
              <h4 className="font-bold text-violet-800 dark:text-violet-200 mb-3 flex items-center">
                <div className="w-3 h-3 bg-violet-500 rounded-full mr-2"></div>
                {lang === "bn" ? "ডাইহাইব্রিড সংকর" : "Dihybrid Cross"}
              </h4>
              <p className="text-sm text-violet-700 dark:text-violet-300 mb-3">
                {lang === "bn" 
                  ? "দুটি বৈশিষ্ট্যের জন্য জিনোটাইপ ও ফিনোটাইপ পূর্বাভাস। উদাহরণ: উচ্চতা ও বীজের রঙ।"
                  : "Predicts genotypes and phenotypes for two traits. Example: Height and seed color."}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="text-xs font-semibold mb-2">{lang === "bn" ? "ফিনোটাইপিক অনুপাত:" : "Phenotypic Ratio:"}</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                    <span>9 {lang === "bn" ? "লম্বা,হলুদ" : "T,Y"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-lime-500 rounded mr-1"></div>
                    <span>3 {lang === "bn" ? "লম্বা,সবুজ" : "T,G"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                    <span>3 {lang === "bn" ? "খাটো,হলুদ" : "S,Y"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                    <span>1 {lang === "bn" ? "খাটো,সবুজ" : "S,G"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Learning Section */}
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-2 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-indigo-800 dark:text-indigo-200 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              {lang === "bn" ? "ইন্টারঅ্যাক্টিভ শিক্ষণ গাইড" : "Interactive Learning Guide"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Play className="h-4 w-4 text-green-600 mr-2" />
                  <h5 className="font-semibold text-sm">{lang === "bn" ? "ধাপ ১: অ্যানিমেশন চালান" : "Step 1: Start Animation"}</h5>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "Play বাটনে ক্লিক করে Punnett Square-এর ঘরগুলো হাইলাইট হতে দেখুন।"
                    : "Click Play to watch the Punnett Square cells highlight sequentially."}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Eye className="h-4 w-4 text-blue-600 mr-2" />
                  <h5 className="font-semibold text-sm">{lang === "bn" ? "ধাপ ২: ফিনোটাইপ টগল করুন" : "Step 2: Toggle Phenotypes"}</h5>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "জিনোটাইপ ও ফিনোটাইপের মধ্যে পার্থক্য বুঝতে Phenotypes বাটন ব্যবহার করুন।"
                    : "Use the Phenotypes button to understand the difference between genotypes and phenotypes."}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shuffle className="h-4 w-4 text-purple-600 mr-2" />
                  <h5 className="font-semibold text-sm">{lang === "bn" ? "ধাপ ৩: পরীক্ষা করুন" : "Step 3: Experiment"}</h5>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {lang === "bn" 
                    ? "বিভিন্ন সেটিংস পরিবর্তন করে মেন্ডেলের নিয়মগুলো অন্বেষণ করুন।"
                    : "Change different settings to explore Mendel's laws of inheritance."}
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-lg">
              <h5 className="font-semibold text-sm mb-2 text-orange-800 dark:text-orange-200">
                {lang === "bn" ? "💡 শিক্ষামূলক টিপস:" : "💡 Educational Tips:"}
              </h5>
              <ul className="text-xs space-y-1 text-orange-700 dark:text-orange-300">
                <li>• {lang === "bn" ? "বড় অক্ষর প্রভাবী অ্যালিল (A) এবং ছোট অক্ষর প্রচ্ছন্ন অ্যালিল (a) নির্দেশ করে।" : "Capital letters represent dominant alleles (A) and lowercase represent recessive alleles (a)."}</li>
                <li>• {lang === "bn" ? "ফিনোটাইপ হল বাহ্যিক বৈশিষ্ট্য যা আমরা দেখতে পাই।" : "Phenotype is the observable trait that we can see."}</li>
                <li>• {lang === "bn" ? "জিনোটাইপ হল অ্যালিলের সংমিশ্রণ যা বৈশিষ্ট্য নির্ধারণ করে।" : "Genotype is the combination of alleles that determines the trait."}</li>
                <li>• {lang === "bn" ? "সম্ভাব্যতা দেখায় কোন বৈশিষ্ট্য কতটা সাধারণভাবে প্রকাশ পাবে।" : "Probabilities show how commonly each trait will appear in offspring."}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}