"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Move, RotateCcw, Calculator } from "lucide-react"

export default function VectorComponentsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [vectorMagnitude, setVectorMagnitude] = useState(150)
  const [vectorAngle, setVectorAngle] = useState(45)
  const [showComponents, setShowComponents] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationMode, setAnimationMode] = useState<"rotate" | "magnitude" | "both">("rotate")
  
  // Animation state
  const [animationTime, setAnimationTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragType, setDragType] = useState<"vector" | "none">("none")
  
  // Canvas dimensions and center
  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const scale = 1.5

  // Calculate vector components
  const angleRad = (vectorAngle * Math.PI) / 180
  const componentX = vectorMagnitude * Math.cos(angleRad)
  const componentY = vectorMagnitude * Math.sin(angleRad)

  // Get animated values
  const getAnimatedValues = () => {
    if (!isPlaying) return { magnitude: vectorMagnitude, angle: vectorAngle }
    
    const t = animationTime * 0.02 * animationSpeed
    
    switch (animationMode) {
      case "rotate":
        return {
          magnitude: vectorMagnitude,
          angle: vectorAngle + Math.sin(t) * 30
        }
      case "magnitude":
        return {
          magnitude: vectorMagnitude + Math.sin(t) * 50,
          angle: vectorAngle
        }
      case "both":
        return {
          magnitude: vectorMagnitude + Math.sin(t * 0.7) * 30,
          angle: vectorAngle + Math.sin(t) * 45
        }
      default:
        return { magnitude: vectorMagnitude, angle: vectorAngle }
    }
  }

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    if (!showGrid) return
    
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 0.5
    
    // Vertical lines
    for (let x = 0; x <= canvasWidth; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight)
      ctx.stroke()
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvasHeight; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasWidth, y)
      ctx.stroke()
    }
  }

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 2
    
    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(canvasWidth, centerY)
    ctx.stroke()
    
    // Y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, canvasHeight)
    ctx.stroke()
    
    // Axis labels
    ctx.fillStyle = "#666"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("X", canvasWidth - 20, centerY - 10)
    ctx.fillText("Y", centerX + 15, 20)
    
    // Origin
    ctx.beginPath()
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    ctx.fillText("O", centerX - 15, centerY - 10)
  }

  const drawVector = (ctx: CanvasRenderingContext2D, magnitude: number, angle: number, color: string, width: number = 3) => {
    const angleRad = (angle * Math.PI) / 180
    const endX = centerX + magnitude * Math.cos(angleRad) * scale
    const endY = centerY - magnitude * Math.sin(angleRad) * scale // Negative because canvas Y is inverted
    
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    
    // Arrowhead
    const arrowLength = 12
    const arrowAngle = 0.5
    
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX - Math.cos(angleRad - arrowAngle) * arrowLength,
      endY + Math.sin(angleRad - arrowAngle) * arrowLength
    )
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX - Math.cos(angleRad + arrowAngle) * arrowLength,
      endY + Math.sin(angleRad + arrowAngle) * arrowLength
    )
    ctx.stroke()
    
    return { endX, endY }
  }

  const drawComponents = (ctx: CanvasRenderingContext2D, magnitude: number, angle: number) => {
    if (!showComponents) return
    
    const angleRad = (angle * Math.PI) / 180
    const compX = magnitude * Math.cos(angleRad) * scale
    const compY = magnitude * Math.sin(angleRad) * scale
    
    // X-component (horizontal)
    ctx.strokeStyle = "#ff4444"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + compX, centerY)
    ctx.stroke()
    
    // Y-component (vertical)
    ctx.strokeStyle = "#4444ff"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX + compX, centerY)
    ctx.lineTo(centerX + compX, centerY - compY)
    ctx.stroke()
    
    // Dotted lines to show projection
    ctx.strokeStyle = "#999"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX, centerY - compY)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - compY)
    ctx.lineTo(centerX + compX, centerY - compY)
    ctx.stroke()
    
    ctx.setLineDash([])
    
    // Component labels
    ctx.fillStyle = "#ff4444"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Vₓ = ${(magnitude * Math.cos(angleRad)).toFixed(1)}`, 
                 centerX + compX/2, centerY + 20)
    
    ctx.fillStyle = "#4444ff"
    ctx.textAlign = "left"
    ctx.fillText(`Vᵧ = ${(magnitude * Math.sin(angleRad)).toFixed(1)}`, 
                 centerX + compX + 10, centerY - compY/2)
  }

  const drawAngularMeasurement = (ctx: CanvasRenderingContext2D, angle: number) => {
    const angleRad = (angle * Math.PI) / 180
    const arcRadius = 50
    
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(centerX, centerY, arcRadius, 0, -angleRad, angleRad < 0)
    ctx.stroke()
    
    // Angle label
    const labelAngle = angleRad / 2
    const labelX = centerX + Math.cos(labelAngle) * (arcRadius + 20)
    const labelY = centerY - Math.sin(labelAngle) * (arcRadius + 20)
    
    ctx.fillStyle = "#666"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${angle.toFixed(1)}°`, labelX, labelY)
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // Get current animated values
    const { magnitude, angle } = getAnimatedValues()
    
    // Draw background elements
    drawGrid(ctx)
    drawAxes(ctx)
    
    // Draw vector components first (so they appear behind main vector)
    drawComponents(ctx, magnitude, angle)
    
    // Draw main vector
    const vectorEnd = drawVector(ctx, magnitude, angle, "#00aa00", 4)
    
    // Draw angle measurement
    drawAngularMeasurement(ctx, angle)
    
    // Draw magnitude indicator
    ctx.fillStyle = "#00aa00"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(`|V| = ${magnitude.toFixed(1)}`, vectorEnd.endX + 10, vectorEnd.endY - 10)
    
    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 160)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const currentAngleRad = (angle * Math.PI) / 180
    const currentCompX = magnitude * Math.cos(currentAngleRad)
    const currentCompY = magnitude * Math.sin(currentAngleRad)
    
    const info = lang === "bn" ? [
      `ভেক্টর মান: ${magnitude.toFixed(1)}`,
      `কোণ: ${angle.toFixed(1)}°`,
      `X উপাংশ: ${currentCompX.toFixed(1)}`,
      `Y উপাংশ: ${currentCompY.toFixed(1)}`,
      ``,
      `সূত্র:`,
      `Vₓ = |V| cos θ`,
      `Vᵧ = |V| sin θ`,
      `|V| = √(Vₓ² + Vᵧ²)`
    ] : [
      `Vector Magnitude: ${magnitude.toFixed(1)}`,
      `Angle: ${angle.toFixed(1)}°`,
      `X Component: ${currentCompX.toFixed(1)}`,
      `Y Component: ${currentCompY.toFixed(1)}`,
      ``,
      `Formulas:`,
      `Vₓ = |V| cos θ`,
      `Vᵧ = |V| sin θ`,
      `|V| = √(Vₓ² + Vᵧ²)`
    ]
    
    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("সূত্র") || text.includes("Formulas")) {
        ctx.fillStyle = "#ffff00"
      } else if (text.includes("V") && (text.includes("=") || text.includes("√"))) {
        ctx.fillStyle = "#ffaa00"
        ctx.font = "12px monospace"
      } else {
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
      }
      ctx.fillText(text, 20, 35 + index * 16)
    })
    
    // Update animation
    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Check if clicking near vector end
    const { magnitude, angle } = getAnimatedValues()
    const angleRad = (angle * Math.PI) / 180
    const vectorEndX = centerX + magnitude * Math.cos(angleRad) * scale
    const vectorEndY = centerY - magnitude * Math.sin(angleRad) * scale
    
    const distance = Math.sqrt((x - vectorEndX) ** 2 + (y - vectorEndY) ** 2)
    
    if (distance < 20) {
      setIsDragging(true)
      setDragType("vector")
      setIsPlaying(false)
    }
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || dragType !== "vector") return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Calculate new magnitude and angle
    const dx = x - centerX
    const dy = centerY - y // Invert Y for proper angle calculation
    
    const newMagnitude = Math.sqrt(dx ** 2 + dy ** 2) / scale
    const newAngle = (Math.atan2(dy, dx) * 180) / Math.PI
    
    setVectorMagnitude(Math.max(50, Math.min(200, newMagnitude)))
    setVectorAngle(newAngle)
  }

  const handleCanvasMouseUp = () => {
    setIsDragging(false)
    setDragType("none")
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, vectorMagnitude, vectorAngle, showComponents, showGrid, animationSpeed, animationMode, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setVectorMagnitude(150)
    setVectorAngle(45)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-full cursor-pointer"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
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
            onClick={() => setShowComponents(!showComponents)} 
            variant={showComponents ? "default" : "outline"}
          >
            <Calculator className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "উপাংশ দেখান" : "Components"}
          </Button>
          <Button 
            onClick={() => setShowGrid(!showGrid)} 
            variant={showGrid ? "default" : "outline"}
          >
            <Move className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "গ্রিড" : "Grid"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ভেক্টর মান" : "Vector Magnitude"}</Label>
              <Slider
                min={50}
                max={200}
                step={5}
                value={[vectorMagnitude]}
                onValueChange={(v) => setVectorMagnitude(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{vectorMagnitude.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কোণ (ডিগ্রি)" : "Angle (degrees)"}</Label>
              <Slider
                min={-180}
                max={180}
                step={5}
                value={[vectorAngle]}
                onValueChange={(v) => setVectorAngle(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{vectorAngle.toFixed(0)}°</p>
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

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যানিমেশন মোড" : "Animation Mode"}</Label>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant={animationMode === "rotate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnimationMode("rotate")}
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  {lang === "bn" ? "ঘূর্ণন" : "Rotate"}
                </Button>
                <Button
                  variant={animationMode === "magnitude" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnimationMode("magnitude")}
                >
                  {lang === "bn" ? "মান" : "Magnitude"}
                </Button>
                <Button
                  variant={animationMode === "both" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnimationMode("both")}
                >
                  {lang === "bn" ? "উভয়" : "Both"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "মূল ভেক্টর (সবুজ)" : "Main Vector (Green)"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "মূল ভেক্টর যার মান |V| এবং অক্ষের সাথে কোণ θ। এটি তার উপাংশগুলির যোগফল।"
                  : "The main vector with magnitude |V| and angle θ with the axis. It's the sum of its components."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "X উপাংশ (লাল)" : "X Component (Red)"}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {lang === "bn" 
                  ? "ভেক্টরের অনুভূমিক উপাংশ: Vₓ = |V| cos θ। X অক্ষের দিকে প্রক্ষেপ।"
                  : "Horizontal component of the vector: Vₓ = |V| cos θ. Projection along X-axis."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "Y উপাংশ (নীল)" : "Y Component (Blue)"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "ভেক্টরের উল্লম্ব উপাংশ: Vᵧ = |V| sin θ। Y অক্ষের দিকে প্রক্ষেপ।"
                  : "Vertical component of the vector: Vᵧ = |V| sin θ. Projection along Y-axis."}
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