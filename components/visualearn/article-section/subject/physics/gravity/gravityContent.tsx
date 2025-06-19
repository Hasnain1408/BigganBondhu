"use client"

import { motion } from "framer-motion"
import UniversalGravitationIndex from "./universal gravitation/universalGravitationIndex"
import GravitationalFieldIndex from "./gravitational field/gravitationalFieldIndex"
import OrbitalMotionIndex from "./orbital motion/orbitalMotionIndex"

interface GravityContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function GravityContent({ topic }: GravityContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "universal-gravitation" ? (
        <UniversalGravitationIndex />
      ) : null}

      {topic.id === "gravitational-field" ? (
        <GravitationalFieldIndex />
      ) : null}

      {topic.id === "orbital-motion" ? (
        <OrbitalMotionIndex />
      ) : null}
    </div>
  )
}