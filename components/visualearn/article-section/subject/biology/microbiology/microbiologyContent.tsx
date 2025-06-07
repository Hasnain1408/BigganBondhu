"use client"

import { motion } from "framer-motion"
import MicroorganismsIndex from "./microorganisms/microorganismsIndex"
import ImmuneSystemIndex from "./immune system/immuneSystemIndex"
import BiotechnologyIndex from "./biotechnology/biotechnologyIndex"


interface MicrobiologyContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function MicrobiologyContent({ topic }: MicrobiologyContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "microorganisms" ? (
        <MicroorganismsIndex />
      ) : null}

      {topic.id === "immune-system" ? (
        <ImmuneSystemIndex />
      ) : null}

      {topic.id === "biotechnology" ? (
        <BiotechnologyIndex />
      ) : null}
    </div>
  )
}
