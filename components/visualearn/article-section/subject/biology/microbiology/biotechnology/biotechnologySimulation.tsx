"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Eye } from "lucide-react"

export default function BiotechnologySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [process, setProcess] = useState<"geneEditing" | "tissueCulture" | "recombinantDNA">("geneEditing")
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const drawGeneEditing = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "জিন সম্পাদনা (CRISPR)" : "Gene Editing (CRISPR)", centerX, 30)

    // Draw DNA strand
    ctx.strokeStyle = "#228B22"
    ctx.lineWidth = 2
    for (let x = centerX - 150; x < centerX + 150; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, centerY - 20 + 10 * Math.sin(time * 0.05 + x * 0.1))
      ctx.lineTo(x, centerY + 20 + 10 * Math.sin(time * 0.05 + x * 0.1 + Math.PI))
      ctx.stroke()
    }
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText("DNA", centerX - 160, centerY - 30)
    }

    // Draw CRISPR-Cas9
    const casX = centerX - 100 + (time % 80) * 2
    ctx.fillStyle = "#FFD700"
    if (typeof (ctx as any).fillCircle === "function") {
      (ctx as any).fillCircle(casX, centerY, 15)
    }
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.font = "12px Arial"
      ctx.fillText(lang === "bn" ? "Cas9" : "Cas9", casX, centerY - 30)
    }

    // Draw cut animation
    if (time % 60 > 40) {
      ctx.strokeStyle = "red"
      ctx.beginPath()
      ctx.moveTo(casX, centerY - 20)
      ctx.lineTo(casX, centerY + 20)
      ctx.stroke()
    }
  }

  const drawTissueCulture = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture", centerX, centerY, 30)

    // Draw petri dish
    ctx.fillStyle = "#ADD8E6"
    ctx.fillCircle?.(centerX, centerY, 100)
    ctx.strokeStyle = "#4682B4"
    ctx.lineWidth = 2
    (ctx as any).strokeCircle(centerX, centerY, 100)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "পেট্রি ডিশ" : "Petri Dish", centerX, centerY - 120)
    }

    // Draw plant cells growing
    for (let i = 0; i < 5; i++) {
      const cellSize = 10 + (time % 100) / 10
      ctx.fillStyle = "#32CD32"
      if (typeof ctx.fillCircle === "function") {
        ctx.fillCircle(centerX - 50 + i * 25, centerY, cellSize)
      }
      if (showLabels && i === 0) {
        ctx.fillStyle = "#333"
        ctx.fillText(lang === "bn" ? "উদ্ভিদ কোষ" : "Plant Cells", centerX - 50, centerY + 30)
      }
    }
  }

  const drawRecombinantDNA = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = "#F0F0F0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA", centerX, 30)

    // Draw bacterial plasmid
    ctx.fillStyle = "#6A5ACD"
    if (typeof ctx.fillCircle === "function") {
      ctx.fillCircle(centerX, centerY, 50)
    }
    ctx.strokeStyle = "#483D8B"
    if (typeof (ctx as any).strokeCircle === "function") {
      (ctx as any).strokeCircle(centerX, centerY, 50)
    }
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "প্লাজমিড" : "Plasmid", centerX, centerY - 70)
    }

    // Draw foreign DNA insertion
    const dnaX = centerX - 100 + (time % 80) * 2
    ctx.fillStyle = "#FF4500"
    ctx.fillRect(dnaX - 10, centerY - 10, 20, 20)
    if (showLabels) {
      ctx.fillStyle = "#333"
      ctx.fillText(lang === "bn" ? "বিদেশী ডিএনএ" : "Foreign DNA", dnaX, centerY - 30)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (process === "geneEditing") {
      drawGeneEditing(ctx, animationTime)
    } else if (process === "tissueCulture") {
      drawTissueCulture(ctx, animationTime)
    } else {
      drawRecombinantDNA(ctx, animationTime)
    }

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 250, 120)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `প্রক্রিয়া: ${process === "geneEditing" ? "জিন সম্পাদনা" : process === "tissueCulture" ? "টিস্যু কালচার" : "রিকম্বিন্যান্ট ডিএনএ"}`,
      `অ্যানিমেশন গতি: ${animationSpeed.toFixed(1)}x`,
      `লেবেল: ${showLabels ? "দৃশ্যমান" : "অদৃশ্য"}`
    ] : [
      `Process: ${process === "geneEditing" ? "Gene Editing" : process === "tissueCulture" ? "Tissue Culture" : "Recombinant DNA"}`,
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
        ;(ctx as any).fillCircle = function(x: number, y: number, radius: number) {
          this.beginPath()
          this.arc(x, y, radius, 0, Math.PI * 2)
          this.fill()
        }
        ;(ctx as any).strokeCircle = function(x: number, y: number, radius: number) {
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
  }, [isPlaying, process, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setProcess("geneEditing")
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
            onClick={() => setProcess(process === "geneEditing" ? "tissueCulture" : process === "tissueCulture" ? "recombinantDNA" : "geneEditing")} 
            variant={process === "geneEditing" ? "default" : "outline"}
          >
            {lang === "bn" ? (process === "geneEditing" ? "টিস্যু কালচার" : process === "tissueCulture" ? "রিকম্বিন্যান্ট ডিএনএ" : "জিন সম্পাদনা") : (process === "geneEditing" ? "Tissue Culture" : process === "tissueCulture" ? "Recombinant DNA" : "Gene Editing")}
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
                  variant={process === "geneEditing" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProcess("geneEditing")}
                >
                  {lang === "bn" ? "জিন সম্পাদনা" : "Gene Editing"}
                </Button>
                <Button
                  variant={process === "tissueCulture" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProcess("tissueCulture")}
                >
                  {lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture"}
                </Button>
                <Button
                  variant={process === "recombinantDNA" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProcess("recombinantDNA")}
                >
                  {lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "জিন সম্পাদনা" : "Gene Editing"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "নির্দিষ্ট জিন পরিবর্তনের জন্য CRISPR ব্যবহার।"
                  : "Uses CRISPR to modify specific genes."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "টিস্যু কালচার" : "Tissue Culture"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "ল্যাবে উদ্ভিদ কোষ বৃদ্ধি।"
                  : "Grows plant cells in a lab."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                {lang === "bn" ? "রিকম্বিন্যান্ট ডিএনএ" : "Recombinant DNA"}
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {lang === "bn" 
                  ? "বিদেশী ডিএনএ ব্যাকটেরিয়ায় সংযোজন।"
                  : "Inserts foreign DNA into bacteria."}
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