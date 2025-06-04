"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import ElectricForceContent from './electricForceContent'
import ElectricForceSimulation from './electricForceSimulation'
import ElectricForceQuiz from './electricForceQuiz'

const topic = {
  title: "Electric Force",
  description: "Electric force is the attractive or repulsive force between charged particles, governed by Coulomb's law.",
  content: "...",
  hasSimulation: true,
  hasQuiz: true
}

export default function ElectricForceIndex() {
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
                                <ElectricForceContent />                      
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="visualization" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <ElectricForceSimulation />
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Card>
                            <CardContent className="pt-6">
                                <ElectricForceQuiz />
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    )
}