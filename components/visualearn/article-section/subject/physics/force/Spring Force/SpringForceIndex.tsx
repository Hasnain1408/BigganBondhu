"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import SpringForceContent from "./SpringForceContent"
import SpringForceSimulation from "./SpringForceSimulation"
import SpringForceQuiz from "./SpringForceQuiz"

const topic = {
  title: {
    en: "Spring Force",
    bn: "স্প্রিং বল"
  },
  description: {
    en: "Spring force is the force exerted by a spring, proportional to its deformation according to Hooke's Law.",
    bn: "স্প্রিং বল হল একটি স্প্রিংয়ের দ্বারা প্রযুক্ত বল যা হুকের সূত্র অনুসারে তার বিকৃতির সমানুপাতিক।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function SpringForceIndex() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="description" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            {lang === "bn" ? "বর্ণনা" : "Description"}
          </TabsTrigger>
          <TabsTrigger value="visualization" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            {lang === "bn" ? "ভিজ্যুয়ালাইজেশন" : "Visualization"}
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            {lang === "bn" ? "কুইজ" : "Quiz"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <SpringForceContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <SpringForceSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <SpringForceQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}