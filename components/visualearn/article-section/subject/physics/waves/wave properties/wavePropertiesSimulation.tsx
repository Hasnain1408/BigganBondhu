"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Waves, MoveRight, MoveLeft } from "lucide-react"

export default function WavePropertiesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [amplitude, setAmplitude] = useState(50)
  const [frequency, setFrequency] = useState(1)
  const [wavelength, setWavelength] = useState(100)
  const [waveSpeed, setWaveSpeed] = useState(100)
  const [waveType, setWaveType] = useState<"transverse" | "longitudinal">("transverse")
  const [showParticles, setShowParticles] = useState(true)
  const [showWavefronts, setShowWavefronts] = useState(false)
  const [lang, setLang] = useState<"en" | "bn">("en")
  
  // Animation state
  const [animationTime, setAnimationTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // Constants
  const particleCount = 20
  const centerY = 200
  const particleSpacing = 20

  const drawWave = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 0.5
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
    
    // Draw wave
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()
    
    const actualSpeed = waveSpeed / 10
    const actualFrequency = frequency / 10
    const actualWavelength = wavelength * 2
    
    for (let x = 0; x < width; x++) {
      const phase = (x / actualWavelength) * Math.PI * 2
      const displacement = amplitude * Math.sin(phase - animationTime * actualFrequency)
      
      if (x === 0) {
        ctx.moveTo(x, centerY + (waveType === "transverse" ? displacement : 0))
      } else {
        ctx.lineTo(x, centerY + (waveType === "transverse" ? displacement : 0))
      }
    }
    
    ctx.stroke()
    
    // Draw particles if enabled
    if (showParticles) {
      for (let i = 0; i < particleCount; i++) {
        const x = i * particleSpacing + 50
        const phase = (x / actualWavelength) * Math.PI * 2
        const displacement = amplitude * Math.sin(phase - animationTime * actualFrequency)
        
        ctx.beginPath()
        if (waveType === "transverse") {
          ctx.arc(x, centerY + displacement, 5, 0, Math.PI * 2)
        } else {
          ctx.arc(x + displacement / 2, centerY, 5, 0, Math.PI * 2)
        }
        ctx.fillStyle = "#ef4444"
        ctx.fill()
      }
    }
    
    // Draw wavefronts if enabled
    if (showWavefronts) {
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      
      for (let i = 0; i < 5; i++) {
        const x = (animationTime * actualSpeed + i * actualWavelength) % (width + actualWavelength)
        ctx.beginPath()
        ctx.moveTo(x - actualWavelength, 0)
        ctx.lineTo(x - actualWavelength, height)
        ctx.stroke()
      }
      
      ctx.setLineDash([])
    }
    
    // Draw information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 100)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `প্রশস্ততা: ${amplitude} px`,
      `কম্পাঙ্ক: ${frequency.toFixed(1)} Hz`,
      `তরঙ্গদৈর্ঘ্য: ${wavelength.toFixed(1)} px`,
      `বেগ: ${waveSpeed.toFixed(1)} px/s`
    ] : [
      `Amplitude: ${amplitude} px`,
      `Frequency: ${frequency.toFixed(1)} Hz`,
      `Wavelength: ${wavelength.toFixed(1)} px`,
      `Speed: ${waveSpeed.toFixed(1)} px/s`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 30 + index * 20)
    })
    
    // Animate if playing
    if (isPlaying) {
      setAnimationTime(prev => prev + 0.05)
    }
    
    requestRef.current = requestAnimationFrame(drawWave)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(drawWave)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, amplitude, frequency, wavelength, waveSpeed, waveType, showParticles, showWavefronts, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setAmplitude(50)
    setFrequency(1)
    setWavelength(100)
    setWaveSpeed(100)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={400} 
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
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
            onClick={() => setWaveType(waveType === "transverse" ? "longitudinal" : "transverse")} 
            variant="outline"
          >
            {waveType === "transverse" ? (
              <>
                <MoveRight className="h-4 w-4 mr-2" /> 
                {lang === "bn" ? "অনুদৈর্ঘ্য তরঙ্গ" : "Longitudinal"}
              </>
            ) : (
              <>
                <Waves className="h-4 w-4 mr-2" /> 
                {lang === "bn" ? "অনুপ্রস্থ তরঙ্গ" : "Transverse"}
              </>
            )}
          </Button>
          <Button 
            onClick={() => setShowParticles(!showParticles)} 
            variant={showParticles ? "default" : "outline"}
          >
            <MoveLeft className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "কণা দেখান" : "Particles"}
          </Button>
          <Button 
            onClick={() => setShowWavefronts(!showWavefronts)} 
            variant={showWavefronts ? "default" : "outline"}
          >
            <Waves className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "তরঙ্গমুখ" : "Wavefronts"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "প্রশস্ততা (px)" : "Amplitude (px)"}</Label>
              <Slider
                min={10}
                max={100}
                step={1}
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{amplitude} px</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "কম্পাঙ্ক (Hz)" : "Frequency (Hz)"}</Label>
              <Slider
                min={0.1}
                max={2}
                step={0.1}
                value={[frequency]}
                onValueChange={(v) => setFrequency(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{frequency.toFixed(1)} Hz</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তরঙ্গদৈর্ঘ্য (px)" : "Wavelength (px)"}</Label>
              <Slider
                min={50}
                max={200}
                step={5}
                value={[wavelength]}
                onValueChange={(v) => setWavelength(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{wavelength} px</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "তরঙ্গ বেগ (px/s)" : "Wave Speed (px/s)"}</Label>
              <Slider
                min={50}
                max={200}
                step={5}
                value={[waveSpeed]}
                onValueChange={(v) => setWaveSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{waveSpeed} px/s</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "অনুপ্রস্থ তরঙ্গ" : "Transverse Wave"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "কণার সরণ তরঙ্গের গতির সাথে লম্ব। উদাহরণ: আলোক তরঙ্গ, দড়ির তরঙ্গ।"
                  : "Particle displacement perpendicular to wave motion. Examples: light waves, rope waves."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "অনুদৈর্ঘ্য তরঙ্গ" : "Longitudinal Wave"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "কণার সরণ তরঙ্গের গতির সমান্তরাল। উদাহরণ: শব্দ তরঙ্গ, স্প্রিং তরঙ্গ।"
                  : "Particle displacement parallel to wave motion. Examples: sound waves, spring waves."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                {lang === "bn" ? "তরঙ্গ সমীকরণ" : "Wave Equation"}
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {lang === "bn" 
                  ? "v = fλ, যেখানে v = বেগ, f = কম্পাঙ্ক, λ = তরঙ্গদৈর্ঘ্য"
                  : "v = fλ, where v = velocity, f = frequency, λ = wavelength"}
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