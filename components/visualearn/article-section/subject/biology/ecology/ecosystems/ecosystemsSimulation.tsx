"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Info } from "lucide-react"

export default function EnhancedEcosystemSimulation() {
  const canvasRef = useRef()
  const animationRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [producerCount, setProducerCount] = useState(15)
  const [consumerCount, setConsumerCount] = useState(8)
  const [predatorCount, setPredatorCount] = useState(3)

  const gameState = useRef({
    organisms: { producers: [], consumers: [], predators: [], decomposers: [] },
    particles: [],
    time: 0,
    stats: { producers: 0, consumers: 0, predators: 0, births: 0, deaths: 0 }
  })

  class Organism {
    constructor(x, y, type) {
      this.x = x
      this.y = y
      this.type = type
      this.energy = 100
      this.maxEnergy = type === 'producer' ? 150 : type === 'consumer' ? 120 : 100
      this.size = type === 'producer' ? 12 : type === 'consumer' ? 16 : 20
      this.speed = type === 'producer' ? 0.5 : type === 'consumer' ? 2 : 1.5
      this.vx = (Math.random() - 0.5) * this.speed * 2
      this.vy = (Math.random() - 0.5) * this.speed * 2
      this.age = 0
      this.reproduced = false
      this.hue = type === 'producer' ? 120 : type === 'consumer' ? 30 : 0
      this.pulseOffset = Math.random() * Math.PI * 2
    }

    update(time) {
      this.age++
      
      // Movement with smooth curves
      if (this.type !== 'producer') {
        this.vx += (Math.random() - 0.5) * 0.2
        this.vy += (Math.random() - 0.5) * 0.2
        this.vx *= 0.98
        this.vy *= 0.98
        
        this.x += this.vx
        this.y += this.vy
        
        // Boundary bouncing
        if (this.x < this.size || this.x > 800 - this.size) this.vx *= -0.8
        if (this.y < this.size || this.y > 600 - this.size) this.vy *= -0.8
        
        this.x = Math.max(this.size, Math.min(800 - this.size, this.x))
        this.y = Math.max(this.size, Math.min(600 - this.size, this.y))
      } else {
        // Producers sway gently
        this.x += Math.sin(time * 0.02 + this.pulseOffset) * 0.5
        this.y += Math.cos(time * 0.015 + this.pulseOffset) * 0.3
      }

      // Energy changes
      if (this.type === 'producer') {
        this.energy += 0.8 * speed
        // Photosynthesis particles
        if (Math.random() < 0.02) {
          gameState.current.particles.push(new Particle(this.x, this.y - 20, 'photosynthesis'))
        }
      } else {
        this.energy -= (this.type === 'predator' ? 0.4 : 0.3) * speed
      }

      return this.energy > 0 && this.age < 2000
    }

    display(ctx, time) {
      const pulse = Math.sin(time * 0.05 + this.pulseOffset) * 0.2 + 1
      const currentSize = this.size * pulse
      const energyRatio = this.energy / this.maxEnergy
      
      ctx.save()
      ctx.translate(this.x, this.y)
      
      // Glow effect
      const gradient = ctx.createRadialGradient(0, 0, currentSize, 0, 0, currentSize * 2)
      if (this.type === 'producer') {
        gradient.addColorStop(0, `hsla(120, 70%, 50%, 0.3)`)
        gradient.addColorStop(1, `hsla(120, 70%, 50%, 0)`)
      } else if (this.type === 'consumer') {
        gradient.addColorStop(0, `hsla(30, 70%, 50%, 0.3)`)
        gradient.addColorStop(1, `hsla(30, 70%, 50%, 0)`)
      } else {
        gradient.addColorStop(0, `hsla(0, 70%, 50%, 0.3)`)
        gradient.addColorStop(1, `hsla(0, 70%, 50%, 0)`)
      }
      
      ctx.fillStyle = gradient
      ctx.fillRect(-currentSize * 2, -currentSize * 2, currentSize * 4, currentSize * 4)
      
      // Main body
      if (this.type === 'producer') {
        ctx.fillStyle = `hsl(120, 70%, ${Math.max(20, 60 * energyRatio)}%)`
        ctx.strokeStyle = `hsl(120, 90%, 70%)`
      } else if (this.type === 'consumer') {
        ctx.fillStyle = `hsl(30, 70%, ${Math.max(20, 60 * energyRatio)}%)`
        ctx.strokeStyle = `hsl(30, 90%, 70%)`
      } else {
        ctx.fillStyle = `hsl(0, 70%, ${Math.max(20, 60 * energyRatio)}%)`
        ctx.strokeStyle = `hsl(0, 90%, 70%)`
      }
      
      ctx.lineWidth = 2
      
      if (this.type === 'producer') {
        // Leaf-like shape
        ctx.beginPath()
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const radius = currentSize * (1 + 0.3 * Math.sin(angle * 3))
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, currentSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        
        // Eyes for consumers and predators
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(-currentSize * 0.3, -currentSize * 0.2, 3, 0, Math.PI * 2)
        ctx.arc(currentSize * 0.3, -currentSize * 0.2, 3, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(-currentSize * 0.3, -currentSize * 0.2, 1.5, 0, Math.PI * 2)
        ctx.arc(currentSize * 0.3, -currentSize * 0.2, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Energy bar
      if (energyRatio < 0.5) {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(-currentSize, currentSize + 5)
        ctx.lineTo(currentSize * energyRatio * 2 - currentSize, currentSize + 5)
        ctx.stroke()
      }
      
      ctx.restore()
    }

    canReproduce() {
      return this.energy > this.maxEnergy * 0.8 && this.age > 100 && !this.reproduced
    }

    reproduce() {
      if (this.canReproduce()) {
        this.energy -= 30
        this.reproduced = true
        gameState.current.stats.births++
        return new Organism(
          this.x + (Math.random() - 0.5) * 40,
          this.y + (Math.random() - 0.5) * 40,
          this.type
        )
      }
      return null
    }
  }

  class Particle {
    constructor(x, y, type) {
      this.x = x
      this.y = y
      this.type = type
      this.life = 60
      this.maxLife = 60
      this.vx = (Math.random() - 0.5) * 2
      this.vy = Math.random() * -2 - 0.5
      this.size = Math.random() * 3 + 2
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.life--
      return this.life > 0
    }

    display(ctx) {
      const alpha = this.life / this.maxLife
      ctx.fillStyle = `hsla(60, 100%, 70%, ${alpha})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }

  const initializeOrganisms = () => {
    const state = gameState.current
    state.organisms = { producers: [], consumers: [], predators: [], decomposers: [] }
    
    for (let i = 0; i < producerCount; i++) {
      state.organisms.producers.push(new Organism(
        Math.random() * 700 + 50,
        Math.random() * 500 + 50,
        'producer'
      ))
    }
    for (let i = 0; i < consumerCount; i++) {
      state.organisms.consumers.push(new Organism(
        Math.random() * 700 + 50,
        Math.random() * 500 + 50,
        'consumer'
      ))
    }
    for (let i = 0; i < predatorCount; i++) {
      state.organisms.predators.push(new Organism(
        Math.random() * 700 + 50,
        Math.random() * 500 + 50,
        'predator'
      ))
    }
    for (let i = 0; i < 3; i++) {
      state.organisms.decomposers.push(new Organism(
        Math.random() * 700 + 50,
        Math.random() * 500 + 50,
        'decomposer'
      ))
    }
  }

  const animate = () => {
    if (!isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const state = gameState.current
    
    state.time += speed

    // Dynamic background
    const bgHue = (state.time * 0.1) % 360
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    gradient.addColorStop(0, `hsl(${bgHue}, 20%, 8%)`)
    gradient.addColorStop(1, `hsl(${(bgHue + 60) % 360}, 20%, 12%)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)
    
    // Ambient particles
    if (Math.random() < 0.1) {
      state.particles.push(new Particle(Math.random() * 800, Math.random() * 600, 'ambient'))
    }

    // Update and display particles
    state.particles = state.particles.filter(particle => {
      particle.update()
      particle.display(ctx)
      return particle.life > 0
    })

    // Update organisms
    Object.keys(state.organisms).forEach(type => {
      state.organisms[type] = state.organisms[type].filter(org => {
        const alive = org.update(state.time)
        if (!alive) {
          state.stats.deaths++
          // Death particle effect
          for (let i = 0; i < 5; i++) {
            state.particles.push(new Particle(org.x, org.y, 'death'))
          }
        }
        return alive
      })
    })

    // Handle interactions
    handleInteractions()
    
    // Display organisms
    Object.values(state.organisms).flat().forEach(org => org.display(ctx, state.time))
    
    // Update stats
    state.stats.producers = state.organisms.producers.length
    state.stats.consumers = state.organisms.consumers.length
    state.stats.predators = state.organisms.predators.length
    
    // Display UI
    displayStats(ctx)
    
    animationRef.current = requestAnimationFrame(animate)
  }

  const handleInteractions = () => {
    const state = gameState.current

    // Reproduction
    Object.keys(state.organisms).forEach(type => {
      state.organisms[type].forEach(org => {
        if (Math.random() < 0.005) {
          const offspring = org.reproduce()
          if (offspring) {
            state.organisms[type].push(offspring)
          }
        }
      })
    })

    // Feeding interactions
    state.organisms.consumers.forEach(consumer => {
      state.organisms.producers.forEach((producer, i) => {
        if (distance(consumer.x, consumer.y, producer.x, producer.y) < 25) {
          if (Math.random() < 0.02) {
            consumer.energy += 40
            state.organisms.producers.splice(i, 1)
            // Eating particle effect
            for (let j = 0; j < 3; j++) {
              state.particles.push(new Particle(producer.x, producer.y, 'eat'))
            }
          }
        }
      })
    })

    state.organisms.predators.forEach(predator => {
      state.organisms.consumers.forEach((consumer, i) => {
        if (distance(predator.x, predator.y, consumer.x, consumer.y) < 30) {
          if (Math.random() < 0.015) {
            predator.energy += 60
            state.organisms.consumers.splice(i, 1)
            // Predation particle effect
            for (let j = 0; j < 5; j++) {
              state.particles.push(new Particle(consumer.x, consumer.y, 'predation'))
            }
          }
        }
      })
    })
  }

  const displayStats = (ctx) => {
    if (!showStats) return
    
    const state = gameState.current
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(10, 10, 200, 120)
    
    ctx.fillStyle = 'white'
    ctx.font = '14px Arial'
    ctx.fillText(`Producers: ${state.stats.producers}`, 20, 30)
    ctx.fillText(`Consumers: ${state.stats.consumers}`, 20, 50)
    ctx.fillText(`Predators: ${state.stats.predators}`, 20, 70)
    ctx.fillText(`Births: ${state.stats.births}`, 20, 90)
    ctx.fillText(`Deaths: ${state.stats.deaths}`, 20, 110)
  }

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    gameState.current.organisms.producers.push(new Organism(x, y, 'producer'))
  }

  const resetSimulation = () => {
    gameState.current.stats = { producers: 0, consumers: 0, predators: 0, births: 0, deaths: 0 }
    gameState.current.particles = []
    gameState.current.time = 0
    initializeOrganisms()
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 800
    canvas.height = 600
    
    initializeOrganisms()
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    initializeOrganisms()
  }, [producerCount, consumerCount, predatorCount])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <CardHeader className="text-center bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-t-lg">
          <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
            🌿 Enhanced Ecosystem Simulation
          </CardTitle>
          <p className="text-cyan-100 mt-2">Click to add producers • Watch the circle of life unfold</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="rounded-xl overflow-hidden shadow-2xl ring-4 ring-purple-500/30 cursor-crosshair bg-black"
                style={{ width: '100%', maxWidth: '800px', height: 'auto', aspectRatio: '4/3' }}
              />
            </div>
            
            <div className="lg:w-80 space-y-6">
              {/* Controls */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-cyan-300">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={togglePlayPause}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      onClick={resetSimulation}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setShowStats(!showStats)}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Parameters */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-cyan-300">Population Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      🌱 Producers: {producerCount}
                    </label>
                    <Slider
                      min={5}
                      max={30}
                      step={1}
                      value={[producerCount]}
                      onValueChange={([val]) => setProducerCount(val)}
                      className="mb-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      🐰 Consumers: {consumerCount}
                    </label>
                    <Slider
                      min={2}
                      max={15}
                      step={1}
                      value={[consumerCount]}
                      onValueChange={([val]) => setConsumerCount(val)}
                      className="mb-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      🦁 Predators: {predatorCount}
                    </label>
                    <Slider
                      min={1}
                      max={8}
                      step={1}
                      value={[predatorCount]}
                      onValueChange={([val]) => setPredatorCount(val)}
                      className="mb-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      ⚡ Speed: {speed}x
                    </label>
                    <Slider
                      min={0.1}
                      max={3}
                      step={0.1}
                      value={[speed]}
                      onValueChange={([val]) => setSpeed(val)}
                      className="mb-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-cyan-300">Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-slate-300">Producers (Plants)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-300">Primary Consumers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-slate-300">Predators</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-slate-300">Energy Particles</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}