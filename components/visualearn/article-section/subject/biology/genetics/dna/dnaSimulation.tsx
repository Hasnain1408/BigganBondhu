"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

export default function DNASimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [helixRadius, setHelixRadius] = useState(50)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showBasePairs, setShowBasePairs] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions and center
  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const drawHelix = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // Background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Perspective projection parameters
    const fov = 1000
    const perspective = (z: number) => fov / (fov + z)

    // DNA helix parameters
    const helixHeight = 300
    const turns = 3
    const basePairSpacing = helixHeight / 30
    const rotation = time * 0.02 * rotationSpeed

    // Draw backbone strands
    ctx.lineWidth = 3
    ctx.strokeStyle = "#ff4444"
    const points1: {x: number, y: number, z: number}[] = []
    const points2: {x: number, y: number, z: number}[] = []

    // Calculate points for both strands
    for (let y = -helixHeight / 2; y <= helixHeight / 2; y += 5) {
      const angle = (y / helixHeight) * turns * 2 * Math.PI + rotation
      const x1 = helixRadius * Math.cos(angle)
      const z1 = helixRadius * Math.sin(angle)
      const x2 = helixRadius * Math.cos(angle + Math.PI)
      const z2 = helixRadius * Math.sin(angle + Math.PI)

      points1.push({ x: x1, y, z: z1 })
      points2.push({ x: x2, y, z: z2 })
    }

    // Draw first strand
    ctx.beginPath()
    points1.forEach(({ x, y, z }, i) => {
      const scale = perspective(z) * zoomLevel
      const px = centerX + x * scale
      const py = centerY + y * scale
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    })
    ctx.stroke()

    // Draw second strand
    ctx.strokeStyle = "#4444ff"
    ctx.beginPath()
    points2.forEach(({ x, y, z }, i) => {
      const scale = perspective(z) * zoomLevel
      const px = centerX + x * scale
      const py = centerY + y * scale
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    })
    ctx.stroke()

    // Draw base pairs
    if (showBasePairs) {
      ctx.lineWidth = 1
      ctx.strokeStyle = "#666"
      for (let y = -helixHeight / 2; y <= helixHeight / 2; y += basePairSpacing) {
        const angle = (y / helixHeight) * turns * 2 * Math.PI + rotation
        const x1 = helixRadius * Math.cos(angle)
        const z1 = helixRadius * Math.sin(angle)
        const x2 = helixRadius * Math.cos(angle + Math.PI)
        const z2 = helixRadius * Math.sin(angle + Math.PI)

        const scale1 = perspective(z1) * zoomLevel
        const scale2 = perspective(z2) * zoomLevel
        ctx.beginPath()
        ctx.moveTo(centerX + x1 * scale1, centerY + y * scale1)
        ctx.lineTo(centerX + x2 * scale2, centerY + y * scale2)
        ctx.stroke()

        // Base pair labels (random A-T or G-C)
        const base = Math.random() > 0.5 ? "A-T" : "G-C"
        ctx.fillStyle = "#333"
        ctx.font = "12px Arial"
        ctx.fillText(base, centerX + (x1 * scale1 + x2 * scale2) / 2, centerY + y * scale1 + 5)
      }
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 220, 120)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `হেলিক্স ব্যাসার্ধ: ${helixRadius.toFixed(0)}`,
      `ঘূর্ণন গতি: ${rotationSpeed.toFixed(1)}x`,
      `জুম: ${zoomLevel.toFixed(1)}x`,
      `বেস জোড়া: ${showBasePairs ? "দৃশ্যমান" : "অদৃশ্য"}`,
      `ডিএনএ প্রকার: B-DNA`
    ] : [
      `Helix Radius: ${helixRadius.toFixed(0)}`,
      `Rotation Speed: ${rotationSpeed.toFixed(1)}x`,
      `Zoom: ${zoomLevel.toFixed(1)}x`,
      `Base Pairs: ${showBasePairs ? "Visible" : "Hidden"}`,
      `DNA Type: B-DNA`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 20)
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawHelix(ctx, animationTime)
    
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
  }, [isPlaying, rotationSpeed, helixRadius, zoomLevel, showBasePairs, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setHelixRadius(50)
    setRotationSpeed(1)
    setZoomLevel(1)
    setShowBasePairs(true)
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
            onClick={() => setShowBasePairs(!showBasePairs)} 
            variant={showBasePairs ? "default" : "outline"}
          >
            {lang === "bn" ? "বেস জোড়া" : "Base Pairs"}
          </Button>
          <Button 
            onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))} 
            variant="outline"
          >
            <ZoomIn className="h-4 w-4 mr-2" /> {lang === "bn" ? "জুম ইন" : "Zoom In"}
          </Button>
          <Button 
            onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))} 
            variant="outline"
          >
            <ZoomOut className="h-4 w-4 mr-2" /> {lang === "bn" ? "জুম আউট" : "Zoom Out"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "হেলিক্স ব্যাসার্ধ" : "Helix Radius"}</Label>
              <Slider
                min={20}
                max={80}
                step={5}
                value={[helixRadius]}
                onValueChange={(v) => setHelixRadius(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{helixRadius.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ঘূর্ণন গতি" : "Rotation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[rotationSpeed]}
                onValueChange={(v) => setRotationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{rotationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "জুম স্তর" : "Zoom Level"}</Label>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[zoomLevel]}
                onValueChange={(v) => setZoomLevel(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{zoomLevel.toFixed(1)}x</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "ডিএনএ স্ট্র্যান্ড ১ (লাল)" : "DNA Strand 1 (Red)"}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {lang === "bn" 
                  ? "একটি পলিনিউক্লিওটাইড স্ট্র্যান্ড, 5' থেকে 3' দিকে।"
                  : "One polynucleotide strand, running 5' to 3'."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ডিএনএ স্ট্র্যান্ড ২ (নীল)" : "DNA Strand 2 (Blue)"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "অপর পলিনিউক্লিওটাইড স্ট্র্যান্ড, 3' থেকে 5' দিকে।"
                  : "The other polynucleotide strand, running 3' to 5'."}
              </p>
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