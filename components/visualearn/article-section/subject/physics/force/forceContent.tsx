"use client"

import { motion } from "framer-motion"
import NewtonsLawsIndex from "./Newtons-Law/NewtonsLawsIndex"
import FrictionIndex from "./Friction/FrictionIndex"
import SpringForceIndex from "./Spring Force/SpringForceIndex"

interface ForceContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ForceContent({ topic }: ForceContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "newtons-laws" ? (
        <NewtonsLawsIndex />
      ) : null}

      {topic.id === "friction" ? (
        <FrictionIndex />
      ) : null}

      {topic.id === "spring-force" ? (
        <SpringForceIndex />
      ) : null}
    </div>
  )
}
