"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import RelativeMotionContent from "./relativeMotionContent"
import RelativeMotionSimulation from "./relativeMotionSimulation"
import RelativeMotionQuiz from "./relativeMotionQuiz"

const topic = {
  title: {
    en: "Relative Motion",
    bn: "আপেক্ষিক গতি"
  },
  description: {
    en: "Relative motion is the motion of an object observed with respect to another object, called the reference frame.",
    bn: "আপেক্ষিক গতি হল একটি বস্তুর গতি যা অন্য বস্তুর তুলনায় পর্যবেক্ষণ করা হয়, যাকে রেফারেন্স ফ্রেম বলা হয়।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function RelativeMotionIndex() {
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
                <RelativeMotionContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <RelativeMotionSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <RelativeMotionQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}