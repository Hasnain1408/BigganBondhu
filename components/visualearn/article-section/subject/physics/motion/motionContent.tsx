"use client"

import { motion } from "framer-motion"
import ProjectileMotionIndex from "./projectile motion/projectileMotionIndex"
import RelativeMotionIndex from "./relative motion/relativeMotionIndex"
import KinematicsIndex from "./kinematics/KinematicsIndex"

interface MotionContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function MotionContent({ topic }: MotionContentProps) {
 
  return (
    <div className="space-y-8">

      {topic.id === "kinematics" ? (
        <KinematicsIndex />
      ) : null}
      {topic.id === "projectile-motion" ? (
        <ProjectileMotionIndex />
      ) : null}
      {topic.id === "relative-motion" ? (
        <RelativeMotionIndex />
      ) : null}

    </div>
  )

}