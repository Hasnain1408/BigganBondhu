"use client"

import { motion } from "framer-motion"
import DigestiveSystemIndex from "./digestive system/digestiveSystemIndex"
import CirculatorySystemIndex from "./circulatory system/circulatorySystemIndex"
import NervousSystemIndex from "./nervous system/nervousSystemIndex"

interface HumanPhysiologyContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function HumanPhysiologyContent({ topic }: HumanPhysiologyContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "digestive-system" ? (
        <DigestiveSystemIndex />
      ) : null}

      {topic.id === "circulatory-system" ? (
        <CirculatorySystemIndex />
      ) : null}

      {topic.id === "nervous-system" ? (
        <NervousSystemIndex />
      ) : null}
    </div>
  )
}
