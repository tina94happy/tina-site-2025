'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>('zh') // 默認中文

  useEffect(() => {
    // 根據 URL 路徑設置語言
    if (pathname.startsWith('/en')) {
      setLanguage('en')
    } else {
      setLanguage('zh')
    }
  }, [pathname])

  useEffect(() => {
    // 保存語言設置到 localStorage
    localStorage.setItem('language', language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
