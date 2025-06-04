"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import NewtonsLawsContent from "./NewtonsLawsContent"
import NewtonsLawsSimulation from "./NewtonsLawsSimulation"
import NewtonsLawsQuiz from "./NewtonsLawsQuiz"

const topic = {
  title: {
    en: "Newton's Laws of Motion",
    bn: "নিউটনের গতিসূত্র"
  },
  description: {
    en: "Newton's Laws of Motion describe the relationship between the motion of an object and the forces acting on it in physics.",
    bn: "নিউটনের গতিসূত্রগুলি পদার্থবিজ্ঞানে বস্তুর গতি এবং বলের সম্পর্ক বর্ণনা করে।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function NewtonsLawsIndex() {
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
                <NewtonsLawsContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <NewtonsLawsSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <NewtonsLawsQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}