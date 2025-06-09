
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import PolymersContent from './polymersContent'
import PolymersSimulation from './polymersSimulation'
import PolymersQuiz from './polymersQuiz'

const topic = {
  title: {
    en: "Polymers",
    bn: "পলিমার"
  },
  description: {
    en: "Polymers are large molecules made up of repeating subunits called monomers, used in plastics, fibers, and more.",
    bn: "পলিমার হল বড় অণু যা মনোমার নামক পুনরাবৃত্তি সাবইউনিট দিয়ে তৈরি, যা প্লাস্টিক, ফাইবার ইত্যাদিতে ব্যবহৃত হয়।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function PolymersIndex() {
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
                <PolymersContent />
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
                <PolymersSimulation />
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
                <PolymersQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
