"use client"

import { motion } from "framer-motion"
import NewtonsLawsIndex from "./newtons-law/NewtonsLawsIndex"
import FrictionIndex from "./friction/FrictionIndex"
import SpringForceIndex from "./spring force/SpringForceIndex"

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
