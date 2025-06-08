"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Zap, Droplets, Settings, BookOpen, Trophy, Target } from "lucide-react"

export default function EnhancedBiomoleculesSimulation() {
  const sketchRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedMolecule, setSelectedMolecule] = useState(null)
  const [gameMode, setGameMode] = useState('explore') // explore, challenge, builder
  const [score, setScore] = useState(0)
  const [temperature, setTemperature] = useState(300) // Kelvin
  const [pH, setPH] = useState(7)
  const [showTrails, setShowTrails] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [challenge, setChallenge] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [showMoleculeDetails, setShowMoleculeDetails] = useState(false)
  const [selectedTool, setSelectedTool] = useState('select') // select, bond, break, energize
  
  let molecules = []
  let bonds = []
  let particles = []
  let trails = []
  let selected = null
  let tooltip = ""
  let animationSpeed = 1
  let time = 0
  let isAnimating = true
  let showBonds = true
  let bondingMode = false
  let firstBondMolecule = null

  const moleculeTypes = {
    carbohydrate: { 
      color: [255, 215, 0], 
      shape: "hexagon", 
      size: 35,
      info: "Energy source - glucose, starch, cellulose",
      mass: 180,
      reactivity: 0.6,
      bondPreference: ['protein']
    },
    protein: { 
      color: [65, 105, 225], 
      shape: "helix", 
      size: 40,
      info: "Building blocks - enzymes, antibodies, muscles",
      mass: 250,
      reactivity: 0.8,
      bondPreference: ['nucleicAcid', 'lipid']
    },
    lipid: { 
      color: [255, 99, 71], 
      shape: "droplet", 
      size: 30,
      info: "Fats & oils - cell membranes, energy storage",
      mass: 150,
      reactivity: 0.4,
      bondPreference: ['protein']
    },
    nucleicAcid: { 
      color: [50, 205, 50], 
      shape: "dna", 
      size: 45,
      info: "Genetic material - DNA, RNA",
      mass: 300,
      reactivity: 0.9,
      bondPreference: ['protein']
    },
    enzyme: {
      color: [138, 43, 226],
      shape: "star",
      size: 38,
      info: "Biological catalysts - speed up reactions",
      mass: 280,
      reactivity: 1.0,
      bondPreference: ['carbohydrate', 'protein']
    },
    water: {
      color: [0, 191, 255],
      shape: "triangle",
      size: 20,
      info: "Universal solvent - H₂O",
      mass: 18,
      reactivity: 0.3,
      bondPreference: []
    }
  }

  const challenges = [
    {
      id: 1,
      name: "Bond Master",
      description: "Create 5 stable bonds between different molecule types",
      target: 5,
      type: "bonds",
      reward: 100
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Increase temperature to make molecules move faster",
      target: 400,
      type: "temperature",
      reward: 50
    },
    {
      id: 3,
      name: "Catalyst",
      description: "Add 3 enzyme molecules to speed up reactions",
      target: 3,
      type: "enzymes",
      reward: 75
    }
  ]

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(900, 650)
      initializeMolecules()
    }

    const initializeMolecules = () => {
      molecules = []
      bonds = []
      particles = []
      trails = []
      
      const types = Object.keys(moleculeTypes)
      for (let i = 0; i < 15; i++) {
        const type = types[Math.floor(Math.random() * types.length)]
        molecules.push({
          x: Math.random() * (p.width - 100) + 50,
          y: Math.random() * (p.height - 100) + 50,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          type: type,
          size: moleculeTypes[type].size,
          rotation: Math.random() * p.TWO_PI,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          energy: Math.random() * 100,
          bonds: [],
          oscillation: Math.random() * p.TWO_PI,
          glowing: false,
          trail: [],
          reactionTime: 0,
          charge: (Math.random() - 0.5) * 2
        })
      }
      
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dist = p.dist(molecules[i].x, molecules[i].y, molecules[j].x, molecules[j].y)
          if (dist < 120 && Math.random() < 0.2) {
            bonds.push({
              mol1: i,
              mol2: j,
              strength: Math.random() * 0.8 + 0.2,
              oscillation: Math.random() * p.TWO_PI,
              type: 'covalent'
            })
          }
        }
      }
    }

    p.draw = () => {
      // Dynamic background based on temperature and pH
      drawEnvironmentalBackground()
      
      time++
      animationSpeed = simulationSpeed * (temperature / 300)

      if (isAnimating) {
        updatePhysics()
        updateBonds()
        createParticles()
        updateTrails()
        checkChallenges()
      }

      drawBonds()
      drawMolecules()
      drawParticles()
      if (showTrails) drawTrails()
      drawTooltip()
      drawInfo()
      drawToolIndicator()
    }

    const drawEnvironmentalBackground = () => {
      // Temperature affects background color intensity
      const tempFactor = p.map(temperature, 200, 500, 0.3, 1.0)
      // pH affects background hue
      const phHue = p.map(pH, 0, 14, 0, 60)
      
      for (let i = 0; i <= p.height; i++) {
        const inter = p.map(i, 0, p.height, 0, 1)
        const c = p.lerpColor(
          p.color(240 + phHue, 248 * tempFactor, 255 * tempFactor, 200), 
          p.color(220 + phHue, 230 * tempFactor, 250 * tempFactor, 180), 
          inter + Math.sin(time * 0.01) * 0.1
        )
        p.stroke(c)
        p.line(0, i, p.width, i)
      }
    }

    const updatePhysics = () => {
      molecules.forEach((mol, i) => {
        // Temperature affects molecular motion
        const tempEffect = temperature / 300
        
        // Brownian motion influenced by temperature
        mol.vx += (Math.random() - 0.5) * 0.1 * tempEffect
        mol.vy += (Math.random() - 0.5) * 0.1 * tempEffect
        
        // pH affects charge interactions
        const chargeEffect = (pH - 7) * 0.1
        mol.charge += chargeEffect * 0.01
        
        // Damping based on molecular mass
        const massEffect = moleculeTypes[mol.type].mass / 200
        mol.vx *= (0.98 - massEffect * 0.01)
        mol.vy *= (0.98 - massEffect * 0.01)
        
        mol.x += mol.vx * animationSpeed
        mol.y += mol.vy * animationSpeed
        
        // Enhanced boundary collision
        if (mol.x < mol.size/2 || mol.x > p.width - mol.size/2) {
          mol.vx *= -0.8
          mol.x = p.constrain(mol.x, mol.size/2, p.width - mol.size/2)
          createCollisionParticles(mol.x, mol.y)
        }
        if (mol.y < mol.size/2 || mol.y > p.height - mol.size/2) {
          mol.vy *= -0.8
          mol.y = p.constrain(mol.y, mol.size/2, p.height - mol.size/2)
          createCollisionParticles(mol.x, mol.y)
        }
        
        mol.rotation += mol.rotationSpeed * tempEffect
        mol.oscillation += 0.02
        mol.energy = Math.max(0, mol.energy - 0.1)
        mol.reactionTime = Math.max(0, mol.reactionTime - 1)
        
        // Enhanced molecular interactions
        molecules.forEach((other, j) => {
          if (i !== j) {
            const dist = p.dist(mol.x, mol.y, other.x, other.y)
            if (dist < 100) {
              // Electrostatic interactions
              const chargeForce = (mol.charge * other.charge) / (dist * dist) * 50
              const angle = Math.atan2(other.y - mol.y, other.x - mol.x)
              
              mol.vx += Math.cos(angle) * chargeForce * 0.001
              mol.vy += Math.sin(angle) * chargeForce * 0.001
              
              // Van der Waals forces
              if (dist < 60) {
                const vdwForce = 1 / (dist * dist) * 100
                mol.vx -= Math.cos(angle) * vdwForce * 0.001
                mol.vy -= Math.sin(angle) * vdwForce * 0.001
                
                // Chance for spontaneous bonding
                if (dist < 40 && Math.random() < 0.001 * moleculeTypes[mol.type].reactivity * tempEffect) {
                  createBond(i, j)
                }
              }
            }
          }
        })
      })
    }

    const createBond = (i, j) => {
      const existing = bonds.find(b => 
        (b.mol1 === i && b.mol2 === j) || (b.mol1 === j && b.mol2 === i)
      )
      if (!existing) {
        bonds.push({
          mol1: i,
          mol2: j,
          strength: Math.random() * 0.8 + 0.2,
          oscillation: Math.random() * p.TWO_PI,
          type: Math.random() < 0.7 ? 'covalent' : 'ionic'
        })
        setScore(prev => prev + 10)
      }
    }

    const updateBonds = () => {
      bonds.forEach(bond => {
        bond.oscillation += 0.05
        const mol1 = molecules[bond.mol1]
        const mol2 = molecules[bond.mol2]
        const dist = p.dist(mol1.x, mol1.y, mol2.x, mol2.y)
        
        // Bond strength affected by temperature
        const tempStress = (temperature - 300) / 300
        
        if (dist > 150 || tempStress > 1) {
          bond.strength -= 0.02 * (1 + tempStress)
        } else {
          bond.strength = Math.min(1, bond.strength + 0.005)
        }
        
        // Bond vibration based on temperature
        const vibration = tempStress * 0.1
        bond.oscillation += vibration
      })
      
      bonds = bonds.filter(bond => bond.strength > 0.1)
    }

    const createParticles = () => {
      // Enhanced particle system
      if (Math.random() < 0.05 + temperature / 10000) {
        particles.push({
          x: Math.random() * p.width,
          y: Math.random() * p.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 60 + temperature / 10,
          maxLife: 60 + temperature / 10,
          type: Math.random() < 0.7 ? "energy" : "catalyst",
          size: Math.random() * 6 + 2
        })
      }
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        particle.vx *= 0.99
        particle.vy *= 0.99
        
        // Particle interactions with molecules
        molecules.forEach(mol => {
          const dist = p.dist(particle.x, particle.y, mol.x, mol.y)
          if (dist < 20 && particle.type === "catalyst") {
            mol.energy += 5
            mol.reactionTime = 60
          }
        })
      })
      
      particles = particles.filter(p => p.life > 0)
    }

    const createCollisionParticles = (x, y) => {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 30,
          maxLife: 30,
          type: "collision",
          size: Math.random() * 4 + 1
        })
      }
    }

    const updateTrails = () => {
      molecules.forEach(mol => {
        if (mol.trail.length > 20) mol.trail.shift()
        mol.trail.push({x: mol.x, y: mol.y})
      })
    }

    const drawTrails = () => {
      molecules.forEach(mol => {
        if (mol.trail.length > 1) {
          p.stroke(moleculeTypes[mol.type].color[0], 
                   moleculeTypes[mol.type].color[1], 
                   moleculeTypes[mol.type].color[2], 100)
          p.strokeWeight(2)
          p.noFill()
          p.beginShape()
          mol.trail.forEach(point => {
            p.vertex(point.x, point.y)
          })
          p.endShape()
        }
      })
    }

    const drawBonds = () => {
      if (!showBonds) return
      
      bonds.forEach(bond => {
        const mol1 = molecules[bond.mol1]
        const mol2 = molecules[bond.mol2]
        
        const bondColor = bond.type === 'ionic' ? [255, 100, 100] : [100, 150, 255]
        p.strokeWeight(bond.type === 'ionic' ? 4 : 2 + Math.sin(bond.oscillation) * 0.5)
        p.stroke(bondColor[0], bondColor[1], bondColor[2], bond.strength * 150)
        
        const steps = 10
        p.noFill()
        p.beginShape()
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = p.lerp(mol1.x, mol2.x, t)
          const y = p.lerp(mol1.y, mol2.y, t) + Math.sin(t * p.PI * 2 + bond.oscillation) * 5
          p.vertex(x, y)
        }
        p.endShape()
      })
    }

    const drawMolecules = () => {
      molecules.forEach((mol, i) => {
        p.push()
        p.translate(mol.x, mol.y)
        p.rotate(mol.rotation)
        
        const config = moleculeTypes[mol.type]
        const baseSize = mol.size + Math.sin(mol.oscillation) * 3
        
        // Enhanced glow effects
        if (mol.glowing || mol.energy > 50 || mol.reactionTime > 0) {
          p.drawingContext.shadowColor = `rgba(${config.color[0]}, ${config.color[1]}, ${config.color[2]}, 0.8)`
          p.drawingContext.shadowBlur = 20 + mol.energy / 5
        }
        
        // Charge visualization
        const alpha = 200 + mol.charge * 25
        p.fill(config.color[0], config.color[1], config.color[2], alpha)
        p.stroke(255, 100)
        p.strokeWeight(2)
        
        // Draw enhanced molecular shapes
        switch (config.shape) {
          case "hexagon":
            drawHexagon(baseSize * 0.8)
            break
          case "helix":
            drawHelix(baseSize)
            break
          case "droplet":
            drawDroplet(baseSize)
            break
          case "dna":
            drawDNA(baseSize)
            break
          case "star":
            drawStar(baseSize)
            break
          case "triangle":
            drawTriangle(baseSize)
            break
        }
        
        // Charge indicator
        if (Math.abs(mol.charge) > 0.5) {
          p.fill(mol.charge > 0 ? 255 : 0, 0, mol.charge > 0 ? 0 : 255)
          p.textAlign(p.CENTER)
          p.textSize(12)
          p.text(mol.charge > 0 ? '+' : '-', 0, -baseSize/2 - 10)
        }
        
        p.drawingContext.shadowBlur = 0
        p.pop()
        
        // Selection indicators
        if (selected === mol) {
          p.noFill()
          p.stroke(255, 100, 100)
          p.strokeWeight(3)
          p.ellipse(mol.x, mol.y, baseSize + 10)
        }
        
        if (firstBondMolecule === mol) {
          p.noFill()
          p.stroke(100, 255, 100)
          p.strokeWeight(3)
          p.ellipse(mol.x, mol.y, baseSize + 15)
        }
      })
    }

    const drawStar = (size) => {
      p.beginShape()
      for (let i = 0; i < 10; i++) {
        const angle = i * p.PI / 5
        const radius = i % 2 === 0 ? size/2 : size/4
        p.vertex(Math.cos(angle) * radius, Math.sin(angle) * radius)
      }
      p.endShape(p.CLOSE)
    }

    const drawTriangle = (size) => {
      p.beginShape()
      for (let i = 0; i < 3; i++) {
        const angle = i * p.TWO_PI / 3 - p.PI/2
        p.vertex(Math.cos(angle) * size/2, Math.sin(angle) * size/2)
      }
      p.endShape(p.CLOSE)
    }

    const drawHexagon = (size) => {
      p.beginShape()
      for (let i = 0; i < 6; i++) {
        const angle = i * p.PI / 3
        p.vertex(Math.cos(angle) * size/2, Math.sin(angle) * size/2)
      }
      p.endShape(p.CLOSE)
    }

    const drawHelix = (size) => {
      p.noFill()
      p.strokeWeight(4)
      for (let i = 0; i < 3; i++) {
        p.beginShape()
        for (let t = 0; t < p.TWO_PI; t += 0.2) {
          const r = size/3
          const x = Math.cos(t) * r
          const y = Math.sin(t * 2 + i * p.TWO_PI/3) * r
          p.vertex(x, y)
        }
        p.endShape()
      }
      p.fill(moleculeTypes.protein.color[0], moleculeTypes.protein.color[1], moleculeTypes.protein.color[2], 200)
      p.noStroke()
      p.ellipse(0, 0, size/2)
    }

    const drawDroplet = (size) => {
      p.beginShape()
      p.vertex(0, -size/2)
      p.bezierVertex(size/2, -size/4, size/2, size/4, 0, size/2)
      p.bezierVertex(-size/2, size/4, -size/2, -size/4, 0, -size/2)
      p.endShape(p.CLOSE)
    }

    const drawDNA = (size) => {
      for (let strand = 0; strand < 2; strand++) {
        p.beginShape()
        p.noFill()
        p.strokeWeight(3)
        for (let t = 0; t < p.TWO_PI * 2; t += 0.1) {
          const r = size/4
          const x = Math.cos(t + strand * p.PI) * r
          const y = (t / p.TWO_PI - 1) * size/3 + Math.sin(t * 3) * 2
          p.vertex(x, y)
        }
        p.endShape()
      }
      p.fill(moleculeTypes.nucleicAcid.color[0], moleculeTypes.nucleicAcid.color[1], moleculeTypes.nucleicAcid.color[2], 200)
      p.noStroke()
      p.ellipse(0, 0, size/3)
    }

    const drawParticles = () => {
      particles.forEach(particle => {
        const alpha = p.map(particle.life, 0, particle.maxLife, 0, 255)
        
        switch (particle.type) {
          case "energy":
            p.fill(255, 255, 100, alpha)
            break
          case "catalyst":
            p.fill(255, 100, 255, alpha)
            break
          case "collision":
            p.fill(255, 150, 100, alpha)
            break
        }
        
        p.noStroke()
        p.ellipse(particle.x, particle.y, particle.size)
      })
    }

    const drawTooltip = () => {
      if (tooltip && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        const mol = findClosestMolecule(p.mouseX, p.mouseY)
        if (mol) {
          const config = moleculeTypes[mol.type]
          p.fill(0, 0, 0, 200)
          p.rect(p.mouseX + 10, p.mouseY - 60, 220, 55, 5)
          p.fill(255)
          p.textSize(12)
          p.text(config.info, p.mouseX + 15, p.mouseY - 40)
          p.text(`Energy: ${Math.round(mol.energy)}`, p.mouseX + 15, p.mouseY - 25)
          p.text(`Charge: ${mol.charge.toFixed(1)}`, p.mouseX + 15, p.mouseY - 10)
        }
      }
    }

    const drawInfo = () => {
      // Enhanced info panel
      p.fill(0, 0, 0, 150)
      p.rect(10, 10, 250, 140, 5)
      p.fill(255)
      p.textSize(12)
      p.text(`Molecules: ${molecules.length}`, 20, 30)
      p.text(`Bonds: ${bonds.length}`, 20, 50)
      p.text(`Temperature: ${temperature}K`, 20, 70)
      p.text(`pH: ${pH}`, 20, 90)
      p.text(`Score: ${score}`, 20, 110)
      p.text(`Mode: ${gameMode}`, 20, 130)
    }

    const drawToolIndicator = () => {
      p.fill(0, 0, 0, 150)
      p.rect(p.width - 120, 10, 110, 30, 5)
      p.fill(255)
      p.textSize(12)
      p.text(`Tool: ${selectedTool}`, p.width - 110, 30)
    }

    const checkChallenges = () => {
      if (challenge) {
        switch (challenge.type) {
          case 'bonds':
            if (bonds.length >= challenge.target) {
              completeChallenge()
            }
            break
          case 'temperature':
            if (temperature >= challenge.target) {
              completeChallenge()
            }
            break
          case 'enzymes':
            const enzymeCount = molecules.filter(m => m.type === 'enzyme').length
            if (enzymeCount >= challenge.target) {
              completeChallenge()
            }
            break
        }
      }
    }

    const completeChallenge = () => {
      setScore(prev => prev + challenge.reward)
      setAchievements(prev => [...prev, challenge.name])
      setChallenge(null)
    }

    const findClosestMolecule = (mx, my) => {
      let minDist = Infinity
      let closest = null
      molecules.forEach(mol => {
        const dist = p.dist(mx, my, mol.x, mol.y)
        if (dist < minDist && dist < mol.size/2 + 10) {
          minDist = dist
          closest = mol
        }
      })
      return closest
    }

    p.mouseMoved = () => {
      const mol = findClosestMolecule(p.mouseX, p.mouseY)
      tooltip = mol ? mol.type : ""
      
      molecules.forEach(m => m.glowing = false)
      if (mol) mol.glowing = true
    }

    p.mousePressed = () => {
      const mol = findClosestMolecule(p.mouseX, p.mouseY)
      if (mol) {
        switch (selectedTool) {
          case 'select':
            selected = mol
            setSelectedMolecule(mol.type)
            mol.energy = 100
            break
          case 'bond':
            if (!firstBondMolecule) {
              firstBondMolecule = mol
            } else if (firstBondMolecule !== mol) {
              createBond(molecules.indexOf(firstBondMolecule), molecules.indexOf(mol))
              firstBondMolecule = null
            }
            break
          case 'break':
            breakBondsForMolecule(mol)
            break
          case 'energize':
            mol.energy = 100
            mol.reactionTime = 120
            setScore(prev => prev + 5)
            break
        }
      }
    }

    const breakBondsForMolecule = (mol) => {
      const molIndex = molecules.indexOf(mol)
      bonds = bonds.filter(bond => 
        bond.mol1 !== molIndex && bond.mol2 !== molIndex
      )
      setScore(prev => prev + 2)
    }

    p.mouseDragged = () => {
      if (selected && selectedTool === 'select') {
        selected.x = p.mouseX
        selected.y = p.mouseY
        selected.vx = (p.mouseX - p.pmouseX) * 0.5
        selected.vy = (p.mouseY - p.pmouseY) * 0.5
      }
    }

    p.mouseReleased = () => {
      selected = null
    }

    p.keyPressed = () => {
      if (p.key === ' ') {
        isAnimating = !isAnimating
        setIsPlaying(isAnimating)
      }
    }
  }

  useEffect(() => {
    let p5Instance
    
    const loadP5 = async () => {
      const p5 = (await import('p5')).default
      p5Instance = new p5(sketch, sketchRef.current)
    }
    
    loadP5()
    
    return () => {
      if (p5Instance) {
        p5Instance.remove()
      }
    }
  }, [temperature, pH, simulationSpeed, selectedTool, showTrails])

  const toggleAnimation = () => {
    isAnimating = !isAnimating
    setIsPlaying(isAnimating)
  }

  const resetSimulation = () => {
    molecules = []
    bonds = []
    particles = []
    setSelectedMolecule(null)
    setScore(0)
    setChallenge(null)
  }

  const addSpecificMolecule = (type) => {
    const config = moleculeTypes[type]
    molecules.push({
      x: Math.random() * 800 + 50,
      y: Math.random() * 550 + 50,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      type: type,
      size: config.size,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      energy: Math.random() * 100,
      bonds: [],
      oscillation: Math.random() * Math.PI * 2,
      glowing: false,
      trail: [],
      reactionTime: 0,
      charge: (Math.random() - 0.5) * 2
    })
    setScore(prev => prev + 1)
  }

  const startChallenge = (challengeId) => {
    const selectedChallenge = challenges.find(c => c.id === challengeId)
    setChallenge(selectedChallenge)
    setGameMode('challenge')
  }

  const createMassiveReaction = () => {
    // Create a spectacular chain reaction
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * 900,
        y: Math.random() * 650,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 200,
        maxLife: 200,
        type: "catalyst",
        size: Math.random() * 8 + 3
      })
    }
    
    molecules.forEach(mol => {
      mol.energy = 100
      mol.reactionTime = 300
      mol.vx += (Math.random() - 0.5) * 4
      mol.vy += (Math.random() - 0.5) * 4
      mol.charge += (Math.random() - 0.5) * 1
    })
    
    setScore(prev => prev + 50)
  }

  const switchGameMode = (mode) => {
    setGameMode(mode)
    if (mode === 'explore') {
      setChallenge(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
          <CardTitle className="text-4xl font-bold mb-2">Advanced Interactive Biomolecules Laboratory</CardTitle>
          <p className="text-blue-100">Explore, experiment, and master molecular interactions</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              onClick={() => switchGameMode('explore')} 
              className={`${gameMode === 'explore' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
            >
              <BookOpen size={16} className="mr-2" />
              Explore
            </Button>
            <Button 
              onClick={() => switchGameMode('challenge')} 
              className={`${gameMode === 'challenge' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
            >
              <Trophy size={16} className="mr-2" />
              Challenge
            </Button>
            <Button 
              onClick={() => switchGameMode('builder')} 
              className={`${gameMode === 'builder' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
            >
              <Target size={16} className="mr-2" />
              Builder
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1">
              <div ref={sketchRef} className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100"></div>
              
              {/* Enhanced Control Panel */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                <Button 
                  onClick={toggleAnimation} 
                  className={`flex items-center gap-2 ${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                
                <Button onClick={resetSimulation} className="flex items-center gap-2 bg-red-500 hover:bg-red-600">
                  <RotateCcw size={16} />
                  Reset
                </Button>
                
                <Button onClick={createMassiveReaction} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600">
                  <Zap size={16} />
                  Chain Reaction
                </Button>
                
                <Button 
                  onClick={() => setShowTrails(!showTrails)} 
                  className={`flex items-center gap-2 ${showTrails ? 'bg-purple-600' : 'bg-purple-400'}`}
                >
                  Trails {showTrails ? 'ON' : 'OFF'}
                </Button>
              </div>

              {/* Environmental Controls */}
              <Card className="mt-4 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings size={18} />
                    Environmental Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Temperature: {temperature}K</label>
                      <input
                        type="range"
                        min="200"
                        max="500"
                        value={temperature}
                        onChange={(e) => setTemperature(parseInt(e.target.value))}
                        className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-xs text-gray-600 mt-1">
                        {temperature < 273 ? 'Frozen' : temperature < 373 ? 'Liquid' : 'Gas'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">pH: {pH}</label>
                      <input
                        type="range"
                        min="0"
                        max="14"
                        step="0.5"
                        value={pH}
                        onChange={(e) => setPH(parseFloat(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-xs text-gray-600 mt-1">
                        {pH < 7 ? 'Acidic' : pH === 7 ? 'Neutral' : 'Basic'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Speed: {simulationSpeed}x</label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={simulationSpeed}
                        onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tool Selection */}
              <Card className="mt-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-lg">Interactive Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['select', 'bond', 'break', 'energize'].map(tool => (
                      <Button
                        key={tool}
                        onClick={() => setSelectedTool(tool)}
                        className={`capitalize ${selectedTool === tool ? 'bg-purple-600' : 'bg-purple-400'}`}
                      >
                        {tool}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {selectedTool === 'select' && 'Click and drag molecules'}
                    {selectedTool === 'bond' && 'Click two molecules to bond them'}
                    {selectedTool === 'break' && 'Click molecules to break their bonds'}
                    {selectedTool === 'energize' && 'Click molecules to energize them'}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="xl:w-80">
              {/* Score and Status */}
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Laboratory Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Score:</span>
                      <span className="font-bold text-yellow-600">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Achievements:</span>
                      <span className="font-bold text-green-600">{achievements.length}</span>
                    </div>
                    {challenge && (
                      <div className="mt-3 p-2 bg-blue-100 rounded">
                        <h4 className="font-semibold text-sm">{challenge.name}</h4>
                        <p className="text-xs">{challenge.description}</p>
                        <p className="text-xs text-blue-600">Reward: {challenge.reward} points</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Molecule Builder */}
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Molecule Builder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(moleculeTypes).map(([type, config]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{backgroundColor: `rgb(${config.color.join(',')})`}}
                        ></div>
                        <span className="text-sm capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addSpecificMolecule(type)}
                        className="bg-blue-500 hover:bg-blue-600 text-xs px-2 py-1"
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Challenges */}
              {gameMode === 'challenge' && (
                <Card className="bg-gradient-to-br from-green-50 to-teal-50 mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Active Challenges</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {challenges.map(ch => (
                      <div key={ch.id} className="p-3 border rounded-lg bg-white">
                        <h4 className="font-semibold text-sm">{ch.name}</h4>
                        <p className="text-xs text-gray-600">{ch.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-green-600">{ch.reward} pts</span>
                          <Button
                            size="sm"
                            onClick={() => startChallenge(ch.id)}
                            disabled={challenge?.id === ch.id}
                            className="text-xs px-2 py-1"
                          >
                            {challenge?.id === ch.id ? 'Active' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Molecule Information */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-lg">Molecule Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(moleculeTypes).map(([type, config]) => (
                    <div 
                      key={type} 
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedMolecule === type 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{backgroundColor: `rgb(${config.color.join(',')})`}}
                        ></div>
                        <div>
                          <h4 className="font-semibold capitalize text-sm">{type.replace(/([A-Z])/g, ' $1')}</h4>
                          <p className="text-xs text-gray-600">{config.info}</p>
                          <p className="text-xs text-blue-600">Mass: {config.mass} Da</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Controls</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Mouse:</strong> Drag molecules, create bonds</p>
                  <p><strong>Tools:</strong> Select different interaction modes</p>
                  <p><strong>Environment:</strong> Adjust temperature and pH</p>
                  <p><strong>Spacebar:</strong> Pause/Resume animation</p>
                  <p><strong>Challenges:</strong> Complete tasks for points</p>
                  <p><strong>Trails:</strong> Visualize molecular motion paths</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}