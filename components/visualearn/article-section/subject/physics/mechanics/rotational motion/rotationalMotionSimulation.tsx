"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, RotateCw, Settings, Zap } from "lucide-react"

export default function RotationalMotionSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [momentOfInertia, setMomentOfInertia] = useState(2)
  const [initialAngularVelocity, setInitialAngularVelocity] = useState(8)
  const [friction, setFriction] = useState(0.05)
  const [showTrace, setShowTrace] = useState(true)
  const [showVectors, setShowVectors] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)
  const [diskType, setDiskType] = useState<"solid" | "ring" | "rod">("solid")

  // Canvas dimensions
  const canvasWidth = 900
  const canvasHeight = 600
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const baseRadius = 80

  // Simulation state
  const angle = useRef(0)
  const angularVelocity = useRef(initialAngularVelocity)
  const trace = useRef<Array<{ x: number; y: number; alpha: number }>>([])
  const lastTime = useRef(0)

  // Get disk properties based on type
  const getDiskProperties = () => {
    switch (diskType) {
      case "solid":
        return { radius: baseRadius, color: "#ff6b6b", name: lang === "bn" ? "কঠিন চাকতি" : "Solid Disk" }
      case "ring":
        return { radius: baseRadius, color: "#4ecdc4", name: lang === "bn" ? "রিং" : "Ring" }
      case "rod":
        return { radius: baseRadius * 1.2, color: "#45b7d1", name: lang === "bn" ? "দণ্ড" : "Rod" }
      default:
        return { radius: baseRadius, color: "#ff6b6b", name: "Solid Disk" }
    }
  }

  const drawDisk = (ctx: CanvasRenderingContext2D) => {
    const { radius, color } = getDiskProperties()
    
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(angle.current)

    // Add glow effect
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius + 20)
    gradient.addColorStop(0, color + "40")
    gradient.addColorStop(0.7, color + "20")
    gradient.addColorStop(1, "transparent")
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, radius + 20, 0, Math.PI * 2)
    ctx.fill()

    // Draw main object based on type
    if (diskType === "solid") {
      // Solid disk with metallic gradient
      const diskGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
      diskGradient.addColorStop(0, "#ff8a80")
      diskGradient.addColorStop(0.7, color)
      diskGradient.addColorStop(1, "#d32f2f")
      
      ctx.fillStyle = diskGradient
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fill()
      
      // Center hub
      ctx.fillStyle = "#333"
      ctx.beginPath()
      ctx.arc(0, 0, 8, 0, Math.PI * 2)
      ctx.fill()
      
    } else if (diskType === "ring") {
      // Ring with gradient
      const ringGradient = ctx.createRadialGradient(0, 0, radius * 0.6, 0, 0, radius)
      ringGradient.addColorStop(0, "#80e5db")
      ringGradient.addColorStop(0.5, color)
      ringGradient.addColorStop(1, "#26a69a")
      
      ctx.fillStyle = ringGradient
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2, true)
      ctx.fill("evenodd")
      
    } else if (diskType === "rod") {
      // Rotating rod
      const rodGradient = ctx.createLinearGradient(0, -10, 0, 10)
      rodGradient.addColorStop(0, "#81c4e8")
      rodGradient.addColorStop(0.5, color)
      rodGradient.addColorStop(1, "#1976d2")
      
      ctx.fillStyle = rodGradient
      ctx.fillRect(-radius, -10, radius * 2, 20)
      
      // End caps
      ctx.beginPath()
      ctx.arc(-radius, 0, 10, 0, Math.PI * 2)
      ctx.arc(radius, 0, 10, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add reference mark
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(radius * 0.7, 0)
    ctx.lineTo(radius * 0.9, 0)
    ctx.stroke()

    ctx.restore()
  }

  const drawVectors = (ctx: CanvasRenderingContext2D) => {
    if (!showVectors) return
    
    const { radius } = getDiskProperties()
    const vectorScale = 20
    
    ctx.save()
    ctx.translate(centerX, centerY)
    
    // Angular velocity vector (out of page, represented as circle with dot/cross)
    const omegaMagnitude = Math.abs(angularVelocity.current)
    const omegaRadius = Math.min(omegaMagnitude * 8, 40)
    
    ctx.strokeStyle = "#ff9800"
    ctx.fillStyle = "#ff9800"
    ctx.lineWidth = 3
    
    // Draw vector circle
    ctx.beginPath()
    ctx.arc(radius + 60, -50, omegaRadius, 0, Math.PI * 2)
    ctx.stroke()
    
    // Dot or cross to indicate direction
    if (angularVelocity.current > 0) {
      // Dot for counterclockwise (out of page)
      ctx.beginPath()
      ctx.arc(radius + 60, -50, 5, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // Cross for clockwise (into page)
      ctx.beginPath()
      ctx.moveTo(radius + 50, -60)
      ctx.lineTo(radius + 70, -40)
      ctx.moveTo(radius + 70, -60)
      ctx.lineTo(radius + 50, -40)
      ctx.stroke()
    }
    
    // Label
    ctx.fillStyle = "#ff9800"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("ω", radius + 60, -75)
    
    // Tangential velocity vector
    const tangentX = radius * Math.cos(angle.current + Math.PI / 2)
    const tangentY = radius * Math.sin(angle.current + Math.PI / 2)
    const tangentLength = Math.abs(angularVelocity.current) * vectorScale
    
    ctx.strokeStyle = "#4caf50"
    ctx.fillStyle = "#4caf50"
    ctx.lineWidth = 2
    
    const pointX = radius * Math.cos(angle.current)
    const pointY = radius * Math.sin(angle.current)
    
    ctx.beginPath()
    ctx.moveTo(pointX, pointY)
    ctx.lineTo(pointX + tangentX * tangentLength / radius, pointY + tangentY * tangentLength / radius)
    ctx.stroke()
    
    // Arrow head
    const arrowSize = 8
    const arrowAngle = Math.atan2(tangentY, tangentX)
    ctx.beginPath()
    ctx.moveTo(pointX + tangentX * tangentLength / radius, pointY + tangentY * tangentLength / radius)
    ctx.lineTo(
      pointX + tangentX * tangentLength / radius - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
      pointY + tangentY * tangentLength / radius - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
    )
    ctx.lineTo(
      pointX + tangentX * tangentLength / radius - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
      pointY + tangentY * tangentLength / radius - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
    )
    ctx.closePath()
    ctx.fill()
    
    ctx.restore()
  }

  const drawTrace = (ctx: CanvasRenderingContext2D) => {
    if (!showTrace || trace.current.length < 2) return
    
    const { radius } = getDiskProperties()
    
    ctx.strokeStyle = "#00bcd4"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    
    // Draw fading trail
    for (let i = 1; i < trace.current.length; i++) {
      const prev = trace.current[i - 1]
      const curr = trace.current[i]
      const alpha = curr.alpha
      
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(curr.x, curr.y)
      ctx.stroke()
    }
    
    ctx.globalAlpha = 1
  }

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // Gradient background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvasWidth, canvasHeight))
    gradient.addColorStop(0, "#1a1a2e")
    gradient.addColorStop(1, "#0f0f1e")
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Grid pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1
    
    const gridSize = 50
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight)
      ctx.stroke()
    }
    
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasWidth, y)
      ctx.stroke()
    }
    
    // Center marker
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 10, centerY)
    ctx.lineTo(centerX + 10, centerY)
    ctx.moveTo(centerX, centerY - 10)
    ctx.lineTo(centerX, centerY + 10)
    ctx.stroke()
  }

  const drawInfoPanel = (ctx: CanvasRenderingContext2D) => {
    const kineticEnergy = 0.5 * momentOfInertia * angularVelocity.current * angularVelocity.current
    const angularMomentum = momentOfInertia * angularVelocity.current
    
    // Semi-transparent panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(20, 20, 280, 180)
    
    // Panel border
    ctx.strokeStyle = "#4caf50"
    ctx.lineWidth = 2
    ctx.strokeRect(20, 20, 280, 180)
    
    ctx.fillStyle = "#fff"
    ctx.font = "16px Arial"
    ctx.textAlign = "left"
    
    const { name } = getDiskProperties()
    
    const info = lang === "bn" ? [
      `বস্তু: ${name}`,
      `জড়তার মুহূর্ত: ${momentOfInertia.toFixed(2)} kg·m²`,
      `কৌণিক বেগ: ${angularVelocity.current.toFixed(2)} rad/s`,
      `কৌণিক ভরবেগ: ${angularMomentum.toFixed(2)} kg·m²/s`,
      `ঘর্ষণ: ${friction.toFixed(3)} N·m`,
      `ঘূর্ণন গতিশক্তি: ${kineticEnergy.toFixed(2)} J`,
      `সময়: ${animationTime.toFixed(1)} s`,
      ``,
      `সূত্র: KE = ½ I ω²`
    ] : [
      `Object: ${name}`,
      `Moment of Inertia: ${momentOfInertia.toFixed(2)} kg·m²`,
      `Angular Velocity: ${angularVelocity.current.toFixed(2)} rad/s`,
      `Angular Momentum: ${angularMomentum.toFixed(2)} kg·m²/s`,
      `Friction: ${friction.toFixed(3)} N·m`,
      `Rotational KE: ${kineticEnergy.toFixed(2)} J`,
      `Time: ${animationTime.toFixed(1)} s`,
      ``,
      `Formula: KE = ½ I ω²`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      
      if (text.includes("সূত্র") || text.includes("Formula")) {
        ctx.fillStyle = "#ffeb3b"
        ctx.font = "14px Arial"
      } else if (text.includes("KE =") || text.includes("½")) {
        ctx.fillStyle = "#ff9800"
        ctx.font = "14px monospace"
      } else if (text.includes("Object") || text.includes("বস্তু")) {
        ctx.fillStyle = "#4caf50"
        ctx.font = "16px Arial"
      } else {
        ctx.fillStyle = "#fff"
        ctx.font = "14px Arial"
      }
      
      ctx.fillText(text, 35, 50 + index * 18)
    })
  }

  const updatePhysics = (deltaTime: number) => {
    // Apply friction torque
    const frictionTorque = -Math.sign(angularVelocity.current) * friction
    const angularAcceleration = frictionTorque / momentOfInertia
    
    // Update angular velocity and angle
    angularVelocity.current += angularAcceleration * deltaTime
    
    // Stop if velocity is very small
    if (Math.abs(angularVelocity.current) < 0.01) {
      angularVelocity.current = 0
    }
    
    angle.current += angularVelocity.current * deltaTime
    
    // Update trace
    const { radius } = getDiskProperties()
    const traceX = centerX + radius * Math.cos(angle.current)
    const traceY = centerY + radius * Math.sin(angle.current)
    
    // Add new trace point with alpha for fading
    trace.current.push({ x: traceX, y: traceY, alpha: 1.0 })
    
    // Fade existing points and remove old ones
    trace.current = trace.current.map(point => ({
      ...point,
      alpha: point.alpha * 0.995
    })).filter(point => point.alpha > 0.05)
    
    // Limit trace length
    if (trace.current.length > 300) {
      trace.current.shift()
    }
  }

  const animate = (currentTime: number) => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Calculate delta time
    const deltaTime = lastTime.current ? (currentTime - lastTime.current) / 1000 : 0.016
    lastTime.current = currentTime

    // Clear and draw background
    drawBackground(ctx)
    
    // Draw elements
    drawTrace(ctx)
    drawDisk(ctx)
    drawVectors(ctx)
    drawInfoPanel(ctx)

    // Update physics
    if (isPlaying) {
      updatePhysics(deltaTime)
      setAnimationTime(prev => prev + deltaTime)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    angularVelocity.current = initialAngularVelocity
    trace.current = []
    lastTime.current = 0
    requestRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [momentOfInertia, initialAngularVelocity, friction, showTrace, showVectors, isPlaying, lang, diskType])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    angle.current = 0
    angularVelocity.current = initialAngularVelocity
    trace.current = []
    lastTime.current = 0
  }

  const applyImpulse = () => {
    angularVelocity.current += 3 * Math.sign(angularVelocity.current || 1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {lang === "bn" ? "ঘূর্ণন গতির অনুকরণ" : "Rotational Motion Simulation"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
            <canvas 
              ref={canvasRef} 
              width={canvasWidth} 
              height={canvasHeight} 
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <Button 
              onClick={() => setIsPlaying(!isPlaying)} 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" /> {lang === "bn" ? "চালান" : "Play"}
                </>
              )}
            </Button>
            
            <Button onClick={reset} variant="outline" size="lg">
              <RefreshCw className="h-5 w-5 mr-2" /> {lang === "bn" ? "পুনরায় সেট" : "Reset"}
            </Button>
            
            <Button onClick={applyImpulse} variant="outline" size="lg" className="bg-orange-50 hover:bg-orange-100">
              <Zap className="h-5 w-5 mr-2" /> {lang === "bn" ? "আবেগ" : "Impulse"}
            </Button>
            
            <Button 
              onClick={() => setShowTrace(!showTrace)} 
              variant={showTrace ? "default" : "outline"}
              size="lg"
            >
              <RotateCw className="h-5 w-5 mr-2" /> 
              {lang === "bn" ? "ট্রেস" : "Trace"}
            </Button>
            
            <Button 
              onClick={() => setShowVectors(!showVectors)} 
              variant={showVectors ? "default" : "outline"}
              size="lg"
            >
              <Settings className="h-5 w-5 mr-2" /> 
              {lang === "bn" ? "ভেক্টর" : "Vectors"}
            </Button>
            
            <Button 
              onClick={() => setLang(lang === "en" ? "bn" : "en")} 
              variant="outline"
              size="lg"
            >
              {lang === "en" ? "বাংলা" : "English"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">
                  {lang === "bn" ? "বস্তুর ধরন" : "Object Type"}
                </Label>
                <div className="mt-2 space-y-2">
                  {[
                    { key: "solid", label: lang === "bn" ? "কঠিন চাকতি" : "Solid Disk" },
                    { key: "ring", label: lang === "bn" ? "রিং" : "Ring" },
                    { key: "rod", label: lang === "bn" ? "দণ্ড" : "Rod" }
                  ].map(({ key, label }) => (
                    <Button
                      key={key}
                      onClick={() => setDiskType(key as any)}
                      variant={diskType === key ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">
                  {lang === "bn" ? "জড়তার মুহূর্ত (kg·m²)" : "Moment of Inertia (kg·m²)"}
                </Label>
                <Slider
                  min={0.5}
                  max={8}
                  step={0.1}
                  value={[momentOfInertia]}
                  onValueChange={(v) => setMomentOfInertia(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-1 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {momentOfInertia.toFixed(1)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">
                  {lang === "bn" ? "প্রাথমিক কৌণিক বেগ (rad/s)" : "Initial Angular Velocity (rad/s)"}
                </Label>
                <Slider
                  min={0}
                  max={15}
                  step={0.1}
                  value={[initialAngularVelocity]}
                  onValueChange={(v) => setInitialAngularVelocity(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-1 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {initialAngularVelocity.toFixed(1)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">
                  {lang === "bn" ? "ঘর্ষণ (N·m)" : "Friction (N·m)"}
                </Label>
                <Slider
                  min={0}
                  max={0.3}
                  step={0.005}
                  value={[friction]}
                  onValueChange={(v) => setFriction(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-1 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {friction.toFixed(3)}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}