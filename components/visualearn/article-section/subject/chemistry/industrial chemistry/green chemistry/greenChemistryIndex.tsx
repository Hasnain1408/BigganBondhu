
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import GreenChemistryContent from "./greenChemistryContent"
import GreenChemistrySimulation from "./greenChemistrySimulation"
import GreenChemistryQuiz from "./greenChemistryQuiz"


const topic = {
  title: {
    en: "Green Chemistry",
    bn: "সবুজ রসায়ন"
  },
  description: {
    en: "Green Chemistry focuses on designing chemical processes to reduce environmental impact and promote sustainability.",
    bn: "সবুজ রসায়ন পরিবেশের প্রভাব কমাতে এবং স্থায়িত্ব প্রচারের জন্য রাসায়নিক প্রক্রিয়া ডিজাইনের উপর গুরুত্ব দেয়।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function GreenChemistryIndex() {
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
                <GreenChemistryContent />
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
                <GreenChemistrySimulation />
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
                <GreenChemistryQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
