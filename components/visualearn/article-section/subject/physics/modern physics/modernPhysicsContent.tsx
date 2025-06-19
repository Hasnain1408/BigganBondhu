"use client"

import { motion } from "framer-motion"
import AtomicModelsIndex from "./atomic models/atomicModelsIndex"
import ParticlePhysicsIndex from "./particle physics/particlePhysicsIndex"

interface ModernPhysicsContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ModernPhysicsContent({ topic }: ModernPhysicsContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "atomic-models" ? (
        <AtomicModelsIndex />
      ) : null}

      {topic.id === "particle-physics" ? (
        <ParticlePhysicsIndex />
      ) : null}
    </div>
  )
}