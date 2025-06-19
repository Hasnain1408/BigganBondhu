"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NuclearReactionsSimulation() {
  const [stage, setStage] = useState(0)

  const nextStage = () => setStage((prev) => (prev + 1) % 3)

  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold">Fission and Fusion Animation</h2>
      <div className="flex justify-center items-center h-80">
        {stage === 0 && (
          <motion.div
            className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            U-235
          </motion.div>
        )}
        {stage === 1 && (
          <motion.div
            className="grid grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white">Kr</div>
            <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center text-white">Ba</div>
          </motion.div>
        )}
        {stage === 2 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-yellow-600 font-bold">Energy Released!</div>
            <div className="flex gap-2 justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
            </div>
          </motion.div>
        )}
      </div>
      <Button onClick={nextStage}>Next Stage</Button>
    </div>
  )
}
