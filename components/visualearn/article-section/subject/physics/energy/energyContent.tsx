"use client"

import { motion } from "framer-motion"
import WorkEnergyTheoremIndex from "./work-energy theorem/workEnergyTheoremIndex"
import PotentialEnergyIndex from "./potential energy/potentialEnergyIndex"
import EnergyConservationIndex from "./energy conservation/energyConservationIndex"
import KineticEnergyIndex from "./kinetic energy/kineticEnergyIndex"

interface EnergyContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function EnergyContent({ topic }: EnergyContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "work-energy-theorem" ? (
        <WorkEnergyTheoremIndex />
      ) : null}
      {topic.id === "kinetic-energy" ? (
        <KineticEnergyIndex />
      ) : null}
      {topic.id === "potential-energy" ? (
        <PotentialEnergyIndex />
      ) : null}
      {topic.id === "energy-conservation" ? (
        <EnergyConservationIndex />
      ) : null}
    </div>
  )
}