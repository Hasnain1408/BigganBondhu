"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DigestiveSystemSimulation() {
  const sketchRef = useRef()
  const p5InstanceRef = useRef() // Store p5 instance
  let foods = []
  let enzymes = []
  let nutrients = []
  let foodAmount = 10
  let tooltip = ""

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
      for (let i = 0; i < foodAmount; i++) {
        foods.push({ x: 400, y: 100 })
      }
      for (let i = 0; i < 10; i++) {
        enzymes.push({ x: p.random(p.width), y: p.random(200, 400) })
      }
    }

    p.draw = () => {
      p.background(255, 228, 225)
      p.fill(255, 160, 122)
      p.rect(300, 200, 200, 200) // Stomach
      foods.forEach((f, i) => {
        p.fill(139, 69, 19)
        p.ellipse(f.x, f.y, 15)
        f.y += 0.5
        if (f.y > 400) foods.splice(i, 1)

        enzymes.forEach(e => {
          if (p.dist(f.x, f.y, e.x, e.y) < 20 && Math.random() < 0.01) {
            nutrients.push({ x: f.x, y: f.y, life: 150 })
            foods.splice(i, 1)
          }
        })
      })

      enzymes.forEach(e => {
        p.fill(255, 215, 0)
        p.rect(e.x - 5, e.y - 5, 10, 10)
        e.x += p.random(-2, 2)
        e.y += p.random(-2, 2)
        e.x = p.constrain(e.x, 300, 500)
        e.y = p.constrain(e.y, 200, 400)
      })

      nutrients.forEach((n, i) => {
        p.fill(50, 205, 50)
        p.ellipse(n.x, n.y, 8)
        n.life--
        if (n.life <= 0) nutrients.splice(i, 1)
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
      foods.forEach(f => {
        let d = p.dist(mx, my, f.x, f.y)
        if (d < minDist && d < 15) {
          minDist = d
          closest = { type: "Food" }
        }
      })
      enzymes.forEach(e => {
        let d = p.dist(mx, my, e.x, e.y)
        if (d < minDist && d < 10) {
          minDist = d
          closest = { type: "Enzyme" }
        }
      })
      nutrients.forEach(n => {
        let d = p.dist(mx, my, n.x, n.y)
        if (d < minDist && d < 8) {
          minDist = d
          closest = { type: "Nutrient" }
        }
      })
      if (mx > 300 && mx < 500 && my > 200 && my < 400) return { type: "Stomach" }
      return closest
    }
  }

  useEffect(() => {
    const p5Instance = new p5(sketch, sketchRef.current)
    p5InstanceRef.current = p5Instance // Store p5 instance
    return () => p5Instance.remove()
  }, [])

  const resetSimulation = () => {
    foods = []
    enzymes = []
    nutrients = []
    const p = p5InstanceRef.current // Access p5 instance
    for (let i = 0; i < foodAmount; i++) {
      foods.push({ x: 400, y: 100 })
    }
    for (let i = 0; i < 10; i++) {
      enzymes.push({ x: p.random(p.width), y: p.random(200, 400) })
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Digestive System Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={sketchRef}></div>
          <Button onClick={resetSimulation}>Reset Simulation</Button>
        </CardContent>
      </Card>
    </div>
  )
}