"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MetabolismSimulation() {
  const sketchRef = useRef()
  let glucose = []
  let enzymes = []
  let pyruvate = []
  let enzymeCount = 10
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
      for (let i = 0; i < 15; i++) {
        glucose.push({ x: p.random(p.width), y: p.random(p.height) })
      }
      for (let i = 0; i < enzymeCount; i++) {
        enzymes.push({ x: p.random(p.width), y: p.random(p.height) })
      }
    }

    p.draw = () => {
      p.background(245, 245, 220)
      // Draw glucose
      glucose.forEach((g, i) => {
        p.fill(255, 69, 0)
        p.ellipse(g.x, g.y, 20)
        g.x += p.random(-2, 2)
        g.y += p.random(-2, 2)
        g.x = p.constrain(g.x, 0, p.width)
        g.y = p.constrain(g.y, 0, p.height)

        enzymes.forEach(e => {
          if (p.dist(g.x, g.y, e.x, e.y) < 25 && Math.random() < 0.01) {
            pyruvate.push({ x: g.x, y: g.y, life: 80 })
            glucose.splice(i, 1)
          }
        })
      })

      // Draw enzymes
      enzymes.forEach(e => {
        p.fill(139, 69, 19)
        p.rect(e.x - 10, e.y - 10, 20, 20)
        e.x += p.random(-3, 3)
        e.y += p.random(-3, 3)
        e.x = p.constrain(e.x, 0, p.width)
        e.y = p.constrain(e.y, 0, p.height)
      })

      // Draw pyruvate
      pyruvate.forEach((pyr, i) => {
        p.fill(0, 128, 0)
        p.ellipse(pyr.x, pyr.y, 15)
        pyr.life--
        if (pyr.life <= 0) pyruvate.splice(i, 1)
      })

      // Tooltip
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
      glucose.forEach(g => {
        let d = p.dist(mx, my, g.x, g.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Glucose" }
        }
      })
      enzymes.forEach(e => {
        let d = p.dist(mx, my, e.x, e.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Enzyme" }
        }
      })
      pyruvate.forEach(p => {
        let d = p.dist(mx, my, p.x, p.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Pyruvate" }
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
    glucose = []
    enzymes = []
    pyruvate = []
    for (let i = 0; i < 15; i++) {
      glucose.push({ x: Math.random() * 800, y: Math.random() * 600 })
    }
    for (let i = 0; i < enzymeCount; i++) {
      enzymes.push({ x: Math.random() * 800, y: Math.random() * 600 })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Metabolism Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Enzyme Count</label>
                <Slider
                  min={5}
                  max={30}
                  step={1}
                  value={[enzymeCount]}
                  onValueChange={([val]) => {
                    enzymeCount = val
                    enzymes = []
                    for (let i = 0; i < enzymeCount; i++) {
                      enzymes.push({ x: Math.random() * 800, y: Math.random() * 600 })
                    }
                  }}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {enzymeCount}</p>
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