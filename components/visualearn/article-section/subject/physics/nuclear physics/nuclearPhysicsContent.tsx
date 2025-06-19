"use client"

import { motion } from "framer-motion"
import NuclearStructureIndex from "./nuclear structure/nuclearStructureIndex"
import RadioactivityIndex from "./radioactivity/radioactivityIndex"
import NuclearReactionsIndex from "./nuclear reactions/nuclearReactionsIndex"

interface NuclearPhysicsContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function NuclearPhysicsContent({ topic }: NuclearPhysicsContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "nuclear-structure" ? (
        <NuclearStructureIndex />
      ) : null}

      {topic.id === "radioactivity" ? (
        <RadioactivityIndex />
      ) : null}

      {topic.id === "nuclear-reactions" ? (
        <NuclearReactionsIndex />
      ) : null}
    </div>
  )
}