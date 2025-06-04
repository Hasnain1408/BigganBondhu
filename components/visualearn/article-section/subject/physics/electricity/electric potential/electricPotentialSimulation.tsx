"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Zap, Target } from "lucide-react"

export default function ElectricPotentialSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [charge1, setCharge1] = useState(5)
  const [charge2, setCharge2] = useState(-3)
  const [testCharge, setTestCharge] = useState(1)
  const [showField, setShowField] = useState(true)
  const [showPotential, setShowPotential] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  
  // Animation state
  const [animationTime, setAnimationTime] = useState(0)
  const [testChargePos, setTestChargePos] = useState({ x: 400, y: 300 })
  const [isDragging, setIsDragging] = useState(false)
  
  // Constants
  const k = 8.99e9 // Coulomb's constant (scaled for visualization)
  const scale = 0.1 // Scale factor for visualization
  const centerX = 400
  const centerY = 225
  
  // Fixed charge positions
  const charge1Pos = { x: centerX - 150, y: centerY }
  const charge2Pos = { x: centerX + 150, y: centerY }

  const calculatePotential = (x: number, y: number) => {
    const r1 = Math.sqrt((x - charge1Pos.x) ** 2 + (y - charge1Pos.y) ** 2) / 50 + 0.1 // Add small offset to avoid division by zero
    const r2 = Math.sqrt((x - charge2Pos.x) ** 2 + (y - charge2Pos.y) ** 2) / 50 + 0.1
    
    return k * scale * (charge1 / r1 + charge2 / r2)
  }

  const calculateElectricField = (x: number, y: number) => {
    const dx1 = x - charge1Pos.x
    const dy1 = y - charge1Pos.y
    const r1 = Math.sqrt(dx1 ** 2 + dy1 ** 2) / 50 + 0.1
    
    const dx2 = x - charge2Pos.x
    const dy2 = y - charge2Pos.y
    const r2 = Math.sqrt(dx2 ** 2 + dy2 ** 2) / 50 + 0.1
    
    const Ex = k * scale * (charge1 * dx1 / (r1 ** 3) + charge2 * dx2 / (r2 ** 3))
    const Ey = k * scale * (charge1 * dy1 / (r1 ** 3) + charge2 * dy2 / (r2 ** 3))
    
    return { Ex, Ey, magnitude: Math.sqrt(Ex ** 2 + Ey ** 2) }
  }

  const getColorFromPotential = (potential: number) => {
    // Normalize potential for color mapping
    const normalized = Math.max(-1, Math.min(1, potential / 100))
    
    if (normalized > 0) {
      // Positive potential - red
      const intensity = Math.floor(255 * normalized)
      return `rgb(255, ${255 - intensity}, ${255 - intensity})`
    } else {
      // Negative potential - blue
      const intensity = Math.floor(255 * Math.abs(normalized))
      return `rgb(${255 - intensity}, ${255 - intensity}, 255)`
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw potential field as background
    if (showPotential) {
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      
      for (let x = 0; x < width; x += 4) {
        for (let y = 0; y < height; y += 4) {
          const potential = calculatePotential(x, y)
          const color = getColorFromPotential(potential)
          const rgb = color.match(/\d+/g)?.map(Number) || [255, 255, 255]
          
          for (let dx = 0; dx < 4 && x + dx < width; dx++) {
            for (let dy = 0; dy < 4 && y + dy < height; dy++) {
              const index = ((y + dy) * width + (x + dx)) * 4
              data[index] = rgb[0]     // Red
              data[index + 1] = rgb[1] // Green
              data[index + 2] = rgb[2] // Blue
              data[index + 3] = 50     // Alpha (transparency)
            }
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
    }
    
    // Draw equipotential lines
    if (showPotential) {
      ctx.strokeStyle = "#666"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      
      const potentialLevels = [-200, -100, -50, -20, 0, 20, 50, 100, 200]
      
      potentialLevels.forEach(targetPotential => {
        ctx.beginPath()
        let pathStarted = false
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          for (let radius = 20; radius < 300; radius += 5) {
            const x = centerX + Math.cos(angle) * radius
            const y = centerY + Math.sin(angle) * radius
            
            if (x < 0 || x > width || y < 0 || y > height) continue
            
            const potential = calculatePotential(x, y)
            
            if (Math.abs(potential - targetPotential) < 10) {
              if (!pathStarted) {
                ctx.moveTo(x, y)
                pathStarted = true
              } else {
                ctx.lineTo(x, y)
              }
            }
          }
        }
        
        ctx.stroke()
      })
      
      ctx.setLineDash([])
    }
    
    // Draw electric field vectors
    if (showField) {
      ctx.strokeStyle = "#00ff00"
      ctx.lineWidth = 1
      
      for (let x = 50; x < width; x += 40) {
        for (let y = 50; y < height; y += 40) {
          // Skip positions too close to charges
          const distToCharge1 = Math.sqrt((x - charge1Pos.x) ** 2 + (y - charge1Pos.y) ** 2)
          const distToCharge2 = Math.sqrt((x - charge2Pos.x) ** 2 + (y - charge2Pos.y) ** 2)
          
          if (distToCharge1 < 30 || distToCharge2 < 30) continue
          
          const field = calculateElectricField(x, y)
          const length = Math.min(20, field.magnitude * 2)
          
          if (length > 1) {
            const angle = Math.atan2(field.Ey, field.Ex)
            const endX = x + Math.cos(angle) * length
            const endY = y + Math.sin(angle) * length
            
            // Draw field vector
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(endX, endY)
            ctx.stroke()
            
            // Draw arrowhead
            const arrowAngle = 0.5
            const arrowLength = 5
            ctx.beginPath()
            ctx.moveTo(endX, endY)
            ctx.lineTo(
              endX - Math.cos(angle - arrowAngle) * arrowLength,
              endY - Math.sin(angle - arrowAngle) * arrowLength
            )
            ctx.moveTo(endX, endY)
            ctx.lineTo(
              endX - Math.cos(angle + arrowAngle) * arrowLength,
              endY - Math.sin(angle + arrowAngle) * arrowLength
            )
            ctx.stroke()
          }
        }
      }
    }
    
    // Draw charges
    // Charge 1
    ctx.beginPath()
    ctx.arc(charge1Pos.x, charge1Pos.y, 20, 0, Math.PI * 2)
    ctx.fillStyle = charge1 > 0 ? "#ff4444" : "#4444ff"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Charge 1 label
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${charge1 > 0 ? "+" : ""}${charge1}μC`, charge1Pos.x, charge1Pos.y + 5)
    
    // Charge 2
    ctx.beginPath()
    ctx.arc(charge2Pos.x, charge2Pos.y, 20, 0, Math.PI * 2)
    ctx.fillStyle = charge2 > 0 ? "#ff4444" : "#4444ff"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Charge 2 label
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${charge2 > 0 ? "+" : ""}${charge2}μC`, charge2Pos.x, charge2Pos.y + 5)
    
    // Draw test charge
    ctx.beginPath()
    ctx.arc(testChargePos.x, testChargePos.y, 15, 0, Math.PI * 2)
    ctx.fillStyle = testCharge > 0 ? "#ffaa44" : "#44aaff"
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Test charge label
    ctx.fillStyle = "#fff"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${testCharge > 0 ? "+" : ""}${testCharge}μC`, testChargePos.x, testChargePos.y + 4)
    
    // Calculate and display values at test charge position
    const potential = calculatePotential(testChargePos.x, testChargePos.y)
    const field = calculateElectricField(testChargePos.x, testChargePos.y)
    const potentialEnergy = testCharge * potential / 1000 // Convert to reasonable units
    
    // Display information panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 200, 120)
    
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    
    const info = lang === "bn" ? [
      `বিভব: ${potential.toFixed(1)} V`,
      `ক্ষেত্র: ${field.magnitude.toFixed(1)} N/C`,
      `বিভব শক্তি: ${potentialEnergy.toFixed(2)} J`,
      `পরীক্ষা চার্জ: ${testCharge}μC`
    ] : [
      `Potential: ${potential.toFixed(1)} V`,
      `Field: ${field.magnitude.toFixed(1)} N/C`,
      `Pot. Energy: ${potentialEnergy.toFixed(2)} J`,
      `Test Charge: ${testCharge}μC`
    ]
    
    info.forEach((text, index) => {
      ctx.fillText(text, 20, 35 + index * 20)
    })
    
    // Animate test charge movement if playing
    if (isPlaying) {
      const radius = 50 + 30 * Math.sin(animationTime * 0.02 * animationSpeed)
      const angle = animationTime * 0.01 * animationSpeed
      setTestChargePos({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      })
      
      setAnimationTime(prev => prev + 1)
    }
    
    requestRef.current = requestAnimationFrame(animate)
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setTestChargePos({ x, y })
      }
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const distance = Math.sqrt((x - testChargePos.x) ** 2 + (y - testChargePos.y) ** 2)
      
      if (distance < 15) {
        setIsDragging(true)
      }
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setTestChargePos({ x, y })
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, charge1, charge2, testCharge, showField, showPotential, animationSpeed, testChargePos, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setTestChargePos({ x: 400, y: 300 })
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={450} 
            className="w-full h-full cursor-pointer"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
            onClick={() => setShowField(!showField)} 
            variant={showField ? "default" : "outline"}
          >
            <Zap className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "বৈদ্যুতিক ক্ষেত্র" : "Electric Field"}
          </Button>
          <Button 
            onClick={() => setShowPotential(!showPotential)} 
            variant={showPotential ? "default" : "outline"}
          >
            <Target className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "বিভব রেখা" : "Potential"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "চার্জ ১ (μC)" : "Charge 1 (μC)"}</Label>
              <Slider
                min={-10}
                max={10}
                step={0.5}
                value={[charge1]}
                onValueChange={(v) => setCharge1(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{charge1.toFixed(1)} μC</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "চার্জ ২ (μC)" : "Charge 2 (μC)"}</Label>
              <Slider
                min={-10}
                max={10}
                step={0.5}
                value={[charge2]}
                onValueChange={(v) => setCharge2(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{charge2.toFixed(1)} μC</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "পরীক্ষা চার্জ (μC)" : "Test Charge (μC)"}</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[testCharge]}
                onValueChange={(v) => setTestCharge(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm font-mono">{testCharge.toFixed(1)} μC</p>
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
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {lang === "bn" ? "নিয়ন্ত্রণ" : "Controls"}
                </p>
                <div className="text-xs space-y-1">
                  <p>{lang === "bn" ? "• ক্লিক করে পরীক্ষা চার্জ সরান" : "• Click to move test charge"}</p>
                  <p>{lang === "bn" ? "• টেনে এনে নিয়ে যান" : "• Drag to reposition"}</p>
                  <p>{lang === "bn" ? "• লাল = ধনাত্মক চার্জ" : "• Red = Positive charge"}</p>
                  <p>{lang === "bn" ? "• নীল = ঋণাত্মক চার্জ" : "• Blue = Negative charge"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {lang === "bn" ? "ধনাত্মক বিভব অঞ্চল" : "Positive Potential Region"}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {lang === "bn" 
                  ? "লাল রঙের এলাকা উচ্চ ধনাত্মক বিভব নির্দেশ করে। ধনাত্মক চার্জের কাছাকাছি এই অঞ্চল দেখা যায়।"
                  : "Red areas indicate high positive potential. Found near positive charges."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {lang === "bn" ? "ঋণাত্মক বিভব অঞ্চল" : "Negative Potential Region"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {lang === "bn" 
                  ? "নীল রঙের এলাকা ঋণাত্মক বিভব নির্দেশ করে। ঋণাত্মক চার্জের কাছাকাছি এই অঞ্চল দেখা যায়।"
                  : "Blue areas indicate negative potential. Found near negative charges."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                {lang === "bn" ? "বৈদ্যুতিক ক্ষেত্র রেখা" : "Electric Field Lines"}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {lang === "bn" 
                  ? "সবুজ তীর বৈদ্যুতিক ক্ষেত্রের দিক ও তীব্রতা দেখায়। সমবিভব রেখার সাথে লম্ব।"
                  : "Green arrows show electric field direction and strength. Perpendicular to equipotential lines."}
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