"use client"

import { motion } from "framer-motion"
import TypesOfReactionsIndex from "./reaction types/typesOfReactionsIndex"
import BalancingEquationsIndex from "./balancing equations/balancingEquationsIndex"
import StoichiometryIndex from "./stoichiometry/stoichiometryIndex"

interface ChemicalReactionsContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ChemicalReactionsContent({ topic }: ChemicalReactionsContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "reaction-types" ? (
        <TypesOfReactionsIndex />
      ) : null}

      {topic.id === "balancing-equations" ? (
        <BalancingEquationsIndex />
      ) : null}

      {topic.id === "stoichiometry" ? (
        <StoichiometryIndex />
      ) : null}
    </div>
  )
}