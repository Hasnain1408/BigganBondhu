"use client"

import { motion } from "framer-motion"
import DNAIndex from "./dna/dnaIndex"
import MendelianGeneticsIndex from "./mendelian genetics/mendelianGeneticsIndex"
import GeneExpressionIndex from "./gene expression/geneExpressionIndex"


interface GeneticsContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function GeneticsContent({ topic }: GeneticsContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "dna-structure" ? (
        <DNAIndex />
      ) : null}

      {topic.id === "mendelian-genetics" ? (
        <MendelianGeneticsIndex />
      ) : null}

      {topic.id === "gene-expression" ? (
        <GeneExpressionIndex />
      ) : null}
    </div>
  )
}
