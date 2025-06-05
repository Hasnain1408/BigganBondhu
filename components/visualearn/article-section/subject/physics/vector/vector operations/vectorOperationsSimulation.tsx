// File: components/topics/physics/vectors/vectorOperationsSimulation.tsx

"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Play, Pause } from "lucide-react"

export default function VectorOperationsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [angleA, setAngleA] = useState(30)
  const [angleB, setAngleB] = useState(120)
  const [magnitudeA, setMagnitudeA] = useState(100)
  const [magnitudeB, setMagnitudeB] = useState(100)
  const [play, setPlay] = useState(false)
  const requestRef = useRef<number>()
  let animationStep = 0

  const draw = (ctx: CanvasRenderingContext2D) => {
    const centerX = 400
    const centerY = 250
    ctx.clearRect(0, 0, 800, 500)

    const ax = magnitudeA * Math.cos((angleA * Math.PI) / 180)
    const ay = magnitudeA * Math.sin((angleA * Math.PI) / 180)
    const bx = magnitudeB * Math.cos((angleB * Math.PI) / 180)
    const by = magnitudeB * Math.sin((angleB * Math.PI) / 180)

    const rx = ax + bx
    const ry = ay + by

    ctx.strokeStyle = "#0077ff"
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + ax, centerY - ay)
    ctx.stroke()
    ctx.fillText("A", centerX + ax + 5, centerY - ay)

    ctx.strokeStyle = "#00cc44"
    ctx.beginPath()
    ctx.moveTo(centerX + ax, centerY - ay)
    ctx.lineTo(centerX + ax + bx, centerY - ay - by)
    ctx.stroke()
    ctx.fillText("B", centerX + ax + bx + 5, centerY - ay - by)

    ctx.strokeStyle = "#ff4444"
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + rx, centerY - ry)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillText("R", centerX + rx + 5, centerY - ry)
  }

  const animate = () => {
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) draw(ctx)
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (play) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [play, angleA, angleB, magnitudeA, magnitudeB])

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <canvas ref={canvasRef} width={800} height={500} className="w-full h-auto border" />
        <div className="flex gap-4">
          <Button onClick={() => setPlay(!play)}>
            {play ? (
              <><Pause className="w-4 h-4 mr-2" /> Pause</>
            ) : (
              <><Play className="w-4 h-4 mr-2" /> Play</>
            )}
          </Button>
          <Button onClick={() => {
            setAngleA(30); setAngleB(120); setMagnitudeA(100); setMagnitudeB(100);
          }}>
            <RefreshCw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
