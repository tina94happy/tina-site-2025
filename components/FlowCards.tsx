"use client"

import { motion } from "framer-motion"
import { flows } from "@/lib/k8s-data"

interface FlowCardsProps {
  activeFlow: keyof typeof flows | null
  onFlowSelect: (flow: keyof typeof flows | null) => void
}

export function FlowCards({ activeFlow, onFlowSelect }: FlowCardsProps) {
  const flowEntries = Object.entries(flows) as [keyof typeof flows, typeof flows[keyof typeof flows]][]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {flowEntries.map(([key, flow]) => (
        <motion.div
          key={key}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 min-h-[200px] ${
            activeFlow === key
              ? 'border-orange-500 bg-orange-500/10'
              : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
          }`}
          onClick={() => onFlowSelect(activeFlow === key ? null : key)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: flow.color }}
            />
            <h3 className="text-lg font-semibold text-white">{flow.name}</h3>
          </div>
          
          <div className="text-sm text-gray-300 mb-4 font-medium">
            {key === 'external' && "Internet → Firewall → kube-proxy → Pod"}
            {key === 'control' && "kubectl → API Server → kubelet → Pod"}
            {key === 'sync' && "API Server → etcd → Controller → Scheduler"}
          </div>
          
          <p className="text-sm text-gray-400 leading-relaxed">
            {flow.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
