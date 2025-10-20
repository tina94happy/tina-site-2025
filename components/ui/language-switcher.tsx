'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'

export function LanguageSwitcher() {
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh' : 'en'
    
    // 根據當前路徑和目標語言構建新路徑
    let newPath = pathname
    
    if (newLanguage === 'en') {
      // 切換到英文：在路徑前加上 /en
      if (!pathname.startsWith('/en')) {
        newPath = `/en${pathname}`
      }
    } else {
      // 切換到中文：移除 /en 前綴
      if (pathname.startsWith('/en')) {
        newPath = pathname.replace('/en', '') || '/'
      }
    }
    
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-lofi-purple/20 text-lofi-purple hover:bg-lofi-purple hover:text-white transition-all duration-300 border border-lofi-purple/30 hover:border-lofi-purple text-sm font-medium"
      aria-label="切換語言 / Switch Language"
    >
      <span className="text-lg">
        {language === 'en' ? '中' : 'EN'}
      </span>
    </button>
  )
}
