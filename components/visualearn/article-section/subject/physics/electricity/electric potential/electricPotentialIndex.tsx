// File: components/topics/physics/electricity/electric-potential/index.tsx

"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import ElectricPotentialContent from './electricPotentialContent'
import ElectricPotentialSimulation from './electricPotentialSimulation'
import ElectricPotentialQuiz from './electricPotentialQuiz'

const topic = {
  title: "Electric Potential",
  description: "Electric potential is the work done per unit positive charge in bringing it from infinity to a specific point in an electric field.",
  content: "...",
  hasSimulation: true,
  hasQuiz: true
}

export default function ElectricPotentialIndex() {
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
                                <ElectricPotentialContent />                      
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="visualization" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <ElectricPotentialSimulation />
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                 <TabsContent value="quiz" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <ElectricPotentialQuiz />
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    )
}