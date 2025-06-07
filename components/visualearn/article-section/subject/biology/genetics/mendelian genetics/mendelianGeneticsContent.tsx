"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function MendelianGeneticsContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `মেন্ডেলীয় জেনেটিক্স হল জিনগত উত্তরাধিকারের নীতি যা গ্রেগর মেন্ডেল প্রতিষ্ঠা করেন।
মূল নীতি:
- পৃথকীকরণের নীতি
- স্বাধীন সংযোজনের নীতি
- প্রাধান্যের নীতি
জিনগত পদ:
- অ্যালিল
- হোমোজাইগাস
- হেটেরোজাইগাস
- জিনোটাইপ
- ফিনোটাইপ
প্রাধান্য:
- প্রকট (ডমিন্যান্ট)
- প্রচ্ছন্ন (রিসেসিভ)`
      : `Mendelian Genetics is the study of inheritance patterns established by Gregor Mendel.
Key Principles:
- Law of Segregation
- Law of Independent Assortment
- Law of Dominance
Genetic Terms:
- Allele
- Homozygous
- Heterozygous
- Genotype
- Phenotype
Dominance:
- Dominant
- Recessive`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "মেন্ডেলীয় জেনেটিক্স" : "Mendelian Genetics"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "মেন্ডেলীয় জেনেটিক্স হল জিনগত উত্তরাধিকারের নীতিগুলির অধ্যয়ন, যা ১৯শ শতাব্দীতে গ্রেগর মেন্ডেল তার মটর গাছের পরীক্ষার মাধ্যমে প্রতিষ্ঠা করেন। এই নীতিগুলি ব্যাখ্যা করে কীভাবে বৈশিষ্ট্যগুলি পিতামাতা থেকে সন্তানদের মধ্যে প্রেরিত হয়।"
                  : "Mendelian Genetics is the study of inheritance patterns, established by Gregor Mendel in the 19th century through his experiments with pea plants. These principles explain how traits are passed from parents to offspring."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concept"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "মেন্ডেলের পরীক্ষাগুলি প্রমাণ করেছে যে জিনগত বৈশিষ্ট্যগুলি পৃথক ইউনিট হিসেবে উত্তরাধিকার সূত্রে প্রাপ্ত হয়, যা এখন আমরা জিন হিসেবে জানি। এই জিনগুলি বিভিন্ন রূপে (অ্যালিল) থাকে এবং নির্দিষ্ট নিয়ম অনুসারে প্রজন্মের মধ্যে প্রেরিত হয়।"
                    : "Mendel’s experiments demonstrated that genetic traits are inherited as discrete units, now known as genes. These genes exist in different forms (alleles) and are passed down through generations according to specific rules."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "মেন্ডেলের নীতিসমূহ" : "Mendel’s Laws"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {lang === "bn" ? "পৃথকীকরণের নীতি" : "Law of Segregation"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "প্রতিটি বৈশিষ্ট্যের জন্য, একটি জীব দুটি অ্যালিল পায়, এবং এই অ্যালিলগুলি গ্যামেট গঠনের সময় পৃথক হয়।"
                      : "For each trait, an organism inherits two alleles, and these alleles segregate during gamete formation."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    {lang === "bn" ? "স্বাধীন সংযোজনের নীতি" : "Law of Independent Assortment"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "বিভিন্ন বৈশিষ্ট্যের জিনগুলি একে অপরের থেকে স্বাধীনভাবে উত্তরাধিকার সূত্রে প্রাপ্ত হয়।"
                      : "Genes for different traits are inherited independently of each other."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    {lang === "bn" ? "প্রাধান্যের নীতি" : "Law of Dominance"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn"
                      ? "যখন দুটি ভিন্ন অ্যালিল উপস্থিত থাকে, তখন প্রকট অ্যালিল প্রচ্ছন্ন অ্যালিলের উপর প্রভাব ফেলে।"
                      : "When two different alleles are present, the dominant allele masks the recessive allele."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "জিনগত পদ" : "Genetic Terms"}
            </h4>
            
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
              <p className="text-purple-700 dark:text-purple-300">
                {lang === "bn"
                  ? "মেন্ডেলীয় জেনেটিক্স বোঝার জন্য কিছু মৌলিক পদ জানা প্রয়োজন।"
                  : "Understanding Mendelian Genetics requires familiarity with key genetic terms."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "অ্যালিল" : "Allele"}</p>
                  <p className="text-sm">{lang === "bn" ? "একটি জিনের বিভিন্ন রূপ।" : "Different forms of a gene."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "জিনোটাইপ" : "Genotype"}</p>
                  <p className="text-sm">{lang === "bn" ? "একটি জীবের জিনগত গঠন।" : "The genetic makeup of an organism."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "ফিনোটাইপ" : "Phenotype"}</p>
                  <p className="text-sm">{lang === "bn" ? "জিনোটাইপের দৃশ্যমান বৈশিষ্ট্য।" : "The observable traits of a genotype."}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-medium">{lang === "bn" ? "হোমোজাইগাস" : "Homozygous"}</p>
                  <p className="text-sm">{lang === "bn" ? "একই ধরনের দুটি অ্যালিল।" : "Two identical alleles for a gene."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "হেটেরোজাইগাস" : "Heterozygous"}</p>
                  <p className="text-sm">{lang === "bn" ? "ভিন্ন ধরনের দুটি অ্যালিল।" : "Two different alleles for a gene."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রাধান্য এবং প্রচ্ছন্নতা" : "Dominance and Recessiveness"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p>
                {lang === "bn"
                  ? "প্রকট অ্যালিল ফিনোটাইপে প্রকাশিত হয়, যখন প্রচ্ছন্ন অ্যালিল শুধুমাত্র হোমোজাইগাস অবস্থায় প্রকাশিত হয়।"
                  : "A dominant allele is expressed in the phenotype, while a recessive allele is expressed only in the homozygous state."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono">AA or Aa → {lang === "bn" ? "প্রকট ফিনোটাইপ" : "Dominant Phenotype"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "প্রকট অ্যালিল (A) উপস্থিত।" : "Dominant allele (A) present."}
                  </p>
                </div>
                <div>
                  <p className="font-mono">aa → {lang === "bn" ? "প্রচ্ছন্ন ফিনোটাইপ" : "Recessive Phenotype"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "bn" ? "শুধুমাত্র প্রচ্ছন্ন অ্যালিল (a)।" : "Only recessive allele (a)."}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "পাঞ্চেট স্কোয়ার" : "Punnett Square"}
            </h4>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
              <p className="text-orange-700 dark:text-orange-300">
                {lang === "bn"
                  ? "পাঞ্চেট স্কোয়ার হল একটি সরঞ্জাম যা সম্ভাব্য জিনোটাইপ এবং ফিনোটাইপের পূর্বাভাস দেয়।"
                  : "A Punnett Square is a tool used to predict possible genotypes and phenotypes of offspring."}
              </p>
              <div className="space-y-2">
                <p className="font-medium">{lang === "bn" ? "একক বৈশিষ্ট্য সংকর (মনোহাইব্রিড ক্রস)" : "Monohybrid Cross"}</p>
                <p className="text-sm">{lang === "bn" ? "একটি বৈশিষ্ট্যের জন্য জিনোটাইপ পূর্বাভাস।" : "Predicts genotypes for one trait."}</p>
                <p className="font-mono text-sm">Aa × Aa → 1 AA : 2 Aa : 1 aa</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{lang === "bn" ? "দ্বৈত বৈশিষ্ট্য সংকর (ডাইহাইব্রিড ক্রস)" : "Dihybrid Cross"}</p>
                <p className="text-sm">{lang === "bn" ? "দুটি বৈশিষ্ট্যের জন্য জিনোটাইপ পূর্বাভাস।" : "Predicts genotypes for two traits."}</p>
                <p className="font-mono text-sm">AaBb × AaBb → 9:3:3:1</p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যতিক্রম এবং সীমাবদ্ধতা" : "Exceptions and Limitations"}
            </h4>
            
            <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg space-y-3">
              <p className="text-teal-700 dark:text-teal-300">
                {lang === "bn"
                  ? "মেন্ডেলের নীতিগুলি সরল বৈশিষ্ট্যের জন্য প্রযোজ্য। জটিল বৈশিষ্ট্যে ব্যতিক্রম দেখা যায়।"
                  : "Mendel’s laws apply to simple traits. Complex traits show exceptions."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "অসম্পূর্ণ প্রাধান্য" : "Incomplete Dominance"}</p>
                  <p className="text-sm">{lang === "bn" ? "ফিনোটাইপ মিশ্রিত হয়।" : "Phenotype is a blend."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "সহ-প্রাধান্য" : "Codominance"}</p>
                  <p className="text-sm">{lang === "bn" ? "দুটি অ্যালিলই প্রকাশিত হয়।" : "Both alleles are expressed."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "পলিজেনিক বৈশিষ্ট্য" : "Polygenic Traits"}</p>
                  <p className="text-sm">{lang === "bn" ? "একাধিক জিন দ্বারা নিয়ন্ত্রিত।" : "Controlled by multiple genes."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "ব্যবহারিক প্রয়োগ" : "Practical Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
                <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                  {lang === "bn" ? "কৃষি" : "Agriculture"}
                </h5>
                <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                  <li>• {lang === "bn" ? "উন্নত জাতের ফসল" : "Improved crop varieties"}</li>
                  <li>• {lang === "bn" ? "রোগ প্রতিরোধ" : "Disease resistance"}</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "জিনগত রোগ নির্ণয়" : "Genetic disease diagnosis"}</li>
                  <li>• {lang === "bn" ? "জিন থেরাপি" : "Gene therapy"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "প্রকট অ্যালিল বড় হাতের অক্ষরে (A), প্রচ্ছন্ন ছোট হাতের অক্ষরে (a)।" : "Dominant alleles use capital letters (A), recessive use lowercase (a)."}</li>
                <li>• {lang === "bn" ? "পাঞ্চেট স্কোয়ার সম্ভাব্যতা গণনার জন্য ব্যবহার করুন।" : "Use Punnett Squares to calculate probabilities."}</li>
                <li>• {lang === "bn" ? "স্বাধীন সংযোজন শুধুমাত্র অ-সংযুক্ত জিনের জন্য প্রযোজ্য।" : "Independent assortment applies only to unlinked genes."}</li>
                <li>• {lang === "bn" ? "জটিল বৈশিষ্ট্য মেন্ডেলীয় নীতি থেকে বিচ্যুত হতে পারে।" : "Complex traits may deviate from Mendelian principles."}</li>
              </ul>
            </div>
          </div>

          <AudioPlayer isPlaying={isPlaying} togglePlay={toggleAudio} lang={lang} />
        </div>

        <LanguageToggle lang={lang} setLang={setLang} />

        <TopicChatbot />
      </CardContent>
    </Card>
  )
}