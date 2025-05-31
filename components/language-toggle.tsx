"use client"

import { Button } from "@/components/ui/button"
import { useTranslationContext } from "./language-provider"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggleDropdown() {
  const { language, setLanguage } = useTranslationContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("bn")} className={language === "bn" ? "bg-accent" : ""}>
          বাংলা
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default function LanguageToggle({
  lang,
  setLang,
}: {
  lang: "en" | "bn"
  setLang: (l: "en" | "bn") => void
}) {
  return (
    <div className="mt-4 border-t pt-4">
      <p className="text-sm font-medium">
        {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
      </p>
      <div className="flex gap-2 mt-2">
        <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>
          English
        </Button>
        <Button variant={lang === "bn" ? "default" : "outline"} size="sm" onClick={() => setLang("bn")}>
          বাংলা
        </Button>
      </div>
    </div>
  )
}

