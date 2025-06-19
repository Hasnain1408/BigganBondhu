"use client"

import { motion } from "framer-motion"
import QuantumBasicsIndex from "./quantum basics/quantumBasicsIndex"
import QuantumApplicationsIndex from "./quantum applications/quantumApplicationsIndex"
import SchrodingerEquationIndex from "./schrodinger equation/schrodingerEquationIndex"

interface QuantumPhysicsContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function QuantumPhysicsContent({ topic }: QuantumPhysicsContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "quantum-basics" ? (
        <QuantumBasicsIndex />
      ) : null}

      {topic.id === "schrodinger-equation" ? (
        <SchrodingerEquationIndex />
      ) : null}

      {topic.id === "quantum-applications" ? (
        <QuantumApplicationsIndex />
      ) : null}
    </div>
  )
}