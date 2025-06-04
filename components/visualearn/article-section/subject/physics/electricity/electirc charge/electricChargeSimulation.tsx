"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Zap, Plus, Minus } from "lucide-react"

interface Charge {
  x: number
  y: number
  charge: number // in micro-coulombs
  id: number
}

export default function ElectricChargeSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [charges, setCharges] = useState<Charge[]>([
    { x: 200, y: 200, charge: 5, id: 1 },
    { x: 400, y: 200, charge: -5, id: 2 }
  ])
  const [selectedCharge, setSelectedCharge] = useState<number | null>(null)
  const [chargeValue, setChargeValue] = useState(5)
  const [showField, setShowField] = useState(true)
  const [showForces, setShowForces] = useState(true)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [draggedCharge, setDraggedCharge] = useState<number | null>(null)
  
  const k = 9.0 // Coulomb constant (scaled for visualization)
  const maxCharges = 6

  const calculateForce = (q1: Charge, q2: Charge) => {
    const dx = q2.x - q1.x
    const dy = q2.y - q1.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 20) return { fx: 0, fy: 0, magnitude: 0 }
    
    const force = (k * Math.abs(q1.charge * q2.charge)) / (distance * distance)
    const fx = (force * dx) / distance
    const fy = (force * dy) / distance
    
    // If charges have same sign, force is repulsive (away from q2)
    // If opposite signs, force is attractive (toward q2)
    const sign = (q1.charge * q2.charge > 0) ? -1 : 1
    
    return {
      fx: fx * sign,
      fy: fy * sign,
      magnitude: force
    }
  }

  const calculateElectricField = (x: number, y: number) => {
    let Ex = 0, Ey = 0
    
    charges.forEach(charge => {
      const dx = x - charge.x
      const dy = y - charge.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 10) {
        const E = (k * Math.abs(charge.charge)) / (distance * distance)
        const unitX = dx / distance
        const unitY = dy / distance
        
        // Field points away from positive charge, toward negative charge
        const sign = charge.charge > 0 ? 1 : -1
        Ex += E * unitX * sign
        Ey += E * unitY * sign
      }
    })
    
    return { Ex, Ey, magnitude: Math.sqrt(Ex * Ex + Ey * Ey) }
  }

  const draw = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw electric field lines if enabled
    if (showField) {
      ctx.strokeStyle = "rgba(100, 100, 100, 0.3)"
      ctx.lineWidth = 1
      
      for (let x = 30; x < width - 30; x += 30) {
        for (let y = 30; y < height - 30; y += 30) {
          const field = calculateElectricField(x, y)
          if (field.magnitude > 0.1) {
            const length = Math.min(15, field.magnitude * 2)
            const angle = Math.atan2(field.Ey, field.Ex)
            
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle))
            ctx.stroke()
            
            // Arrow head
            const arrowSize = 3
            ctx.beginPath()
            ctx.moveTo(x + length * Math.cos(angle), y + length * Math.sin(angle))
            ctx.lineTo(
              x + length * Math.cos(angle) - arrowSize * Math.cos(angle - 0.5),
              y + length * Math.sin(angle) - arrowSize * Math.sin(angle - 0.5)
            )
            ctx.moveTo(x + length * Math.cos(angle), y + length * Math.sin(angle))
            ctx.lineTo(
              x + length * Math.cos(angle) - arrowSize * Math.cos(angle + 0.5),
              y + length * Math.sin(angle) - arrowSize * Math.sin(angle + 0.5)
            )
            ctx.stroke()
          }
        }
      }
    }
    
    // Draw charges and forces
    charges.forEach((charge, index) => {
      // Draw charge
      ctx.beginPath()
      ctx.arc(charge.x, charge.y, 20, 0, Math.PI * 2)
      ctx.fillStyle = charge.charge > 0 ? "#ef4444" : "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = selectedCharge === charge.id ? "#000" : "#666"
      ctx.lineWidth = selectedCharge === charge.id ? 3 : 2
      ctx.stroke()
      
      // Draw charge sign and value
      ctx.fillStyle = "white"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(charge.charge > 0 ? "+" : "−", charge.x, charge.y + 5)
      
      // Draw charge value
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(`${Math.abs(charge.charge)}μC`, charge.x, charge.y + 35)
      
      // Draw forces if enabled
      if (showForces) {
        let totalFx = 0, totalFy = 0
        
        charges.forEach((otherCharge, otherIndex) => {
          if (index !== otherIndex) {
            const force = calculateForce(charge, otherCharge)
            totalFx += force.fx
            totalFy += force.fy
          }
        })
        
        // Draw total force vector
        const forceScale = 5
        const forceLength = Math.sqrt(totalFx * totalFx + totalFy * totalFy) * forceScale
        
        if (forceLength > 5) {
          ctx.beginPath()
          ctx.moveTo(charge.x, charge.y)
          ctx.lineTo(charge.x + totalFx * forceScale, charge.y + totalFy * forceScale)
          ctx.strokeStyle = "#22c55e"
          ctx.lineWidth = 3
          ctx.stroke()
          
          // Arrow head
          const angle = Math.atan2(totalFy, totalFx)
          const arrowSize = 8
          ctx.beginPath()
          ctx.moveTo(charge.x + totalFx * forceScale, charge.y + totalFy * forceScale)
          ctx.lineTo(
            charge.x + totalFx * forceScale - arrowSize * Math.cos(angle - 0.3),
            charge.y + totalFy * forceScale - arrowSize * Math.sin(angle - 0.3)
          )
          ctx.lineTo(
            charge.x + totalFx * forceScale - arrowSize * Math.cos(angle + 0.3),
            charge.y + totalFy * forceScale - arrowSize * Math.sin(angle + 0.3)
          )
          ctx.closePath()
          ctx.fillStyle = "#22c55e"
          ctx.fill()
        }
      }
    })
    
    // Draw legend
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    const legendY = height - 80
    
    if (showField) {
      ctx.fillText(
        lang === "bn" ? "বৈদ্যুতিক ক্ষেত্র রেখা" : "Electric Field Lines",
        10, legendY
      )
    }
    
    if (showForces) {
      ctx.fillStyle = "#22c55e"
      ctx.fillText(
        lang === "bn" ? "বল ভেক্টর" : "Force Vectors",
        10, legendY + 20
      )
    }
    
    ctx.fillStyle = "#ef4444"
    ctx.fillText(
      lang === "bn" ? "ধনাত্মক চার্জ" : "Positive Charge",
      10, legendY + 40
    )
    
    ctx.fillStyle = "#3b82f6"
    ctx.fillText(
      lang === "bn" ? "ঋণাত্মক চার্জ" : "Negative Charge",
      150, legendY + 40
    )
  }

  useEffect(() => {
    draw()
  }, [charges, selectedCharge, showField, showForces, lang])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if clicked on existing charge
    const clickedCharge = charges.find(charge => {
      const distance = Math.sqrt((x - charge.x) ** 2 + (y - charge.y) ** 2)
      return distance <= 20
    })
    
    if (clickedCharge) {
      setSelectedCharge(clickedCharge.id)
      setChargeValue(Math.abs(clickedCharge.charge))
    } else {
      // Add new charge if not at max limit
      if (charges.length < maxCharges) {
        const newCharge: Charge = {
          x,
          y,
          charge: chargeValue,
          id: Date.now()
        }
        setCharges([...charges, newCharge])
        setSelectedCharge(newCharge.id)
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const clickedCharge = charges.find(charge => {
      const distance = Math.sqrt((x - charge.x) ** 2 + (y - charge.y) ** 2)
      return distance <= 20
    })
    
    if (clickedCharge) {
      setDraggedCharge(clickedCharge.id)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || draggedCharge === null) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCharges(charges.map(charge => 
      charge.id === draggedCharge ? { ...charge, x, y } : charge
    ))
  }

  const handleMouseUp = () => {
    setDraggedCharge(null)
  }

  const updateSelectedCharge = (newValue: number, isPositive: boolean) => {
    if (selectedCharge === null) return
    
    const finalValue = isPositive ? newValue : -newValue
    setCharges(charges.map(charge => 
      charge.id === selectedCharge ? { ...charge, charge: finalValue } : charge
    ))
  }

  const removeSelectedCharge = () => {
    if (selectedCharge === null) return
    setCharges(charges.filter(charge => charge.id !== selectedCharge))
    setSelectedCharge(null)
  }

  const clearAllCharges = () => {
    setCharges([])
    setSelectedCharge(null)
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "চার্জের মান (μC)" : "Charge Value (μC)"}</Label>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[chargeValue]}
                onValueChange={(v) => setChargeValue(v[0])}
              />
              <p className="text-right mt-2">{chargeValue} μC</p>
              
              <div className="mt-4">
                <Label>{lang === "bn" ? "চার্জের ধরন" : "Charge Type"}</Label>
                <ToggleGroup type="single" defaultValue="positive" className="mt-2">
                  <ToggleGroupItem 
                    value="positive" 
                    onClick={() => selectedCharge && updateSelectedCharge(chargeValue, true)}
                  >
                    <Plus className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="negative"
                    onClick={() => selectedCharge && updateSelectedCharge(chargeValue, false)}
                  >
                    <Minus className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "প্রদর্শন বিকল্প" : "Display Options"}</Label>
              <div className="space-y-2 mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showField}
                    onChange={(e) => setShowField(e.target.checked)}
                  />
                  <span>{lang === "bn" ? "বৈদ্যুতিক ক্ষেত্র" : "Electric Field"}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showForces}
                    onChange={(e) => setShowForces(e.target.checked)}
                  />
                  <span>{lang === "bn" ? "বল ভেক্টর" : "Force Vectors"}</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "নিয়ন্ত্রণ" : "Controls"}</Label>
              <div className="space-y-2 mt-4">
                <Button 
                  onClick={removeSelectedCharge} 
                  disabled={selectedCharge === null}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {lang === "bn" ? "নির্বাচিত মুছুন" : "Remove Selected"}
                </Button>
                <Button 
                  onClick={clearAllCharges}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {lang === "bn" ? "সব মুছুন" : "Clear All"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>{lang === "bn" ? "তথ্য" : "Information"}</Label>
              <div className="text-sm mt-4 space-y-1">
                <p>{lang === "bn" ? "চার্জ সংখ্যা:" : "Charges:"} {charges.length}/{maxCharges}</p>
                <p className="text-xs text-muted-foreground">
                  {lang === "bn" 
                    ? "ক্লিক করুন নতুন চার্জ যোগ করতে। টেনে নিয়ে যান চার্জ সরাতে।"
                    : "Click to add charges. Drag to move charges."}
                </p>
              </div>
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