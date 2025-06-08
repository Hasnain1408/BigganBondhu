"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Zap, Activity } from "lucide-react"

export default function EnhancedEnzymesSimulation() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [temp, setTemp] = useState(37)
  const [pH, setPH] = useState(7)
  const [enzymeCount, setEnzymeCount] = useState(15)
  const [substrateCount, setSubstrateCount] = useState(25)
  const [stats, setStats] = useState({ reactions: 0, efficiency: 0 })
  
  const simulationRef = useRef({
    substrates: [],
    enzymes: [],
    products: [],
    reactionParticles: [],
    backgroundParticles: [],
    frameCounter: 0,
    totalReactions: 0,
    tooltip: { show: false, text: "", x: 0, y: 0 }
  })

  const initializeSimulation = () => {
    const sim = simulationRef.current
    sim.substrates = []
    sim.enzymes = []
    sim.products = []
    sim.reactionParticles = []
    sim.totalReactions = 0
    
    // Initialize background particles
    sim.backgroundParticles = []
    for (let i = 0; i < 50; i++) {
      sim.backgroundParticles.push({
        x: Math.random() * 900,
        y: Math.random() * 650,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 1 + 0.5,
        alpha: Math.random() * 0.2 + 0.1,
        hue: Math.random() * 80 + 200
      })
    }
    
    // Create substrates
    for (let i = 0; i < substrateCount; i++) {
      sim.substrates.push({
        x: Math.random() * 800 + 50,
        y: Math.random() * 550 + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 8,
        energy: Math.random() * 0.5 + 0.5,
        hue: Math.random() * 20 + 25,
        trail: []
      })
    }
    
    // Create enzymes
    for (let i = 0; i < enzymeCount; i++) {
      sim.enzymes.push({
        x: Math.random() * 800 + 50,
        y: Math.random() * 550 + 50,
        vx: (Math.random() - 0.5),
        vy: (Math.random() - 0.5),
        size: Math.random() * 5 + 15,
        activeRadius: Math.random() * 10 + 25,
        hue: Math.random() * 40 + 200,
        activity: 0,
        catalysisCount: 0,
        pulsation: Math.random() * Math.PI * 2,
        trail: []
      })
    }
  }

  const calculateReactionRate = (t, ph) => {
    const tempEffect = Math.exp(-Math.pow((t - 37) / 25, 2))
    const pHEffect = Math.exp(-Math.pow((ph - 7) / 2.5, 2))
    return tempEffect * pHEffect
  }

  const hslToRgb = (h, s, l, a = 1) => {
    h = h / 360
    s = s / 100
    l = l / 100
    
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`
  }

  const drawGradientBackground = (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, hslToRgb(220, 15, 98))
    gradient.addColorStop(1, hslToRgb(260, 25, 95))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  const drawBackgroundParticles = (ctx, particles, frameCounter) => {
    particles.forEach(particle => {
      ctx.fillStyle = hslToRgb(particle.hue, 30, 80, particle.alpha)
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      particle.x += particle.speed * Math.sin(frameCounter * 0.01)
      particle.y += particle.speed * Math.cos(frameCounter * 0.01)
      
      if (particle.x < 0) particle.x = 900
      if (particle.x > 900) particle.x = 0
      if (particle.y < 0) particle.y = 650
      if (particle.y > 650) particle.y = 0
    })
  }

  const drawTrail = (ctx, trail, hue, baseSize) => {
    trail.forEach((point, j) => {
      const alpha = (j / trail.length) * 0.3
      ctx.fillStyle = hslToRgb(hue, 70, 90, alpha)
      ctx.beginPath()
      ctx.arc(point.x, point.y, baseSize * alpha, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const drawSubstrates = (ctx, substrates, reactionRate) => {
    substrates.forEach((s, i) => {
      // Update trail
      s.trail.push({ x: s.x, y: s.y })
      if (s.trail.length > 8) s.trail.shift()
      
      // Draw trail
      drawTrail(ctx, s.trail, s.hue, s.size)
      
      // Movement with Brownian motion
      s.vx += (Math.random() - 0.5) * 0.2 * reactionRate
      s.vy += (Math.random() - 0.5) * 0.2 * reactionRate
      s.vx *= 0.98
      s.vy *= 0.98
      
      s.x += s.vx
      s.y += s.vy
      
      // Boundary reflection
      if (s.x < s.size || s.x > 900 - s.size) s.vx *= -0.8
      if (s.y < s.size || s.y > 650 - s.size) s.vy *= -0.8
      s.x = Math.max(s.size, Math.min(900 - s.size, s.x))
      s.y = Math.max(s.size, Math.min(650 - s.size, s.y))
      
      // Draw glow
      ctx.fillStyle = hslToRgb(s.hue, 70, 90, 0.3)
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw main body
      ctx.fillStyle = hslToRgb(s.hue, 80, 95)
      ctx.strokeStyle = hslToRgb(s.hue, 90, 70)
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      
      // Inner highlight
      ctx.fillStyle = hslToRgb(s.hue, 40, 100, 0.8)
      ctx.beginPath()
      ctx.arc(s.x - s.size/4, s.y - s.size/4, s.size/3, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const drawEnzymes = (ctx, enzymes, substrates, reactionRate, frameCounter) => {
    enzymes.forEach(enzyme => {
      // Update trail
      enzyme.trail.push({ x: enzyme.x, y: enzyme.y })
      if (enzyme.trail.length > 5) enzyme.trail.shift()
      
      // Draw trail
      drawTrail(ctx, enzyme.trail, enzyme.hue, enzyme.size)
      
      // Movement
      enzyme.vx += (Math.random() - 0.5) * 0.1
      enzyme.vy += (Math.random() - 0.5) * 0.1
      enzyme.vx *= 0.95
      enzyme.vy *= 0.95
      
      enzyme.x += enzyme.vx
      enzyme.y += enzyme.vy
      
      // Boundary reflection
      if (enzyme.x < enzyme.size || enzyme.x > 900 - enzyme.size) enzyme.vx *= -0.7
      if (enzyme.y < enzyme.size || enzyme.y > 650 - enzyme.size) enzyme.vy *= -0.7
      enzyme.x = Math.max(enzyme.size, Math.min(900 - enzyme.size, enzyme.x))
      enzyme.y = Math.max(enzyme.size, Math.min(650 - enzyme.size, enzyme.y))
      
      // Update pulsation and activity
      enzyme.pulsation += 0.1
      enzyme.activity *= 0.95
      
      // Draw active radius when enzyme is active
      if (enzyme.activity > 0.1) {
        ctx.fillStyle = hslToRgb(enzyme.hue, 40, 80, 0.2 * enzyme.activity)
        ctx.beginPath()
        ctx.arc(enzyme.x, enzyme.y, enzyme.activeRadius * (1 + enzyme.activity), 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Check for substrate interactions
      substrates.forEach((s, si) => {
        const distance = Math.sqrt(Math.pow(enzyme.x - s.x, 2) + Math.pow(enzyme.y - s.y, 2))
        if (distance < enzyme.activeRadius) {
          if (Math.random() < 0.03 * reactionRate) {
            // Create reaction
            createReaction(enzyme, s, si)
          } else if (distance < enzyme.activeRadius * 0.7) {
            // Attraction effect
            const dx = enzyme.x - s.x
            const dy = enzyme.y - s.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const attraction = 0.1 * reactionRate
            s.vx += (dx / dist) * attraction
            s.vy += (dy / dist) * attraction
            enzyme.activity = Math.min(enzyme.activity + 0.1, 1)
          }
        }
      })
      
      // Draw enzyme with complex shape
      ctx.save()
      ctx.translate(enzyme.x, enzyme.y)
      ctx.rotate(enzyme.pulsation * 0.5)
      
      // Outer glow
      const pulseSize = enzyme.size * (1 + Math.sin(enzyme.pulsation) * 0.2)
      ctx.fillStyle = hslToRgb(enzyme.hue, 50, 90, 0.4)
      ctx.beginPath()
      ctx.arc(0, 0, pulseSize * 0.75, 0, Math.PI * 2)
      ctx.fill()
      
      // Main enzyme body (hexagon)
      ctx.fillStyle = hslToRgb(enzyme.hue, 70, 85)
      ctx.strokeStyle = hslToRgb(enzyme.hue, 90, 60)
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let a = 0; a < Math.PI * 2; a += Math.PI/3) {
        const r = enzyme.size/2 * (1 + Math.sin(a * 3 + enzyme.pulsation) * 0.3)
        const x = r * Math.cos(a)
        const y = r * Math.sin(a)
        if (a === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      
      // Active site indicator
      ctx.fillStyle = hslToRgb(enzyme.hue + 60, 80, 100, 0.8)
      ctx.beginPath()
      ctx.arc(0, 0, enzyme.size * 0.15, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    })
  }

  const createReaction = (enzyme, substrate, substrateIndex) => {
    const sim = simulationRef.current
    
    // Create explosion particles
    for (let i = 0; i < 8; i++) {
      sim.reactionParticles.push({
        x: substrate.x,
        y: substrate.y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: Math.random() * 5 + 3,
        hue: Math.random() * 30 + 60,
        life: 30,
        maxLife: 30
      })
    }
    
    // Create product
    sim.products.push({
      x: substrate.x,
      y: substrate.y,
      size: substrate.size * 1.2,
      life: 120,
      maxLife: 120
    })
    
    // Remove substrate
    sim.substrates.splice(substrateIndex, 1)
    
    // Update enzyme stats
    enzyme.activity = 1
    enzyme.catalysisCount++
    sim.totalReactions++
  }

  const drawProducts = (ctx, products) => {
    products.forEach((prod, i) => {
      prod.life--
      prod.y -= 0.5
      prod.x += Math.sin(prod.life * 0.1) * 0.5
      
      const alpha = prod.life / prod.maxLife
      
      // Draw product
      ctx.fillStyle = hslToRgb(120, 70, 90, alpha)
      ctx.beginPath()
      ctx.arc(prod.x, prod.y, prod.size * alpha, 0, Math.PI * 2)
      ctx.fill()
      
      // Inner glow
      ctx.fillStyle = hslToRgb(120, 40, 100, alpha * 0.5)
      ctx.beginPath()
      ctx.arc(prod.x, prod.y, prod.size * 0.6 * alpha, 0, Math.PI * 2)
      ctx.fill()
      
      if (prod.life <= 0) {
        products.splice(i, 1)
      }
    })
  }

  const drawReactionParticles = (ctx, particles) => {
    particles.forEach((particle, i) => {
      particle.life--
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.98
      particle.vy *= 0.98
      
      const alpha = particle.life / particle.maxLife
      ctx.fillStyle = hslToRgb(particle.hue, 80, 100, alpha)
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
      ctx.fill()
      
      if (particle.life <= 0) {
        particles.splice(i, 1)
      }
    })
  }

  const drawStats = (ctx, sim) => {
    // Stats panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(10, 10, 200, 100)
    
    ctx.fillStyle = 'white'
    ctx.font = '14px Arial'
    ctx.fillText(`Reactions: ${sim.totalReactions}`, 20, 30)
    ctx.fillText(`Efficiency: ${Math.round(calculateReactionRate(temp, pH) * 100)}%`, 20, 50)
    ctx.fillText(`Substrates: ${sim.substrates.length}`, 20, 70)
    ctx.fillText(`Products: ${sim.products.length}`, 20, 90)
  }

  const findClosestEntity = (mouseX, mouseY, sim) => {
    let minDist = Infinity
    let closest = null
    
    sim.substrates.forEach(s => {
      const d = Math.sqrt(Math.pow(mouseX - s.x, 2) + Math.pow(mouseY - s.y, 2))
      if (d < minDist && d < 30) {
        minDist = d
        closest = { info: `Substrate (Energy: ${s.energy.toFixed(2)})` }
      }
    })
    
    sim.enzymes.forEach(e => {
      const d = Math.sqrt(Math.pow(mouseX - e.x, 2) + Math.pow(mouseY - e.y, 2))
      if (d < minDist && d < 30) {
        minDist = d
        closest = { info: `Enzyme (Reactions: ${e.catalysisCount})` }
      }
    })
    
    sim.products.forEach(p => {
      const d = Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2))
      if (d < minDist && d < 30) {
        minDist = d
        closest = { info: "Product" }
      }
    })
    
    return closest
  }

  const drawTooltip = (ctx, tooltip) => {
    if (tooltip.show) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(tooltip.x + 10, tooltip.y - 30, 120, 25)
      ctx.fillStyle = 'white'
      ctx.font = '12px Arial'
      ctx.fillText(tooltip.text, tooltip.x + 15, tooltip.y - 15)
    }
  }

  const animate = () => {
    if (!isPlaying) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const sim = simulationRef.current
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw gradient background
    drawGradientBackground(ctx, canvas.width, canvas.height)
    
    // Draw background particles
    drawBackgroundParticles(ctx, sim.backgroundParticles, sim.frameCounter)
    
    const reactionRate = calculateReactionRate(temp, pH)
    
    // Draw all entities
    drawSubstrates(ctx, sim.substrates, reactionRate)
    drawEnzymes(ctx, sim.enzymes, sim.substrates, reactionRate, sim.frameCounter)
    drawProducts(ctx, sim.products)
    drawReactionParticles(ctx, sim.reactionParticles)
    
    // Draw UI elements
    drawStats(ctx, sim)
    drawTooltip(ctx, sim.tooltip)
    
    sim.frameCounter++
    
    // Update stats every second
    if (sim.frameCounter % 60 === 0) {
      setStats({
        reactions: sim.totalReactions,
        efficiency: Math.round(reactionRate * 100)
      })
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    initializeSimulation()
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, temp, pH, enzymeCount, substrateCount])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const closest = findClosestEntity(mouseX, mouseY, simulationRef.current)
    
    simulationRef.current.tooltip = {
      show: !!closest,
      text: closest ? closest.info : "",
      x: mouseX,
      y: mouseY
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetSimulation = () => {
    initializeSimulation()
    setStats({ reactions: 0, efficiency: 0 })
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
          <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3">
            <Activity className="w-8 h-8" />
            Enhanced Enzyme Dynamics
            <Zap className="w-8 h-8" />
          </CardTitle>
          <p className="text-blue-100 mt-2">Interactive Biochemical Reaction Simulator</p>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Simulation Canvas */}
            <div className="lg:col-span-3">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={650}
                  className="rounded-lg shadow-lg border-4 border-blue-200 bg-white"
                  onMouseMove={handleMouseMove}
                />
                
                {/* Control Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    onClick={togglePlayPause}
                    size="sm"
                    className={`${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white shadow-lg`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={resetSimulation}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Controls Panel */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-800">Environmental Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Temperature: {temp}°C
                    </label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[temp]}
                      onValueChange={([val]) => setTemp(val)}
                      className="mb-2"
                    />
                    <div className="text-xs text-gray-500">
                      Optimal: 37°C (Body temperature)
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      pH Level: {pH.toFixed(1)}
                    </label>
                    <Slider
                      min={0}
                      max={14}
                      step={0.1}
                      value={[pH]}
                      onValueChange={([val]) => setPH(val)}
                      className="mb-2"
                    />
                    <div className="text-xs text-gray-500">
                      Optimal: 7.0 (Neutral)
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-800">Population Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enzymes: {enzymeCount}
                    </label>
                    <Slider
                      min={5}
                      max={50}
                      step={1}
                      value={[enzymeCount]}
                      onValueChange={([val]) => setEnzymeCount(val)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Substrates: {substrateCount}
                    </label>
                    <Slider
                      min={10}
                      max={100}
                      step={1}
                      value={[substrateCount]}
                      onValueChange={([val]) => setSubstrateCount(val)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-800">Live Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Reactions:</span>
                      <span className="font-bold text-purple-700">{stats.reactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-bold text-purple-700">{stats.efficiency}%</span>
                    </div>
                    <div className="mt-4 p-3 bg-white/50 rounded-lg">
                      <div className="text-xs text-gray-600 leading-relaxed">
                        <strong>Legend:</strong><br/>
                        🔵 Blue polygons = Enzymes<br/>
                        🟠 Orange circles = Substrates<br/>
                        🟢 Green circles = Products<br/>
                        ✨ Particles = Reactions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">How It Works</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              This simulation models enzyme kinetics where enzymes (blue polygons) catalyze the conversion of substrates (orange circles) 
              into products (green circles). Reaction rates are affected by temperature and pH levels, mimicking real biochemical processes. 
              Watch as enzymes attract nearby substrates and create explosive particle effects during catalysis!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}