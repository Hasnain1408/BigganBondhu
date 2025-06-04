"use client"

import { motion } from "framer-motion"
import ElectricChargeIndex from "./electirc charge/electricChargeIndex"
import ElectricFieldIndex from "./electric field/electricFieldIndex"
import ElectricPotentialIndex from "./electric potential/electricPotentialIndex"
import ElectricForceIndex from "./electric force/electricForceIndex"
import ElectricCapacitanceIndex from "./electric capacitance/electricCapacitanceIndex"


interface ElectricityContent {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ElectricityContent({ topic }: ElectricityContent) {
 
  return (
    <div className="space-y-8">

      {topic.id === "electric-charge" ? (
        <ElectricChargeIndex />
      ) : null}

      {topic.id === "electric-field" ? (
        <ElectricFieldIndex />
      ) : null}
      {topic.id === "electric-potential" ? (
        <ElectricPotentialIndex />
      ) : null}
      {topic.id === "electric-force" ? (
        <ElectricForceIndex />
      ) : null}
      {topic.id === "electric-capacitance" ? (
        <ElectricCapacitanceIndex />
      ) : null}
      
    </div>
    )

}