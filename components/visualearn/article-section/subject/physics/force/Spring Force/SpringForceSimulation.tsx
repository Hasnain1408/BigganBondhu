"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function SpringForceSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)

  const [k, setK] = useState(10) // Spring constant (N/m)
  const [mass, setMass] = useState(1) // kg
  const [displacement, setDisplacement] = useState(2) // m
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")

  const amplitude = displacement
  const omega = Math.sqrt(k / mass)

  const draw = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    // draw wall
    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, height / 2 - 50, 20, 100)

    const x = amplitude * Math.cos(omega * time)
    const blockX = 100 + x * 50

    // draw spring (simplified line)
    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(blockX, height / 2)
    ctx.strokeStyle = "#888"
    ctx.lineWidth = 4
    ctx.stroke()

    // draw block
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(blockX, height / 2 - 25, 50, 50)

    // draw data
    const force = -k * x
    const vel = -amplitude * omega * Math.sin(omega * time)

    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText(
      lang === "bn"
        ? `স্থানচ্যুতি: ${x.toFixed(2)} মি`
        : `Displacement: ${x.toFixed(2)} m`,
      20,
      30
    )
    ctx.fillText(
      lang === "bn"
        ? `বেগ: ${vel.toFixed(2)} মি/সে`
        : `Velocity: ${vel.toFixed(2)} m/s`,
      20,
      55
    )
    ctx.fillText(
      lang === "bn"
        ? `বল: ${force.toFixed(2)} নিউটন`
        : `Force: ${force.toFixed(2)} N`,
      20,
      80
    )
  }

  const animate = () => {
    setTime((t) => t + 0.016)
    draw()
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    draw()
  }, [k, mass, displacement, lang])

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying])

  const reset = () => {
    setTime(0)
    setIsPlaying(false)
    draw()
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                {lang === "bn" ? "বিরতি" : "Pause"}
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                {lang === "bn" ? "চালান" : "Play"}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <label>{lang === "bn" ? "স্প্রিং ধ্রুবক (k)" : "Spring Constant (k)"}</label>
              <Slider min={1} max={50} step={1} value={[k]} onValueChange={(v) => setK(v[0])} />
              <p className="text-right mt-2">{k} N/m</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <label>{lang === "bn" ? "ভর (kg)" : "Mass (kg)"}</label>
              <Slider min={0.5} max={10} step={0.1} value={[mass]} onValueChange={(v) => setMass(v[0])} />
              <p className="text-right mt-2">{mass.toFixed(1)} kg</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <label>{lang === "bn" ? "আরম্ভিক স্থানচ্যুতি (m)" : "Initial Displacement (m)"}</label>
              <Slider min={-5} max={5} step={0.1} value={[displacement]} onValueChange={(v) => setDisplacement(v[0])} />
              <p className="text-right mt-2">{displacement.toFixed(1)} m</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">{lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}</p>
          <div className="flex gap-2 mt-2">
            <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>
              English
            </Button>
            <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
