import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, Zap, Atom } from 'lucide-react';

const IonicBondingSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const [selectedPair, setSelectedPair] = useState('NaCl');
  const [showElectrons, setShowElectrons] = useState(true);
  const [showCharges, setShowCharges] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const intervalRef = useRef(null);

  const compounds = {
    'NaCl': {
      metal: { symbol: 'Na', name: 'Sodium', electrons: 1, color: '#FFD700' },
      nonmetal: { symbol: 'Cl', name: 'Chlorine', electrons: 7, color: '#00FF7F' },
      product: 'Sodium Chloride (Table Salt)'
    },
    'MgO': {
      metal: { symbol: 'Mg', name: 'Magnesium', electrons: 2, color: '#C0C0C0' },
      nonmetal: { symbol: 'O', name: 'Oxygen', electrons: 6, color: '#FF6347' },
      product: 'Magnesium Oxide'
    },
    'CaF2': {
      metal: { symbol: 'Ca', name: 'Calcium', electrons: 2, color: '#FFA500' },
      nonmetal: { symbol: 'F', name: 'Fluorine', electrons: 7, color: '#9370DB' },
      product: 'Calcium Fluoride'
    }
  };

  const currentCompound = compounds[selectedPair];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStage(prev => (prev + 1) % 6);
      }, 2000 / animationSpeed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, animationSpeed]);

  const reset = () => {
    setIsPlaying(false);
    setStage(0);
  };

  const getAtomPosition = (isLeft, stage) => {
    const baseLeft = isLeft ? 'left-1/4' : 'right-1/4';
    if (stage >= 4) return isLeft ? 'left-[45%]' : 'right-[45%]';
    if (stage >= 3) return isLeft ? 'left-[40%]' : 'right-[40%]';
    return baseLeft;
  };

  const getElectronTransform = (stage, electronIndex) => {
    if (stage < 2) return 'translate-x-0';
    if (stage === 2) return 'translate-x-8 opacity-70';
    if (stage >= 3) return electronIndex === 0 ? 'translate-x-32 opacity-100' : 'translate-x-16 opacity-50';
    return 'translate-x-0';
  };

  const AtomComponent = ({ atom, isLeft, stage, isMetal }) => {
    const charge = stage >= 3 ? (isMetal ? '+' : '-') : '';
    const chargeValue = isMetal ? currentCompound.metal.electrons : currentCompound.metal.electrons;

    return (
      <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-in-out ${getAtomPosition(isLeft, stage)}`}>
        <div className="relative">
          {/* Atom nucleus */}
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500`}
            style={{ 
              backgroundColor: atom.color,
              boxShadow: stage >= 3 ? `0 0 20px ${atom.color}` : `0 0 10px ${atom.color}40`
            }}
          >
            {atom.symbol}
            {showCharges && charge && (
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {charge}{chargeValue}
              </span>
            )}
          </div>

          {/* Electron shells */}
          {showElectrons && (
            <>
              {/* Inner electrons */}
              {[...Array(isMetal ? 2 : 2)].map((_, i) => (
                <div
                  key={`inner-${i}`}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full animate-spin"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 180}deg) translateX(15px)`,
                    animationDuration: '3s'
                  }}
                />
              ))}

              {/* Valence electrons */}
              {[...Array(atom.electrons)].map((_, i) => (
                <div
                  key={`valence-${i}`}
                  className={`absolute w-3 h-3 rounded-full transition-all duration-1000 ${
                    isMetal ? 'bg-red-400' : 'bg-yellow-400'
                  } ${stage >= 2 && isMetal ? getElectronTransform(stage, i) : ''}`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * (360 / atom.electrons)}deg) translateX(25px)`,
                    opacity: stage >= 3 && isMetal && i < currentCompound.metal.electrons ? 0.3 : 1
                  }}
                />
              ))}
            </>
          )}

          {/* Energy waves during bonding */}
          {stage === 3 && (
            <div className="absolute inset-0 rounded-full border-4 border-white opacity-50 animate-ping" />
          )}
        </div>
      </div>
    );
  };

  const stageDescriptions = [
    "Initial state: Metal and non-metal atoms approach each other",
    "Atoms get closer, preparing for electron transfer",
    "Electron transfer begins - metal loses valence electrons",
    "Ionic bond forms! Oppositely charged ions attract",
    "Stable ionic compound is formed",
    "Crystal lattice structure develops"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Ionic Bonding Simulation
          </h1>
          <p className="text-lg text-gray-300">
            Watch how metals and non-metals form ionic bonds through electron transfer
          </p>
        </div>

        {/* Controls */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Compound Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Compound:</label>
              <select 
                value={selectedPair}
                onChange={(e) => {
                  setSelectedPair(e.target.value);
                  reset();
                }}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                {Object.entries(compounds).map(([key, compound]) => (
                  <option key={key} value={key} className="text-black">
                    {compound.metal.symbol}{compound.nonmetal.symbol} - {compound.product}
                  </option>
                ))}
              </select>
            </div>

            {/* Animation Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Animation Speed:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-400 mt-1">{animationSpeed}x</div>
            </div>

            {/* Display Options */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showElectrons}
                  onChange={(e) => setShowElectrons(e.target.checked)}
                  className="rounded"
                />
                <span>Show Electrons</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showCharges}
                  onChange={(e) => setShowCharges(e.target.checked)}
                  className="rounded"
                />
                <span>Show Charges</span>
              </label>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={reset}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Main Simulation Area */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 mb-8">
          <div className="h-96 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-10 grid-rows-10 h-full">
                {[...Array(100)].map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>

            {/* Atoms */}
            <AtomComponent 
              atom={currentCompound.metal}
              isLeft={true}
              stage={stage}
              isMetal={true}
            />
            
            <AtomComponent 
              atom={currentCompound.nonmetal}
              isLeft={false}
              stage={stage}
              isMetal={false}
            />

            {/* Electron transfer visualization */}
            {stage >= 2 && stage <= 3 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Zap className="text-yellow-400 animate-pulse" size={32} />
              </div>
            )}

            {/* Bond line */}
            {stage >= 4 && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"
                style={{ width: '120px' }}
              />
            )}

            {/* Stage indicator */}
            <div className="absolute top-4 left-4 bg-black/50 rounded-lg px-4 py-2">
              <div className="text-sm font-medium">Stage {stage + 1}/6</div>
              <div className="text-xs text-gray-300 mt-1">
                {stageDescriptions[stage]}
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Compound Info */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Atom className="mr-2" />
              Current Compound: {currentCompound.product}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-medium">{currentCompound.metal.name} ({currentCompound.metal.symbol})</div>
                  <div className="text-sm text-gray-400">Metal - Loses {currentCompound.metal.electrons} electron(s)</div>
                </div>
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: currentCompound.metal.color }}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-medium">{currentCompound.nonmetal.name} ({currentCompound.nonmetal.symbol})</div>
                  <div className="text-sm text-gray-400">Non-metal - Gains electron(s)</div>
                </div>
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: currentCompound.nonmetal.color }}
                />
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Info className="mr-2" />
              Key Concepts
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-500/20 rounded-lg border-l-4 border-blue-500">
                <strong>Electron Transfer:</strong> Metals lose valence electrons to achieve stable electron configuration
              </div>
              
              <div className="p-3 bg-green-500/20 rounded-lg border-l-4 border-green-500">
                <strong>Ion Formation:</strong> Atoms become charged ions (cations and anions)
              </div>
              
              <div className="p-3 bg-yellow-500/20 rounded-lg border-l-4 border-yellow-500">
                <strong>Electrostatic Attraction:</strong> Opposite charges attract to form ionic bonds
              </div>
              
              <div className="p-3 bg-purple-500/20 rounded-lg border-l-4 border-purple-500">
                <strong>Crystal Lattice:</strong> Ions arrange in regular, repeating 3D structures
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IonicBondingSimulation;