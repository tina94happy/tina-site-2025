'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ButtonTop } from "@/components/ui/button-top"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/translations"
import { FaGithub, FaLinkedin } from "react-icons/fa"

interface TimelineItem {
  period: string
  title: {
    en: string
    zh: string
  }
  subtitle: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  category: 'education' | 'work' | 'certification' | 'project'
}

const timelineData: TimelineItem[] = [
  {
    period: "Jun. 2025 – Aug. 2025",
    title: {
      en: "Full-Stack Engineer Intern",
      zh: "全端工程師實習生"
    },
    subtitle: {
      en: "CONNECT, St. Louis, MO",
      zh: "CONNECT, 密蘇里州聖路易斯"
    },
    description: {
      en: "Integrated Trigger.dev to manage and batch high-volume notification workflows, ensuring reliable delivery at scale. Utilized Drizzle ORM for type-safe database operations and tRPC for end-to-end type-safe API communication. Built real-time legal alerting via Next.js, Resend, and Supabase Webhooks, enabling users to receive instant email updates when relevant laws are enacted.",
      zh: "整合 Trigger.dev 管理與批次處理大量通知工作流程，確保大規模可靠傳遞。運用 Drizzle ORM 進行型別安全的資料庫操作，並使用 tRPC 實現端到端型別安全的 API 通訊。透過 Next.js、Resend 和 Supabase Webhooks 建置即時法律警示系統，讓使用者能在相關法律頒布時即時收到電子郵件更新。"
    },
    category: "work"
  },
  {
    period: "2024 - 2025",
    title: {
      en: "Washington University in St. Louis",
      zh: "華盛頓大學聖路易斯分校"
    },
    subtitle: {
      en: "Master of Information Systems Management",
      zh: "資訊系統管理碩士"
    },
    description: {
      en: "GPA 4.0. Coursework: IT Architecture, CTF, Intro to Cybersecurity | AWS/Azure Cloud Labs | K8s Architecture Labs",
      zh: "GPA 4.0。修習課程：IT 架構、CTF、網路安全概論 | AWS/Azure 雲端實驗室 | K8s 架構實驗室"
    },
    category: "education"
  },
  {
    period: "2018 - 2023",
    title: {
      en: "Fu Jen Catholic University",
      zh: "輔仁大學"
    },
    subtitle: {
      en: "BS - Finance & International Business and Information Mgmt",
      zh: "學士 - 財務金融與國際企業管理及資訊管理"
    },
    description: {
      en: "Graduated with GPA 3.86. Outstanding Student Award & Python TA. Studied Finance, ML, and Data Mining.",
      zh: "以 GPA 3.86 畢業。獲頒優秀學生獎並擔任 Python 助教。修習財務、機器學習與資料探勘。"
    },
    category: "education"
  },
  {
    period: "2023 - 2024",
    title: {
      en: "Security Engineer",
      zh: "安全工程師"
    },
    subtitle: {
      en: "Galaxy Software Services",
      zh: "聚碩科技"
    },
    description: {
      en: "Integrated OSS vuln scanning in CI/CD with GitHub/GitLab/Jenkins. Delivered training to 40+ clients. Built Python-based scanning in Linux.",
      zh: "在 CI/CD 中整合 OSS 漏洞掃描，支援 GitHub/GitLab/Jenkins。為 40+ 客戶提供培訓。在 Linux 環境中建置基於 Python 的掃描系統。"
    },
    category: "work"
  },
  {
    period: "2022 - 2023",
    title: {
      en: "SDET Intern",
      zh: "軟體開發測試工程師實習生"
    },
    subtitle: {
      en: "Kingray Corporation",
      zh: "金瑞科技"
    },
    description: {
      en: "Led Agile team for api project. Simulated HTTP using Mockoon for gov APIs. Built auto accounting tool (Python+SQL), saving 60% manual time.",
      zh: "領導 API 專案的敏捷開發團隊。使用 Mockoon 模擬政府 API 的 HTTP 請求。建置自動化會計工具（Python+SQL），節省 60% 人工時間。"
    },
    category: "work"
  },
  {
    period: "2021 - 2022",
    title: {
      en: "QA Engineer Intern",
      zh: "品質保證工程師實習生"
    },
    subtitle: {
      en: "CHT Security",
      zh: "中華電信資安"
    },
    description: {
      en: "Expanded SOC testing. Automated UI tests with Selenium/Allure using Page Object Model, cutting time by 70%.",
      zh: "擴展 SOC 測試範圍。使用 Selenium/Allure 和 Page Object Model 自動化 UI 測試，減少 70% 測試時間。"
    },
    category: "work"
  },
  {
    period: "2021 - 2022",
    title: {
      en: "Capstone Project: iMirror",
      zh: "畢業專題：iMirror"
    },
    subtitle: {
      en: "Virtual Avatar Social Media with NFT",
      zh: "結合 NFT 的虛擬化身社群媒體"
    },
    description: {
      en: "Used C# Nomcore for real-time voice. Back-end with MySQL/phpMyAdmin. Built NFT trading backend.",
      zh: "使用 C# Nomcore 實現即時語音功能。後端採用 MySQL/phpMyAdmin。建置 NFT 交易後端系統。"
    },
    category: "project"
  },
  {
    period: "Current",
    title: {
      en: "Certifications & Skills",
      zh: "證照與技能"
    },
    subtitle: {
      en: "CEH, Azure DP-900, Checkmarx, AWS Cloud Practitioner",
      zh: "CEH、Azure DP-900、Checkmarx、AWS Cloud Practitioner"
    },
    description: {
      en: "Skills: Python, Shell, SQL, Docker, Jenkins, k8s, Git, Splunk, Azure DevOps, Terraform, Power BI, MySQL.",
      zh: "技能：Python、Shell、SQL、Docker、Jenkins、k8s、Git、Splunk、Azure DevOps、Terraform、Power BI、MySQL。"
    },
    category: "certification"
  }
]

