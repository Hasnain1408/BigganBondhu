"use client"

import { motion } from "framer-motion"
import BoylesLawIndex from "./boyles law/boylesLawIndex"
import CharlesLawIndex from "./charles law/charlesLawIndex"
import PropertiesOfGasesIndex from "./gas properties/propertiesOfGasesIndex"

interface GasesContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function GasesContent({ topic }: GasesContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "properties-of-gases" ? (
        <PropertiesOfGasesIndex />
      ) : null}

      {topic.id === "boyles-law" ? (
        <BoylesLawIndex />
      ) : null}

      {topic.id === "charles-law" ? (
        <CharlesLawIndex />
      ) : null}
    </div>
  )
}