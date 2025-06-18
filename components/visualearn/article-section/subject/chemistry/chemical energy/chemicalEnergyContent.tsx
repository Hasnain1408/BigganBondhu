"use client"

import { motion } from "framer-motion"
import ThermochemistryIndex from "./thermochemistry/thermochemistryIndex"
import EnthalpyIndex from "./enthalpy/enthalpyIndex"
import HessLawIndex from "./hess law/hessLawIndex"


interface ChemicalEnergyContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ChemicalEnergyContent({ topic }: ChemicalEnergyContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "thermochemistry" ? (
        <ThermochemistryIndex />
      ) : null}

      {topic.id === "enthalpy" ? (
        <EnthalpyIndex />
      ) : null}

      {topic.id === "hess-law" ? (
        <HessLawIndex />
      ) : null}
    </div>
  )
}