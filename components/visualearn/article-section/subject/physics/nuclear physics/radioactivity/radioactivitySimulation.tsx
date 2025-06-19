import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Zap, Activity, Clock } from 'lucide-react';

interface Atom {
  id: number;
  x: number;
  y: number;
  isDecayed: boolean;
  decayTime?: number;
  glowIntensity: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  type: 'alpha' | 'beta' | 'gamma';
}

const RadioactivitySimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [atoms, setAtoms] = useState<Atom[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [time, setTime] = useState(0);
  const [halfLife, setHalfLife] = useState(5000);
  const [initialCount] = useState(150);
  const [stats, setStats] = useState({
    intact: 150,
    decayed: 0,
    emittedParticles: 0
  });

  // Initialize atoms in a grid pattern
  const initializeAtoms = useCallback(() => {
    const newAtoms: Atom[] = [];
    const cols = Math.ceil(Math.sqrt(initialCount));
    const rows = Math.ceil(initialCount / cols);
    const spacing = 40;
    const offsetX = (800 - (cols - 1) * spacing) / 2;
    const offsetY = (500 - (rows - 1) * spacing) / 2;

    for (let i = 0; i < initialCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      newAtoms.push({
        id: i,
        x: offsetX + col * spacing + (Math.random() - 0.5) * 10,
        y: offsetY + row * spacing + (Math.random() - 0.5) * 10,
        isDecayed: false,
        glowIntensity: 0.5 + Math.random() * 0.5
      });
    }
    setAtoms(newAtoms);
    setParticles([]);
    setTime(0);
    setStats({ intact: initialCount, decayed: 0, emittedParticles: 0 });
  }, [initialCount]);

  // Calculate decay probability based on half-life
  const getDecayProbability = (deltaTime: number) => {
    const lambda = Math.LN2 / halfLife;
    return 1 - Math.exp(-lambda * deltaTime);
  };

  // Create emission particle
  const createParticle = (atom: Atom): Particle => {
    const types: ('alpha' | 'beta' | 'gamma')[] = ['alpha', 'beta', 'gamma'];
    const type = types[Math.floor(Math.random() * types.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    
    return {
      id: Date.now() + Math.random(),
      x: atom.x,
      y: atom.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 60 + Math.random() * 40,
      type
    };
  };

  // Animation loop
  const animate = useCallback(() => {
    if (!isRunning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(8, 8, 20, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();
    const deltaTime = 16; // Approximate 60fps

    setTime(prev => prev + deltaTime);

    // Update atoms
    setAtoms(prevAtoms => {
      const newAtoms = prevAtoms.map(atom => {
        if (!atom.isDecayed) {
          const probability = getDecayProbability(deltaTime);
          if (Math.random() < probability) {
            // Atom decays
            const particle = createParticle(atom);
            setParticles(prev => [...prev, particle]);
            setStats(prev => ({
              ...prev,
              intact: prev.intact - 1,
              decayed: prev.decayed + 1,
              emittedParticles: prev.emittedParticles + 1
            }));
            return { ...atom, isDecayed: true, decayTime: currentTime };
          }
        }
        return atom;
      });
      return newAtoms;
    });

    // Update particles
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life + 1,
          vx: particle.vx * 0.99, // Slight deceleration
          vy: particle.vy * 0.99
        }))
        .filter(particle => 
          particle.life < particle.maxLife &&
          particle.x > -50 && particle.x < canvas.width + 50 &&
          particle.y > -50 && particle.y < canvas.height + 50
        );
    });

    // Draw atoms
    atoms.forEach(atom => {
      const size = atom.isDecayed ? 6 : 8;
      const opacity = atom.isDecayed ? 0.3 : (0.7 + Math.sin(time * 0.01 + atom.id) * 0.3);
      
      if (atom.isDecayed) {
        // Decayed atom (smaller, dimmer)
        ctx.fillStyle = `rgba(120, 60, 60, ${opacity})`;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Active atom with glow
        const glowSize = size + 4 + Math.sin(time * 0.005 + atom.id) * 2;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          atom.x, atom.y, 0,
          atom.x, atom.y, glowSize
        );
        gradient.addColorStop(0, `rgba(100, 255, 100, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(100, 255, 100, ${opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(100, 255, 100, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = `rgba(150, 255, 150, ${opacity})`;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw particles
    particles.forEach(particle => {
      const life = particle.life / particle.maxLife;
      const alpha = 1 - life;
      
      let color;
      switch (particle.type) {
        case 'alpha':
          color = `rgba(255, 100, 100, ${alpha})`;
          break;
        case 'beta':
          color = `rgba(100, 150, 255, ${alpha})`;
          break;
        case 'gamma':
          color = `rgba(255, 255, 100, ${alpha})`;
          break;
      }
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3 - life * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Particle trail
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, atoms, particles, time, halfLife]);

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  useEffect(() => {
    initializeAtoms();
  }, [initializeAtoms]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    initializeAtoms();
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Radioactive Decay Simulation
          </h1>
          <p className="text-gray-300">
            Watch radioactive atoms decay over time and emit particles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Zap className="mr-2" size={20} />
                Controls
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={toggleSimulation}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isRunning
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isRunning ? <Pause className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                
                <button
                  onClick={resetSimulation}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  <RotateCcw className="mr-2" size={16} />
                  Reset
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Half-life: {halfLife / 1000}s
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={halfLife}
                  onChange={(e) => setHalfLife(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="mr-2" size={20} />
                Statistics
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-400">Intact Atoms:</span>
                  <span className="font-mono">{stats.intact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">Decayed Atoms:</span>
                  <span className="font-mono">{stats.decayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400">Particles Emitted:</span>
                  <span className="font-mono">{stats.emittedParticles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Elapsed Time:</span>
                  <span className="font-mono">{formatTime(time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Decay Rate:</span>
                  <span className="font-mono">
                    {((stats.decayed / initialCount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-400 mr-3"></div>
                  <span>Intact Atoms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-500 mr-3"></div>
                  <span>Decayed Atoms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-400 mr-3"></div>
                  <span>Alpha Particles</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-400 mr-3"></div>
                  <span>Beta Particles</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 mr-3"></div>
                  <span>Gamma Rays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-auto bg-gray-900 rounded border border-gray-700"
              />
              
              <div className="mt-4 text-center text-sm text-gray-400">
                <p>Green glowing atoms are radioactive and will randomly decay</p>
                <p>Watch as they emit colorful particles and turn into stable (gray) atoms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioactivitySimulation;