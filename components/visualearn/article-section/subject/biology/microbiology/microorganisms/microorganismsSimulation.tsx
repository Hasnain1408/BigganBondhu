"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye } from "lucide-react"

export default function MicroorganismsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [microbeType, setMicrobeType] = useState<"bacteria" | "virus" | "fungi">("bacteria")
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const drawBacteria = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ব্যাকটেরিয়া পরিবেশ" : "Bacteria Environment", centerX, 30)

    // Draw bacterial cell
    ctx.fillStyle = "#32CD32"
    ctx.fillCircle(centerX, centerY, 50)
    ctx.strokeStyle = "#228B22"
    ctx.lineWidth = 2
    ctx.strokeCircle(centerX, centerY, 50)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "ব্যাকটেরিয়া" : "Bacterium", centerX, centerY - 70)
      ctx.fillText(lang === "bn" ? "কোষ প্রাচীর" : "Cell Wall", centerX + 80, centerY)
    }

    // Draw binary fission animation
    const splitProgress = (time % 100) / 100
    if (splitProgress > 0.5) {
      ctx.fillStyle = "#32CD32"
      ctx.fillCircle(centerX - 30 * (splitProgress - 0.5) * 2, centerY, 40)
      ctx.fillCircle(centerX + 30 * (splitProgress - 0.5) * 2, centerY, 40)
      ctx.strokeCircle(centerX - 30 * (splitProgress - 0.5) * 2, centerY, 40)
      ctx.strokeCircle(centerX + 30 * (splitProgress - 0.5) * 2, centerY, 40)
    }
  }

  const drawVirus = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ভাইরাস সংক্রমণ" : "Virus Infection", centerX, 30)

    // Draw host cell
    ctx.fillStyle = "#ADD8E6"
    ctx.fillCircle(centerX, centerY, 80)
    ctx.strokeStyle = "#4682B4"
    ctx.lineWidth = 2
    ctx.strokeCircle(centerX, centerY, 80)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "হোস্ট কোষ" : "Host Cell", centerX, centerY - 100)
    }

    // Draw virus
    const virusX = centerX - 100 + (time % 80) * 2
    ctx.fillStyle = "#FF4500"
    ctx.beginPath()
    ctx.moveTo(virusX, centerY - 30)
    ctx.lineTo(virusX - 20, centerY + 30)
    ctx.lineTo(virusX + 20, centerY + 30)
    ctx.closePath()
    ctx.fill()
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "ভাইরাস" : "Virus", virusX, centerY - 50)
    }
  }

  const drawFungi = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "ছত্রাক বৃদ্ধি" : "Fungi Growth", centerX, 30)

    // Draw fungal hyphae
    ctx.strokeStyle = "#8B4513"
    ctx.lineWidth = 3
    for (let i = 0; i < 5; i++) {
      const x = centerX - 100 + i * 50
      ctx.beginPath()
      ctx.moveTo(x, centerY - 50)
      ctx.lineTo(x, centerY + 50 + 20 * Math.sin(time * 0.05 + i))
      ctx.stroke()
    }
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "হাইফি" : "Hyphae", centerX, centerY - 70)
    }

    // Draw spores
    ctx.fillStyle = "#FFD700"
    for (let i = 0; i < 3; i++) {
      ctx.fillCircle(centerX - 50 + i * 50, centerY - 30 + 10 * Math.sin(time * 0.1 + i), 10)
    }
    if (showLabels) {
      ctx.fillText(lang === "bn" ? "স্পোর" : "Spores", centerX, centerY - 100)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (microbeType === "bacteria") {
      drawBacteria(ctx, animationTime)
    } else if (microbeType === "virus") {
      drawVirus(ctx, animationTime)
    } else {
      drawFungi(ctx, animationTime)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 250, 120)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `জীবাণু: ${microbeType === "bacteria" ? "ব্যাকটেরিয়া" : microbeType === "virus" ? "ভাইরাস" : "ছত্রাক"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `লেবেল: ${showLabels ? "দৃশ্যমান" : "অদৃশ্য"}`
    ] : [
      `Microbe: ${microbeType.charAt(0).toUpperCase() + microbeType.slice(1)}`,
      `Animation Speed: ${animationSpeed.toFixed(1)}x`,
      `Labels: ${showLabels ? "Visible" : "Hidden"}`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 20)
    })

    if (isPlaying) {
      setAnimationTime(prev => prev + animationSpeed)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.fillCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.fill()
        }
        ctx.strokeCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.stroke()
        }
      }
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, microbeType, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setMicrobeType("bacteria")
    setShowLabels(true)
    setAnimationSpeed(1)
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
            <Eye className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "লেবেল" : "Labels"}
          </Button>
          <Button 
            onClick={() => setMicrobeType(microbeType === "bacteria" ? "virus" : microbeType === "virus" ? "fungi" : "bacteria")} 
            variant={microbeType === "bacteria" ? "default" : "outline"}
          >
            {lang === "bn" ? (microbeType === "bacteria" ? "ভাইরাস" : microbeType === "virus" ? "ছত্রাক" : "ব্যাকটেরিয়া") : (microbeType === "bacteria" ? "Virus" : microbeType === "virus" ? "Fungi" : "Bacteria")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "জীবাণুর প্রকার" : "Microbe Type"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={microbeType === "bacteria" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMicrobeType("bacteria")}
                >
                  {lang === "bn" ? "ব্যাকটেরিয়া" : "Bacteria"}
                </Button>
                <Button
                  variant={microbeType === "virus" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMicrobeType("virus")}
                >
                  {lang === "bn" ? "ভাইরাস" : "Virus"}
                </Button>
                <Button
                  variant={microbeType === "fungi" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMicrobeType("fungi")}
                >
                  {lang === "bn" ? "ছত্রাক" : "Fungi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "ব্যাকটেরিয়া" : "Bacteria"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "এককোষী প্রোক্যারিওট, বাইনারি ফিশনের মাধ্যমে বিভাজন।"
                  : "Single-celled prokaryotes, divide by binary fission."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "ভাইরাস" : "Virus"}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {lang === "bn" 
                  ? "হোস্ট কোষে সংক্রমণ করে প্রতিলিপি তৈরি করে।"
                  : "Infects host cells to replicate."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brown-50 to-brown-100 dark:from-brown-950 dark:to-brown-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-brown-800 dark:text-brown-200 mb-2">
                {lang === "bn" ? "ছত্রাক" : "Fungi"}
              </h4>
              <p className="text-sm text-brown-700 dark:text-brown-300">
                {lang === "bn" 
                  ? "হাইফি এবং স্পোরের মাধ্যমে বৃদ্ধি পায়।"
                  : "Grows via hyphae and spores."}
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