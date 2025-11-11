"use client"

import Link from "next/link"
import { ButtonTop } from "@/components/ui/button-top"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { NodeDot } from "@/components/NodeDot"
import { ClusterBox } from "@/components/ClusterBox"
import { Legend } from "@/components/Legend"
import { ArrowLeft } from "lucide-react"

export default function KubernetesPage() {
  const { t } = useTranslation()

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
            Kubernetes Topologies
          </h1>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            Minikube（單節點） vs 多節點（4 節點示例）。紅=控制面、藍=Worker、綠=Pod。滑鼠移到點點可查看說明。
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Topology Diagrams */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Minikube Section */}
            <ClusterBox
              title="Minikube — Single Node (Laptop/VM)"
              subtitle="控制面與工作負載同一台機器"
            >
              <div className="space-y-6">
                {/* Control Plane */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">CONTROL PLANE</h4>
                  <div className="flex gap-3 flex-wrap">
                    <NodeDot label="kube-apiserver" role="control-plane" size="md" />
                    <NodeDot label="controller-manager" role="control-plane" size="md" />
                    <NodeDot label="scheduler" role="control-plane" size="md" />
                    <NodeDot label="etcd" role="control-plane" size="md" />
                  </div>
                </div>

                {/* Node Agent */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">NODE AGENT</h4>
                  <div className="flex gap-3">
                    <NodeDot label="kubelet" role="worker" size="lg" />
                  </div>
                </div>

                {/* Pods */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">PODS</h4>
                  <div className="flex gap-3 flex-wrap">
                    <NodeDot label="Pod" role="pod" size="md" />
                    <NodeDot label="Pod" role="pod" size="md" />
                    <NodeDot label="Pod" role="pod" size="md" />
                    <NodeDot label="Pod" role="pod" size="md" />
                    <NodeDot label="Pod" role="pod" size="md" />
                  </div>
                </div>
              </div>
            </ClusterBox>

            {/* Multinode Section */}
            <ClusterBox
              title="Kubernetes — Multinode (4 節點示例)"
              subtitle="上方：控制面；下方：3 個工作節點"
            >
              <div className="space-y-6">
                {/* Control Plane */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">CONTROL PLANE</h4>
                  <div className="flex gap-3 flex-wrap">
                    <NodeDot label="kube-apiserver" role="control-plane" size="md" />
                    <NodeDot label="controller-manager" role="control-plane" size="md" />
                    <NodeDot label="scheduler" role="control-plane" size="md" />
                    <NodeDot label="etcd" role="control-plane" size="md" />
                  </div>
                </div>

                {/* Worker Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Worker #1 */}
                  <div className="bg-gray-200/10 rounded-lg p-4 border border-gray-300/20">
                    <h5 className="text-xs font-medium text-gray-300 mb-3">WORKER #1</h5>
                    <div className="space-y-3">
                      <NodeDot label="kubelet" role="worker" size="md" />
                      <div className="flex gap-2 flex-wrap">
                        <NodeDot label="Pod" role="pod" size="sm" />
                        <NodeDot label="Pod" role="pod" size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Worker #2 */}
                  <div className="bg-gray-200/10 rounded-lg p-4 border border-gray-300/20">
                    <h5 className="text-xs font-medium text-gray-300 mb-3">WORKER #2</h5>
                    <div className="space-y-3">
                      <NodeDot label="kubelet" role="worker" size="md" />
                      <div className="flex gap-2 flex-wrap">
                        <NodeDot label="Pod" role="pod" size="sm" />
                        <NodeDot label="Pod" role="pod" size="sm" />
                        <NodeDot label="Pod" role="pod" size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Worker #3 */}
                  <div className="bg-gray-200/10 rounded-lg p-4 border border-gray-300/20">
                    <h5 className="text-xs font-medium text-gray-300 mb-3">WORKER #3</h5>
                    <div className="space-y-3">
                      <NodeDot label="kubelet" role="worker" size="md" />
                      <div className="flex gap-2 flex-wrap">
                        <NodeDot label="Pod" role="pod" size="sm" />
                        <NodeDot label="Pod" role="pod" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ClusterBox>
          </div>

          {/* About This Visualization */}
          <ClusterBox className="mb-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">About This Visualization</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-lofi-purple mb-2">What is Minikube?</h4>
                  <p className="text-sm text-gray-300">
                    Official tool to run a single-node Kubernetes cluster locally for learning, dev, and POCs.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-lofi-purple mb-2">Why multi-node?</h4>
                  <p className="text-sm text-gray-300">
                    高可用、容量擴充、容錯與維運彈性；生產常見 3 控制面節點（etcd 仲裁）+ ≥2 工作者。
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-lofi-purple mb-2">Tip:</h4>
                  <p className="text-sm text-gray-300">
                    本頁為示意，實務上還需網路（CNI）、儲存、監控、日誌、告警等配套。
                  </p>
                </div>
              </div>
            </div>
          </ClusterBox>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Legend />
            <p className="text-xs text-gray-400 text-right max-w-md">
              示意圖僅供學習：生產環境通常採多控制面節點（etcd 仲裁）與多工作節點。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
