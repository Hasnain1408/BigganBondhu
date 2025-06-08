"use client"

import { motion } from "framer-motion"
import AcidBaseTheoriesIndex from "./acid-base theories/acidBaseTheoriesIndex"
import BuffersIndex from "./buffers/buffersIndex"
import PHScaleIndex from "./ph-scale/phScaleIndex"

interface AcidsAndBasesContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function AcidsAndBasesContent({ topic }: AcidsAndBasesContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "acid-base-theories" ? (
        <AcidBaseTheoriesIndex />
      ) : null}

      {topic.id === "ph-scale" ? (
        <PHScaleIndex />
      ) : null}

      {topic.id === "buffers" ? (
        <BuffersIndex />
      ) : null}
    </div>
  )
}