"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Locale, getDictionary } from "@/lib/dictionaries"

type LocaleContextType = {
  locale: Locale
  dict: ReturnType<typeof getDictionary>
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko")
  const [isInitialized, setIsInitialized] = useState(false)

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("NEXT_LOCALE", newLocale)
    document.documentElement.lang = newLocale
  }

  useEffect(() => {
    // 1. 저장된 설정 확인
    const savedLocale = localStorage.getItem("NEXT_LOCALE") as Locale
    
    if (savedLocale && (savedLocale === "ko" || savedLocale === "en")) {
      setLocaleState(savedLocale)
      document.documentElement.lang = savedLocale
    } else {
      // 2. 브라우저 언어나 타임존으로 추측 (한국은 KST 타임존을 흔히 사용)
      const isKorean = 
        navigator.language.startsWith("ko") || 
        Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Seoul"
      
      const initialLocale = isKorean ? "ko" : "en"
      setLocaleState(initialLocale)
      document.documentElement.lang = initialLocale
    }
    setIsInitialized(true)
  }, [])

  const dict = getDictionary(locale)

  return (
    <LocaleContext.Provider value={{ locale, dict, setLocale }}>
      {isInitialized ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
