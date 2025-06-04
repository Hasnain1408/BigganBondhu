"use client"

import MotionContent from "./motion/motionContent"
import ForceContent from "./force/forceContent"
import IntroductionContent from "./introduction/IntroductionContent"
import ElectricityContent from "./electricity/electricityContent"

interface PhysicsContentProps {
  chapter: string
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function PhysicsContent({ chapter, topic }: PhysicsContentProps) {
  return (
    <div className="space-y-8">
        {chapter === "introduction" ? (
            <IntroductionContent topic={topic} />
        ) : null}
        {chapter === "motion" ? (
            <MotionContent topic={topic} />
        ) : null} 
        {chapter === "force" ? (
            <ForceContent topic={topic} />
        ) : null} 
        {chapter === "electricity" ? (
            <ElectricityContent topic={topic} />
        ) : null}               
    </div>
  )
}