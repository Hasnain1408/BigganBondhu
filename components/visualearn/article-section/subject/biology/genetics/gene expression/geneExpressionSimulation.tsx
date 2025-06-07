"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye } from "lucide-react"

export default function GeneExpressionSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [process, setProcess] = useState<"transcription" | "translation">("transcription")
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const drawTranscription = (ctx: CanvasRenderingContext2D, time: number) => {
    // Draw nucleus
    ctx.fillStyle = "#ADD8E6"
    ctx.fillRect(centerX - 200, centerY - 150, 400, 300)
    ctx.strokeStyle = "#4682B4"
    ctx.lineWidth = 3
    ctx.strokeRect(centerX - 200, centerY - 150, 400, 300)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "নিউক্লিয়াস" : "Nucleus", centerX, centerY - 130)

    // Draw DNA double helix
    const dnaY = centerY - 50
    ctx.strokeStyle = "#228B22"
    ctx.lineWidth = 2
    for (let x = centerX - 150; x < centerX + 150; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, dnaY - 20 + 10 * Math.sin(time * 0.05 + x * 0.1))
      ctx.lineTo(x, dnaY + 20 + 10 * Math.sin(time * 0.05 + x * 0.1 + Math.PI))
      ctx.stroke()
    }
    ctx.fillStyle = "#228B22"
    ctx.fillText("DNA", centerX - 160, dnaY - 30)

    // Draw RNA polymerase
    const polyX = centerX - 150 + (time % 100) * 3
    ctx.fillStyle = "#FFD700"
    ctx.fillCircle(polyX, dnaY, 15)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "12px Arial"
      ctx.fillText(lang === "bn" ? "আরএনএ পলিমারেজ" : "RNA Polymerase", polyX, dnaY - 20)
    }

    // Draw mRNA
    ctx.strokeStyle = "#FF4500"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(centerX - 150, dnaY)
    ctx.lineTo(polyX, dnaY + 30 + 10 * Math.sin(time * 0.1))
    ctx.stroke()
    if (showLabels) {
      ctx.fillText("mRNA", polyX - 20, dnaY + 50)
    }
  }

  const drawTranslation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Draw cytoplasm
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "সাইটোপ্লাজম" : "Cytoplasm", centerX, 30)

    // Draw ribosome
    ctx.fillStyle = "#6A5ACD"
    ctx.fillRect(centerX - 100, centerY - 50, 200, 100)
    if (showLabels) {
      ctx.fillStyle = "#FFF"
      ctx.fillText(lang === "bn" ? "রাইবোজোম" : "Ribosome", centerX, centerY)
    }

    // Draw mRNA
    ctx.strokeStyle = "#FF4500"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 150, centerY)
    ctx.lineTo(centerX + 150, centerY)
    ctx.stroke()
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText("mRNA", centerX - 160, centerY - 20)
    }

    // Draw tRNA with amino acids
    const tRNAPos = centerX - 100 + (time % 80) * 2
    ctx.fillStyle = "#32CD32"
    ctx.fillCircle(tRNAPos, centerY + 60, 10)
    ctx.fillRect(tRNAPos - 5, centerY + 10, 10, 50)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "12px Arial"
      ctx.fillText(lang === "bn" ? "tRNA" : "tRNA", tRNAPos, centerY + 80)
      ctx.fillText(lang === "bn" ? "অ্যামিনো অ্যাসিড" : "Amino Acid", tRNAPos, centerY + 100)
    }

    // Draw growing protein chain
    ctx.fillStyle = "#FFA500"
    for (let i = 0; i < Math.floor(time / 20) % 5; i++) {
      ctx.fillCircle(tRNAPos - 40 + i * 20, centerY - 20, 8)
    }
    if (showLabels && Math.floor(time / 20) % 5 > 0) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "প্রোটিন" : "Protein", tRNAPos - 40, centerY - 40)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    if (process === "transcription") {
      drawTranscription(ctx, animationTime)
    } else {
      drawTranslation(ctx, animationTime)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 250, 120)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `প্রক্রিয়া: ${process === "transcription" ? "ট্রান্সক্রিপশন" : "ট্রান্সলেশন"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `লেবেল: ${showLabels ? "দৃশ্যমান" : "অদৃশ্য"}`
    ] : [
      `Process: ${process === "transcription" ? "Transcription" : "Translation"}`,
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
      }
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, process, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setProcess("transcription")
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
            onClick={() => setProcess(process === "transcription" ? "translation" : "transcription")} 
            variant={process === "transcription" ? "outline" : "default"}
          >
            {lang === "bn" ? (process === "transcription" ? "ট্রান্সলেশন" : "ট্রান্সক্রিপশন") : (process === "transcription" ? "Translation" : "Transcription")}
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
              <Label className="text-sm">{lang === "bn" ? "প্রক্রিয়া" : "Process"}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={process === "transcription" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProcess("transcription")}
                >
                  {lang === "bn" ? "ট্রান্সক্রিপশন" : "Transcription"}
                </Button>
                <Button
                  variant={process === "translation" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProcess("translation")}
                >
                  {lang === "bn" ? "ট্রান্সলেশন" : "Translation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ট্রান্সক্রিপশন" : "Transcription"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "ডিএনএ থেকে mRNA সংশ্লেষণ নিউক্লিয়াসে ঘটে।"
                  : "Synthesis of mRNA from DNA occurs in the nucleus."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "ট্রান্সলেশন" : "Translation"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "mRNA থেকে প্রোটিন সংশ্লেষণ রাইবোজোমে ঘটে।"
                  : "Synthesis of proteins from mRNA occurs in ribosomes."}
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