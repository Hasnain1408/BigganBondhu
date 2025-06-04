"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import KinematicsContent from "./KinematicsContent"
import KinematicsSimulation from "./KinematicsSimulation"
import KinematicsQuiz from "./KinematicsQuiz"

const topic = {
  title: {
    en: "Kinematics",
    bn: "কাইনেমেটিক্স"
  },
  description: {
    en: "Kinematics is a branch of physics that studies the motion of objects without considering the causes of motion, such as forces or acceleration.",
    bn: "কাইনেমেটিক্স হল পদার্থবিজ্ঞানের একটি শাখা যা বস্তুর গতি অধ্যয়ন করে, ত্বরণ বা বলের কারণ বিবেচনা না করে।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function KinematicsIndex() {
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
                <KinematicsContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <KinematicsSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <KinematicsQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}