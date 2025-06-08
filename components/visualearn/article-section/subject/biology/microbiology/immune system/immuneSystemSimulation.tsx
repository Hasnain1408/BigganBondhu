import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye, Zap, Shield } from "lucide-react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  type: string
}

interface Cell {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  color: string
  type: string
  activated: boolean
  pulsePhase: number
}

export default function EnhancedImmuneSystemSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [immuneResponse, setImmuneResponse] = useState<"innate" | "adaptive">("innate")
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [cells, setCells] = useState<Cell[]>([])
  const [pathogens, setPathogens] = useState<Cell[]>([])
  const [showParticles, setShowParticles] = useState(true)
  const [intensity, setIntensity] = useState(5)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  // Initialize cells and pathogens
  useEffect(() => {
    const initCells = () => {
      const newCells: Cell[] = []
      const newPathogens: Cell[] = []
      
      if (immuneResponse === "innate") {
        // Phagocytes
        for (let i = 0; i < 3; i++) {
          newCells.push({
            x: 100 + i * 60,
            y: centerY + 80,
            targetX: centerX - 100 + Math.random() * 200,
            targetY: centerY - 50 + Math.random() * 100,
            size: 35 + Math.random() * 10,
            color: "#32CD32",
            type: "phagocyte",
            activated: false,
            pulsePhase: Math.random() * Math.PI * 2
          })
        }
        
        // Neutrophils
        for (let i = 0; i < 2; i++) {
          newCells.push({
            x: 600 + i * 50,
            y: centerY + 100,
            targetX: centerX + 50 + Math.random() * 100,
            targetY: centerY + Math.random() * 80,
            size: 25 + Math.random() * 8,
            color: "#FFB347",
            type: "neutrophil",
            activated: false,
            pulsePhase: Math.random() * Math.PI * 2
          })
        }
      } else {
        // B-cells
        for (let i = 0; i < 2; i++) {
          newCells.push({
            x: 80 + i * 100,
            y: centerY + 60,
            targetX: centerX - 120 + i * 80,
            targetY: centerY + 40,
            size: 40,
            color: "#6A5ACD",
            type: "b-cell",
            activated: false,
            pulsePhase: Math.random() * Math.PI * 2
          })
        }
        
        // T-cells
        for (let i = 0; i < 2; i++) {
          newCells.push({
            x: 600 + i * 70,
            y: centerY + 80,
            targetX: centerX + 80 + i * 60,
            targetY: centerY + 20,
            size: 35,
            color: "#FF6B6B",
            type: "t-cell",
            activated: false,
            pulsePhase: Math.random() * Math.PI * 2
          })
        }
      }
      
      // Pathogens
      for (let i = 0; i < intensity; i++) {
        newPathogens.push({
          x: centerX - 50 + Math.random() * 100,
          y: centerY - 30 + Math.random() * 60,
          targetX: centerX - 50 + Math.random() * 100,
          targetY: centerY - 30 + Math.random() * 60,
          size: 20 + Math.random() * 15,
          color: `hsl(${15 + Math.random() * 30}, 80%, 50%)`,
          type: "pathogen",
          activated: Math.random() > 0.7,
          pulsePhase: Math.random() * Math.PI * 2
        })
      }
      
      setCells(newCells)
      setPathogens(newPathogens)
    }
    
    initCells()
  }, [immuneResponse, intensity])

  const createParticle = (x: number, y: number, type: string) => {
    const colors = {
      destruction: "#FF4500",
      antibody: "#FFD700",
      cytokine: "#00CED1",
      debris: "#8B4513"
    }
    
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: 3 + Math.random() * 5,
      color: colors[type as keyof typeof colors] || "#FFF",
      life: 60 + Math.random() * 40,
      maxLife: 100,
      type
    }
  }

  const updateParticles = () => {
    if (!showParticles) return
    
    setParticles(prev => {
      const updated = prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1,
        vx: p.vx * 0.98,
        vy: p.vy * 0.98
      })).filter(p => p.life > 0)
      
      // Add new particles randomly
      if (Math.random() < 0.3 && isPlaying) {
        const newParticles: { x: number; y: number; vx: number; vy: number; size: number; color: string; life: number; maxLife: number; type: string }[] = []
        
        // Add particles around active cells
        cells.forEach(cell => {
          if (cell.activated && Math.random() < 0.4) {
            newParticles.push(createParticle(
              cell.x + (Math.random() - 0.5) * 60,
              cell.y + (Math.random() - 0.5) * 60,
              immuneResponse === "innate" ? "destruction" : "antibody"
            ))
          }
        })
        
        // Add particles around pathogens
        pathogens.forEach(pathogen => {
          if (Math.random() < 0.2) {
            newParticles.push(createParticle(
              pathogen.x + (Math.random() - 0.5) * 40,
              pathogen.y + (Math.random() - 0.5) * 40,
              "cytokine"
            ))
          }
        })
        
        return [...updated, ...newParticles]
      }
      
      return updated
    })
  }

  const updateCells = () => {
    setCells(prev => prev.map(cell => {
      // Move towards target with some randomness
      const dx = cell.targetX - cell.x
      const dy = cell.targetY - cell.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 5) {
        cell.x += (dx / distance) * (2 + Math.random())
        cell.y += (dy / distance) * (2 + Math.random())
      } else {
        // Set new random target
        cell.targetX = centerX - 150 + Math.random() * 300
        cell.targetY = centerY - 100 + Math.random() * 200
      }
      
      // Check for pathogen interaction
      const nearPathogen = pathogens.some(pathogen => {
        const pdx = pathogen.x - cell.x
        const pdy = pathogen.y - cell.y
        return Math.sqrt(pdx * pdx + pdy * pdy) < cell.size + pathogen.size
      })
      
      cell.activated = nearPathogen || (cell.activated && Math.random() < 0.98)
      cell.pulsePhase += 0.1
      
      return cell
    }))
    
    setPathogens(prev => prev.map(pathogen => {
      // Random movement for pathogens
      if (Math.random() < 0.1) {
        pathogen.targetX = centerX - 80 + Math.random() * 160
        pathogen.targetY = centerY - 60 + Math.random() * 120
      }
      
      const dx = pathogen.targetX - pathogen.x
      const dy = pathogen.targetY - pathogen.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 2) {
        pathogen.x += (dx / distance) * 0.5
        pathogen.y += (dy / distance) * 0.5
      }
      
      pathogen.pulsePhase += 0.08
      
      return pathogen
    }))
  }

  const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell) => {
    const pulseSize = cell.activated ? Math.sin(cell.pulsePhase) * 5 : 0
    const currentSize = cell.size + pulseSize
    
    // Glow effect for activated cells
    if (cell.activated) {
      ctx.shadowColor = cell.color
      ctx.shadowBlur = 15
    }
    
    ctx.fillStyle = cell.color
    ctx.beginPath()
    ctx.arc(cell.x, cell.y, currentSize, 0, Math.PI * 2)
    ctx.fill()
    
    // Inner highlight
    ctx.fillStyle = `rgba(255, 255, 255, ${cell.activated ? 0.6 : 0.3})`
    ctx.beginPath()
    ctx.arc(cell.x - currentSize * 0.3, cell.y - currentSize * 0.3, currentSize * 0.4, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.shadowBlur = 0
    
    // Labels
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      const labels = {
        en: {
          phagocyte: "Phagocyte",
          neutrophil: "Neutrophil",
          "b-cell": "B-Cell",
          "t-cell": "T-Cell"
        },
        bn: {
          phagocyte: "ফাগোসাইট",
          neutrophil: "নিউট্রোফিল",
          "b-cell": "বি-কোষ",
          "t-cell": "টি-কোষ"
        }
      }
      ctx.fillText(labels[lang][cell.type as keyof typeof labels.en], cell.x, cell.y + currentSize + 15)
    }
  }

  const drawPathogen = (ctx: CanvasRenderingContext2D, pathogen: Cell) => {
    const pulseSize = Math.sin(pathogen.pulsePhase) * 3
    const currentSize = pathogen.size + pulseSize
    
    // Pathogen with spikes
    ctx.fillStyle = pathogen.color
    ctx.beginPath()
    ctx.arc(pathogen.x, pathogen.y, currentSize, 0, Math.PI * 2)
    ctx.fill()
    
    // Spikes
    ctx.strokeStyle = pathogen.color
    ctx.lineWidth = 2
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const spikeLength = currentSize * 0.4
      ctx.beginPath()
      ctx.moveTo(
        pathogen.x + Math.cos(angle) * currentSize,
        pathogen.y + Math.sin(angle) * currentSize
      )
      ctx.lineTo(
        pathogen.x + Math.cos(angle) * (currentSize + spikeLength),
        pathogen.y + Math.sin(angle) * (currentSize + spikeLength)
      )
      ctx.stroke()
    }
    
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(lang === "bn" ? "প্যাথোজেন" : "Pathogen", pathogen.x, pathogen.y - currentSize - 10)
    }
  }

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const alpha = particle.life / particle.maxLife
    ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawAntibodies = (ctx: CanvasRenderingContext2D, time: number) => {
    if (immuneResponse !== "adaptive") return
    
    cells.filter(cell => cell.type === "b-cell" && cell.activated).forEach(bCell => {
      for (let i = 0; i < 3; i++) {
        const angle = time * 0.02 + i * (Math.PI * 2 / 3)
        const radius = 60 + Math.sin(time * 0.03) * 10
        const x = bCell.x + Math.cos(angle) * radius
        const y = bCell.y + Math.sin(angle) * radius
        
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
        
        // Y-shaped antibody
        ctx.strokeStyle = "#FFD700"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(x, y - 8)
        ctx.lineTo(x - 6, y + 6)
        ctx.moveTo(x, y - 8)
        ctx.lineTo(x + 6, y + 6)
        ctx.moveTo(x, y - 8)
        ctx.lineTo(x, y + 8)
        ctx.stroke()
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(1, "#e2e8f0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Title
    ctx.fillStyle = "#1e293b"
    ctx.font = "bold 18px Arial"
    ctx.textAlign = "center"
    const title = lang === "bn" 
      ? (immuneResponse === "innate" ? "সহজাত ইমিউন প্রতিক্রিয়া" : "অভিযোজিত ইমিউন প্রতিক্রিয়া")
      : (immuneResponse === "innate" ? "Innate Immune Response" : "Adaptive Immune Response")
    ctx.fillText(title, centerX, 30)

    // Draw all elements
    pathogens.forEach(pathogen => drawPathogen(ctx, pathogen))
    cells.forEach(cell => drawCell(ctx, cell))
    drawAntibodies(ctx, animationTime)
    particles.forEach(particle => drawParticle(ctx, particle))

    // Information panel
    ctx.fillStyle = "rgba(15, 23, 42, 0.9)"
    ctx.fillRect(10, 10, 280, 140)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `প্রতিক্রিয়া: ${immuneResponse === "innate" ? "সহজাত" : "অভিযোজিত"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `প্যাথোজেন সংখ্যা: ${pathogens.length}`,
      `সক্রিয় কোষ: ${cells.filter(c => c.activated).length}`,
      `কণা: ${particles.length}`,
      `তীব্রতা: ${intensity}/10`
    ] : [
      `Response: ${immuneResponse.charAt(0).toUpperCase() + immuneResponse.slice(1)}`,
      `Speed: ${animationSpeed.toFixed(1)}x`,
      `Pathogens: ${pathogens.length}`,
      `Active Cells: ${cells.filter(c => c.activated).length}`,
      `Particles: ${particles.length}`,
      `Intensity: ${intensity}/10`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 18)
    })

    if (isPlaying) {
      setAnimationTime(prev => prev + animationSpeed)
      updateCells()
      updateParticles()
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
  }, [isPlaying, immuneResponse, showLabels, animationSpeed, animationTime, lang, particles, cells, pathogens, showParticles, intensity])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setParticles([])
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" size="sm">
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
          <Button onClick={reset} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট" : "Reset"}
          </Button>
          <Button 
            onClick={() => setShowLabels(!showLabels)} 
            variant={showLabels ? "default" : "outline"}
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "লেবেল" : "Labels"}
          </Button>
          <Button 
            onClick={() => setShowParticles(!showParticles)} 
            variant={showParticles ? "default" : "outline"}
            size="sm"
          >
            <Zap className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "কণা" : "Particles"}
          </Button>
          <Button 
            onClick={() => setImmuneResponse(immuneResponse === "innate" ? "adaptive" : "innate")} 
            variant="outline"
            size="sm"
          >
            <Shield className="h-4 w-4 mr-2" />
            {lang === "bn" ? "পরিবর্তন" : "Switch"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-xs text-muted-foreground">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">{lang === "bn" ? "সংক্রমণ তীব্রতা" : "Infection Intensity"}</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[intensity]}
                onValueChange={(v) => setIntensity(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-xs text-muted-foreground">{intensity}/10</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">{lang === "bn" ? "ইমিউন প্রতিক্রিয়া" : "Immune Response"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={immuneResponse === "innate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImmuneResponse("innate")}
                >
                  {lang === "bn" ? "সহজাত" : "Innate"}
                </Button>
                <Button
                  variant={immuneResponse === "adaptive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImmuneResponse("adaptive")}
                >
                  {lang === "bn" ? "অভিযোজিত" : "Adaptive"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                {lang === "bn" ? "সহজাত ইমিউনিটি" : "Innate Immunity"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "তাৎক্ষণিক, অ-নির্দিষ্ট প্রতিরক্ষা। ফাগোসাইট এবং নিউট্রোফিল প্যাথোজেনগুলি গ্রাস করে।"
                  : "Immediate, non-specific defense. Phagocytes and neutrophils engulf pathogens rapidly."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                {lang === "bn" ? "অভিযোজিত ইমিউনিটি" : "Adaptive Immunity"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "নির্দিষ্ট, দীর্ঘমেয়াদী প্রতিক্রিয়া। বি-কোষ অ্যান্টিবডি তৈরি করে, টি-কোষ সংক্রমিত কোষ ধ্বংস করে।"
                  : "Specific, long-term response. B-cells produce antibodies, T-cells destroy infected cells."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Language Selection:"}
          </p>
          <div className="flex gap-2">
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