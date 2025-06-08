"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RefreshCw, Eye, Zap, Atom, Beaker, Info, Volume2, VolumeX } from "lucide-react"

export default function EnhancedCovalentBondingSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [moleculeIndex, setMoleculeIndex] = useState(0)
  const [showLabels, setShowLabels] = useState(true)
  const [showElectronOrbitals, setShowElectronOrbitals] = useState(false)
  const [showBondEnergy, setShowBondEnergy] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1.5)
  const [lang, setLang] = useState("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [vibrationIntensity, setVibrationIntensity] = useState(1)
  const [temperature, setTemperature] = useState(300) // Kelvin
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [selectedAtom, setSelectedAtom] = useState(null)

  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const molecules = [
    { 
      name: "H₂", 
      atoms: [
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" }
      ], 
      bonds: [{ type: "single", between: [0, 1], energy: 436, length: 74 }],
      angle: 180,
      description: { en: "Hydrogen molecule - simplest covalent bond", bn: "হাইড্রোজেন অণু - সহজতম সমযোজী বন্ধন" }
    },
    { 
      name: "O₂", 
      atoms: [
        { symbol: "O", electronegativity: 3.5, radius: 35, color: "#FF6B6B" },
        { symbol: "O", electronegativity: 3.5, radius: 35, color: "#FF6B6B" }
      ], 
      bonds: [{ type: "double", between: [0, 1], energy: 498, length: 121 }],
      angle: 180,
      description: { en: "Oxygen molecule - double covalent bond", bn: "অক্সিজেন অণু - দ্বিগুণ সমযোজী বন্ধন" }
    },
    { 
      name: "H₂O", 
      atoms: [
        { symbol: "O", electronegativity: 3.5, radius: 35, color: "#FF6B6B" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" }
      ], 
      bonds: [
        { type: "single", between: [0, 1], energy: 463, length: 96 },
        { type: "single", between: [0, 2], energy: 463, length: 96 }
      ],
      angle: 104.5,
      description: { en: "Water molecule - bent molecular geometry", bn: "পানির অণু - বাঁকা আণবিক জ্যামিতি" }
    },
    { 
      name: "NH₃", 
      atoms: [
        { symbol: "N", electronegativity: 3.0, radius: 32, color: "#4ECDC4" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" }
      ], 
      bonds: [
        { type: "single", between: [0, 1], energy: 389, length: 101 },
        { type: "single", between: [0, 2], energy: 389, length: 101 },
        { type: "single", between: [0, 3], energy: 389, length: 101 }
      ],
      angle: 107,
      description: { en: "Ammonia - trigonal pyramidal geometry", bn: "অ্যামোনিয়া - ত্রিকোণীয় পিরামিড জ্যামিতি" }
    },
    { 
      name: "CH₄", 
      atoms: [
        { symbol: "C", electronegativity: 2.5, radius: 30, color: "#45B7D1" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" },
        { symbol: "H", electronegativity: 2.1, radius: 25, color: "#87CEEB" }
      ], 
      bonds: [
        { type: "single", between: [0, 1], energy: 413, length: 109 },
        { type: "single", between: [0, 2], energy: 413, length: 109 },
        { type: "single", between: [0, 3], energy: 413, length: 109 },
        { type: "single", between: [0, 4], energy: 413, length: 109 }
      ],
      angle: 109.5,
      description: { en: "Methane - tetrahedral geometry", bn: "মিথেন - চতুস্তলকীয় জ্যামিতি" }
    }
  ]

  const getAtomPositions = (molecule, t) => {
    const vibration = Math.sin(t * 0.1) * vibrationIntensity * (temperature / 300)
    const bondLength = 80
    
    if (molecule.name === "H₂O") {
      const angleRad = (molecule.angle * Math.PI) / 180
      return [
        { x: centerX + vibration, y: centerY + vibration },
        { x: centerX - bondLength * Math.cos(angleRad/2) + vibration, y: centerY + bondLength * Math.sin(angleRad/2) + vibration },
        { x: centerX + bondLength * Math.cos(angleRad/2) + vibration, y: centerY + bondLength * Math.sin(angleRad/2) + vibration }
      ]
    } else if (molecule.name === "NH₃") {
      return [
        { x: centerX, y: centerY - 20 },
        { x: centerX - bondLength, y: centerY + 40 + vibration },
        { x: centerX + bondLength/2, y: centerY + 40 + vibration },
        { x: centerX + bondLength, y: centerY + 40 + vibration }
      ]
    } else if (molecule.name === "CH₄") {
      const tetAngle = 109.5 * Math.PI / 180
      return [
        { x: centerX, y: centerY },
        { x: centerX - bondLength, y: centerY - bondLength/2 + vibration },
        { x: centerX + bondLength, y: centerY - bondLength/2 + vibration },
        { x: centerX, y: centerY + bondLength + vibration },
        { x: centerX, y: centerY - bondLength + vibration }
      ]
    } else {
      return [
        { x: centerX - bondLength + vibration, y: centerY + vibration },
        { x: centerX + bondLength + vibration, y: centerY + vibration }
      ]
    }
  }

  const createGradient = (ctx, x1, y1, x2, y2, color1, color2) => {
    const gradient = ctx.createRadialGradient(x1, y1, 0, x1, y1, 40)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)
    return gradient
  }

  const drawElectronOrbitals = (ctx, positions, molecule) => {
    if (!showElectronOrbitals) return
    
    positions.forEach((pos, i) => {
      const atom = molecule.atoms[i]
      ctx.beginPath()
      ctx.setLineDash([5, 5])
      ctx.strokeStyle = `${atom.color}40`
      ctx.lineWidth = 2
      ctx.arc(pos.x, pos.y, atom.radius + 20, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
    })
  }

  const drawBonds = (ctx, positions, molecule, t) => {
    molecule.bonds.forEach((bond, bondIndex) => {
      const [a1, a2] = bond.between
      const x1 = positions[a1].x
      const y1 = positions[a1].y
      const x2 = positions[a2].x
      const y2 = positions[a2].y
      
      // Animated bond strength
      const bondStrength = 1 + Math.sin(t * 0.05) * 0.1
      const bondWidth = bond.type === "single" ? 3 * bondStrength : bond.type === "double" ? 5 * bondStrength : 7 * bondStrength
      
      // Create gradient for bond
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, molecule.atoms[a1].color)
      gradient.addColorStop(1, molecule.atoms[a2].color)
      
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = gradient
      ctx.lineWidth = bondWidth
      ctx.lineCap = "round"
      ctx.stroke()
      
      // Double/Triple bond lines
      if (bond.type === "double") {
        const perpX = -(y2 - y1) / Math.sqrt((x2-x1)**2 + (y2-y1)**2) * 8
        const perpY = (x2 - x1) / Math.sqrt((x2-x1)**2 + (y2-y1)**2) * 8
        
        ctx.beginPath()
        ctx.moveTo(x1 + perpX, y1 + perpY)
        ctx.lineTo(x2 + perpX, y2 + perpY)
        ctx.stroke()
      }
      
      // Bond energy display
      if (showBondEnergy) {
        const midX = (x1 + x2) / 2
        const midY = (y1 + y2) / 2
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`${bond.energy} kJ/mol`, midX, midY - 15)
      }
    })
  }

  const drawAtoms = (ctx, positions, molecule, t) => {
    positions.forEach((pos, i) => {
      const atom = molecule.atoms[i]
      const isSelected = selectedAtom === i
      const pulseScale = isSelected ? 1 + Math.sin(t * 0.2) * 0.1 : 1
      const radius = atom.radius * pulseScale
      
      // Atom shadow
      ctx.beginPath()
      ctx.arc(pos.x + 3, pos.y + 3, radius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0,0,0,0.2)"
      ctx.fill()
      
      // Atom body with gradient
      const gradient = createGradient(ctx, pos.x - 10, pos.y - 10, pos.x + 10, pos.y + 10, 
        atom.color, atom.color + "80")
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      
      // Atom border
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
      ctx.strokeStyle = isSelected ? "#FFD700" : "#fff"
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.stroke()
      
      // Atom symbol
      ctx.fillStyle = "#fff"
      ctx.font = `bold ${Math.max(14, radius/2)}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(atom.symbol, pos.x, pos.y)
      
      // Labels
      if (showLabels) {
        ctx.fillStyle = "#333"
        ctx.font = "11px Arial"
        ctx.fillText(
          lang === "bn" ? "পরমাণু" : `${atom.symbol} (${atom.electronegativity})`,
          pos.x, pos.y - radius - 15
        )
      }
    })
  }

  const drawSharedElectrons = (ctx, positions, molecule, t) => {
    molecule.bonds.forEach((bond, bondIndex) => {
      const [a1, a2] = bond.between
      const x1 = positions[a1].x
      const y1 = positions[a1].y
      const x2 = positions[a2].x
      const y2 = positions[a2].y
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      
      const numElectrons = bond.type === "single" ? 2 : bond.type === "double" ? 4 : 6
      const orbitRadius = 15 + Math.sin(t * 0.1) * 3
      
      for (let i = 0; i < numElectrons; i++) {
        const angle = t * animationSpeed + (i * 2 * Math.PI) / numElectrons
        const x = midX + orbitRadius * Math.cos(angle)
        const y = midY + orbitRadius * Math.sin(angle)
        
        // Electron trail effect
        for (let j = 0; j < 3; j++) {
          const trailAngle = angle - j * 0.3
          const trailX = midX + orbitRadius * Math.cos(trailAngle)
          const trailY = midY + orbitRadius * Math.sin(trailAngle)
          
          ctx.beginPath()
          ctx.arc(trailX, trailY, 3 - j, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 100, 255, ${0.7 - j * 0.2})`
          ctx.fill()
        }
        
        // Main electron
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#0066FF"
        ctx.fill()
        ctx.strokeStyle = "#004499"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })
  }

  const handleCanvasClick = (event) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const clickX = (event.clientX - rect.left) * (canvasWidth / rect.width)
    const clickY = (event.clientY - rect.top) * (canvasHeight / rect.height)
    
    const molecule = molecules[moleculeIndex]
    const positions = getAtomPositions(molecule, animationTime)
    
    // Check if click is on an atom
    positions.forEach((pos, i) => {
      const distance = Math.sqrt((clickX - pos.x) ** 2 + (clickY - pos.y) ** 2)
      if (distance < molecule.atoms[i].radius) {
        setSelectedAtom(selectedAtom === i ? null : i)
        if (soundEnabled) {
          // Simulate sound feedback
          console.log(`Atom ${molecule.atoms[i].symbol} selected`)
        }
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Create animated background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400)
    gradient.addColorStop(0, "#1a1a2e")
    gradient.addColorStop(1, "#16213e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const molecule = molecules[moleculeIndex]
    const positions = getAtomPositions(molecule, animationTime)
    
    // Draw components in layers
    drawElectronOrbitals(ctx, positions, molecule)
    drawBonds(ctx, positions, molecule, animationTime)
    drawSharedElectrons(ctx, positions, molecule, animationTime)
    drawAtoms(ctx, positions, molecule, animationTime)

    // Enhanced info panel
    const panelWidth = 280
    const panelHeight = 160
    const panelX = 20
    const panelY = 20
    
    // Panel background with blur effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(panelX, panelY, panelWidth, panelHeight)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 1
    ctx.strokeRect(panelX, panelY, panelWidth, panelHeight)
    
    // Panel content
    ctx.fillStyle = "#fff"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `অণু: ${molecule.name}` : `Molecule: ${molecule.name}`,
      panelX + 15, panelY + 25
    )
    
    ctx.font = "12px Arial"
    ctx.fillText(molecule.description[lang], panelX + 15, panelY + 45)
    ctx.fillText(
      lang === "bn" ? `তাপমাত্রা: ${temperature}K` : `Temperature: ${temperature}K`,
      panelX + 15, panelY + 65
    )
    ctx.fillText(
      lang === "bn" ? `কোণ: ${molecule.angle}°` : `Bond Angle: ${molecule.angle}°`,
      panelX + 15, panelY + 85
    )
    
    if (selectedAtom !== null) {
      const atom = molecule.atoms[selectedAtom]
      ctx.fillText(
        lang === "bn" ? 
        `নির্বাচিত: ${atom.symbol} (বিদ্যুৎ ঋণাত্মকতা: ${atom.electronegativity})` :
        `Selected: ${atom.symbol} (Electronegativity: ${atom.electronegativity})`,
        panelX + 15, panelY + 105
      )
    }

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
  }, [isPlaying, moleculeIndex, showLabels, showElectronOrbitals, showBondEnergy, animationSpeed, animationTime, vibrationIntensity, temperature, lang, selectedAtom])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(true)
    setSelectedAtom(null)
    setMoleculeIndex(0)
    setTemperature(300)
    setVibrationIntensity(1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-xl">
      <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Atom className="h-8 w-8" />
            {lang === "bn" ? "উন্নত সমযোজী বন্ধন সিমুলেশন" : "Enhanced Covalent Bonding Simulation"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              width={canvasWidth} 
              height={canvasHeight} 
              onClick={handleCanvasClick}
              className="w-full h-auto bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg border-4 border-blue-300 cursor-pointer shadow-inner"
            />
            <Badge className="absolute top-4 right-4 bg-blue-600">
              {lang === "bn" ? "ইন্টারঅ্যাক্টিভ" : "Interactive"}
            </Badge>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600">
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
            <Button onClick={reset} variant="outline" className="hover:bg-red-50">
              <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "রিসেট" : "Reset"}
            </Button>
            <Button 
              onClick={() => setShowLabels(!showLabels)} 
              variant={showLabels ? "default" : "outline"}
              className="hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "লেবেল" : "Labels"}
            </Button>
            <Button 
              onClick={() => setShowElectronOrbitals(!showElectronOrbitals)} 
              variant={showElectronOrbitals ? "default" : "outline"}
              className="hover:bg-purple-50"
            >
              <Zap className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "অরবিটাল" : "Orbitals"}
            </Button>
            <Button 
              onClick={() => setShowBondEnergy(!showBondEnergy)} 
              variant={showBondEnergy ? "default" : "outline"}
              className="hover:bg-yellow-50"
            >
              <Info className="h-4 w-4 mr-2" /> 
              {lang === "bn" ? "শক্তি" : "Energy"}
            </Button>
            <Button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              variant={soundEnabled ? "default" : "outline"}
              className="hover:bg-orange-50"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {lang === "bn" ? "শব্দ" : "Sound"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Beaker className="h-4 w-4" />
                  {lang === "bn" ? "অণু নির্বাচন" : "Select Molecule"}
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {molecules.map((molecule, index) => (
                    <Button
                      key={index}
                      variant={moleculeIndex === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMoleculeIndex(index)}
                      className={`font-mono font-bold transition-all duration-200 ${
                        moleculeIndex === index 
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105" 
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {molecule.name}
                    </Button>
                  ))}
                </div>
                <p className="text-center mt-3 text-lg font-mono font-bold text-blue-700">
                  {molecules[moleculeIndex].name} - {molecules[moleculeIndex].description[lang]}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
                <Slider
                  min={0.1}
                  max={4}
                  step={0.1}
                  value={[animationSpeed]}
                  onValueChange={(v) => setAnimationSpeed(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-bold text-green-700">{animationSpeed.toFixed(1)}x</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900 dark:to-orange-900">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "তাপমাত্রা (K)" : "Temperature (K)"}</Label>
                <Slider
                  min={100}
                  max={800}
                  step={10}
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-bold text-red-700">{temperature}K</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "কম্পন তীব্রতা" : "Vibration Intensity"}</Label>
                <Slider
                  min={0}
                  max={3}
                  step={0.1}
                  value={[vibrationIntensity]}
                  onValueChange={(v) => setVibrationIntensity(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-bold text-purple-700">{vibrationIntensity.toFixed(1)}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900 dark:to-amber-900">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold mb-3 block">
                  {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
                </Label>
                <div className="flex gap-3">
                  <Button
                    variant={lang === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLang("en")}
                    className="flex-1"
                  >
                    English
                  </Button>
                  <Button
                    variant={lang === "bn" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLang("bn")}
                    className="flex-1"
                  >
                    বাংলা
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedAtom !== null && (
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-2">
                  {lang === "bn" ? "পরমাণুর তথ্য" : "Atom Information"}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>{lang === "bn" ? "প্রতীক:" : "Symbol:"}</strong> {molecules[moleculeIndex].atoms[selectedAtom].symbol}
                  </div>
                  <div>
                    <strong>{lang === "bn" ? "বিদ্যুৎ ঋণাত্মকতা:" : "Electronegativity:"}</strong> {molecules[moleculeIndex].atoms[selectedAtom].electronegativity}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                {lang === "bn" ? "নির্দেশাবলী" : "Instructions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-blue-600">
                    {lang === "bn" ? "ইন্টারঅ্যাকশন:" : "Interactions:"}
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• {lang === "bn" ? "পরমাণুতে ক্লিক করে নির্বাচন করুন" : "Click atoms to select and view details"}</li>
                    <li>• {lang === "bn" ? "তাপমাত্রা বাড়িয়ে কম্পন দেখুন" : "Increase temperature to see molecular vibration"}</li>
                    <li>• {lang === "bn" ? "অরবিটাল বোতাম চেপে ইলেকট্রন কক্ষপথ দেখুন" : "Toggle orbitals to see electron paths"}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">
                    {lang === "bn" ? "বৈশিষ্ট্য:" : "Features:"}
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• {lang === "bn" ? "রিয়েল-টাইম বন্ধন শক্তি প্রদর্শন" : "Real-time bond energy display"}</li>
                    <li>• {lang === "bn" ? "ইন্টারঅ্যাক্টিভ অণু নির্বাচন" : "Interactive molecule selection"}</li>
                    <li>• {lang === "bn" ? "অ্যানিমেটেড ইলেকট্রন ভাগাভাগি" : "Animated electron sharing visualization"}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}