"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Zap, Eye, Grid3x3, Atom, Beaker } from "lucide-react"

export default function EnhancedIonicBondingSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [compoundIndex, setCompoundIndex] = useState(0)
  const [showLabels, setShowLabels] = useState(true)
  const [showElectrons, setShowElectrons] = useState(true)
  const [showLattice, setShowLattice] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number}>>([])
  const [viewMode, setViewMode] = useState<"formation" | "lattice" | "energy">("formation")

  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const compounds = [
    { 
      name: "NaCl", 
      ions: [
        { symbol: "Na⁺", charge: 1, color: "#FFD700", size: 35, electrons: 10 },
        { symbol: "Cl⁻", charge: -1, color: "#32CD32", size: 45, electrons: 18 }
      ],
      latticeEnergy: 786,
      description: { en: "Salt - Common table salt", bn: "লবণ - সাধারণ খাবার লবণ" }
    },
    { 
      name: "MgO", 
      ions: [
        { symbol: "Mg²⁺", charge: 2, color: "#FF6B6B", size: 30, electrons: 10 },
        { symbol: "O²⁻", charge: -2, color: "#4ECDC4", size: 50, electrons: 10 }
      ],
      latticeEnergy: 3791,
      description: { en: "Magnesia - High melting point", bn: "ম্যাগনেসিয়া - উচ্চ গলনাঙ্ক" }
    },
    { 
      name: "CaF₂", 
      ions: [
        { symbol: "Ca²⁺", charge: 2, color: "#FF8C42", size: 40, electrons: 18 },
        { symbol: "F⁻", charge: -1, color: "#6A4C93", size: 25, electrons: 10 },
        { symbol: "F⁻", charge: -1, color: "#6A4C93", size: 25, electrons: 10 }
      ],
      latticeEnergy: 2651,
      description: { en: "Fluorite - Used in steel production", bn: "ফ্লুরাইট - ইস্পাত উৎপাদনে ব্যবহৃত" }
    },
  ]

  const createParticle = (x: number, y: number) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 60
    }
  }

  const drawGradientSphere = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, highlight: boolean = false) => {
    const gradient = ctx.createRadialGradient(x - radius/3, y - radius/3, 0, x, y, radius)
    gradient.addColorStop(0, highlight ? '#FFFFFF' : color)
    gradient.addColorStop(0.7, color)
    gradient.addColorStop(1, highlight ? color : '#000000')
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
    
    if (highlight) {
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 3
      ctx.stroke()
    }
    
    // Add shine effect
    ctx.beginPath()
    ctx.arc(x - radius/3, y - radius/3, radius/4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.fill()
  }

  const drawElectronShells = (ctx: CanvasRenderingContext2D, x: number, y: number, ion: any) => {
    if (!showElectrons) return
    
    const shells = [
      { radius: 60, electrons: Math.min(ion.electrons, 2) },
      { radius: 80, electrons: Math.min(Math.max(ion.electrons - 2, 0), 8) },
      { radius: 100, electrons: Math.max(ion.electrons - 10, 0) }
    ]
    
    shells.forEach((shell, shellIndex) => {
      if (shell.electrons > 0) {
        // Draw shell orbit
        ctx.beginPath()
        ctx.arc(x, y, shell.radius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(100, 100, 255, 0.3)'
        ctx.lineWidth = 1
        ctx.stroke()
        
        // Draw electrons
        for (let i = 0; i < shell.electrons; i++) {
          const angle = (i / shell.electrons) * Math.PI * 2 + animationTime * 0.02 * (shellIndex + 1)
          const electronX = x + Math.cos(angle) * shell.radius
          const electronY = y + Math.sin(angle) * shell.radius
          
          ctx.beginPath()
          ctx.arc(electronX, electronY, 3, 0, Math.PI * 2)
          ctx.fillStyle = '#0066FF'
          ctx.fill()
        }
      }
    })
  }

  const drawLatticeStructure = (ctx: CanvasRenderingContext2D, compound: any) => {
    if (!showLattice) return
    
    const spacing = 80
    const rows = 5
    const cols = 7
    const startX = centerX - (cols * spacing) / 2
    const startY = centerY - (rows * spacing) / 2
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = startX + j * spacing
        const y = startY + i * spacing
        const ionType = (i + j) % 2
        const ion = compound.ions[ionType % compound.ions.length]
        
        drawGradientSphere(ctx, x, y, ion.size * 0.6, ion.color)
        
        if (showLabels) {
          ctx.fillStyle = '#FFF'
          ctx.font = '12px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(ion.symbol, x, y + 4)
        }
      }
    }
  }

  const drawEnergyDiagram = (ctx: CanvasRenderingContext2D, compound: any) => {
    const diagramX = 50
    const diagramY = 100
    const diagramWidth = 300
    const diagramHeight = 200
    
    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(diagramX, diagramY, diagramWidth, diagramHeight)
    
    // Energy levels
    const separatedEnergy = 100
    const bondedEnergy = 200
    const energyScale = diagramHeight / 250
    
    // Draw energy levels
    ctx.strokeStyle = '#FF6B6B'
    ctx.lineWidth = 3
    
    // Separated ions level
    ctx.beginPath()
    ctx.moveTo(diagramX + 20, diagramY + separatedEnergy * energyScale)
    ctx.lineTo(diagramX + 120, diagramY + separatedEnergy * energyScale)
    ctx.stroke()
    
    // Bonded ions level
    ctx.beginPath()
    ctx.moveTo(diagramX + 180, diagramY + bondedEnergy * energyScale)
    ctx.lineTo(diagramX + 280, diagramY + bondedEnergy * energyScale)
    ctx.stroke()
    
    // Arrow showing energy release
    ctx.strokeStyle = '#32CD32'
    ctx.fillStyle = '#32CD32'
    ctx.beginPath()
    ctx.moveTo(diagramX + 150, diagramY + separatedEnergy * energyScale)
    ctx.lineTo(diagramX + 150, diagramY + bondedEnergy * energyScale)
    ctx.stroke()
    
    // Arrow head
    ctx.beginPath()
    ctx.moveTo(diagramX + 145, diagramY + bondedEnergy * energyScale - 10)
    ctx.lineTo(diagramX + 150, diagramY + bondedEnergy * energyScale)
    ctx.lineTo(diagramX + 155, diagramY + bondedEnergy * energyScale - 10)
    ctx.fill()
    
    // Labels
    ctx.fillStyle = '#FFF'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Separated Ions', diagramX + 70, diagramY + separatedEnergy * energyScale - 10)
    ctx.fillText('Ionic Compound', diagramX + 230, diagramY + bondedEnergy * energyScale - 10)
    ctx.fillText(`Lattice Energy: ${compound.latticeEnergy} kJ/mol`, diagramX + 150, diagramY + 30)
  }

  const drawFormationAnimation = (ctx: CanvasRenderingContext2D, compound: any) => {
    const t = animationTime * 0.05 * animationSpeed
    const compound_ions = compound.ions
    
    // Calculate positions for different stages
    const stage = Math.floor((animationTime * animationSpeed) / 100) % 4
    let positions: Array<{x: number, y: number, scale: number}> = []
    
    switch(stage) {
      case 0: // Separated atoms
        positions = [
          { x: centerX - 200, y: centerY, scale: 1 },
          { x: centerX + 200, y: centerY, scale: 1 },
          { x: centerX + 200, y: centerY + 120, scale: 1 }
        ]
        break
      case 1: // Electron transfer
        positions = [
          { x: centerX - 100, y: centerY, scale: 1.2 },
          { x: centerX + 100, y: centerY, scale: 1.2 },
          { x: centerX + 100, y: centerY + 120, scale: 1.2 }
        ]
        break
      case 2: // Ion formation
        positions = [
          { x: centerX - 100, y: centerY, scale: 1 },
          { x: centerX + 100, y: centerY, scale: 1 },
          { x: centerX + 100, y: centerY + 120, scale: 1 }
        ]
        break
      case 3: // Ionic bonding
        positions = [
          { x: centerX - 60, y: centerY, scale: 1 },
          { x: centerX + 60, y: centerY, scale: 1 },
          { x: centerX + 60, y: centerY + 80, scale: 1 }
        ]
        break
    }
    
    // Draw ions
    compound_ions.forEach((ion, i) => {
      if (positions[i]) {
        const pos = positions[i]
        const highlight = stage === 1 && isPlaying
        
        drawGradientSphere(ctx, pos.x, pos.y, ion.size * pos.scale, ion.color, highlight)
        drawElectronShells(ctx, pos.x, pos.y, ion)
        
        if (showLabels) {
          ctx.fillStyle = '#FFF'
          ctx.font = '16px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(ion.symbol, pos.x, pos.y + 6)
          
          ctx.font = '12px Arial'
          ctx.fillText(
            lang === "bn" ? (ion.charge > 0 ? "ক্যাটায়ন" : "অ্যানায়ন") : (ion.charge > 0 ? "Cation" : "Anion"),
            pos.x,
            pos.y - ion.size - 10
          )
        }
      }
    })
    
    // Draw electron transfer animation
    if (stage === 1 && isPlaying) {
      const electrons = Math.abs(compound_ions[0].charge)
      for (let e = 0; e < electrons; e++) {
        const progress = ((animationTime + e * 20) % 60) / 60
        const startX = positions[0].x + 30
        const startY = positions[0].y
        const endX = positions[1].x - 30
        const endY = positions[1].y
        
        const x = startX + (endX - startX) * progress
        const y = startY + (endY - startY) * progress + Math.sin(progress * Math.PI * 2) * 20
        
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#0066FF'
        ctx.fill()
        
        // Electron trail
        for (let trail = 1; trail <= 5; trail++) {
          const trailProgress = Math.max(0, progress - trail * 0.1)
          const trailX = startX + (endX - startX) * trailProgress
          const trailY = startY + (endY - startY) * trailProgress + Math.sin(trailProgress * Math.PI * 2) * 20
          
          ctx.beginPath()
          ctx.arc(trailX, trailY, 4 * (1 - trail * 0.15), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 102, 255, ${1 - trail * 0.2})`
          ctx.fill()
        }
      }
      
      // Create particles at transfer point
      if (Math.random() < 0.3) {
        const newParticles = []
        for (let i = 0; i < 3; i++) {
          newParticles.push(createParticle(positions[1].x, positions[1].y))
        }
        setParticles(prev => [...prev, ...newParticles])
      }
    }
    
    // Draw ionic bonds
    if (stage >= 2) {
      for (let i = 1; i < positions.length; i++) {
        const dx = positions[0].x - positions[i].x
        const dy = positions[0].y - positions[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(positions[0].x, positions[0].y)
          ctx.lineTo(positions[i].x, positions[i].y)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.lineWidth = 3
          ctx.stroke()
          
          // Draw bond strength indicator
          const bondStrength = Math.abs(compound_ions[0].charge * compound_ions[i].charge)
          ctx.fillStyle = `rgba(255, 255, 255, 0.6)`
          ctx.font = '12px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(
            `${bondStrength}`,
            positions[0].x + (positions[i].x - positions[0].x) / 2,
            positions[0].y + (positions[i].y - positions[0].y) / 2
          )
        }
      }
    }
  }

  const updateParticles = () => {
    setParticles(prev => 
      prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1
      })).filter(p => p.life > 0)
    )
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particles.forEach(particle => {
      const alpha = particle.life / 60
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`
      ctx.fill()
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const compound = compounds[compoundIndex]
    
    // Draw based on view mode
    switch(viewMode) {
      case "formation":
        drawFormationAnimation(ctx, compound)
        break
      case "lattice":
        drawLatticeStructure(ctx, compound)
        break
      case "energy":
        drawEnergyDiagram(ctx, compound)
        drawFormationAnimation(ctx, compound)
        break
    }
    
    drawParticles(ctx)
    
    // Draw info panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
    ctx.fillRect(10, 10, 300, 120)
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    ctx.strokeRect(10, 10, 300, 120)
    
    ctx.fillStyle = "#FFD700"
    ctx.font = "18px Arial"
    ctx.textAlign = "left"
    ctx.fillText(lang === "bn" ? `যৌগ: ${compound.name}` : `Compound: ${compound.name}`, 20, 35)
    
    ctx.fillStyle = "#FFF"
    ctx.font = "14px Arial"
    ctx.fillText(compound.description[lang], 20, 55)
    ctx.fillText(
      lang === "bn" ? `আয়ন: ${compound.ions.map(ion => ion.symbol).join(", ")}` : `Ions: ${compound.ions.map(ion => ion.symbol).join(", ")}`,
      20,
      75
    )
    ctx.fillText(
      lang === "bn" ? `জালি শক্তি: ${compound.latticeEnergy} kJ/mol` : `Lattice Energy: ${compound.latticeEnergy} kJ/mol`,
      20,
      95
    )

    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
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
  }, [isPlaying, compoundIndex, showLabels, showElectrons, showLattice, animationSpeed, animationTime, lang, viewMode, particles])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setParticles([])
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardContent className="pt-6 space-y-6">
          <div className="bg-slate-950 rounded-lg overflow-hidden border-2 border-slate-700">
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
              className="bg-green-600 hover:bg-green-700 text-white border-green-500"
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
            
            <Button 
              onClick={reset} 
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
            </Button>
            
            <Button 
              onClick={() => setShowElectrons(!showElectrons)} 
              variant={showElectrons ? "default" : "outline"}
              className={showElectrons ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <Atom className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "ইলেকট্রন" : "Electrons"}
            </Button>
            
            <Button 
              onClick={() => setShowLabels(!showLabels)} 
              variant={showLabels ? "default" : "outline"}
              className={showLabels ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              <Eye className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "লেবেল" : "Labels"}
            </Button>
            
            <Button 
              onClick={() => setShowLattice(!showLattice)} 
              variant={showLattice ? "default" : "outline"}
              className={showLattice ? "bg-teal-600 hover:bg-teal-700" : ""}
            >
              <Grid3x3 className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "জালি" : "Lattice"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800 border-slate-600">
              <CardContent className="pt-4">
                <Label className="text-sm text-slate-300">{lang === "bn" ? "যৌগ নির্বাচন" : "Select Compound"}</Label>
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={[compoundIndex]}
                  onValueChange={(v) => setCompoundIndex(v[0])}
                  className="mt-2"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-slate-400">NaCl</span>
                  <span className="text-xs text-slate-400">MgO</span>
                  <span className="text-xs text-slate-400">CaF₂</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardContent className="pt-4">
                <Label className="text-sm text-slate-300">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
                <Slider
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[animationSpeed]}
                  onValueChange={(v) => setAnimationSpeed(v[0])}
                  className="mt-2"
                />
                <p className="text-right mt-1 text-sm text-slate-400">{animationSpeed.toFixed(1)}x</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardContent className="pt-4">
                <Label className="text-sm text-slate-300">{lang === "bn" ? "দেখার মোড" : "View Mode"}</Label>
                <div className="flex gap-1 mt-2">
                  <Button
                    variant={viewMode === "formation" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("formation")}
                    className="flex-1 text-xs"
                  >
                    <Beaker className="h-3 w-3 mr-1" />
                    {lang === "bn" ? "গঠন" : "Form"}
                  </Button>
                  <Button
                    variant={viewMode === "lattice" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("lattice")}
                    className="flex-1 text-xs"
                  >
                    <Grid3x3 className="h-3 w-3 mr-1" />
                    {lang === "bn" ? "জালি" : "Lattice"}
                  </Button>
                  <Button
                    variant={viewMode === "energy" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("energy")}
                    className="flex-1 text-xs"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {lang === "bn" ? "শক্তি" : "Energy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-sm font-medium text-slate-300">
              {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                variant={lang === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLang("en")}
                className={lang === "en" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                English
              </Button>
              <Button
                variant={lang === "bn" ? "default" : "outline"}
                size="sm"
                onClick={() => setLang("bn")}
                className={lang === "bn" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                বাংলা
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}