"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Volume2, Waves, Music } from "lucide-react"

export default function SoundWaveSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(440) // Hz
  const [amplitude, setAmplitude] = useState(50)
  const [waveSpeed, setWaveSpeed] = useState(343) // m/s (speed of sound)
  const [showParticles, setShowParticles] = useState(true)
  const [showWaveform, setShowWaveform] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [waveType, setWaveType] = useState<"sine" | "square" | "sawtooth">("sine")
  
  // Animation state
  const [time, setTime] = useState(0)
  const [particles, setParticles] = useState<Array<{x: number, y: number, baseY: number, velocity: number}>>([])
  
  // Initialize particles
  useEffect(() => {
    const newParticles = []
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: i * 8,
        y: 225,
        baseY: 225,
        velocity: 0
      })
    }
    setParticles(newParticles)
  }, [])

  const generateWave = (x: number, t: number) => {
    const wavelength = waveSpeed / frequency
    const k = (2 * Math.PI) / wavelength
    const omega = 2 * Math.PI * frequency
    const phase = k * x - omega * t * 0.001 * animationSpeed
    
    switch (waveType) {
      case 'sine':
        return Math.sin(phase)
      case 'square':
        return Math.sign(Math.sin(phase))
      case 'sawtooth':
        return (2 / Math.PI) * Math.atan(Math.tan(phase / 2))
      default:
        return Math.sin(phase)
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#0f172a")
    gradient.addColorStop(0.5, "#1e293b")
    gradient.addColorStop(1, "#0f172a")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    
    // Draw waveform
    if (showWaveform) {
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 3
      ctx.beginPath()
      
      for (let x = 0; x < width; x += 2) {
        const waveValue = generateWave(x, time) * amplitude
        const y = height / 2 + waveValue
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      
      // Draw envelope
      ctx.strokeStyle = "#60a5fa"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, height / 2 + amplitude)
      ctx.lineTo(width, height / 2 + amplitude)
      ctx.moveTo(0, height / 2 - amplitude)
      ctx.lineTo(width, height / 2 - amplitude)
      ctx.stroke()
      ctx.setLineDash([])
    }
    
    // Update and draw particles
    if (showParticles) {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          const waveValue = generateWave(particle.x, time) * amplitude * 0.3
          const targetY = particle.baseY + waveValue
          
          // Simple spring physics
          const springForce = (targetY - particle.y) * 0.1
          const newVelocity = particle.velocity * 0.9 + springForce
          const newY = particle.y + newVelocity
          
          return {
            ...particle,
            y: newY,
            velocity: newVelocity
          }
        })
      })
      
      // Draw particles
      particles.forEach((particle, index) => {
        const hue = (index * 3.6) % 360
        ctx.fillStyle = `hsl(${hue}, 70%, 60%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw particle trail
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.3)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.baseY)
        ctx.lineTo(particle.x, particle.y)
        ctx.stroke()
      })
    }
    
    // Draw wavelength indicator
    const wavelength = waveSpeed / frequency
    const pixelsPerMeter = 100 // Scale factor
    const wavelengthPixels = wavelength / pixelsPerMeter
    
    if (wavelengthPixels > 20 && wavelengthPixels < width) {
      ctx.strokeStyle = "#fbbf24"
      ctx.lineWidth = 2
      ctx.setLineDash([10, 10])
      
      for (let x = 0; x < width; x += wavelengthPixels) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      ctx.setLineDash([])
      
      // Wavelength label
      ctx.fillStyle = "#fbbf24"
      ctx.font = "14px Arial"
      ctx.fillText(`λ = ${wavelength.toFixed(2)}m`, 10, 30)
    }
    
    // Draw frequency and amplitude info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(width - 220, 10, 200, 140)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `কম্পাঙ্ক: ${frequency} Hz`,
      `বিস্তার: ${amplitude}`,
      `তরঙ্গ দৈর্ঘ্য: ${wavelength.toFixed(2)} m`,
      `তরঙ্গ গতি: ${waveSpeed} m/s`,
      `পর্যায়কাল: ${(1/frequency * 1000).toFixed(1)} ms`,
      `তরঙ্গ প্রকার: ${waveType === 'sine' ? 'সাইন' : waveType === 'square' ? 'বর্গ' : 'করাত'}`
    ] : [
      `Frequency: ${frequency} Hz`,
      `Amplitude: ${amplitude}`,
      `Wavelength: ${wavelength.toFixed(2)} m`,
      `Wave Speed: ${waveSpeed} m/s`,
      `Period: ${(1/frequency * 1000).toFixed(1)} ms`,
      `Wave Type: ${waveType}`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, width - 210, 35 + index * 20)
    })
    
    // Draw musical note indicator
    const note = getMusicalNote(frequency)
    if (note) {
      ctx.fillStyle = "#10b981"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(note, width / 2, 50)
    }
    
    // Update time
    if (isPlaying) {
      setTime(prev => prev + 16) // ~60fps
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  const getMusicalNote = (freq: number) => {
    const notes = [
      { name: "C4", freq: 261.63 },
      { name: "D4", freq: 293.66 },
      { name: "E4", freq: 329.63 },
      { name: "F4", freq: 349.23 },
      { name: "G4", freq: 392.00 },
      { name: "A4", freq: 440.00 },
      { name: "B4", freq: 493.88 },
      { name: "C5", freq: 523.25 }
    ]
    
    const closest = notes.reduce((prev, curr) => 
      Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev
    )
    
    return Math.abs(closest.freq - freq) < 10 ? closest.name : null
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, frequency, amplitude, waveSpeed, showParticles, showWaveform, animationSpeed, lang, waveType, particles])

  const reset = () => {
    setTime(0)
    setIsPlaying(false)
    // Reset particles
    setParticles(prev => prev.map(p => ({ ...p, y: p.baseY, velocity: 0 })))
  }

  const presetFrequencies = [
    { name: lang === "bn" ? "গভীর স্বর" : "Deep Bass", freq: 80 },
    { name: lang === "bn" ? "বেস" : "Bass", freq: 120 },
    { name: "C4", freq: 261.63 },
    { name: "A4", freq: 440 },
    { name: lang === "bn" ? "উচ্চ স্বর" : "High Pitch", freq: 1000 },
    { name: lang === "bn" ? "অতি উচ্চ" : "Very High", freq: 2000 }
  ]

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
            onClick={() => setShowWaveform(!showWaveform)} 
            variant={showWaveform ? "default" : "outline"}
          >
            <Waves className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "তরঙ্গরূপ" : "Waveform"}
          </Button>
          <Button 
            onClick={() => setShowParticles(!showParticles)} 
            variant={showParticles ? "default" : "outline"}
          >
            <Volume2 className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "কণা" : "Particles"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কম্পাঙ্ক (Hz)" : "Frequency (Hz)"}</Label>
              <Slider
                min={20}
                max={2000}
                step={10}
                value={[frequency]}
                onValueChange={(v) => setFrequency(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{frequency} Hz</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "বিস্তার" : "Amplitude"}</Label>
              <Slider
                min={10}
                max={100}
                step={5}
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{amplitude}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তরঙ্গ গতি (m/s)" : "Wave Speed (m/s)"}</Label>
              <Slider
                min={300}
                max={400}
                step={5}
                value={[waveSpeed]}
                onValueChange={(v) => setWaveSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{waveSpeed} m/s</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তরঙ্গ প্রকার" : "Wave Type"}</Label>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant={waveType === "sine" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWaveType("sine")}
                >
                  {lang === "bn" ? "সাইন" : "Sine"}
                </Button>
                <Button
                  variant={waveType === "square" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWaveType("square")}
                >
                  {lang === "bn" ? "বর্গ" : "Square"}
                </Button>
                <Button
                  variant={waveType === "sawtooth" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWaveType("sawtooth")}
                >
                  {lang === "bn" ? "করাত" : "Sawtooth"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রিসেট কম্পাঙ্ক" : "Preset Frequencies"}</Label>
              <div className="flex flex-col gap-1 mt-2">
                {presetFrequencies.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setFrequency(preset.freq)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "শব্দ তরঙ্গ" : "Sound Wave"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "নীল রেখা শব্দ তরঙ্গের দোলন দেখায়। এটি বায়ু কণার সংকোচন ও প্রসারণ নির্দেশ করে।"
                  : "Blue line shows sound wave oscillation. It represents compression and rarefaction of air particles."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "কণার গতি" : "Particle Motion"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "রঙিন বিন্দুগুলি বায়ু কণার গতি দেখায়। এরা তরঙ্গের সাথে সামনে-পিছনে দোলে।"
                  : "Colored dots show air particle motion. They oscillate back and forth with the wave."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "তরঙ্গ দৈর্ঘ্য" : "Wavelength"}
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {lang === "bn" 
                  ? "হলুদ ড্যাশ লাইন তরঙ্গ দৈর্ঘ্য (λ) দেখায়। এটি দুটি একই দশার মধ্যে দূরত্ব।"
                  : "Yellow dashed lines show wavelength (λ). Distance between two points in the same phase."}
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