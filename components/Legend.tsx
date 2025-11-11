"use client"

import { cn } from "@/lib/utils"

interface LegendProps {
  className?: string
}

const legendItems = [
  {
    color: "bg-red-500",
    label: "Control Plane",
    description: "控制面"
  },
  {
    color: "bg-blue-500", 
    label: "Worker",
    description: "工作節點"
  },
  {
    color: "bg-green-500",
    label: "Pod", 
    description: "Pod"
  }
]

export function Legend({ className }: LegendProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      <span className="text-sm font-semibold text-white">LEGEND</span>
      <div className="flex items-center gap-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", item.color)} />
            <span className="text-sm text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
