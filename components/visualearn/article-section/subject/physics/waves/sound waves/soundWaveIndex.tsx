// File: components/topics/physics/waves/sound-wave/index.tsx

"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import SoundWaveContent from './soundWaveContent'
import SoundWaveSimulation from './soundWaveSimulation'
import SoundWaveQuiz from './soundWaveQuiz'

const topic = {
  title: "Sound Wave",
  description: "Sound waves are longitudinal mechanical waves that propagate through compression and rarefaction of particles in a medium.",
  content: "...",
  hasSimulation: true,
  hasQuiz: true
}

export default function SoundWaveIndex() {
    return (
        <div className="space-y-6">
            <Tabs defaultValue="description" className="space-y-4">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="description" className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Description
                    </TabsTrigger>
                    <TabsTrigger value="visualization" className="flex items-center">
                        <BarChart className="h-4 w-4 mr-2" />
                        Visualization
                    </TabsTrigger>
                    <TabsTrigger value="quiz" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Quiz
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <SoundWaveContent />                      
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="visualization" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <SoundWaveSimulation />
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                 <TabsContent value="quiz" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <SoundWaveQuiz />
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    )
}