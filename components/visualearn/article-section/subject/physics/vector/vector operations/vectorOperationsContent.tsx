// File: components/topics/physics/vectors/vectorOperationsContent.tsx

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function VectorOperationsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `ভেক্টর অপারেশন পদার্থবিজ্ঞানের একটি গুরুত্বপূর্ণ অংশ, যার মাধ্যমে বিভিন্ন ভৌত রাশির গাণিতিক বিশ্লেষণ করা হয়।

মূল বিষয়বস্তু:
- ভেক্টর ও স্কেলার পার্থক্য
- ভেক্টরের উপাদান
- যোগ ও বিয়োগ
- ডট প্রোডাক্ট
- ক্রস প্রোডাক্ট

ভেক্টর যোগের দুটি পদ্ধতি:
1. টিপ-টু-টেল (Tip-to-tail)
2. সমান্তরাল চতুর্ভুজ (Parallelogram method)

গাণিতিক সংজ্ঞা:
- যোগ: \vec{A} + \vec{B} = (A_x + B_x)\hat{i} + (A_y + B_y)\hat{j}
- বিয়োগ: \vec{A} - \vec{B} = \vec{A} + (-\vec{B})
- ডট প্রোডাক্ট: \vec{A} \cdot \vec{B} = ABcos\theta
- ক্রস প্রোডাক্ট: \vec{A} \times \vec{B} = ABsin\theta \hat{n}`
      : `Vector operations are a foundational aspect of physics, enabling the analysis of physical quantities with both magnitude and direction.

Key concepts include:
- Difference between scalar and vector quantities
- Vector components
- Addition and subtraction
- Dot product
- Cross product

Two main methods for vector addition:
1. Tip-to-tail method
2. Parallelogram method

Mathematical definitions:
- Addition: \vec{A} + \vec{B} = (A_x + B_x)\hat{i} + (A_y + B_y)\hat{j}
- Subtraction: \vec{A} - \vec{B} = \vec{A} + (-\vec{B})
- Dot product: \vec{A} \cdot \vec{B} = ABcos\theta
- Cross product: \vec{A} \times \vec{B} = ABsin\theta \hat{n}`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "ভেক্টর অপারেশন" : "Vector Operations"}
            </h3>

            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "ভেক্টর অপারেশন পদার্থবিজ্ঞানে বিভিন্ন ভৌত রাশির বিশ্লেষণের জন্য অপরিহার্য।"
                  : "Vector operations are essential for analyzing physical quantities in physics."}
              </p>
              <ul className="list-disc list-inside">
                <li>{lang === "bn" ? "ভেক্টর: দিক ও মান আছে" : "Vector: has both magnitude and direction"}</li>
                <li>{lang === "bn" ? "স্কেলার: শুধু মান আছে" : "Scalar: has only magnitude"}</li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ভেক্টরের উপাদান" : "Vector Components"}
            </h4>
            <p className="text-sm">
              {lang === "bn"
                ? "প্রতিটি ভেক্টরকে x এবং y উপাদানে ভাগ করা যায়: A = Aₓî + Aᵧĵ"
                : "Each vector can be resolved into x and y components: A = Aₓî + Aᵧĵ"}
            </p>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "গাণিতিক অপারেশনসমূহ" : "Mathematical Operations"}
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>{lang === "bn" ? "যোগ: দুটি ভেক্টরের উপাদান যোগ করে" : "Addition: add the components of two vectors"}</li>
              <li>{lang === "bn" ? "বিয়োগ: একটিকে ঋণাত্মক করে যোগ করা" : "Subtraction: add the negative of the vector"}</li>
              <li>{lang === "bn" ? "ডট প্রোডাক্ট: স্কেলার ফলাফল (ABcosθ)" : "Dot Product: scalar result (ABcosθ)"}</li>
              <li>{lang === "bn" ? "ক্রস প্রোডাক্ট: ভেক্টর ফলাফল (ABsinθn̂)" : "Cross Product: vector result (ABsinθn̂)"}</li>
            </ul>
          </div>
          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

        <LanguageToggle lang={lang} setLang={setLang} />
        <TopicChatbot />
      </CardContent>
    </Card>
  )
}
