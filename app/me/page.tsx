'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ButtonTop } from "@/components/ui/button-top"
import { FaGithub, FaLinkedin } from "react-icons/fa"

interface TimelineItem {
  period: string
  title: string
  subtitle: string
  description: string
  category: 'education' | 'work' | 'certification' | 'project'
}

const timelineData: TimelineItem[] = [
  {
    period: "Jun. 2025 – Aug. 2025",
    title: "Full-Stack Engineer Intern",
    subtitle: "CONNECT, St. Louis, MO",
    description: "Integrated Trigger.dev to manage and batch high-volume notification workflows, ensuring reliable delivery at scale. Utilized Drizzle ORM for type-safe database operations and tRPC for end-to-end type-safe API communication. Built real-time legal alerting via Next.js, Resend, and Supabase Webhooks, enabling users to receive instant email updates when relevant laws are enacted.",
    category: "work"
  },
  {
    period: "2024 - 2025",
    title: "Washington University in St. Louis",
    subtitle: "Master of Information Systems Management",
    description: "GPA 4.0. Coursework: IT Architecture, CTF, Intro to Cybersecurity | AWS/Azure Cloud Labs | K8s Architecture Labs",
    category: "education"
  },
  {
    period: "2018 - 2023",
    title: "Fu Jen Catholic University",
    subtitle: "BS - Finance & International Business and Information Mgmt",
    description: "Graduated with GPA 3.86. Outstanding Student Award & Python TA. Studied Finance, ML, and Data Mining.",
    category: "education"
  },
  {
    period: "2023 - 2024",
    title: "Security Engineer",
    subtitle: "Galaxy Software Services",
    description: "Integrated OSS vuln scanning in CI/CD with GitHub/GitLab/Jenkins. Delivered training to 40+ clients. Built Python-based scanning in Linux.",
    category: "work"
  },
  {
    period: "2022 - 2023",
    title: "SDET Intern",
    subtitle: "Kingray Corporation",
    description: "Led Agile team for api project. Simulated HTTP using Mockoon for gov APIs. Built auto accounting tool (Python+SQL), saving 60% manual time.",
    category: "work"
  },
  {
    period: "2021 - 2022",
    title: "QA Engineer Intern",
    subtitle: "CHT Security",
    description: "Expanded SOC testing. Automated UI tests with Selenium/Allure using Page Object Model, cutting time by 70%.",
    category: "work"
  },
  {
    period: "2021 - 2022",
    title: "Capstone Project: iMirror",
    subtitle: "Virtual Avatar Social Media with NFT",
    description: "Used C# Nomcore for real-time voice. Back-end with MySQL/phpMyAdmin. Built NFT trading backend.",
    category: "project"
  },
  {
    period: "Current",
    title: "Certifications & Skills",
    subtitle: "CEH, Azure DP-900, Checkmarx, AWS Cloud Practitioner",
    description: "Skills: Python, Shell, SQL, Docker, Jenkins, k8s, Git, Splunk, Azure DevOps, Terraform, Power BI, MySQL.",
    category: "certification"
  }
]

const skills = {
  certifications: [
    "Certified Ethical Hacker (CEH)",
    "Microsoft Azure DP-900 & AWS Cloud Practitioner"
  ],
  technical: [
    "Python", "SQL", "Shell", "Docker", "Jenkins", "K8s",
    "AWS", "Azure", "Next.js", "tRPC", "Drizzle ORM", 
    "Trigger.dev", "Supabase", "Resend", "Power BI"
  ]
}

export default function MePage() {
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
          <Link href="/" className="text-2xl sm:text-3xl font-bold font-poppins text-lofi-purple hover:scale-105 transition-all duration-300">TINA</Link>
        </div>
        <div className="flex gap-2 sm:gap-4 space-x-4 sm:space-x-8 font-bold text-sm sm:text-md px-4 sm:px-10">
          <Link href="/" className="text-white hover:text-lofi-purple transition-colors">Home</Link>
          <Link href="/me" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple">Me</Link>
          <Link href="/coding" className="text-white hover:text-lofi-purple transition-colors">Coding</Link>
          <Link href="/learning" className="text-white hover:text-lofi-purple transition-colors">Learning</Link>
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lofi-purple mb-4">About Me</h1>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/tina94happy" target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-lofi-purple transition-colors flex items-center gap-2">
              <FaGithub size={24} />
              <span className="text-lg">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/tina-su-01b139210/" target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-lofi-purple transition-colors flex items-center gap-2">
              <FaLinkedin size={24} />
              <span className="text-lg">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Overview Section */}
        <div className="max-w-6xl mx-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-lofi-purple/20 to-lofi-blue/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-purple/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lofi-purple text-lg font-semibold mb-3">Education</h3>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-pink rounded-full"></div>
                  MSIM at WashU
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-pink rounded-full"></div>
                  BS in Finance & IS
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-lofi-blue/20 to-lofi-pink/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-blue/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lofi-blue text-lg font-semibold mb-3">Experience</h3>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-blue rounded-full"></div>
                  Security Engineer
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-blue rounded-full"></div>
                  SDET & QA Engineer
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-lofi-accent/20 to-lofi-purple/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-accent/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lofi-accent text-lg font-semibold mb-3">Skills</h3>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-accent rounded-full"></div>
                  Python, SQL, Shell
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lofi-accent rounded-full"></div>
                  AWS, Azure, Docker
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-lofi-purple mb-8 text-center">My Timeline</h2>

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
                {filter}
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
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <div className="text-lofi-blue mb-3 font-medium">{item.subtitle}</div>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-lofi-purple mb-8 text-center">Skills & Certifications</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <div className="bg-gradient-to-br from-lofi-accent/20 to-lofi-purple/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-accent/30">
                <h3 className="text-lofi-accent text-xl font-bold mb-4">Certifications</h3>
                <ul className="space-y-3">
                  {skills.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-lofi-accent rounded-full"></div>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Skills */}
              <div className="bg-gradient-to-br from-lofi-blue/20 to-lofi-pink/20 backdrop-blur-sm p-6 rounded-xl border border-lofi-blue/30">
                <h3 className="text-lofi-blue text-xl font-bold mb-4">Technical Skills</h3>
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
