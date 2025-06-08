"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TopicChatbot from "@/components/visualearn/topic-chatbot"
import AudioPlayer from "@/components/audioPlayer"
import LanguageToggle from "@/components/language-toggle"
import { useTTS } from "@/hooks/useTTS"

export default function GroupsAndFamiliesContent() {
  const [lang, setLang] = useState<"en" | "bn">("en")

  const plainText =
    lang === "bn"
      ? `পর্যায় সারণীতে গ্রুপ এবং পরিবার মৌলগুলিকে তাদের ইলেকট্রন বিন্যাস এবং রাসায়নিক আচরণ অনুসারে সংগঠিত করে। গ্রুপগুলি হল উল্লম্ব কলাম, যেখানে মৌলগুলির একই সংখ্যক ভ্যালেন্স ইলেকট্রন থাকে, যা তাদের রাসায়নিক বৈশিষ্ট্য নির্ধারণ করে। পরিবার হল নির্দিষ্ট গ্রুপের নাম, যেমন ক্ষার ধাতু বা হ্যালোজেন, যারা অনুরূপ বৈশিষ্ট্য প্রদর্শন করে।
মূল ধারণা:
- গ্রুপ: ১ থেকে ১৮ পর্যন্ত উল্লম্ব কলাম। প্রতিটি গ্রুপের মৌলের ভ্যালেন্স ইলেকট্রন সমান।
- পরিবার: ক্ষার ধাতু (গ্রুপ ১), ক্ষারীয় মৃৎপাত্র ধাতু (গ্রুপ ২), হ্যালোজেন (গ্রুপ ১৭), এবং উৎকৃষ্ট গ্যাস (গ্রুপ ১৮)।
- বৈশিষ্ট্য: গ্রুপের মৌলগুলি একই ধরনের প্রতিক্রিয়াশীলতা এবং বন্ধন গঠন করে।
প্রধান গ্রুপ এবং তাদের বৈশিষ্ট্য:
- গ্রুপ ১ (ক্ষার ধাতু): Li, Na, K, Rb, Cs, Fr। অত্যন্ত প্রতিক্রিয়াশীল, জলের সাথে H₂ গ্যাস উৎপন্ন করে। ১টি ভ্যালেন্স ইলেকট্রন।
- গ্রুপ ২ (ক্ষারীয় মৃৎপাত্র ধাতু): Be, Mg, Ca, Sr, Ba, Ra। মাঝারি প্রতিক্রিয়াশীল, ২টি ভ্যালেন্স ইলেকট্রন।
- গ্রুপ ১৭ (হ্যালোজেন): F, Cl, Br, I, At। অধাতু, অত্যন্ত প্রতিক্রিয়াশীল, ৭টি ভ্যালেন্স ইলেকট্রন।
- গ্রুপ ১৮ (উৎকৃষ্ট গ্যাস): He, Ne, Ar, Kr, Xe, Rn। অপ্রতিক্রিয়াশীল, স্থিতিশীল, ৮টি ভ্যালেন্স ইলেকট্রন।
প্রধান বৈশিষ্ট্য:
- গ্রুপ ১ এবং ২ ধাতু, গ্রুপ ১৭ অধাতু, গ্রুপ ১৮ গ্যাস।
- প্রতিক্রিয়াশীলতা গ্রুপে নিচে বাড়ে (গ্রুপ ১, ২) বা কমে (গ্রুপ ১৭)।
উদাহরণ:
- ক্ষার ধাতু: Na + H₂O → NaOH + H₂।
- হ্যালোজেন: Cl₂ + 2Na → 2NaCl।
- উৎকৃষ্ট গ্যাস: Ne, Ar ব্যবহৃত হয় আলোকসজ্জায়।
প্রয়োগ:
- শিল্পে: Na, Cl যৌগ উৎপাদনে।
- প্রযুক্তিতে: Ne আলোক টিউবে, Ca নির্মাণে।
- চিকিৎসায়: I জীবাণুনাশক হিসেবে।
টিপস:
- গ্রুপ নম্বর ভ্যালেন্স ইলেকট্রন নির্দেশ করে।
- পরিবারের নাম মৌলের আচরণ বোঝায়।
- প্রতিক্রিয়াশীলতার প্রবণতা মনে রাখুন।`
      : `Groups and families organize elements in the periodic table by their electron configurations and chemical behaviors. Groups are vertical columns where elements share the same number of valence electrons, determining their chemical properties. Families are named groups, such as alkali metals or halogens, exhibiting similar characteristics.
Key Concepts:
- Groups: Vertical columns numbered 1 to 18. Elements in each group have identical valence electrons.
- Families: Alkali metals (Group 1), alkaline earth metals (Group 2), halogens (Group 17), and noble gases (Group 18).
- Properties: Elements in a group show similar reactivity and bonding patterns.
Main Groups and Their Properties:
- Group 1 (Alkali Metals): Li, Na, K, Rb, Cs, Fr. Highly reactive, produce H₂ gas with water. 1 valence electron.
- Group 2 (Alkaline Earth Metals): Be, Mg, Ca, Sr, Ba, Ra. Moderately reactive, 2 valence electrons.
- Group 17 (Halogens): F, Cl, Br, I, At. Nonmetals, highly reactive, 7 valence electrons.
- Group 18 (Noble Gases): He, Ne, Ar, Kr, Xe, Rn. Inert, stable, 8 valence electrons.
Key Characteristics:
- Groups 1 and 2 are metals, Group 17 are nonmetals, Group 18 are gases.
- Reactivity increases down Group 1 and 2, decreases down Group 17.
Examples:
- Alkali Metals: Na + H₂O → NaOH + H₂.
- Halogens: Cl₂ + 2Na → 2NaCl.
- Noble Gases: Ne, Ar used in lighting.
Applications:
- Industry: Na, Cl in compound production.
- Technology: Ne in light tubes, Ca in construction.
- Medicine: I as a disinfectant.
Tips:
- Group number indicates valence electrons.
- Family names reflect element behavior.
- Remember reactivity trends.`

  const { isPlaying, toggleAudio } = useTTS(plainText, lang)

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold">
              {lang === "bn" ? "গ্রুপ এবং পরিবার" : "Groups and Families"}
            </h3>
            
            <div className="space-y-3">
              <p className="text-base">
                {lang === "bn"
                  ? "পর্যায় সারণীতে গ্রুপ এবং পরিবার মৌলগুলির সংগঠন এবং রাসায়নিক আচরণ বোঝায়। এটি মৌলগুলির বৈশিষ্ট্য এবং প্রতিক্রিয়াশীলতা শ্রেণীবদ্ধ করতে সহায়ক।"
                  : "Groups and families in the periodic table organize elements by their properties and chemical behaviors, aiding in classifying their characteristics and reactivity."}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {lang === "bn" ? "মূল ধারণা" : "Fundamental Concepts"}
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  {lang === "bn"
                    ? "গ্রুপ এবং পরিবার মৌলগুলির ইলেকট্রন বিন্যাস এবং রাসায়নিক বৈশিষ্ট্যের উপর ভিত্তি করে শ্রেণীবদ্ধ করা হয়। গ্রুপের মৌলগুলির একই ভ্যালেন্স ইলেকট্রন থাকে, যা তাদের প্রতিক্রিয়াশীলতা নির্ধারণ করে।"
                    : "Groups and families are classified based on electron configurations and chemical properties. Elements in a group share the same valence electrons, determining their reactivity."}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান গ্রুপ এবং তাদের বৈশিষ্ট্য" : "Main Groups and Their Properties"}
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {lang === "bn"
                  ? "পর্যায় সারণীর কিছু গ্রুপ এবং পরিবারের নির্দিষ্ট নাম এবং বৈশিষ্ট্য রয়েছে, যা তাদের প্রতিক্রিয়াশীলতা এবং ব্যবহার নির্ধারণ করে।"
                  : "Certain groups and families in the periodic table have specific names and properties that dictate their reactivity and applications."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>{lang === "bn" ? "গ্রুপ ১ (ক্ষার ধাতু)" : "Group 1 (Alkali Metals)"}</strong>: 
                  {lang === "bn" ? "অত্যন্ত প্রতিক্রিয়াশীল, জলের সাথে হাইড্রোজেন গ্যাস উৎপন্ন করে। উদাহরণ: Li, Na, K।" : "Highly reactive, produce hydrogen gas with water. Examples: Li, Na, K."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গ্রুপ ২ (ক্ষারীয় মৃৎপাত্র ধাতু)" : "Group 2 (Alkaline Earth Metals)"}</strong>: 
                  {lang === "bn" ? "মাঝারি প্রতিক্রিয়াশীল, শক্ত যৌগ গঠন করে। উদাহরণ: Mg, Ca।" : "Moderately reactive, form strong compounds. Examples: Mg, Ca."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গ্রুপ ১৭ (হ্যালোজেন)" : "Group 17 (Halogens)"}</strong>: 
                  {lang === "bn" ? "অধাতু, অত্যন্ত প্রতিক্রিয়াশীল, লবণ গঠন করে। উদাহরণ: F, Cl, Br।" : "Nonmetals, highly reactive, form salts. Examples: F, Cl, Br."}
                </li>
                <li>
                  • <strong>{lang === "bn" ? "গ্রুপ ১৮ (উৎকৃষ্ট গ্যাস)" : "Group 18 (Noble Gases)"}</strong>: 
                  {lang === "bn" ? "অপ্রতিক্রিয়াশীল, স্থিতিশীল। উদাহরণ: He, Ne, Ar।" : "Inert, stable. Examples: He, Ne, Ar."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রধান বৈশিষ্ট্য" : "Key Characteristics"}
            </h4>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
              <p className="text-green-700 dark:text-green-300">
                {lang === "bn"
                  ? "গ্রুপ এবং পরিবারের বৈশিষ্ট্য মৌলগুলির প্রকৃতি এবং প্রয়োগ বোঝায়।"
                  : "Characteristics of groups and families explain the nature and applications of elements."}
              </p>
              <ul className="text-sm space-y-2">
                <li>
                  • {lang === "bn" ? "ধাতু এবং অধাতু: গ্রুপ ১, ২ ধাতু; গ্রুপ ১৭ অধাতু।" : "Metals and Nonmetals: Groups 1, 2 are metals; Group 17 are nonmetals."}
                </li>
                <li>
                  • {lang === "bn" ? "প্রতিক্রিয়াশীলতা: গ্রুপ ১-এ নিচে বাড়ে, গ্রুপ ১৭-এ কমে।" : "Reactivity: Increases down Group 1, decreases down Group 17."}
                </li>
                <li>
                  • {lang === "bn" ? "ইলেকট্রন বিন্যাস: গ্রুপ নম্বর ভ্যালেন্স ইলেকট্রন নির্দেশ করে।" : "Electron Configuration: Group number indicates valence electrons."}
                </li>
              </ul>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "উদাহরণ" : "Examples"}
            </h4>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
              <p className="text-indigo-700 dark:text-indigo-300">
                {lang === "bn"
                  ? "ব্যবহারিক উদাহরণ গ্রুপ এবং পরিবারের বৈশিষ্ট্য বোঝায়।"
                  : "Practical examples illustrate the properties of groups and families."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{lang === "bn" ? "ক্ষার ধাতু" : "Alkali Metals"}</p>
                  <p className="text-sm">Na + H₂O → NaOH + H₂</p>
                  <p className="text-sm">{lang === "bn" ? "জলের সাথে তীব্র বিক্রিয়া।" : "Reacts vigorously with water."}</p>
                </div>
                <div>
                  <p className="font-medium">{lang === "bn" ? "হ্যালোজেন" : "Halogens"}</p>
                  <p className="text-sm">Cl₂ + 2Na → 2NaCl</p>
                  <p className="text-sm">{lang === "bn" ? "লবণ গঠন করে।" : "Forms salts."}</p>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-lg">
              {lang === "bn" ? "প্রয়োগ" : "Applications"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                <h5 className="font-medium text-pink-800 dark:text-pink-200 mb-2">
                  {lang === "bn" ? "শিল্প" : "Industry"}
                </h5>
                <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                  <li>• {lang === "bn" ? "NaCl উৎপাদন" : "NaCl production"}</li>
                  <li>• {lang === "bn" ? "Ca যৌগ নির্মাণ" : "Ca compounds in construction"}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  {lang === "bn" ? "প্রযুক্তি" : "Technology"}
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• {lang === "bn" ? "Ne আলোক টিউবে" : "Ne in light tubes"}</li>
                  <li>• {lang === "bn" ? "Ar লেজারে" : "Ar in lasers"}</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
                  {lang === "bn" ? "চিকিৎসা" : "Medicine"}
                </h5>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                  <li>• {lang === "bn" ? "I জীবাণুনাশক" : "I as disinfectant"}</li>
                  <li>• {lang === "bn" ? "Ca হাড়ের চিকিৎসায়" : "Ca in bone treatment"}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {lang === "bn" ? "গুরুত্বপূর্ণ টিপস" : "Important Tips"}
              </h4>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• {lang === "bn" ? "গ্রুপ নম্বর ভ্যালেন্স ইলেকট্রন নির্দেশ করে।" : "Group number indicates valence electrons."}</li>
                <li>• {lang === "bn" ? "পরিবারের নাম মৌলের আচরণ বোঝায়।" : "Family names reflect element behavior."}</li>
                <li>• {lang === "bn" ? "প্রতিক্রিয়াশীলতার প্রবণতা মনে রাখুন।" : "Remember reactivity trends."}</li>
                <li>• {lang === "bn" ? "পর্যায় সারণী অধ্যয়ন করুন।" : "Study the periodic table layout."}</li>
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