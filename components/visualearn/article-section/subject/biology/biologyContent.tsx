"use client"

import HumanPhysiologyContent from "./human physiology/humanPhysiologyContent"
import BiochemistryContent from "./biochemistry/biochemistryContent"
import EcologyContent from "./ecology/ecologyContent"
import GeneticsContent from "./genetics/geneticsContent"
import MicrobiologyContent from "./microbiology/microbiologyContent"
import PlantBiologyContent from "./plant biology/plantBiologyContent"


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
        {/* {chapter === "cell-biology" ? (
          <CellBiologyContent topic={topic} />
        ) : null} */}
        {chapter === "ecology" ? (
          <EcologyContent topic={topic} />
        ) : null}
        {chapter === "human-physiology" ? (
          <HumanPhysiologyContent topic={topic} />
        ) : null}
        {chapter === "plant-biology" ? (
          <PlantBiologyContent topic={topic} />
        ) : null}
        {chapter === "biochemistry" ? (
          <BiochemistryContent topic={topic} />
        ) : null}

    </div>
  )
}