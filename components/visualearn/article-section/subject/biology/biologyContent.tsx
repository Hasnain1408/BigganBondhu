"use client"

import GeneticsContent from "./genetics/geneticsContent"
import MicrobiologyContent from "./microbiology/microbiologyContent"


interface BiologyContentProps {
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

export default function BiologyContent({ chapter, topic }: BiologyContentProps) {
  return (
    <div className="space-y-8">
        {chapter === "genetics" ? (
            <GeneticsContent topic={topic} />
        ) : null} 
        {chapter === "microbiology" ? (
          <MicrobiologyContent topic={topic} />
        ) : null}

    </div>
  )
}