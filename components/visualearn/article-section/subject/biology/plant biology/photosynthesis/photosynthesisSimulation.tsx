"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PhotosynthesisSimulation() {
  const sketchRef = useRef()
  let chloroplasts = []
  let co2 = []
  let glucose = []
  let lightIntensity = 50
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
      for (let i = 0; i < 10; i++) {
        chloroplasts.push({ x: p.random(p.width), y: p.random(p.height) })
      }
      for (let i = 0; i < 15; i++) {
        co2.push({ x: p.random(p.width), y: p.random(p.height) })
      }
    }

    p.draw = () => {
      p.background(152, 251, 152)
      chloroplasts.forEach(c => {
        p.fill(0, 100, 0)
        p.ellipse(c.x, c.y, 30)
      })

      co2.forEach((c, i) => {
        p.fill(135, 206, 250)
        p.ellipse(c.x, c.y, 10)
        c.x += p.random(-2, 2)
        c.y += p.random(-2, 2)
        c.x = p.constrain(c.x, 0, p.width)
        c.y = p.constrain(c.y, 0, p.height)

        chloroplasts.forEach(ch => {
          if (p.dist(c.x, c.y, ch.x, ch.y) < 20 && Math.random() < 0.01 * (lightIntensity / 50)) {
            glucose.push({ x: ch.x, y: ch.y, life: 80 })
            co2.splice(i, 1)
          }
        })
      })

      glucose.forEach((g, i) => {
        p.fill(255, 69, 0)
        p.ellipse(g.x, g.y, 15)
        g.life--
        if (g.life <= 0) glucose.splice(i, 1)
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
      chloroplasts.forEach(c => {
        let d = p.dist(mx, my, c.x, c.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Chloroplast" }
        }
      })
      co2.forEach(c => {
        let d = p.dist(mx, my, c.x, c.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "CO2" }
        }
      })
      glucose.forEach(g => {
        let d = p.dist(mx, my, g.x, g.y)
        if (d < minDist && d < 30) {
          minDist = d
          closest = { type: "Glucose" }
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
    chloroplasts = []
    co2 = []
    glucose = []
    for (let i = 0; i < 10; i++) {
      chloroplasts.push({ x: Math.random() * 800, y: Math.random() * 600 })
    }
    for (let i = 0; i < 15; i++) {
      co2.push({ x: Math.random() * 800, y: Math.random() * 600 })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Photosynthesis Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Light Intensity</label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[lightIntensity]}
                  onValueChange={([val]) => lightIntensity = val}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {lightIntensity}%</p>
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