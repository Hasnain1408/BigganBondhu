"use client"

import { motion } from "framer-motion"
import IsomerismIndex from "./isomerism/isomerismIndex"
import HydrocarbonsIndex from "./hydrocarbon/hydrocarbonsIndex"
import FunctionalGroupsIndex from "./functional group/functionalGroupsIndex"

interface OrganicChemistryContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function OrganicChemistryContent({ topic }: OrganicChemistryContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "hydrocarbons" ? (
        <HydrocarbonsIndex />
      ) : null}

      {topic.id === "functional-groups" ? (
        <FunctionalGroupsIndex />
      ) : null}

      {topic.id === "isomerism" ? (
        <IsomerismIndex />
      ) : null}
    </div>
  )
}