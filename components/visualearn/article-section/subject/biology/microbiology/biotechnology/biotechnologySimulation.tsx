import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye, Zap, Microscope, Dna, Settings } from "lucide-react"

export default function EnhancedBiotechnologySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [process, setProcess] = useState<"geneEditing" | "tissueCulture" | "recombinantDNA" | "proteinSynthesis">("geneEditing")
  const [showLabels, setShowLabels] = useState(true)
  const [showParticles, setShowParticles] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number, color: string}>>([])

  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  // Enhanced particle system
  const createParticle = (x: number, y: number, color: string) => ({
    x, y,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    life: 60,
    color
  })

  const updateParticles = () => {
    setParticles(prev => prev
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1
      }))
      .filter(p => p.life > 0)
    )
  }

  const drawGradientBackground = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, "#0f172a")
    gradient.addColorStop(0.5, "#1e293b")
    gradient.addColorStop(1, "#334155")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const drawGlow = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, "transparent")
    ctx.fillStyle = gradient
    ctx.fillCircle(x, y, radius)
  }

  const drawDNAHelix = (ctx: CanvasRenderingContext2D, startX: number, startY: number, length: number, time: number) => {
    const segments = 30
    ctx.lineWidth = 3
    
    for (let i = 0; i < segments; i++) {
      const x = startX + (i / segments) * length
      const y1 = startY + 30 * Math.sin(time * 0.02 + i * 0.3)
      const y2 = startY + 30 * Math.sin(time * 0.02 + i * 0.3 + Math.PI)
      
      // DNA strands with gradient
      const gradient1 = ctx.createLinearGradient(x, y1 - 15, x, y1 + 15)
      gradient1.addColorStop(0, "#3b82f6")
      gradient1.addColorStop(1, "#1d4ed8")
      ctx.strokeStyle = gradient1
      ctx.beginPath()
      ctx.moveTo(x, y1 - 15)
      ctx.lineTo(x, y1 + 15)
      ctx.stroke()
      
      const gradient2 = ctx.createLinearGradient(x, y2 - 15, x, y2 + 15)
      gradient2.addColorStop(0, "#ef4444")
      gradient2.addColorStop(1, "#dc2626")
      ctx.strokeStyle = gradient2
      ctx.beginPath()
      ctx.moveTo(x, y2 - 15)
      ctx.lineTo(x, y2 + 15)
      ctx.stroke()
      
      // Base pairs
      if (i % 3 === 0) {
        ctx.strokeStyle = "#fbbf24"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y1)
        ctx.lineTo(x, y2)
        ctx.stroke()
      }
    }
  }

  const drawGeneEditing = (ctx: CanvasRenderingContext2D, time: number) => {
    drawGradientBackground(ctx)
    
    // Title with glow effect
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    drawGlow(ctx, centerX, 40, 100, "rgba(59, 130, 246, 0.3)")
    ctx.fillText(lang === "bn" ? "জিন সম্পাদনা (CRISPR)" : "Gene Editing (CRISPR)", centerX, 40)

    // Enhanced DNA visualization
    drawDNAHelix(ctx, centerX - 200, centerY - 50, 400, time)
    
    if (showLabels) {
      ctx.fillStyle = "#60a5fa"
      ctx.font = "16px Arial"
      ctx.fillText("DNA Double Helix", centerX - 220, centerY - 80)
    }

    // Animated CRISPR-Cas9 complex
    const casX = centerX - 150 + Math.sin(time * 0.02) * 100
    const casY = centerY + Math.cos(time * 0.015) * 20
    
    // Cas9 protein with 3D effect
    drawGlow(ctx, casX, casY, 40, "rgba(255, 215, 0, 0.4)")
    ctx.fillStyle = "#ffd700"
    ctx.fillCircle(casX, casY, 20)
    ctx.fillStyle = "#ff8c00"
    ctx.fillCircle(casX - 5, casY - 5, 15)
    
    // Guide RNA
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(casX - 30, casY)
    ctx.quadraticCurveTo(casX - 50, casY - 20, casX - 70, casY)
    ctx.stroke()
    
    if (showLabels) {
      ctx.fillStyle = "#fbbf24"
      ctx.font = "14px Arial"
      ctx.fillText("Cas9", casX, casY - 30)
      ctx.fillStyle = "#10b981"
      ctx.fillText("Guide RNA", casX - 70, casY - 20)
    }

    // Cutting animation with sparks
    if (Math.sin(time * 0.05) > 0.8) {
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(casX, casY - 30)
      ctx.lineTo(casX, casY + 30)
      ctx.stroke()
      
      // Add particle effects
      if (showParticles) {
        setParticles(prev => [...prev, 
          ...Array.from({length: 3}, () => createParticle(casX, casY, "#ef4444"))
        ])
      }
    }
  }

  const drawTissueCulture = (ctx: CanvasRenderingContext2D, time: number) => {
    drawGradientBackground(ctx)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    drawGlow(ctx, centerX, 40, 100, "rgba(34, 197, 94, 0.3)")
    ctx.fillText(lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture", centerX, 40)

    // Enhanced petri dish with 3D effect
    const dishRadius = 120
    drawGlow(ctx, centerX, centerY, dishRadius + 30, "rgba(59, 130, 246, 0.2)")
    
    // Dish base
    ctx.fillStyle = "#e2e8f0"
    ctx.fillCircle(centerX, centerY, dishRadius)
    
    // Dish rim
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 6
    ctx.strokeCircle(centerX, centerY, dishRadius)
    
    // Growth medium
    ctx.fillStyle = "rgba(34, 197, 94, 0.3)"
    ctx.fillCircle(centerX, centerY, dishRadius - 10)
    
    if (showLabels) {
      ctx.fillStyle = "#64748b"
      ctx.font = "16px Arial"
      ctx.fillText(lang === "bn" ? "পেট্রি ডিশ" : "Petri Dish", centerX, centerY - 150)
    }

    // Animated cell colonies with pulsing effect
    const colonies = 8
    for (let i = 0; i < colonies; i++) {
      const angle = (i / colonies) * Math.PI * 2 + time * 0.01
      const radius = 60 + Math.sin(time * 0.03 + i) * 20
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const cellSize = 15 + Math.sin(time * 0.05 + i) * 5
      
      drawGlow(ctx, x, y, cellSize + 10, "rgba(34, 197, 94, 0.4)")
      ctx.fillStyle = "#22c55e"
      ctx.fillCircle(x, y, cellSize)
      
      // Cell division animation
      if (Math.sin(time * 0.04 + i) > 0.9) {
        ctx.fillStyle = "#16a34a"
        ctx.fillCircle(x - 5, y, cellSize * 0.7)
        ctx.fillCircle(x + 5, y, cellSize * 0.7)
        
        if (showParticles) {
          setParticles(prev => [...prev, createParticle(x, y, "#22c55e")])
        }
      }
    }
    
    if (showLabels) {
      ctx.fillStyle = "#22c55e"
      ctx.font = "14px Arial" 
      ctx.fillText(lang === "bn" ? "উদ্ভিদ কোষের কলোনি" : "Plant Cell Colonies", centerX, centerY + 180)
    }
  }

  const drawRecombinantDNA = (ctx: CanvasRenderingContext2D, time: number) => {
    drawGradientBackground(ctx)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    drawGlow(ctx, centerX, 40, 100, "rgba(147, 51, 234, 0.3)")
    ctx.fillText(lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA", centerX, 40)

    // Animated bacterial plasmid with rotation
    const rotation = time * 0.02
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotation)
    
    // Plasmid with gradient
    const plasmidGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 60)
    plasmidGradient.addColorStop(0, "#a855f7")
    plasmidGradient.addColorStop(1, "#7c3aed")
    ctx.fillStyle = plasmidGradient
    ctx.fillCircle(0, 0, 60)
    
    // Plasmid features
    ctx.strokeStyle = "#c084fc"
    ctx.lineWidth = 3
    ctx.strokeCircle(0, 0, 60)
    ctx.strokeCircle(0, 0, 40)
    
    // Restriction sites
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const x = Math.cos(angle) * 50
      const y = Math.sin(angle) * 50
      ctx.fillStyle = "#fbbf24"
      ctx.fillRect(x - 3, y - 3, 6, 6)
    }
    
    ctx.restore()
    
    if (showLabels) {
      ctx.fillStyle = "#a855f7"
      ctx.font = "16px Arial"
      ctx.fillText(lang === "bn" ? "ব্যাকটেরিয়াল প্লাজমিড" : "Bacterial Plasmid", centerX, centerY - 100)
    }

    // Foreign DNA insertion animation
    const insertionProgress = (Math.sin(time * 0.03) + 1) / 2
    const foreignX = centerX - 200 + insertionProgress * 150
    const foreignY = centerY + Math.sin(time * 0.04) * 20
    
    // Foreign DNA with glow
    drawGlow(ctx, foreignX, foreignY, 25, "rgba(239, 68, 68, 0.4)")
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(foreignX - 15, foreignY - 10, 30, 20)
    
    // DNA sequence visualization
    ctx.fillStyle = "#fbbf24"
    ctx.font = "10px monospace"
    ctx.fillText("ATCG", foreignX - 10, foreignY + 3)
    
    if (showLabels) {
      ctx.fillStyle = "#ef4444"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "বিদেশী ডিএনএ" : "Foreign DNA", foreignX, foreignY - 25)
    }

    // Insertion effect
    if (insertionProgress > 0.8) {
      drawGlow(ctx, centerX, centerY, 80, "rgba(255, 255, 255, 0.3)")
      if (showParticles) {
        setParticles(prev => [...prev, 
          ...Array.from({length: 2}, () => createParticle(centerX, centerY, "#a855f7"))
        ])
      }
    }
  }

  const drawProteinSynthesis = (ctx: CanvasRenderingContext2D, time: number) => {
    drawGradientBackground(ctx)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    drawGlow(ctx, centerX, 40, 100, "rgba(236, 72, 153, 0.3)")
    ctx.fillText(lang === "bn" ? "প্রোটিন সংশ্লেষণ" : "Protein Synthesis", centerX, 40)

    // mRNA strand
    ctx.strokeStyle = "#ec4899"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(100, centerY)
    ctx.lineTo(canvasWidth - 100, centerY)
    ctx.stroke()
    
    // Ribosome animation
    const ribosomeX = 150 + (time * animationSpeed * 2) % (canvasWidth - 300)
    drawGlow(ctx, ribosomeX, centerY, 50, "rgba(34, 197, 94, 0.3)")
    
    // Large ribosomal subunit
    ctx.fillStyle = "#22c55e"
    ctx.fillCircle(ribosomeX, centerY - 15, 25)
    
    // Small ribosomal subunit
    ctx.fillStyle = "#16a34a"
    ctx.fillCircle(ribosomeX, centerY + 15, 20)
    
    // tRNA molecules
    const tRNAs = 3
    for (let i = 0; i < tRNAs; i++) {
      const tX = ribosomeX + (i - 1) * 40
      const tY = centerY - 60 + Math.sin(time * 0.05 + i) * 10
      
      ctx.fillStyle = "#f59e0b"
      ctx.fillCircle(tX, tY, 8)
      
      // Amino acid
      ctx.fillStyle = "#dc2626"
      ctx.fillCircle(tX, tY - 15, 5)
    }
    
    // Growing protein chain
    const proteinLength = Math.floor((ribosomeX - 150) / 20)
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(ribosomeX + 30, centerY)
    for (let i = 0; i < proteinLength; i++) {
      const x = ribosomeX + 30 + i * 15
      const y = centerY + Math.sin(i * 0.5) * 20
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    
    if (showLabels) {
      ctx.fillStyle = "#ec4899"
      ctx.font = "14px Arial"
      ctx.fillText("mRNA", 120, centerY - 20)
      ctx.fillStyle = "#22c55e"
      ctx.fillText("Ribosome", ribosomeX, centerY + 60)
    }
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    if (!showParticles) return
    
    particles.forEach(particle => {
      const alpha = particle.life / 60
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
      ctx.fillCircle(particle.x, particle.y, 3 * alpha)
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    ctx.save()
    ctx.scale(zoom, zoom)

    switch (process) {
      case "geneEditing":
        drawGeneEditing(ctx, animationTime)
        break
      case "tissueCulture":
        drawTissueCulture(ctx, animationTime)
        break
      case "recombinantDNA":
        drawRecombinantDNA(ctx, animationTime)
        break
      case "proteinSynthesis":
        drawProteinSynthesis(ctx, animationTime)
        break
    }

    drawParticles(ctx)
    ctx.restore()

    // Enhanced info panel with glassmorphism effect
    ctx.fillStyle = "rgba(15, 23, 42, 0.8)"
    ctx.fillRect(20, 20, 280, 140)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1
    ctx.strokeRect(20, 20, 280, 140)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = "16px Arial"
    ctx.textAlign = "left"
    
    const processNames = {
      geneEditing: lang === "bn" ? "জিন সম্পাদনা" : "Gene Editing",
      tissueCulture: lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture",
      recombinantDNA: lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA",
      proteinSynthesis: lang === "bn" ? "প্রোটিন সংশ্লেষণ" : "Protein Synthesis"
    }
    
    const info = lang === "bn" ? [
      `প্রক্রিয়া: ${processNames[process]}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `জুম: ${(zoom * 100).toFixed(0)}%`,
      `লেবেল: ${showLabels ? "দৃশ্যমান" : "অদৃশ্য"}`,
      `কণা প্রভাব: ${showParticles ? "সক্রিয়" : "নিষ্ক্রিয়"}`
    ] : [
      `Process: ${processNames[process]}`,
      `Speed: ${animationSpeed.toFixed(1)}x`,
      `Zoom: ${(zoom * 100).toFixed(0)}%`,
      `Labels: ${showLabels ? "On" : "Off"}`,
      `Particles: ${showParticles ? "On" : "Off"}`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 35, 50 + index * 22)
    })

    if (isPlaying) {
      setAnimationTime(prev => prev + animationSpeed)
      updateParticles()
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ;(ctx as any).fillCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.fill()
        }
        ;(ctx as any).strokeCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.stroke()
        }
      }
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, process, showLabels, showParticles, animationSpeed, zoom, animationTime, lang, particles])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setProcess("geneEditing")
    setShowLabels(true)
    setShowParticles(true)
    setAnimationSpeed(1)
    setZoom(1)
    setParticles([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <Card className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="pt-6 space-y-6">
          <div className="aspect-video bg-black/20 rounded-lg overflow-hidden border border-white/10">
            <canvas 
              ref={canvasRef} 
              width={canvasWidth} 
              height={canvasHeight} 
              className="w-full h-full cursor-pointer"
            />
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <Button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
            
            <Button onClick={reset} variant="outline" className="border-white/20 hover:bg-white/10">
              <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "রিসেট" : "Reset"}
            </Button>
            
            <Button 
              onClick={() => setShowLabels(!showLabels)} 
              variant={showLabels ? "default" : "outline"}
              className={showLabels ? "bg-emerald-600 hover:bg-emerald-700" : "border-white/20 hover:bg-white/10"}
            >
              <Eye className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "লেবেল" : "Labels"}
            </Button>
            
            <Button 
              onClick={() => setShowParticles(!showParticles)} 
              variant={showParticles ? "default" : "outline"}
              className={showParticles ? "bg-amber-600 hover:bg-amber-700" : "border-white/20 hover:bg-white/10"}
            >
              <Zap className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "কণা প্রভাব" : "Particles"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/5 backdrop-blur border-white/10">
              <CardContent className="pt-4">
                <Label className="text-white/80 text-sm flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}
                </Label>
                <Slider
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[animationSpeed]}
                  onValueChange={(v) => setAnimationSpeed(v[0])}
                  className="mt-2"
                />
                <p className="text-right mt-1 text-sm text-white/60">{animationSpeed.toFixed(1)}x</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur border-white/10">
              <CardContent className="pt-4">
                <Label className="text-white/80 text-sm flex items-center gap-2">
                  <Microscope className="h-4 w-4" />
                  {lang === "bn" ? "জুম স্তর" : "Zoom Level"}
                </Label>
                <Slider
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[zoom]}
                  onValueChange={(v) => setZoom(v[0])}
                  className="mt-2"
                />
                <p className="text-right mt-1 text-sm text-white/60">{(zoom * 100).toFixed(0)}%</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur border-white/10 md:col-span-2">
              <CardContent className="pt-4">
                <Label className="text-white/80 text-sm flex items-center gap-2">
                  <Dna className="h-4 w-4" />
                  {lang === "bn" ? "জৈবপ্রযুক্তি প্রক্রিয়া" : "Biotechnology Process"}
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { key: "geneEditing", label: lang === "bn" ? "জিন সম্পাদনা" : "Gene Editing" },
                    { key: "tissueCulture", label: lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture" },
                    { key: "recombinantDNA", label: lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA" },
                    { key: "proteinSynthesis", label: lang === "bn" ? "প্রোটিন সংশ্লেষণ" : "Protein Synthesis" }
                  ].map(({ key, label }) => (
                    <Button
                      key={key}
                      variant={process === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setProcess(key as any)}
                      className={process === key 
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700" 
                        : "border-white/20 hover:bg-white/10 text-white/80"
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: lang === "bn" ? "জিন সম্পাদনা" : "Gene Editing",
                desc: lang === "bn" ? "CRISPR দিয়ে নির্দিষ্ট জিন সম্পাদনা" : "Precise gene modification using CRISPR",
                gradient: "from-blue-500/20 to-blue-600/20",
                border: "border-blue-400/30"
              },
              {
                title: lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture",
                desc: lang === "bn" ? "নিয়ন্ত্রিত পরিবেশে কোষ বৃদ্ধি" : "Growing cells in controlled environment",
                gradient: "from-green-500/20 to-green-600/20",
                border: "border-green-400/30"
              },
              {
                title: lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA",
                desc: lang === "bn" ? "বিদেশী ডিএনএ সংযোজন প্রযুক্তি" : "Foreign DNA insertion technology",
                gradient: "from-purple-500/20 to-purple-600/20",
                border: "border-purple-400/30"
              },
              {
                title: lang === "bn" ? "প্রোটিন সংশ্লেষণ" : "Protein Synthesis",
                desc: lang === "bn" ? "রাইবোসোমে প্রোটিন তৈরির প্রক্রিয়া" : "Ribosomal protein production process",
                gradient: "from-pink-500/20 to-pink-600/20",
                border: "border-pink-400/30"
              }
            ].map((item, index) => (
              <Card key={index} className={`bg-gradient-to-br ${item.gradient} backdrop-blur border ${item.border}`}>
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-white mb-2 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/70">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white/5 backdrop-blur border-white/10">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Label className="text-white/80 text-sm">
                  {lang === "bn" ? "ভাষা নির্বাচন:" : "Language Selection:"}
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={lang === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLang("en")}
                    className={lang === "en" 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" 
                      : "border-white/20 hover:bg-white/10 text-white/80"
                    }
                  >
                    English
                  </Button>
                  <Button
                    variant={lang === "bn" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLang("bn")}
                    className={lang === "bn" 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" 
                      : "border-white/20 hover:bg-white/10 text-white/80"
                    }
                  >
                    বাংলা
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-white/60 text-sm">
              {lang === "bn" 
                ? "একটি ইন্টারঅ্যাক্টিভ জৈবপ্রযুক্তি সিমুলেশন - Claude দ্বারা উন্নত" 
                : "Interactive Biotechnology Simulation - Enhanced by Claude"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}