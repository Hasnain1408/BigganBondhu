"use client"

import { motion } from "framer-motion"
import IonicBondingIndex from "./ionic bonding/ionicBondingIndex"
import CovalentBondingIndex from "./covalent bonding/covalentBondingIndex"
import LewisStructuresIndex from "./lewis structures/lewisStructuresIndex"

interface ChemicalBondingContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ChemicalBondingContent({ topic }: ChemicalBondingContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "ionic-bonding" ? (
        <IonicBondingIndex />
      ) : null}

      {topic.id === "covalent-bonding" ? (
        <CovalentBondingIndex />
      ) : null}

      {topic.id === "lewis-structures" ? (
        <LewisStructuresIndex />
      ) : null}
    </div>
  )
}