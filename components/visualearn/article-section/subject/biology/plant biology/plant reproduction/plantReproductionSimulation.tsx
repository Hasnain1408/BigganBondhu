"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlantReproductionSimulation() {
  const sketchRef = useRef()
  let flowers = []
  let bees = []
  let seeds = []
  let beeCount = 5
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
      for (let i = 0; i < 10; i++) {
        flowers.push({ x: p.random(p.width), y: p.random(p.height), pollen: 100 })
      }
      for (let i = 0; i < beeCount; i++) {
        bees.push({ x: p.random(p.width), y: p.random(p.height), carryingPollen: false })
      }
    }

    p.draw = () => {
      p.background(144, 238, 144)
      flowers.forEach(f => {
        p.fill(255, 105, 180)
        p.ellipse(f.x, f.y, 30)
        p.fill(255, 255, 0)
        p.ellipse(f.x, f.y, 10)
      })

      bees.forEach(b => {
        p.fill(255, 215, 0)
        p.ellipse(b.x, b.y, 15)
        b.x += p.random(-5, 5)
        b.y += p.random(-5, 5)
        b.x = p.constrain(b.x, 0, p.width)
        b.y = p.constrain(b.y, 0, p.height)

        flowers.forEach(f => {
          if (p.dist(b.x, b.y, f.x, f.y) < 20) {
            if (!b.carryingPollen && f.pollen > 0) {
              b.carryingPollen = true
              f.pollen -= 10
            } else if (b.carryingPollen) {
              seeds.push({ x: f.x, y: f.y, life: 100 })
              b.carryingPollen = false
            }
          }
        })
      })

      seeds.forEach((s, i) => {
        p.fill(139, 69, 19)
        p.ellipse(s.x, s.y, 8)
        s.life--
        if (s.life <= 0) seeds.splice(i, 1)
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
      flowers.forEach(f => {
        let d = p.dist(mx, my, f.x, f.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Flower" }
        }
      })
      bees.forEach(b => {
        let d = p.dist(mx, my, b.x, b.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Bee" }
        }
      })
      seeds.forEach(s => {
        let d = p.dist(mx, my, s.x, s.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Seed" }
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
    flowers = []
    bees = []
    seeds = []
    for (let i = 0; i < 10; i++) {
      flowers.push({ x: Math.random() * 800, y: Math.random() * 600, pollen: 100 })
    }
    for (let i = 0; i < beeCount; i++) {
      bees.push({ x: Math.random() * 800, y: Math.random() * 600, carryingPollen: false })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Plant Reproduction Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bee Population</label>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={[beeCount]}
                  onValueChange={([val]) => {
                    beeCount = val
                    bees = []
                    for (let i = 0; i < beeCount; i++) {
                      bees.push({ x: Math.random() * 800, y: Math.random() * 600, carryingPollen: false })
                    }
                  }}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {beeCount}</p>
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