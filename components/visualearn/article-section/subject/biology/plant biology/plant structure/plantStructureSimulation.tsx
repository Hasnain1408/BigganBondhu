"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlantStructureSimulation() {
  const sketchRef = useRef()
  let plant = { height: 100, leaves: 2, roots: 3 }
  let water = 50
  let light = 50
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
    }

    p.draw = () => {
      p.background(135, 206, 235)
      p.fill(139, 69, 19)
      p.rect(390, 300, 20, plant.height) // Stem
      p.fill(0, 128, 0)
      for (let i = 0; i < plant.leaves; i++) {
        p.ellipse(400, 300 - i * 30, 30, 15)
      }
      p.fill(139, 69, 19)
      for (let i = 0; i < plant.roots; i++) {
        p.line(400, 400, 400 + p.random(-50, 50), 400 + p.random(20, 50))
      }

      if (Math.random() < 0.01 && water > 30 && light > 30) {
        plant.height += 0.5
        if (plant.height % 30 === 0) plant.leaves++
        if (plant.height % 50 === 0) plant.roots++
      }

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
      if (mx > 390 && mx < 410 && my > 300 && my < 300 + plant.height) return { type: "Stem" }
      if (p.dist(mx, my, 400, 400) < 50) return { type: "Root" }
      for (let i = 0; i < plant.leaves; i++) {
        if (p.dist(mx, my, 400, 300 - i * 30) < 15) return { type: "Leaf" }
      }
      return null
    }
  }

  useEffect(() => {
    const p5Instance = new p5(sketch, sketchRef.current)
    return () => p5Instance.remove()
  }, [])

  const resetSimulation = () => {
    plant = { height: 100, leaves: 2, roots: 3 }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Plant Structure Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Water Level</label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[water]}
                  onValueChange={([val]) => water = val}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {water}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Light Level</label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[light]}
                  onValueChange={([val]) => light = val}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {light}%</p>
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