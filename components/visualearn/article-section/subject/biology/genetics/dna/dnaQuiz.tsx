// dnaStructureQuiz.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizContent } from "../../../../quiz/types";
import QuizControls from "../../../../quiz/quizControls";

const quizData: QuizContent = {
  title: {
    en: "DNA Structure Quiz",
    bn: "ডিএনএ গঠন কুইজ"
  },
  subtitle: {
    en: "Test your knowledge of molecular genetics",
    bn: "আপনার আণবিক জিনতত্ত্ব জ্ঞান পরীক্ষা করুন"
  },
  questions: [
    {
      question: {
        en: "What are the two types of nitrogenous bases in DNA?",
        bn: "ডিএনএ-তে নাইট্রোজেনাস বেসের দুই প্রকার কী কী?"
      },
      options: [
        { en: "Purines and Pyrimidines", bn: "পিউরিন এবং পাইরিমিডিন" },
        { en: "Amino acids and Sugars", bn: "অ্যামিনো অ্যাসিড এবং শর্করা" },
        { en: "Proteins and Lipids", bn: "প্রোটিন এবং লিপিড" },
        { en: "Ribose and Deoxyribose", bn: "রাইবোজ এবং ডিঅক্সিরাইবোজ" }
      ],
      answer: 0,
      explanation: {
        en: "DNA contains purines (Adenine, Guanine) and pyrimidines (Cytosine, Thymine).",
        bn: "ডিএনএ-তে পিউরিন (অ্যাডেনিন, গুয়ানিন) এবং পাইরিমিডিন (সাইটোসিন, থাইমিন) থাকে।"
      }
    },
    {
      question: {
        en: "Which scientist(s) discovered the double helix structure of DNA?",
        bn: "কোন বিজ্ঞানী(গণ) ডিএনএ-এর ডাবল হেলিক্স গঠন আবিষ্কার করেছিলেন?"
      },
      options: [
        { en: "Watson and Crick", bn: "ওয়াটসন এবং ক্রিক" },
        { en: "Gregor Mendel", bn: "গ্রেগর মেন্ডেল" },
        { en: "Rosalind Franklin", bn: "রোজালিন্ড ফ্রাঙ্কলিন" },
        { en: "Charles Darwin", bn: "চার্লস ডারউইন" }
      ],
      answer: 0,
      explanation: {
        en: "James Watson and Francis Crick proposed the double helix model in 1953, with key contributions from Rosalind Franklin's X-ray diffraction data.",
        bn: "জেমস ওয়াটসন এবং ফ্রান্সিস ক্রিক ১৯৫৩ সালে ডাবল হেলিক্স মডেল প্রস্তাব করেছিলেন, রোজালিন্ড ফ্রাঙ্কলিনের এক্স-রে ডিফ্র্যাকশন ডেটার গুরুত্বপূর্ণ অবদান সহ।"
      }
    },
    {
      question: {
        en: "What type of bond connects the two strands of DNA?",
        bn: "কোন ধরনের বন্ড ডিএনএ-এর দুই স্ট্র্যান্ডকে সংযুক্ত করে?"
      },
      options: [
        { en: "Hydrogen bonds", bn: "হাইড্রোজেন বন্ড" },
        { en: "Covalent bonds", bn: "সমযোজী বন্ড" },
        { en: "Ionic bonds", bn: "আয়নিক বন্ড" },
        { en: "Peptide bonds", bn: "পেপটাইড বন্ড" }
      ],
      answer: 0,
      explanation: {
        en: "Weak hydrogen bonds between A-T (2 bonds) and G-C (3 bonds) hold the strands together.",
        bn: "A-T (2টি বন্ড) এবং G-C (3টি বন্ড) এর মধ্যে দুর্বল হাইড্রোজেন বন্ড স্ট্র্যান্ডগুলিকে একসাথে ধরে রাখে।"
      }
    },
    {
      question: {
        en: "Which component forms the 'backbone' of DNA?",
        bn: "ডিএনএ-এর 'ব্যাকবোন' গঠন করে কোন উপাদান?"
      },
      options: [
        { en: "Sugar and Phosphate", bn: "শর্করা এবং ফসফেট" },
        { en: "Nitrogenous bases", bn: "নাইট্রোজেনাস বেস" },
        { en: "Amino acids", bn: "অ্যামিনো অ্যাসিড" },
        { en: "Lipid molecules", bn: "লিপিড অণু" }
      ],
      answer: 0,
      explanation: {
        en: "Deoxyribose sugar and phosphate groups alternate to form the structural backbone.",
        bn: "ডিঅক্সিরাইবোজ শর্করা এবং ফসফেট গ্রুপ পর্যায়ক্রমে গঠনগত ব্যাকবোন গঠন করে।"
      }
    },
    {
      question: {
        en: "If one DNA strand has the sequence 5'-AGCT-3', what is the complementary strand?",
        bn: "যদি একটি ডিএনএ স্ট্র্যান্ডের ক্রম 5'-AGCT-3' হয়, তাহলে পরিপূরক স্ট্র্যান্ড কী হবে?"
      },
      options: [
        { en: "3'-TCGA-5'", bn: "3'-TCGA-5'" },
        { en: "5'-TCGA-3'", bn: "5'-TCGA-3'" },
        { en: "3'-AGCT-5'", bn: "3'-AGCT-5'" },
        { en: "5'-AGCT-3'", bn: "5'-AGCT-3'" }
      ],
      answer: 0,
      explanation: {
        en: "DNA strands are antiparallel and complementary: A pairs with T, G pairs with C.",
        bn: "ডিএনএ স্ট্র্যান্ডগুলি অ্যান্টিপ্যারালেল এবং পরিপূরক: A, T-এর সাথে এবং G, C-এর সাথে জোড়া বাঁধে।"
      }
    }
  ]
};

export default function DNAQuiz() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Biology Quiz</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <QuizControls quizData={quizData} />
        </CardContent>
      </Card>
    </div>
  );
}