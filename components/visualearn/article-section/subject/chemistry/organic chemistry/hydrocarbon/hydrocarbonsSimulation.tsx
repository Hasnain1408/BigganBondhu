"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator, Atom, Eye, Zap, Palette } from "lucide-react"

export default function EnhancedHydrocarbonsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [moleculeIndex, setMoleculeIndex] = useState(0)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [vibrationIntensity, setVibrationIntensity] = useState(1)
  const [showElectrons, setShowElectrons] = useState(false)
  const [colorScheme, setColorScheme] = useState<"classic" | "neon" | "pastel">("classic")
  const [showBondingInfo, setShowBondingInfo] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(1)

  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const colorSchemes = {
    classic: { carbon: "#333", hydrogen: "#fff", bond: "#666", electron: "#ff6b6b" },
    neon: { carbon: "#00ff88", hydrogen: "#ff00ff", bond: "#00ddff", electron: "#ffff00" },
    pastel: { carbon: "#ff9999", hydrogen: "#99ccff", bond: "#ffcc99", electron: "#cc99ff" }
  }

  const currentColors = colorSchemes[colorScheme]

  const molecules = [
    { 
      name: lang === "bn" ? "মিথেন (CH₄)" : "Methane (CH₄)", 
      description: lang === "bn" ? "অ্যালকান, একক বন্ধন, টেট্রাহেড্রাল আকার" : "Alkane, single bonds, tetrahedral shape",
      formula: "CH₄",
      bondType: lang === "bn" ? "একক" : "Single",
      bondCount: 4
    },
    { 
      name: lang === "bn" ? "ইথিন (C₂H₄)" : "Ethene (C₂H₄)", 
      description: lang === "bn" ? "অ্যালকিন, ডাবল বন্ধন, সমতল আকার" : "Alkene, double bond, planar shape",
      formula: "C₂H₄",
      bondType: lang === "bn" ? "দ্বিগুণ" : "Double",
      bondCount: 5
    },
    { 
      name: lang === "bn" ? "ইথাইন (C₂H₂)" : "Ethyne (C₂H₂)", 
      description: lang === "bn" ? "অ্যালকাইন, ট্রিপল বন্ধন, রৈখিক" : "Alkyne, triple bond, linear",
      formula: "C₂H₂",
      bondType: lang === "bn" ? "ত্রিগুণ" : "Triple",
      bondCount: 3
    },
    { 
      name: lang === "bn" ? "বেনজিন (C₆H₆)" : "Benzene (C₆H₆)", 
      description: lang === "bn" ? "অ্যারোমেটিক, বেনজিন রিং, অনুনাদ" : "Aromatic, benzene ring, resonance",
      formula: "C₆H₆",
      bondType: lang === "bn" ? "অনুনাদ" : "Resonance",
      bondCount: 12
    },
  ]

  const drawGlow = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
    gradient.addColorStop(0, color + "80")
    gradient.addColorStop(0.5, color + "40")
    gradient.addColorStop(1, color + "00")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawElectronCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
    if (!showElectrons) return
    
    for (let i = 0; i < 3; i++) {
      const angle = time * 0.1 + i * (Math.PI * 2 / 3)
      const radius = 35 + Math.sin(time * 0.05 + i) * 5
      const ex = x + radius * Math.cos(angle)
      const ey = y + radius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.arc(ex, ey, 2, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.electron
      ctx.fill()
      drawGlow(ctx, ex, ey, 3, currentColors.electron)
    }
  }

  const vibrate = (base: number, intensity: number, time: number): number => {
    return base + Math.sin(time * 0.2) * intensity * vibrationIntensity
  }

  const drawMethane = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.03 * animationSpeed * rotationSpeed
    
    // Central carbon atom
    const carbonX = vibrate(centerX, 2, animationTime)
    const carbonY = vibrate(centerY, 2, animationTime + 1)
    
    drawGlow(ctx, carbonX, carbonY, 25, currentColors.carbon)
    ctx.beginPath()
    ctx.arc(carbonX, carbonY, 22, 0, Math.PI * 2)
    ctx.fillStyle = currentColors.carbon
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    drawElectronCloud(ctx, carbonX, carbonY, animationTime)

    // Tetrahedral arrangement of hydrogen atoms
    const tetrahedralAngles = [
      { x: Math.cos(t), y: Math.sin(t), z: Math.cos(t * 0.7) },
      { x: Math.cos(t + Math.PI * 2/3), y: Math.sin(t + Math.PI * 2/3), z: Math.cos(t * 0.7 + Math.PI) },
      { x: Math.cos(t + Math.PI * 4/3), y: Math.sin(t + Math.PI * 4/3), z: Math.cos(t * 0.7 + Math.PI/2) },
      { x: Math.cos(t + Math.PI), y: Math.sin(t + Math.PI), z: Math.cos(t * 0.7 + Math.PI * 3/2) }
    ]

    tetrahedralAngles.forEach((angle, i) => {
      const distance = 70 + Math.sin(animationTime * 0.1 + i) * 5
      const hx = carbonX + distance * angle.x
      const hy = carbonY + distance * angle.y * 0.8 + angle.z * 20
      
      // Bond
      ctx.beginPath()
      ctx.moveTo(carbonX, carbonY)
      ctx.lineTo(hx, hy)
      ctx.strokeStyle = currentColors.bond
      ctx.lineWidth = 4
      ctx.stroke()
      
      // Hydrogen atom
      drawGlow(ctx, hx, hy, 15, currentColors.hydrogen)
      ctx.beginPath()
      ctx.arc(hx, hy, 12, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.hydrogen
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "16px Arial"
      ctx.fillText(lang === "bn" ? "কার্বন (C)" : "Carbon (C)", carbonX - 30, carbonY - 40)
      ctx.font = "12px Arial"
      ctx.fillText(lang === "bn" ? "হাইড্রোজেন (H)" : "Hydrogen (H)", carbonX + 80, carbonY - 20)
    }
  }

  const drawEthene = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.02 * animationSpeed
    const bondVibration = Math.sin(animationTime * 0.1) * 2
    
    // Carbon atoms
    const c1x = vibrate(centerX - 40, 1, animationTime)
    const c1y = vibrate(centerY, 1, animationTime)
    const c2x = vibrate(centerX + 40, 1, animationTime + Math.PI)
    const c2y = vibrate(centerY, 1, animationTime + Math.PI)

    // Double bond (two parallel lines with vibration)
    for (let i = 0; i < 2; i++) {
      ctx.beginPath()
      ctx.moveTo(c1x, c1y + (i * 8 - 4) + bondVibration)
      ctx.lineTo(c2x, c2y + (i * 8 - 4) + bondVibration)
      ctx.strokeStyle = i === 0 ? currentColors.bond : currentColors.bond + "AA"
      ctx.lineWidth = 5
      ctx.stroke()
    }

    // Carbon atoms with glow
    [{ x: c1x, y: c1y }, { x: c2x, y: c2y }].forEach((pos, idx) => {
      drawGlow(ctx, pos.x, pos.y, 25, currentColors.carbon)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.carbon
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
      
      drawElectronCloud(ctx, pos.x, pos.y, animationTime + idx * Math.PI)
    })

    // Hydrogen atoms in planar arrangement
    const hydrogenPositions = [
      { baseX: c1x, baseY: c1y, angle: -Math.PI/2 + t * 0.5 },
      { baseX: c1x, baseY: c1y, angle: Math.PI/2 + t * 0.5 },
      { baseX: c2x, baseY: c2y, angle: -Math.PI/2 - t * 0.5 },
      { baseX: c2x, baseY: c2y, angle: Math.PI/2 - t * 0.5 }
    ]

    hydrogenPositions.forEach((pos, i) => {
      const hx = pos.baseX + 50 * Math.cos(pos.angle)
      const hy = pos.baseY + 50 * Math.sin(pos.angle)
      
      // Bond
      ctx.beginPath()
      ctx.moveTo(pos.baseX, pos.baseY)
      ctx.lineTo(hx, hy)
      ctx.strokeStyle = currentColors.bond
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Hydrogen
      drawGlow(ctx, hx, hy, 12, currentColors.hydrogen)
      ctx.beginPath()
      ctx.arc(hx, hy, 10, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.hydrogen
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "দ্বিগুণ বন্ধন" : "Double Bond", centerX - 30, centerY - 50)
    }
  }

  const drawEthyne = (ctx: CanvasRenderingContext2D) => {
    const bondPulse = Math.sin(animationTime * 0.15) * 1.5
    
    // Carbon atoms
    const c1x = vibrate(centerX - 35, 0.5, animationTime)
    const c1y = vibrate(centerY, 0.5, animationTime)
    const c2x = vibrate(centerX + 35, 0.5, animationTime + Math.PI)
    const c2y = vibrate(centerY, 0.5, animationTime + Math.PI)

    // Triple bond (three parallel lines)
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(c1x, c1y + (i * 6 - 6) + bondPulse)
      ctx.lineTo(c2x, c2y + (i * 6 - 6) + bondPulse)
      ctx.strokeStyle = currentColors.bond
      ctx.globalAlpha = 1 - (i * 0.2)
      ctx.lineWidth = 4
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // Carbon atoms
    [{ x: c1x, y: c1y }, { x: c2x, y: c2y }].forEach((pos, idx) => {
      drawGlow(ctx, pos.x, pos.y, 25, currentColors.carbon)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.carbon
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
      
      drawElectronCloud(ctx, pos.x, pos.y, animationTime + idx * Math.PI)
    })

    // Hydrogen atoms (linear arrangement)
    const h1x = c1x - 70
    const h2x = c2x + 70
    
    [{ x: h1x, y: centerY, carbonX: c1x }, { x: h2x, y: centerY, carbonX: c2x }].forEach((h, i) => {
      // Bond
      ctx.beginPath()
      ctx.moveTo(h.carbonX, centerY)
      ctx.lineTo(h.x, h.y)
      ctx.strokeStyle = currentColors.bond
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Hydrogen
      drawGlow(ctx, h.x, h.y, 12, currentColors.hydrogen)
      ctx.beginPath()
      ctx.arc(h.x, h.y, 10, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.hydrogen
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "ত্রিগুণ বন্ধন" : "Triple Bond", centerX - 30, centerY - 50)
    }
  }

  const drawBenzene = (ctx: CanvasRenderingContext2D) => {
    const radius = 80
    const t = animationTime * 0.015 * animationSpeed * rotationSpeed
    const resonancePulse = Math.sin(animationTime * 0.1) * 0.3 + 0.7

    const positions = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + t
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      positions.push({ x: vibrate(x, 1, animationTime + i), y: vibrate(y, 1, animationTime + i + 1) })
    }

    // Resonance circle (benzene ring representation)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2)
    ctx.strokeStyle = currentColors.bond + "60"
    ctx.lineWidth = 8
    ctx.globalAlpha = resonancePulse
    ctx.stroke()
    ctx.globalAlpha = 1

    // Ring bonds
    for (let i = 0; i < 6; i++) {
      const { x, y } = positions[i]
      const next = positions[(i + 1) % 6]
      
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(next.x, next.y)
      ctx.strokeStyle = currentColors.bond
      ctx.lineWidth = 4
      ctx.stroke()
    }

    // Carbon atoms
    positions.forEach((pos, i) => {
      drawGlow(ctx, pos.x, pos.y, 20, currentColors.carbon)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.carbon
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
      
      drawElectronCloud(ctx, pos.x, pos.y, animationTime + i * Math.PI / 3)
    })

    // Hydrogen atoms
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + t
      const hx = centerX + (radius + 40) * Math.cos(angle)
      const hy = centerY + (radius + 40) * Math.sin(angle)
      
      // Bond
      ctx.beginPath()
      ctx.moveTo(positions[i].x, positions[i].y)
      ctx.lineTo(hx, hy)
      ctx.strokeStyle = currentColors.bond
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Hydrogen
      drawGlow(ctx, hx, hy, 10, currentColors.hydrogen)
      ctx.beginPath()
      ctx.arc(hx, hy, 8, 0, Math.PI * 2)
      ctx.fillStyle = currentColors.hydrogen
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "অনুনাদ রিং" : "Resonance Ring", centerX - 40, centerY - 110)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
    gradient.addColorStop(0, "#0a0a0a")
    gradient.addColorStop(1, "#1a1a2e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw molecule
    switch (moleculeIndex) {
      case 0: drawMethane(ctx); break
      case 1: drawEthene(ctx); break
      case 2: drawEthyne(ctx); break
      case 3: drawBenzene(ctx); break
    }

    // Enhanced info panel
    const panelWidth = 280
    const panelHeight = showBondingInfo ? 140 : 100
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)"
    ctx.fillRect(15, 15, panelWidth, panelHeight)
    ctx.strokeStyle = currentColors.bond
    ctx.lineWidth = 2
    ctx.strokeRect(15, 15, panelWidth, panelHeight)
    
    ctx.fillStyle = "#fff"
    ctx.font = "18px Arial"
    ctx.fillText(molecules[moleculeIndex].name, 25, 40)
    
    ctx.font = "12px Arial"
    ctx.fillStyle = "#ccc"
    ctx.fillText(molecules[moleculeIndex].description, 25, 60)
    ctx.fillText(`${lang === "bn" ? "সূত্র:" : "Formula:"} ${molecules[moleculeIndex].formula}`, 25, 80)
    
    if (showBondingInfo) {
      ctx.fillText(`${lang === "bn" ? "বন্ধনের ধরন:" : "Bond Type:"} ${molecules[moleculeIndex].bondType}`, 25, 100)
      ctx.fillText(`${lang === "bn" ? "মোট বন্ধন:" : "Total Bonds:"} ${molecules[moleculeIndex].bondCount}`, 25, 120)
      ctx.fillText(`${lang === "bn" ? "মলিকিউল:" : "Molecule:"} ${moleculeIndex + 1}/4`, 25, 140)
    }

    if (isPlaying) {
      setAnimationTime((prev) => prev + 1)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying, moleculeIndex, showLabels, animationSpeed, lang, vibrationIntensity, showElectrons, colorScheme, showBondingInfo, rotationSpeed])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMoleculeIndex(0)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="pt-6 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden shadow-2xl">
          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="w-full h-auto" />
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" className="bg-blue-50 hover:bg-blue-100">
            {isPlaying ? <><Pause className="h-4 w-4 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}</> : <><Play className="h-4 w-4 mr-2" /> {lang === "bn" ? "চালান" : "Play"}</>}
          </Button>
          <Button onClick={reset} variant="outline" className="bg-green-50 hover:bg-green-100">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
          </Button>
          <Button onClick={() => setShowLabels(!showLabels)} variant={showLabels ? "default" : "outline"}>
            <Calculator className="h-4 w-4 mr-2" /> {lang === "bn" ? "লেবেল" : "Labels"}
          </Button>
          <Button onClick={() => setShowElectrons(!showElectrons)} variant={showElectrons ? "default" : "outline"}>
            <Atom className="h-4 w-4 mr-2" /> {lang === "bn" ? "ইলেকট্রন" : "Electrons"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "মলিকিউল নির্বাচন" : "Select Molecule"}</Label>
              <Slider min={0} max={3} step={1} value={[moleculeIndex]} onValueChange={(v) => setMoleculeIndex(v[0])} className="mt-2" />
              <p className="text-right mt-1 text-sm font-mono text-blue-600">{molecules[moleculeIndex].name}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider min={0.1} max={3} step={0.1} value={[animationSpeed]} onValueChange={(v) => setAnimationSpeed(v[0])} className="mt-2" />
              <p className="text-right mt-1 text-sm text-green-600">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "কম্পন তীব্রতা" : "Vibration Intensity"}</Label>
              <Slider min={0} max={3} step={0.1} value={[vibrationIntensity]} onValueChange={(v) => setVibrationIntensity(v[0])} className="mt-2" />
              <p className="text-right mt-1 text-sm text-orange-600">{vibrationIntensity.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "ঘূর্ণন গতি" : "Rotation Speed"}</Label>
              <Slider min={0.1} max={2} step={0.1} value={[rotationSpeed]} onValueChange={(v) => setRotationSpeed(v[0])} className="mt-2" />
              <p className="text-right mt-1 text-sm text-purple-600">{rotationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-semibold">{lang === "bn" ? "রঙের থিম" : "Color Theme"}</Label>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant={colorScheme === "classic" ? "default" : "outline"} onClick={() => setColorScheme("classic")}>
                  {lang === "bn" ? "ক্লাসিক" : "Classic"}
                </Button>
                <Button size="sm" variant={colorScheme === "neon" ? "default" : "outline"} onClick={() => setColorScheme("neon")}>
                  {lang === "bn" ? "নিয়ন" : "Neon"}
                </Button>
                <Button size="sm" variant={colorScheme === "pastel" ? "default" : "outline"} onClick={() => setColorScheme("pastel")}>
                  {lang === "bn" ? "প্যাস্টেল" : "Pastel"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Button onClick={() => setShowBondingInfo(!showBondingInfo)} variant={showBondingInfo ? "default" : "outline"} size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" /> {lang === "bn" ? "বন্ধনের তথ্য" : "Bonding Info"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Language:"}</p>
              <div className="flex gap-2 mt-2">
                <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>English</Button>
                <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>বাংলা</Button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500">{lang === "bn" ? "ইন্টারঅ্যাক্টিভ মলিকিউলার সিমুলেশন" : "Interactive Molecular Simulation"}</p>
              <p className="text-xs text-gray-400">{lang === "bn" ? "হাইড্রোকার্বন রসায়ন শিক্ষার জন্য" : "For Hydrocarbon Chemistry Education"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}