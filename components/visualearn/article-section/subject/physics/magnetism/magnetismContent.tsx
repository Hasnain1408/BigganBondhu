"use client"

import { motion } from "framer-motion"
import MagneticFieldIndex from "./magnetic field/magneticFieldIndex"
import ElectromagnetismIndex from "./electromagnetism/electromagnetismIndex"
import FaradaysLawIndex from "./faraday's law/faradaysLawIndex"


interface MagnetismContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function MagnetismContent({ topic }: MagnetismContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "magnetic-field" ? (
        <MagneticFieldIndex />
      ) : null}

      {topic.id === "electromagnetism" ? (
        <ElectromagnetismIndex />
      ) : null}

      {topic.id === "faradays-law" ? (
        <FaradaysLawIndex />
      ) : null}
    </div>
  )
}