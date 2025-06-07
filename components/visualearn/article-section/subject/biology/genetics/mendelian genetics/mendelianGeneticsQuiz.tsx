"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizContent } from "../../../../quiz/types"
import QuizControls from "../../../../quiz/quizControls"

const quizData: QuizContent = {
  title: {
    en: "Mendelian Genetics Quiz",
    bn: "মেন্ডেলীয় জেনেটিক্স কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of Mendelian inheritance",
    bn: "মেন্ডেলীয় উত্তরাধিকার সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "In a monohybrid cross between two heterozygous parents (Aa × Aa), what is the phenotypic ratio of the offspring?",
        bn: "দুটি হেটেরোজাইগাস পিতামাতার (Aa × Aa) মধ্যে একটি মনোহাইব্রিড সংকরে সন্তানদের ফিনোটাইপ অনুপাত কী?"
      },
      options: [
        { en: "1:1", bn: "1:1" },
        { en: "3:1", bn: "3:1" },
        { en: "1:2:1", bn: "1:2:1" },
        { en: "9:3:3:1", bn: "9:3:3:1" }
      ],
      answer: 1,
      explanation: {
        en: "In a monohybrid cross (Aa × Aa), the phenotypic ratio is 3 dominant (AA, Aa) to 1 recessive (aa), resulting in a 3:1 ratio.",
        bn: "একটি মনোহাইব্রিড সংকরে (Aa × Aa), ফিনোটাইপ অনুপাত হল 3 প্রকট (AA, Aa) এবং 1 প্রচ্ছন্ন (aa), ফলে 3:1 অনুপাত।"
      }
    },
    {
      question: {
        en: "What does Mendel’s Law of Segregation state?",
        bn: "মেন্ডেলের পৃথকীকরণের নীতি কী বলে?"
      },
      options: [
        { en: "Traits are inherited independently", bn: "বৈশিষ্ট্যগুলি স্বাধীনভাবে উত্তরাধিকার সূত্রে প্রাপ্ত হয়" },
        { en: "Alleles segregate during gamete formation", bn: "গ্যামেট গঠনের সময় অ্যালিলগুলি পৃথক হয়" },
        { en: "Dominant alleles mask recessive ones", bn: "প্রকট অ্যালিল প্রচ্ছন্ন অ্যালিলকে মাস্ক করে" },
        { en: "Genes are linked on chromosomes", bn: "জিনগুলি ক্রোমোজোমে সংযুক্ত থাকে" }
      ],
      answer: 1,
      explanation: {
        en: "The Law of Segregation states that during gamete formation, the two alleles for a trait segregate, so each gamete carries only one allele.",
        bn: "পৃথকীকরণের নীতি বলে যে গ্যামেট গঠনের সময়, একটি বৈশিষ্ট্যের জন্য দুটি অ্যালিল পৃথক হয়, তাই প্রতিটি গ্যামেট শুধুমাত্র একটি অ্যালিল বহন করে।"
      }
    },
    {
      question: {
        en: "In a dihybrid cross (AaBb × AaBb), what is the phenotypic ratio of the offspring?",
        bn: "একটি ডাইহাইব্রিড সংকরে (AaBb × AaBb), সন্তানদের ফিনোটাইপ অনুপাত কী?"
      },
      options: [
        { en: "1:2:1", bn: "1:2:1" },
        { en: "3:1", bn: "3:1" },
        { en: "9:3:3:1", bn: "9:3:3:1" },
        { en: "1:1:1:1", bn: "1:1:1:1" }
      ],
      answer: 2,
      explanation: {
        en: "In a dihybrid cross (AaBb × AaBb), the phenotypic ratio is 9:3:3:1 for the combinations of two traits, according to the Law of Independent Assortment.",
        bn: "একটি ডাইহাইব্রিড সংকরে (AaBb × AaBb), ফিনোটাইপ অনুপাত হল 9:3:3:1, স্বাধীন সংযোজনের নীতি অনুসারে।"
      }
    },
    {
      question: {
        en: "A homozygous dominant (AA) individual is crossed with a homozygous recessive (aa) individual. What is the genotype of the offspring?",
        bn: "একটি হোমোজাইগাস প্রকট (AA) ব্যক্তি একটি হোমোজাইগাস প্রচ্ছন্ন (aa) ব্যক্তির সাথে সংকরিত হয়। সন্তানদের জিনোটাইপ কী?"
      },
      options: [
        { en: "All AA", bn: "সব AA" },
        { en: "All Aa", bn: "সব Aa" },
        { en: "All aa", bn: "সব aa" },
        { en: "1 AA : 1 aa", bn: "1 AA : 1 aa" }
      ],
      answer: 1,
      explanation: {
        en: "When a homozygous dominant (AA) is crossed with a homozygous recessive (aa), all offspring are heterozygous (Aa) because each parent contributes one allele.",
        bn: "যখন একটি হোমোজাইগাস প্রকট (AA) একটি হোমোজাইগাস প্রচ্ছন্ন (aa) এর সাথে সংকরিত হয়, সব সন্তান হেটেরোজাইগাস (Aa) হয় কারণ প্রতিটি পিতামাতা একটি অ্যালিল প্রদান করে।"
      }
    },
    {
      question: {
        en: "Which term describes an organism with two identical alleles for a trait?",
        bn: "কোন পদটি একটি বৈশিষ্ট্যের জন্য দুটি একই অ্যালিল বিশিষ্ট জীবকে বর্ণনা করে?"
      },
      options: [
        { en: "Heterozygous", bn: "হেটেরোজাইগাস" },
        { en: "Homozygous", bn: "হোমোজাইগাস" },
        { en: "Genotype", bn: "জিনোটাইপ" },
        { en: "Phenotype", bn: "ফিনোটাইপ" }
      ],
      answer: 1,
      explanation: {
        en: "Homozygous describes an organism with two identical alleles for a trait (e.g., AA or aa), while heterozygous refers to two different alleles (e.g., Aa).",
        bn: "হোমোজাইগাস একটি জীবকে বর্ণনা করে যার একটি বৈশিষ্ট্যের জন্য দুটি একই অ্যালিল রয়েছে (যেমন, AA বা aa), যখন হেটেরোজাইগাস দুটি ভিন্ন অ্যালিলকে নির্দেশ করে (যেমন, Aa)।"
      }
    }
  ]
}

export default function MendelianGeneticsQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            {quizData.title.en}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  )
}