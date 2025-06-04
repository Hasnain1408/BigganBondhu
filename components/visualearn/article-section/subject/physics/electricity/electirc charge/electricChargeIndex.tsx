// File: components/topics/physics/electricity/electric-charge/index.tsx

"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import ElectricChargeContent from './electricChargeContent'
import ElectricChargeSimulation from './electricChargeSimulation'
import ElectricChargeQuiz from './electricChargeQuiz'

const topic = {
  title: "Electric Charge",
  description: "Electric charge is a fundamental property of matter that is the source of electric and magnetic forces.",
  content: "...",
  hasSimulation: true,
  hasQuiz: true
}

export default function ElectricChargeIndex() {
    return (
        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="text-center space-y-4"
            >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Electric Charge
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Explore the fundamental property of matter that creates electric and magnetic forces. 
                    Learn about charge interactions, Coulomb's law, and electric fields through interactive simulations.
                </p>
            </motion.div>

            <Tabs defaultValue="description" className="space-y-4">
                <TabsList className="grid grid-cols-3 max-w-md mx-auto">
                    <TabsTrigger value="description" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="hidden sm:inline">Description</span>
                    </TabsTrigger>
                    <TabsTrigger value="visualization" className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        <span className="hidden sm:inline">Simulation</span>
                    </TabsTrigger>
                    <TabsTrigger value="quiz" className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Quiz</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <ElectricChargeContent />                      
                    </motion.div>
                </TabsContent>

                <TabsContent value="visualization" className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <div className="space-y-4">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-semibold">Interactive Electric Charge Simulation</h2>
                                <p className="text-muted-foreground">
                                    Place charges, observe forces, and visualize electric fields in real-time
                                </p>
                            </div>
                            <ElectricChargeSimulation />
                        </div>
                    </motion.div>
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <div className="space-y-4">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-semibold">Test Your Knowledge</h2>
                                <p className="text-muted-foreground">
                                    Challenge yourself with questions about electric charge and fundamental concepts
                                </p>
                            </div>
                            <ElectricChargeQuiz />
                        </div>
                    </motion.div>
                </TabsContent>
            </Tabs>

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-center text-sm text-muted-foreground"
            >
                <p>
                    💡 <strong>Pro Tip:</strong> Start with the description to understand the concepts, 
                    then use the simulation to see them in action, and finally test your knowledge with the quiz!
                </p>
            </motion.div>
        </div>
    )
}