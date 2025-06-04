"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function ElectricCapacitanceSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [plateArea, setPlateArea] = useState(0.01) // Plate area in m²
  const [distance, setDistance] = useState(0.005) // Distance in meters
  const [voltage, setVoltage] = useState(10) // Voltage in volts
  const [dielectricConstant, setDielectricConstant] = useState(1) // Relative permittivity
  const [lang, setLang] = useState<"en" | "bn">("en")

  const epsilon0 = 8.85e-12 // Permittivity of free space (F/m)
  const scale = 500 // Scale factor for visualization
  const plateY = 225 // Center Y for plates
  const plateWidth = 300 // Visual width of plates
  const chargeScale = 1e12 // Scale for charge visualization

  // Calculate capacitance, charge, and energy
  const calculateCapacitance = () => {
    const capacitance = (epsilon0 * dielectricConstant * plateArea) / distance // C = εA/d
    const charge = capacitance * voltage // Q = CV
    const energy = 0.5 * capacitance * voltage * voltage // U = (1/2)CV²
    return { capacitance, charge, energy }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate scaled plate height
    const plateHeight = Math.sqrt(plateArea) * scale

    // Draw plates
    ctx.fillStyle = "#4b5563"
    ctx.fillRect(250, plateY - plateHeight / 2, plateWidth, plateHeight) // Positive plate
    ctx.fillRect(450, plateY - plateHeight / 2, plateWidth, plateHeight) // Negative plate

    // Draw electric field lines
    const { capacitance, charge, energy } = calculateCapacitance()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 1
    const numLines = Math.min(Math.floor(capacitance * 1e12), 10) // Limit field lines
    for (let i = 0; i < numLines; i++) {
      const y = plateY - plateHeight / 2 + (i + 0.5) * (plateHeight / numLines)
      ctx.beginPath()
      ctx.moveTo(250 + plateWidth, y)
      ctx.lineTo(450, y)
      ctx.stroke()
    }

    // Draw charges
    const numCharges = Math.min(Math.floor(charge * chargeScale), 20) // Limit charges
    ctx.fillStyle = "#ef4444" // Positive charges
    for (let i = 0; i < numCharges / 2; i++) {
      const y = plateY - plateHeight / 2 + (i + 0.5) * (plateHeight / (numCharges / 2))
      ctx.beginPath()
      ctx.arc(250 + plateWidth - 10, y, 5, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = "#22c55e" // Negative charges
    for (let i = 0; i < numCharges / 2; i++) {
      const y = plateY - plateHeight / 2 + (i + 0.5) * (plateHeight / (numCharges / 2))
      ctx.beginPath()
      ctx.arc(450 + 10, y, 5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw labels
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(
      lang === "bn" ? `ধারণক্ষমতা: ${(capacitance * 1e12).toFixed(2)} pF` : `Capacitance: ${(capacitance * 1e12).toFixed(2)} pF`,
      width - 150,
      30
    )
    ctx.fillText(
      lang === "bn" ? `চার্জ: ${(charge * 1e9).toFixed(2)} nC` : `Charge: ${(charge * 1e9).toFixed(2)} nC`,
      width - 150,
      50
    )
    ctx.fillText(
      lang === "bn" ? `শক্তি: ${(energy * 1e6).toFixed(2)} μJ` : `Energy: ${(energy * 1e6).toFixed(2)} μJ`,
      width - 150,
      70
    )
    ctx.fillText(
      lang === "bn" ? `ক্ষেত্রফল: ${plateArea.toFixed(4)} m²` : `Plate Area: ${plateArea.toFixed(4)} m²`,
      20,
      30
    )
    ctx.fillText(
      lang === "bn" ? `দূরত্ব: ${distance.toFixed(4)} m` : `Distance: ${distance.toFixed(4)} m`,
      20,
      50
    )
    ctx.fillText(
      lang === "bn" ? `ভোল্টেজ: ${voltage.toFixed(1)} V` : `Voltage: ${voltage.toFixed(1)} V`,
      20,
      70
    )
    ctx.fillText(
      lang === "bn" ? `ডাইইলেকট্রিক ধ্রুবক: ${dielectricConstant.toFixed(1)}` : `Dielectric Constant: ${dielectricConstant.toFixed(1)}`,
      20,
      90
    )

    if (isPlaying) {
      // Animate voltage change
      setVoltage(prev => {
        const newVoltage = prev + 0.1 * (Math.random() > 0.5 ? 1 : -1)
        return Math.max(5, Math.min(newVoltage, 20))
      })
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, plateArea, distance, voltage, dielectricConstant, lang])

  const reset = () => {
    setPlateArea(0.01)
    setDistance(0.005)
    setVoltage(10)
    setDielectricConstant(1)
    setIsPlaying(false)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
        </div>

        <div className="flex justify-center gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "প্লেটের ক্ষেত্রফল (m²)" : "Plate Area (m²)"}</Label>
              <Slider
                min={0.005}
                max={0.02}
                step={0.001}
                value={[plateArea]}
                onValueChange={(v) => setPlateArea(v[0])}
              />
              <p className="text-right mt-2">{plateArea.toFixed(4)} m²</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "দূরত্ব (m)" : "Distance (m)"}</Label>
              <Slider
                min={0.002}
                max={0.01}
                step={0.001}
                value={[distance]}
                onValueChange={(v) => setDistance(v[0])}
              />
              <p className="text-right mt-2">{distance.toFixed(4)} m</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "ভোল্টেজ (V)" : "Voltage (V)"}</Label>
              <Slider
                min={5}
                max={20}
                step={0.1}
                value={[voltage]}
                onValueChange={(v) => setVoltage(v[0])}
              />
              <p className="text-right mt-2">{voltage.toFixed(1)} V</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "ডাইইলেকট্রিক ধ্রুবক" : "Dielectric Constant"}</Label>
              <Slider
                min={1}
                max={10}
                step={0.1}
                value={[dielectricConstant]}
                onValueChange={(v) => setDielectricConstant(v[0])}
              />
              <p className="text-right mt-2">{dielectricConstant.toFixed(1)}</p>
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