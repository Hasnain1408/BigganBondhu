"use client"

import { motion } from "framer-motion"
import ClassificationOfMatterIndex from "./matter classification/classificationOfMatterIndex"
import ScientificMeasurementIndex from "./scientific measurement/scientificMeasurementIndex"
import PhysicalVsChemChangesIndex from "./physical chemical changes/physicalVsChemChangesIndex"


interface IntroChemistryContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function IntroChemistryContent({ topic }: IntroChemistryContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "matter-classification" ? (
        <ClassificationOfMatterIndex />
      ) : null}

      {topic.id === "physical-chemical-changes" ? (
        <PhysicalVsChemChangesIndex />
      ) : null}

      {topic.id === "scientific-measurement" ? (
        <ScientificMeasurementIndex />
      ) : null}
    </div>
  )
}