"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CirculatorySystemSimulation() {
  const sketchRef = useRef()
  let bloodCells = []
  let heartRate = 60
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
      for (let i = 0; i < 20; i++) {
        bloodCells.push({ x: 400, y: 300, vx: p.random(-2, 2), vy: p.random(-2, 2) })
      }
    }

    p.draw = () => {
      p.background(255, 245, 238)
      p.fill(255, 0, 0)
      p.ellipse(400, 300, 100 + 10 * p.sin(p.frameCount / (60 / heartRate)))
      bloodCells.forEach(b => {
        p.fill(220, 20, 60)
        p.ellipse(b.x, b.y, 10)
        b.x += b.vx * (heartRate / 60)
        b.y += b.vy * (heartRate / 60)
        if (p.dist(b.x, b.y, 400, 300) > 200) {
          b.vx = -b.vx
          b.vy = -b.vy
        }
      })

      if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        let closest = findClosest(p.mouseX, p.mouseY)
        if (closest) tooltip = closest.type
      }

      if (tooltip) {
        p.fill(0, 0, 0, 200)
        p.rect(p.mouseX + 10, p.mouseY - 20, 80, 30)
        p.fill(255)
        p.text(tooltip, p.mouseX + 15, p.mouseY - 5)
      }
    }

    const findClosest = (mx, my) => {
      let minDist = Infinity
      let closest = null
      bloodCells.forEach(b => {
        let d = p.dist(mx, my, b.x, b.y)
        if (d < minDist && d < 10) {
          minDist = d
          closest = { type: "Blood Cell" }
        }
      })
      if (p.dist(mx, my, 400, 300) < 50) closest = { type: "Heart" }
      return closest
    }
  }

  useEffect(() => {
    const p5Instance = new p5(sketch, sketchRef.current)
    return () => p5Instance.remove()
  }, [])

  const resetSimulation = () => {
    bloodCells = []
    for (let i = 0; i < 20; i++) {
      bloodCells.push({ x: 400, y: 300, vx: Math.random() * 4 - 2, vy: Math.random() * 4 - 2 })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Circulatory System Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-7">Heart Rate (BPM)</label>
                <Slider
                  min={30}
                  max={120}
                  step={1}
                  value={[heartRate]}
                  onValueChange={([val]) => heartRate = val}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {heartRate} BPM</p>
              </div>
              <Button onClick={resetSimulation} className="w-full bg-blue-600 hover:bg-blue-700">
                Reset Simulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}