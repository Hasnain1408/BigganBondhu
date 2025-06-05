"use client"

import { motion } from "framer-motion"
import VectorBasicsIndex from "./vector basic/vectorBasicsIndex"
import VectorOperationsIndex from "./vector operations/vectorOperationsIndex"
import VectorComponentIndex from "./vector components/vectorComponentIndex"



interface VectorContentPros {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function VectorContent({ topic }: VectorContentPros) {
 
  return (
    <div className="space-y-8">

     

      {topic.id === "vector-basics" ? (
        <VectorBasicsIndex />
      ) : null}
      {topic.id === "vector-operations" ? (
        <VectorOperationsIndex />
      ) : null}
      {topic.id === "vector-components" ? (
        <VectorComponentIndex />
      ) : null}
      
      
    </div>
    )

}