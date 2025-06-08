"use client"

import { motion } from "framer-motion"
import PhotosynthesisIndex from "./photosynthesis/photosynthesisIndex"
import PlantStructureIndex from "./plant structure/plantStructureIndex"
import PlantReproductionIndex from "./plant reproduction/plantReproductionIndex"

interface PlantBiologyContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function PlantBiologyContent({ topic }: PlantBiologyContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "photosynthesis" ? (
        <PhotosynthesisIndex />
      ) : null}

      {topic.id === "plant-structure" ? (
        <PlantStructureIndex />
      ) : null}

      {topic.id === "plant-reproduction" ? (
        <PlantReproductionIndex />
      ) : null}
    </div>
  )
}
