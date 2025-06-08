"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function ElectronConfigurationSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [atomicNumber, setAtomicNumber] = useState(6) // Default: Carbon
  const [showOrbitals, setShowOrbitals] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const nucleusRadius = 30
  const orbitalRadius = [50, 100, 150, 200] // Radii for energy levels

  // Electron configuration data
  const getElectronConfig = (z: number) => {
    const orbitals = [
      { name: "1s", max: 2, level: 1 },
      { name: "2s", max: 2, level: 2 },
      { name: "2p", max: 6, level: 2 },
      { name: "3s", max: 2, level: 3 },
      { name: "3p", max: 6, level: 3 },
      { name: "4s", max: 2, level: 4 },
      { name: "3d", max: 10, level: 3 },
    ]
    let electrons = z
    const config: { name: string; electrons: number; level: number }[] = []
    for (const orbital of orbitals) {
      if (electrons <= 0) break
      const num = Math.min(electrons, orbital.max)
      config.push({ name: orbital.name, electrons: num, level: orbital.level })
      electrons -= num
    }
    return config
  }

  const drawNucleus = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#ff4444"
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Z = ${atomicNumber}`, centerX, centerY + 5)
  }

  const drawOrbitals = (ctx: CanvasRenderingContext2D, config: { name: string; electrons: number; level: number }[]) => {
    if (!showOrbitals) return

    config.forEach((orbital, index) => {
      const radius = orbitalRadius[orbital.level - 1]
      ctx.strokeStyle = orbital.name.includes("s") ? "#4444ff" : orbital.name.includes("p") ? "#00aa00" : "#ffaa00"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Orbital label
      ctx.fillStyle = ctx.strokeStyle
      ctx.font = "14px Arial"
      ctx.fillText(orbital.name, centerX + radius + 10, centerY - 10)
    })
  }

  const drawElectrons = (ctx: CanvasRenderingContext2D, config: { name: string; electrons: number; level: number }[]) => {
    const t = animationTime * 0.05 * animationSpeed
    config.forEach((orbital) => {
      const radius = orbitalRadius[orbital.level - 1]
      for (let i = 0; i < orbital.electrons; i++) {
        const angle = (i * (2 * Math.PI)) / orbital.max + t
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "#000"
        ctx.fill()
      }
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Get configuration
    const config = getElectronConfig(atomicNumber)

    // Draw elements
    drawNucleus(ctx)
    drawOrbitals(ctx, config)
    drawElectrons(ctx, config)

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 160)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `পরমাণু সংখ্যা: ${atomicNumber}`,
      `বিন্যাস: ${config.map(o => `${o.name}${o.electrons}`).join(" ")}`,
      ``,
      `নীতি:`,
      `আউফবাউ: নিম্নতম শক্তি প্রথমে`,
      `পাউলি: ২টি ইলেকট্রন/কক্ষপথ`,
      `হুন্ড: একক পূরণ প্রথমে`
    ] : [
      `Atomic Number: ${atomicNumber}`,
      `Config: ${config.map(o => `${o.name}${o.electrons}`).join(" ")}`,
      ``,
      `Principles:`,
      `Aufbau: Lowest energy first`,
      `Pauli: 2 electrons/orbital`,
      `Hund: Single filling first`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("নীতি") || text.includes("Principles")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("Config") || text.includes("বিন্যাস")) {
        ctx.fillStyle = "#ffaa00"
        ctx.font = "12px monospace"
      } else {
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
      }
      ctx.fillText(text, 20, 35 + index * 16)
    })

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
  }, [isPlaying, atomicNumber, showOrbitals, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setAtomicNumber(6)
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
            onClick={() => setShowOrbitals(!showOrbitals)} 
            variant={showOrbitals ? "default" : "outline"}
          >
            <Calculator className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "কক্ষপথ দেখান" : "Orbitals"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "পরমাণু সংখ্যা" : "Atomic Number"}</Label>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[atomicNumber]}
                onValueChange={(v) => setAtomicNumber(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{atomicNumber}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "নিউক্লিয়াস" : "Nucleus"}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {lang === "bn"
                  ? "পরমাণুর কেন্দ্রে প্রোটন এবং নিউট্রন থাকে।"
                  : "Contains protons and neutrons at the atom’s center."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "কক্ষপথ" : "Orbitals"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn"
                  ? "ইলেকট্রন শক্তি স্তরে কক্ষপথে ঘুরে।"
                  : "Electrons orbit in specific energy levels."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "ইলেকট্রন" : "Electrons"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "কক্ষপথে ইলেকট্রন নির্দিষ্ট নিয়মে স্থাপিত হয়।"
                  : "Electrons are arranged in orbitals following specific rules."}
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