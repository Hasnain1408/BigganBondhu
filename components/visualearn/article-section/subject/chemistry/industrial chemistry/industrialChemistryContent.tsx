"use client"

import { motion } from "framer-motion"
import ChemicalProcessesIndex from "./chemical processes/chemicalProcessesIndex"
import GreenChemistryIndex from "./green chemistry/greenChemistryIndex"
import PolymersIndex from "./polymers/polymersIndex"

interface IndustrialChemistryContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function IndustrialChemistryContent({ topic }: IndustrialChemistryContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "chemical-processes" ? (
        <ChemicalProcessesIndex />
      ) : null}

      {topic.id === "green-chemistry" ? (
        <GreenChemistryIndex />
      ) : null}

      {topic.id === "polymers" ? (
        <PolymersIndex />
      ) : null}
    </div>
  )
}