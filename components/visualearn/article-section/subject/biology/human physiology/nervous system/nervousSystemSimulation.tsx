"use client"

import { useEffect, useRef, useState } from "react"
import p5 from "p5"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NervousSystemSimulation() {
  const sketchRef = useRef()
  const p5InstanceRef = useRef()
  
  // Use React state for signalSpeed and tooltip to keep UI reactive
  const [signalSpeed, setSignalSpeed] = useState(5)
  const [tooltip, setTooltip] = useState("")

  // Use refs for neurons and signals so p5 sketch can read/write them persistently
  const neuronsRef = useRef([{ x: 200, y: 300, endX: 600, endY: 300 }])
  const signalsRef = useRef([{ x: 200, y: 300, progress: 0 }, { x: 200, y: 300, progress: 0 }, { x: 200, y: 300, progress: 0 }])

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 600)
    }

    p.draw = () => {
      p.background(230, 230, 250)
      
      const neurons = neuronsRef.current
      const signals = signalsRef.current
      
      // Draw neurons
      neurons.forEach(n => {
        p.stroke(0, 0, 139)
        p.line(n.x, n.y, n.endX, n.endY)
        p.fill(0, 0, 205)
        p.ellipse(n.x, n.y, 20)
        p.ellipse(n.endX, n.endY, 20)
      })

      // Draw signals and update progress
      for (let i = signals.length - 1; i >= 0; i--) {
        let s = signals[i]
        s.progress += signalSpeed / 100
        if (s.progress > 1) signals.splice(i, 1)
        else {
          let x = p.lerp(200, 600, s.progress)
          p.fill(255, 215, 0)
          p.ellipse(x, 300, 10)
        }
      }

      // Occasionally add new signals
      if (p.random() < 0.02) {
        signals.push({ x: 200, y: 300, progress: 0 })
      }

      // Tooltip detection
      if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        const closest = findClosest(p.mouseX, p.mouseY, p, neurons, signals)
        if (closest) setTooltip(closest.type)
        else setTooltip("")
      } else {
        setTooltip("")
      }

      // Draw tooltip
      if (tooltip) {
        p.fill(0, 0, 0, 200)
        p.noStroke()
        p.rect(p.mouseX + 10, p.mouseY - 20, 80, 30, 5)
        p.fill(255)
        p.textSize(14)
        p.text(tooltip, p.mouseX + 15, p.mouseY)
      }
    }
  }

  // Helper function for closest object detection
  function findClosest(mx, my, p, neurons, signals) {
    let minDist = Infinity
    let closest = null

    neurons.forEach(n => {
      // Check start neuron
      let d1 = p.dist(mx, my, n.x, n.y)
      if (d1 < minDist && d1 < 20) {
        minDist = d1
        closest = { type: "Neuron" }
      }
      // Check end neuron
      let d2 = p.dist(mx, my, n.endX, n.endY)
      if (d2 < minDist && d2 < 20) {
        minDist = d2
        closest = { type: "Neuron" }
      }
    })

    signals.forEach(s => {
      let x = p.lerp(200, 600, s.progress)
      let d = p.dist(mx, my, x, 300)
      if (d < minDist && d < 10) {
        minDist = d
        closest = { type: "Signal" }
      }
    })

    return closest
  }

  useEffect(() => {
    p5InstanceRef.current = new p5(sketch, sketchRef.current)
    return () => {
      p5InstanceRef.current.remove()
    }
  }, [])

  // When signalSpeed changes, no need to update anything else, p5 reads it from state on each draw

  // Reset simulation clears signals and adds initial three signals
  const resetSimulation = () => {
    signalsRef.current = [{ x: 200, y: 300, progress: 0 }, { x: 200, y: 300, progress: 0 }, { x: 200, y: 300, progress: 0 }]
    setTooltip("")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Nervous System Simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div ref={sketchRef} className="mb-4"></div>
            <div className="w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Signal Speed</label>
                <Slider
                  min={1}
                  max={10}
                  step={0.1}
                  value={[signalSpeed]}
                  onValueChange={([val]) => setSignalSpeed(val)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500">Current: {signalSpeed.toFixed(1)}</p>
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
