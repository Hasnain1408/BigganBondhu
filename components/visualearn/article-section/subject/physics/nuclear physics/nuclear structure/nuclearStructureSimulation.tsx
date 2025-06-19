// components/topics/physics/nuclear/nuclearStructureSimulation.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function NuclearStructureSimulation() {
  const [showBinding, setShowBinding] = useState(false)

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold">Interactive Nuclear Model</h2>
      <div className="relative h-80 w-full flex items-center justify-center">
        <motion.div
          className="rounded-full bg-yellow-500 w-24 h-24 flex items-center justify-center text-white font-bold shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Nucleus
        </motion.div>
      </div>
      <Button onClick={() => setShowBinding(!showBinding)}>
        {showBinding ? "Hide Binding Energy" : "Show Binding Energy"}
      </Button>
      {showBinding && (
        <motion.div
          className="p-4 bg-blue-100 rounded-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Binding energy holds nucleons together. Greater binding energy = greater stability.
        </motion.div>
      )}
    </div>
  )
}
