"use client"

import { motion } from "framer-motion"
import PeriodicTrendsIndex from "./periodic trends/periodicTrendsIndex"
import PeriodicLawIndex from "./periodic law/periodicLawIndex"
import GroupsAndFamiliesIndex from "./groups families/groupsAndFamiliesIndex"

interface PeriodicTableContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function PeriodicTableContent({ topic }: PeriodicTableContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "periodic-trends" ? (
        <PeriodicTrendsIndex />
      ) : null}

      {topic.id === "groups-and-families" ? (
        <GroupsAndFamiliesIndex />
      ) : null}

      {topic.id === "periodic-law" ? (
        <PeriodicLawIndex />
      ) : null}
    </div>
  )
}