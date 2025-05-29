"use client"

import { motion } from "framer-motion"
import ProjectileMotionIndex from "./Projectile Motion/projectileMotionIndex"
import RelativeMotionIndex from "./Relative Motion/relativeMotionIndex"
import KinematicsIndex from "./Kinematics/KinematicsIndex"

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

      {topic.id === "projectile-motion" ? (
        <ProjectileMotionIndex />
      ) : null}

      {topic.id === "kinematics" ? (
        <KinematicsIndex />
      ) : null}
      {topic.id === "relative-motion" ? (
        <RelativeMotionIndex />
      ) : null}

    </div>  
    )        
       
}