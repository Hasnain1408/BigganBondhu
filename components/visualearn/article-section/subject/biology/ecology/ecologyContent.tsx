"use client"

import { motion } from "framer-motion"
import EcosystemsIndex from "./ecosystems/ecosystemsIndex"
import BiogeochemicalCyclesIndex from "./biogeochemical cycles/biogeochemicalCyclesIndex"
import ConservationBiologyIndex from "./conservation biology/conservationBiologyIndex"


interface EcologyContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function EcologyContent({ topic }: EcologyContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "ecosystems" ? (
        <EcosystemsIndex />
      ) : null}

      {topic.id === "biogeochemical-cycles" ? (
        <BiogeochemicalCyclesIndex />
      ) : null}

      {topic.id === "conservation-biology" ? (
        <ConservationBiologyIndex />
      ) : null}
    </div>
  )
}
