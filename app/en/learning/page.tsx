'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonTop } from "@/components/ui/button-top"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/translations"
import { FaExternalLinkAlt, FaMedium, FaBookOpen } from "react-icons/fa"

interface Article {
  title: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  image: string
  link: string
  category: string
  tags?: string[]
  platform?: string
}

const articles: Article[] = [
  {
    title: {
      en: "Packet Tracer Basic Commands",
      zh: "Packet Tracer 基本指令"
    },
    description: {
      en: "Essential commands and configurations for Cisco Packet Tracer network simulation.",
      zh: "Cisco Packet Tracer 網路模擬的基本指令與配置。"
    },
    image: "/tina-site-2025/packet-tracer.png", // Using existing logo as placeholder
    link: "https://medium.com/p/7580fb47176b/edit",
    category: "NETWORK",
    tags: ["Network", "Packet Tracer", "Cisco", "Simulation"],
    platform: "Medium"
  },
  {
    title: {
      en: "Quantifying Risk with Open FAIR Risk Analysis",
      zh: "使用 Open FAIR 風險分析量化風險"
    },
    description: {
      en: "Using Open FAIR Risk Analysis framework to quantify cybersecurity risks and make data-driven decisions.",
      zh: "運用 Open FAIR 風險分析框架量化網路安全風險並做出數據驅動的決策。"
    },
    image: "/tina-site-2025/open-fair-risk.png", // Using existing logo as placeholder
    link: "https://medium.com/@wantingsu64/cybersecurity-risk-management-%E9%87%8F%E5%8C%96%E9%A2%A8%E9%9A%AA-open-fair-risk-analysis-ca4a850d1513",
    category: "CYBER",
    tags: ["Cybersecurity Risk Management", "Open FAIR", "Risk Analysis", "Cybersecurity"],
    platform: "Medium"
  }
]

export default function EnglishLearningPage() {
  const { t, language } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('ALL')
  const categories = ['ALL', 'CYBER', 'NETWORK', 'CLOUD', 'DEVOPS', 'OTHER']
  
  const filteredArticles = activeCategory === 'ALL' 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CYBER':
        return 'bg-lofi-purple'
      case 'NETWORK':
        return 'bg-lofi-blue'
      case 'CLOUD':
        return 'bg-lofi-pink'
      case 'DEVOPS':
        return 'bg-lofi-accent'
      default:
        return 'bg-gray-600'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Medium':
        return <FaMedium size={16} />
      default:
        return <FaBookOpen size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <ButtonTop />
      
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 pt-8 sm:pt-4">
        <div className="hidden sm:block px-4 sm:px-10 mb-4 sm:mb-0">
          <Link href="/en" className="text-2xl sm:text-3xl font-bold font-poppins text-lofi-purple hover:scale-105 transition-all duration-300">TINA</Link>
        </div>
        <div className="flex gap-2 sm:gap-4 space-x-4 sm:space-x-8 font-bold text-sm sm:text-md px-4 sm:px-10 items-center">
          <Link href="/en" className="text-white hover:text-lofi-purple transition-colors">{t('home')}</Link>
          <Link href="/en/me" className="text-white hover:text-lofi-purple transition-colors">{t('me')}</Link>
          <Link href="/en/coding" className="text-white hover:text-lofi-purple transition-colors">{t('coding')}</Link>
          <Link href="/en/learning" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple">{t('learning')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <p className="text-lofi-purple text-sm mb-2 relative font-medium tracking-wider">
              {t('learning')}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-lofi-purple"></span>
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lofi-purple">{t('myArticles')}</h1>
          </div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            {t('learningDescription')}
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium
                ${activeCategory === category 
                  ? 'bg-lofi-purple text-white shadow-lg' 
                  : 'text-white hover:bg-lofi-purple/20 border border-lofi-purple/30'
                }`}
            >
              {category === 'ALL' ? t('all') : t(category.toLowerCase() as TranslationKey)}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredArticles.map((article, index) => (
            <div 
              key={index}
              className="group relative aspect-[4/3] bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-lofi-purple/20 hover:border-lofi-purple/40 transition-all duration-300 hover:shadow-lg hover:shadow-lofi-purple/20"
            >
              <Image
                src={article.image}
                alt={article.title[language]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Category Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 ${getCategoryColor(article.category)} text-white text-xs font-semibold rounded-full shadow-lg`}>
                {article.category}
              </div>

              {/* Platform Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                {getPlatformIcon(article.platform || '')}
                <span>{article.platform}</span>
              </div>

              {/* Content - Only visible on hover */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lofi-purple transition-colors line-clamp-2">
                  {article.title[language]}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {article.description[language]}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {article.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-lofi-purple/20 text-lofi-purple rounded-full text-xs border border-lofi-purple/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags && article.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Read Article Button */}
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-lofi-purple/20 text-lofi-purple rounded-lg hover:bg-lofi-purple hover:text-white transition-all duration-300 text-sm font-medium border border-lofi-purple/30"
                >
                  <FaExternalLinkAlt size={12} />
                  <span>{t('readArticle')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-lofi-purple/20 to-lofi-blue/20 backdrop-blur-sm p-8 rounded-xl border border-lofi-purple/30 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-lofi-purple mb-4">{t('stayUpdated')}</h2>
            <p className="text-gray-300 mb-6">
              {t('stayUpdatedDescription')}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://medium.com/@wantingsu64"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-lofi-purple text-white rounded-lg hover:bg-lofi-purple/80 transition-all duration-300 font-medium"
              >
                <FaMedium size={18} />
                <span>{t('followOnMedium')}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tina-su-01b139210/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-lofi-blue text-white rounded-lg hover:bg-lofi-blue/80 transition-all duration-300 font-medium"
              >
                <span>{t('connectOnLinkedin')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-lofi-purple/20 to-lofi-blue/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-purple/30 text-center">
            <div className="text-3xl font-bold text-lofi-purple mb-2">4+</div>
            <div className="text-gray-300">{t('articlesPublished')}</div>
          </div>
          <div className="bg-gradient-to-br from-lofi-blue/20 to-lofi-pink/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-blue/30 text-center">
            <div className="text-3xl font-bold text-lofi-blue mb-2">5+</div>
            <div className="text-gray-300">{t('topicsCovered')}</div>
          </div>
          <div className="bg-gradient-to-br from-lofi-pink/20 to-lofi-accent/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-pink/30 text-center">
            <div className="text-3xl font-bold text-lofi-pink mb-2">∞</div>
            <div className="text-gray-300">{t('learningJourney')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
