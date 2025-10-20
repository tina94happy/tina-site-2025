import { useLanguage } from '@/contexts/language-context'
import { translations, TranslationKey } from '@/lib/translations'

export function useTranslation() {
  const { language } = useLanguage()
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }
  
  return { t, language }
}
