"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye } from "lucide-react"

export default function ImmuneSystemSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [immuneResponse, setImmuneResponse] = useState<"innate" | "adaptive">("innate")
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const drawInnate = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "সহজাত ইমিউন প্রতিক্রিয়া" : "Innate Immune Response", centerX, 30)

    // Draw pathogen
    ctx.fillStyle = "#FF4500"
    ctx.fillCircle(centerX, centerY, 30)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "প্যাথোজেন" : "Pathogen", centerX, centerY - 50)
    }

    // Draw phagocyte
    const phagocyteX = centerX - 100 + (time % 80) * 2
    ctx.fillStyle = "#32CD32"
    ctx.fillCircle(phagocyteX, centerY + 50, 40)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "ফাগোসাইট" : "Phagocyte", phagocyteX, centerY + 100)
    }

    // Draw engulfing animation
    if (phagocyteX > centerX - 50) {
      ctx.fillStyle = "rgba(50, 205, 50, 0.5)"
      ctx.fillCircle(centerX, centerY, 30 + (time % 20) * 2)
    }
  }

  const drawAdaptive = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "অভিযোজিত ইমিউন প্রতিক্রিয়া" : "Adaptive Immune Response", centerX, 30)

    // Draw pathogen
    ctx.fillStyle = "#FF4500"
    ctx.fillCircle(centerX, centerY, 30)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(lang === "bn" ? "প্যাথোজেন" : "Pathogen", centerX, centerY - 50)
    }

    // Draw B-cell and antibodies
    ctx.fillStyle = "#6A5ACD"
    ctx.fillCircle(centerX - 100, centerY + 50, 40)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "বি-কোষ" : "B-Cell", centerX - 100, centerY + 100)
    }

    // Draw antibodies
    for (let i = 0; i < 3; i++) {
      const antibodyX = centerX - 100 + (time % 60) * 2 + i * 20
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.moveTo(antibodyX, centerY + 20)
      ctx.lineTo(antibodyX - 10, centerY + 40)
      ctx.lineTo(antibodyX + 10, centerY + 40)
      ctx.closePath()
      ctx.fill()
      if (showLabels) {
        ctx.fillStyle = "#333"
        ctx.fillText(lang === "bn" ? "অ্যান্টিবডি" : "Antibody", antibodyX, centerY + 60)
      }
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (immuneResponse === "innate") {
      drawInnate(ctx, animationTime)
    } else {
      drawAdaptive(ctx, animationTime)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 250, 120)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `প্রতিক্রিয়া: ${immuneResponse === "innate" ? "সহজাত" : "অভিযোজিত"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `লেবেল: ${showLabels ? "দৃশ্যমান" : "অদৃশ্য"}`
    ] : [
      `Response: ${immuneResponse.charAt(0).toUpperCase() + immuneResponse.slice(1)}`,
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
  }, [isPlaying, immuneResponse, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setImmuneResponse("innate")
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
            onClick={() => setImmuneResponse(immuneResponse === "innate" ? "adaptive" : "innate")} 
            variant={immuneResponse === "innate" ? "outline" : "default"}
          >
            {lang === "bn" ? (immuneResponse === "innate" ? "অভিযোজিত" : "সহজাত") : (immuneResponse === "innate" ? "Adaptive" : "Innate")}
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
              <Label className="text-sm">{lang === "bn" ? "ইমিউন প্রতিক্রিয়া" : "Immune Response"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={immuneResponse === "innate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImmuneResponse("innate")}
                >
                  {lang === "bn" ? "সহজাত" : "Innate"}
                </Button>
                <Button
                  variant={immuneResponse === "adaptive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImmuneResponse("adaptive")}
                >
                  {lang === "bn" ? "অভিযোজিত" : "Adaptive"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "সহজাত ইমিউনিটি" : "Innate Immunity"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "দ্রুত, অ-নির্দিষ্ট প্রতিরক্ষা ফাগোসাইটের মাধ্যমে।"
                  : "Rapid, non-specific defense via phagocytes."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "অভিযোজিত ইমিউনিটি" : "Adaptive Immunity"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "নির্দিষ্ট প্রতিক্রিয়া অ্যান্টিবডি এবং মেমরি কোষের মাধ্যমে।"
                  : "Specific response via antibodies and memory cells."}
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