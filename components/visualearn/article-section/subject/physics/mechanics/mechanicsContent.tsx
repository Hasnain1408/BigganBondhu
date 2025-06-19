"use client"

import { motion } from "framer-motion"
import RigidBodyDynamicsIndex from "./rigid body dynamics/rigidBodyDynamicsIndex"
import RotationalMotionIndex from "./rotational motion/rotationalMotionIndex"
import FluidMechanicsIndex from "./fluid mechanics/fluidMechanicsIndex"
import OscillationsIndex from "./oscillations/oscillationsIndex"
import LagrangianMechanicsIndex from "./lagrangian mechanics/lagrangianMechanicsIndex"

interface MechanicsContentProps {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function MechanicsContent({ topic }: MechanicsContentProps) {
  return (
    <div className="space-y-8">
      {topic.id === "rigid-body-dynamics" ? (
        <RigidBodyDynamicsIndex />
      ) : null}

      {topic.id === "rotational-motion" ? (
        <RotationalMotionIndex />
      ) : null}

      {topic.id === "fluid-mechanics" ? (
        <FluidMechanicsIndex />
      ) : null}

      {topic.id === "oscillations" ? (
        <OscillationsIndex />
      ) : null}

      {topic.id === "lagrangian-mechanics" ? (
        <LagrangianMechanicsIndex />
      ) : null}
    </div>
  )
}