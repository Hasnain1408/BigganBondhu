"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Waves, Aperture } from "lucide-react"

export default function LightWaveSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wavelength, setWavelength] = useState(500)
  const [amplitude, setAmplitude] = useState(50)
  const [frequency, setFrequency] = useState(1)
  const [showInterference, setShowInterference] = useState(true)
  const [showDiffraction, setShowDiffraction] = useState(false)
  const [slitWidth, setSlitWidth] = useState(20)
  const [lang, setLang] = useState<"en" | "bn">("en")

  const [animationTime, setAnimationTime] = useState(0)

  const centerX = 400
  const centerY = 225
  const source1Pos = { x: centerX - 100, y: centerY }
  const source2Pos = { x: centerX + 100, y: centerY }

  const calculateWave = (x: number, y: number, time: number, source: { x: number, y: number }) => {
    const dx = x - source.x
    const dy = y - source.y
    const r = Math.sqrt(dx ** 2 + dy ** 2) + 0.1 // Avoid division by zero
    const k = 2 * Math.PI / (wavelength / 50)
    const omega = 2 * Math.PI * frequency
    return amplitude * Math.sin(k * r - omega * time)
  }

  const calculateIntensity = (x: number, y: number, time: number) => {
    if (showDiffraction) {
      const dx = x - centerX
      const dy = y - centerY
      const r = Math.sqrt(dx ** 2 + dy ** 2) + 0.1
      const k = 2 * Math.PI / (wavelength / 50)
      const omega = 2 * Math.PI * frequency
      const beta = (Math.PI * slitWidth * Math.sin(Math.atan2(dy, dx))) / (wavelength / 50)
      return amplitude * Math.sin(k * r - omega * time) * (Math.sin(beta) / beta) ** 2
    } else {
      const wave1 = calculateWave(x, y, time, source1Pos)
      const wave2 = showInterference ? calculateWave(x, y, time, source2Pos) : 0
      return wave1 + wave2
    }
  }

  const getColorFromIntensity = (intensity: number) => {
    const normalized = Math.max(-1, Math.min(1, intensity / amplitude))
    const hue = wavelength * (360 / 700) // Map wavelength to hue
    return `hsl(${hue}, 70%, ${50 + normalized * 25}%)`
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    ctx.clearRect(0, 0, width, height)

    // Draw wave pattern
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    for (let x = 0; x < width; x += 2) {
      for (let y = 0; y < height; y += 2) {
        const intensity = calculateIntensity(x, y, animationTime)
        const color = getColorFromIntensity(intensity)
        const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255]

        for (let dx = 0; dx < 2 && x + dx < width; dx++) {
          for (let dy = 0; dy < 2 && y + dy < height; dy++) {
            const index = ((y + dy) * width + (x + dx)) * 4
            data[index] = rgb[0]
            data[index + 1] = rgb[1]
            data[index + 2] = rgb[2]
            data[index + 3] = 255
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)

    // Draw sources
    if (!showDiffraction) {
      ctx.beginPath()
      ctx.arc(source1Pos.x, source1Pos.y, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#ff4444"
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()

      if (showInterference) {
        ctx.beginPath()
        ctx.arc(source2Pos.x, source2Pos.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = "#4444ff"
        ctx.fill()
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 2
        ctx.stroke()
      }
    } else {
      ctx.fillStyle = "#333"
      ctx.fillRect(0, 0, width, centerY - slitWidth / 2)
      ctx.fillRect(0, centerY + slitWidth / 2, width, height - centerY - slitWidth / 2)
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, centerY - slitWidth / 2, width, slitWidth)
    }

    // Display information
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)

    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"

    const info = lang === "bn" ? [
      `তরঙ্গদৈর্ঘ্য: ${wavelength} nm`,
      `প্রশস্ততা: ${amplitude.toFixed(1)}`,
      `ফ্রিকোয়েন্সি: ${frequency.toFixed(1)} Hz`,
      `মোড: ${showDiffraction ? "বিচ্ছুরণ" : showInterference ? "ব্যতিক্রম" : "একক তরঙ্গ"}`
    ] : [
      `Wavelength: ${wavelength} nm`,
      `Amplitude: ${amplitude.toFixed(1)}`,
      `Frequency: ${frequency.toFixed(1)} Hz`,
      `Mode: ${showDiffraction ? "Diffraction" : showInterference ? "Interference" : "Single Wave"}`
    ]

    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 20)
    })

    if (isPlaying) {
      setAnimationTime(prev => prev + 0.05)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, wavelength, amplitude, frequency, showInterference, showDiffraction, slitWidth])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setWavelength(500)
    setAmplitude(50)
    setFrequency(1)
    setSlitWidth(20)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> {lang === "bn" ? "চালান" : "Play"}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট করুন" : "Reset"}
          </Button>
          <Button
            onClick={() => setShowInterference(!showInterference)}
            variant={showInterference ? "default" : "outline"}
            disabled={showDiffraction}
          >
            <Waves className="h-4 w-4 mr-2" />
            {lang === "bn" ? "ব্যতিক্রম" : "Interference"}
          </Button>
          <Button
            onClick={() => setShowDiffraction(!showDiffraction)}
            variant={showDiffraction ? "default" : "outline"}
          >
            <Aperture className="h-4 w-4 mr-2" />
            {lang === "bn" ? "বিচ্ছুরণ" : "Diffraction"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তরঙ্গদৈর্ঘ্য (nm)" : "Wavelength (nm)"}</Label>
              <Slider
                min={400}
                max={700}
                step={10}
                value={[wavelength]}
                onValueChange={(v) => setWavelength(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{wavelength} nm</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রশস্ততা" : "Amplitude"}</Label>
              <Slider
                min={10}
                max={100}
                step={5}
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{amplitude.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "ফ্রিকোয়েন্সি (Hz)" : "Frequency (Hz)"}</Label>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[frequency]}
                onValueChange={(v) => setFrequency(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{frequency.toFixed(1)} Hz</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "স্লিট প্রস্থ (বিচ্ছুরণ)" : "Slit Width (Diffraction)"}</Label>
              <Slider
                min={10}
                max={50}
                step={1}
                value={[slitWidth]}
                onValueChange={(v) => setSlitWidth(v[0])}
                className="mt-2"
                disabled={!showDiffraction}
              />
              <p className="text-right mt-1 text-sm font-mono">{slitWidth} px</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ব্যতিক্রম প্যাটার্ন" : "Interference Pattern"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn"
                  ? "দুটি তরঙ্গ উৎস থেকে উজ্জ্বল এবং অন্ধকার ব্যান্ড তৈরি হয়, গঠনমূলক এবং ধ্বংসাত্মক ব্যতিক্রম দেখায়।"
                  : "Bright and dark bands from two wave sources, showing constructive and destructive interference."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "বিচ্ছুরণ প্যাটার্ন" : "Diffraction Pattern"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "একটি স্লিটের মাধ্যমে আলোর ছড়িয়ে পড়া, কেন্দ্রীয় উজ্জ্বল ব্যান্ড এবং পাশের দুর্বল ব্যান্ড তৈরি করে।"
                  : "Light spreads through a slit, creating a central bright band and weaker side bands."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant={lang === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button
              variant={lang === "bn" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("bn")}
            >
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}