"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import FrictionContent from "./FrictionContent"
import FrictionSimulation from "./FrictionSimulation"
import FrictionQuiz from "./FrictionQuiz"

const topic = {
  title: {
    en: "Friction",
    bn: "ঘর্ষণ"
  },
  description: {
    en: "Friction is the force that opposes motion between two surfaces in contact.",
    bn: "ঘর্ষণ হল দুটি পৃষ্ঠের মধ্যে সংস্পর্শে থাকা অবস্থায় গতির বিরোধিতা করা বল।"
  },
  hasSimulation: true,
  hasQuiz: true
}

export default function FrictionIndex() {
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
                <FrictionContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <FrictionSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <FrictionQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}