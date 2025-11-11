"use client"

import { useState } from "react"
import Link from "next/link"
import { ButtonTop } from "@/components/ui/button-top"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { InteractiveK8sDiagram } from "@/components/InteractiveK8sDiagram"
import { FlowCards } from "@/components/FlowCards"
import { flows, componentDetails, aboutContent } from "@/lib/k8s-data"
import { ArrowLeft } from "lucide-react"

export default function KubernetesInteractionPage() {
  const { t } = useTranslation()
  const [activeFlow, setActiveFlow] = useState<keyof typeof flows | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getCurrentFlowDescription = () => {
    if (!activeFlow) return "點擊上方流程卡片來查看詳細的交互模式"
    return flows[activeFlow].description
  }

  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <ButtonTop />
      
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 pt-8 sm:pt-4">
        <div className="hidden sm:block px-4 sm:px-10 mb-4 sm:mb-0">
          <Link href="/" className="text-2xl sm:text-3xl font-bold font-poppins text-lofi-purple hover:scale-105 transition-all duration-300">TINA</Link>
        </div>
        <div className="flex gap-2 sm:gap-4 space-x-4 sm:space-x-8 font-bold text-sm sm:text-md px-4 sm:px-10 items-center">
          <Link href="/" className="text-white hover:text-lofi-purple transition-colors">{t('home')}</Link>
          <Link href="/me" className="text-white hover:text-lofi-purple transition-colors">{t('me')}</Link>
          <Link href="/coding" className="text-white hover:text-lofi-purple transition-colors">{t('coding')}</Link>
          <Link href="/learning" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple">{t('learning')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/learning" 
            className="inline-flex items-center gap-2 text-lofi-purple hover:text-lofi-purple/80 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>回到學習頁面</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lofi-purple mb-4">
            Kubernetes 交互模式
          </h1>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            深入了解 Kubernetes 叢集中各元件間的交互流程：控制流程、數據同步與網路存取模式
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Flow Cards */}
          <FlowCards 
            activeFlow={activeFlow}
            onFlowSelect={setActiveFlow}
          />

          {/* Interactive Diagram */}
          <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
            <InteractiveK8sDiagram 
              activeFlow={activeFlow}
              onNodeHover={setHoveredNode}
            />
          </div>

          {/* Current Flow Description */}
          <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-lofi-purple mb-3">
              {activeFlow ? flows[activeFlow].name : "流程說明"}
            </h3>
            <p className="text-gray-300">
              {getCurrentFlowDescription()}
            </p>
          </div>

          {/* Detailed Component Interactions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Control Plane Components */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-lofi-purple mb-4">控制面元件</h3>
              <div className="space-y-3">
                {componentDetails.controlPlane.map((component) => (
                  <div key={component.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{component.name}</h4>
                      <p className="text-xs text-gray-400">{component.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worker Node Components */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-lofi-purple mb-4">工作節點元件</h3>
              <div className="space-y-3">
                {componentDetails.workerNode.map((component) => (
                  <div key={component.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{component.name}</h4>
                      <p className="text-xs text-gray-400">{component.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Networking Components */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-lofi-purple mb-4">網路元件</h3>
              <div className="space-y-3">
                {componentDetails.networking.map((component) => (
                  <div key={component.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{component.name}</h4>
                      <p className="text-xs text-gray-400">{component.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Interaction Modes */}
          <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-lofi-purple mb-4">關於交互模式</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-lofi-purple mb-2">{aboutContent.control.title}</h4>
                <p className="text-sm text-gray-300">{aboutContent.control.content}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-lofi-purple mb-2">{aboutContent.sync.title}</h4>
                <p className="text-sm text-gray-300">{aboutContent.sync.content}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-lofi-purple mb-2">{aboutContent.network.title}</h4>
                <p className="text-sm text-gray-300">{aboutContent.network.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
