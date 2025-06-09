"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye, Zap, Info, Volume2, VolumeX } from "lucide-react"

export default function EnhancedIsomerismSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [isomerType, setIsomerType] = useState<"structural" | "geometric" | "optical">("structural")
  const [showLabels, setShowLabels] = useState(true)
  const [showBonds, setShowBonds] = useState(true)
  const [moleculeSize, setMoleculeSize] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [viewMode, setViewMode] = useState<"3d" | "split">("3d")
  const [highlightAtoms, setHighlightAtoms] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const canvasWidth = 900
  const canvasHeight = 600

  // Atom colors and properties
  const atomColors = {
    C: '#444444',
    H: '#ffffff',
    O: '#ff0000',
    N: '#0000ff',
    Cl: '#00ff00',
    Br: '#8B4513'
  }

  const drawAtom = (ctx: CanvasRenderingContext2D, x: number, y: number, type: string, size: number = 15, glow: boolean = false) => {
    if (glow && highlightAtoms) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2)
      gradient.addColorStop(0, atomColors[type as keyof typeof atomColors] + '80')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, size * 2, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.fillStyle = atomColors[type as keyof typeof atomColors]
    ctx.beginPath()
    ctx.arc(x, y, size * moleculeSize, 0, Math.PI * 2)
    ctx.fill()
    
    // Add border
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.stroke()

    // Add atom label
    if (showLabels) {
      ctx.fillStyle = type === 'H' ? '#000000' : '#ffffff'
      ctx.font = `bold ${12 * moleculeSize}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(type, x, y)
    }
  }

  const drawBond = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, type: 'single' | 'double' = 'single', animated: boolean = false) => {
    if (!showBonds) return

    const animOffset = animated ? Math.sin(animationTime * 0.1) * 2 : 0
    
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'

    if (type === 'single') {
      ctx.beginPath()
      ctx.moveTo(x1, y1 + animOffset)
      ctx.lineTo(x2, y2 + animOffset)
      ctx.stroke()
    } else {
      // Double bond
      const dx = x2 - x1
      const dy = y2 - y1
      const length = Math.sqrt(dx * dx + dy * dy)
      const unitX = dx / length
      const unitY = dy / length
      const perpX = -unitY * 3
      const perpY = unitX * 3

      ctx.beginPath()
      ctx.moveTo(x1 + perpX, y1 + perpY + animOffset)
      ctx.lineTo(x2 + perpX, y2 + perpY + animOffset)
      ctx.moveTo(x1 - perpX, y1 - perpY + animOffset)
      ctx.lineTo(x2 - perpX, y2 - perpY + animOffset)
      ctx.stroke()
    }
  }

  const drawStructuralIsomers = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, rotationAngle: number) => {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotationAngle)

    if (viewMode === "split") {
      // Draw n-butane (left side)
      ctx.save()
      ctx.translate(-200, 0)
      
      // Chain of carbons
      const positions = [[-60, 0], [-20, 0], [20, 0], [60, 0]]
      
      // Draw bonds first
      for (let i = 0; i < positions.length - 1; i++) {
        drawBond(ctx, positions[i][0], positions[i][1], positions[i + 1][0], positions[i + 1][1], 'single', true)
      }
      
      // Draw carbon atoms
      positions.forEach((pos, i) => {
        drawAtom(ctx, pos[0], pos[1], 'C', 15, true)
      })
      
      // Draw hydrogens
      drawAtom(ctx, -60, -30, 'H', 10)
      drawAtom(ctx, -60, 30, 'H', 10)
      drawAtom(ctx, 60, -30, 'H', 10)
      drawAtom(ctx, 60, 30, 'H', 10)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(lang === 'bn' ? 'n-বিউটেন' : 'n-Butane', 0, 80)
      
      ctx.restore()

      // Draw isobutane (right side)
      ctx.save()
      ctx.translate(200, 0)
      
      // Branched structure
      drawBond(ctx, -30, 0, 30, 0, 'single', true)
      drawBond(ctx, 0, 0, 0, -40, 'single', true)
      
      drawAtom(ctx, -30, 0, 'C', 15, true)
      drawAtom(ctx, 0, 0, 'C', 15, true)
      drawAtom(ctx, 30, 0, 'C', 15, true)
      drawAtom(ctx, 0, -40, 'C', 15, true)
      
      // Hydrogens
      drawAtom(ctx, -30, -25, 'H', 10)
      drawAtom(ctx, -30, 25, 'H', 10)
      drawAtom(ctx, 30, -25, 'H', 10)
      drawAtom(ctx, 30, 25, 'H', 10)
      drawAtom(ctx, -15, -40, 'H', 10)
      drawAtom(ctx, 15, -40, 'H', 10)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(lang === 'bn' ? 'আইসো-বিউটেন' : 'Isobutane', 0, 80)
      
      ctx.restore()
    } else {
      // Single molecule view (alternating between structures)
      const showIso = Math.sin(animationTime * 0.02) > 0
      
      if (showIso) {
        // Branched structure
        drawBond(ctx, -30, 0, 30, 0, 'single', true)
        drawBond(ctx, 0, 0, 0, -40, 'single', true)
        
        drawAtom(ctx, -30, 0, 'C', 15, true)
        drawAtom(ctx, 0, 0, 'C', 15, true)
        drawAtom(ctx, 30, 0, 'C', 15, true)
        drawAtom(ctx, 0, -40, 'C', 15, true)
      } else {
        // Linear structure
        const positions = [[-45, 0], [-15, 0], [15, 0], [45, 0]]
        
        for (let i = 0; i < positions.length - 1; i++) {
          drawBond(ctx, positions[i][0], positions[i][1], positions[i + 1][0], positions[i + 1][1], 'single', true)
        }
        
        positions.forEach(pos => {
          drawAtom(ctx, pos[0], pos[1], 'C', 15, true)
        })
      }
    }

    ctx.restore()
  }

  const drawGeometricIsomers = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, rotationAngle: number) => {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotationAngle)

    if (viewMode === "split") {
      // Cis isomer (left)
      ctx.save()
      ctx.translate(-200, 0)
      
      drawBond(ctx, -30, 0, 30, 0, 'double', true)
      drawAtom(ctx, -30, 0, 'C', 15, true)
      drawAtom(ctx, 30, 0, 'C', 15, true)
      
      // Same side substituents (cis)
      drawAtom(ctx, -50, -25, 'Cl', 12, true)
      drawAtom(ctx, 50, -25, 'Cl', 12, true)
      drawAtom(ctx, -50, 25, 'H', 10)
      drawAtom(ctx, 50, 25, 'H', 10)
      
      drawBond(ctx, -30, 0, -50, -25)
      drawBond(ctx, 30, 0, 50, -25)
      drawBond(ctx, -30, 0, -50, 25)
      drawBond(ctx, 30, 0, 50, 25)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(lang === 'bn' ? 'সিস-আইসোমার' : 'Cis Isomer', 0, 80)
      
      ctx.restore()

      // Trans isomer (right)
      ctx.save()
      ctx.translate(200, 0)
      
      drawBond(ctx, -30, 0, 30, 0, 'double', true)
      drawAtom(ctx, -30, 0, 'C', 15, true)
      drawAtom(ctx, 30, 0, 'C', 15, true)
      
      // Opposite side substituents (trans)
      drawAtom(ctx, -50, -25, 'Cl', 12, true)
      drawAtom(ctx, 50, 25, 'Cl', 12, true)
      drawAtom(ctx, -50, 25, 'H', 10)
      drawAtom(ctx, 50, -25, 'H', 10)
      
      drawBond(ctx, -30, 0, -50, -25)
      drawBond(ctx, 30, 0, 50, 25)
      drawBond(ctx, -30, 0, -50, 25)
      drawBond(ctx, 30, 0, 50, -25)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(lang === 'bn' ? 'ট্রান্স-আইসোমার' : 'Trans Isomer', 0, 80)
      
      ctx.restore()
    } else {
      // Animated transition between cis and trans
      const isCis = Math.sin(animationTime * 0.03) > 0
      const transitionProgress = (Math.sin(animationTime * 0.03) + 1) / 2
      
      drawBond(ctx, -30, 0, 30, 0, 'double', true)
      drawAtom(ctx, -30, 0, 'C', 15, true)
      drawAtom(ctx, 30, 0, 'C', 15, true)
      
      // Interpolate positions for smooth transition
      const clY1 = -25
      const clY2 = isCis ? -25 : 25 * (1 - 2 * Math.abs(transitionProgress - 0.5))
      const hY1 = 25
      const hY2 = isCis ? 25 : -25 * (1 - 2 * Math.abs(transitionProgress - 0.5))
      
      drawAtom(ctx, -50, clY1, 'Cl', 12, true)
      drawAtom(ctx, 50, clY2, 'Cl', 12, true)
      drawAtom(ctx, -50, hY1, 'H', 10)
      drawAtom(ctx, 50, hY2, 'H', 10)
      
      drawBond(ctx, -30, 0, -50, clY1)
      drawBond(ctx, 30, 0, 50, clY2)
      drawBond(ctx, -30, 0, -50, hY1)
      drawBond(ctx, 30, 0, 50, hY2)
    }

    ctx.restore()
  }

  const drawOpticalIsomers = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, rotationAngle: number) => {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotationAngle)

    if (viewMode === "split") {
      // L-isomer (left)
      ctx.save()
      ctx.translate(-200, 0)
      
      // Central carbon
      drawAtom(ctx, 0, 0, 'C', 15, true)
      
      // Four different substituents
      drawAtom(ctx, 0, -40, 'H', 10, true)
      drawAtom(ctx, 40, 0, 'Cl', 12, true)
      drawAtom(ctx, 0, 40, 'Br', 12, true)
      drawAtom(ctx, -40, 0, 'O', 12, true)
      
      drawBond(ctx, 0, 0, 0, -40)
      drawBond(ctx, 0, 0, 40, 0)
      drawBond(ctx, 0, 0, 0, 40)
      drawBond(ctx, 0, 0, -40, 0)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(lang === 'bn' ? 'L-আইসোমার' : 'L-Isomer', 0, 80)
      
      ctx.restore()

      // D-isomer (right) - mirror image
      ctx.save()
      ctx.translate(200, 0)
      ctx.scale(-1, 1) // Mirror flip
      
      drawAtom(ctx, 0, 0, 'C', 15, true)
      
      drawAtom(ctx, 0, -40, 'H', 10, true)
      drawAtom(ctx, 40, 0, 'Cl', 12, true)
      drawAtom(ctx, 0, 40, 'Br', 12, true)
      drawAtom(ctx, -40, 0, 'O', 12, true)
      
      drawBond(ctx, 0, 0, 0, -40)
      drawBond(ctx, 0, 0, 40, 0)
      drawBond(ctx, 0, 0, 0, 40)
      drawBond(ctx, 0, 0, -40, 0)
      
      ctx.scale(-1, 1) // Flip back for text
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(lang === 'bn' ? 'D-আইসোমার' : 'D-Isomer', 0, 80)
      
      ctx.restore()
    } else {
      // Single molecule with rotation showing chirality
      const phase = animationTime * 0.05
      
      drawAtom(ctx, 0, 0, 'C', 15, true)
      
      // Rotating substituents to show 3D nature
      const r = 40
      drawAtom(ctx, 0, -r, 'H', 10, true)
      drawAtom(ctx, r * Math.cos(phase), r * Math.sin(phase), 'Cl', 12, true)
      drawAtom(ctx, 0, r, 'Br', 12, true)
      drawAtom(ctx, -r * Math.cos(phase), -r * Math.sin(phase), 'O', 12, true)
      
      drawBond(ctx, 0, 0, 0, -r)
      drawBond(ctx, 0, 0, r * Math.cos(phase), r * Math.sin(phase))
      drawBond(ctx, 0, 0, 0, r)
      drawBond(ctx, 0, 0, -r * Math.cos(phase), -r * Math.sin(phase))
    }

    ctx.restore()
  }

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Animated particles
    for (let i = 0; i < 20; i++) {
      const x = (animationTime * 0.5 + i * 100) % canvasWidth
      const y = 100 + Math.sin(animationTime * 0.01 + i) * 50
      const alpha = 0.1 + Math.sin(animationTime * 0.02 + i) * 0.1
      
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.02 * rotationSpeed
    
    drawBackground(ctx)

    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2

    // Draw molecules based on type
    if (isomerType === "structural") {
      drawStructuralIsomers(ctx, centerX, centerY, t)
    } else if (isomerType === "geometric") {
      drawGeometricIsomers(ctx, centerX, centerY, t)
    } else {
      drawOpticalIsomers(ctx, centerX, centerY, t)
    }

    // Draw information panel
    if (showInfo) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(20, 20, 350, 120)
      ctx.strokeStyle = "#4a90e2"
      ctx.lineWidth = 2
      ctx.strokeRect(20, 20, 350, 120)
      
      ctx.fillStyle = "#ffffff"
      ctx.font = "16px Arial"
      ctx.textAlign = "left"
      
      const info = {
        structural: lang === "bn" ? 
          ["গঠনগত আইসোমার:", "• একই আণবিক সূত্র", "• ভিন্ন কাঠামো", "• ভিন্ন ধর্ম"] :
          ["Structural Isomers:", "• Same molecular formula", "• Different structure", "• Different properties"],
        geometric: lang === "bn" ?
          ["জ্যামিতিক আইসোমার:", "• দ্বিবন্ধনের চারপাশে", "• সিস বনাম ট্রান্স", "• ভিন্ন স্থানিক বিন্যাস"] :
          ["Geometric Isomers:", "• Around double bonds", "• Cis vs Trans", "• Different spatial arrangement"],
        optical: lang === "bn" ?
          ["অপটিক্যাল আইসোমার:", "• দর্পণ প্রতিবিম্ব", "• কাইরাল কার্বন", "• আলোর ঘূর্ণন"] :
          ["Optical Isomers:", "• Mirror images", "• Chiral carbon", "• Rotate light"]
      }
      
      const currentInfo = info[isomerType]
      currentInfo.forEach((line, index) => {
        ctx.fillText(line, 35, 50 + index * 20)
      })
    }

    // Title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      lang === "bn" ? "আইসোমারিজম সিমুলেশন" : "Isomerism Simulation",
      canvasWidth / 2,
      40
    )
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
  }, [isPlaying, rotationSpeed, isomerType, showLabels, showBonds, moleculeSize, animationTime, lang, viewMode, highlightAtoms, showInfo])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setRotationSpeed(1)
    setMoleculeSize(1)
    setIsomerType("structural")
    setViewMode("3d")
    setHighlightAtoms(false)
    setShowInfo(false)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden border-2 border-slate-600 shadow-2xl">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-full cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          />
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button 
            onClick={() => setIsPlaying(!isPlaying)} 
            variant="outline"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
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
            className="bg-red-600 hover:bg-red-700 text-white border-red-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট" : "Reset"}
          </Button>
          
          <Button 
            onClick={() => setViewMode(viewMode === "3d" ? "split" : "3d")} 
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-green-500"
          >
            <Eye className="h-4 w-4 mr-2" /> 
            {viewMode === "3d" ? (lang === "bn" ? "বিভক্ত দৃশ্য" : "Split View") : (lang === "bn" ? "3D দৃশ্য" : "3D View")}
          </Button>
          
          <Button 
            onClick={() => setHighlightAtoms(!highlightAtoms)} 
            variant={highlightAtoms ? "default" : "outline"}
            className="bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-500"
          >
            <Zap className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "আলোকসজ্জা" : "Glow"}
          </Button>
          
          <Button 
            onClick={() => setShowInfo(!showInfo)} 
            variant={showInfo ? "default" : "outline"}
            className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
          >
            <Info className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "তথ্য" : "Info"}
          </Button>

          <Button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            variant={soundEnabled ? "default" : "outline"}
            className="bg-orange-600 hover:bg-orange-700 text-white border-orange-500"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
            {lang === "bn" ? "শব্দ" : "Sound"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="pt-4">
              <Label className="text-sm text-white">{lang === "bn" ? "ঘূর্ণন গতি" : "Rotation Speed"}</Label>
              <Slider
                min={0.1}
                max={5}
                step={0.1}
                value={[rotationSpeed]}
                onValueChange={(v) => setRotationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm text-gray-300">{rotationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="pt-4">
              <Label className="text-sm text-white">{lang === "bn" ? "অণুর আকার" : "Molecule Size"}</Label>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[moleculeSize]}
                onValueChange={(v) => setMoleculeSize(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm text-gray-300">{moleculeSize.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="pt-4">
              <Label className="text-sm text-white">{lang === "bn" ? "প্রদর্শন বিকল্প" : "Display Options"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={showLabels ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowLabels(!showLabels)}
                  className="text-xs"
                >
                  {lang === "bn" ? "লেবেল" : "Labels"}
                </Button>
                <Button
                  variant={showBonds ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowBonds(!showBonds)}
                  className="text-xs"
                >
                  {lang === "bn" ? "বন্ধন" : "Bonds"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-600">
          <CardContent className="pt-4">
            <Label className="text-sm text-white">{lang === "bn" ? "আইসোমার প্রকার" : "Isomer Type"}</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Button
                variant={isomerType === "structural" ? "default" : "outline"}
                size="sm"
                onClick={() => setIsomerType("structural")}
                className="bg-blue-600 hover:bg-blue-700 border-blue-500"
              >
                {lang === "bn" ? "গঠনগত" : "Structural"}
              </Button>
              <Button
                variant={isomerType === "geometric" ? "default" : "outline"}
                size="sm"
                onClick={() => setIsomerType("geometric")}
                className="bg-green-600 hover:bg-green-700 border-green-500"
              >
                {lang === "bn" ? "জ্যামিতিক" : "Geometric"}
              </Button>
              <Button
                variant={isomerType === "optical" ? "default" : "outline"}
                size="sm"
                onClick={() => setIsomerType("optical")}
                className="bg-purple-600 hover:bg-purple-700 border-purple-500"
              >
                {lang === "bn" ? "অপটিক্যাল" : "Optical"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="border-t border-slate-600 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-white">
                {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
              </p>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={lang === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLang("en")}
                  className="bg-indigo-600 hover:bg-indigo-700 border-indigo-500"
                >
                  English
                </Button>
                <Button
                  variant={lang === "bn" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLang("bn")}
                  className="bg-indigo-600 hover:bg-indigo-700 border-indigo-500"
                >
                  বাংলা
                </Button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-400">
                {lang === "bn" ? "ক্যানভাসে ক্লিক করুন প্লে/পজের জন্য" : "Click canvas to play/pause"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {lang === "bn" ? `অ্যানিমেশন ফ্রেম: ${animationTime}` : `Animation Frame: ${animationTime}`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}