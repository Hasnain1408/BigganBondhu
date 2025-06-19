"use client"

import { motion } from "framer-motion"
import SpecialRelativityIndex from "./special relativity/specialRelativityIndex"
import GeneralRelativityIndex from "./general relativity/generalRelativityIndex"
import RelativityParadoxesIndex from "./relativity paradoxes/relativityParadoxesIndex"

interface RelativityContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function RelativityContent({ topic }: RelativityContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "special-relativity" ? (
        <SpecialRelativityIndex />
      ) : null}

      {topic.id === "general-relativity" ? (
        <GeneralRelativityIndex />
      ) : null}

      {topic.id === "relativity-paradoxes" ? (
        <RelativityParadoxesIndex />
      ) : null}
    </div>
  )
}