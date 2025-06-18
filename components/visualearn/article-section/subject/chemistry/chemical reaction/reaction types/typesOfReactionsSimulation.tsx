import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Flame, Droplet, Atom } from 'lucide-react';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: string;
  color: string;
  size: number;
  energy: number;
  bonds: string[];
  reacted: boolean;
  reactedAt?: number;
}

interface Reaction {
  id: string;
  name: string;
  type: string;
  equation: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const ChemicalReactionsSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedReaction, setSelectedReaction] = useState(0);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [temperature, setTemperature] = useState(300);
  const [pressure, setPressure] = useState(1);
  const [frameCount, setFrameCount] = useState(0);

  const reactions: Reaction[] = [
    {
      id: 'synthesis',
      name: 'Synthesis',
      type: 'A + B → AB',
      equation: '2H₂ + O₂ → 2H₂O',
      description: 'Two or more simple substances combine to form a more complex compound',
      icon: <Atom className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'decomposition',
      name: 'Decomposition',
      type: 'AB → A + B',
      equation: '2H₂O → 2H₂ + O₂',
      description: 'A complex compound breaks down into simpler substances',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'combustion',
      name: 'Combustion',
      type: 'Fuel + O₂ → CO₂ + H₂O',
      equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      description: 'A substance reacts with oxygen, releasing energy as heat and light',
      icon: <Flame className="w-5 h-5" />,
      color: 'from-red-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-red-500/20 to-orange-500/20'
    },
    {
      id: 'displacement',
      name: 'Single Displacement',
      type: 'A + BC → AC + B',
      equation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
      description: 'One element replaces another in a compound',
      icon: <Droplet className="w-5 h-5" />,
      color: 'from-green-500 to-teal-500',
      gradient: 'bg-gradient-to-r from-green-500/20 to-teal-500/20'
    }
  ];

  const createParticles = (reactionType: string) => {
    const newParticles: Particle[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return [];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    switch (reactionType) {
      case 'synthesis':
        // Create 2 H₂ molecules
        for (let i = 0; i < 2; i++) {
          newParticles.push({
            id: `H2-${i}`,
            x: centerX - 200 + i * 50 + Math.random() * 50,
            y: centerY + Math.random() * 100 - 50,
            vx: (Math.random() - 0.5) * 2 + 1,
            vy: (Math.random() - 0.5) * 2,
            type: 'H₂',
            color: '#3b82f6',
            size: 12,
            energy: temperature / 100,
            bonds: ['H', 'H'],
            reacted: false
          });
        }
        // Create 1 O₂ molecule
        newParticles.push({
          id: 'O2-0',
          x: centerX + 100 + Math.random() * 50,
          y: centerY + Math.random() * 100 - 50,
          vx: (Math.random() - 0.5) * 2 - 1,
          vy: (Math.random() - 0.5) * 2,
          type: 'O₂',
          color: '#ef4444',
          size: 16,
          energy: temperature / 100,
          bonds: ['O', 'O'],
          reacted: false
        });
        break;

      case 'decomposition':
        // Create 2 H₂O molecules
        for (let i = 0; i < 2; i++) {
          newParticles.push({
            id: `H2O-${i}`,
            x: centerX + (i - 0.5) * 100 + Math.random() * 50,
            y: centerY + Math.random() * 100 - 50,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            type: 'H₂O',
            color: '#06b6d4',
            size: 14,
            energy: temperature / 100,
            bonds: ['H', 'H', 'O'],
            reacted: false
          });
        }
        break;

      case 'combustion':
        // Create 1 CH₄ molecule
        newParticles.push({
          id: 'CH4-0',
          x: centerX - 150,
          y: centerY,
          vx: 1.5,
          vy: 0,
          type: 'CH₄',
          color: '#8b5cf6',
          size: 18,
          energy: temperature / 100,
          bonds: ['C', 'H', 'H', 'H', 'H'],
          reacted: false
        });
        // Create 2 O₂ molecules
        for (let i = 0; i < 2; i++) {
          newParticles.push({
            id: `O2-${i}`,
            x: centerX + 100 + i * 60 + Math.random() * 30,
            y: centerY + Math.random() * 100 - 50,
            vx: (Math.random() - 0.5) * 3 - 1,
            vy: (Math.random() - 0.5) * 3,
            type: 'O₂',
            color: '#ef4444',
            size: 16,
            energy: temperature / 100,
            bonds: ['O', 'O'],
            reacted: false
          });
        }
        break;

      case 'displacement':
        // Create 1 Zn atom
        newParticles.push({
          id: 'Zn-0',
          x: centerX - 150,
          y: centerY,
          vx: 2,
          vy: 0,
          type: 'Zn',
          color: '#64748b',
          size: 20,
          energy: temperature / 100,
          bonds: [],
          reacted: false
        });
        // Create 1 CuSO₄ molecule
        newParticles.push({
          id: 'CuSO4-0',
          x: centerX + 100,
          y: centerY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          type: 'CuSO₄',
          color: '#0891b2',
          size: 16,
          energy: temperature / 100,
          bonds: ['Cu', 'S', 'O', 'O', 'O', 'O'],
          reacted: false
        });
        break;
    }

    return newParticles;
  };

  const checkReactions = () => {
    const reactionType = reactions[selectedReaction].id;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setParticles(prevParticles => {
      let newParticles = [...prevParticles];
      let reactionOccurred = false;

      switch (reactionType) {
        case 'synthesis':
          // 2H₂ + O₂ → 2H₂O
          const availableH2 = newParticles.filter(p => p.type === 'H₂' && !p.reacted);
          const availableO2 = newParticles.filter(p => p.type === 'O₂' && !p.reacted);
          
          if (availableH2.length >= 2 && availableO2.length >= 1) {
            // Check if H₂ molecules are close to O₂
            for (let i = 0; i < availableO2.length && availableH2.length >= 2; i++) {
              const o2 = availableO2[i];
              const nearbyH2 = availableH2.filter(h2 => {
                const distance = Math.sqrt(
                  Math.pow(h2.x - o2.x, 2) + Math.pow(h2.y - o2.y, 2)
                );
                return distance < 50 && !h2.reacted;
              }).slice(0, 2);

              if (nearbyH2.length >= 2 && !o2.reacted) {
                // Mark reactants as reacted
                nearbyH2.forEach(h2 => {
                  const index = newParticles.findIndex(p => p.id === h2.id);
                  if (index !== -1) {
                    newParticles[index].reacted = true;
                    newParticles[index].reactedAt = frameCount;
                  }
                });
                
                const o2Index = newParticles.findIndex(p => p.id === o2.id);
                if (o2Index !== -1) {
                  newParticles[o2Index].reacted = true;
                  newParticles[o2Index].reactedAt = frameCount;
                }

                // Create 2 H₂O molecules
                for (let j = 0; j < 2; j++) {
                  newParticles.push({
                    id: `H2O-product-${frameCount}-${j}`,
                    x: o2.x + (j - 0.5) * 40,
                    y: o2.y + (j - 0.5) * 20,
                    vx: (Math.random() - 0.5) * 3,
                    vy: (Math.random() - 0.5) * 3,
                    type: 'H₂O',
                    color: '#22d3ee',
                    size: 15,
                    energy: (temperature + 100) / 100,
                    bonds: ['H', 'H', 'O'],
                    reacted: false
                  });
                }
                reactionOccurred = true;
                break;
              }
            }
          }
          break;

        case 'decomposition':
          // 2H₂O → 2H₂ + O₂
          const availableH2O = newParticles.filter(p => p.type === 'H₂O' && !p.reacted);
          
          if (availableH2O.length >= 2 && temperature > 400) {
            // Find pairs of H₂O molecules close to each other
            for (let i = 0; i < availableH2O.length - 1; i++) {
              const h2o1 = availableH2O[i];
              const h2o2 = availableH2O[i + 1];
              
              if (!h2o1.reacted && !h2o2.reacted) {
                const distance = Math.sqrt(
                  Math.pow(h2o1.x - h2o2.x, 2) + Math.pow(h2o1.y - h2o2.y, 2)
                );
                
                if (distance < 60) {
                  // Mark H₂O molecules as reacted
                  const h2o1Index = newParticles.findIndex(p => p.id === h2o1.id);
                  const h2o2Index = newParticles.findIndex(p => p.id === h2o2.id);
                  
                  if (h2o1Index !== -1 && h2o2Index !== -1) {
                    newParticles[h2o1Index].reacted = true;
                    newParticles[h2o1Index].reactedAt = frameCount;
                    newParticles[h2o2Index].reacted = true;
                    newParticles[h2o2Index].reactedAt = frameCount;

                    const centerX = (h2o1.x + h2o2.x) / 2;
                    const centerY = (h2o1.y + h2o2.y) / 2;

                    // Create 2 H₂ molecules
                    for (let j = 0; j < 2; j++) {
                      newParticles.push({
                        id: `H2-product-${frameCount}-${j}`,
                        x: centerX + (j - 0.5) * 50,
                        y: centerY - 30,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4 - 1,
                        type: 'H₂',
                        color: '#60a5fa',
                        size: 12,
                        energy: (temperature + 50) / 100,
                        bonds: ['H', 'H'],
                        reacted: false
                      });
                    }

                    // Create 1 O₂ molecule
                    newParticles.push({
                      id: `O2-product-${frameCount}`,
                      x: centerX,
                      y: centerY + 30,
                      vx: (Math.random() - 0.5) * 4,
                      vy: (Math.random() - 0.5) * 4 + 1,
                      type: 'O₂',
                      color: '#f87171',
                      size: 16,
                      energy: (temperature + 50) / 100,
                      bonds: ['O', 'O'],
                      reacted: false
                    });

                    reactionOccurred = true;
                    break;
                  }
                }
              }
            }
          }
          break;

        case 'combustion':
          // CH₄ + 2O₂ → CO₂ + 2H₂O
          const availableCH4 = newParticles.filter(p => p.type === 'CH₄' && !p.reacted);
          const availableO2Combustion = newParticles.filter(p => p.type === 'O₂' && !p.reacted);
          
          for (let i = 0; i < availableCH4.length; i++) {
            const ch4 = availableCH4[i];
            const nearbyO2 = availableO2Combustion.filter(o2 => {
              const distance = Math.sqrt(
                Math.pow(ch4.x - o2.x, 2) + Math.pow(ch4.y - o2.y, 2)
              );
              return distance < 60 && !o2.reacted;
            }).slice(0, 2);

            if (nearbyO2.length >= 2 && !ch4.reacted) {
              // Mark reactants as reacted
              const ch4Index = newParticles.findIndex(p => p.id === ch4.id);
              if (ch4Index !== -1) {
                newParticles[ch4Index].reacted = true;
                newParticles[ch4Index].reactedAt = frameCount;
              }

              nearbyO2.forEach(o2 => {
                const index = newParticles.findIndex(p => p.id === o2.id);
                if (index !== -1) {
                  newParticles[index].reacted = true;
                  newParticles[index].reactedAt = frameCount;
                }
              });

              // Create CO₂
              newParticles.push({
                id: `CO2-product-${frameCount}`,
                x: ch4.x,
                y: ch4.y - 40,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 1,
                type: 'CO₂',
                color: '#374151',
                size: 16,
                energy: (temperature + 200) / 100,
                bonds: ['C', 'O', 'O'],
                reacted: false
              });

              // Create 2 H₂O molecules
              for (let j = 0; j < 2; j++) {
                newParticles.push({
                  id: `H2O-product-${frameCount}-${j}`,
                  x: ch4.x + (j - 0.5) * 60,
                  y: ch4.y + 40,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4 + 1,
                  type: 'H₂O',
                  color: '#22d3ee',
                  size: 15,
                  energy: (temperature + 200) / 100,
                  bonds: ['H', 'H', 'O'],
                  reacted: false
                });
              }
              reactionOccurred = true;
              break;
            }
          }
          break;

        case 'displacement':
          // Zn + CuSO₄ → ZnSO₄ + Cu
          const availableZn = newParticles.filter(p => p.type === 'Zn' && !p.reacted);
          const availableCuSO4 = newParticles.filter(p => p.type === 'CuSO₄' && !p.reacted);

          for (let i = 0; i < availableZn.length; i++) {
            const zn = availableZn[i];
            for (let j = 0; j < availableCuSO4.length; j++) {
              const cuso4 = availableCuSO4[j];
              
              if (!zn.reacted && !cuso4.reacted) {
                const distance = Math.sqrt(
                  Math.pow(zn.x - cuso4.x, 2) + Math.pow(zn.y - cuso4.y, 2)
                );

                if (distance < 50) {
                  // Mark reactants as reacted
                  const znIndex = newParticles.findIndex(p => p.id === zn.id);
                  const cuso4Index = newParticles.findIndex(p => p.id === cuso4.id);
                  
                  if (znIndex !== -1 && cuso4Index !== -1) {
                    newParticles[znIndex].reacted = true;
                    newParticles[znIndex].reactedAt = frameCount;
                    newParticles[cuso4Index].reacted = true;
                    newParticles[cuso4Index].reactedAt = frameCount;

                    // Create ZnSO₄
                    
                    newParticles.push({
                      id: `ZnSO4-product-${frameCount}`,
                      x: cuso4.x,
                      y: cuso4.y,
                      vx: (Math.random() - 0.5) * 3,
                      vy: (Math.random() - 0.5) * 3,
                      type: 'ZnSO₄',
                      color: '#94a3b8',
                      size: 16,
                      energy: temperature / 100,
                      bonds: ['Zn', 'S', 'O', 'O', 'O', 'O'],
                      reacted: false
                    });

                    // Create Cu
                    newParticles.push({
                      id: `Cu-product-${frameCount}`,
                      x: zn.x,
                      y: zn.y,
                      vx: (Math.random() - 0.5) * 3,
                      vy: (Math.random() - 0.5) * 3,
                      type: 'Cu',
                      color: '#ea580c',
                      size: 18,
                      energy: temperature / 100,
                      bonds: [],
                      reacted: false
                    });

                    reactionOccurred = true;
                  }
                  break;
                }
              }
            }
            if (reactionOccurred) break;
          }
          break;
      }

      // Remove old reacted particles after some time
      newParticles = newParticles.filter(particle => {
        if (particle.reacted && particle.reactedAt) {
          return frameCount - particle.reactedAt < 30; // Keep for 30 frames before removing
        }
        return !particle.reacted;
      });

      if (reactionOccurred) {
        setReactionProgress(prev => Math.min(prev + 10, 100));
      }

      return newParticles;
    });
  };

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setParticles(prevParticles => {
      return prevParticles.map(particle => {
        if (particle.reacted) {
          // Fade out reacted particles
          return {
            ...particle,
            size: particle.size * 0.95,
            energy: particle.energy * 0.9
          };
        }

        let newX = particle.x + particle.vx * (temperature / 300);
        let newY = particle.y + particle.vy * (temperature / 300);

        // Boundary collision
        if (newX < particle.size || newX > canvas.width - particle.size) {
          particle.vx *= -0.8;
          newX = Math.max(particle.size, Math.min(canvas.width - particle.size, newX));
        }
        if (newY < particle.size || newY > canvas.height - particle.size) {
          particle.vy *= -0.8;
          newY = Math.max(particle.size, Math.min(canvas.height - particle.size, newY));
        }

        // Add some random motion based on temperature
        const thermalMotion = temperature / 1000;
        particle.vx += (Math.random() - 0.5) * thermalMotion;
        particle.vy += (Math.random() - 0.5) * thermalMotion;

        // Damping
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        return {
          ...particle,
          x: newX,
          y: newY,
          energy: temperature / 100
        };
      });
    });
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particles.forEach(particle => {
      ctx.save();
      
      // Adjust opacity for reacted particles
      const opacity = particle.reacted ? 0.3 : 1;
      
      // Glow effect
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.energy * 5;
      ctx.globalAlpha = opacity;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Draw particle label
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'white';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(particle.type, particle.x, particle.y + 3);
      
      ctx.restore();
    });

    // Draw bonds between particles
    particles.forEach(particle => {
      if (particle.bonds.length > 0 && !particle.reacted) {
        particles.forEach(otherParticle => {
          if (particle.id !== otherParticle.id && !otherParticle.reacted) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 60) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distance / 200})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      }
    });
  };

  const animate = () => {
    if (isPlaying) {
      setFrameCount(prev => prev + 1);
      updateParticles();
      checkReactions();
      drawParticles();
    } else {
      drawParticles();
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = 500;
    }
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, particles, temperature, frameCount]);

  useEffect(() => {
    const newParticles = createParticles(reactions[selectedReaction].id);
    setParticles(newParticles);
    setReactionProgress(0);
    setFrameCount(0);
  }, [selectedReaction]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setReactionProgress(0);
    setFrameCount(0);
    const newParticles = createParticles(reactions[selectedReaction].id);
    setParticles(newParticles);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Chemical Reactions Simulator
          </h1>
          <p className="text-slate-300">
            Interactive visualization of different types of chemical reactions with proper stoichiometry
          </p>
        </div>

        {/* Reaction Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {reactions.map((reaction, index) => (
            <button
              key={reaction.id}
              onClick={() => setSelectedReaction(index)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedReaction === index
                  ? 'border-white bg-white/10 shadow-lg'
                  : 'border-slate-600 bg-slate-800/50 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${reaction.color}`}>
                  {reaction.icon}
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {reaction.name}
              </h3>
              <p className="text-slate-400 text-xs">
                {reaction.type}
              </p>
            </button>
          ))}
        </div>

        {/* Main Simulation Area */}
        <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-lg border border-slate-600"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>

            {/* Controls and Info */}
            <div className="space-y-6">
              {/* Reaction Info */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {reactions[selectedReaction].name}
                </h3>
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-sm text-slate-300 mb-1">Equation:</p>
                    <p className="text-white font-mono text-sm">
                      {reactions[selectedReaction].equation}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm">
                    {reactions[selectedReaction].description}
                  </p>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-sm text-slate-300 mb-1">Instructions:</p>
                    <p className="text-xs text-slate-400">
                      {selectedReaction === 0 && "Watch as H₂ molecules collide with O₂ to form water molecules"}
                      {selectedReaction === 1 && "High temperature (>400K) breaks water molecules into hydrogen and oxygen"}
                      {selectedReaction === 2 && "Methane reacts with oxygen to produce carbon dioxide and water"}
                      {selectedReaction === 3 && "Zinc displaces copper from copper sulfate solution"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                <h4 className="text-lg font-semibold text-white mb-4">Controls</h4>
                
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={handlePlay}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                {/* Temperature Control */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Temperature: {temperature}K
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Cold</span>
                    <span>Hot</span>
                  </div>
                </div>

                {/* Pressure Control */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Pressure: {pressure} atm
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={pressure}
                    onChange={(e) => setPressure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Reaction Progress
                  </label>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${reactionProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {reactionProgress.toFixed(1)}% complete
                  </p>
                </div>

                {/* Particle Count */}
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-sm text-slate-300 mb-2">Active Particles:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(
                      particles
                        .filter(p => !p.reacted)
                        .reduce((acc, p) => {
                          acc[p.type] = (acc[p.type] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                    ).map(([type, count]) => (
                      <div key={type} className="flex justify-between">
                        <span className="text-slate-400">{type}:</span>
                        <span className="text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reaction Tips */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
                <h4 className="text-lg font-semibold text-white mb-3">💡 Tips</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p>• Higher temperature increases particle movement and reaction rate</p>
                  <p>• Particles must collide to react according to stoichiometry</p>
                  <p>• Reacted particles fade away as new products form</p>
                  <p>• Each reaction follows Le Chatelier's principle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemicalReactionsSimulation;