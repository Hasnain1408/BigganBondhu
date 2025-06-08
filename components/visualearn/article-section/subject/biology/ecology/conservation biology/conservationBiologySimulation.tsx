"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConservationSimulation() {
  const sketchRef = useRef()
  let animals = []
  let habitatQuality = 50
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
      for (let i = 0; i < 5; i++) {
        animals.push({ x: p.random(p.width), y: p.random(p.height), health: 100 })
      }
    }

    p.draw = () => {
      p.background(34, 139, 34)
      animals.forEach((a, i) => {
        p.fill(210, 105, 30)
        p.ellipse(a.x, a.y, 20)
        a.x += p.random(-3, 3)
        a.y += p.random(-3, 3)
        a.x = p.constrain(a.x, 0, p.width)
        a.y = p.constrain(a.y, 0, p.height)
        a.health += (habitatQuality - 50) / 100
        if (a.health > 100) a.health = 100
        if (a.health < 0) animals.splice(i, 1)
        if (a.health > 80 && Math.random() < 0.01) {
          animals.push({ x: a.x, y: a.y, health: 100 })
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
      animals.forEach(a => {
        let d = p.dist(mx, my, a.x, a.y)
        if (d < minDist && d < 20) {
          minDist = d
          closest = { type: "Animal" }
        }
      })
      return closest
    }
  }

  useEffect(() => {
    const p5Instance = new p5(sketch, sketchRef.current)
    return () => p5Instance.remove()
  }, [])

  const resetSimulation = () => {
    animals = []
    for (let i = 0; i < 5; i++) {
      animals.push({ x: Math.random() * 800, y: Math.random() * 600, health: 100 })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Conservation Biology Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Habitat Quality</label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[habitatQuality]}
                  onValueChange={([val]) => habitatQuality = val}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {habitatQuality}%</p>
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