"use client"

import PhysicsContent from "./article-section/subject/physics/physicsContent"
// import ChemistryContent from "./article-section/subject/chemistry/chemistryContent"
// import BiologyContent from "./article-section/subject/biology/biologyContent"
// import MathContent from "./article-section/subject/math/mathContent"
// import AstronomyContent from "./article-section/subject/astronomy/astronomyContent"

interface TopicContentProps {
  subject: string
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

export default function TopicContent({ subject, chapter, topic }: TopicContentProps) {
  return (
    <div className="space-y-8">
      {subject === "physics" ? (
        <PhysicsContent chapter={chapter} topic={topic} />
      ) : null}
      {/* {subject === "chemistry" ? (
        <ChemistryContent chapter={chapter} topic={topic} />
      ) : null}

      {subject === "biology" ? (
        <BiologyContent chapter={chapter} topic={topic} />
      ) : null}

      {subject === "math" ? (
        <MathContent chapter={chapter} topic={topic} />
      ) : null}

      {subject === "astronomy" ? (
        <AstronomyContent chapter={chapter} topic={topic} />
      ) : null} */}
    </div>
  )
}
