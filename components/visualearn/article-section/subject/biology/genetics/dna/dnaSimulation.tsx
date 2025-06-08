"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, ZoomIn, ZoomOut, Palette, Dna, Target, Sparkles } from "lucide-react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

export default function EnhancedDNASimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [helixRadius, setHelixRadius] = useState(50)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showBasePairs, setShowBasePairs] = useState(true)
  const [showParticles, setShowParticles] = useState(true)
  const [colorScheme, setColorScheme] = useState<"classic" | "neon" | "gradient" | "rainbow">("neon")
  const [helixTurns, setHelixTurns] = useState(3)
  const [showLabels, setShowLabels] = useState(true)
  const [backgroundMode, setBackgroundMode] = useState<"dark" | "space" | "gradient">("space")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const colorSchemes = {
    classic: { strand1: "#ff4444", strand2: "#4444ff", basePairs: "#666", accent: "#00ff00" },
    neon: { strand1: "#ff0080", strand2: "#00ffff", basePairs: "#ffff00", accent: "#ff4000" },
    gradient: { strand1: "#ff6b6b", strand2: "#4ecdc4", basePairs: "#45b7d1", accent: "#96ceb4" },
    rainbow: { strand1: "#ff0000", strand2: "#0080ff", basePairs: "#ff8000", accent: "#8000ff" }
  }

  const createParticle = useCallback((x: number, y: number) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 60 + Math.random() * 40,
      color: colorSchemes[colorScheme].accent
    }
  }, [colorScheme])

  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life++
      particle.vx *= 0.99
      particle.vy *= 0.99
      return particle.life < particle.maxLife
    })

    // Add new particles occasionally
    if (showParticles && Math.random() < 0.1) {
      const angle = Math.random() * Math.PI * 2
      const radius = helixRadius + Math.random() * 20
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      particlesRef.current.push(createParticle(x, y))
    }
  }, [showParticles, helixRadius, createParticle])

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    switch (backgroundMode) {
      case "dark":
        ctx.fillStyle = "#0a0a0a"
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        break
      case "space":
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400)
        gradient.addColorStop(0, "#1a1a2e")
        gradient.addColorStop(0.5, "#16213e")
        gradient.addColorStop(1, "#0f0f23")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        
        // Add stars
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvasWidth
          const y = Math.random() * canvasHeight
          const size = Math.random() * 2
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
        break
      case "gradient":
        const bgGrad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
        bgGrad.addColorStop(0, "#667eea")
        bgGrad.addColorStop(0.5, "#764ba2")
        bgGrad.addColorStop(1, "#f093fb")
        ctx.fillStyle = bgGrad
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        break
    }
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    if (!showParticles) return
    
    particlesRef.current.forEach(particle => {
      const alpha = 1 - (particle.life / particle.maxLife)
      ctx.save()
      ctx.globalAlpha = alpha * 0.6
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }

  const drawHelix = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    drawBackground(ctx)

    const colors = colorSchemes[colorScheme]
    const fov = 1000
    const perspective = (z: number) => fov / (fov + z)
    const helixHeight = 300
    const basePairSpacing = helixHeight / 30
    const rotation = time * 0.02 * rotationSpeed

    // Mouse interaction effect
    const mouseInfluence = Math.sqrt((mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2) / 200
    const dynamicRadius = helixRadius + Math.sin(time * 0.05) * 5 + mouseInfluence * 10

    const points1: {x: number, y: number, z: number, angle: number}[] = []
    const points2: {x: number, y: number, z: number, angle: number}[] = []

    // Calculate points for both strands with enhanced smoothness
    for (let y = -helixHeight / 2; y <= helixHeight / 2; y += 3) {
      const angle = (y / helixHeight) * helixTurns * 2 * Math.PI + rotation
      const x1 = dynamicRadius * Math.cos(angle)
      const z1 = dynamicRadius * Math.sin(angle)
      const x2 = dynamicRadius * Math.cos(angle + Math.PI)
      const z2 = dynamicRadius * Math.sin(angle + Math.PI)

      points1.push({ x: x1, y, z: z1, angle })
      points2.push({ x: x2, y, z: z2, angle: angle + Math.PI })
    }

    // Enhanced strand drawing with glow effect
    const drawStrand = (points: typeof points1, color: string, glowColor: string) => {
      // Glow effect
      ctx.shadowColor = glowColor
      ctx.shadowBlur = colorScheme === "neon" ? 15 : 5
      ctx.lineWidth = colorScheme === "neon" ? 4 : 3
      ctx.strokeStyle = color
      
      ctx.beginPath()
      points.forEach(({ x, y, z }, i) => {
        const scale = perspective(z) * zoomLevel
        const px = centerX + x * scale
        const py = centerY + y * scale
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.stroke()
      
      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
    }

    drawStrand(points1, colors.strand1, colors.strand1)
    drawStrand(points2, colors.strand2, colors.strand2)

    // Enhanced base pairs with animation
    if (showBasePairs) {
      ctx.lineWidth = 2
      const basePairs = ["A-T", "G-C", "C-G", "T-A"]
      
      for (let i = 0, y = -helixHeight / 2; y <= helixHeight / 2; y += basePairSpacing, i++) {
        const angle = (y / helixHeight) * helixTurns * 2 * Math.PI + rotation
        const x1 = dynamicRadius * Math.cos(angle)
        const z1 = dynamicRadius * Math.sin(angle)
        const x2 = dynamicRadius * Math.cos(angle + Math.PI)
        const z2 = dynamicRadius * Math.sin(angle + Math.PI)

        const scale1 = perspective(z1) * zoomLevel
        const scale2 = perspective(z2) * zoomLevel
        
        // Animated base pair color
        const basePairIntensity = 0.5 + 0.3 * Math.sin(time * 0.1 + i * 0.5)
        ctx.strokeStyle = `rgba(${colorScheme === "neon" ? "255, 255, 0" : "102, 102, 102"}, ${basePairIntensity})`
        
        ctx.beginPath()
        ctx.moveTo(centerX + x1 * scale1, centerY + y * scale1)
        ctx.lineTo(centerX + x2 * scale2, centerY + y * scale2)
        ctx.stroke()

        // Enhanced base pair labels
        if (showLabels && i % 3 === 0) {
          const basePair = basePairs[i % 4]
          const midX = centerX + (x1 * scale1 + x2 * scale2) / 2
          const midY = centerY + y * scale1
          
          ctx.fillStyle = colorScheme === "neon" ? "#ffff00" : "#333"
          ctx.font = "bold 10px Arial"
          ctx.textAlign = "center"
          ctx.fillText(basePair, midX, midY + 3)
        }
      }
    }

    drawParticles(ctx)

    // Enhanced information panel with glassmorphism effect
    const panelWidth = 250
    const panelHeight = 140
    
    // Glassmorphism background
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
    ctx.fillRect(10, 10, panelWidth, panelHeight)
    
    // Border glow
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 1
    ctx.strokeRect(10, 10, panelWidth, panelHeight)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `হেলিক্স ব্যাসার্ধ: ${helixRadius.toFixed(0)} পিক্সেল`,
      `ঘূর্ণন গতি: ${rotationSpeed.toFixed(1)}x`,
      `জুম লেভেল: ${zoomLevel.toFixed(1)}x`,
      `হেলিক্স টার্ন: ${helixTurns}`,
      `রঙের স্কিম: ${colorScheme}`,
      `বেস জোড়া: ${showBasePairs ? "দৃশ্যমান" : "অদৃশ্য"}`,
      `ডিএনএ প্রকার: B-DNA`
    ] : [
      `Helix Radius: ${helixRadius.toFixed(0)} px`,
      `Rotation Speed: ${rotationSpeed.toFixed(1)}x`,
      `Zoom Level: ${zoomLevel.toFixed(1)}x`,
      `Helix Turns: ${helixTurns}`,
      `Color Scheme: ${colorScheme}`,
      `Base Pairs: ${showBasePairs ? "Visible" : "Hidden"}`,
      `DNA Type: B-DNA`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 18)
    })
  }

  const animate = useCallback(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawHelix(ctx, animationTime)
    updateParticles()
    
    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }, [isPlaying, rotationSpeed, helixRadius, zoomLevel, showBasePairs, showParticles, colorScheme, helixTurns, showLabels, backgroundMode, mousePos, animationTime, lang, updateParticles])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) * (canvasWidth / rect.width),
        y: (e.clientY - rect.top) * (canvasHeight / rect.height)
      })
    }
  }

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(true)
    setHelixRadius(50)
    setRotationSpeed(1)
    setZoomLevel(1)
    setHelixTurns(3)
    setShowBasePairs(true)
    setShowParticles(true)
    setShowLabels(true)
    setColorScheme("neon")
    setBackgroundMode("space")
    particlesRef.current = []
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <CardContent className="pt-6 space-y-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <canvas 
              ref={canvasRef} 
              width={canvasWidth} 
              height={canvasHeight} 
              className="w-full h-full cursor-crosshair"
              onMouseMove={handleMouseMove}
            />
          </div>

          {/* Main Controls */}
          <div className="flex justify-center gap-3 flex-wrap">
            <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
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
            <Button onClick={reset} variant="outline" className="border-purple-300 hover:bg-purple-50">
              <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "রিসেট" : "Reset"}
            </Button>
            <Button 
              onClick={() => setShowBasePairs(!showBasePairs)} 
              variant={showBasePairs ? "default" : "outline"}
              className="bg-gradient-to-r from-pink-500 to-rose-500"
            >
              <Dna className="h-4 w-4 mr-2" />
              {lang === "bn" ? "বেস জোড়া" : "Base Pairs"}
            </Button>
            <Button 
              onClick={() => setShowParticles(!showParticles)} 
              variant={showParticles ? "default" : "outline"}
              className="bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {lang === "bn" ? "কণা" : "Particles"}
            </Button>
            <Button 
              onClick={() => setShowLabels(!showLabels)} 
              variant={showLabels ? "default" : "outline"}
            >
              <Target className="h-4 w-4 mr-2" />
              {lang === "bn" ? "লেবেল" : "Labels"}
            </Button>
          </div>

          {/* Visual Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  {lang === "bn" ? "রঙের স্কিম" : "Color Scheme"}
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {Object.keys(colorSchemes).map((scheme) => (
                    <Button
                      key={scheme}
                      variant={colorScheme === scheme ? "default" : "outline"}
                      size="sm"
                      onClick={() => setColorScheme(scheme as keyof typeof colorSchemes)}
                      className="capitalize"
                    >
                      {scheme}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">
                  {lang === "bn" ? "ব্যাকগ্রাউন্ড" : "Background"}
                </Label>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {["dark", "space", "gradient"].map((bg) => (
                    <Button
                      key={bg}
                      variant={backgroundMode === bg ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBackgroundMode(bg as any)}
                      className="capitalize"
                    >
                      {bg}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parameter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "হেলিক্স ব্যাসার্ধ" : "Helix Radius"}</Label>
                <Slider
                  min={20}
                  max={100}
                  step={5}
                  value={[helixRadius]}
                  onValueChange={(v) => setHelixRadius(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-mono bg-black/10 rounded px-2 py-1">{helixRadius}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "ঘূর্ণন গতি" : "Rotation Speed"}</Label>
                <Slider
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[rotationSpeed]}
                  onValueChange={(v) => setRotationSpeed(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-mono bg-black/10 rounded px-2 py-1">{rotationSpeed.toFixed(1)}x</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "জুম লেভেল" : "Zoom Level"}</Label>
                <Slider
                  min={0.3}
                  max={2.5}
                  step={0.1}
                  value={[zoomLevel]}
                  onValueChange={(v) => setZoomLevel(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-mono bg-black/10 rounded px-2 py-1">{zoomLevel.toFixed(1)}x</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
              <CardContent className="pt-4">
                <Label className="text-sm font-semibold">{lang === "bn" ? "হেলিক্স টার্ন" : "Helix Turns"}</Label>
                <Slider
                  min={1}
                  max={6}
                  step={0.5}
                  value={[helixTurns]}
                  onValueChange={(v) => setHelixTurns(v[0])}
                  className="mt-3"
                />
                <p className="text-right mt-2 text-sm font-mono bg-black/10 rounded px-2 py-1">{helixTurns}</p>
              </CardContent>
            </Card>
          </div>

          {/* Educational Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200">
              <CardContent className="pt-4">
                <h4 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  {lang === "bn" ? "ডিএনএ স্ট্র্যান্ড ১" : "DNA Strand 1"}
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {lang === "bn" 
                    ? "একটি পলিনিউক্লিওটাইড চেইন যা 5' থেকে 3' দিকে চলে। এতে ফসফেট গ্রুপ, ডিঅক্সিরাইবোজ চিনি এবং নাইট্রোজেনাস বেস রয়েছে।"
                    : "A polynucleotide chain running 5' to 3'. Contains phosphate groups, deoxyribose sugar, and nitrogenous bases."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
              <CardContent className="pt-4">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  {lang === "bn" ? "ডিএনএ স্ট্র্যান্ড ২" : "DNA Strand 2"}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {lang === "bn" 
                    ? "অ্যান্টিপ্যারালেল কমপ্লিমেন্টারি স্ট্র্যান্ড যা 3' থেকে 5' দিকে চলে। হাইড্রোজেন বন্ধনের মাধ্যমে প্রথম স্ট্র্যান্ডের সাথে যুক্ত।"
                    : "Antiparallel complementary strand running 3' to 5'. Connected to strand 1 via hydrogen bonds between base pairs."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center items-center gap-4 pt-4 border-t">
            <Label className="text-sm font-medium">
              {lang === "bn" ? "ভাষা:" : "Language:"}
            </Label>
            <div className="flex gap-2">
              <Button
                variant={lang === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLang("en")}
                className="min-w-[80px]"
              >
                English
              </Button>
              <Button
                variant={lang === "bn" ? "default" : "outline"}
                size="sm"
                onClick={() => setLang("bn")}
                className="min-w-[80px]"
              >
                বাংলা
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}