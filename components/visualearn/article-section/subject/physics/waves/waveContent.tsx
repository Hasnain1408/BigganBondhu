"use client"

import { motion } from "framer-motion"
import WavePropertiesIndex from "./wave properties/wavePropertiesIndex"
import SoundWaveIndex from "./sound waves/soundWaveIndex"
import LightWaveIndex from "./light waves/lightWaveIndex"


interface WaveContentPros {
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function WaveContent({ topic }: WaveContentPros) {
 
  return (
    <div className="space-y-8">

     

      {topic.id === "wave-properties" ? (
        <WavePropertiesIndex />
      ) : null}
      {topic.id === "sound-waves" ? (
        <SoundWaveIndex />
      ) : null}
      {topic.id === "light-waves" ? (
        <LightWaveIndex />
      ) : null}
      
      
    </div>
    )

}