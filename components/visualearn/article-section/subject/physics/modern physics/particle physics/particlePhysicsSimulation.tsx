
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Sparkles } from "lucide-react"

export default function ParticlePhysicsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [collisionEnergy, setCollisionEnergy] = useState(0.5)
  const [showParticles, setShowParticles] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  // Canvas dimensions
  const canvasWidth = 800
  const canvasHeight = 500
  const particleRadius = 5
  const collisionX = canvasWidth / 2
  const collisionY = canvasHeight / 2

  // Simulation state
  const particles = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; type: string }>
  >([])

  const initializeParticles = () => {
    particles.current = [
      { x: 100, y: collisionY, vx: collisionEnergy * 2, vy: 0, type: "quark" },
      { x: canvasWidth - 100, y: collisionY, vx: -collisionEnergy * 2, vy: 0, type: "quark" }
    ]
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particles.current.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2)
      ctx.fillStyle = p.type === "quark" ? "#ff4444" : "#4444ff"
      ctx.fill()
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? (p.type === "quark" ? "কোয়ার্ক" : "বোসন") : p.type,
        p.x,
        p.y + 20
      )
    })
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Update particles
    if (isPlaying) {
      particles.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
      })

      // Check for collision
      if (
        Math.abs(particles.current[0].x - particles.current[1].x) < particleRadius * 2 &&
        particles.current.length === 2
      ) {
        // Simulate new particles (e.g., bosons)
        const numNew = Math.floor(collisionEnergy * 4) + 1
        for (let i = 0; i < numNew; i++) {
          const angle = Math.random() * Math.PI * 2
          particles.current.push({
            x: collisionX,
            y: collisionY,
            vx: Math.cos(angle) * collisionEnergy,
            vy: Math.sin(angle) * collisionEnergy,
            type: "boson"
          })
        }
        particles.current = particles.current.slice(2) // Remove original particles
      }

      // Remove particles outside canvas
      particles.current = particles.current.filter(
        p => p.x >= 0 && p.x <= canvasWidth && p.y >= 0 && p.y <= canvasHeight
      )

      setAnimationTime(prev => prev + 0.016)
    }

    // Draw particles
    if (showParticles) drawParticles(ctx)

    // Information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `সংঘর্ষ শক্তি: ${collisionEnergy.toFixed(2)}`,
      `সময়: ${animationTime.toFixed(2)} s`,
      ``,
      `ধারণা: কণা সংঘর্ষ`
    ] : [
      `Collision Energy: ${collisionEnergy.toFixed(2)}`,
      `Time: ${animationTime.toFixed(2)} s`,
      ``,
      `Concept: Particle Collision`
    ]

    info.forEach((text, index) => {
      if (text === "") return
      if (text.includes("ধারণা") || text.includes("Concept")) {
        ctx.fillStyle = "#ffff00"
      } else {
        ctx.fillStyle = "#fff"
      }
      ctx.fillText(text, 20, 35 + index * 16)
    })

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    initializeParticles()
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [collisionEnergy, showParticles, isPlaying, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setCollisionEnergy(0.5)
    initializeParticles()
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
            onClick={() => setShowParticles(!showParticles)} 
            variant={showParticles ? "default" : "outline"}
          >
            <Sparkles className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "কণা দেখান" : "Show Particles"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "সংঘর্ষ শক্তি" : "Collision Energy"}</Label>
              <Slider
                min={0.1}
                max={1}
                step={0.1}
                value={[collisionEnergy]}
                onValueChange={(v) => setCollisionEnergy(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{collisionEnergy.toFixed(2)}</p>
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
