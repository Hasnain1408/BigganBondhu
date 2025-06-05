"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, ArrowRight, ArrowUp } from "lucide-react"

export default function VectorBasicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [vector1Mag, setVector1Mag] = useState(100)
  const [vector1Angle, setVector1Angle] = useState(45)
  const [vector2Mag, setVector2Mag] = useState(80)
  const [vector2Angle, setVector2Angle] = useState(135)
  const [showAddition, setShowAddition] = useState(true)
  const [showDotProduct, setShowDotProduct] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [isDragging, setIsDragging] = useState<null | 'vector1' | 'vector2'>(null)

  const [animationTime, setAnimationTime] = useState(0)
  const origin = { x: 400, y: 300 }

  const calculateVectorComponents = (mag: number, angle: number) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: mag * Math.cos(rad),
      y: -mag * Math.sin(rad) // Negative for canvas y-axis
    }
  }

  const calculateMagnitude = (x: number, y: number) => {
    return Math.sqrt(x ** 2 + y ** 2)
  }

  const calculateDotProduct = (v1: { x: number, y: number }, v2: { x: number, y: number }) => {
    return v1.x * v2.x + v1.y * v2.y
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 0.5
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Calculate vector components
    const v1 = calculateVectorComponents(vector1Mag, vector1Angle)
    const v2 = calculateVectorComponents(vector2Mag, vector2Angle)

    // Draw vectors
    const drawVector = (x: number, y: number, color: string, label: string) => {
      ctx.beginPath()
      ctx.moveTo(origin.x, origin.y)
      ctx.lineTo(origin.x + x, origin.y + y)
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw arrowhead
      const angle = Math.atan2(y, x)
      const arrowSize = 10
      ctx.beginPath()
      ctx.moveTo(origin.x + x, origin.y + y)
      ctx.lineTo(
        origin.x + x - arrowSize * Math.cos(angle - Math.PI / 6),
        origin.y + y - arrowSize * Math.sin(angle - Math.PI / 6)
      )
      ctx.moveTo(origin.x + x, origin.y + y)
      ctx.lineTo(
        origin.x + x - arrowSize * Math.cos(angle + Math.PI / 6),
        origin.y + y - arrowSize * Math.sin(angle + Math.PI / 6)
      )
      ctx.stroke()

      // Label
      ctx.fillStyle = color
      ctx.font = "14px Arial"
      ctx.fillText(label, origin.x + x + 10, origin.y + y)
    }

    drawVector(v1.x, v1.y, "#ff4444", lang === "bn" ? "ভেক্টর ১" : "Vector 1")
    drawVector(v2.x, v2.y, "#4444ff", lang === "bn" ? "ভেক্টর ২" : "Vector 2")

    if (showAddition) {
      const sum = { x: v1.x + v2.x, y: v1.y + v2.y }
      drawVector(sum.x, sum.y, "#00ff00", lang === "bn" ? "যোগফল" : "Sum")

      // Animate parallelogram
      if (isPlaying) {
        const t = (Math.sin(animationTime * 0.02 * animationSpeed) + 1) / 2
        ctx.beginPath()
        ctx.moveTo(origin.x, origin.y)
        ctx.lineTo(origin.x + v1.x, origin.y + v1.y)
        ctx.lineTo(origin.x + v1.x + v2.x * t, origin.y + v1.y + v2.y * t)
        ctx.lineTo(origin.x + v2.x * t, origin.y + v2.y * t)
        ctx.closePath()
        ctx.strokeStyle = "rgba(0, 255, 0, 0.3)"
        ctx.stroke()
      }
    }

    // Display information
    const dotProduct = calculateDotProduct(v1, v2)
    const angleBetween = Math.acos(dotProduct / (calculateMagnitude(v1.x, v1.y) * calculateMagnitude(v2.x, v2.y))) * 180 / Math.PI

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, showDotProduct ? 120 : 80)

    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `ভেক্টর ১ মান: ${vector1Mag.toFixed(1)}`,
      `ভেক্টর ১ কোণ: ${vector1Angle.toFixed(1)}°`,
      `ভেক্টর ২ মান: ${vector2Mag.toFixed(1)}`,
      showDotProduct ? `ডট প্রোডাক্ট: ${dotProduct.toFixed(1)}` : null,
      showDotProduct ? `কোণ: ${angleBetween.toFixed(1)}°` : null
    ] : [
      `Vector 1 Mag: ${vector1Mag.toFixed(1)}`,
      `Vector 1 Angle: ${vector1Angle.toFixed(1)}°`,
      `Vector 2 Mag: ${vector2Mag.toFixed(1)}`,
      showDotProduct ? `Dot Product: ${dotProduct.toFixed(1)}` : null,
      showDotProduct ? `Angle: ${angleBetween.toFixed(1)}°` : null
    ]

    info.filter(line => line !== null).forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 20)
    })

    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const v1 = calculateVectorComponents(vector1Mag, vector1Angle)
      const v2 = calculateVectorComponents(vector2Mag, vector2Angle)

      const distToV1 = Math.sqrt((x - (origin.x + v1.x)) ** 2 + (y - (origin.y + v1.y)) ** 2)
      const distToV2 = Math.sqrt((x - (origin.x + v2.x)) ** 2 + (y - (origin.y + v2.y)) ** 2)

      if (distToV1 < 20) {
        setIsDragging('vector1')
      } else if (distToV2 < 20) {
        setIsDragging('vector2')
      }
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = event.clientX - rect.left - origin.x
        const y = event.clientY - rect.top - origin.y
        const mag = Math.sqrt(x ** 2 + y ** 2)
        const angle = Math.atan2(-y, x) * 180 / Math.PI

        if (isDragging === 'vector1') {
          setVector1Mag(Math.min(mag, 200))
          setVector1Angle((angle + 360) % 360)
        } else if (isDragging === 'vector2') {
          setVector2Mag(Math.min(mag, 200))
          setVector2Angle((angle + 360) % 360)
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, vector1Mag, vector1Angle, vector2Mag, vector2Angle, showAddition, showDotProduct, animationSpeed])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setVector1Mag(100)
    setVector1Angle(45)
    setVector2Mag(80)
    setVector2Angle(135)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            className="w-full h-full cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
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
          <Button
            onClick={() => setShowAddition(!showAddition)}
            variant={showAddition ? "default" : "outline"}
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            {lang === "bn" ? "যোগফল" : "Addition"}
          </Button>
          <Button
            onClick={() => setShowDotProduct(!showDotProduct)}
            variant={showDotProduct ? "default" : "outline"}
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            {lang === "bn" ? "ডট প্রোডাক্ট" : "Dot Product"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভেক্টর ১ মান" : "Vector 1 Magnitude"}</Label>
              <Slider
                min={10}
                max={200}
                step={1}
                value={[vector1Mag]}
                onValueChange={(v) => setVector1Mag(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{vector1Mag.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভেক্টর ১ কোণ (°)" : "Vector 1 Angle (°)"}</Label>
              <Slider
                min={0}
                max={360}
                step={1}
                value={[vector1Angle]}
                onValueChange={(v) => setVector1Angle(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{vector1Angle.toFixed(1)}°</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভেক্টর ২ মান" : "Vector 2 Magnitude"}</Label>
              <Slider
                min={10}
                max={200}
                step={1}
                value={[vector2Mag]}
                onValueChange={(v) => setVector2Mag(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{vector2Mag.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভেক্টর ২ কোণ (°)" : "Vector 2 Angle (°)"}</Label>
              <Slider
                min={0}
                max={360}
                step={1}
                value={[vector2Angle]}
                onValueChange={(v) => setVector2Angle(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{vector2Angle.toFixed(1)}°</p>
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
              <p className="text-right mt-1 text-sm font-mono">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ভেক্টর যোগ" : "Vector Addition"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn"
                  ? "দুটি ভেক্টরের যোগফল তাদের উপাংশের যোগ দ্বারা গণনা করা হয়।"
                  : "The sum of two vectors is calculated by adding their components."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "ডট প্রোডাক্ট" : "Dot Product"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "ডট প্রোডাক্ট স্কেলার ফলাফল দেয় এবং ভেক্টরের মধ্যবর্তী কোণ নির্দেশ করে।"
                  : "Dot product gives a scalar result and indicates the angle between vectors."}
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