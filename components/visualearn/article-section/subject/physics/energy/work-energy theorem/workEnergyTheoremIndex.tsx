
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import WorkEnergyTheoremContent from './workEnergyTheoremContent'
import WorkEnergyTheoremSimulation from './workEnergyTheoremSimulation'
import WorkEnergyTheoremQuiz from './workEnergyTheoremQuiz'

const topic = {
  title: {
    en: "Work-Energy Theorem",
    bn: "কার্য-শক্তি উপপাদ্য"
  },
  description: {
    en: "The Work-Energy Theorem states that the net work done on an object equals the change in its kinetic energy.",
    bn: "কার্য-শক্তি উপপাদ্য বলে যে কোনো বস্তুর উপর কৃত নেট কার্য তার গতিশক্তির পরিবর্তনের সমান।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function WorkEnergyTheoremIndex() {
  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center">
          {topic.title.en}
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          {topic.description.en}
        </p>
      </motion.div>

      <Tabs defaultValue="description" className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <TabsTrigger 
            value="description" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
          >
            <BookOpen className="h-4 w-4" />
            Description
          </TabsTrigger>
          <TabsTrigger 
            value="visualization" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
          >
            <BarChart className="h-4 w-4" />
            Visualization
          </TabsTrigger>
          <TabsTrigger 
            value="quiz" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
          >
            <HelpCircle className="h-4 w-4" />
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <WorkEnergyTheoremContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <WorkEnergyTheoremSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <WorkEnergyTheoremQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
