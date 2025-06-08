"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye, Zap, Settings } from "lucide-react"

export default function EnhancedMicroorganismsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [microbeType, setMicrobeType] = useState<"bacteria" | "virus" | "fungi">("bacteria")
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [showDetails, setShowDetails] = useState(true)
  const [interactionMode, setInteractionMode] = useState(false)
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number}>>([])

  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  // Enhanced particle system for environmental effects
  const createParticles = (x: number, y: number, count: number = 5) => {
    const newParticles: { x: number; y: number; vx: number; vy: number; life: number }[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 60
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particles.forEach(particle => {
      const alpha = particle.life / 60
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
      ctx.fill()
    })
    
    // Update particles
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

  const drawEnhancedBacteria = (ctx: CanvasRenderingContext2D, time: number) => {
    // Gradient background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300)
    gradient.addColorStop(0, "#E8F5E8")
    gradient.addColorStop(1, "#F0F8F0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Animated grid pattern
    ctx.strokeStyle = "rgba(0, 100, 0, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i < canvasWidth; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i + Math.sin(time * 0.01) * 2, 0)
      ctx.lineTo(i + Math.sin(time * 0.01) * 2, canvasHeight)
      ctx.stroke()
    }
    for (let i = 0; i < canvasHeight; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i + Math.cos(time * 0.01) * 2)
      ctx.lineTo(canvasWidth, i + Math.cos(time * 0.01) * 2)
      ctx.stroke()
    }

    ctx.fillStyle = "#333"
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ব্যাকটেরিয়া কলোনি সিমুলেশন" : "Bacterial Colony Simulation", centerX, 35)

    // Multiple bacteria with different phases
    const bacteriaCount = 6
    const splitProgress = (time % 120) / 120
    
    for (let i = 0; i < bacteriaCount; i++) {
      const angle = (i / bacteriaCount) * Math.PI * 2
      const baseX = centerX + Math.cos(angle) * 120
      const baseY = centerY + Math.sin(angle) * 80
      const phaseOffset = i * 20
      const localTime = time + phaseOffset
      const localSplit = ((localTime % 120) / 120)

      // Pulsing effect
      const pulse = 1 + Math.sin(localTime * 0.1) * 0.1
      const size = 35 * pulse

      if (localSplit < 0.7) {
        // Single bacterium with organelles
        const bacteriumGradient = ctx.createRadialGradient(baseX, baseY, 0, baseX, baseY, size)
        bacteriumGradient.addColorStop(0, "#90EE90")
        bacteriumGradient.addColorStop(0.7, "#32CD32")
        bacteriumGradient.addColorStop(1, "#228B22")
        ctx.fillStyle = bacteriumGradient
        
        // Main cell body
        ctx.beginPath()
        ctx.arc(baseX, baseY, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Cell wall with animation
        ctx.strokeStyle = "#228B22"
        ctx.lineWidth = 3
        ctx.setLineDash([5, 5])
        ctx.lineDashOffset = -time * 0.1
        ctx.stroke()
        ctx.setLineDash([])
        
        // Ribosomes (animated dots)
        ctx.fillStyle = "#006400"
        for (let j = 0; j < 8; j++) {
          const ribX = baseX + Math.cos(j + time * 0.05) * 15
          const ribY = baseY + Math.sin(j + time * 0.05) * 15
          ctx.beginPath()
          ctx.arc(ribX, ribY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // DNA strand (animated)
        ctx.strokeStyle = "#FF6347"
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let t = 0; t < Math.PI * 4; t += 0.1) {
          const x = baseX + Math.cos(t + time * 0.02) * (8 + Math.sin(t * 3) * 3)
          const y = baseY + Math.sin(t + time * 0.02) * (8 + Math.cos(t * 3) * 3)
          if (t === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        
      } else {
        // Binary fission process
        const splitAmount = (localSplit - 0.7) / 0.3
        const separation = splitAmount * 60
        
        // Two daughter cells
        for (let cell = 0; cell < 2; cell++) {
          const cellX = baseX + (cell === 0 ? -separation/2 : separation/2)
          const cellSize = size * (0.8 + splitAmount * 0.2)
          
          const cellGradient = ctx.createRadialGradient(cellX, baseY, 0, cellX, baseY, cellSize)
          cellGradient.addColorStop(0, "#90EE90")
          cellGradient.addColorStop(0.7, "#32CD32")
          cellGradient.addColorStop(1, "#228B22")
          ctx.fillStyle = cellGradient
          
          ctx.beginPath()
          ctx.arc(cellX, baseY, cellSize, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.strokeStyle = "#228B22"
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Particle effects during division
          if (splitAmount > 0.5 && Math.random() < 0.1) {
            createParticles(cellX, baseY, 2)
          }
        }
        
        // Division membrane
        if (splitAmount < 0.8) {
          ctx.strokeStyle = "#FFD700"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(baseX, baseY - size)
          ctx.lineTo(baseX, baseY + size)
          ctx.stroke()
        }
      }

      if (showLabels && i === 0) {
        ctx.fillStyle = "#333"
        ctx.font = "12px Arial"
        ctx.fillText(lang === "bn" ? "ব্যাকটেরিয়া কোষ" : "Bacterial Cell", baseX, baseY - size - 10)
      }
    }

    drawParticles(ctx)
  }

  const drawEnhancedVirus = (ctx: CanvasRenderingContext2D, time: number) => {
    // Dynamic background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300)
    gradient.addColorStop(0, "#FFE4E1")
    gradient.addColorStop(1, "#FFF0F5")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.fillStyle = "#333"
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ভাইরাল সংক্রমণ প্রক্রিয়া" : "Viral Infection Process", centerX, 35)

    // Host cell with membrane fluctuation
    const cellRadius = 100 + Math.sin(time * 0.05) * 5
    const cellGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, cellRadius)
    cellGradient.addColorStop(0, "#E6F3FF")
    cellGradient.addColorStop(0.8, "#ADD8E6")
    cellGradient.addColorStop(1, "#4682B4")
    ctx.fillStyle = cellGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, cellRadius, 0, Math.PI * 2)
    ctx.fill()

    // Cell membrane with moving proteins
    ctx.strokeStyle = "#4682B4"
    ctx.lineWidth = 4
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + time * 0.02
      const x = centerX + Math.cos(angle) * cellRadius
      const y = centerY + Math.sin(angle) * cellRadius
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#FF6B6B"
      ctx.fill()
    }

    // Nucleus
    ctx.fillStyle = "#8A2BE2"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
    ctx.fill()

    // Multiple viruses at different stages
    for (let v = 0; v < 4; v++) {
      const virusAngle = (v / 4) * Math.PI * 2 + time * 0.01
      const distance = 180 + Math.sin(time * 0.03 + v) * 30
      const virusX = centerX + Math.cos(virusAngle) * distance
      const virusY = centerY + Math.sin(virusAngle) * distance
      
      const infectionProgress = ((time + v * 30) % 200) / 200
      
      if (infectionProgress < 0.3) {
        // Approaching virus
        drawVirus(ctx, virusX, virusY, time + v * 10, 1)
      } else if (infectionProgress < 0.7) {
        // Attached and injecting
        const attachX = centerX + Math.cos(virusAngle) * cellRadius
        const attachY = centerY + Math.sin(virusAngle) * cellRadius
        drawVirus(ctx, attachX, attachY, time + v * 10, 0.8)
        
        // DNA injection animation
        ctx.strokeStyle = "#FF4500"
        ctx.lineWidth = 2
        const injectProgress = (infectionProgress - 0.3) / 0.4
        ctx.beginPath()
        ctx.moveTo(attachX, attachY)
        ctx.lineTo(centerX + (attachX - centerX) * (1 - injectProgress), 
                   centerY + (attachY - centerY) * (1 - injectProgress))
        ctx.stroke()
      } else {
        // New viruses being produced
        for (let n = 0; n < 3; n++) {
          const newX = centerX + (Math.random() - 0.5) * 60
          const newY = centerY + (Math.random() - 0.5) * 60
          drawVirus(ctx, newX, newY, time + n * 5, 0.6)
        }
      }
    }

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "হোস্ট কোষ" : "Host Cell", centerX, centerY - cellRadius - 15)
      ctx.fillText(lang === "bn" ? "নিউক্লিয়াস" : "Nucleus", centerX + 40, centerY)
    }

    drawParticles(ctx)
  }

  const drawVirus = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, scale: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    
    // Virus capsid with spikes
    ctx.fillStyle = "#FF4500"
    ctx.beginPath()
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const spikeLength = 15 + Math.sin(time * 0.1 + i) * 3
      const spikeX = Math.cos(angle) * spikeLength
      const spikeY = Math.sin(angle) * spikeLength
      if (i === 0) ctx.moveTo(spikeX, spikeY)
      else ctx.lineTo(spikeX, spikeY)
    }
    ctx.closePath()
    ctx.fill()
    
    // Central core
    ctx.fillStyle = "#DC143C"
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, Math.PI * 2)
    ctx.fill()
    
    // Genetic material
    ctx.strokeStyle = "#FFD700"
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let t = 0; t < Math.PI * 2; t += 0.2) {
      const r = 5 + Math.sin(t * 3 + time * 0.1) * 2
      const px = Math.cos(t) * r
      const py = Math.sin(t) * r
      if (t === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.stroke()
    
    ctx.restore()
  }

  const drawEnhancedFungi = (ctx: CanvasRenderingContext2D, time: number) => {
    // Earth-tone gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, "#F5F5DC")
    gradient.addColorStop(1, "#DEB887")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.fillStyle = "#333"
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ছত্রাক মাইসেলিয়াম নেটওয়ার্ক" : "Fungal Mycelium Network", centerX, 35)

    // Growing hyphal network
    const baseY = canvasHeight - 100
    const hypha_branches = []
    
    // Generate branching pattern
    for (let main = 0; main < 3; main++) {
      const mainX = centerX - 200 + main * 200
      
      // Main hyphae
      ctx.strokeStyle = "#8B4513"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(mainX, baseY)
      
      let currentX = mainX
      let currentY = baseY
      const segments = 15
      
      for (let i = 0; i < segments; i++) {
        const growth = (time % 300) / 300
        if (i / segments <= growth) {
          const angle = -Math.PI/2 + Math.sin(time * 0.02 + i + main) * 0.3
          const segmentLength = 20 + Math.sin(time * 0.05 + i) * 5
          currentX += Math.cos(angle) * segmentLength
          currentY += Math.sin(angle) * segmentLength
          ctx.lineTo(currentX, currentY)
          
          // Branch points
          if (i % 3 === 0 && i > 3) {
            // Secondary branches
            for (let branch = 0; branch < 2; branch++) {
              ctx.save()
              const branchAngle = angle + (branch === 0 ? -0.5 : 0.5)
              let branchX = currentX
              let branchY = currentY
              
              ctx.strokeStyle = "#A0522D"
              ctx.lineWidth = 2
              ctx.beginPath()
              ctx.moveTo(branchX, branchY)
              
              for (let b = 0; b < 5; b++) {
                branchX += Math.cos(branchAngle) * 15
                branchY += Math.sin(branchAngle) * 15
                ctx.lineTo(branchX, branchY)
              }
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      }
      ctx.stroke()
    }

    // Spores with particle effects
    ctx.fillStyle = "#DAA520"
    for (let spore = 0; spore < 12; spore++) {
      const sporeAngle = (spore / 12) * Math.PI * 2 + time * 0.01
      const sporeDistance = 150 + Math.sin(time * 0.03 + spore) * 30
      const sporeX = centerX + Math.cos(sporeAngle) * sporeDistance
      const sporeY = centerY + Math.sin(sporeAngle) * sporeDistance
      
      // Spore body with glow
      const sporeGradient = ctx.createRadialGradient(sporeX, sporeY, 0, sporeX, sporeY, 12)
      sporeGradient.addColorStop(0, "#FFD700")
      sporeGradient.addColorStop(0.7, "#DAA520")
      sporeGradient.addColorStop(1, "#B8860B")
      ctx.fillStyle = sporeGradient
      
      const sporeSize = 8 + Math.sin(time * 0.1 + spore) * 2
      ctx.beginPath()
      ctx.arc(sporeX, sporeY, sporeSize, 0, Math.PI * 2)
      ctx.fill()
      
      // Spore release particles
      if (Math.random() < 0.05) {
        createParticles(sporeX, sporeY, 1)
      }
    }

    // Fruiting bodies (mushrooms)
    for (let mushroom = 0; mushroom < 3; mushroom++) {
      const mushX = centerX - 100 + mushroom * 100
      const mushY = baseY - 50
      
      // Stem
      ctx.fillStyle = "#F5F5DC"
      ctx.fillRect(mushX - 5, mushY, 10, 40)
      
      // Cap
      const capGradient = ctx.createRadialGradient(mushX, mushY, 0, mushX, mushY, 25)
      capGradient.addColorStop(0, "#CD853F")
      capGradient.addColorStop(1, "#8B4513")
      ctx.fillStyle = capGradient
      
      ctx.beginPath()
      ctx.arc(mushX, mushY, 25, 0, Math.PI)
      ctx.fill()
      
      // Gills
      ctx.strokeStyle = "#654321"
      ctx.lineWidth = 1
      for (let gill = 0; gill < 8; gill++) {
        const gillAngle = (gill / 8) * Math.PI
        const gillX = mushX + Math.cos(gillAngle) * 20
        const gillY = mushY + Math.sin(gillAngle) * 10
        ctx.beginPath()
        ctx.moveTo(mushX, mushY)
        ctx.lineTo(gillX, gillY)
        ctx.stroke()
      }
    }

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "হাইফি" : "Hyphae", centerX - 150, baseY - 100)
      ctx.fillText(lang === "bn" ? "স্পোর" : "Spores", centerX + 100, centerY - 50)
      ctx.fillText(lang === "bn" ? "ফ্রুটিং বডি" : "Fruiting Body", centerX, baseY - 80)
    }

    drawParticles(ctx)
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (microbeType === "bacteria") {
      drawEnhancedBacteria(ctx, animationTime)
    } else if (microbeType === "virus") {
      drawEnhancedVirus(ctx, animationTime)
    } else {
      drawEnhancedFungi(ctx, animationTime)
    }

    // Enhanced information panel
    if (showDetails) {
      const panelWidth = 280
      const panelHeight = 160
      
      // Panel background with gradient
      const panelGradient = ctx.createLinearGradient(10, 10, 10, 10 + panelHeight)
      panelGradient.addColorStop(0, "rgba(0, 0, 0, 0.9)")
      panelGradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")
      ctx.fillStyle = panelGradient
      ctx.fillRect(10, 10, panelWidth, panelHeight)
      
      // Panel border
      ctx.strokeStyle = "#444"
      ctx.lineWidth = 2
      ctx.strokeRect(10, 10, panelWidth, panelHeight)
      
      ctx.fillStyle = "#fff"
      ctx.font = "16px Arial"
      ctx.textAlign = "left"
      
      const info = lang === "bn" ? [
        `🦠 জীবাণু: ${microbeType === "bacteria" ? "ব্যাকটেরিয়া" : microbeType === "virus" ? "ভাইরাস" : "ছত্রাক"}`,
        `⚡ গতি: ${animationSpeed.toFixed(1)}x`,
        `👁️ লেবেল: ${showLabels ? "দৃশ্যমান" : "অদৃশ্য"}`,
        `🎮 ইন্টারঅ্যাক্টিভ: ${interactionMode ? "সক্রিয়" : "নিষ্ক্রিয়"}`,
        `🔬 কণা: ${particles.length}`,
        `⏱️ সময়: ${Math.floor(animationTime / 60)}s`
      ] : [
        `🦠 Microbe: ${microbeType.charAt(0).toUpperCase() + microbeType.slice(1)}`,
        `⚡ Speed: ${animationSpeed.toFixed(1)}x`,
        `👁️ Labels: ${showLabels ? "Visible" : "Hidden"}`,
        `🎮 Interactive: ${interactionMode ? "On" : "Off"}`,
        `🔬 Particles: ${particles.length}`,
        `⏱️ Time: ${Math.floor(animationTime / 60)}s`
      ]
      
      info.forEach((text, index) => {
        ctx.fillText(text, 25, 40 + index * 20)
      })
    }

    if (isPlaying) {
      setAnimationTime(prev => prev + animationSpeed)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactionMode || !canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvasWidth / rect.width)
    const y = (e.clientY - rect.top) * (canvasHeight / rect.height)
    
    createParticles(x, y, 10)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, microbeType, showLabels, animationSpeed, animationTime, lang, showDetails, particles])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setParticles([])
    setMicrobeType("bacteria")
    setShowLabels(true)
    setAnimationSpeed(1)
    setInteractionMode(false)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="pt-6 space-y-6">
        <div className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-auto cursor-pointer"
            onClick={handleCanvasClick}
            style={{ maxHeight: '70vh' }}
          />
          {interactionMode && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
              {lang === "bn" ? "ক্লিক করুন!" : "Click to interact!"}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" size="lg">
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" /> {lang === "bn" ? "চালান" : "Play"}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            <RefreshCw className="h-5 w-5 mr-2" /> {lang === "bn" ? "রিসেট" : "Reset"}
          </Button>
          <Button 
            onClick={() => setShowLabels(!showLabels)} 
            variant={showLabels ? "default" : "outline"}
            size="lg"
          >
            <Eye className="h-5 w-5 mr-2" /> 
            {lang === "bn" ? "লেবেল" : "Labels"}
          </Button>
          <Button 
            onClick={() => setInteractionMode(!interactionMode)} 
            variant={interactionMode ? "default" : "outline"}
            size="lg"
          >
            <Zap className="h-5 w-5 mr-2" /> 
            {lang === "bn" ? "ইন্টারঅ্যাক্টিভ" : "Interactive"}
          </Button>
          <Button 
            onClick={() => setShowDetails(!showDetails)} 
            variant={showDetails ? "default" : "outline"}
            size="lg"
          >
            <Settings className="h-5 w-5 mr-2" /> 
            {lang === "bn" ? "তথ্য" : "Details"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0.1}
                max={4}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
                className="mt-3"
              />
              <p className="text-right mt-2 text-sm text-muted-foreground">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">{lang === "bn" ? "জীবাণুর প্রকার" : "Microbe Type"}</Label>
              <div className="flex gap-2 mt-3 flex-wrap">
                <Button
                  variant={microbeType === "bacteria" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMicrobeType("bacteria")}
                  className="flex-1"
                >
                  🦠 {lang === "bn" ? "ব্যাকটেরিয়া" : "Bacteria"}
                </Button>
                <Button
                  variant={microbeType === "virus" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMicrobeType("virus")}
                  className="flex-1"
                >
                  🔬 {lang === "bn" ? "ভাইরাস" : "Virus"}
                </Button>
                <Button
                  variant={microbeType === "fungi" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMicrobeType("fungi")}
                  className="flex-1"
                >
                  🍄 {lang === "bn" ? "ছত্রাক" : "Fungi"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">{lang === "bn" ? "ভাষা নির্বাচন" : "Language"}</Label>
              <div className="flex gap-2 mt-3">
                <Button
                  variant={lang === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLang("en")}
                  className="flex-1"
                >
                  🇺🇸 English
                </Button>
                <Button
                  variant={lang === "bn" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLang("bn")}
                  className="flex-1"
                >
                  🇧🇩 বাংলা
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 transform hover:scale-105 transition-transform">
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🦠</span>
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  {lang === "bn" ? "ব্যাকটেরিয়া" : "Bacteria"}
                </h4>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                {lang === "bn" 
                  ? "এককোষী প্রোক্যারিওট যা বাইনারি ফিশনের মাধ্যমে বিভাজিত হয়।"
                  : "Single-celled prokaryotes that reproduce through binary fission."}
              </p>
              <div className="text-xs text-green-600 dark:text-green-400">
                {lang === "bn" ? "• কোষ প্রাচীর রয়েছে\n• দ্রুত বিভাজন\n• বিভিন্ন আকার" : "• Has cell wall\n• Rapid division\n• Various shapes"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 transform hover:scale-105 transition-transform">
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🔬</span>
                <h4 className="font-semibold text-red-800 dark:text-red-200">
                  {lang === "bn" ? "ভাইরাস" : "Virus"}
                </h4>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                {lang === "bn" 
                  ? "হোস্ট কোষে সংক্রমণ করে নিজের প্রতিলিপি তৈরি করে।"
                  : "Infects host cells to create copies of itself."}
              </p>
              <div className="text-xs text-red-600 dark:text-red-400">
                {lang === "bn" ? "• জীবিত কোষ প্রয়োজন\n• জেনেটিক উপাদান\n• ক্যাপসিড প্রোটিন" : "• Needs living cells\n• Genetic material\n• Protein capsid"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 transform hover:scale-105 transition-transform">
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🍄</span>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                  {lang === "bn" ? "ছত্রাক" : "Fungi"}
                </h4>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                {lang === "bn" 
                  ? "হাইফি এবং স্পোরের মাধ্যমে বৃদ্ধি ও বংশবিস্তার করে।"
                  : "Grows and reproduces through hyphae and spores."}
              </p>
              <div className="text-xs text-amber-600 dark:text-amber-400">
                {lang === "bn" ? "• মাইসেলিয়াম নেটওয়ার্ক\n• স্পোর উৎপাদন\n• বিয়োজক ভূমিকা" : "• Mycelium network\n• Spore production\n• Decomposer role"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-lg mb-3 text-center">
              {lang === "bn" ? "🧬 শিক্ষামূলক তথ্য" : "🧬 Educational Information"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">
                  {lang === "bn" ? "আকর্ষণীয় তথ্য:" : "Interesting Facts:"}
                </h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• {lang === "bn" ? "ব্যাকটেরিয়া ২০ মিনিটে দ্বিগুণ হতে পারে" : "Bacteria can double every 20 minutes"}</li>
                  <li>• {lang === "bn" ? "ভাইরাস জীবিত কোষ ছাড়া বাঁচতে পারে না" : "Viruses cannot survive without living cells"}</li>
                  <li>• {lang === "bn" ? "ছত্রাক বিশ্বের বৃহত্তম জীব হতে পারে" : "Fungi can be the world's largest organisms"}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-200">
                  {lang === "bn" ? "নিয়ন্ত্রণ সমূহ:" : "Controls:"}
                </h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• {lang === "bn" ? "স্পেসবার: প্লে/পজ" : "Spacebar: Play/Pause"}</li>
                  <li>• {lang === "bn" ? "ইন্টারঅ্যাক্টিভ মোডে ক্লিক করুন" : "Click in Interactive mode"}</li>
                  <li>• {lang === "bn" ? "গতি স্লাইডার দিয়ে নিয়ন্ত্রণ" : "Control speed with slider"}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}