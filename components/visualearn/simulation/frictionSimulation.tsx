"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function FrictionSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [force, setForce] = useState(0)
  const [mass, setMass] = useState(2)
  const [muStatic, setMuStatic] = useState(0.4)
  const [muKinetic, setMuKinetic] = useState(0.2)
  const [velocity, setVelocity] = useState(0)
  const [position, setPosition] = useState(50)

  const gravity = 9.8
  const normalForce = mass * gravity

  const reset = () => {
    setIsPlaying(false)
    setVelocity(0)
    setPosition(50)
  }

  const animate = () => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current!.width
    const height = canvasRef.current!.height

    ctx.clearRect(0, 0, width, height)

    // Ground
    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, 300, width, 10)

    // Block
    ctx.fillStyle = "#f97316"
    ctx.fillRect(position, 260, 60, 40)

    // Friction logic
    const fStaticMax = muStatic * normalForce
    const fKinetic = muKinetic * normalForce
    let netForce = force

    if (velocity === 0 && Math.abs(force) < fStaticMax) {
      netForce = 0 // Static friction holds it
    } else {
      netForce = force - Math.sign(velocity || force) * fKinetic
    }

    const acceleration = netForce / mass
    const newVelocity = velocity + acceleration * 0.016
    const newPosition = position + newVelocity * 60 * 0.016

    setVelocity(newVelocity)
    setPosition(newPosition)

    if (requestRef.current) {
      requestRef.current = requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying, force, muKinetic, muStatic, mass, velocity])

  return (
    <div className="space-y-6">
      <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
          {isPlaying ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Play</>}
        </Button>
        <Button onClick={reset} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <Label>Applied Force (N)</Label>
            <Slider min={0} max={100} step={1} value={[force]} onValueChange={(v) => setForce(v[0])} />
            <p className="text-right mt-2">{force.toFixed(1)} N</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Label>Mass (kg)</Label>
            <Slider min={1} max={10} step={0.1} value={[mass]} onValueChange={(v) => setMass(v[0])} />
            <p className="text-right mt-2">{mass.toFixed(1)} kg</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Label>μ (Static Friction)</Label>
            <Slider min={0} max={1} step={0.01} value={[muStatic]} onValueChange={(v) => setMuStatic(v[0])} />
            <p className="text-right mt-2">{muStatic.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Label>μ (Kinetic Friction)</Label>
            <Slider min={0} max={1} step={0.01} value={[muKinetic]} onValueChange={(v) => setMuKinetic(v[0])} />
            <p className="text-right mt-2">{muKinetic.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
