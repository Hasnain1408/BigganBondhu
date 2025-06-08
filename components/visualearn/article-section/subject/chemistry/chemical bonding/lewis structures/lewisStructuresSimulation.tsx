"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function LewisStructuresSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [moleculeIndex, setMoleculeIndex] = useState(0) // 0: CH₄, 1: NH₃, 2: CO₂
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const molecules = [
    {
      name: "CH₄",
      atoms: [{ symbol: "C", valence: 4 }, { symbol: "H", valence: 1 }, { symbol: "H", valence: 1 }, { symbol: "H", valence: 1 }, { symbol: "H", valence: 1 }],
      bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
      lonePairs: [],
    },
    {
      name: "NH₃",
      atoms: [{ symbol: "N", valence: 5 }, { symbol: "H", valence: 1 }, { symbol: "H", valence: 1 }, { symbol: "H", valence: 1 }],
      bonds: [[0, 1], [0, 2], [0, 3]],
      lonePairs: [[0, 2]], // Nitrogen has 1 lone pair (2 electrons)
    },
    {
      name: "CO₂",
      atoms: [{ symbol: "C", valence: 4 }, { symbol: "O", valence: 6 }, { symbol: "O", valence: 6 }],
      bonds: [[0, 1, "double"], [0, 2, "double"]],
      lonePairs: [[1, 4], [2, 4]], // Each oxygen has 2 lone pairs (4 electrons)
    },
  ]

  const drawMolecule = (ctx: CanvasRenderingContext2D, molecule: typeof molecules[0]) => {
    const t = animationTime * 0.05 * animationSpeed
    const positions = molecule.name === "CH₄" ?
      [
        { x: centerX, y: centerY }, // C
        { x: centerX - 80, y: centerY - 80 }, // H1
        { x: centerX + 80, y: centerY - 80 }, // H2
        { x: centerX - 80, y: centerY + 80 }, // H3
        { x: centerX + 80, y: centerY + 80 }, // H4
      ] :
      molecule.name === "NH₃" ?
      [
        { x: centerX, y: centerY }, // N
        { x: centerX - 80, y: centerY + 80 }, // H1
        { x: centerX + 80, y: centerY + 80 }, // H2
        { x: centerX, y: centerY - 80 }, // H3
      ] :
      [
        { x: centerX, y: centerY }, // C
        { x: centerX - 120, y: centerY }, // O1
        { x: centerX + 120, y: centerY }, // O2
      ]

    // Draw bonds
    molecule.bonds.forEach(([a1, a2, type]) => {
      const x1 = positions[a1].x
      const y1 = positions[a1].y
      const x2 = positions[a2].x
      const y2 = positions[a2].y
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = type === "double" ? 4 : 2
      ctx.stroke()
      if (type === "double") {
        ctx.beginPath()
        ctx.moveTo(x1, y1 + 5)
        ctx.lineTo(x2, y2 + 5)
        ctx.stroke()
      }
    })

    // Draw atoms
    molecule.atoms.forEach((atom, i) => {
      ctx.beginPath()
      ctx.arc(positions[i].x, positions[i].y, 30, 0, Math.PI * 2)
      ctx.fillStyle = atom.symbol === "H" ? "#44ff44" : atom.symbol === "C" ? "#888" : "#ff4444"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(atom.symbol, positions[i].x, positions[i].y + 5)
      if (showLabels) {
        ctx.fillText(lang === "bn" ? "পরমাণু" : "Atom", positions[i].x, positions[i].y - 40)
      }
    })

    // Draw lone pairs
    molecule.lonePairs.forEach(([atomIndex, numElectrons]) => {
      const x = positions[atomIndex].x
      const y = positions[atomIndex].y
      for (let i = 0; i < numElectrons; i += 2) {
        const angle = t + (i * Math.PI) / 2
        const dx = 40 * Math.cos(angle)
        const dy = 40 * Math.sin(angle)
        ctx.beginPath()
        ctx.arc(x + dx, y + dy, 5, 0, Math.PI * 2)
        ctx.fillStyle = "#0000ff"
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x + dx + 10, y + dy, 5, 0, Math.PI * 2)
        ctx.fill()
        if (showLabels && i === 0) {
          ctx.fillText(lang === "bn" ? "একাকী জোড়া" : "Lone Pair", x + dx, y + dy - 20)
        }
      }
    })

    // Draw bonding electrons
    molecule.bonds.forEach(([a1, a2, type]) => {
      const x1 = positions[a1].x
      const y1 = positions[a1].y
      const x2 = positions[a2].x
      const y2 = positions[a2].y
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      const numElectrons = type === "double" ? 4 : 2
      for (let i = 0; i < numElectrons; i++) {
        const angle = t + (i * 2 * Math.PI) / numElectrons
        const x = midX + 10 * Math.cos(angle)
        const y = midY + 10 * Math.sin(angle)
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "#0000ff"
        ctx.fill()
      }
      if (showLabels) {
        ctx.fillText(lang === "bn" ? "বন্ধন জোড়া" : "Bonding Pair", midX, midY - 20)
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    const molecule = molecules[moleculeIndex]
    drawMolecule(ctx, molecule)

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(lang === "bn" ? `অণু: ${molecule.name}` : `Molecule: ${molecule.name}`, 20, 35)
    ctx.fillText(
      lang === "bn" ? `বন্ধন: ${molecule.bonds.length}টি` : `Bonds: ${molecule.bonds.length}`,
      20,
      55
    )
    ctx.fillText(
      lang === "bn" ? `একাকী জোড়া: ${molecule.lonePairs.reduce((sum, [, n]) => sum + n / 2, 0)}টি` : `Lone Pairs: ${molecule.lonePairs.reduce((sum, [, n]) => sum + n / 2, 0)}`,
      20,
      75
    )

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
  }, [isPlaying, moleculeIndex, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMoleculeIndex(0)
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অণু নির্বাচন" : "Select Molecule"}</Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={[moleculeIndex]}
                onValueChange={(v) => setMoleculeIndex(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{molecules[moleculeIndex].name}</p>
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