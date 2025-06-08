"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function GroupsAndFamiliesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [groupIndex, setGroupIndex] = useState(0) // 0: Group 1, 1: Group 2, 2: Group 17, 3: Group 18
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  const canvasWidth = 800
  const canvasHeight = 500
  const cellWidth = 40
  const cellHeight = 40
  const periodicTable = [
    ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
    ["Li", "Be", "", "", "", "", "", "", "", "", "", "", "B", "C", "N", "O", "F", "Ne"],
    ["Na", "Mg", "", "", "", "", "", "", "", "", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
    ["K", "Ca", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Br", "Kr"],
    ["Rb", "Sr", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "Xe"],
    ["Cs", "Ba", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "At", "Rn"],
  ]

  const groups = [
    {
      name: "Group 1 (Alkali Metals)",
      elements: ["Li", "Na", "K", "Rb", "Cs"],
      properties: { valence: 1, reactivity: "High", type: "Metal" },
      color: "#ff4444",
    },
    {
      name: "Group 2 (Alkaline Earth Metals)",
      elements: ["Be", "Mg", "Ca", "Sr", "Ba"],
      properties: { valence: 2, reactivity: "Moderate", type: "Metal" },
      color: "#44ff44",
    },
    {
      name: "Group 17 (Halogens)",
      elements: ["F", "Cl", "Br", "I", "At"],
      properties: { valence: 7, reactivity: "High", type: "Nonmetal" },
      color: "#4444ff",
    },
    {
      name: "Group 18 (Noble Gases)",
      elements: ["He", "Ne", "Ar", "Kr", "Xe", "Rn"],
      properties: { valence: 8, reactivity: "Low", type: "Gas" },
      color: "#ffaa44",
    },
  ]

  const drawPeriodicTable = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    const pulse = Math.sin(t) * 5

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw periodic table grid
    periodicTable.forEach((row, rowIndex) => {
      row.forEach((element, colIndex) => {
        const x = colIndex * cellWidth + 20
        const y = rowIndex * cellHeight + 50

        // Highlight selected group
        const isInGroup = groups[groupIndex].elements.includes(element)
        ctx.fillStyle = isInGroup ? groups[groupIndex].color : "#e0e0e0"
        ctx.fillRect(x, y, cellWidth - 2, cellHeight - 2)

        // Pulse effect for selected group
        if (isInGroup && isPlaying) {
          ctx.beginPath()
          ctx.arc(x + cellWidth / 2, y + cellHeight / 2, 15 + pulse, 0, Math.PI * 2)
          ctx.strokeStyle = groups[groupIndex].color
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Draw element symbol
        if (element) {
          ctx.fillStyle = selectedElement === element ? "#ffffff" : "#000000"
          ctx.font = "14px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(element, x + cellWidth / 2, y + cellHeight / 2)
        }
      })
    })

    // Draw group info
    const group = groups[groupIndex]
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 120)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `গ্রুপ: ${group.name}` : `Group: ${group.name}`,
      20,
      35
    )
    ctx.fillText(
      lang === "bn" ? `ভ্যালেন্স ইলেকট্রন: ${group.properties.valence}` : `Valence Electrons: ${group.properties.valence}`,
      20,
      55
    )
    ctx.fillText(
      lang === "bn" ? `প্রতিক্রিয়াশীলতা: ${group.properties.reactivity}` : `Reactivity: ${group.properties.reactivity}`,
      20,
      75
    )
    ctx.fillText(
      lang === "bn" ? `প্রকার: ${group.properties.type}` : `Type: ${group.properties.type}`,
      20,
      95
    )

    // Draw selected element info
    if (selectedElement && showLabels) {
      const elementGroup = groups.find(g => g.elements.includes(selectedElement))
      if (elementGroup) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.fillRect(canvasWidth - 200, 10, 190, 100)
        ctx.fillStyle = "#000"
        ctx.fillText(
          lang === "bn" ? `মৌল: ${selectedElement}` : `Element: ${selectedElement}`,
          canvasWidth - 190,
          35
        )
        ctx.fillText(
          lang === "bn" ? `গ্রুপ: ${elementGroup.name}` : `Group: ${elementGroup.name}`,
          canvasWidth - 190,
          55
        )
      }
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawPeriodicTable(ctx)

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
  }, [isPlaying, groupIndex, showLabels, animationSpeed, animationTime, lang, selectedElement])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setGroupIndex(0)
    setSelectedElement(null)
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const col = Math.floor((x - 20) / cellWidth)
    const row = Math.floor((y - 50) / cellHeight)

    if (row >= 0 && row < periodicTable.length && col >= 0 && col < periodicTable[0].length) {
      const element = periodicTable[row][col]
      if (element) {
        setSelectedElement(element)
      }
    }
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
            onClick={handleCanvasClick}
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
              <Label className="text-sm">{lang === "bn" ? "গ্রুপ নির্বাচন" : "Select Group"}</Label>
              <Slider
                min={0}
                max={3}
                step={1}
                value={[groupIndex]}
                onValueChange={(v) => setGroupIndex(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{groups[groupIndex].name}</p>
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