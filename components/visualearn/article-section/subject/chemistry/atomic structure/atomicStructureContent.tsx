"use client"

import { motion } from "framer-motion"
import AtomicModelsIndex from "./atomic models/atomicModelsIndex"
import SubatomicParticlesIndex from "./subatomic particles/subatomicParticlesIndex"
import ElectronConfigurationIndex from "./electron configuration/electronConfigurationIndex"

interface AtomicStructureContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function AtomicStructureContent({ topic }: AtomicStructureContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "atomic-models" ? (
        <AtomicModelsIndex />
      ) : null}

      {topic.id === "subatomic-particles" ? (
        <SubatomicParticlesIndex />
      ) : null}

      {topic.id === "electron-configuration" ? (
        <ElectronConfigurationIndex />
      ) : null}
    </div>
  )
}