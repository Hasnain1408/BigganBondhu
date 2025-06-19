"use client"

import { motion } from "framer-motion"
import GasLawsIndex from "./gas laws/gasLawsIndex"
import KineticTheoryIndex from "./kinetic theory/kineticTheoryIndex"
import IdealGasEquationIndex from "./gas equation/idealGasEquationIndex"


interface IdealGasContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function IdealGasContent({ topic }: IdealGasContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "gas-laws" ? (
        <GasLawsIndex />
      ) : null}

      {topic.id === "kinetic-theory" ? (
        <KineticTheoryIndex />
      ) : null}

      {topic.id === "ideal-gas-equation" ? (
        <IdealGasEquationIndex />
      ) : null}
    </div>
  )
}