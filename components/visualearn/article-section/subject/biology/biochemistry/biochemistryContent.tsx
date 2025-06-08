"use client"

import { motion } from "framer-motion"
import BiomoleculesIndex from "./biomolecules/biomoleculesIndex"
import EnzymesIndex from "./enzymes/enzymesIndex"
import MetabolismIndex from "./metabolism/metabolismIndex"

interface BiochemistryContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function BiochemistryContent({ topic }: BiochemistryContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "biomolecules" ? (
        <BiomoleculesIndex />
      ) : null}

      {topic.id === "enzymes" ? (
        <EnzymesIndex />
      ) : null}

      {topic.id === "metabolism" ? (
        <MetabolismIndex />
      ) : null}
    </div>
  )
}
