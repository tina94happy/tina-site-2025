'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonTop } from "@/components/ui/button-top"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/translations"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

interface Project {
  title: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  image: string
  github: string
  category: string
  tech?: string[]
  demo?: string
}

const projects: Project[] = [
  {
    title: {
      en: "Simple FastAPI On AWS EC2",
      zh: "AWS EC2 上的簡易 FastAPI"
    },
    description: {
      en: "A movie information system built with FastAPI, deployed on AWS EC2, and reading data from S3.",
      zh: "使用 FastAPI 建置的電影資訊系統，部署於 AWS EC2，並從 S3 讀取資料。"
    },
    image: "/tina-site-2025/movie-api.png",
    github: "https://github.com/tina94happy/Simple-FastAPI-On-AWS-EC2",
    category: "PROJECT",
    tech: ["FastAPI", "AWS", "Python", "S3"]
  },
  {
    title: {
      en: "Java Maze Game",
      zh: "Java 迷宮遊戲"
    },
    description: {
      en: "A maze game developed in Java where players control a dog to collect all bones.",
      zh: "使用 Java 開發的迷宮遊戲，玩家控制一隻狗收集所有骨頭。"
    },
    image: "/tina-site-2025/java-maze.gif",
    github: "https://github.com/tina94happy/JavaMaze",
    category: "GAME",
    tech: ["Java", "Game Development", "OOP"]
  },
  {
    title: {
      en: "Book Management System",
      zh: "圖書管理系統"
    },
    description: {
      en: "A comprehensive book inventory management system backend with modern web technologies.",
      zh: "使用現代網頁技術建置的綜合圖書庫存管理系統後端。"
    },
    image: "/tina-site-2025/book-system.png",
    github: "https://github.com/tina94happy/BookMaintainBackStage",
    category: "PROJECT",
    tech: ["JavaScript", "Vue.js", "Express", "Node.js"]
  },
  {
    title: {
      en: "CX API Tester",
      zh: "CX API 測試工具"
    },
    description: {
      en: "An automated API testing tool for CX One platform with comprehensive test coverage.",
      zh: "為 CX One 平台設計的自動化 API 測試工具，具備全面的測試覆蓋率。"
    },
    image: "/tina-site-2025/cx-api-tester.png",
    github: "https://github.com/tina94happy/CX-api-tester",
    category: "TOOL",
    tech: ["Python", "API Testing", "Automation", "CI/CD"]
  },
  {
    title: {
      en: "PDF Merger Tool",
      zh: "PDF 合併工具"
    },
    description: {
      en: "A utility tool for merging multiple PDF files with batch processing capabilities.",
      zh: "具備批次處理功能的 PDF 檔案合併工具。"
    },
    image: "/tina-site-2025/logo.gif", // Using existing logo as placeholder
    github: "https://github.com/tina94happy/pdf-merger",
    category: "TOOL",
    tech: ["Python", "PDF Processing", "Automation"]
  }
]

export default function EnglishCodingPage() {
  const { t, language } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('ALL')
  const categories = ['ALL', 'TOOL', 'PROJECT', 'GAME']
  
  const filteredProjects = activeCategory === 'ALL' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'PROJECT':
        return 'bg-lofi-purple'
      case 'TOOL':
        return 'bg-lofi-blue'
      case 'GAME':
        return 'bg-lofi-pink'
      default:
        return 'bg-lofi-accent'
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
          <Link href="/en/coding" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple">{t('coding')}</Link>
          <Link href="/en/learning" className="text-white hover:text-lofi-purple transition-colors">{t('learning')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <p className="text-lofi-purple text-sm mb-2 relative font-medium tracking-wider">
              {t('portfolio')}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-lofi-purple"></span>
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lofi-purple">{t('myWorks')}</h1>
          </div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            {t('codingDescription')}
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
              {t(category.toLowerCase() as TranslationKey)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="group relative aspect-[4/3] bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-lofi-purple/20 hover:border-lofi-purple/40 transition-all duration-300 hover:shadow-lg hover:shadow-lofi-purple/20"
            >
              <Image
                src={project.image}
                alt={project.title[language]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              
              {/* Category Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 ${getCategoryColor(project.category)} text-white text-xs font-semibold rounded-full shadow-lg`}>
                {project.category}
              </div>

              {/* Content - Only visible on hover */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lofi-purple transition-colors">
                  {project.title[language]}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description[language]}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.tech?.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-lofi-purple/20 text-lofi-purple rounded-full text-xs border border-lofi-purple/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech && project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-lofi-purple/20 text-lofi-purple rounded-lg hover:bg-lofi-purple hover:text-white transition-all duration-300 text-sm font-medium border border-lofi-purple/30"
                  >
                    <FaGithub size={14} />
                    <span>{t('code')}</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-lofi-blue/20 text-lofi-blue rounded-lg hover:bg-lofi-blue hover:text-white transition-all duration-300 text-sm font-medium border border-lofi-blue/30"
                    >
                      <FaExternalLinkAlt size={12} />
                      <span>{t('demo')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-lofi-purple/20 to-lofi-blue/20 backdrop-blur-sm p-8 rounded-xl border border-lofi-purple/30 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-lofi-purple mb-4">{t('interestedInCollaborating')}</h2>
            <p className="text-gray-300 mb-6">
              {t('collaboratingDescription')}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/tina94happy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-lofi-purple text-white rounded-lg hover:bg-lofi-purple/80 transition-all duration-300 font-medium"
              >
                <FaGithub size={18} />
                <span>{t('viewAllProjects')}</span>
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
      </div>
    </div>
  )
}
