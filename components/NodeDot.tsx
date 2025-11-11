"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

interface NodeDotProps {
  label: string
  role: "control-plane" | "worker" | "pod"
  description?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const roleConfig = {
  "control-plane": {
    color: "bg-red-500 hover:bg-red-600",
    description: "控制面元件"
  },
  "worker": {
    color: "bg-blue-500 hover:bg-blue-600", 
    description: "工作節點元件"
  },
  "pod": {
    color: "bg-green-500 hover:bg-green-600",
    description: "Pod 元件"
  }
}

const sizeConfig = {
  sm: "w-3 h-3",
  md: "w-4 h-4", 
  lg: "w-5 h-5"
}

const descriptions = {
  "kube-apiserver": "叢集的 API 入口；所有控制請求經由此元件。",
  "controller-manager": "控制迴路；持續協調叢集以達成期望狀態。",
  "scheduler": "將 Pods 排程到合適的節點，考量資源與限制。",
  "etcd": "關鍵狀態儲存（鍵值庫）；需備援、快照與嚴謹的備份策略。",
  "kubelet": "節點代理與容器執行時（containerd/CRI-O）；負責啟動與監控 Pods。",
  "container runtime": "節點代理與容器執行時（containerd/CRI-O）；負責啟動與監控 Pods。",
  "Pod": "Kubernetes 最小可部署單位；容器化應用的承載單位。"
}

export function NodeDot({ 
  label, 
  role, 
  description, 
  size = "md", 
  className 
}: NodeDotProps) {
  const config = roleConfig[role]
  const sizeClass = sizeConfig[size]
  const hoverDescription = description || descriptions[label] || config.description

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          className={cn(
            "rounded-full border-2 border-white/20 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-800",
            config.color,
            sizeClass,
            className
          )}
          aria-label={`${label}: ${hoverDescription}`}
        >
          <span className="sr-only">{label}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
          <p className="text-sm text-gray-600">{hoverDescription}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