const skills = {
  certifications: {
    en: [
      "Certified Ethical Hacker (CEH)",
      "Microsoft Azure DP-900 & AWS Cloud Practitioner"
    ],
    zh: [
      "道德駭客認證 (CEH)",
      "Microsoft Azure DP-900 與 AWS Cloud Practitioner"
    ]
  },
  technical: [
    "Python", "SQL", "Shell", "Docker", "Jenkins", "K8s",
    "AWS", "Azure", "Next.js", "tRPC", "Drizzle ORM", 
    "Trigger.dev", "Supabase", "Resend", "Power BI"
  ]
}

export default function EnglishMePage() {
  const { t, language } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Education', 'Work', 'Certifications']

  const filteredTimeline = activeFilter === 'All' 
    ? timelineData 
    : timelineData.filter(item => {
        if (activeFilter === 'Certifications') {
          return item.category === 'certification'
        }
        return item.category === activeFilter.toLowerCase()
      })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-lofi-pink'
      case 'work':
        return 'bg-lofi-blue'
      case 'certification':
        return 'bg-lofi-accent'
      case 'project':
        return 'bg-lofi-purple'
      default:
        return 'bg-lofi-purple'
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
          <Link href="/en/me" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple">{t('me')}</Link>
          <Link href="/en/coding" className="text-white hover:text-lofi-purple transition-colors">{t('coding')}</Link>
          <Link href="/en/learning" className="text-white hover:text-lofi-purple transition-colors">{t('learning')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lofi-purple mb-4">{t('aboutMe')}</h1>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/tina94happy" target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-lofi-purple transition-colors flex items-center gap-2">
              <FaGithub size={24} />
              <span className="text-lg">{t('github')}</span>
            </a>
            <a href="https://www.linkedin.com/in/tina-su-01b139210/" target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-lofi-purple transition-colors flex items-center gap-2">
              <FaLinkedin size={24} />
              <span className="text-lg">{t('linkedin')}</span>
            </a>
          </div>
        </div>

        {/* Overview Section */}
        <div className="max-w-6xl mx-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-lofi-purple/20 to-lofi-blue/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-purple/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lofi-purple text-lg font-semibold mb-3">{t('education')}</h3>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-pink rounded-full"></div>
                  {language === 'zh' ? '華盛頓大學資訊系統管理碩士' : 'MSIM at WashU'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-pink rounded-full"></div>
                  {language === 'zh' ? '輔仁大學財務金融與資訊管理學士' : 'BS in Finance & IS'}
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-lofi-blue/20 to-lofi-pink/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-blue/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lofi-blue text-lg font-semibold mb-3">{t('experience')}</h3>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-blue rounded-full"></div>
                  {language === 'zh' ? '安全工程師' : 'Security Engineer'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-blue rounded-full"></div>
                  {language === 'zh' ? '軟體開發測試與品質保證工程師' : 'SDET & QA Engineer'}
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-lofi-accent/20 to-lofi-purple/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-accent/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lofi-accent text-lg font-semibold mb-3">{t('skills')}</h3>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-accent rounded-full"></div>
                  {language === 'zh' ? 'Python、SQL、Shell' : 'Python, SQL, Shell'}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-accent rounded-full"></div>
                  {language === 'zh' ? 'AWS、Azure、Docker' : 'AWS, Azure, Docker'}
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-lofi-purple mb-8 text-center">{t('myTimeline')}</h2>

          {/* Timeline Filters */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium
                  ${activeFilter === filter 
                    ? 'bg-lofi-purple text-white shadow-lg' 
                    : 'text-white hover:bg-lofi-purple/20 border border-lofi-purple/30'
                  }`}
              >
                {t(filter.toLowerCase() as TranslationKey)}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-lofi-purple via-lofi-blue to-lofi-pink"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {filteredTimeline.map((item, index) => (
                <div key={index} className="relative pl-12 sm:pl-16">
                  {/* Timeline Dot */}
                  <div className={`absolute left-2 sm:left-6 top-4 w-4 h-4 rounded-full ${getCategoryColor(item.category)} shadow-lg`}></div>

                  {/* Content */}
                  <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-lofi-purple/20 hover:border-lofi-purple/40 transition-all duration-300 hover:shadow-lg">
                    <div className="text-lofi-purple text-sm font-medium mb-2">{item.period}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title[language]}</h3>
                    <div className="text-lofi-blue mb-3 font-medium">{item.subtitle[language]}</div>
                    <p className="text-gray-300 leading-relaxed">{item.description[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-lofi-purple mb-8 text-center">{t('skillsCertifications')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <div className="bg-gradient-to-br from-lofi-accent/20 to-lofi-purple/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-accent/30">
                <h3 className="text-lofi-accent text-xl font-bold mb-4">{t('certifications')}</h3>
                <ul className="space-y-3">
                  {skills.certifications[language].map((cert, index) => (
                    <li key={index} className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-lofi-accent rounded-full"></div>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Skills */}
              <div className="bg-gradient-to-br from-lofi-blue/20 to-lofi-pink/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-blue/30">
                <h3 className="text-lofi-blue text-xl font-bold mb-4">{t('technicalSkills')}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-lofi-purple/20 text-white rounded-full text-sm border border-lofi-purple/30 hover:bg-lofi-purple/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
